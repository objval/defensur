import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { ServicePageContent } from "@/components/service-page-content"

export const metadata: Metadata = {
  title: "Abogados de Familia en Temuco y La Araucanía — Divorcios, Alimentos, Custodia | Defensur",
  description: "Abogados especialistas en derecho de familia en Temuco, La Araucanía y todo el sur de Chile. Divorcios, pensión de alimentos, cuidado personal, régimen de visitas y medidas de protección. Consulta gratuita.",
  keywords: "abogado familia temuco, abogado familia araucanía, divorcio temuco, pensión alimentos, cuidado personal, régimen visitas, violencia intrafamiliar, abogados familia temuco, abogado familia valdivia, abogado familia osorno",
  openGraph: {
    title: "Abogados de Familia en Temuco y La Araucanía — Divorcios, Alimentos, Custodia | Defensur",
    description: "Abogados especialistas en derecho de familia en Temuco, La Araucanía y todo el sur de Chile. Divorcios, pensión de alimentos, cuidado personal, régimen de visitas y medidas de protección. Consulta gratuita.",
    images: [{ url: "/og/familia.jpg", width: 1200, height: 630, alt: "Abogados de Familia en Temuco y La Araucanía — Divorcios, Alimentos, Custodia | Defensur" }],
  }
}

const highlights = [
  {
    title: "Divorcios",
    description: "Mutuo acuerdo y unilaterales. Tramitación rápida y protección de tus derechos patrimoniales y personales.",
  },
  {
    title: "Pensión de Alimentos",
    description: "Cálculo, demanda y cobro de pensiones atrasadas. Apremios judiciales y retención de remuneraciones.",
  },
  {
    title: "Medidas de Protección",
    description: "Protección urgente ante situaciones de riesgo para menores o cónyuges. Tramitación inmediata.",
  },
]

const details = [
  {
    heading: "Divorcios de Mutuo Acuerdo y Unilaterales",
    content: `El divorcio de mutuo acuerdo se tramita ante notario o ante el Tribunal de Familia, con una duración aproximada de 3 a 6 meses. Es necesario que hayan transcurrido al menos 1 año desde la separación.

El divorcio unilateral requiere acreditar al menos 3 años de separación y se tramita ante el Tribunal de Familia. Puede tomar entre 8 meses y 2 años dependiendo de la complejidad del caso.

En ambos casos, es fundamental regular la situación de los hijos menores, la liquidación de la sociedad conyugal y el eventual derecho a alimentos entre cónyuges.`,
  },
  {
    heading: "Pensión de Alimentos",
    content: `La pensión de alimentos es un derecho de los menores y del cónyuge que necesita protección. Calculamos el monto adecuado según las necesidades del alimentario y las capacidades del alimentante.

Para el cobro de pensiones atrasadas, iniciamos apremios judiciales que pueden incluir:

• Retención de remuneraciones
• Arresto nocturno del deudor
• Prohibición de salir del país
• Arraigo
• Retención de devolución de impuestos

También realizamos cobranza judicial y extrajudicial de deudas alimentarias.`,
  },
  {
    heading: "Cuidado Personal y Régimen de Visitas",
    content: `El cuidado personal (antes tenencia) determina con quién vivirán los hijos menores después del divorcio o separación. El tribunal prioriza el interés superior del niño.

El régimen de visitas establece cómo el padre o madre que no tiene el cuidado personal se relacionará con los hijos. Puede ser amplio, restringido o supervisado según las circunstancias.

Ambos temas pueden modificarse si cambian las circunstancias que motivaron la decisión original.`,
  },
  {
    heading: "Violencia Intrafamiliar (VIF) y Medidas de Protección",
    content: `Ante situaciones de violencia intrafamiliar, solicitamos medidas de protección urgentes ante el Tribunal de Familia. Estas pueden incluir:

• Prohibición de acercamiento
• Salida del hogar del agresor
• Cuidado personal provisorio de los menores
• Pensión de alimentos provisoria
• Retención de armas
• Régimen de visitas supervisado

Las medidas de protección se pueden solicitar de forma urgente y el tribunal debe pronunciarse en un plazo máximo de 24 a 48 horas.`,
  },
  {
    heading: "Adopciones y Autorizaciones de Viaje",
    content: `Asesoramos en todo el proceso de adopción, desde la postulación hasta la sentencia definitiva. También gestionamos autorizaciones judiciales de viaje para menores cuando uno de los progenitores no da su consentimiento.

En temas de adopción, acompañamos tanto a adoptantes nacionales como a aquellos que se encuentran en procesos de adopción internacional, asegurando el cumplimiento de todos los requisitos legales.`,
  },
]

const faqs = [
  {
    question: "¿Cuánto demora un divorcio de mutuo acuerdo?",
    answer: "Entre 3 y 6 meses aproximadamente, dependiendo de si se tramita ante notario (cuando no hay hijos menores) o ante el Tribunal de Familia.",
  },
  {
    question: "¿Cómo se calcula la pensión de alimentos?",
    answer: "El tribunal considera las necesidades del alimentario (vivienda, educación, salud, vestuario, alimentación) y las capacidades económicas del alimentante. No existe un porcentaje fijo, pero habitualmente se fija entre un 20% y 30% de los ingresos por cada hijo.",
  },
  {
    question: "¿Qué pasa si el padre no paga la pensión?",
    answer: "Iniciamos apremios judiciales: arresto nocturno, retención de remuneraciones, prohibición de salir del país. En casos graves, se puede configurar el delito de abandono de familia.",
  },
  {
    question: "¿Puedo obtener el cuidado personal de mis hijos?",
    answer: "Sí, el tribunal evaluará el interés superior del niño considerando factores como el vínculo afectivo, estabilidad, entorno y capacidad de cuidado. Te asesoramos para presentar la mejor solicitud posible.",
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Abogados de Familia en Temuco"
        subtitle="Divorcios, pensión de alimentos, cuidado personal y medidas de protección. Defendemos los derechos de tu familia."
        breadcrumbs={[{ label: "Derecho de Familia", href: "/abogados-familia-temuco/" }]}
      />
      <ServicePageContent
        title="Derecho de Familia"
        subtitle="Divorcios, alimentos, custodia"
        intro="En Defensur entendemos que los asuntos de familia son delicados y requieren un trato humano además de expertise legal. Nuestro equipo especializado en derecho de familia te acompaña en cada etapa del proceso, priorizando siempre el bienestar de los menores y la protección de tus derechos."
        highlights={highlights}
        details={details}
        faqs={faqs}
      />
    </>
  )
}
