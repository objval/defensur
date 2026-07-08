import type { Metadata } from "next"
import { Geist_Mono, Manrope, Noto_Serif } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SchemaOrg } from "@/components/schema-org"
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
    default: "Defensur Araucanía — Abogados Laborales en Temuco | Despidos y Finiquitos",
    template: "%s | Defensur Araucanía",
  },
  description:
    "Estudio jurídico especializado en derecho laboral, civil, de familia e insolvencia en Temuco, La Araucanía y todo el sur de Chile. Más de 15 años de experiencia. Consulta gratuita por WhatsApp.",
  keywords: [
    "abogados temuco",
    "abogado laboral temuco",
    "abogados araucanía",
    "abogados sur de chile",
    "despido injustificado",
    "derecho laboral",
    "derecho familia",
    "derecho civil",
    "insolvencia",
    "sumarios administrativos",
    "tutela laboral",
    "pensión alimentos",
    "abogado valdivia",
    "abogado osorno",
    "abogado puerto montt",
    "abogado punta arenas",
  ],
  authors: [{ name: "Defensur Estudio Jurídico" }],
  creator: "Defensur",
  metadataBase: new URL("https://www.defensuraraucania.cl"),
  alternates: {
    canonical: "https://www.defensuraraucania.cl",
    languages: {
      "es-CL": "https://www.defensuraraucania.cl",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://www.defensuraraucania.cl",
    siteName: "Defensur Araucanía",
    title: "Defensur Araucanía — Abogados Laborales en Temuco",
    description:
      "Estudio jurídico especializado en derecho laboral, civil, de familia e insolvencia en Temuco, La Araucanía y todo el sur de Chile. Consulta gratuita.",
    images: [
      {
        url: "/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "Defensur Araucanía — Abogados Laborales en Temuco y La Araucanía",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Defensur Araucanía — Abogados Laborales en Temuco",
    description:
      "Estudio jurídico especializado en derecho laboral, civil, de familia e insolvencia en Temuco y La Araucanía.",
    images: ["/og/default.jpg"],
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
  other: {
    "og:locale:alternate": "es_CL",
    "business:contact_data:locality": "Temuco",
    "business:contact_data:region": "La Araucanía",
    "business:contact_data:country_name": "Chile",
    "business:contact_data:phone_number": "+56959937355",
    "business:contact_data:street_address": "Antonio Varas 687, Oficina 1405",
    "place:location:latitude": "-38.7359",
    "place:location:longitude": "-72.5904",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": "Defensur",
    "application-name": "Defensur",
    "msapplication-TileColor": "#08186B",
    "theme-color": "#08186B",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  verification: {
    google: undefined, // Add when Search Console verification is done
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
        <SchemaOrg />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
