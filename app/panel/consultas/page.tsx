"use client"

import { useState, useCallback, type FormEvent } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Clock, ArrowRight, FileText, Image, ChevronDown, Trash2, MessageSquare, Send,
  Download, ExternalLink, AlertTriangle, X, Check
} from "lucide-react"
import { cn } from "@/lib/utils"

// ── Types ────────────────────────────────────────────────────────────────────

type Consulta = {
  _id: string
  _creationTime: number
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

type ExpandedState = Record<string, "preview" | "full">

// ── Constants ────────────────────────────────────────────────────────────────

const STATUS: Record<string, { label: string; color: string; dot: string }> = {
  pendiente:    { label: "Pendiente",    color: "bg-amber-100 text-amber-800 border-amber-200", dot: "bg-amber-500" },
  en_revision:  { label: "En revisión",  color: "bg-blue-100 text-blue-800 border-blue-200",   dot: "bg-blue-500" },
  respondida:   { label: "Respondida",   color: "bg-green-100 text-green-800 border-green-200", dot: "bg-green-500" },
  cerrada:      { label: "Cerrada",      color: "bg-gray-100 text-gray-600 border-gray-200",   dot: "bg-gray-400" },
  cancelada:    { label: "Cancelada",    color: "bg-red-100 text-red-700 border-red-200",       dot: "bg-red-400" },
}

const AREA_LABELS: Record<string, string> = {
  laboral: "Laboral", familia: "Familia", civil: "Civil",
  insolvencia: "Insolvencia", sumarios: "Sumarios",
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

  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [cancelTarget, setCancelTarget] = useState<string | null>(null)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [noteText, setNoteText] = useState<Record<string, string>>({})
  const [sendingNote, setSendingNote] = useState<string | null>(null)

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const current = prev[id]
      if (!current) return { ...prev, [id]: "preview" }
      if (current === "preview") return { ...prev, [id]: "full" }
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const handleCancel = useCallback(async () => {
    if (!cancelTarget) return
    await cancelConsulta({ id: cancelTarget as any })
    setCancelTarget(null)
  }, [cancelTarget, cancelConsulta])

  const handleDownload = useCallback(async (storageId: string, fileName: string) => {
    setDownloading(storageId)
    try {
      const url = await getFileUrl({ storageId }) as string
      const a = document.createElement("a")
      a.href = url; a.download = fileName; a.click()
    } catch {} finally { setDownloading(null) }
  }, [getFileUrl])

  const handleAddNote = useCallback(async (e: FormEvent, consultaId: string) => {
    e.preventDefault()
    const text = noteText[consultaId]?.trim()
    if (!text) return
    setSendingNote(consultaId)
    try {
      await addNote({ id: consultaId as any, text })
      setNoteText((prev) => { const n = { ...prev }; delete n[consultaId]; return n })
    } catch {} finally { setSendingNote(null) }
  }, [noteText, addNote])

  // ── Loading ──────────────────────────────────────────────────────────────

  if (!consultas) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-2 border-brand-navy border-t-transparent rounded-full" />
      </div>
    )
  }

  // ── Empty ────────────────────────────────────────────────────────────────

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

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">Mis Consultas</h1>
          <p className="text-sm text-muted-foreground mt-1">{consultas.length} consulta{consultas.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/panel/consultas/nueva"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy/90"
        >
          Nueva consulta
        </Link>
      </div>

      {/* Consulta cards */}
      <div className="space-y-3">
        {consultas.map((c) => {
          const isExpanded = !!expanded[c._id]
          const isFull = expanded[c._id] === "full"
          const status = STATUS[c.status] || STATUS.pendiente
          const isCancellable = c.status === "pendiente"

          return (
            <div
              key={c._id}
              className={cn(
                "rounded-2xl border bg-card transition-all duration-200",
                isExpanded ? "border-brand-sky/30 shadow-sm" : "border-border hover:border-muted-foreground/20"
              )}
            >
              {/* Card header — click to expand */}
              <button
                onClick={() => toggle(c._id)}
                className="w-full flex items-center gap-4 p-5 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-foreground truncate">{c.subject}</span>
                    <span className={cn("shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium", status.color)}>
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(c.createdAt)}
                    </span>
                    <span>{AREA_LABELS[c.area] || c.area}</span>
                    {c.files && c.files.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Paperclip className="h-3 w-3" />
                        {c.files.length}
                      </span>
                    )}
                    {c.responses && c.responses.length > 0 && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {c.responses.length}
                      </span>
                    )}
                  </div>
                </div>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-5 border-t border-border pt-5">
                      {/* Description */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Descripción</h4>
                        <p className={cn("text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap", !isFull && "line-clamp-3")}>
                          {c.description}
                        </p>
                        {c.description.length > 200 && (
                          <button
                            onClick={(e) => { e.stopPropagation(); toggle(c._id) }}
                            className="text-xs text-brand-sky hover:underline"
                          >
                            {isFull ? "Mostrar menos" : "Leer más"}
                          </button>
                        )}
                      </div>

                      {/* Attached files */}
                      {c.files && c.files.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Archivos adjuntos ({c.files.length})
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {c.files.map((f) => {
                              const isImage = f.fileType.startsWith("image/")
                              return (
                                <div
                                  key={f.storageId}
                                  className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5"
                                >
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-brand-navy/5">
                                    {isImage ? <Image className="h-4 w-4 text-brand-sky" /> : <FileText className="h-4 w-4 text-brand-navy" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="truncate text-xs font-medium text-foreground">{f.fileName}</p>
                                    <p className="text-xs text-muted-foreground">{formatSize(f.fileSize)}</p>
                                  </div>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleDownload(f.storageId, f.fileName) }}
                                    className="shrink-0 rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-brand-sky transition-colors"
                                    title="Descargar"
                                  >
                                    {downloading === f.storageId ? (
                                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-sky border-t-transparent" />
                                    ) : (
                                      <Download className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {/* Responses / comments */}
                      {c.responses && c.responses.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Comentarios ({c.responses.length})
                          </h4>
                          <div className="space-y-2">
                            {c.responses.map((r, i) => (
                              <div key={i} className="rounded-lg border border-border bg-background p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-medium text-foreground">{r.respondedBy}</span>
                                  <span className="text-xs text-muted-foreground">{formatDate(r.createdAt)}</span>
                                </div>
                                <p className="text-sm text-foreground/80 whitespace-pre-wrap">{r.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Add note */}
                      <form onSubmit={(e) => handleAddNote(e, c._id)} className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            value={noteText[c._id] || ""}
                            onChange={(e) => setNoteText((prev) => ({ ...prev, [c._id]: e.target.value }))}
                            placeholder="Añadir un comentario..."
                            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/20"
                          />
                          <button
                            type="submit"
                            disabled={sendingNote === c._id || !noteText[c._id]?.trim()}
                            className="inline-flex items-center gap-1 rounded-lg bg-brand-navy px-3 py-2 text-xs font-medium text-white hover:bg-brand-navy/90 disabled:opacity-50"
                          >
                            {sendingNote === c._id ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                              <Send className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </form>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-1">
                        {isCancellable && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setCancelTarget(c._id) }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                            Cancelar consulta
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Cancel confirmation modal */}
      <AnimatePresence>
        {cancelTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setCancelTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-xl border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Cancelar consulta</h3>
                  <p className="text-sm text-muted-foreground">Esta acción no se puede deshacer</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setCancelTarget(null)}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  Volver
                </button>
                <button
                  onClick={handleCancel}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Sí, cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Paperclip icon inline — avoid extra import
function Paperclip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  )
}
