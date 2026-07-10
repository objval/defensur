"use client"

import * as React from "react"
import { useMutation, useQuery } from "convex/react"
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Loader2,
  MapPin,
  Monitor,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react"
import { api } from "@/convex/_generated/api"
import { cn } from "@/lib/utils"

// ── Types & constants ────────────────────────────────────────────────────────

type Area = "laboral" | "familia" | "civil" | "insolvencia" | "sumarios"
type Modality = "presencial" | "online"

const AREAS = [
  { value: "laboral" as const, label: "Laboral", icon: Scale },
  { value: "familia" as const, label: "Familia", icon: Users },
  { value: "civil" as const, label: "Civil", icon: BriefcaseBusiness },
  { value: "insolvencia" as const, label: "Insolvencia", icon: Landmark },
  { value: "sumarios" as const, label: "Sumarios", icon: ShieldCheck },
]

const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"] as const
const WEEKDAYS = ["Lu","Ma","Mi","Ju","Vi","Sá","Do"] as const
const TIME_SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"] as const

function daysInMonth(y: number, m: number) { return new Date(y, m+1, 0).getDate() }
function startWeekday(y: number, m: number) { const r = new Date(y, m, 1).getDay(); return r===0?6:r-1 }
function isSameDay(a: Date, b: Date) { return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate() }
function isToday(d: Date) { return isSameDay(d, new Date()) }
function isSlotPast(date: Date, slot: string) { const [h,m]=slot.split(":").map(Number) as [number,number]; return new Date(date.getFullYear(),date.getMonth(),date.getDate(),h,m)<=new Date() }

function cleanRut(rut: string) { return rut.replace(/[^0-9kK]/g,"").toUpperCase() }
function validateRut(raw: string) { const c=cleanRut(raw); if(c.length<2||c.length>10)return false; const b=c.slice(0,-1),dv=c.slice(-1); if(!/^\d+$/.test(b))return false; let s=0,m=2; for(let i=b.length-1;i>=0;i--){s+=parseInt(b[i]!)*m;m=m===7?2:m+1} const x=11-(s%11); return dv===(x===11?"0":x===10?"K":x.toString()) }
function formatRut(raw: string) { const c=cleanRut(raw); if(c.length<2)return raw; const b=c.slice(0,-1),dv=c.slice(-1); const ch=b.split(""); let f=""; for(let i=0;i<ch.length;i++){f=ch[ch.length-1-i]!+f;if((i+1)%3===0&&i!==ch.length-1)f="."+f} return f+"-"+dv }
function getErrorMessage(error: unknown) { return error instanceof Error && error.message.trim() ? error.message : "Error al enviar. Intenta de nuevo." }
function getMessageHelperText(message: string) {
  const remaining = 20 - message.trim().length
  if (remaining <= 0) return "Descripción lista para continuar."
  return `Faltan ${remaining} caracteres para poder continuar.`
}

const STEPS = ["Área y modo","Tus datos","Agenda"] as const

// ── Component ────────────────────────────────────────────────────────────────

