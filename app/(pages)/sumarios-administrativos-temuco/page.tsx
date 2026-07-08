import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { ServicePageContent } from "@/components/service-page-content"

export const metadata: Metadata = {
  title: "Sumarios Administrativos en Temuco y La Araucanía — Defensa de Funcionarios Públicos | Defensur",
  description: "Defensa legal en sumarios administrativos en Temuco, La Araucanía y todo el sur de Chile. Asesoría a funcionarios públicos, sanciones de salud y registro de marcas INAPI. Consulta gratuita.",
  keywords: "sumario administrativo temuco, sumario administrativo araucanía, funcionarios públicos, defensa administrativa, sanciones salud, registro marcas INAPI, abogado administrativo valdivia, abogado administrativo osorno",
  openGraph: {
    title: "Sumarios Administrativos en Temuco y La Araucanía — Defensa de Funcionarios Públicos | Defensur",
    description: "Defensa legal en sumarios administrativos en Temuco, La Araucanía y todo el sur de Chile. Asesoría a funcionarios públicos, sanciones de salud y registro de marcas INAPI. Consulta gratuita.",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Sumarios Administrativos en Temuco y La Araucanía — Defensa de Funcionarios Públicos | Defensur" }],
  }
}

const highlights = [
  {
    title: "Defensa en Sumarios",
    description: "Representación completa durante todo el proceso sumarial, garantizando el debido proceso y derecho a defensa.",
  },
  {
    title: "Sanciones de Salud",
    description: "Impugnación de sanciones y multas impuestas por la Superintendencia de Salud y otras entidades.",
  },
  {
    title: "Registro de Marcas",
    description: "Registro de marcas comerciales ante INAPI. Protección de tu propiedad intelectual.",
  },
]

const details = [
  {
    heading: "¿Qué es un Sumario Administrativo?",
    content: `El sumario administrativo es un procedimiento investigativo que se sigue a funcionarios públicos cuando se denuncian faltas o irregularidades en el ejercicio de sus funciones. Puede derivar en amonestaciones, multas, suspensiones o destitución.

Es fundamental contar con asesoría legal desde el inicio del proceso, ya que los plazos son breves y las consecuencias pueden ser graves para tu carrera funcionaria.`,
  },
  {
    heading: "Derechos del Sumariado",
    content: `Como funcionario sumariado, tienes derechos fundamentales que deben ser respetados:

• Derecho a conocer los cargos formulados
• Derecho a presentar descargos y pruebas
• Derecho a designar un abogado defensor
• Derecho al debido proceso y plazo razonable
• Derecho a impugnar la resolución final

En Defensur garantizamos que se respeten todos tus derechos durante el procedimiento y diseñamos la mejor estrategia de defensa.`,
  },
  {
    heading: "Impugnación de Sanciones",
    content: `Si ya fuiste sancionado, podemos impugnar la resolución a través de:

• Recurso de reposición ante la misma autoridad
• Recurso jerárquico ante el superior jerárquico
• Recurso de protección ante la Corte de Apelaciones
• Acción de nulidad ante los tribunales

Cada vía tiene plazos específicos que es necesario respetar. Te recomendamos consultar lo antes posible para evaluar las opciones de impugnación disponibles.`,
  },
  {
    heading: "Sanciones de Salud y Registro de Marcas",
    content: `Además de sumarios administrativos, asesoramos en:

• Impugnación de sanciones de la Superintendencia de Salud
• Defensa ante fiscalizaciones sanitarias
• Registro de marcas comerciales ante INAPI
• Oposición a registro de marcas de terceros
• Renovación y protección de marca

Contamos con experiencia en procedimientos ante múltiples organismos del Estado.`,
  },
]

const faqs = [
  {
    question: "¿Debo declarar en el sumario sin abogado?",
    answer: "Tienes derecho a designar un abogado defensor desde el inicio del sumario. Te recomendamos no declarar sin asesoría legal, ya que tus declaraciones pueden ser usadas en tu contra.",
  },
  {
    question: "¿Cuánto tiempo dura un sumario administrativo?",
    answer: "El plazo legal es de 60 días hábiles, prorrogable por 30 días más. Sin embargo, en la práctica puede variar según la complejidad del caso y la autoridad instructora.",
  },
  {
    question: "¿Puedo ser suspendido durante el sumario?",
    answer: "Sí, la autoridad puede decretar la suspensión preventiva del funcionario. Sin embargo, esta medida no es automática y podemos argumentar en contra de ella si no se justifica.",
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Sumarios Administrativos"
        subtitle="Defensa legal de funcionarios públicos en sumarios, sanciones y procedimientos administrativos."
        breadcrumbs={[{ label: "Sumarios Administrativos", href: "/sumarios-administrativos-temuco/" }]}
      />
      <ServicePageContent
        title="Sumarios Administrativos"
        subtitle="Defensa de funcionarios públicos"
        intro="En Defensur defendemos a funcionarios públicos en todo tipo de procedimientos sumariales. Desde la notificación de cargos hasta la resolución final, nuestro equipo garantiza el debido proceso y la protección de tus derechos como servidor público."
        highlights={highlights}
        details={details}
        faqs={faqs}
      />
    </>
  )
}
