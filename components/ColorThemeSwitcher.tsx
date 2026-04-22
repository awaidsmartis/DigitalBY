import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch'
import { useColorTheme, type ColorThemeId } from '@/hooks/useColorTheme';
import { useUiPreferences } from '@/hooks/useUiPreferences'
import { Paintbrush } from 'lucide-react';

const THEMES: { id: ColorThemeId; name: string; hint: string }[] = [
  { id: 'orange', name: 'Orange', hint: 'Current brand' },
  { id: 'blue', name: 'Blue', hint: 'Corporate' },
  { id: 'emerald', name: 'Emerald', hint: 'Fresh' },
  { id: 'purple', name: 'Purple', hint: 'Premium' },
]

export default function ColorThemeSwitcher() {
  const { theme, setTheme, isReady } = useColorTheme()
  const { prefs, actions } = useUiPreferences()

  // Avoid hydration mismatch (localStorage)
  if (!isReady) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-sm transition"
          aria-label="Change theme"
        >
          <Paintbrush size={16} />
          <span className="sr-only">Theme ({theme})</span>
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
              setTheme(t.id)
            }}
            onClick={() => setTheme(t.id)}
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

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuLabel className="text-slate-300">Layout</DropdownMenuLabel>
        <DropdownMenuItem
          // Keep menu open; switch itself handles the change.
          onSelect={(e) => e.preventDefault()}
          className="focus:bg-transparent focus:text-white"
        >
          <div className="w-full flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-200">Bottom tabs on mobile</div>
              <div className="text-xs text-slate-500">Move product-detail section tabs to the bottom (portrait)</div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={prefs.productTabsBottomOnMobile}
                onCheckedChange={(v) => actions.setProductTabsBottomOnMobile(Boolean(v))}
                aria-label="Toggle bottom tabs on mobile"
                className={
                  // Dark dropdown background needs a darker unchecked track.
                  // Also ensure the thumb stays visible.
                  'border border-white/10 ' +
                  'data-[state=unchecked]:bg-white/10 data-[state=checked]:bg-primary/90 ' +
                  '[&_[data-slot=switch-thumb]]:bg-white [&_[data-slot=switch-thumb]]:shadow-sm'
                }
              />
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
