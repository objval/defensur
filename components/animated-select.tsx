"use client"

import * as React from "react"
import { AnimatePresence, LazyMotion, m, MotionConfig } from "framer-motion"
import { domAnimation } from "framer-motion"
import { ChevronDown, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type SelectOption = {
  id: string
  label: string
  value: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  description?: string
}

type AnimatedSelectProps = {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  id?: string
  label?: string
}

export function AnimatedSelect({ options, value, onChange, id, label = "Seleccionar opción" }: AnimatedSelectProps) {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value) ?? options[0]

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  // Close on Escape
  React.useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open])

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig transition={{ type: "spring", stiffness: 400, damping: 32 }}>
      <div ref={containerRef} className="relative">
        {/* ── Trigger: collapsed pill ──────────────────────────────────────── */}
        <button
          id={id}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-full border px-5 py-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            open
              ? "border-brand-navy/25 bg-white shadow-[0_2px_12px_rgba(8,24,107,0.08)] dark:bg-white/[0.08] dark:border-brand-on-navy-muted/30"
              : "border-border bg-muted/40 hover:bg-muted/70 hover:border-brand-navy/15 dark:hover:border-brand-on-navy-muted/20"
          )}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <div className="flex items-center gap-3">
            {selected.icon && (
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-navy/12 bg-brand-navy/[0.06] text-brand-navy dark:border-brand-on-navy-muted/15 dark:bg-brand-on-navy-muted/8 dark:text-brand-on-navy-muted">
                <selected.icon className="size-4" />
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-brand-navy dark:text-brand-on-navy-muted truncate">
                {selected.label}
              </span>
              {selected.description && (
                <span className="text-xs text-muted-foreground leading-snug mt-0.5">
                  {selected.description}
                </span>
              )}
            </div>
          </div>
          <m.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="size-4 text-muted-foreground shrink-0" />
          </m.div>
        </button>

        {/* ── Dropdown: absolute overlay, no layout shift ──────────────────── */}
        <AnimatePresence>
          {open && (
            <m.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-border/70 bg-white dark:bg-[#1a1a2e] shadow-[0_16px_48px_rgba(8,24,107,0.12)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
              role="listbox"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/40">
                <span className="text-[11px] font-bold text-brand-navy tracking-[0.12em] uppercase dark:text-brand-on-navy-muted">
                  {label}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                  aria-label="Cerrar"
                >
                  <X className="size-3" />
                </button>
              </div>

              {/* Options */}
              <div
                className="max-h-[280px] overflow-y-auto py-1.5"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style>{`.animated-select-scroll::-webkit-scrollbar { display: none; }`}</style>
                {options.map((option) => {
                  const Icon = option.icon
                  const isSelected = option.value === value

                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onChange(option.value)
                        setOpen(false)
                      }}
                      className={cn(
                        "group flex w-full items-center gap-3.5 px-5 py-3.5 text-left transition-colors duration-100",
                        isSelected
                          ? "bg-brand-navy/[0.04] dark:bg-brand-on-navy-muted/[0.06]"
                          : "hover:bg-muted/60 dark:hover:bg-white/[0.04]"
                      )}
                    >
                      {Icon && (
                        <div
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-150",
                            isSelected
                              ? "border-brand-navy/15 bg-brand-navy/[0.07] text-brand-navy dark:border-brand-on-navy-muted/20 dark:bg-brand-on-navy-muted/10 dark:text-brand-on-navy-muted"
                              : "border-border/70 bg-muted/40 text-muted-foreground group-hover:border-brand-navy/12 group-hover:bg-brand-navy/[0.04] group-hover:text-brand-navy dark:group-hover:text-brand-on-navy-muted"
                          )}
                        >
                          <Icon className="size-4" />
                        </div>
                      )}
                      <div className="flex flex-col min-w-0 flex-1">
                        <span
                          className={cn(
                            "text-sm font-semibold leading-snug",
                            isSelected
                              ? "text-brand-navy dark:text-brand-on-navy-muted"
                              : "text-foreground group-hover:text-brand-navy dark:group-hover:text-brand-on-navy-muted"
                          )}
                        >
                          {option.label}
                        </span>
                        {option.description && (
                          <span className="text-xs text-muted-foreground leading-snug mt-0.5">
                            {option.description}
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="size-4 shrink-0 text-brand-navy dark:text-brand-on-navy-muted" />
                      )}
                    </button>
                  )
                })}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
    </LazyMotion>
  )
}
