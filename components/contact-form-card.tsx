"use client"

import * as React from "react"
import { useMutation, useQuery, useConvexAuth } from "convex/react"
import { useUser } from "@clerk/nextjs"
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarIcon,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Lock,
  MapPin,
  Monitor,
  Scale,
  ShieldCheck,
  Users,
  Loader2,
} from "lucide-react"
import { api } from "@/convex/_generated/api"
import { cn } from "@/lib/utils"

// ── Types & Constants ────────────────────────────────────────────────────────

type Area = "laboral" | "familia" | "civil" | "insolvencia" | "sumarios"
type Modality = "presencial" | "online"

const AREAS = [
  { value: "laboral" as const, label: "Laboral", icon: Scale },
  { value: "familia" as const, label: "Familia", icon: Users },
  { value: "civil" as const, label: "Civil", icon: BriefcaseBusiness },
  { value: "insolvencia" as const, label: "Insolvencia", icon: Landmark },
  { value: "sumarios" as const, label: "Sumarios", icon: ShieldCheck },
]

const MODALITY_OPTIONS = [
  { value: "presencial" as const, label: "Presencial en Temuco", icon: MapPin },
  { value: "online" as const, label: "Videollamada Segura", icon: Monitor },
]

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
] as const

const WEEKDAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"] as const
const TIME_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"] as const

// ── RUT Validation ───────────────────────────────────────────────────────────

function cleanRut(rut: string): string {
  return rut.replace(/[^0-9kK]/g, "").toUpperCase()
}

function validateRut(raw: string): boolean {
  const cleaned = cleanRut(raw)
  if (cleaned.length < 2 || cleaned.length > 10) return false
  const body = cleaned.slice(0, -1)
  const dv = cleaned.slice(-1)
  if (!/^\d+$/.test(body)) return false
  let sum = 0
  let mul = 2
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]!) * mul
    mul = mul === 7 ? 2 : mul + 1
  }
  const expected = 11 - (sum % 11)
  const expectedDv = expected === 11 ? "0" : expected === 10 ? "K" : expected.toString()
  return dv === expectedDv
}

function formatRut(raw: string): string {
  const cleaned = cleanRut(raw)
  if (cleaned.length < 2) return raw
  const body = cleaned.slice(0, -1)
  const dv = cleaned.slice(-1)
  const chars = body.split("")
  let formatted = ""
  for (let i = 0; i < chars.length; i++) {
    formatted = chars[chars.length - 1 - i]! + formatted
    if ((i + 1) % 3 === 0 && i !== chars.length - 1) formatted = "." + formatted
  }
  return formatted + "-" + dv
}

function rutFeedback(raw: string): "valid" | "invalid" | "empty" {
  if (!raw.trim()) return "empty"
  return validateRut(raw) ? "valid" : "invalid"
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error && error.message.trim()
    ? error.message
    : "Error al enviar. Intente nuevamente."
}

function getMessageHelperText(message: string): string {
  const remaining = 20 - message.trim().length
  if (remaining <= 0) return "Descripción lista para continuar."
  return `Faltan ${remaining} caracteres para poder continuar.`
}

// ── Calendar Helpers ─────────────────────────────────────────────────────────

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function startWeekday(year: number, month: number): number {
  const raw = new Date(year, month, 1).getDay()
  return raw === 0 ? 6 : raw - 1
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date())
}

function formatDate(d: Date): string {
  return `${d.getDate()} de ${MONTHS[d.getMonth()]!.toLowerCase()}`
}

function isSlotPast(date: Date, slot: string): boolean {
  const now = new Date()
  const [h, m] = slot.split(":").map(Number) as [number, number]
  const slotDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m)
  return slotDate <= now
}

// ── Public API ───────────────────────────────────────────────────────────────

export function ContactFormCard() {
  const { isLoading: convexLoading } = useConvexAuth()
  const { isLoaded: clerkLoaded } = useUser()

  if (!clerkLoaded || convexLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm animate-pulse">
        <div className="h-6 w-48 rounded bg-muted mb-6" />
        <div className="space-y-4">
          <div className="h-24 rounded bg-muted" />
          <div className="h-12 rounded bg-muted" />
          <div className="h-32 rounded bg-muted" />
        </div>
      </div>
    )
  }

  return <FormInner />
}

// ── Form Inner ───────────────────────────────────────────────────────────────

