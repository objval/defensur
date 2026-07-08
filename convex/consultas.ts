import { query, mutation, internalAction } from "./_generated/server"
import { v } from "convex/values"
import { api, internal } from "./_generated/api"

// Get all consultas for the authenticated user
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

// Get a single consulta by ID (must belong to the user, or staff)
export const getMine = query({
  args: { id: v.id("consultas") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null

    const consulta = await ctx.db.get(id)
    if (!consulta) return null

    const role = (identity as any)?.metadata?.role || "client"
    if (consulta.userId !== identity.subject && role !== "admin" && role !== "staff") return null
    return consulta
  },
})

// Create a new consulta
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

    const role = (identity as any)?.metadata?.role || "client"

    // Sync user record for admin reference
    await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first()
      .then(async (existing) => {
        if (!existing) {
          await ctx.db.insert("users", {
            clerkId: identity.subject,
            email: identity.email || "",
            name: identity.name || "",
            role,
            banned: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          })
        }
      })

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
