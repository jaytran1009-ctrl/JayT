const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const PORT = 4176;
const HOST = '127.0.0.1';
const BASE_URL = `http://${HOST}:${PORT}/`;
const WORKSPACE_DIR = path.resolve(__dirname, '..');
const STATIC_DIR = path.join(WORKSPACE_DIR, 'staging_preview_sprint_b');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function createServer() {
  return http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const safePath = path.normalize(path.join(STATIC_DIR, reqPath));
    if (!safePath.startsWith(STATIC_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      return res.end('Forbidden');
    }
    if (fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
      const ext = path.extname(safePath).toLowerCase();
      const mime = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': mime,
        'Cache-Control': 'no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(safePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
    }
  });
}

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

async function runAudit() {
  console.log('--- STARTING JAYT-350 STAGING & A11Y AUDIT (:4176) ---');
  let server;
  let serverStartedLocally = false;

  try {
    await new Promise((resolve, reject) => {
      const req = http.get(BASE_URL, () => resolve());
      req.on('error', reject);
    });
    console.log('Staging server already running on port ' + PORT);
  } catch (e) {
    console.log('Starting local Staging server on port ' + PORT);
    server = createServer();
    await new Promise((resolve) => server.listen(PORT, HOST, resolve));
    serverStartedLocally = true;
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.toString()));

  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

  // 1. Audit Voucher Vault rendering and filters
  console.log('[AUDIT] Testing Voucher Vault navigation and filters...');
  const vaultAudit = await page.evaluate(async () => {
    // Navigate to Voucher Vault
    const vaultNavBtn = document.querySelector('[data-nav="VOUCHER_HUB"]');
    if (vaultNavBtn) vaultNavBtn.click();
    await new Promise(r => setTimeout(r, 200));

    const grid = document.getElementById('voucher-vault-grid');
    const cards = grid ? Array.from(grid.querySelectorAll('.vault-card')) : [];
    const totalRendered = cards.length;

    // Check filter counts
    const filterResults = {};
    const filters = ['ALL', 'PRICE_OBSERVATION', 'COUNTER_DEAL', 'BRAND_PROGRAM', 'APP_VOUCHER'];
    for (const f of filters) {
      const btn = document.querySelector(`[data-vault-filter="${f}"]`);
      if (btn) {
        btn.click();
        await new Promise(r => setTimeout(r, 50));
        const visible = cards.filter(c => c.style.display !== 'none').length;
        filterResults[f] = visible;
      }
    }

    // Reset to ALL
    const allBtn = document.querySelector('[data-vault-filter="ALL"]');
    if (allBtn) allBtn.click();

    // Check newly hydrated IDs
    const cardIds = cards.map(c => c.getAttribute('data-card-id'));
    const copyButtonsCount = document.querySelectorAll('.btn-copy-code').length;

    return {
      totalCardsRendered: totalRendered,
      filterResults,
      cardIds,
      copyButtonsCount
    };
  });

  console.log('[AUDIT] Voucher Vault Total Cards:', vaultAudit.totalCardsRendered);
  console.log('[AUDIT] Filter Results:', JSON.stringify(vaultAudit.filterResults));
  console.log('[AUDIT] Copy Buttons Count:', vaultAudit.copyButtonsCount);

  // 2. Audit Accessibility (Contrast, Headings, Touch Targets)
  console.log('[AUDIT] Testing Accessibility & Contrast across routes...');
  const a11yAudit = await page.evaluate(async () => {
    function parseRgb(colorStr) {
      if (!colorStr) return [0, 0, 0, 1];
      const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (!match) return [0, 0, 0, 1];
      return [
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3], 10),
        match[4] !== undefined ? parseFloat(match[4]) : 1
      ];
    }

    function getLuminance(r, g, b) {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    }

    function getContrastRatio(rgb1, rgb2) {
      const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
      const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    }

    function getEffectiveBg(el) {
      const layers = [];
      let cur = el;
      while (cur && cur !== document.documentElement) {
        const bg = window.getComputedStyle(cur).backgroundColor;
        const parsed = parseRgb(bg);
        if (parsed[3] > 0) {
          layers.unshift(parsed);
          if (parsed[3] >= 0.99) break;
        }
        cur = cur.parentElement;
      }
      let r = 255, g = 255, b = 255;
      for (const layer of layers) {
        const a = layer[3];
        r = Math.round(layer[0] * a + r * (1 - a));
        g = Math.round(layer[1] * a + g * (1 - a));
        b = Math.round(layer[2] * a + b * (1 - a));
      }
      return [r, g, b, 1];
    }

    const views = ['HOME', 'VOUCHER_HUB', 'SPLIT_BILL_PRO', 'SAVINGS_CALENDAR', 'VALUE_RADAR'];
    const report = {
      totalElementsChecked: 0,
      passedElements: 0,
      failedElements: 0,
      headingErrors: [],
      touchTargetErrors: []
    };

    for (const v of views) {
      const btn = document.querySelector(`[data-nav="${v}"]`);
      if (btn) {
        btn.click();
        await new Promise(r => setTimeout(r, 100));
      }

      // Check headings
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .filter(h => h.offsetParent !== null);
      let lastLevel = 0;
      for (const h of headings) {
        const level = parseInt(h.tagName[1], 10);
        if (lastLevel > 0 && level > lastLevel + 1) {
          report.headingErrors.push(`Heading skip in view ${v}: h${lastLevel} -> h${level}`);
        }
        lastLevel = level;
      }

      // Check text contrast on text nodes
      const textEls = Array.from(document.querySelectorAll('p, span, a, button, h1, h2, h3, label, strong, small'))
        .filter(el => el.offsetParent !== null && el.innerText && el.innerText.trim().length > 0);

      for (const el of textEls) {
        const style = window.getComputedStyle(el);
        const fg = parseRgb(style.color);
        const bg = getEffectiveBg(el);
        const ratio = getContrastRatio(fg, bg);
        const fontSize = parseFloat(style.fontSize);
        const isBold = parseInt(style.fontWeight, 10) >= 700 || style.fontWeight === 'bold';
        const isLarge = fontSize >= 24 || (fontSize >= 18.66 && isBold);
        const req = isLarge ? 3.0 : 4.5;
        
        report.totalElementsChecked++;
        if (ratio >= req - 0.05) {
          report.passedElements++;
        } else {
          report.failedElements++;
          if (!report.failedList) report.failedList = [];
          report.failedList.push({
            view: v,
            tag: el.tagName,
            class: el.className,
            text: el.innerText ? el.innerText.slice(0, 30).trim() : '',
            fg: style.color,
            bg: `rgb(${bg[0]}, ${bg[1]}, ${bg[2]})`,
            ratio: Math.round(ratio * 100) / 100,
            req
          });
        }
      }

      // Check touch targets on interactive elements
      const interactives = Array.from(document.querySelectorAll('button, a, input, select, [tabindex="0"]'))
        .filter(el => el.offsetParent !== null);
      for (const el of interactives) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
          // Allow inline links inside paragraphs if they have padding or line-height
          if (el.tagName === 'A' && el.closest('p')) continue;
          report.touchTargetErrors.push({
            view: v,
            tag: el.tagName,
            text: el.innerText ? el.innerText.slice(0, 20) : '',
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          });
        }
      }
    }

    return report;
  });

  console.log('[AUDIT] Contrast Elements Checked:', a11yAudit.totalElementsChecked, 'Passed:', a11yAudit.passedElements, 'Failed:', a11yAudit.failedElements);
  if (a11yAudit.failedList && a11yAudit.failedList.length > 0) {
    console.log('[AUDIT] Contrast Failed Elements:', JSON.stringify(a11yAudit.failedList, null, 2));
  }
  console.log('[AUDIT] Heading Errors:', a11yAudit.headingErrors.length);
  console.log('[AUDIT] Touch Target Errors:', a11yAudit.touchTargetErrors.length);

  // 3. Viewport Responsiveness Tests
  console.log('[AUDIT] Testing Viewport Responsiveness (1440px, 768px, 390px)...');
  const viewports = [
    { width: 1440, height: 900, name: 'Desktop' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 390, height: 844, name: 'Mobile' }
  ];

  const viewportResults = {};
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await new Promise(r => setTimeout(r, 100));

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    viewportResults[vp.name] = { width: vp.width, overflowDetected: overflow };
    console.log(`[AUDIT] Viewport ${vp.name} (${vp.width}px): horizontal overflow = ${overflow}`);
  }

  // 4. Keyboard Navigation Test
  console.log('[AUDIT] Testing Keyboard Navigation...');
  await page.setViewport({ width: 1440, height: 900 });
  const keyboardAudit = await page.evaluate(async () => {
    // Focus first interactive element
    const navBtn = document.querySelector('[data-nav="VOUCHER_HUB"]');
    if (navBtn) {
      navBtn.focus();
      const isFocused = document.activeElement === navBtn;
      return { keyboardNavigable: isFocused };
    }
    return { keyboardNavigable: false };
  });

  await browser.close();
  if (serverStartedLocally && server) {
    server.close();
  }

  const passed = (
    vaultAudit.totalCardsRendered === 37 &&
    vaultAudit.filterResults.ALL === 37 &&
    vaultAudit.filterResults.PRICE_OBSERVATION === 20 &&
    vaultAudit.filterResults.COUNTER_DEAL === 6 &&
    vaultAudit.filterResults.BRAND_PROGRAM === 10 &&
    vaultAudit.filterResults.APP_VOUCHER === 1 &&
    vaultAudit.copyButtonsCount === 0 &&
    a11yAudit.failedElements === 0 &&
    a11yAudit.headingErrors.length === 0 &&
    a11yAudit.touchTargetErrors.length === 0 &&
    !viewportResults.Desktop.overflowDetected &&
    !viewportResults.Tablet.overflowDetected &&
    !viewportResults.Mobile.overflowDetected &&
    keyboardAudit.keyboardNavigable
  );

  const auditSummary = {
    verdict: passed ? 'PASSED' : 'FAILED',
    timestamp_utc: new Date().toISOString(),
    storefront_url: BASE_URL,
    voucher_vault: {
      total_rendered_cards: vaultAudit.totalCardsRendered,
      filter_distribution: vaultAudit.filterResults,
      copy_buttons_count: vaultAudit.copyButtonsCount,
      all_25_hydrated_present: vaultAudit.totalCardsRendered === 37
    },
    accessibility: {
      contrast_elements_checked: a11yAudit.totalElementsChecked,
      contrast_passed: a11yAudit.passedElements,
      contrast_failed: a11yAudit.failedElements,
      heading_hierarchy_errors: a11yAudit.headingErrors,
      touch_target_errors: a11yAudit.touchTargetErrors
    },
    viewports: viewportResults,
    keyboard: keyboardAudit,
    console_errors: consoleErrors
  };

  console.log('--- JAYT-350 AUDIT COMPLETE: ' + (passed ? 'PASSED 100%' : 'FAILED') + ' ---');
  return auditSummary;
}

if (require.main === module) {
  runAudit().then(res => {
    console.log(JSON.stringify(res, null, 2));
    if (res.verdict !== 'PASSED') process.exit(1);
  }).catch(err => {
    console.error('Fatal audit failure:', err);
    process.exit(1);
  });
}

module.exports = { runAudit };
