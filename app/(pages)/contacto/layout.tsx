import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contáctanos — Consulta Gratuita",
  description:
    "Contacta a Defensur Estudio Jurídico en Temuco. Primera consulta gratuita y sin compromiso. WhatsApp, teléfono o presencial. Atendemos en La Araucanía y todo el sur de Chile.",
  openGraph: {
    title: "Contáctanos — Consulta Gratuita",
    description:
      "Contacta a Defensur Estudio Jurídico. Primera consulta gratuita y sin compromiso.",
    images: [
      {
        url: "/og/contacto.jpg",
        width: 1200,
        height: 630,
        alt: "Contacto Defensur Araucanía",
      },
    ],
  },
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
