import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

export function InfoTip({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-2xl bg-muted/40 border border-border/30">
      <div className="shrink-0 mt-0.5">
        <Icon className="size-4 text-brand-sky" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-primary">{title}</p>
        <div className="text-xs text-muted-foreground leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
