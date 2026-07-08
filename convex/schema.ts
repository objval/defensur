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
    responses: s.optional(s.array(s.object({
      text: s.string(),
      respondedBy: s.string(),
      createdAt: s.number(),
    }))),
    createdAt: s.number(),
    updatedAt: s.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_user_status", ["userId", "status"])
    .index("by_area", ["area"]),

  users: defineTable({
    clerkId: s.string(),
    email: s.string(),
    name: s.string(),
    role: s.string(),
    banned: s.boolean(),
    createdAt: s.number(),
    updatedAt: s.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_role", ["role"]),
})
