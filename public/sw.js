/*
  Minimal service worker.

  This is intentionally lightweight: it exists mainly to satisfy the PWA
  installability criteria (manifest + service worker).

  Offline caching is intentionally NOT implemented here.
*/

self.addEventListener('install', (event) => {
  // Activate worker immediately
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Take control of clients immediately
  event.waitUntil(self.clients.claim())
})

// No fetch handler -> network default
