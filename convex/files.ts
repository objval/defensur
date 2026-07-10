import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import {
  ALLOWED_FILE_TYPES,
  MAX_ATTACHMENT_BYTES,
  MAX_ATTACHMENTS_PER_CONSULTA,
} from "./constants"
import { getAuth, isStaff, requireActiveAuth } from "./authz"

function sanitizeFileName(fileName: string): string {
  const normalized = fileName.trim().replace(/[\\/\u0000-\u001f]/g, "_")
  if (!normalized || normalized.length > 180)
    throw new Error("Nombre de archivo inválido")
  return normalized
}

function isAllowedFileType(
  contentType: string | undefined
): contentType is (typeof ALLOWED_FILE_TYPES)[number] {
  return (
    !!contentType &&
    (ALLOWED_FILE_TYPES as readonly string[]).includes(contentType)
  )
}

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireActiveAuth(ctx)
    return await ctx.storage.generateUploadUrl()
  },
})

export const attachFile = mutation({
  args: {
    consultaId: v.id("consultas"),
    storageId: v.id("_storage"),
    fileName: v.string(),
  },
  handler: async (ctx, { consultaId, storageId, fileName }) => {
    const auth = await requireActiveAuth(ctx)
    const consulta = await ctx.db.get(consultaId)
    if (!consulta) throw new Error("Consulta no encontrada")
    if (consulta.userId !== auth.userId) throw new Error("No autorizado")

    const files = consulta.files ?? []
    if (files.length >= MAX_ATTACHMENTS_PER_CONSULTA) {
      throw new Error(
        `Máximo ${MAX_ATTACHMENTS_PER_CONSULTA} archivos por consulta`
      )
    }
    if (files.some((file) => file.storageId === storageId)) {
      throw new Error("El archivo ya está adjunto a esta consulta")
    }

    const metadata = await ctx.db.system.get("_storage", storageId)
    if (!metadata) throw new Error("El archivo ya no existe")
    if (!isAllowedFileType(metadata.contentType))
      throw new Error("Tipo de archivo no permitido")
    if (metadata.size > MAX_ATTACHMENT_BYTES)
      throw new Error("El archivo supera el máximo de 10 MB")

    await ctx.db.patch(consultaId, {
      files: [
        ...files,
        {
          storageId,
          fileName: sanitizeFileName(fileName),
          fileType: metadata.contentType,
          fileSize: metadata.size,
          uploadedAt: Date.now(),
        },
      ],
      updatedAt: Date.now(),
    })

    return { success: true as const }
  },
})

export const getFileUrl = query({
  args: { consultaId: v.id("consultas"), storageId: v.id("_storage") },
  handler: async (ctx, { consultaId, storageId }) => {
    const auth = await getAuth(ctx)
    if (!auth || auth.banned) return null

    const consulta = await ctx.db.get(consultaId)
    if (!consulta) return null
    if (consulta.userId !== auth.userId && !isStaff(auth.role)) return null
    if (!consulta.files?.some((file) => file.storageId === storageId))
      return null

    return await ctx.storage.getUrl(storageId)
  },
})
