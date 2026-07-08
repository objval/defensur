"use client"

import { ReactNode } from "react"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { useAuth } from "@clerk/nextjs"

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

// Lazy-init so the build doesn't crash when CONVEX_URL isn't set yet
let convex: ConvexReactClient | null = null
if (convexUrl) {
  convex = new ConvexReactClient(convexUrl)
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    // Convex not configured yet — render children without provider
    // This allows the build to pass before `npx convex dev` is run
    return <>{children}</>
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  )
}
