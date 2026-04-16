'use client'

import { useEffect, useState } from 'react'

interface Stat {
  label: string
  value: string
  suffix?: string
  icon: string
}

const stats: Stat[] = [
  { label: 'Products Deployed', value: '150', suffix: '+', icon: '🚀' },
  { label: 'Active Users', value: '50000', suffix: '+', icon: '👥' },
  { label: 'Countries', value: '45', suffix: '+', icon: '🌍' },
  { label: 'Uptime', value: '99.99', suffix: '%', icon: '⚡' },
]

interface CounterProps {
  value: number
  suffix: string
}

function AnimatedCounter({ value, suffix }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 50)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 50)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-secondary/3 to-accent/3 pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              By The Numbers
            </span>
          </h2>
          <p className="text-lg text-foreground/60">
            Trusted by thousands of organizations worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <AnimatedCounter value={parseInt(stat.value)} suffix={stat.suffix || ''} />
              <p className="text-foreground/60 mt-4">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
