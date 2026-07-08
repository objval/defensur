// convex/files.ts — File upload mutations for consulta evidence.

import { mutation } from "./_generated/server"
import { v } from "convex/values"

/** Generate an upload URL for evidence files. Returns the URL for direct client upload. */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")
    return await ctx.storage.generateUploadUrl()
  },
})

/** Attach a file reference to an existing consulta after upload completes. */
export const attachFile = mutation({
  args: {
    consultaId: v.id("consultas"),
    storageId: v.string(),
    fileName: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
  },
  handler: async (ctx, { consultaId, storageId, fileName, fileType, fileSize }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const consulta = await ctx.db.get(consultaId)
    if (!consulta) throw new Error("Consulta not found")
    if (consulta.userId !== identity.subject) throw new Error("Not authorized")

    const existing = consulta.files || []
    await ctx.db.patch(consultaId, {
      files: [...existing, { storageId, fileName, fileType, fileSize, uploadedAt: Date.now() }],
      updatedAt: Date.now(),
    })

    return { success: true as const }
  },
})

/** Get a download URL for a stored file. */
export const getFileUrl = mutation({
  args: { storageId: v.string() },
  handler: async (ctx, { storageId }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")
    return await ctx.storage.getUrl(storageId)
  },
})
