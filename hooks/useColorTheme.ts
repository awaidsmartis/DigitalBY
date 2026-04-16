'use client'

import { useEffect, useState } from 'react'

export type ColorThemeId = 'orange' | 'blue' | 'emerald' | 'purple'

const STORAGE_KEY = 'digitalby-color-theme'

function applyThemeToDom(themeId: ColorThemeId) {
  document.documentElement.setAttribute('data-color-theme', themeId)
  // Also set on body to be extra-safe in case styles target body.
  document.body?.setAttribute?.('data-color-theme', themeId)
}

export function useColorTheme() {
  const [theme, setTheme] = useState<ColorThemeId>('orange')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as ColorThemeId | null) ?? 'orange'
    setTheme(saved)
    applyThemeToDom(saved)
    setIsReady(true)
  }, [])

  const set = (next: ColorThemeId) => {
    setTheme(next)
    localStorage.setItem(STORAGE_KEY, next)
    applyThemeToDom(next)
  }

  return { theme, setTheme: set, isReady }
}
