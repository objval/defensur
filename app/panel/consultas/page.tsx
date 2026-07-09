"use client"

import { useState, useMemo, useCallback, type FormEvent } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Search, X, Clock, Paperclip, ChevronDown, Plus, FolderOpen, FileText,
  Download, MessageSquare, Send, AlertTriangle, Eye, CheckCircle, SearchX,
  SlidersHorizontal, ArrowUpDown, Image
} from "lucide-react"
import { cn } from "@/lib/utils"
import { STATUS, URGENCY, AREA_LABELS, SORT_OPTIONS, STATUS_FILTERS, timeAgo, formatDate, formatSize } from "@/lib/panel-utils"
import { ConsultasToolbar, type ToolbarState } from "@/components/panel/consultas-toolbar"
import { CancelModal } from "@/components/panel/cancel-modal"
import { toast } from "sonner"
import type { Id } from "@/convex/_generated/dataModel"

// ── Types ────────────────────────────────────────────────────────────────────

type Consulta = {
  _id: Id<"consultas">
  userId: string
  userEmail: string
  userName: string
  area: string
  subject: string
  description: string
  urgency: string
  status: string
  files?: Array<{ storageId: string; fileName: string; fileType: string; fileSize: number; uploadedAt: number }>
  responses?: Array<{ text: string; respondedBy: string; createdAt: number }>
  createdAt: number
  updatedAt: number
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ConsultasPage() {
  const myRole = useQuery(api.admin.refreshMyRole)
  const isAdmin = myRole?.role === "admin"
  const isStaff = myRole?.role === "admin" || myRole?.role === "staff"

  const ownConsultas = useQuery(api.consultas.listMine) as Consulta[] | undefined
  const allConsultas = useQuery(api.admin.listAll, isStaff ? {} : "skip") as Consulta[] | null | undefined
  const bulkUpdate = useMutation(api.admin.bulkUpdateStatus)
  const bulkCancel = useMutation(api.admin.bulkCancel)
  const bulkDelete = useMutation(api.admin.bulkDelete)

  const [viewAll, setViewAll] = useState(false)
  const consultas = viewAll && isStaff ? (allConsultas ?? undefined) : ownConsultas
  const cancelConsulta = useMutation(api.consultas.cancel)
  const addNote = useMutation(api.consultas.addNote)
  const getFileUrl = useMutation(api.files.getFileUrl)

  // ── State ──────────────────────────────────────────────────────
  const [toolbar, setToolbar] = useState<ToolbarState>({ search: "", statusFilter: "all", areaFilter: "all", sort: "recent" })
  const [expanded, setExpanded] = useState<Id<"consultas"> | null>(null)
  const [cancelTarget, setCancelTarget] = useState<Id<"consultas"> | null>(null)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [noteText, setNoteText] = useState("")
  const [sendingNote, setSendingNote] = useState(false)

  // ── Bulk selection ────────────────────────────────────────────
  const [selected, setSelected] = useState<Set<Id<"consultas">>>(new Set())
  const [bulkStatus, setBulkStatus] = useState("pendiente")

  const toggleSelect = (id: Id<"consultas">) => {
    setSelected(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
  }

  const selectAll = () => {
    if (selected.size === filtered.length) setSelected(new Set())
    else setSelected(new Set(filtered.map(c => c._id)))
  }

  const handleBulkAction = async (action: "status" | "cancel" | "delete") => {
    const ids = Array.from(selected)
    try {
      if (action === "status") await bulkUpdate({ ids, status: bulkStatus })
      else if (action === "cancel") await bulkCancel({ ids })
      else await bulkDelete({ ids })
      toast.success(`${ids.length} consulta${ids.length > 1 ? "s" : ""} ${action === "status" ? "actualizada" : action === "cancel" ? "cancelada" : "eliminada"}${ids.length > 1 ? "s" : ""}`)
      setSelected(new Set())
    } catch {
      toast.error("Error al ejecutar acción")
    }
  }

  // ── Derived data ───────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (!consultas) return []
    let result = [...consultas]
    const { search, statusFilter, areaFilter, sort } = toolbar

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(c =>
        c.subject.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (AREA_LABELS[c.area] || c.area).toLowerCase().includes(q)
      )
    }
    if (statusFilter !== "all") result = result.filter(c => c.status === statusFilter)
    if (areaFilter !== "all") result = result.filter(c => c.area === areaFilter)

    if (sort === "recent") result.sort((a, b) => b.createdAt - a.createdAt)
    else if (sort === "oldest") result.sort((a, b) => a.createdAt - b.createdAt)
    else if (sort === "urgency") {
      const order: Record<string, number> = { alta: 0, media: 1, baja: 2 }
      result.sort((a, b) => (order[a.urgency] ?? 99) - (order[b.urgency] ?? 99))
    }
    return result
  }, [consultas, toolbar])

  const toggleExpand = useCallback((id: Id<"consultas">) => {
    setExpanded(prev => prev === id ? null : id)
  }, [])

  const handleCancel = useCallback(async () => {
    if (!cancelTarget) return
    await cancelConsulta({ id: cancelTarget })
    setCancelTarget(null)
    setExpanded(null)
  }, [cancelTarget, cancelConsulta])

  const handleDownload = useCallback(async (storageId: string, fileName: string) => {
    setDownloading(storageId)
    try {
      const url = await getFileUrl({ storageId }) as string
      const a = document.createElement("a")
      a.href = url; a.download = fileName; a.click()
    } catch {} finally { setDownloading(null) }
  }, [getFileUrl])

  const handleAddNote = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    if (!expanded || !noteText.trim()) return
    setSendingNote(true)
    try {
      await addNote({ id: expanded, text: noteText.trim() })
      setNoteText("")
    } catch {} finally { setSendingNote(false) }
  }, [expanded, noteText, addNote])

  const expandedConsulta = useMemo(
    () => expanded ? filtered.find(c => c._id === expanded) : null,
    [expanded, filtered]
  )

  // ── Loading ────────────────────────────────────────────────────
  if (!consultas) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="h-12 bg-muted rounded-xl" />
        {[1,2,3,4].map(i => <div key={i} className="h-20 bg-muted rounded-xl" />)}
      </div>
    )
  }

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
            {viewAll && isStaff ? "Todas las Consultas" : "Mis Consultas"}
          </h2>
          <span className="bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full text-xs font-medium border border-border">
            {filtered.length} Total{filtered.length !== 1 ? "es" : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Admin toggle */}
          {isStaff && (
            <button
              onClick={() => { setViewAll(!viewAll); setSelected(new Set()) }}
              className={cn(
                "text-sm font-medium px-4 py-2 rounded-lg border transition-colors",
                viewAll ? "bg-brand-navy text-white border-brand-navy" : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {viewAll ? "Mis consultas" : "Ver todas"}
            </button>
          )}
          <Link
            href="/panel/consultas/nueva"
            className="bg-brand-navy text-white text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-brand-navy/90 transition-colors shadow-sm sm:w-auto justify-center"
          >
            <Plus className="h-5 w-5" />
            Nueva consulta
          </Link>
        </div>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────── */}
      <ConsultasToolbar
        state={toolbar}
        onChange={update => setToolbar(prev => ({ ...prev, ...update }))}
      />

      {/* ── Consultas List ────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        {/* Bulk action bar */}
        {isStaff && selected.size > 0 && (
          <div className="sticky top-0 z-10 flex items-center gap-3 rounded-xl border border-brand-sky/30 bg-brand-sky/5 px-5 py-3 shadow-sm">
            <span className="text-sm font-medium text-foreground">
              {selected.size} seleccionada{selected.size > 1 ? "s" : ""}
            </span>
            <select
              value={bulkStatus}
              onChange={e => setBulkStatus(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium"
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_revision">En revisión</option>
              <option value="respondida">Respondida</option>
              <option value="cerrada">Cerrada</option>
            </select>
            <button onClick={() => handleBulkAction("status")} className="rounded-lg bg-brand-navy px-4 py-1.5 text-xs font-medium text-white hover:bg-brand-navy/90">
              Cambiar estado
            </button>
            <button onClick={() => handleBulkAction("cancel")} className="rounded-lg border border-[#CF2E2E] px-4 py-1.5 text-xs font-medium text-[#CF2E2E] hover:bg-red-50">
              Cancelar
            </button>
            {isAdmin && (
              <button onClick={() => handleBulkAction("delete")} className="rounded-lg border border-red-500 px-4 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
                Eliminar
              </button>
            )}
            <button onClick={() => setSelected(new Set())} className="ml-auto text-xs text-muted-foreground hover:text-foreground">
              Deseleccionar
            </button>
          </div>
        )}
        {filtered.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center p-12 bg-card rounded-xl border border-dashed border-border text-center mt-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <SearchX className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">No se encontraron consultas</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {toolbar.search || toolbar.statusFilter !== "all" || toolbar.areaFilter !== "all"
                ? "Intenta ajustar los filtros de búsqueda o limpia el texto para ver todos tus registros."
                : "Envía tu primera consulta especializada y nuestro equipo te responderá en menos de 24 horas."
              }
            </p>
            {(toolbar.search || toolbar.statusFilter !== "all" || toolbar.areaFilter !== "all") ? (
              <button
                onClick={() => setToolbar({ search: "", statusFilter: "all", areaFilter: "all", sort: "recent" })}
                className="mt-4 text-brand-sky font-medium text-sm hover:underline"
              >
                Limpiar filtros
              </button>
            ) : (
              <Link
                href="/panel/consultas/nueva"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-navy/90"
              >
                <Plus className="h-4 w-4" />
                Nueva consulta
              </Link>
            )}
          </div>
        ) : (
          filtered.map(c => {
            const status = STATUS[c.status] || STATUS.pendiente
            const urgency = URGENCY[c.urgency] || URGENCY.media
            const isExpanded = expanded === c._id

            return (
              <div
                key={c._id}
                className={cn(
                  "bg-card rounded-xl border overflow-hidden hover:border-brand-sky/30 transition-colors shadow-sm group",
                  isExpanded ? "border-brand-sky/30" : "border-border",
                )}
              >
                {/* Row header */}
                <div
                  onClick={() => toggleExpand(c._id)}
                  className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex items-center gap-2 mb-1">
                      {/* Checkbox (staff only) */}
                      {isStaff && (
                        <input
                          type="checkbox"
                          checked={selected.has(c._id)}
                          onChange={(e) => { e.stopPropagation(); toggleSelect(c._id) }}
                          className="h-4 w-4 rounded border-border text-brand-navy focus:ring-brand-sky/20"
                        />
                      )}
                      <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs font-medium border border-border">
                        {AREA_LABELS[c.area] || c.area}
                      </span>
                      <div className={cn("flex items-center gap-1 text-xs font-medium", urgency.textColor)}>
                        <div className={cn("h-2 w-2 rounded-full", urgency.dot)} />
                        {urgency.label}
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground truncate group-hover:text-foreground transition-colors">
                      {c.subject}
                    </h3>
                  </div>

                  <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6 shrink-0 w-full md:w-auto">
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {timeAgo(c.createdAt)}
                    </div>
                    <div className={cn("px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5", status.color)}>
                      <Clock className="h-3.5 w-3.5" />
                      {status.label}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground" title={`${c.files?.length || 0} archivos`}>
                      <Paperclip className="h-[18px] w-[18px]" />
                      <span className="text-xs">{c.files?.length || 0}</span>
                    </div>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="ml-auto md:ml-0">
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </div>
                </div>

                {/* Detail panel */}
                <AnimatePresence>
                  {isExpanded && expandedConsulta && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border bg-muted/20 p-4 md:p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Left: Description + Files */}
                          <div className="flex-1 flex flex-col gap-6">
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Descripción de la consulta</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {expandedConsulta.description}
                              </p>
                            </div>

                            {expandedConsulta.files && expandedConsulta.files.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <FolderOpen className="h-[18px] w-[18px]" />
                                  Archivos Adjuntos ({expandedConsulta.files.length})
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {expandedConsulta.files.map(f => {
                                    const isImage = f.fileType.startsWith("image/")
                                    return (
                                      <div key={f.storageId} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:border-brand-sky/30 transition-colors">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                          <div className="p-2 rounded-md bg-brand-navy/10 text-brand-navy">
                                            {isImage ? <Image className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                                          </div>
                                          <div className="truncate">
                                            <p className="text-sm text-foreground truncate">{f.fileName}</p>
                                            <p className="text-xs text-muted-foreground">{formatSize(f.fileSize)}</p>
                                          </div>
                                        </div>
                                        <button
                                          onClick={(e) => { e.stopPropagation(); handleDownload(f.storageId, f.fileName) }}
                                          className="p-1.5 rounded-md text-muted-foreground hover:text-brand-sky hover:bg-muted transition-colors"
                                        >
                                          {downloading === f.storageId ? (
                                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-sky border-t-transparent" />
                                          ) : (
                                            <Download className="h-5 w-5" />
                                          )}
                                        </button>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            )}

                            {c.status === "pendiente" && (
                              <div className="mt-auto pt-4 flex gap-3">
                                <button
                                  onClick={(e) => { e.stopPropagation(); setCancelTarget(c._id) }}
                                  className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#CF2E2E] text-[#CF2E2E] hover:bg-red-50 transition-colors flex items-center gap-2"
                                >
                                  <X className="h-[18px] w-[18px]" />
                                  Cancelar consulta
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Right: Comments */}
                          <div className="w-full lg:w-[320px] xl:w-[400px] flex flex-col border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-6">
                            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                              <MessageSquare className="h-[18px] w-[18px]" />
                              Comentarios y Seguimiento
                            </h4>

                            <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[300px] mb-4 pr-2">
                              {expandedConsulta.responses && expandedConsulta.responses.length > 0 ? (
                                expandedConsulta.responses.map((r, i) => (
                                  <div key={i} className="rounded-lg border border-border bg-card p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-xs font-medium text-foreground">{r.respondedBy}</span>
                                      <span className="text-xs text-muted-foreground">{formatDate(r.createdAt)}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{r.text}</p>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center py-6 text-muted-foreground text-sm bg-muted/30 rounded-lg border border-dashed border-border">
                                  No hay comentarios aún. Nuestro equipo se pondrá en contacto pronto.
                                </div>
                              )}
                            </div>

                            <div className="mt-auto">
                              <form onSubmit={handleAddNote} className="flex gap-2">
                                <input
                                  value={noteText}
                                  onChange={e => setNoteText(e.target.value)}
                                  placeholder="Añadir un comentario..."
                                  className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-sky/20 focus:border-brand-sky outline-none"
                                />
                                <button
                                  type="submit"
                                  disabled={sendingNote || !noteText.trim()}
                                  className="p-2 rounded-lg bg-brand-navy text-white hover:bg-brand-navy/90 transition-colors disabled:opacity-50"
                                >
                                  <Send className="h-5 w-5" />
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })
        )}
      </div>

      {/* ── Cancel Modal ────────────────────────────────────────── */}
      <CancelModal
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancel}
      />
    </div>
  )
}
