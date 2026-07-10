"use client"

import { useAction, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc } from "@/convex/_generated/dataModel"
import { Shield, Ban, Unlock } from "lucide-react"
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
  const updateBan = useAction(api.adminActions.updateUserBan)
  const updateRole = useAction(api.adminActions.updateUserRole)

  // Not admin — show access denied
  if (myRole !== undefined && myRole?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Shield className="mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          Acceso Restringido
        </h1>
        <p className="max-w-md text-muted-foreground">
          Solo los administradores pueden ver esta página.
        </p>
      </div>
    )
  }

  if (users === undefined || myRole === undefined) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 rounded bg-muted" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-muted" />
        ))}
      </div>
    )
  }

  if (users === null) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Shield className="mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          Acceso Restringido
        </h1>
        <p className="text-muted-foreground">
          No tienes permisos de administrador.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
            Usuarios
          </h1>
          <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {users.length} total{users.length !== 1 ? "es" : ""}
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u: Doc<"users">) => (
                <tr key={u._id} className="transition-colors hover:bg-muted/20">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy/10 text-sm font-semibold text-brand-navy">
                        {u.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {u.name || "Sin nombre"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {u.email || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={u.role}
                      onChange={async (e) => {
                        const role = e.target.value
                        if (
                          role !== "admin" &&
                          role !== "staff" &&
                          role !== "client"
                        )
                          return
                        try {
                          await updateRole({ userId: u._id, role })
                          toast.success(
                            `Rol actualizado a ${ROLE_LABELS[role]}`
                          )
                        } catch {
                          toast.error("Error al cambiar rol")
                        }
                      }}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-brand-sky/20"
                    >
                      <option value="client">{ROLE_LABELS.client}</option>
                      <option value="staff">{ROLE_LABELS.staff}</option>
                      <option value="admin">{ROLE_LABELS.admin}</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        u.banned
                          ? "border-red-200 bg-red-100 text-red-700"
                          : "border-green-200 bg-green-100 text-green-700"
                      )}
                    >
                      {u.banned ? "Baneado" : "Activo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={async () => {
                        try {
                          await updateBan({ userId: u._id, banned: !u.banned })
                          toast.success(
                            u.banned ? "Usuario desbaneado" : "Usuario baneado"
                          )
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
                      {u.banned ? (
                        <Unlock className="h-3.5 w-3.5" />
                      ) : (
                        <Ban className="h-3.5 w-3.5" />
                      )}
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
