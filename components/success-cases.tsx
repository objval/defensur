import Link from "next/link"
import { ArrowRight, Building2, Heart, ShieldAlert, Siren, Stethoscope, Store, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SENTENCIAS } from "@/lib/sentencias-data"

// Map categories to icons
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Tutela Laboral": Building2,
  "Acoso Laboral": ShieldAlert,
  "Despido Injustificado": Stethoscope,
  "Familia": Heart,
}

// Pick 8 featured cases for the homepage section
const FEATURED_SLUGS = [
  "tutela-laboral-municipalidad-temuco-14-millones",
  "tutela-laboral-supermercado-lily-villarrica",
  "acoso-laboral-consultorio-miraflores-30-millones",
  "acoso-laboral-aps-perquenco-12-millones",
  "tutela-laboral-municipalidad-gorbea-6-millones",
  "despido-injustificado-hospital-heyermann-angol-15-millones",
  "acoso-laboral-hospital-los-angeles-8-millones",
]

const FAMILY_FALLBACK = [
  { title: "Pensión de Alimentos", description: "Cobro exitoso de pensiones de alimentos atrasadas con apremios y retención de remuneraciones.", amount: "Cobro efectivo", tag: "Familia" },
  { title: "Medidas de Protección", description: "Medidas de protección otorgadas a favor de menores en situación de riesgo.", amount: "Protección lograda", tag: "Familia" },
]

export function SuccessCases() {
  // Derive from sentencias-data, pick by slug, fall back to first 8
  const fromData = FEATURED_SLUGS
    .map((slug) => SENTENCIAS.find((s) => s.slug === slug))
    .filter(Boolean)
    .slice(0, 8)

  const cases = fromData.length >= 6
    ? fromData.map((s) => ({
        title: s!.title.replace(/^Nueva Sentencia:\s*/, "").split(" — ")[0].split(" por ")[0],
        description: s!.excerpt.slice(0, 140) + "…",
        amount: s!.amount,
        tag: s!.category,
        icon: CATEGORY_ICONS[s!.category] || Building2,
      }))
    : [
        // Fallback if data structure changes
        { title: "Tutela Laboral — Municipalidad", description: "Municipalidad condenada a pagar $14.500.000 por daño moral.", amount: "$14.500.000", tag: "Tutela Laboral", icon: Building2 },
        { title: "Práctica Antisindical", description: "Tribunal acoge tutela contra Supermercado Lily en Villarrica.", amount: "$9.900.000", tag: "Tutela Laboral", icon: Store },
        ...FAMILY_FALLBACK.map((f) => ({ ...f, icon: f.tag === "Familia" ? Heart : Users })),
      ]

  return (
    <section className="py-16 md:py-28 bg-background" aria-label="Casos de éxito">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
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
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-sky transition-colors shrink-0"
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
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-brand-navy/15 hover:shadow-[0_4px_24px_rgba(8,24,107,0.05)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy">
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
                  <p className="text-lg font-bold text-brand-navy">
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
