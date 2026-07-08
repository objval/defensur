"use client"

import { motion } from "framer-motion"
import { AlertTriangle, DollarSign } from "lucide-react"
import { formatCLP } from "@/lib/calculos"
import type { AlimentosCalculo } from "@/lib/calculos"
import { AnimatedValue } from "./animated-value"
import { ResultRow } from "./result-row"

type Props = AlimentosCalculo & {
  cantidadHijos: number
}

export function ResultadosAlimentos(props: Props) {
  const { minimoLegalTotal, minimoLegalPorHijo, maximoLegalTotal, superaMaximo, cantidadHijos } = props

  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="bg-brand-navy text-white rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
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
  )
}
