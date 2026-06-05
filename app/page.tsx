import { DefensurHomeHero } from "@/components/defensur-home-hero"
import { ServicesGrid } from "@/components/services-grid"
import { VideoSection } from "@/components/video-section"
import { SuccessCases } from "@/components/success-cases"
import { SentenciasSection } from "@/components/sentencias-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/stats-bar"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

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
