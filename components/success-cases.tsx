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
  Scale,
  ShieldCheck,
} from "lucide-react"
import { SENTENCIAS } from "@/lib/sentencias-data"

// Mapeo de categoría → icono
const categoryIcon: Record<string, React.ElementType> = {
  "Tutela Laboral":          Gavel,
  "Acoso Laboral":           ShieldAlert,
  "Práctica Antisindical":   Store,
  "Despido Injustificado":   Building2,
  "Ley Karin / Tutela Laboral": ShieldCheck,
  "Familia":                 Heart,
  "Familia / Protección":    Users,
  "Derecho Civil":           Scale,
  "Salud":                   Stethoscope,
  "Municipalidad":           Siren,
}

function getIcon(category: string): React.ElementType {
  return categoryIcon[category] ?? Gavel
}

// 8 sentencias más recientes
const cases = [...SENTENCIAS]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 8)

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

        {/* Grid — mismo estilo de tarjeta original */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cases.map((item) => {
            const Icon = getIcon(item.category)
            return (
              <Link
                key={item.slug}
                href={`/sentencias/${item.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-brand-navy/15 hover:shadow-[0_4px_24px_rgba(8,24,107,0.05)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
              >
                {/* Icono + tag de categoría */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy dark:bg-brand-on-navy-muted/10 dark:text-brand-on-navy-muted">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-sky px-2.5 py-1 rounded-full bg-brand-sky/10">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-primary mb-2 leading-snug group-hover:text-brand-navy transition-colors dark:group-hover:text-brand-on-navy-muted">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4">
                  {item.excerpt}
                </p>

                {/* Monto */}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-lg font-bold text-brand-navy dark:text-brand-on-navy-muted">
                    {item.amount}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
