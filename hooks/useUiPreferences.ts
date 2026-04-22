'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

export type UiPreferences = {
  /** On mobile/tablet portrait, put the product detail section tabs at the bottom (thumb-friendly). */
  productTabsBottomOnMobile: boolean
}

const STORAGE_KEY = 'digitalby:uiPreferences:v1'
const COOKIE_KEY = 'digitalby_uiPreferences_v1'

const DEFAULTS: UiPreferences = {
  productTabsBottomOnMobile: false,
}

function safeParse(raw: string | null): Partial<UiPreferences> | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return null
    return parsed as Partial<UiPreferences>
  } catch {
    return null
  }
}

function readCookie(key: string): string | null {
  if (typeof document === 'undefined') return null
  const parts = document.cookie.split(';').map((p) => p.trim())
  const match = parts.find((p) => p.startsWith(`${key}=`))
  if (!match) return null
  return decodeURIComponent(match.slice(key.length + 1))
}

function writeCookie(key: string, value: string) {
  if (typeof document === 'undefined') return
  // 180 days
  const maxAge = 60 * 60 * 24 * 180
  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`
}

export function useUiPreferences() {
  const [prefs, setPrefs] = useState<UiPreferences>(DEFAULTS)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const parsed = safeParse(window.localStorage.getItem(STORAGE_KEY)) ?? safeParse(readCookie(COOKIE_KEY))
    setPrefs({
      ...DEFAULTS,
      ...parsed,
    })
    setIsReady(true)

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      const nextParsed = safeParse(e.newValue)
      setPrefs({ ...DEFAULTS, ...nextParsed })
      setIsReady(true)
    }

    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent<UiPreferences | Partial<UiPreferences> | undefined>).detail
      if (!detail) return
      setPrefs({ ...DEFAULTS, ...(detail as Partial<UiPreferences>) })
      setIsReady(true)
    }

    // `storage` fires across tabs; custom event is for same-tab updates.
    window.addEventListener('storage', onStorage)
    window.addEventListener('digitalby:uiPreferences', onCustom)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('digitalby:uiPreferences', onCustom)
    }
  }, [])

  const update = useCallback((patch: Partial<UiPreferences>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch }
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore
      }

      // Also persist to cookies as a fallback (some kiosk browsers block localStorage).
      try {
        writeCookie(COOKIE_KEY, JSON.stringify(next))
      } catch {
        // ignore
      }

      // Notify other hook instances in the same tab.
      try {
        window.dispatchEvent(new CustomEvent('digitalby:uiPreferences', { detail: next }))
      } catch {
        // ignore
      }

      return next
    })
  }, [])

  const actions = useMemo(() => {
    return {
      setProductTabsBottomOnMobile: (value: boolean) => update({ productTabsBottomOnMobile: value }),
    }
  }, [update])

  return { prefs, actions, isReady }
}
