// JayT Service Worker - v3.436.0-j372-r2
const CACHE_NAME = 'jayt-cache-v3.436.0-j372-r2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/jayt_apex_interface.js',
  '/assets/vendor/qrcode.js',
  '/published_manifest.json',
  '/deals_feed.json',
  '/registry.json',
  '/assets/images/dragon_bridge_hero_sunset_fire.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
