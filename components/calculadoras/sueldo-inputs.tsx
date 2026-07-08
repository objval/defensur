"use client"

import { Calculator, HelpCircle } from "lucide-react"
import { AnimatedSelect } from "@/components/animated-select"
import { NumberInput } from "./number-input"
import { RangeSlider } from "./range-slider"
import { InfoTip } from "./info-tip"
import { HORAS_JORNADA_OPTIONS } from "@/lib/calculos"
import type { SueldoCalculo } from "@/lib/calculos"

type Props = SueldoCalculo & {
  sueldoBase: number
  setSueldoBase: (v: number) => void
  horasTrabajadas: number
  setHorasTrabajadas: (v: number) => void
  horasJornada: number
  horasJornadaValue: string
  setHorasJornadaValue: (v: string) => void
}

export function SueldoInputs(props: Props) {
  const { sueldoBase, setSueldoBase, horasTrabajadas, setHorasTrabajadas, horasJornada, horasJornadaValue, setHorasJornadaValue, jornadaPct } = props

  return (
    <div className="lg:col-span-7 space-y-6">
      <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
          <div className="p-2.5 rounded-xl bg-brand-navy/5 text-brand-navy">
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
            <span className="font-semibold text-brand-navy">{jornadaPct}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-navy to-brand-sky transition-all"
              style={{ width: `${jornadaPct}%` }}
            />
          </div>
        </div>

        {/* Jornada select */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-brand-navy tracking-[0.1em] uppercase">
            Jornada Completa Semanal
          </label>
          <AnimatedSelect
            options={HORAS_JORNADA_OPTIONS}
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
  )
}
