'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import BottomLeftControls from './BottomLeftControls'

interface WelcomeScreenProps {
  onExplore: () => void
}

export default function WelcomeScreen({ onExplore }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-screen bg-digitalby flex flex-col items-center justify-center overflow-hidden"
    >
      <BottomLeftControls />
      {/* Ambient background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Logo Animation */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white border border-white/20 backdrop-blur-sm shadow-2xl overflow-hidden">
            <Image
              src="/assets/images/icons/smart-is-small.png"
              alt="Smart IS"
              width={64}
              height={64}
              className="opacity-95"
            />
          </div>
        </motion.div>

        {/* Company Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-7xl md:text-8xl font-black text-white mb-4 tracking-tight"
        >
          DigitalBY
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl md:text-3xl text-slate-300 mb-12 font-light"
        >
          Smart IS Product Showcase
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg text-slate-400 mb-16 max-w-xl mx-auto leading-relaxed"
        >
          Explore Smart IS products and services for Blue Yonder implementations.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExplore}
          className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white text-lg font-bold rounded-2xl shadow-2xl shadow-primary/40 hover-primary hover:shadow-primary/60 transition-all duration-300 cursor-pointer group"
        >
          <span className="lg:hidden">Tap to Explore</span>
          <span className="hidden lg:inline">Click to Explore</span>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronRight size={24} />
          </motion.div>
        </motion.button>

        {/* Removed hint text per desktop/tablet requirements */}
      </div>
    </motion.div>
  )
}
