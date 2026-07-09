"use client"

import Link from "next/link"
import { Clock, Phone, MessageCircle } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { WhyDefensur } from "@/components/why-defensur"
import { TeamSection } from "@/components/team-section"
import { AREAS_DE_PRACTICA, SITE, WHATSAPP } from "@/lib/site"
import { cn } from "@/lib/utils"

// —— Main hero ————————————————————————————————————————————————

export function DefensurHomeHero() {
  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
      <Navbar />

      {/* —— Hero section ——————————————————————————————————————————————— */}
      <main>
        <section className="relative z-10 pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-12 lg:px-24 max-w-7xl mx-auto" aria-label="Inicio">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center">
            {/* —— Left column —————————————————————————————————————————————— */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Service tags — horizontally scrollable on mobile */}
              <ul className="flex flex-nowrap md:flex-wrap gap-3 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:overflow-visible scrollbar-none list-none" aria-label="Áreas de práctica">
                {AREAS_DE_PRACTICA.map((tag) => (
                  <li
                    key={tag}
                    className="bg-brand-navy/8 text-brand-navy px-4 py-1.5 rounded-full text-[11px] leading-none tracking-[0.1em] font-bold hover:-translate-y-0.5 transition-transform cursor-default whitespace-nowrap shrink-0"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {/* Headline + subtitle */}
              <div className="space-y-5">
                <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2.2rem,8vw,4.5rem)] leading-[1.08] tracking-[-0.02em] font-bold text-primary max-w-2xl">
                  Confianza y <br />
                  <span className="italic font-normal">compromiso en el sur de Chile.</span>
                </h1>
                <p className="text-lg leading-[1.7] text-muted-foreground max-w-xl">
                  Protegemos sus intereses con una estructura legal sólida y sofisticada. Defensur combina la tradición jurídica con la agilidad contemporánea.
                </p>
                {/* Mobile: quick contact */}
                <div className="flex flex-col gap-3 md:hidden">
                  <a
                    href={`tel:${SITE.phone.e164}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy"
                    aria-label="Llamar ahora"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {SITE.phone.local}
                  </a>
                  <p className="text-xs text-muted-foreground">
                    Atención presencial y por WhatsApp · {SITE.hours.display}
                  </p>
                </div>
              </div>

              {/* Team avatars + years */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex gap-x-[-0.75rem]" aria-label="Equipo de abogados">
                  {[
                    { initials: "NY", bg: "bg-brand-navy" },
                    { initials: "SP", bg: "bg-brand-sky" },
                    { initials: "AS", bg: "bg-brand-red" },
                  ].map((member) => (
                    <div
                      key={member.initials}
                      className={cn(
                        "w-12 h-12 rounded-full border-2 border-background flex items-center justify-center text-brand-on-navy text-sm font-bold shadow-sm",
                        member.bg
                      )}
                      aria-hidden="true"
                    >
                      {member.initials}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-primary text-sm">+15 Años de Excelencia</p>
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.1em] font-bold">
                    Firma Líder Regional
                  </p>
                </div>
              </div>
            </div>

            {/* —— Right column: WhatsApp CTA (form disabled — under repair) ———————— */}
            <div className="lg:col-span-5 relative lg:-ml-12">
              <div className="relative bg-white/85 backdrop-blur-xl p-6 md:p-10 rounded-2xl shadow-[0px_32px_64px_rgba(8,24,107,0.08)] border border-white/40">
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-brand-sky/10 text-brand-navy">
                    <MessageCircle className="size-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary">
                      Consulta Gratuita
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-[42ch]">
                      Escríbenos por WhatsApp. Un abogado te responderá en menos de 24 horas.
                    </p>
                  </div>
                  <a
                    href={WHATSAPP.url()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full h-14 bg-brand-navy text-white rounded-full font-semibold shadow-[0px_8px_24px_rgba(8,24,107,0.2)] hover:shadow-[0px_8px_32px_rgba(8,24,107,0.3)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <MessageCircle className="size-5" />
                    Escribir por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* —— Why Defensur (marquee + values) ————————————————————————————————————— */}
        <WhyDefensur />

        {/* —— Team ————————————————————————————————————————————————————— */}
        <TeamSection />
      </main>
    </div>
  )
}
