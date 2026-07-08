"use client"

import { ShieldCheck, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"

export function CalculadoraCta() {
  return (
    <Reveal className="mt-12 md:mt-16">
      <div className="relative bg-brand-navy rounded-3xl p-6 md:p-10 overflow-hidden">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-brand-sky">
              <ShieldCheck className="size-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Asesoría legal</span>
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold text-white">
              ¿Necesitas formalizar tu pensión o revisar tu contrato?
            </h3>
            <p className="text-sm text-white/50 max-w-xl">
              Estas calculadoras son referenciales. Cada caso requiere evaluación personalizada.
              Tu primera consulta es gratuita y sin compromiso.
            </p>
          </div>
          <a
            href="/contacto/"
            className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-brand-navy font-semibold text-sm hover:bg-brand-sky hover:text-white transition-colors shrink-0"
          >
            Consultar ahora
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </Reveal>
  )
}
