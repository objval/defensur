import type { Metadata } from "next"
import { RecursosContent } from "./recursos-content"

export const metadata: Metadata = {
  title: "Recursos Legales — Modelos y Documentos",
  description:
    "Descarga modelos de documentos legales preparados por Defensur: cartas de autodespido, renuncia voluntaria, instructivo para firma de finiquito, ampliación de plazo y recusación de fiscal en sumarios.",
  openGraph: {
    title: "Recursos Legales — Defensur Araucanía",
    description:
      "Descarga modelos de documentos legales gratuitos preparados por nuestro equipo jurídico.",
  },
}

export default function Page() {
  return <RecursosContent />
}
