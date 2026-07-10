"use client"

import { Scale, BriefcaseBusiness, ShieldCheck, Phone } from "lucide-react"
import { Marquee } from "@/components/marquee"
import { cn } from "@/lib/utils"
import { MARQUEE_QUESTIONS } from "@/lib/site"

const marqueeQuestions = MARQUEE_QUESTIONS

const values = [
  {
    icon: Scale,
    title: "Estrategia real",
    description:
      "Analizamos tu caso con honestidad desde el primer día. Diseñamos la mejor salida jurídica posible, sin promesas vacías ni vueltas innecesarias.",
  },
  {
    icon: ShieldCheck,
    title: "Defensa comprobada",
    description:
      "Sentencias ganadas contra municipalidades, hospitales y empresas. Publicamos resultados reales para que sepas exactamente cómo trabajamos.",
  },
  {
    icon: Phone,
    title: "Respuesta inmediata",
    description:
      "WhatsApp, teléfono o presencial en Temuco. Respondemos en menos de 24 horas. Tu primera consulta no tiene costo ni compromiso.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Cobertura integral",
    description:
      "Laboral, familia, civil, insolvencia y sumarios. Un solo estudio para todas tus necesidades legales en la Región de La Araucanía.",
  },
]

export function WhyDefensur() {
  const m1 = marqueeQuestions.slice(0, 4)
  const m2 = marqueeQuestions.slice(4, 8)
  const m3 = marqueeQuestions.slice(8)

  return (
    <section className="relative bg-background py-16 md:py-28">
      <div className="mx-auto max-w-full">
        {/* ── Heading ────────────────────────────────────────────────────── */}
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-y-5 px-5 text-center md:px-10">
          <h2 className="max-w-3xl font-[family-name:var(--font-heading)] font-semibold text-3xl sm:text-4xl lg:text-[clamp(2.4rem,4.5vw,3.5rem)] leading-[1.15] text-primary">
            Sabemos lo que te preocupa.{" "}
            <span className="italic font-normal">Por eso defendemos así.</span>
          </h2>
          <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Cada caso es una persona con una situación urgente. Filtramos el ruido,
            nos enfocamos en lo que importa y te damos claridad para actuar desde hoy.
          </p>
        </div>

        {/* ── Marquee rows ───────────────────────────────────────────────── */}
        <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 md:w-24 bg-gradient-to-r from-[var(--background)] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 md:w-24 bg-gradient-to-l from-[var(--background)] to-transparent" />

          <div className="-mx-6 flex w-screen flex-col gap-2.5 md:-mx-10 lg:-mx-16">
            <Marquee className="[--duration:40s] [--gap:0.75rem]" repeat={2}>
              {m1.map((q) => (
                <span
                  key={q}
                  className="shrink-0 rounded-full border border-brand-navy/10 bg-brand-navy/[0.04] px-4 py-2 text-sm text-brand-navy/80"
                >
                  {q}
                </span>
              ))}
            </Marquee>

            <Marquee
              className="[--duration:48s] [--gap:0.75rem]"
              repeat={2}
              reverse
            >
              {m2.map((q) => (
                <span
                  key={q}
                  className="shrink-0 rounded-full border border-brand-navy/10 bg-brand-navy/[0.04] px-4 py-2 text-sm text-brand-navy/80"
                >
                  {q}
                </span>
              ))}
            </Marquee>

            <Marquee className="[--duration:36s] [--gap:0.75rem]" repeat={2}>
              {m3.map((q) => (
                <span
                  key={q}
                  className="shrink-0 rounded-full border border-brand-navy/10 bg-brand-navy/[0.04] px-4 py-2 text-sm text-brand-navy/80"
                >
                  {q}
                </span>
              ))}
            </Marquee>
          </div>
        </div>

        {/* ── Values grid ────────────────────────────────────────────────── */}
        <div className="mx-auto mt-16 max-w-7xl px-5 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-12 border-t border-border/50">
            {values.map((value, i) => {
              const Icon = value.icon
              const isLast = i === values.length - 1
              return (
                <div
                  key={value.title}
                  className={cn(
                    "flex flex-col gap-5 px-6 py-8 sm:py-10 lg:px-8 lg:py-12 border-border/50",
                    // Mobile: bottom border on all but last
                    !isLast && "border-b",
                    // Tablet (2 cols): right border on col 1, bottom on row 1
                    "sm:border-b-0",
                    i < 2 && "sm:border-b",
                    i % 2 === 0 && "sm:border-r",
                    // Desktop (4 cols): right border on all but last
                    "lg:border-b-0 lg:border-r-0",
                    !isLast && "lg:border-r"
                  )}
                >
                  <Icon className="size-10 text-brand-navy/40" aria-hidden="true" />

                  <div className="flex flex-col gap-2.5 pt-6 sm:pt-10 lg:pt-16">
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl sm:text-2xl text-primary leading-tight">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
