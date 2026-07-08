import { defineSchema, s } from "convex/schema"

export default defineSchema({
  consultas: defineTable({
    userId: s.string(),
    userEmail: s.string(),
    userName: s.string(),
    area: s.string(),
    subject: s.string(),
    description: s.string(),
    urgency: s.string(),
    status: s.string(),
    attachmentUrl: s.optional(s.string()),
    createdAt: s.number(),
    updatedAt: s.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_user_status", ["userId", "status"]),
})
