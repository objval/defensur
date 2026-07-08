"use client"

import Link from "next/link"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

import { COMPANY_LINKS, NAV_LINKS, SITE, SOCIAL_LINKS, WHATSAPP } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Defensur" className="h-6 w-auto" />
              <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-primary">
                {SITE.name}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-6 max-w-[28ch]">
              Estudio jurídico especializado en derecho laboral, civil, de familia
              e insolvencia en Temuco.
            </p>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-navy/20 hover:text-brand-navy hover:bg-brand-navy/5"
                >
                  <span className="text-xs font-bold">{link.label.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-primary uppercase tracking-[0.1em]">
              Servicios
            </h5>
            <nav aria-label="Enlaces de servicios">
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-primary uppercase tracking-[0.1em]">
              Empresa
            </h5>
            <nav aria-label="Enlaces de empresa">
              <ul className="space-y-3">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-primary uppercase tracking-[0.1em]">
              Contacto
            </h5>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${SITE.phone.e164}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="size-4 text-brand-sky shrink-0" aria-hidden="true" />
                  {SITE.phone.local}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="size-4 text-brand-sky shrink-0" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="size-4 text-brand-sky shrink-0 mt-0.5" aria-hidden="true" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Clock className="size-4 text-brand-sky shrink-0" aria-hidden="true" />
                <span>{SITE.hours.display}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.fullName}. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacidad"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Términos de Uso
            </Link>
            <Link
              href="/contacto"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
