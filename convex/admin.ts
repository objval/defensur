// convex/admin.ts — Admin/staff functions for managing consultas and users.
// Roles are read from the Convex users table for real-time updates (no re-auth needed).
// JWT metadata is used as initial fallback for new users not yet synced.

import { query, mutation, internalMutation, type QueryCtx, type MutationCtx } from "./_generated/server"
import { v } from "convex/values"
import type { Doc, Id } from "./_generated/dataModel"

// ── Auth helper — reads role from users table (realtime), falls back to JWT ──

async function getAuth(
  ctx: { db: QueryCtx["db"]; auth: QueryCtx["auth"] }
): Promise<{ userId: string; role: string; banned: boolean }> {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) throw new Error("Not authenticated")

  // Source of truth: Convex users table (realtime role changes)
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first()

  if (user) {
    return { userId: identity.subject, role: user.role, banned: user.banned }
  }

  // Fallback: JWT metadata for users not yet synced to Convex
  const role = ((identity as any)?.metadata?.role) || "client"
  return { userId: identity.subject, role, banned: false }
}

function isStaff(role: string): boolean {
  return role === "admin" || role === "staff"
}

// ── Consulta management (staff/admin) ────────────────────────────────────────

export const listAll = query({
  args: { status: v.optional(v.string()), area: v.optional(v.string()) },
  handler: async (ctx, { status, area }) => {
    const { role } = await getAuth(ctx)
    if (!isStaff(role)) return null

    if (status) {
      const results = await ctx.db.query("consultas")
        .withIndex("by_status", (q) => q.eq("status", status))
        .order("desc")
        .collect()
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
    const { role } = await getAuth(ctx)
    if (!isStaff(role)) return null
    return await ctx.db.get(id)
  },
})

export const updateStatus = mutation({
  args: { id: v.id("consultas"), status: v.string() },
  handler: async (ctx, { id, status }) => {
    const { role } = await getAuth(ctx)
    if (!isStaff(role)) throw new Error("Not authorized")
    await ctx.db.patch(id, { status, updatedAt: Date.now() })
    return { success: true as const }
  },
})

export const addResponse = mutation({
  args: { id: v.id("consultas"), response: v.string(), respondedBy: v.string() },
  handler: async (ctx, { id, response, respondedBy }) => {
    const { role } = await getAuth(ctx)
    if (!isStaff(role)) throw new Error("Not authorized")
    const consulta = await ctx.db.get(id)
    if (!consulta) throw new Error("Consulta not found")
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
    const { role } = await getAuth(ctx)
    if (role !== "admin") throw new Error("Admin only")
    await ctx.db.delete(id)
    return { success: true as const }
  },
})

// ── Stats ────────────────────────────────────────────────────────────────────

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const { role } = await getAuth(ctx)
    if (!isStaff(role)) return null
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

// ── User sync (internal) ─────────────────────────────────────────────────────

export const syncUser = internalMutation({
  args: { userId: v.string(), email: v.string(), name: v.string(), role: v.string() },
  handler: async (ctx, { userId, email, name, role }) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", userId))
      .first()
    if (existing) {
      if (existing.email !== email || existing.name !== name || existing.role !== role) {
        await ctx.db.patch(existing._id, { email, name, role, updatedAt: Date.now() })
      }
      return existing._id
    }
    return await ctx.db.insert("users", { clerkId: userId, email, name, role, banned: false, createdAt: Date.now(), updatedAt: Date.now() })
  },
})

/** Called from client after role change — returns current role instantly from the database */
export const refreshMyRole = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first()
    return { role: user?.role || "client" }
  },
})

// ── User management (admin only) ─────────────────────────────────────────────

export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    const { role } = await getAuth(ctx)
    if (role !== "admin") return null
    return await ctx.db.query("users").order("desc").collect()
  },
})

export const toggleBan = mutation({
  args: { userId: v.id("users"), banned: v.boolean() },
  handler: async (ctx, { userId, banned }) => {
    const { role } = await getAuth(ctx)
    if (role !== "admin") throw new Error("Admin only")
    await ctx.db.patch(userId, { banned, updatedAt: Date.now() })
    return { success: true as const }
  },
})

export const updateUserRole = mutation({
  args: { userId: v.id("users"), role: v.string() },
  handler: async (ctx, { userId, role }) => {
    const { role: callerRole } = await getAuth(ctx)
    if (callerRole !== "admin") throw new Error("Admin only")
    await ctx.db.patch(userId, { role, updatedAt: Date.now() })
    return { success: true as const }
  },
})
