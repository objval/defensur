"use client"

import { useState } from "react"
import {
  ArrowDownToLine,
  ChevronDown,
  Clock,
  Scale,
  ShieldCheck,
  BriefcaseBusiness,
} from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { cn } from "@/lib/utils"

// ── Data ─────────────────────────────────────────────────────────────────────

type Area = "laboral" | "sumarios" | "general"

const RESOURCES = [
  {
    id: "autodespido",
    title: "Carta de Autodespido",
    description:
      "Modelo de carta para poner término al contrato de trabajo por incumplimiento grave del empleador, conforme al artículo 171 del Código del Trabajo.",
    area: "laboral" as Area,
    icon: Scale,
    file: "/recursos/carta-autodespido.docx",
    fileName: "Carta-Autodespido-Defensur.docx",
    content: `AUTODESPIDO

De mi consideración.

Junto con saludar, expongo que la presente tiene como objeto comunicar que yo, …………………., cédula nacional de identidad N° …………….., vengo en poner a vuestro conocimiento hoy ………………………., mi irrevocable decisión de poner término a mi contrato de trabajo por la causal establecida en el artículo 171 del Código del Trabajo.

El artículo 171 del Código del Trabajo dispone: "si quien incurriere en las causas de los números 1, 5 o 7 del artículo 160 fuere el empleador, el trabajador podrá poner término a su contrato y recurrir al juzgado competente..."

En relación con lo anterior, hago presente que acudo a las causales establecidas en el artículo 160 N° 7 del Código del Trabajo, esto es, Incumplimiento Grave de las obligaciones que impone el contrato.

CONCLUSIÓN: La acumulación de las infracciones descritas representa un quebrantamiento total del vínculo laboral, lo que me obliga a autodespedirme con esta fecha de la empresa, mediante el mecanismo consagrado en el artículo 171 del Código del Trabajo.

Me reservo el derecho de ejercer todas las acciones legales que correspondan, incluyendo la demanda de indemnización de perjuicios por enfermedad profesional y daño moral.

Por tanto, esta notificación de término de contrato se envía para los fines pertinentes. Sin otro particular.

Atentamente,
[Nombre y firma del trabajador]`,
  },
  {
    id: "renuncia",
    title: "Modelo de Renuncia Voluntaria",
    description:
      "Documento formal para comunicar renuncia voluntaria conforme al artículo 159 Nº 2 del Código del Trabajo. Incluye notas sobre plazos y ratificación ante ministro de fe.",
    area: "laboral" as Area,
    icon: BriefcaseBusiness,
    file: "/recursos/modelo-renuncia-voluntaria.docx",
    fileName: "Modelo-Renuncia-Voluntaria-Defensur.docx",
    content: `MODELO DE RENUNCIA VOLUNTARIA

[Ciudad], [día] de [mes] de [año]

SEÑORES
[Razón Social de la Empresa o Nombre del Empleador]
RUT: [RUT de la Empresa o Empleador]
Domicilio: [Dirección de la Empresa]
Comuna: [Comuna]

De mi consideración:

Por intermedio de la presente, comunico a ustedes mi renuncia voluntaria, en conformidad al artículo 159 Nº 2 del Código del Trabajo y 177 del mismo cuerpo legal, la cual se hará efectiva a contar del [fecha de término].

Agradeciendo el haberme permitido laborar en vuestra empresa, le comunico que los motivos de mi renuncia son:

[Motivos personales / nueva oportunidad laboral / otros]

Atentamente,

[NOMBRE COMPLETO DEL TRABAJADOR]
RUT: [RUT del Trabajador]

NOTAS IMPORTANTES
• Ratificación: La renuncia voluntaria deberá ser ratificada ante un ministro de fe.
• Anticipación: La renuncia voluntaria se deberá avisar con 30 días, a lo menos, de anticipación.`,
  },
  {
    id: "reserva-finiquito",
    title: "Instructivo: Reserva de Derechos en Finiquito",
    description:
      "Guía práctica para proteger tus derechos al firmar un finiquito. Aprende cómo estampar tu reserva de derechos y evitar renunciar a demandas futuras.",
    area: "general" as Area,
    icon: ShieldCheck,
    file: "/recursos/instructivo-reserva-finiquito.docx",
    fileName: "Instructivo-Reserva-Finiquito-Defensur.docx",
    content: `CÓMO PROTEGER TUS DERECHOS AL FIRMAR TU FINIQUITO

Al firmar tu finiquito, Estudio Defensur Ltda. te informa que firmar este documento sin precauciones significa aceptar todas las condiciones del empleador y renunciar legalmente a cualquier reclamo futuro. Para proteger tu indemnización y mantener vivo tu derecho a demandar, debes seguir estrictamente los siguientes pasos:

ANTES DE FIRMAR O PONER TU HUELLA:

Debes escribir de tu puño y letra (con lápiz pasta) el siguiente texto exacto, justo arriba o al lado de donde irá tu firma. No omitas ninguna palabra:

"Me reservo el derecho a demandar por vulneración de derechos fundamentales, reconocimiento de relación laboral, despido injustificado, indemnización sustitutiva de aviso previo, años de servicio, feriado legal y proporcional, y toda otra prestación e indemnización que pudiera corresponderme conforme a la ley y al contrato de trabajo."

DESPUÉS DE ESCRIBIR LA RESERVA:

Recién ahora puedes estampar tu firma y tu huella dactilar. Asegúrate de escribir esta reserva en TODAS LAS COPIAS del finiquito, no solo en la tuya.

⚠️ IMPORTANTE: Si el notario o tu empleador te dicen que no puedes escribir esto, es absolutamente FALSO. La ley y la Dirección del Trabajo te otorgan el derecho irrenunciable a estampar tu reserva de derechos. No firmes sin ella.`,
  },
  {
    id: "ampliacion-sumario",
    title: "Solicitud de Ampliación de Plazo — Sumario",
    description:
      "Documento para funcionarios públicos que necesitan solicitar ampliación del plazo para presentar descargos en un sumario administrativo, conforme al artículo 136 del Estatuto de Funcionarios Municipales.",
    area: "sumarios" as Area,
    icon: Clock,
    file: "/recursos/solicitud-ampliacion-plazo-sumario.docx",
    fileName: "Solicitud-Ampliacion-Plazo-Sumario-Defensur.docx",
    content: `SOLICITUD DE AMPLIACIÓN DE PLAZO — SUMARIO ADMINISTRATIVO

SR. FISCAL SUMARIO

[Nombre], [Cargo] del Departamento de Salud Municipal de …………………..; respetuosamente a usted:

Habiendo sido notificado el día …... del presente de la formulación de cargos en proceso sumario, solicito, de acuerdo a lo que en derecho se me autoriza, que se amplíe el plazo para formular los descargos correspondientes, por un período adicional de ……… días.

Lo anterior se fundamenta en la necesidad de recopilar antecedentes, documentos y demás medios probatorios necesarios para ejercer adecuadamente mi derecho a defensa, los cuales no han sido posibles de reunir dentro del plazo originalmente concedido.

POR TANTO, y de acuerdo a lo establecido en el artículo 136 del Estatuto de Funcionarios Municipales,

RUEGO A USTED, acceder a lo solicitado y amplíe el plazo de formulación de defensa.

_______________________
[Nombre y apellidos]
RUT: ………………..
Fecha: ………………..`,
  },
] as const

