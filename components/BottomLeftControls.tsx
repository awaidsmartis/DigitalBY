'use client'

import ColorThemeSwitcher from '@/components/ColorThemeSwitcher'
import DesktopSliderMenu from '@/components/DesktopSliderMenu'
import EdgeSwipeMenu from '@/components/EdgeSwipeMenu'

export default function BottomLeftControls() {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
      <EdgeSwipeMenu />
      <DesktopSliderMenu />
      <ColorThemeSwitcher />
    </div>
  )
}
