"use client"

import { ReactNode } from "react"
import { useUser, UserButton } from "@clerk/nextjs"
import { useConvexAuth } from "convex/react"
import { Toaster } from "sonner"
import { Loader2 } from "lucide-react"
import { PanelSidebar } from "./panel-sidebar"

export function PanelShell({ children }: { children: ReactNode }) {
  const { isLoaded: clerkReady, isSignedIn } = useUser()
  const { isLoading: convexLoading, isAuthenticated } = useConvexAuth()

  if (!clerkReady || convexLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-navy" />
          <p className="text-sm text-muted-foreground">Verificando sesión…</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6 text-center">
        <p className="max-w-md text-sm text-muted-foreground">
          No fue posible validar tu sesión con el sistema de consultas. Cierra
          sesión e inténtalo nuevamente.
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <PanelSidebar />
      <main className="min-w-0 flex-1 flex flex-col">
        <div className="flex items-center justify-end border-b border-border bg-card px-4 py-3 md:hidden">
          <UserButton />
        </div>
        <div className="flex-1">{children}</div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  )
}
