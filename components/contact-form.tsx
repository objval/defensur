"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useMutation, useConvexAuth } from "convex/react"
import { useUser } from "@clerk/nextjs"
import { BriefcaseBusiness, CheckCircle2, Clock, Landmark, Scale, ShieldCheck, Users, Loader2 } from "lucide-react"
import { api } from "@/convex/_generated/api"
import { AnimatedSelect, type SelectOption } from "@/components/animated-select"
import { cn } from "@/lib/utils"
import { WHATSAPP } from "@/lib/site"

const formAreas: SelectOption[] = [
  { id: "laboral", label: "Derecho Laboral", value: "laboral", icon: Scale, description: "Despidos, tutela, acoso" },
  { id: "familia", label: "Derecho de Familia", value: "familia", icon: Users, description: "Divorcios, alimentos, visitas" },
  { id: "civil", label: "Derecho Civil", value: "civil", icon: BriefcaseBusiness, description: "Contratos, deudas, cobros" },
  { id: "insolvencia", label: "Insolvencia", value: "insolvencia", icon: Landmark, description: "Renegociación, liquidación" },
  { id: "sumarios", label: "Sumarios", value: "sumarios", icon: ShieldCheck, description: "Defensa administrativa" },
]

const URGENCY_OPTIONS = [
  { value: "baja", label: "Baja — Informativa" },
  { value: "media", label: "Media — Esta semana" },
  { value: "alta", label: "Alta — Urgente" },
]

type FormValues = {
  name: string
  email: string
  phone: string
  area: string
  subject: string
  description: string
  urgency: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = "Ingresa tu nombre"
  if (!values.email.trim()) errors.email = "Ingresa tu correo"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Correo inválido"
  if (!values.phone.trim()) errors.phone = "Ingresa tu teléfono"
  else if (!/^[+]?[\d\s()-]{8,}$/.test(values.phone)) errors.phone = "Teléfono inválido"
  if (!values.subject.trim()) errors.subject = "Describe tu caso brevemente"
  if (!values.description.trim()) errors.description = "Cuéntanos los detalles"
  return errors
}

function SuccessState({ consultaId, onReset }: { consultaId: string; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 px-8 py-10 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-green-700">
        <CheckCircle2 className="size-8" />
      </div>
      <div className="space-y-2">
        <h4 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary">Consulta recibida</h4>
        <p className="text-sm leading-6 text-muted-foreground max-w-[42ch]">
          Tu consulta ha sido registrada con éxito. Nuestro equipo la revisará y te responderá en menos de 24 horas al correo o teléfono proporcionado.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Referencia: <code className="bg-muted px-2 py-0.5 rounded text-brand-navy font-mono text-xs">{consultaId.slice(0, 8)}</code>
        </p>
      </div>
      <div className="flex flex-col items-center gap-3 mt-2">
        <button
          onClick={onReset}
          className="text-sm font-medium text-brand-navy hover:text-brand-sky transition-colors"
        >
          Enviar otra consulta
        </button>
        <a
          href={WHATSAPP.url()}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-brand-sky hover:underline"
        >
          También puedes contactarnos por WhatsApp
        </a>
      </div>
    </div>
  )
}

export function ContactForm() {
  const [hydrated, setHydrated] = React.useState(false)
  React.useEffect(() => { setHydrated(true) }, [])

  const { isLoading: convexLoading } = useConvexAuth()
  const { isLoaded: clerkLoaded } = useUser()

  // Prevent hydration mismatch: server always renders skeleton, and so does
  // the first client render. Once hydrated, wait for Clerk + Convex too.
  if (!hydrated || !clerkLoaded || convexLoading) {
    return (
      <div className="rounded-2xl bg-white/85 backdrop-blur-xl p-6 md:p-10 border border-white/40 animate-pulse space-y-4">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="h-14 bg-muted rounded-full" />
        <div className="h-14 bg-muted rounded-full" />
        <div className="h-14 bg-muted rounded-full" />
      </div>
    )
  }

  return <ContactFormInner />
}

