const fs = require('fs');
const path = require('path');

// 1. Update vercel.json in SOT and deploy
const vercelConfig = {
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
};

fs.writeFileSync(path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/vercel.json'), JSON.stringify(vercelConfig, null, 2), 'utf8');
fs.writeFileSync(path.resolve(__dirname, '../deploy/vercel.json'), JSON.stringify(vercelConfig, null, 2), 'utf8');
console.log('✅ Updated vercel.json to prevent stale rewrites and enforce immediate cache revalidation');

// 2. Update index.html script tag with cache-busting version
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

htmlCode = htmlCode.replace(/<script src="jayt_apex_interface\.js[^"]*"><\/script>/g, '<script src="jayt_apex_interface.js?v=9.0.0"></script>');

fs.writeFileSync(htmlPath, htmlCode, 'utf8');
console.log('✅ Updated index.html script tag with ?v=9.0.0 cache buster');

// 3. Update sw.js to purge all old caches immediately
const swPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/sw.js');
const swCode = `/**
 * JAYT ĐÀ NẴNG — PWA SERVICE WORKER v9.0.0 (OFFLINE-FIRST ENGINE & IMMEDIATE PURGE)
 */

const CACHE_NAME = 'jayt-danang-v9.0.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './jayt_apex_interface.js?v=9.0.0',
  './customer_journey_north_star.json',
  './four_layer_dataset.json',
  './radar_dataset_086u.json',
  './brand_asset_registry.json',
  './daily_supply_feed_126.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[JayT SW] Purging old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        }
        return networkResponse;
      }).catch(() => {/* Offline */});

      return cachedResponse || fetchPromise;
    })
  );
});
`;

fs.writeFileSync(swPath, swCode, 'utf8');
console.log('✅ Updated sw.js to v9.0.0 with immediate purge of old caches');
