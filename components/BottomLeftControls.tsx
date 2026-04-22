'use client'

import ColorThemeSwitcher from '@/components/ColorThemeSwitcher'
import DesktopSliderMenu from '@/components/DesktopSliderMenu'
import EdgeSwipeMenu from '@/components/EdgeSwipeMenu'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function BottomLeftControls({ bottomOffsetPx = 0 }: { bottomOffsetPx?: number } = {}) {
  // Radix UI components (Sheet/DropdownMenu) can cause hydration mismatch warnings
  // when server-rendered. Render these controls only after mount.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  // IMPORTANT: these controls must be positioned relative to the viewport.
  // Framer Motion often applies transforms to page-level containers, and
  // `position: fixed` inside a transformed ancestor can behave like `absolute`.
  // Portaling to <body> avoids the “icons appear in the middle” issue.
  return createPortal(
    <>
      {/* Bottom-left: navigation controls */}
      <div
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2"
        style={bottomOffsetPx ? { bottom: `calc(1rem + ${bottomOffsetPx}px)` } : undefined}
      >
        <EdgeSwipeMenu />
        <DesktopSliderMenu />
        {/* On desktop we keep theme in the left cluster */}
        <div className="hidden lg:block">
          <ColorThemeSwitcher />
        </div>
      </div>

      {/* Bottom-right: theme control (portrait/tablet + mobile) */}
      <div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 lg:hidden"
        style={bottomOffsetPx ? { bottom: `calc(1rem + ${bottomOffsetPx}px)` } : undefined}
      >
        <ColorThemeSwitcher />
      </div>
    </>,
    document.body,
  )
}
