const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('puppeteer');
const cp = require('child_process');

const root = path.resolve(__dirname, '..');
const candidateDir = path.join(root, '08_RELEASE_VAULT', 'candidates', 'v3.424.0-r1');
const manifestPath = path.join(candidateDir, 'candidate_manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const liveAuditReceiptPath = path.join(root, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'JAYT_341_V3424_R1_LIVE_POST_DEPLOY_AUDIT.json');
const deploymentReceiptPath = path.join(root, '08_RELEASE_VAULT', 'JAYT_341_R1_PRODUCTION_DEPLOYMENT_RECEIPT.json');
const productionUrl = 'https://jayt-production-v3420.vercel.app';
const deploymentId = 'dpl_Ey7N7FGzDmNoJn9FFbnKRp64SL16';
const deploymentUrl = 'https://jayt-production-v3420-p9hifla71-kuntran777-6857s-projects.vercel.app';

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

function shaBuffer(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}
function shaFile(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
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

async function rollbackToV3423() {
  console.warn('CRITICAL: Rollback triggered! Repointing alias to dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA...');
  return new Promise((resolve) => {
    cp.exec('npx vercel alias set dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA jayt-production-v3420.vercel.app', { cwd: path.join(root, 'deploy_personal_v3423') }, (err, stdout, stderr) => {
      console.log('Rollback CLI output:', stdout, stderr);
      resolve(!err);
    });
  });
}

(async () => {
  const auditReceipt = {
    receipt_id: 'JAYT_341_V3424_R1_LIVE_POST_DEPLOY_AUDIT',
    directive: 'JAYT-341',
    checked_at_utc: new Date().toISOString(),
    production_url: productionUrl,
    deployment_id: deploymentId,
    deployment_url: deploymentUrl,
    target_version: 'v3.424.0-r1',
    expected: {
      version: 'v3.424.0',
      total_cards: 51,
      civic_cards: 24,
      commercial_cards: 27
    },
    served_artifacts: [],
    live_http_probes: {},
    gates: {},
    viewports: [],
    blockers: [],
    rollback: {
      triggered: false,
      status: 'NOT_TRIGGERED'
    },
    verdict: 'PENDING'
  };

  try {
    // 1. Probe HTTP Endpoints & Hashes
    const endpoints = [
      { name: 'root', url: productionUrl + '/', expectedStatus: 200 },
      { name: 'registry', url: productionUrl + '/registry.json', expectedStatus: 200, expectedSha: manifest.artifacts.registry.sha256 },
      { name: 'deals_feed', url: productionUrl + '/deals_feed.json', expectedStatus: 200, expectedSha: manifest.artifacts.deals_feed.sha256 },
      { name: 'js', url: productionUrl + '/jayt_storefront_v3424.js', expectedStatus: 200, expectedSha: manifest.artifacts.js.sha256 },
      { name: 'styles', url: productionUrl + '/styles.css', expectedStatus: 200, expectedSha: manifest.artifacts.css.sha256 },
      { name: 'hero_svg', url: productionUrl + '/assets/images/board_a_afterglow_hero.svg', expectedStatus: 200, expectedSha: manifest.artifacts.hero_svg.sha256 },
      { name: 'rollback_manifest', url: productionUrl + '/rollback_manifest.json', expectedStatus: 200, expectedSha: manifest.artifacts.rollback_manifest.sha256 }
    ];

    for (const ep of endpoints) {
      const res = await fetch(ep.url, { cache: 'no-store' });
      const buf = Buffer.from(await res.arrayBuffer());
      const actualSha = shaBuffer(buf);
      const pass = res.status === ep.expectedStatus && (!ep.expectedSha || actualSha === ep.expectedSha);
      auditReceipt.served_artifacts.push({
        name: ep.name,
        url: ep.url,
        status: res.status,
        expectedStatus: ep.expectedStatus,
        actualSha,
        expectedSha: ep.expectedSha || null,
        pass
      });
      if (!pass) {
        auditReceipt.blockers.push(`Served artifact mismatch on ${ep.name}: status=${res.status}, sha=${actualSha}`);
      }
    }

    // Verify deals_feed content specifically parses to []
    const dealsRes = await fetch(productionUrl + '/deals_feed.json', { cache: 'no-store' });
    const dealsText = await dealsRes.text();
    let dealsParsed = null;
    try { dealsParsed = JSON.parse(dealsText); } catch(e) {}
    auditReceipt.live_http_probes.deals_feed = {
      status: dealsRes.status,
      text: dealsText.trim(),
      is_empty_array: Array.isArray(dealsParsed) && dealsParsed.length === 0
    };
    if (dealsRes.status !== 200 || !Array.isArray(dealsParsed) || dealsParsed.length !== 0) {
      auditReceipt.blockers.push('deals_feed.json is not HTTP 200 with []');
    }

    // 2. Puppeteer Live DOM Audit
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

        const res = await page.goto(productionUrl, { waitUntil: 'networkidle0', timeout: 30000 });

        // Home View (Civic cards)
        const homeAudit = await page.evaluate(() => {
          const civicCards = document.querySelectorAll('.t2-pilot-card-section');
          return {
            status: 200,
            version: window.__JAYT_STOREFRONT__?.version,
            civicCount: window.__JAYT_STOREFRONT__?.civicCardsCount,
            commercialCount: window.__JAYT_STOREFRONT__?.commercialCardsCount,
            totalCount: window.__JAYT_STOREFRONT__?.totalCardsCount,
            civicDomCount: civicCards.length,
            overflow: document.documentElement.scrollWidth > window.innerWidth
          };
        });

        // Navigate to Voucher Hub (Commercial cards)
        await page.evaluate(() => document.querySelector('[data-nav="VOUCHER_HUB"]')?.click());
        await page.waitForSelector('#v3424-commercial-container .commercial-card', { timeout: 5000 });

        const commercialAudit = await page.evaluate(() => {
          const cards = [...document.querySelectorAll('#v3424-commercial-container .commercial-card')];
          const links = [...document.querySelectorAll('#v3424-commercial-container .source-link-btn')];
          const ids = cards.map(c => c.dataset.sku);
          const interactive = [...document.querySelectorAll('.tier-filter, .source-link-btn')];
          return {
            count: cards.length,
            uniqueIds: new Set(ids).size,
            ids,
            linkHrefs: links.map(l => l.href),
            allLinksDiscloseNewTab: links.every(l => l.getAttribute('aria-label')?.includes('mở trong tab mới')),
            overflow: document.documentElement.scrollWidth > window.innerWidth,
            minTouchTargetHeight: Math.min(...interactive.map(el => el.getBoundingClientRect().height)),
            offerPrograms: [...document.querySelectorAll('.offer-program-card')].map(card => ({
              id: card.dataset.sku,
              validity: card.querySelector('.offer-validity')?.textContent || '',
              conditions: card.querySelector('.offer-conditions')?.textContent || '',
              disclaimer: card.querySelector('.disclaimer')?.textContent || ''
            }))
          };
        });

        // Filter counts
        const expectedFilters = { COUNTER_DEAL: 9, BRAND_PROGRAM: 2, APP_HIDDEN_CODE: 1, VALUE_RADAR: 15, ALL: 27 };
        const filterCounts = {};
        for (const [filterName, expected] of Object.entries(expectedFilters)) {
          filterCounts[filterName] = await page.evaluate(filter => {
            document.querySelector('[data-commercial-filter="' + filter + '"]')?.click();
            return [...document.querySelectorAll('#v3424-commercial-container .commercial-card')].filter(c => !c.hidden).length;
          }, filterName);
        }

        // Reset to ALL
        await page.evaluate(() => document.querySelector('[data-commercial-filter="ALL"]')?.click());

        // Keyboard Navigation (check on 1440px)
        let keyboardResult = null;
        if (width === 1440) {
          await page.evaluate(() => document.activeElement?.blur());
          const reachedFilters = new Set();
          const reachedCards = new Set();
          for (let i = 0; i < 90; i++) {
            await page.keyboard.press('Tab');
            const focused = await page.evaluate(() => ({
              filter: document.activeElement?.getAttribute?.('data-commercial-filter') || null,
              sku: document.activeElement?.closest?.('.commercial-card')?.getAttribute('data-sku') || null
            }));
            if (focused.filter) reachedFilters.add(focused.filter);
            if (focused.sku) reachedCards.add(focused.sku);
            if (reachedFilters.size === 5 && reachedCards.size === 27) break;
          }
          keyboardResult = {
            reachedFiltersCount: reachedFilters.size,
            reachedCardsCount: reachedCards.size,
            pass: reachedFilters.size === 5 && reachedCards.size === 27
          };
        }

        const commercialLinksClean = commercialAudit.linkHrefs.every(cleanUrl);
        const fourBatch15Present = requiredNewIds.every(id => commercialAudit.ids.includes(id));
        const forbiddenAbsent = forbiddenIds.every(id => !commercialAudit.ids.includes(id));
        const filtersMatch = Object.entries(expectedFilters).every(([k, v]) => filterCounts[k] === v);

        const viewportPass = res.status() === 200 &&
          homeAudit.version === 'v3.424.0' && homeAudit.civicCount === 24 && homeAudit.commercialCount === 27 && homeAudit.totalCount === 51 &&
          commercialAudit.count === 27 && commercialAudit.uniqueIds === 27 &&
          fourBatch15Present && forbiddenAbsent && commercialLinksClean &&
          !homeAudit.overflow && !commercialAudit.overflow &&
          commercialAudit.minTouchTargetHeight >= 44 &&
          filtersMatch &&
          consoleErrors.length === 0 && runtimeErrors.length === 0 &&
          (width !== 1440 || keyboardResult.pass);

        auditReceipt.viewports.push({
          width,
          httpStatus: res.status(),
          homeAudit,
          commercialAudit: {
            count: commercialAudit.count,
            uniqueIds: commercialAudit.uniqueIds,
            fourBatch15Present,
            forbiddenAbsent,
            commercialLinksClean,
            overflow: commercialAudit.overflow,
            minTouchTargetHeight: commercialAudit.minTouchTargetHeight
          },
          filterCounts,
          keyboardResult,
          consoleErrors,
          runtimeErrors,
          pass: viewportPass
        });

        if (!viewportPass) {
          auditReceipt.blockers.push(`Viewport ${width}px failed checks`);
        }

        await page.close();
      }
    } finally {
      await browser.close();
    }

    auditReceipt.gates = {
      http_endpoints_200: auditReceipt.served_artifacts.every(a => a.pass),
      deals_feed_http_200_empty_array: auditReceipt.live_http_probes.deals_feed.is_empty_array,
      total_51_cards_rendered: auditReceipt.viewports.every(v => v.homeAudit.totalCount === 51 && v.commercialAudit.count === 27),
      four_batch_15_present: auditReceipt.viewports.every(v => v.commercialAudit.fourBatch15Present),
      forbidden_candidates_absent: auditReceipt.viewports.every(v => v.commercialAudit.forbiddenAbsent),
      clean_https_zero_affiliate_zero_tracking: auditReceipt.viewports.every(v => v.commercialAudit.commercialLinksClean),
      zero_overflow_and_touch_target_44px: auditReceipt.viewports.every(v => !v.homeAudit.overflow && !v.commercialAudit.overflow && v.commercialAudit.minTouchTargetHeight >= 44),
      sequential_keyboard_complete: auditReceipt.viewports.find(v => v.width === 1440)?.keyboardResult?.pass === true,
      zero_console_runtime_errors: auditReceipt.viewports.every(v => v.consoleErrors.length === 0 && v.runtimeErrors.length === 0)
    };

    const allGatesPassed = Object.values(auditReceipt.gates).every(Boolean) && auditReceipt.blockers.length === 0;
    auditReceipt.verdict = allGatesPassed ? 'PASS_100_PERCENT' : 'FAIL';

    if (!allGatesPassed) {
      auditReceipt.rollback.triggered = true;
      const rollbackOk = await rollbackToV3423();
      auditReceipt.rollback.status = rollbackOk ? 'SUCCESS__RESTORED_V3423' : 'FAILED_TO_ROLLBACK';
    }

  } catch(error) {
    auditReceipt.blockers.push(error.stack || error.message);
    auditReceipt.verdict = 'FAIL';
    auditReceipt.rollback.triggered = true;
    await rollbackToV3423();
    auditReceipt.rollback.status = 'ERROR_ROLLBACK_EXECUTED';
  }

  fs.mkdirSync(path.dirname(liveAuditReceiptPath), { recursive: true });
  fs.writeFileSync(liveAuditReceiptPath, JSON.stringify(auditReceipt, null, 2) + '\n');

  // Deployment Receipt
  const deploymentReceipt = {
    receipt_id: 'JAYT_341_R1_PRODUCTION_DEPLOYMENT_RECEIPT',
    directive: 'JAYT-341 — WORK ORDER R1 DEPLOYMENT (51 CARDS)',
    deployed_at_utc: auditReceipt.checked_at_utc,
    status: auditReceipt.verdict === 'PASS_100_PERCENT' ? 'SUCCESS__LIVE_VERIFIED_51_CARDS' : 'FAILED__ROLLED_BACK',
    production_url: productionUrl,
    deployment_url: deploymentUrl,
    deployment_id: deploymentId,
    version: 'v3.424.0-r1',
    runtime_version: 'v3.424.0',
    cards: {
      total: 51,
      civic: 24,
      commercial: 27,
      promoted_batch_15: requiredNewIds,
      excluded_fail_closed: forbiddenIds
    },
    sealed_candidate: {
      root: '08_RELEASE_VAULT/candidates/v3.424.0-r1/',
      manifest_sha256: manifest.artifacts ? shaFile(manifestPath) : null,
      storefront_sha256: manifest.artifacts.js.sha256,
      html_sha256: manifest.artifacts.html.sha256,
      css_sha256: manifest.artifacts.css.sha256,
      registry_sha256: manifest.artifacts.registry.sha256,
      deals_feed_sha256: manifest.artifacts.deals_feed.sha256,
      hero_svg_sha256: manifest.artifacts.hero_svg.sha256,
      rollback_manifest_sha256: manifest.artifacts.rollback_manifest.sha256
    },
    live_post_deploy_audit: {
      path: '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_341_V3424_R1_LIVE_POST_DEPLOY_AUDIT.json',
      sha256: shaFile(liveAuditReceiptPath),
      verdict: auditReceipt.verdict,
      gates: auditReceipt.gates
    },
    rollback: auditReceipt.rollback.triggered ? {
      triggered: true,
      status: auditReceipt.rollback.status,
      target_version: 'v3.423.0',
      target_deployment_id: 'dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA'
    } : {
      triggered: false,
      standby_version: 'v3.423.0',
      standby_deployment_id: 'dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA',
      status: 'STANDBY_READY'
    }
  };

  fs.mkdirSync(path.dirname(deploymentReceiptPath), { recursive: true });
  fs.writeFileSync(deploymentReceiptPath, JSON.stringify(deploymentReceipt, null, 2) + '\n');

  console.log(JSON.stringify({
    verdict: auditReceipt.verdict,
    gates: auditReceipt.gates,
    blockers: auditReceipt.blockers,
    rollback: auditReceipt.rollback
  }, null, 2));

  if (auditReceipt.verdict !== 'PASS_100_PERCENT') process.exitCode = 1;
})();
