"use client"

import { useState, useMemo } from "react"
import { calcularAlimentos, type AlimentosCalculo } from "@/lib/calculos"

export function useCalculoAlimentos() {
  const [ingresoPadre, setIngresoPadre] = useState(800000)
  const [cantidadHijosValue, setCantidadHijosValue] = useState("1")
  const [sueldoMinimo, setSueldoMinimo] = useState(500000)

  const cantidadHijos = Number(cantidadHijosValue)

  const calculo = useMemo<AlimentosCalculo>(
    () => calcularAlimentos(ingresoPadre, cantidadHijos, sueldoMinimo),
    [ingresoPadre, cantidadHijos, sueldoMinimo]
  )

  return {
    ingresoPadre, setIngresoPadre,
    cantidadHijosValue, setCantidadHijosValue,
    sueldoMinimo, setSueldoMinimo,
    cantidadHijos,
    ...calculo,
  }
}
