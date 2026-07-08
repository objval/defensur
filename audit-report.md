# Defensur Araucanía — SEO, Accessibility & Metadata Audit Report
**Date:** 2026-07-08 | **Project:** D:\Projects\defensur | **Target:** defensuraraucania.cl (es_CL, Temuco/La Araucanía)

---

## Executive Summary

The Defensur website is well-architected with proper App Router metadata patterns, typed service/sentencia data, and accessible breadcrumb navigation. However, **4 critical issues** exist (broken OG image, missing Google Search Console, missing OG/Twitter on key pages, non-existent footer links). Priority effort should focus on fixing the broken OG image reference and adding OG/twitter metadata to the Nicolás Yáñez page and individual sentencia pages, then addressing structured data gaps and accessibility hierarchy issues.

---

## 1. METADATA ISSUES

### 🔴 CRITICAL

**F1 — Google Search Console not configured**
- **File:** `app/layout.tsx:100`
- **Category:** SEO / Technical
- **Impact:** HIGH — Blocks verifying site ownership in Google Search Console, preventing performance/monitoring data
- **Effort:** Low (5 min) — replace `undefined` with verification string
- **Detail:** `verification: { google: undefined  }` with comment `// Add when Search Console verification is done`

**F2 — OG image filename mismatch (broken OG image)**
- **File:** `app/(pages)/quienes-somos/page.tsx:14`
- **Category:** Metadata / Open Graph
- **Impact:** CRITICAL — Open Graph image will 404 on Facebook/X/LinkedIn shares for "Quiénes Somos" page
- **Effort:** Low (2 min)
- **Detail:** References `url: "/og/quienes-somos.png"` but actual file on disk is `public/og/quienes-somos.jpg`. Rename file or update reference.

### 🟠 HIGH

**F3 — "Nicolás Yáñez" page missing OG/Twitter metadata**
- **File:** `app/(pages)/nicolas-yanez/page.tsx:6-8`
- **Category:** Metadata / Social Sharing
- **Impact:** HIGH — Shares of this attorney profile page produce no image, no rich preview
- **Effort:** Low (10 min)
- **Detail:** Only `title` and `description` are exported. Add `openGraph` block with `/og/default.jpg` or a dedicated attorney OG image, plus `twitter` card.

**F4 — Individual sentencia pages missing `og:image`**
- **File:** `app/(pages)/sentencias/[slug]/page.tsx`
- **Category:** Metadata / Open Graph
- **Impact:** HIGH — Each sentencia detail page shares a rich OG metadata set but no image; shares will lack preview
- **Effort:** Medium (30 min)
- **Detail:** Metadata includes `og:type: article`, `publishedTime`, `authors`, `locale` but no `images: [...]`. Add `/og/sentencias.jpg` or per-sentencia OG image.

**F5 — `serviceToMetadata()` function returns no Twitter metadata**
- **File:** `lib/services-data.ts:239-247`
- **Category:** Metadata / Twitter Cards
- **Impact:** HIGH — All 5 service pages get OpenGraph metadata but zero Twitter Card metadata; Twitter shares have no image
- **Effort:** Low (15 min)
- **Detail:** Function returns `{ title, description, keywords, openGraph }` but no `twitter` field. Add `twitter: { card: "summary_large_image", title, description, images: [...] }`.

**F6 — Footer links to non-existent routes**
- **File:** `components/site-footer.tsx:117-130`
- **Category:** SEO / UX
- **Impact:** HIGH — Links to `/privacidad`, `/terminos`, and `/contacto` (as "Aviso Legal") will 404; damages site credibility and user trust
- **Effort:** Medium (1-2h to create content)
- **Detail:** These three links in the sub-footer ("Privacidad", "Términos de Uso", "Aviso Legal") have no corresponding routes. Either create the pages or remove the links.

### 🟡 MEDIUM

**F7 — Root `lang="es"` should be `lang="es-CL"`**
- **File:** `app/layout.tsx:115`
- **Category:** Metadata / Internationalization
- **Impact:** MEDIUM — All metadata uses locale `es_CL` but HTML `lang` attribute is `"es"` (generic Spanish). Screen readers and search engines get imprecise language signal
- **Effort:** Low (1 min)
- **Detail:** Change `<html lang="es">` to `<html lang="es-CL">` to match metadata locale.

