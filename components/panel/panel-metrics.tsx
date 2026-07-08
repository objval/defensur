"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { MessageSquare, Clock, CheckCircle, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

type StatCard = {
  label: string
  value: number
  icon: typeof MessageSquare
  iconColor: string
  barColor: string
}

export function PanelMetrics() {
  const stats = useQuery(api.admin.getStats) as {
    total: number
    pendiente: number
    en_revision: number
    respondida: number
    cerrada: number
    byArea: Record<string, number>
  } | null | undefined

  // Loading state
  if (stats === undefined) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
            <div className="h-1.5 w-full bg-muted" />
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-10 w-10 bg-muted rounded-full" />
              </div>
              <div className="h-8 w-12 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // If stats is null (user not staff), show zeros
  const total = stats?.total ?? 0
  const pendiente = stats?.pendiente ?? 0
  const activas = total - ((stats?.respondida ?? 0) + (stats?.cerrada ?? 0))

  const cards: StatCard[] = [
    {
      label: "Consultas Activas",
      value: activas,
      icon: MessageSquare,
      iconColor: "text-brand-navy bg-brand-navy/10",
      barColor: "bg-brand-navy",
    },
    {
      label: "Pendientes",
      value: pendiente,
      icon: Clock,
      iconColor: "text-amber-700 bg-amber-100",
      barColor: "bg-amber-500",
    },
    {
      label: "Respondidas",
      value: stats?.respondida ?? 0,
      icon: CheckCircle,
      iconColor: "text-green-700 bg-green-100",
      barColor: "bg-green-500",
    },
    {
      label: "Docs Adjuntos",
      value: 0,
      icon: FileText,
      iconColor: "text-blue-700 bg-blue-100",
      barColor: "bg-brand-sky",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-brand-sky/30 hover:shadow-sm"
        >
          {/* Color bar at top */}
          <div className={cn("h-1.5 w-full", card.barColor)} />

          <div className="flex flex-1 flex-col justify-between p-5">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">{card.label}</h3>
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-full transition-colors", card.iconColor)}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
              {card.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
