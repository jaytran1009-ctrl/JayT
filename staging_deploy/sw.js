// JayT Service Worker - Staging v3.420.0-staging.ak
const CACHE_NAME = 'jayt-cache-v3-420-staging-ak';
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => self.clients.claim());
self.addEventListener('fetch', (e) => {
  // Network first for staging review
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
