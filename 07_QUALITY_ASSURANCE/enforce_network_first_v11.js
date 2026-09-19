const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
const swPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/sw.js');

let html = fs.readFileSync(htmlPath, 'utf8');
let sw = fs.readFileSync(swPath, 'utf8');

console.log('--- 1. UPDATING INDEX.HTML TO v11.0.0 CACHE BUSTER ---');
html = html.replace(/jayt_apex_interface\.js(\?v=[^"]*)?/g, 'jayt_apex_interface.js?v=11.0.0');

// Add auto-updating & cache-purging script to index.html
const oldSwScriptRegex = /<script>\s*\/\/ PWA Service Worker Registration[\s\S]*?<\/script>/;
const newSwScript = `<script>
    // PWA Service Worker Registration with Immediate Dynamic Update (v11.0.0)
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js?v=11.0.0')
          .then(reg => {
            console.log('[JayT PWA] Service Worker registered (v11.0.0):', reg.scope);
            reg.update();
          })
          .catch(err => console.log('[JayT PWA] Registration failed:', err));
      });
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[JayT PWA] New controller detected, refreshing cache...');
      });
    }
  </script>`;

if (oldSwScriptRegex.test(html)) {
  html = html.replace(oldSwScriptRegex, newSwScript.trim());
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Updated index.html with v11.0.0 script tags & SW updater');

console.log('\n--- 2. UPDATING SW.JS TO v11.0.0 WITH AGGRESSIVE CACHE PURGE ---');
const newSwCode = `/**
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
`;

fs.writeFileSync(swPath, newSwCode, 'utf8');
console.log('✅ Updated sw.js to v11.0.0 with Network-First strategy for instant updates');
