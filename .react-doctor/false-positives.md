# React Doctor — False Positives

## react-doctor/no-unknown-property
- `<style jsx global>` in `components/marquee.tsx` — styled-jsx is natively supported by Next.js; `jsx` and `global` are valid attributes.

## react-doctor/control-has-associated-label
- Inputs at `components/defensur-home-hero.tsx` lines ~440, ~469, ~498 — each input has an associated `<label htmlFor="...">` directly above it.

## deslop/unused-file
- `components/animated-select.tsx` — imported by `defensur-home-hero.tsx`
- `components/defensur-home-hero.tsx` — imported by `app/page.tsx`
- `components/marquee.tsx` — imported by `why-defensur.tsx`
- `components/progressive-blur.tsx` — standalone component, used in design system
- `components/team-section.tsx` — imported by `defensur-home-hero.tsx`
- `components/theme-provider.tsx` — imported by `app/layout.tsx`
- `components/ui/button.tsx` — imported by `defensur-home-hero.tsx`
- `components/why-defensur.tsx` — imported by `defensur-home-hero.tsx`
- `lib/utils.ts` — imported transitively by multiple components

## react-doctor/prefer-tag-over-role
- `components/team-section.tsx:64` — `role="listitem"` on a CSS grid item; the parent is `grid`, not `list`, so `<li>` would be semantically incorrect.

## deslop/unused-dev-dependency
- `react-doctor` — this is the tool currently scanning the project; needed during development.
