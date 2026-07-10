// ─── Tipos ───────────────────────────────────────────────────────────────────

export type Compensation = {
  amount: string
  description: string
}

export type RepairMeasure = {
  label: string
  description: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type Sentencia = {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  authorRole: string
  category: string
  amount: string
  sourceUrl?: string
  sourceLabel?: string

  // ── Detalle ──────────────────────────────────────────────────────────────
  summaryHighlight: string
  condemnationSummary: string
  caseContext: string
  judgmentText: string
  judgmentQuote?: string
  judgmentConclusion?: string
  compensations: Compensation[]
  repairMeasures?: RepairMeasure[]
  instanciaNote?: string
  outcomePoints: string[]
  faqItems?: FaqItem[]

  contactTitle?: string
  contactText?: string
  instagramEmbedUrl?: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const SENTENCIAS: Sentencia[] = [
  {
    slug: "acoso-laboral-consultorio-miraflores-30-millones",
    title:
      "Acoso Laboral en el Consultorio Miraflores — Servicio de Salud Araucanía Sur Condenado a Pagar $30.000.000",
    excerpt:
      "El tribunal acreditó graves episodios de acoso y hostigamiento laboral al interior del Consultorio Miraflores, reconociendo además una enfermedad profesional derivada de esta vulneración. La sentencia condena al Servicio de Salud Araucanía Sur al pago de $30.000.000 más costas, reajustes e intereses, e impone medidas concretas de reparación.",
    date: "2026-06-11",
    author: "Nicolás Yáñez",
    authorRole:
      "Abogado de Defensur Estudio Jurídico · Especialista en Derecho Laboral y Tutela de Derechos Fundamentales",
    category: "Acoso Laboral",
    amount: "$30.000.000",
    sourceUrl: "https://www.biobiochile.cl/noticias/nacional/region-de-la-araucania/2026/06/11/condenan-a-servicio-de-salud-araucania-sur-por-acoso-laboral-contra-tens-deberan-pagarle-30-millones.shtml",
    sourceLabel: "BioBio Chile",

    summaryHighlight:
      "El tribunal acreditó la existencia de acoso y hostigamiento laboral en contra de nuestra clienta, funcionaria del Consultorio Miraflores, dependiente del Servicio de Salud Araucanía Sur. La sentencia —dictada en primera instancia— reconoció que estas conductas vulneraron sus derechos fundamentales y le provocaron una enfermedad profesional, condenando a la entidad demandada al pago de $30.000.000 más costas, reajustes e intereses.",
    condemnationSummary:
      "El tribunal acreditó la existencia de acoso y hostigamiento laboral en contra de nuestra clienta, funcionaria del Consultorio Miraflores, dependiente del Servicio de Salud Araucanía Sur. La sentencia —dictada en primera instancia— reconoció que estas conductas vulneraron sus derechos fundamentales y le provocaron una enfermedad profesional, condenando a la entidad demandada al pago de:\n\n$30.000.000 más costas, reajustes e intereses.",
    caseContext:
      "Nuestra clienta, trabajadora del Consultorio Miraflores, fue víctima de acoso y hostigamiento laboral por parte de funcionarias y jefaturas de su lugar de trabajo desde febrero de 2023 hasta noviembre de 2025. Esta situación no solo vulneró sus derechos fundamentales como trabajadora, sino que además derivó en una enfermedad profesional, con las consecuencias físicas y psicológicas que ello conlleva. Ante este escenario, accionamos judicialmente en contra del Servicio de Salud Araucanía Sur para obtener tanto el reconocimiento de la vulneración como la reparación correspondiente.",
    judgmentText:
      "El tribunal acreditó la infracción del deber de protección y seguridad que pesa sobre todo empleador (artículo 184 del Código del Trabajo), estableciendo expresamente:",
    judgmentQuote:
      "«La existencia de acoso y hostigamiento que han vulnerado sus derechos fundamentales, específicamente el derecho a la integridad física y psíquica (Art. 19 N°1 de la Constitución) y el derecho a la vida privada y honra (Art. 19 N°4 de la Constitución), en relación con el artículo 485 del Código del Trabajo.»",
    judgmentConclusion:
      "Es decir, el tribunal no solo constató una infracción contractual, sino una vulneración de garantías constitucionales a través del procedimiento de tutela laboral. El juez determinó esto a través de prueba documental y prueba testimonial que daban cuenta de situaciones de violencia, malos tratos y comentarios despectivos.",
    compensations: [
      {
        amount: "$20.000.000",
        description:
          "por daño moral derivado de la lesión a garantías constitucionales y a la dignidad funcionaria.",
      },
      {
        amount: "$10.000.000",
        description:
          "por daño moral derivado de la enfermedad profesional, «consistente en el dolor físico, la angustia psicológica y el menoscabo en la calidad de vida producto de la patología laboral».",
      },
      {
        amount: "$1.500.000",
        description: "por concepto de costas.",
      },
    ],
    repairMeasures: [
      {
        label: "Traslado definitivo",
        description:
          "reubicación de la trabajadora a un servicio o dependencia distinto, para garantizar la nula interacción con las funcionarias denunciadas y las jefaturas involucradas.",
      },
      {
        label: "Disculpas por escrito",
        description:
          "que la entidad denunciada ofrezca disculpas formales a la trabajadora.",
      },
      {
        label: "Capacitación",
        description:
          "implementación de un curso efectivo sobre clima laboral y respeto a la dignidad de los trabajadores en el Consultorio Miraflores.",
      },
    ],
    instanciaNote: "Nota: esta sentencia fue dictada en primera instancia.",
    outcomePoints: [
      "Acoso y hostigamiento laboral acreditados.",
      "Enfermedad profesional reconocida como consecuencia de la vulneración.",
      "Condena de $30.000.000 más costas, reajustes e intereses.",
      "Medidas concretas de reparación impuestas al empleador.",
    ],
    faqItems: [
      {
        question: "¿Qué es el Acoso Laboral y Cuándo Vulnera Derechos Fundamentales?",
        answer:
          "El acoso o hostigamiento laboral consiste en conductas reiteradas que afectan la dignidad, la integridad física o psíquica, o la vida privada de un trabajador en el contexto de la relación laboral. Cuando estas conductas alcanzan la entidad necesaria para lesionar garantías constitucionales —como ocurrió en este caso—, pueden perseguirse a través del procedimiento de tutela laboral establecido en el artículo 485 del Código del Trabajo, que permite obtener tanto el reconocimiento de la vulneración como la reparación correspondiente.",
      },
      {
        question: "¿Puede una Enfermedad Profesional Derivar del Acoso Laboral?",
        answer:
          "Sí. Cuando el acoso o hostigamiento laboral genera un deterioro de la salud física o psicológica del trabajador, esa afectación puede calificarse como enfermedad profesional. En este caso, el tribunal reconoció expresamente que la patología laboral sufrida por la trabajadora generó dolor físico, angustia psicológica y menoscabo en su calidad de vida, ordenando una indemnización específica por este concepto, adicional a la otorgada por la vulneración de garantías constitucionales.",
      },
    ],
    contactTitle: "Un entorno de trabajo libre de hostigamiento es un derecho, no un privilegio",
    contactText:
      "Si estás atravesando una situación de acoso o hostigamiento laboral, o una enfermedad relacionada con tu trabajo, existen acciones legales concretas para protegerte. Contáctate directamente con Nicolás Yáñez para evaluar tu caso sin costo.",
  },


  {
    slug: "tutela-laboral-municipalidad-temuco-14-millones",
    title:
      "Municipalidad de Temuco Condenada a Pagar $14.500.000 por Daño Moral",
    excerpt:
      "Tribunal acoge acción de tutela laboral interpuesta en favor de funcionaria municipal que fue objeto de vulneración de derechos fundamentales. Se reconoce daño moral causado por actos de hostigamiento y discriminación en el lugar de trabajo.",
    date: "2024-11-15",
    author: "Nicolás Yáñez",
    authorRole:
      "Abogado de Defensur Estudio Jurídico · Especialista en Derecho Laboral y Tutela de Derechos Fundamentales",
    category: "Tutela Laboral",
    amount: "$14.500.000",

    summaryHighlight:
      "El tribunal acogió la acción de tutela laboral interpuesta en favor de nuestra clienta, funcionaria de la Municipalidad de Temuco, reconociendo la vulneración de sus derechos fundamentales por actos de hostigamiento y discriminación en el lugar de trabajo. La sentencia condena a la Municipalidad de Temuco al pago de $14.500.000 más costas, reajustes e intereses.",
    condemnationSummary:
      "El tribunal acreditó la vulneración de derechos fundamentales de nuestra clienta, funcionaria municipal, derivada de actos reiterados de hostigamiento y discriminación. La sentencia reconoció el daño moral sufrido y condenó a la Municipalidad de Temuco al pago de: $14.500.000 más costas, reajustes e intereses.",
    caseContext:
      "Nuestra clienta, funcionaria de la Municipalidad de Temuco, fue objeto de hostigamiento y discriminación reiterados por parte de sus superiores jerárquicos. Esta situación vulneró sus derechos fundamentales como trabajadora, afectando gravemente su integridad psíquica y dignidad. Ante este escenario, accionamos judicialmente mediante el procedimiento de tutela laboral para obtener el reconocimiento de la vulneración y la reparación correspondiente.",
    judgmentText:
      "El tribunal acreditó la infracción del deber de protección y seguridad que pesa sobre todo empleador (artículo 184 del Código del Trabajo), estableciendo expresamente:",
    judgmentQuote:
      "«La existencia de hostigamiento y conductas discriminatorias que han vulnerado los derechos fundamentales de la trabajadora, específicamente el derecho a la integridad física y psíquica (Art. 19 N°1 de la Constitución) y el derecho a la igualdad ante la ley (Art. 19 N°2 de la Constitución), en relación con el artículo 485 del Código del Trabajo.»",
    judgmentConclusion:
      "Es decir, el tribunal no solo constató una infracción contractual, sino una vulneración de garantías constitucionales a través del procedimiento de tutela laboral.",
    compensations: [
      {
        amount: "$14.500.000",
        description: "por daño moral derivado de la vulneración de derechos fundamentales.",
      },
    ],
    instanciaNote: "Nota: esta sentencia fue dictada en primera instancia.",
    outcomePoints: [
      "Hostigamiento y discriminación laboral acreditados.",
      "Vulneración de derechos fundamentales reconocida.",
      "Condena de $14.500.000 más costas, reajustes e intereses.",
    ],
    faqItems: [
      {
        question: "¿Qué es la tutela laboral?",
        answer:
          "La tutela laboral es un procedimiento especial del Código del Trabajo (Art. 485 y ss.) que protege los derechos fundamentales del trabajador en el contexto de la relación laboral. Permite obtener tanto el reconocimiento de la vulneración como la reparación económica correspondiente.",
      },
      {
        question: "¿Qué derechos fundamentales puede proteger la tutela laboral?",
        answer:
          "La tutela laboral protege derechos como la vida e integridad física y psíquica, el respeto y protección de la vida privada, la libertad de conciencia, la libertad de expresión, la no discriminación y la libertad sindical, cuando estos son vulnerados en el contexto de la relación de trabajo.",
      },
    ],
    contactTitle: "Una situación de hostigamiento laboral es un derecho que debes defender",
    contactText:
      "Si estás atravesando una situación similar de hostigamiento o discriminación laboral, existen acciones legales concretas para protegerte. Contáctate directamente con Nicolás Yáñez para evaluar tu caso sin costo.",
  },

  {
    slug: "tutela-laboral-aps-perquenco-acoso",
    title:
      "Tutela por Vulneración de Derechos Fundamentales en APS Perquenco",
    excerpt:
      "Tribunal acoge tutela laboral por acoso laboral y vulneración de derechos fundamentales contra la Administración de Programas Sanitarios de Perquenco.",
    date: "2024-09-15",
    author: "Nicolás Yáñez",
    authorRole:
      "Abogado de Defensur Estudio Jurídico · Especialista en Derecho Laboral y Tutela de Derechos Fundamentales",
    category: "Acoso Laboral",
    amount: "$12.000.000",

    summaryHighlight:
      "El tribunal acogió la acción de tutela laboral interpuesta en favor de nuestra clienta, funcionaria de la Administración de Programas Sanitarios (APS) de Perquenco, reconociendo la vulneración de sus derechos fundamentales por actos de acoso laboral. La sentencia condena a la APS Perquenco al pago de $12.000.000 más costas, reajustes e intereses.",
    condemnationSummary:
      "El tribunal acreditó la existencia de acoso laboral en contra de nuestra clienta, funcionaria de la APS Perquenco, declarando que estas conductas vulneraron sus derechos fundamentales. La condena incluye: $12.000.000 más costas, reajustes e intereses.",
    caseContext:
      "Nuestra clienta, funcionaria de la Administración de Programas Sanitarios de Perquenco, fue víctima de acoso laboral sistemático por parte de sus superiores. Esta situación afectó gravemente su integridad psíquica y dignidad, vulnerando sus derechos fundamentales como trabajadora. Accionamos mediante el procedimiento de tutela laboral para obtener el reconocimiento y reparación correspondiente.",
    judgmentText:
      "El tribunal acreditó la existencia de acoso laboral y la vulneración de derechos fundamentales, estableciendo:",
    judgmentQuote:
      "«Las conductas de acoso y hostigamiento acreditadas vulneran los derechos fundamentales de la trabajadora, específicamente su derecho a la integridad física y psíquica y su dignidad como persona, en relación con el artículo 485 del Código del Trabajo.»",
    judgmentConclusion:
      "El tribunal reconoció que el acoso laboral sufrido por la trabajadora no solo constituyó un incumplimiento contractual, sino una grave vulneración de sus garantías constitucionales.",
    compensations: [
      {
        amount: "$12.000.000",
        description: "por daño moral derivado del acoso laboral y vulneración de derechos fundamentales.",
      },
    ],
    instanciaNote: "Nota: esta sentencia fue dictada en primera instancia.",
    outcomePoints: [
      "Acoso laboral acreditado por el tribunal.",
      "Vulneración de derechos fundamentales reconocida.",
      "Condena de $12.000.000 más costas, reajustes e intereses.",
    ],
    contactTitle: "El acoso laboral es un delito que tiene solución legal",
    contactText:
      "Si estás siendo víctima de acoso laboral, existen herramientas jurídicas para defenderte y obtener reparación. Contáctate con Nicolás Yáñez para evaluar tu caso sin costo.",
  },

  {
    slug: "vulneracion-derechos-municipalidad-gorbea",
    title:
      "Condena a Municipalidad de Gorbea por Vulneración de Integridad",
    excerpt:
      "Tribunal condena a Municipalidad de Gorbea por afectar integridad física y psíquica de funcionaria municipal a través de actos de acoso laboral sistemático.",
    date: "2024-08-22",
    author: "Sebastián Pizarro",
    authorRole:
      "Abogado de Defensur Estudio Jurídico · Especialista en Derecho Laboral",
    category: "Tutela Laboral",
    amount: "$6.000.000",

    summaryHighlight:
      "El tribunal acreditó la vulneración de la integridad física y psíquica de nuestra clienta, funcionaria de la Municipalidad de Gorbea, derivada de actos de acoso laboral sistemático. La sentencia condena a la Municipalidad de Gorbea al pago de $6.000.000 más costas, reajustes e intereses.",
    condemnationSummary:
      "El tribunal acreditó la vulneración de derechos fundamentales de nuestra clienta, reconociendo que el acoso laboral sistemático afectó gravemente su integridad física y psíquica. La condena incluye: $6.000.000 más costas, reajustes e intereses.",
    caseContext:
      "Nuestra clienta, funcionaria de la Municipalidad de Gorbea, fue víctima de acoso laboral sistemático que afectó gravemente su integridad física y psíquica. Los actos de hostigamiento reiterados por parte de sus superiores vulneraron sus derechos fundamentales como trabajadora. Accionamos judicialmente para obtener el reconocimiento y la reparación de esta situación.",
    judgmentText:
      "El tribunal acreditó la existencia de acoso laboral sistemático y la consecuente vulneración de la integridad de la trabajadora:",
    judgmentQuote:
      "«Los actos de hostigamiento acreditados vulneran el derecho a la integridad física y psíquica de la trabajadora (Art. 19 N°1 de la Constitución), configurando una vulneración de derechos fundamentales en los términos del artículo 485 del Código del Trabajo.»",
    judgmentConclusion:
      "El tribunal determinó que la Municipalidad de Gorbea incumplió su deber de protección y seguridad, permitiendo que se desarrollara un ambiente de acoso que afectó la salud de la trabajadora.",
    compensations: [
      {
        amount: "$6.000.000",
        description:
          "por daño moral derivado de la vulneración de la integridad física y psíquica.",
      },
    ],
    instanciaNote: "Nota: esta sentencia fue dictada en primera instancia.",
    outcomePoints: [
      "Acoso laboral sistemático acreditado.",
      "Vulneración de integridad física y psíquica reconocida.",
      "Condena de $6.000.000 más costas, reajustes e intereses.",
    ],
    contactTitle: "Tu integridad en el trabajo es un derecho que debe protegerse",
    contactText:
      "Si estás sufriendo acoso laboral que afecta tu salud física o psíquica, existen acciones legales concretas para protegerte. Contáctate con Sebastián Pizarro para evaluar tu caso sin costo.",
  },

  {
    slug: "indemnizacion-hospital-heyermann-angol",
    title:
      "Hospital Heyermann de Angol Condenado a Pagar Indemnización",
    excerpt:
      "Funcionaria del Hospital Heyermann obtiene indemnización por despido injustificado tras años de servicio dedicado a la salud pública de la comuna.",
    date: "2024-07-10",
    author: "Nicolás Yáñez",
    authorRole:
      "Abogado de Defensur Estudio Jurídico · Especialista en Derecho Laboral",
    category: "Despido Injustificado",
    amount: "$15.000.000",

    summaryHighlight:
      "El tribunal declaró injustificado el despido de nuestra clienta, funcionaria del Hospital Heyermann de Angol, ordenando el pago de las indemnizaciones legales correspondientes por años de servicio dedicados a la salud pública. La condena asciende a $15.000.000 más costas, reajustes e intereses.",
    condemnationSummary:
      "El tribunal declaró injustificado el despido de nuestra clienta y condenó al Hospital Heyermann al pago de todas las indemnizaciones legales correspondientes. La condena incluye: $15.000.000 más costas, reajustes e intereses.",
    caseContext:
      "Nuestra clienta, funcionaria del Hospital Heyermann de Angol con años de servicio en la salud pública, fue despedida de manera injustificada por su empleador. El despido careció de causales legales válidas y fue realizado sin respetar los procedimientos establecidos por la ley. Accionamos judicialmente para obtener el reconocimiento del despido injustificado y el pago de las indemnizaciones correspondientes.",
    judgmentText:
      "El tribunal declaró que el despido de la trabajadora fue injustificado al no acreditarse la causal invocada por el empleador, ordenando el pago de las indemnizaciones correspondientes:",
    judgmentConclusion:
      "El tribunal determinó que la empleadora no logró acreditar la causal de despido invocada, razón por la cual declaró el despido injustificado y ordenó el pago de las indemnizaciones legales correspondientes.",
    compensations: [
      {
        amount: "$15.000.000",
        description:
          "en indemnizaciones por años de servicio, sustitutiva del aviso previo y recargo legal por despido injustificado.",
      },
    ],
    instanciaNote: "Nota: esta sentencia fue dictada en primera instancia.",
    outcomePoints: [
      "Despido declarado injustificado.",
      "Indemnizaciones legales reconocidas.",
      "Condena de $15.000.000 más costas, reajustes e intereses.",
    ],
    faqItems: [
      {
        question: "¿Qué es un despido injustificado?",
        answer:
          "Un despido injustificado ocurre cuando el empleador pone término al contrato de trabajo sin que exista una causal legal válida o sin acreditar debidamente la causal invocada. En estos casos, el trabajador tiene derecho a recibir las indemnizaciones por años de servicio con el recargo legal correspondiente.",
      },
      {
        question: "¿Cuánto tiempo tengo para reclamar por un despido injustificado?",
        answer:
          "El plazo para interponer una demanda por despido injustificado es de 60 días hábiles contados desde la fecha del despido. Por eso es fundamental actuar con rapidez y consultar con un abogado a la brevedad.",
      },
    ],
    contactTitle: "Si fuiste despedido sin justificación, tienes derechos",
    contactText:
      "El despido injustificado da derecho a importantes indemnizaciones. Consulta con Nicolás Yáñez para conocer cuánto te corresponde recibir. Primera evaluación sin costo.",
  },

  {
    slug: "condena-acoso-hospital-los-angeles",
    title:
      "Hospital de Los Ángeles Condenado por Acoso Laboral",
    excerpt:
      "Tribunal declara responsabilidad del Hospital de Los Ángeles por acoso laboral contra funcionaria, reconociendo vulneración de derechos fundamentales.",
    date: "2024-06-18",
    author: "Nicolás Yáñez",
    authorRole:
      "Abogado de Defensur Estudio Jurídico · Especialista en Derecho Laboral y Tutela de Derechos Fundamentales",
    category: "Acoso Laboral",
    amount: "$8.000.000",

    summaryHighlight:
      "El tribunal declaró la responsabilidad del Hospital de Los Ángeles por acoso laboral ejercido en contra de nuestra clienta, reconociendo la vulneración de sus derechos fundamentales. La sentencia condena al hospital al pago de $8.000.000 más costas, reajustes e intereses.",
    condemnationSummary:
      "El tribunal acreditó la existencia de acoso laboral en contra de nuestra clienta, funcionaria del Hospital de Los Ángeles, condenando a la institución por la vulneración de sus derechos fundamentales. La condena incluye: $8.000.000 más costas, reajustes e intereses.",
    caseContext:
      "Nuestra clienta, funcionaria del Hospital de Los Ángeles, fue víctima de acoso laboral reiterado que vulneró gravemente sus derechos fundamentales como trabajadora. Las conductas de hostigamiento afectaron su integridad y dignidad, generando un ambiente de trabajo hostil e insostenible. Accionamos mediante el procedimiento de tutela laboral para obtener el reconocimiento y la reparación de esta vulneración.",
    judgmentText:
      "El tribunal acreditó la existencia de acoso laboral y la consecuente vulneración de los derechos fundamentales de la trabajadora:",
    judgmentQuote:
      "«Las conductas de acoso y hostigamiento acreditadas constituyen una vulneración de los derechos fundamentales de la trabajadora, específicamente su derecho a la integridad psíquica y su dignidad, en relación con el artículo 485 del Código del Trabajo.»",
    judgmentConclusion:
      "El tribunal estableció que el hospital, como empleador, incumplió su deber de proteger la integridad y dignidad de su funcionaria, siendo responsable de las consecuencias del acoso laboral sufrido.",
    compensations: [
      {
        amount: "$8.000.000",
        description:
          "por daño moral derivado del acoso laboral y vulneración de derechos fundamentales.",
      },
    ],
    instanciaNote: "Nota: esta sentencia fue dictada en primera instancia.",
    outcomePoints: [
      "Acoso laboral declarado por el tribunal.",
      "Vulneración de derechos fundamentales reconocida.",
      "Condena de $8.000.000 más costas, reajustes e intereses.",
    ],
    contactTitle: "El acoso laboral en salud pública también tiene solución legal",
    contactText:
      "Si trabajas en el sistema de salud y eres víctima de acoso laboral, existen herramientas jurídicas para defenderte. Contáctate con Nicolás Yáñez para evaluar tu caso sin costo.",
  },

  // ── Municipalidad de Pucón — despido injustificado $18.7M ──
  {
    slug: "despido-injustificado-municipalidad-pucon-18-millones",
    title:
      "Municipalidad de Pucón Condenada a Pagar $18.700.000 por Despido Injustificado",
    excerpt:
      "El Juzgado de Letras y el Trabajo de Pucón acogió una demanda por despido injustificado y condenó a la Municipalidad a pagar $18.700.000 por años de servicio, aviso previo, feriados y recargo legal, aplicando el principio de realidad sobre un contrato a honorarios de más de 6 años.",
    date: "2026-05-27",
    author: "Nicolás Yáñez",
    authorRole:
      "Abogado de Defensur Estudio Jurídico · Especialista en Derecho Laboral",
    category: "Despido Injustificado",
    amount: "$18.700.000",
    sourceUrl: "https://www.biobiochile.cl/noticias/nacional/region-de-la-araucania/2026/05/27/municipalidad-de-pucon-es-sentenciada-a-pagar-187-millones-a-trabajadora-por-despido-injustificado.shtml",
    sourceLabel: "BioBio Chile",

    summaryHighlight:
      "El Juzgado de Letras y el Trabajo de Pucón condenó a la Municipalidad de Pucón a pagar $18.700.000 a una funcionaria que ejerce funciones desde enero de 2019 hasta junio de 2025 bajo contrato a honorarios. El tribunal aplicó el principio de realidad y reconoció la existencia de una relación laboral superior a 6 años, ordenando el pago de indemnizaciones por años de servicio, aviso previo, feriados y recargo legal.",
    condemnationSummary:
      "El tribunal aplicó el principio de realidad y condenó a la Municipalidad de Pucón al pago de $18.700.000 por concepto de indemnizaciones laborales, más el entero de todas las cotizaciones de AFP y AFC impagas durante los 6 años que existió la relación laboral.",
    caseContext:
      "Nuestra clienta ejerció funciones en la Municipalidad de Pucón desde enero de 2019 hasta junio de 2025, bajo sucesivos contratos a honorarios. En la práctica, cumplia un horario determinado, contaba con ropa corporativa y un espacio de trabajo fijo, elementos propios de una relación laboral formal. Fue desvinculada sin existir una causa legal suficiente, por lo que accionamos judicialmente para obtener el reconocimiento de la relación laboral y las indemnizaciones correspondientes.",
    judgmentText:
      "El tribunal, aplicando el principio de realidad, determinó que la forma contractual utilizada no se condecía con la realidad de los hechos, estableciendo que existía una relación laboral plena:",
    judgmentQuote:
      "\u00abLas cosas NO son como dice el papel, sino como ocurren en la práctica. Se logró acreditar, a través de testigos, que había una relación laboral superior a los 6 años de trabajo, donde la trabajadora cumplia un horario determinado, tenía ropa corporativa y un espacio de trabajo.\u00bb",
    judgmentConclusion:
      "El alcalde de Pucón indicó que el fallo está siendo analizado por el Departamento Jurídico de la Municipalidad, estudiando presentar una apelación.",
    compensations: [
      {
        amount: "$18.700.000",
        description:
          "por años de servicio, aviso previo, feriados y recargo legal por despido injustificado, más el entero de cotizaciones de AFP y AFC impagas.",
      },
    ],
    instanciaNote: "Nota: esta sentencia fue dictada en primera instancia.",
    outcomePoints: [
      "Relación laboral de más de 6 años reconocida por aplicación del principio de realidad.",
      "Despido declarado injustificado.",
      "Condena de $18.700.000 más cotizaciones impagas.",
    ],
    faqItems: [
      {
        question: "\u00bfQué es el principio de realidad en el derecho laboral?",
        answer:
          "El principio de realidad establece que en materia laboral, lo que importa es la realidad de los hechos y no la forma jurídica del contrato. Si una persona presta servicios bajo contrato a honorarios pero en la práctica cumple horario, recibe instrucciones y actúa como un empleado regular, el tribunal puede reconocer la existencia de una relación laboral con todos sus derechos y obligaciones.",
      },
      {
        question: "\u00bfPuedo demandar si trabajaba con contrato a honorarios?",
        answer:
          "Sí. Si trabajabas bajo contrato a honorarios pero en la práctica cumplías horario, recibías instrucciones y tu situación era equivalente a la de un empleado de planta, puedes solicitar al tribunal que reconozca la existencia de una relación laboral. Esto te daría derecho a indemnizaciones por despido, cotizaciones impagas y demás beneficios laborales.",
      },
    ],
    contactTitle: "Si te desvincularon sin justificación, tienes derechos que reclamar",
    contactText:
      "El despido injustificado da derecho a importantes indemnizaciones. Si trabajabas bajo contrato a honorarios y fuiste desvinculado sin causa, puede que tengas más derechos de los que crees. Contáctate con Nicolás Yáñez para evaluar tu caso sin costo.",
  },

  // ── Municipalidad de Los Ángeles — 2 casos, $31M total ──
  {
    slug: "demandas-laborales-municipalidad-los-angeles-31-millones",
    title:
      "Municipalidad de Los Ángeles Condenada a Pagar Millonarias Demandas Laborales",
    excerpt:
      "Dos demandas laborales presentadas por exfuncionarios obligaron a la Municipalidad de Los Ángeles a destinar $31.000.000 adicionales de su presupuesto: un autodespido por 12 años de honorarios y un acuerdo por discriminación tras fuero maternal.",
    date: "2026-06-16",
    author: "Nicolás Yáñez",
    authorRole:
      "Abogado de Defensur Estudio Jurídico · Especialista en Derecho Laboral",
    category: "Despido Injustificado",
    amount: "$31.000.000",
    sourceUrl: "https://www.latribuna.cl/policial/2026/06/16/condenan-a-la-municipalidad-de-los-angeles-a-pagar-millonarias-demandas-laborales.html",
    sourceLabel: "La Tribuna",

    summaryHighlight:
      "Dos demandas laborales presentadas por exfuncionarios de la Municipalidad de Los Ángeles concluyeron con condenas y acuerdos que obligaron al municipio a destinar $31.000.000 adicionales en su presupuesto. El concejo municipal aprobó una modificación presupuestaria para efectuar el pago de las indemnizaciones.",
    condemnationSummary:
      "El Juzgado de Letras del Trabajo de Los Ángeles condenó al municipio en ambas causas. El primer caso corresponde a un autodespido por honorarios de 12 años ($18.702.243); el segundo a un acuerdo extrajudicial por discriminación tras fuero maternal ($12.000.000). Total: $31.000.000.",
    caseContext:
      "Dos exfuncionarios de la Municipalidad de Los Ángeles presentaron demandas laborales independientes. El primero prestó servicios por casi 12 años bajo contratos a honorarios en funciones de gabinete, ceremonias y relaciones públicas, y fue desvinculado tras un autodespido por incumplimientos graves del empleador. La segunda exfuncionaria acusó discriminación política y vulneración de derechos vinculados a su maternidad al no renovarse su contrata tras el término de su fuero maternal.",
    judgmentText:
      "El Juzgado de Letras del Trabajo de Los Ángeles, en el caso del autodespido, determinó que la realidad de los hechos prevalecía sobre la forma contractual utilizada:",
    judgmentQuote:
      "\u00abLas funciones desempeñadas eran permanentes y habituales, que existía subordinación y dependencia, y que el trabajador estaba sujeto a una jornada determinada, elementos que configuran una relación laboral según la legislación vigente.\u00bb",
    judgmentConclusion:
      "En el segundo caso, el municipio llegó a un acuerdo extrajudicial por $12.000.000 con la exfuncionaria, considerado \u00abexitoso\u00bb para las arcas municipales dado que la demanda original pedía sumas que cuadruplicaban lo pagado.",
    compensations: [
      {
        amount: "$18.702.243",
        description:
          "caso 1: indemnización sustitutiva ($920.235), indemnización por años de servicio ($11.042.820), recargo legal del 50% ($5.521.410) y feriado legal ($1.217.778), más cotizaciones previsionales impagas.",
      },
      {
        amount: "$12.000.000",
        description:
          "caso 2: acuerdo extrajudicial por discriminación tras término de fuero maternal.",
      },
    ],
    instanciaNote: "Nota: la sentencia del caso 1 fue dictada en primera instancia. El caso 2 concluyó mediante acuerdo extrajudicial.",
    outcomePoints: [
      "Relación laboral de 12 años reconocida por principio de realidad (caso 1).",
      "Autodespido declarado justificado por incumplimientos del empleador (caso 1).",
      "Acuerdo por discriminación tras fuero maternal (caso 2).",
      "Total de $31.000.000 obligado a pagar por el municipio.",
    ],
    contactTitle: "Tus derechos laborales no prescriben con el tipo de contrato",
    contactText:
      "Si trabajaste bajo contrato a honorarios durante años o fuiste desvinculado tras una licencia maternal, existen acciones legales para protegerte. Contáctate con Nicolás Yáñez para evaluar tu caso sin costo.",
  },

  // ── Patrullero Disep Pucón — Ley Karin, en proceso ──
  {
    slug: "ley-karin-patrullero-disep-pucon-tutela-laboral",
    title:
      "Caso: Patrullero Despedido tras Denunciar por Ley Karin al Jefe de la Dirección de Seguridad Pública de Pucón",
    excerpt:
      "Emilio Huinca, patrullero de la Disep de Pucón, fue desvinculado luego de denunciar por Ley Karin a su jefe, el general en retiro Juan Carlos Badilla. Representado por Nicolás Yáñez, presentó una demanda de tutela laboral solicitando indemnización de perjuicios.",
    date: "2025-08-18",
    author: "Nicolás Yáñez",
    authorRole:
      "Abogado de Defensur Estudio Jurídico · Especialista en Derecho Laboral y Tutela de Derechos Fundamentales",
    category: "Ley Karin / Tutela Laboral",
    amount: "En proceso",
    sourceUrl: "https://www.lavozdepucon.cl/2025/08/18/callese-no-lo-voy-a-dejar-hablar-el-relato-del-patrullero-despedido-tras-denunciar-por-ley-karin-al-jefe-de-la-direccion-de-seguridad-publica/",
    sourceLabel: "La Voz de Pucón",

    summaryHighlight:
      "Emilio Huinca, patrullero de la Dirección de Seguridad Pública (Disep) de la Municipalidad de Pucón, fue desvinculado mediante decreto luego de denunciar por Ley Karin al jefe de esa repartición, el general en retiro de Carabineros Juan Carlos Badilla. Representado por Nicolás Yáñez, presentó una demanda de tutela laboral con solicitud de indemnización de perjuicios. El caso se encuentra en proceso judicial.",
    condemnationSummary:
      "Este caso se encuentra actualmente en proceso judicial. Se presentó demanda de tutela laboral por despido en represalia de denuncia bajo Ley Karin (Ley N\u00b021.643), solicitando el reconocimiento de la vulneración de derechos fundamentales y la correspondiente indemnización de perjuicios.",
    caseContext:
      "El patrullero Emilio Huinca (60) se desempeñaba en la Dirección de Seguridad Pública de la Municipalidad de Pucón. El 1 de agosto de 2025, en su turno, su superior jerárquico, el general en retiro Juan Carlos Badilla, lo llamó a su oficina y lo interpeló en tono despectivo y altanero, negándole la posibilidad de dar explicaciones: \u00ab\u00a1Cállese! No lo voy a dejar hablar\u2026 no quiero explicaciones por parte suya\u00bb. La situación le provocó una grave afectación emocional y física que lo obligó a concurrir a Urgencias esa misma tarde, donde el médico le prescribió 8 días de licencia. Huinca presentó una denuncia formal por Ley Karin ante la Contraloría Municipal. Poco después fue cesado de sus funciones vía decreto.",
    judgmentText:
      "La demanda de tutela laboral señala que el despido constituyó una represalia directa por el ejercicio de la denuncia bajo Ley Karin, configurando una vulneración de derechos fundamentales en los términos del artículo 485 del Código del Trabajo:",
    judgmentQuote:
      "\u00abLo que vengo a conversar es saber cuál es mi situación laboral\u2026 Estuve 31 años en Carabineros de Chile y jamás había tenido este tipo de situaciones con un superior.\u00bb — Emilio Huinca en su denuncia formal.",
    judgmentConclusion:
      "El caso se encuentra actualmente en tramitación judicial. La demanda busca el reconocimiento de la vulneración de derechos fundamentales y la reparación económica correspondiente.",
    compensations: [],
    instanciaNote: "Nota: este caso está actualmente en proceso judicial. Aún no existe sentencia.",
    outcomePoints: [
      "Denuncia formal presentada bajo Ley Karin (Ley N\u00b021.643).",
      "Demanda de tutela laboral ingresada al tribunal.",
      "Caso en proceso: se solicita reconocimiento de vulneración y reparación.",
    ],
    faqItems: [
      {
        question: "\u00bfQué es la Ley Karin?",
        answer:
          "La Ley N\u00b021.643, conocida como Ley Karin, modificó el Código del Trabajo y el Estatuto Administrativo para establecer medidas contra el acoso laboral, sexual y la violencia en el trabajo. Obliga a todo empleador a contar con protocolos de prevención y a investigar formalmente cualquier denuncia. Protestar ante una denuncia formulada bajo esta ley está expresamente prohibido.",
      },
      {
        question: "\u00bfQué ocurre si me despiden por haber denunciado acoso?",
        answer:
          "Si eres despedido en represalia por haber formulado una denuncia de acoso laboral o sexual, puedes ejercer una acción de tutela laboral ante el Juzgado del Trabajo. El despido en represalia por el ejercicio de una denuncia protegida constituye una vulneración de derechos fundamentales y puede dar lugar a indemnizaciones adicionales.",
      },
    ],
    contactTitle: "Denunciar el acoso es un derecho. Represaliar esa denuncia es ilegal.",
    contactText:
      "Si fuiste sancionado o despedido por denunciar acoso o maltrato laboral, existen acciones legales concretas para protegerte. Contáctate con Nicolás Yáñez para evaluar tu caso sin costo.",
  },

  // ── Director Educación Pucón — Tutela laboral $60M, en proceso ──
  {
    slug: "tutela-laboral-director-educacion-municipalidad-pucon-60-millones",
    title:
      "Caso: Director de Educación de Pucón Demanda a la Municipalidad por $60.000.000 por Vulneración de Derechos",
    excerpt:
      "Alejandro Durán, jefe del DAEM de Pucón, demandó a la Municipalidad por tutela laboral solicitando $60.000.000 por acoso, presiones, amenazas y vulneración de derechos fundamentales. La demanda incluye grabaciones de conversaciones con el alcalde y el administrador municipal. Patrocinado por Nicolás Yáñez.",
    date: "2025-08-21",
    author: "Nicolás Yáñez",
    authorRole:
      "Abogado de Defensur Estudio Jurídico · Especialista en Derecho Laboral y Tutela de Derechos Fundamentales",
    category: "Tutela Laboral",
    amount: "$60.000.000",
    sourceUrl: "https://www.lavozdepucon.cl/2025/08/21/suspendido-director-de-educacion-alejandro-duran-demanda-a-la-municipalidad-por-60-millones/",
    sourceLabel: "La Voz de Pucón",

    summaryHighlight:
      "Alejandro Durán, jefe del Departamento de Administración de Educación Municipal (DAEM) de Pucón, preseó una demanda por tutela laboral contra la Municipalidad de Pucón solicitando $60.000.000 por daño moral, además de disculpas públicas y el reconocimiento de la vulneración de sus derechos. La demanda incluye grabaciones de conversaciones donde el alcalde le \u00absugiere\u00bb renunciar y el administrador municipal le ofrece manejar los tiempos del sumario a cambio de su renuncia.",
    condemnationSummary:
      "Este caso se encuentra actualmente en proceso judicial. La demanda de tutela laboral solicita $60.000.000 por daño moral, disculpas públicas en un medio de circulación regional, el reconocimiento de la vulneración de derechos fundamentales y condena en costas.",
    caseContext:
      "Alejandro Durán acumula más de 25 años de carrera municipal en Pucón, partiendo como profesor rural. Tras el cambio de administración, fue expuesto públicamente en sesiones de concejo y medios, enfrentó una denuncia por malversación de fondos, fue sometido a sumario administrativo y fue presionado en reiteradas ocasiones para renunciar voluntariamente. La situación le provocó consecuencias psicológicas severas: miedo a ir a trabajar, ansiedad, ataques de llanto y necesidad de medicación.",
    judgmentText:
      "La demanda acredita una serie de conductas que configuran vulneración de derechos fundamentales, incluyendo grabaciones de conversaciones con las máximas autoridades municipales:",
    judgmentQuote:
      "\u00abLa verdad que lo más que puedo decidir es invitarte a tomar una determinación voluntaria, solamente recomendarte que puedas presentar tu renuncia voluntaria.\u00bb — Grabación del alcalde Sebastián Álvarez incluida en la demanda.",
    judgmentConclusion:
      "Durán rechazó renunciar, señalando que tenía la conciencia tranquila y las manos limpias. El caso se encuentra actualmente en tramitación judicial.",
    compensations: [],
    instanciaNote: "Nota: este caso está actualmente en proceso judicial. Aún no existe sentencia.",
    outcomePoints: [
      "Demanda de tutela laboral presentada por $60.000.000.",
      "Grabaciones incluidas como prueba de presión para renunciar.",
      "Se solicita disculpas públicas y reconocimiento de vulneración.",
      "Caso en proceso judicial.",
    ],
    faqItems: [
      {
        question: "\u00bfPuedo demandar si me presionan para renunciar?",
        answer:
          "Sí. Las presiones, amenazas o conductas destinadas a obtener una renuncia forzada pueden configurar una vulneración de derechos fundamentales. En estos casos, el trabajador puede interponer una demanda de tutela laboral solicitando indemnización por daño moral y el reconocimiento de la vulneración. Las grabaciones de dichas conversaciones pueden ser utilizadas como prueba.",
      },
      {
        question: "\u00bfUna denuncia pública puede generar daño moral indemnizable?",
        answer:
          "Sí. Cuando un empleador expone públicamente a un trabajador de forma injustificada, afectando su reputación y dignidad, esa conducta puede generar un daño moral indemnizable a través del procedimiento de tutela laboral. El daño moral incluye la afectación psicológica, el menoscabo a la honra y el deterioro de la imagen pública del trabajador.",
      },
    ],
    contactTitle: "Las presiones para renunciar son ilegales y tienen consecuencias jurídicas",
    contactText:
      "Si tu empleador te está presionando para que renuncies o estás siendo víctima de conductas que vulneran tu dignidad, existen acciones legales concretas para defenderte. Contáctate con Nicolás Yáñez para evaluar tu caso sin costo.",
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getSentenciaBySlug(slug: string): Sentencia | undefined {
  return SENTENCIAS.find((s) => s.slug === slug)
}

export function getAllSlugs(): string[] {
  return SENTENCIAS.map((s) => s.slug)
}
