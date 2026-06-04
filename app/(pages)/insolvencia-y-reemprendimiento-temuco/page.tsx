import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { ServicePageContent } from "@/components/service-page-content"

export const metadata: Metadata = {
  title: "Insolvencia y Reemprendimiento en Temuco — Ley 20.720 | Defensur",
  description:
    "Asesoría legal en insolvencia personal y empresarial en Temuco. Renegociación de deudas, liquidación voluntaria y protección patrimonial bajo Ley 20.720.",
  keywords:
    "insolvencia temuco, quiebra personal, renegociación deudas, liquidación voluntaria, ley 20.720, reemprendimiento temuco",
}

const highlights = [
  {
    title: "Renegociación de Deudas",
    description: "Procedimiento ante la Superintendencia para reorganizar tus deudas con mejores condiciones de pago.",
  },
  {
    title: "Liquidación Voluntaria",
    description: "Proceso ordenado para liquidar tu patrimonio y obtener el perdón de deudas remanentes.",
  },
  {
    title: "Protección Patrimonial",
    description: "Estrategias legales para proteger tus bienes durante procesos de insolvencia.",
  },
]

const details = [
  {
    heading: "¿Qué es la Ley de Insolvencia y Reemprendimiento?",
    content: "La Ley 20.720 establece un procedimiento especial para personas y empresas que no pueden cumplir con sus obligaciones financieras. Esta ley reemplazó la antigua ley de quiebras y ofrece dos caminos principales:

1. Renegociación: Un proceso para reorganizar las deudas y establecer un plan de pago viable.
2. Liquidación: Cuando la renegociación no es posible, se realiza un proceso ordenado de liquidación de activos con posibilidad de perdón de deudas.

El objetivo de la ley es permitir el reemprendimiento, evitando que las personas queden atrapadas en deudas impagables de por vida.",
  },
  {
    heading: "Renegociación de Deudas",
    content: "El procedimiento de renegociación se realiza ante un síndico de quiebras y permite:

• Reducir el monto total de las deudas
• Extender los plazos de pago
• Reducir o eliminar intereses
• Condonar parte del capital adeudado
• Establecer cuotas mensuales compatibles con tus ingresos

Para acceder a la renegociación, debes tener al menos 2 deudas con distintos acreedores y encontrarte en cesación de pagos. El procedimiento dura aproximadamente 4 a 6 meses.",
  },
  {
    heading: "Liquidación Voluntaria",
    content: "Cuando la renegociación no es viable, puedes solicitar la liquidación voluntaria de tu patrimonio. Este proceso:

• Detiene todos los cobros y demandas en tu contra
• Permite un proceso ordenado de liquidación de activos
• Otorga el beneficio de desasimiento (mantienes ciertos bienes esenciales)
• Al finalizar, puedes obtener el perdón de las deudas remanentes (fresh start)

Es importante asesorarse antes de iniciar este proceso para maximizar la protección de tu patrimonio.",
  },
  {
    heading: "Insolvencia Empresarial",
    content: "Las empresas también pueden acogerse a los procedimientos de la Ley 20.720. La continuación del giro permite que la empresa siga operando mientras se renegocian las deudas, preservando empleos y valor.

Asesoramos a dueños de pymes y empresas en:

• Renegociación empresarial con continuidad operativa
• Liquidación voluntaria de empresas
• Protección del patrimonio personal del empresario
• Planificación de reestructuración preventiva",
  },
]

const faqs = [
  {
    question: "¿Pierdo todos mis bienes en la insolvencia?",
    answer: "No necesariamente. El desasimiento te permite conservar ciertos bienes esenciales (herramientas de trabajo, vestuario, muebles básicos). Además, existen estrategias legales para proteger tu patrimonio antes y durante el proceso.",
  },
  {
    question: "¿Cuánto tiempo dura el proceso de insolvencia?",
    answer: "La renegociación dura entre 4 y 6 meses aproximadamente. La liquidación puede tomar entre 6 meses y 1 año dependiendo de la complejidad del caso.",
  },
  {
    question: "¿Puedo emprender nuevamente después de la insolvencia?",
    answer: "Sí, precisamente la Ley 20.720 está diseñada para el reemprendimiento. Una vez finalizado el proceso, obtienes el perdón de deudas y puedes empezar de nuevo sin el peso de obligaciones impagables.",
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Insolvencia y Reemprendimiento"
        subtitle="Renegociación de deudas, liquidación voluntaria y protección patrimonial bajo la Ley 20.720."
        breadcrumbs={[{ label: "Insolvencia", href: "/insolvencia-y-reemprendimiento-temuco/" }]}
      />
      <ServicePageContent
        title="Insolvencia y Reemprendimiento"
        subtitle="Renegociación, liquidación, fresh start"
        intro="Si las deudas te superan, no estás solo. La Ley 20.720 ofrece herramientas legales para reorganizar tus finanzas o liquidar ordenadamente tu patrimonio con posibilidad de perdón de deudas. En Defensur te acompañamos en todo el proceso hacia el reemprendimiento."
        highlights={highlights}
        details={details}
        faqs={faqs}
      />
    </>
  )
}
