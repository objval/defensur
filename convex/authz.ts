import type { QueryCtx } from "./_generated/server"
import { isRole, type Role } from "./constants"

type AuthContext = Pick<QueryCtx, "auth" | "db">

export type AuthenticatedUser = {
  userId: string
  role: Role
  banned: boolean
}

export async function getAuth(
  ctx: AuthContext
): Promise<AuthenticatedUser | null> {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) return null

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first()

  return {
    userId: identity.subject,
    // The Convex users table is the only authorization source of truth.
    // Clerk publicMetadata is synchronized as an administrative mirror, never trusted here.
    role: user && isRole(user.role) ? user.role : "client",
    banned: user?.banned ?? false,
  }
}

export async function requireActiveAuth(
  ctx: AuthContext
): Promise<AuthenticatedUser> {
  const auth = await getAuth(ctx)
  if (!auth) throw new Error("No autenticado")
  if (auth.banned) throw new Error("Esta cuenta está suspendida")
  return auth
}

export function isStaff(role: Role): boolean {
  return role === "admin" || role === "staff"
}

export function requireStaff(auth: AuthenticatedUser): AuthenticatedUser {
  if (!isStaff(auth.role)) throw new Error("No autorizado")
  return auth
}

export function requireAdmin(auth: AuthenticatedUser): AuthenticatedUser {
  if (auth.role !== "admin") throw new Error("Solo administradores")
  return auth
}
