# DESIGN.md — Defensur Dashboard Design System

> Light-mode only. Generated 2026-07-09. Target: shadcn/ui + Tailwind v4 tokens.
> Pass this to any design tool or developer to maintain visual consistency.

---

## 1. Brand Identity

| Token | Value | Usage |
|-------|-------|-------|
| **Brand name** | Defensur Araucanía | Full legal name |
| **Short name** | Defensur | Nav, footer, panel sidebar |
| **Logo** | `/logo.png` (PNG, blue #0F2585 on transparent) | All surfaces |
| **Domain** | defensuraraucania.cl | Primary domain |

---

## 2. Color System

### 2.1 Brand Colors

| Token | Hex | Tailwind | Role |
|-------|-----|----------|------|
| `brand-navy` | `#08186B` | `bg-brand-navy` | Primary actions, nav backgrounds, hero sections |
| `brand-sky` | `#3FADFE` | `text-brand-sky` | Links, WhatsApp CTAs, focus rings, active states |
| `brand-red` | `#CF2E2E` | — | Logo dot accent, destructive actions, error states |

```
┌─────────────────────────────────────────────────────────┐
│  brand-navy          brand-sky            brand-red     │
│  ████████████████    ████████████████    ██████████████ │
│  #08186B             #3FADFE             #CF2E2E        │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Semantic Colors (Light Mode)

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `background` | `#FFFFFF` | `bg-background` | Page background |
| `foreground` | `#0F172A` | `text-foreground` | Primary text |
| `card` | `#FFFFFF` | `bg-card` | Card surfaces |
| `border` | `#E2E8F0` | `border-border` | Card borders, dividers |
| `muted` | `#F1F5F9` | `bg-muted` | Secondary backgrounds, hover states |
| `muted-foreground` | `#64748B` | `text-muted-foreground` | Secondary text, labels, placeholders |
| `primary` | `#08186B` | `text-primary` | Active nav items, emphasis text |

```
┌──────────────────────────────────────────────────────────┐
│  SEMANTIC HIERARCHY (light mode)                        │
│                                                         │
│  background  ── white page surface                      │
│  card        ── white elevated cards with border        │
│  muted       ── gray-50 secondary backgrounds           │
│  border      ── gray-200 separators                     │
│                                                         │
│  foreground  ── gray-900 primary text                   │
│  muted-fg    ── gray-500 secondary text                 │
│  primary     ── navy-800 emphasis/active                │
└──────────────────────────────────────────────────────────┘
```

### 2.3 Status Colors

| Status | Background | Text | Border | Dot |
|--------|-----------|------|--------|-----|
| `pendiente` | `bg-amber-100` | `text-amber-800` | `border-amber-200` | `bg-amber-500` |
| `en_revision` | `bg-blue-100` | `text-blue-800` | `border-blue-200` | `bg-blue-500` |
| `respondida` | `bg-green-100` | `text-green-800` | `border-green-200` | `bg-green-500` |
| `cerrada` | `bg-gray-100` | `text-gray-600` | `border-gray-200` | `bg-gray-400` |
| `cancelada` | `bg-red-100` | `text-red-700` | `border-red-200` | `bg-red-400` |

---

## 3. Typography

### 3.1 Font Stack

| CSS Variable | Font | Fallback | Usage |
|-------------|------|----------|-------|
| `--font-heading` | Noto Serif | `serif` | All h1–h6, logo wordmark, panel title |
| `--font-sans` | Manrope (300-700) | `sans-serif` | Body, nav, buttons, labels, inputs |
| `--font-mono` | Geist Mono | `monospace` | Code blocks only |

### 3.2 Type Scale (Dashboard)

| Level | Class | Size/Weight | Usage |
|-------|-------|-------------|-------|
| Page title | `font-[family-name:var(--font-heading)] text-2xl font-bold` | 24px / 700 | Page H1 |
| Card title | `font-semibold text-foreground` | 16px / 600 | Card headings |
| Body | `text-sm text-foreground/80` | 14px / 400 | Card body text |
| Label | `text-xs font-semibold uppercase tracking-wider text-muted-foreground` | 12px / 600 | Section labels |
| Meta | `text-xs text-muted-foreground` | 12px / 400 | Dates, counts, secondary info |
| Badge | `text-xs font-medium` | 12px / 500 | Status badges |

---

## 4. Spacing & Layout

### 4.1 Panel Shell

```
┌──────────────────────────────────────────────────────────────┐
│  ┌──────────┬───────────────────────────────────────────────┐│
│  │ Sidebar  │  Main Content                                 ││
│  │          │                                               ││
│  │ w-60     │  p-4 md:p-6 lg:p-8                            ││
│  │ (240px)  │  fluid width, no max-width constraint         ││
│  │          │                                               ││
│  │ collapsed│  Content cards: max-w-4xl mx-auto             ││
│  │ w-16     │                                               ││
│  └──────────┴───────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────┘
```

- **Sidebar**: `w-60` (240px), collapses to `w-16` (64px) via toggle
- **Content**: no `max-w-*` — cards handle their own width constraints
- **Card container**: `max-w-4xl mx-auto` (896px) on content lists
- **Mobile**: Sidebar becomes slide-out drawer with overlay

### 4.2 Gap Scale

| Context | Class | Value |
|---------|-------|-------|
| Between cards | `space-y-3` | 12px |
| Between sections | `space-y-5` or `space-y-6` | 20-24px |
| Page header to content | `space-y-6` or `space-y-8` | 24-32px |
| Inline gaps (row) | `gap-2`, `gap-3`, `gap-4` | 8-16px |
| Form fields | `space-y-5` | 20px |

### 4.3 Border Radius

| Element | Class | Value |
|---------|-------|-------|
| Cards | `rounded-2xl` | 16px |
| Buttons | `rounded-lg` | 8px |
| Inputs/selects | `rounded-lg` | 8px |
| Badges | `rounded-full` | 9999px |
| Modals | `rounded-2xl` | 16px |
| Sidebar nav items | `rounded-lg` | 8px |
| File thumbnails | `rounded` | 4px |

---

## 5. Component Tokens

### 5.1 Card

```
┌─────────────────────────────────────────────────────────┐
│  .card                                                  │
│  rounded-2xl border border-border bg-card               │
│  p-5 (header) / px-5 pb-5 (body)                        │
│                                                         │
│  Hover: border-brand-sky/30 shadow-sm                   │
│  Expanded: border-brand-sky/30 shadow-sm                │
└─────────────────────────────────────────────────────────┘
```

```css
/* Expanded card */
.card-expanded {
  @apply rounded-2xl border border-brand-sky/30 bg-card shadow-sm;
}

/* Collapsed card */
.card-collapsed {
  @apply rounded-2xl border border-border bg-card;
  &:hover { @apply border-muted-foreground/20; }
}
```

### 5.2 Badge

```
┌──────────────┐
│  Pendiente   │  ← rounded-full border px-2.5 py-0.5
└──────────────┘     text-xs font-medium
                     {status.color}
```

### 5.3 Button Variants

| Variant | Classes | Usage |
|---------|---------|-------|
| **Primary** | `bg-brand-navy text-white hover:bg-brand-navy/90 rounded-lg px-4 py-2 text-sm font-medium` | Main actions, submit, CTA |
| **Secondary** | `border border-border text-foreground hover:bg-muted rounded-lg px-4 py-2 text-sm font-medium` | Cancel, back, secondary actions |
| **Ghost** | `text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg p-1.5` | Icon buttons, close |
| **Destructive** | `bg-red-600 text-white hover:bg-red-700 rounded-lg px-4 py-2 text-sm font-medium` | Delete, cancel consulta |
| **Destructive outline** | `border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-medium rounded-lg px-3 py-1.5` | Cancel action on card |
| **Disabled** | `opacity-50 pointer-events-none` | Coming soon, inactive states |

### 5.4 Input Fields

```
┌──────────────────────────────────────────────────────────┐
│  Placeholder text...                                     │
└──────────────────────────────────────────────────────────┘
```

```css
.input {
  @apply w-full rounded-lg border border-border bg-background px-4 py-2.5;
  @apply text-foreground placeholder:text-muted-foreground;
  @apply focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/20;
  
  /* Sizes */
  &.input-sm { @apply px-3 py-2 text-sm; }
  &.input-lg { @apply px-4 py-3; }
  
  /* Variants */
  &.input-error { @apply border-red-300 bg-red-50; }
}
```

### 5.5 Drop Zone (File Upload)

```
┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│                                                    │
│              ↑ Upload icon                         │
│    Arrastra archivos aquí o haz clic               │
│    PDF, JPG, PNG, DOCX — máximo 10MB               │
│                                                    │
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

```css
.drop-zone {
  @apply flex cursor-pointer flex-col items-center justify-center gap-3;
  @apply rounded-xl border-2 border-dashed border-border p-8;
  @apply hover:border-muted-foreground/30;
}

.drop-zone-active {
  @apply border-brand-sky bg-brand-sky/5;
}
```

### 5.6 File Preview (attached file row)

```
┌─────────────────────────────────────────────────────────┐
│  [icon]  filename.pdf                        [download] │
│          245 KB                                         │
└─────────────────────────────────────────────────────────┘
```

```css
.file-row {
  @apply flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5;
}
.file-icon {
  @apply flex h-9 w-9 shrink-0 items-center justify-center rounded bg-brand-navy/5;
}
```

### 5.7 Modal (Confirmation Dialog)

```
┌────────────────────────────────────────────┐
│  [⚠]  Cancelar consulta                    │
│       Esta acción no se puede deshacer     │
│                                            │
│              [Volver]  [Sí, cancelar]      │
└────────────────────────────────────────────┘
```

```css
.modal-overlay {
  @apply fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4;
}
.modal-card {
  @apply w-full max-w-sm rounded-2xl bg-card p-6 shadow-xl border border-border;
}
```

### 5.8 Step Indicator

```
┌──────────────────────────────────────────────────────────┐
│  (1) Datos ──────── (2) Evidencia ──────── (3) Enviar    │
│  [active]           [active/files]          [disabled]    │
└──────────────────────────────────────────────────────────┘
```

```css
.step-active {
  @apply bg-brand-navy text-white rounded-full px-4 py-1.5 text-sm font-medium;
}
.step-inactive {
  @apply bg-muted text-muted-foreground rounded-full px-4 py-1.5 text-sm font-medium;
}
.step-connector {
  @apply h-px flex-1 bg-border;
}
```

---

## 6. Animation Tokens

### 6.1 Card Expand/Collapse

```tsx
// framer-motion
<motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: "auto", opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.25, ease: "easeInOut" }}
/>
```

### 6.2 Chevron Rotation

```tsx
<motion.div
  animate={{ rotate: isExpanded ? 180 : 0 }}
  transition={{ duration: 0.2 }}
