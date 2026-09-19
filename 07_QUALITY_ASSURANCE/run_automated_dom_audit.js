/* Local-only runtime audit. It records observed facts and never treats a failed check as a release pass. */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const root = path.resolve(__dirname, '..');
const output = path.join(__dirname, 'AUTOMATED_DOM_AUDIT_RECEIPT.json');
const url = process.env.JAYT_AUDIT_URL || 'http://127.0.0.1:8000/';

async function inspect(page, viewport) {
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 });
  return page.evaluate(() => {
    const interactive = [...document.querySelectorAll('button, a[href], input, select, textarea')];
    const undersized = interactive.map(el => {
      const box = el.getBoundingClientRect();
      return { tag: el.tagName, label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 80), width: Math.round(box.width), height: Math.round(box.height) };
    }).filter(item => item.width > 0 && item.height > 0 && (item.width < 44 || item.height < 44));
    const computed = getComputedStyle(document.documentElement);
    return {
      viewport: { width: innerWidth, height: innerHeight },
      document: { title: document.title, ledgerVersion: document.body.dataset.ledgerVersion || null, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth },
      interactive: { visibleCount: interactive.filter(el => el.getBoundingClientRect().width > 0).length, undersizedCount: undersized.length, undersized: undersized.slice(0, 20) },
      modal: { count: document.querySelectorAll('[role="dialog"][aria-modal="true"]').length, hiddenCount: [...document.querySelectorAll('[role="dialog"][aria-modal="true"]')].filter(el => getComputedStyle(el).display === 'none').length },
      cssVariables: { background: computed.getPropertyValue('--bg-page').trim(), text: computed.getPropertyValue('--text-primary').trim(), primary: computed.getPropertyValue('--primary').trim() },
      contrastPairs: [...document.querySelectorAll('.btn-action-portal, .btn-zero-action[data-nav="BUY_DECISION"]')].map(el => ({ label: el.getAttribute('aria-label'), foreground: getComputedStyle(el).color, background: getComputedStyle(el).backgroundColor }))
    };
  });
}

(async () => {
  const consoleEvents = [], pageErrors = [];
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    page.on('console', msg => { if (msg.type() === 'error') consoleEvents.push(msg.text()); });
    page.on('pageerror', err => pageErrors.push(String(err)));
    const desktop = await inspect(page, { width: 1440, height: 900 });
    const mobile = await inspect(page, { width: 390, height: 844, isMobile: true });
    const rgb = color => (color.match(/\d+(?:\.\d+)?/g) || []).slice(0, 3).map(Number);
    const luminance = color => rgb(color).map(value => { const channel=value / 255; return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4; }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
    const contrast = pair => { const fg=luminance(pair.foreground), bg=luminance(pair.background); return Number(((Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05)).toFixed(2)); };
    const contrastPairs = [...desktop.contrastPairs, ...mobile.contrastPairs].map(pair => ({ ...pair, ratio: contrast(pair), wcagAA: contrast(pair) >= 4.5 }));
    const contrastCertified = contrastPairs.length > 0 && contrastPairs.every(pair => pair.wcagAA);
    const receipt = {
      receipt_id: 'AUTOMATED_DOM_AUDIT_RECEIPT', generated_at_utc: new Date().toISOString(), audit_url: url,
      scope: 'Local staging runtime only; no deployment and no commercial-content admission.',
      console: { runtimeErrors: pageErrors, consoleErrors: consoleEvents, clean: pageErrors.length === 0 && consoleEvents.length === 0 },
      layouts: { desktop, mobile },
      contrast: { status: contrastCertified ? 'CERTIFIED_WCAG_AA_FOR_PRIMARY_ACTIONS' : 'FAILED_OR_INCOMPLETE', pairs: contrastPairs, scope: 'Computed primary-action foreground/background pairs only.' },
      release_gate: { pass: pageErrors.length === 0 && consoleEvents.length === 0 && !desktop.document.horizontalOverflow && !mobile.document.horizontalOverflow && desktop.interactive.undersizedCount === 0 && mobile.interactive.undersizedCount === 0 && contrastCertified, blockers: [] }
    };
    if (!receipt.console.clean) receipt.release_gate.blockers.push('Runtime console errors detected.');
    if (desktop.document.horizontalOverflow || mobile.document.horizontalOverflow) receipt.release_gate.blockers.push('Horizontal overflow detected.');
    if (desktop.interactive.undersizedCount || mobile.interactive.undersizedCount) receipt.release_gate.blockers.push('Visible touch targets below 44px detected.');
    if (!contrastCertified) receipt.release_gate.blockers.push('Primary-action contrast is below WCAG AA or could not be computed.');
    fs.writeFileSync(output, JSON.stringify(receipt, null, 2) + '\n');
    console.log(JSON.stringify({ output, release_gate: receipt.release_gate }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error.stack || error); process.exitCode = 1; });
