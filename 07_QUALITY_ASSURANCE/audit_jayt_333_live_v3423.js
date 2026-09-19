// Read-only rolling Production verification.
// The immutable M4 post-deploy audit receipt is intentionally never overwritten.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const root = path.resolve(__dirname, '..');
const base = 'https://jayt-production-v3420.vercel.app';
const candidateRoot = path.join(root, '08_RELEASE_VAULT', 'candidates', 'v3.423.0');
const immutableReleaseReceiptPath = path.join(__dirname, 'runtime_evidence', 'JAYT_333_V3423_LIVE_POST_DEPLOY_AUDIT.json');
const receiptPath = path.join(__dirname, 'runtime_evidence', 'JAYT_333_V3423_ROLLING_MONITOR_RECEIPT.json');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');

(async () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(candidateRoot, 'candidate_manifest.json'), 'utf8'));
  const registry = JSON.parse(fs.readFileSync(path.join(candidateRoot, 'registry.json'), 'utf8'));
  const result = {
    receipt_id: 'JAYT_333_V3423_ROLLING_MONITOR_RECEIPT',
    evidence_mode: 'ROLLING_MONITOR__DOES_NOT_MUTATE_IMMUTABLE_RELEASE_RECEIPT',
    immutable_release_receipt: path.relative(root, immutableReleaseReceiptPath).replaceAll('\\', '/'),
    checked_at_utc: new Date().toISOString(),
    production_url: base,
    deployment_id: 'dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA',
    target_version: 'v3.423.0',
    expected: { total_cards: 47, civic_cards: 24, commercial_cards: 23 },
    artifacts: [],
    viewports: [],
    blockers: []
  };

  for (const artifact of Object.values(manifest.artifacts)) {
    const relative = path.relative(candidateRoot, path.join(root, artifact.path)).replaceAll('\\', '/');
    const response = await fetch(`${base}/${relative}`, { cache: 'no-store', signal: AbortSignal.timeout(20000) });
    const actual = sha(Buffer.from(await response.arrayBuffer()));
    const pass = response.status === 200 && actual === artifact.sha256;
    result.artifacts.push({ path: relative, http_status: response.status, expected_sha256: artifact.sha256, actual_sha256: actual, pass });
    if (!pass) result.blockers.push(`Artifact mismatch: ${relative}`);
  }

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    for (const width of [1440, 768, 390]) {
      const page = await browser.newPage();
      await page.setCacheEnabled(false);
      await page.setViewport({ width, height: 900 });
      const consoleErrors = [];
      const runtimeErrors = [];
      page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
      page.on('pageerror', error => runtimeErrors.push(String(error)));
      const response = await page.goto(base, { waitUntil: 'networkidle0', timeout: 30000 });
      const home = await page.evaluate(() => ({
        version: window.__JAYT_STOREFRONT__?.version,
        civic: window.__JAYT_STOREFRONT__?.civicCardsCount,
        commercial: window.__JAYT_STOREFRONT__?.commercialCardsCount,
        total: window.__JAYT_STOREFRONT__?.totalCardsCount,
        overflow: document.documentElement.scrollWidth > window.innerWidth
      }));
      await page.evaluate(() => document.querySelector('[data-nav="VOUCHER_HUB"]')?.click());
      await page.waitForSelector('#v3423-commercial-container .commercial-card', { timeout: 5000 });
      const commercial = await page.evaluate(() => {
        const cards = [...document.querySelectorAll('#v3423-commercial-container .commercial-card')];
        const links = [...document.querySelectorAll('#v3423-commercial-container a[href]')];
        return {
          count: cards.length,
          unique_skus: new Set(cards.map(card => card.dataset.sku)).size,
          contains_excluded_dmx: cards.some(card => card.dataset.sku === 'B14_DMX_M170_DEN'),
          links: links.map(link => link.href),
          overflow: document.documentElement.scrollWidth > window.innerWidth,
          min_touch_target_height: Math.min(...[...document.querySelectorAll('.tier-filter, .source-link-btn')].map(el => el.getBoundingClientRect().height))
        };
      });
      const commercialLinksClean = commercial.links.every(raw => {
        const url = new URL(raw);
        return url.protocol === 'https:' && ![...url.searchParams.keys()].some(key => /^(utm_|aff|affiliate|ref|click|track)/i.test(key));
      });
      const pass = response.status() === 200 && home.version === 'v3.423.0' && home.civic === 24 &&
        home.commercial === 23 && home.total === 47 && commercial.count === 23 && commercial.unique_skus === 23 &&
        !commercial.contains_excluded_dmx && commercialLinksClean && !home.overflow && !commercial.overflow &&
        commercial.min_touch_target_height >= 44 && consoleErrors.length === 0 && runtimeErrors.length === 0;
      result.viewports.push({ width, http_status: response.status(), home, commercial, commercial_links_clean: commercialLinksClean, console_errors: consoleErrors, runtime_errors: runtimeErrors, pass });
      if (!pass) result.blockers.push(`Viewport gate failed: ${width}px`);
      await page.close();
    }
  } finally {
    await browser.close();
  }

  result.registry_counts_match = registry.total_approved_entities_count === 47 && registry.civic_entities_count === 24 && registry.commercial_entities_count === 23;
  result.excluded_dmx_absent_from_registry = !registry.approved_commercial_entries.some(card => card.card_id === 'B14_DMX_M170_DEN');
  result.deals_feed_empty = JSON.stringify(JSON.parse(fs.readFileSync(path.join(root, '05_DEAL_AND_AFFILIATE', 'deals_feed.json'), 'utf8'))) === '[]';
  if (!result.registry_counts_match) result.blockers.push('Registry counts mismatch');
  if (!result.excluded_dmx_absent_from_registry) result.blockers.push('Excluded DMX card present');
  if (!result.deals_feed_empty) result.blockers.push('deals_feed.json is not empty');
  result.pass = result.blockers.length === 0;
  fs.writeFileSync(receiptPath, JSON.stringify(result, null, 2) + '\n', 'utf8');
  console.log(JSON.stringify({ pass: result.pass, blockers: result.blockers, artifacts: result.artifacts.length, viewports: result.viewports.map(v => ({ width: v.width, http: v.http_status, total: v.home.total, commercial: v.commercial.count, pass: v.pass })) }, null, 2));
  if (!result.pass) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
