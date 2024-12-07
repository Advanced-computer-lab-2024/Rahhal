import { CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

interface SuccessPopupProps {
  show: boolean
}

export function SuccessPopup({ show }: SuccessPopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-lg"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Password reset</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Your password has been successfully reset.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to login page...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

