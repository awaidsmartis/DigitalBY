'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { NAV_ITEMS } from './nav-items'

export default function DesktopSliderMenu({ className }: { className?: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <div className={cn('hidden lg:block', className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-sm transition"
            aria-label="Open menu"
            type="button"
          >
            <Menu size={16} />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[320px] bg-digitalby border-white/10 text-white p-0"
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
    </div>
  )
}
