# Defensur — Product and Architecture Reference

> Active reference as of 2026-07-09. Historical implementation plans are under `.hermes/plans/` and must not be treated as current state.

## Product

Defensur Araucanía is a Temuco-based legal practice focused on:

- Derecho laboral
- Derecho de familia
- Derecho civil
- Insolvencia y reemprendimiento
- Sumarios administrativos

The public site is a static, SEO-oriented Next.js application. The protected `/panel` lets clients submit and track consultas while staff/admin users manage the workflow.

## Public site

- All public contact information is defined in `lib/site.ts`.
- Service content and per-service metadata are in `lib/services-data.ts`.
- Sentencia listings/detail routes are driven by `lib/sentencias-data.ts`.
- Public pages use the `(pages)` route-group layout; the homepage has its own navbar wrapper.
- The primary canonical, Open Graph, and social domain is `defensuraraucania.cl`.
- The visual system is light-only, with Noto Serif for headings and Manrope for UI/body copy.

## Panel architecture

```text
Browser
  └─ ClerkProvider + ConvexProviderWithClerk
      └─ Clerk JWT
          └─ Convex auth.config.ts validates issuer
              └─ authz.ts resolves identity to Convex users table
                  ├─ consultas.ts: self-service client operations
                  ├─ files.ts: private attachment upload/download authorization
                  ├─ admin.ts: staff/admin operations and internal user state
                  └─ adminActions.ts: admin-only Clerk synchronization
```

### Authorization

| Role | Scope |
|---|---|
| `client` | Own consultas and attachments only. |
| `staff` | View/update all consultas and view authorized attachments. |
| `admin` | Staff capabilities plus deletion and user role/ban management. |

The `users` table is authoritative for backend roles and bans. Clerk `publicMetadata.role` mirrors that state for Clerk-aware UI and sessions, but Convex handlers do not trust browser state or unverified client claims for authorization.

### Consultas and attachments

- Public contact submissions are validated and bounded server-side.
- Authenticated client submissions are tied to the Clerk identity.
- Staff responses record the authenticated responder identity server-side.
- Convex Storage uploads are limited to PDF/JPEG/PNG/DOCX, 10 MB per file, and 5 attachments per consulta.
- A storage URL alone is insufficient to download a file; `files.getFileUrl` verifies the consulta and caller first.

### Administrative synchronization

Role/ban changes from the panel flow through `convex/adminActions.ts`. The action validates the current admin in Convex, updates Clerk’s Backend API, then calls an internal Convex mutation that rechecks privileges and prevents self-modification or removal of the last active admin.

The local `scripts/admin.mjs` command performs the same Clerk-to-Convex synchronization for operational use.

## Deployment checklist

1. Configure Clerk production keys in Vercel.
2. Set `NEXT_PUBLIC_CONVEX_URL` in Vercel.
3. Set `CLERK_JWT_ISSUER_DOMAIN` and `CLERK_SECRET_KEY` in the Convex deployment.
4. Run Convex code generation/deploy for the target environment.
5. Verify unauthenticated public forms, client panel access, staff workflow, admin role updates, and private attachment downloads.
6. Run `npm run lint`, `npm run typecheck`, and `npm run build` before release.

## Current non-goals

- No CMS.
- No cookie-consent/analytics integration.
- No review/testimonial system.
- `/privacidad` and `/terminos` have not yet been implemented.
