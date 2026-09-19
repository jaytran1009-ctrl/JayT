const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const CANDIDATE = path.join(ROOT, '08_RELEASE_VAULT', 'candidates', 'sprint_b_r1');
const MANIFEST_PATH = path.join(CANDIDATE, 'candidate_manifest.json');
const MANIFEST = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const CANONICAL_LIVE = 'https://jayt-production-v3420.vercel.app';
const LIVE = process.env.JAYT_AUDIT_URL || CANONICAL_LIVE;
const ROLLBACK_ON_FAIL = process.env.JAYT_ROLLBACK_ON_FAIL !== 'false';
const DEPLOYMENT_ID = 'dpl_CvczfzmWBk4XJvd7RgfNX1Dwe55o';
const ROLLBACK_ID = 'dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA';
const RUN_ID = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
const RECEIPT_PATH = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence', `JAYT_346_V3425_SPRINT_B_R1_LIVE_POST_DEPLOY_AUDIT_${RUN_ID}.json`);

const forbiddenIds = [
  'B14_DMX_M170_DEN',
  'P2O_CGV_FANC_2026',
  'P2O_GALAXY_ZALOPAY_REWARDS_2026Q3',
  'P2O_GALAXY_JCB_WEEKEND_2026Q3'
];

const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const cleanLink = raw => {
  try {
    const u = new URL(raw);
    const blockedHosts = ['accesstrade.vn', 'go.isclix.com'];
    const blockedKeys = ['aff', 'affiliate', 'clickid', 'ref', 'subid', 'tracking'];
    return u.protocol === 'https:' &&
      !blockedHosts.some(h => u.hostname === h || u.hostname.endsWith('.' + h)) &&
      [...u.searchParams.keys()].every(k => !k.toLowerCase().startsWith('utm_') && !blockedKeys.includes(k.toLowerCase()));
  } catch { return false; }
};

async function rollback() {
  const cwd = path.join(ROOT, 'deploy_personal_v3423');
  cp.execSync(`npx vercel alias set ${ROLLBACK_ID} jayt-production-v3420.vercel.app`, { cwd, stdio: 'inherit', shell: true });
}

