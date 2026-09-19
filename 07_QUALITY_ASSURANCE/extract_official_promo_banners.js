const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchHtml(new URL(res.headers.location, url).href));
      }
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => resolve(html));
    }).on('error', reject);
  });
}

async function inspectPromoPages() {
  console.log('🔍 Scanning official promotion pages for real promotional posters/banners...\n');

  const targets = [
    { name: 'Metiz Cinema', url: 'https://metiz.vn/tin-va-khuyen-mai.html' },
    { name: 'Starlight Cinema', url: 'https://starlight.vn/uu-dai.html' },
    { name: 'Galaxy Cinema', url: 'https://www.galaxycine.vn/khuyen-mai' }
  ];

  for (const t of targets) {
    console.log(`Checking ${t.name} (${t.url})...`);
    try {
      const html = await fetchHtml(t.url);
      console.log(`  Fetched ${html.length} characters.`);
      // Extract image tags
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
      let match;
      const foundImgs = [];
      while ((match = imgRegex.exec(html)) !== null) {
        const src = match[1];
        if (src.includes('.jpg') || src.includes('.png') || src.includes('.webp') || src.includes('.jpeg')) {
          foundImgs.push(src);
        }
      }
      console.log(`  Found ${foundImgs.length} images:`);
      foundImgs.slice(0, 8).forEach(img => console.log(`    - ${img}`));
      console.log('');
    } catch (err) {
      console.warn(`  Failed to fetch ${t.name}: ${err.message}\n`);
    }
  }
}

if (require.main === module) {
  inspectPromoPages();
}

module.exports = { inspectPromoPages };
