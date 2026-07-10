"use client"

import * as React from "react"
import Link from "next/link"
import { useUser, UserButton } from "@clerk/nextjs"
import { ArrowRight, ChevronDown, Menu, X, LayoutDashboard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NAV_LINKS, SITE, WHATSAPP } from "@/lib/site"

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
    items: NAV_LINKS.map((l) => ({ label: l.label, href: l.href })),
  },
]

// ─── Desktop nav ───────────────────────────────────────────────────────────────────────────────────

function DesktopNav() {
  return (
    <nav
      className="hidden items-center gap-8 md:flex"
      aria-label="Navegación principal"
    >
      <Link
        href="/"
        className="font-[family-name:var(--font-heading)] text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-primary"
      >
        Inicio
      </Link>

      {navGroups.map((group) => (
        <div key={group.label} className="group relative">
          <Link
            href={group.href}
            className="inline-flex items-center gap-1 font-[family-name:var(--font-heading)] text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-primary"
            aria-haspopup="true"
          >
            {group.label}
            <ChevronDown
              className="size-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </Link>

          <div className="pointer-events-none absolute top-full left-0 z-20 w-72 translate-y-3 opacity-0 transition-all duration-200 group-focus-within:pointer-events-auto group-focus-within:translate-y-1 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-1 group-hover:opacity-100">
            <div className="rounded-2xl border border-border bg-popover p-2 shadow-lg">
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-popover-foreground transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
                >
                  <span>{item.label}</span>
                  <ArrowRight
                    className="size-4 opacity-40"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      <Link
        href="/sentencias/"
        className="font-[family-name:var(--font-heading)] text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-primary"
      >
        Sentencias
      </Link>

      <Link
        href="/calculadoras/"
        className="font-[family-name:var(--font-heading)] text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-primary"
      >
        Calculadoras
      </Link>
    </nav>
  )
}

// ─── Mobile nav ─────────────────────────────────────────────────────────────

function MobileNav({
  open,
  onToggle,
  isSignedIn,
}: {
  open: boolean
  onToggle: () => void
  isSignedIn: boolean
}) {
  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors duration-150 hover:bg-accent"
        aria-expanded={open}
        aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>

      <nav
        className={cn(
          "absolute inset-x-4 top-20 overflow-hidden rounded-3xl border border-border bg-popover/96 shadow-lg backdrop-blur-xl transition-[max-height,opacity] duration-300",
          open
            ? "max-h-[70svh] opacity-100"
            : "max-h-0 border-transparent opacity-0"
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
                <ChevronDown
                  className="size-4 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
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
          <Link
            href="/sentencias/"
            className="text-base font-semibold text-foreground"
          >
            Sentencias
          </Link>
          <Link
            href="/calculadoras/"
            className="text-base font-semibold text-foreground"
          >
            Calculadoras
          </Link>
          {isSignedIn && (
            <Link
              href="/panel"
              className="flex items-center gap-2 text-base font-semibold text-brand-navy"
            >
              <LayoutDashboard className="h-4 w-4" />
              Panel
            </Link>
          )}
          <Button
            asChild
            className="mt-2 h-12 rounded-full text-sm font-semibold"
          >
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
  const { isSignedIn } = useUser()

  return (
    <nav
      className="fixed top-4 left-1/2 z-50 flex w-[95%] max-w-7xl -translate-x-1/2 items-center justify-between rounded-full border border-border bg-background/80 px-4 py-2.5 shadow-sm backdrop-blur-xl md:px-8 md:py-3"
      aria-label="Barra de navegación"
    >
      <Link
        href="/"
        className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-primary"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Defensur" className="h-7 w-auto" />
        {SITE.name}
      </Link>

      <DesktopNav />

      <div className="flex items-center gap-2 md:gap-3">
        {/* Mobile: WhatsApp quick CTA */}
        {!isSignedIn && (
          <a
            href={WHATSAPP.url()}
            target="_blank"
            rel="noreferrer"
            aria-label="Contactar por WhatsApp"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-brand-sky px-3.5 text-xs font-semibold text-white shadow-[0px_4px_12px_rgba(63,173,254,0.3)] transition-all hover:shadow-[0px_4px_16px_rgba(63,173,254,0.4)] active:scale-95 md:hidden"
          >
            WhatsApp
          </a>
        )}

        {/* Signed-in: Panel + UserButton */}
        {isSignedIn ? (
          <div className="flex items-center gap-2">
            <Link
              href="/panel"
              className="hidden items-center gap-1.5 rounded-full bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-navy/90 md:inline-flex"
            >
              <LayoutDashboard className="h-4 w-4" />
              Panel
            </Link>
            <UserButton />
          </div>
        ) : (
          <>
            <Button
              asChild
              className="hidden rounded-full px-6 py-2.5 text-sm font-semibold active:scale-95 md:inline-flex"
            >
              <Link href="/contacto/">Contáctanos</Link>
            </Button>
          </>
        )}

        {/* Mobile: Panel link when signed in */}
        {isSignedIn && (
          <Link
            href="/panel"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-brand-navy px-3.5 text-xs font-semibold text-white md:hidden"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Panel
          </Link>
        )}

        <MobileNav
          open={mobileMenuOpen}
          onToggle={() => setMobileMenuOpen((v) => !v)}
          isSignedIn={!!isSignedIn}
        />
      </div>
    </nav>
  )
}
