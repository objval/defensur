import type { Metadata } from "next"
import { DefensurHomeHero } from "@/components/defensur-home-hero"
import { ServicesGrid } from "@/components/services-grid"
import { VideoSection } from "@/components/video-section"
import { SuccessCases } from "@/components/success-cases"
import { SentenciasSection } from "@/components/sentencias-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/stats-bar"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export const metadata: Metadata = {
  title: "Defensur Araucanía — Abogados Laborales en Temuco y La Araucanía",
  description:
    "Estudio jurídico especializado en derecho laboral, civil, de familia e insolvencia en Temuco, La Araucanía y todo el sur de Chile. Más de 15 años de experiencia. Consulta gratuita por WhatsApp.",
  alternates: {
    canonical: "https://www.defensuraraucania.cl",
  },
}

export default function Page() {
  return (
    <>
      <DefensurHomeHero />
      <ServicesGrid />
      <VideoSection />
      <SuccessCases />
      <SentenciasSection />
      <FAQSection />
      <CTASection />
      <SiteFooter />
      <WhatsAppFloat />
    </>
  )
}
