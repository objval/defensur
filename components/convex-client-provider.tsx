"use client"

import type { ReactNode } from "react"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { useAuth } from "@clerk/nextjs"

const rawConvexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

if (!rawConvexUrl) {
  throw new Error("Falta NEXT_PUBLIC_CONVEX_URL")
}

// Sanitize URL to handle trailing spaces, quotes, or missing protocol
let convexUrl = rawConvexUrl.trim().replace(/^["']|["']$/g, "")
if (!convexUrl.startsWith("http://") && !convexUrl.startsWith("https://")) {
  convexUrl = `https://${convexUrl}`
}

let convex: ConvexReactClient
try {
  convex = new ConvexReactClient(convexUrl)
} catch (e) {
  throw new Error(
    `Error al inicializar ConvexReactClient con la URL "${convexUrl}" (original: "${rawConvexUrl}"): ${
      e instanceof Error ? e.message : String(e)
    }`
  )
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  )
}