function ContactFormInner() {
  const router = useRouter()
  const submitPublic = useMutation(api.consultas.submitPublic)
  const { user, isSignedIn } = useUser()

  const [selectedArea, setSelectedArea] = React.useState(formAreas[0].value)
  const [formValues, setFormValues] = React.useState<FormValues>({
    name: user?.fullName ?? "",
    email: user?.primaryEmailAddress?.emailAddress ?? "",
    phone: "",
    area: formAreas[0].value,
    subject: "",
    description: "",
    urgency: "media",
  })
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [consultaId, setConsultaId] = React.useState("")

  // Pre-fill from Clerk when user becomes available
  React.useEffect(() => {
    if (isSignedIn && user) {
      setFormValues(prev => ({
        ...prev,
        name: prev.name || user.fullName || "",
        email: prev.email || user.primaryEmailAddress?.emailAddress || "",
      }))
    }
  }, [isSignedIn, user])

  const errors = React.useMemo(() => {
    if (Object.keys(touched).length === 0) return {}
    return validateForm({ ...formValues, area: selectedArea })
  }, [formValues, selectedArea, touched])

  function handleBlur(field: keyof FormValues) {
    setTouched(t => ({ ...t, [field]: true }))
  }

  function update(field: keyof FormValues, value: string) {
    setFormValues(v => ({ ...v, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, subject: true, description: true, area: true, urgency: true })

    const values = { ...formValues, area: selectedArea }
    const validationErrors = validateForm(values)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    setError(null)
    try {
      const id = await submitPublic(values)
      setConsultaId(id as string)
      setSubmitted(true)
    } catch {
      setError("Error al enviar. Intenta de nuevo o contáctanos por WhatsApp.")
    } finally {
      setSubmitting(false)
    }
  }

  function handleReset() {
    setFormValues({ name: user?.fullName ?? "", email: user?.primaryEmailAddress?.emailAddress ?? "", phone: "", area: formAreas[0].value, subject: "", description: "", urgency: "media" })
    setTouched({})
    setSubmitted(false)
    setError(null)
  }

  return (
    <div className="relative bg-white/85 backdrop-blur-xl p-6 md:p-10 rounded-2xl shadow-[0px_32px_64px_rgba(8,24,107,0.08)] border border-white/40">
      {submitted ? (
        <SuccessState consultaId={consultaId} onReset={handleReset} />
      ) : (
        <>
          <div className="mb-6 md:mb-8">
            <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-semibold text-primary mb-2">
              Consulta Especializada
            </h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Cuéntanos tu caso. Primera consulta gratuita y sin compromiso.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
          )}

          <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-navy px-4 tracking-[0.1em] uppercase">Nombre completo *</label>
              <input
                value={formValues.name}
                onChange={e => update("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                className={cn("w-full h-14 bg-muted border rounded-full px-6 text-sm transition-all placeholder:text-muted-foreground/50", touched.name && errors.name ? "border-red-300 focus:border-red-400" : "border-transparent focus:border-brand-navy")}
                placeholder="Ej. Javier Mendoza"
              />
              {touched.name && errors.name && <p className="text-xs text-red-500 px-4">{errors.name}</p>}
            </div>

            {/* Email + Phone row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-navy px-4 tracking-[0.1em] uppercase">Correo *</label>
                <input
                  type="email"
                  value={formValues.email}
                  onChange={e => update("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={cn("w-full h-14 bg-muted border rounded-full px-6 text-sm transition-all placeholder:text-muted-foreground/50", touched.email && errors.email ? "border-red-300" : "border-transparent focus:border-brand-navy")}
                  placeholder="javier@empresa.com"
                />
                {touched.email && errors.email && <p className="text-xs text-red-500 px-4">{errors.email}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-navy px-4 tracking-[0.1em] uppercase">Teléfono *</label>
                <input
                  type="tel"
                  value={formValues.phone}
                  onChange={e => update("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  className={cn("w-full h-14 bg-muted border rounded-full px-6 text-sm transition-all placeholder:text-muted-foreground/50", touched.phone && errors.phone ? "border-red-300" : "border-transparent focus:border-brand-navy")}
                  placeholder="+56 9 ..."
                />
                {touched.phone && errors.phone && <p className="text-xs text-red-500 px-4">{errors.phone}</p>}
              </div>
            </div>

            {/* Area */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-navy px-1 tracking-[0.1em] uppercase">Área de interés</label>
              <AnimatedSelect id="area-select" options={formAreas} value={selectedArea} onChange={setSelectedArea} label="Área" />
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-navy px-4 tracking-[0.1em] uppercase">Asunto *</label>
              <input
                value={formValues.subject}
                onChange={e => update("subject", e.target.value)}
                onBlur={() => handleBlur("subject")}
                className={cn("w-full h-14 bg-muted border rounded-full px-6 text-sm transition-all placeholder:text-muted-foreground/50", touched.subject && errors.subject ? "border-red-300" : "border-transparent focus:border-brand-navy")}
                placeholder="Ej. Despido injustificado, deuda impaga..."
              />
              {touched.subject && errors.subject && <p className="text-xs text-red-500 px-4">{errors.subject}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-navy px-4 tracking-[0.1em] uppercase">Describe tu caso *</label>
              <textarea
                rows={4}
                value={formValues.description}
                onChange={e => update("description", e.target.value)}
                onBlur={() => handleBlur("description")}
                className={cn("w-full bg-muted border rounded-2xl px-6 py-4 text-sm transition-all placeholder:text-muted-foreground/50 resize-none", touched.description && errors.description ? "border-red-300" : "border-transparent focus:border-brand-navy")}
                placeholder="Cuéntanos qué ocurrió, fechas relevantes, personas involucradas..."
              />
              {touched.description && errors.description && <p className="text-xs text-red-500 px-4">{errors.description}</p>}
            </div>

            {/* Urgency */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-navy px-4 tracking-[0.1em] uppercase">Urgencia</label>
              <div className="flex gap-2">
                {URGENCY_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => update("urgency", opt.value)}
                    className={cn(
                      "flex-1 h-12 rounded-full text-xs font-medium border transition-all",
                      formValues.urgency === opt.value
                        ? "border-brand-sky bg-brand-sky/5 text-brand-navy"
                        : "border-border text-muted-foreground hover:border-muted-foreground/30"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-14 bg-brand-navy text-white rounded-full font-semibold shadow-[0px_8px_24px_rgba(8,24,107,0.2)] hover:shadow-[0px_8px_32px_rgba(8,24,107,0.3)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar consulta"
              )}
            </button>
          </form>

          <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-brand-navy/5">
            <CheckCircle2 className="size-5 text-brand-navy shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sus datos están protegidos bajo estrictos protocolos de confidencialidad. La primera consulta es gratuita.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
