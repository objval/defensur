# Defensur — Audit & Refactor Plan

> Audit basado en `/impeccable-design-principles` + análisis estructural del codebase.
> `app/` = 13 páginas, `components/` = 23 archivos, `lib/` = 2 archivos ([REDACTED]). Total ≈ 5,400 líneas TSX/TS.

---

## 🔴 Critical Issues (Fix Now)

### 1. Phone number still masked in 2 files
`+569****7355` persiste en:
- `components/defensur-home-hero.tsx:49` — `href="tel:+569****7355"` (el link no funciona)
- `components/schema-org.tsx:32` — `telephone: "+569****7355"` (Schema.org tiene el número enmascarado)

**Fix:** Reemplazar con `+56959937355` en ambos archivos. 1 línea cada uno.

### 2. `dark:` classes en 11 componentes — dead code
Dark mode fue deshabilitado (`forcedTheme="light"`, toggle removido), pero 11 archivos aún tienen `dark:` variants que nunca se activan. Esto infla el CSS generado (+~30-50 selectores inútiles) y hace el código más difícil de leer.

| Archivo | # dark: occurrences |
|---------|---------------------|
| `animated-select.tsx` | ~4 |
| `faq-section.tsx` | ~4 |
| `contact-form.tsx` | ~4 |
| `services-grid.tsx` | ~4 |
| `sentencias-section.tsx` | ~4 |
| `team-section.tsx` | ~4 |
| `sentencia-detail.tsx` | ~6 |
| `site-footer.tsx` | ~2 |
| `why-defensur.tsx` | ~8 |
| `success-cases.tsx` | ~4 |
| `ui/button.tsx` | ~2 |

**Fix:** Strip all `dark:*` classes usando regex global. ~50 líneas editadas.

---

## 🟡 High Priority (Refactor)

### 3. Five service pages are 80% identical — DRY violation
| Archivo | Líneas |
|---------|--------|
| `derecho-laboral-temuco/page.tsx` | 112 |
| `abogados-familia-temuco/page.tsx` | 120 |
| `derecho-civil-temuco/page.tsx` | 115 |
| `insolvencia-y-reemprendimiento-temuco/page.tsx` | ~100 |
| `sumarios-administrativos-temuco/page.tsx` | ~100 |

Cada página repite la misma estructura:
```tsx
export const metadata: Metadata = { title, description, keywords, openGraph }
const highlights = [...]
const details = [...]
const faqs = [...]
<PageHero title={...} subtitle={...} />
<ServicePageContent title={...} highlights={...} details={...} faqs={...} />
```

**Fix:** Extraer a un archivo de datos (`lib/services-data.ts`) con todas las service pages como objetos tipados. Cada `page.tsx` se reduce a ~12 líneas importando el dato relevante. Esto elimina ~400 líneas duplicadas y facilita agregar nuevas ciudades.

### 4. Hardcoded content across all service pages
Todo el contenido legal (highlights, details, FAQs) está hardcodeado como strings multilínea dentro de arrays en cada `page.tsx`. Esto hace difícil:
- Traducción futura
- A/B testing de copy
- Actualizaciones de contenido sin tocar código React

**Fix:** Mover a `lib/services-data.ts` como un objeto exportado tipado. Cada service page importa su data.

### 5. 8 repeated contact data patterns
Phone, email, WhatsApp link appars hardcoded in 8+ places:
- `navbar.tsx`, `site-footer.tsx`, `contact-form.tsx`, `whatsapp-float.tsx`, `stats-bar.tsx`, `defensur-home-hero.tsx`, `service-page-content.tsx`, `schema-org.tsx`

**Fix:** Crear `lib/constants.ts` con `CONTACT.phone`, `CONTACT.whatsappUrl`, `CONTACT.email`, `CONTACT.address`. Reemplazar todas las ocurrencias.

---

## 🟢 Medium Priority (Cleanup)

