"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { useState, useCallback } from "react"
import { api } from "@/convex/_generated/api"
import { consultaSchema, type ConsultaFormValues, AREA_LABELS, URGENCY_LABELS } from "@/lib/consulta-schema"
import { WHATSAPP } from "@/lib/site"

export function ConsultaForm() {
  const router = useRouter()
  const createConsulta = useMutation(api.consultas.create)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultaFormValues>({
    resolver: zodResolver(consultaSchema),
  })

  const onSubmit = useCallback(async (data: ConsultaFormValues) => {
    setSubmitting(true)
    setError(null)
    try {
      await createConsulta(data)
      router.push("/panel/consultas")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al enviar la consulta")
      setSubmitting(false)
    }
  }, [createConsulta, router])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Area select */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Área legal</label>
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
        <label className="block text-sm font-medium text-foreground">Asunto</label>
        <input
          {...register("subject")}
          placeholder="Ej: Despido injustificado en empresa X"
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/20"
        />
        {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Describe tu caso</label>
        <textarea
          {...register("description")}
          rows={5}
          placeholder="Describe tu situación legal en detalle. Incluye fechas, nombres, y cualquier información relevante..."
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/20"
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      {/* Urgency */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Nivel de urgencia</label>
        <select
          {...register("urgency")}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/20"
        >
          <option value="">Selecciona urgencia...</option>
          {Object.entries(URGENCY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.urgency && <p className="text-sm text-red-500">{errors.urgency.message}</p>}
      </div>

      {/* Submit */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-brand-navy px-6 py-3 font-medium text-white hover:bg-brand-navy/90 disabled:opacity-50"
      >
        {submitting ? "Enviando..." : "Enviar consulta"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        ¿Prefieres WhatsApp?{" "}
        <a href={WHATSAPP.url()} target="_blank" rel="noopener noreferrer" className="text-brand-sky hover:underline">
          Escríbenos directamente
        </a>
      </p>
    </form>
  )
}
