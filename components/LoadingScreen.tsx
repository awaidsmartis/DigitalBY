'use client'

import { Spinner } from '@/components/ui/spinner'
import { motion } from 'framer-motion'

export default function LoadingScreen({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="w-full min-h-screen bg-digitalby text-white flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-primary/20 blur-2xl" />
          <div className="relative rounded-2xl bg-white/5 border border-white/10 px-6 py-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <Spinner className="size-5 text-primary" />
              <span className="font-semibold text-slate-200">{label}</span>
            </div>
            <div className="mt-3 h-1.5 w-48 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full w-1/3 bg-primary/80 rounded-full"
                animate={{ x: ["-40%", "140%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
