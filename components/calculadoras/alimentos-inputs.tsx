"use client"

import { Landmark, Scale } from "lucide-react"
import { AnimatedSelect } from "@/components/animated-select"
import { NumberInput } from "./number-input"
import { InfoTip } from "./info-tip"
import { CANTIDAD_HIJOS_OPTIONS } from "@/lib/calculos"

type Props = {
  ingresoPadre: number
  setIngresoPadre: (v: number) => void
  cantidadHijosValue: string
  setCantidadHijosValue: (v: string) => void
  sueldoMinimo: number
  setSueldoMinimo: (v: number) => void
}

export function AlimentosInputs(props: Props) {
  const { ingresoPadre, setIngresoPadre, cantidadHijosValue, setCantidadHijosValue, sueldoMinimo, setSueldoMinimo } = props

  return (
    <div className="lg:col-span-7 space-y-6">
      <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
          <div className="p-2.5 rounded-xl bg-brand-navy/5 text-brand-navy">
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
          <label className="text-xs font-bold text-brand-navy tracking-[0.1em] uppercase">
            Cantidad de Hijos a Alimentar
          </label>
          <AnimatedSelect
            options={CANTIDAD_HIJOS_OPTIONS}
            value={cantidadHijosValue}
            onChange={setCantidadHijosValue}
            label="Número de Hijos"
          />
        </div>

        <NumberInput
          label="Sueldo Mínimo de Referencia (CLP)"
          value={sueldoMinimo}
          onChange={setSueldoMinimo}
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
  )
}
