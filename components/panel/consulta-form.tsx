"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { consultaSchema, type ConsultaFormValues, AREA_LABELS, URGENCY_LABELS } from "@/lib/consulta-schema"
import { WHATSAPP } from "@/lib/site"

// Convex API stub — replaced by real generated API after `npx convex dev`
// This allows the build to pass before Convex is initialized
const createConsultaStub = async (data: ConsultaFormValues) => {
  console.warn("Convex not initialized. Run `npx convex dev` to enable.")
  throw new Error("Convex backend not configured. Run npx convex dev.")
}

export function ConsultaForm() {
  const router = useRouter()
  const createConsulta = createConsultaStub as any
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultaFormValues>({
    resolver: zodResolver(consultaSchema),
  })

  const onSubmit = async (data: ConsultaFormValues) => {
    setSubmitting(true)
    setError(null)
    try {
      await createConsulta(data)
      router.push("/panel/consultas")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al enviar la consulta")
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Area select */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-primary">Área legal</label>
        <select
          {...register("area")}
          className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
        >
          <option value="">Selecciona un área...</option>
          {Object.entries(AREA_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.area && <p className="text-xs text-brand-red">{errors.area.message}</p>}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-primary">Asunto</label>
        <input
          {...register("subject")}
          placeholder="Ej: Despido injustificado sin pago de indemnización"
          className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
        />
        {errors.subject && <p className="text-xs text-brand-red">{errors.subject.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-primary">Describe tu caso</label>
        <textarea
          {...register("description")}
          rows={6}
          placeholder="Cuéntanos qué pasó, fechas relevantes, documentos que tienes, y qué resultado esperas..."
          className="w-full rounded-xl border border-border bg-background p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy resize-none"
        />
        {errors.description && <p className="text-xs text-brand-red">{errors.description.message}</p>}
      </div>

      {/* Urgency */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-primary">Nivel de urgencia</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(URGENCY_LABELS).map(([value, label]) => (
            <label
              key={value}
              className="flex items-center gap-2 p-3 rounded-xl border border-border cursor-pointer hover:border-brand-navy/30 transition-colors"
            >
              <input type="radio" value={value} {...register("urgency")} className="accent-brand-navy" />
              <span className="text-xs text-muted-foreground">{label}</span>
            </label>
          ))}
        </div>
        {errors.urgency && <p className="text-xs text-brand-red">{errors.urgency.message}</p>}
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-xl border border-brand-red/30 bg-brand-red/5 p-4 text-sm text-brand-red">
          {error}
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-navy text-white font-semibold shadow-sm hover:bg-brand-navy/90 transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {submitting ? "Enviando..." : "Enviar Consulta"}
        </button>
        <a
          href={WHATSAPP.url()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-brand-sky transition-colors"
        >
          ¿Prefieres WhatsApp?
        </a>
      </div>
    </form>
  )
}
