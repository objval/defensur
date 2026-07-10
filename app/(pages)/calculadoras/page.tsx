import type { Metadata } from "next"
import { CalculadorasContent } from "./calculadoras-content"

export const metadata: Metadata = {
  title: "Calculadoras Legales — Sueldo Mínimo y Pensión de Alimentos",
  description:
    "Calculadoras legales gratuitas para estimar tu sueldo proporcional y pensión de alimentos según la legislación chilena. Herramientas desarrolladas por Defensur Araucanía.",
  keywords:
    "calculadora sueldo mínimo, calculadora pensión alimentos, sueldo proporcional, pensión alimentos chile, calculadora laboral, derecho laboral temuco",
  openGraph: {
    title: "Calculadoras Legales — Sueldo Mínimo y Pensión de Alimentos",
    description:
      "Calculadoras legales gratuitas para estimar tu sueldo proporcional y pensión de alimentos según la legislación chilena.",
    images: [{ url: "/og/calculadoras.jpg", width: 1200, height: 630, alt: "Calculadoras Legales Defensur" }],
  },
}

export default function Page() {
  return <CalculadorasContent />
}
