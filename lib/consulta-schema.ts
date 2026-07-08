import { z } from "zod"

export const consultaSchema = z.object({
  area: z.enum(["laboral", "familia", "civil", "insolvencia", "sumarios"]),
  subject: z.string().min(5, "El asunto debe tener al menos 5 caracteres").max(100, "Máximo 100 caracteres"),
  description: z.string().min(20, "Describe tu caso con al menos 20 caracteres").max(2000, "Máximo 2000 caracteres"),
  urgency: z.enum(["baja", "media", "alta"]),
})

export type ConsultaFormValues = z.infer<typeof consultaSchema>

export const AREA_LABELS: Record<string, string> = {
  laboral: "Derecho Laboral",
  familia: "Derecho de Familia",
  civil: "Derecho Civil",
  insolvencia: "Insolvencia y Reemprendimiento",
  sumarios: "Sumarios Administrativos",
}

export const URGENCY_LABELS: Record<string, string> = {
  baja: "Baja — Informativa",
  media: "Media — Necesito respuesta esta semana",
  alta: "Alta — Situación urgente",
}
