'use client'

import { Product } from '@/lib/products'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'

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
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    align: 'center',
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
    embla.on('select', onSelect)
    embla.on('reInit', onSelect)
    onSelect()
    return () => {
      embla.off('select', onSelect)
      embla.off('reInit', onSelect)
    }
  }, [embla, onSelect])

  const scrollPrev = () => embla?.scrollPrev()
  const scrollNext = () => embla?.scrollNext()

  const dots = useMemo(() => Array.from({ length: products.length }), [products.length])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black flex flex-col px-6 py-12"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm"
          aria-label="Back"
        >
          <ChevronLeft size={24} />
        </motion.button>

        <div className="text-center flex-1">
          <h1 className="text-4xl md:text-5xl font-black text-white">Products</h1>
          <p className="text-slate-400 text-sm mt-1">
            Swipe or use arrows • Tap a card for details • {products.length} total
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm"
          aria-label="Close"
        >
          <X size={24} />
        </motion.button>
      </div>

      {/* Carousel */}
      <div className="relative flex-1 flex flex-col justify-center">
        <div className="relative">
          <div ref={viewportRef} className="overflow-hidden pt-6 pb-10">
            <div className="flex">
              {products.map((product, index) => {
                const isActive = index === selectedIndex
                return (
                  <div
                    key={product.id}
                    className="flex-[0_0_86%] sm:flex-[0_0_62%] md:flex-[0_0_46%] lg:flex-[0_0_36%] px-3"
                  >
                    <motion.button
                      animate={{ scale: isActive ? 1 : 0.96, opacity: isActive ? 1 : 0.65 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectProduct(product)}
                      className="w-full h-[340px] rounded-[28px] overflow-hidden group cursor-pointer relative border border-white/10 bg-white/5 shadow-2xl shadow-black/25"
                    >
                      {/* Ambient background (no screenshot image) */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-primary/10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

                      {/* Category */}
                      <div className="absolute top-6 left-6">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-xs font-bold tracking-wider backdrop-blur-sm">
                          {product.category}
                        </span>
                      </div>

                      {/* New badge */}
                      {product.isNew && (
                        <div className="absolute top-6 right-6">
                          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary text-white text-xs font-black tracking-wide shadow-lg shadow-primary/30">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/90" />
                            New
                          </span>
                        </div>
                      )}

                      {/* Product Icon */}
                      <div className="absolute inset-x-0 top-20 flex items-center justify-center">
                        <div className="w-28 h-28 rounded-[28px] bg-white border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
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

                      {/* Content */}
                      <div className="absolute inset-0 p-7 flex flex-col justify-end">
                        <h3 className="text-3xl font-black text-white mb-2 leading-tight text-center">
                          {product.name}
                        </h3>
                        <p className="text-white/85 text-sm line-clamp-2 text-center">{product.shortDescription}</p>

                        <div className="mt-5 flex items-center justify-between">
                          <div className="text-slate-300 text-xs">Tap to open</div>
                          <div className="text-white/70 text-xs">
                            {index + 1} / {products.length}
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 p-3 rounded-full bg-primary text-white hover:bg-orange-600 transition-all duration-300 shadow-lg z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft size={32} />
            </motion.button>
          )}
          {canScrollNext && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 p-3 rounded-full bg-primary text-white hover:bg-orange-600 transition-all duration-300 shadow-lg z-10"
              aria-label="Scroll right"
            >
              <ChevronRight size={32} />
            </motion.button>
          )}
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
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
              />
            )
          })}
        </div>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center text-slate-400 text-sm mt-8"
        >
          Swipe to browse • Tap any card to view full details
        </motion.p>
      </div>
    </motion.div>
  )
}
