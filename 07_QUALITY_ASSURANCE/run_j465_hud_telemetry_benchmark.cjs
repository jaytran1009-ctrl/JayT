/**
 * J465 HUD Frame Latency Benchmark Runner
 * Measures real-user in-page high-resolution touch event sequence to HUD visibility
 * across N=10 independent mobile viewport iterations (390x844).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const puppeteer = require(path.join(ROOT_DIR, 'node_modules', 'puppeteer'));
const servedRoot = path.join(ROOT_DIR, 'deploy');

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png'
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const requested = urlPath === '/' ? '/index.html' : urlPath;
  const file = path.resolve(servedRoot, '.' + requested);
  if (!file.startsWith(servedRoot + path.sep) && file !== path.join(servedRoot, 'index.html')) {
    res.writeHead(403); return res.end('Forbidden');
  }
  fs.readFile(file, (err, bytes) => {
    if (err) { res.writeHead(err.code === 'ENOENT' ? 404 : 500); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(bytes);
  });
});

async function runBenchmark(iterations = 10) {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const url = `http://127.0.0.1:${port}/`;
  const browser = await puppeteer.launch({ headless: 'new' });
  const samples = [];

  for (let i = 1; i <= iterations; i++) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, hasTouch: true, isMobile: true });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 200));

    await page.evaluate(() => {
      window.__telemetry = { events: [], visibleAt: null };
      const btn = document.querySelector('#counter-quick-dock .counter-dock-btn');
      if (!btn) return;
      ['pointerdown', 'touchstart', 'pointerup', 'touchend', 'click'].forEach(evt => {
        btn.addEventListener(evt, () => {
          window.__telemetry.events.push({ type: evt, t: performance.now() });
        }, { passive: true });
      });
      const observer = new MutationObserver(() => {
        const modal = document.getElementById('counter-3sec-modal');
        const dialog = modal?.querySelector('[role="dialog"]');
        if (modal && dialog && getComputedStyle(modal).display !== 'none' && !window.__telemetry.visibleAt) {
          window.__telemetry.visibleAt = performance.now();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    });

    await page.tap('#counter-quick-dock .counter-dock-btn');
    await page.waitForSelector('#counter-3sec-modal [role="dialog"]', { visible: true, timeout: 5000 });

    const data = await page.evaluate(() => window.__telemetry);
    const pDown = data.events.find(e => e.type === 'pointerdown');
    const tClick = data.events.find(e => e.type === 'click');
    const tVis = data.visibleAt;

    if (pDown && tClick && tVis) {
      samples.push({
        iteration: i,
        pointerdown_to_visible_ms: +(tVis - pDown.t).toFixed(2),
        click_to_visible_ms: +(tVis - tClick.t).toFixed(2),
        pointerdown_to_click_delay_ms: +(tClick.t - pDown.t).toFixed(2)
      });
    }
    await page.close();
  }
  await browser.close();
  server.close();
  return samples;
}

module.exports = { runBenchmark };
