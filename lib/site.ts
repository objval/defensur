// lib/site.ts — Single source of truth for business/site data

export const SITE = {
  name: "Defensur",
  fullName: "Defensur Araucanía — Estudio Jurídico",
  tagline: "Justicia con Arquitectura Legal.",
  domain: "https://www.defensuraraucania.cl",
  alternateDomain: "https://www.defensur.cl",
  email: "consultas@defensur.cl",
  phone: {
    e164: "+56959937355",
    local: "+56 9 5993 7355",
  },
  address: "Antonio Varas 687, Oficina 1405, Temuco",
  addressStructured: {
    streetAddress: "Antonio Varas 687, Oficina 1405",
    addressLocality: "Temuco",
    addressRegion: "La Araucanía",
    postalCode: "4810365",
    addressCountry: "CL",
  },
  geo: {
    latitude: -38.7359,
    longitude: -72.5904,
  },
  hours: {
    display: "Lun–Vie 09:00–14:00 y 15:00–18:00",
    openingHours: ["Mo-Fr 09:00-14:00", "Mo-Fr 15:00-18:00"],
  },
  priceRange: "$$",
  currency: "CLP",
  paymentAccepted: "Efectivo, Transferencia bancaria",
} as const

export const WHATSAPP = {
  number: SITE.phone.e164.replace("+", ""),
  baseUrl: "https://wa.me/",
  message: (context?: string) =>
    context
      ? `Hola Defensur, necesito asesoría en ${context}.`
      : "Hola Defensur, necesito orientación jurídica.",
  url: (context?: string) =>
    `${WHATSAPP.baseUrl}${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.message(context))}`,
}

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100057113543073" },
  { label: "Instagram", href: "https://www.instagram.com/defensur.estudiojuridico/" },
  { label: "TikTok", href: "https://www.tiktok.com/@defensur.estudiojuridico" },
  { label: "WhatsApp", href: WHATSAPP.url() },
] as const

export const NAV_LINKS = [
  { label: "Derecho Laboral", href: "/derecho-laboral-temuco/" },
  { label: "Derecho de Familia", href: "/abogados-familia-temuco/" },
  { label: "Derecho Civil", href: "/derecho-civil-temuco/" },
  { label: "Insolvencia", href: "/insolvencia-y-reemprendimiento-temuco/" },
  { label: "Sumarios Administrativos", href: "/sumarios-administrativos-temuco/" },
] as const

export const COMPANY_LINKS = [
  { label: "Quiénes Somos", href: "/quienes-somos/" },
  { label: "Nicolás Yáñez", href: "/nicolas-yanez/" },
  { label: "Sentencias Destacadas", href: "/sentencias/" },
  { label: "Calculadoras", href: "/calculadoras/" },
  { label: "Contacto", href: "/contacto/" },
] as const

export const AREAS_DE_PRACTICA = [
  "DERECHO LABORAL",
  "DERECHO DE FAMILIA",
  "DERECHO CIVIL",
] as const
