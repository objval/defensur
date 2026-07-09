import { Clock, Mail, MapPin, Phone, MessageCircle } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { WHATSAPP } from "@/lib/site"

export default function Page() {
  return (
    <>
      <PageHero
        title="Contáctanos"
        subtitle="Tu primera consulta es gratuita y sin compromiso. Contáctanos por WhatsApp, teléfono o visítanos en Temuco."
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
                {[
                  { icon: Phone, label: "Teléfono", value: "+56 9 5993 7355", href: "tel:+56959937355" },
                  { icon: Mail, label: "Correo electrónico", value: "consultas@defensur.cl", href: "mailto:consultas@defensur.cl" },
                  { icon: MapPin, label: "Dirección", value: "Antonio Varas 687, Oficina 1405, Temuco" },
                  { icon: Clock, label: "Horario", value: "Lunes a Viernes: 09:00–14:00 y 15:00–18:00" },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy">
                      <item.icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary text-sm">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

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

            {/* Right: static contact card (form disabled — under repair) */}
            <div className="lg:col-span-7">
              <div className="relative bg-white/85 backdrop-blur-xl p-6 md:p-10 rounded-2xl shadow-[0px_32px_64px_rgba(8,24,107,0.08)] border border-white/40">
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-brand-sky/10 text-brand-navy">
                    <MessageCircle className="size-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary">
                      Contáctanos por WhatsApp
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-[42ch]">
                      Estamos listos para atender tu consulta. Escríbenos ahora y un abogado te responderá en menos de 24 horas.
                    </p>
                  </div>
                  <a
                    href={WHATSAPP.url()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full h-14 bg-brand-navy text-white rounded-full font-semibold shadow-[0px_8px_24px_rgba(8,24,107,0.2)] hover:shadow-[0px_8px_32px_rgba(8,24,107,0.3)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <MessageCircle className="size-5" />
                    Escribir por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
