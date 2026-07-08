import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { PanelShell } from "@/components/panel/panel-shell"

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return <PanelShell>{children}</PanelShell>
}
