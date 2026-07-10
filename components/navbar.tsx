"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import {
  ArrowRight,
  ChevronDown,
  Menu,
  MoonStar,
  SunMedium,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ─── Data ───────────────────────────────────────────────────────────────────

const navGroups = [
  {
    label: "Quiénes Somos",
    href: "/quienes-somos/",
    items: [
      { label: "Nuestro estudio", href: "/quienes-somos/" },
      { label: "Nicolás Yáñez", href: "/nicolas-yanez/" },
    ],
  },
  {
    label: "Servicios",
    href: "/derecho-laboral-temuco/",
    items: [
      { label: "Derecho Laboral", href: "/derecho-laboral-temuco/" },
      { label: "Derecho de Familia", href: "/abogados-familia-temuco/" },
      { label: "Derecho Civil", href: "/derecho-civil-temuco/" },
      { label: "Insolvencia y Reemprendimiento", href: "/insolvencia-y-reemprendimiento-temuco/" },
      { label: "Sumarios Administrativos", href: "/sumarios-administrativos-temuco/" },
    ],
  },
]

// ─── Theme toggle ───────────────────────────────────────────────────────────

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={resolvedTheme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
      className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/60 transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {resolvedTheme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
    </button>
  )
}

// ─── Desktop nav ────────────────────────────────────────────────────────────

function DesktopNav() {
  return (
    <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
      <Link
        href="/"
        className="font-[family-name:var(--font-heading)] text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        Inicio
      </Link>

      {navGroups.map((group) => (
        <div key={group.label} className="group relative">
          <Link
            href={group.href}
            className="font-[family-name:var(--font-heading)] text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-1"
            aria-haspopup="true"
          >
            {group.label}
            <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
          </Link>

          <div className="pointer-events-none absolute left-0 top-full z-20 w-72 translate-y-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-1 group-focus-within:opacity-100">
            <div className="rounded-2xl border border-border bg-popover p-2 shadow-lg">
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-popover-foreground transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="size-4 opacity-40" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      <Link
        href="/sentencias/"
        className="font-[family-name:var(--font-heading)] text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        Sentencias
      </Link>

      <Link
        href="/calculadoras/"
        className="font-[family-name:var(--font-heading)] text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        Calculadoras
      </Link>
    </nav>
  )
}

// ─── Mobile nav ─────────────────────────────────────────────────────────────

function MobileNav({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors duration-150 hover:bg-accent"
        aria-expanded={open}
        aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      <nav
        className={cn(
          "absolute inset-x-4 top-20 overflow-hidden rounded-3xl border border-border bg-popover/96 shadow-lg backdrop-blur-xl transition-[max-height,opacity] duration-300",
          open ? "max-h-[70svh] opacity-100" : "max-h-0 opacity-0 border-transparent"
        )}
        aria-label="Navegación móvil"
      >
        <div className="flex flex-col gap-4 p-6">
          <Link href="/" className="text-base font-semibold text-primary">
            Inicio
          </Link>
          {navGroups.map((group) => (
            <details key={group.label} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-foreground">
                {group.label}
                <ChevronDown className="size-4 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="mt-3 flex flex-col gap-2 pl-4">
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors duration-150 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
          <Link href="/sentencias/" className="text-base font-semibold text-foreground">
            Sentencias
          </Link>
          <Link href="/calculadoras/" className="text-base font-semibold text-foreground">
            Calculadoras
          </Link>
          <Button asChild className="mt-2 h-12 rounded-full text-sm font-semibold">
            <Link href="/contacto/">Contáctanos</Link>
          </Button>
        </div>
      </nav>
    </div>
  )
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-border bg-background/80 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 py-2.5 md:py-3 z-50 shadow-sm"
      aria-label="Barra de navegación"
    >
      <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2 font-[family-name:var(--font-heading)]">
        <Image src="/logo.png" alt="Defensur Logo" width={64} height={64} className="h-6 w-auto object-contain dark:invert" />
        Defensur
      </Link>

      <DesktopNav />

      <div className="flex items-center gap-2 md:gap-3">
        <ThemeToggle />
        {/* Mobile: WhatsApp quick CTA */}
        <a
          href="https://wa.me/56959937355?text=Hola%20Defensur%2C%20necesito%20orientaci%C3%B3n%20jur%C3%ADdica."
          target="_blank"
          rel="noreferrer"
          aria-label="Contactar por WhatsApp"
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-brand-sky px-3.5 text-xs font-semibold text-white shadow-[0px_4px_12px_rgba(63,173,254,0.3)] transition-all hover:shadow-[0px_4px_16px_rgba(63,173,254,0.4)] active:scale-95 md:hidden"
        >
          WhatsApp
        </a>
        <Button
          asChild
          className="rounded-full px-6 py-2.5 text-sm font-semibold active:scale-95 hidden md:inline-flex"
        >
          <Link href="/contacto/">Contáctanos</Link>
        </Button>
        <MobileNav open={mobileMenuOpen} onToggle={() => setMobileMenuOpen((v) => !v)} />
      </div>
    </nav>
  )
}
