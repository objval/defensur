import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "Sentencias Destacadas — Casos de Éxito | Defensur",
  description:
    "Conoce nuestras sentencias destacadas y casos de éxito en derecho laboral, familiar y civil. Resultados reales que demuestran nuestro compromiso.",
}

const sentencias = [
  {
    slug: "tutela-laboral-municipalidad-temuco-14-millones",
    title: "Municipalidad de Temuco condenada a pagar $14.500.000 por daño moral",
    excerpt:
      "Tribunal acoge acción de tutela laboral interpuesta en favor de funcionaria municipal que fue objeto de vulneración de derechos fundamentales. Se reconoce daño moral causado por actos de hostigamiento y discriminación en el lugar de trabajo.",
    date: "2024-11-15",
    author: "Nicolás Yáñez",
    category: "Tutela Laboral",
    amount: "$14.500.000",
  },
  {
    slug: "tutela-laboral-supermercado-lily-villarrica",
    title: "Tribunal acoge tutela laboral contra Supermercado Lily en Villarrica",
    excerpt:
      "Práctica antisindical declarada por tribunal en causa seguida contra Supermercado Lily por represalias contra dirigente sindical que ejercía funciones de representación gremial.",
    date: "2024-10-08",
    author: "Nicolás Yáñez",
    category: "Práctica Antisindical",
    amount: "$9.900.000",
  },
  {
    slug: "tutela-laboral-aps-perquenco-acoso",
    title: "Tutela por vulneración de derechos fundamentales en APS Perquenco",
    excerpt:
      "Tribunal acoge tutela laboral por acoso laboral y vulneración de derechos fundamentales contra la Administración de Programas Sanitarios de Perquenco.",
    date: "2024-09-15",
    author: "Nicolás Yáñez",
    category: "Acoso Laboral",
    amount: "$12.000.000",
  },
  {
    slug: "vulneracion-derechos-municipalidad-gorbea",
    title: "Condena a Municipalidad de Gorbea por vulneración de integridad",
    excerpt:
      "Tribunal condena a Municipalidad de Gorbea por afectar integridad física y psíquica de funcionaria municipal a través de actos de acoso laboral sistemático.",
    date: "2024-08-22",
    author: "Sebastián Pizarro",
    category: "Tutela Laboral",
    amount: "$6.000.000",
  },
  {
    slug: "indemnizacion-hospital-heyermann-angol",
    title: "Hospital Heyermann de Angol condenado a pagar indemnización",
    excerpt:
      "Funcionaria del Hospital Heyermann obtiene indemnización por despido injustificado tras años de servicio dedicado a la salud pública de la comuna.",
    date: "2024-07-10",
    author: "Nicolás Yáñez",
    category: "Despido Injustificado",
    amount: "$15.000.000",
  },
  {
    slug: "condena-acoso-hospital-los-angeles",
    title: "Hospital de Los Ángeles condenado por acoso laboral",
    excerpt:
      "Tribunal declara responsabilidad del Hospital de Los Ángeles por acoso laboral contra funcionaria, reconociendo vulneración de derechos fundamentales.",
    date: "2024-06-18",
    author: "Nicolás Yáñez",
    category: "Acoso Laboral",
    amount: "$8.000.000",
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Sentencias Destacadas"
        subtitle="Resultados reales que demuestran nuestro compromiso con la justicia y la defensa de tus derechos."
        breadcrumbs={[{ label: "Sentencias", href: "/sentencias/" }]}
      />

      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
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
