'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { NAV_ITEMS } from './nav-items'

/**
 * Mobile/Tablet: opens the slide menu via edge-swipe (no visible icon).
 *
 * We keep the swipe-capture area very small to avoid interfering with
 * carousels and horizontal gestures inside the page.
 */
export default function EdgeSwipeMenu({ className }: { className?: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const startX = useRef<number | null>(null)
  const startedOnEdge = useRef(false)

  return (
    <>
      {/* Invisible swipe zone (mobile/tablet only) */}
      <div
        className={cn('fixed inset-y-0 left-0 w-5 z-40 lg:hidden', className)}
        onTouchStart={(e) => {
          const x = e.touches[0]?.clientX ?? 0
          startedOnEdge.current = x <= 24
          startX.current = x
        }}
        onTouchMove={(e) => {
          if (!startedOnEdge.current) return
          const x = e.touches[0]?.clientX ?? 0
          const dx = startX.current == null ? 0 : x - startX.current
          // open after a small drag to the right
          if (dx > 70) {
            setOpen(true)
            startedOnEdge.current = false
            startX.current = null
          }
        }}
        onTouchEnd={() => {
          startedOnEdge.current = false
          startX.current = null
        }}
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-[300px] bg-digitalby border-white/10 text-white p-0"
        >
          <SheetHeader className="px-6 py-6 border-b border-white/10">
            <SheetTitle className="text-white font-black tracking-tight">
              <span className="text-primary">Digital</span>BY
            </SheetTitle>
          </SheetHeader>

          <nav className="p-4">
            <div className="space-y-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      router.push(item.href)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 border border-transparent hover:border-white/10 transition text-left"
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10">
                      <Icon size={18} className="text-white" />
                    </span>
                    <span className="font-semibold">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
