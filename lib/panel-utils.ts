// lib/panel-utils.ts — Shared constants and helpers for panel pages.
// Single source of truth for status colors, area labels, and date formatting.

// ── Status ──────────────────────────────────────────────────────────────────

export const STATUS: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  pendiente: {
    label: "Pendiente",
    color: "bg-[#FEF3C7] text-[#92400E] border-[#92400E]/20",
    icon: "Clock",
  },
  en_revision: {
    label: "En revisión",
    color: "bg-[#DBEAFE] text-[#1E40AF] border-[#1E40AF]/20",
    icon: "Eye",
  },
  respondida: {
    label: "Respondida",
    color: "bg-[#DCFCE7] text-[#166534] border-[#166534]/20",
    icon: "CheckCircle",
  },
  cerrada: {
    label: "Cerrada",
    color: "bg-[#F3F4F6] text-[#4B5563] border-[#4B5563]/20",
    icon: "X",
  },
  cancelada: {
    label: "Cancelada",
    color: "bg-[#FEE2E2] text-[#B91C1C] border-[#B91C1C]/20",
    icon: "X",
  },
}

// ── Urgency ─────────────────────────────────────────────────────────────────

export const URGENCY: Record<
  string,
  { dot: string; label: string; textColor: string }
> = {
  alta: { dot: "bg-[#CF2E2E]", label: "Alta", textColor: "text-[#B91C1C]" },
  media: { dot: "bg-amber-500", label: "Media", textColor: "text-[#92400E]" },
  baja: { dot: "bg-[#64748B]", label: "Baja", textColor: "text-[#64748B]" },
}

// ── Area labels ─────────────────────────────────────────────────────────────

export const AREA_LABELS: Record<string, string> = {
  laboral: "Derecho Laboral",
  familia: "Derecho de Familia",
  civil: "Derecho Civil",
  insolvencia: "Insolvencia",
  sumarios: "Sumarios",
}

// ── Sort options ────────────────────────────────────────────────────────────

export const SORT_OPTIONS = [
  { value: "recent", label: "Más recientes" },
  { value: "oldest", label: "Más antiguos" },
  { value: "urgency", label: "Urgencia" },
]

// ── Modality labels ──────────────────────────────────────────────────────────

export const MODALITY_LABELS: Record<string, { label: string; icon: string }> = {
  presencial: { label: "Presencial", icon: "MapPin" },
  online: { label: "Online (15-25 min)", icon: "Video" },
}

export const STATUS_FILTERS = [
  { value: "all", label: "Todos" },
  { value: "pendiente", label: "Pendientes" },
  { value: "en_revision", label: "En revisión" },
  { value: "respondida", label: "Respondidas" },
  { value: "cerrada", label: "Cerradas" },
  { value: "cancelada", label: "Canceladas" },
]

// ── Helpers ─────────────────────────────────────────────────────────────────

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `Hace ${mins} minuto${mins !== 1 ? "s" : ""}`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `Hace ${hours} hora${hours !== 1 ? "s" : ""}`
  return new Date(ts).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
