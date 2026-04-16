/*
  Lightweight service worker.

  Goals:
  - Keep the app installable.
  - Prevent “Offline” blank/error screens during back navigation by providing
    a safe fallback when the network is temporarily unavailable.

  This is NOT a full offline-first experience; it uses network-first for
  navigations and caches a small app shell + last-seen pages.
*/

const CACHE_NAME = 'digitalby-shell-v1'
const APP_SHELL = ['/', '/menu', '/products', '/services', '/team', '/giveaway', '/offline.html']

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) =>
        Promise.all(keys.map((k) => (k === CACHE_NAME ? Promise.resolve() : caches.delete(k)))),
      ),
    ]),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)
  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return
  // Avoid caching API calls
  if (url.pathname.startsWith('/api/')) return

  // Navigations: network-first with fallback to cache/offline
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req)
          const cache = await caches.open(CACHE_NAME)
          cache.put(req, fresh.clone())
          return fresh
        } catch (e) {
          const cached = await caches.match(req)
          if (cached) return cached
          // Prefer landing pages over browser's offline error page
          return (await caches.match('/menu')) || (await caches.match('/')) || (await caches.match('/offline.html'))
        }
      })(),
    )
    return
  }

  // Static assets: cache-first with network fallback
  event.respondWith(
    (async () => {
      const cached = await caches.match(req)
      if (cached) return cached
      try {
        const fresh = await fetch(req)
        // Only cache successful, basic responses
        if (fresh && fresh.ok && fresh.type === 'basic') {
          const cache = await caches.open(CACHE_NAME)
          cache.put(req, fresh.clone())
        }
        return fresh
      } catch (e) {
        return cached || Response.error()
      }
    })(),
  )
})


