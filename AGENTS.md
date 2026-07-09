# AGENTS.md — Defensur

> Auto-generated agent context. Read this before working in this repo.
> Last updated: commit `0026eaa` (2026-07-09).

## Project Summary

**DefensurAraucania.cl** — a modern Next.js rebuild of a Chilean law firm website (Estudio Jurídico) based in Temuco, Chile. The site is a content-heavy, statically-authored marketing/SEO site with no CMS and no database for public pages. An admin panel (Clerk + Convex) exists for staff to manage client consultas.

- **Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui (radix-maia style), Framer Motion 12
- **Auth:** Clerk (Next.js SDK v7) + Convex (v1.42.1) via `ConvexProviderWithClerk`
- **Database:** Convex — real-time queries, mutations, internal actions
- **Runtime:** npm (lockfile: `package-lock.json`) — never use bun
- **Domain:** `defensuraraucania.cl` is primary; `defensur.cl` is alternate reference only

## Commands

All scripts use `npm`:

| Command | What it does |
|---------|-------------|
| `npm run dev` | Next.js dev server with Turbopack |
| `npm run build` | Production build (25+ static pages + panel) |
| `npm run lint` | ESLint (broken — minimatch ESM/CJS conflict on Node 22) |
| `npm run typecheck` | `tsc --noEmit` (broken — tsx not installed in CI) |
| `npm run format` | Prettier with tailwindcss plugin |
| `npm run convex` | `convex dev` — runs local Convex dev server |
| `npm run admin` | `node scripts/admin.mjs` — CLI for role management |
| `npm run admin:list-users` | List all Convex users |
| `npm run admin:set-role` | Set a user's role |
| `npm run admin:ban` | Ban a user |
| `npm run admin:unban` | Unban a user |

## Architecture

### Routes

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Server Component | Homepage with hero, services, team, FAQ |
| `/contacto` | Client Component | Contact info + WhatsApp-based inquiry form |
| `/quienes-somos` | Server Component | About page |
| `/nicolas-yanez` | Server Component | Lead lawyer profile |
| `/derecho-laboral-temuco` | Server Component | Labor law service page |
| `/abogados-familia-temuco` | Server Component | Family law service page |
| `/derecho-civil-temuco` | Server Component | Civil law service page |
| `/insolvencia-y-reemprendimiento-temuco` | Server Component | Insolvency service page |
| `/sumarios-administrativos-temuco` | Server Component | Admin law service page |
| `/sentencias` + slugs | Server Component | Case results pages |
| `/calculadoras` | Client Component | Legal calculators (sueldo + alimentos) |
| `/panel/*` | Client Component | **Auth required.** Staff dashboard, consultas CRUD, users |
| `/panel/consultas` | Client Component | Full consulta list with search/filter/bulk-actions |
| `/panel/consultas/[id]` | Client Component | Consulta detail with timeline, files, comments |
| `/panel/users` | Client Component | User management (admin only) |

### Shared Data Layer

| File | Purpose |
|------|---------|
| `lib/site.ts` | **Single source of truth.** `SITE`, `WHATSAPP` (url builder with context), `SOCIAL_LINKS`, `NAV_LINKS`, `COMPANY_LINKS`, `AREAS_DE_PRACTICA`, `STATS`, `MARQUEE_QUESTIONS`, `FAQS`, `TEAM`. All components import from here — zero hardcoded phone/email/WhatsApp URLs. |
| `lib/services-data.ts` | All 5 service pages as typed `ServiceData` objects with `getServiceBySlug()` and `serviceToMetadata()`. Each service page is ~25 lines. |
| `lib/sentencias-data.ts` | 11 sentencia case files with types and helpers (`getSentenciaBySlug`, `getAllSlugs`). |
| `lib/calculos.ts` | Pure calculation logic for legal calculators: `calcularSueldo()`, `calcularAlimentos()`, `formatCLP()`, `formatCompact()`, constants, select options. All side-effect-free. |
| `lib/utils.ts` | `cn()` = clsx + tailwind-merge |
| `lib/panel-utils.ts` | Shared panel constants: `STATUS_CONFIG`, `AREA_CONFIG`, `URGENCY_CONFIG`, `timeAgo()`, `canCancel()`, filters, sort. |

### Convex