### 6. `sentencias-data.ts` — 650 lines, mixed concerns
El archivo contiene datos de 11 casos + funciones helper + tipado. Sería más limpio separar:
- `lib/sentencias-data.ts` — solo tipos y funciones (getAllSlugs, getBySlug)
- `lib/sentencias-content.ts` — solo los datos crudos de los 11 casos

### 7. `calculadoras/page.tsx` — 707 líneas, demasiado grande
Es la página más grande del proyecto. Mezcla UI, lógica de cálculo, y estado en un solo archivo. Sería mejor dividir en:
- `components/calculadoras/` — varios componentes pequeños
- `lib/calculos.ts` — lógica de cálculo pura (funciones exportadas y testables)

### 8. Success cases data duplicated between `success-cases.tsx` + `sentencias-data.ts`
`components/success-cases.tsx` tiene su propio array de 8 casos hardcodeados. `lib/sentencias-data.ts` también tiene 11 casos. Hay solapamiento y duplicación. Los `SuccessCases` debería derivarse del source of truth en `sentencias-data.ts`.

### 9. Missing reusable primitives
Varios patrones se repiten sin abstracción:
- **Contact pills/formats** — 8 repeticiones del CTA de WhatsApp
- **Section headers** — mismo patrón de eyebrow + h2 + subtitle en `success-cases.tsx`, `why-defensur.tsx`, `sentencias-section.tsx`
- **Card grids** — mismo `rounded-2xl border border-border bg-card p-6` repetido en 6+ componentes

**Fix:** Crear `components/ui/section-header.tsx` y `components/ui/cta-whatsapp.tsx`.

### 10. Stats section has AI-slop decorative elements
`components/stats-bar.tsx` tiene:
- `opacity-[0.03]` radial-gradient dots pattern (patrón decorativo prohibido por el skill)
- `blur-[100px]` gradient glow orb (`-top-32 -right-32`)

**Fix:** Remover el pattern + blur orb, dejar solo los números con el fondo navy plano.

---

## 🔵 Low Priority (Polish)

### 11. Navbar uses `img` tag instead of `next/image`
`<img src="/logo.png">` — no lazy loading, no width/height, no optimización de formatos modernos (AVIF/WebP). Cambiar a `<Image>` de Next.js.

### 12. `site-footer.tsx` importa `Gavel` pero no se usa
Import huérfano desde que reemplazamos el icono con el logo.

### 13. `AGENTS.md` desactualizado tras todos los cambios recientes
Las notas no reflejan el estado actual del proyecto.

### 14. CSS tiene variables de dark mode que nunca se usan
`globals.css` línea ~300+ tiene un bloque `.dark { ... }` con CSS custom properties. Como dark mode está deshabilitado, estas variables nunca se aplican.

---

## Resumen de impacto

| Prioridad | Issues | Líneas afectadas | Impacto | Esfuerzo |
|-----------|--------|-----------------|---------|----------|
| 🔴 Critical | #1 Phone masked, #2 dark: dead code | ~60 | Bugs + perf | 30 min |
| 🟡 High | #3 DRY services, #4 hardcoded content, #5 contact constants | ~500 | Mantenibilidad | 2 hrs |
| 🟢 Medium | #6 split sentencias, #7 split calculadoras, #8 dedup data, #9 primitives, #10 AI-slop | ~400 | Calidad de código | 3 hrs |
| 🔵 Low | #11 Image, #12 unused import, #13 docs, #14 dead CSS | ~50 | Polish | 30 min |

---

## Fase recomendada

**Fase 1 (ahora):** #1 + #2 + #5 + #10 — arregla bugs, limpia dead code, reduce duplicación de contacto.
**Fase 2 (después):** #3 + #4 + #6 + #9 — refactor estructural grande (servicios, sentencias, primitives).
**Fase 3 (cuando haya tiempo):** #7 + #8 + #11—#14 — polish y documentación.

---

## ¿Querés que empiece con la Fase 1 ahora mismo?
