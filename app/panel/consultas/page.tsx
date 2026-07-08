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

// ── Types ────────────────────────────────────────────────────────────────────

type Consulta = {
  _id: string
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

// ── Constants ────────────────────────────────────────────────────────────────

const STATUS: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pendiente:    { label: "Pendiente",    color: "bg-[#FEF3C7] text-[#92400E] border-[#92400E]/20", icon: Clock },
  en_revision:  { label: "En revisión",  color: "bg-[#DBEAFE] text-[#1E40AF] border-[#1E40AF]/20", icon: Eye },
  respondida:   { label: "Respondida",   color: "bg-[#DCFCE7] text-[#166534] border-[#166534]/20", icon: CheckCircle },
  cerrada:      { label: "Cerrada",      color: "bg-[#F3F4F6] text-[#4B5563] border-[#4B5563]/20", icon: X },
  cancelada:    { label: "Cancelada",    color: "bg-[#FEE2E2] text-[#B91C1C] border-[#B91C1C]/20", icon: X },
}

const AREA_LABELS: Record<string, string> = {
  laboral: "Derecho Laboral", familia: "Derecho de Familia", civil: "Derecho Civil",
  insolvencia: "Insolvencia", sumarios: "Sumarios",
}

const URGENCY_COLORS: Record<string, { dot: string; label: string; textColor: string }> = {
  alta:  { dot: "bg-[#CF2E2E]", label: "Alta",  textColor: "text-[#B91C1C]" },
  media: { dot: "bg-amber-500", label: "Media", textColor: "text-[#92400E]" },
  baja:  { dot: "bg-[#64748B]", label: "Baja",  textColor: "text-[#64748B]" },
}

const STATUS_FILTERS = [
  { value: "all", label: "Todos" },
  { value: "pendiente", label: "Pendientes" },
  { value: "en_revision", label: "En revisión" },
  { value: "respondida", label: "Respondidas" },
  { value: "cerrada", label: "Cerradas" },
  { value: "cancelada", label: "Canceladas" },
]

