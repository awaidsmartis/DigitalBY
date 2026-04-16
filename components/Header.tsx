'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-slate-200/50 shadow-sm"
    >
      <div className="w-full px-6 lg:px-12 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo - Smart IS */}
          <Link href="/" className="flex items-center gap-3 group hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-600 shadow-md">
              <span className="text-white font-black text-lg">//</span>
            </div>
            <div>
              <div className="font-bold text-lg text-secondary leading-none">Smart IS</div>
              <div className="text-xs text-foreground/50 font-medium">Solutions</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-semibold text-secondary hover:text-primary transition-colors"
            >
              Products
            </Link>
            <a
              href="#contact"
              className="text-sm font-semibold text-secondary hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div>
            <a
              href="https://www.smart-is.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-orange-700 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
            >
              Website
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
