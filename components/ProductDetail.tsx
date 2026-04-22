'use client'

import { Product } from '@/lib/products'
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  X,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import BottomLeftControls from './BottomLeftControls'

const ProductDetailRichPageClient = dynamic(() => import('./ProductDetailRichPageClient'), {
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

/**
 * ProductDetail is a media-focused shell + a single embedded rich details body.
 * The embedded component owns:
 * - Sticky scroll-spy tabs
 * - Section hierarchy
 * - Content-driven tab naming
 *
 * This ensures there is only ONE source of truth for product content.
 */
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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const scrollerRef = useRef<HTMLDivElement | null>(null)

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})

  const currentIndex = allProducts.findIndex((p) => p.id === product.id)

  const media = product.media ?? []
  const hasMedia = media.length > 0

  const mainMediaSrc = useMemo(() => {
    const firstImage = media.find((m) => m.type === 'image')
    if (firstImage?.type === 'image') return firstImage.src
    return product.image
  }, [media, product.image])

  const lightboxMedia = useMemo(() => {
    if (hasMedia) return media
    return mainMediaSrc
      ? ([{ type: 'image', src: mainMediaSrc, alt: product.name }] as typeof media)
      : ([] as typeof media)
  }, [hasMedia, mainMediaSrc, media, product.name])

  const [mainViewportRef, mainEmbla] = useEmblaCarousel({ loop: false })
  const [thumbViewportRef, thumbEmbla] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  })

  const [lightboxViewportRef, lightboxEmbla] = useEmblaCarousel({ loop: false })
  const lightboxVideoRefs = useRef<Record<number, HTMLVideoElement | null>>({})

  const openLightbox = (index: number) => {
    if (!lightboxMedia.length) return
    const safeIndex = Math.max(0, Math.min(index, lightboxMedia.length - 1))
    setLightboxIndex(safeIndex)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    Object.values(lightboxVideoRefs.current).forEach((v) => v?.pause?.())
  }

  // Keep lightbox index in sync with the lightbox embla carousel.
  useEffect(() => {
    if (!lightboxEmbla || !lightboxOpen) return

    const onSelect = () => {
      const idx = lightboxEmbla.selectedScrollSnap()
      setLightboxIndex(idx)
      Object.values(lightboxVideoRefs.current).forEach((v) => v?.pause?.())
    }

    lightboxEmbla.on('select', onSelect)
    lightboxEmbla.on('reInit', onSelect)
    onSelect()

    return () => {
      lightboxEmbla.off('select', onSelect)
      lightboxEmbla.off('reInit', onSelect)
    }
  }, [lightboxEmbla, lightboxOpen])

  // When opening (or changing index while open), jump to the correct slide.
  useEffect(() => {
    if (!lightboxOpen) return
    if (!lightboxEmbla) return
    requestAnimationFrame(() => lightboxEmbla.scrollTo(lightboxIndex, true))
  }, [lightboxEmbla, lightboxIndex, lightboxOpen])

  // Keep the selectedMediaIndex in sync with embla selection
  useEffect(() => {
    if (!mainEmbla) return

    const onSelect = () => {
      const idx = mainEmbla.selectedScrollSnap()
      setSelectedMediaIndex(idx)
      // pause all videos when changing slides
      Object.values(videoRefs.current).forEach((v) => v?.pause?.())
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

        {/* Lightbox media slider (images + videos) */}
        <AnimatePresence>
          {lightboxOpen ? (
            <motion.div
              key="lightbox"
              className="fixed inset-0 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                aria-label="Close"
                className="absolute inset-0 bg-black/80"
                onClick={closeLightbox}
              />

              <div className="absolute inset-0 p-4 sm:p-10 flex items-center justify-center">
                <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="absolute top-3 right-3 z-10 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>

                  <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/10 bg-black">
                    <div ref={lightboxViewportRef} className="h-full overflow-hidden">
                      <div className="flex h-full">
                        {lightboxMedia.map((m, idx) => (
                          <div key={`${m.type}-${m.src}`} className="relative flex-[0_0_100%] h-full">
                            {m.type === 'image' ? (
                              <Image
                                src={m.src}
                                alt={m.alt ?? product.name}
                                fill
                                sizes="100vw"
                                className="object-contain"
                                priority={idx === lightboxIndex}
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-black">
                                <video
                                  ref={(el) => {
                                    lightboxVideoRefs.current[idx] = el
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

                    {/* Lightbox nav */}
                    {lightboxEmbla?.canScrollPrev() ? (
                      <button
                        type="button"
                        onClick={() => lightboxEmbla.scrollPrev()}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white"
                        aria-label="Previous"
                      >
                        <ChevronLeft size={26} />
                      </button>
                    ) : null}
                    {lightboxEmbla?.canScrollNext() ? (
                      <button
                        type="button"
                        onClick={() => lightboxEmbla.scrollNext()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white"
                        aria-label="Next"
                      >
                        <ChevronRight size={26} />
                      </button>
                    ) : null}

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/80 bg-black/40 border border-white/10 backdrop-blur px-3 py-1.5 rounded-full">
                      {lightboxIndex + 1} / {lightboxMedia.length}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm z-[80]"
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

        {/* Content Grid */}
        <div
          ref={scrollerRef}
          data-scroll-container="product-detail-modal"
          className="h-screen overflow-y-auto overscroll-contain"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 px-3 py-4 sm:p-6 md:p-10 lg:p-14 min-h-full">
            {/* Left: Media + thumbs */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col gap-5 lg:h-[calc(100vh-112px)] lg:sticky lg:top-14 lg:self-start"
            >
              {/* Main slider */}
              <div className="relative w-full aspect-[4/3] sm:aspect-square lg:flex-1 rounded-3xl overflow-hidden bg-black/40 shadow-2xl border border-white/10">
                {!hasMedia ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (!mainMediaSrc) return
                      openLightbox(0)
                    }}
                    className="absolute inset-0 cursor-zoom-in"
                    aria-label="Open image"
                  >
                    <Image
                      src={mainMediaSrc}
                      alt={product.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </button>
                ) : (
                  <div ref={mainViewportRef} className="h-full">
                    <div className="flex h-full">
                      {media.map((m, idx) => (
                        <div key={`${m.type}-${m.src}`} className="relative flex-[0_0_100%] h-full">
                          {m.type === 'image' ? (
                            <button
                              type="button"
                              onClick={() => openLightbox(idx)}
                              className="absolute inset-0 cursor-zoom-in"
                              aria-label="Open image"
                            >
                              <Image
                                src={m.src}
                                alt={product.name}
                                fill
                                className="object-contain"
                                priority={idx === 0}
                              />
                            </button>
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

                {/* Expand */}
                {lightboxMedia.length ? (
                  <button
                    type="button"
                    onClick={() => openLightbox(selectedMediaIndex)}
                    className="absolute top-3 right-3 z-10 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white"
                    aria-label="View full screen"
                  >
                    <Maximize2 size={18} />
                  </button>
                ) : null}
              </div>

              {hasMedia ? (
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
                            type="button"
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

                  <p className="text-slate-500 text-xs mt-2">
                    Media {selectedMediaIndex + 1} / {media.length}
                  </p>
                </div>
              ) : null}
            </motion.div>

            {/* Right: Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col lg:h-[calc(100vh-112px)]"
            >
              <div className="space-y-4">
                {product.isNew ? (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-2 rounded-full bg-primary text-white font-bold text-sm"
                  >
                    New Product
                  </motion.span>
                ) : null}

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight break-words">
                      {product.name}
                    </h1>
                    <p className="text-lg text-slate-400 mt-2">{product.category}</p>
                  </div>
                  <div className="hidden sm:flex shrink-0 items-center justify-center w-14 h-14 rounded-2xl bg-white border border-white/20 shadow-xl overflow-hidden">
                    <Image
                      src={product.logo}
                      alt={`${product.name} logo`}
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 flex-1 min-h-0">
                <ProductDetailRichPageClient
                  productId={product.id}
                  embedded
                  initialSectionId={initialShowRichDetails ? 'benefits' : undefined}
                />
              </div>

              {/* Desktop: show the index as a fixed pill on the bottom-right */}
              <div className="hidden lg:block fixed bottom-6 right-6 z-40 text-sm text-white/80 bg-black/40 border border-white/10 backdrop-blur px-3 py-1.5 rounded-full">
                {currentIndex + 1} of {allProducts.length}
              </div>
            </motion.div>
          </div>

          {/* Mobile/Tablet portrait: fixed product index on the bottom-right (kept clear of theme button) */}
          <div className="fixed bottom-4 right-20 sm:bottom-6 sm:right-24 z-40 lg:hidden text-xs text-white/80 bg-black/40 border border-white/10 backdrop-blur px-3 py-1.5 rounded-full">
            {currentIndex + 1} of {allProducts.length}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
