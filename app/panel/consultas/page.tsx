"use client"

import { useState, useCallback, useMemo, type FormEvent } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"
import {
  Search,
  Plus,
  User,
  Phone,
  CalendarIcon,
  MapPin,
  Monitor,
  Flag,
  MessageSquare,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { STATUS, timeAgo, formatDate } from "@/lib/panel-utils"
import { toast } from "sonner"
import type { Doc, Id } from "@/convex/_generated/dataModel"

type ConsultaStatus = "pendiente" | "respondida" | "cancelada"

function statusColor(s: string) {
  const m: Record<string, string> = {
    pendiente: "bg-amber-50 text-amber-800 border-amber-200",
    respondida: "bg-green-50 text-green-800 border-green-200",
    cancelada: "bg-red-50 text-red-700 border-red-200",
  }
  return m[s] ?? m.pendiente!
}

export default function ConsultasPage() {
  const myRole = useQuery(api.admin.refreshMyRole)
  const isStaff = myRole?.role === "admin" || myRole?.role === "staff"

  const ownConsultas = useQuery(api.consultas.listMine) as Doc<"consultas">[] | null | undefined
  const allConsultas = useQuery(api.admin.listAll, isStaff ? {} : "skip") as Doc<"consultas">[] | null | undefined
  const updateStatus = useMutation(api.admin.updateStatus)
  const addNote = useMutation(api.consultas.addNote)
  const addResponse = useMutation(api.admin.addResponse)

  const [viewAll, setViewAll] = useState(false)
  const consultas = viewAll && isStaff ? (allConsultas ?? undefined) : ownConsultas
  const [selectedId, setSelectedId] = useState<Id<"consultas"> | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [noteText, setNoteText] = useState("")
  const [sendingNote, setSendingNote] = useState(false)

  const filtered = useMemo(() => {
    if (!consultas) return []
    let r = [...consultas]
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter(c => c.subject.toLowerCase().includes(q) || c.userName.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
    }
    if (statusFilter !== "all") r = r.filter(c => c.status === statusFilter)
    r.sort((a, b) => b.createdAt - a.createdAt)
    return r
  }, [consultas, search, statusFilter])

  const selected = useMemo(() => selectedId ? filtered.find(c => c._id === selectedId) ?? null : null, [selectedId, filtered])

  const handleStatusChange = useCallback(async (id: Id<"consultas">, s: ConsultaStatus) => {
    try { await updateStatus({ id, status: s }); toast.success(`Estado: ${STATUS[s]!.label}`) }
    catch { toast.error("Error al cambiar estado") }
  }, [updateStatus])

  const handleAddNote = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    if (!selectedId || !noteText.trim()) return
    setSendingNote(true)
    try {
      await addNote({ id: selectedId, text: noteText.trim() })
      setNoteText("")
    } catch { toast.error("Error al guardar") }
    finally { setSendingNote(false) }
  }, [selectedId, noteText, addNote])

  const handleStaffResponse = useCallback(async () => {
    if (!selectedId || !noteText.trim()) return
    setSendingNote(true)
    try {
      await addResponse({ id: selectedId, response: noteText.trim() })
      await updateStatus({ id: selectedId, status: "respondida" })
      setNoteText("")
      toast.success("Respondida")
    } catch { toast.error("Error al responder") }
    finally { setSendingNote(false) }
  }, [selectedId, noteText, addResponse, updateStatus])

  if (!consultas) return <div className="animate-pulse space-y-3 p-6">{Array.from({length:10}).map((_,i)=><div key={i} className="h-16 rounded-lg bg-muted"/>)}</div>

  return (
    <div className="flex min-h-0 flex-1 gap-0 overflow-hidden">
      {/* List — 50% */}
      <div className="flex flex-col min-w-0 border-r border-border bg-card overflow-hidden w-1/2">
        <div className="shrink-0 border-b border-border bg-muted/30 px-5 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground">
                {viewAll && isStaff ? "Consultas" : "Mis Consultas"}
              </h2>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">{filtered.length}</span>
            </div>
            {isStaff && (
              <button onClick={() => { setViewAll(!viewAll); setSelectedId(null) }}
                className={cn("rounded-lg border px-4 py-2 text-sm font-semibold transition-colors", viewAll ? "border-brand-navy bg-brand-navy text-white" : "border-border text-muted-foreground hover:bg-muted")}>
                {viewAll ? "Solo míos" : "Ver todos"}
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar cliente o asunto..."
                className="w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/30"/>
            </div>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:border-brand-sky">
              <option value="all">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="respondida">Respondida</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center px-6">
              <FileText className="h-12 w-12 text-muted-foreground/30 mb-4"/>
              <p className="text-sm text-muted-foreground">Sin consultas{search||statusFilter!=="all"?" con estos filtros":""}</p>
              {!search && statusFilter==="all" && (
                <Link href="/panel/consultas/nueva" className="mt-4 flex items-center gap-2 rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy/90">
                  <Plus className="h-4 w-4"/>Nueva consulta
                </Link>
              )}
            </div>
          ) : (
            filtered.map(c => {
              const isActive = selectedId === c._id
              const st = STATUS[c.status] ?? STATUS.pendiente!
              const urgent = c.urgency === "alta"

              return (
                <div key={c._id}
                  onClick={() => setSelectedId(isActive ? null : c._id)}
                  className={cn(
                    "group border-b border-border cursor-pointer p-4 flex gap-4 relative transition-colors",
                    isActive ? "bg-brand-navy/[0.04] hover:bg-brand-navy/[0.05]" : "hover:bg-muted/50"
                  )}>
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-navy"/>}
                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono text-xs text-muted-foreground shrink-0">#{c._id.slice(-6).toUpperCase()}</span>
                        <span className="font-semibold text-sm text-foreground truncate">{c.subject}</span>
                      </div>
                      <span className={cn("shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border", statusColor(c.status))}>{st.label}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5"/><span className="truncate max-w-[140px]">{c.userName || "Anónimo"}</span></span>
                      <span className="flex items-center gap-1.5"><CalendarIcon className="h-3.5 w-3.5"/>{timeAgo(c.createdAt)}</span>
                      {c.modality && (
                        <span className="flex items-center gap-1.5">{c.modality==="presencial"?<MapPin className="h-3.5 w-3.5"/>:<Monitor className="h-3.5 w-3.5"/>}{c.modality==="presencial"?"Presencial":"Online"}</span>
                      )}
                      {urgent && (
                        <span className="flex items-center gap-1 text-brand-red ml-auto font-medium"><Flag className="h-3.5 w-3.5"/>Urgente</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Detail — 50%, no outer scroll, DetailView owns all scrolling */}
      <div className="w-1/2 flex flex-col min-w-0 min-h-0 bg-background overflow-hidden">
        {selected ? (
          <DetailView
            consulta={selected}
            isStaff={isStaff}
            noteText={noteText}
            onNoteChange={setNoteText}
            onSendNote={handleAddNote}
            onStaffResponse={handleStaffResponse}
            sendingNote={sendingNote}
            onStatusChange={(s) => handleStatusChange(selected._id, s)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-3 px-8">
              <MessageSquare className="h-16 w-16 text-muted-foreground/20 mx-auto"/>
              <p className="text-base text-muted-foreground">Selecciona una consulta para ver los detalles</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Detail View ──────────────────────────────────────────────────────────────

function DetailView({ consulta: c, isStaff, noteText, onNoteChange, onSendNote, onStaffResponse, sendingNote, onStatusChange }: {
  consulta: Doc<"consultas">
  isStaff: boolean
  noteText: string
  onNoteChange: (v: string) => void
  onSendNote: (e: FormEvent) => void
  onStaffResponse: () => void
  sendingNote: boolean
  onStatusChange: (s: ConsultaStatus) => void
}) {
  const st = STATUS[c.status] ?? STATUS.pendiente!

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* User profile header */}
        <div className="px-7 pt-8 pb-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white font-bold text-xl">
              {c.userName?.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase() || "??"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground leading-tight">{c.userName || "Anónimo"}</h2>
              <p className="text-sm text-muted-foreground">{c.userEmail || "—"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-5">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Teléfono</p>
              <p className="text-sm font-medium text-foreground flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-muted-foreground"/>{c.phone || "—"}</p>
            </div>
            {(c as Doc<"consultas"> & { rut?: string }).rut && (
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">RUT</p>
                <p className="text-sm font-medium text-foreground">{(c as Doc<"consultas"> & { rut?: string }).rut}</p>
              </div>
            )}
            {c.modality && (
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Modalidad</p>
                <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  {c.modality==="presencial"?<MapPin className="h-3.5 w-3.5 text-muted-foreground"/>:<Monitor className="h-3.5 w-3.5 text-muted-foreground"/>}
                  {c.modality==="presencial"?"Presencial":"Videollamada"}
                </p>
              </div>
            )}
            {c.scheduledDate && c.scheduledTime && (
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Agendada</p>
                <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground"/>{formatDate(c.scheduledDate)} — {c.scheduledTime} hrs.
                </p>
              </div>
            )}
            {c.urgency === "alta" && (
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Urgencia</p>
                <p className="text-sm font-semibold text-brand-red flex items-center gap-1.5"><Flag className="h-3.5 w-3.5"/>Alta</p>
              </div>
            )}
          </div>

          {/* Status row */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Estado:</span>
            <span className={cn("text-sm font-medium px-3 py-1 rounded-full border", statusColor(c.status))}>{st.label}</span>
            {isStaff && c.status !== "cancelada" && (
              <>
                {c.status === "pendiente" && (
                  <button onClick={() => onStatusChange("respondida")}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border bg-green-50 text-green-800 border-green-200 transition-colors hover:opacity-85">
                    Respondida
                  </button>
                )}
                <button onClick={() => onStatusChange("cancelada")}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg border bg-red-50 text-red-700 border-red-200 transition-colors hover:opacity-85">
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Subject + Description */}
        <div className="px-7 py-6">
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground mb-4 leading-snug">{c.subject}</h3>
          <p className="text-base leading-relaxed whitespace-pre-wrap text-foreground/85">{c.description}</p>
        </div>

        {/* Comments */}
        {c.responses && c.responses.length > 0 && (
          <>
            <div className="border-t border-border" />
            <div className="px-7 py-6">
              <h4 className="text-base font-semibold text-foreground mb-5 flex items-center gap-2"><MessageSquare className="h-4 w-4"/>Comentarios</h4>
              <div className="space-y-0">
                {c.responses.map((r,i) => (
                  <div key={i} className="relative border-l-2 border-border ml-3 pl-5 pb-5">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-background border-2 border-border"/>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-foreground">{r.respondedBy}</span>
                      <span className="text-sm text-muted-foreground">{formatDate(r.createdAt)}</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Comment input — always visible at bottom */}
      <div className="shrink-0 border-t border-border bg-card px-6 py-3">
        <div className="flex gap-2 items-end">
          <textarea value={noteText} onChange={e=>onNoteChange(e.target.value)} placeholder="Añadir nota..." rows={2}
            className="flex-1 bg-muted/30 border border-border rounded-lg py-2 px-3 text-sm resize-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/20"/>
          <div className="flex gap-1.5 shrink-0">
            {isStaff && (
              <button onClick={onStaffResponse} disabled={sendingNote||!noteText.trim()}
                className="px-3 py-2 bg-brand-navy text-white rounded-md text-sm font-semibold hover:bg-brand-navy/90 disabled:opacity-50 transition-colors">Responder</button>
            )}
            <button onClick={onSendNote} disabled={sendingNote||!noteText.trim()}
              className="px-3 py-2 border border-border bg-card rounded-md text-sm font-semibold text-foreground hover:bg-muted disabled:opacity-50 transition-colors">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
