"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock, Phone } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { WhyDefensur } from "@/components/why-defensur"
import { TeamSection } from "@/components/team-section"
import { HeroContactForm } from "@/components/hero-contact-form"
import { AREAS_DE_PRACTICA, SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

// —— Main hero ————————————————————————————————————————————————

export function DefensurHomeHero() {
  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
      <Navbar />

      {/* —— Hero section ——————————————————————————————————————————————— */}
      <main>
        <section className="relative z-10 mx-auto max-w-7xl px-5 pt-24 pb-16 md:px-8 md:pt-32 md:pb-24 lg:px-12" aria-label="Inicio">
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
                  <span className="italic font-normal">compromiso desde el sur de Chile.</span>
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

              {/* Marca Registrada badge */}
              <a
                href="https://www.defensur.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full border border-brand-navy/20 bg-brand-navy/5 hover:bg-brand-navy/10 hover:-translate-y-0.5 transition-all cursor-pointer select-none"
                aria-label="Defensur Marca Registrada — visitar sitio oficial"
              >
                <Image
                  src="/logo.png"
                  alt="Logo Defensur"
                  width={18}
                  height={18}
                  className="h-[18px] w-auto object-contain dark:invert"
                  aria-hidden="true"
                />
                <span className="text-[11px] font-bold tracking-[0.12em] text-brand-navy uppercase leading-none">
                  Defensur
                </span>
                <span className="text-[10px] font-medium tracking-[0.08em] text-muted-foreground leading-none border-l border-brand-navy/20 pl-2.5">
                  Marca Registrada <sup className="text-[8px]">®</sup>
                </span>
              </a>

              {/* +15 años badge */}
              <div
                className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full border border-brand-sky/20 bg-brand-sky/5 select-none"
                aria-label="+15 años de experiencia"
              >
                <Clock className="size-3.5 text-brand-sky shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-bold tracking-[0.12em] text-brand-sky uppercase leading-none">
                  +15 años de experiencia
                </span>
              </div>
            </div>

            {/* —— Right column: form */}
            <div className="lg:col-span-5 relative lg:-ml-12">
              <HeroContactForm />
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
