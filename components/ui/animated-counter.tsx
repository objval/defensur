"use client"

import * as React from "react"
import { useReducedMotion, useInView, animate } from "framer-motion"

type AnimatedCounterProps = {
  value: string
  className?: string
  duration?: number
}

/**
 * Animates stat values that contain numbers.
 * Parses "+15", "$150M+", "98%" etc. and animates the numeric part.
 * Respects prefers-reduced-motion.
 */
export function AnimatedCounter({ value, className, duration = 1.2 }: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = React.useState(value)

  React.useEffect(() => {
    if (!inView || reduceMotion) return

    // Parse the numeric part from strings like "+15", "$150M+", "98%"
    const match = value.match(/(\D*)(\d+(?:\.\d+)?)(.*)/)
    if (!match) return

    const [, prefix, numStr, suffix] = match
    const target = parseFloat(numStr)
    if (isNaN(target)) return

    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const rounded = Number.isInteger(target) ? Math.round(v) : v.toFixed(1)
        setDisplay(`${prefix}${rounded}${suffix}`)
      },
    })

    return () => controls.stop()
  }, [inView, value, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