**F8 — Missing `es` fallback in `alternates.languages`**
- **File:** `app/layout.tsx:34-36`
- **Category:** Metadata / Internationalization
- **Impact:** LOW-MEDIUM — Only `es-CL` is declared; generic Spanish language crawlers/users won't find a match
- **Effort:** Low (2 min)
- **Detail:** Add `"es": "https://www.defensuraraucania.cl"` as a fallback hreflang.

**F9 — Contact page `layout.tsx` has OG but no Twitter Card**
- **File:** `app/(pages)/contacto/layout.tsx`
- **Category:** Metadata / Twitter Cards
- **Impact:** MEDIUM — Contact page shares have OG but no Twitter preview image
- **Effort:** Low (5 min)

**F10 — Root OG title differs slightly from root title**
- **File:** `app/layout.tsx:42-44`
- **Category:** Metadata / Consistency
- **Impact:** LOW — Root title includes "Despidos y Finiquitos" but OG title trims it to "Abogados Laborales en Temuco". Minor brand dilution on social shares.
- **Effort:** Low (2 min)

---

## 2. STRUCTURED DATA (JSON-LD) ISSUES

### 🔴 CRITICAL

**F11 — SchemaOrg `"use client"` delays structured data injection**
- **File:** `components/schema-org.tsx:1` (line 1) + line 175 (`strategy="afterInteractive"`)
- **Category:** Structured Data
- **Impact:** HIGH — JSON-LD is static data; using `"use client"` with `afterInteractive` means Google may not see the structured data on first render/crawl pass
- **Effort:** Medium (2h)
- **Detail:** The component is declared `"use client"` and uses `next/script` with `strategy="afterInteractive"`. Could be a server component rendering inline `<script>` tags in the `<head>` for immediate indexing.

### 🟠 HIGH

**F12 — Schema `sameAs` only includes WhatsApp**
- **File:** `components/schema-org.tsx:68`
- **Category:** Structured Data / Entity Trust
- **Impact:** MEDIUM — Google uses `sameAs` to verify entity identity. Lacking Facebook, Instagram, TikTok links weakens trust signals.
- **Effort:** Low (10 min)
- **Detail:** Current: `sameAs: [WHATSAPP.url()]`. Should include all SOCIAL_LINKS URLs.

**F13 — FAQPage schema has empty `mainEntity: []`**
- **File:** `components/schema-org.tsx:152-154`
- **Category:** Structured Data
- **Impact:** MEDIUM — When `type === "FAQPage"`, baseSchema sets `mainEntity: []` (empty array). This produces invalid FAQ schema with no questions. The FAQ content from service pages and sentencia pages is never populated into the schema.
- **Effort:** HIGH (requires refactoring component to accept faqItems prop and type-specific customizations)

**F14 — No BreadcrumbList structured data on any page**
- **File:** All pages using `PageHero` component
- **Category:** Structured Data / Rich Results
- **Impact:** MEDIUM — Breadcrumb navigation is visually accessible (`aria-label="Breadcrumb"`) but no JSON-LD `BreadcrumbList` is generated. Breadcrumbs are a common Google rich result.
- **Effort:** Medium (1h)

**F15 — Individual sentencia pages have no Article/Sentencia structured data**
- **File:** `app/(pages)/sentencias/[slug]/page.tsx`
- **Category:** Structured Data
- **Impact:** MEDIUM — Pages declare `og:type: article` but inject no JSON-LD `Article` schema. The SchemaOrg component supports `type="Article"` but is never called from these pages.
- **Effort:** Medium (1h)

### 🟡 MEDIUM

**F16 — Service pages have no localized LegalService schema**
- **File:** All service page.tsx files
- **Category:** Structured Data
- **Impact:** LOW-MEDIUM — Only root layout renders SchemaOrg (generic LegalService). Per-service pages could inject service-specific schema with localized name, description, and serviceType.
- **Effort:** Medium (2h)

**F17 — Missing WebSite schema with SearchAction**
- **File:** `components/schema-org.tsx` (not present)
- **Category:** Structured Data
- **Impact:** LOW — Google Knowledge Graph entry lacks Sitelinks Search Box capability
- **Effort:** Low (30 min)

---

## 3. ACCESSIBILITY ISSUES

### 🟠 HIGH

