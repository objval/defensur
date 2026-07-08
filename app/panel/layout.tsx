import { auth } from "@clerk/nextjs/server"
import { PanelShell } from "@/components/panel/panel-shell"

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  // Redirects to sign-in page if user is not authenticated
  await auth.protect()

  return <PanelShell>{children}</PanelShell>
}
