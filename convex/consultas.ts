import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { areaValidator, modalityValidator, urgencyValidator } from "./constants"
import { getAuth, isStaff, requireActiveAuth } from "./authz"

function requiredText(
  value: string,
  label: string,
  min: number,
  max: number
): string {
  const normalized = value.trim()
  if (normalized.length < min || normalized.length > max) {
    throw new Error(`${label} debe tener entre ${min} y ${max} caracteres`)
  }
  return normalized
}

function optionalPhone(value: string | undefined): string | undefined {
  if (!value) return undefined
  const normalized = value.trim()
  if (!/^[+]?\d[\d\s()\-]{7,30}$/.test(normalized)) {
    throw new Error("Teléfono inválido")
  }
  return normalized
}

function validEmail(value: string): string {
  const normalized = value.trim().toLowerCase()
  if (
    normalized.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
  ) {
    throw new Error("Correo inválido")
  }
  return normalized
}

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const auth = await getAuth(ctx)
    if (!auth || auth.banned) return null

    return await ctx.db
      .query("consultas")
      .withIndex("by_user", (q) => q.eq("userId", auth.userId))
      .order("desc")
      .collect()
  },
})

export const getMine = query({
  args: { id: v.id("consultas") },
  handler: async (ctx, { id }) => {
    const auth = await getAuth(ctx)
    if (!auth || auth.banned) return null

    const consulta = await ctx.db.get(id)
    if (!consulta) return null
    if (consulta.userId === auth.userId || isStaff(auth.role)) return consulta
    return null
  },
})

export const create = mutation({
  args: {
    area: areaValidator,
    subject: v.string(),
    description: v.string(),
    modality: v.optional(modalityValidator),
    urgency: urgencyValidator,
  },
  handler: async (
    ctx,
    { area, subject, description, modality, urgency }
  ) => {
    const auth = await requireActiveAuth(ctx)
    const normalizedSubject = requiredText(subject, "El asunto", 5, 100)
    const normalizedDescription = requiredText(
      description,
      "La descripción",
      20,
      2000
    )

    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", auth.userId))
      .first()

    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("No autenticado")

    if (!existing) {
      await ctx.db.insert("users", {
        clerkId: auth.userId,
        email: identity.email ?? "",
        name: identity.name ?? "",
        role: "client",
        banned: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    }

    const now = Date.now()
    return await ctx.db.insert("consultas", {
      userId: auth.userId,
      userEmail: identity.email ?? "",
      userName: identity.name ?? "",
      area,
      subject: normalizedSubject,
      description: normalizedDescription,
      modality: modality ?? "presencial",
      urgency,
      status: "pendiente",
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const cancel = mutation({
  args: { id: v.id("consultas") },
  handler: async (ctx, { id }) => {
    const auth = await requireActiveAuth(ctx)
    const consulta = await ctx.db.get(id)
    if (!consulta) throw new Error("Consulta no encontrada")
    if (consulta.userId !== auth.userId) throw new Error("No autorizado")
    if (consulta.status !== "pendiente")
      throw new Error("Solo se pueden cancelar consultas pendientes")
    await ctx.db.patch(id, { status: "cancelada", updatedAt: Date.now() })
    return { success: true as const }
  },
})

export const addNote = mutation({
  args: { id: v.id("consultas"), text: v.string() },
  handler: async (ctx, { id, text }) => {
    const auth = await requireActiveAuth(ctx)
    const consulta = await ctx.db.get(id)
    if (!consulta) throw new Error("Consulta no encontrada")
    if (consulta.userId !== auth.userId) throw new Error("No autorizado")
    if (consulta.status === "cancelada" || consulta.status === "cerrada") {
      throw new Error(
        "No se pueden agregar comentarios a una consulta cerrada o cancelada"
      )
    }

    const normalizedText = requiredText(text, "El comentario", 1, 2000)
    const identity = await ctx.auth.getUserIdentity()
    const existing = consulta.responses ?? []
    if (existing.length >= 100)
      throw new Error("La consulta alcanzó el máximo de comentarios")

    await ctx.db.patch(id, {
      responses: [
        ...existing,
        {
          text: normalizedText,
          respondedBy: identity?.name ?? identity?.email ?? "Usuario",
          createdAt: Date.now(),
        },
      ],
      updatedAt: Date.now(),
    })
    return { success: true as const }
  },
})

// Public contact form. Do not add privileged behavior here: unauthenticated callers can invoke it.
export const submitPublic = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    rut: v.optional(v.string()),
    area: areaValidator,
    subject: v.string(),
    description: v.string(),
    modality: modalityValidator,
    urgency: v.optional(urgencyValidator),
    scheduledDate: v.optional(v.float64()),
    scheduledTime: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { name, email, phone, rut, area, subject, description, modality, urgency, scheduledDate, scheduledTime }
  ) => {
    const auth = await getAuth(ctx)
    if (auth?.banned) throw new Error("Esta cuenta está suspendida")

    const normalizedName = requiredText(name, "El nombre", 2, 120)
    const normalizedEmail = validEmail(email)
    const normalizedPhone = optionalPhone(phone)
    const normalizedSubject = requiredText(subject, "El asunto", 5, 100)
    const normalizedDescription = requiredText(
      description,
      "La descripción",
      20,
      2000
    )

    // Booking conflict check: prevent double-booking same date+time
    if (scheduledDate != null && scheduledTime != null) {
      const existing = await ctx.db
        .query("consultas")
        .withIndex("by_scheduled_date", (q) => q.eq("scheduledDate", scheduledDate))
        .filter((q) => q.eq(q.field("scheduledTime"), scheduledTime))
        .first()
      if (existing) {
        throw new Error("Este horario ya fue reservado. Por favor elige otro.")
      }
    }

    const identity = await ctx.auth.getUserIdentity()
    const now = Date.now()

    return await ctx.db.insert("consultas", {
      userId: identity?.subject ?? "anonymous",
      userEmail: identity?.email ?? normalizedEmail,
      userName: identity?.name ?? normalizedName,
      phone: normalizedPhone,
      rut,
      area,
      subject: normalizedSubject,
      description: normalizedDescription,
      modality,
      urgency: urgency ?? "media",
      status: "pendiente",
      scheduledDate,
      scheduledTime,
      files: [],
      responses: [],
      createdAt: now,
      updatedAt: now,
    })
  },
})

// Real-time: get already-booked time slots for a given date
export const getBookedSlots = query({
  args: { scheduledDate: v.float64() },
  handler: async (ctx, { scheduledDate }) => {
    const booked = await ctx.db
      .query("consultas")
      .withIndex("by_scheduled_date", (q) => q.eq("scheduledDate", scheduledDate))
      .collect()
    return booked.map((c) => c.scheduledTime).filter(Boolean) as string[]
  },
})
