"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Shield, Search, Loader2, Ban, Unlock, UserCog } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrador",
  staff: "Abogado",
  client: "Cliente",
}

export default function UsersPage() {
  const users = useQuery(api.admin.listUsers)
  const myRole = useQuery(api.admin.refreshMyRole)
  const toggleBan = useMutation(api.admin.toggleBan)
  const updateRole = useMutation(api.admin.updateUserRole)

  // Not admin — show access denied
  if (myRole !== undefined && myRole?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Shield className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Acceso Restringido</h1>
        <p className="text-muted-foreground max-w-md">
          Solo los administradores pueden ver esta página.
        </p>
      </div>
    )
  }

  if (users === undefined || myRole === undefined) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded" />
        {[1,2,3].map(i => <div key={i} className="h-16 bg-muted rounded-xl" />)}
      </div>
    )
  }

  if (users === null) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Shield className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Acceso Restringido</h1>
        <p className="text-muted-foreground">No tienes permisos de administrador.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
            Usuarios
          </h1>
          <span className="bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full text-xs font-medium border border-border">
            {users.length} total{users.length !== 1 ? "es" : ""}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Usuario</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rol</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Estado</th>
                <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u: any) => (
                <tr key={u._id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy/10 text-brand-navy text-sm font-semibold">
                        {u.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <span className="text-sm font-medium text-foreground">{u.name || "Sin nombre"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{u.email || "—"}</td>
                  <td className="px-6 py-4">
                    <select
                      value={u.role}
                      onChange={async (e) => {
                        try {
                          await updateRole({ userId: u._id, role: e.target.value })
                          toast.success(`Rol actualizado a ${ROLE_LABELS[e.target.value]}`)
                        } catch {
                          toast.error("Error al cambiar rol")
                        }
                      }}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground focus:ring-2 focus:ring-brand-sky/20 outline-none"
                    >
                      <option value="client">{ROLE_LABELS.client}</option>
                      <option value="staff">{ROLE_LABELS.staff}</option>
                      <option value="admin">{ROLE_LABELS.admin}</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium border",
                      u.banned
                        ? "bg-red-100 text-red-700 border-red-200"
                        : "bg-green-100 text-green-700 border-green-200"
                    )}>
                      {u.banned ? "Baneado" : "Activo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={async () => {
                        try {
                          await toggleBan({ userId: u._id, banned: !u.banned })
                          toast.success(u.banned ? "Usuario desbaneado" : "Usuario baneado")
                        } catch {
                          toast.error("Error al cambiar estado")
                        }
                      }}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                        u.banned
                          ? "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                          : "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                      )}
                    >
                      {u.banned ? <Unlock className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                      {u.banned ? "Desbanear" : "Banear"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