const SORT_OPTIONS = [
  { value: "recent", label: "Más recientes" },
  { value: "oldest", label: "Más antiguos" },
  { value: "urgency", label: "Urgencia" },
]

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `Hace ${mins} minuto${mins !== 1 ? "s" : ""}`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `Hace ${hours} hora${hours !== 1 ? "s" : ""}`
  return new Date(ts).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" })
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" })
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ConsultasPage() {
  const consultas = useQuery(api.consultas.listMine) as Consulta[] | undefined
  const cancelConsulta = useMutation(api.consultas.cancel)
  const addNote = useMutation(api.consultas.addNote)
  const getFileUrl = useMutation(api.files.getFileUrl)

  // ── State ──────────────────────────────────────────────────────
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [areaFilter, setAreaFilter] = useState("all")
  const [sort, setSort] = useState("recent")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [cancelTarget, setCancelTarget] = useState<string | null>(null)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [noteText, setNoteText] = useState("")
  const [sendingNote, setSendingNote] = useState(false)

  // ── Derived data ───────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (!consultas) return []
    let result = [...consultas]

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(c =>
        c.subject.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (AREA_LABELS[c.area] || c.area).toLowerCase().includes(q)
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(c => c.status === statusFilter)
    }

    // Area filter
    if (areaFilter !== "all") {
      result = result.filter(c => c.area === areaFilter)
    }

    // Sort
    if (sort === "recent") result.sort((a, b) => b.createdAt - a.createdAt)
    else if (sort === "oldest") result.sort((a, b) => a.createdAt - b.createdAt)
    else if (sort === "urgency") {
      const order: Record<string, number> = { alta: 0, media: 1, baja: 2 }
      result.sort((a, b) => (order[a.urgency] ?? 99) - (order[b.urgency] ?? 99))
    }

    return result
  }, [consultas, search, statusFilter, areaFilter, sort])

  const toggleExpand = useCallback((id: string) => {
    setExpanded(prev => prev === id ? null : id)
  }, [])

  const handleCancel = useCallback(async () => {
    if (!cancelTarget) return
    await cancelConsulta({ id: cancelTarget as any })
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
      await addNote({ id: expanded as any, text: noteText.trim() })
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
      <div className="flex-1 md:ml-[240px] pt-16 md:pt-0 w-full max-w-[1440px] mx-auto min-h-screen">
        <div className="p-4 md:p-8 w-full max-w-[896px] xl:max-w-7xl mx-auto space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-12 bg-muted rounded-xl" />
            {[1,2,3,4].map(i => <div key={i} className="h-20 bg-muted rounded-xl" />)}
          </div>
        </div>
      </div>
    )
  }

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="flex-1 md:ml-[240px] pt-16 md:pt-0 w-full max-w-[1440px] mx-auto min-h-screen flex flex-col">
      <div className="p-4 md:p-8 flex-1 w-full max-w-[896px] xl:max-w-7xl mx-auto flex flex-col gap-6">

        {/* ── Page Header ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
              Mis Consultas
            </h2>
            <span className="bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full text-xs font-medium border border-border">
              {filtered.length} Total{filtered.length !== 1 ? "es" : ""}
            </span>
          </div>
          <Link
            href="/panel/consultas/nueva"
            className="bg-brand-navy text-white text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-brand-navy/90 transition-colors shadow-sm w-full sm:w-auto justify-center"
          >
            <Plus className="h-5 w-5" />
            Nueva consulta
          </Link>
        </div>

        {/* ── Filters Section ───────────────────────────────────── */}
        <div className="flex flex-col gap-4 bg-card p-4 rounded-xl border border-border">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por asunto, descripción o área..."
              className="w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-brand-sky/20 focus:border-brand-sky transition-all outline-none text-sm text-foreground placeholder:text-muted-foreground"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Chips & Dropdowns */}
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            {/* Status filter chips */}
            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map(f => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-medium border transition-colors",
                    statusFilter === f.value
                      ? "bg-brand-navy text-white border-brand-navy"
                      : "bg-background text-muted-foreground border-border hover:bg-muted"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Area + Sort dropdowns */}
            <div className="flex gap-2 w-full lg:w-auto">
              <select
                value={areaFilter}
                onChange={e => setAreaFilter(e.target.value)}
                className="flex-1 lg:flex-none bg-background border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:ring-2 focus:ring-brand-sky/20 focus:border-brand-sky outline-none"
              >
                <option value="all">Todas las áreas</option>
                {Object.entries(AREA_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="flex-1 lg:flex-none bg-background border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:ring-2 focus:ring-brand-sky/20 focus:border-brand-sky outline-none"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── Consultas List ────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center p-12 bg-card rounded-xl border border-dashed border-border text-center mt-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                <SearchX className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No se encontraron consultas</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                {search || statusFilter !== "all" || areaFilter !== "all"
                  ? "Intenta ajustar los filtros de búsqueda o limpia el texto para ver todos tus registros."
                  : "Envía tu primera consulta especializada y nuestro equipo te responderá en menos de 24 horas."
                }
              </p>
              {(search || statusFilter !== "all" || areaFilter !== "all") ? (
                <button
                  onClick={() => { setSearch(""); setStatusFilter("all"); setAreaFilter("all") }}
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
              const urgency = URGENCY_COLORS[c.urgency] || URGENCY_COLORS.media
              const isExpanded = expanded === c._id
              const StatusIcon = status.icon

              return (
                <div
                  key={c._id}
                  className="bg-card rounded-xl border border-border overflow-hidden hover:border-brand-sky/30 transition-colors shadow-sm group"
                >
                  {/* Row header — click to expand */}
                  <div
                    onClick={() => toggleExpand(c._id)}
                    className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <div className="flex items-center gap-2 mb-1">
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
                      <div className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5",
                        status.color
                      )}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {status.label}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground" title={`${c.files?.length || 0} archivos adjuntos`}>
                        <Paperclip className="h-[18px] w-[18px]" />
                        <span className="text-xs">{c.files?.length || 0}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-auto md:ml-0"
                      >
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
                              {/* Description */}
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Descripción de la consulta</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                  {expandedConsulta.description}
                                </p>
                              </div>

                              {/* Attached files */}
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
                                        <div
                                          key={f.storageId}
                                          className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:border-brand-sky/30 transition-colors"
                                        >
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

                              {/* Cancel button */}
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
      </div>

      {/* ── Cancel confirmation modal ─────────────────────────────── */}
      <AnimatePresence>
        {cancelTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={() => setCancelTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-card rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEE2E2] text-[#B91C1C] mb-4">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground mb-2">
                  ¿Cancelar consulta?
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Estás a punto de cancelar esta solicitud. Esta acción no se puede deshacer.
                </p>
                <div className="flex flex-col sm:flex-row w-full gap-3">
                  <button
                    onClick={() => setCancelTarget(null)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
                  >
                    Volver
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-[#CF2E2E] text-white font-semibold text-sm hover:bg-[#CF2E2E]/90 transition-colors shadow-sm"
                  >
                    Sí, cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
