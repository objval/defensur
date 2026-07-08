import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { MessageSquare, FileText, Clock, ArrowRight, Plus } from "lucide-react"

export default async function PanelDashboard() {
  const { userId } = await auth()
  if (!userId) return null

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">Panel</h1>
        <p className="text-muted-foreground mt-1">Bienvenido a tu panel de Defensur</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/panel/consultas/nueva"
          className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 hover:border-brand-sky/30 hover:shadow-sm transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
            <Plus className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Nueva consulta</h3>
            <p className="text-sm text-muted-foreground mt-1">Envía tu caso para revisión especializada</p>
          </div>
        </Link>

        <Link
          href="/panel/consultas"
          className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 hover:border-brand-sky/30 hover:shadow-sm transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Mis consultas</h3>
            <p className="text-sm text-muted-foreground mt-1">Revisa el estado de tus consultas</p>
          </div>
        </Link>

        <Link
          href="/panel/documentos"
          className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 hover:border-brand-sky/30 hover:shadow-sm transition-all opacity-50 pointer-events-none"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Documentos</h3>
            <p className="text-sm text-muted-foreground mt-1">Próximamente</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
