"use client"

import * as React from "react"
import { PageHero } from "@/components/page-hero"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calculator,
  Landmark,
  HelpCircle,
  AlertTriangle,
  ShieldCheck,
  Clock,
  CalendarCheck,
  CalendarClock,
  History,
  Baby,
  Users,
  Users2,
  UsersRound,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Scale,
} from "lucide-react"
import { AnimatedSelect, type SelectOption } from "@/components/animated-select"

// ── Select Options ────────────────────────────────────────────────────────

const horasJornadaOptions: SelectOption[] = [
  {
    id: "44",
    label: "44 horas",
    value: "44",
    icon: Clock,
    description: "Jornada vigente — tope legal actual",
  },
  {
    id: "42",
    label: "42 horas",
    value: "42",
    icon: CalendarCheck,
    description: "Desde 2026 — reducción gradual",
  },
  {
    id: "40",
    label: "40 horas",
    value: "40",
    icon: CalendarClock,
    description: "Ley N° 21.561 — jornada completa",
  },
  {
    id: "45",
    label: "45 horas",
    value: "45",
    icon: History,
    description: "Jornada histórica — anterior al 2024",
  },
]

const cantidadHijosOptions: SelectOption[] = [
  {
    id: "1",
    label: "1 hijo",
    value: "1",
    icon: Baby,
    description: "Mínimo: 40% de 1 sueldo mínimo",
  },
  {
    id: "2",
    label: "2 hijos",
    value: "2",
    icon: Users,
    description: "Mínimo: 30% por cada hijo",
  },
  {
    id: "3",
    label: "3 hijos",
    value: "3",
    icon: Users2,
    description: "Mínimo: 30% por cada hijo",
  },
  {
    id: "4",
    label: "4 o más hijos",
    value: "4",
    icon: UsersRound,
    description: "Mínimo: 30% por cada hijo",
  },
]

// ── Format helpers ────────────────────────────────────────────────────────

