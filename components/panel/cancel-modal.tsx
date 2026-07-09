"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function CancelModal({ open, onClose, onConfirm }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={e => e.stopPropagation()}
            className="bg-card rounded-xl shadow-xl w-full max-w-md overflow-hidden"
          >
            <div className="p-6 flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEE2E2] text-[#B91C1C] mb-4">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground mb-2">
                ¿Cancelar consulta?
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Estás a punto de cancelar esta solicitud. Esta acción no se puede deshacer.
              </p>
              <div className="flex flex-col sm:flex-row w-full gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
                >
                  Volver
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-[#CF2E2E] text-white font-semibold text-sm hover:bg-[#CF2E2E]/90 transition-colors shadow-sm"
                >
                  Sí, cancelar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
