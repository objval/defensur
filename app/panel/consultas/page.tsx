"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"
import { Clock, ArrowRight, FileText } from "lucide-react"

const STATUS_LABELS: Record<string, string> = {
  pendiente: "Pendiente",
  en_revision: "En revisión",
  respondida: "Respondida",
  cerrada: "Cerrada",
}

const STATUS_COLORS: Record<string, string> = {
  pendiente: "bg-amber-100 text-amber-800",
  en_revision: "bg-blue-100 text-blue-800",
  respondida: "bg-green-100 text-green-800",
  cerrada: "bg-gray-100 text-gray-600",
}

export default function ConsultasPage() {
  const consultas = useQuery(api.consultas.listMine)

  if (!consultas) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-2 border-brand-navy border-t-transparent rounded-full" />
      </div>
    )
  }

  if (consultas.length === 0) {
    return (
      <div className="text-center py-20">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-lg font-semibold text-foreground mb-2">No tienes consultas</h2>
        <p className="text-muted-foreground mb-6">Envía tu primera consulta especializada</p>
        <Link
          href="/panel/consultas/nueva"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-6 py-2.5 text-white hover:bg-brand-navy/90"
        >
          Nueva consulta <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
          Mis Consultas
        </h1>
        <Link
          href="/panel/consultas/nueva"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy/90"
        >
          Nueva consulta
        </Link>
      </div>

      <div className="space-y-3">
        {consultas.map((c) => (
          <div
            key={c._id}
            className="rounded-xl border border-border bg-card p-5 hover:border-brand-sky/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-foreground truncate">{c.subject}</h3>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[c.status] || "bg-gray-100 text-gray-600"}`}>
                    {STATUS_LABELS[c.status] || c.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{c.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(c.createdAt).toLocaleDateString("es-CL")}
                  </span>
                  <span className="capitalize">{c.area}</span>
                  <span className="capitalize">{c.urgency === "baja" ? "Baja" : c.urgency === "media" ? "Media" : "Alta"}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
