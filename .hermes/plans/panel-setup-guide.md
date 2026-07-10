# Defensur Panel — Clerk + Convex Setup Guide

> Active setup guide as of 2026-07-09. Do not copy values from this document into source control.

## 1. Clerk

1. Create/open the Defensur Clerk application.
2. Configure the approved local and production redirect URLs:
   - `http://localhost:3000/sign-in`
   - `http://localhost:3000/sign-up`
   - `http://localhost:3000/panel`
   - `https://defensuraraucania.cl/sign-in`
   - `https://defensuraraucania.cl/panel`
3. Copy the Publishable Key and Secret Key from **API Keys**.
4. Enable the Convex integration or create the Clerk JWT template required by Convex. The issuer must match the Clerk Frontend API domain configured below.

The current backend does **not** authorize from Clerk metadata claims. `publicMetadata.role` is mirrored for Clerk but Convex reads role and ban state from its own `users` table.

## 2. Convex

Create/open the project deployment and set its environment variables:

```env
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-frontend-api-domain
CLERK_SECRET_KEY=sk_...
```

`CLERK_JWT_ISSUER_DOMAIN` must correspond to the issuer domain accepted by `convex/auth.config.ts`. `CLERK_SECRET_KEY` is required only for privileged `adminActions.ts` to synchronize changes back to Clerk.

## 3. Local environment

Create `D:\Projects\defensur\.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

Keep this file untracked. Convex reads its own deployment variables; do not rely on a browser-exposed environment value for backend secrets.

## 4. Run locally

```bash
cd D:\Projects\defensur
npx convex dev
npm run dev
```

`convex dev` generates `convex/_generated/` and deploys the development functions. Keep it running while iterating on `convex/` source.

## 5. First administrator

1. Sign in to `/panel` once.
2. Find the Clerk user ID:

   ```bash
   npm run admin:list-users
   ```

3. Assign the role and mirror it to Convex:

   ```bash
   npm run admin:set-role user_xxx admin
   ```

4. Re-authenticate to refresh Clerk session metadata. Convex permissions update immediately after the synchronization succeeds.

## 6. Operational commands

```bash
npm run admin
npm run admin:list-users
npm run admin:set-role <userId> <admin|staff|client>
npm run admin:ban <userId>
npm run admin:unban <userId>
```

The CLI loads `.env.local` using Node’s `--env-file` flag, preserves existing Clerk public metadata, and invokes internal Convex synchronization. Never run it with an untrusted user ID or a production secret in shared logs.

## 7. Acceptance test

- [ ] `npx convex dev` or `npx convex codegen` succeeds.
- [ ] `npm run lint`, `npm run typecheck`, and `npm run build` succeed.
- [ ] Logged-out `/panel` requests redirect to Clerk sign-in.
- [ ] Signed-in clients can create, list, cancel, and comment on their own consultas.
- [ ] Staff can list/update all consultas but cannot delete them or administer users.
- [ ] Admins can change another user’s role/ban state, while the last active admin and their own account remain protected.
- [ ] Uploads outside the allowed type/size limits are rejected; an unauthorized user cannot obtain an attachment URL.

## 8. Production

1. Set the three browser/Next.js variables in Vercel: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, and `NEXT_PUBLIC_CONVEX_URL`.
2. Set `CLERK_JWT_ISSUER_DOMAIN` and `CLERK_SECRET_KEY` in the production Convex deployment.
3. Deploy Convex to the intended production deployment.
4. Deploy the Vercel build.
5. Perform the acceptance test with a client, staff account, and a separate admin account.
