"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import {
  consultaSchema,
  type ConsultaFormValues,
  AREA_LABELS,
} from "@/lib/consulta-schema"
import { WHATSAPP } from "@/lib/site"
import { Paperclip, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  FileDropZone,
  type PendingFile,
} from "@/components/panel/file-drop-zone"
import type { Id } from "@/convex/_generated/dataModel"

// ── Types ────────────────────────────────────────────────────────────────────

type UploadedFileRef = {
  storageId: Id<"_storage">
  fileName: string
}

type UploadResult = { storageId: Id<"_storage"> }

const URGENCY_OPTIONS: ReadonlyArray<{
  value: NonNullable<ConsultaFormValues["urgency"]>
  label: string
}> = [
  { value: "baja", label: "Baja" },
  { value: "media", label: "Media" },
  { value: "alta", label: "Alta" },
]

// ── Component ────────────────────────────────────────────────────────────────

export function ConsultaForm() {
  const router = useRouter()
  const createConsulta = useMutation(api.consultas.create)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const attachFile = useMutation(api.files.attachFile)

  const [step, setStep] = useState<"form" | "files">("form")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([])
  const [selectedUrgency, setSelectedUrgency] =
    useState<NonNullable<ConsultaFormValues["urgency"]>>("media")
  const [selectedModality, setSelectedModality] =
    useState<NonNullable<ConsultaFormValues["modality"]>>("presencial")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ConsultaFormValues>({
    resolver: zodResolver(consultaSchema),
    defaultValues: { urgency: "media", modality: "presencial" },
  })

  // ── File handling ────────────────────────────────────────────────────────

  const addFiles = useCallback((newFiles: File[]) => {
    const entries: PendingFile[] = newFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
      uploading: false,
    }))
    setPendingFiles((prev) => [...prev, ...entries])
    setError(null)
  }, [])

  const removeFile = useCallback((id: string) => {
    setPendingFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file?.preview) URL.revokeObjectURL(file.preview)
      return prev.filter((f) => f.id !== id)
    })
  }, [])

  const uploadFiles = useCallback(async (): Promise<UploadedFileRef[]> => {
    const refs: UploadedFileRef[] = []

    for (const pf of pendingFiles) {
      setPendingFiles((prev) =>
        prev.map((f) => (f.id === pf.id ? { ...f, uploading: true } : f))
      )
      try {
        // 1. Get upload URL
        const uploadUrl = await generateUploadUrl()
        // 2. Upload to Convex storage and use its returned storage ID.
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": pf.file.type },
          body: pf.file,
        })
        if (!result.ok) throw new Error("Upload failed")
        const { storageId } = (await result.json()) as unknown as UploadResult
        if (!storageId)
          throw new Error("Convex no devolvió el identificador del archivo")
        refs.push({ storageId, fileName: pf.file.name })
      } catch (e) {
        setPendingFiles((prev) =>
          prev.map((f) =>
            f.id === pf.id
              ? { ...f, uploading: false, error: "Error al subir" }
              : f
          )
        )
        throw e
      }
    }
    return refs
  }, [pendingFiles, generateUploadUrl])

  // ── Submit ────────────────────────────────────────────────────────────────

  const onSubmit = useCallback(
    async (data: ConsultaFormValues) => {
      setSubmitting(true)
      setError(null)
      try {
        // 1. Create the record before file upload. A failed upload cannot orphan
        // an otherwise valid consultation record.
        const consultaId = await createConsulta({ ...data, modality: selectedModality })
        // 2. Upload and attach each file using the storage ID returned by Convex.
        const refs = await uploadFiles()
        for (const ref of refs) {
          await attachFile({ consultaId, ...ref })
        }
        router.push("/panel/consultas")
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error al enviar la consulta")
        setSubmitting(false)
      }
    },
    [uploadFiles, createConsulta, attachFile, router, selectedModality]
  )

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
          Nueva Consulta Especializada
        </h1>
        <p className="mt-1 text-muted-foreground">
          Describe tu caso y adjunta evidencia. Te responderemos en menos de 24
          horas.
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Step indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setStep("form")}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            step === "form"
              ? "bg-brand-navy text-white"
              : "bg-muted text-muted-foreground"
          )}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs">
            1
          </span>
          Datos
        </button>
        <div className="h-px flex-1 bg-border" />
        <button
          onClick={() => setStep("files")}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            step === "files"
              ? "bg-brand-navy text-white"
              : "bg-muted text-muted-foreground"
          )}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs">
            2
          </span>
          Evidencia
          {pendingFiles.length > 0 && (
            <span className="ml-1 rounded-full bg-white/20 px-1.5 text-xs">
              {pendingFiles.length}
            </span>
          )}
        </button>
        <div className="h-px flex-1 bg-border" />
        <span className="flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs">
            3
          </span>
          Enviar
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Form fields */}
        {step === "form" && (
          <div className="space-y-5 rounded-xl border border-border bg-card p-6">
            {/* Area */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Área legal *
              </label>
              <select
                {...register("area")}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/20 focus:outline-none"
              >
                <option value="">Selecciona un área...</option>
                {Object.entries(AREA_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.area && (
                <p className="text-sm text-red-500">{errors.area.message}</p>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Asunto *
              </label>
              <input
                {...register("subject")}
                placeholder="Ej: Despido injustificado en Constructora XYZ"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/20 focus:outline-none"
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Describe tu caso *
              </label>
              <textarea
                {...register("description")}
                rows={6}
                placeholder="Describe tu situación legal en detalle. Incluye fechas, nombres de empresas o personas involucradas, y cualquier información relevante..."
                className="w-full resize-y rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/20 focus:outline-none"
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Modality */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Modalidad de atención *
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { value: "presencial" as const, label: "Presencial", desc: "Reunión en nuestra oficina en Temuco" },
                  { value: "online" as const, label: "Online", desc: "Videollamada de 15 a 25 min" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={cn(
                      "flex cursor-pointer flex-col gap-1 rounded-lg border p-4 transition-colors",
                      selectedModality === opt.value
                        ? "border-brand-sky bg-brand-sky/5"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <input
                      type="radio"
                      value={opt.value}
                      checked={selectedModality === opt.value}
                      onChange={() => {
                        setSelectedModality(opt.value)
                        setValue("modality", opt.value)
                      }}
                      className="sr-only"
                    />
                    <span className="text-sm font-semibold text-foreground">{opt.label}</span>
                    <span className="text-xs text-muted-foreground">{opt.desc}</span>
                  </label>
                ))}
              </div>
              {selectedModality === "online" && (
                <p className="text-xs text-amber-600">
                  ⚡ Las reuniones online son breves y enfocadas: duran entre 15 y 25 minutos, ideales para resolver consultas específicas.
                </p>
              )}
            </div>

            {/* Urgency */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Nivel de urgencia *
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <input type="hidden" {...register("urgency")} />
                {URGENCY_OPTIONS.map(({ value, label }) => (
                  <label
                    key={value}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-colors",
                      selectedUrgency === value
                        ? "border-brand-sky bg-brand-sky/5"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <input
                      type="radio"
                      value={value}
                      checked={selectedUrgency === value}
                      onChange={() => {
                        setSelectedUrgency(value)
                        setValue("urgency", value, { shouldValidate: true })
                      }}
                      className="sr-only"
                    />
                    <div
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                        selectedUrgency === value
                          ? "border-brand-sky"
                          : "border-muted-foreground/30"
                      )}
                    >
                      {selectedUrgency === value && (
                        <div className="h-2 w-2 rounded-full bg-brand-sky" />
                      )}
                    </div>
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
              {errors.urgency && (
                <p className="text-sm text-red-500">{errors.urgency.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setStep("files")}
              className="w-full rounded-lg bg-brand-navy px-6 py-3 text-sm font-medium text-white hover:bg-brand-navy/90"
            >
              Continuar a evidencia
            </button>
          </div>
        )}

        {/* Step 2: File upload */}
        {step === "files" && (
          <div className="space-y-5 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">
                  Evidencia y documentos
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Adjunta contratos, finiquitos, capturas, fotos o PDFs
                  relevantes
                </p>
              </div>
              <span className="text-xs text-muted-foreground">Opcional</span>
            </div>

            <FileDropZone
              files={pendingFiles}
              onAddFiles={addFiles}
              onRemoveFile={removeFile}
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-muted"
              >
                Volver
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-navy px-6 py-3 text-sm font-medium text-white hover:bg-brand-navy/90 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Paperclip className="h-4 w-4" />
                    Enviar consulta
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* WhatsApp fallback */}
      <p className="text-center text-sm text-muted-foreground">
        ¿Prefieres WhatsApp?{" "}
        <a
          href={WHATSAPP.url()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-sky hover:underline"
        >
          Escríbenos directamente
        </a>
      </p>
    </div>
  )
}
