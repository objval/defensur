# AGENTS.md — Defensur

> Auto-generated agent context. Read this before working in this repo.
> Last updated: commit `d852051` (2026-07-08).

## Project Summary

**DefensurAraucania.cl** — a modern Next.js rebuild of a Chilean law firm website (Estudio Jurídico) based in Temuco, Chile. The site is a content-heavy, statically-authored marketing/SEO site with no CMS, no database, and no API routes.

- **Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui (radix-maia style), Framer Motion 12
- **Runtime:** npm (lockfile: `package-lock.json`) — never use bun
- **Domain:** `defensuraraucania.cl` is primary; `defensur.cl` is alternate
- **Status:** 25 static pages, OG images, sitemap, robots.txt, manifest, favicon, scroll animations, animated counters, light-mode only

## Commands

All scripts use `npm`:

| Command | What it does |
|---------|-------------|
| `npm run dev` | Next.js dev server with Turbopack |
| `npm run build` | Production build (25 static pages) |
| `npm run lint` | ESLint (broken — minimatch ESM/CJS conflict on Node 22) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier with tailwindcss plugin |

## Architecture

### Shared Data Layer

| File | Purpose |
|------|---------|
| `lib/site.ts` | **Single source of truth.** `SITE` (name, phone, email, address, geo, hours, priceRange), `WHATSAPP` (url builder with context), `SOCIAL_LINKS`, `NAV_LINKS`, `COMPANY_LINKS`, `AREAS_DE_PRACTICA`, `STATS`, `MARQUEE_QUESTIONS`, `FAQS`, `TEAM` (with `TeamMember` type). All components import from here — zero hardcoded phone/email/WhatsApp URLs. |
| `lib/services-data.ts` | All 5 service pages as typed `ServiceData` objects with `getServiceBySlug()` and `serviceToMetadata()`. Each service page is ~25 lines. |
| `lib/sentencias-data.ts` | 11 sentencia case files with types and helpers (`getSentenciaBySlug`, `getAllSlugs`). Source of truth for `/sentencias/` and homepage `SuccessCases`. |
| `lib/calculos.ts` | Pure calculation logic for legal calculators: `calcularSueldo()`, `calcularAlimentos()`, `formatCLP()`, `formatCompact()`, constants (`AFP_RATE`, `SALUD_RATE`, `MAX_ALIMENTOS_RATE`, `HORAS_FACTOR`), select option data. All functions side-effect-free, unit-testable. Includes NaN/division-by-zero guards. |
| `lib/utils.ts` | `cn()` = clsx + tailwind-merge |

### Hooks

| Hook | Purpose |
|------|---------|
| `hooks/use-calculo-sueldo.ts` | Encapsulates sueldo calculator state + `useMemo` for derived calculations. |
| `hooks/use-calculo-alimentos.ts` | Encapsulates alimentos calculator state + `useMemo`. |

### Reusable UI Primitives

| Component | Purpose |
|-----------|---------|
| `components/ui/reveal.tsx` | `Reveal`, `RevealGroup`, `RevealItem` — scroll-triggered fade+slide animations via framer-motion `whileInView`. Full `prefers-reduced-motion` support. |
| `components/ui/animated-counter.tsx` | `AnimatedCounter` — parses strings like `"+15"`, `"$150M+"`, `"98%"` and animates the numeric part on scroll-in. Respects reduced-motion. |
| `components/ui/whatsapp-cta.tsx` | `WhatsAppCta` (3 variants: primary/outline/compact) + `ContactInfo`. Uses WHATSAPP constant. |
| `components/ui/button.tsx` | shadcn Button (radix-maia variant). |

### Calculadoras Components

| Component | Purpose |
|-----------|---------|
| `components/calculadoras/animated-value.tsx` | Motion-wrapped animated number span. |
| `components/calculadoras/range-slider.tsx` | Custom range input with track fill, thumb, presets. |
| `components/calculadoras/number-input.tsx` | Numeric input with $ prefix, NaN guard. |
| `components/calculadoras/result-row.tsx` | Animated result line (label + value). |
| `components/calculadoras/info-tip.tsx` | Info card with icon + title + children. |
| `components/calculadoras/sueldo-inputs.tsx` | Sueldo form card (NumberInput, RangeSlider, progress bar, AnimatedSelect). |
| `components/calculadoras/resultados-sueldo.tsx` | Sueldo results panel + bar chart comparison. |
| `components/calculadoras/alimentos-inputs.tsx` | Alimentos form card. |
| `components/calculadoras/resultados-alimentos.tsx` | Alimentos results panel + gauge + overflow warning. |
| `components/calculadoras/calculadora-cta.tsx` | Bottom CTA banner (uses Reveal). |

