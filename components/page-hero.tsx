import Link from "next/link"
import { ChevronRight } from "lucide-react"

type Breadcrumb = {
  label: string
  href: string
}

type PageHeroProps = {
  title: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
}

export function PageHero({ title, subtitle, breadcrumbs = [] }: PageHeroProps) {
  return (
    <section className="relative bg-brand-navy overflow-hidden">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-sky/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-12 lg:px-24 pt-28 md:pt-36 pb-12 md:pb-16">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/50 hover:text-white/80 transition-colors"
                >
                  Inicio
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5 text-white/30" aria-hidden="true" />
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-brand-sky font-medium">{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-white/50 hover:text-white/80 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-white/65 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
