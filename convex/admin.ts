// convex/admin.ts — Admin/staff functions for managing consultas and users.
// Roles are read from the Convex users table for real-time updates (no re-auth needed).
// JWT metadata is used as initial fallback for new users not yet synced.

import { query, mutation, internalMutation, type QueryCtx, type MutationCtx } from "./_generated/server"
import { v } from "convex/values"
import type { Doc, Id } from "./_generated/dataModel"

// ── Auth helper — reads role from users table (realtime), falls back to JWT ──

async function getAuth(
  ctx: { db: QueryCtx["db"]; auth: QueryCtx["auth"] }
): Promise<{ userId: string; role: string; banned: boolean } | null> {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) return null

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first()

  if (user) {
    return { userId: identity.subject, role: user.role, banned: user.banned }
  }

  const role = ((identity as any)?.metadata?.role) || "client"
  return { userId: identity.subject, role, banned: false }
}

function isStaff(role: string): boolean {
  return role === "admin" || role === "staff"
}

// ── Consulta management ──────────────────────────────────────────────────────

export const listAll = query({
  args: { status: v.optional(v.string()), area: v.optional(v.string()) },
  handler: async (ctx, { status, area }) => {
    const auth = await getAuth(ctx)
    if (!auth || !isStaff(auth.role)) return null
    if (status) {
      const results = await ctx.db.query("consultas").withIndex("by_status", (q) => q.eq("status", status)).order("desc").collect()
      if (area) return results.filter((c) => c.area === area)
      return results
    }
    const results = await ctx.db.query("consultas").order("desc").collect()
    if (area) return results.filter((c) => c.area === area)
    return results
  },
})

export const getById = query({
  args: { id: v.id("consultas") },
  handler: async (ctx, { id }) => {
    const auth = await getAuth(ctx)
    if (!auth || !isStaff(auth.role)) return null
    return await ctx.db.get(id)
  },
})

export const updateStatus = mutation({
  args: { id: v.id("consultas"), status: v.string() },
  handler: async (ctx, { id, status }) => {
    const auth = await getAuth(ctx)
    if (!auth || !isStaff(auth.role)) throw new Error("No autorizado")
    await ctx.db.patch(id, { status, updatedAt: Date.now() })
    return { success: true as const }
  },
})

export const addResponse = mutation({
  args: { id: v.id("consultas"), response: v.string(), respondedBy: v.string() },
  handler: async (ctx, { id, response, respondedBy }) => {
    const auth = await getAuth(ctx)
    if (!auth || !isStaff(auth.role)) throw new Error("No autorizado")
    const consulta = await ctx.db.get(id)
    if (!consulta) throw new Error("Consulta no encontrada")
    const existing = consulta.responses || []
    await ctx.db.patch(id, {
      status: "respondida",
      responses: [...existing, { text: response, respondedBy, createdAt: Date.now() }],
      updatedAt: Date.now(),
    })
    return { success: true as const }
  },
})

export const remove = mutation({
  args: { id: v.id("consultas") },
  handler: async (ctx, { id }) => {
    const auth = await getAuth(ctx)
    if (!auth || auth.role !== "admin") throw new Error("Solo administradores")
    await ctx.db.delete(id)
    return { success: true as const }
  },
})

// ── Stats ────────────────────────────────────────────────────────────────────

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const auth = await getAuth(ctx)
    if (!auth || !isStaff(auth.role)) return null
    const all = await ctx.db.query("consultas").collect()
    return {
      total: all.length,
      pendiente: all.filter((c) => c.status === "pendiente").length,
      en_revision: all.filter((c) => c.status === "en_revision").length,
      respondida: all.filter((c) => c.status === "respondida").length,
      cerrada: all.filter((c) => c.status === "cerrada").length,
      byArea: {
        laboral: all.filter((c) => c.area === "laboral").length,
        familia: all.filter((c) => c.area === "familia").length,
        civil: all.filter((c) => c.area === "civil").length,
        insolvencia: all.filter((c) => c.area === "insolvencia").length,
        sumarios: all.filter((c) => c.area === "sumarios").length,
      },
    }
  },
})

// ── User sync ────────────────────────────────────────────────────────────────

export const syncUser = internalMutation({
  args: { userId: v.string(), email: v.string(), name: v.string(), role: v.string() },
  handler: async (ctx, { userId, email, name, role }) => {
    const existing = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", userId)).first()
    if (existing) {
      if (existing.email !== email || existing.name !== name || existing.role !== role) {
        await ctx.db.patch(existing._id, { email, name, role, updatedAt: Date.now() })
      }
      return existing._id
    }
    return await ctx.db.insert("users", { clerkId: userId, email, name, role, banned: false, createdAt: Date.now(), updatedAt: Date.now() })
  },
})

export const refreshMyRole = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null
    const user = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).first()
    return { role: user?.role || "client" }
  },
})

// ── User management (admin only) ─────────────────────────────────────────────

export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    const auth = await getAuth(ctx)
    if (!auth || auth.role !== "admin") return null
    return await ctx.db.query("users").order("desc").collect()
  },
})

export const toggleBan = mutation({
  args: { userId: v.id("users"), banned: v.boolean() },
  handler: async (ctx, { userId, banned }) => {
    const auth = await getAuth(ctx)
    if (!auth || auth.role !== "admin") throw new Error("Solo administradores")
    await ctx.db.patch(userId, { banned, updatedAt: Date.now() })
    return { success: true as const }
  },
})

export const updateUserRole = mutation({
  args: { userId: v.id("users"), role: v.string() },
  handler: async (ctx, { userId, role }) => {
    const auth = await getAuth(ctx)
    if (!auth || auth.role !== "admin") throw new Error("Solo administradores")
    await ctx.db.patch(userId, { role, updatedAt: Date.now() })
    return { success: true as const }
  },
})

// ── Bulk operations ──────────────────────────────────────────────────────────

export const bulkUpdateStatus = mutation({
  args: { ids: v.array(v.id("consultas")), status: v.string() },
  handler: async (ctx, { ids, status }) => {
    const auth = await getAuth(ctx)
    if (!auth || !isStaff(auth.role)) throw new Error("No autorizado")
    for (const id of ids) await ctx.db.patch(id, { status, updatedAt: Date.now() })
    return { success: true as const, count: ids.length }
  },
})

export const bulkCancel = mutation({
  args: { ids: v.array(v.id("consultas")) },
  handler: async (ctx, { ids }) => {
    const auth = await getAuth(ctx)
    if (!auth || !isStaff(auth.role)) throw new Error("No autorizado")
    for (const id of ids) await ctx.db.patch(id, { status: "cancelada", updatedAt: Date.now() })
    return { success: true as const, count: ids.length }
  },
})

export const bulkDelete = mutation({
  args: { ids: v.array(v.id("consultas")) },
  handler: async (ctx, { ids }) => {
    const auth = await getAuth(ctx)
    if (!auth || auth.role !== "admin") throw new Error("Solo administradores")
    for (const id of ids) await ctx.db.delete(id)
    return { success: true as const, count: ids.length }
  },
})
