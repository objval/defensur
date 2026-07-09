"use client"

import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { AREA_LABELS, STATUS_FILTERS, SORT_OPTIONS } from "@/lib/panel-utils"

export type ToolbarState = {
  search: string
  statusFilter: string
  areaFilter: string
  sort: string
}

type Props = {
  state: ToolbarState
  onChange: (update: Partial<ToolbarState>) => void
}

export function ConsultasToolbar({ state, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4 bg-card p-4 rounded-xl border border-border">
      {/* Search */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          value={state.search}
          onChange={e => onChange({ search: e.target.value })}
          placeholder="Buscar por asunto, descripción o área..."
          className="w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-brand-sky/20 focus:border-brand-sky transition-all outline-none text-sm text-foreground placeholder:text-muted-foreground"
        />
        {state.search && (
          <button
            onClick={() => onChange({ search: "" })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Chips & Dropdowns */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => onChange({ statusFilter: f.value })}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium border transition-colors",
                state.statusFilter === f.value
                  ? "bg-brand-navy text-white border-brand-navy"
                  : "bg-background text-muted-foreground border-border hover:bg-muted"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 w-full lg:w-auto">
          <select
            value={state.areaFilter}
            onChange={e => onChange({ areaFilter: e.target.value })}
            className="flex-1 lg:flex-none bg-background border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:ring-2 focus:ring-brand-sky/20 focus:border-brand-sky outline-none"
          >
            <option value="all">Todas las áreas</option>
            {Object.entries(AREA_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
          <select
            value={state.sort}
            onChange={e => onChange({ sort: e.target.value })}
            className="flex-1 lg:flex-none bg-background border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:ring-2 focus:ring-brand-sky/20 focus:border-brand-sky outline-none"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
