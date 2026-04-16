'use client'

import { giveaway } from '@/lib/giveaway'
import { motion } from 'framer-motion'
import { ChevronLeft, ExternalLink, QrCode } from 'lucide-react'
import Image from 'next/image'

interface GiveawayScreenProps {
  onBack: () => void
}

export default function GiveawayScreen({ onBack }: GiveawayScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white px-6 py-12"
    >
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="absolute top-8 left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm z-20"
      >
        <ChevronLeft size={24} />
      </motion.button>

      <div className="max-w-5xl mx-auto pt-10">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold tracking-wide">GIVEAWAY</p>
          <h1 className="text-5xl md:text-6xl font-black mt-3">{giveaway.title}</h1>
          <p className="text-slate-400 mt-4 text-lg">{giveaway.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                <QrCode />
              </div>
              <div>
                <div className="text-2xl font-bold">Scan to Participate</div>
                <div className="text-slate-400 text-sm">Use your mobile device</div>
              </div>
            </div>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <Image src={giveaway.qrImage} alt="Giveaway QR" fill className="object-cover" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
              <h2 className="text-2xl font-black">Or open the form</h2>
              <p className="text-slate-400 mt-3">
                If this kiosk has access to the internet, you can open the giveaway form directly.
              </p>
              <a
                href={giveaway.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-orange-600 text-white font-bold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all"
              >
                Open Giveaway Form <ExternalLink size={18} />
              </a>
              <p className="text-slate-500 text-xs mt-4 break-all">{giveaway.formUrl}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
