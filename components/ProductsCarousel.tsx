'use client'

import { Product } from '@/lib/products'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, LayoutGrid, List, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import BottomLeftControls from './BottomLeftControls'

interface ProductsCarouselProps {
  products: Product[]
  onSelectProduct: (product: Product) => void
  onBack: () => void
}

export default function ProductsCarousel({
  products,
  onSelectProduct,
  onBack,
}: ProductsCarouselProps) {
  const [viewMode, setViewMode] = useState<'carousel' | 'cards'>('carousel')

  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    // Mobile felt “cut”/stretched when centered. Start from left and rely on snap spacing.
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
    setCanScrollPrev(embla.canScrollPrev())
    setCanScrollNext(embla.canScrollNext())
  }, [embla])

  useEffect(() => {
    if (!embla) return

    // When switching away from the carousel view, Embla should not try to update state.
    if (viewMode !== 'carousel') return

    embla.on('select', onSelect)
    embla.on('reInit', onSelect)
    onSelect()
    return () => {
      embla.off('select', onSelect)
      embla.off('reInit', onSelect)
    }
  }, [embla, onSelect, viewMode])

  const scrollPrev = () => embla?.scrollPrev()
  const scrollNext = () => embla?.scrollNext()

  const dots = useMemo(() => Array.from({ length: products.length }), [products.length])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative w-full h-screen overflow-y-auto overscroll-contain bg-digitalby flex flex-col px-4 sm:px-6 py-8 sm:py-12"
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-3 mb-6 sm:mb-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm"
          aria-label="Back"
        >
          <ChevronLeft size={24} />
        </motion.button>

        <div className="text-center flex-1 min-w-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">Products</h1>
          <p className="text-slate-400 text-sm mt-1">
            <span className="lg:hidden">Swipe or use arrows • Tap a card for details • {products.length} total</span>
            <span className="hidden lg:inline">Scroll or use arrows • Click a card for details • {products.length} total</span>
          </p>
        </div>
        <div className="flex items-center justify-end gap-3">
          {/* View toggle: Carousel ↔ List */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setViewMode((m) => (m === 'carousel' ? 'cards' : 'carousel'))
              // If we return to carousel, ensure Embla state is re-synced.
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  if (embla) {
                    embla.reInit()
                    onSelect()
                  }
                })
              })
            }}
            className="h-11 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-300 backdrop-blur-sm inline-flex items-center gap-2"
            aria-label={viewMode === 'carousel' ? 'Switch to card view' : 'Switch to carousel view'}
            type="button"
          >
            {viewMode === 'carousel' ? <LayoutGrid size={18} /> : <List size={18} />}
            <span className="hidden sm:inline text-sm font-bold">
              {viewMode === 'carousel' ? 'Card view' : 'Slider view'}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm"
            aria-label="Close"
            type="button"
          >
            <X size={24} />
          </motion.button>
        </div>
      </div>

      <BottomLeftControls />

      {/* Body */}
      {viewMode === 'carousel' ? (
        <div className="relative flex-1 flex flex-col justify-center">
          <div className="relative">
            <div ref={viewportRef} className="overflow-hidden pt-3 sm:pt-6 pb-8 sm:pb-10">
              <div className="flex">
                {products.map((product, index) => {
                  const isActive = index === selectedIndex
                  return (
                    <div
                      key={product.id}
                      className="flex-[0_0_92%] sm:flex-[0_0_74%] md:flex-[0_0_58%] lg:flex-[0_0_44%] xl:flex-[0_0_30%] px-2 sm:px-3 [@media(orientation:portrait)]:flex-[0_0_92%]"
                    >
                      <motion.button
                        animate={{ scale: isActive ? 1 : 0.96, opacity: isActive ? 1 : 0.65 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectProduct(product)}
                        className="w-full h-[380px] sm:h-[380px] rounded-[28px] overflow-hidden group cursor-pointer relative border border-white/10 bg-white/5 shadow-2xl shadow-black/25 [@media(orientation:portrait)_and_(min-width:768px)]:h-[440px]"
                        type="button"
                      >
                        {/* Ambient background (no screenshot image) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-primary/10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

                        {/* Layout: use flex columns to prevent title overlapping the logo */}
                        <div className="relative z-10 flex flex-col h-full p-5 sm:p-7">
                          {/* Top row */}
                          <div className="flex items-start justify-between gap-3">
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-xs font-bold tracking-wider backdrop-blur-sm">
                              {product.category}
                            </span>

                            {product.isNew && (
                              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary text-white text-xs font-black tracking-wide shadow-lg shadow-primary/30">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/90" />
                                New
                              </span>
                            )}
                          </div>

                          {/* Icon area */}
                          <div className="flex-1 flex items-center justify-center pt-3 sm:pt-6 pb-2 sm:pb-4">
                            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-[22px] sm:rounded-[28px] bg-white border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
                              <Image
                                src={product.logo}
                                alt={`${product.name} icon`}
                                width={72}
                                height={72}
                                className="object-contain"
                                priority={index < 2}
                              />
                            </div>
                          </div>

                          {/* Text area */}
                          <div className="text-center flex flex-col mt-auto">
                            <div>
                              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug line-clamp-2">
                                {product.name}
                              </h3>
                              <p className="mt-2 text-white/85 text-xs sm:text-sm line-clamp-2">
                                {product.shortDescription}
                              </p>
                            </div>

                            {/* Footer always visible */}
                            <div className="mt-5 flex items-center justify-between">
                              <div className="text-slate-300 text-xs">
                                <span className="lg:hidden">Tap to open</span>
                                <span className="hidden lg:inline">Click to open</span>
                              </div>
                              <div className="text-white/70 text-xs">
                                {index + 1} / {products.length}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Buttons */}
            {canScrollPrev && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 p-3 rounded-full bg-primary text-white hover-primary transition-all duration-300 shadow-lg z-10"
                aria-label="Scroll left"
                type="button"
              >
                <ChevronLeft size={32} />
              </motion.button>
            )}
            {canScrollNext && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 p-3 rounded-full bg-primary text-white hover-primary transition-all duration-300 shadow-lg z-10"
                aria-label="Scroll right"
                type="button"
              >
                <ChevronRight size={32} />
              </motion.button>
            )}
          </div>

          {/* Dots (hide on desktop) */}
          <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
            {dots.map((_, idx) => {
              const active = idx === selectedIndex
              return (
                <button
                  key={idx}
                  onClick={() => embla?.scrollTo(idx)}
                  className={
                    'h-2 rounded-full transition-all ' +
                    (active ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/35')
                  }
                  aria-label={`Go to slide ${idx + 1}`}
                  type="button"
                />
              )
            })}
          </div>

          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center text-slate-400 text-xs sm:text-sm mt-6 sm:mt-8 px-2"
          >
            <span className="lg:hidden">Swipe to browse • Tap any card to view full details</span>
            <span className="hidden lg:inline">Scroll to browse • Click any card to view full details</span>
          </motion.p>
        </div>
      ) : (
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 pb-10">
            {products.map((p, idx) => (
              <motion.button
                key={p.id}
                type="button"
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelectProduct(p)}
                className="w-full rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-4 sm:p-5 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-white/20 shadow-lg flex items-center justify-center overflow-hidden">
                    <Image src={p.logo} alt={`${p.name} icon`} width={44} height={44} className="object-contain" />
                  </div>

                  <div className="text-slate-400 text-[11px] sm:text-xs shrink-0">{idx + 1}/{products.length}</div>
                </div>

                <div className="mt-3">
                  <div className="text-white font-black text-base sm:text-lg leading-snug line-clamp-1">{p.name}</div>
                  <div className="mt-1 text-slate-300 text-[11px] sm:text-xs line-clamp-1">{p.category}</div>
                  <div className="mt-2 text-slate-200/90 text-xs sm:text-sm leading-snug line-clamp-2">
                    {p.shortDescription}
                  </div>
                </div>

                <div className="mt-3 text-slate-300 text-[11px]">
                  <span className="lg:hidden">Tap to open</span>
                  <span className="hidden lg:inline">Click to open</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
