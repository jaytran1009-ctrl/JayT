const puppeteer = require('puppeteer');

const targetUrl = process.env.JAYT_TEST_URL || 'http://127.0.0.1:4181/';
const requiredIds = [
  'onsite-counter-search-section', 'counter-quick-dock', 'cinema-power-hub',
  'danang-fnb-hub-container', 'campus-dock-section', 'deals-vault-module',
  'lunch-arbitrage-module', 'student-savings-module', 'split-bill-module',
  'dorm-shopping-module', 'counter-copilot-sheet', 'onsite-bill-split-modal',
  'zalo-pass-modal'
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    for (const width of [390, 1440]) {
      const page = await browser.newPage();
      const errors = [];
      page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
      page.on('pageerror', err => errors.push(err.message));
      await page.setViewport({ width, height: width === 390 ? 844 : 900, isMobile: width === 390 });
      const response = await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
      assert(response && response.status() < 400, `HTTP ${response && response.status()}`);

      const state = await page.evaluate((ids) => {
        const root = document.documentElement;
        const bodyText = document.body.innerText;
        const all = Array.from(document.querySelectorAll('*'));
        const dashed = all.filter(node => {
          const style = getComputedStyle(node);
          return ['dashed', 'dotted'].includes(style.borderTopStyle) ||
            ['dashed', 'dotted'].includes(style.borderRightStyle) ||
            ['dashed', 'dotted'].includes(style.borderBottomStyle) ||
            ['dashed', 'dotted'].includes(style.borderLeftStyle);
        }).length;
        const dockStyle = getComputedStyle(document.getElementById('counter-quick-dock'));
        const passCard = document.getElementById('j405-pass-card');
        return {
          version: document.querySelector('[data-version]')?.getAttribute('data-version'),
          missing: ids.filter(id => !document.getElementById(id)),
          hasPass: !!document.querySelector('.jayt-pass-banner') && !!passCard,
          hasPassQr: !!document.querySelector('#j405-pass-qr table'),
          hasTerminal: !!document.querySelector('.j401-voucher-box') && bodyText.includes('Terminal tra link trong 3 giây'),
          hasMonogramSvg: !!document.querySelector('.brand-symbol svg.jayt-gold-monogram'),
          undefinedText: /(^|[^a-z])undefined([^a-z]|$)/i.test(bodyText),
          legacyGreenLiteral: /#047857|#10B981|rgb\(4,\s*120,\s*87\)|rgb\(16,\s*185,\s*129\)/i.test(document.documentElement.innerHTML),
          dashed,
          overflow: root.scrollWidth > root.clientWidth,
          dockHeight: parseFloat(dockStyle.height),
          dockZ: dockStyle.zIndex,
          bodyBackground: getComputedStyle(document.body).backgroundImage
        };
      }, requiredIds);

      assert(state.version === 'v3.455.0-j405', `version ${state.version}`);
      assert(!state.missing.length, `missing ${state.missing.join(', ')}`);
      assert(state.hasPass, 'JayT Pass missing');
      assert(state.hasPassQr, 'JayT Pass QR missing');
      assert(state.hasTerminal, 'KTX terminal missing');
      assert(state.hasMonogramSvg, 'JT vector monogram missing');
      assert(!state.undefinedText, 'undefined text present');
      assert(!state.legacyGreenLiteral, 'legacy green literal present');
      assert(state.dashed === 0, `${state.dashed} dashed/dotted borders remain`);
      assert(!state.overflow, 'horizontal overflow');
      assert(Math.abs(state.dockHeight - 56) <= 2, `dock height ${state.dockHeight}`);
      assert(state.dockZ === '90', `dock z-index ${state.dockZ}`);
      assert(!errors.length, `console errors: ${errors.join(' | ')}`);

      const interaction = await page.evaluate(() => {
        const hudButton = document.querySelector('#counter-quick-dock button');
        const start = performance.now();
        hudButton.click();
        const hudLatency = performance.now() - start;
        const modalOpen = document.getElementById('cashier-quick-modal')?.getAttribute('aria-hidden') !== 'true';
        const flip = document.getElementById('j405-pass-flip');
        if (flip) flip.click();
        return {
          hudLatency,
          modalOpen,
          passFlipped: document.getElementById('j405-pass-card')?.classList.contains('is-flipped') || false
        };
      });
      assert(interaction.modalOpen, 'Cashier HUD did not open');
      assert(interaction.hudLatency < 50, `Cashier HUD ${interaction.hudLatency.toFixed(2)}ms`);
      assert(interaction.passFlipped, 'JayT Pass did not flip');

      console.log(`[J405 ${width}px] PASS | 12 modules | no legacy green/dashed | HUD ${interaction.hudLatency.toFixed(2)}ms | Pass flip+QR`);
      await page.close();
    }
    console.log('JAYT-405 PINNACLE BRAND QA: PASS');
  } catch (error) {
    console.error(`JAYT-405 PINNACLE BRAND QA: FAIL — ${error.message}`);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
