'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, Gift, Package, Users, Wrench } from 'lucide-react'
import BottomLeftControls from './BottomLeftControls'

interface MainMenuProps {
  onSelectCategory: (category: string) => void
  onBack: () => void
}

const menuItems = [
  {
    id: 'products',
    label: 'Products',
    icon: Package,
    color: 'from-primary to-primary/60',
    description: 'Explore our solutions',
  },
  {
    id: 'services',
    label: 'Services',
    icon: Wrench,
    color: 'from-blue-500 to-cyan-500',
    description: 'Implementation & support',
  },
  {
    id: 'team',
    label: 'Our Team',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    description: 'Meet the people',
  },
  {
    id: 'giveaway',
    label: 'Giveaway',
    icon: Gift,
    color: 'from-emerald-500 to-teal-500',
    description: 'Scan & participate',
  },
]

export default function MainMenu({ onSelectCategory, onBack }: MainMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative w-full h-screen overflow-y-auto overscroll-contain bg-digitalby flex flex-col items-center justify-start px-6 py-12 pt-16 sm:pt-12"
    >
      <BottomLeftControls />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm z-20"
        aria-label="Back"
        type="button"
      >
        <ChevronLeft size={24} />
      </motion.button>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10 sm:mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-black text-white mb-3">What interests you?</h2>
        <p className="text-slate-400 text-xl">Select a category to explore</p>
      </motion.div>

      {/* Menu Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-8 max-w-5xl w-full mb-10 sm:mb-12">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * (index + 1), type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory(item.id)}
              className="relative group overflow-hidden rounded-3xl"
              type="button"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-300`}
              />

              {/* Decorative corner chevrons (hint that it's a button) */}
              <div className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10">
                <div className="w-0 h-0 border-t-[8px] sm:border-t-[10px] border-t-white/50 border-l-[8px] sm:border-l-[10px] border-l-transparent" />
              </div>
              <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 z-10">
                <div className="w-0 h-0 border-b-[8px] sm:border-b-[10px] border-b-white/40 border-l-[8px] sm:border-l-[10px] border-l-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-10 lg:p-12 h-44 sm:h-56 lg:h-60 [@media(orientation:portrait)_and_(min-width:768px)]:h-64 flex flex-col items-center justify-center text-center">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-4"
                >
                  <Icon size={40} className="text-white sm:hidden" />
                  <Icon size={56} className="text-white hidden sm:block" />
                </motion.div>
                <h3 className="text-lg sm:text-3xl font-bold text-white mb-1 sm:mb-2">{item.label}</h3>
                <p className="text-white/80 text-[11px] sm:text-sm leading-snug line-clamp-2">{item.description}</p>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Bottom instruction */}
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-slate-500 text-sm"
      >
        <span className="lg:hidden">Tap a category to explore</span>
        <span className="hidden lg:inline">Click a category to explore</span>
      </motion.p>
    </motion.div>
  )
}
