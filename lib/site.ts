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
  { label: "Recursos Legales", href: "/recursos/" },
  { label: "Contacto", href: "/contacto/" },
] as const

export const AREAS_DE_PRACTICA = [
  "DERECHO LABORAL",
  "SUMARIO ADMINISTRATIVO",
  "DERECHO PENAL",
] as const

export const STATS = [
  { value: "+15", label: "Años de experiencia" },
  { value: "+500", label: "Casos resueltos" },
  { value: "$150M+", label: "En indemnizaciones" },
  { value: "98%", label: "Casos favorables" },
] as const

export const MARQUEE_QUESTIONS = [
  "¿Me despidieron sin causa?",
  "¿Cuánto me corresponde de indemnización?",
  "¿Puedo demandar por acoso laboral?",
  "¿Qué hacer si no me pagan cotizaciones?",
  "¿Cómo iniciar un divorcio?",
  "¿Cuánto es la pensión de alimentos?",
  "¿Qué pasa si no puedo pagar mis deudas?",
  "¿Puedo renegociar mis deudas?",
  "¿Qué es un sumario administrativo?",
  "¿Cuánto tiempo tengo para demandar?",
  "¿Qué derechos tengo como trabajador?",
  "¿Cómo protejo mi patrimonio?",
] as const

export const FAQS = [
  {
    question: "¿Cuánto cuesta la primera consulta?",
    answer: "La primera consulta tiene una duración de 30 minutos y es completamente gratuita. En esta evaluación inicial analizamos tu caso y te entregamos una orientación clara sobre tus opciones legales. Las consultas posteriores tienen tarifas transparentes según la complejidad del caso.",
  },
  {
    question: "¿Qué documentos necesito para un caso de despido?",
    answer: "Debes reunir tu contrato de trabajo, últimas liquidaciones de sueldo, carta de despido, finiquito (si lo firmaste) y cualquier comunicación relevante con tu empleador. Si no tienes todos los documentos, podemos ayudarte a solicitarlos ante la Inspección del Trabajo.",
  },
  {
    question: "¿Cuánto tiempo demora un divorcio?",
    answer: "Depende del tipo: un divorcio de mutuo acuerdo demora entre 3 y 6 meses aproximadamente. Un divorcio unilateral puede tomar desde 8 meses hasta 2 años, dependiendo de la complejidad y si hay bienes o hijos menores involucrados.",
  },
  {
    question: "¿Cómo cobro una pensión de alimentos atrasada?",
    answer: "Iniciamos apremios judiciales contra el deudor, que pueden incluir retención de remuneraciones, arresto nocturno y prohibición de salir del país. También realizamos cobranza judicial y extrajudicial para recuperar las pensiones adeudadas.",
  },
  {
    question: "¿Qué es la tutela laboral?",
    answer: "La tutela laboral es un mecanismo legal que protege los derechos fundamentales del trabajador cuando son vulnerados por el empleador. Incluye protección contra despidos discriminatorios, acoso laboral, vulneración de la libertad sindical y represalias por ejercer derechos legales.",
  },
  {
    question: "¿Puedo renegociar mis deudas sin ir a juicio?",
    answer: "Sí. Existen mecanismos de renegociación extrajudicial y procedimientos ante la Superintendencia de Insolvencia. Evaluamos tu situación financiera y negociamos con tus acreedores las mejores condiciones para reorganizar tus deudas bajo la Ley 20.720.",
  },
  {
    question: "¿Atienden funcionarios públicos en sumarios administrativos?",
    answer: "Sí, es una de nuestras especialidades. Defendemos a funcionarios públicos en todo tipo de sumarios administrativos, garantizando el debido proceso, el derecho a defensa y la impugnación de sanciones injustas. Acompañamos el proceso desde la notificación hasta la resolución final.",
  },
  {
    question: "¿En qué zonas atienden?",
    answer: "Nuestra oficina principal está en Temuco, pero atendemos casos en toda la Región de La Araucanía, incluyendo Villarrica, Pucón, Angol, Lautaro, Nueva Imperial y ciudades cercanas. También ofrecemos atención por WhatsApp y videollamada para clientes de otras regiones.",
  },
] as const

export type TeamMember = {
  id: string
  name: string
  role: string
  image: string
  featured?: boolean
}

export const TEAM: TeamMember[] = [
  { id: "ny", name: "Nicolás Yáñez Inostroza", role: "Abogado Jefe", image: "/team/nicolas.jpeg", featured: true },
  { id: "sp", name: "Sebastián Pizarro", role: "Experto en Derecho Laboral", image: "/team/sebastian.jpeg" },
  { id: "mr", name: "Millaray Rohten", role: "Abogada de Familia", image: "/team/millaray.jpeg" },
  { id: "ca", name: "Carolina Arancibia", role: "Administradora", image: "/team/carolina.jpeg" },
  { id: "camp", name: "Constanza Ampuero", role: "Abogada de Deudas", image: "/team/constanza-ampuero.jpeg" },
  { id: "gc", name: "Génesis Carrillo", role: "Abogada Laboral", image: "/team/genesis-carrillo.jpeg" },
]
