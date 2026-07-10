"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useClerk, UserButton, useUser } from "@clerk/nextjs"
import {
  LayoutDashboard,
  MessageSquare,
  FolderOpen,
  Bell,
  Settings,
  LogOut,
  Plus,
  ChevronLeft,
  Menu,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/panel", icon: LayoutDashboard },
  { label: "Consultas", href: "/panel/consultas", icon: MessageSquare },
  { label: "Expedientes", href: "/panel/expedientes", icon: FolderOpen },
  { label: "Notificaciones", href: "/panel/notificaciones", icon: Bell },
  { label: "Configuración", href: "/panel/configuracion", icon: Settings },
]

export function PanelSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useClerk()
  const { user } = useUser()
  const myRole = useQuery(api.admin.refreshMyRole)
  const isAdmin = myRole?.role === "admin"

  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")

  // ── Get initials ──────────────────────────────────────────────
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "DA"

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-200 md:relative md:h-full",
          collapsed ? "w-sidebar-collapsed" : "w-sidebar-w",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col gap-4 p-4">
          {/* ── Logo block ─────────────────────────────────── */}
          <div
            className={cn(
              "mb-2 flex items-center gap-3 px-2",
              collapsed && "flex-col px-0"
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white">
              {initials}
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-lg leading-tight font-bold text-primary">
                  Defensur Araucanía
                </h2>
                <p className="text-xs text-muted-foreground">
                  Panel de Control
                </p>
              </div>
            )}
          </div>

          {/* ── New Consulta CTA ────────────────────────────── */}
          {!collapsed ? (
            <Link
              href="/panel/consultas/nueva"
              className="flex items-center justify-center gap-2 rounded-lg bg-brand-navy py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-navy/90"
            >
              <Plus className="h-5 w-5" />
              Nueva Consulta
            </Link>
          ) : (
            <Link
              href="/panel/consultas/nueva"
              className="flex items-center justify-center rounded-lg bg-brand-navy py-3 text-white transition-colors hover:bg-brand-navy/90"
              title="Nueva Consulta"
            >
              <Plus className="h-5 w-5" />
            </Link>
          )}

          {/* ── Navigation ──────────────────────────────────── */}
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href)
              const Icon = item.icon

              // Coming soon items
              const disabled = [
                "expedientes",
                "notificaciones",
                "configuracion",
              ].some((s) => item.href.includes(s))
              const href = disabled ? "#" : item.href

              return (
                <Link
                  key={item.href}
                  href={href}
                  onClick={(e) => {
                    if (disabled) e.preventDefault()
                    setMobileOpen(false)
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    collapsed && "justify-center px-0",
                    active
                      ? "bg-brand-navy/10 font-semibold text-brand-navy"
                      : disabled
                        ? "cursor-not-allowed text-muted-foreground/40"
                        : "text-muted-foreground hover:bg-muted hover:text-primary"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="flex-1">{item.label}</span>}
                  {!collapsed && disabled && (
                    <span className="text-[10px] text-muted-foreground/50">
                      pronto
                    </span>
                  )}
                </Link>
              )
            })}

            {/* Admin: Users */}
            {isAdmin && (
              <Link
                href="/panel/users"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  collapsed && "justify-center px-0",
                  isActive("/panel/users")
                    ? "bg-brand-navy/10 font-semibold text-brand-navy"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                )}
                title={collapsed ? "Usuarios" : undefined}
              >
                <Shield className="h-5 w-5 shrink-0" />
                {!collapsed && "Usuarios"}
              </Link>
            )}
          </nav>

          {/* ── Bottom section ───────────────────────────────── */}
          <div className="flex flex-col gap-1 border-t border-border pt-3">
            {/* Collapse toggle (desktop) */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary md:flex"
            >
              <ChevronLeft
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform",
                  collapsed && "rotate-180"
                )}
              />
              {!collapsed && "Colapsar menú"}
            </button>

            {/* User + Logout */}
            <div
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5",
                collapsed && "flex-col gap-1 px-0"
              )}
            >
              <UserButton />
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user?.fullName || "Usuario"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => signOut(() => router.push("/"))}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-700",
                collapsed && "justify-center px-0"
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!collapsed && "Cerrar Sesión"}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-3 left-3 z-30 rounded-full border border-border bg-card p-2 shadow-sm md:hidden"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>
    </>
  )
}
