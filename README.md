# Defensur Araucanía

Website and authenticated client/staff panel for the Temuco law firm **Defensur Araucanía**.

- Primary domain: `https://defensuraraucania.cl`
- Alternate domain: `https://defensur.cl`
- Language: Chilean Spanish (`es-CL`)

## Stack

- Next.js 16 App Router + React 19 + TypeScript
- Tailwind CSS 4, shadcn/ui, Framer Motion
- Clerk authentication
- Convex database, realtime queries, and private attachments
- npm + `package-lock.json`

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` without committing it:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...
   NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
   ```

3. In the Convex deployment, set:

   ```env
   CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-frontend-api-domain
   CLERK_SECRET_KEY=sk_...
   ```

4. Generate/deploy the development Convex functions, then start Next.js:

   ```bash
   npx convex dev
   npm run dev
   ```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Run Next.js with Turbopack. |
| `npm run build` | Build the production site. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Run `tsc --noEmit`. |
| `npm run format` | Format source files with Prettier. Vendored agent templates are ignored. |
| `npm run convex` | Run Convex’s development watcher. |
| `npm run admin` | Show the local Clerk + Convex administration CLI help. |
| `npm run admin:list-users` | List Clerk users. |
| `npm run admin:set-role <userId> <role>` | Set `admin`, `staff`, or `client` in Clerk and Convex. |
| `npm run admin:ban <userId>` / `admin:unban <userId>` | Ban/unban in Clerk and mirror the change to Convex. |

The admin scripts use Node’s `--env-file=.env.local`, which requires a supported modern Node runtime.

## Authentication and panel

`/panel` is protected by Clerk and backed by Convex.

- The server-side authorization source of truth is the Convex `users` table.
- Clerk public metadata mirrors roles; it is not trusted as the backend authorization boundary.
- `convex/authz.ts` authenticates through `ctx.auth.getUserIdentity()` and rejects unknown/banned users.
- Clients can access only their own consultas; staff can manage all consultas; only admins can delete consultas or change account roles/bans.
- Attachments are private: upload, attachment, and download routes each check authorization.

See [`AGENTS.md`](./AGENTS.md) for the complete repository architecture and engineering constraints.

## Documentation status

- [`AGENTS.md`](./AGENTS.md): active engineering context.
- [`DEFENSUR.md`](./DEFENSUR.md): active product/architecture reference.
- [`DESIGN.md`](./DESIGN.md): panel design tokens and interaction conventions.
- [`audit-report.md`](./audit-report.md) and dated `.hermes/plans/` documents: historical snapshots; revalidate findings against current code before acting on them.