export function HeroContactForm() {
  const submitPublic = useMutation(api.consultas.submitPublic)

  const [step, setStep] = React.useState(0)
  const [area, setArea] = React.useState<Area>("laboral")
  const [modality, setModality] = React.useState<Modality>("presencial")
  const [name, setName] = React.useState("")
  const [rut, setRut] = React.useState("")
  const [rutTouched, setRutTouched] = React.useState(false)
  const [phone, setPhone] = React.useState("+569")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [selDate, setSelDate] = React.useState<Date | null>(null)
  const bookedSlots = useQuery(api.consultas.getBookedSlots, selDate ? { scheduledDate: selDate.getTime() } : "skip") ?? []
  const [selTime, setSelTime] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) { const v=e.target.value; setPhone(v.startsWith("+569")?v:"+569") }
  function handleRutBlur() { setRutTouched(true); if(rut.trim())setRut(formatRut(rut)) }

  function canAdvance(): boolean {
    if (step===0) return true
    if (step===1) return name.trim().length>=2 && phone.length>4 && email.includes("@") && message.trim().length>=20 && (!rut.trim()||validateRut(rut))
    return selDate!==null && selTime!==null
  }

  function validateStep1(): string | null {
    if (name.trim().length < 2) return "Ingresa tu nombre completo."
    if (rut.trim() && !validateRut(rut)) return "El RUT ingresado no es válido."
    if (!phone.trim() || phone === "+569") return "Ingresa tu teléfono."
    if (!email.trim()) return "Ingresa tu correo electrónico."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "El correo no es válido."
    if (message.trim().length < 20) return "Describe tu caso con al menos 20 caracteres."
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationError = validateStep1()
    if (validationError) {
      setError(validationError)
      return
    }
    if(!selDate||!selTime){setError("Selecciona día y hora");return}
    setSubmitting(true); setError(null)
    try {
      await submitPublic({ name:name.trim(), email:email.trim(), phone:phone.trim(), rut:rut.trim()||undefined, area, subject:`Consulta ${area} — ${name.trim()}`, description:message.trim(), modality, urgency:"media", scheduledDate:selDate?selDate.getTime():undefined, scheduledTime:selTime??undefined })
      setDone(true)
    } catch (error) { setError(getErrorMessage(error)) }
    finally { setSubmitting(false) }
  }

  const rutState = rutTouched&&rut.trim()?(validateRut(rut)?"valid":"invalid"):"empty"

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      {/* Step indicator */}
      <div className="flex items-center gap-2 px-6 py-3.5 border-b border-border bg-muted/30">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <span className={cn("flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold transition-colors", i<step?"bg-green-100 text-green-700":i===step?"bg-brand-navy text-white":"bg-muted text-muted-foreground")}>
              {i<step?"✓":i+1}
            </span>
            <span className={cn("text-[11px] font-semibold uppercase tracking-wider", i===step?"text-brand-navy":"text-muted-foreground")}>{s}</span>
            {i<STEPS.length-1 && <div className="flex-1 h-px bg-border mx-1" />}
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {done ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="size-7 text-green-600" />
            </div>
            <p className="font-[family-name:var(--font-heading)] text-xl font-bold">¡Recibido!</p>
            <p className="text-sm text-muted-foreground max-w-[280px]">Te contactaremos en menos de 24 horas.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">{error}</div>}

            {/* Step 0: Area + Modality */}
            {step===0 && (
              <div className="flex flex-col gap-5">
                <p className="text-sm font-semibold text-foreground">¿En qué área necesitas ayuda?</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {AREAS.map(a=>{const I=a.icon;const is=area===a.value;return <button key={a.value} type="button" onClick={()=>setArea(a.value)} className={cn("flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all text-center", is?"border-brand-navy/30 bg-brand-navy/[0.04]":"border-border hover:border-brand-navy/15")}><I className={cn("size-5",is?"text-brand-navy":"text-muted-foreground")}/><span className={cn("text-[11px] font-semibold leading-tight",is?"text-brand-navy":"text-muted-foreground")}>{a.label}</span></button>})}
                </div>

                <div className="flex p-1 bg-muted rounded-lg border border-border">
                  {([{v:"presencial"as const,i:MapPin,l:"Presencial"},{v:"online"as const,i:Monitor,l:"Videollamada"}]as const).map(o=>{const I=o.i;const is=modality===o.v;return <button key={o.v} type="button" onClick={()=>setModality(o.v)} className={cn("flex-1 py-2.5 rounded-md flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all",is?"bg-card shadow-sm border border-border text-brand-navy":"bg-transparent text-muted-foreground hover:text-foreground")}><I className="size-3.5"/>{o.l}</button>})}
                </div>
              </div>
            )}

            {/* Step 1: Personal data */}
            {step===1 && (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Nombre</label>
                    <input value={name} onChange={e=>setName(e.target.value)} className="h-11 bg-card border border-border rounded-lg px-4 text-sm focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/30 placeholder:text-muted-foreground/50" placeholder="Tu nombre completo" type="text"/>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">RUT</label>
                    <input value={rut} onChange={e=>setRut(e.target.value)} onBlur={handleRutBlur} className={cn("h-11 bg-card border rounded-lg px-4 text-sm focus:outline-none focus:ring-1 placeholder:text-muted-foreground/50",rutTouched&&rut.trim()?rutState==="valid"?"border-green-400":"border-red-300":"border-border focus:border-brand-sky focus:ring-brand-sky/30")} placeholder="12.345.678-9" type="text"/>
                    {rutTouched&&rut.trim()&&rutState==="valid"&&<p className="text-[10px] text-green-600">RUT válido</p>}
                    {rutTouched&&rut.trim()&&rutState==="invalid"&&<p className="text-[10px] text-red-500">RUT inválido</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Teléfono</label>
                    <input value={phone} onChange={handlePhone} className="h-11 bg-card border border-border rounded-lg px-4 text-sm focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/30" type="tel"/>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
                    <input value={email} onChange={e=>setEmail(e.target.value)} className="h-11 bg-card border border-border rounded-lg px-4 text-sm focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/30 placeholder:text-muted-foreground/50" placeholder="correo@ejemplo.cl" type="email"/>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Describe tu caso</label>
                  <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={4} className="bg-card border border-border rounded-lg p-4 text-sm focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/30 resize-none placeholder:text-muted-foreground/50" placeholder="Breve descripción de tu situación..."/>
                  <p className={cn("text-xs font-medium", message.trim().length >= 20 ? "text-green-700" : "text-amber-700")}>{getMessageHelperText(message)}</p>
                </div>
              </div>
            )}

            {/* Step 2: Date/Time */}
            {step===2 && (
              <CompactCalendar selDate={selDate} onSelDate={d=>{setSelDate(d);setSelTime(null)}} selTime={selTime} onSelTime={setSelTime} bookedSlots={selDate?bookedSlots:[]} />
            )}

            {/* Navigation */}
            <div className="flex items-center gap-2 pt-3 border-t border-border">
              {step>0 && (
                <button type="button" onClick={()=>{setStep(s=>s-1);setError(null)}} className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="size-3.5"/> Atrás
                </button>
              )}
              <div className="flex-1"/>
              {step<2 ? (
                <button type="button" onClick={()=>{const validationError=validateStep1();if(step===1&&validationError){setError(validationError);return}if(canAdvance()){setStep(s=>s+1);setError(null)}}} className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-navy text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-brand-navy/90 transition-colors shadow-sm">
                  Siguiente <ArrowRight className="size-3.5"/>
                </button>
              ) : (
                <button type="submit" disabled={submitting} className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-navy text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-brand-navy/90 transition-colors shadow-sm disabled:opacity-50">
                  {submitting?<><Loader2 className="size-3.5 animate-spin"/>Enviando...</>:<>Agendar <ArrowRight className="size-3.5"/></>}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

// ── Calendar ─────────────────────────────────────────────────────────────────

function CompactCalendar({selDate,onSelDate,selTime,onSelTime,bookedSlots}:{selDate:Date|null;onSelDate:(d:Date)=>void;selTime:string|null;onSelTime:(t:string)=>void;bookedSlots:string[]}) {
  const now=new Date()
  const [vy,svy]=React.useState(now.getFullYear())
  const [vm,svm]=React.useState(now.getMonth())
  const td=daysInMonth(vy,vm); const off=startWeekday(vy,vm)

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-border">
          <button type="button" onClick={()=>{if(vm===0){svm(11);svy(y=>y-1)}else svm(m=>m-1)}} className="flex size-7 items-center justify-center rounded text-muted-foreground hover:bg-muted"><ChevronLeft className="size-4"/></button>
          <span className="text-xs font-semibold">{MONTHS[vm]} {vy}</span>
          <button type="button" onClick={()=>{if(vm===11){svm(0);svy(y=>y+1)}else svm(m=>m+1)}} className="flex size-7 items-center justify-center rounded text-muted-foreground hover:bg-muted"><ChevronRight className="size-4"/></button>
        </div>
        <div className="grid grid-cols-7 px-2 pt-1.5">
          {WEEKDAYS.map(w=><div key={w} className="flex h-6 items-center justify-center text-[10px] font-semibold text-muted-foreground">{w}</div>)}
        </div>
        <div className="grid grid-cols-7 px-2 pb-2">
          {Array.from({length:off}).map((_,i)=><div key={`e-${i}`} className="h-8"/>)}
          {Array.from({length:td}).map((_,i)=>{const d=i+1;const date=new Date(vy,vm,d);const is=selDate?isSameDay(date,selDate):false;const today=isToday(date);const past=date<new Date(new Date().setHours(0,0,0,0));return <button key={d} type="button" disabled={past} onClick={()=>onSelDate(date)} className={cn("h-8 rounded text-xs transition-colors",past?"text-muted-foreground/30":is?"bg-brand-navy text-white font-semibold":today?"text-brand-navy font-semibold hover:bg-brand-navy/8":"hover:bg-muted")}>{d}</button>})}
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {selDate?(<>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Horarios disponibles</p>
            <div className="grid grid-cols-3 gap-1.5">
              {TIME_SLOTS.map(s=>{const past=isSlotPast(selDate,s);const taken=bookedSlots.includes(s);return <button key={s} type="button" disabled={past||taken} onClick={()=>onSelTime(s)} className={cn("py-2 rounded border text-[11px] font-medium transition-all",past||taken?"border-border bg-muted/30 text-muted-foreground/30 cursor-default":selTime===s?"border-brand-navy bg-brand-navy text-white":"border-border hover:border-brand-sky/50")}>{s}{taken&&!past&&<span className="block text-[8px] leading-none text-muted-foreground/50">ocupado</span>}</button>})}
            </div>
          </div>
        </>):(<p className="text-xs text-muted-foreground text-center mt-6">Elige un día para ver horarios</p>)}
      </div>
    </div>
  )
}
