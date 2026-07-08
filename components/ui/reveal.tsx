"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  as?: "div" | "section" | "article" | "li" | "span"
}

/**
 * Scroll-triggered reveal animation.
 * Fades + slides up when entering viewport.
 * Respects prefers-reduced-motion (no animation, just shows content).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Staggered container for revealing multiple children in sequence.
 * Wrap children in <RevealGroup> and each child in <Reveal>.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Use inside <RevealGroup> for staggered children.
 */
export function RevealItem({
  children,
  className,
  y = 20,
}: {
  children: React.ReactNode
  className?: string
  y?: number
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
