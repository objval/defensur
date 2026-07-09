"use client"

import { ReactNode } from "react"
import { UserButton } from "@clerk/nextjs"
import { Toaster } from "sonner"
import { PanelSidebar } from "./panel-sidebar"

export function PanelShell({ children }: { children: ReactNode }) {
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
