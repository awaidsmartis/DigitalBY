'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Product } from '@/lib/products'
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Link as LinkIcon,
  Play,
  X,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import BottomLeftControls from './BottomLeftControls'

interface ProductDetailProps {
  product: Product
  allProducts: Product[]
  onClose: () => void
}


export default function ProductDetail({
  product: initialProduct,
  allProducts,
  onClose,
}: ProductDetailProps) {
  const [product, setProduct] = useState(initialProduct)
  const [direction, setDirection] = useState(0)
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})

  const currentIndex = allProducts.findIndex(p => p.id === product.id)

  const media = product.media ?? []
  const hasMedia = media.length > 0

  const [mainViewportRef, mainEmbla] = useEmblaCarousel({ loop: false })
  const [thumbViewportRef, thumbEmbla] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  })

  const mainMediaSrc = useMemo(() => {
    const firstImage = media.find(m => m.type === 'image')
    if (firstImage?.type === 'image') return firstImage.src
    return product.image
  }, [media, product.image])

  // Keep the selectedMediaIndex in sync with embla selection
  useEffect(() => {
    if (!mainEmbla) return

    const onSelect = () => {
      const idx = mainEmbla.selectedScrollSnap()
      setSelectedMediaIndex(idx)
      // pause all videos when changing slides
      Object.values(videoRefs.current).forEach(v => v?.pause?.())
    }

    mainEmbla.on('select', onSelect)
    onSelect()
    return () => {
      mainEmbla.off('select', onSelect)
    }
  }, [mainEmbla])

  useEffect(() => {
    if (!thumbEmbla) return
    thumbEmbla.scrollTo(selectedMediaIndex)
  }, [thumbEmbla, selectedMediaIndex])

  const navigate = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < allProducts.length) {
      setDirection(newIndex > currentIndex ? 1 : -1)
      setProduct(allProducts[newIndex])
      setSelectedMediaIndex(0)
      // reset embla to first slide
      requestAnimationFrame(() => mainEmbla?.scrollTo(0, true))
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={product.id}
        initial="enter"
        animate="center"
        exit="exit"
        custom={direction}
        variants={slideVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-0 bg-digitalby z-50"
      >
        <BottomLeftControls />

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm z-20"
          aria-label="Close"
          type="button"
        >
          <X size={28} />
        </motion.button>

        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(currentIndex - 1)}
            className="absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary text-white hover-primary transition-all duration-300 shadow-lg z-10"
          >
            <ChevronLeft size={32} />
          </motion.button>
        )}
        {currentIndex < allProducts.length - 1 && (
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(currentIndex + 1)}
            className="absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary text-white hover-primary transition-all duration-300 shadow-lg z-10"
          >
            <ChevronRight size={32} />
          </motion.button>
        )}

        {/* Content Grid (no page scroll on desktop; panel scroll inside tabs) */}
        <div className="h-screen overflow-y-auto lg:overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10 lg:p-14 min-h-full">
            {/* Left: Media + thumbs */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col gap-5 lg:h-[calc(100vh-112px)]"
            >
            {/* Main slider */}
            <div className="relative w-full aspect-[16/11] sm:aspect-square lg:flex-1 rounded-3xl overflow-hidden bg-black/40 shadow-2xl border border-white/10">
              {!hasMedia ? (
                <Image src={mainMediaSrc} alt={product.name} fill className="object-contain" priority />
              ) : (
                <div ref={mainViewportRef} className="h-full">
                  <div className="flex h-full">
                    {media.map((m, idx) => (
                      <div key={`${m.type}-${m.src}`} className="relative flex-[0_0_100%] h-full">
                        {m.type === 'image' ? (
                          <Image
                            src={m.src}
                            alt={product.name}
                            fill
                            className="object-contain"
                            priority={idx === 0}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-black flex items-center justify-center">
                            <video
                              ref={(el) => {
                                videoRefs.current[idx] = el
                              }}
                              className="w-full h-full object-contain"
                              controls
                              preload="metadata"
                              src={m.src}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
            </div>

            {hasMedia && (
              <div className="w-full lg:mt-auto">
                <div ref={thumbViewportRef} className="overflow-hidden">
                  <div className="flex gap-3 pb-2">
                    {media.map((m, idx) => {
                      const isActive = idx === selectedMediaIndex
                      return (
                        <button
                          key={`${m.type}-${m.src}`}
                          onClick={() => {
                            setSelectedMediaIndex(idx)
                            mainEmbla?.scrollTo(idx)
                          }}
                          className={
                            'relative h-20 w-28 md:h-24 md:w-32 lg:h-20 lg:w-28 rounded-2xl overflow-hidden border transition ' +
                            (isActive
                              ? 'border-white/60 bg-white/10'
                              : 'border-white/10 bg-white/5 hover:bg-white/10')
                          }
                          title={m.type === 'video' ? (m.title ?? 'Video') : 'Image'}
                        >
                          {m.type === 'image' ? (
                            <Image src={m.src} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-full bg-gradient-to-br from-primary/25 to-primary/5" />
                              <div className="absolute inline-flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 border border-white/10 text-white text-xs font-semibold">
                                <Play size={14} />
                                {m.title ?? 'Video'}
                              </div>
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* slide indicator */}
                <p className="text-slate-500 text-xs mt-2">
                  Media {selectedMediaIndex + 1} / {media.length}
                </p>
              </div>
            )}
            </motion.div>

            {/* Right: Details + tabs */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col lg:h-[calc(100vh-112px)]"
            >
            <div className="space-y-4">
              {product.isNew && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-4 py-2 rounded-full bg-primary text-white font-bold text-sm"
                >
                  New Product
                </motion.span>
              )}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-lg text-slate-400 mt-2">{product.category}</p>
                </div>
                <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-white/20 shadow-xl overflow-hidden">
                  <Image src={product.logo} alt={`${product.name} logo`} width={44} height={44} className="object-contain" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex-1 min-h-0">
              <Tabs defaultValue="overview" className="h-full">
                <TabsList className="bg-white/5 border border-white/10 text-slate-400">
                  <TabsTrigger
                    value="overview"
                    className="text-slate-300 data-[state=active]:text-slate-900"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="value"
                    className="text-slate-300 data-[state=active]:text-slate-900"
                  >
                    Value
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="text-slate-300 data-[state=active]:text-slate-900"
                  >
                    Features
                  </TabsTrigger>
                  <TabsTrigger
                    value="refs"
                    className="text-slate-300 data-[state=active]:text-slate-900"
                  >
                    References
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <ScrollArea className="h-[420px] lg:h-[calc(100vh-320px)] pr-4">
                    <p className="text-slate-200 text-xl font-semibold mb-4">{product.shortDescription}</p>
                    <p className="text-lg text-slate-300 leading-relaxed">{product.description}</p>

                    {product.references?.[0]?.url && (
                      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
                        <div className="text-sm text-slate-400 mb-2">Quick link</div>
                        <a
                          href={product.references[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white font-bold hover-primary transition"
                        >
                          <ExternalLink size={18} />
                          Open {product.references[0].label}
                        </a>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="value" className="mt-4">
                  <ScrollArea className="h-[420px] lg:h-[calc(100vh-320px)] pr-4">
                    <h3 className="text-2xl font-black text-white mb-4">Value Proposition</h3>
                    <div className="space-y-3">
                      {(product.valueProposition ?? []).map((v, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * idx }}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          <p className="text-slate-200">{v}</p>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="features" className="mt-4">
                  <ScrollArea className="h-[420px] lg:h-[calc(100vh-320px)] pr-4">
                    <h3 className="text-2xl font-black text-white mb-4">Features</h3>
                    <div className="space-y-3">
                      {(product.features ?? []).map((f, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.03 * idx }}
                          className="flex items-start gap-3"
                        >
                          <Zap size={18} className="text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-slate-200">{f}</p>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="refs" className="mt-4">
                  <ScrollArea className="h-[420px] lg:h-[calc(100vh-320px)] pr-4">
                    <h3 className="text-2xl font-black text-white mb-4">References</h3>
                    {product.references?.length ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {product.references.map((r) => (
                          <a
                            key={r.label}
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 p-6 transition"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                                <LinkIcon size={18} className="text-primary" />
                              </div>
                              <div>
                                <div className="text-white font-bold group-hover:text-primary transition-colors">
                                  {r.label}
                                </div>
                                <div className="text-slate-400 text-xs break-all">{r.url}</div>
                              </div>
                              <ExternalLink size={16} className="ml-auto text-slate-400 group-hover:text-white transition" />
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-400">No references available.</p>
                    )}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>

            {/* Product Counter */}
            <p className="text-slate-500 text-sm mt-4">
              {currentIndex + 1} of {allProducts.length}
            </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
