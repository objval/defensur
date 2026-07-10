"use client"

import { useQuery } from "convex/react"
import { motion } from "framer-motion"
import Link from "next/link"
import { api } from "@/convex/_generated/api"
import { PanelHeader } from "@/components/panel/panel-header"
import { PanelMetrics } from "@/components/panel/panel-metrics"
import { Clock, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { STATUS, timeAgo } from "@/lib/panel-utils"
import type { Doc } from "@/convex/_generated/dataModel"

export default function DashboardPage() {
  const consultas = useQuery(api.consultas.listMine) as
    Doc<"consultas">[] | null | undefined

  const recent = (consultas ?? [])
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5)

  return (
    <div className="w-full space-y-8 p-4 md:p-6 lg:p-8">
      {/* Greeting header */}
      <PanelHeader />

      {/* Stat cards */}
      <PanelMetrics />

      {/* Recent Consultas */}
      <section>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          {/* Section header */}
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4">
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
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-navy/10">
                  <Clock className="h-7 w-7 text-brand-navy" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">
                  Sin consultas aún
                </h3>
                <p className="mb-4 max-w-xs text-sm text-muted-foreground">
                  Envía tu primera consulta especializada y nuestro equipo te
                  responderá en menos de 24 horas.
                </p>
                <Link
                  href="/panel/consultas/nueva"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-navy/90"
                >
                  Nueva Consulta
                </Link>
              </div>
            ) : (
              recent.map((c, i) => {
                const status = STATUS[c.status] || STATUS.pendiente
                return (
                  <motion.div
                    key={c._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="group cursor-pointer px-6 py-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Left: avatar + text */}
                      <div className="flex min-w-0 flex-1 items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy/10 text-sm font-semibold text-brand-navy">
                          {c.area?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-foreground">
                            {c.subject}
                          </h3>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {timeAgo(c.createdAt)}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-border" />
                            <span className="text-xs text-muted-foreground capitalize">
                              {c.area}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: status + view */}
                      <div className="flex shrink-0 items-center gap-3">
                        <span
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-medium",
                            status.color
                          )}
                        >
                          {status.label}
                        </span>
                        <Link
                          href="/panel/consultas"
                          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-brand-sky"
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
