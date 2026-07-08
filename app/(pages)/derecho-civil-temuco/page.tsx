import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { ServicePageContent } from "@/components/service-page-content"

export const metadata: Metadata = {
  title: "Abogados Civiles en Temuco y La Araucanía — Contratos, Deudas, Prescripción | Defensur",
  description: "Asesoría legal en derecho civil en Temuco, La Araucanía y todo el sur de Chile. Defensa de deudores, prescripción de deudas, contratos y juicios civiles. Consulta gratuita.",
  keywords: "abogado civil temuco, abogado civil araucanía, defensa deudores, prescripción deudas, contratos temuco, juicios civiles, abogados civiles temuco, abogado civil valdivia, abogado civil osorno, abogado civil puerto montt",
  openGraph: {
    title: "Abogados Civiles en Temuco y La Araucanía — Contratos, Deudas, Prescripción | Defensur",
    description: "Asesoría legal en derecho civil en Temuco, La Araucanía y todo el sur de Chile. Defensa de deudores, prescripción de deudas, contratos y juicios civiles. Consulta gratuita.",
    images: [{ url: "/og/civil.png", width: 1200, height: 630, alt: "Abogados Civiles en Temuco y La Araucanía — Contratos, Deudas, Prescripción | Defensur" }],
  }
}

const highlights = [
  {
    title: "Defensa de Deudores",
    description: "Prescripción de deudas, renegociación y protección patrimonial ante cobranzas judiciales.",
  },
  {
    title: "Contratos",
    description: "Redacción, revisión y defensa en conflictos contractuales: compraventa, mutuos, sociedades.",
  },
  {
    title: "Asesoría Corporativa",
    description: "Constitución de sociedades, liquidación, asesoría patrimonial y protección de activos.",
  },
]

const details = [
  {
    heading: "Defensa de Deudores y Prescripción de Deudas",
    content: `Muchas deudas prescriben con el tiempo, lo que significa que legalmente ya no son exigibles. Analizamos tu situación financiera y determinamos si tus deudas han prescrito o están próximas a prescribir.

Los plazos de prescripción más comunes son:

• Pagarés y letras de cambio: 3 años
• Facturas e instrumentos de crédito: 1 año
• Deudas comerciales en general: 5 años
• Contratos de mutuo: 5 años

También defendemos contra cobranzas abusivas, embargos ilegales y prácticas de cobro que vulneren tus derechos como consumidor.`,
  },
  {
    heading: "Contratos y Conflictos Contractuales",
    content: `Redactamos y revisamos todo tipo de contratos para proteger tus intereses:

• Contratos de compraventa (inmuebles, vehículos, comerciales)
• Contratos de mutuo (préstamos de dinero)
• Contratos de arriendo
• Contratos de prestación de servicios
• Escrituras de sociedad y actas

En caso de incumplimiento contractual, diseñamos la estrategia legal más adecuada, ya sea a través de demanda de cumplimiento, resolución del contrato o indemnización de perjuicios.`,
  },
  {
    heading: "Juicios Civiles y Litigación",
    content: `Representamos en todo tipo de juicios civiles ante los tribunales de justicia:

• Juicios de mínima cuantía y cuantía ordinaria
• Juicios ejecutivos (cobro de instrumentos)
• Juicios ordinarios (declarativos)
• Incidentes y recursos procesales
• Medidas precautorias y cautelares

Nuestra prioridad es resolver el conflicto de la forma más eficiente posible, ya sea mediante negociación directa, mediación o litigio judicial.`,
  },
  {
    heading: "Liquidación de Sociedades y Asesoría Patrimonial",
    content: `Asesoramos en la constitución, administración y liquidación de sociedades comerciales. Gestionamos:

• Constitución de SpA, SRL y SA
• Modificación de estatutos
• Disolución y liquidación de sociedades
• Conflictos entre socios
• Protección de patrimonio personal
• Planificación sucesoria`,
  },
]

const faqs = [
  {
    question: "¿Mis deudas pueden prescribir?",
    answer: "Sí, muchas deudas tienen plazos legales de prescripción. Por ejemplo, pagarés prescriben a los 3 años y facturas al año. Evaluamos tu caso para determinar si alguna deuda ha prescrito y ya no es exigible legalmente.",
  },
  {
    question: "¿Qué hago si me están cobrando una deuda antigua?",
    answer: "No ignores la cobranza, pero tampoco pagues sin asesorarte. Podemos determinar si la deuda ha prescrito, si los intereses son abusivos o si la cobranza vulnera tus derechos como consumidor.",
  },
  {
    question: "¿Cuánto cuesta redactar un contrato?",
    answer: "Depende de la complejidad del contrato. Ofrecemos presupuestos transparentes desde la primera consulta. Un contrato bien redactado previene conflictos futuros que pueden ser mucho más costosos.",
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Derecho Civil en Temuco"
        subtitle="Defensa de deudores, contratos, juicios civiles y asesoría patrimonial. Protegemos tu patrimonio."
        breadcrumbs={[{ label: "Derecho Civil", href: "/derecho-civil-temuco/" }]}
      />
      <ServicePageContent
        title="Derecho Civil"
        subtitle="Contratos, deudas, litigios"
        intro="En Defensur ofrecemos asesoría integral en derecho civil para particulares y empresas. Desde la defensa contra cobranzas abusivas hasta la redacción de contratos y litigios complejos, nuestro equipo protege tus intereses patrimoniales con estrategia y eficiencia."
        highlights={highlights}
        details={details}
        faqs={faqs}
      />
    </>
  )
}
