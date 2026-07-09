import { auth } from "@clerk/nextjs/server"
import { PanelShell } from "@/components/panel/panel-shell"

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  // Preserves original URL — after sign-in, user returns to /panel (or whichever sub-route they tried)
  await auth.protect()

  return <PanelShell>{children}</PanelShell>
}
