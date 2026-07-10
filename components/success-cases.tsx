import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Gavel,
  Heart,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Stethoscope,
  Store,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SENTENCIAS } from "@/lib/sentencias-data"
import { RevealGroup, RevealItem } from "@/components/ui/reveal"

// Map categories to icons
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Tutela Laboral": Gavel,
  "Acoso Laboral": ShieldAlert,
  "Práctica Antisindical": Store,
  "Despido Injustificado": Building2,
  "Ley Karin / Tutela Laboral": ShieldCheck,
  Familia: Heart,
  "Familia / Protección": Users,
  "Derecho Civil": Scale,
  Salud: Stethoscope,
  Municipalidad: Siren,
}

// 8 sentencias más recientes
const cases = [...SENTENCIAS]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 8)

export function SuccessCases() {
  return (
    <section
      className="bg-background py-16 md:py-28"
      aria-label="Casos de éxito"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <span className="text-[11px] font-bold tracking-[0.12em] text-brand-navy uppercase">
              Resultados reales
            </span>
            <h2 className="max-w-2xl font-[family-name:var(--font-heading)] text-3xl leading-[1.15] font-semibold text-primary sm:text-4xl lg:text-[clamp(2.4rem,4.5vw,3.5rem)]">
              Casos de éxito{" "}
              <span className="font-normal italic">comprobados.</span>
            </h2>
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              Publicamos resultados reales para que sepas exactamente cómo
              trabajamos. Cada sentencia representa a una persona cuyos derechos
              defendimos con estrategia y compromiso.
            </p>
          </div>
          <Link
            href="/sentencias/"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-brand-navy transition-colors hover:text-brand-sky"
          >
            Ver todas las sentencias
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Grid */}
        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((item) => {
            const Icon = CATEGORY_ICONS[item.category] || Gavel
            return (
              <RevealItem key={item.slug}>
                <Link
                  href={`/sentencias/${item.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-brand-navy/15 hover:shadow-[0_4px_24px_rgba(8,24,107,0.05)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-brand-sky/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] text-brand-sky uppercase">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="mb-2 font-[family-name:var(--font-heading)] text-base leading-snug font-semibold text-primary group-hover:text-brand-navy transition-colors">
                    {item.title}
                  </h3>
                  <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {item.excerpt}
                  </p>

                  <div className="border-t border-border/50 pt-4">
                    <p className="text-lg font-bold text-brand-navy">
                      {item.amount}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
