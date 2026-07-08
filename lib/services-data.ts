// lib/services-data.ts — All service page content in one typed structure.
// Each service page imports its entry by slug and passes it to <ServicePageContent />.

import type { Metadata } from "next"
import {
  BriefcaseBusiness,
  Landmark,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type ServiceHighlight = {
  title: string
  description: string
}

export type ServiceDetail = {
  heading: string
  content: string
}

export type ServiceFaq = {
  question: string
  answer: string
}

export type ServiceData = {
  slug: string
  icon: LucideIcon
  // Metadata
  title: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  ogImage: string
  // Page hero
  heroTitle: string
  heroSubtitle: string
  // Content
  subtitle: string
  intro: string
  highlights: ServiceHighlight[]
  details: ServiceDetail[]
  faqs: ServiceFaq[]
}

export const SERVICES: Record<string, ServiceData> = {
  "derecho-laboral": {
    slug: "derecho-laboral",
    icon: Scale,
    title: "Derecho Laboral",
    metaTitle: "Abogados Laborales en Temuco y La Araucanía — Despidos, Tutela y Acoso",
    metaDescription: "Especialistas en derecho laboral en Temuco, La Araucanía y todo el sur de Chile. Despidos injustificados, tutela laboral, acoso, indemnizaciones y defensa de funcionarios públicos. Consulta gratuita.",
    metaKeywords: "abogado laboral temuco, abogado laboral araucanía, despido injustificado, tutela laboral, acoso laboral, indemnización laboral, abogados laborales temuco, abogado laboral valdivia, abogado laboral osorno, abogado laboral puerto montt",
    ogImage: "/og/laboral.jpg",
    heroTitle: "Abogados Laborales en Temuco",
    heroSubtitle: "Especialistas en despidos injustificados, tutela laboral, acoso y defensa de funcionarios públicos. Más de 15 años de experiencia.",
    subtitle: "Despidos, tutela y acoso",
    intro: "En Defensur somos especialistas en derecho laboral con más de 15 años de experiencia defendiendo los derechos de trabajadores en la Región de La Araucanía. Nuestro equipo liderado por Nicolás Yáñez ha logrado sentencias históricas contra municipalidades, hospitales y empresas privadas.",
    highlights: [
      { title: "Despidos Injustificados", description: "Reclamamos tu indemnización cuando el despido no cumple con las causales legales establecidas en el Código del Trabajo." },
      { title: "Tutela Laboral", description: "Defendemos tus derechos fundamentales vulnerados: libertad sindical, no discriminación, integridad psíquica y dignidad." },
      { title: "Funcionarios Públicos", description: "Asesoría especializada en sumarios administrativos, Calificación de Personal y recursos administrativos." },
    ],
    details: [
      { heading: "Despidos Injustificados y Autodespidos", content: `En Chile, un despido debe fundarse en causales específicas establecidas en el Código del Trabajo. Cuando el empleador invoca una causal que no corresponde a la realidad, o no respeta el procedimiento legal, el despido es injustificado y da derecho a indemnización.

En Defensur analizamos tu caso de forma integral: revisamos la carta de despido, las causales invocadas, el procedimiento seguido y las prestaciones adeudadas. Diseñamos la estrategia legal más efectiva para maximizar tu indemnización.

El autodespido o despido indirecto procede cuando el empleador incurre en incumplimientos graves que hacen imposible la continuidad de la relación laboral. También en este caso reclamamos las indemnizaciones que te corresponden.` },
      { heading: "Acoso Laboral y Vulneración de Derechos", content: `El acoso laboral (mobbing) es una conducta sistemática que atenta contra la dignidad, integridad psíquica o física del trabajador. Incluye hostigamiento, aislamiento, sobrecarga de trabajo, humillaciones y cualquier acción que busque el menoscabo del trabajador.

A través de la acción de tutela laboral, protegemos tus derechos fundamentales ante el Tribunal del Trabajo. Estas causas son urgentes y se tramitan con preferencia, permitiendo la adopción de medidas cautelares inmediatas.

Hemos obtenido sentencias millonarias contra municipalidades, hospitales y empresas privadas por vulneración de derechos fundamentales.` },
      { heading: "Indemnizaciones y Prestaciones Laborales", content: `Gestionamos el cobro de todas las prestaciones laborales que te corresponden:

• Indemnización sustitutiva del aviso previo
• Indemnización por años de servicio (con recargos legales si corresponde)
• Feriado legal y proporcional adeudado
• Cotizaciones previsionales impagas
• Asignación familiar y demás bonificaciones

Realizamos cobranza judicial y extrajudicial, y representamos ante la Inspección del Trabajo en mediaciones y reclamos.` },
      { heading: "Representación ante la Inspección del Trabajo", content: `Te acompañamos en todo el proceso de mediación ante la Inspección del Trabajo, desde la presentación del reclamo hasta la audiencia de mediación. Si no se llega a acuerdo, interponemos las acciones judiciales correspondientes.

También asistimos en fiscalizaciones, citaciones y procedimientos administrativos ante la Dirección del Trabajo.` },
    ],
    faqs: [
      { question: "¿Cuánto tiempo tengo para demandar por despido injustificado?", answer: "Tienes un plazo de 6 meses hábiles desde la fecha del despido para interponer la acción de tutela laboral. Para el cobro de prestaciones laborales el plazo es de 6 meses. Te recomendamos consultar lo antes posible para preservar todas tus opciones legales." },
      { question: "¿Cuánto me corresponde de indemnización por despido?", answer: "Depende de tu antigüedad, causa de despido y remuneración. La indemnización básica es de un mes de sueldo por año trabajado (con tope de 11 meses). Si el despido es declarado injustificado, los tribunales pueden aplicar recargos del 30% al 80% adicionales." },
      { question: "¿Qué documentos necesito para mi caso?", answer: "Contrato de trabajo, últimas 12 liquidaciones de sueldo, carta de despido, finiquito (si firmaste uno), cotizaciones previsionales y cualquier comunicación escrita con tu empleador. Si no tienes todos los documentos, podemos obtenerlos ante la Inspección del Trabajo." },
      { question: "¿Puedo ser despedido estando embarazada o con fuero maternal?", answer: "No. El trabajador con fuero maternal no puede ser despedido sin autorización judicial. Si fuiste despedida estando embarazada o durante el período de fuero, el despido es nulo y puedes solicitar tu reincorporación o una indemnización agravada." },
    ],
  },

  "derecho-familia": {
    slug: "derecho-familia",
    icon: Users,
    title: "Derecho de Familia",
    metaTitle: "Abogados de Familia en Temuco y La Araucanía — Divorcios, Alimentos, Custodia",
    metaDescription: "Abogados especialistas en derecho de familia en Temuco, La Araucanía y todo el sur de Chile. Divorcios, pensión de alimentos, cuidado personal, régimen de visitas y medidas de protección. Consulta gratuita.",
    metaKeywords: "abogado familia temuco, abogado familia araucanía, divorcio temuco, pensión alimentos, cuidado personal, régimen visitas, violencia intrafamiliar, abogados familia temuco, abogado familia valdivia, abogado familia osorno",
    ogImage: "/og/familia.jpg",
    heroTitle: "Abogados de Familia en Temuco",
    heroSubtitle: "Divorcios, pensión de alimentos, cuidado personal y medidas de protección. Defendemos los derechos de tu familia.",
    subtitle: "Divorcios, alimentos, custodia",
    intro: "En Defensur entendemos que los asuntos de familia son delicados y requieren un trato humano además de expertise legal. Nuestro equipo especializado en derecho de familia te acompaña en cada etapa del proceso, priorizando siempre el bienestar de los menores y la protección de tus derechos.",
    highlights: [
      { title: "Divorcios", description: "Mutuo acuerdo y unilaterales. Tramitación rápida y protección de tus derechos patrimoniales y personales." },
      { title: "Pensión de Alimentos", description: "Cálculo, demanda y cobro de pensiones atrasadas. Apremios judiciales y retención de remuneraciones." },
      { title: "Medidas de Protección", description: "Protección urgente ante situaciones de riesgo para menores o cónyuges. Tramitación inmediata." },
    ],
    details: [
      { heading: "Divorcios de Mutuo Acuerdo y Unilaterales", content: `El divorcio de mutuo acuerdo se tramita ante notario o ante el Tribunal de Familia, con una duración aproximada de 3 a 6 meses. Es necesario que hayan transcurrido al menos 1 año desde la separación.

El divorcio unilateral requiere acreditar al menos 3 años de separación y se tramita ante el Tribunal de Familia. Puede tomar entre 8 meses y 2 años dependiendo de la complejidad del caso.

En ambos casos, es fundamental regular la situación de los hijos menores, la liquidación de la sociedad conyugal y el eventual derecho a alimentos entre cónyuges.` },
      { heading: "Pensión de Alimentos", content: `La pensión de alimentos es un derecho de los menores y del cónyuge que necesita protección. Calculamos el monto adecuado según las necesidades del alimentario y las capacidades del alimentante.

Para el cobro de pensiones atrasadas, iniciamos apremios judiciales que pueden incluir:

• Retención de remuneraciones
• Arresto nocturno del deudor
• Prohibición de salir del país
• Arraigo
• Retención de devolución de impuestos

También realizamos cobranza judicial y extrajudicial de deudas alimentarias.` },
      { heading: "Cuidado Personal y Régimen de Visitas", content: `El cuidado personal (antes tenencia) determina con quién vivirán los hijos menores después del divorcio o separación. El tribunal prioriza el interés superior del niño.

El régimen de visitas establece cómo el padre o madre que no tiene el cuidado personal se relacionará con los hijos. Puede ser amplio, restringido o supervisado según las circunstancias.

Ambos temas pueden modificarse si cambian las circunstancias que motivaron la decisión original.` },
      { heading: "Violencia Intrafamiliar (VIF) y Medidas de Protección", content: `Ante situaciones de violencia intrafamiliar, solicitamos medidas de protección urgentes ante el Tribunal de Familia. Estas pueden incluir:

• Prohibición de acercamiento
• Salida del hogar del agresor
• Cuidado personal provisorio de los menores
• Pensión de alimentos provisoria
• Retención de armas
• Régimen de visitas supervisado

Las medidas de protección se pueden solicitar de forma urgente y el tribunal debe pronunciarse en un plazo máximo de 24 a 48 horas.` },
      { heading: "Adopciones y Autorizaciones de Viaje", content: `Asesoramos en todo el proceso de adopción, desde la postulación hasta la sentencia definitiva. También gestionamos autorizaciones judiciales de viaje para menores cuando uno de los progenitores no da su consentimiento.

En temas de adopción, acompañamos tanto a adoptantes nacionales como a aquellos que se encuentran en procesos de adopción internacional, asegurando el cumplimiento de todos los requisitos legales.` },
    ],
    faqs: [
      { question: "¿Cuánto demora un divorcio de mutuo acuerdo?", answer: "Entre 3 y 6 meses aproximadamente, dependiendo de si se tramita ante notario (cuando no hay hijos menores) o ante el Tribunal de Familia." },
      { question: "¿Cómo se calcula la pensión de alimentos?", answer: "El tribunal considera las necesidades del alimentario (vivienda, educación, salud, vestuario, alimentación) y las capacidades económicas del alimentante. No existe un porcentaje fijo, pero habitualmente se fija entre un 20% y 30% de los ingresos por cada hijo." },
      { question: "¿Qué pasa si el padre no paga la pensión?", answer: "Iniciamos apremios judiciales: arresto nocturno, retención de remuneraciones, prohibición de salir del país. En casos graves, se puede configurar el delito de abandono de familia." },
      { question: "¿Puedo obtener el cuidado personal de mis hijos?", answer: "Sí, el tribunal evaluará el interés superior del niño considerando factores como el vínculo afectivo, estabilidad, entorno y capacidad de cuidado. Te asesoramos para presentar la mejor solicitud posible." },
    ],
  },

  "derecho-civil": {
    slug: "derecho-civil",
    icon: BriefcaseBusiness,
    title: "Derecho Civil",
    metaTitle: "Abogados Civiles en Temuco y La Araucanía — Contratos, Deudas, Prescripción",
    metaDescription: "Asesoría legal en derecho civil en Temuco, La Araucanía y todo el sur de Chile. Defensa de deudores, prescripción de deudas, contratos y juicios civiles. Consulta gratuita.",
    metaKeywords: "abogado civil temuco, abogado civil araucanía, defensa deudores, prescripción deudas, contratos temuco, juicios civiles, abogados civiles temuco, abogado civil valdivia, abogado civil osorno, abogado civil puerto montt",
    ogImage: "/og/civil.jpg",
    heroTitle: "Derecho Civil en Temuco",
    heroSubtitle: "Defensa de deudores, contratos, juicios civiles y asesoría patrimonial. Protegemos tu patrimonio.",
    subtitle: "Contratos, deudas, litigios",
    intro: "En Defensur ofrecemos asesoría integral en derecho civil para particulares y empresas. Desde la defensa contra cobranzas abusivas hasta la redacción de contratos y litigios complejos, nuestro equipo protege tus intereses patrimoniales con estrategia y eficiencia.",
    highlights: [
      { title: "Defensa de Deudores", description: "Prescripción de deudas, renegociación y protección patrimonial ante cobranzas judiciales." },
      { title: "Contratos", description: "Redacción, revisión y defensa en conflictos contractuales: compraventa, mutuos, sociedades." },
      { title: "Asesoría Corporativa", description: "Constitución de sociedades, liquidación, asesoría patrimonial y protección de activos." },
    ],
    details: [
      { heading: "Defensa de Deudores y Prescripción de Deudas", content: `Muchas deudas prescriben con el tiempo, lo que significa que legalmente ya no son exigibles. Analizamos tu situación financiera y determinamos si tus deudas han prescrito o están próximas a prescribir.

Los plazos de prescripción más comunes son:

• Pagarés y letras de cambio: 3 años
• Facturas e instrumentos de crédito: 1 año
• Deudas comerciales en general: 5 años
• Contratos de mutuo: 5 años

También defendemos contra cobranzas abusivas, embargos ilegales y prácticas de cobro que vulneren tus derechos como consumidor.` },
      { heading: "Contratos y Conflictos Contractuales", content: `Redactamos y revisamos todo tipo de contratos para proteger tus intereses:

• Contratos de compraventa (inmuebles, vehículos, comerciales)
• Contratos de mutuo (préstamos de dinero)
• Contratos de arriendo
• Contratos de prestación de servicios
• Escrituras de sociedad y actas

En caso de incumplimiento contractual, diseñamos la estrategia legal más adecuada, ya sea a través de demanda de cumplimiento, resolución del contrato o indemnización de perjuicios.` },
      { heading: "Juicios Civiles y Litigación", content: `Representamos en todo tipo de juicios civiles ante los tribunales de justicia:

• Juicios de mínima cuantía y cuantía ordinaria
• Juicios ejecutivos (cobro de instrumentos)
• Juicios ordinarios (declarativos)
• Incidentes y recursos procesales
• Medidas precautorias y cautelares

Nuestra prioridad es resolver el conflicto de la forma más eficiente posible, ya sea mediante negociación directa, mediación o litigio judicial.` },
      { heading: "Liquidación de Sociedades y Asesoría Patrimonial", content: `Asesoramos en la constitución, administración y liquidación de sociedades comerciales. Gestionamos:

• Constitución de SpA, SRL y SA
• Modificación de estatutos
• Disolución y liquidación de sociedades
• Conflictos entre socios
• Protección de patrimonio personal
• Planificación sucesoria` },
    ],
    faqs: [
      { question: "¿Mis deudas pueden prescribir?", answer: "Sí, muchas deudas tienen plazos legales de prescripción. Por ejemplo, pagarés prescriben a los 3 años y facturas al año. Evaluamos tu caso para determinar si alguna deuda ha prescrito y ya no es exigible legalmente." },
      { question: "¿Qué hago si me están cobrando una deuda antigua?", answer: "No ignores la cobranza, pero tampoco pagues sin asesorarte. Podemos determinar si la deuda ha prescrito, si los intereses son abusivos o si la cobranza vulnera tus derechos como consumidor." },
      { question: "¿Cuánto cuesta redactar un contrato?", answer: "Depende de la complejidad del contrato. Ofrecemos presupuestos transparentes desde la primera consulta. Un contrato bien redactado previene conflictos futuros que pueden ser mucho más costosos." },
    ],
  },

  "insolvencia": {
    slug: "insolvencia",
    icon: Landmark,
    title: "Insolvencia y Reemprendimiento",
    metaTitle: "Insolvencia y Reemprendimiento en Temuco y La Araucanía — Ley 20.720",
    metaDescription: "Asesoría legal en insolvencia personal y empresarial en Temuco, La Araucanía y todo el sur de Chile. Renegociación de deudas, liquidación voluntaria y protección patrimonial bajo Ley 20.720.",
    metaKeywords: "insolvencia temuco, insolvencia araucanía, quiebra personal, renegociación deudas, liquidación voluntaria, ley 20.720, reemprendimiento temuco, insolvencia valdivia, insolvencia osorno, insolvencia puerto montt",
    ogImage: "/og/insolvencia.jpg",
    heroTitle: "Insolvencia y Reemprendimiento",
    heroSubtitle: "Renegociación de deudas, liquidación voluntaria y protección patrimonial bajo la Ley 20.720.",
    subtitle: "Renegociación, liquidación, fresh start",
    intro: "Si las deudas te superan, no estás solo. La Ley 20.720 ofrece herramientas legales para reorganizar tus finanzas o liquidar ordenadamente tu patrimonio con posibilidad de perdón de deudas. En Defensur te acompañamos en todo el proceso hacia el reemprendimiento.",
    highlights: [
      { title: "Renegociación de Deudas", description: "Procedimiento ante la Superintendencia para reorganizar tus deudas con mejores condiciones de pago." },
      { title: "Liquidación Voluntaria", description: "Proceso ordenado para liquidar tu patrimonio y obtener el perdón de deudas remanentes." },
      { title: "Protección Patrimonial", description: "Estrategias legales para proteger tus bienes durante procesos de insolvencia." },
    ],
    details: [
      { heading: "¿Qué es la Ley de Insolvencia y Reemprendimiento?", content: `La Ley 20.720 establece un procedimiento especial para personas y empresas que no pueden cumplir con sus obligaciones financieras. Esta ley reemplazó la antigua ley de quiebras y ofrece dos caminos principales:

1. Renegociación: Un proceso para reorganizar las deudas y establecer un plan de pago viable.
2. Liquidación: Cuando la renegociación no es posible, se realiza un proceso ordenado de liquidación de activos con posibilidad de perdón de deudas.

El objetivo de la ley es permitir el reemprendimiento, evitando que las personas queden atrapadas en deudas impagables de por vida.` },
      { heading: "Renegociación de Deudas", content: `El procedimiento de renegociación se realiza ante un síndico de quiebras y permite:

• Reducir el monto total de las deudas
• Extender los plazos de pago
• Reducir o eliminar intereses
• Condonar parte del capital adeudado
• Establecer cuotas mensuales compatibles con tus ingresos

Para acceder a la renegociación, debes tener al menos 2 deudas con distintos acreedores y encontrarte en cesación de pagos. El procedimiento dura aproximadamente 4 a 6 meses.` },
      { heading: "Liquidación Voluntaria", content: `Cuando la renegociación no es viable, puedes solicitar la liquidación voluntaria de tu patrimonio. Este proceso:

• Detiene todos los cobros y demandas en tu contra
• Permite un proceso ordenado de liquidación de activos
• Otorga el beneficio de desasimiento (mantienes ciertos bienes esenciales)
• Al finalizar, puedes obtener el perdón de las deudas remanentes (fresh start)

Es importante asesorarse antes de iniciar este proceso para maximizar la protección de tu patrimonio.` },
      { heading: "Insolvencia Empresarial", content: `Las empresas también pueden acogerse a los procedimientos de la Ley 20.720. La continuación del giro permite que la empresa siga operando mientras se renegocian las deudas, preservando empleos y valor.

Asesoramos a dueños de pymes y empresas en:

• Renegociación empresarial con continuidad operativa
• Liquidación voluntaria de empresas
• Protección del patrimonio personal del empresario
• Planificación de reestructuración preventiva` },
    ],
    faqs: [
      { question: "¿Pierdo todos mis bienes en la insolvencia?", answer: "No necesariamente. El desasimiento te permite conservar ciertos bienes esenciales (herramientas de trabajo, vestuario, muebles básicos). Además, existen estrategias legales para proteger tu patrimonio antes y durante el proceso." },
      { question: "¿Cuánto tiempo dura el proceso de insolvencia?", answer: "La renegociación dura entre 4 y 6 meses aproximadamente. La liquidación puede tomar entre 6 meses y 1 año dependiendo de la complejidad del caso." },
      { question: "¿Puedo emprender nuevamente después de la insolvencia?", answer: "Sí, precisamente la Ley 20.720 está diseñada para el reemprendimiento. Una vez finalizado el proceso, obtienes el perdón de deudas y puedes empezar de nuevo sin el peso de obligaciones impagables." },
    ],
  },

  "sumarios": {
    slug: "sumarios",
    icon: ShieldCheck,
    title: "Sumarios Administrativos",
    metaTitle: "Sumarios Administrativos en Temuco y La Araucanía — Defensa de Funcionarios Públicos",
    metaDescription: "Defensa legal en sumarios administrativos en Temuco, La Araucanía y todo el sur de Chile. Asesoría a funcionarios públicos, sanciones de salud y registro de marcas INAPI. Consulta gratuita.",
    metaKeywords: "sumario administrativo temuco, sumario administrativo araucanía, funcionarios públicos, defensa administrativa, sanciones salud, registro marcas INAPI, abogado administrativo valdivia, abogado administrativo osorno",
    ogImage: "/og/default.jpg",
    heroTitle: "Sumarios Administrativos",
    heroSubtitle: "Defensa legal de funcionarios públicos en sumarios, sanciones y procedimientos administrativos.",
    subtitle: "Defensa de funcionarios públicos",
    intro: "En Defensur defendemos a funcionarios públicos en todo tipo de procedimientos sumariales. Desde la notificación de cargos hasta la resolución final, nuestro equipo garantiza el debido proceso y la protección de tus derechos como servidor público.",
    highlights: [
      { title: "Defensa en Sumarios", description: "Representación completa durante todo el proceso sumarial, garantizando el debido proceso y derecho a defensa." },
      { title: "Sanciones de Salud", description: "Impugnación de sanciones y multas impuestas por la Superintendencia de Salud y otras entidades." },
      { title: "Registro de Marcas", description: "Registro de marcas comerciales ante INAPI. Protección de tu propiedad intelectual." },
    ],
    details: [
      { heading: "¿Qué es un Sumario Administrativo?", content: `El sumario administrativo es un procedimiento investigativo que se sigue a funcionarios públicos cuando se denuncian faltas o irregularidades en el ejercicio de sus funciones. Puede derivar en amonestaciones, multas, suspensiones o destitución.

Es fundamental contar con asesoría legal desde el inicio del proceso, ya que los plazos son breves y las consecuencias pueden ser graves para tu carrera funcionaria.` },
      { heading: "Derechos del Sumariado", content: `Como funcionario sumariado, tienes derechos fundamentales que deben ser respetados:

• Derecho a conocer los cargos formulados
• Derecho a presentar descargos y pruebas
• Derecho a designar un abogado defensor
• Derecho al debido proceso y plazo razonable
• Derecho a impugnar la resolución final

En Defensur garantizamos que se respeten todos tus derechos durante el procedimiento y diseñamos la mejor estrategia de defensa.` },
      { heading: "Impugnación de Sanciones", content: `Si ya fuiste sancionado, podemos impugnar la resolución a través de:

• Recurso de reposición ante la misma autoridad
• Recurso jerárquico ante el superior jerárquico
• Recurso de protección ante la Corte de Apelaciones
• Acción de nulidad ante los tribunales

Cada vía tiene plazos específicos que es necesario respetar. Te recomendamos consultar lo antes posible para evaluar las opciones de impugnación disponibles.` },
      { heading: "Sanciones de Salud y Registro de Marcas", content: `Además de sumarios administrativos, asesoramos en:

• Impugnación de sanciones de la Superintendencia de Salud
• Defensa ante fiscalizaciones sanitarias
• Registro de marcas comerciales ante INAPI
• Oposición a registro de marcas de terceros
• Renovación y protección de marca

Contamos con experiencia en procedimientos ante múltiples organismos del Estado.` },
    ],
    faqs: [
      { question: "¿Debo declarar en el sumario sin abogado?", answer: "Tienes derecho a designar un abogado defensor desde el inicio del sumario. Te recomendamos no declarar sin asesoría legal, ya que tus declaraciones pueden ser usadas en tu contra." },
      { question: "¿Cuánto tiempo dura un sumario administrativo?", answer: "El plazo legal es de 60 días hábiles, prorrogable por 30 días más. Sin embargo, en la práctica puede variar según la complejidad del caso y la autoridad instructora." },
      { question: "¿Puedo ser suspendido durante el sumario?", answer: "Sí, la autoridad puede decretar la suspensión preventiva del funcionario. Sin embargo, esta medida no es automática y podemos argumentar en contra de ella si no se justifica." },
    ],
  },
}

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES[slug]
}

export function serviceToMetadata(service: ServiceData): Metadata {
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.metaKeywords,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [{ url: service.ogImage, width: 1200, height: 630, alt: `${service.metaTitle} | Defensur` }],
    },
  }
}
