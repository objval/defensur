"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type MarqueeProps = {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  repeat?: number
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  repeat = 4,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "flex w-full overflow-hidden [gap:var(--gap,1rem)]",
        className
      )}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
      }}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 [animation-duration:var(--duration,30s)] [gap:var(--gap,1rem)] [animation-name:scroll] [animation-timing-function:linear] [animation-iteration-count:infinite]",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
      <style jsx global>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - var(--gap, 1rem)));
          }
        }
      `}</style>
    </div>
  )
}
