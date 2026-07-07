"use client"

import * as React from "react"
import { PageHero } from "@/components/page-hero"
import { Calculator, Scale, Percent, Landmark, HelpCircle, AlertTriangle, ShieldCheck } from "lucide-react"

export default function CalculadorasPage() {
  const [activeTab, setActiveTab] = React.useState<"sueldo" | "alimentos">("sueldo")

  // --- State for Sueldo Mínimo Calculator ---
  const [sueldoBase, setSueldoBase] = React.useState<number>(500000)
  const [horasJornada, setHorasJornada] = React.useState<number>(44)
  const [horasTrabajadas, setHorasTrabajadas] = React.useState<number>(30)

  // --- State for Pensión de Alimentos Calculator ---
  const [ingresoPadre, setIngresoPadre] = React.useState<number>(800000)
  const [cantidadHijos, setCantidadHijos] = React.useState<number>(1)
  const [sueldoMinimoAlimentos, setSueldoMinimoAlimentos] = React.useState<number>(500000)

  // --- Sueldo calculations ---
  const sueldoProporcionalBruto = Math.round(
    (horasTrabajadas / horasJornada) * sueldoBase
  )
  const afpDeduction = Math.round(sueldoProporcionalBruto * 0.10)
  const saludDeduction = Math.round(sueldoProporcionalBruto * 0.07)
  const sueldoLiquidoEstimado = sueldoProporcionalBruto - afpDeduction - saludDeduction
  const valorHoraMinimo = Math.round(sueldoBase / (horasJornada * 4.16667))

  // --- Alimentos calculations ---
  // 1 hijo: 40% del sueldo mínimo. 2 o más: 30% por cada hijo.
  const porcentajeMinimo = cantidadHijos === 1 ? 0.40 : 0.30
  const minimoLegalPorHijo = sueldoMinimoAlimentos * porcentajeMinimo
  const minimoLegalTotal = minimoLegalPorHijo * cantidadHijos
  const maximoLegalTotal = ingresoPadre * 0.50

  const superaMaximo = minimoLegalTotal > maximoLegalTotal

  // Format currency helpers
  const formatCLP = (val: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <>
      <PageHero
        title="Calculadoras Legales"
        subtitle="Herramientas gratuitas para calcular tu sueldo mínimo proporcional y estimar el monto de pensión de alimentos en Chile."
        breadcrumbs={[{ label: "Calculadoras", href: "/calculadoras/" }]}
      />

      <section className="py-12 md:py-20 bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-5 md:px-12">
          {/* Navigation Tabs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-10 md:mb-14">
            <button
              onClick={() => setActiveTab("sueldo")}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === "sueldo"
                  ? "bg-brand-navy text-white shadow-md"
                  : "bg-muted hover:bg-accent text-muted-foreground hover:text-primary"
              }`}
            >
              <Calculator className="size-4" />
              Sueldo Mínimo Proporcional
            </button>
            <button
              onClick={() => setActiveTab("alimentos")}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === "alimentos"
                  ? "bg-brand-navy text-white shadow-md"
                  : "bg-muted hover:bg-accent text-muted-foreground hover:text-primary"
              }`}
            >
              <Landmark className="size-4" />
              Pensión de Alimentos
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* CALCULADORA 1: SUELDO MINIMO PROPORCIONAL */}
            {activeTab === "sueldo" && (
              <>
                {/* Inputs Area */}
                <div className="lg:col-span-7 bg-card border border-border/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                  <div className="flex items-center gap-3 border-b border-border/40 pb-4">
                    <div className="p-2.5 rounded-xl bg-brand-navy/5 text-brand-navy dark:bg-brand-sky/10 dark:text-brand-sky">
                      <Calculator className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-semibold">
                        Datos del Contrato
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Ingresa los datos para calcular el sueldo bruto y líquido según tu jornada.
                      </p>
                    </div>
                  </div>

                  {/* Input sueldo mínimo mensual base */}
                  <div className="space-y-2">
                    <label htmlFor="sueldoBase" className="text-sm font-semibold text-primary">
                      Sueldo Mínimo Mensual Base (CLP)
                    </label>
                    <input
                      id="sueldoBase"
                      type="number"
                      value={sueldoBase}
                      onChange={(e) => setSueldoBase(Math.max(0, Number(e.target.value)))}
                      className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent text-sm"
                      placeholder="Ej. 500000"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      * El sueldo mínimo vigente en Chile es de <strong>$500.000 CLP</strong> para trabajadores mayores de 18 años y de hasta 65 años.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Horas jornada completa */}
                    <div className="space-y-2">
                      <label htmlFor="horasJornada" className="text-sm font-semibold text-primary">
                        Horas Jornada Completa Semanal
                      </label>
                      <select
                        id="horasJornada"
                        value={horasJornada}
                        onChange={(e) => setHorasJornada(Number(e.target.value))}
                        className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent text-sm"
                      >
                        <option value={44}>44 horas (Vigente)</option>
                        <option value={42}>42 horas (Desde 2026)</option>
                        <option value={40}>40 horas (Ley Completa)</option>
                        <option value={45}>45 horas (Histórico)</option>
                      </select>
                      <p className="text-[11px] text-muted-foreground">
                        Base legal para el tope máximo semanal de trabajo.
                      </p>
                    </div>

                    {/* Horas trabajadas semanales */}
                    <div className="space-y-2">
                      <label htmlFor="horasTrabajadas" className="text-sm font-semibold text-primary">
                        Horas que Trabajas a la Semana
                      </label>
                      <input
                        id="horasTrabajadas"
                        type="number"
                        min={0}
                        max={horasJornada}
                        value={horasTrabajadas}
                        onChange={(e) => setHorasTrabajadas(Math.min(horasJornada, Math.max(0, Number(e.target.value))))}
                        className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent text-sm"
                        placeholder="Ej. 30"
                      />
                      <p className="text-[11px] text-muted-foreground">
                        No puede exceder las horas de la jornada completa.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Results Area */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-brand-navy text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-sky/10 rounded-full blur-2xl" />

                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-brand-sky">
                      Resultado Estimado
                    </h3>

                    <div className="space-y-4 border-b border-white/10 pb-5">
                      <div>
                        <p className="text-xs text-white/60 uppercase tracking-wider">
                          Sueldo Mínimo Bruto Proporcional
                        </p>
                        <p className="text-3xl md:text-4xl font-bold tracking-tight mt-1">
                          {formatCLP(sueldoProporcionalBruto)}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs text-white/70">
                        <div>
                          <p>Deducción AFP (10% est.)</p>
                          <p className="font-semibold text-white mt-0.5">{formatCLP(afpDeduction)}</p>
                        </div>
                        <div>
                          <p>Deducción Salud (7% est.)</p>
                          <p className="font-semibold text-white mt-0.5">{formatCLP(saludDeduction)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/80">Sueldo Líquido Estimado</span>
                        <span className="text-xl font-bold text-brand-sky">
                          {formatCLP(sueldoLiquidoEstimado)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-white/60">
                        <span>Valor Hora Mínimo Estimado</span>
                        <span>{formatCLP(valorHoraMinimo)} / hora</span>
                      </div>
                    </div>
                  </div>

                  {/* Informative Note */}
                  <div className="bg-muted/50 border border-border/40 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      <HelpCircle className="size-4 text-brand-sky shrink-0" />
                      ¿Cómo funciona el cálculo?
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      El sueldo proporcional se calcula dividiendo tu cantidad de horas semanales por el límite de horas legales del contrato full-time, y multiplicándolo por el sueldo mínimo base nacional.
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      * Las deducciones previsionales son aproximadas y corresponden a los mínimos legales (salud 7% y previsión obligatoria de AFP estimada en 10%). Este monto neto final es referencial.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* CALCULADORA 2: PENSION DE ALIMENTOS */}
            {activeTab === "alimentos" && (
              <>
                {/* Inputs Area */}
                <div className="lg:col-span-7 bg-card border border-border/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                  <div className="flex items-center gap-3 border-b border-border/40 pb-4">
                    <div className="p-2.5 rounded-xl bg-brand-navy/5 text-brand-navy dark:bg-brand-sky/10 dark:text-brand-sky">
                      <Landmark className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-semibold">
                        Cálculo de Pensión Alimenticia
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Determina los topes legales de pensión según la normativa de Chile.
                      </p>
                    </div>
                  </div>

                  {/* Ingreso mensual del padre */}
                  <div className="space-y-2">
                    <label htmlFor="ingresoPadre" className="text-sm font-semibold text-primary">
                      Sueldo Líquido Mensual del Demandado/Padre (CLP)
                    </label>
                    <input
                      id="ingresoPadre"
                      type="number"
                      value={ingresoPadre}
                      onChange={(e) => setIngresoPadre(Math.max(0, Number(e.target.value)))}
                      className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent text-sm"
                      placeholder="Ej. 800000"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Corresponde a los ingresos del padre o madre que pagará la pensión de alimentos, descontadas sus cotizaciones obligatorias.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Cantidad de hijos */}
                    <div className="space-y-2">
                      <label htmlFor="cantidadHijos" className="text-sm font-semibold text-primary">
                        Cantidad de Hijos a Alimentar
                      </label>
                      <select
                        id="cantidadHijos"
                        value={cantidadHijos}
                        onChange={(e) => setCantidadHijos(Number(e.target.value))}
                        className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent text-sm"
                      >
                        <option value={1}>1 hijo (40% de 1 sueldo mínimo)</option>
                        <option value={2}>2 hijos (30% de 1 sueldo mínimo por hijo)</option>
                        <option value={3}>3 hijos (30% de 1 sueldo mínimo por hijo)</option>
                        <option value={4}>4 o más hijos (30% de 1 sueldo mínimo por hijo)</option>
                      </select>
                      <p className="text-[11px] text-muted-foreground">
                        Determina el porcentaje mínimo obligatorio a pagar según la ley chilena.
                      </p>
                    </div>

                    {/* Sueldo mínimo base */}
                    <div className="space-y-2">
                      <label htmlFor="sueldoMinimoAlimentos" className="text-sm font-semibold text-primary">
                        Sueldo Mínimo de Referencia (CLP)
                      </label>
                      <input
                        id="sueldoMinimoAlimentos"
                        type="number"
                        value={sueldoMinimoAlimentos}
                        onChange={(e) => setSueldoMinimoAlimentos(Math.max(0, Number(e.target.value)))}
                        className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent text-sm"
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Utilizado para calcular la base del mínimo legal ($500.000 CLP).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Results Area */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-brand-navy text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-sky/10 rounded-full blur-2xl" />

                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-brand-sky">
                      Estimación Legal (Ley N° 14.908)
                    </h3>

                    <div className="space-y-4 border-b border-white/10 pb-5">
                      <div>
                        <p className="text-xs text-white/60 uppercase tracking-wider">
                          Monto Mínimo Legal Total
                        </p>
                        <p className="text-2xl md:text-3xl font-bold tracking-tight mt-1 text-white">
                          {formatCLP(minimoLegalTotal)}
                        </p>
                        <p className="text-[11px] text-white/50 mt-1">
                          Equivale a {formatCLP(minimoLegalPorHijo)} mensual por cada hijo.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/80">Límite Máximo Legal (50%)</span>
                        <span className="text-lg font-bold text-white">
                          {formatCLP(maximoLegalTotal)}
                        </span>
                      </div>
                    </div>

                    {superaMaximo && (
                      <div className="flex gap-2 bg-brand-red/10 border border-brand-red/20 rounded-xl p-3 text-xs text-brand-red">
                        <AlertTriangle className="size-4 shrink-0 mt-0.5" />
                        <div>
                          <strong>Atención:</strong> El mínimo legal calculado supera el 50% de los ingresos totales del demandado. El tribunal reajustará el monto para no superar el límite del 50%.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Informative Note */}
                  <div className="bg-muted/50 border border-border/40 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      <Scale className="size-4 text-brand-sky shrink-0" />
                      Normativa de Alimentos en Chile
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      El monto mínimo a pagar está fijado por ley: si es 1 hijo, no puede ser menos del <strong>40% de un sueldo mínimo</strong>. Si son 2 o más, no puede ser inferior al <strong>30% por cada uno</strong>.
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      * Sin importar el número de hijos, la pensión mensual decretada por el juez no puede exceder el <strong>50% de los ingresos mensuales netos</strong> del demandado.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Call to Action Legal Guidance */}
          <div className="mt-16 bg-muted/30 border border-border/50 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
            <div className="space-y-2">
              <h4 className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-bold text-primary flex items-center gap-2">
                <ShieldCheck className="size-5 text-brand-sky" />
                ¿Necesitas formalizar o ajustar tu pensión?
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-3xl">
                Los cálculos son referenciales basados en la legislación vigente. Cada caso particular requiere evaluar los gastos acreditables de los hijos, la capacidad de pago del demandado y otros factores. Consúltanos directamente para diseñar tu estrategia legal.
              </p>
            </div>
            <a
              href="/contacto/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand-navy hover:bg-brand-navy/90 px-6 text-sm font-semibold text-white transition-all whitespace-nowrap"
            >
              Consultar con un Abogado
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