function FormInner() {
  const submitPublic = useMutation(api.consultas.submitPublic)
  const { user } = useUser()

  const [area, setArea] = React.useState<Area>("laboral")
  const [modality, setModality] = React.useState<Modality>("presencial")
  const [name, setName] = React.useState(user?.fullName ?? "")
  const [rut, setRut] = React.useState("")
  const [phone, setPhone] = React.useState("+569")
  const [email, setEmail] = React.useState(user?.primaryEmailAddress?.emailAddress ?? "")
  const [message, setMessage] = React.useState("")
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const bookedSlots = useQuery(api.consultas.getBookedSlots, selectedDate ? { scheduledDate: selectedDate.getTime() } : "skip") ?? []
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null)
  const [phase, setPhase] = React.useState<1 | 2>(1)
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [rutTouched, setRutTouched] = React.useState(false)

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (!val.startsWith("+569")) { setPhone("+569"); return }
    setPhone(val)
  }

  function handleRutBlur() {
    setRutTouched(true)
    if (rut.trim()) setRut(formatRut(rut))
  }

  function validatePhase1(): string | null {
    if (!name.trim()) return "Ingrese su nombre completo."
    if (rut.trim() && !validateRut(rut)) return "El RUT ingresado no es válido."
    if (!phone.trim() || phone === "+569") return "Ingrese su teléfono."
    if (!email.trim()) return "Ingrese su correo electrónico."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "El correo no es válido."
    if (!message.trim()) return "Describa brevemente su caso."
    if (message.trim().length < 20) return "La descripción debe tener al menos 20 caracteres."
    return null
  }

  function goToPhase2() {
    const err = validatePhase1()
    if (err) { setError(err); return }
    setError(null)
    setPhase(2)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationError = validatePhase1()
    if (validationError) {
      setError(validationError)
      return
    }
    if (!selectedDate || !selectedTime) {
      setError("Seleccione un día y hora para su consulta.")
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      await submitPublic({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        rut: rut.trim() || undefined,
        area,
        subject: `Consulta ${area} — ${name.trim()}`,
        description: message.trim(),
        modality,
        urgency: "media",
        scheduledDate: selectedDate ? selectedDate.getTime() : undefined,
        scheduledTime: selectedTime ?? undefined,
      })
      setSubmitted(true)
    } catch (error) {
      setError(getErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  function handleReset() {
    setName(user?.fullName ?? "")
    setRut("")
    setRutTouched(false)
    setPhone("+569")
    setEmail(user?.primaryEmailAddress?.emailAddress ?? "")
    setMessage("")
    setArea("laboral")
    setModality("presencial")
    setSelectedDate(null)
    setSelectedTime(null)
    setPhase(1)
    setSubmitted(false)
    setError(null)
  }

  const rutState = rutFeedback(rut)

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden">
      {submitted && (
        <div className="absolute inset-0 bg-card z-10 flex flex-col items-center justify-center p-8 text-center rounded-xl">
          <div className="w-16 h-16 rounded flex items-center justify-center mb-6 bg-green-50 border border-green-200">
            <CheckCircle2 className="size-8 text-green-600" />
          </div>
          <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground mb-2">
            Solicitud Recibida
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Hemos registrado su consulta. Un abogado revisará los antecedentes y
            se pondrá en contacto dentro de las próximas 24 horas hábiles.
          </p>
          <button
            onClick={handleReset}
            className="mt-8 px-6 py-2.5 bg-muted border border-border text-foreground text-xs font-semibold tracking-wider uppercase rounded hover:bg-muted/80 transition-colors"
            type="button"
          >
            ENVIAR OTRA CONSULTA
          </button>
        </div>
      )}

      <div className={cn(submitted && "opacity-0 pointer-events-none")}>
        <div className="mb-8 border-b border-border pb-6">
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
            Evaluación Preliminar
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Complete este formulario para derivar su caso al especialista adecuado.
          </p>
        </div>

        {/* Phase indicator */}
        <div className="flex items-center gap-2 mb-6">
          <span className={cn("flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold", phase === 1 ? "bg-brand-navy text-white" : "bg-muted text-muted-foreground")}>1</span>
          <span className={cn("text-xs font-semibold", phase === 1 ? "text-brand-navy" : "text-muted-foreground")}>Datos</span>
          <div className="flex-1 h-px bg-border mx-1" />
          <span className={cn("flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold", phase === 2 ? "bg-brand-navy text-white" : "bg-muted text-muted-foreground")}>2</span>
          <span className={cn("text-xs font-semibold", phase === 2 ? "text-brand-navy" : "text-muted-foreground")}>Día y hora</span>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {phase === 1 && (
            <div className="flex flex-col gap-8">
              {/* Area */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold tracking-wider text-foreground uppercase">ÁREA LEGAL REQUERIDA</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {AREAS.map((a) => {
                    const Icon = a.icon
                    const isActive = area === a.value
                    return (
                      <button key={a.value} type="button" onClick={() => setArea(a.value)}
                        className={cn("flex flex-col items-center justify-center p-4 border rounded transition-all", isActive ? "border-brand-sky bg-brand-navy/[0.04]" : "border-border bg-card hover:border-brand-sky/40 hover:bg-muted/50")}>
                        <Icon className={cn("size-5 mb-2", isActive ? "text-brand-navy" : "text-muted-foreground")} />
                        <span className={cn("text-xs font-semibold text-center", isActive ? "text-foreground" : "text-muted-foreground")}>{a.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Modality */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold tracking-wider text-foreground uppercase">PREFERENCIA DE ATENCIÓN</label>
                <div className="flex p-1 bg-muted rounded border border-border">
                  {MODALITY_OPTIONS.map((opt) => {
                    const Icon = opt.icon
                    const isActive = modality === opt.value
                    return (
                      <button key={opt.value} type="button" onClick={() => setModality(opt.value)}
                        className={cn("flex-1 py-2.5 px-4 rounded flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase transition-all", isActive ? "bg-card shadow-sm border border-border text-brand-navy" : "bg-transparent border border-transparent text-muted-foreground hover:text-foreground")}>
                        <Icon className="size-3.5" />{opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Personal data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="hcf-name" className="text-xs font-semibold tracking-wider text-foreground uppercase">NOMBRE COMPLETO</label>
                  <input id="hcf-name" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 bg-card border border-border rounded px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/30 transition-shadow"
                    placeholder="Ej. Juan Pérez" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="hcf-rut" className="text-xs font-semibold tracking-wider text-foreground uppercase">RUT</label>
                  <input id="hcf-rut" value={rut} onChange={(e) => setRut(e.target.value)} onBlur={handleRutBlur}
                    className={cn("w-full h-11 bg-card border rounded px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-shadow",
                      rutTouched && rut.trim() ? rutState === "valid" ? "border-green-400 focus:border-green-500 focus:ring-green-200" : "border-red-300 focus:border-red-400 focus:ring-red-200" : "border-border focus:border-brand-sky focus:ring-brand-sky/30")}
                    placeholder="12.345.678-9" type="text" />
                  {rutTouched && rut.trim() && rutState === "valid" && <p className="text-xs text-green-600">RUT válido</p>}
                  {rutTouched && rut.trim() && rutState === "invalid" && <p className="text-xs text-red-500">RUT inválido</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="hcf-phone" className="text-xs font-semibold tracking-wider text-foreground uppercase">TELÉFONO DE CONTACTO</label>
                  <input id="hcf-phone" value={phone} onChange={handlePhoneChange}
                    className="w-full h-11 bg-card border border-border rounded px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/30 transition-shadow"
                    type="tel" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="hcf-email" className="text-xs font-semibold tracking-wider text-foreground uppercase">CORREO ELECTRÓNICO</label>
                  <input id="hcf-email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 bg-card border border-border rounded px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/30 transition-shadow"
                    placeholder="correo@ejemplo.cl" type="email" />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="hcf-message" className="text-xs font-semibold tracking-wider text-foreground uppercase">DESCRIPCIÓN BREVE DEL CASO</label>
                <textarea id="hcf-message" value={message} onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-card border border-border rounded p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/30 transition-shadow resize-y"
                  placeholder="Describa brevemente su situación legal actual." rows={4} />
                <p className={cn("text-sm font-medium", message.trim().length >= 20 ? "text-green-700" : "text-amber-700")}>{getMessageHelperText(message)}</p>
              </div>

              {/* Continue */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 order-2 sm:order-1">
                  <Lock className="size-3.5" />Tratamiento confidencial de datos.
                </p>
                <button type="button" onClick={goToPhase2}
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-navy text-white text-xs font-semibold tracking-wider uppercase rounded hover:bg-brand-navy/90 transition-colors flex items-center justify-center gap-2 order-1 sm:order-2 shadow-sm">
                  CONTINUAR<ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          )}

          {phase === 2 && (
            <div className="flex flex-col gap-6">
              <button type="button" onClick={() => { setPhase(1); setError(null) }}
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors self-start">
                <ArrowLeft className="size-3.5" />Volver
              </button>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold tracking-wider text-foreground uppercase">DÍA Y HORA DE LA CONSULTA</label>
                <p className="text-sm text-muted-foreground">Seleccione el día y horario. Los horarios son cada 30 minutos.</p>
              </div>

              <CalendarPicker selectedDate={selectedDate} onSelectDate={(d) => { setSelectedDate(d); setSelectedTime(null) }} selectedTime={selectedTime} onSelectTime={setSelectedTime} bookedSlots={bookedSlots} />

              {selectedDate && selectedTime && (
                <div className="flex items-center gap-3 rounded-lg border border-brand-navy/20 bg-brand-navy/[0.03] p-4">
                  <CalendarIcon className="size-5 text-brand-navy shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{formatDate(selectedDate)} a las {selectedTime} hrs.</p>
                    <p className="text-xs text-muted-foreground">{modality === "presencial" ? "Presencial — Antonio Varas 687, Of. 1405, Temuco" : "Videollamada — Recibirá el enlace por correo"}</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 order-2 sm:order-1">
                  <Lock className="size-3.5" />Tratamiento confidencial de datos.
                </p>
                <button type="submit" disabled={submitting || !selectedDate || !selectedTime}
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-navy text-white text-xs font-semibold tracking-wider uppercase rounded hover:bg-brand-navy/90 transition-colors flex items-center justify-center gap-2 order-1 sm:order-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? <><Loader2 className="size-4 animate-spin" />AGENDANDO...</> : <><>AGENDAR CONSULTA</><ArrowRight className="size-4" /></>}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

// ── Calendar Picker ──────────────────────────────────────────────────────────

function CalendarPicker({ selectedDate, onSelectDate, selectedTime, onSelectTime, bookedSlots }: {
  selectedDate: Date | null
  onSelectDate: (d: Date) => void
  selectedTime: string | null
  onSelectTime: (t: string) => void
  bookedSlots: string[]
}) {
  const now = new Date()
  const [viewYear, setViewYear] = React.useState(now.getFullYear())
  const [viewMonth, setViewMonth] = React.useState(now.getMonth())

  const totalDays = daysInMonth(viewYear, viewMonth)
  const offset = startWeekday(viewYear, viewMonth)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2.5 bg-muted/50 border-b border-border">
          <button type="button" onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1) } else setViewMonth((m) => m - 1) }}
            className="flex size-7 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><ChevronLeft className="size-4" /></button>
          <span className="text-sm font-semibold text-foreground">{MONTHS[viewMonth]} {viewYear}</span>
          <button type="button" onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1) } else setViewMonth((m) => m + 1) }}
            className="flex size-7 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><ChevronRight className="size-4" /></button>
        </div>
        <div className="grid grid-cols-7 px-2 pt-2 pb-1">
          {WEEKDAYS.map((w) => <div key={w} className="flex h-7 items-center justify-center text-[10px] font-semibold text-muted-foreground">{w}</div>)}
        </div>
        <div className="grid grid-cols-7 px-2 pb-2">
          {Array.from({ length: offset }).map((_, i) => <div key={`e-${i}`} className="h-9" />)}
          {Array.from({ length: totalDays }).map((_, i) => {
            const day = i + 1
            const date = new Date(viewYear, viewMonth, day)
            const isSel = selectedDate ? isSameDay(date, selectedDate) : false
            const today = isToday(date)
            const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))
            return (
              <button key={day} type="button" disabled={isPast} onClick={() => onSelectDate(date)}
                className={cn("h-9 rounded text-sm transition-colors", isPast ? "text-muted-foreground/30 cursor-default" : isSel ? "bg-brand-navy text-white font-semibold" : today ? "text-brand-navy font-semibold hover:bg-brand-navy/8" : "text-foreground hover:bg-muted")}>
                {day}
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {selectedDate ? (
          <>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Horarios disponibles</p>
              <div className="grid grid-cols-3 gap-1.5">
                {TIME_SLOTS.map((slot) => {
                  const past = isSlotPast(selectedDate, slot)
                  const taken = bookedSlots.includes(slot)
                  const disabled = past || taken
                  return (
                    <button key={slot} type="button" disabled={disabled} onClick={() => onSelectTime(slot)}
                      className={cn("py-2 px-2 rounded border text-xs font-medium transition-all", disabled ? "border-border bg-muted/30 text-muted-foreground/40 cursor-default" : selectedTime === slot ? "border-brand-navy bg-brand-navy text-white" : "border-border bg-card text-foreground hover:border-brand-sky/50")}>
                      {slot}{taken && !past && <span className="block text-[9px] leading-none text-muted-foreground/40">ocupado</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">Seleccione un día para ver horarios.</div>
        )}
      </div>
    </div>
  )
}
