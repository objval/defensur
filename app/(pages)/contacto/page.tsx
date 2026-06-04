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
                    <p className="font-semibold text-primary text-sm">Dirección</p>
                    <p className="text-muted-foreground">
                      Antonio Varas 687, Oficina 1405, Temuco
                    </p>
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

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.5!2d-72.599!3d-38.735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ0JzA2LjAiUyA3MsKwMzUnNTYuNCJX!5e0!3m2!1ses!2scl!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Defensur en Temuco"
                />
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
