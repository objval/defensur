import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { ServicePageContent } from "@/components/service-page-content"

export const metadata: Metadata = {
  title: "Abogados Laborales en Temuco y La Araucanía — Despidos, Tutela y Acoso | Defensur",
  description: "Especialistas en derecho laboral en Temuco, La Araucanía y todo el sur de Chile. Despidos injustificados, tutela laboral, acoso, indemnizaciones y defensa de funcionarios públicos. Consulta gratuita.",
  keywords: "abogado laboral temuco, abogado laboral araucanía, despido injustificado, tutela laboral, acoso laboral, indemnización laboral, abogados laborales temuco, abogado laboral valdivia, abogado laboral osorno, abogado laboral puerto montt",
  openGraph: {
    title: "Abogados Laborales en Temuco y La Araucanía — Despidos, Tutela y Acoso | Defensur",
    description: "Especialistas en derecho laboral en Temuco, La Araucanía y todo el sur de Chile. Despidos injustificados, tutela laboral, acoso, indemnizaciones y defensa de funcionarios públicos. Consulta gratuita.",
    images: [{ url: "/og/laboral.png", width: 1200, height: 630, alt: "Abogados Laborales en Temuco y La Araucanía — Despidos, Tutela y Acoso | Defensur" }],
  }
}

const highlights = [
  {
    title: "Despidos Injustificados",
    description:
      "Reclamamos tu indemnización cuando el despido no cumple con las causales legales establecidas en el Código del Trabajo.",
  },
  {
    title: "Tutela Laboral",
    description:
      "Defendemos tus derechos fundamentales vulnerados: libertad sindical, no discriminación, integridad psíquica y dignidad.",
  },
  {
    title: "Funcionarios Públicos",
    description:
      "Asesoría especializada en sumarios administrativos, Calificación de Personal y recursos administrativos.",
  },
]

const details = [
  {
    heading: "Despidos Injustificados y Autodespidos",
    content: `En Chile, un despido debe fundarse en causales específicas establecidas en el Código del Trabajo. Cuando el empleador invoca una causal que no corresponde a la realidad, o no respeta el procedimiento legal, el despido es injustificado y da derecho a indemnización.

En Defensur analizamos tu caso de forma integral: revisamos la carta de despido, las causales invocadas, el procedimiento seguido y las prestaciones adeudadas. Diseñamos la estrategia legal más efectiva para maximizar tu indemnización.

El autodespido o despido indirecto procede cuando el empleador incurre en incumplimientos graves que hacen imposible la continuidad de la relación laboral. También en este caso reclamamos las indemnizaciones que te corresponden.`,
  },
  {
    heading: "Acoso Laboral y Vulneración de Derechos",
    content: `El acoso laboral (mobbing) es una conducta sistemática que atenta contra la dignidad, integridad psíquica o física del trabajador. Incluye hostigamiento, aislamiento, sobrecarga de trabajo, humillaciones y cualquier acción que busque el menoscabo del trabajador.

A través de la acción de tutela laboral, protegemos tus derechos fundamentales ante el Tribunal del Trabajo. Estas causas son urgentes y se tramitan con preferencia, permitiendo la adopción de medidas cautelares inmediatas.

Hemos obtenido sentencias millonarias contra municipalidades, hospitales y empresas privadas por vulneración de derechos fundamentales.`,
  },
  {
    heading: "Indemnizaciones y Prestaciones Laborales",
    content: `Gestionamos el cobro de todas las prestaciones laborales que te corresponden:

• Indemnización sustitutiva del aviso previo
• Indemnización por años de servicio (con recargos legales si corresponde)
• Feriado legal y proporcional adeudado
• Cotizaciones previsionales impagas
• Asignación familiar y demás bonificaciones

Realizamos cobranza judicial y extrajudicial, y representamos ante la Inspección del Trabajo en mediaciones y reclamos.`,
  },
  {
    heading: "Representación ante la Inspección del Trabajo",
    content: `Te acompañamos en todo el proceso de mediación ante la Inspección del Trabajo, desde la presentación del reclamo hasta la audiencia de mediación. Si no se llega a acuerdo, interponemos las acciones judiciales correspondientes.

También asistimos en fiscalizaciones, citaciones y procedimientos administrativos ante la Dirección del Trabajo.`,
  },
]

const faqs = [
  {
    question: "¿Cuánto tiempo tengo para demandar por despido injustificado?",
    answer:
      "Tienes un plazo de 6 meses hábiles desde la fecha del despido para interponer la acción de tutela laboral. Para el cobro de prestaciones laborales el plazo es de 6 meses. Te recomendamos consultar lo antes posible para preservar todas tus opciones legales.",
  },
  {
    question: "¿Cuánto me corresponde de indemnización por despido?",
    answer:
      "Depende de tu antigüedad, causa de despido y remuneración. La indemnización básica es de un mes de sueldo por año trabajado (con tope de 11 meses). Si el despido es declarado injustificado, los tribunales pueden aplicar recargos del 30% al 80% adicionales.",
  },
  {
    question: "¿Qué documentos necesito para mi caso?",
    answer:
      "Contrato de trabajo, últimas 12 liquidaciones de sueldo, carta de despido, finiquito (si firmaste uno), cotizaciones previsionales y cualquier comunicación escrita con tu empleador. Si no tienes todos los documentos, podemos obtenerlos ante la Inspección del Trabajo.",
  },
  {
    question: "¿Puedo ser despedido estando embarazada o con fuero maternal?",
    answer:
      "No. El trabajador con fuero maternal no puede ser despedido sin autorización judicial. Si fuiste despedida estando embarazada o durante el período de fuero, el despido es nulo y puedes solicitar tu reincorporación o una indemnización agravada.",
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Abogados Laborales en Temuco"
        subtitle="Especialistas en despidos injustificados, tutela laboral, acoso y defensa de funcionarios públicos. Más de 15 años de experiencia."
        breadcrumbs={[{ label: "Derecho Laboral", href: "/derecho-laboral-temuco/" }]}
      />
      <ServicePageContent
        title="Derecho Laboral"
        subtitle="Despidos, tutela y acoso"
        intro="En Defensur somos especialistas en derecho laboral con más de 15 años de experiencia defendiendo los derechos de trabajadores en la Región de La Araucanía. Nuestro equipo liderado por Nicolás Yáñez ha logrado sentencias históricas contra municipalidades, hospitales y empresas privadas."
        highlights={highlights}
        details={details}
        faqs={faqs}
      />
    </>
  )
}
