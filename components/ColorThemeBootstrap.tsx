'use client'

import { useColorTheme } from '@/hooks/useColorTheme'

/**
 * Ensures the saved color theme is applied on *every* route.
 *
 * Without this, routes that don't render the theme switcher may never run
 * `useColorTheme()`, which can make pages appear “stuck” on a previous theme
 * after a hard refresh or direct navigation.
 */
export default function ColorThemeBootstrap() {
  // We only need the effect inside the hook (localStorage -> DOM attributes).
  useColorTheme()
  return null
}
