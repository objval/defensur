"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { WhatsAppCta, ContactInfo } from "@/components/ui/whatsapp-cta"

type ServicePageProps = {
  title: string
  subtitle: string
  intro: string
  highlights: { title: string; description: string }[]
  details: { heading: string; content: string }[]
  faqs: { question: string; answer: string }[]
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <h3 className="font-[family-name:var(--font-heading)] text-base md:text-lg font-semibold text-primary">
          {question}
        </h3>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 ease-in-out",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <p className="pb-5 text-sm text-muted-foreground leading-relaxed pr-12">
          {answer}
        </p>
      </div>
    </div>
  )
}

export function ServicePageContent({
  title,
  subtitle,
  intro,
  highlights,
  details,
  faqs,
}: ServicePageProps) {
  return (
    <>
      {/* Intro */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
          <div className="max-w-3xl space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">{intro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="p-5 rounded-xl border border-border bg-card"
                >
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-primary mb-2">
                    {h.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-8 space-y-12">
              {details.map((d) => (
                <div key={d.heading} className="space-y-4">
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary">
                    {d.heading}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {d.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5">
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary">
                  ¿Necesitas asesoría en {title.toLowerCase()}?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cuéntanos tu caso y te responderemos en menos de 24 horas. Primera
                  consulta gratuita.
                </p>
                <WhatsAppCta context={title} className="w-full" />
                <ContactInfo />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-12 md:py-20 bg-background">
          <div className="max-w-3xl mx-auto px-5 md:px-12 lg:px-24">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-semibold text-primary mb-8">
              Preguntas frecuentes sobre{" "}
              <span className="italic font-normal">{title.toLowerCase()}</span>
            </h2>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
