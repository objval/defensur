import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { MessageSquare, FileText, Clock } from "lucide-react"

export default async function PanelDashboard() {
  const { userId } = await auth()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-primary">
          Panel de Cliente
        </h1>
        <p className="mt-2 text-muted-foreground">
          Gestiona tus consultas y documentos legales.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/panel/consultas/nueva"
          className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-all hover:border-brand-navy/20 hover:shadow-md"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy">
            <MessageSquare className="size-5" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-primary">
              Nueva Consulta
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Envía una consulta especializada a nuestro equipo.
            </p>
          </div>
        </Link>

        <Link
          href="/panel/consultas"
          className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-all hover:border-brand-navy/20 hover:shadow-md"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-brand-sky/10 text-brand-sky">
            <Clock className="size-5" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-primary">
              Mis Consultas
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Revisa el estado de tus consultas enviadas.
            </p>
          </div>
        </Link>

        <Link
          href="/panel/documentos"
          className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-all hover:border-brand-navy/20 hover:shadow-md"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy">
            <FileText className="size-5" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-primary">
              Documentos
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Documentos y contratos relevantes a tu caso.
            </p>
          </div>
        </Link>
      </div>

      {/* Recent activity placeholder */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-primary mb-4">
          Actividad reciente
        </h2>
        <p className="text-sm text-muted-foreground">
          No hay actividad reciente. Crea tu primera consulta para comenzar.
        </p>
      </div>
    </div>
  )
}
