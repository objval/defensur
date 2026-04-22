"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock,
  Gavel,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MoonStar,
  Phone,
  Scale,
  ShieldCheck,
  SunMedium,
  Users,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedSelect, type SelectOption } from "@/components/animated-select"
import { WhyDefensur } from "@/components/why-defensur"
import { TeamSection } from "@/components/team-section"
import { cn } from "@/lib/utils"

// ─── Data ───────────────────────────────────────────────────────────────────

const navGroups = [
  {
    label: "Quiénes Somos",
    href: "/quienes-somos/",
    items: [
      { label: "Nuestro estudio", href: "/quienes-somos/" },
      { label: "Nicolás Yáñez", href: "/nicolas-yanez/" },
    ],
  },
  {
    label: "Servicios",
    href: "/derecho-laboral-temuco/",
    items: [
      { label: "Derecho Laboral", href: "/derecho-laboral-temuco/" },
      { label: "Derecho de Familia", href: "/abogados-familia-temuco/" },
      { label: "Derecho Civil", href: "/derecho-civil-temuco/" },
      { label: "Insolvencia y Reemprendimiento", href: "/insolvencia-y-reemprendimiento-temuco/" },
      { label: "Sumarios Administrativos", href: "/sumarios-administrativos-temuco/" },
    ],
  },
]

const utilityLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100057113543073" },
  { label: "Instagram", href: "https://www.instagram.com/defensur.estudiojuridico/" },
  { label: "TikTok", href: "https://www.tiktok.com/@defensur.estudiojuridico" },
  { label: "WhatsApp", href: "https://wa.me/56959937355" },
]

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
    `Hola Defensur, necesito orientación jurídica.`,
    values.area ? `Área: ${areaLabel}.` : "",
    values.name ? `Nombre: ${values.name}.` : "",
    values.email ? `Correo: ${values.email}.` : "",
    values.phone ? `Teléfono: ${values.phone}.` : "",
  ].filter(Boolean)
  return `https://wa.me/56959937355?text=${encodeURIComponent(lines.join("\n"))}`
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

// ─── Theme toggle ───────────────────────────────────────────────────────────

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={resolvedTheme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/60 transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {resolvedTheme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </button>
  )
}

// ─── Desktop nav ────────────────────────────────────────────────────────────

