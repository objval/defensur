import { MessageCircle, Phone } from "lucide-react"
import { WHATSAPP, SITE, STATS } from "@/lib/site"
import { AnimatedCounter } from "@/components/ui/animated-counter"

const stats = STATS

export function StatsBar() {
  return (
    <section className="relative bg-brand-navy overflow-hidden" aria-label="Estadísticas">
      <div className="relative max-w-7xl mx-auto px-5 md:px-12 lg:px-24 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="mt-2 text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30" aria-label="Contáctanos">
      <div className="max-w-4xl mx-auto px-5 md:px-12 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-primary mb-4">
          ¿Necesitas asesoría legal?
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          Tu primera consulta es gratuita y sin compromiso. Cuéntanos tu caso y
          nuestro equipo te responderá en menos de 24 horas.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WHATSAPP.url()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-sky text-white font-semibold shadow-[0_4px_16px_rgba(63,173,254,0.35)] hover:shadow-[0_6px_24px_rgba(63,173,254,0.5)] transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <MessageCircle className="size-5" />
            Consulta por WhatsApp
          </a>
          <a
            href={`tel:${SITE.phone.e164}`}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-border bg-card text-primary font-semibold hover:bg-accent transition-colors"
          >
            <Phone className="size-5" />
            Llamar ahora
          </a>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Atención presencial en {SITE.address} · {SITE.hours.display}
        </p>
      </div>
    </section>
  )
}