const AREA_LABELS: Record<Area, string> = {
  laboral: "Derecho Laboral",
  sumarios: "Sumarios Administrativos",
  general: "Uso General",
}

// ── Component ────────────────────────────────────────────────────────────────

export function RecursosContent() {
  return (
    <>
      <PageHero
        title="Recursos Legales"
        subtitle="Modelos de documentos y guías prácticas preparadas por nuestro equipo jurídico. Descárgalos, completa los campos y úsalos según tus necesidades."
        breadcrumbs={[{ label: "Recursos", href: "/recursos/" }]}
      />

      <section className="py-12 md:py-20 px-5 md:px-8 lg:px-12 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESOURCES.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ResourceCard({
  resource,
}: {
  resource: (typeof RESOURCES)[number]
}) {
  const [expanded, setExpanded] = useState(false)
  const Icon = resource.icon

  return (
    <div className="group bg-card border border-border rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:border-brand-navy/20 hover:shadow-[0_4px_20px_rgba(8,24,107,0.06)]">
      {/* Header */}
      <div className="p-6 flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-navy/[0.06] text-brand-navy">
          <Icon className="size-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-brand-sky bg-brand-sky/10 px-2 py-0.5 rounded-full">
              {AREA_LABELS[resource.area]}
            </span>
          </div>
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground leading-snug">
            {resource.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {resource.description}
          </p>
        </div>
      </div>

      {/* Expandable preview */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 pb-4">
          <div className="rounded-lg border border-border bg-muted/50 p-5 max-h-[360px] overflow-y-auto">
            <pre className="text-sm text-foreground leading-relaxed whitespace-pre-wrap font-[family-name:var(--font-body)]">
              {resource.content}
            </pre>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-5 flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy hover:text-brand-sky transition-colors"
        >
          <span>{expanded ? "Ocultar vista previa" : "Ver contenido"}</span>
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform duration-200",
              expanded && "rotate-180"
            )}
          />
        </button>

        <a
          href={resource.file}
          download={resource.fileName}
          className="flex items-center gap-2 px-4 py-2 bg-brand-navy text-white text-xs font-semibold rounded-lg hover:bg-brand-navy/90 transition-colors shadow-sm"
        >
          <ArrowDownToLine className="size-3.5" />
          Descargar .docx
        </a>
      </div>
    </div>
  )
}
