"use client"

import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Gavel,
  Heart,
  ShieldAlert,
  Siren,
  Stethoscope,
  Store,
  Users,
} from "lucide-react"

const cases = [
  {
    icon: Building2,
    title: "Tutela Laboral — Municipalidad",
    description:
      "Municipalidad condenada a pagar $14.500.000 por daño moral por vulneración de derechos fundamentales a funcionaria.",
    amount: "$14.500.000",
    tag: "Tutela Laboral",
  },
  {
    icon: Store,
    title: "Práctica Antisindical",
    description:
      "Tribunal acoge tutela laboral contra Supermercado Lily en Villarrica por práctica antisindical.",
    amount: "$9.900.000",
    tag: "Tutela Laboral",
  },
  {
    icon: ShieldAlert,
    title: "Acoso Laboral — APS Perquenco",
    description:
      "Tutela por vulneración de derechos fundamentales y acoso laboral contra APS Perquenco.",
    amount: "$12.000.000",
    tag: "Acoso Laboral",
  },
  {
    icon: Building2,
    title: "Integridad Física y Psíquica",
    description:
      "Condena a Municipalidad de Gorbea por afectar integridad física y psíquica de funcionaria municipal.",
    amount: "$6.000.000",
    tag: "Tutela Laboral",
  },
  {
    icon: Stethoscope,
    title: "Hospital Heyermann — Angol",
    description:
      "Indemnización por despido injustificado de funcionaria del Hospital Heyermann de Angol.",
    amount: "$15.000.000",
    tag: "Despido Injustificado",
  },
  {
    icon: Siren,
    title: "Hospital Los Ángeles",
    description:
      "Condena por acoso laboral contra funcionaria del Hospital de Los Ángeles.",
    amount: "$8.000.000",
    tag: "Acoso Laboral",
  },
  {
    icon: Heart,
    title: "Pensión de Alimentos",
    description:
      "Cobro exitoso de pensiones de alimentos atrasadas con apremios y retención de remuneraciones.",
    amount: "Cobro efectivo",
    tag: "Familia",
  },
  {
    icon: Users,
    title: "Medidas de Protección",
    description:
      "Medidas de protección otorgadas a favor de menores en situación de riesgo.",
    amount: "Protección lograda",
    tag: "Familia",
  },
]

export function SuccessCases() {
  return (
    <section className="py-16 md:py-28 bg-background" aria-label="Casos de éxito">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy dark:text-brand-on-navy-muted">
              Resultados reales
            </span>
            <h2 className="max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl lg:text-[clamp(2.4rem,4.5vw,3.5rem)]">
              Casos de éxito{" "}
              <span className="italic font-normal">comprobados.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Publicamos resultados reales para que sepas exactamente cómo trabajamos.
              Cada sentencia representa a una persona cuyos derechos defendimos con
              estrategia y compromiso.
            </p>
          </div>
          <Link
            href="/sentencias/"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-sky transition-colors dark:text-brand-on-navy-muted dark:hover:text-white shrink-0"
          >
            Ver todas las sentencias
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cases.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-brand-navy/15 hover:shadow-[0_4px_24px_rgba(8,24,107,0.05)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy dark:bg-brand-on-navy-muted/10 dark:text-brand-on-navy-muted">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-sky px-2.5 py-1 rounded-full bg-brand-sky/10">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-primary mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-lg font-bold text-brand-navy dark:text-brand-on-navy-muted">
                    {item.amount}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
