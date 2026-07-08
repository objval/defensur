import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Users, Award, Clock } from "lucide-react"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "Quiénes Somos — Estudio Jurídico Defensur en Temuco y La Araucanía",
  description: "Conoce al equipo de Defensur Estudio Jurídico. Más de 15 años asesorando en derecho laboral, civil, de familia e insolvencia en Temuco, La Araucanía y todo el sur de Chile.",
}

const team = [
  { name: "Nicolás Yáñez Inostroza", role: "Abogado Jefe — Laboral y Administrativo", image: "/team/nicolas.webp", featured: true },
  { name: "Sebastián Pizarro", role: "Experto en Derecho Laboral", image: "/team/sebastian.webp" },
  { name: "Millaray Rohten", role: "Abogada de Familia", image: "/team/millaray.jpeg" },
  { name: "Carolina Arancibia", role: "Administradora", image: "/team/carolina.jpeg" },
  { name: "Constanza Ampuero", role: "Abogada de Deudas", image: "/team/constanza-ampuero.jpeg" },
  { name: "Génesis Carrillo", role: "Abogada Laboral", image: "/team/genesis-carrillo.jpeg" },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Quiénes Somos"
        subtitle="Más de 15 años defendiendo los derechos de trabajadores, familias y empresas en la Región de La Araucanía."
        breadcrumbs={[{ label: "Quiénes Somos", href: "/quienes-somos/" }]}
      />

      {/* Story */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold text-primary leading-tight">
                Un estudio jurídico{" "}
                <span className="italic font-normal">con raíces en Temuco.</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Defensur nació con la convicción de que toda persona merece acceso a
                  justicia de calidad. Desde nuestra fundación en Temuco, hemos construido
                  un equipo multidisciplinario de abogados especializados que comparten
                  un mismo compromiso: defender los derechos de nuestros clientes con
                  estrategia, transparencia y resultados.
                </p>
                <p>
                  A lo largo de más de 15 años, hemos representado a cientos de
                  trabajadores, familias y empresas en la Región de La Araucanía,
                  logrando sentencias que han marcado precedentes en materia de tutela
                  laboral, despido injustificado y protección de derechos fundamentales.
                </p>
                <p>
                  Nuestra filosofía es simple: honestidad desde el primer día. No
                  prometemos lo que no podemos cumplir. Analizamos cada caso con rigor,
                  diseñamos la mejor estrategia legal y luchamos por los resultados que
                  nuestros clientes merecen.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-navy/5 dark:bg-brand-on-navy-muted/5 text-center">
                <MapPin className="size-8 text-brand-navy dark:text-brand-on-navy-muted mb-3" />
                <p className="text-2xl font-bold text-primary">Temuco</p>
                <p className="text-xs text-muted-foreground mt-1">Sede principal</p>
              </div>
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-navy/5 dark:bg-brand-on-navy-muted/5 text-center">
                <Users className="size-8 text-brand-navy dark:text-brand-on-navy-muted mb-3" />
                <p className="text-2xl font-bold text-primary">6</p>
                <p className="text-xs text-muted-foreground mt-1">Integrantes</p>
              </div>
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-navy/5 dark:bg-brand-on-navy-muted/5 text-center">
                <Award className="size-8 text-brand-navy dark:text-brand-on-navy-muted mb-3" />
                <p className="text-2xl font-bold text-primary">+500</p>
                <p className="text-xs text-muted-foreground mt-1">Casos resueltos</p>
              </div>
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-navy/5 dark:bg-brand-on-navy-muted/5 text-center">
                <Clock className="size-8 text-brand-navy dark:text-brand-on-navy-muted mb-3" />
                <p className="text-2xl font-bold text-primary">+15</p>
                <p className="text-xs text-muted-foreground mt-1">Años de experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold text-primary mb-10">
            Nuestro equipo
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <div key={member.name} className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-sky">
                    {member.role}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-white leading-snug">
                    {member.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-3xl mx-auto px-5 md:px-12 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary mb-4">
            ¿Listo para defender tus derechos?
          </h2>
          <p className="text-muted-foreground mb-6">
            Tu primera consulta es gratuita. Cuéntanos tu caso.
          </p>
          <Link
            href="/contacto/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-sky text-white font-semibold shadow-[0_4px_16px_rgba(63,173,254,0.3)] hover:shadow-[0_6px_24px_rgba(63,173,254,0.5)] transition-all hover:-translate-y-0.5 active:scale-95"
          >
            Agendar consulta
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
