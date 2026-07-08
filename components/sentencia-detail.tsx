import Link from "next/link"
import { ArrowLeft, Calendar, Mail, Phone, Scale } from "lucide-react"
import type { Sentencia } from "@/lib/sentencias-data"

// ─── Sub-components ───────────────────────────────────────────────────────────

function LawyerCard({
  author,
  authorRole,
  label,
}: {
  author: string
  authorRole: string
  label: string
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 md:p-6">
      <div className="shrink-0 flex size-12 items-center justify-center rounded-full bg-brand-navy text-white">
        <Scale className="size-5" aria-hidden="true" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-sky mb-0.5">
          {label}
        </p>
        <p className="font-[family-name:var(--font-heading)] font-semibold text-primary text-base">
          {author}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{authorRole}</p>
      </div>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-semibold text-primary mb-4">
      {children}
    </h2>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SentenciaDetail({ s }: { s: Sentencia }) {
  const formattedDate = new Date(s.date).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="bg-background">
      {/* ── Hero ── */}
      <section className="relative bg-brand-navy overflow-hidden">
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-sky/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-5 md:px-12 lg:px-8 pt-28 md:pt-36 pb-12 md:pb-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              <li>
                <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">
                  Inicio
                </Link>
              </li>
              <li className="flex items-center gap-1.5 text-white/30" aria-hidden="true">›</li>
              <li>
                <Link
                  href="/sentencias/"
                  className="text-white/50 hover:text-white/80 transition-colors"
                >
                  Sentencias
                </Link>
              </li>
              <li className="flex items-center gap-1.5 text-white/30" aria-hidden="true">›</li>
              <li>
                <span className="text-brand-sky font-medium line-clamp-1">{s.category}</span>
              </li>
            </ol>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-sky px-3 py-1.5 rounded-full bg-brand-sky/10 border border-brand-sky/20">
              {s.category}
            </span>
            <span className="text-sm font-bold text-white px-3 py-1.5 rounded-full bg-white/10">
              {s.amount}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-white/50">
              <Calendar className="size-3.5" aria-hidden="true" />
              {formattedDate}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-3xl mb-6">
            {s.title}
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl">
            {s.summaryHighlight}
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-4xl mx-auto px-5 md:px-12 lg:px-8 py-12 md:py-16 space-y-12">

        {/* Back link */}
        <Link
          href="/sentencias/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-navy transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver a sentencias
        </Link>

        {/* Abogado a cargo */}
        <LawyerCard author={s.author} authorRole={s.authorRole} label="Abogado a cargo del caso" />

        {/* Sentencia condenatoria */}
        <div className="rounded-2xl border border-amber-200/60 bg-amber-50/60 p-6 md:p-8">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-amber-800 mb-3">
            Sentencia Condenatoria
          </h2>
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
            {s.condemnationSummary}
          </p>
        </div>

        {/* Contexto del caso */}
        {s.caseContext && (
          <section aria-labelledby="contexto-heading">
            <SectionHeading>Contexto del Caso</SectionHeading>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {s.caseContext}
            </p>
          </section>
        )}

        {/* El fallo del tribunal */}
        {s.judgmentText && (
          <section aria-labelledby="fallo-heading">
            <SectionHeading>El Fallo del Tribunal</SectionHeading>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              {s.judgmentText}
            </p>

            {s.judgmentQuote && (
              <blockquote className="relative pl-5 border-l-4 border-brand-sky my-6">
                <p className="text-sm md:text-base text-muted-foreground italic leading-relaxed">
                  {s.judgmentQuote}
                </p>
              </blockquote>
            )}

            {s.judgmentConclusion && (
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {s.judgmentConclusion}
              </p>
            )}
          </section>
        )}

        {/* Indemnizaciones */}
        {s.compensations.length > 0 && (
          <section aria-labelledby="indemnizaciones-heading">
            <SectionHeading>Indemnizaciones Ordenadas</SectionHeading>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              La sentencia condenó al demandado al pago de las siguientes indemnizaciones, más
              costas, reajustes e intereses:
            </p>
            <ul className="space-y-3">
              {s.compensations.map((c, i) => (
                <li key={i} className="flex gap-2 text-sm md:text-base text-muted-foreground">
                  <span className="mt-0.5 shrink-0 text-brand-sky" aria-hidden="true">•</span>
                  <span>
                    <strong className="text-foreground">{c.amount}</strong> {c.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Medidas de reparación */}
        {s.repairMeasures && s.repairMeasures.length > 0 && (
          <section aria-labelledby="reparacion-heading">
            <SectionHeading>Medidas Concretas de Reparación</SectionHeading>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              Además de la indemnización económica, el tribunal ordenó una serie de medidas de
              reparación no pecuniarias:
            </p>
            <ul className="space-y-3">
              {s.repairMeasures.map((m, i) => (
                <li key={i} className="flex gap-2 text-sm md:text-base text-muted-foreground">
                  <span className="mt-0.5 shrink-0 text-brand-sky" aria-hidden="true">•</span>
                  <span>
                    <strong className="text-foreground">{m.label}:</strong> {m.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Nota de instancia */}
        {s.instanciaNote && (
          <p className="text-xs text-muted-foreground/70 italic">{s.instanciaNote}</p>
        )}

        {/* Resultado */}
        {s.outcomePoints.length > 0 && (
          <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-6 md:p-8">
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-emerald-800 mb-4">
              Resultado
            </h2>
            <ul className="space-y-2">
              {s.outcomePoints.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm md:text-base text-emerald-900">
                  <span className="mt-0.5 shrink-0 font-bold" aria-hidden="true">•</span>
                  <span className="font-semibold">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQ */}
        {s.faqItems && s.faqItems.length > 0 && (
          <section aria-labelledby="faq-heading" className="space-y-6">
            {s.faqItems.map((item, i) => (
              <div key={i}>
                <h2 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold text-primary mb-3">
                  {item.question}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Redactado por */}
        <div className="border-t border-border/50 pt-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-sky mb-3">
            Redactado por
          </p>
          <LawyerCard
            author={s.author}
            authorRole={`Abogado · Defensur Estudio Jurídico · Temuco, Chile · ${s.authorRole}`}
            label="Redactado por"
          />
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-brand-navy p-7 md:p-10">
          <h2 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold text-brand-sky leading-tight mb-3">
            {s.contactTitle ?? "¿Tienes una situación similar? Te podemos ayudar"}
          </h2>
          <p className="text-sm md:text-base text-white/70 leading-relaxed mb-6">
            {s.contactText ??
              "Si estás atravesando una situación parecida, existen acciones legales concretas para protegerte. Contáctate directamente con nosotros para evaluar tu caso sin costo."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
            <a
              href="mailto:consultas@defensur.cl"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <Mail className="size-4 shrink-0 text-brand-sky" aria-hidden="true" />
              consultas@defensur.cl
            </a>
            <a
              href="https://wa.me/56959937355"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <Phone className="size-4 shrink-0 text-brand-sky" aria-hidden="true" />
              +56 9 5993 7355
            </a>
          </div>
        </div>

        {/* Instagram embed */}
        {s.instagramEmbedUrl && (
          <div className="border-t border-border/50 pt-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-4 text-center">
              Ver la publicación original en Instagram
            </p>
            <div className="flex justify-center">
              <a
                href={s.instagramEmbedUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground hover:text-primary hover:border-brand-navy/20 transition-all"
              >
                <span className="text-lg" aria-hidden="true">❝</span>
                Ver esta publicación en Instagram
              </a>
            </div>
          </div>
        )}

        {/* Fuente de la noticia */}
        {s.sourceUrl && (
          <div className="border-t border-border/50 pt-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-4">
              Fuente periodística
            </p>
            <a
              href={s.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground hover:text-primary hover:border-brand-navy/30 hover:bg-accent/40 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 shrink-0 text-brand-sky"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>
                Ver noticia original
                {s.sourceLabel && (
                  <span className="ml-1 text-muted-foreground/60">
                    — {s.sourceLabel}
                  </span>
                )}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-3 shrink-0 text-muted-foreground/40 group-hover:text-brand-sky/60 transition-colors ml-auto"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

