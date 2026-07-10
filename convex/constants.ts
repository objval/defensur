import { v } from "convex/values"

export const ROLE_VALUES = ["admin", "staff", "client"] as const
export type Role = (typeof ROLE_VALUES)[number]
export function isRole(value: string): value is Role {
  return (ROLE_VALUES as readonly string[]).includes(value)
}
export const roleValidator = v.union(
  v.literal("admin"),
  v.literal("staff"),
  v.literal("client")
)

export const AREA_VALUES = [
  "laboral",
  "familia",
  "civil",
  "insolvencia",
  "sumarios",
] as const
export type Area = (typeof AREA_VALUES)[number]
export const areaValidator = v.union(
  v.literal("laboral"),
  v.literal("familia"),
  v.literal("civil"),
  v.literal("insolvencia"),
  v.literal("sumarios")
)

export const URGENCY_VALUES = ["baja", "media", "alta"] as const
export type Urgency = (typeof URGENCY_VALUES)[number]
export const urgencyValidator = v.union(
  v.literal("baja"),
  v.literal("media"),
  v.literal("alta")
)

export const STATUS_VALUES = [
  "pendiente",
  "en_revision",
  "respondida",
  "cerrada",
  "cancelada",
] as const
export type ConsultaStatus = (typeof STATUS_VALUES)[number]
export const statusValidator = v.union(
  v.literal("pendiente"),
  v.literal("en_revision"),
  v.literal("respondida"),
  v.literal("cerrada"),
  v.literal("cancelada")
)

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const

export const MODALITY_VALUES = ["presencial", "online"] as const
export type Modality = (typeof MODALITY_VALUES)[number]
export const modalityValidator = v.union(
  v.literal("presencial"),
  v.literal("online")
)

export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024
export const MAX_ATTACHMENTS_PER_CONSULTA = 5
