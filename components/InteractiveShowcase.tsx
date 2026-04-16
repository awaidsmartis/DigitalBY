'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Zap, Shield, Rocket } from 'lucide-react'

interface ShowcaseItem {
  id: string
  title: string
  description: string
  image: string
  icon: React.ReactNode
  highlights: string[]
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 'innovation',
    title: 'Cutting-Edge Innovation',
    description: 'Experience the latest technological breakthroughs with our advanced product lineup.',
    image: '/placeholder.svg?height=400&width=600',
    icon: <Rocket size={32} />,
    highlights: ['AI-Powered', 'Real-Time', 'Cloud-Native']
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    description: 'Bank-grade security features protecting your data with military-grade encryption.',
    image: '/placeholder.svg?height=400&width=600',
    icon: <Shield size={32} />,
    highlights: ['AES-256 Encryption', '99.99% Uptime', 'ISO Certified']
  },
  {
    id: 'performance',
    title: 'Lightning Fast',
    description: 'Optimized for speed with sub-millisecond response times and global distribution.',
    image: '/placeholder.svg?height=400&width=600',
    icon: <Zap size={32} />,
    highlights: ['Global CDN', '5G Ready', 'Ultra-Low Latency']
  },
]

export default function InteractiveShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseItems.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const current = showcaseItems[currentIndex]

  const handlePrev = () => {
    setAutoPlay(false)
    setCurrentIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length)
  }

  const handleNext = () => {
    setAutoPlay(false)
    setCurrentIndex((prev) => (prev + 1) % showcaseItems.length)
  }

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-primary/5 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Showcase */}
        <div className="relative rounded-3xl overflow-hidden bg-card border border-border/50 shadow-2xl">
          {/* Image Container */}
          <div className="relative h-96 md:h-[500px] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover animate-scale-in"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-8 md:p-12">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary text-white">
                  {current.icon}
                </div>
                <span className="text-xs font-bold text-primary/80 uppercase tracking-wider">Featured</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{current.title}</h2>
              <p className="text-lg text-gray-100 mb-6 max-w-2xl">{current.description}</p>

              <div className="flex flex-wrap gap-3">
                {current.highlights.map((highlight) => (
                  <div key={highlight} className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium">
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8 px-4">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-border/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
          >
            <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {showcaseItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setAutoPlay(false)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-border hover:bg-muted'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-border/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
          >
            <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Auto-play Toggle */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            {autoPlay ? '⏸ Pause' : '▶ Play'} Auto-play
          </button>
        </div>
      </div>
    </section>
  )
}
