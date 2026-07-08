"use client"

export function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  min = 0,
  helper,
  prefix,
}: {
  label: string
  value: number
  onChange: (val: number) => void
  placeholder?: string
  min?: number
  helper?: string
  prefix?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-primary">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const v = Number(e.target.value)
            onChange(isNaN(v) ? min : Math.max(min, v))
          }}
          placeholder={placeholder}
          className={`w-full h-12 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent text-sm transition-shadow ${
            prefix ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
      {helper && <p className="text-[11px] text-muted-foreground">{helper}</p>}
    </div>
  )
}
