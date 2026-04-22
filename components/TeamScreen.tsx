'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { teamMembers, type TeamMember } from '@/lib/team'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ChevronLeft, Linkedin, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import BottomLeftControls from './BottomLeftControls'

interface TeamScreenProps {
  onBack: () => void
}

export default function TeamScreen({ onBack }: TeamScreenProps) {
  const [selected, setSelected] = useState<TeamMember | null>(null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <LayoutGroup id="team">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full h-screen overflow-y-auto overscroll-contain bg-digitalby text-white px-6 py-12"
      >
      <BottomLeftControls />
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="fixed top-4 left-4 sm:top-8 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm z-20"
      >
        <ChevronLeft size={24} />
      </motion.button>

      <div className="max-w-7xl mx-auto pt-10">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold tracking-wide">OUR TEAM</p>
          <h1 className="text-5xl md:text-6xl font-black mt-3">Meet the people behind DigitalBY</h1>
          <p className="text-slate-400 mt-4 text-lg">
            <span className="lg:hidden">Tap a card to read more</span>
            <span className="hidden lg:inline">Click a card to read more</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
            >
              <motion.button
                layoutId={`team-card-${m.id}`}
                onClick={() => setSelected(m)}
                className="group w-full text-left rounded-[28px] bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 overflow-hidden shadow-2xl shadow-black/20 hover:shadow-black/35"
              >
                <div className="relative h-72 w-full">
                  <motion.div layoutId={`team-img-${m.id}`} className="absolute inset-0">
                    <Image src={m.image} alt={m.name} fill className="object-cover object-top" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Name plate */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <motion.div
                          layoutId={`team-name-${m.id}`}
                          className="text-2xl font-black"
                        >
                          {m.name}
                        </motion.div>
                        <div className="text-slate-200/80 text-sm font-medium">{m.role}</div>
                      </div>
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-white/20 text-slate-900 shadow-xl">
                        <Linkedin size={18} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hint */}
                <div className="px-6 py-5">
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">{m.bio}</p>
                  <p className="text-slate-500 text-xs mt-3">
                    <span className="lg:hidden">Tap to view full bio</span>
                    <span className="hidden lg:inline">Click to view full bio</span>
                  </p>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
      </motion.div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.button
              aria-label="Close"
              className="absolute inset-0 bg-black/60"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <div className="absolute inset-0 p-4 sm:p-8 flex items-start sm:items-center justify-center overflow-y-auto overscroll-contain">
              <motion.div
                layoutId={`team-card-${selected.id}`}
                className="relative w-[min(980px,calc(100vw-2rem))] rounded-[32px] overflow-hidden border border-white/10 bg-slate-950/95 shadow-2xl text-white"
              >
                {/* Close */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>

                {/* Header */}
                <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-white/10">
                  <motion.div
                    layoutId={`team-name-${selected.id}`}
                    className="text-3xl md:text-4xl font-black text-white"
                  >
                    {selected.name}
                  </motion.div>
                  <div className="text-slate-300 mt-2 font-semibold">{selected.role}</div>
                </div>

                {/* Body */}
                <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-0 md:gap-6">
                  <div className="p-5 sm:p-8">
                    <motion.div
                      layoutId={`team-img-${selected.id}`}
                      className="relative w-full h-[300px] sm:h-[360px] md:h-[440px] rounded-3xl overflow-hidden bg-white/5 border border-white/10"
                    >
                      <Image src={selected.image} alt={selected.name} fill className="object-cover object-top" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </motion.div>
                  </div>

                  <div className="p-5 sm:p-8 pt-0 md:pt-8 md:pl-0 min-h-0">
                    <ScrollArea className="h-[240px] sm:h-[260px] md:h-[440px] pr-4">
                      <p className="text-slate-200 leading-relaxed text-base md:text-lg">
                        {selected.bio}
                      </p>
                    </ScrollArea>

                    <div className="pt-6 flex items-center gap-3">
                      <a
                        href={selected.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/25 hover-primary hover:shadow-primary/35 transition"
                      >
                        <Linkedin size={18} />
                        LinkedIn
                      </a>
                      <span className="text-slate-400 text-sm">Opens in new tab</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  )
}
