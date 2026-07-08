"use client"

export function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit,
  presets,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (val: number) => void
  unit?: string
  presets?: { label: string; value: number }[]
}) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-primary">{label}</label>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-brand-navy tabular-nums">
            {value.toLocaleString("es-CL")}
            {unit && <span className="text-sm ml-1">{unit}</span>}
          </span>
        </div>
      </div>
      <div className="relative h-2 bg-muted rounded-full">
        <div
          className="absolute h-2 bg-brand-sky rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer z-10"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-brand-sky rounded-full shadow-md pointer-events-none"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
      {presets && (
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onChange(p.value)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                value === p.value
                  ? "bg-brand-navy text-white border-brand-navy"
                  : "bg-muted/50 text-muted-foreground border-border/60 hover:border-brand-navy/30 hover:text-brand-navy"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
