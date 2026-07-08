"use client"

import { motion } from "framer-motion"
import { AnimatedValue } from "./animated-value"

export function ResultRow({
  label,
  value,
  accent = false,
  delay = 0,
}: {
  label: string
  value: string
  accent?: boolean
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex items-center justify-between"
    >
      <span className={`text-sm ${accent ? "text-white/80" : "text-white/60"}`}>{label}</span>
      <span className={`font-semibold tabular-nums ${accent ? "text-brand-sky text-xl" : "text-white"}`}>
        <AnimatedValue value={value} />
      </span>
    </motion.div>
  )
}