function DesktopNav() {
  return (
    <nav className="hidden items-center gap-8 md:flex" role="navigation" aria-label="Navegación principal">
      <Link
        href="/"
        className="font-[family-name:var(--font-heading)] text-sm tracking-wide text-primary border-b-2 border-primary pb-1 transition-colors duration-300"
        aria-current="page"
      >
        Inicio
      </Link>

      {navGroups.map((group) => (
        <div key={group.label} className="group relative">
          <Link
            href={group.href}
            className="font-[family-name:var(--font-heading)] text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-1"
            aria-haspopup="true"
          >
            {group.label}
            <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
          </Link>

          <div className="pointer-events-none absolute left-0 top-full z-20 w-72 translate-y-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-1 group-focus-within:opacity-100">
            <div className="rounded-2xl border border-border bg-popover p-2 shadow-lg">
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-popover-foreground transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 opacity-40" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </nav>
  )
}

// ─── Mobile nav ─────────────────────────────────────────────────────────────

function MobileNav({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors duration-150 hover:bg-accent"
        aria-expanded={open}
        aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>

      <div
        className={cn(
          "absolute inset-x-4 top-20 overflow-hidden rounded-3xl border border-border bg-popover/96 shadow-lg backdrop-blur-xl transition-[max-height,opacity] duration-300",
          open ? "max-h-[70svh] opacity-100" : "max-h-0 opacity-0 border-transparent"
        )}
        role="navigation"
        aria-label="Navegación móvil"
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          <Link href="/" className="text-base font-semibold text-primary">
            Inicio
          </Link>
          {navGroups.map((group) => (
            <details key={group.label} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-foreground">
                {group.label}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="mt-3 flex flex-col gap-2 pl-4">
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors duration-150 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
          <Button asChild className="mt-2 h-12 rounded-full text-sm font-semibold">
            <Link href="/contacto/">Contáctanos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── Success overlay ────────────────────────────────────────────────────────

function SuccessOverlay({ onReset }: { onReset: () => void }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-card/95 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-5 px-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-sky/10 text-brand-sky">
          <CheckCircle2 className="h-8 w-8" />
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
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Respuesta en 24h
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Confidencial
          </span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="mt-2 text-sm font-medium text-brand-navy hover:text-brand-sky-secondary transition-colors dark:text-brand-on-navy-muted dark:hover:text-white"
        >
          Enviar otra consulta
        </button>
      </div>
    </div>
  )
}

// ─── Main hero ──────────────────────────────────────────────────────────────

export function DefensurHomeHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [selectedArea, setSelectedArea] = React.useState(formAreas[0].value)
  const [formValues, setFormValues] = React.useState<Omit<FormValues, "area">>({ name: "", email: "", phone: "" })
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = React.useState(false)

  // Validate on touch
  React.useEffect(() => {
    if (Object.keys(touched).length > 0) {
      setErrors(validateForm(formValues))
    }
  }, [formValues, touched])

  function handleBlur(field: keyof Omit<FormValues, "area">) {
    setTouched((t) => ({ ...t, [field]: true }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationErrors = validateForm(formValues)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, phone: true })

    if (Object.keys(validationErrors).length > 0) return

    const fullValues: FormValues = { ...formValues, area: selectedArea }
    window.open(buildWhatsAppLink(fullValues), "_blank", "noopener,noreferrer")
    setSubmitted(true)
  }

  function handleReset() {
    setFormValues({ name: "", email: "", phone: "" })
    setErrors({})
    setTouched({})
    setSubmitted(false)
  }

  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
      {/* ── Floating pill navbar ──────────────────────────────────────────── */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-border bg-background/80 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 py-2.5 md:py-3 z-50 shadow-sm"
        role="navigation"
        aria-label="Barra de navegación"
      >
        <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2 font-[family-name:var(--font-heading)]">
          <Gavel className="h-6 w-6" aria-hidden="true" />
          Defensur
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          {/* Mobile: WhatsApp quick CTA */}
          <a
            href="https://wa.me/56959937355?text=Hola%20Defensur%2C%20necesito%20orientaci%C3%B3n%20jur%C3%ADdica."
            target="_blank"
            rel="noreferrer"
            aria-label="Contactar por WhatsApp"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-brand-sky px-3.5 text-xs font-semibold text-white shadow-[0px_4px_12px_rgba(63,173,254,0.3)] transition-all hover:shadow-[0px_4px_16px_rgba(63,173,254,0.4)] active:scale-95 md:hidden"
          >
            WhatsApp
          </a>
          <Button
            asChild
            className="rounded-full px-6 py-2.5 text-sm font-semibold active:scale-95 hidden md:inline-flex"
          >
            <Link href="/contacto/">Contáctanos</Link>
          </Button>
          <MobileNav open={mobileMenuOpen} onToggle={() => setMobileMenuOpen((v) => !v)} />
        </div>
      </nav>

      {/* ── Hero section ─────────────────────────────────────────────────── */}
      <main>
        <section className="relative z-10 pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-12 lg:px-24 max-w-7xl mx-auto" aria-label="Inicio">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center">
            {/* ── Left column ───────────────────────────────────────────────── */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Service tags — horizontally scrollable on mobile */}
              <div className="flex flex-nowrap md:flex-wrap gap-3 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:overflow-visible scrollbar-none" role="list" aria-label="Áreas de práctica">
                {["DERECHO LABORAL", "DERECHO DE FAMILIA", "DERECHO CIVIL"].map((tag) => (
                  <span
                    key={tag}
                    role="listitem"
                    className="bg-brand-navy/8 text-brand-navy px-4 py-1.5 rounded-full text-[11px] leading-none tracking-[0.1em] font-bold hover:-translate-y-0.5 transition-transform cursor-default whitespace-nowrap shrink-0"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Headline + subtitle */}
              <div className="space-y-5">
                <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2.2rem,8vw,4.5rem)] leading-[1.08] tracking-[-0.02em] font-bold text-primary max-w-2xl">
                  Justicia con <br />
                  <span className="italic font-normal">Arquitectura Legal.</span>
                </h1>
                <p className="text-lg leading-[1.7] text-muted-foreground max-w-xl">
                  Protegemos sus intereses con una estructura legal sólida y sofisticada. Defensur combina la tradición jurídica con la agilidad contemporánea.
                </p>
                {/* Mobile: quick contact */}
                <div className="flex flex-col gap-3 md:hidden">
                  <a
                    href="tel:+56959937355"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy"
                    aria-label="Llamar ahora"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    +56 9 5993 7355
                  </a>
                  <p className="text-xs text-muted-foreground">
                    Atención presencial y por WhatsApp · Lun–Vie 09:00–18:00
                  </p>
                </div>
              </div>

              {/* Team avatars + years */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-3" aria-label="Equipo de abogados">
                  {[
                    { initials: "NY", bg: "bg-brand-navy" },
                    { initials: "SP", bg: "bg-brand-sky" },
                    { initials: "AS", bg: "bg-brand-red" },
                  ].map((member) => (
                    <div
                      key={member.initials}
                      className={cn(
                        "w-12 h-12 rounded-full border-2 border-background flex items-center justify-center text-brand-on-navy text-sm font-bold shadow-sm",
                        member.bg
                      )}
                      aria-hidden="true"
                    >
                      {member.initials}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-primary text-sm">+15 Años de Excelencia</p>
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.1em] font-bold">
                    Firma Líder Regional
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right column: form card ───────────────────────────────────── */}
            <div className="lg:col-span-5 relative lg:-ml-12">
              <div className="relative bg-white/85 backdrop-blur-xl p-6 md:p-10 rounded-2xl shadow-[0px_32px_64px_rgba(8,24,107,0.08)] border border-white/40 dark:bg-white/[0.06] dark:border-white/10 dark:shadow-[0px_32px_64px_rgba(0,0,0,0.35)]">
                {/* Success overlay */}
                {submitted && <SuccessOverlay onReset={handleReset} />}

                {/* Form header */}
                <div className="mb-6 md:mb-8">
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-semibold text-primary mb-2">
                    Consulta Especializada
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Inicie su proceso legal con una evaluación estratégica de su caso.
                  </p>
                </div>

                {/* Form */}
                <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit} noValidate>
                  {/* Nombre */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-name" className="text-xs font-bold text-brand-navy px-4 tracking-[0.1em] uppercase dark:text-brand-on-navy-muted">
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

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-email" className="text-xs font-bold text-brand-navy px-4 tracking-[0.1em] uppercase dark:text-brand-on-navy-muted">
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

                  {/* Teléfono */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-phone" className="text-xs font-bold text-brand-navy px-4 tracking-[0.1em] uppercase dark:text-brand-on-navy-muted">
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

                  {/* Area selector */}
                  <div className="space-y-1.5">
                    <label id="area-label" className="text-xs font-bold text-brand-navy px-1 tracking-[0.1em] uppercase dark:text-brand-on-navy-muted">
                      Área de interés
                    </label>
                    <AnimatedSelect
                      options={formAreas}
                      value={selectedArea}
                      onChange={setSelectedArea}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-14 bg-primary text-primary-foreground rounded-full font-semibold shadow-[0px_8px_24px_rgba(63,173,254,0.3)] hover:shadow-[0px_8px_32px_rgba(63,173,254,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Solicitar Diagnóstico Legal
                  </button>
                </form>

                {/* Trust badge */}
                <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-brand-navy/5 dark:bg-brand-on-navy-muted/5">
                  <CheckCircle2 className="h-5 w-5 text-brand-navy shrink-0 mt-0.5 dark:text-brand-on-navy-muted" aria-hidden="true" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Sus datos están protegidos bajo estrictos protocolos de confidencialidad y secreto profesional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Defensur (marquee + values) ──────────────────────────────── */}
        <WhyDefensur />

        {/* ── Team ──────────────────────────────────────────────────────────── */}
        <TeamSection />

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <footer className="w-full border-t border-border bg-muted/30" role="contentinfo">
          <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Column 1: Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Gavel className="h-5 w-5 text-brand-navy" aria-hidden="true" />
                  <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-primary">Defensur</span>
                </div>
                <p className="text-sm text-muted-foreground leading-6 max-w-[28ch]">
                  Estudio jurídico especializado en derecho laboral, civil, de familia e insolvencia en Temuco.
                </p>
                <div className="flex gap-2">
                  {utilityLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-navy/20 hover:text-brand-navy hover:bg-brand-navy/5 dark:hover:text-brand-on-navy-muted"
                    >
                      <span className="text-xs font-bold">{link.label.charAt(0)}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 2: Servicios */}
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-primary uppercase tracking-[0.1em]">Servicios</h5>
                <nav aria-label="Enlaces de servicios">
                  <ul className="space-y-3">
                    {[
                      { label: "Derecho Laboral", href: "/derecho-laboral-temuco/" },
                      { label: "Derecho de Familia", href: "/abogados-familia-temuco/" },
                      { label: "Derecho Civil", href: "/derecho-civil-temuco/" },
                      { label: "Insolvencia", href: "/insolvencia-y-reemprendimiento-temuco/" },
                      { label: "Sumarios Administrativos", href: "/sumarios-administrativos-temuco/" },
                    ].map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Column 3: Empresa */}
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-primary uppercase tracking-[0.1em]">Empresa</h5>
                <nav aria-label="Enlaces de empresa">
                  <ul className="space-y-3">
                    {[
                      { label: "Quiénes Somos", href: "/quienes-somos/" },
                      { label: "Nicolás Yáñez", href: "/nicolas-yanez/" },
                      { label: "Sentencias Destacadas", href: "/sentencias/" },
                      { label: "Contacto", href: "/contacto/" },
                    ].map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Column 4: Contacto */}
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-primary uppercase tracking-[0.1em]">Contacto</h5>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="tel:+56959937355"
                      className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4 text-brand-sky shrink-0" aria-hidden="true" />
                      +56 9 5993 7355
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:consultas@defensur.cl"
                      className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4 text-brand-sky shrink-0" aria-hidden="true" />
                      consultas@defensur.cl
                    </a>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-brand-sky shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Antonio Varas 687, Oficina 1405, Temuco</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-brand-sky shrink-0" aria-hidden="true" />
                    <span>Lun–Vie 09:00–14:00 y 15:00–18:00</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sub-footer */}
            <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground">
                © 2026 Defensur Estudio Jurídico. Todos los derechos reservados.
              </p>
              <div className="flex gap-6">
                <Link href="/privacidad" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Privacidad
                </Link>
                <Link href="/terminos" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Términos de Uso
                </Link>
                <Link href="/contacto" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Aviso Legal
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
