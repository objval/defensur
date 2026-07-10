"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, Landmark } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { SueldoInputs } from "@/components/calculadoras/sueldo-inputs"
import { ResultadosSueldo } from "@/components/calculadoras/resultados-sueldo"
import { AlimentosInputs } from "@/components/calculadoras/alimentos-inputs"
import { ResultadosAlimentos } from "@/components/calculadoras/resultados-alimentos"
import { CalculadoraCta } from "@/components/calculadoras/calculadora-cta"
import { useCalculoSueldo } from "@/hooks/use-calculo-sueldo"
import { useCalculoAlimentos } from "@/hooks/use-calculo-alimentos"

export function CalculadorasContent() {
  const [activeTab, setActiveTab] = React.useState<"sueldo" | "alimentos">("sueldo")
  const sueldo = useCalculoSueldo()
  const alimentos = useCalculoAlimentos()

  const tabs = [
    { id: "sueldo" as const, label: "Sueldo Mínimo", icon: Calculator },
    { id: "alimentos" as const, label: "Pensión Alimentos", icon: Landmark },
  ]

  return (
    <>
      <PageHero
        title="Calculadoras Legales"
        subtitle="Herramientas gratuitas para estimar tu sueldo proporcional y pensión de alimentos según la legislación chilena."
        breadcrumbs={[{ label: "Calculadoras", href: "/calculadoras/" }]}
      />

      <section className="py-10 md:py-16 bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-5 md:px-12">
          {/* Tab switcher */}
          <div className="flex justify-center mb-10 md:mb-12">
            <div className="inline-flex items-center p-1.5 rounded-full bg-muted/80 border border-border/40">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive ? "text-white" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="calcTabBg"
                        className="absolute inset-0 bg-brand-navy rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="size-4" />
                      {tab.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Animated tab content */}
          <AnimatePresence mode="wait">
            {activeTab === "sueldo" && (
              <motion.div
                key="sueldo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
              >
                <SueldoInputs {...sueldo} />
                <ResultadosSueldo {...sueldo} />
              </motion.div>
            )}

            {activeTab === "alimentos" && (
              <motion.div
                key="alimentos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
              >
                <AlimentosInputs {...alimentos} />
                <ResultadosAlimentos {...alimentos} />
              </motion.div>
            )}
          </AnimatePresence>

          <CalculadoraCta />
        </div>
      </section>
    </>
  )
}
