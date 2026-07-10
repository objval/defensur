# Defensur Panel — Feature Roadmap

> **Historical roadmap.** The baseline statements here are dated 2026-07-09. Admin-wide consulta visibility, toast feedback, and bulk operations have since been implemented; revalidate every remaining item before scheduling it.

> 2026-07-09. Post-refactor. Panel is clean: single-responsibility components, full-width layout, real Convex data, 0 `any` types.

---

## Quick Wins (~20 min each)

### 1. Admin dashboard — staff sees ALL consultas
**Now:** Dashboard and consultas page use `listMine` — you only see your own.
**Fix:** Admin/staff users should see all consultas via `admin.listAll`. Add a role check — if `role !== "client"`, use `admin.listAll` instead. Add filter by user in the toolbar.

### 2. Toast notifications
**Now:** No feedback when creating/canceling consultas beyond the redirect.
**Add:** `sonner` toast library (`npm install sonner`). Show "Consulta creada" on success, "Error al crear" on failure. Add `<Toaster />` to layout.

### 3. Expedientes page (unlock "pronto")
**Now:** "Expedientes" nav item is disabled.
**Add:** A simple document list page at `/panel/expedientes`. Show all files uploaded across consultas grouped by consulta. Reuse `FileDropZone` for new uploads.

### 4. Skeleton polish & empty states
**Now:** Basic pulse skeletons, one empty state per page.
**Add:** Proper shimmer skeletons matching card shapes. Different empty states for "no data yet" vs "filters returned nothing" vs "no access".

---

## Medium Effort (~1 hr each)

### 5. Consulta detail page
**Now:** Clicking a consulta expands an inline panel. Can't share a link to a specific consulta.
**Add:** `/panel/consultas/[id]` route. Full page layout with description, files grid, comment thread, status timeline, actions. Breadcrumb: Panel → Consultas → [Subject].

### 6. Bulk actions
**Now:** One consulta at a time via expand/detail.
**Add:** Checkbox selection mode. Bulk actions: "Cambiar estado", "Asignar a", "Exportar seleccionados". `Shift+click` range select.

### 7. Staff assignment
**Now:** No concept of staff assignment.
**Add:** `assignedTo` field on consultas. Staff dropdown in admin view. Assign consulta to a specific lawyer. Email notification on assignment.

### 8. Search + filter persistence
**Now:** Filters reset on page navigation.
**Add:** Save filter state to URL search params (`?status=pendiente&area=laboral`). Shareable filtered views. Browser back button restores filters.

---

## Big Features (~2-3 hrs each)

### 9. Real-time status updates (Convex subscriptions)
**Now:** Queries refetch on mutation but no push notifications in the UI.
**Add:** Live-updating consulta list — when a staff member changes status, the client sees it instantly. Convex already does realtime, we just need optimistic updates and a "Nuevo mensaje" indicator.

### 10. Email notifications (Resend + Convex scheduled functions)
**Now:** No email integration.
**Add:** `npm install resend`. When status changes or staff responds, send email to client. Use Convex `internalAction` + scheduled functions for reliable delivery. Templates: "Tu consulta fue recibida", "Nueva respuesta", "Consulta cerrada".

### 11. Audit log
**Now:** No history of who did what.
**Add:** `audit_log` table in Convex. Log every status change, assignment, comment. Show timeline on consulta detail page: "Nico creó la consulta" → "Abogado asignado" → "Estado cambiado a En revisión".

### 12. Analytics dashboard
**Now:** 4 basic metric cards on dashboard.
**Add:** Charts (recharts). "Consultas por mes", "Áreas más consultadas", "Tiempo promedio de respuesta", "Urgencia distribuida". Staff-only section at `/panel/analytics`.

### 13. Mobile app shell (PWA)
**Now:** Responsive but no offline support.
**Add:** `next-pwa`. Service worker, install prompt, offline cache. Bottom tab bar on mobile (Dashboard / Consultas / Nueva / Notificaciones / Perfil).

---

## Pipeline (future)

| ID | Feature | Depends on |
|----|---------|-----------|
| R1 | Role-based sidebar (hide admin links from clients) | #1 |
| R2 | File preview modal (zoom images, flip PDF pages) | #3 |
| R3 | Convex vector search for consultas (semantic) | #8 |
| R4 | WhatsApp webhook — create consultas from WhatsApp messages | Twilio API |
| R5 | Multi-language (es_CL ↔ en) | i18n setup |
| R6 | Dark mode toggle | Tailwind dark: classes |
| R7 | Clerk Organizations — multi-firm support | Clerk Orgs |
| R8 | Export consulta as PDF (with header/footer/logo) | #5 |

---

## Recommended Order

```
Week 1:  #1 (Admin dashboard) + #2 (Toasts) + #4 (Skeletons)
Week 2:  #5 (Detail page) + #7 (Staff assignment)
Week 3:  #8 (URL filter persistence) + #10 (Email notifications)
Week 4:  #9 (Realtime updates) + #11 (Audit log)
```

**Start with #1 + #2** — they make the biggest UX difference for the least effort. ¿Procedo con el roadmap final? ¿O querís priorizar algo específico?
