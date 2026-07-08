// convex/admin.ts — Admin/staff functions for managing consultas and users.
// All functions require authentication. Staff/admin functions check role via JWT metadata.

import { query, mutation, internalMutation } from "./_generated/server"
import { v } from "convex/values"
import type { DocId } from "./_generated/dataModel"

// ── Helpers ──────────────────────────────────────────────────────────────────

async function getIdentity(ctx: any) {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) throw new Error("Not authenticated")
  return identity
}

function getRole(identity: any): string {
  return (identity as any)?.metadata?.role || "client"
}

function isStaff(role: string): boolean {
  return role === "admin" || role === "staff"
}

// ── Consulta management (staff/admin) ────────────────────────────────────────

/** List ALL consultas — admin/staff only */
export const listAll = query({
  args: {
    status: v.optional(v.string()),
    area: v.optional(v.string()),
  },
  handler: async (ctx, { status, area }) => {
    const identity = await getIdentity(ctx)
    const role = getRole(identity)
    if (!isStaff(role)) return null

    let q = ctx.db.query("consultas")
    if (status) {
      q = q.withIndex("by_status", (q2) => q2.eq("status", status))
    }
    const results = await q.order("desc").collect()
    if (area) return results.filter((c) => c.area === area)
    return results
  },
})

/** Get any consulta by ID — admin/staff only */
export const getById = query({
  args: { id: v.id("consultas") },
  handler: async (ctx, { id }) => {
    const identity = await getIdentity(ctx)
    const role = getRole(identity)
    if (!isStaff(role)) return null
    return await ctx.db.get(id)
  },
})

/** Update consulta status — admin/staff only */
export const updateStatus = mutation({
  args: {
    id: v.id("consultas"),
    status: v.string(),
  },
  handler: async (ctx, { id, status }) => {
    const identity = await getIdentity(ctx)
    const role = getRole(identity)
    if (!isStaff(role)) throw new Error("Not authorized")

    await ctx.db.patch(id, { status, updatedAt: Date.now() })
    return { success: true }
  },
})

/** Add a response/note to a consulta — admin/staff only */
export const addResponse = mutation({
  args: {
    id: v.id("consultas"),
    response: v.string(),
    respondedBy: v.string(),
  },
  handler: async (ctx, { id, response, respondedBy }) => {
    const identity = await getIdentity(ctx)
    const role = getRole(identity)
    if (!isStaff(role)) throw new Error("Not authorized")

    const consulta = await ctx.db.get(id)
    if (!consulta) throw new Error("Consulta not found")

    const responses = (consulta as any).responses || []
    responses.push({
      text: response,
      respondedBy,
      createdAt: Date.now(),
    })

    await ctx.db.patch(id, {
      status: "respondida",
      responses,
      updatedAt: Date.now(),
    })
    return { success: true }
  },
})

/** Delete a consulta — admin only */
export const remove = mutation({
  args: { id: v.id("consultas") },
  handler: async (ctx, { id }) => {
    const identity = await getIdentity(ctx)
    const role = getRole(identity)
    if (role !== "admin") throw new Error("Admin only")

    await ctx.db.delete(id)
    return { success: true }
  },
})

// ── Stats / dashboard data ───────────────────────────────────────────────────

/** Get dashboard stats — admin/staff only */
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await getIdentity(ctx)
    const role = getRole(identity)
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

/** Sync user info from Clerk JWT on first consulta creation.
 *  Stores a lightweight user record for staff reference. */
export const syncUser = internalMutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.string(),
  },
  handler: async (ctx, { userId, email, name, role }) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", userId))
      .first()

    if (existing) {
      // Update if changed
      if (existing.email !== email || existing.name !== name || existing.role !== role) {
        await ctx.db.patch(existing._id, { email, name, role, updatedAt: Date.now() })
      }
      return existing._id
    }

    // Create new
    return await ctx.db.insert("users", {
      clerkId: userId,
      email,
      name,
      role,
      banned: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})

/** List all users — admin only */
export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    const identity = await getIdentity(ctx)
    const role = getRole(identity)
    if (role !== "admin") return null

    return await ctx.db.query("users").order("desc").collect()
  },
})

/** Ban/unban a user — admin only (Convex-side flag, Clerk-side is separate) */
export const toggleBan = mutation({
  args: {
    userId: v.id("users"),
    banned: v.boolean(),
  },
  handler: async (ctx, { userId, banned }) => {
    const identity = await getIdentity(ctx)
    const role = getRole(identity)
    if (role !== "admin") throw new Error("Admin only")

    await ctx.db.patch(userId, { banned, updatedAt: Date.now() })
    return { success: true }
  },
})

/** Update a user's role in Convex — admin only.
 *  NOTE: This only updates the Convex-side record. The Clerk publicMetadata
 *  must also be updated via Clerk API for the JWT to carry the new role. */
export const updateUserRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.string(),
  },
  handler: async (ctx, { userId, role }) => {
    const identity = await getIdentity(ctx)
    const currentRole = getRole(identity)
    if (currentRole !== "admin") throw new Error("Admin only")

    await ctx.db.patch(userId, { role, updatedAt: Date.now() })
    return { success: true }
  },
})
