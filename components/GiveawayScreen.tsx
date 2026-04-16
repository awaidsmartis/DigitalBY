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
      className="relative w-full h-screen overflow-hidden bg-digitalby text-white px-4 md:px-6 py-4 md:py-6"
    >
      <BottomLeftControls />
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="absolute top-8 left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm z-20"
      >
        <ChevronLeft size={24} />
      </motion.button>

      <div className="max-w-5xl mx-auto h-full pt-6 md:pt-8 flex flex-col">
        {/* Header: keep spacing comfortable */}
        <div className="text-center mb-6 md:mb-8">
          <p className="text-primary font-semibold tracking-[0.25em] text-xs">GIVEAWAY</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 leading-[1.05]">{giveaway.title}</h1>
          <p className="text-slate-300/70 mt-4 text-sm sm:text-base md:text-lg">{giveaway.subtitle}</p>
        </div>

        {/*
          Portrait tablets are usually ~768px wide (Tailwind `md`).
          To fully support portrait, we only switch to 2 columns at `lg`.
        */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7 items-center">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-4 md:p-5">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                <QrCode />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold">Scan to Participate</div>
                <div className="text-slate-400 text-sm">Use your mobile device</div>
              </div>
            </div>
            {/*
              Keep the QR fully visible in landscape.
              - Use a square whose size is driven by viewport height (vh) to avoid vertical cut-off
              - Use object-contain so the QR is never cropped
            */}
            <div className="relative mx-auto w-[clamp(180px,31vh,320px)] max-w-full aspect-square rounded-2xl overflow-hidden bg-white border border-white/10 shadow-2xl shadow-black/30">
              <Image
                src={giveaway.qrImage}
                alt="Giveaway QR"
                fill
                className="object-contain p-3"
                priority
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-4 md:p-5">
              <h2 className="text-xl md:text-2xl font-black">Or open the form</h2>
              <p className="text-slate-400 mt-3">
                If this kiosk has access to the internet, you can open the giveaway form directly.
              </p>
              <a
                href={giveaway.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-primary text-white font-bold shadow-2xl shadow-primary/30 hover-primary hover:shadow-primary/50 transition-all"
              >
                Open Giveaway Form <ExternalLink size={18} />
              </a>
              <p className="text-slate-500 text-xs mt-4 break-all line-clamp-2">{giveaway.formUrl}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
