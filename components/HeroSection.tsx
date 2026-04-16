'use client'

import { ArrowDown } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5 pointer-events-none" />
      
      {/* Animated Orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">Welcome to Smart IS</span>
          </div>
        </div>

        <h1 className="animate-fade-in-up text-5xl md:text-7xl font-bold tracking-tight mt-6 mb-6"
          style={{ animationDelay: '300ms' }}>
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Experience Innovation
          </span>
          <br />
          <span className="text-foreground">Discover Tomorrow&apos;s Technology</span>
        </h1>

        <p className="animate-fade-in-up text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8"
          style={{ animationDelay: '400ms' }}>
          Explore cutting-edge products and solutions designed to transform your business and unlock new possibilities.
        </p>

        <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center mb-16"
          style={{ animationDelay: '500ms' }}>
          <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105">
            Explore Products
          </button>
          <button className="px-8 py-4 rounded-lg border-2 border-primary/30 text-primary font-semibold hover:bg-primary/5 transition-all duration-300">
            View Showcase
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-fade-in-up flex justify-center" style={{ animationDelay: '600ms' }}>
          <div className="flex flex-col items-center gap-2 text-foreground/50 hover:text-primary transition-colors cursor-pointer">
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Parallax Effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
    </section>
  )
}
