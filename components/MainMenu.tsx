'use client'
import { motion } from 'framer-motion'
import { ChevronLeft, Gift, Package, Users, Wrench } from 'lucide-react'
import ColorThemeSwitcher from './ColorThemeSwitcher'

interface MainMenuProps {
  onSelectCategory: (category: string) => void
  onBack: () => void
}

const menuItems = [
  {
    id: 'products',
    label: 'Products',
    icon: Package,
    color: 'from-primary to-orange-600',
    description: 'Explore our solutions'
  },
  {
    id: 'services',
    label: 'Services',
    icon: Wrench,
    color: 'from-blue-500 to-cyan-500',
    description: 'Implementation & support'
  },
  {
    id: 'team',
    label: 'Our Team',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    description: 'Meet the people'
  },
  {
    id: 'giveaway',
    label: 'Giveaway',
    icon: Gift,
    color: 'from-emerald-500 to-teal-500',
    description: 'Scan & participate'
  },
]

export default function MainMenu({ onSelectCategory, onBack }: MainMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black flex flex-col items-center justify-center px-6 py-12"
    >
      <div className="absolute top-8 right-8 z-20">
        <ColorThemeSwitcher />
      </div>
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="absolute top-8 left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm z-20"
      >
        <ChevronLeft size={24} />
      </motion.button>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-black text-white mb-3">
          What interests you?
        </h2>
        <p className="text-slate-400 text-xl">Select a category to explore</p>
      </motion.div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full mb-12">
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
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-300`}
              />

              {/* Content */}
              <div className="relative z-10 p-12 h-56 flex flex-col items-center justify-center text-center">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-4"
                >
                  <Icon size={56} className="text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {item.label}
                </h3>
                <p className="text-white/80 text-sm">
                  {item.description}
                </p>
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
        Tap a category to explore
      </motion.p>
    </motion.div>
  )
}
