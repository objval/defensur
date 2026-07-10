import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { ServicePageContent } from "@/components/service-page-content"
import { getServiceBySlug, serviceToMetadata } from "@/lib/services-data"

const service = getServiceBySlug("derecho-laboral")!

export const metadata: Metadata = serviceToMetadata(service)

export default function Page() {
  return (
    <>
      <PageHero
        title={service.heroTitle}
        subtitle={service.heroSubtitle}
        breadcrumbs={[
          { label: service.title, href: "/derecho-laboral-temuco/" },
        ]}
      />
      <ServicePageContent
        title={service.title}

        intro={service.intro}
        highlights={service.highlights}
        details={service.details}
        faqs={service.faqs}
      />
    </>
  )
}
