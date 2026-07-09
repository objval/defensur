"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { consultaSchema, type ConsultaFormValues, AREA_LABELS, URGENCY_LABELS } from "@/lib/consulta-schema"
import { WHATSAPP } from "@/lib/site"
import { X, FileText, Image, Paperclip, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatSize } from "@/lib/panel-utils"
import { FileDropZone, type PendingFile } from "@/components/panel/file-drop-zone"

// ── Types ────────────────────────────────────────────────────────────────────

type UploadedFileRef = {
  storageId: string
  fileName: string
  fileType: string
  fileSize: number
}

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
  const [uploadedRefs, setUploadedRefs] = useState<UploadedFileRef[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ConsultaFormValues>({
    resolver: zodResolver(consultaSchema),
  })

  const areaValue = watch("area")

  // ── File handling ────────────────────────────────────────────────────────

  const addFiles = useCallback((newFiles: File[]) => {
    const entries: PendingFile[] = newFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
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
      setPendingFiles((prev) => prev.map((f) => (f.id === pf.id ? { ...f, uploading: true } : f)))
      try {
        // 1. Get upload URL
        const uploadUrl = await generateUploadUrl()
        // 2. Extract storage ID from the URL's token parameter
        const url = new URL(uploadUrl)
        const storageId = url.searchParams.get("token")!
        // 3. Upload to Convex storage
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": pf.file.type },
          body: pf.file,
        })
        if (!result.ok) throw new Error("Upload failed")
        refs.push({ storageId, fileName: pf.file.name, fileType: pf.file.type, fileSize: pf.file.size })
      } catch (e) {
        setPendingFiles((prev) => prev.map((f) => (f.id === pf.id ? { ...f, uploading: false, error: "Error al subir" } : f)))
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
        // 1. Upload files first
        const refs = await uploadFiles()
        // 2. Create consulta
        const consultaId = await createConsulta(data)
        // 3. Attach files to consulta
        for (const ref of refs) {
          await attachFile({ consultaId, ...ref })
        }
        router.push("/panel/consultas")
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error al enviar la consulta")
        setSubmitting(false)
      }
    },
    [uploadFiles, createConsulta, attachFile, router]
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
          Describe tu caso y adjunta evidencia. Te responderemos en menos de 24 horas.
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      {/* Step indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setStep("form")}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            step === "form" ? "bg-brand-navy text-white" : "bg-muted text-muted-foreground"
          )}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full text-xs border border-current">1</span>
          Datos
        </button>
        <div className="h-px flex-1 bg-border" />
        <button
          onClick={() => setStep("files")}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            step === "files" ? "bg-brand-navy text-white" : "bg-muted text-muted-foreground"
          )}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full text-xs border border-current">2</span>
          Evidencia
          {pendingFiles.length > 0 && (
            <span className="ml-1 rounded-full bg-white/20 px-1.5 text-xs">{pendingFiles.length}</span>
          )}
        </button>
        <div className="h-px flex-1 bg-border" />
        <span className="flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
          <span className="flex h-5 w-5 items-center justify-center rounded-full text-xs border border-current">3</span>
          Enviar
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Form fields */}
        {step === "form" && (
          <div className="space-y-5 rounded-xl border border-border bg-card p-6">
            {/* Area */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Área legal *</label>
              <select
                {...register("area")}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/20"
              >
                <option value="">Selecciona un área...</option>
                {Object.entries(AREA_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              {errors.area && <p className="text-sm text-red-500">{errors.area.message}</p>}
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Asunto *</label>
              <input
                {...register("subject")}
                placeholder="Ej: Despido injustificado en Constructora XYZ"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/20"
              />
              {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Describe tu caso *</label>
              <textarea
                {...register("description")}
                rows={6}
                placeholder="Describe tu situación legal en detalle. Incluye fechas, nombres de empresas o personas involucradas, y cualquier información relevante..."
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/20 resize-y"
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            {/* Urgency */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Nivel de urgencia *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(URGENCY_LABELS).map(([value, label]) => (
                  <label
                    key={value}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors",
                      watch("urgency") === value
                        ? "border-brand-sky bg-brand-sky/5"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <input
                      type="radio"
                      {...register("urgency")}
                      value={value}
                      className="sr-only"
                    />
                    <div
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                        watch("urgency") === value ? "border-brand-sky" : "border-muted-foreground/30"
                      )}
                    >
                      {watch("urgency") === value && <div className="h-2 w-2 rounded-full bg-brand-sky" />}
                    </div>
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
              {errors.urgency && <p className="text-sm text-red-500">{errors.urgency.message}</p>}
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
                <h2 className="font-semibold text-foreground">Evidencia y documentos</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Adjunta contratos, finiquitos, capturas, fotos o PDFs relevantes
                </p>
              </div>
              <span className="text-xs text-muted-foreground">Opcional</span>
            </div>

            <FileDropZone files={pendingFiles} onAddFiles={addFiles} onRemoveFile={removeFile} />

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
                className="flex-1 rounded-lg bg-brand-navy px-6 py-3 text-sm font-medium text-white hover:bg-brand-navy/90 disabled:opacity-50 inline-flex items-center justify-center gap-2"
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
          className="text-brand-sky hover:underline font-medium"
        >
          Escríbenos directamente
        </a>
      </p>
    </div>
  )
}
