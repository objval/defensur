import Link from "next/link"
import { Clock, Phone } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { WhyDefensur } from "@/components/why-defensur"
import { TeamSection } from "@/components/team-section"
import { ContactForm } from "@/components/contact-form"
import { AREAS_DE_PRACTICA, SITE } from "@/lib/site"
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

            {/* —— Right column: form card —————————————————————————————————————————————— */}
            <div className="lg:col-span-5 relative lg:-ml-12">
              <ContactForm />
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
