"use client"

import { useState, useMemo } from "react"
import { calcularSueldo, type SueldoCalculo } from "@/lib/calculos"

export function useCalculoSueldo() {
  const [sueldoBase, setSueldoBase] = useState(500000)
  const [horasJornadaValue, setHorasJornadaValue] = useState("44")
  const [horasTrabajadas, setHorasTrabajadas] = useState(30)

  const horasJornada = Number(horasJornadaValue)

  const calculo = useMemo<SueldoCalculo>(
    () => calcularSueldo(sueldoBase, horasTrabajadas, horasJornada),
    [sueldoBase, horasTrabajadas, horasJornada]
  )

  return {
    sueldoBase, setSueldoBase,
    horasJornadaValue, setHorasJornadaValue,
    horasTrabajadas, setHorasTrabajadas,
    horasJornada,
    ...calculo,
  }
}
