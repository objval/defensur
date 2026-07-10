"use client"

import Link from "next/link"
import { Clock, Phone } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { WhyDefensur } from "@/components/why-defensur"
import { TeamSection } from "@/components/team-section"
import { ContactForm } from "@/components/contact-form"
import { cn } from "@/lib/utils"

// ─── Main hero ──────────────────────────────────────────────────────────────

export function DefensurHomeHero() {
  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
      <Navbar />

      {/* ── Hero section ─────────────────────────────────────────────────── */}
      <main>
        <section className="relative z-10 pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-12 lg:px-24 max-w-7xl mx-auto" aria-label="Inicio">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center">
            {/* ── Left column ───────────────────────────────────────────────── */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Service tags — horizontally scrollable on mobile */}
              <ul className="flex flex-nowrap md:flex-wrap gap-3 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:overflow-visible scrollbar-none list-none" aria-label="Áreas de práctica">
                {["DERECHO LABORAL", "SUMARIO ADMINISTRATIVO", "DERECHO PENAL"].map((tag) => (
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
                  Confianza y{" "}
                  <span className="italic font-normal">compromiso en el sur de Chile.</span>
                </h1>
                <p className="text-lg leading-[1.7] text-muted-foreground max-w-xl">
                  Protegemos sus intereses con una estructura legal sólida y sofisticada. Defensur combina la tradición jurídica con la agilidad contemporánea.
                </p>
                {/* Mobile: quick contact */}
                <div className="flex flex-col gap-3 md:hidden">
                  <a
                    href="tel:+569****7355"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy"
                    aria-label="Llamar ahora"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    +56 9 5993 7355
                  </a>
                  <p className="text-xs text-muted-foreground">
                    Atención presencial y por WhatsApp · Lun–Vie 09:00–18:00
                  </p>
                </div>
              </div>

              {/* Marca Registrada badge */}
              <a
                href="https://www.defensur.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full border border-brand-navy/20 bg-brand-navy/5 hover:bg-brand-navy/10 hover:-translate-y-0.5 transition-all cursor-pointer select-none"
                aria-label="Defensur Marca Registrada — visitar sitio oficial"
              >
                {/* Escudo SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-3.5 text-brand-navy shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[11px] font-bold tracking-[0.12em] text-brand-navy uppercase leading-none">
                  Defensur
                </span>
                <span className="text-[10px] font-medium tracking-[0.08em] text-muted-foreground leading-none border-l border-brand-navy/20 pl-2.5">
                  Marca Registrada <sup className="text-[8px]">®</sup>
                </span>
              </a>

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

            {/* ── Right column: form card ───────────────────────────────────── */}
            <div className="lg:col-span-5 relative lg:-ml-12">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* ── Why Defensur (marquee + values) ──────────────────────────────── */}
        <WhyDefensur />

        {/* ── Team ──────────────────────────────────────────────────────────── */}
        <TeamSection />
      </main>
    </div>
  )
}
