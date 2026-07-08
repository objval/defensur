"use client"

import { useState, type ReactNode } from "react"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, FileText, Settings, ChevronLeft, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/panel", icon: LayoutDashboard },
  { label: "Consultas", href: "/panel/consultas", icon: MessageSquare },
  { label: "Documentos", href: "/panel/documentos", icon: FileText },
  { label: "Configuración", href: "/panel/configuracion", icon: Settings },
]

export function PanelShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-200 md:relative",
          collapsed ? "w-16" : "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn("flex items-center border-b border-border px-4 py-4", collapsed && "justify-center")}>
          {!collapsed && (
            <>
              <img src="/logo.png" alt="Defensur" className="h-6 w-auto" />
              <span className="ml-2 font-[family-name:var(--font-heading)] text-sm font-bold text-primary">Panel</span>
            </>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-1 px-2 py-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  collapsed ? "justify-center px-0" : "",
                  isActive ? "bg-brand-navy/10 text-brand-navy" : "text-muted-foreground hover:bg-muted hover:text-primary"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && item.label}
              </Link>
            )
          })}
        </nav>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center border-t border-border py-3 text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>

        {/* User */}
        <div className={cn("border-t border-border px-4 py-3", collapsed && "flex justify-center")}>
          <UserButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <button onClick={() => setMobileOpen(true)} className="text-muted-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <img src="/logo.png" alt="Defensur" className="h-5 w-auto" />
          <UserButton />
        </div>

        {/* Page content */}
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
