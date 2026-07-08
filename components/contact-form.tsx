"use client"

import * as React from "react"
import { BriefcaseBusiness, CheckCircle2, Clock, Landmark, Scale, ShieldCheck, Users } from "lucide-react"

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

type FormValues = {
  name: string
  email: string
  phone: string
  area: string
}

type FormErrors = {
  name?: string
  email?: string
  phone?: string
}

function buildWhatsAppLink(values: FormValues) {
  const areaLabel = formAreas.find((a) => a.value === values.area)?.label ?? values.area
  const lines = [
    "Hola Defensur, necesito orientación jurídica.",
    values.area ? `Área: ${areaLabel}.` : "",
    values.name ? `Nombre: ${values.name}.` : "",
    values.email ? `Correo: ${values.email}.` : "",
    values.phone ? `Teléfono: ${values.phone}.` : "",
  ].filter(Boolean)
  const base = WHATSAPP.url().split("?")[0]
  return `${base}?text=${encodeURIComponent(lines.join("\n"))}`
}

function validateForm(values: Omit<FormValues, "area">): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = "Ingresa tu nombre"
  if (!values.email.trim()) {
    errors.email = "Ingresa tu correo"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Ingresa un correo válido"
  }
  if (!values.phone.trim()) {
    errors.phone = "Ingresa tu teléfono"
  } else if (!/^[+]?[\d\s()-]{8,}$/.test(values.phone)) {
    errors.phone = "Ingresa un teléfono válido"
  }
  return errors
}

function SuccessOverlay({ onReset }: { onReset: () => void }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-card/95 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-5 px-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-brand-sky/10 text-brand-sky">
          <CheckCircle2 className="size-8" />
        </div>
        <div className="space-y-2">
          <h4 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary">
            Consulta enviada
          </h4>
          <p className="text-sm leading-6 text-muted-foreground max-w-[36ch]">
            Te redirigimos a WhatsApp para completar el envío. Nuestro equipo revisará tu caso y te responderá en menos de 24 horas.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            Respuesta en 24h
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Confidencial
          </span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="mt-2 text-sm font-medium text-brand-navy hover:text-brand-sky-secondary transition-colors"
        >
          Enviar otra consulta
        </button>
      </div>
    </div>
  )
}

export function ContactForm() {
  const [selectedArea, setSelectedArea] = React.useState(formAreas[0].value)
  const [formValues, setFormValues] = React.useState<Omit<FormValues, "area">>({ name: "", email: "", phone: "" })
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = React.useState(false)

  const errors = React.useMemo(() => {
    if (Object.keys(touched).length === 0) return {}
    return validateForm(formValues)
  }, [formValues, touched])

  function handleBlur(field: keyof Omit<FormValues, "area">) {
    setTouched((t) => ({ ...t, [field]: true }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true })

    const validationErrors = validateForm(formValues)
    if (Object.keys(validationErrors).length > 0) return

    const fullValues: FormValues = { ...formValues, area: selectedArea }
    window.open(buildWhatsAppLink(fullValues), "_blank", "noopener,noreferrer")
    setSubmitted(true)
  }

  function handleReset() {
    setFormValues({ name: "", email: "", phone: "" })
    setTouched({})
    setSubmitted(false)
  }

  return (
    <div className="relative bg-white/85 backdrop-blur-xl p-6 md:p-10 rounded-2xl shadow-[0px_32px_64px_rgba(8,24,107,0.08)] border border-white/40">
      {submitted && <SuccessOverlay onReset={handleReset} />}

      <div className="mb-6 md:mb-8">
        <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-semibold text-primary mb-2">
          Consulta Especializada
        </h3>
        <p className="text-muted-foreground text-sm md:text-base">
          Inicie su proceso legal con una evaluación estratégica de su caso.
        </p>
      </div>

      <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="space-y-1.5">
          <label htmlFor="form-name" className="text-xs font-bold text-brand-navy px-4 tracking-[0.1em] uppercase">
            Nombre completo *
          </label>
          <input
            id="form-name"
            name="name"
            required
            value={formValues.name}
            onChange={(e) => setFormValues((v) => ({ ...v, name: e.target.value }))}
            onBlur={() => handleBlur("name")}
            aria-required="true"
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={errors.name ? "error-name" : undefined}
            className={cn(
              "w-full h-14 bg-muted border rounded-full px-6 text-sm transition-all duration-200 placeholder:text-muted-foreground/50",
              touched.name && errors.name
                ? "border-destructive focus:border-destructive"
                : "border-transparent focus:border-brand-navy"
            )}
            placeholder="Ej. Javier Mendoza"
            type="text"
          />
          {touched.name && errors.name && (
            <p id="error-name" className="text-xs text-destructive px-4 mt-1" role="alert">{errors.name}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="form-email" className="text-xs font-bold text-brand-navy px-4 tracking-[0.1em] uppercase">
            Correo electrónico *
          </label>
          <input
            id="form-email"
            name="email"
            required
            value={formValues.email}
            onChange={(e) => setFormValues((v) => ({ ...v, email: e.target.value }))}
            onBlur={() => handleBlur("email")}
            aria-required="true"
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={errors.email ? "error-email" : undefined}
            className={cn(
              "w-full h-14 bg-muted border rounded-full px-6 text-sm transition-all duration-200 placeholder:text-muted-foreground/50",
              touched.email && errors.email
                ? "border-destructive focus:border-destructive"
                : "border-transparent focus:border-brand-navy"
            )}
            placeholder="javier@empresa.com"
            type="email"
          />
          {touched.email && errors.email && (
            <p id="error-email" className="text-xs text-destructive px-4 mt-1" role="alert">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="form-phone" className="text-xs font-bold text-brand-navy px-4 tracking-[0.1em] uppercase">
            Teléfono *
          </label>
          <input
            id="form-phone"
            name="phone"
            required
            value={formValues.phone}
            onChange={(e) => setFormValues((v) => ({ ...v, phone: e.target.value }))}
            onBlur={() => handleBlur("phone")}
            aria-required="true"
            aria-invalid={touched.phone && !!errors.phone}
            aria-describedby={errors.phone ? "error-phone" : undefined}
            className={cn(
              "w-full h-14 bg-muted border rounded-full px-6 text-sm transition-all duration-200 placeholder:text-muted-foreground/50",
              touched.phone && errors.phone
                ? "border-destructive focus:border-destructive"
                : "border-transparent focus:border-brand-navy"
            )}
            placeholder="+56 9 ..."
            type="tel"
          />
          {touched.phone && errors.phone && (
            <p id="error-phone" className="text-xs text-destructive px-4 mt-1" role="alert">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="area-select" className="text-xs font-bold text-brand-navy px-1 tracking-[0.1em] uppercase">
            Área de interés
          </label>
          <AnimatedSelect
            id="area-select"
            options={formAreas}
            value={selectedArea}
            onChange={setSelectedArea}
            label="Área de Interés"
          />
        </div>

        <button
          type="submit"
          className="w-full h-14 bg-primary text-primary-foreground rounded-full font-semibold shadow-[0px_8px_24px_rgba(63,173,254,0.3)] hover:shadow-[0px_8px_32px_rgba(63,173,254,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Solicitar Diagnóstico Legal
        </button>
      </form>

      <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-brand-navy/5">
        <CheckCircle2 className="size-5 text-brand-navy shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Sus datos están protegidos bajo estrictos protocolos de confidencialidad y secreto profesional.
        </p>
      </div>
    </div>
  )
}
