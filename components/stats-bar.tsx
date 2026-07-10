"use client"

import Link from "next/link"
import { MessageCircle, Phone } from "lucide-react"

const stats = [
  { value: "+15", label: "Años de experiencia" },
  { value: "+500", label: "Casos resueltos" },
  { value: "$150M+", label: "En indemnizaciones" },
  { value: "98%", label: "Casos favorables" },
]

export function StatsBar() {
  return (
    <section className="relative bg-brand-navy overflow-hidden" aria-label="Estadísticas">
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-brand-sky/10 rounded-full blur-[100px]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-12 lg:px-24 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white">
                {stat.value}
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
            href="https://wa.me/56959937355?text=Hola%20Defensur%2C%20necesito%20orientaci%C3%B3n%20jur%C3%ADdica."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-sky text-white font-semibold shadow-[0_4px_16px_rgba(63,173,254,0.35)] hover:shadow-[0_6px_24px_rgba(63,173,254,0.5)] transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <MessageCircle className="size-5" />
            Consulta por WhatsApp
          </a>
          <a
            href="tel:+56959937355"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-border bg-card text-primary font-semibold hover:bg-accent transition-colors"
          >
            <Phone className="size-5" />
            Llamar ahora
          </a>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Atención presencial en Temuco (Antonio Varas 687, Of. 1405) y Los Ángeles (Almagro 483, Of. 403) · Lun–Vie
          09:00–18:00
        </p>
      </div>
    </section>
  )
}
