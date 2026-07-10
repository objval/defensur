import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
import {
  areaValidator,
  modalityValidator,
  roleValidator,
  statusValidator,
  urgencyValidator,
} from "./constants"

export default defineSchema({
  consultas: defineTable({
    userId: v.string(),
    userEmail: v.string(),
    userName: v.string(),
    phone: v.optional(v.string()),
    rut: v.optional(v.string()),
    area: areaValidator,
    subject: v.string(),
    description: v.string(),
    modality: v.optional(modalityValidator),
    urgency: urgencyValidator,
    status: statusValidator,
    // Scheduled date/time for booking conflict prevention
    scheduledDate: v.optional(v.float64()),
    scheduledTime: v.optional(v.string()),
    // File attachments (PDFs, images, documents)
    files: v.optional(
      v.array(
        v.object({
          storageId: v.id("_storage"),
          fileName: v.string(),
          fileType: v.string(),
          fileSize: v.number(),
          uploadedAt: v.number(),
        })
      )
    ),
    // Staff responses
    responses: v.optional(
      v.array(
        v.object({
          text: v.string(),
          respondedBy: v.string(),
          createdAt: v.number(),
        })
      )
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_user_status", ["userId", "status"])
    .index("by_area", ["area"])
    .index("by_scheduled_date", ["scheduledDate"]),

  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    role: roleValidator,
    banned: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_role", ["role"]),
})
