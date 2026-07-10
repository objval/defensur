"use client"

import * as React from "react"
import { AnimatePresence, LazyMotion, m } from "framer-motion"
import { domAnimation } from "framer-motion"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
] as const

const WEEKDAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"] as const

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function startWeekday(year: number, month: number): number {
  // 0 = Sunday → convert to 0 = Monday
  const raw = new Date(year, month, 1).getDay()
  return raw === 0 ? 6 : raw - 1
}

function formatDate(d: Date): string {
  const day = d.getDate()
  const month = MONTHS[d.getMonth()]!.toLowerCase()
  return `${day} de ${month}`
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date())
}

type DatePickerProps = {
  value: Date | null
  onChange: (date: Date) => void
  placeholder?: string
  id?: string
  minDate?: Date
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Seleccionar fecha",
  id,
  minDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [viewYear, setViewYear] = React.useState(() => {
    const now = new Date()
    return now.getFullYear()
  })
  const [viewMonth, setViewMonth] = React.useState(() => {
    const now = new Date()
    return now.getMonth()
  })
  const containerRef = React.useRef<HTMLDivElement>(null)

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

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  function selectDay(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    if (minDate && d < minDate) return
    onChange(d)
    setOpen(false)
  }

  const totalDays = daysInMonth(viewYear, viewMonth)
  const offset = startWeekday(viewYear, viewMonth)
  const selected = value

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className="relative">
        {/* Trigger */}
        <button
          id={id}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl border bg-white px-4 py-3 text-left transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            open
              ? "border-brand-navy/30 shadow-[0_2px_12px_rgba(8,24,107,0.06)]"
              : "border-input hover:border-brand-navy/20"
          )}
          aria-expanded={open}
        >
          <CalendarIcon
            className={cn(
              "size-4 shrink-0 transition-colors",
              selected ? "text-brand-navy" : "text-muted-foreground"
            )}
          />
          <span
            className={cn(
              "text-sm",
              selected
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
          >
            {selected ? formatDate(selected) : placeholder}
          </span>
        </button>

        {/* Calendar popover */}
        <AnimatePresence>
          {open && (
            <m.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-[calc(100%+8px)] z-50 w-[280px] overflow-hidden rounded-xl border border-border bg-white shadow-[0_16px_48px_rgba(8,24,107,0.10)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Mes anterior"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <span className="text-sm font-semibold text-foreground tabular-nums">
                  {MONTHS[viewMonth]} {viewYear}
                </span>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Mes siguiente"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 px-3 pt-3 pb-1">
                {WEEKDAYS.map((w) => (
                  <div
                    key={w}
                    className="flex h-8 items-center justify-center text-[10px] font-semibold text-muted-foreground"
                  >
                    {w}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 px-3 pb-3">
                {/* Empty cells for offset */}
                {Array.from({ length: offset }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-9" />
                ))}

                {Array.from({ length: totalDays }).map((_, i) => {
                  const day = i + 1
                  const date = new Date(viewYear, viewMonth, day)
                  const isSelected = selected ? isSameDay(date, selected) : false
                  const today = isToday(date)
                  const past = minDate ? date < minDate : false

                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={past}
                      onClick={() => selectDay(day)}
                      className={cn(
                        "relative flex h-9 items-center justify-center rounded-lg text-sm transition-colors",
                        past
                          ? "cursor-default text-muted-foreground/30"
                          : isSelected
                            ? "bg-brand-navy font-semibold text-white"
                            : today
                              ? "font-semibold text-brand-navy hover:bg-brand-navy/8"
                              : "text-foreground hover:bg-muted"
                      )}
                    >
                      {day}
                      {today && !isSelected && (
                        <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-sky" />
                      )}
                    </button>
                  )
                })}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  )
}
