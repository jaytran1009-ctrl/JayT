const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('puppeteer');

const root = path.resolve(__dirname, '..');
const candidateDir = path.join(root, '08_RELEASE_VAULT', 'candidates', 'v3.424.0-r1');
const manifestPath = path.join(candidateDir, 'candidate_manifest.json');
const registryPath = path.join(candidateDir, 'registry.json');
const receiptPath = path.join(root, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'JAYT_339_V3424_R1_PREFLIGHT_AUDIT_RECEIPT.json');
const resealedFingerprintsPath = path.join(root, '08_RELEASE_VAULT', 'JAYT_339_V3424_R1_RESEALED_FINGERPRINTS.json');

const requiredNewIds = [
  'P2O_GALAXY_MEMBER_2026',
  'P2O_GALAXY_SHOPEEPAY_SEP_2026',
  'P2O_PHILONG_LENOVO_STUDENT_2026',
  'P2O_PHILONG_HP_BTS_2026'
];
const forbiddenIds = [
  'B14_DMX_M170_DEN',
  'P2O_CGV_FANC_2026',
  'P2O_GALAXY_ZALOPAY_REWARDS_2026Q3',
  'P2O_GALAXY_JCB_WEEKEND_2026Q3'
];

function sha(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}
function cardId(card) {
  return card.candidate_id || card.card_id || card.sku_id || card.id;
}
function cleanUrl(raw) {
  try {
    const url = new URL(raw);
    const badKeys = ['aff', 'affiliate', 'clickid', 'ref', 'subid', 'tracking'];
    const badHosts = ['accesstrade.vn', 'go.isclix.com'];
    return url.protocol === 'https:' &&
      !badHosts.some(host => url.hostname === host || url.hostname.endsWith('.' + host)) &&
      [...url.searchParams.keys()].every(key => !key.toLowerCase().startsWith('utm_') && !badKeys.includes(key.toLowerCase()));
  } catch {
    return false;
  }
}

