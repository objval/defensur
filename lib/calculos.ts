// lib/calculos.ts — Pure calculation logic for legal calculators.
// Extracted from app/(pages)/calculadoras/page.tsx for testability.

import type { LucideIcon } from "lucide-react"
import {
  Clock,
  CalendarCheck,
  CalendarClock,
  History,
  Baby,
  Users,
  Users2,
  UsersRound,
} from "lucide-react"

// ── Types ───────────────────────────────────────────────────────────────────

export type CalcSelectOption = {
  id: string
  label: string
  value: string
  icon: LucideIcon
  description: string
}

// ── Constants ──────────────────────────────────────────────────────────────

export const AFP_RATE = 0.10
export const SALUD_RATE = 0.07
export const MAX_ALIMENTOS_RATE = 0.50
export const HORAS_FACTOR = 4.16667 // 50 weeks / 12 months

// ── Select Options ──────────────────────────────────────────────────────────

export const HORAS_JORNADA_OPTIONS: CalcSelectOption[] = [
  { id: "44", label: "44 horas", value: "44", icon: Clock, description: "Jornada vigente — tope legal actual" },
  { id: "42", label: "42 horas", value: "42", icon: CalendarCheck, description: "Desde 2026 — reducción gradual" },
  { id: "40", label: "40 horas", value: "40", icon: CalendarClock, description: "Ley N° 21.561 — jornada completa" },
  { id: "45", label: "45 horas", value: "45", icon: History, description: "Jornada histórica — anterior al 2024" },
]

export const CANTIDAD_HIJOS_OPTIONS: CalcSelectOption[] = [
  { id: "1", label: "1 hijo", value: "1", icon: Baby, description: "Mínimo: 40% de 1 sueldo mínimo" },
  { id: "2", label: "2 hijos", value: "2", icon: Users, description: "Mínimo: 30% por cada hijo" },
  { id: "3", label: "3 hijos", value: "3", icon: Users2, description: "Mínimo: 30% por cada hijo" },
  { id: "4", label: "4 o más hijos", value: "4", icon: UsersRound, description: "Mínimo: 30% por cada hijo" },
]

// ── Format helpers ──────────────────────────────────────────────────────────

export function formatCLP(val: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(val)
}

export function formatCompact(val: number): string {
  return new Intl.NumberFormat("es-CL", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(val)
}

// ── Sueldo calculations ─────────────────────────────────────────────────────

export interface SueldoCalculo {
  sueldoProporcionalBruto: number
  afpDeduction: number
  saludDeduction: number
  sueldoLiquidoEstimado: number
  valorHoraMinimo: number
  jornadaPct: number
}

export function calcularSueldo(
  sueldoBase: number,
  horasTrabajadas: number,
  horasJornada: number
): SueldoCalculo {
  const safeJornada = Math.max(1, horasJornada)
  const sueldoProporcionalBruto = Math.round((horasTrabajadas / safeJornada) * sueldoBase)
  const afpDeduction = Math.round(sueldoProporcionalBruto * AFP_RATE)
  const saludDeduction = Math.round(sueldoProporcionalBruto * SALUD_RATE)
  const sueldoLiquidoEstimado = sueldoProporcionalBruto - afpDeduction - saludDeduction
  const valorHoraMinimo = Math.round(sueldoBase / (safeJornada * HORAS_FACTOR))
  const jornadaPct = Math.min(100, Math.round((horasTrabajadas / safeJornada) * 100))

  return {
    sueldoProporcionalBruto: Math.max(0, sueldoProporcionalBruto),
    afpDeduction: Math.max(0, afpDeduction),
    saludDeduction: Math.max(0, saludDeduction),
    sueldoLiquidoEstimado: Math.max(0, sueldoLiquidoEstimado),
    valorHoraMinimo: Math.max(0, valorHoraMinimo),
    jornadaPct,
  }
}

// ── Alimentos calculations ──────────────────────────────────────────────────

export interface AlimentosCalculo {
  porcentajeMinimo: number
  minimoLegalPorHijo: number
  minimoLegalTotal: number
  maximoLegalTotal: number
  superaMaximo: boolean
}

export function calcularAlimentos(
  ingresoPadre: number,
  cantidadHijos: number,
  sueldoMinimo: number
): AlimentosCalculo {
  const porcentajeMinimo = cantidadHijos === 1 ? 0.40 : cantidadHijos >= 2 ? 0.30 : 0
  const minimoLegalPorHijo = sueldoMinimo * porcentajeMinimo
  const minimoLegalTotal = minimoLegalPorHijo * Math.max(0, cantidadHijos)
  const maximoLegalTotal = ingresoPadre * MAX_ALIMENTOS_RATE
  const superaMaximo = minimoLegalTotal > maximoLegalTotal

  return {
    porcentajeMinimo,
    minimoLegalPorHijo: Math.max(0, minimoLegalPorHijo),
    minimoLegalTotal: Math.max(0, minimoLegalTotal),
    maximoLegalTotal: Math.max(0, maximoLegalTotal),
    superaMaximo,
  }
}
