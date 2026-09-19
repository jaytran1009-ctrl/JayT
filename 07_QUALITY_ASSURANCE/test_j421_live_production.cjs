const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
  const url = 'https://jayt-production-v3420.vercel.app/';
  console.log('Testing live production:', url);
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    for (const vp of [{name:'mobile_390',width:390,height:844},{name:'desktop_1440',width:1440,height:900}]) {
      const page = await browser.newPage();
      const errors = [];
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      page.on('pageerror', e => errors.push(e.message));
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
      const res = await page.goto(url, { waitUntil: 'networkidle2' });
      assert([200, 304].includes(res.status()), 'HTTP status must be 200 or 304, got ' + res.status());

      const audit = await page.evaluate(() => {
        const isVisible = sel => {
          const el = document.querySelector(sel);
          if (!el) return false;
          const s = window.getComputedStyle(el);
          return s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0' && el.getClientRects().length > 0;
        };
        const text = document.body.innerText;
        const dockEl = document.querySelector('#counter-quick-dock');
        const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
        const heroEl = document.querySelector('.j406-hero');
        const heroBg = heroEl ? window.getComputedStyle(heroEl).backgroundImage : '';

        return {
          version: document.querySelector('[data-version]')?.dataset.version,
          title: document.querySelector('.brand-title')?.textContent.trim(),
          subtitleText: document.querySelector('.brand-subtitle')?.textContent.trim(),
          subtitleVisible: isVisible('.brand-subtitle'),
          kickerText: document.querySelector('.j406-kicker')?.textContent.trim(),
          hasJaytCorp: /JAYT\s+CORP/i.test(text),
          hasRetiredSlogan: /AESTHETIC\s*&\s*MINIMAL\s*DESIGN/i.test(text),
          undefinedText: /\bundefined\b/i.test(text),
          hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          dockVisible: isVisible('#counter-quick-dock'),
          dockHeight: dockEl?.getBoundingClientRect().height || 0,
          hasDockEmoji: emojiRegex.test(dockEl ? dockEl.innerText : ''),
          dockSvgs: dockEl ? dockEl.querySelectorAll('svg').length : 0,
          heroBgHasSunsetFire: heroBg.includes('dragon_bridge_hero_sunset_fire.jpg'),
          affiliateEnabled: document.documentElement.innerHTML.includes('affiliate_enabled: true')
        };
      });

      assert.strictEqual(audit.version, 'v3.465.0-j421', 'Version mismatch');
      assert.strictEqual(audit.title, 'JAYT ĐÀ NẴNG', 'Title mismatch');
      assert.strictEqual(audit.subtitleText, 'Cẩm nang tiện ích & đời sống số', 'Subtitle mismatch');
      assert.strictEqual(audit.subtitleVisible, true, 'Subtitle must be visible');
      assert.strictEqual(audit.kickerText, 'JAYT ĐÀ NẴNG · NHỊP SỐNG HÔM NAY', 'Kicker mismatch');
      assert.strictEqual(audit.hasJaytCorp, false, 'Found JAYT CORP');
      assert.strictEqual(audit.hasRetiredSlogan, false, 'Found retired slogan');
      assert.strictEqual(audit.undefinedText, false, 'Found undefined text');
      assert.strictEqual(audit.hasOverflow, false, 'Horizontal overflow');
      assert.strictEqual(audit.heroBgHasSunsetFire, true, 'Hero image mismatch');
      assert.strictEqual(audit.hasDockEmoji, false, 'Dock has emoji');
      assert.strictEqual(audit.dockSvgs, 4, 'Dock does not have 4 SVGs');
      assert.strictEqual(audit.affiliateEnabled, false, 'Affiliate enabled');
      assert.strictEqual(errors.length, 0, 'Console errors: ' + errors.join('; '));

      const hudMs = await page.evaluate(() => {
        const t0 = performance.now();
        openCashierQuickCard('highlands_coffee');
        const dur = performance.now() - t0;
        closeCashierQuickCard();
        return dur;
      });
      assert(hudMs < 30, 'HUD too slow');

      console.log(`[LIVE PROD PASS] ${vp.name}: Subtitle Visible=${audit.subtitleVisible} | Kicker="${audit.kickerText}" | HUD=${hudMs.toFixed(2)}ms | 0 errors`);
      await page.close();
    }
    console.log('\n=== LIVE CANONICAL PRODUCTION JAYT-421 AUDIT: 100% PASS ===\n');
  } finally {
    await browser.close();
  }
})().catch(e => { console.error('Live QA Failed:', e); process.exit(1); });
