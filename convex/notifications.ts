"use node"

import { v } from "convex/values"
import { internalAction } from "./_generated/server"
import { Resend } from "resend"

const DEFAULT_FROM_EMAIL = "notificaciones@defensuraraucania.cl"
const DEFAULT_FROM_NAME = "Defensur Araucanía"
const DEFAULT_TO = "consultas@defensur.cl"

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function formatScheduledDate(
  scheduledDate: number | undefined,
  scheduledTime: string | undefined
): string {
  if (scheduledDate == null || !scheduledTime) return "No especificada"

  const dateLabel = new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Santiago",
  }).format(new Date(scheduledDate))

  return `${dateLabel} a las ${scheduledTime} hrs.`
}

export const sendNewConsultaNotification = internalAction({
  args: {
    consultaId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    rut: v.optional(v.string()),
    area: v.string(),
    subject: v.string(),
    modality: v.optional(v.string()),
    urgency: v.optional(v.string()),
    description: v.string(),
    scheduledDate: v.optional(v.float64()),
    scheduledTime: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("RESEND_API_KEY not set — skipping email notification")
      return
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM_EMAIL
    const fromName = process.env.RESEND_FROM_NAME ?? DEFAULT_FROM_NAME
    const notificationTargets = (process.env.NOTIFICATION_TO_EMAILS ?? DEFAULT_TO)
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)

    if (notificationTargets.length === 0) {
      console.error("NOTIFICATION_TO_EMAILS is empty — skipping email notification")
      return
    }

    const resend = new Resend(apiKey)

    const areaLabels: Record<string, string> = {
      laboral: "Derecho Laboral",
      familia: "Derecho de Familia",
      civil: "Derecho Civil",
      insolvencia: "Ley de Insolvencia",
      sumarios: "Sumarios Administrativos",
    }

    const urgencyLabels: Record<string, string> = {
      baja: "Baja",
      media: "Media",
      alta: "Alta",
    }

    const modalityLabel = args.modality === "online" ? "Videollamada" : "Presencial"
    const areaLabel = areaLabels[args.area] ?? args.area
    const urgencyLabel = args.urgency ? (urgencyLabels[args.urgency] ?? args.urgency) : "No especificada"
    const scheduled = formatScheduledDate(args.scheduledDate, args.scheduledTime)
    const hasAppointment = args.scheduledDate != null && !!args.scheduledTime
    const subject = hasAppointment
      ? `Nueva cita agendada — ${areaLabel} — ${args.name}`
      : `Nueva consulta — ${areaLabel} — ${args.name}`
    const safeDescription = escapeHtml(args.description).replace(/\n/g, "<br>")
    const safeSubject = escapeHtml(args.subject)
    const safeName = escapeHtml(args.name)
    const safeRut = args.rut ? escapeHtml(args.rut) : undefined
    const safePhone = args.phone ? escapeHtml(args.phone) : undefined

    const text = [
      hasAppointment ? `NUEVA CITA AGENDADA` : `NUEVA CONSULTA RECIBIDA`,
      `─────────────────────────`,
      ``,
      `Cliente: ${args.name}`,
      `Email: ${args.email}`,
      args.phone ? `Teléfono: ${args.phone}` : null,
      args.rut ? `RUT: ${args.rut}` : null,
      ``,
      `Área: ${areaLabel}`,
      `Asunto: ${args.subject}`,
      `Modalidad: ${modalityLabel}`,
      `Urgencia: ${urgencyLabel}`,
      `Agendada: ${scheduled}`,
      ``,
      `Descripción del caso:`,
      args.description,
      ``,
      `─────────────────────────`,
      `ID: ${args.consultaId}`,
    ].filter(Boolean).join("\n")

    const html = [
      `<h2 style="color:#08186B;font-family:-apple-system,BlinkMacSystemFont,sans-serif">${hasAppointment ? "Nueva cita agendada" : "Nueva consulta recibida"}</h2>`,
      `<hr style="border:1px solid #E2E8F0">`,
      `<table style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;border-collapse:collapse">`,
      `<tr><td style="padding:6px 12px 6px 0;color:#64748B;font-weight:600">Cliente</td><td>${safeName}</td></tr>`,
      `<tr><td style="padding:6px 12px 6px 0;color:#64748B;font-weight:600">Email</td><td><a href="mailto:${args.email}">${args.email}</a></td></tr>`,
      args.phone ? `<tr><td style="padding:6px 12px 6px 0;color:#64748B;font-weight:600">Teléfono</td><td><a href="tel:${args.phone}">${safePhone}</a></td></tr>` : null,
      args.rut ? `<tr><td style="padding:6px 12px 6px 0;color:#64748B;font-weight:600">RUT</td><td>${safeRut}</td></tr>` : null,
      `<tr><td style="padding:6px 12px 6px 0;color:#64748B;font-weight:600">Área</td><td>${areaLabel}</td></tr>`,
      `<tr><td style="padding:6px 12px 6px 0;color:#64748B;font-weight:600">Asunto</td><td>${safeSubject}</td></tr>`,
      `<tr><td style="padding:6px 12px 6px 0;color:#64748B;font-weight:600">Modalidad</td><td>${modalityLabel}</td></tr>`,
      `<tr><td style="padding:6px 12px 6px 0;color:#64748B;font-weight:600">Urgencia</td><td>${urgencyLabel}</td></tr>`,
      `<tr><td style="padding:6px 12px 6px 0;color:#64748B;font-weight:600">Agendada</td><td>${scheduled}</td></tr>`,
      `</table>`,
      `<hr style="border:1px solid #E2E8F0">`,
      `<h3 style="color:#0F172A;font-family:-apple-system,BlinkMacSystemFont,sans-serif">Descripción del caso</h3>`,
      `<p style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;color:#334155;line-height:1.6">${safeDescription}</p>`,
      `<hr style="border:1px solid #E2E8F0">`,
      `<p style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:11px;color:#94A3B8">ID: ${args.consultaId}</p>`,
    ].filter(Boolean).join("\n")

    try {
      const { data, error } = await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: notificationTargets,
        replyTo: args.email,
        subject,
        html,
        text,
      })

      if (error) {
        console.error("Resend error:", error)
      } else {
        console.log("Email notification sent:", data?.id)
      }
    } catch (err) {
      console.error("Failed to send email notification:", err)
    }
  },
})
