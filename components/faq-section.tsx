"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { WHATSAPP } from "@/lib/site"

const faqs = [
  {
    question: "¿Cuánto cuesta la primera consulta?",
    answer:
      "La primera consulta tiene una duración de 30 minutos y es completamente gratuita. En esta evaluación inicial analizamos tu caso y te entregamos una orientación clara sobre tus opciones legales. Las consultas posteriores tienen tarifas transparentes según la complejidad del caso.",
  },
  {
    question: "¿Qué documentos necesito para un caso de despido?",
    answer:
      "Debes reunir tu contrato de trabajo, últimas liquidaciones de sueldo, carta de despido, finiquito (si lo firmaste) y cualquier comunicación relevante con tu empleador. Si no tienes todos los documentos, podemos ayudarte a solicitarlos ante la Inspección del Trabajo.",
  },
  {
    question: "¿Cuánto tiempo demora un divorcio?",
    answer:
      "Depende del tipo: un divorcio de mutuo acuerdo demora entre 3 y 6 meses aproximadamente. Un divorcio unilateral puede tomar desde 8 meses hasta 2 años, dependiendo de la complejidad y si hay bienes o hijos menores involucrados.",
  },
  {
    question: "¿Cómo cobro una pensión de alimentos atrasada?",
    answer:
      "Iniciamos apremios judiciales contra el deudor, que pueden incluir retención de remuneraciones, arresto nocturno y prohibición de salir del país. También realizamos cobranza judicial y extrajudicial para recuperar las pensiones adeudadas.",
  },
  {
    question: "¿Qué es la tutela laboral?",
    answer:
      "La tutela laboral es un mecanismo legal que protege los derechos fundamentales del trabajador cuando son vulnerados por el empleador. Incluye protección contra despidos discriminatorios, acoso laboral, vulneración de la libertad sindical y represalias por ejercer derechos legales.",
  },
  {
    question: "¿Puedo renegociar mis deudas sin ir a juicio?",
    answer:
      "Sí. Existen mecanismos de renegociación extrajudicial y procedimientos ante la Superintendencia de Insolvencia. Evaluamos tu situación financiera y negociamos con tus acreedores las mejores condiciones para reorganizar tus deudas bajo la Ley 20.720.",
  },
  {
    question: "¿Atienden funcionarios públicos en sumarios administrativos?",
    answer:
      "Sí, es una de nuestras especialidades. Defendemos a funcionarios públicos en todo tipo de sumarios administrativos, garantizando el debido proceso, el derecho a defensa y la impugnación de sanciones injustas. Acompañamos el proceso desde la notificación hasta la resolución final.",
  },
  {
    question: "¿En qué zonas atienden?",
    answer:
      "Nuestra oficina principal está en Temuco, pero atendemos casos en toda la Región de La Araucanía, incluyendo Villarrica, Pucón, Angol, Lautaro, Nueva Imperial y ciudades cercanas. También ofrecemos atención por WhatsApp y videollamada para clientes de otras regiones.",
  },
]

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
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
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