| File | Purpose |
|------|---------|
| `convex/schema.ts` | Tables: `users` (Clerk-authed), `consultas` (with files, comments, status), `audit_log` |
| `convex/auth.ts` | Clerk JWT verification + `getAuth()` helper (SSG-safe — returns null instead of throwing) |
| `convex/users.ts` | Queries/mutations: `list`, `getMe`, `updateRole`, `ban`, `unban` |
| `convex/consultas.ts` | Queries/mutations: `listMine`, `admin.listAll`, `submitPublic`, `create`, `cancel`, `addComment`, `updateStatus`, `assignStaff` |
| `convex/seed.ts` | Optional seed data for development |

### Auth Architecture

- **Root layout** (`app/layout.tsx`): `<ClerkProvider>` → `<ConvexClientProvider>` → `<ThemeProvider>`
- **ConvexClientProvider** (`components/convex-client-provider.tsx`): Wraps with `ConvexProviderWithClerk`. Try-catch guards SSG — if env vars missing, renders children without Convex (no crash).
- **PanelShell** (`components/panel-shell.tsx`): Client component that calls `auth.protect()` from proxy.ts. Guards children behind Clerk + Convex auth. Shows loading skeleton while auth initializes.
- **proxy.ts**: Next.js middleware — runs Clerk's `clerkMiddleware()` to protect /panel/* routes server-side.

### Layout Components

| Component | Purpose |
|-----------|---------|
| `components/page-hero.tsx` | Reusable inner-page hero with navy bg + breadcrumbs. |
| `components/service-page-content.tsx` | Service page template: highlights grid, details with sidebar CTA, FAQ accordion. |
| `components/navbar.tsx` | Fixed pill nav with dropdowns. Uses `NAV_LINKS` + `SITE` constants. |
| `components/site-footer.tsx` | 4-column footer. Uses all shared constants. |
| `components/whatsapp-float.tsx` | Fixed bottom-right WhatsApp FAB. |
| `components/schema-org.tsx` | JSON-LD structured data (LegalService, Article, FAQPage). |
| `components/defensur-home-hero.tsx` | Homepage hero — includes ContactForm in right column. |

### ContactForm (WhatsApp-based)

The contact form at `/components/contact-form.tsx` collects name/email/phone/area and opens WhatsApp with a pre-filled message. No Convex, no Clerk, no server-side submission — pure client-side WhatsApp redirect. A success overlay appears after submission with option to send another.

- **No hydration issues** — no Convex/Clerk hooks in the rendering path
- **Fully functional** — users fill data → click "Solicitar Diagnóstico Legal" → WhatsApp opens with their info
- Used on both homepage and `/contacto` via `<ContactForm />` (no props)

### Calculadoras Components

| Component | Purpose |
|-----------|---------|
| `components/calculadoras/animated-value.tsx` | Motion-wrapped animated number span. |
| `components/calculadoras/range-slider.tsx` | Custom range input with track fill, thumb, presets. |
| `components/calculadoras/number-input.tsx` | Numeric input with $ prefix, NaN guard. |
| `components/calculadoras/result-row.tsx` | Animated result line (label + value). |
| `components/calculadoras/info-tip.tsx` | Info card with icon + title + children. |
| `components/calculadoras/sueldo-inputs.tsx` | Sueldo form card. |
| `components/calculadoras/resultados-sueldo.tsx` | Sueldo results panel + bar chart. |
| `components/calculadoras/alimentos-inputs.tsx` | Alimentos form card. |
| `components/calculadoras/resultados-alimentos.tsx` | Alimentos results panel + gauge. |
| `components/calculadoras/calculadora-cta.tsx` | Bottom CTA banner (uses Reveal). |

### Reusable UI Primitives

| Component | Purpose |
|-----------|---------|
| `components/ui/reveal.tsx` | `Reveal`, `RevealGroup`, `RevealItem` — scroll-triggered fade+slide via framer-motion. Full `prefers-reduced-motion` support. |
| `components/ui/animated-counter.tsx` | `AnimatedCounter` — parses strings like `"+15"`, `"$150M+"` and animates numeric part. Respects reduced-motion. |
| `components/ui/animated-select.tsx` | `AnimatedSelect` — Custom dropdown with icon/description per option, search-like UX. Supports `disabled` prop. |
| `components/ui/whatsapp-cta.tsx` | `WhatsAppCta` (3 variants: primary/outline/compact) + `ContactInfo`. Uses WHATSAPP constant. |
| `components/ui/button.tsx` | shadcn Button (radix-maia variant). |

### Panel Components

