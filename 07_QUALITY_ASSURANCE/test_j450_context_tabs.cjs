'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const outDir = path.resolve(__dirname, 'runtime_evidence');
fs.mkdirSync(outDir, { recursive: true });
const baseUrl = process.env.JAYT_PREVIEW_URL || 'http://127.0.0.1:4181/';

async function auditViewport(browser, width, height) {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  await page.setCacheEnabled(false);
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  const response = await page.goto(`${baseUrl}${baseUrl.includes('?') ? '&' : '?'}qa=${Date.now()}`, { waitUntil: 'networkidle0', timeout: 45000 });
  const boot = await page.evaluate(() => ({ root: document.getElementById('jayt-app-root')?.innerHTML.length || 0, tabs: document.querySelectorAll('[data-j450-tab]').length }));
  if (!boot.tabs) console.error(JSON.stringify({ width, httpStatus: response && response.status(), finalUrl: page.url(), boot, consoleErrors }));
  await page.waitForSelector('[data-j450-tab="lunch"]', { timeout: 10000 });
  const tabs = await page.$$eval('[data-j450-tab]', (nodes) => nodes.map((node) => ({ key: node.dataset.j450Tab, selected: node.getAttribute('aria-selected'), role: node.getAttribute('role') })));
  const contexts = {};
  for (const key of ['lunch', 'evening', 'table']) {
    await page.click(`[data-j450-tab="${key}"]`);
    contexts[key] = await page.evaluate(() => {
      const visible = (id) => { const el = document.getElementById(id); return !!el && getComputedStyle(el).display !== 'none' && el.getAttribute('aria-hidden') !== 'true'; };
      return {
        bodyContext: document.body.dataset.j450Context,
        visible: {
          concierge: visible('j406-private-concierge'),
          deals: visible('deals-vault-module'),
          lunch: visible('lunch-arbitrage-module'),
          student: visible('student-savings-module'),
          split: visible('split-bill-module'),
          dorm: visible('dorm-shopping-module'),
          campus: visible('campus-dock-section')
        },
        scrollHeight: document.documentElement.scrollHeight,
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth
      };
    });
  }
  await page.click('[data-j450-tab="lunch"]');
  await page.keyboard.press('ArrowRight');
  const keyboardContext = await page.evaluate(() => document.body.dataset.j450Context);
  await page.click('.campus-dock-btn[data-cluster-id]:not([data-cluster-id="ALL"])');
  const storedCampus = await page.evaluate(() => localStorage.getItem('jayt_campus_cluster'));
  const hudMs = await page.evaluate(() => { const t = performance.now(); window.openCounterQuickSheet(); return performance.now() - t; });
  await page.evaluate(() => { if (typeof window.closeCounterQuickSheet === 'function') window.closeCounterQuickSheet(); });
  await page.screenshot({ path: path.join(outDir, `j450_context_${width}.png`), fullPage: true });
  await page.close();
  return { width, tabs, contexts, keyboardContext, storedCampus, hudMs, consoleErrors };
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    const results = [await auditViewport(browser, 390, 844), await auditViewport(browser, 1440, 1000)];
    const pass = results.every((r) => r.tabs.length === 3 && r.tabs.every((t) => t.role === 'tab') && r.keyboardContext === 'evening' && !!r.storedCampus && r.hudMs < 30 && r.consoleErrors.length === 0 && Object.values(r.contexts).every((c) => c.scrollWidth <= c.viewportWidth))
      && results.every((r) => r.contexts.lunch.visible.lunch && !r.contexts.lunch.visible.split && r.contexts.evening.visible.concierge && r.contexts.evening.visible.dorm && !r.contexts.evening.visible.lunch && r.contexts.table.visible.split && !r.contexts.table.visible.concierge);
    const report = { status: pass ? 'PASS' : 'FAIL', baseUrl, results };
    fs.writeFileSync(path.join(outDir, 'J450_CONTEXT_TABS_LOCAL_QA.json'), `${JSON.stringify(report, null, 2)}\n`);
    console.log(JSON.stringify(report, null, 2));
    if (!pass) process.exitCode = 1;
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exit(1); });
