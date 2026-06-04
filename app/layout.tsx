import type { Metadata } from "next"
import { Geist_Mono, Manrope, Noto_Serif } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const notoSerifHeading = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-heading",
})

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Defensur — Abogados Laborales en Temuco | Despidos y Finiquitos",
    template: "%s | Defensur",
  },
  description:
    "Estudio jurídico especializado en derecho laboral, civil, de familia e insolvencia en Temuco. Más de 15 años de experiencia. Consulta gratuita por WhatsApp.",
  keywords: [
    "abogados temuco",
    "abogado laboral temuco",
    "despido injustificado",
    "derecho laboral",
    "derecho familia",
    "derecho civil",
    "insolvencia",
    "sumarios administrativos",
    "tutela laboral",
    "pensión alimentos",
  ],
  authors: [{ name: "Defensur Estudio Jurídico" }],
  creator: "Defensur",
  metadataBase: new URL("https://www.defensur.cl"),
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://www.defensur.cl",
    siteName: "Defensur",
    title: "Defensur — Abogados Laborales en Temuco",
    description:
      "Estudio jurídico especializado en derecho laboral, civil, de familia e insolvencia en Temuco. Consulta gratuita.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Defensur — Abogados Laborales en Temuco",
    description:
      "Estudio jurídico especializado en derecho laboral, civil, de familia e insolvencia en Temuco.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        manrope.variable,
        notoSerifHeading.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