(async () => {
  const receipt = {
    receipt_id: `JAYT_346_V3425_SPRINT_B_R1_LIVE_POST_DEPLOY_AUDIT_${RUN_ID}`,
    directive: 'JAYT-346',
    run_id: RUN_ID,
    checked_at_utc: new Date().toISOString(),
    production_url: LIVE,
    canonical_production_url: CANONICAL_LIVE,
    deployment_id: DEPLOYMENT_ID,
    target_version: 'v3.425.0-sprint-b-r1',
    candidate_manifest_sha256: sha(fs.readFileSync(MANIFEST_PATH)),
    endpoints: [],
    viewports: [],
    gates: {},
    blockers: [],
    rollback: { triggered: false, target_version: 'v3.423.0', target_deployment_id: ROLLBACK_ID, status: 'STANDBY_READY' },
    verdict: 'PENDING'
  };

  try {
    const endpoints = [
      ['root', '/', null],
      ['registry', '/registry.json', MANIFEST.fingerprints['registry.json']],
      ['deals_feed', '/deals_feed.json', MANIFEST.fingerprints['deals_feed.json']],
      ['javascript', '/jayt_storefront_sprint_b.js', MANIFEST.fingerprints['jayt_storefront_sprint_b.js']],
      ['styles', '/styles.css', MANIFEST.fingerprints['styles.css']],
      ['hero_svg', '/assets/images/board_a_afterglow_hero.svg', MANIFEST.fingerprints['board_a_afterglow_hero.svg']]
    ];
    let registry;
    let deals;
    for (const [name, suffix, expectedSha] of endpoints) {
      const response = await fetch(LIVE + suffix, { cache: 'no-store', signal: AbortSignal.timeout(30000) });
      const body = Buffer.from(await response.arrayBuffer());
      const actualSha = sha(body);
      const pass = response.status === 200 && (!expectedSha || actualSha === expectedSha);
      receipt.endpoints.push({ name, path: suffix, status: response.status, bytes: body.length, expected_sha256: expectedSha, actual_sha256: actualSha, pass });
      if (!pass) receipt.blockers.push(`ENDPOINT_${name.toUpperCase()}_FAILED`);
      if (name === 'registry') registry = JSON.parse(body.toString('utf8'));
      if (name === 'deals_feed') deals = JSON.parse(body.toString('utf8'));
    }

    receipt.registry = {
      total: registry.total_approved_entities_count,
      civic: registry.approved_civic_entries.length,
      commercial: registry.approved_commercial_entries.length,
      forbidden_absent: forbiddenIds.every(id => !JSON.stringify(registry.approved_civic_entries.concat(registry.approved_commercial_entries)).includes(id))
    };
    receipt.deals_feed = { is_empty_array: Array.isArray(deals) && deals.length === 0, count: Array.isArray(deals) ? deals.length : null };

    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    try {
      for (const width of [1440, 768, 390]) {
        const page = await browser.newPage();
        await page.setCacheEnabled(false);
        await page.setViewport({ width, height: 900 });
        const consoleErrors = [];
        const runtimeErrors = [];
        page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
        page.on('pageerror', err => runtimeErrors.push(String(err)));
        const response = await page.goto(LIVE, { waitUntil: 'networkidle0', timeout: 45000 });

        const routeResults = {};
        for (const route of ['HOME', 'VOUCHER_HUB', 'SPLIT_BILL_PRO', 'SAVINGS_CALENDAR', 'VALUE_RADAR']) {
          await page.evaluate(key => document.querySelector(`[data-nav="${key}"]`)?.click(), route);
          await new Promise(resolve => setTimeout(resolve, 150));
          routeResults[route] = await page.evaluate(() => {
            const links = [...document.querySelectorAll('#jayt-view-canvas a[href]')];
            const visibleHeadings = [...document.querySelectorAll('#jayt-view-canvas h1, #jayt-view-canvas h2, #jayt-view-canvas h3')].filter(el => el.offsetParent !== null);
            return {
              civic_cards: document.querySelectorAll('.t2-pilot-card-section').length,
              voucher_cards: document.querySelectorAll('#voucher-vault-grid .vault-card').length,
              radar_cards: document.querySelectorAll('#radar-grid-container .radar-card').length,
              split_bill_present: !!document.querySelector('.split-bill-container'),
              calendar_present: !!document.querySelector('.calendar-days-bar'),
              overflow: document.documentElement.scrollWidth > window.innerWidth,
              headings: visibleHeadings.length,
              links: links.map(a => a.href),
              dom_text: document.getElementById('jayt-view-canvas')?.innerText || ''
            };
          });
        }

        const allLinks = Object.values(routeResults).flatMap(r => r.links);
        const domText = Object.values(routeResults).map(r => r.dom_text).join('\n');
        const runtime = {
          version: await page.evaluate(() => document.body.dataset.ledgerVersion),
          total: routeResults.HOME.civic_cards + routeResults.VOUCHER_HUB.voucher_cards + routeResults.VALUE_RADAR.radar_cards,
          civic: routeResults.HOME.civic_cards,
          commercial: routeResults.VOUCHER_HUB.voucher_cards + routeResults.VALUE_RADAR.radar_cards
        };
        const pass = response.status() === 200 && runtime.total === 51 && runtime.civic === 24 && runtime.commercial === 27 &&
          routeResults.HOME.civic_cards === 24 && routeResults.VOUCHER_HUB.voucher_cards === 12 &&
          routeResults.VALUE_RADAR.radar_cards === 15 && routeResults.SPLIT_BILL_PRO.split_bill_present &&
          routeResults.SAVINGS_CALENDAR.calendar_present && Object.values(routeResults).every(r => !r.overflow && r.headings > 0) &&
          forbiddenIds.every(id => !domText.includes(id)) && allLinks.every(cleanLink) &&
          consoleErrors.length === 0 && runtimeErrors.length === 0;

        receipt.viewports.push({ width, http_status: response.status(), runtime, route_summary: Object.fromEntries(Object.entries(routeResults).map(([k,v]) => [k, { civic_cards: v.civic_cards, voucher_cards: v.voucher_cards, radar_cards: v.radar_cards, split_bill_present: v.split_bill_present, calendar_present: v.calendar_present, overflow: v.overflow, headings: v.headings, links_count: v.links.length }])), forbidden_absent: forbiddenIds.every(id => !domText.includes(id)), clean_links: allLinks.every(cleanLink), console_errors: consoleErrors, runtime_errors: runtimeErrors, pass });
        await page.close();
      }
    } finally { await browser.close(); }

    receipt.gates = {
      endpoints_http_200_and_fingerprints_match: receipt.endpoints.every(e => e.pass),
      registry_51_equals_24_plus_27: receipt.registry.total === 51 && receipt.registry.civic === 24 && receipt.registry.commercial === 27,
      forbidden_candidates_absent: receipt.registry.forbidden_absent && receipt.viewports.every(v => v.forbidden_absent),
      deals_feed_http_200_empty_array: receipt.deals_feed.is_empty_array,
      all_modules_render_on_three_viewports: receipt.viewports.every(v => v.pass),
      zero_console_runtime_errors: receipt.viewports.every(v => v.console_errors.length === 0 && v.runtime_errors.length === 0),
      zero_horizontal_overflow: receipt.viewports.every(v => Object.values(v.route_summary).every(r => !r.overflow)),
      zero_affiliate_and_tracking_links: receipt.viewports.every(v => v.clean_links)
    };
    receipt.verdict = Object.values(receipt.gates).every(Boolean) && receipt.blockers.length === 0 ? 'PASS_100_PERCENT' : 'FAIL';
  } catch (error) {
    receipt.blockers.push(error.stack || String(error));
    receipt.verdict = 'FAIL';
  }

  if (receipt.verdict !== 'PASS_100_PERCENT' && ROLLBACK_ON_FAIL) {
    receipt.rollback.triggered = true;
    try { rollback(); receipt.rollback.status = 'SUCCESS__RESTORED_V3423'; }
    catch (error) { receipt.rollback.status = 'FAILED'; receipt.blockers.push(`ROLLBACK_FAILED: ${error.message}`); }
  } else if (receipt.verdict !== 'PASS_100_PERCENT') {
    receipt.rollback.status = 'NOT_TRIGGERED__NON_CANONICAL_PREFLIGHT_MODE';
  }

  fs.mkdirSync(path.dirname(RECEIPT_PATH), { recursive: true });
  if (fs.existsSync(RECEIPT_PATH)) throw new Error(`Refusing to overwrite receipt ${RECEIPT_PATH}`);
  fs.writeFileSync(RECEIPT_PATH, JSON.stringify(receipt, null, 2) + '\n');
  console.log(JSON.stringify({ receipt_path: path.relative(ROOT, RECEIPT_PATH), receipt_sha256: sha(fs.readFileSync(RECEIPT_PATH)), verdict: receipt.verdict, gates: receipt.gates, blockers: receipt.blockers, rollback: receipt.rollback }, null, 2));
  if (receipt.verdict !== 'PASS_100_PERCENT') process.exitCode = 1;
})().catch(error => { console.error(error); process.exit(1); });
