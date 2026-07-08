// proxy.ts — Next.js 16 Proxy (renamed from Middleware in Next.js 16).
// Clerk auth context setup. Route protection is done at the component level
// via auth.protect() in server components/layouts, NOT here.

import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware()

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest).*)/)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
}
