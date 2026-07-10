"use client"

import Link from "next/link"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

import { COMPANY_LINKS, NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-12 md:py-16 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Defensur" className="h-6 w-auto" />
              <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-primary">
                {SITE.name}
              </span>
            </div>
            <p className="max-w-[28ch] text-sm leading-6 text-muted-foreground">
              Estudio jurídico especializado en derecho laboral, civil, de
              familia e insolvencia en Temuco.
            </p>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-navy/20 hover:bg-brand-navy/5 hover:text-brand-navy"
                >
                  <span className="text-xs font-bold">
                    {link.label.charAt(0)}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold tracking-[0.1em] text-primary uppercase">
              Servicios
            </h5>
            <nav aria-label="Enlaces de servicios">
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
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
            <h5 className="text-xs font-bold tracking-[0.1em] text-primary uppercase">
              Empresa
            </h5>
            <nav aria-label="Enlaces de empresa">
              <ul className="space-y-3">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
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
            <h5 className="text-xs font-bold tracking-[0.1em] text-primary uppercase">
              Contacto
            </h5>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${SITE.phone.e164}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone
                    className="size-4 shrink-0 text-brand-sky"
                    aria-hidden="true"
                  />
                  {SITE.phone.local}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail
                    className="size-4 shrink-0 text-brand-sky"
                    aria-hidden="true"
                  />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-brand-sky"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <span className="block">{SITE.address}</span>
                  <a
                    href="https://www.google.com/maps/place/Almagro+483,+oficina+403,+4****32+Los+Angeles,+Los+Ángeles,+Bío+Bío/data=!4m2!3m1!1s0x966bdd4602624ef5:0xf03d8055d6a60b7a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-primary transition-colors"
                  >
                    Almagro 483, Of. 403, Los Ángeles
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Clock
                  className="size-4 shrink-0 text-brand-sky"
                  aria-hidden="true"
                />
                <span>{SITE.hours.display}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.fullName}. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacidad"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Términos de Uso
            </Link>
            <Link
              href="/contacto"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
