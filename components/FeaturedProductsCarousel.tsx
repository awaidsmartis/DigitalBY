'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'

interface FeaturedProductsCarouselProps {
  products: Product[]
}

export default function FeaturedProductsCarousel({ products }: FeaturedProductsCarouselProps) {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % products.length)
  const prev = () => setCurrent((current - 1 + products.length) % products.length)

  return (
    <section className="w-full py-16 px-6 lg:px-12 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-secondary mb-4"
          >
            Latest & Greatest
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-foreground/60"
          >
            Explore our newest solutions powering modern operations
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Image */}
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-slate-100 shadow-2xl">
                <Image
                  src={products[current].image}
                  alt={products[current].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      {products[current].category}
                    </span>
                  </div>
                  <h3 className="text-4xl font-bold text-secondary mb-3">
                    {products[current].name}
                  </h3>
                  <p className="text-lg text-foreground/70 leading-relaxed">
                    {products[current].description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {products[current].features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-primary text-xl leading-none mt-1">•</span>
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Link
                    href={`/products/${products[current].id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <span className="text-sm text-foreground/60">{products[current].price}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-slate-100 text-secondary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="flex items-center gap-2">
              {products.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`rounded-full transition-all ${
                    idx === current
                      ? 'bg-primary w-8 h-3'
                      : 'bg-slate-200 w-3 h-3 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to product ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-slate-100 text-secondary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
              aria-label="Next product"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