/>
```

### 6.3 Modal Entrance

```tsx
// Overlay
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

// Card
<motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} />
```

### 6.4 Scroll Reveal (public pages only)

```tsx
// components/ui/reveal.tsx
// Fade + slide up on scroll-in, 0.5s duration, 0.1s stagger
// Respects prefers-reduced-motion
```

### 6.5 Spinner

```
┌─────────────────────┐
│  animate-spin        │  ← 2px border, brand-navy
│  h-8 w-8             │     border-t-transparent
│  rounded-full        │
└─────────────────────┘
```

---

## 7. Icon Usage

### 7.1 Icon Library

**lucide-react** — all icons. Size scale:

| Context | Class | Size |
|---------|-------|------|
| Nav items | `h-4 w-4` | 16px |
| Card metadata | `h-3 w-3` | 12px |
| Section icons | `h-5 w-5` | 20px |
| Hero/empty state | `h-12 w-12` | 48px |
| Button icons | `h-4 w-4` | 16px |
| Modal alert | `h-5 w-5` | 20px |

### 7.2 Icon Mapping

| Semantic | Icon | Usage |
|----------|------|-------|
| Dashboard | `LayoutDashboard` | Nav |
| Consultas | `MessageSquare` | Nav |
| Documents | `FileText` | Nav, PDF files |
| Settings | `Settings` | Nav |
| Upload | `Upload` | Drop zone |
| Download | `Download` | File download |
| Image | `Image` | Image files |
| Remove | `X` | Remove file, close |
| Check | `Check` | Confirmation |
| Warning | `AlertTriangle` | Modal |
| Expand | `ChevronDown` | Card toggle |
| Collapse | `ChevronLeft` | Sidebar toggle |
| Hamburger | `Menu` | Mobile nav |
| Add | `Plus` | New consulta |
| Send | `Send` | Submit note |
| Spinner | `Loader2` | Loading states |
| Clock | `Clock` | Dates |
| Arrow | `ArrowRight` | CTAs |
| External | `ExternalLink` | External links |
| Paperclip | Custom SVG | File count |

---

## 8. Form Patterns

### 8.1 Field Layout

```
┌─────────────────────────────────────────────────────────┐
│  Label *                                                │
│  ┌─────────────────────────────────────────────────────┐│
│  │  Input value...                                     ││
│  └─────────────────────────────────────────────────────┘│
│  Error message (red, 14px)                              │
└─────────────────────────────────────────────────────────┘
```

```css
.form-field {
  @apply space-y-2;
}
.form-label {
  @apply block text-sm font-medium text-foreground;
}
.form-error {
  @apply text-sm text-red-500;
}
```

### 8.2 Radio Group (Urgency)

```
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ ○ Baja           │ │ ● Media          │ │ ○ Alta           │
│   Informativa    │ │   Esta semana    │ │   Urgente        │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

