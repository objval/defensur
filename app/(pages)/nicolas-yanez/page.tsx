import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, BookOpen, Scale, Users } from "lucide-react"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "Nicolás Yáñez — Abogado Jefe Laboral y Administrativo",
  description: "Conoce a Nicolás Yáñez Inostroza, abogado jefe de Defensur. Especialista en derecho laboral y administrativo con más de 15 años de experiencia en Temuco y La Araucanía.",
}

export default function Page() {
  return (
    <>
      <PageHero
        title="Nicolás Yáñez Inostroza"
        subtitle="Abogado Jefe — Especialista en Derecho Laboral y Administrativo"
        breadcrumbs={[
          { label: "Quiénes Somos", href: "/quienes-somos/" },
          { label: "Nicolás Yáñez", href: "/nicolas-yanez/" },
        ]}
      />

      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Photo */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="/team/nicolas.webp"
                    alt="Nicolás Yáñez Inostroza"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority
                  />
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Scale className="size-4 text-brand-navy dark:text-brand-on-navy-muted" />
                    Derecho Laboral y Administrativo
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Award className="size-4 text-brand-navy dark:text-brand-on-navy-muted" />
                    +15 años de experiencia
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Users className="size-4 text-brand-navy dark:text-brand-on-navy-muted" />
                    Abogado Jefe de Defensur
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary mb-4">
                  Trayectoria profesional
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Nicolás Yáñez Inostroza es el abogado jefe y fundador de Defensur
                    Estudio Jurídico. Con más de 15 años de ejercicio profesional, se ha
                    consolidado como uno de los referentes en derecho laboral de la Región
                    de La Araucanía.
                  </p>
                  <p>
                    Su carrera se ha enfocado en la defensa de los derechos de los
                    trabajadores, particularmente en casos de despidos injustificados,
                    tutela laboral y acoso en el lugar de trabajo. Ha representado con
                    éxito a funcionarios públicos y privados en causas contra
                    municipalidades, hospitales y empresas de diversa envergadura.
                  </p>
                  <p>
                    Entre sus logros más destacados se encuentran sentencias que han
                    establecido precedentes en materia de protección de derechos
                    fundamentales en el ámbito laboral, incluyendo condenas millonarias
                    contra instituciones públicas por vulneración de la integridad
                    psíquica y física de sus funcionarios.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary mb-4">
                  Áreas de especialización
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Tutela laboral y derechos fundamentales",
                    "Despidos injustificados y autodespidos",
                    "Acoso laboral (mobbing)",
                    "Sumarios administrativos",
                    "Funcionarios públicos",
                    "Derecho administrativo",
                    "Indemnizaciones laborales",
                    "Mediación ante Inspección del Trabajo",
                  ].map((area) => (
                    <div
                      key={area}
                      className="flex items-start gap-2.5 p-4 rounded-xl border border-border bg-card"
                    >
                      <span className="text-brand-sky mt-0.5 text-sm">✓</span>
                      <span className="text-sm text-foreground">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary mb-4">
                  Sentencias destacadas
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Municipalidad de Temuco — $14.500.000",
                      desc: "Tutela laboral por vulneración de derechos fundamentales con indemnización por daño moral.",
                    },
                    {
                      title: "Supermercado Lily — $9.900.000",
                      desc: "Tribunal acoge tutela laboral por práctica antisindical en Villarrica.",
                    },
                    {
                      title: "APS Perquenco — $12.000.000",
                      desc: "Tutela por vulneración de derechos fundamentales y acoso laboral.",
                    },
                    {
                      title: "Hospital Heyermann Angol — $15.000.000",
                      desc: "Indemnización por despido injustificado de funcionaria hospitalaria.",
                    },
                  ].map((sentencia) => (
                    <div
                      key={sentencia.title}
                      className="p-5 rounded-xl border border-border bg-card"
                    >
                      <p className="font-semibold text-primary text-sm">
                        {sentencia.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {sentencia.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contacto/"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-sky text-white font-semibold shadow-[0_4px_16px_rgba(63,173,254,0.3)] hover:shadow-[0_6px_24px_rgba(63,173,254,0.5)] transition-all hover:-translate-y-0.5 active:scale-95"
              >
                Agendar consulta con Nicolás
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
