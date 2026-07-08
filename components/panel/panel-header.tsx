"use client"

import { useUser } from "@clerk/nextjs"

export function PanelHeader() {
  const { user } = useUser()

  const firstName = user?.fullName?.split(" ")[0] || "Defensur"
  const date = new Date().toLocaleDateString("es-CL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const formattedDate = date.charAt(0).toUpperCase() + date.slice(1)

  return (
    <header className="mb-8">
      <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
        Hola, {firstName}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{formattedDate}</p>
    </header>
  )
}