```css
.radio-option {
  @apply flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors;
}
.radio-selected {
  @apply border-brand-sky bg-brand-sky/5;
}
.radio-unselected {
  @apply border-border hover:border-muted-foreground/30;
}
```

### 8.3 Inline Note Input

```
┌──────────────────────────────────────────────────┬──────┐
│  Añadir un comentario...                         │ [→]  │
└──────────────────────────────────────────────────┴──────┘
```

```css
.note-input {
  @apply flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm;
  @apply placeholder:text-muted-foreground;
  @apply focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/20;
}
```

---

## 9. Sidebar Navigation

```
┌──────────────────────┐
│  [logo] Panel        │  ← Collapsed: logo only, centered
│──────────────────────│
│  [icon] Dashboard    │  ← Active: bg-brand-navy/10 text-brand-navy
│  [icon] Consultas    │  ← Inactive: text-muted-foreground
│  [icon] Documentos   │     hover:bg-muted hover:text-primary
│  [icon] Configuración│
│──────────────────────│
│                      │
│                      │
│──────────────────────│
│  [◀ collapse]        │  ← Desktop only, rotates 180° when collapsed
│──────────────────────│
│  [👤] Mi cuenta      │  ← UserButton component
└──────────────────────┘
```

```css
.nav-item {
  @apply flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors;
}
.nav-active {
  @apply bg-brand-navy/10 text-brand-navy;
}
.nav-inactive {
  @apply text-muted-foreground hover:bg-muted hover:text-primary;
}
.nav-collapsed {
  @apply justify-center px-0;
}
```

