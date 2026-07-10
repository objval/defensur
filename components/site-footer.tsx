"use client"

import Link from "next/link"
import { Clock, Gavel, Mail, MapPin, Phone } from "lucide-react"

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100057113543073" },
  { label: "Instagram", href: "https://www.instagram.com/defensur.estudiojuridico/" },
  { label: "TikTok", href: "https://www.tiktok.com/@defensur.estudiojuridico" },
  { label: "WhatsApp", href: "https://wa.me/56959937355" },
]

const serviceLinks = [
  { label: "Derecho Laboral", href: "/derecho-laboral-temuco/" },
  { label: "Derecho de Familia", href: "/abogados-familia-temuco/" },
  { label: "Derecho Civil", href: "/derecho-civil-temuco/" },
  { label: "Insolvencia", href: "/insolvencia-y-reemprendimiento-temuco/" },
  { label: "Sumarios Administrativos", href: "/sumarios-administrativos-temuco/" },
]

const companyLinks = [
  { label: "Quiénes Somos", href: "/quienes-somos/" },
  { label: "Nicolás Yáñez", href: "/nicolas-yanez/" },
  { label: "Sentencias Destacadas", href: "/sentencias/" },
  { label: "Calculadoras", href: "/calculadoras/" },
  { label: "Contacto", href: "/contacto/" },
]

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Gavel className="size-5 text-brand-navy" aria-hidden="true" />
              <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-primary">
                Defensur
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-6 max-w-[28ch]">
              Estudio jurídico especializado en derecho laboral, civil, de familia
              e insolvencia en Temuco.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-navy/20 hover:text-brand-navy hover:bg-brand-navy/5 dark:hover:text-brand-on-navy-muted"
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
                {serviceLinks.map((link) => (
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
                {companyLinks.map((link) => (
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
                  href="tel:+56959937355"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="size-4 text-brand-sky shrink-0" aria-hidden="true" />
                  +56 9 5993 7355
                </a>
              </li>
              <li>
                <a
                  href="mailto:consultas@defensur.cl"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="size-4 text-brand-sky shrink-0" aria-hidden="true" />
                  consultas@defensur.cl
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="size-4 text-brand-sky shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <span className="block">Antonio Varas 687, Of. 1405, Temuco</span>
                  <a
                    href="https://www.google.com/maps/place/Almagro+483,+oficina+403,+4441132+Los+Angeles,+Los+Ángeles,+Bío+Bío/data=!4m2!3m1!1s0x966bdd4602624ef5:0xf03d8055d6a60b7a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-primary transition-colors"
                  >
                    Almagro 483, Of. 403, Los Ángeles
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Clock className="size-4 text-brand-sky shrink-0" aria-hidden="true" />
                <span>Lun–Vie 09:00–14:00 y 15:00–18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Defensur Estudio Jurídico. Todos los derechos
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
