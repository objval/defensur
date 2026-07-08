import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  consultas: defineTable({
    userId: v.string(),
    userEmail: v.string(),
    userName: v.string(),
    area: v.string(),
    subject: v.string(),
    description: v.string(),
    urgency: v.string(),
    status: v.string(),
    attachmentUrl: v.optional(v.string()),
    responses: v.optional(v.array(v.object({
      text: v.string(),
      respondedBy: v.string(),
      createdAt: v.number(),
    }))),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_user_status", ["userId", "status"])
    .index("by_area", ["area"]),

  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.string(),
    banned: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_role", ["role"]),
})
