"use client"

import Script from "next/script"

interface SchemaOrgProps {
  type?: "LocalBusiness" | "LegalService" | "WebSite" | "FAQPage" | "Article"
  title?: string
  description?: string
  url?: string
  image?: string
  datePublished?: string
  author?: string
}

export function SchemaOrg({
  type = "LegalService",
  title,
  description,
  url,
  image,
  datePublished,
  author,
}: SchemaOrgProps) {
  const baseSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    name: "Defensur Araucanía — Estudio Jurídico",
    alternateName: "Defensur",
    url: url || "https://www.defensuraraucania.cl",
    logo: "https://www.defensuraraucania.cl/icon-512.png",
    image: image || "https://www.defensuraraucania.cl/og/default.jpg",
    telephone: "+569****7355",
    email: "consultas@defensur.cl",
    description:
      description ||
      "Estudio jurídico especializado en derecho laboral, civil, de familia e insolvencia en Temuco, La Araucanía y todo el sur de Chile.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Antonio Varas 687, Oficina 1405",
      addressLocality: "Temuco",
      addressRegion: "La Araucanía",
      addressCountry: "CL",
      postalCode: "4810365",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -38.7359,
      longitude: -72.5904,
    },
    areaServed: [
      { "@type": "City", name: "Temuco" },
      { "@type": "City", name: "Valdivia" },
      { "@type": "City", name: "Osorno" },
      { "@type": "City", name: "Puerto Montt" },
      { "@type": "City", name: "Punta Arenas" },
      { "@type": "AdministrativeArea", name: "La Araucanía" },
      { "@type": "AdministrativeArea", name: "Los Ríos" },
      { "@type": "AdministrativeArea", name: "Los Lagos" },
      { "@type": "AdministrativeArea", name: "Magallanes" },
      { "@type": "Country", name: "Chile" },
    ],
    serviceType: [
      "Derecho Laboral",
      "Derecho de Familia",
      "Derecho Civil",
      "Insolvencia y Reemprendimiento",
      "Sumarios Administrativos",
    ],
    priceRange: "$$",
    currenciesAccepted: "CLP",
    paymentAccepted: "Efectivo, Transferencia bancaria",
    openingHours: ["Mo-Fr 09:00-14:00", "Mo-Fr 15:00-18:00"],
    sameAs: [
      "https://wa.me/56959937355",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios Jurídicos",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Derecho Laboral",
            description: "Despidos injustificados, tutela laboral, acoso laboral e indemnizaciones.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Derecho de Familia",
            description: "Divorcios, pensión de alimentos, cuidado personal y medidas de protección.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Derecho Civil",
            description: "Defensa de deudores, prescripción de deudas, contratos y asesoría corporativa.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Insolvencia y Reemprendimiento",
            description: "Renegociación de deudas y liquidación voluntaria bajo la Ley 20.720.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sumarios Administrativos",
            description: "Defensa de funcionarios públicos, sanciones de salud y registro de marcas INAPI.",
          },
        },
      ],
    },
  }

  if (type === "Article" && datePublished && author) {
    baseSchema.datePublished = datePublished
    baseSchema.author = { "@type": "Person", name: author }
    baseSchema.publisher = {
      "@type": "LegalService",
      name: "Defensur Araucanía",
      logo: { "@type": "ImageObject", url: "https://www.defensuraraucania.cl/icon-512.png" },
    }
  }

  if (type === "FAQPage") {
    baseSchema.mainEntity = []
  }

  if (title) {
    baseSchema.headline = title
  }

  const jsonLd = JSON.stringify(baseSchema)

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
      strategy="afterInteractive"
    />
  )
}
