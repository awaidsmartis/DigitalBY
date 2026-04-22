'use client'

import { giveaway } from '@/lib/giveaway'
import { motion } from 'framer-motion'
import { ChevronLeft, ExternalLink, QrCode } from 'lucide-react'
import Image from 'next/image'
import BottomLeftControls from './BottomLeftControls'

interface GiveawayScreenProps {
  onBack: () => void
}

export default function GiveawayScreen({ onBack }: GiveawayScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative w-full h-screen overflow-y-auto overscroll-contain bg-digitalby text-white px-4 md:px-6 py-6"
    >
      <BottomLeftControls />
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm z-20"
        aria-label="Back"
        type="button"
      >
        <ChevronLeft size={24} />
      </motion.button>

      <div className="max-w-5xl mx-auto w-full pt-10 sm:pt-12 pb-28">
        {/* Header */}
        <div className="text-center">
          <p className="text-primary font-semibold tracking-[0.32em] text-xs">GIVEAWAY</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 leading-[1.05]">{giveaway.title}</h1>
          <p className="text-slate-300/70 mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            {giveaway.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* QR card */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 md:p-6 flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                <QrCode />
              </div>
              <div className="min-w-0">
                <div className="text-xl md:text-2xl font-black">Scan to Participate</div>
                <div className="text-slate-400 text-sm">Use your mobile device</div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center">
              <div className="relative w-[clamp(220px,34vh,380px)] max-w-full aspect-square rounded-2xl overflow-hidden bg-white border border-white/10 shadow-2xl shadow-black/30">
                <Image
                  src={giveaway.qrImage}
                  alt="Giveaway QR"
                  fill
                  className="object-contain p-3"
                  priority
                />
              </div>
            </div>

            <div className="mt-5 text-xs text-slate-400 leading-relaxed">
              Tip: If your phone camera doesn't open the link automatically, use a QR scanner app.
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 md:p-6 flex flex-col">
            <div>
              <h2 className="text-xl md:text-2xl font-black">Or open the form</h2>
              <p className="text-slate-400 mt-3">
                If this kiosk has access to the internet, you can open the giveaway form directly.
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs tracking-widest text-slate-400">LINK</div>
              <div className="mt-2 text-xs text-slate-300 break-all line-clamp-3">{giveaway.formUrl}</div>
            </div>

            <div className="mt-6">
              <a
                href={giveaway.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-white font-black shadow-2xl shadow-primary/30 hover-primary hover:shadow-primary/50 transition-all"
              >
                Open Giveaway Form <ExternalLink size={18} />
              </a>
            </div>

            <div className="mt-5 text-xs text-slate-400 leading-relaxed">
              You can return to this screen anytime from the Menu.
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  )
}