const formatCLP = (val: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(val)

const formatCompact = (val: number) =>
  new Intl.NumberFormat("es-CL", { notation: "compact", compactDisplay: "short", maximumFractionDigits: 1 }).format(val)

// ── Animated number counter ───────────────────────────────────────────────

function AnimatedValue({ value, prefix = "", suffix = "" }: { value: string; prefix?: string; suffix?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="inline-block"
    >
      {prefix}{value}{suffix}
    </motion.span>
  )
}

// ── RangeSlider component ─────────────────────────────────────────────────

function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit,
  presets,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (val: number) => void
  unit?: string
  presets?: { label: string; value: number }[]
}) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-primary">{label}</label>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-brand-navy dark:text-brand-on-navy-muted tabular-nums">
            {value.toLocaleString("es-CL")}
            {unit && <span className="text-sm ml-1">{unit}</span>}
          </span>
        </div>
      </div>
      <div className="relative h-2 bg-muted rounded-full">
        <div
          className="absolute h-2 bg-brand-sky rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer z-10"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-brand-sky rounded-full shadow-md pointer-events-none"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
      {presets && (
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onChange(p.value)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                value === p.value
                  ? "bg-brand-navy text-white border-brand-navy"
                  : "bg-muted/50 text-muted-foreground border-border/60 hover:border-brand-navy/30 hover:text-brand-navy"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── NumberInput component ───────────────────────────────────────────────────

function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  min = 0,
  helper,
  prefix,
}: {
  label: string
  value: number
  onChange: (val: number) => void
  placeholder?: string
  min?: number
  helper?: string
  prefix?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-primary">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(min, Number(e.target.value)))}
          placeholder={placeholder}
          className={`w-full h-12 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent text-sm transition-shadow ${
            prefix ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
      {helper && <p className="text-[11px] text-muted-foreground">{helper}</p>}
    </div>
  )
}

// ── Results card component ────────────────────────────────────────────────

function ResultRow({
  label,
  value,
  accent = false,
  delay = 0,
}: {
  label: string
  value: string
  accent?: boolean
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex items-center justify-between"
    >
      <span className={`text-sm ${accent ? "text-white/80" : "text-white/60"}`}>{label}</span>
      <span className={`font-semibold tabular-nums ${accent ? "text-brand-sky text-xl" : "text-white"}`}>
        <AnimatedValue value={value} />
      </span>
    </motion.div>
  )
}

// ── InfoTip component ─────────────────────────────────────────────────────

function InfoTip({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-2xl bg-muted/40 border border-border/30">
      <div className="shrink-0 mt-0.5">
        <Icon className="size-4 text-brand-sky" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-primary">{title}</p>
        <div className="text-xs text-muted-foreground leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function CalculadorasPage() {
  const [activeTab, setActiveTab] = React.useState<"sueldo" | "alimentos">("sueldo")

  // ── Sueldo state ──────────────────────────────────────────────────────
  const [sueldoBase, setSueldoBase] = React.useState(500000)
  const [horasJornadaValue, setHorasJornadaValue] = React.useState("44")
  const [horasTrabajadas, setHorasTrabajadas] = React.useState(30)

  const horasJornada = Number(horasJornadaValue)

  // ── Alimentos state ────────────────────────────────────────────────────
  const [ingresoPadre, setIngresoPadre] = React.useState(800000)
  const [cantidadHijosValue, setCantidadHijosValue] = React.useState("1")
  const [sueldoMinimoAlimentos, setSueldoMinimoAlimentos] = React.useState(500000)

  const cantidadHijos = Number(cantidadHijosValue)

  // ── Calculations ──────────────────────────────────────────────────────
  const sueldoProporcionalBruto = Math.round((horasTrabajadas / horasJornada) * sueldoBase)
  const afpDeduction = Math.round(sueldoProporcionalBruto * 0.10)
  const saludDeduction = Math.round(sueldoProporcionalBruto * 0.07)
  const sueldoLiquidoEstimado = sueldoProporcionalBruto - afpDeduction - saludDeduction
  const valorHoraMinimo = Math.round(sueldoBase / (horasJornada * 4.16667))

  const porcentajeMinimo = cantidadHijos === 1 ? 0.40 : 0.30
  const minimoLegalPorHijo = sueldoMinimoAlimentos * porcentajeMinimo
  const minimoLegalTotal = minimoLegalPorHijo * cantidadHijos
  const maximoLegalTotal = ingresoPadre * 0.50
  const superaMaximo = minimoLegalTotal > maximoLegalTotal

  const jornadaPct = Math.min(100, Math.round((horasTrabajadas / horasJornada) * 100))

  return (
    <>
      <PageHero
        title="Calculadoras Legales"
        subtitle="Herramientas gratuitas para estimar tu sueldo proporcional y pensión de alimentos según la legislación chilena."
        breadcrumbs={[{ label: "Calculadoras", href: "/calculadoras/" }]}
      />

      <section className="py-10 md:py-16 bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-5 md:px-12">
          {/* ── Tab switcher ── */}
          <div className="flex justify-center mb-10 md:mb-12">
            <div className="inline-flex items-center p-1.5 rounded-full bg-muted/80 border border-border/40">
              {[
                { id: "sueldo" as const, label: "Sueldo Mínimo", icon: Calculator },
                { id: "alimentos" as const, label: "Pensión Alimentos", icon: Landmark },
              ].map((tab) => {
                const isActive = activeTab === tab.id
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive ? "text-white" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="calcTabBg"
                        className="absolute inset-0 bg-brand-navy rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="size-4" />
                      {tab.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Animated tab content ── */}
          <AnimatePresence mode="wait">
            {activeTab === "sueldo" && (
              <motion.div
                key="sueldo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
              >
                {/* ── Inputs ── */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                    <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                      <div className="p-2.5 rounded-xl bg-brand-navy/5 text-brand-navy dark:bg-brand-sky/10 dark:text-brand-sky">
                        <Calculator className="size-6" />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                          Datos del Contrato
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Ajusta los valores para calcular tu sueldo proporcional
                        </p>
                      </div>
                    </div>

                    <NumberInput
                      label="Sueldo Mínimo Mensual (CLP)"
                      value={sueldoBase}
                      onChange={setSueldoBase}
                      prefix="$"
                      helper="Mínimo legal vigente: $500.000 para mayores de 18 años."
                    />

                    <RangeSlider
                      label="Horas que trabajas por semana"
                      value={horasTrabajadas}
                      min={1}
                      max={horasJornada}
                      onChange={(v) => setHorasTrabajadas(Math.min(horasJornada, v))}
                      unit="hrs"
                      presets={[
                        { label: "¼ tiempo", value: Math.round(horasJornada * 0.25) },
                        { label: "½ tiempo", value: Math.round(horasJornada * 0.5) },
                        { label: "¾ tiempo", value: Math.round(horasJornada * 0.75) },
                        { label: "Full time", value: horasJornada },
                      ]}
                    />

                    {/* Progress bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progresión de jornada</span>
                        <span className="font-semibold text-brand-navy dark:text-brand-on-navy-muted">
                          {jornadaPct}%
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-brand-navy to-brand-sky"
                          initial={false}
                          animate={{ width: `${jornadaPct}%` }}
                          transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        />
                      </div>
                    </div>

                    {/* Jornada select */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-navy tracking-[0.1em] uppercase dark:text-brand-on-navy-muted">
                        Jornada Completa Semanal
                      </label>
                      <AnimatedSelect
                        options={horasJornadaOptions}
                        value={horasJornadaValue}
                        onChange={setHorasJornadaValue}
                        label="Jornada Semanal"
                      />
                    </div>
                  </div>

                  <InfoTip icon={HelpCircle} title="¿Cómo funciona?">
                    El sueldo proporcional se calcula dividiendo tus horas semanales por el límite
                    legal de la jornada completa, multiplicado por el sueldo mínimo base. Las
                    deducciones son referenciales: 10% AFP y 7% salud (mínimos legales).
                  </InfoTip>
                </div>

                {/* ── Results ── */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-brand-navy text-white rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-sky/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-sky/5 rounded-full blur-2xl" />

                    <div className="relative">
                      <p className="text-xs text-brand-sky uppercase tracking-wider font-semibold mb-1">
                        Sueldo Bruto Proporcional
                      </p>
                      <p className="text-3xl md:text-4xl font-bold tracking-tight">
                        <AnimatedValue value={formatCLP(sueldoProporcionalBruto)} />
                      </p>
                    </div>

                    <div className="space-y-3 border-t border-white/10 pt-4">
                      <ResultRow label="Deducción AFP (10%)" value={formatCLP(afpDeduction)} delay={0.1} />
                      <ResultRow label="Deducción Salud (7%)" value={formatCLP(saludDeduction)} delay={0.15} />
                    </div>

                    <div className="border-t border-white/10 pt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">Sueldo Líquido Estimado</span>
                        <span className="text-xl font-bold text-brand-sky">
                          <AnimatedValue value={formatCLP(sueldoLiquidoEstimado)} />
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/50">
                        <span>Valor hora mínimo estimado</span>
                        <span className="tabular-nums">{formatCLP(valorHoraMinimo)}/hr</span>
                      </div>
                    </div>

                    {/* Visual comparison */}
                    <div className="pt-2">
                      <div className="flex items-end gap-3 h-24">
                        <div className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[10px] text-white/50">Base</span>
                          <motion.div
                            className="w-full bg-white/10 rounded-t-lg"
                            initial={false}
                            animate={{ height: "100%" }}
                          />
                          <span className="text-[10px] text-white/40">{formatCompact(sueldoBase)}</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[10px] text-white/50">Bruto</span>
                          <motion.div
                            className="w-full bg-brand-sky/40 rounded-t-lg"
                            initial={false}
                            animate={{ height: `${Math.max(5, (sueldoProporcionalBruto / sueldoBase) * 100)}%` }}
                            transition={{ type: "spring", stiffness: 100 }}
                          />
                          <span className="text-[10px] text-white/40">{formatCompact(sueldoProporcionalBruto)}</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[10px] text-white/50">Líquido</span>
                          <motion.div
                            className="w-full bg-brand-sky/70 rounded-t-lg"
                            initial={false}
                            animate={{ height: `${Math.max(5, (sueldoLiquidoEstimado / sueldoBase) * 100)}%` }}
                            transition={{ type: "spring", stiffness: 100 }}
                          />
                          <span className="text-[10px] text-white/40">{formatCompact(sueldoLiquidoEstimado)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/40 border border-border/30 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingUp className="size-3.5 text-brand-sky" />
                      <span>
                        Trabajando <strong>{horasTrabajadas} de {horasJornada} horas</strong> semanales
                        ({jornadaPct}% de jornada completa)
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "alimentos" && (
              <motion.div
                key="alimentos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
              >
                {/* ── Inputs ── */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                    <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                      <div className="p-2.5 rounded-xl bg-brand-navy/5 text-brand-navy dark:bg-brand-sky/10 dark:text-brand-sky">
                        <Landmark className="size-6" />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                          Cálculo de Pensión
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Según Ley N° 14.908 y normativa vigente
                        </p>
                      </div>
                    </div>

                    <NumberInput
                      label="Sueldo Líquido del Demandado (CLP)"
                      value={ingresoPadre}
                      onChange={setIngresoPadre}
                      prefix="$"
                      helper="Ingresos mensuales netos del padre o madre que pagará la pensión."
                    />

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-navy tracking-[0.1em] uppercase dark:text-brand-on-navy-muted">
                        Cantidad de Hijos a Alimentar
                      </label>
                      <AnimatedSelect
                        options={cantidadHijosOptions}
                        value={cantidadHijosValue}
                        onChange={setCantidadHijosValue}
                        label="Número de Hijos"
                      />
                    </div>

                    <NumberInput
                      label="Sueldo Mínimo de Referencia (CLP)"
                      value={sueldoMinimoAlimentos}
                      onChange={setSueldoMinimoAlimentos}
                      prefix="$"
                      helper="Base para calcular el mínimo legal. Vigente: $500.000."
                    />
                  </div>

                  <InfoTip icon={Scale} title="Normativa aplicable">
                    <strong>1 hijo:</strong> mínimo 40% de un sueldo mínimo.
                    <strong> 2+ hijos:</strong> mínimo 30% por cada uno.
                    El tope máximo legal es el <strong>50% de los ingresos netos</strong> del demandado,
                    independientemente del número de hijos.
                  </InfoTip>
                </div>

                {/* ── Results ── */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-brand-navy text-white rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-sky/10 rounded-full blur-3xl" />

                    <div className="relative">
                      <p className="text-xs text-brand-sky uppercase tracking-wider font-semibold mb-1">
                        Pensión Mínima Legal
                      </p>
                      <p className="text-3xl md:text-4xl font-bold tracking-tight">
                        <AnimatedValue value={formatCLP(minimoLegalTotal)} />
                      </p>
                      <p className="text-xs text-white/50 mt-1">
                        {formatCLP(minimoLegalPorHijo)} por cada hijo
                      </p>
                    </div>

                    <div className="space-y-3 border-t border-white/10 pt-4">
                      <ResultRow
                        label={`Porcentaje mínimo (${cantidadHijos === 1 ? "40%" : "30%"} × ${cantidadHijos})`}
                        value={formatCLP(minimoLegalTotal)}
                        delay={0.1}
                      />
                      <ResultRow label="Límite máximo legal (50% ingresos)" value={formatCLP(maximoLegalTotal)} delay={0.15} />
                    </div>

                    {/* Comparison gauge */}
                    <div className="pt-2 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/50">Mínimo vs. Máximo</span>
                        <span className="text-white/70">
                          {Math.round((minimoLegalTotal / maximoLegalTotal) * 100)}% del tope
                        </span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${superaMaximo ? "bg-brand-red" : "bg-brand-sky"}`}
                          initial={false}
                          animate={{ width: `${Math.min(100, (minimoLegalTotal / maximoLegalTotal) * 100)}%` }}
                          transition={{ type: "spring", stiffness: 100 }}
                        />
                      </div>
                    </div>

                    {superaMaximo && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex gap-2.5 bg-brand-red/15 border border-brand-red/25 rounded-xl p-3.5"
                      >
                        <AlertTriangle className="size-4 shrink-0 text-brand-red mt-0.5" />
                        <div className="text-xs text-brand-red leading-relaxed">
                          <strong>Supera el límite legal.</strong> El tribunal ajustará el monto para
                          no exceder el 50% de los ingresos del demandado.
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="bg-muted/40 border border-border/30 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <DollarSign className="size-3.5 text-brand-sky" />
                      <span>
                        Rango legal: <strong>{formatCLP(minimoLegalTotal)}</strong> —{" "}
                        <strong>{formatCLP(maximoLegalTotal)}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 md:mt-16"
          >
            <div className="relative bg-brand-navy rounded-3xl p-6 md:p-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sky/8 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-sky/5 rounded-full blur-[60px]" />

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-brand-sky">
                    <ShieldCheck className="size-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Asesoría legal</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold text-white">
                    ¿Necesitas formalizar tu pensión o revisar tu contrato?
                  </h3>
                  <p className="text-sm text-white/50 max-w-xl">
                    Estas calculadoras son referenciales. Cada caso requiere evaluación personalizada.
                    Tu primera consulta es gratuita y sin compromiso.
                  </p>
                </div>
                <a
                  href="/contacto/"
                  className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-brand-navy font-semibold text-sm hover:bg-brand-sky hover:text-white transition-colors shrink-0"
                >
                  Consultar ahora
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