**F18 — Footer heading hierarchy breaks sequential order**
- **File:** `components/site-footer.tsx:49, 62, 73`
- **Category:** Accessibility / Heading Hierarchy
- **Impact:** HIGH — Column titles "Servicios", "Empresa", "Contacto" use `<h5>` after page content typically ends at `<h2>` or `<h3>`. Screen reader users experience a jarring level skip (e.g., h2 → h5).
- **Effort:** Low (5 min)
- **Detail:** Change `<h5>` to `<h2>` or `<h3>` and adjust styling accordingly.

**F19 — No skip-to-content link**
- **File:** `app/layout.tsx` (entire file)
- **Category:** Accessibility / Navigation
- **Impact:** HIGH — Keyboard and screen reader users must tab through the entire navbar before reaching main content on every page load
- **Effort:** Low (15 min)
- **Detail:** Add a visually hidden skip link as the first child of `<body>` linking to `#main-content` or `<main>`.

**F20 — Avatar initials element in homepage hero lacks proper text alternative**
- **File:** `components/defensur-home-hero.tsx:89-97`
- **Category:** Accessibility / Non-text Content
- **Impact:** MEDIUM — The three avatar initials (`NY`, `SP`, `AS`) are `aria-hidden="true"` and wrapped in a `div[aria-label="Equipo de abogados"]`. However, the container's aria-label is fixed text — it doesn't enumerate who the initials represent.
- **Effort:** Low (10 min)
- **Detail:** Change the parent `aria-label` to enumerate the actual names (e.g., "Equipo: Nicolás Yáñez, Sebastián Pizarro, ...") or make each avatar individually accessible.

### 🟡 MEDIUM

**F21 — `text-[10px]` used on multiple badge/label elements**
- **Files:** Multiple components (`sentencia-detail.tsx`, `service-page-content.tsx`, `site-footer.tsx`, etc.)
- **Category:** Accessibility / Readability
- **Impact:** MEDIUM — WCAG SC 1.4.4 (Resize Text) requires text to be resizable up to 200%. 10px base text may fall below minimum thresholds when users zoom.
- **Effort:** Low (15 min)
- **Detail:** Applied to uppercase category badges, "Servicios"/"Empresa"/"Contacto" labels, "Redactado por" labels. Consider `text-xs` (12px) minimum.

**F22 — FAQ accordion clips content with `max-h-96`**
- **File:** `components/service-page-content.tsx:46-53`
- **Category:** Accessibility / Content Overflow
- **Impact:** MEDIUM — FAQ answers longer than ~96rem (approx 384px) will be clipped. Use `grid-template-rows` transition or height auto with JS for safe overflow.
- **Effort:** Low (15 min)
- **Detail:** Also applies to mobile nav which uses `max-h-[70svh]` — adequate but could clip on very small screens.

**F23 — Mobile menu lacks focus trap**
- **File:** `components/navbar.tsx:107-109`
- **Category:** Accessibility / Keyboard
- **Impact:** MEDIUM — When mobile menu is open, Tab key can still reach elements behind the overlay. Keyboard users can lose context.
- **Effort:** Medium (1h)
- **Detail:** Implement focus trapping when mobile menu is open; close menu on Escape key press.

**F24 — Contact form submit button lacks visible focus indicator when navigating page**
- **File:** `components/contact-form.tsx:158-161`
- **Category:** Accessibility / Focus
- **Impact:** LOW — Button has `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` which is acceptable but depends on proper `ring` CSS variable being defined.
- **Effort:** Low (10 min)

**F25 — Logo image `alt="Defensur"` is acceptable but minimal**
- **File:** `components/navbar.tsx:112` and `components/site-footer.tsx:20`
- **Category:** Accessibility / Alt Text
- **Impact:** LOW — The logo is accompanied by visible text "Defensur" immediately adjacent, so `alt="Defensur"` is technically sufficient (decorative). Consider `alt=""` with `role="presentation"` to avoid redundancy.
- **Effort:** Low (5 min)

---

## 4. SEO OPPORTUNITIES

### 🟠 HIGH

**F26 — No analytics or tracking implemented**
- **File:** `app/layout.tsx` (entire file)
- **Category:** SEO / Analytics
- **Impact:** HIGH — No way to measure traffic, conversions, user behavior, or optimize for search performance
- **Effort:** Medium (2h)
- **Detail:** No Google Analytics, no GTM, no privacy-friendly alternative visible.

