import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SENTENCIAS } from "@/lib/sentencias-data"

export const metadata: Metadata = {
  title: "Sentencias Destacadas — Casos de Éxito en La Araucanía",
  description: "Conoce nuestras sentencias destacadas y casos de éxito en derecho laboral, familiar y civil en Temuco, La Araucanía y todo el sur de Chile. Resultados reales que demuestran nuestro compromiso.",
  openGraph: {
    title: "Sentencias Destacadas — Casos de Éxito en La Araucanía",
    description: "Conoce nuestras sentencias destacadas y casos de éxito en derecho laboral, familiar y civil.",
    images: [{ url: "/og/sentencias.jpg", width: 1200, height: 630, alt: "Sentencias Destacadas Defensur" }],
  },
}

const sentencias = [...SENTENCIAS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)

export default function Page() {
  return (
    <>
      <PageHero
        title="Sentencias Destacadas"
        subtitle="Resultados reales que demuestran nuestro compromiso con la justicia y la defensa de tus derechos."
        breadcrumbs={[{ label: "Sentencias", href: "/sentencias/" }]}
      />

      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sentencias.map((s, i) => (
              <Link
                key={s.slug}
                href={`/sentencias/${s.slug}`}
                className={`group flex flex-col rounded-2xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:border-brand-navy/15 hover:shadow-[0_4px_24px_rgba(8,24,107,0.05)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)] ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-sky px-2.5 py-1 rounded-full bg-brand-sky/10">
                    {s.category}
                  </span>
                  <span className="text-lg font-bold text-brand-navy dark:text-brand-on-navy-muted">
                    {s.amount}
                  </span>
                </div>

                <h2
                  className={`font-[family-name:var(--font-heading)] font-semibold text-primary mb-3 leading-snug group-hover:text-brand-navy transition-colors ${
                    i === 0 ? "text-xl md:text-2xl" : "text-lg"
                  }`}
                >
                  {s.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                  {s.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="size-3.5" />
                      {s.author}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {new Date(s.date).toLocaleDateString("es-CL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy group-hover:text-brand-sky transition-colors dark:text-brand-on-navy-muted">
                    Leer más
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
