# Defensur Panel — Setup Guide

This guide walks you through everything you need to do manually to get the Clerk + Convex auth system running. The code is already scaffolded and packages are installed — you just need to create accounts, get keys, and configure JWT templates.

---

## Step 1: Create a Clerk Account

1. Go to [clerk.com/sign-up](https://dashboard.clerk.com/sign-up)
2. Create an account
3. Create a new application — name it "Defensur"
4. In **User & Organizations → User authentication → Social connections**, enable **Google**
5. Go to **Integrations → Convex → Activate**
6. Copy your **Frontend API URL** (format: `https://verb-noun-00.clerk.accounts.dev`)
7. Go to **API Keys** → copy **Publishable Key** (`pk_test_...`) and **Secret Key** (`sk_test_...`)

## Step 2: Configure Clerk JWT Template (CRITICAL for roles)

The Convex integration auto-creates a JWT template called "convex". You need to ensure it includes the `metadata` claim so roles work.

1. Go to **JWT Templates** in Clerk Dashboard
2. Find the "convex" template (auto-created by the Convex integration)
3. Edit the template — ensure the claims include:
   ```json
   {
     "aud": "convex",
     "metadata": "{{user.public_metadata}}"
   }
   ```
4. Also go to **Sessions → Customize session token** and add:
   ```json
   { "metadata": "{{user.public_metadata}}" }
   ```
   (This makes role data available in both the session token and the Convex JWT)

**Why this matters:** The `metadata` claim carries `publicMetadata.role` from Clerk to Convex. Without it, Convex functions can't check roles — every user defaults to "client".

## Step 3: Set Redirect URLs

In Clerk Dashboard → **Sessions → Customize redirects**:

- Sign-in: `http://localhost:3000/sign-in`
- Sign-up: `http://localhost:3000/sign-up`
- After sign-in: `http://localhost:3000/panel`
- After sign-out: `http://localhost:3000/`

For production, add:
- `https://defensuraraucania.cl/sign-in`
- `https://defensuraraucania.cl/panel`

## Step 4: Create a Convex Account

1. Go to [convex.dev](https://dashboard.convex.dev) and sign up
2. Create a new project — name it "Defensur"
3. Copy the **Deployment URL** (format: `https://animated-fox-123.convex.cloud`)
4. Go to **Settings → Environment Variables** → add:
   - Name: `CLERK_JWT_ISSUER_DOMAIN`
   - Value: your Clerk Frontend API URL from Step 1.6

## Step 5: Create `.env.local`

Create a file at `D:\Projects\defensur\.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_CONVEX_URL=https://YOUR_PROJECT.convex.cloud
CLERK_JWT_ISSUER_DOMAIN=https://YOUR_APP.clerk.accounts.dev
```

## Step 6: Initialize Convex

```bash
cd D:\Projects\defensur
npx convex dev
```

This will:
- Create `convex/_generated/` (auto-generated types)
- Sync `convex/auth.config.ts` and `convex/schema.ts` to your backend
- Start watching for changes

Leave this running. It auto-redeploys when you edit files in `convex/`.

## Step 7: Test Locally

```bash
npm run dev
```

- `http://localhost:3000` → marketing site (no auth)
- `http://localhost:3000/panel` → redirects to sign-in
- Sign in with Google → land on `/panel`
- `/panel/consultas/nueva` → form to submit a consulta

## Step 8: Make Yourself Admin

After you've signed in once (creating your Clerk user):

1. Find your user ID:
   ```bash
   npm run admin:list-users
   ```
   Copy the ID (format: `user_xxxxx`)

2. Set yourself as admin:
   ```bash
   npm run admin:set-role user_xxxxx admin
   ```

3. **Sign out and sign back in** — existing JWT tokens don't pick up metadata changes until you re-authenticate.

## Admin Toolkit Commands

The `scripts/admin.mjs` CLI lets me manage your Clerk users and Convex data:

```bash
npm run admin                          # Show help
npm run admin:list-users               # List all Clerk users
npm run admin:set-role <id> <role>     # Set role (admin/client/staff)
npm run admin:ban <id>                 # Ban a user
npm run admin:unban <id>               # Unban a user
node scripts/admin.mjs get-user <id>   # Get user details
node scripts/admin.mjs whoami <id>     # Show user metadata
```

Once you create the Clerk account and give me the Secret Key, I can:
- List your users
- Set roles (admin, client, staff)
- Ban/unban users
- Query Convex tables
- Check consultas

## Step 9: Deploy to Vercel

1. Vercel → Project Settings → Environment Variables → add all 4 vars
2. Clerk → update redirect URLs to production domain
3. Deploy Convex:
   ```bash
   npx convex deploy
   ```
4. Convex dashboard → Settings → Environment Variables → add `CLERK_JWT_ISSUER_DOMAIN` for production
5. Push to `main` → Vercel auto-deploys

---

## Role System

| Role | Can access /panel | Can see all consultas | Can ban users | Can delete consultas |
|------|:-:|:-:|:-:|:-:|
| `client` | ✅ | ❌ (own only) | ❌ | ❌ |
| `staff` | ✅ | ✅ | ❌ | ❌ |
| `admin` | ✅ | ✅ | ✅ | ✅ |

New users get `client` by default. Use `npm run admin:set-role` to promote.

## Architecture

```
proxy.ts (clerkMiddleware) → sets auth context
    ↓
app/panel/layout.tsx → auth.protect() → redirect to /sign-in if not authenticated
    ↓
Clerk JWT (with metadata.role) → Convex auth.config.ts validates token
    ↓
Convex functions check identity.metadata.role for authorization
    ↓
admin.ts: staff/admin functions (listAll, updateStatus, ban, etc.)
consultas.ts: client functions (listMine, create, getMine)
```