| Component | Purpose |
|-----------|---------|
| `components/panel-shell.tsx` | Auth gate + sidebar + topbar layout. |
| `components/panel-sidebar.tsx` | Collapsible sidebar with role-based nav items. |
| `components/panel-metrics.tsx` | Dashboard metric cards (total, pending, urgent, avg response). |
| `components/consulta-card.tsx` | Expandable consulta row with comment/cancel/download actions. |
| `components/consulta-form-modal.tsx` | Create/edit consulta with file upload. |
| `components/file-drop-zone.tsx` | File upload with drag-drop, preview, progress. |

### Two-Layout Architecture

1. **Root layout** (`app/layout.tsx`): fonts, `<ClerkProvider>`, `<ConvexClientProvider>`, `<ThemeProvider>` (forced light), global metadata/SEO, `<SchemaOrg />`
2. **`(pages)` route group layout**: `<Navbar>` + `<SiteFooter>` + `<WhatsAppFloat>` wrapper

The **homepage** is outside the route group — `DefensurHomeHero` includes its own Navbar.
The **panel** (`/panel/*`) has its own layout: `PanelShell` + sidebar + topbar.

### NPM Packages

Key dependencies beyond Next/React/Tailwind:

| Package | Purpose |
|---------|---------|
| `@clerk/nextjs` ^7.5 | Auth (sign-in, sign-up, middleware, useUser) |
| `convex` ^1.42 | Real-time DB, queries, mutations, auth integration |
| `framer-motion` ^12 | Animations (scroll reveal, animated select dropdown, panel micro-interactions) |
| `lucide-react` | Icons |
| `sonner` | Toast notifications in panel |
| `react-hook-form` + `zod` | Form validation (panel forms) |
| `tailwind-merge` + `clsx` | cn() utility |
| `class-variance-authority` | shadcn-style variants |

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
- **No `any` types** — use proper typed interfaces and `as unknown as Type` casts

## OG Images

- 9 branded OG images in `public/og/` (default, laboral, familia, civil, insolvencia, calculadoras, sentencias, contacto, quienes-somos)
- White background, Noto Serif Bold typography, 320px blue logo on white, no cards/panels/dark backgrounds
- Referenced in page metadata via `service.ogImage` or direct path

## Known Issues

| Issue | Status | Details |
|-------|--------|---------|
| ESLint broken | Permanent | `minimatch` ESM/CJS conflict on Node 22 (upstream). Non-blocking. |
| react-doctor false positives | Documented | `.react-doctor/false-positives.md` |
| TypeScript not in CI | Broken | `tsc --noEmit` fails — typescript binary not in project node_modules. Needs `npm install`. |
| ContactForm Convex integration | Deferred | The Convex-based form (with save-to-db) causes React error #418 (hydration mismatch) + "useMutation outside ConvexProvider" at runtime. Reverted to WhatsApp redirect for now. Root cause: `useConvexAuth()` returning different values server vs client during hydration. Fix needs rework — likely a dedicated endpoint or server action instead of client-side Convex hooks. |
| /privacidad, /terminos | Not built | Linked in footer — return 404 |
| Convex env vars in Vercel | Must set manually | Vercel needs 3 env vars: `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CONVEX_URL`. Convex needs `CLERK_JWT_ISSUER_DOMAIN` set in Convex dashboard + `convex/.env.local`. |

## What's NOT Built

- **ContactForm → Convex**: The Convex-integrated form was reverted to WhatsApp-only due to hydration errors. Needs a different approach (server action, API route, or proper hydration-safe Convex pattern).
- `/privacidad`, `/terminos` — linked from footer but don't exist (404)
- No analytics, no cookie consent
- City-specific SEO landing pages (Valdivia, Osorno, Puerto Montt, Punta Arenas) — plan in `.hermes/city-landing-pages-plan.md`
- No testimonial/review section
- No page transitions between routes
- **Panel roadmap items**: consulta detail page (`/panel/consultas/[id]`), email notifications, audit log, real-time subscriptions, analytics dashboard, bulk actions, staff assignment, PWA — all detailed in `.hermes/plans/2026-07-09_113000-panel-feature-roadmap.md`

## Business Context

All contact data lives in `lib/site.ts` as the single source of truth:
- Phone: `SITE.phone.e164` / `SITE.phone.local`
- Email: `SITE.email`
- Address: `SITE.address`
- WhatsApp: `WHATSAPP.url(context?)`
- Hours: `SITE.hours.display`
