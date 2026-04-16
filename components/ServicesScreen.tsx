'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { services } from '@/lib/services'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ChevronLeft, LayoutGrid } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'

interface ServicesScreenProps {
  onBack: () => void
}

export default function ServicesScreen({ onBack }: ServicesScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<'grid' | 'detail'>('grid')
  const [selectedId, setSelectedId] = useState<string>(services[0]?.id)
  const selected = useMemo(
    () => services.find(s => s.id === selectedId) ?? services[0],
    [selectedId],
  )

  const openDetail = (id: string) => {
    setSelectedId(id)
    setMode('detail')
  }

  const backToGrid = () => {
    // Reset scroll FIRST to avoid layout-id morph glitches during exit/enter.
    if (rootRef.current) rootRef.current.scrollTop = 0
    setMode('grid')
  }

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-screen overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white px-6 py-12"
    >
      {/* Back button (fixed so it stays visible while scrolling) */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="fixed top-8 left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm z-20"
      >
        <ChevronLeft size={24} />
      </motion.button>

      <div className="max-w-7xl mx-auto pt-10">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold tracking-wide">WHAT CAN WE OFFER</p>
          <h1 className="text-5xl md:text-6xl font-black mt-3">Blue Yonder Services</h1>
          <p className="text-slate-400 mt-4 text-lg">
            {mode === 'grid'
              ? 'Tap a service to explore details'
              : 'Browse services and review capabilities'}
          </p>
        </div>

        <LayoutGroup id="services">
          <AnimatePresence mode="sync" initial={false}>
            {mode === 'grid' ? (
              <motion.div
                key="services-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="max-w-6xl mx-auto"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service, idx) => (
                    <motion.button
                      key={service.id}
                      layoutId={`service-card-${service.id}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * idx }}
                      onClick={() => openDetail(service.id)}
                      className="text-left rounded-[28px] border border-white/10 bg-white/5 hover:bg-white/10 transition shadow-2xl shadow-black/20 p-7"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          layoutId={`service-icon-${service.id}`}
                          className="relative w-14 h-14 rounded-2xl bg-white border border-white/20 shadow-xl overflow-hidden"
                        >
                          <Image src={service.icon} alt={service.title} fill className="object-contain p-3" />
                        </motion.div>
                        <div>
                          <motion.div
                            layoutId={`service-title-${service.id}`}
                            className="text-xl font-black text-white"
                          >
                            {service.title}
                          </motion.div>
                          <div className="text-slate-400 text-sm">{service.bullets.length} capabilities</div>
                        </div>
                      </div>
                      <div className="mt-5 text-slate-300 text-sm line-clamp-3">
                        {service.bullets.slice(0, 3).join(' • ')}
                      </div>
                      <div className="mt-5 text-slate-500 text-xs">Tap to open</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="services-detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8"
              >
                {/* Left list (morphed from cards) */}
                <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Services</div>
                      <button
                        onClick={backToGrid}
                        className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-xs font-semibold"
                      >
                        <LayoutGrid size={16} />
                        All
                      </button>
                    </div>

                    <div className="space-y-2">
                      {services.map((service) => {
                        const active = service.id === selectedId

                        // If it's the selected one, we reuse the same layoutIds so it morphs nicely.
                        if (active) {
                          return (
                            <motion.button
                              key={service.id}
                              layoutId={`service-card-${service.id}`}
                              onClick={() => setSelectedId(service.id)}
                              className="w-full text-left px-4 py-4 rounded-2xl border bg-white text-slate-900 border-white/20 shadow-xl"
                            >
                              <div className="flex items-center gap-4">
                                <motion.div
                                  layoutId={`service-icon-${service.id}`}
                                  className="relative w-11 h-11 rounded-2xl bg-white border border-white/20 overflow-hidden"
                                >
                                  <Image src={service.icon} alt={service.title} fill className="object-contain p-2" />
                                </motion.div>
                                <div>
                                  <motion.div
                                    layoutId={`service-title-${service.id}`}
                                    className="text-base font-black"
                                  >
                                    {service.title}
                                  </motion.div>
                                  <div className="text-xs opacity-70">{service.bullets.length} capabilities</div>
                                </div>
                              </div>
                            </motion.button>
                          )
                        }

                        return (
                          <button
                            key={service.id}
                            onClick={() => setSelectedId(service.id)}
                            className="w-full text-left px-4 py-4 rounded-2xl border bg-white/5 hover:bg-white/10 border-white/10 transition"
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative w-11 h-11 rounded-2xl bg-white/10 border border-white/10 overflow-hidden">
                                <Image src={service.icon} alt={service.title} fill className="object-contain p-2" />
                              </div>
                              <div>
                                <div className="text-base font-black text-white">{service.title}</div>
                                <div className="text-xs text-slate-400">{service.bullets.length} capabilities</div>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Right details */}
                <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10 min-h-[420px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    {selected && (
                      <motion.div
                        key={selected.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                        className="min-h-[360px]"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="relative w-14 h-14 rounded-2xl bg-white border border-white/20 shadow-xl overflow-hidden">
                            <Image src={selected.icon} alt={selected.title} fill className="object-contain p-3" />
                          </div>
                          <div>
                            <h2 className="text-3xl md:text-4xl font-black">{selected.title}</h2>
                            <p className="text-slate-400">Review the details, then ask us at the booth</p>
                          </div>
                        </div>

                        <ScrollArea className="h-[420px] pr-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selected.bullets.map((b) => (
                              <div
                                key={b}
                                className="rounded-2xl border border-white/10 bg-black/20 p-4 flex items-start gap-3"
                              >
                                <div className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                <p className="text-slate-200">{b}</p>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </motion.div>
  )
}
