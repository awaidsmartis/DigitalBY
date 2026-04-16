'use client'

import { eventInfo } from '@/lib/event'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ExternalLink, Gift, Users, Wrench } from 'lucide-react'
import Image from 'next/image'
import BottomLeftControls from './BottomLeftControls'

interface AboutScreenProps {
  onBack: () => void
  onGoProducts: () => void
  onGoServices: () => void
  onGoTeam: () => void
  onGoGiveaway: () => void
}

export default function AboutScreen({
  onBack,
  onGoProducts,
  onGoServices,
  onGoTeam,
  onGoGiveaway,
}: AboutScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative w-full h-screen overflow-hidden bg-digitalby text-white"
    >
      <BottomLeftControls />
      {/* Ambient background (no hero image) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Watermark: booth number */}
        <div className="absolute left-[72%] md:left-[74%] lg:left-[66%] top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
          <div className="text-[520px] md:text-[640px] lg:text-[760px] leading-none font-black tracking-tight text-white/5">
            16
          </div>
        </div>

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute -top-48 -right-48 w-[520px] h-[520px] bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.18, 0.35, 0.18],
          }}
          transition={{ duration: 11, repeat: Infinity, delay: 0.6 }}
          className="absolute -bottom-56 -left-56 w-[560px] h-[560px] bg-primary/10 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
      </div>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="fixed top-8 left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm z-20"
      >
        <ChevronLeft size={24} />
      </motion.button>

      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="h-full pt-14 pb-12 flex flex-col"
        >
          {/* Top row: event pill + Smart IS badge */}
          <div className="flex items-center justify-between gap-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-200 text-sm font-semibold w-fit">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 border border-primary/30">
                <span className="w-2 h-2 rounded-full bg-primary" />
              </span>
              Smart IS • Blue Yonder ICON 2026
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white border border-white/20 shadow-2xl flex items-center justify-center">
                <Image
                  src="/assets/images/icons/smart-is-small.png"
                  alt="Smart IS"
                  width={34}
                  height={34}
                  className="opacity-95"
                />
              </div>
              <div>
                <div className="text-white font-black">Smart IS</div>
                <div className="text-slate-400 text-sm">DigitalBY Showcase</div>
              </div>
            </div>
          </div>

          {/* Main hero (centered vertically) */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-primary font-black tracking-[0.22em] mt-10 uppercase">
              {eventInfo.titleSmall.replace('#16', '').trim()}
            </p>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black mt-4 leading-[0.92]">
              <span className="text-white">Blue </span>
              <span className="bg-gradient-to-r from-white via-white to-primary text-transparent bg-clip-text">
                Yonder
              </span>
              <br />
              <span className="text-primary">ICON 2026</span>
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed mt-8 max-w-2xl">
              {eventInfo.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 max-w-2xl">
              <button
                onClick={onGoProducts}
                className="flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-primary text-white font-black shadow-2xl shadow-primary/25 hover-primary hover:shadow-primary/40 transition-all"
              >
                <ArrowRight size={20} />
                Explore Products
              </button>
              <button
                onClick={onGoServices}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold transition-all"
              >
                <Wrench size={20} />
                View Services
              </button>
              <button
                onClick={onGoTeam}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold transition-all"
              >
                <Users size={20} />
                Meet Our Team
              </button>
              <button
                onClick={onGoGiveaway}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold transition-all"
              >
                <Gift size={20} />
                Giveaway
              </button>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href={eventInfo.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              Visit Smart-IS.com <ExternalLink size={16} />
            </a>
            <div className="text-slate-600 lg:hidden">•</div>
            <div className="text-slate-400 lg:hidden">Kiosk mode • Tablet optimized</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
