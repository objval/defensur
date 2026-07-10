"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { WHATSAPP, FAQS } from "@/lib/site"

const faqs = FAQS

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary group"
        aria-expanded={open}
      >
        <h3 className="font-[family-name:var(--font-heading)] text-base md:text-lg font-semibold text-primary pr-4">
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

export function FAQSection() {
  return (
    <section className="py-16 md:py-28 bg-muted/30" aria-label="Preguntas frecuentes">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: heading */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
                FAQ
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl">
                Preguntas{" "}
                <span className="italic font-normal">frecuentes.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Resolvemos las dudas más comunes sobre nuestros servicios jurídicos.
                Si no encuentras tu respuesta, contáctanos directamente.
              </p>
              <a
                href={WHATSAPP.url("tengo una consulta")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-brand-navy text-white text-sm font-semibold hover:bg-brand-navy/90 transition-colors"
              >
                Hacer una consulta
              </a>
            </div>
          </div>

          {/* Right: FAQ list */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
