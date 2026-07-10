import {
  internalMutation,
  internalQuery,
  mutation,
  query,
  type MutationCtx,
} from "./_generated/server"
import { v } from "convex/values"
import type { Id } from "./_generated/dataModel"
import { areaValidator, roleValidator, statusValidator } from "./constants"
import {
  getAuth,
  isStaff,
  requireActiveAuth,
  requireAdmin,
  requireStaff,
} from "./authz"

const MAX_BULK_OPERATION_SIZE = 100

function assertBulkSize(ids: readonly unknown[]): void {
  if (ids.length === 0 || ids.length > MAX_BULK_OPERATION_SIZE) {
    throw new Error(`Selecciona entre 1 y ${MAX_BULK_OPERATION_SIZE} consultas`)
  }
}

async function assertAdminCanModifyUser(
  ctx: Pick<MutationCtx, "db">,
  actorId: string,
  targetId: Id<"users">,
  removesActiveAdmin: boolean
): Promise<void> {
  const target = await ctx.db.get(targetId)
  if (!target) throw new Error("Usuario no encontrado")
  if (target.clerkId === actorId)
    throw new Error("No puedes modificar tu propia cuenta desde este panel")

  if (removesActiveAdmin && target.role === "admin" && !target.banned) {
    const activeAdmins = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "admin"))
      .collect()
    if (activeAdmins.filter((user) => !user.banned).length <= 1) {
      throw new Error("Debe quedar al menos un administrador activo")
    }
  }
}

// ── Consulta management ──────────────────────────────────────────────────────

export const listAll = query({
  args: {
    status: v.optional(statusValidator),
    area: v.optional(areaValidator),
  },
  handler: async (ctx, { status, area }) => {
    const auth = await getAuth(ctx)
    if (!auth || auth.banned || !isStaff(auth.role)) return null

    const results = status
      ? await ctx.db
          .query("consultas")
          .withIndex("by_status", (q) => q.eq("status", status))
          .order("desc")
          .collect()
      : await ctx.db.query("consultas").order("desc").collect()

    return area ? results.filter((consulta) => consulta.area === area) : results
  },
})

export const getById = query({
  args: { id: v.id("consultas") },
  handler: async (ctx, { id }) => {
    const auth = await getAuth(ctx)
    if (!auth || auth.banned || !isStaff(auth.role)) return null
    return await ctx.db.get(id)
  },
})

export const updateStatus = mutation({
  args: { id: v.id("consultas"), status: statusValidator },
  handler: async (ctx, { id, status }) => {
    requireStaff(await requireActiveAuth(ctx))
    const consulta = await ctx.db.get(id)
    if (!consulta) throw new Error("Consulta no encontrada")
    await ctx.db.patch(id, { status, updatedAt: Date.now() })
    return { success: true as const }
  },
})

export const addResponse = mutation({
  args: { id: v.id("consultas"), response: v.string() },
  handler: async (ctx, { id, response }) => {
    requireStaff(await requireActiveAuth(ctx))
    const consulta = await ctx.db.get(id)
    if (!consulta) throw new Error("Consulta no encontrada")

    const text = response.trim()
    if (!text || text.length > 2000)
      throw new Error("La respuesta debe tener entre 1 y 2000 caracteres")
    const responses = consulta.responses ?? []
    if (responses.length >= 100)
      throw new Error("La consulta alcanzó el máximo de comentarios")

    const identity = await ctx.auth.getUserIdentity()
    await ctx.db.patch(id, {
      status: "respondida",
      responses: [
        ...responses,
        {
          text,
          respondedBy: identity?.name ?? identity?.email ?? "Equipo Defensur",
          createdAt: Date.now(),
        },
      ],
      updatedAt: Date.now(),
    })
    return { success: true as const }
  },
})

export const remove = mutation({
  args: { id: v.id("consultas") },
  handler: async (ctx, { id }) => {
    requireAdmin(await requireActiveAuth(ctx))
    const consulta = await ctx.db.get(id)
    if (!consulta) throw new Error("Consulta no encontrada")
    await ctx.db.delete(id)
    return { success: true as const }
  },
})

