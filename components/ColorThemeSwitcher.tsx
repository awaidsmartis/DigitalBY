'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useColorTheme, type ColorThemeId } from '@/hooks/useColorTheme'
import { Paintbrush } from 'lucide-react'

const THEMES: { id: ColorThemeId; name: string; hint: string }[] = [
  { id: 'orange', name: 'Orange', hint: 'Current brand' },
  { id: 'blue', name: 'Blue', hint: 'Corporate' },
  { id: 'emerald', name: 'Emerald', hint: 'Fresh' },
  { id: 'purple', name: 'Purple', hint: 'Premium' },
]

export default function ColorThemeSwitcher() {
  const { theme, setTheme, isReady } = useColorTheme()

  // Avoid hydration mismatch (localStorage)
  if (!isReady) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-sm transition"
          aria-label="Change theme"
        >
          <Paintbrush size={16} />
          Theme
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-950/95 border-white/10 text-white">
        <DropdownMenuLabel className="text-slate-300">Color theme</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        {THEMES.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onSelect={(e) => {
              // Radix DropdownMenu uses onSelect; onClick may not fire reliably.
              e.preventDefault()
              setTheme(t.id)
            }}
            className={
              'cursor-pointer focus:bg-white/10 focus:text-white ' +
              (t.id === theme ? 'text-white' : 'text-slate-300')
            }
          >
            <span
              className={
                'inline-block w-3 h-3 rounded-full mr-2 ' +
                (t.id === 'orange'
                  ? 'bg-orange-500'
                  : t.id === 'blue'
                    ? 'bg-blue-500'
                    : t.id === 'emerald'
                      ? 'bg-emerald-500'
                      : 'bg-purple-500')
              }
            />
            <span className="font-semibold">{t.name}</span>
            <span className="ml-auto text-xs text-slate-500">{t.hint}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
