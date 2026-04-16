'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface LandingHeroProps {
  onExplore: () => void
}

export default function LandingHero({ onExplore }: LandingHeroProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-primary/10 pointer-events-none" />
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">Welcome to Smart IS Booth</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-7xl font-bold text-secondary mb-6 leading-tight"
        >
          Transform Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
            Warehouse Operations
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Discover our complete suite of innovative solutions designed to modernize your supply chain, streamline operations, and drive growth.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={onExplore}
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 group"
        >
          Explore Products
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Products', value: '12+' },
            { label: 'Customers', value: '500+' },
            { label: 'Uptime', value: '99.9%' },
            { label: 'Team', value: '6 Experts' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-center">
          <p className="text-sm text-foreground/40 mb-2">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-primary rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
