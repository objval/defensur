# Stitch Prompt — "Mis Consultas" Page

> **Design brief / historical reference.** Current implementation and constraints live in `AGENTS.md` and `DESIGN.md`; do not treat this prompt as a backend or authorization specification.

> Paste this into Stitch AI or any design-to-code tool.
> Brand: Defensur Araucanía (Chilean law firm). Spanish (es_CL). Light mode only.

---

Build a "Mis Consultas" management page for a Chilean law firm dashboard. Next.js 16 App Router + Tailwind CSS. Light-mode only (white backgrounds). The page lives at `/panel/consultas` inside a dashboard with a 240px sidebar on the left.

─── BRAND ────────────────────────────────────────────
- Primary: #08186B (navy) — brand-navy
- Accent: #3FADFE (sky blue) — brand-sky
- Background: #FFFFFF
- Card: #FFFFFF with border #E2E8F0
- Text: #0F172A (foreground), #64748B (muted)
- Muted bg: #F1F5F9
- Fonts: Noto Serif (headings), Manrope (body)
- Border radius: rounded-xl (12px) for cards, rounded-lg (8px) for buttons/inputs

─── STATUS COLORS ────────────────────────────────────
- Pendiente: amber bg-amber-100 text-amber-800
- En revisión: blue bg-blue-100 text-blue-800
- Respondida: green bg-green-100 text-green-800
- Cerrada: gray bg-gray-100 text-gray-600
- Cancelada: red bg-red-100 text-red-700

─── LAYOUT ───────────────────────────────────────────
- Full-width (no max-width constraint) — uses all available space after sidebar
- Page header: "Mis Consultas" title + count + "Nueva consulta" button (right-aligned)
- Below header: search bar + filter chips row (full width)
- Below filters: either a TABLE view (desktop) or CARD view (mobile/tablet)

─── SEARCH & FILTERS ─────────────────────────────────
Row 1 — Search bar (full width):
- Magnifying glass icon on the left
- Placeholder: "Buscar por asunto, descripción o área..."
- Clear button (X) when text is entered
- Real-time filtering (no submit button needed)

Row 2 — Filter chips + sort (full width, flex wrap):
- Filter by status: Todos (active default) | Pendientes | En revisión | Respondidas | Cerradas | Canceladas
- Filter by area: Todos | Laboral | Familia | Civil | Insolvencia | Sumarios
- Sort dropdown (right-aligned): Más recientes | Más antiguos | Urgencia (alta primero)
- Active filters shown as removable chips below the search bar

─── TABLE VIEW (desktop ≥768px) ──────────────────────
Classic table with columns:
- Asunto (subject) — bold, truncate long text
- Área — colored badge/tag
- Urgencia — Alta 🔴 / Media 🟡 / Baja ⚪ with color indicator
- Fecha — relative time ("Hace 2 horas", "Ayer", "12 jul")
- Estado — status badge with color
- Archivos — paperclip icon + count if > 0
- Acciones — expand button (chevron)

Table features:
- Clicking a row expands an inline detail panel below it (smooth animation)
- Sortable by clicking column headers
- Hover: row highlights with muted background
- Zebra striping: alternate rows slightly different bg
- Sticky header row

Expandable detail panel (shows below the clicked row):
- Full description text (no truncation)
- Attached files: grid of file cards with type icon, name, size, download button
- Comments/responses: list with author + date + text
- "Añadir comentario" input + send button
- "Cancelar consulta" button (only if status = pendiente) → confirmation modal

─── CARD VIEW (mobile <768px) ────────────────────────
Stack of cards instead of table:
- Each card: subject (bold), area + urgency badges, status badge (top-right), date, description preview (2 lines), expand button
- Tap to expand → full detail panel
- Same expandable content as table detail panel

─── EMPTY STATES ─────────────────────────────────────
- No consultas at all → centered illustration (FileText icon), "No tienes consultas aún", CTA button
- No results for search/filter → "No se encontraron consultas" with clear filters button
- Loading → skeleton table (6 rows with pulsing placeholders)
- Error → red banner with retry button

─── CONFIRMATION MODAL (Cancelar consulta) ───────────
- Overlay: fixed inset-0 bg-black/50
- Card: white, rounded-xl, max-w-sm, centered
- Warning triangle icon (red), "Cancelar consulta" title, "Esta acción no se puede deshacer" subtitle
- Buttons: "Volver" (outline) + "Sí, cancelar" (red bg)

─── INTERACTIONS ─────────────────────────────────────
- Search: filters as you type (client-side, instant)
- Status filter chips: click to select, click again to deselect (or "Todos" to reset)
- Area filter: dropdown or chips
- Sort: changes order immediately
- Row expand: smooth height animation (framer-motion)
- File download: click fetches signed URL, triggers browser download
- Comment: inline input, Enter or send button submits
- Cancel: opens modal, confirmation triggers mutation, row updates optimistically

─── ANIMATIONS ───────────────────────────────────────
- Table rows: subtle fade-in stagger on load
- Detail panel expand: height auto + opacity, 0.25s ease
- Filter chips: scale on click
- Search clear: fade out/in
- Modal: overlay fade + card scale 0.95→1
- Loading skeletons: pulse animation
- Empty state: fade + slide up

─── EDGE CASES ───────────────────────────────────────
- Very long subject text → truncate with ellipsis, tooltip on hover
- Many files → horizontal scroll or wrap
- Many comments → scrollable container with max-height
- Network error on download → toast notification
- Concurrency: disable cancel button while mutation is in flight
- Rapid expand/collapse → debounce animation
- Zero results after filter → clear empty state
- Screen reader: table has proper aria labels, expandable rows announce state

─── COMPONENT STRUCTURE (reusable) ───────────────────
Create these as separate components for easy reuse:
1. `ConsultasTable` — desktop table with expandable rows
2. `ConsultasCards` — mobile card stack
3. `ConsultaDetailPanel` — expandable content (description, files, comments, actions)
4. `ConsultasFilters` — search bar + status chips + area dropdown + sort
5. `ConfirmCancelModal` — cancellation confirmation dialog
6. `FileAttachmentRow` — single file display with download
7. `CommentThread` — list of comments + add form

─── ICONS (lucide-react) ─────────────────────────────
Search, X, Filter, ChevronDown, ChevronUp, Clock, FileText, Image, Download, Send, MessageSquare, AlertTriangle, ArrowUpDown, SlidersHorizontal, RotateCcw, Plus, Eye, Trash2

─── WHAT NOT TO DO ───────────────────────────────────
- No dark mode classes
- No glassmorphism
- No AI-slop decorations (radial dots, blur orbs, gradient glows)
- No hardcoded data — use props/state
- No inline styles — use Tailwind classes
- No `<table>` without proper responsive wrapping (overflow-x-auto)
