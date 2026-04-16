'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
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
