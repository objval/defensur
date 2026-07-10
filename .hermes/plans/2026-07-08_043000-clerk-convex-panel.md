# Defensur Panel — Clerk + Convex Auth & Consulta Especializada

> **Historical implementation plan (superseded).** The panel, realtime consultas, uploads, and role-based administration are implemented. Use `AGENTS.md` and `.hermes/plans/panel-setup-guide.md` for current architecture and setup.

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.
> **Status:** Initial structure scaffolded. Code is ready — just needs `npm install` + `.env.local` + `npx convex dev`.

**Goal:** Add a `/panel` route (aliased as `/dashboard`) with Clerk Google OAuth + Convex backend, enabling authenticated users to submit a "Consulta Especializada" inquiry.

**Architecture:** Clerk handles auth (Google OAuth). Convex provides the realtime database. `proxy.ts` (Next.js 16 — renamed from middleware) sets up Clerk auth context with bare `clerkMiddleware()`. Route protection is done at the resource level via `auth.protect()` in `app/panel/layout.tsx` — Clerk's recommended pattern (not `createRouteMatcher()`, which is deprecated). `ConvexProviderWithClerk` bridges Clerk's auth with Convex's realtime client.

**Tech Stack:** Next.js 16 (App Router, proxy.ts), @clerk/nextjs, convex, react-hook-form + zod, Tailwind CSS 4

**Setup Guide:** See `.hermes/plans/panel-setup-guide.md` for the manual steps (Clerk account, Convex account, env vars, deploy).

---

## Already Scaffolded (no changes needed)

These files are committed and ready. They will compile once `npm install @clerk/nextjs convex react-hook-form @hookform/resolvers zod` is run.

| File | Status |
|------|--------|
| `proxy.ts` | ✅ Clerk middleware (Next.js 16 Proxy pattern) |
| `components/convex-client-provider.tsx` | ✅ ConvexProviderWithClerk wrapper |
| `components/panel/panel-shell.tsx` | ✅ Panel layout shell |
| `components/panel/panel-sidebar.tsx` | ✅ Sidebar nav + UserButton |
| `components/panel/consulta-form.tsx` | ✅ Zod-validated form with Convex mutation |
| `app/layout.tsx` | ✅ Updated: ClerkProvider → ConvexClientProvider → ThemeProvider |
| `app/panel/layout.tsx` | ✅ auth.protect() — redirects if not signed in |
| `app/panel/page.tsx` | ✅ Dashboard with quick action cards |
| `app/panel/consultas/page.tsx` | ⚠️ Placeholder — needs realtime list (Task 1) |
| `app/panel/consultas/nueva/page.tsx` | ✅ Consulta form page |
| `app/sign-in/[[...rest]]/page.tsx` | ✅ Clerk SignIn with brand styling |
| `app/sign-up/[[...rest]]/page.tsx` | ✅ Clerk SignUp with brand styling |
| `app/dashboard/[[...rest]]/page.tsx` | ✅ /dashboard → /panel redirect |
| `convex/auth.config.ts` | ✅ Clerk JWT provider config |
| `convex/schema.ts` | ✅ Consultas table with indexes |
| `convex/consultas.ts` | ✅ listMine, getMine, create functions |
| `lib/consulta-schema.ts` | ✅ Zod schema + label constants |
| `.gitignore` | ✅ Includes .env.local, .convex/ |

---

## Remaining Tasks

### Task 1: Replace consultas list placeholder with realtime list

**Objective:** Show user's consultas in realtime using Convex useQuery.

**Files:**
- Modify: `app/panel/consultas/page.tsx`

The code for this is in the original plan at `.hermes/plans/2026-07-08_043000-clerk-convex-panel.md` Task 11. The page needs to become a client component using `useQuery(api.consultas.listMine, {})` with `<Authenticated>` / `<Unauthenticated>` wrappers from `convex/react`.

### Task 2: Update AGENTS.md with panel architecture

Add a "Panel / Dashboard (Authenticated)" section documenting the auth stack, Convex schema, environment variables, and key files. See the original plan Task 12 for the content.

### Task 3: Verify build after npm install

```bash
npm install @clerk/nextjs convex react-hook-form @hookform/resolvers zod
npx convex dev  # generates convex/_generated/
npm run build
```

Expected: 30+ pages, 0 errors.

---

## Verification Checklist

After all tasks + manual setup complete:

- [ ] `npm run build` passes (0 errors, 30+ pages)
- [ ] `/sign-in` renders Clerk SignIn component with Google OAuth
- [ ] `/sign-up` renders Clerk SignUp component
- [ ] Visiting `/panel` while logged out redirects to `/sign-in`
- [ ] After Google OAuth sign-in, redirects to `/panel`
- [ ] `/dashboard` redirects to `/panel`
- [ ] Panel sidebar shows with UserButton
- [ ] `/panel/consultas/nueva` renders the form
- [ ] Submitting the form creates a Convex record
- [ ] `/panel/consultas` shows the submitted consulta in realtime
- [ ] Sign-out via UserButton returns to `/`
- [ ] Marketing pages still work without auth

## Risks & Open Questions

1. **Clerk + Vercel deployment**: Add all 4 env vars to Vercel project settings.
2. **Convex production**: Run `npx convex deploy` when going live.
3. **File uploads**: Schema has `attachmentUrl` but upload is NOT implemented. Convex file storage can be added later.
4. **Admin view**: This plan only covers the client panel. An admin view for Defensur staff would need role-based access via `publicMetadata.role = "admin"`.
5. **Clock skew**: If running on Windows, ensure system time is synced (`w32tm /resync /force` in admin PowerShell) — Clerk JWT validation can fail if clock is behind.
