const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const assert = require('assert');

const DEPLOY_DIR = path.resolve(__dirname, '../deploy');
const PORT = 4182;

// Simple static file server
function createServer() {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
  };

  return http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    if (reqUrl === '/') reqUrl = '/index.html';
    const filePath = path.join(DEPLOY_DIR, reqUrl);
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found: ' + reqUrl);
    }
  });
}

(async () => {
  const server = createServer();
  await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
  console.log(`Test server running at http://127.0.0.1:${PORT}/`);

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const results = {};

  try {
    const viewports = [
      { name: 'mobile_390', width: 390, height: 844 },
      { name: 'desktop_1440', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      const page = await browser.newPage();
      const consoleErrors = [];
      page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
      page.on('pageerror', err => consoleErrors.push(err.message));

      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
      const resp = await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle2' });
      assert.strictEqual(resp.status(), 200, `HTTP status should be 200`);

      const audit = await page.evaluate(() => {
        const isVisible = sel => {
          const el = document.querySelector(sel);
          if (!el) return false;
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && el.getClientRects().length > 0;
        };

        const bodyText = document.body.innerText;
        const brandSubtitleEl = document.querySelector('.brand-subtitle');
        const subtitleVisible = isVisible('.brand-subtitle');
        const kickerEl = document.querySelector('.j406-kicker');
        const heroEl = document.querySelector('.j406-hero');
        const radarEl = document.querySelector('.j411-radar');
        const dockEl = document.querySelector('#counter-quick-dock');

        // Check for emojis in dock
        const dockText = dockEl ? dockEl.innerText : '';
        const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
        const hasDockEmoji = emojiRegex.test(dockText);

        const dockSvgs = dockEl ? dockEl.querySelectorAll('svg').length : 0;
        const heroBg = heroEl ? window.getComputedStyle(heroEl).backgroundImage : '';
        const radarBg = radarEl ? window.getComputedStyle(radarEl).backgroundColor : '';

        // Check first section gap
        const firstSection = document.querySelector('.j406-concierge > .j406-section:first-of-type');
        const sectionStyle = firstSection ? window.getComputedStyle(firstSection) : null;

        return {
          version: document.querySelector('[data-version]')?.dataset.version,
          title: document.querySelector('.brand-title')?.textContent.trim(),
          subtitleText: brandSubtitleEl?.textContent.trim(),
          subtitleVisible,
          kickerText: kickerEl?.textContent.trim(),
          hasJaytCorp: /JAYT\s+CORP/i.test(bodyText),
          hasRetiredSlogan: /AESTHETIC\s*&\s*MINIMAL\s*DESIGN/i.test(bodyText),
          undefinedText: /\bundefined\b/i.test(bodyText),
          hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          dockVisible: isVisible('#counter-quick-dock'),
          dockHeight: dockEl?.getBoundingClientRect().height || 0,
          hasDockEmoji,
          dockSvgs,
          heroBgHasSunsetFire: heroBg.includes('dragon_bridge_hero_sunset_fire.jpg'),
          radarIsTransparent: radarBg === 'rgba(0, 0, 0, 0)' || radarBg === 'transparent',
          firstSectionMarginTop: sectionStyle ? sectionStyle.marginTop : null,
          affiliateEnabled: document.documentElement.innerHTML.includes('affiliate_enabled: true')
        };
      });

      // Assertions
      assert.strictEqual(audit.version, 'v3.465.0-j421', 'Version should be v3.465.0-j421');
      assert.strictEqual(audit.title, 'JAYT ĐÀ NẴNG', 'Title should be JAYT ĐÀ NẴNG');
      assert.strictEqual(audit.subtitleText, 'Cẩm nang tiện ích & đời sống số', 'Subtitle should match');
      assert.strictEqual(audit.subtitleVisible, true, `Subtitle MUST be visible on ${vp.name}`);
      assert.strictEqual(audit.kickerText, 'JAYT ĐÀ NẴNG · NHỊP SỐNG HÔM NAY', 'Kicker should be JAYT ĐÀ NẴNG · NHỊP SỐNG HÔM NAY');
      assert.strictEqual(audit.hasJaytCorp, false, 'JAYT CORP must be purged from DOM');
      assert.strictEqual(audit.hasRetiredSlogan, false, 'Retired template slogan must be absent');
      assert.strictEqual(audit.undefinedText, false, 'No undefined text');
      assert.strictEqual(audit.hasOverflow, false, 'No horizontal overflow');
      assert.strictEqual(audit.heroBgHasSunsetFire, true, 'Hero must use dragon_bridge_hero_sunset_fire.jpg');
      assert.strictEqual(audit.hasDockEmoji, false, 'Dock MUST NOT contain emojis');
      assert.strictEqual(audit.dockSvgs, 4, 'Dock MUST contain exactly 4 SVG icons');
      assert.strictEqual(audit.affiliateEnabled, false, 'affiliate_enabled must be false');
      assert.strictEqual(consoleErrors.length, 0, `Console errors: ${consoleErrors.join('; ')}`);

      if (vp.width === 390) {
        assert.strictEqual(audit.dockVisible, true, 'Dock must be visible on mobile');
        assert(audit.dockHeight >= 55 && audit.dockHeight <= 58, `Dock height ${audit.dockHeight}px on mobile`);
      } else {
        assert.strictEqual(audit.dockVisible, false, 'Dock must be hidden on desktop');
      }

      // Latency test for Cashier HUD
      const hudMs = await page.evaluate(() => {
        const t0 = performance.now();
        openCashierQuickCard('highlands_coffee');
        const dur = performance.now() - t0;
        closeCashierQuickCard();
        return dur;
      });
      assert(hudMs < 30, `HUD latency must be <30ms, got ${hudMs}ms`);

      // Capture screenshot
      const ssPath = path.resolve(__dirname, `runtime_evidence/j421_live_${vp.name}.png`);
      await page.screenshot({ path: ssPath, fullPage: false });
      console.log(`[PASS] ${vp.name}: Subtitle Visible=${audit.subtitleVisible} | Kicker="${audit.kickerText}" | HUD=${hudMs.toFixed(2)}ms | Screenshot=${ssPath}`);

      results[vp.name] = {
        viewport: vp,
        audit,
        hudMs,
        screenshot: ssPath
      };

      await page.close();
    }

    // Write QA receipt
    const receiptPath = path.resolve(__dirname, 'runtime_evidence/JAYT_421_LIVE_RECEIPT.json');
    const receiptData = {
      receipt_id: 'JAYT_421_LIVE_RECEIPT',
      version: 'v3.465.0-j421',
      timestamp: new Date().toISOString(),
      qa_results: results,
      verdict: 'QUIET_LUXURY_EDITORIAL_HERO_AND_SYSTEM_REFINEMENT_PASS'
    };
    fs.writeFileSync(receiptPath, JSON.stringify(receiptData, null, 2), 'utf8');
    console.log(`[RECEIPT] Saved QA receipt to ${receiptPath}`);
    console.log('\n=== ALL JAYT-421 TESTS PASSED PERFECTLY ===\n');

  } finally {
    await browser.close();
    server.close();
  }
})().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
