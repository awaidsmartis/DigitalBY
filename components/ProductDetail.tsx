'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Product } from '@/lib/products'
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Link as LinkIcon,
  Play,
  X,
  Zap,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import BottomLeftControls from './BottomLeftControls'

const ProductDetailRichPageClient = dynamic(() => import('./ProductDetailRichPageClient'), {
  // Lightweight fallback; we just reserve space visually
  loading: () => (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
      Loading details…
    </div>
  ),
})

interface ProductDetailProps {
  product: Product
  allProducts: Product[]
  onClose: () => void
  /** Used when deep-linking from the legacy details route. */
  initialShowRichDetails?: boolean
  /** Show prev/next product arrows (kiosk-style). Hide on standalone product pages/mobile if undesired. */
  showNavigationArrows?: boolean
}

export default function ProductDetail({
  product: initialProduct,
  allProducts,
  onClose,
  initialShowRichDetails,
  showNavigationArrows = true,
}: ProductDetailProps) {
  const [product, setProduct] = useState(initialProduct)
  const [direction, setDirection] = useState(0)
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)
  const [tab, setTab] = useState('overview')
  const [showRichDetails, setShowRichDetails] = useState(Boolean(initialShowRichDetails))

  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const richDetailsRef = useRef<HTMLDivElement | null>(null)

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

  const computeRichDetailsScrollTop = () => {
    const container = scrollerRef.current
    const el = richDetailsRef.current
    if (!container || !el) return null

    const containerRect = container.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const nextTop = container.scrollTop + (elRect.top - containerRect.top) - 16
    return Math.max(0, nextTop)
  }

  const scrollToRichDetails = (behavior: ScrollBehavior = 'smooth') => {
    const container = scrollerRef.current
    const top = computeRichDetailsScrollTop()
    if (!container || top == null) return
    container.scrollTo({ top, behavior })
  }

  // When the rich details section becomes visible, scroll the modal container to it.
  // This avoids intermittent failures caused by trying to scroll before the ref is attached.
  useEffect(() => {
    if (!showRichDetails) return

    // The rich details body loads lazily and can expand after the first render.
    // If we scroll before the scroll container has enough height, the browser clamps
    // the scrollTop and it looks like a small/partial scroll. We wait for the rich
    // area to stop resizing (or time out), then do a single smooth scroll.
    const container = scrollerRef.current
    const el = richDetailsRef.current
    if (!container || !el) return

    let done = false
    let debounceTimer: number | undefined
    let maxTimer: number | undefined
    let retryTimer: number | undefined

    const attemptScroll = () => {
      const top = computeRichDetailsScrollTop()
      if (top == null) return false

      const maxScrollTop = Math.max(0, container.scrollHeight - container.clientHeight)
      if (maxScrollTop + 4 < top) return false

      container.scrollTo({ top, behavior: 'smooth' })
      return true
    }

    const finish = () => {
      if (done) return
      if (attemptScroll()) {
        done = true
        cleanup()
        return
      }
      // Still no room to scroll; try again shortly.
      retryTimer = window.setTimeout(finish, 120)
    }

    const cleanup = () => {
      ro.disconnect()
      if (debounceTimer) window.clearTimeout(debounceTimer)
      if (maxTimer) window.clearTimeout(maxTimer)
      if (retryTimer) window.clearTimeout(retryTimer)
    }

    const ro = new ResizeObserver(() => {
      if (done) return
      if (debounceTimer) window.clearTimeout(debounceTimer)
      debounceTimer = window.setTimeout(finish, 160)
    })

    ro.observe(el)
    // Kick once in case we already have enough height.
    debounceTimer = window.setTimeout(finish, 60)
    // Fail-safe: never wait forever.
    maxTimer = window.setTimeout(finish, 1800)

    return cleanup
  }, [showRichDetails, product.id])

  const navigate = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < allProducts.length) {
      setDirection(newIndex > currentIndex ? 1 : -1)
      setProduct(allProducts[newIndex])
      setSelectedMediaIndex(0)
      setTab('overview')
      setShowRichDetails(false)
      // reset embla to first slide
      requestAnimationFrame(() => mainEmbla?.scrollTo(0, true))
      requestAnimationFrame(() => scrollerRef.current?.scrollTo({ top: 0 }))
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

  const hostnameFor = (url: string) => {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  }

  const isSmartAppsUrl = (url: string) => {
    try {
      const host = new URL(url).hostname.toLowerCase()
      return host === 'smartapps.com' || host.endsWith('.smartapps.com')
    } catch {
      return false
    }
  }

  const isSmartIsProductUrl = (url: string) => {
    try {
      const u = new URL(url)
      const host = u.hostname.toLowerCase()
      const pathname = u.pathname.toLowerCase()
      return host === 'www.smart-is.com' && pathname.includes('/what-we-do/smart-product')
    } catch {
      return false
    }
  }

  const previewBenefits = (product.benefits ?? []).slice(0, 3)
  const previewKeyFeatures = (product.keyFeatures ?? []).slice(0, 6)
  const previewHighlights = (product.highlights ?? []).slice(0, 6)

  const isRichProduct =
    Boolean(product.stats?.length) ||
    Boolean(product.highlights?.length) ||
    Boolean(product.keyFeatures?.length) ||
    Boolean(product.benefits?.length) ||
    Boolean(product.useCases?.length) ||
    Boolean(product.faqs?.length)

  const highlightList = previewHighlights
    .map((h) => {
      const value = (h.value ?? '').trim()
      const label = (h.label ?? '').trim()
      if (!value) return null

      // Many products use highlights in 2 different ways:
      // 1) Metric highlight (e.g., value="100%", label="Blue Yonder Compatible")
      // 2) Marketing highlight (e.g., value="Boost Productivity", label="Long description...")
      // For the main modal we keep it clean:
      // - Metric highlights: show a small value pill + the short label
      // - Marketing highlights: show just the title (value)
      const isMetricLike = /\d|%|\+|tbd/i.test(value)
      return { value, label, isMetricLike }
    })
    .filter(Boolean) as Array<{ value: string; label: string; isMetricLike: boolean }>

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
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm z-20"
          aria-label="Close"
          type="button"
        >
          <X size={22} className="sm:hidden" />
          <X size={28} className="hidden sm:block" />
        </motion.button>

        {/* Navigation Buttons */}
        {showNavigationArrows && currentIndex > 0 && (
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(currentIndex - 1)}
            className="hidden sm:flex absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary text-white hover-primary transition-all duration-300 shadow-lg z-10"
            aria-label="Previous product"
            type="button"
          >
            <ChevronLeft size={32} />
          </motion.button>
        )}
        {showNavigationArrows && currentIndex < allProducts.length - 1 && (
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(currentIndex + 1)}
            className="hidden sm:flex absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary text-white hover-primary transition-all duration-300 shadow-lg z-10"
            aria-label="Next product"
            type="button"
          >
            <ChevronRight size={32} />
          </motion.button>
        )}

        {/* Content Grid (no page scroll on desktop; panel scroll inside tabs) */}
        <div
          ref={scrollerRef}
          data-scroll-container="product-detail-modal"
          className="h-screen overflow-y-auto overscroll-contain"
        >
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
                            'relative shrink-0 h-20 w-28 md:h-24 md:w-32 lg:h-20 lg:w-28 rounded-2xl overflow-hidden border transition ' +
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
                <div className="min-w-0">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight break-words">
                    {product.name}
                  </h1>
                  <p className="text-lg text-slate-400 mt-2">{product.category}</p>
                </div>
                <div className="hidden sm:flex shrink-0 items-center justify-center w-14 h-14 rounded-2xl bg-white border border-white/20 shadow-xl overflow-hidden">
                  <Image src={product.logo} alt={`${product.name} logo`} width={44} height={44} className="object-contain" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex-1 min-h-0">
              <Tabs
                value={tab}
                onValueChange={(v) => {
                  if (v === 'details') {
                    // Details behaves like a tab control, but we keep the current tab
                    // selected and instead open + scroll to the rich details section.
                    if (showRichDetails) {
                      scrollToRichDetails('smooth')
                    } else {
                      setShowRichDetails(true)
                    }
                    return
                  }
                  setTab(v)
                }}
                className="h-full"
              >
                <div className="flex items-center gap-3">
                  <TabsList
                    className="w-full bg-white/5 border border-white/10 text-slate-400 gap-1 px-1 overflow-x-auto whitespace-nowrap pr-2
                      [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    <TabsTrigger
                      value="overview"
                      className="flex-none px-3 text-xs sm:text-sm text-slate-300 data-[state=active]:text-slate-900"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="value"
                      className="flex-none px-3 text-xs sm:text-sm text-slate-300 data-[state=active]:text-slate-900"
                    >
                      Value
                    </TabsTrigger>
                    <TabsTrigger
                      value="features"
                      className="flex-none px-3 text-xs sm:text-sm text-slate-300 data-[state=active]:text-slate-900"
                    >
                      Features
                    </TabsTrigger>
                    <TabsTrigger
                      value="refs"
                      className="flex-none px-3 text-xs sm:text-sm text-slate-300 data-[state=active]:text-slate-900"
                    >
                      References
                    </TabsTrigger>

                    {/* Primary pill: opens the rich details section */}
                    <TabsTrigger
                      value="details"
                      title="View rich details"
                      className="flex-none h-8 rounded-full bg-primary text-white font-black border-primary/40 px-4 hover-primary data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      <ChevronDown size={16} />
                      Details
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview" className="mt-4">
                  <ScrollArea className="h-[calc(100vh-380px)] sm:h-[420px] lg:h-[calc(100vh-320px)] pr-4">
                    <div className="pb-16">
                      <p className="text-slate-200 text-xl font-semibold mb-4">{product.shortDescription}</p>
                      <p className="text-lg text-slate-300 leading-relaxed">{product.description}</p>

                      {/* Keep main modal lightweight: show highlight *headings only* (no long descriptions). */}
                      {!!highlightList.length && (
                        <section className="mt-8">
                          <h3 className="text-2xl font-black text-white mb-4">Highlights</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {highlightList.map((h, idx) => {
                              const showLabel =
                                h.isMetricLike ||
                                // Only show non-metric labels if they are short enough (avoid clutter)
                                (h.label && h.label.length <= 72)

                              return (
                                <motion.div
                                  key={`${h.value}-${h.label}-${idx}`}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: Math.min(0.03 * idx, 0.15) }}
                                  className="rounded-3xl border border-white/10 bg-white/5 p-5 h-[132px] flex flex-col overflow-hidden"
                                >
                                  <div className="text-white font-black text-lg leading-snug break-words line-clamp-2">
                                    {h.value}
                                  </div>
                                  {showLabel ? (
                                    <div className="text-slate-300 text-sm mt-2 leading-snug break-words line-clamp-2">
                                      {h.label || '—'}
                                    </div>
                                  ) : null}
                                </motion.div>
                              )
                            })}
                          </div>
                        </section>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="value" className="mt-4">
                  <ScrollArea className="h-[calc(100vh-380px)] sm:h-[420px] lg:h-[calc(100vh-320px)] pr-4">
                    <div className="pb-16">
                      {/* For rich products, show the shared “Benefits” content (keep it clean). */}
                      {isRichProduct && previewBenefits.length ? (
                        <section>
                          <h3 className="text-2xl font-black text-white mb-4">Value</h3>
                          <div className="space-y-3">
                            {previewBenefits.map((b, idx) => (
                              <motion.div
                                key={b.title}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.03 * idx }}
                                className="flex items-start gap-3"
                              >
                                <div className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                <p className="text-slate-200">{b.title}</p>
                              </motion.div>
                            ))}
                          </div>
                        </section>
                      ) : (
                        <section>
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
                        </section>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="features" className="mt-4">
                  <ScrollArea className="h-[calc(100vh-380px)] sm:h-[420px] lg:h-[calc(100vh-320px)] pr-4">
                    <div className="pb-16">
                      <h3 className="text-2xl font-black text-white mb-4">Features</h3>

                      {!!previewKeyFeatures.length && (
                        <section className="mb-8">
                          <h4 className="text-white font-black text-lg mb-3">Key features</h4>
                          <div className="space-y-3">
                            {previewKeyFeatures.map((kf, idx) => (
                              <motion.div
                                key={kf.title}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.03 * idx }}
                                className="flex items-start gap-3"
                              >
                                <Zap size={18} className="text-primary flex-shrink-0 mt-0.5" />
                                <p className="text-slate-200">{kf.title}</p>
                              </motion.div>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Avoid mixing legacy flat feature lists with the shared rich Key Features content */}
                      {!isRichProduct && (
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
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="refs" className="mt-4">
                  <ScrollArea className="h-[calc(100vh-380px)] sm:h-[420px] lg:h-[calc(100vh-320px)] pr-4">
                    <div className="pb-16">
                      <h3 className="text-2xl font-black text-white mb-4">References</h3>
                      {product.references?.length ? (
                        <div className="grid grid-cols-1 gap-4">
                          {product.references
                            .filter(r => r?.url && !isSmartAppsUrl(r.url) && !isSmartIsProductUrl(r.url))
                            .map((r) => (
                            <a
                              key={r.label}
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 p-6 transition"
                            >
                              {/* External icon pinned so it never squeezes the content */}
                              <ExternalLink
                                size={16}
                                className="absolute top-5 right-5 text-slate-400 group-hover:text-white transition"
                              />

                              <div className="flex items-center gap-3 pr-10">
                                <div className="size-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                                  <LinkIcon size={18} className="text-primary" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-white font-bold group-hover:text-primary transition-colors leading-snug">
                                    {r.label}
                                  </div>
                                  {/* Show only the hostname to avoid messy long URLs on tablet */}
                                  <div className="text-slate-400 text-xs truncate">{hostnameFor(r.url)}</div>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-400">No references available.</p>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>

            {/* Product Counter */}
            <p className="text-slate-500 text-sm mt-4 pb-24 lg:pb-0 text-right">
              {currentIndex + 1} of {allProducts.length}
            </p>
            </motion.div>

            {/* Inline rich details section (brochure style) - full width */}
            {showRichDetails ? (
              <div ref={richDetailsRef} className="lg:col-span-2 pt-2 pb-24">
                <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] backdrop-blur p-5 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="min-w-0">
                      <div className="text-white font-black text-2xl md:text-3xl leading-tight">
                        {product.name}
                      </div>
                      <div className="text-slate-300 mt-1">{product.shortDescription}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowRichDetails(false)
                          requestAnimationFrame(() => {
                            scrollerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
                          })
                        }}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition"
                      >
                        <X size={16} />
                        Back to tabs
                      </button>
                    </div>
                  </div>

                  {/* Reuse exact layout/structure/tab system from the existing rich details page */}
                  <ProductDetailRichPageClient
                    productId={product.id}
                    embedded
                    onBack={() => {
                      setShowRichDetails(false)
                      requestAnimationFrame(() => {
                        scrollerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
                      })
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
