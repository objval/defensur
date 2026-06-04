import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
