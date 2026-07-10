"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { WhatsAppCta, ContactInfo } from "@/components/ui/whatsapp-cta"

type ServicePageProps = {
  title: string

  intro: string
  highlights: { title: string; description: string }[]
  details: { heading: string; content: string }[]
  faqs: { question: string; answer: string }[]
}

function AccordionItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-primary md:text-lg">
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
        <p className="pr-12 pb-5 text-sm leading-relaxed text-muted-foreground">
          {answer}
        </p>
      </div>
    </div>
  )
}

export function ServicePageContent({
  title,

  intro,
  highlights,
  details,
  faqs,
}: ServicePageProps) {
  return (
    <>
      {/* Intro */}
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="max-w-3xl space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {intro}
            </p>
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="mb-2 font-[family-name:var(--font-heading)] font-semibold text-primary">
                    {h.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-muted/30 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="space-y-12 lg:col-span-8">
              {details.map((d) => (
                <div key={d.heading} className="space-y-4">
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary">
                    {d.heading}
                  </h2>
                  <p className="leading-relaxed whitespace-pre-line text-muted-foreground">
                    {d.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-4">
              <div className="space-y-5 rounded-2xl border border-border bg-card p-6 md:p-8 lg:sticky lg:top-32">
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary">
                  ¿Necesitas asesoría en {title.toLowerCase()}?
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Cuéntanos tu caso y te responderemos en menos de 24 horas.
                  Primera consulta gratuita.
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
        <section className="bg-background py-12 md:py-20">
          <div className="mx-auto max-w-3xl px-5 md:px-8 lg:px-12">
            <h2 className="mb-8 font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary md:text-3xl">
              Preguntas frecuentes sobre{" "}
              <span className="font-normal italic">{title.toLowerCase()}</span>
            </h2>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
