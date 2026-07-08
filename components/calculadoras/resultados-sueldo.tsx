"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { formatCLP, formatCompact } from "@/lib/calculos"
import type { SueldoCalculo } from "@/lib/calculos"
import { AnimatedValue } from "./animated-value"
import { ResultRow } from "./result-row"

type Props = SueldoCalculo & {
  sueldoBase: number
  horasTrabajadas: number
  horasJornada: number
}

export function ResultadosSueldo(props: Props) {
  const { sueldoBase, sueldoProporcionalBruto, afpDeduction, saludDeduction, sueldoLiquidoEstimado, valorHoraMinimo, jornadaPct, horasTrabajadas, horasJornada } = props

  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="bg-brand-navy text-white rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
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
              <div className="w-full bg-white/10 rounded-t-lg" style={{ height: "100%" }} />
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
  )
}
