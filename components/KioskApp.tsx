'use client'

import { Product, products } from '@/lib/products'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import AboutScreen from './AboutScreen'
import GiveawayScreen from './GiveawayScreen'
import MainMenu from './MainMenu'
import ProductDetail from './ProductDetail'
import ProductsCarousel from './ProductsCarousel'
import ServicesScreen from './ServicesScreen'
import TeamScreen from './TeamScreen'
import WelcomeScreen from './WelcomeScreen'

type AppState =
  | 'welcome'
  | 'menu'
  | 'about'
  | 'products'
  | 'product-detail'
  | 'services'
  | 'team'
  | 'giveaway'

export default function KioskApp() {
  const [state, setState] = useState<AppState>('welcome')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null)

  // Idle mode detection
  useEffect(() => {
    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer)

      const timer = setTimeout(() => {
        if (state !== 'welcome') {
          setState('welcome')
        }
      }, 60000) // 60 seconds idle

      setIdleTimer(timer)
    }

    // Track user interaction
    const events = ['mousedown', 'touchstart', 'keydown', 'click']
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer)
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer)
      })
      if (idleTimer) clearTimeout(idleTimer)
    }
  }, [idleTimer, state])

  const handleExplore = () => {
    setState('about')
  }

  const handleSelectCategory = (category: string) => {
    switch (category) {
      case 'products':
        setState('products')
        break
      case 'services':
        setState('services')
        break
      case 'team':
        setState('team')
        break
      case 'giveaway':
        setState('giveaway')
        break
    }
  }

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    setState('product-detail')
  }

  const handleBack = () => {
    if (state === 'menu') {
      setState('welcome')
    } else if (state === 'about') {
      setState('welcome')
    } else if (state === 'products' || state === 'services' || state === 'team' || state === 'giveaway') {
      setState('menu')
    } else if (state === 'product-detail') {
      setState('products')
    }
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {state === 'welcome' && (
          <WelcomeScreen key="welcome" onExplore={handleExplore} />
        )}

        {state === 'about' && (
          <AboutScreen
            key="about"
            onBack={() => setState('welcome')}
            onGoProducts={() => setState('products')}
            onGoServices={() => setState('services')}
            onGoTeam={() => setState('team')}
            onGoGiveaway={() => setState('giveaway')}
          />
        )}

        {state === 'menu' && (
          <MainMenu
            key="menu"
            onSelectCategory={handleSelectCategory}
            onBack={handleBack}
          />
        )}

        {state === 'products' && (
          <ProductsCarousel
            key="products"
            products={products}
            onSelectProduct={handleSelectProduct}
            onBack={handleBack}
          />
        )}

        {state === 'product-detail' && selectedProduct && (
          <ProductDetail
            key={selectedProduct.id}
            product={selectedProduct}
            allProducts={products}
            onClose={handleBack}
          />
        )}

        {state === 'services' && (
          <ServicesScreen key="services" onBack={handleBack} />
        )}

        {state === 'team' && (
          <TeamScreen key="team" onBack={handleBack} />
        )}

        {state === 'giveaway' && (
          <GiveawayScreen key="giveaway" onBack={handleBack} />
        )}
      </AnimatePresence>
    </div>
  )
}
