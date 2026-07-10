import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SERVICES } from "@/lib/services-data"
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal"

const featured = SERVICES["derecho-laboral"]
const rest = [
  SERVICES["derecho-familia"],
  SERVICES["derecho-civil"],
  SERVICES["insolvencia"],
  SERVICES["sumarios"],
]

// Map service slugs to their route hrefs
const HREFS: Record<string, string> = {
  "derecho-laboral": "/derecho-laboral-temuco/",
  "derecho-familia": "/abogados-familia-temuco/",
  "derecho-civil": "/derecho-civil-temuco/",
  "insolvencia": "/insolvencia-y-reemprendimiento-temuco/",
  "sumarios": "/sumarios-administrativos-temuco/",
}

export function ServicesGrid() {
  const FeaturedIcon = featured.icon
  return (
    <section className="py-16 md:py-28 bg-background" aria-label="Servicios jurídicos">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
              Áreas de práctica
            </span>
            <h2 className="max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl lg:text-[clamp(2.4rem,4.5vw,3.5rem)]">
              Servicios jurídicos{" "}
              <span className="italic font-normal">especializados.</span>
            </h2>
          </div>
          <Link
            href="/contacto/"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-sky transition-colors shrink-0"
          >
            Consultar ahora
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* Featured card — full width, dark navy */}
        <Reveal>
          <Link
            href={HREFS[featured.slug]}
            className="group relative flex flex-col md:flex-row md:items-center gap-6 md:gap-8 rounded-2xl bg-brand-navy p-7 md:p-9 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(8,24,107,0.25)] mb-4"
          >
          <div className="shrink-0 flex size-14 items-center justify-center rounded-2xl bg-white/10 text-white">
            <FeaturedIcon className="size-6" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold text-white leading-tight">
                {featured.title}
              </h3>
              <ArrowUpRight className="size-5 shrink-0 text-white/40 transition-all group-hover:text-brand-sky group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="mt-2 text-sm md:text-base text-white/60 leading-relaxed max-w-2xl">
              {featured.intro}
            </p>
          </div>
        </Link>
        </Reveal>

        {/* 2x2 grid */}
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((service) => {
            const Icon = service.icon
            return (
              <RevealItem key={service.slug}>
              <Link
                href={HREFS[service.slug]}
                className="group relative flex items-start gap-5 rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-brand-navy/25 hover:shadow-[0_8px_32px_rgba(8,24,107,0.06)]"
              >
                <div className="shrink-0 flex size-12 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy transition-colors group-hover:bg-brand-sky/10 group-hover:text-brand-sky">
                  <Icon className="size-5.5" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-primary leading-tight">
                      {service.title}
                    </h3>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:text-brand-sky group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {service.highlights.map((h) => h.title).join(", ")}.
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
