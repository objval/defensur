"use client"

import { useQuery } from "convex/react"
import { motion } from "framer-motion"
import Link from "next/link"
import { api } from "@/convex/_generated/api"
import { PanelHeader } from "@/components/panel/panel-header"
import { PanelMetrics } from "@/components/panel/panel-metrics"
import { Clock, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const STATUS: Record<string, { label: string; color: string }> = {
  pendiente:    { label: "Pendiente",    color: "bg-amber-100 text-amber-800 border-amber-200" },
  en_revision:  { label: "En revisión",  color: "bg-blue-100 text-blue-800 border-blue-200" },
  respondida:   { label: "Respondida",   color: "bg-green-100 text-green-800 border-green-200" },
  cerrada:      { label: "Cerrada",      color: "bg-gray-100 text-gray-600 border-gray-200" },
  cancelada:    { label: "Cancelada",    color: "bg-red-100 text-red-700 border-red-200" },
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `Hace ${mins} minuto${mins !== 1 ? "s" : ""}`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `Hace ${hours} hora${hours !== 1 ? "s" : ""}`
  const days = Math.floor(hours / 24)
  return `Hace ${days} día${days !== 1 ? "s" : ""}`
}

export default function DashboardPage() {
  const consultas = useQuery(api.consultas.listMine)

  const recent = (consultas ?? [])
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5)

  return (
    <div className="w-full space-y-8">
      {/* Greeting header */}
      <PanelHeader />

      {/* Stat cards */}
      <PanelMetrics />

      {/* Recent Consultas */}
      <section>
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          {/* Section header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
              Consultas Recientes
            </h2>
            <Link
              href="/panel/consultas"
              className="text-sm font-medium text-brand-sky hover:underline"
            >
              Ver todas
            </Link>
          </div>

          {/* List */}
          <div className="divide-y divide-border">
            {recent.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-navy/10 mb-4">
                  <Clock className="h-7 w-7 text-brand-navy" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Sin consultas aún</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                  Envía tu primera consulta especializada y nuestro equipo te responderá en menos de 24 horas.
                </p>
                <Link
                  href="/panel/consultas/nueva"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-navy/90"
                >
                  Nueva Consulta
                </Link>
              </div>
            ) : (
              recent.map((c: any, i: number) => {
                const status = STATUS[c.status] || STATUS.pendiente
                return (
                  <motion.div
                    key={c._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="group px-6 py-4 hover:bg-muted/40 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Left: avatar + text */}
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy/10 text-brand-navy text-sm font-semibold">
                          {c.area?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{c.subject}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{timeAgo(c.createdAt)}</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span className="text-xs text-muted-foreground capitalize">{c.area}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: status + view */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", status.color)}>
                          {status.label}
                        </span>
                        <Link
                          href="/panel/consultas"
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-brand-sky transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="hidden sm:inline">Ver</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
