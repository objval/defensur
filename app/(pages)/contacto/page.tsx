"use client"

import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"

export default function Page() {
  return (
    <>
      <PageHero
        title="Contáctanos"
        subtitle="Tu primera consulta es gratuita y sin compromiso. Cuéntanos tu caso y te responderemos en menos de 24 horas."
        breadcrumbs={[{ label: "Contacto", href: "/contacto/" }]}
      />

      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary mb-4">
                  Información de contacto
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estamos disponibles para atender tu consulta por WhatsApp, teléfono
                  o de forma presencial en nuestra oficina de Temuco.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy dark:bg-brand-on-navy-muted/10 dark:text-brand-on-navy-muted">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">Teléfono</p>
                    <a href="tel:+569****7355" className="text-muted-foreground hover:text-primary transition-colors">
                      +56 9 5993 7355
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy dark:bg-brand-on-navy-muted/10 dark:text-brand-on-navy-muted">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">Correo electrónico</p>
                    <a href="mailto:consultas@defensur.cl" className="text-muted-foreground hover:text-primary transition-colors">
                      consultas@defensur.cl
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy dark:bg-brand-on-navy-muted/10 dark:text-brand-on-navy-muted">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">Oficina Temuco</p>
                    <p className="text-muted-foreground">
                      Antonio Varas 687, Oficina 1405, Temuco
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy dark:bg-brand-on-navy-muted/10 dark:text-brand-on-navy-muted">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">Oficina Los Ángeles</p>
                    <a
                      href="https://www.google.com/maps/place/Almagro+483,+oficina+403,+4441132+Los+Angeles,+Los+Ángeles,+Bío+Bío/data=!4m2!3m1!1s0x966bdd4602624ef5:0xf03d8055d6a60b7a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Almagro 483, Oficina 403, Los Ángeles
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy dark:bg-brand-on-navy-muted/10 dark:text-brand-on-navy-muted">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">Horario</p>
                    <p className="text-muted-foreground">
                      Lunes a Viernes: 09:00–14:00 y 15:00–18:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Maps — dos oficinas lado a lado */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Temuco */}
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-navy">
                    Temuco
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.0!2d-72.59335!3d-38.73564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9664c5a1f3b2a7d5%3A0xa1b2c3d4e5f60001!2sAntonio%20Varas%20687%2C%20Temuco!5e0!3m2!1ses!2scl!4v1720000001"
                      width="100%"
                      height="220"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Oficina Defensur Temuco — Antonio Varas 687"
                    />
                  </div>
                  <a
                    href="https://maps.google.com/?q=Antonio+Varas+687,+Temuco,+Chile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-brand-sky hover:underline"
                  >
                    <MapPin className="size-3" />
                    Abrir en Maps
                  </a>
                </div>

                {/* Los Ángeles */}
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-navy">
                    Los Ángeles
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.547421664046!2d-72.3494173!3d-37.4681715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966bdd4602624ef5%3A0xf03d8055d6a60b7a!2sAlmagro%20483%2C%20oficina%20403%2C%204441132%20Los%20Angeles%2C%20Los%20%C3%81ngeles%2C%20B%C3%ADo%20B%C3%ADo!5e1!3m2!1ses-419!2scl!4v1783656140356!5m2!1ses-419!2scl"
                      width="100%"
                      height="220"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Oficina Defensur Los Ángeles — Almagro 483 Of. 403"
                    />
                  </div>
                  <a
                    href="https://www.google.com/maps/place/Almagro+483,+oficina+403,+4441132+Los+Angeles,+Los+Ángeles,+Bío+Bío/data=!4m2!3m1!1s0x966bdd4602624ef5:0xf03d8055d6a60b7a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-brand-sky hover:underline"
                  >
                    <MapPin className="size-3" />
                    Abrir en Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
