import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recursos Legales — Modelos y Documentos",
  description:
    "Descarga modelos de documentos legales preparados por Defensur: cartas de autodespido, renuncia voluntaria, instructivo para firma de finiquito, y solicitud de ampliación de plazo en sumarios.",
  openGraph: {
    title: "Recursos Legales — Defensur Araucanía",
    description:
      "Descarga modelos de documentos legales gratuitos preparados por nuestro equipo jurídico.",
  },
}

export default function RecursosLayout({ children }: { children: React.ReactNode }) {
  return children
}
