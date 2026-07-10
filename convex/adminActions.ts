import { v } from "convex/values"
import { action } from "./_generated/server"
import { internal } from "./_generated/api"
import { roleValidator } from "./constants"

type ClerkUser = { public_metadata?: unknown }

function clerkSecretKey(): string {
  const secretKey = process.env.CLERK_SECRET_KEY
  if (!secretKey) {
    throw new Error(
      "La administración requiere CLERK_SECRET_KEY en el entorno de Convex"
    )
  }
  return secretKey
}

async function clerkRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const response = await fetch(`https://api.clerk.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${clerkSecretKey()}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  })
  if (!response.ok)
    throw new Error("No fue posible sincronizar el usuario con Clerk")
  return (await response.json()) as T
}

function metadataRecord(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {}
}

export const updateUserRole = action({
  args: { userId: v.id("users"), role: roleValidator },
  handler: async (ctx, { userId, role }): Promise<{ success: true }> => {
    const target = await ctx.runQuery(internal.admin.getAdminTarget, { userId })
    const user = await clerkRequest<ClerkUser>(`/users/${target.clerkId}`)

    await clerkRequest(`/users/${target.clerkId}`, {
      method: "PATCH",
      body: JSON.stringify({
        public_metadata: { ...metadataRecord(user.public_metadata), role },
      }),
    })
    return await ctx.runMutation(internal.admin.setUserRole, { userId, role })
  },
})

export const updateUserBan = action({
  args: { userId: v.id("users"), banned: v.boolean() },
  handler: async (ctx, { userId, banned }): Promise<{ success: true }> => {
    const target = await ctx.runQuery(internal.admin.getAdminTarget, { userId })
    await clerkRequest(`/users/${target.clerkId}/${banned ? "ban" : "unban"}`, {
      method: "POST",
    })
    return await ctx.runMutation(internal.admin.setUserBan, { userId, banned })
  },
})
