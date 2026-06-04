"use client"

import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"

const sentencias = [
  {
    slug: "tutela-laboral-municipalidad-temuco-14-millones",
    title: "Municipalidad de Temuco condenada a pagar $14.500.000 por daño moral",
    excerpt:
      "Tribunal acoge acción de tutela laboral interpuesta en favor de funcionaria municipal que fue objeto de vulneración de derechos fundamentales.",
    date: "2024-11-15",
    author: "Nicolás Yáñez",
    category: "Tutela Laboral",
  },
  {
    slug: "tutela-laboral-supermercado-lily-villarrica",
    title: "Tribunal acoge tutela laboral contra Supermercado Lily en Villarrica",
    excerpt:
      "Práctica antisindical declarada por tribunal en causa seguida contra Supermercado Lily por represalias contra dirigente sindical.",
    date: "2024-10-08",
    author: "Nicolás Yáñez",
    category: "Práctica Antisindical",
  },
  {
    slug: "vulneracion-derechos-municipalidad-gorbea",
    title: "Condena a Municipalidad de Gorbea por vulneración de integridad",
    excerpt:
      "Tribunal condena a Municipalidad de Gorbea por afectar integridad física y psíquica de funcionaria a través de actos de acoso laboral sistemático.",
    date: "2024-09-22",
    author: "Sebastián Pizarro",
    category: "Tutela Laboral",
  },
  {
    slug: "indemnizacion-hospital-heyermann-angol",
    title: "Hospital Heyermann de Angol condenado a pagar indemnización",
    excerpt:
      "Funcionaria del Hospital Heyermann obtiene indemnización por despido injustificado tras años de servicio dedicado.",
    date: "2024-08-10",
    author: "Nicolás Yáñez",
    category: "Despido Injustificado",
  },
]

export function SentenciasSection() {
  return (
    <section className="py-16 md:py-28 bg-background" aria-label="Sentencias destacadas">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy dark:text-brand-on-navy-muted">
              Blog jurídico
            </span>
            <h2 className="max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl lg:text-[clamp(2.4rem,4.5vw,3.5rem)]">
              Sentencias{" "}
              <span className="italic font-normal">destacadas.</span>
            </h2>
          </div>
          <Link
            href="/sentencias/"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-sky transition-colors dark:text-brand-on-navy-muted dark:hover:text-white shrink-0"
          >
            Ver todas
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sentencias.map((sentencia, i) => (
            <Link
              key={sentencia.slug}
              href={`/sentencias/${sentencia.slug}`}
              className={`group flex flex-col rounded-2xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:border-brand-navy/15 hover:shadow-[0_4px_24px_rgba(8,24,107,0.05)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)] ${
                i === 0 ? "md:col-span-2 md:flex-row md:gap-10" : ""
              }`}
            >
              <div className={`flex flex-col flex-1 ${i === 0 ? "md:max-w-[55%]" : ""}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-sky px-2.5 py-1 rounded-full bg-brand-sky/10">
                    {sentencia.category}
                  </span>
                </div>

                <h3
                  className={`font-[family-name:var(--font-heading)] font-semibold text-primary mb-3 leading-snug group-hover:text-brand-navy transition-colors dark:group-hover:text-brand-on-navy-muted ${
                    i === 0 ? "text-xl md:text-2xl lg:text-3xl" : "text-lg"
                  }`}
                >
                  {sentencia.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {sentencia.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="size-3.5" />
                    {sentencia.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {new Date(sentencia.date).toLocaleDateString("es-CL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {i === 0 && (
                <div className="hidden md:flex items-center justify-center flex-1 rounded-xl bg-brand-navy/5 dark:bg-brand-on-navy-muted/5 min-h-[200px]">
                  <div className="text-center space-y-3 p-8">
                    <p className="text-4xl font-bold text-brand-navy dark:text-brand-on-navy-muted">
                      $14.5M
                    </p>
                    <p className="text-sm text-muted-foreground">Indemnización lograda</p>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
