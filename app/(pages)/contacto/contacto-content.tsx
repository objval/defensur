"use client"

import * as React from "react"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { ContactFormCard } from "@/components/contact-form-card"

export function ContactoContent() {
  return (
    <>
      <PageHero
        title="Contáctanos"
        subtitle="Tu primera consulta es gratuita y sin compromiso. Cuéntanos tu caso y te responderemos en menos de 24 horas."
        breadcrumbs={[{ label: "Contacto", href: "/contacto/" }]}
      />

      <section className="w-full bg-background py-12 md:py-16 px-5 md:px-8 lg:px-12">
        <div className="max-w-[1024px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Contact info */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                Ubicación Céntrica
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nuestras oficinas están diseñadas para ofrecer un entorno privado y seguro
                para la discusión de sus asuntos legales.
              </p>
              <div className="mt-2 border border-border rounded-lg overflow-hidden bg-card shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.5!2d-72.599!3d-38.735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ0JzA2LjAiUyA3MsKwMzUnNTYuNCJX!5e0!3m2!1ses!2scl!4v1234567890"
                  width="100%" height="224" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Ubicación de Defensur en Temuco"
                />
                <div className="p-4 bg-card flex items-start gap-3">
                  <MapPin className="size-5 text-brand-navy mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Antonio Varas 687, Oficina 1405</p>
                    <p className="text-sm text-muted-foreground">Temuco, Región de la Araucanía.</p>
                    <p className="text-xs text-muted-foreground mt-1">A dos cuadras de la Plaza de Armas y Tribunales.</p>
                  </div>
                </div>
              </div>

              {/* Los Ángeles office */}
              <div className="mt-4 border border-border rounded-lg overflow-hidden bg-card shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.54!2d-72.349!3d-37.468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966bdd4602624ef5%3A0xf03d8055d6a60b7a!2sAlmagro%20483%2C%20oficina%20403%2C%20Los%20Angeles%2C%20B%C3%ADo%20B%C3%ADo!5e0!3m2!1ses!2scl!4v1700000000000"
                  width="100%" height="180" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Oficina Defensur Los Ángeles"
                />
                <div className="p-4 bg-card flex items-start gap-3">
                  <MapPin className="size-5 text-brand-navy mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Almagro 483, Oficina 403</p>
                    <p className="text-sm text-muted-foreground">Los Ángeles, Región del Bío Bío.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground border-b border-border pb-2">
                Contacto Directo
              </h3>
              <div className="flex flex-col gap-5">
                <ContactRow icon={Phone} label="TELÉFONO INSTITUCIONAL" value="+56 9 5993 7355" />
                <ContactRow icon={Mail} label="CORREO ELECTRÓNICO" value="consultas@defensur.cl" />
                <ContactRow icon={Clock} label="HORARIO DE ATENCIÓN" value="Lunes a Viernes: 09:00 - 18:00 hrs." />
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <ContactFormCard />
          </div>
        </div>
      </section>
    </>
  )
}

function ContactRow({ icon: Icon, label, value }: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded flex items-center justify-center bg-muted border border-border shrink-0">
        <Icon className="size-4 text-brand-navy" />
      </div>
      <div>
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{label}</p>
        <p className="text-sm text-foreground font-medium mt-0.5">{value}</p>
      </div>
    </div>
  )
}
