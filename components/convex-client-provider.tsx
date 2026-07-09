"use client"

import { ReactNode } from "react"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { useAuth } from "@clerk/nextjs"

// Wrap in try-catch — during SSG (e.g., _not-found page), env vars might not be
// available or properly formatted. Fall back to rendering children without Convex.
function getConvexClient(): ConvexReactClient | null {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL
  if (!url) return null
  try {
    return new ConvexReactClient(url)
  } catch {
    return null
  }
}

const convex = getConvexClient()

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    return <>{children}</>
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  )
}