### Layout Components

| Component | Purpose |
|-----------|---------|
| `components/page-hero.tsx` | Reusable inner-page hero with navy bg + breadcrumbs. No decorative patterns. |
| `components/service-page-content.tsx` | Service page template: highlights grid, details with sidebar CTA, FAQ accordion. Uses WhatsAppCta. |
| `components/navbar.tsx` | Fixed pill nav with dropdowns. Uses NAV_LINKS + SITE constants. |
| `components/site-footer.tsx` | 4-column footer. Uses all shared constants. |
| `components/whatsapp-float.tsx` | Fixed bottom-right WhatsApp FAB. |
| `components/schema-org.tsx` | JSON-LD structured data (LegalService, Article, FAQPage). Uses SITE constants. |

### Service Pages (data-driven)

Each service page is a thin server component (~25 lines):
```tsx
const service = getServiceBySlug("derecho-laboral")!
export const metadata = serviceToMetadata(service)
export default function Page() {
  return <><PageHero ... /><ServicePageContent ... /></>
}
```

To add a new service: add an entry to `SERVICES` in `lib/services-data.ts`, create a route folder + `page.tsx`.

### Calculadoras Page (refactored)

Page file is 103 lines, down from 707. Composes hooks + components:
```tsx
const sueldo = useCalculoSueldo()
const alimentos = useCalculoAlimentos()
<SueldoInputs {...sueldo} />
<ResultadosSueldo {...sueldo} />
<AlimentosInputs {...alimentos} />
<ResultadosAlimentos {...alimentos} />
<CalculadoraCta />
```

### Two-Layout Architecture

1. **Root layout** (`app/layout.tsx`): fonts, `<SchemaOrg />` in body, `<ThemeProvider>` (forced light), global metadata/SEO
2. **`(pages)` route group layout**: `<Navbar>` + `<SiteFooter>` + `<WhatsAppFloat>` wrapper

The **homepage** is outside the route group — `DefensurHomeHero` includes its own Navbar.

## Design System

### Fonts
| Variable | Font | Usage |
|----------|------|-------|
| `--font-heading` | Noto Serif | All h1–h6, logo wordmark |
| `--font-sans` | Manrope (300-700) | Body, nav, buttons |
| `--font-mono` | Geist Mono | Code blocks only |

### Brand Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-navy` | `#08186B` | Primary brand, headers, nav bg |
| `--brand-sky` | `#3FADFE` | CTA buttons, WhatsApp links |
| `--brand-red` | `#CF2E2E` | Logo dot accent, warnings |

### Theme
- **Light mode only.** Dark mode disabled (`forcedTheme="light"`, `enableSystem={false}`).
- Theme toggle removed. Zero `dark:` classes remain.
- `ThemeProvider` still wraps the app for potential future use.

### Design Principles
- No AI-slop decorative patterns (radial dot overlays, blur orbs, gradient glows — all removed)
- No glassmorphism as default
- Clean navy hero backgrounds without decorative SVG patterns
- Chilean Spanish (es_CL) — use "tú" forms, never Argentinian voseo
- Scroll reveal animations on homepage sections (Reveal, RevealGroup, RevealItem)
- Animated stat counters (AnimatedCounter)
- All animations respect `prefers-reduced-motion`

## OG Images

- 9 branded OG images in `public/og/` (default, laboral, familia, civil, insolvencia, calculadoras, sentencias, contacto, quienes-somos)
- White background, Noto Serif Bold typography, 320px blue logo on white
- Referenced in page metadata via `service.ogImage` or direct path

## Known Issues

- **ESLint broken**: `minimatch` ESM/CJS conflict on Node 22 (upstream, non-blocking)
- **react-doctor false positives**: documented in `.react-doctor/false-positives.md`

## What's NOT Built

- `/privacidad`, `/terminos` — linked from footer but don't exist (404)
- No analytics, no cookie consent
- Contact form is WhatsApp-redirect only — no server-side form handler
- City-specific SEO landing pages (Valdivia, Osorno, Puerto Montt, Punta Arenas) — plan in `.hermes/city-landing-pages-plan.md`
- No testimonial/review section yet
- No page transitions between routes

## Business Context

All contact data lives in `lib/site.ts` as the single source of truth:
- Phone: `SITE.phone.e164` / `SITE.phone.local`
- Email: `SITE.email`
- Address: `SITE.address`
- WhatsApp: `WHATSAPP.url(context?)`
- Hours: `SITE.hours.display`
