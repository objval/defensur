# Defensur — Project Context & Build Plan

> **What this is:** A modern rebuild of https://www.defensur.cl — a Chilean law firm website — using Next.js, shadcn/ui, and Tailwind CSS. The goal is to recreate the full site with a premium design while preserving all content and SEO structure.

---

## 1. THE BUSINESS

**Defensur** is a law firm (Estudio Jurídico) based in **Temuco, Chile**. They specialize in:

| Practice Area | What They Do |
|---------------|-------------|
| **Derecho Laboral** | Unjustified dismissals, severance claims, workplace harassment (tutela laboral), unpaid benefits, representation at Labor Inspection |
| **Derecho de Familia** | Divorce, child support, custody, visitation, domestic violence protection, adoptions |
| **Derecho Civil** | Contracts, debt defense, debt prescription, civil lawsuits, corporate advisory |
| **Insolvencia y Reemprendimiento** | Debt renegotiation, voluntary liquidation, bankruptcy, asset protection (Ley 20.720) |
| **Sumarios Administrativos** | Defense in public-sector disciplinary proceedings, health sanctions, INAPI trademark registration |

**Contact:**
- Phone: +56 9 5993 7355
- Email: consultas@defensur.cl
- Address: Antonio Varas 687, Oficina 1405, Temuco
- Hours: Lunes a Viernes 09:00–14:00 y 15:00–18:00
- WhatsApp: https://wa.me/56959937355
- Social: Facebook, Instagram, TikTok, YouTube

**Team:**
- Nicolás Yañez Inostroza — Abogado Jefe (Laboral y Administrativo)
- Sebastián Pizarro — Experto en Derecho Laboral
- Millaray Rohten — Abogada de Familia
- Carolina Arancibia — Administradora
- Nataly Pérez — Secretaria

---

## 2. DESIGN SYSTEM

### Fonts (Google Fonts)
| Font | CSS Variable | Used For |
|------|-------------|----------|
| **Instrument Serif** (400) | `--font-heading` | All H1-H6 headings, logo wordmark |
| **Manrope** (300-700) | `--font-sans` | Body text, nav, buttons, everything else |
| **Geist Mono** | `--font-mono` | Code blocks only |

Loaded in `app/layout.tsx` via `next/font/google`. Headings get `font-heading` class via `globals.css` base layer.

### Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| **Primary** | `#08186B` | `#08186B` | Navy — brand color, header, nav, buttons |
| **CTA / Accent** | `#0693e3` | `#0693e3` | Sky blue — primary action buttons only |
| **Red accent** | `#cf2e2e` | `#cf2e2e` | Logo dot only |
| **Background** | `#f7f8fc` | `#0d0d1a` | Page background |
| **Surface** | `#ffffff` (with opacity) | `white/8` | Cards, form, panels |
| **Heading text** | `#08186B` | `#ffffff` | |
| **Body text** | `#444444` / `slate-700` | `white/68` | |
| **Muted text** | `slate-500` | `white/54` | |

OKLCH CSS variables are defined in `globals.css` for shadcn theming. The brand hex values are used directly as Tailwind arbitrary values (`bg-[#08186B]`).

### Theme
- **Both light and dark modes** supported with full parity
- Theme toggle in utility bar (sun/moon icon)
- `ThemeProvider` from `next-themes` wrapping the app
- `@custom-variant dark` in CSS for `.dark` class strategy

### Design Direction (from .impeccable.md)
- Editorial-professional, not generic law template
- Strategic, transparent, protective brand personality
- Calm confidence, generous whitespace, precise hierarchy
- Claude-like composure: quiet, intelligent, highly legible
- NOT flashy, NOT startup, NOT cold corporate, NOT neon/tech

---

## 3. WHAT'S ALREADY BUILT

### `components/defensur-home-hero.tsx` (690 lines)
The homepage hero section is fully implemented with:

- **Fixed header** with two rows:
  - Utility bar (phone, email, social links, theme toggle) — hides on scroll
  - Main nav (logo, Inicio, Quiénes Somos dropdown, Servicios dropdown, Contáctanos button)
  - Mobile: hamburger menu with accordion dropdowns
- **Hero section** with:
  - Eyebrow badge: "Estudio Jurídico · Temuco, Chile"
  - Large serif heading (Instrument Serif)
  - Descriptive subtitle
  - Two CTAs: "Consulta por WhatsApp" (primary sky blue) + "Ver servicios jurídicos" (ghost)
  - 3 trust cards: Presencia local, Confianza jurídica, Resultados reales
- **Interactive service explorer panel** (dark navy card):
  - 5 service area selector pills (icon + label)
  - Selected service detail with highlight text, summary, and 3 bullet cards
- **WhatsApp contact form** (right sidebar card):
  - Service area selector (compact)
  - Form: nombre, email, teléfono, consulta textarea
  - Submit opens WhatsApp with pre-filled message
  - Contact info footer (phone, email, address)
  - Privacy notice

### `app/page.tsx`
Renders `<DefensurHomeHero />` — that's the entire page right now.

### `app/layout.tsx`
Loads fonts, sets up ThemeProvider, applies font CSS variables.

### `app/globals.css`
shadcn/tailwind theme with OKLCH tokens, font-heading for h1-h6, font-sans on html.

---

## 4. WHAT STILL NEEDS TO BE BUILT

### Pages (matching original site structure)

| Page | Route | Status | Priority |
|------|-------|--------|----------|
| **Home** | `/` | 🟡 Hero done, needs remaining sections | HIGH |
| **Quiénes Somos** | `/quienes-somos` | 🔴 Not started | MEDIUM |
| **Derecho Laboral** | `/derecho-laboral-temuco` | 🔴 Not started | HIGH |
| **Derecho de Familia** | `/abogados-familia-temuco` | 🔴 Not started | HIGH |
| **Derecho Civil** | `/derecho-civil-temuco` | 🔴 Not started | MEDIUM |
| **Insolvencia** | `/insolvencia-y-reemprendimiento-temuco` | 🔴 Not started | MEDIUM |
| **Sumarios Administrativos** | `/sumarios-administrativos-temuco` | 🔴 Not started | MEDIUM |
| **Nicolás Yáñez** | `/nicolas-yanez` | 🔴 Not started | LOW |
| **Contacto** | `/contacto` | 🔴 Not started | HIGH |
| **Blog/Sentencias** | `/sentencias/[slug]` | 🔴 Not started | MEDIUM |

### Home Page Sections (after the hero)

The original homepage has these sections below the hero, all still needed:

1. **YouTube video embed** — "Asesoría legal en sumarios administrativos" (https://www.youtube.com/watch?v=44g_fgYZtEg)
2. **Services grid** — 4 cards (Despidos, Familia, Civil, Insolvencia) with icons, descriptions, bullet points
3. **Team section** — "Defensur Asesoramiento Jurídico Experto" — 7 team members with photos and roles
4. **Success cases** — 8 case categories with icons and descriptions
5. **Sentencias destacadas** — Blog post cards (3 featured articles with thumbnails)
6. **Footer** — Quick links, office info, social icons, copyright

### Shared Components Needed

| Component | Description | Used On |
|-----------|-------------|---------|
| `SiteFooter` | Full footer with links, office info, social | All pages |
| `WhatsAppFloat` | Floating WhatsApp button (bottom-right) | All pages |
| `ServiceCard` | Reusable card for practice areas | Home, service pages |
| `TeamCard` | Lawyer/staff card with photo | Home, about page |
| `SentenciaCard` | Blog post preview card | Home, blog listing |
| `ContactSection` | Reusable CTA strip with phone/email/WhatsApp | Service pages |
| `FAQAccordion` | Tabbed FAQ section | Service pages |
| `BreadcrumbNav` | Breadcrumb for inner pages | All inner pages |
| `PageHero` | Reusable inner page hero (smaller than home) | All inner pages |

### Service Page Template

Each service page follows this structure:
```
[PageHero — title, subtitle, background]
[Tabbed content — practice area details]
[FAQ accordion — preguntas frecuentes]
[ContactSection — CTA with WhatsApp]
[SiteFooter]
```

The content for each page is fully documented in `~/defensur-master.md`.

### Blog/Sentencia Template

Each blog post follows:
```
[Category tag + date]
[H1 title]
[Lawyer attribution]
[Content sections — hechos, análisis, resultado]
[Contact CTA box]
[Comment form (optional)]
[SiteFooter]
```

---

## 5. ORIGINAL SITE PAGE INVENTORY

### Pages (8)
| Slug | Title |
|------|-------|
| `/` | Home (Inicio) |
| `/quienes-somos/` | Quiénes Somos |
| `/derecho-laboral-temuco/` | Derecho Laboral |
| `/derecho-civil-temuco/` | Derecho Civil |
| `/abogados-familia-temuco/` | Derecho de Familia |
| `/insolvencia-y-reemprendimiento-temuco/` | Insolvencia y Reemprendimiento |
| `/sumarios-administrativos-temuco/` | Sumarios Administrativos |
| `/nicolas-yanez/` | Nicolás Yáñez |
| `/contacto/` | Contáctanos |

### Blog Posts (7)
| Slug | Case |
|------|------|
| `/tutela-laboral-en-temuco-...` | Municipalidad Temuco $14.5M |
| `/tutela-laboral-despido-...` | Supermercado Lily $9.9M |
| `/tribunal-acoge-tutela-...` | APS Perquenco $12M |
| `/tribunal-reconocio-...` | Municipalidad Temuco (repeated case) |
| `/vulneracion-derechos-...` | Municipalidad Gorbea $6M |
| `/indemnizacion-por-...` | Hospital Heyermann Angol $15M |
| `/condena-por-acoso-...` | Hospital Los Ángeles $8M |

All blog content is in `~/defensur-master.md`.

---

## 6. KEY SEO STRUCTURE

The original site ranks #1 on Google for "abogados laborales temuco". Preserve:

- **URL structure:** `/{service-name}-temuco/` for services, `/{descriptive-slug}/` for blog
- **Title pattern:** `{Page} - Defensur | Abogados Laborales en Temuco`
- **H1 on every page** with target keywords
- **Structured content:** Each service page has 2000+ words of legal content with FAQs
- **Internal linking:** Nav dropdowns, footer links, cross-links between service pages
- **WhatsApp as primary CTA** — low friction, instant connection
- **Real case results** — social proof with specific dollar amounts
- **Local SEO:** "Temuco" and "La Araucanía" in titles, content, address

---

## 7. REFERENCE FILES

| File | Location | Contents |
|------|----------|----------|
| Full site content dump | `~/defensur-master.md` | Every page's text, structure, images, URLs |
| Design context | `.impeccable.md` | Brand personality, aesthetic direction, principles |
| Stitch prompt | `~/defensur-stitch-prompt.md` | Hero + navbar premium design prompt |
| Color palette | See Section 2 above | All hex values and CSS tokens |
| Original fonts | (not used — we use Instrument Serif + Manrope) | Libre Baskerville, Raleway, Libre Franklin |

---

## 8. BUILD ORDER (RECOMMENDED)

1. ✅ Hero + Navbar (done)
2. **SiteFooter** — shared across all pages
3. **WhatsAppFloat** — floating button component
4. **Home page remaining sections** — services grid, team, success cases, sentencias, video
5. **Contact page** — form + office info
6. **Service page template** — build one (Laboral), then duplicate for others
7. **Remaining service pages** — Familia, Civil, Insolvencia, Sumarios
8. **Quiénes Somos** — about page
9. **Nicolás Yáñez** — lawyer profile
10. **Blog system** — listing page + individual post template
11. **Polish** — animations, responsive testing, SEO meta tags, OG images

---

*Last updated: 2026-04-21*
*Source: defensur.cl full crawl + project codebase analysis*