function startServer(port) {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml'
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(candidateDir, reqPath);
    if (!filePath.startsWith(candidateDir)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Cache-Control': 'no-store'
      });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  return new Promise((resolve, reject) => {
    server.listen(port, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

(async () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const port = 4189;
  const server = await startServer(port);
  const baseUrl = 'http://127.0.0.1:' + port;

  const receipt = {
    receipt_name: 'JAYT_339_V3424_R1_PREFLIGHT_AUDIT_RECEIPT',
    governing_directive: 'JAYT-339',
    target_version: 'v3.424.0-r1',
    generated_at_utc: new Date().toISOString(),
    requested_cards_count: 52,
    safely_packaged_cards_count: 51,
    technical_candidate_passed: false,
    release_ready: false,
    deployment_authorized: false,
    http_probes: {},
    assertions: {},
    metrics: {}
  };

  try {
    // 1. HTTP Endpoint probes
    const rootRes = await fetch(baseUrl + '/', { cache: 'no-store' });
    const regRes = await fetch(baseUrl + '/registry.json', { cache: 'no-store' });
    const regData = await regRes.json();
    const dealsRes = await fetch(baseUrl + '/deals_feed.json', { cache: 'no-store' });
    const dealsText = await dealsRes.text();
    let dealsJson = null;
    try { dealsJson = JSON.parse(dealsText); } catch(e) {}

    receipt.http_probes = {
      root: { status: rootRes.status, ok: rootRes.status === 200 },
      registry: { status: regRes.status, ok: regRes.status === 200 && regData.total_approved_entities_count === 51 },
      deals_feed: {
        status: dealsRes.status,
        text: dealsText.trim(),
        is_empty_array: Array.isArray(dealsJson) && dealsJson.length === 0,
        ok: dealsRes.status === 200 && Array.isArray(dealsJson) && dealsJson.length === 0
      }
    };

    receipt.assertions.root_http_200 = receipt.http_probes.root.ok;
    receipt.assertions.registry_http_200_and_51_cards = receipt.http_probes.registry.ok;
    receipt.assertions.deals_feed_http_200_and_empty_array = receipt.http_probes.deals_feed.ok;

    // 2. Artifact Parity & Integrity
    const artifacts = manifest.artifacts;
    receipt.assertions.artifact_hash_parity = Object.values(artifacts).every(item => sha(path.join(root, item.path)) === item.sha256);
    receipt.assertions.artifact_size_parity = Object.values(artifacts).every(item => fs.statSync(path.join(root, item.path)).size === item.size_bytes);

    // 3. Registry Checks
    const commercialIds = registry.approved_commercial_entries.map(cardId);
    receipt.assertions.registry_24_civic = registry.civic_entities_count === 24 && registry.approved_civic_entries.length === 24;
    receipt.assertions.registry_27_commercial = registry.commercial_entities_count === 27 && commercialIds.length === 27;
    receipt.assertions.registry_51_total = registry.total_approved_entities_count === 51;
    receipt.assertions.registry_unique_ids = new Set([...registry.approved_civic_entries, ...commercialIds]).size === 51;
    receipt.assertions.batch_15_four_present = requiredNewIds.every(id => commercialIds.includes(id));
    receipt.assertions.forbidden_candidates_absent = forbiddenIds.every(id => !commercialIds.includes(id));
    receipt.assertions.all_commercial_sources_https_clean = registry.approved_commercial_entries.every(card => cleanUrl(card.source_url));
    receipt.assertions.zero_affiliate_fields = registry.approved_commercial_entries.every(card => !card.affiliate_url);
    receipt.assertions.deals_feed_remains_empty = JSON.parse(fs.readFileSync(path.join(candidateDir, 'deals_feed.json'), 'utf8')).length === 0;

    // 4. Rollback Manifest Verification
    const rollback = JSON.parse(fs.readFileSync(path.join(candidateDir, 'rollback_manifest.json'), 'utf8'));
    receipt.assertions.rollback_targets_v3423_47 = rollback.target_version === 'v3.423.0' && rollback.target_cards_count === 47;
    receipt.assertions.rollback_deployment_id_dpl_9Gug4 = rollback.deployment_id === 'dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA';
    receipt.assertions.rollback_artifact_hashes_match = Object.entries(rollback.artifacts).every(([name, meta]) =>
      sha(path.join(root, '08_RELEASE_VAULT', 'candidates', 'v3.423.0', name)) === meta.sha256
    );

    // 5. Browser Automation with Puppeteer
    const consoleErrors = [];
    const runtimeErrors = [];
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    try {
      const page = await browser.newPage();
      page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
      page.on('pageerror', error => runtimeErrors.push(error.message));

      await page.goto(baseUrl + '/', { waitUntil: 'networkidle0', timeout: 15000 });

      const storefront = await page.evaluate(() => ({
        version: window.__JAYT_STOREFRONT__?.version,
        civic: window.__JAYT_STOREFRONT__?.civicCardsCount,
        commercial: window.__JAYT_STOREFRONT__?.commercialCardsCount,
        total: window.__JAYT_STOREFRONT__?.totalCardsCount
      }));
      assert.deepStrictEqual(storefront, { version: 'v3.424.0', civic: 24, commercial: 27, total: 51 });

      await page.evaluate(() => document.querySelector('[data-nav="VOUCHER_HUB"]')?.click());
      await page.waitForSelector('#v3424-commercial-container .commercial-card', { timeout: 5000 });

      const dom = await page.evaluate(() => {
        const cards = [...document.querySelectorAll('#v3424-commercial-container .commercial-card')];
        const ids = cards.map(card => card.dataset.sku);
        return {
          count: cards.length,
          unique: new Set(ids).size,
          ids,
          sourceLinks: document.querySelectorAll('#v3424-commercial-container .source-link-btn').length,
          allLinksDiscloseNewTab: [...document.querySelectorAll('#v3424-commercial-container .source-link-btn')]
            .every(link => link.getAttribute('aria-label')?.includes('mở trong tab mới')),
          offerPrograms: [...document.querySelectorAll('.offer-program-card')].map(card => ({
            id: card.dataset.sku,
            validity: card.querySelector('.offer-validity')?.textContent || '',
            conditions: card.querySelector('.offer-conditions')?.textContent || '',
            disclaimer: card.querySelector('.disclaimer')?.textContent || ''
          }))
        };
      });

      receipt.assertions.dom_mounts_27_commercial_cards = dom.count === 27 && dom.unique === 27 && dom.sourceLinks === 27;
      receipt.assertions.dom_forbidden_candidates_absent = forbiddenIds.every(id => !dom.ids.includes(id));
      receipt.assertions.new_offer_terms_rendered = dom.offerPrograms.length === 4 && dom.offerPrograms.every(item => item.validity && item.conditions && item.disclaimer);
      receipt.assertions.shopeepay_budget_and_app_warning_rendered = dom.offerPrograms.some(item =>
        item.id === 'P2O_GALAXY_SHOPEEPAY_SEP_2026' && /ứng dụng ShopeePay/i.test(item.conditions + item.disclaimer) && /hết ngân sách/i.test(item.validity + item.disclaimer)
      );
      receipt.assertions.philong_model_restrictions_rendered = ['P2O_PHILONG_LENOVO_STUDENT_2026', 'P2O_PHILONG_HP_BTS_2026'].every(id =>
        dom.offerPrograms.some(item => item.id === id && /model/i.test(item.conditions))
      );
      receipt.assertions.source_links_disclose_new_tab = dom.allLinksDiscloseNewTab;

      // Filter counts
      const expectedFilters = { COUNTER_DEAL: 9, BRAND_PROGRAM: 2, APP_HIDDEN_CODE: 1, VALUE_RADAR: 15, ALL: 27 };
      const filters = {};
      for (const [name, expected] of Object.entries(expectedFilters)) {
        filters[name] = await page.evaluate(filter => {
          document.querySelector('[data-commercial-filter="' + filter + '"]')?.click();
          return [...document.querySelectorAll('#v3424-commercial-container .commercial-card')].filter(card => !card.hidden).length;
        }, name);
        assert.strictEqual(filters[name], expected);
      }
      receipt.assertions.filter_counts_9_2_1_15_27 = true;

      // Viewports
      const viewports = [];
      for (const width of [1440, 768, 390]) {
        await page.setViewport({ width, height: 900 });
        viewports.push(await page.evaluate(() => {
          const targets = [...document.querySelectorAll('.tier-filter, .source-link-btn')];
          return {
            width: window.innerWidth,
            horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
            minimumTargetHeight: Math.min(...targets.map(target => target.getBoundingClientRect().height))
          };
        }));
      }
      receipt.assertions.zero_overflow_1440_768_390 = viewports.every(item => !item.horizontalOverflow);
      receipt.assertions.touch_targets_minimum_44px = viewports.every(item => item.minimumTargetHeight >= 44);

      // Keyboard navigation
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluate(() => document.activeElement?.blur());
      const reachedFilters = new Set();
      const reachedCards = new Set();
      const focusTrace = [];
      for (let index = 0; index < 90; index += 1) {
        await page.keyboard.press('Tab');
        const focused = await page.evaluate(() => ({
          filter: document.activeElement?.getAttribute?.('data-commercial-filter') || null,
          sku: document.activeElement?.closest?.('.commercial-card')?.getAttribute('data-sku') || null,
          tag: document.activeElement?.tagName || null
        }));
        if (focused.filter) reachedFilters.add(focused.filter);
        if (focused.sku) reachedCards.add(focused.sku);
        if (focused.filter || focused.sku) focusTrace.push(focused);
        if (reachedFilters.size === 5 && reachedCards.size === 27) break;
      }
      receipt.assertions.keyboard_reaches_all_filters_and_27_source_links = reachedFilters.size === 5 && reachedCards.size === 27;
      receipt.assertions.zero_console_runtime_errors = consoleErrors.length === 0 && runtimeErrors.length === 0;

      receipt.metrics = {
        storefront,
        dom,
        filters,
        viewports,
        keyboard: { reachedFilters: [...reachedFilters], reachedCards: [...reachedCards], traceStops: focusTrace.length },
        consoleErrors,
        runtimeErrors
      };
    } finally {
      await browser.close();
    }

    const technicalAssertions = Object.values(receipt.assertions);
    receipt.technical_candidate_passed = technicalAssertions.every(Boolean);
    receipt.release_ready = false; // Awaiting CEO review & Chairman decree
    receipt.deployment_authorized = false;
    receipt.status = receipt.technical_candidate_passed
      ? 'AUDIT_READY__AWAITING_CEO_REVIEW'
      : 'TECHNICAL_PREFLIGHT_FAILED';

    fs.mkdirSync(path.dirname(receiptPath), { recursive: true });
    fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + '\n');

    // Generate Resealed Fingerprints Package
    const resealedPackage = {
      package_id: 'JAYT_339_V3424_R1_RESEALED_FINGERPRINTS',
      governing_directive: 'JAYT-339',
      version: 'v3.424.0-r1',
      generated_at_utc: receipt.generated_at_utc,
      status: receipt.status,
      deployment_authorized: false,
      production_deploy_permitted: false,
      sealed_candidate_root: '08_RELEASE_VAULT/candidates/v3.424.0-r1/',
      fingerprints: {
        candidate_manifest: sha(manifestPath),
        storefront_bundle: sha(path.join(candidateDir, 'jayt_storefront_v3424.js')),
        html: sha(path.join(candidateDir, 'index.html')),
        css: sha(path.join(candidateDir, 'styles.css')),
        registry: sha(path.join(candidateDir, 'registry.json')),
        deals_feed: sha(path.join(candidateDir, 'deals_feed.json')),
        hero_svg: sha(path.join(candidateDir, 'assets', 'images', 'board_a_afterglow_hero.svg')),
        rollback_manifest: sha(path.join(candidateDir, 'rollback_manifest.json')),
        preflight_receipt: sha(receiptPath)
      },
      cards: {
        total: 51,
        civic: 24,
        commercial: 27,
        excluded: forbiddenIds
      },
      http_probes: receipt.http_probes,
      rollback_anchor: {
        version: 'v3.423.0',
        cards: 47,
        deployment_id: 'dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA'
      }
    };

    fs.writeFileSync(resealedFingerprintsPath, JSON.stringify(resealedPackage, null, 2) + '\n');

    console.log(JSON.stringify({
      status: receipt.status,
      technical_candidate_passed: receipt.technical_candidate_passed,
      fingerprints: resealedPackage.fingerprints,
      assertions: receipt.assertions
    }, null, 2));

    if (!receipt.technical_candidate_passed) process.exitCode = 1;

  } finally {
    server.close();
  }
})().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
