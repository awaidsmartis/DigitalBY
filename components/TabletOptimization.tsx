'use client'

import { useEffect, useState } from 'react'

export function useTabletOptimization() {
  const [isTablet, setIsTablet] = useState(false)
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setScreenSize({ width, height })
      
      // Consider it tablet if between 768px and 1280px
      setIsTablet(width >= 768 && width <= 1280)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isTablet, screenSize }
}

export default function TabletOptimization() {
  return null
}
