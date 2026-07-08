# Defensur Panel — Setup Guide

This guide walks you through everything you need to do manually to get the Clerk + Convex auth system running. The code is already scaffolded — you just need to create accounts, get keys, and run install commands.

---

## Step 1: Install Dependencies

```bash
cd D:\Projects\defensur
npm install @clerk/nextjs convex react-hook-form @hookform/resolvers zod
```

## Step 2: Create a Clerk Account

1. Go to [clerk.com/sign-up](https://dashboard.clerk.com/sign-up)
2. Create an account
3. Create a new application — name it "Defensur"
4. In **User & Organizations → User authentication → Social connections**, enable **Google**
5. Go to **Integrations → Convex → Activate**
6. Copy your **Frontend API URL** (format: `https://verb-noun-00.clerk.accounts.dev`)
7. Go to **API Keys** → copy **Publishable Key** (`pk_test_...`) and **Secret Key** (`sk_test_...`)
8. Go to **Sessions → Customize session token** → add claim:
   ```json
   { "metadata": "{{user.public_metadata}}" }
   ```
   (This makes role data available in the JWT for Convex)
9. Go to **JWT Templates** → find the "convex" template (auto-created by the integration) → verify it has:
   ```json
   { "aud": "convex", "metadata": "{{user.public_metadata}}" }
   ```
10. Set **Redirect URLs**:
    - Sign-in: `http://localhost:3000/sign-in`
    - Sign-up: `http://localhost:3000/sign-up`
    - After sign-in: `http://localhost:3000/panel`
    - After sign-out: `http://localhost:3000/`

## Step 3: Create a Convex Account

1. Go to [convex.dev](https://dashboard.convex.dev) and sign up
2. Create a new project — name it "Defensur"
3. Copy the **Deployment URL** (format: `https://animated-fox-123.convex.cloud`)
4. Go to **Settings → Environment Variables** → add:
   - Name: `CLERK_JWT_ISSUER_DOMAIN`
   - Value: your Clerk Frontend API URL from Step 2.6

## Step 4: Create `.env.local`

Create a file at `D:\Projects\defensur\.env.local` with:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_CONVEX_URL=https://YOUR_PROJECT.convex.cloud
CLERK_JWT_ISSUER_DOMAIN=https://YOUR_APP.clerk.accounts.dev
```

Replace all 4 values with your actual keys from Steps 2 and 3.

## Step 5: Initialize Convex

```bash
cd D:\Projects\defensur
npx convex dev
```

This will:
- Create `convex/_generated/` (auto-generated types — don't edit)
- Sync `convex/auth.config.ts` and `convex/schema.ts` to your Convex backend
- Start a dev server that watches for changes

Leave this running in a terminal. It auto-redeploys when you edit files in `convex/`.

## Step 6: Test Locally

```bash
npm run dev
```

Open `http://localhost:3000` — the marketing site should work as before (no auth required).

Go to `http://localhost:3000/panel` — you should be redirected to the sign-in page.

Click "Continue with Google" → sign in with your Google account → you should land on `/panel`.

## Step 7: Make Yourself an Admin (Optional — for future admin panel)

After you've signed in once (so your Clerk user exists):

1. Go to Clerk Dashboard → **Users** → find your user → copy the **User ID** (format: `user_xxxxx`)
2. Run this command (replace the ID):
   ```bash
   npx clerk-cli api /users/user_xxxxx -X PATCH -d '{"public_metadata":{"role":"admin"}}'
   ```
   Or do it in the Dashboard: **Users → your user → Metadata → Public metadata** → add:
   ```json
   { "role": "admin" }
   ```
3. Sign out and sign back in (existing sessions don't pick up metadata changes)

## Step 8: Deploy to Vercel

1. In Vercel project settings → **Environment Variables**, add all 4 variables from `.env.local`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CONVEX_URL`
   - `CLERK_JWT_ISSUER_DOMAIN`
2. In Clerk Dashboard → update redirect URLs to production domain:
   - Sign-in: `https://defensuraraucania.cl/sign-in`
   - After sign-in: `https://defensuraraucania.cl/panel`
3. Deploy Convex to production:
   ```bash
   npx convex deploy
   ```
4. In Convex dashboard → Settings → Environment Variables → add `CLERK_JWT_ISSUER_DOMAIN` for production too (use the production Clerk Frontend API URL, format: `https://clerk.defensuraraucania.cl`)
5. Push to `main` and let Vercel auto-deploy

---

## Architecture Overview

```
User visits /panel
    ↓
proxy.ts (clerkMiddleware) — sets auth context, no route matching
    ↓
app/panel/layout.tsx — calls auth.protect()
    ↓ (not authenticated → redirect to /sign-in)
    ↓ (authenticated → render PanelShell)
    ↓
PanelShell (client) — sidebar + UserButton
    ↓
Panel page — dashboard with quick actions
    ↓
/panel/consultas/nueva — ConsultaForm (react-hook-form + zod)
    ↓
Convex mutation (api.consultas.create) — stores in Convex DB
    ↓
/panel/consultas — realtime list via Convex useQuery
```

## File Structure

```
proxy.ts                                    — Clerk middleware (Next.js 16 Proxy)
.env.local                                  — Environment variables (NOT in git)
components/
  convex-client-provider.tsx                — ConvexProviderWithClerk wrapper (client)
  panel/
    panel-shell.tsx                         — Panel layout shell (sidebar + content)
    panel-sidebar.tsx                       — Sidebar nav with UserButton
    consulta-form.tsx                       — Zod-validated consulta form
app/
  layout.tsx                                — Root: ClerkProvider → ConvexClientProvider → ThemeProvider
  sign-in/[[...rest]]/page.tsx              — Clerk SignIn (Google OAuth)
  sign-up/[[...rest]]/page.tsx              — Clerk SignUp
  panel/
    layout.tsx                              — auth.protect() — redirects if not signed in
    page.tsx                                — Dashboard with quick action cards
    consultas/
      page.tsx                              — Realtime consultas list (Convex useQuery)
      nueva/page.tsx                        — Nueva consulta form
  dashboard/[[...rest]]/page.tsx            — /dashboard → /panel redirect
convex/
  auth.config.ts                            — Clerk JWT provider config
  schema.ts                                 — Consultas table with indexes
  consultas.ts                              — listMine, getMine, create functions
lib/
  consulta-schema.ts                        — Zod schema + label constants
  site.ts                                   — (existing) shared site data
```

## Key Patterns

- **Route protection**: `auth.protect()` in `app/panel/layout.tsx` — not in proxy.ts. Clerk's recommended pattern for Next.js 16.
- **No `createRouteMatcher()`**: Deprecated. Route protection is at the resource level.
- **`proxy.ts` not `middleware.ts`**: Next.js 16 renamed middleware to Proxy.
- **Convex auth**: `ConvexProviderWithClerk` bridges Clerk's `useAuth` with Convex's realtime client. Token refresh is automatic.
- **`useConvexAuth()` not `useAuth()`**: When checking if Convex auth is ready, use `useConvexAuth()` from `convex/react` (not Clerk's `useAuth`).
- **Convex queries return `null` before auth**: Functions check `ctx.auth.getUserIdentity()` and return `null` if not ready, so the UI re-renders when auth establishes.
