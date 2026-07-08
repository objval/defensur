Build a dashboard for a Chilean law firm called "Defensur Araucanía" using Next.js 16 App Router + Tailwind CSS. The dashboard lives at /panel and has a sidebar navigation. It's light-mode only (white backgrounds, no dark mode).

─── BRAND ────────────────────────────────────────────
- Logo: /logo.png (blue #0F2585, transparent bg)
- Fonts: Noto Serif (headings), Manrope (body), Geist Mono (code)
- Spanish (es_CL) — use "tú" forms, not Argentinian voseo

─── COLORS ───────────────────────────────────────────
- Primary: #08186B (navy) — bg-brand-navy, text-brand-navy
- Accent: #3FADFE (sky blue) — text-brand-sky, focus rings
- Background: #FFFFFF (white)
- Foreground: #0F172A (near-black text)
- Card surface: #FFFFFF with border #E2E8F0
- Muted bg: #F1F5F9, Muted text: #64748B

─── STATUS COLORS ────────────────────────────────────
- Pendiente: amber (bg-amber-100, text-amber-800)
- En revisión: blue (bg-blue-100, text-blue-800)
- Respondida: green (bg-green-100, text-green-800)
- Cerrada: gray (bg-gray-100, text-gray-600)
- Cancelada: red (bg-red-100, text-red-700)

─── SIDEBAR ──────────────────────────────────────────
- Width: 240px, collapsible to 64px
- Logo at top, nav items with lucide-react icons
- Active item: bg-brand-navy/10 + text-brand-navy
- Inactive: text-muted-foreground, hover:bg-muted
- Bottom: UserButton (from Clerk) + collapse toggle (ChevronLeft, rotates 180°)
- Nav items: Dashboard (LayoutDashboard), Consultas (MessageSquare), Documentos (FileText), Configuración (Settings)
- Mobile: hamburger menu that opens slide-out drawer with overlay

─── LAYOUT ───────────────────────────────────────────
- Main content: no max-width constraint, fluid
- Cards center themselves at max-w-4xl
- Padding: p-4 mobile, p-6 tablet, p-8 desktop
- Gap between cards: space-y-3
- Cards: rounded-2xl, border, bg-white, p-5 header, px-5 pb-5 body

─── COMPONENTS NEEDED ────────────────────────────────

1. CONSULTAS LIST PAGE (/panel/consultas)
- Real-time data from Convex backend (useQuery)
- Clickable cards that expand with framer-motion animation
- First click: show description preview (line-clamp-3)
- Second click: full description with "Leer menos"
- Third click: collapse
- Each card shows: subject, status badge, date, area tag, file count, comment count
- Expanded card shows:
  - Full description
  - Attached files grid with download buttons (PDFs show FileText icon, images show Image icon)
  - Comments/responses section with author name + date
  - "Añadir comentario" inline input + send button
  - "Cancelar consulta" button (only when status=pending) → opens confirmation modal
- Cancel modal: overlay (bg-black/50), white card with warning icon, "Cancelar consulta" title, "Esta acción no se puede deshacer" subtitle, Volver + Sí cancelar buttons
- Empty state: centered FileText icon + "No tienes consultas" + CTA button to /panel/consultas/nueva
- Loading state: centered spinner (animate-spin, brand-navy border)

2. NUEVA CONSULTA PAGE (/panel/consultas/nueva)
- 3-step visual indicator at top:
  - Step 1 (Datos) → Step 2 (Evidencia) → Step 3 (Enviar)
  - Active step: bg-brand-navy text-white rounded-full
  - Inactive: bg-muted text-muted-foreground
  - Connectors: h-px bg-border
- Step 1 — Form fields:
  - Área legal (select): Laboral, Familia, Civil, Insolvencia, Sumarios
  - Asunto (text input)
  - Describe tu caso (textarea, 6 rows)
  - Nivel de urgencia (3 radio cards in a row):
    - Baja — Informativa
    - Media — Necesito respuesta esta semana
    - Alta — Situación urgente
    Selected: border-brand-sky bg-brand-sky/5 with blue dot
  - Continue button → goes to step 2
- Step 2 — File upload:
  - Drag-and-drop zone: dashed border-2, Upload icon, "Arrastra archivos aquí" text, "PDF, JPG, PNG, DOCX — máximo 10MB"
  - Click to open file picker
  - Drag-over state: border-brand-sky bg-brand-sky/5
  - Selected files list: each row shows file icon (Image for images, FileText for docs), file name, file size, X remove button
  - File preview: image thumbnails for images (h-10 w-10 rounded object-cover)
  - Upload progress: Loader2 spinner per file during upload
  - Volver + Enviar consulta buttons
- Validation: all fields required, min 5 chars subject, min 20 chars description

3. DASHBOARD PAGE (/panel)
- 3 quick-action cards in a grid (sm:2 lg:3):
  - Nueva consulta (Plus icon, navy bg on hover)
  - Mis consultas (MessageSquare icon)
  - Documentos (FileText icon, coming soon, opacity-50)

─── CONVEX BACKEND ───────────────────────────────────
- Use Convex for real-time data (useQuery, useMutation)
- consultas table: userId, area, subject, description, urgency, status, files[], responses[], timestamps
- Files stored in Convex Storage (generateUploadUrl + fetch upload)

─── AUTH ─────────────────────────────────────────────
- Clerk auth (already configured)
- auth.protect() in panel layout → redirects to /sign-in
- Google OAuth as primary sign-in method

─── ANIMATIONS ───────────────────────────────────────
- Card expand: framer-motion height auto + opacity, 0.25s easeInOut
- Chevron: rotate 180° on expand, 0.2s duration
- Modal: overlay fade + card scale 0.95→1
- Hover: border-color transitions (200ms)
- Respects prefers-reduced-motion (useReducedMotion)

─── EDGE CASES ───────────────────────────────────────
- Empty consultas list → clean empty state
- Loading → spinner
- Error → red banner with error message
- File too large (>10MB) → validation error
- Wrong file type → validation error
- Network failure → try/catch with error display
- Cancel only when status=pendiente
- Comments only on own consultas

─── ICONS ────────────────────────────────────────────
Use lucide-react: LayoutDashboard, MessageSquare, FileText, Settings, ChevronDown, ChevronLeft, Menu, X, Plus, Send, Upload, Download, Image, Clock, ArrowRight, AlertTriangle, Loader2, ExternalLink, Paperclip (custom SVG), Check, Trash2

─── KEY CLASSES ──────────────────────────────────────
- Card: rounded-2xl border border-border bg-card
- Primary button: rounded-lg bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy/90
- Input: rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/20
- Badge: rounded-full border px-2.5 py-0.5 text-xs font-medium
- Page title: font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground

Make it look premium, clean, and professional — like a modern SaaS dashboard. No dark mode, no glassmorphism, no AI-slop decorative patterns (no radial dots, no blur orbs, no gradient glows). Clean white cards with subtle borders and navy accents.
