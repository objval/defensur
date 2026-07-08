"use client"

import { ReactNode } from "react"
import { UserButton } from "@clerk/nextjs"
import { PanelSidebar } from "./panel-sidebar"

export function PanelShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <PanelSidebar />
      <main className="flex-1 overflow-x-hidden">
        <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-border bg-card">
          <img src="/logo.png" alt="Defensur" className="h-6 w-auto" />
          <UserButton afterSignOutUrl="/" />
        </div>
        <div className="p-6 md:p-10 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  )
}
