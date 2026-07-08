# AGENTS.md — Defensur

> Auto-generated agent context. Read this before working in this repo.

## Project Summary

**Defensur.cl** — a modern Next.js rebuild of a Chilean law firm website (Estudio Jurídico) based in Temuco, Chile. The site is a content-heavy, statically-authored marketing/SEO site with no CMS, no database, and no API routes. All content is hardcoded in component data.

- **Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui (radix-maia style), Framer Motion 12
- **Runtime:** npm (lockfile: `package-lock.json`)
- **Repo:** single-branch (`main`), no open PRs, 6 commits total
- **Status:** full site built — 12 pages, 7 blog posts (SSG), legal calculators (redesigned with range sliders + animated tabs), responsive, dark mode, ready for Vercel

## Git

- Branch: `main` → tracks `origin/main`
- Only untracked file: `IDEA.md` (a one-liner brainstorm note)
- Last commit: `e95433d feat: full site build - all pages, sections, nav, footer, SEO`

## Commands

All scripts use `npm`:

| Command | What it does |
|---------|-------------|
| `bun run dev` | Next.js dev server with Turbopack |
| `bun run build` | Production build |
| `bun run lint` | ESLint (currently broken — minimatch ESM/CJS conflict) |
| `bun run typecheck` | `tsc --noEmit` (4 service pages fail — see Known Issues) |
| `bun run format` | Prettier with tailwindcss plugin |

## Directory Structure

```
app/
├── layout.tsx              # Root layout: fonts, ThemeProvider, HTML shell
├── page.tsx                # Homepage — composes all home sections
├── globals.css             # Tailwind + shadcn theme + brand tokens
├── (pages)/                # Route group — wraps inner pages with Navbar + Footer
│   ├── layout.tsx          # Navbar + SiteFooter + WhatsAppFloat wrapper
│   ├── contacto/
│   ├── quienes-somos/
│   ├── sentencias/         # Blog listing page (blog detail pages not built)
│   ├── nicolas-yanez/
│   ├── derecho-laboral-temuco/
│   ├── abogados-familia-temuco/
│   ├── derecho-civil-temuco/
│   ├── insolvencia-y-reemprendimiento-temuco/
│   └── sumarios-administrativos-temuco/
components/
├── ui/button.tsx           # shadcn Button (radix-maia variant — uses radix-ui Slot)
├── navbar.tsx              # Fixed rounded pill nav: logo, dropdowns, theme toggle, CTA
├── site-footer.tsx         # 4-column footer: brand, services, company, contact
├── whatsapp-float.tsx      # Fixed bottom-right WhatsApp FAB
├── theme-provider.tsx      # next-themes wrapper + 'd' key dark mode toggle
├── page-hero.tsx           # Reusable inner-page hero (navy bg, breadcrumbs)
├── service-page-content.tsx # Reusable service page template (highlights, details, FAQ, sidebar CTA)
├── contact-form.tsx        # WhatsApp redirect form (validates, opens wa.me)
├── animated-select.tsx     # Custom select with framer-motion dropdown
├── marquee.tsx             # CSS-animated infinite scroll marquee
├── progressive-blur.tsx    # Multi-layer backdrop-blur gradient overlay
│
├── defensur-home-hero.tsx  # Home hero: includes Navbar, WhyDefensur, TeamSection, ContactForm
├── why-defensur.tsx        # Marquee of questions + 4-value grid
├── services-grid.tsx       # 5 service cards with icons + bullets
├── video-section.tsx       # YouTube embed + text panel
├── success-cases.tsx       # 8 case cards with amounts + tags
├── sentencias-section.tsx  # Blog post preview cards (homepage section)
├── faq-section.tsx         # 8-item accordion FAQ
├── stats-bar.tsx           # Stats bar (navy bg) + CTASection (closing CTA)
└── team-section.tsx        # 7-team-member grid with featured hero
lib/
└── utils.ts                # cn() = clsx + tailwind-merge
public/team/                # 7 .webp team member photos
```

## Two-Layout Architecture

1. **Root layout** (`app/layout.tsx`): loads fonts, wraps everything in `<ThemeProvider>`, defines global metadata/SEO
2. **`(pages)` route group layout** (`app/(pages)/layout.tsx`): adds `<Navbar>` + `<SiteFooter>` + `<WhatsAppFloat>` wrapper around all inner pages

The **homepage** (`app/page.tsx`) is OUTSIDE the route group — the `DefensurHomeHero` component includes its own Navbar, and the page explicitly composes its own sections (ServicesGrid, VideoSection, ... SiteFooter, WhatsAppFloat).

## Design System

### Fonts (loaded via next/font/google)
| Variable | Font | Usage |
|----------|------|-------|
| `--font-heading` | Noto Serif | All h1–h6, logo wordmark |
| `--font-sans` | Manrope (300-700) | Body, nav, buttons, everything else |
| `--font-mono` | Geist Mono | Code blocks only |

### Brand Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-navy` | `#08186B` / `#00063D` | Primary brand, headers, nav bg |
| `--brand-sky` | `#3FADFE` / `#0693E3` | CTA buttons, WhatsApp links |
| `--brand-red` | `#CF2E2E` | Logo dot accent |
| `--brand-sky-secondary` | `#00639B` | Secondary sky variant |

Tailwind classes: `bg-brand-navy`, `text-brand-sky`, `bg-brand-navy/8`, etc.

### Theme
- Dark mode supported via `next-themes` with `class` strategy
- Toggle: sun/moon button in navbar + press `d` key anywhere
- Dark tokens defined in `.dark {}` block in `globals.css`
- `@custom-variant dark (&:is(.dark *))` for Tailwind dark variants

## Component Patterns

### "use client" usage
Most components are `"use client"` — even ones that could be server components. This is the established pattern. Only the root layout and a few page files omit it.

### Data pattern
All content is hardcoded in `const` arrays within component files. No API calls, no CMS, no database reads. To change copy, edit the array in the component.

### shadcn/ui
- Uses `radix-maia` style (different from default shadcn)
- Button uses `radix-ui` `Slot.Root` (NOT `@radix-ui/react-slot`)
- `components.json` configured with baseColor: "mist", cssVariables: true

### Form handling
The `ContactForm` never POSTs to a server. It validates fields then opens `wa.me` with a pre-filled message. No backend needed.

### Icons
Uses `lucide-react` exclusively. Icons are dynamically referenced via `const Icon = service.icon` pattern.

## Known Issues

### ESLint broken
ESLint 9.39.4 + `@typescript-eslint/typescript-estree` → `minimatch` has an ESM/CJS module resolution conflict on Node 22. This is a dependency ecosystem issue, not our code.

### react-doctor false positives
Documented in `.react-doctor/false-positives.md`.

## What's NOT Built

- `/nicolas-yanez` — lawyer profile page exists but is minimal (stub)
- `/privacidad`, `/terminos` — linked from footer but don't exist (404)
- No OG images, no sitemap.xml, no robots.txt
- No analytics, no cookie consent, no chat widget
- Contact form is WhatsApp-redirect only — no server-side form handler

## Defensur Business Context

- Phone: +56 9 5993 7355
- Email: consultas@defensur.cl
- Address: Antonio Varas 687, Oficina 1405, Temuco
- WhatsApp: https://wa.me/56959937355
- Hours: Mon–Fri 09:00–14:00, 15:00–18:00
- 6 team members, 5 practice areas, +15 years experience, +500 cases, $150M+ in compensation
- Site ranks #1 for "abogados laborales temuco" — preserve URL structure and SEO metadata
- All content is in Chilean Spanish (es_CL)
