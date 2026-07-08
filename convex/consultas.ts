import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

// ── Public queries ───────────────────────────────────────────────────────────

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null

    return await ctx.db
      .query("consultas")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect()
  },
})

export const getMine = query({
  args: { id: v.id("consultas") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null

    const consulta = await ctx.db.get(id)
    if (!consulta) return null

    if (consulta.userId !== identity.subject) {
      // Check if staff
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
        .first()
      const role = user?.role || "client"
      if (role !== "admin" && role !== "staff") return null
    }
    return consulta
  },
})

export const create = mutation({
  args: {
    area: v.string(),
    subject: v.string(),
    description: v.string(),
    urgency: v.string(),
  },
  handler: async (ctx, { area, subject, description, urgency }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first()

    if (!existing) {
      await ctx.db.insert("users", {
        clerkId: identity.subject,
        email: identity.email || "",
        name: identity.name || "",
        role: "client",
        banned: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    }

    const now = Date.now()
    return await ctx.db.insert("consultas", {
      userId: identity.subject,
      userEmail: identity.email || "",
      userName: identity.name || "",
      area,
      subject,
      description,
      urgency,
      status: "pendiente",
      createdAt: now,
      updatedAt: now,
    })
  },
})