**F27 — Sitemap is static XML, requires manual updates**
- **File:** `public/sitemap.xml`
- **Category:** SEO / Crawlability
- **Impact:** MEDIUM — When new sentencias (judgments) are added, the sitemap must be manually updated. Currently has 22 URLs (12 static pages + 10 sentencia pages). Missing dynamic generation.
- **Effort:** HIGH (2-3d for dynamic sitemap generation)
- **Detail:** Consider using Next.js dynamic `sitemap.ts` route handler to auto-generate from sentencias-data.ts.

**F28 — No images in sitemap**
- **File:** `public/sitemap.xml`
- **Category:** SEO / Image Indexing
- **Impact:** LOW-MEDIUM — OG images, team photos, and other images are not declared in sitemap for Google Image Search
- **Effort:** Low (30 min)
- **Detail:** Add `<image:image>` tags to sitemap entries where relevant.

**F29 — Missing `sameAs` in root layout metadata**
- **File:** `app/layout.tsx` (not present)
- **Category:** SEO / Entity Signals
- **Impact:** MEDIUM — Next.js Metadata API allows setting `other: { ... }` but structured `sameAs` in JSON-LD is the stronger signal. Root metadata could repeat sameAs links via `other` for HTML-level entity signals.
- **Effort:** Low (10 min)

---

## 5. TECHNICAL / MOBILE ISSUES

### 🟡 MEDIUM

**F30 — No service worker for offline/PWA support**
- **File:** Not present anywhere in project
- **Category:** Technical / PWA
- **Impact:** MEDIUM — `manifest.json` exists with proper config (standalone display, icons, theme_color) but no service worker registration. Users cannot install as PWA or access offline.
- **Effort:** HIGH (3-5d for proper service worker)

