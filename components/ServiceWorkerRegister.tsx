'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    // Avoid SW during local dev to prevent stale caching + hydration mismatches.
    if (process.env.NODE_ENV !== 'production') {
      if (!('serviceWorker' in navigator)) return
      // Best-effort cleanup of previously registered SW + caches from earlier runs.
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister())
      })
      if ('caches' in window) {
        caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)))
      }
      return
    }
    if (!('serviceWorker' in navigator)) return
    // Register after page load to keep initial render fast.
    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // ignore
      })
    }

    if (document.readyState === 'complete') register()
    else window.addEventListener('load', register, { once: true })
  }, [])

  return null
}
