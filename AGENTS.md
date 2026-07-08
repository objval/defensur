# AGENTS.md — Defensur

> Auto-generated agent context. Read this before working in this repo.

## Project Summary

**DefensurAraucania.cl** — a modern Next.js rebuild of a Chilean law firm website (Estudio Jurídico) based in Temuco, Chile. The site is a content-heavy, statically-authored marketing/SEO site with no CMS, no database, and no API routes.

- **Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui (radix-maia style), Framer Motion 12
- **Runtime:** npm (lockfile: `package-lock.json`) — never use bun
- **Domain:** `defensuraraucania.cl` is primary; `defensur.cl` is alternate
- **Status:** full site built — 25 static pages, OG images, sitemap, robots.txt, manifest, favicon, responsive, light-mode only

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
| `lib/site.ts` | **Single source of truth** for SITE, WHATSAPP, SOCIAL_LINKS, NAV_LINKS, COMPANY_LINKS, AREAS_DE_PRACTICA. All components import from here — no hardcoded phone/email/WhatsApp URLs. |
| `lib/services-data.ts` | All 5 service pages as typed `ServiceData` objects with `getServiceBySlug()` and `serviceToMetadata()`. Each service page is ~25 lines importing its data. |
| `lib/sentencias-data.ts` | 11 sentencia case files with types and helpers (`getSentenciaBySlug`, `getAllSlugs`). Source of truth for both `/sentencias/` and the homepage `SuccessCases` section. |
| `lib/utils.ts` | `cn()` = clsx + tailwind-merge |

### Reusable Components

| Component | Purpose |
|-----------|---------|
| `components/ui/whatsapp-cta.tsx` | `WhatsAppCta` (3 variants: primary/outline/compact) + `ContactInfo`. Uses WHATSAPP constant. |
| `components/page-hero.tsx` | Reusable inner-page hero with navy bg + breadcrumbs. No decorative patterns. |
| `components/service-page-content.tsx` | Service page template: highlights grid, details with sidebar CTA, FAQ accordion. Uses WhatsAppCta. |
| `components/navbar.tsx` | Fixed pill nav with dropdowns. Uses NAV_LINKS + SITE constants. |
| `components/site-footer.tsx` | 4-column footer. Uses COMPANY_LINKS, NAV_LINKS, SOCIAL_LINKS, SITE. |
| `components/whatsapp-float.tsx` | Fixed bottom-right WhatsApp FAB. Uses WHATSAPP constant. |

### Service Pages (data-driven)

Each service page is a thin server component:
```tsx
const service = getServiceBySlug("derecho-laboral")!
export const metadata = serviceToMetadata(service)
export default function Page() {
  return <><PageHero ... /><ServicePageContent ... /></>
}
```

To add a new service: add an entry to `SERVICES` in `lib/services-data.ts`, create a route folder + `page.tsx` with ~25 lines. No other changes needed.

### Two-Layout Architecture

1. **Root layout** (`app/layout.tsx`): fonts, `<SchemaOrg />` in body, `<ThemeProvider>` (forced light), global metadata/SEO
2. **`(pages)` route group layout**: `<Navbar>` + `<SiteFooter>` + `<WhatsAppFloat>` wrapper

The **homepage** is outside the route group — `DefensurHomeHero` includes its own Navbar and composes its own sections.

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
| `--brand-red` | `#CF2E2E` | Logo dot accent |

### Theme
- **Light mode only.** Dark mode disabled (`forcedTheme="light"`, `enableSystem={false}`).
- Theme toggle removed from navbar. No `dark:` classes remain in any component.
- `ThemeProvider` still wraps the app for potential future use.

## Design Principles

- No AI-slop decorative patterns (radial dot overlays, blur orbs, gradient glows removed)
- No glassmorphism as default
- Clean navy hero backgrounds without decorative SVG patterns
- Chilean Spanish (es_CL) — use "tú" forms, never Argentinian voseo

## OG Images

- 9 branded OG images in `public/og/` (default, laboral, familia, civil, insolvencia, calculadoras, sentencias, contacto, quienes-somos)
- White background, Noto Serif Bold typography, 320px blue logo on white
- Referenced in page metadata via `service.ogImage` or direct path

## Known Issues

- **ESLint broken**: `minimatch` ESM/CJS conflict on Node 22 (upstream issue, non-blocking)
- **react-doctor false positives**: documented in `.react-doctor/false-positives.md`

## What's NOT Built

- `/privacidad`, `/terminos` — linked from footer but don't exist (404)
- No analytics, no cookie consent
- Contact form is WhatsApp-redirect only — no server-side form handler
- City-specific SEO landing pages (Valdivia, Osorno, Puerto Montt, Punta Arenas) — plan exists in `.hermes/city-landing-pages-plan.md`

## Business Context

All contact data lives in `lib/site.ts` as the single source of truth:
- Phone: `SITE.phone.e164` / `SITE.phone.local`
- Email: `SITE.email`
- Address: `SITE.address`
- WhatsApp: `WHATSAPP.url(context?)`
- Hours: `SITE.hours.display`