**F31 — No `viewport` meta tag flexibility for zoom**
- **File:** Not explicitly set (Next.js defaults)
- **Category:** Mobile / Accessibility
- **Impact:** LOW — Next.js sets viewport by default, but ensure users can pinch-zoom (don't set `user-scalable=no` or `maximum-scale=1`).
- **Effort:** Low (2 min to verify)

---

## 6. IMAGE AUDIT

All referenced images verified against `public/` directory:

| Referenced Path | Status | Notes |
|---|---|---|
| `/favicon.ico` | ✅ Exists | |
| `/icon-192.png` | ✅ Exists | |
| `/icon-512.png` | ✅ Exists | |
| `/apple-touch-icon.png` | ✅ Exists | |
| `/logo.png` | ✅ Exists | |
| `/logo.svg` | ✅ Exists | |
| `/og/default.jpg` | ✅ Exists | |
| `/og/laboral.jpg` | ✅ Exists | |
| `/og/familia.jpg` | ✅ Exists | |
| `/og/civil.jpg` | ✅ Exists | |
| `/og/insolvencia.jpg` | ✅ Exists | |
| `/og/contacto.jpg` | ✅ Exists | |
| `/og/sentencias.jpg` | ✅ Exists | |
| `/og/calculadoras.jpg` | ✅ Exists | |
| `/og/quienes-somos.jpg` | ✅ Exists | File exists as .jpg |
| `/og/quienes-somos.png` | ❌ BROKEN | **F2** — Code references `.png`, file is `.jpg` |
| `/team/nicolas.webp` | ✅ Exists | |
| `/team/sebastian.webp` | ✅ Exists | |
| `/team/millaray.jpeg` | ✅ Exists | |
| `/team/carolina.jpeg` | ✅ Exists | |
| `/team/constanza-ampuero.jpeg` | ✅ Exists | |
| `/team/genesis-carrillo.jpeg` | ✅ Exists | |

---

## 7. HEADING HIERARCHY PER PAGE TYPE

| Page Type | H1 | H2 | H3 | Issues |
|---|---|---|---|---|
| Home (`/`) | "Justicia con Arquitectura Legal" | In WhyDefensur, TeamSection | ContactForm heading (<h3>) | ✅ Good |
| Service pages | PageHero (`<h1>`) | Section headings (intro, details) | Highligh cards, FAQ question buttons | ✅ Good |
| Quiénes Somos | PageHero (`<h1>`) | Story, Team heading | Team member names | ⚠️ Team member name uses `<h3>` — OK |
| Sentencia detail | Case title (`<h1>`) | "Contexto del Caso", "El Fallo", FAQ | Section details | ✅ Good |
| Footer | N/A | None — uses `<h5>` for column titles | N/A | ❌ **F18** — `<h5>` breaks sequential hierarchy |

---

## 8. STRUCTURED DATA COVERAGE MAP

| Schema Type | Present? | Location | Issue |
|---|---|---|---|
| `LegalService` (Organization) | ✅ | Root layout via schema-org.tsx | `"use client"`, delayed (F11) |
| `PostalAddress` | ✅ | Nested in LegalService | OK |
| `GeoCoordinates` | ✅ | Nested in LegalService | OK |
| `OfferCatalog` | ✅ | Nested in LegalService | OK |
| `FAQPage` | 🟡 | Component supports it, never called with proper data | Empty `mainEntity` (F13) |
| `Article` | 🟡 | Component supports it, not called on sentencia pages | Missing (F15) |
| `BreadcrumbList` | ❌ | Not implemented anywhere | Missing (F14) |
| `WebSite` | ❌ | Not implemented | Missing (F17) |
| `Person` / `Attorney` | ❌ | Not implemented for Nicolás Yáñez page | Missing |
| `Review` | ❌ | Not implemented for sentencias | Opportunity |

---

## 9. RECOMMENDED PRIORITY ACTIONS

### 🔴 Fix Immediately (Day 1)
1. **Fix OG image filename** — Update `quienes-somos/page.tsx` to reference `/og/quienes-somos.jpg` instead of `.png` (F2)
2. **Add OG/Twitter to Nicolás Yáñez page** — Add `openGraph` and `twitter` metadata (F3)
3. **Add `og:image` to sentencia detail pages** — Add images array to metadata in `sentencias/[slug]/page.tsx` (F4)
4. **Remove or implement footer legal links** — Either create `/privacidad`, `/terminos`, `/contacto` (aviso legal) routes or remove links (F6)
5. **Configure Google Search Console** — Add verification string (F1)

### 🟠 Fix This Week (Day 2-3)
6. **Add Twitter metadata to `serviceToMetadata()`** (F5)
7. **Fix footer heading hierarchy** — Change `<h5>` to `<h2>`/`<h3>` (F18)
8. **Add skip-to-content link** (F19)
9. **Add BreadcrumbList structured data to PageHero** (F14)
10. **Fix `lang="es"` → `lang="es-CL"`** (F7)
11. **Add social media to `sameAs`** in SchemaOrg (F12)

### 🟡 Fix This Sprint (Day 3-5)
12. **Refactor SchemaOrg to server component** (F11)
13. **Implement FAQPage schema with real questions** (F13)
14. **Add focus trap to mobile menu** (F23)
15. **Add Article structured data to sentencia pages** (F15)
16. **Add Google Analytics or privacy-friendly alternative** (F26)

### 📋 Backlog (Future Sprints)
17. Dynamic sitemap generation (F27)
18. PWA service worker (F30)
19. Per-service localized LegalService schema (F16)
20. WebSite SearchAction schema (F17)
21. `hreflang="es"` fallback (F8)

---

## 10. FILES AUDITED

- `app/layout.tsx` — Root metadata, SchemaOrg, fonts
- `app/page.tsx` — Homepage metadata
- `app/(pages)/layout.tsx` — Subpage layout
- `app/(pages)/derecho-laboral-temuco/page.tsx`
- `app/(pages)/abogados-familia-temuco/page.tsx`
- `app/(pages)/derecho-civil-temuco/page.tsx`
- `app/(pages)/insolvencia-y-reemprendimiento-temuco/page.tsx`
- `app/(pages)/sumarios-administrativos-temuco/page.tsx`
- `app/(pages)/contacto/page.tsx`
- `app/(pages)/contacto/layout.tsx`
- `app/(pages)/quienes-somos/page.tsx`
- `app/(pages)/nicolas-yanez/page.tsx`
- `app/(pages)/sentencias/page.tsx`
- `app/(pages)/sentencias/[slug]/page.tsx`
- `app/(pages)/calculadoras/page.tsx`
- `app/(pages)/calculadoras/layout.tsx`
- `components/schema-org.tsx`
- `components/navbar.tsx`
- `components/site-footer.tsx`
- `components/contact-form.tsx`
- `components/page-hero.tsx`
- `components/service-page-content.tsx`
- `components/defensur-home-hero.tsx`
- `components/sentencia-detail.tsx`
- `lib/site.ts`
- `lib/services-data.ts`
- `lib/sentencias-data.ts`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/manifest.json`
- `public/og/` (9 OG images)
- `public/team/` (6 team images)
