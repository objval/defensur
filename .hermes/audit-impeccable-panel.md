# Panel Dashboard — Impeccable Design Audit

> **Historical audit.** This is a 2026-07-09 snapshot. Its refactor recommendations and line counts are superseded where they conflict with `AGENTS.md` or current code.

> 2026-07-09. 7 panel files, 1,836 total lines.

---

## Findings

### 1. Giant monolith files

| File | Lines | Severity |
|------|-------|----------|
| `app/panel/consultas/page.tsx` | 547 | 🔴 Critical |
| `components/panel/consulta-form.tsx` | 470 | 🔴 Critical |

Both mix UI, state, logic, and sub-components in one file. Should be split into composable pieces.

### 2. Duplicated constants & helpers

| Pattern | Files | Locations |
|---------|-------|-----------|
| `STATUS` color map | `page.tsx` + `consultas/page.tsx` | Copied verbatim (30 lines each) |
| `timeAgo()` | `page.tsx` + `consultas/page.tsx` | Identical 7-line function |
| `AREA_LABELS` | `consulta-form.tsx` | Should use `lib/services-data.ts` |

**Fix:** Move to `lib/panel-constants.ts`. Import once, use everywhere.

### 3. `any` type escapes

| File | Count | Lines |
|------|-------|-------|
| `consultas/page.tsx` | 2 | `cancelConsulta({ id: cancelTarget as any })`, `addNote({ id: expanded as any, text })` |

**Fix:** Add proper `Id<"consultas">` type from Convex's generated types.

### 4. No AI-slop patterns detected

✅ No backdrop-blur, no radial gradients, no blur orbs, no glass UI
✅ No competing layout wrappers (consultas page fixed earlier)
✅ No dark: classes
✅ Correct status color tokens from template
✅ No rounded-2xl (all corrected to rounded-xl earlier)

### 5. Small wins

| Issue | Fix |
|-------|-----|
| `consulta-form.tsx` imports `FileText` + `Image` from lucide but also has a custom SVG `Paperclip` — just use lucide's `Paperclip` | Delete custom SVG |
| `Download` button in list uses manual `document.createElement("a")` instead of next/navigation | Use `window.open()` or a proper download util |
| `AREA_LABELS` hardcoded in consulta form is a copy of `lib/consulta-schema.ts` | Import from schema |

---

## Proposed Action

| Phase | Items | Time |
|-------|-------|------|
| **1 (quick)** | #2 Duplicated constants → `lib/panel-utils.ts` + #3 Fix `any` types + #5 Small wins | 20 min |
| **2** | #1 Split consultas page: `ConsultasToolbar`, `ConsultasList`, `ConsultaCard`, `ConsultaDetail`, `CancelModal` | 40 min |
| **3** | #1 Split consulta form: `FileDropZone`, `FilePreview`, `StepIndicator`, `UrgencySelector` | 30 min |

¿Procedo con la Fase 1?