// ── Stats ────────────────────────────────────────────────────────────────────

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const auth = await getAuth(ctx)
    if (!auth || auth.banned || !isStaff(auth.role)) return null

    const all = await ctx.db.query("consultas").collect()
    return {
      total: all.length,
      pendiente: all.filter((consulta) => consulta.status === "pendiente")
        .length,
      en_revision: all.filter((consulta) => consulta.status === "en_revision")
        .length,
      respondida: all.filter((consulta) => consulta.status === "respondida")
        .length,
      cerrada: all.filter((consulta) => consulta.status === "cerrada").length,
      fileCount: all.reduce(
        (count, consulta) => count + (consulta.files?.length ?? 0),
        0
      ),
      byArea: {
        laboral: all.filter((consulta) => consulta.area === "laboral").length,
        familia: all.filter((consulta) => consulta.area === "familia").length,
        civil: all.filter((consulta) => consulta.area === "civil").length,
        insolvencia: all.filter((consulta) => consulta.area === "insolvencia")
          .length,
        sumarios: all.filter((consulta) => consulta.area === "sumarios").length,
      },
    }
  },
})

// ── Users and authorization ──────────────────────────────────────────────────

// Runs from the Clerk administrative CLI after changing Clerk metadata/ban state.
// It deliberately has no client-facing API surface.
export const syncUser = internalMutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    role: roleValidator,
    banned: v.boolean(),
  },
  handler: async (ctx, { userId, email, name, role, banned }) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", userId))
      .first()

    if (existing) {
      if (
        existing.email !== email ||
        existing.name !== name ||
        existing.role !== role ||
        existing.banned !== banned
      ) {
        await ctx.db.patch(existing._id, {
          email,
          name,
          role,
          banned,
          updatedAt: Date.now(),
        })
      }
      return existing._id
    }

    return await ctx.db.insert("users", {
      clerkId: userId,
      email,
      name,
      role,
      banned,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})

export const refreshMyRole = query({
  args: {},
  handler: async (ctx) => {
    const auth = await getAuth(ctx)
    if (!auth || auth.banned) return null
    return { role: auth.role }
  },
})

export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    const auth = await getAuth(ctx)
    if (!auth || auth.banned || auth.role !== "admin") return null
    return await ctx.db.query("users").order("desc").collect()
  },
})

// These two internal functions are called only by adminActions.ts after Clerk's
// state has been updated. Both re-check authorization to close TOCTOU windows.
export const getAdminTarget = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    requireAdmin(await requireActiveAuth(ctx))
    const target = await ctx.db.get(userId)
    if (!target) throw new Error("Usuario no encontrado")
    return { clerkId: target.clerkId }
  },
})

export const setUserRole = internalMutation({
  args: { userId: v.id("users"), role: roleValidator },
  handler: async (ctx, { userId, role }) => {
    const actor = requireAdmin(await requireActiveAuth(ctx))
    const target = await ctx.db.get(userId)
    if (!target) throw new Error("Usuario no encontrado")
    await assertAdminCanModifyUser(
      ctx,
      actor.userId,
      userId,
      target.role === "admin" && role !== "admin"
    )
    await ctx.db.patch(userId, { role, updatedAt: Date.now() })
    return { success: true as const }
  },
})

export const setUserBan = internalMutation({
  args: { userId: v.id("users"), banned: v.boolean() },
  handler: async (ctx, { userId, banned }) => {
    const actor = requireAdmin(await requireActiveAuth(ctx))
    const target = await ctx.db.get(userId)
    if (!target) throw new Error("Usuario no encontrado")
    await assertAdminCanModifyUser(
      ctx,
      actor.userId,
      userId,
      banned && target.role === "admin"
    )
    await ctx.db.patch(userId, { banned, updatedAt: Date.now() })
    return { success: true as const }
  },
})

// ── Bulk operations ──────────────────────────────────────────────────────────

export const bulkUpdateStatus = mutation({
  args: { ids: v.array(v.id("consultas")), status: statusValidator },
  handler: async (ctx, { ids, status }) => {
    requireStaff(await requireActiveAuth(ctx))
    assertBulkSize(ids)
    for (const id of ids)
      await ctx.db.patch(id, { status, updatedAt: Date.now() })
    return { success: true as const, count: ids.length }
  },
})

export const bulkCancel = mutation({
  args: { ids: v.array(v.id("consultas")) },
  handler: async (ctx, { ids }) => {
    requireStaff(await requireActiveAuth(ctx))
    assertBulkSize(ids)
    for (const id of ids)
      await ctx.db.patch(id, { status: "cancelada", updatedAt: Date.now() })
    return { success: true as const, count: ids.length }
  },
})

export const bulkDelete = mutation({
  args: { ids: v.array(v.id("consultas")) },
  handler: async (ctx, { ids }) => {
    requireAdmin(await requireActiveAuth(ctx))
    assertBulkSize(ids)
    for (const id of ids) await ctx.db.delete(id)
    return { success: true as const, count: ids.length }
  },
})