---

## 10. Responsive Breakpoints

| Breakpoint | Width | Sidebar | Content Padding |
|-----------|-------|---------|-----------------|
| Mobile | < 768px | Slide-out drawer | `p-4` |
| Tablet | ≥ 768px | Visible, w-60 | `p-6` |
| Desktop | ≥ 1024px | Visible, collapsible | `p-8` |

### Mobile Nav (top bar)

```
┌────────────────────────────────────┐
│  [☰]          [logo]         [👤]  │
└────────────────────────────────────┘
```

- Hamburger opens slide-out sidebar
- Logo centered
- UserButton right-aligned
- 56px height, border-bottom

---

## 11. Accessibility

- All interactive elements: `focus:outline-none focus:ring-2 focus:ring-brand-sky/20`
- Animations: `prefers-reduced-motion` respected (framer-motion `useReducedMotion()`)
- Color contrast: minimum 4.5:1 for text (navy on white = 13.4:1, gray on white = 5.9:1)
- Modals: focus trapped, Escape closes, click-outside closes
- Touch targets: minimum 44×44px for mobile interactive elements
- Forms: all inputs have associated labels, error messages linked via aria

---

## 12. Quick Reference (Tailwind Classes)

```css
/* Card */
.card { @apply rounded-2xl border border-border bg-card; }

/* Primary button */
.btn-primary { @apply rounded-lg bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy/90; }

/* Input */
.input { @apply w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/20; }

/* Badge */
.badge { @apply rounded-full border px-2.5 py-0.5 text-xs font-medium; }

/* Page title */
.page-title { @apply font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground; }

/* Section label */
.section-label { @apply text-xs font-semibold uppercase tracking-wider text-muted-foreground; }
```
