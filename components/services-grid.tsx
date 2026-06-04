"use client"

import Link from "next/link"
import {
  BriefcaseBusiness,
  Landmark,
  Scale,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react"

const services = [
  {
    icon: Scale,
    title: "Despidos Laborales",
    href: "/derecho-laboral-temuco/",
    description:
      "Asesoría legal en despidos injustificados, autodespidos, acoso laboral y vulneración de derechos. Reclamamos tu indemnización y te representamos ante la Inspección del Trabajo.",
    bullets: [
      "Indemnización por despido injustificado",
      "Tutela laboral y acoso",
      "Representación en mediación",
    ],
    color: "brand-navy",
  },
  {
    icon: Users,
    title: "Derecho de Familia",
    href: "/abogados-familia-temuco/",
    description:
      "Divorcios, pensión de alimentos, cuidado personal, régimen de visitas y medidas de protección. Defendemos tus derechos ante conflictos familiares.",
    bullets: [
      "Divorcios mutuo acuerdo y unilaterales",
      "Pensión de alimentos y cobro",
      "Medidas de protección y VIF",
    ],
    color: "brand-sky",
  },
  {
    icon: BriefcaseBusiness,
    title: "Derecho Civil",
    href: "/derecho-civil-temuco/",
    description:
      "Defensa de deudores, prescripción de deudas, contratos de compraventa, mutuos y asesoría corporativa. Protegemos tu patrimonio.",
    bullets: [
      "Prescripción y renegociación de deudas",
      "Contratos y juicios civiles",
      "Asesoría patrimonial y corporativa",
    ],
    color: "brand-navy",
  },
  {
    icon: Landmark,
    title: "Insolvencia",
    href: "/insolvencia-y-reemprendimiento-temuco/",
    description:
      "Reorganización de deudas, quiebra personal y empresarial, liquidación voluntaria. Protegemos tu patrimonio con la Ley 20.720.",
    bullets: [
      "Renegociación de deudas",
      "Liquidación voluntaria",
      "Protección patrimonial",
    ],
    color: "brand-sky",
  },
  {
    icon: ShieldCheck,
    title: "Sumarios Administrativos",
    href: "/sumarios-administrativos-temuco/",
    description:
      "Defensa en sumarios administrativos, sanciones de salud y registro de marcas INAPI. Asesoría completa a funcionarios públicos.",
    bullets: [
      "Defensa en sumarios administrativos",
      "Sanciones de salud",
      "Registro de marcas INAPI",
    ],
    color: "brand-navy",
  },
]

export function ServicesGrid() {
  return (
    <section className="py-16 md:py-28 bg-background" aria-label="Servicios jurídicos">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy dark:text-brand-on-navy-muted">
              Áreas de práctica
            </span>
            <h2 className="max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl lg:text-[clamp(2.4rem,4.5vw,3.5rem)]">
              Servicios jurídicos{" "}
              <span className="italic font-normal">especializados.</span>
            </h2>
          </div>
          <Link
            href="/contacto/"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-sky transition-colors dark:text-brand-on-navy-muted dark:hover:text-white shrink-0"
          >
            Consultar ahora
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:border-brand-navy/20 hover:shadow-[0_8px_32px_rgba(8,24,107,0.06)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy dark:bg-brand-on-navy-muted/10 dark:text-brand-on-navy-muted mb-5">
                  <Icon className="size-6" aria-hidden="true" />
                </div>

                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-brand-sky mt-0.5">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy group-hover:text-brand-sky transition-colors dark:text-brand-on-navy-muted dark:group-hover:text-white">
                  Ver más
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
