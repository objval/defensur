// lib/admin-types.ts — Shared types for the admin toolkit and roles system.

export type Role = "admin" | "client" | "staff"

export const ROLE_LABELS: Record<Role, string> = {
  admin: "Administrador",
  client: "Cliente",
  staff: "Abogado/Staff",
}

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  admin: "Acceso total: puede ver todas las consultas, banear usuarios, modificar tablas",
  client: "Cliente de Defensur: puede crear consultas y ver las propias",
  staff: "Abogado del estudio: puede ver todas las consultas y responder",
}

// Default role assigned to new users on sign-up
export const DEFAULT_ROLE: Role = "client"

// Roles that can access the /panel route
export const PANEL_ROLES: Role[] = ["admin", "client", "staff"]

// Roles that can see ALL consultas (not just their own)
export const STAFF_ROLES: Role[] = ["admin", "staff"]
