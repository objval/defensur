"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight, Calendar, User } from "lucide-react"
import { SENTENCIAS } from "@/lib/sentencias-data"

// Muestra las primeras 4 sentencias en el home
const sentencias = SENTENCIAS.slice(0, 4)

export function SentenciasSection() {
  return (
    <section className="py-16 md:py-28 bg-background" aria-label="Sentencias destacadas">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
              Blog jurídico
            </span>
            <h2 className="max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl lg:text-[clamp(2.4rem,4.5vw,3.5rem)]">
              Sentencias{" "}
              <span className="italic font-normal">destacadas.</span>
            </h2>
          </div>
          <Link
            href="/sentencias/"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-sky transition-colors shrink-0"
          >
            Ver todas
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* 2x2 grid — 4 cards, completely filled */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sentencias.map((s) => (
            <Link
              key={s.slug}
              href={`/sentencias/${s.slug}`}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-brand-navy/15 hover:shadow-[0_4px_24px_rgba(8,24,107,0.05)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-sky px-2.5 py-1 rounded-full bg-brand-sky/10">
                  {s.category}
                </span>
                <span className="text-[10px] font-bold text-brand-navy px-2.5 py-1 rounded-full bg-brand-navy/8">
                  {s.amount}
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-primary mb-2 leading-snug group-hover:text-brand-navy transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {s.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="size-3.5" />
                    {s.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {new Date(s.date).toLocaleDateString("es-CL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground/40 transition-all group-hover:text-brand-sky group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Full-width CTA banner */}
        <div className="mt-4">
          <Link
            href="/contacto/"
            className="group relative flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 rounded-2xl bg-brand-navy p-7 md:p-9 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(8,24,107,0.25)]"
          >
            <div className="text-center sm:text-left">
              <p className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold text-white leading-tight">
                ¿Necesitas asesoría legal?
              </p>
              <p className="mt-1 text-sm text-white/50">
                Cuéntanos tu caso. Tu primera consulta es gratuita y sin compromiso.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-sky group-hover:gap-3 transition-all shrink-0">
              Consultar ahora
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
