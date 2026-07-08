import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

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
    if (!consulta || consulta.userId !== identity.subject) return null
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
