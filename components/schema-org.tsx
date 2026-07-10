import { SITE, WHATSAPP } from "@/lib/site"

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
    name: SITE.fullName,
    alternateName: SITE.name,
    url: url || SITE.domain,
    logo: `${SITE.domain}/icon-512.png`,
    image: image || `${SITE.domain}/og/default.jpg`,
    telephone: SITE.phone.e164,
    email: SITE.email,
    description:
      description ||
      "Estudio jurídico especializado en derecho laboral, civil, de familia e insolvencia en Temuco, La Araucanía y todo el sur de Chile.",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.addressStructured.streetAddress,
      addressLocality: SITE.addressStructured.addressLocality,
      addressRegion: SITE.addressStructured.addressRegion,
      addressCountry: SITE.addressStructured.addressCountry,
      postalCode: SITE.addressStructured.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
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
    priceRange: SITE.priceRange,
    currenciesAccepted: SITE.currency,
    paymentAccepted: SITE.paymentAccepted,
    openingHours: SITE.hours.openingHours,
    sameAs: [WHATSAPP.url()],
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
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.domain}/icon-512.png` },
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
    <script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  )
}
