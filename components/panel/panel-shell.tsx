"use client"

import { ReactNode } from "react"
import { useUser, UserButton } from "@clerk/nextjs"
import { useConvexAuth } from "convex/react"
import { Toaster } from "sonner"
import { Loader2 } from "lucide-react"
import { PanelSidebar } from "./panel-sidebar"

export function PanelShell({ children }: { children: ReactNode }) {
  const { isLoaded: clerkReady, isSignedIn } = useUser()
  const { isLoading: convexLoading } = useConvexAuth()

  // Wait for both Clerk and Convex auth to be fully ready
  const authReady = clerkReady && isSignedIn && !convexLoading

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-navy" />
          <p className="text-sm text-muted-foreground">Verificando sesión…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <PanelSidebar />
      <main className="flex-1 min-w-0">
        <div className="flex items-center justify-end px-4 py-3 border-b border-border bg-card md:hidden">
          <UserButton />
        </div>
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  )
}
