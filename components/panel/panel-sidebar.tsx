"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { LayoutDashboard, MessageSquare, FileText, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/panel", icon: LayoutDashboard },
  { label: "Consultas", href: "/panel/consultas", icon: MessageSquare },
  { label: "Documentos", href: "/panel/documentos", icon: FileText },
  { label: "Configuración", href: "/panel/configuracion", icon: Settings },
]

export function PanelSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
        <img src="/logo.png" alt="Defensur" className="h-6 w-auto" />
        <span className="font-[family-name:var(--font-heading)] font-bold text-primary">Panel</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-navy/8 text-brand-navy"
                  : "text-muted-foreground hover:bg-muted hover:text-primary"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <div className="flex items-center gap-3 px-3">
          <UserButton />
          <span className="text-xs text-muted-foreground">Mi cuenta</span>
        </div>
      </div>
    </aside>
  )
}
