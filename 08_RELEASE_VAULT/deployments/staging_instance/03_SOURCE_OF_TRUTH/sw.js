/**
 * JAYT ĐÀ NẴNG — PWA SERVICE WORKER v11.0.0 (DYNAMIC VISUAL MEDIA & REALTIME ENGINE)
 */

const CACHE_NAME = 'jayt-danang-v11.0.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './jayt_apex_interface.js?v=11.0.0',
  './customer_journey_north_star.json',
  './four_layer_dataset.json',
  './radar_dataset_086u.json',
  './brand_asset_registry.json',
  './daily_supply_feed_126.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[JayT SW] Purging old cache version:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Network First for HTML and JS to ensure instant updates
  if (event.request.url.includes('index.html') || event.request.url.includes('jayt_apex_interface.js') || event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        }
        return networkResponse;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // Stale-While-Revalidate for other assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        }
        return networkResponse;
      }).catch(() => {/* Offline fallback */});

      return cachedResponse || fetchPromise;
    })
  );
});
