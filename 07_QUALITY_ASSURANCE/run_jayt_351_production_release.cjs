const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');
const puppeteer = require('puppeteer');

const ROOT = 'D:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const WORKSPACE = ROOT;
const CANDIDATE_DIR = path.join(ROOT, '08_RELEASE_VAULT', 'candidates', 'v3.426.0');
const MANIFEST_PATH = path.join(CANDIDATE_DIR, 'candidate_manifest.json');
const ROLLBACK_MANIFEST_PATH = path.join(CANDIDATE_DIR, 'rollback_manifest.json');
const TECHNICAL_RECEIPT_PATH = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'RECEIPT_JAYT-350-R1.json');
const CANONICAL_DOMAIN = 'jayt-production-v3420.vercel.app';
const CANONICAL_LIVE_URL = `https://${CANONICAL_DOMAIN}`;

const EXPECTED_CANDIDATE_MANIFEST_SHA = '03b946be5166122c81da0f7c26496271e5e8ae02a83c41ad2620385d922b02cb';
const EXPECTED_TECHNICAL_RECEIPT_SHA = '4e2bd2039d16fcf63435fe1dea6b9727de8ac08ce5600c7b540b7471d547ead5';
const EXPECTED_ROLLBACK_MANIFEST_SHA = '64c6c02a701d090964e414fa3cd595692593d63b1496909cafb900c1f4f06b0d';
const ROLLBACK_DEPLOYMENT_ID = 'dpl_CvczfzmWBk4XJvd7RgfNX1Dwe55o';
const ROLLBACK_VERSION = 'v3.425.0-sprint-b-r1';

const EXPECTED_FINGERPRINTS = {
  'index.html': '727f843a0613d1f9a6bb18ebe0b97f55d6dce3fb7810521d36b7b8ba5557fbd0',
  'jayt_storefront_sprint_b.js': 'e7f61223636125692a25dcd12dba0ab2895801fc45c893860c141d9ac623b73a',
  'styles.css': 'f310ab6ce913bf3ade14b377b32c17de407a963b9f97cc30b33327067da18022',
  'registry.json': '346c10d82fbf00a4501e3ff8aec1d4340ef07904eddaa6e66a33a77e7eb95104',
  'deals_feed.json': '37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570',
  'board_a_afterglow_hero.svg': 'de9f194bd3c639d75af09f01f4684ad8fc63b2e52b1ebe89514b9b55331500d3'
};

const EXCLUDED_IDS = [
  'B16_CGV_01',
  'B16_LOTTE_01',
  'B16_HIGHLANDS_01',
  'B16_JOLLIBEE_2840004_DUP',
  'B16_JOLLIBEE_4000935_DUP',
  'B16_JOLLIBEE_1810060_DUP',
  'B14_DMX_M170_DEN',
  'P2O_CGV_FANC_2026',
  'P2O_GALAXY_ZALOPAY_REWARDS_2026Q3',
  'P2O_GALAXY_JCB_WEEKEND_2026Q3'
];

const sha = buf => crypto.createHash('sha256').update(buf).digest('hex');

function cleanLink(raw) {
  try {
    const u = new URL(raw);
    const blockedHosts = ['accesstrade.vn', 'go.isclix.com'];
    const blockedKeys = ['aff', 'affiliate', 'clickid', 'ref', 'subid', 'tracking'];
    return u.protocol === 'https:' &&
      !blockedHosts.some(h => u.hostname === h || u.hostname.endsWith('.' + h)) &&
      [...u.searchParams.keys()].every(k => !k.toLowerCase().startsWith('utm_') && !blockedKeys.includes(k.toLowerCase()));
  } catch { return false; }
}

async function rollback(reason) {
  console.error(`[CRITICAL] INITIATING IMMEDIATE ROLLBACK: ${reason}`);
  const cmd = `npx vercel alias set ${ROLLBACK_DEPLOYMENT_ID} ${CANONICAL_DOMAIN} 2>&1`;
  console.log(`[ROLLBACK COMMAND]: ${cmd}`);
  const out = cp.execSync(cmd, { cwd: ROOT, encoding: 'utf8', shell: true });
  console.log(`[ROLLBACK OUTPUT]:\n${out}`);
}

(async () => {
  const runId = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  console.log(`========================================================================`);
  console.log(`STARTING JAYT-351 PRODUCTION RELEASE PIPELINE [RUN: ${runId}]`);
  console.log(`========================================================================`);

  // ============================================================================
  // STAGE 1: PREFLIGHT VERIFICATION
  // ============================================================================
  console.log(`\n>>> STAGE 1: PREFLIGHT VERIFICATION`);
  
  const actualManifestSha = sha(fs.readFileSync(MANIFEST_PATH));
  console.log(`Candidate Manifest SHA-256: ${actualManifestSha}`);
  if (actualManifestSha !== EXPECTED_CANDIDATE_MANIFEST_SHA) {
    throw new Error(`ABORT: Candidate Manifest SHA mismatch! Expected ${EXPECTED_CANDIDATE_MANIFEST_SHA}, got ${actualManifestSha}`);
  }

  const actualTechReceiptSha = sha(fs.readFileSync(TECHNICAL_RECEIPT_PATH));
  console.log(`Technical Receipt SHA-256: ${actualTechReceiptSha}`);
  if (actualTechReceiptSha !== EXPECTED_TECHNICAL_RECEIPT_SHA) {
    throw new Error(`ABORT: Technical Receipt SHA mismatch! Expected ${EXPECTED_TECHNICAL_RECEIPT_SHA}, got ${actualTechReceiptSha}`);
  }

  const actualRollbackManifestSha = sha(fs.readFileSync(ROLLBACK_MANIFEST_PATH));
  console.log(`Rollback Manifest SHA-256: ${actualRollbackManifestSha}`);
  if (actualRollbackManifestSha !== EXPECTED_ROLLBACK_MANIFEST_SHA) {
    throw new Error(`ABORT: Rollback Manifest SHA mismatch! Expected ${EXPECTED_ROLLBACK_MANIFEST_SHA}, got ${actualRollbackManifestSha}`);
  }

  // Verify all 6 candidate bundle files
  const fileCheckPaths = {
    'index.html': path.join(CANDIDATE_DIR, 'index.html'),
    'jayt_storefront_sprint_b.js': path.join(CANDIDATE_DIR, 'jayt_storefront_sprint_b.js'),
    'styles.css': path.join(CANDIDATE_DIR, 'styles.css'),
    'registry.json': path.join(CANDIDATE_DIR, 'registry.json'),
    'deals_feed.json': path.join(CANDIDATE_DIR, 'deals_feed.json'),
    'board_a_afterglow_hero.svg': path.join(CANDIDATE_DIR, 'assets', 'images', 'board_a_afterglow_hero.svg')
  };

  for (const [key, filePath] of Object.entries(fileCheckPaths)) {
    if (!fs.existsSync(filePath)) throw new Error(`Missing bundle file: ${filePath}`);
    const fileSha = sha(fs.readFileSync(filePath));
    const expected = EXPECTED_FINGERPRINTS[key];
    console.log(` - File [${key}]: ${fileSha} (expected: ${expected})`);
    if (fileSha !== expected) {
      throw new Error(`ABORT: Fingerprint mismatch on ${key}! Expected ${expected}, got ${fileSha}`);
    }
  }

  // Verify Rollback Target Deployment Reachable
  console.log(`Checking rollback deployment reachable: ${ROLLBACK_DEPLOYMENT_ID}`);
  const inspectOut = cp.execSync(`npx vercel inspect ${ROLLBACK_DEPLOYMENT_ID} 2>&1`, { cwd: ROOT, encoding: 'utf8', shell: true });
  if (!/status\s+.*ready/i.test(inspectOut)) {
    throw new Error(`Rollback deployment ${ROLLBACK_DEPLOYMENT_ID} is NOT ready!\n${inspectOut}`);
  }
  console.log(`Rollback deployment verified Ready.`);

  console.log(`[PREFLIGHT PASSED] All 6 fingerprints verified, manifests locked, rollback reachable.`);

  // ============================================================================
  // STAGE 2: VERCEL PRODUCTION DEPLOYMENT
  // ============================================================================
  console.log(`\n>>> STAGE 2: VERCEL DEPLOYMENT`);
  
  const deployCmd = `npx vercel deploy "08_RELEASE_VAULT/candidates/v3.426.0" --project jayt-production-v3420 --yes 2>&1`;
  console.log(`Executing: ${deployCmd}`);
  const deployOutput = cp.execSync(deployCmd, { cwd: ROOT, encoding: 'utf8', shell: true });
  console.log(`Deploy Output:\n${deployOutput}`);

  // Extract immutable URL
  const urlMatches = deployOutput.match(/https:\/\/jayt-production-v3420-[a-zA-Z0-9-]+-[a-zA-Z0-9-]+\.vercel\.app/gi) ||
                     deployOutput.match(/https:\/\/[a-zA-Z0-9.-]+\.vercel\.app/gi);
  if (!urlMatches || urlMatches.length === 0) {
    throw new Error(`Failed to extract deployment URL from output:\n${deployOutput}`);
  }
  const immutableUrl = urlMatches[urlMatches.length - 1];
  console.log(`Immutable Deployment URL: ${immutableUrl}`);

  // Inspect the deployment to get deployment ID and verify READY state
  console.log(`Inspecting deployment at ${immutableUrl}...`);
  const inspectNewOut = cp.execSync(`npx vercel inspect ${immutableUrl} 2>&1`, { cwd: ROOT, encoding: 'utf8', shell: true });
  console.log(`Inspect Output:\n${inspectNewOut}`);
  
  const idMatch = inspectNewOut.match(/id\s+(dpl_[a-zA-Z0-9]+)/);
  if (!idMatch) throw new Error(`Could not find deployment id in inspect output:\n${inspectNewOut}`);
  const newDeploymentId = idMatch[1];
  console.log(`Extracted New Deployment ID: ${newDeploymentId}`);

  if (!/status\s+.*ready/i.test(inspectNewOut)) {
    console.log(`Waiting for deployment to become Ready...`);
    let ready = false;
    for (let i = 0; i < 12; i++) {
      await new Promise(r => setTimeout(r, 5000));
      const check = cp.execSync(`npx vercel inspect ${newDeploymentId} 2>&1`, { cwd: ROOT, encoding: 'utf8', shell: true });
      if (/status\s+.*ready/i.test(check)) { ready = true; break; }
    }
    if (!ready) throw new Error(`Deployment ${newDeploymentId} timed out waiting for Ready state.`);
  }
  console.log(`Deployment ${newDeploymentId} is READY.`);

  // Assign Production Alias
  console.log(`\nAssigning Production Alias: ${CANONICAL_DOMAIN} -> ${newDeploymentId}...`);
  const aliasCmd = `npx vercel alias set ${newDeploymentId} ${CANONICAL_DOMAIN} 2>&1`;
  console.log(`Executing: ${aliasCmd}`);
  const aliasOutput = cp.execSync(aliasCmd, { cwd: ROOT, encoding: 'utf8', shell: true });
  console.log(`Alias Output:\n${aliasOutput}`);

  // Small delay for DNS/edge propagation
  console.log(`Waiting 5 seconds for edge CDN propagation...`);
  await new Promise(r => setTimeout(r, 5000));

  // ============================================================================
  // STAGE 3: POST-DEPLOY LIVE AUDIT
  // ============================================================================
  console.log(`\n>>> STAGE 3: POST-DEPLOY LIVE AUDIT AT ${CANONICAL_LIVE_URL}`);
  
  const liveAuditReceiptPath = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence', `JAYT_351_V3426_LIVE_POST_DEPLOY_AUDIT_${runId}.json`);
  const liveAuditReceipt = {
    receipt_id: `JAYT_351_V3426_LIVE_POST_DEPLOY_AUDIT_${runId}`,
    work_order: 'JAYT-351',
    run_id: runId,
    audited_at_utc: new Date().toISOString(),
    production_url: CANONICAL_LIVE_URL,
    deployment_id: newDeploymentId,
    immutable_url: immutableUrl,
    target_version: 'v3.426.0',
    candidate_manifest_sha256: actualManifestSha,
    endpoints: [],
    registry_audit: {},
    deals_feed_audit: {},
    viewports: [],
    gates: {},
    blockers: [],
    rollback: {
      triggered: false,
      target_version: ROLLBACK_VERSION,
      target_deployment_id: ROLLBACK_DEPLOYMENT_ID,
      status: 'STANDBY_READY'
    },
    verdict: 'PENDING'
  };

  let auditPassed = false;
  try {
    // 3A: Endpoints & Fingerprints
    const endpointsToCheck = [
      { name: 'root', path: '/', expectedSha: null },
      { name: 'registry', path: '/registry.json', expectedSha: EXPECTED_FINGERPRINTS['registry.json'] },
      { name: 'deals_feed', path: '/deals_feed.json', expectedSha: EXPECTED_FINGERPRINTS['deals_feed.json'] },
      { name: 'storefront_bundle', path: '/jayt_storefront_sprint_b.js', expectedSha: EXPECTED_FINGERPRINTS['jayt_storefront_sprint_b.js'] },
      { name: 'styles', path: '/styles.css', expectedSha: EXPECTED_FINGERPRINTS['styles.css'] },
      { name: 'hero_asset', path: '/assets/images/board_a_afterglow_hero.svg', expectedSha: EXPECTED_FINGERPRINTS['board_a_afterglow_hero.svg'] }
    ];

    let liveRegistry = null;
    let liveDeals = null;

    for (const ep of endpointsToCheck) {
      const epUrl = `${CANONICAL_LIVE_URL}${ep.path}`;
      const res = await fetch(epUrl, { cache: 'no-store', signal: AbortSignal.timeout(30000) });
      const buf = Buffer.from(await res.arrayBuffer());
      const actualEpSha = sha(buf);
      const pass = res.status === 200 && (!ep.expectedSha || actualEpSha === ep.expectedSha);
      console.log(`Endpoint [${ep.name}] -> status: ${res.status}, sha: ${actualEpSha}, match: ${pass}`);
      
      liveAuditReceipt.endpoints.push({
        name: ep.name,
        path: ep.path,
        status: res.status,
        bytes: buf.length,
        expected_sha256: ep.expectedSha,
        actual_sha256: actualEpSha,
        pass
      });

      if (!pass) {
        liveAuditReceipt.blockers.push(`ENDPOINT_FAILED_${ep.name.toUpperCase()}`);
      }

      if (ep.name === 'registry') liveRegistry = JSON.parse(buf.toString('utf8'));
      if (ep.name === 'deals_feed') liveDeals = JSON.parse(buf.toString('utf8'));
    }

    // 3B: Registry Scope & Excluded IDs Audit
    const allApprovedEntities = liveRegistry.approved_civic_entries.concat(liveRegistry.approved_commercial_entries);
    const serializedRegistry = JSON.stringify(allApprovedEntities);
    const forbiddenFoundInRegistry = EXCLUDED_IDS.filter(id => serializedRegistry.includes(id));

    liveAuditReceipt.registry_audit = {
      total_count: liveRegistry.total_approved_entities_count,
      civic_count: liveRegistry.approved_civic_entries.length,
      commercial_count: liveRegistry.approved_commercial_entries.length,
      expected_counts_match: liveRegistry.total_approved_entities_count === 76 &&
                             liveRegistry.approved_civic_entries.length === 24 &&
                             liveRegistry.approved_commercial_entries.length === 52,
      excluded_ids_absent: forbiddenFoundInRegistry.length === 0,
      forbidden_found: forbiddenFoundInRegistry
    };
    console.log(`Registry Audit:`, liveAuditReceipt.registry_audit);

    if (!liveAuditReceipt.registry_audit.expected_counts_match) {
      liveAuditReceipt.blockers.push(`REGISTRY_COUNTS_MISMATCH_EXPECTED_76_GOT_${liveRegistry.total_approved_entities_count}`);
    }
    if (forbiddenFoundInRegistry.length > 0) {
      liveAuditReceipt.blockers.push(`FORBIDDEN_OR_HELD_IDS_FOUND_IN_REGISTRY: ${forbiddenFoundInRegistry.join(', ')}`);
    }

    // 3C: Deals Feed Check
    liveAuditReceipt.deals_feed_audit = {
      is_empty_array: Array.isArray(liveDeals) && liveDeals.length === 0,
      length: Array.isArray(liveDeals) ? liveDeals.length : -1
    };
    if (!liveAuditReceipt.deals_feed_audit.is_empty_array) {
      liveAuditReceipt.blockers.push(`DEALS_FEED_NOT_EMPTY_ARRAY`);
    }

    // 3D: Puppeteer Browser Testing Across Viewports
    console.log(`\nLaunching headless browser for multi-viewport validation...`);
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const viewports = [1440, 768, 390];
      for (const width of viewports) {
        console.log(`Testing viewport width: ${width}px...`);
        const page = await browser.newPage();
        await page.setCacheEnabled(false);
        await page.setViewport({ width, height: 900 });

        const consoleErrors = [];
        const runtimeErrors = [];
        page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
        page.on('pageerror', err => runtimeErrors.push(String(err)));

        const navRes = await page.goto(CANONICAL_LIVE_URL, { waitUntil: 'networkidle0', timeout: 45000 });
        const httpStatus = navRes.status();

        const routeResults = {};
        const routes = ['HOME', 'VOUCHER_HUB', 'SPLIT_BILL_PRO', 'SAVINGS_CALENDAR', 'VALUE_RADAR'];

        for (const route of routes) {
          await page.evaluate(key => {
            const btn = document.querySelector(`[data-nav="${key}"]`);
            if (btn) btn.click();
          }, route);
          await new Promise(r => setTimeout(r, 200));

          routeResults[route] = await page.evaluate(() => {
            const links = [...document.querySelectorAll('#jayt-view-canvas a[href]')].map(a => a.href);
            const visibleHeadings = [...document.querySelectorAll('#jayt-view-canvas h1, #jayt-view-canvas h2, #jayt-view-canvas h3')]
              .filter(el => el.offsetParent !== null);
            const copyButtons = document.querySelectorAll('.copy-code-btn').length;

            return {
              civic_cards: document.querySelectorAll('.t2-pilot-card-section').length,
              voucher_cards: document.querySelectorAll('#voucher-vault-grid .vault-card').length,
              radar_cards: document.querySelectorAll('#radar-grid-container .radar-card').length,
              split_bill_present: !!document.querySelector('.split-bill-container'),
              calendar_present: !!document.querySelector('.calendar-days-bar'),
              copy_buttons: copyButtons,
              overflow: document.documentElement.scrollWidth > window.innerWidth,
              headings_count: visibleHeadings.length,
              links,
              dom_text: document.getElementById('jayt-view-canvas')?.innerText || ''
            };
          });
        }

        const allLinks = Object.values(routeResults).flatMap(r => r.links);
        const combinedDomText = Object.values(routeResults).map(r => r.dom_text).join('\n');
        const forbiddenFoundInDom = EXCLUDED_IDS.filter(id => combinedDomText.includes(id));
        const allCleanLinks = allLinks.every(cleanLink);

        const runtimeCards = {
          civic: routeResults.HOME.civic_cards,
          voucher_vault: routeResults.VOUCHER_HUB.voucher_cards,
          smart_value_radar: routeResults.VALUE_RADAR.radar_cards,
          total: routeResults.HOME.civic_cards + routeResults.VOUCHER_HUB.voucher_cards + routeResults.VALUE_RADAR.radar_cards
        };

        const viewportPass = httpStatus === 200 &&
                             runtimeCards.civic === 24 &&
                             runtimeCards.voucher_vault === 37 &&
                             runtimeCards.smart_value_radar === 15 &&
                             runtimeCards.total === 76 &&
                             routeResults.SPLIT_BILL_PRO.split_bill_present &&
                             routeResults.SAVINGS_CALENDAR.calendar_present &&
                             Object.values(routeResults).every(r => !r.overflow && r.headings_count > 0 && r.copy_buttons === 0) &&
                             forbiddenFoundInDom.length === 0 &&
                             allCleanLinks &&
                             consoleErrors.length === 0 &&
                             runtimeErrors.length === 0;

        console.log(` Viewport ${width}px -> Status: ${httpStatus}, Cards: ${runtimeCards.total} (Civic: ${runtimeCards.civic}, Vault: ${runtimeCards.voucher_vault}, Radar: ${runtimeCards.smart_value_radar}), Overflow: ${Object.values(routeResults).some(r => r.overflow)}, Errors: ${consoleErrors.length + runtimeErrors.length}, Pass: ${viewportPass}`);

        liveAuditReceipt.viewports.push({
          width,
          http_status: httpStatus,
          runtime_cards: runtimeCards,
          split_bill_module_present: routeResults.SPLIT_BILL_PRO.split_bill_present,
          savings_calendar_module_present: routeResults.SAVINGS_CALENDAR.calendar_present,
          zero_overflow: Object.values(routeResults).every(r => !r.overflow),
          zero_copy_buttons: Object.values(routeResults).every(r => r.copy_buttons === 0),
          excluded_ids_absent: forbiddenFoundInDom.length === 0,
          forbidden_found_in_dom: forbiddenFoundInDom,
          all_clean_links: allCleanLinks,
          console_errors: consoleErrors,
          runtime_errors: runtimeErrors,
          pass: viewportPass
        });

        if (!viewportPass) {
          liveAuditReceipt.blockers.push(`VIEWPORT_${width}_AUDIT_FAILED`);
        }

        await page.close();
      }
    } finally {
      await browser.close();
    }

    // Evaluate All Gates
    liveAuditReceipt.gates = {
      endpoints_http_200_and_fingerprints_match: liveAuditReceipt.endpoints.every(e => e.pass),
      registry_76_equals_24_plus_52: liveAuditReceipt.registry_audit.expected_counts_match,
      excluded_ids_strictly_absent: liveAuditReceipt.registry_audit.excluded_ids_absent &&
                                    liveAuditReceipt.viewports.every(v => v.excluded_ids_absent),
      deals_feed_http_200_empty_array: liveAuditReceipt.deals_feed_audit.is_empty_array,
      all_modules_and_76_cards_render_on_three_viewports: liveAuditReceipt.viewports.every(v => v.pass),
      zero_console_and_runtime_errors: liveAuditReceipt.viewports.every(v => v.console_errors.length === 0 && v.runtime_errors.length === 0),
      zero_horizontal_overflow: liveAuditReceipt.viewports.every(v => v.zero_overflow),
      zero_affiliate_and_tracking_violations: liveAuditReceipt.viewports.every(v => v.all_clean_links),
      zero_copy_buttons_guard: liveAuditReceipt.viewports.every(v => v.zero_copy_buttons)
    };

    auditPassed = Object.values(liveAuditReceipt.gates).every(Boolean) && liveAuditReceipt.blockers.length === 0;
    liveAuditReceipt.verdict = auditPassed ? 'PASS_100_PERCENT' : 'FAIL';
    console.log(`\nLive Audit Verdict: ${liveAuditReceipt.verdict}`);
    console.log(`Gate Breakdown:`, liveAuditReceipt.gates);

  } catch (err) {
    console.error(`Audit encountered error:`, err);
    liveAuditReceipt.blockers.push(err.stack || String(err));
    liveAuditReceipt.verdict = 'FAIL';
    auditPassed = false;
  }

  // ============================================================================
  // STAGE 4: ROLLBACK TRIGGER (IF FAILED) OR RECEIPT ISSUANCE (IF PASSED)
  // ============================================================================
  if (!auditPassed) {
    liveAuditReceipt.rollback.triggered = true;
    console.error(`\n[ALERT] AUDIT FAILED. EXECUTING ROLLBACK TO ${ROLLBACK_DEPLOYMENT_ID} (${ROLLBACK_VERSION})...`);
    try {
      await rollback(liveAuditReceipt.blockers.join('; '));
      liveAuditReceipt.rollback.status = 'SUCCESS__ROLLBACK_EXECUTED__V3425_BASELINE_RESTORED';
      console.log(`[ROLLBACK SUCCESSFUL] Production alias restored to ${ROLLBACK_DEPLOYMENT_ID}.`);
    } catch (rbErr) {
      liveAuditReceipt.rollback.status = 'FAILED';
      liveAuditReceipt.blockers.push(`ROLLBACK_FAILED: ${rbErr.message}`);
      console.error(`[ROLLBACK FAILED]:`, rbErr);
    }
  }

  // Write Live Audit Receipt with wx (exclusive creation)
  fs.writeFileSync(liveAuditReceiptPath, JSON.stringify(liveAuditReceipt, null, 2) + '\n', { flag: 'wx' });
  const liveAuditReceiptSha = sha(fs.readFileSync(liveAuditReceiptPath));
  console.log(`\nWritten Live Audit Receipt: ${liveAuditReceiptPath}`);
  console.log(`Live Audit Receipt SHA-256: ${liveAuditReceiptSha}`);

  if (!auditPassed) {
    throw new Error(`Production release JAYT-351 FAILED post-deploy audit. Rollback status: ${liveAuditReceipt.rollback.status}`);
  }

  // Write Production Deployment Receipt
  console.log(`\n>>> STAGE 5: EMITTING PRODUCTION DEPLOYMENT RECEIPT`);
  const deploymentReceiptPath = path.join(ROOT, '08_RELEASE_VAULT', 'JAYT_351_PRODUCTION_DEPLOYMENT_RECEIPT.json');
  const deploymentReceiptSidecarPath = path.join(ROOT, '08_RELEASE_VAULT', 'JAYT_351_PRODUCTION_DEPLOYMENT_RECEIPT.json.sha256');

  const prodReceipt = {
    receipt_id: 'JAYT_351_PRODUCTION_DEPLOYMENT_RECEIPT',
    work_order_id: 'JAYT-351',
    directive: 'JAYT-351 — EXECUTIVE PRODUCTION RELEASE DECREE v3.426.0 (76 ENTITIES)',
    issuer: 'Codex — CEO/Gatekeeper',
    executor: 'Antigravity — external software',
    status: 'SUCCESS__LIVE_VERIFIED__V3426_BASELINE_PROMOTED',
    release_version: 'v3.426.0',
    previous_baseline_version: 'v3.425.0-sprint-b-r1',
    runtime_ledger_version: 'v3.424.0',
    deployed_at_utc: new Date().toISOString(),
    production_url: CANONICAL_LIVE_URL,
    canonical_alias: CANONICAL_DOMAIN,
    deployment: {
      id: newDeploymentId,
      immutable_url: immutableUrl,
      ready_state: 'READY',
      target: 'production'
    },
    authorization: {
      path: '01_EXECUTIVE_COUNCIL/JAYT_351_CEO_PRODUCTION_RELEASE_AUTHORIZATION.md',
      decree_title: 'JAYT-351 — EXECUTIVE PRODUCTION RELEASE DECREE v3.426.0 (76 ENTITIES)',
      is_approved: true,
      deployment_permitted: true,
      deployment_authorized: true
    },
    sealed_candidate: {
      root: '08_RELEASE_VAULT/candidates/v3.426.0/',
      candidate_manifest_sha256: actualManifestSha,
      bundle_fingerprints_verified: '6_OF_6_MATCH',
      technical_receipt_sha256: actualTechReceiptSha,
      hot_edit_performed: false
    },
    live_scope: {
      total_cards: 76,
      civic_cards: 24,
      commercial_cards: 52,
      voucher_vault_cards: 37,
      smart_value_radar_cards: 15,
      split_bill_module: true,
      seven_day_calendar_module: true
    },
    batch_16_breakdown: {
      new_verified_items_count: 25,
      observed_price_count: 13,
      member_benefit_count: 8,
      counter_and_seasonal_deal_count: 4,
      held_items_count: 6,
      held_items_excluded: true
    },
    post_deploy_audit: {
      path: path.relative(ROOT, liveAuditReceiptPath).replace(/\\/g, '/'),
      sha256: liveAuditReceiptSha,
      verdict: 'PASS_100_PERCENT',
      http_endpoints: '6_OF_6_HTTP_200_AND_HASH_MATCH',
      viewports: [1440, 768, 390],
      console_errors: 0,
      runtime_errors: 0,
      horizontal_overflow: 0,
      affiliate_or_tracking_violations: 0,
      copy_code_buttons: 0,
      deals_feed_empty_array: true
    },
    excluded_candidates: EXCLUDED_IDS,
    rollback_standby: {
      version: ROLLBACK_VERSION,
      cards: 51,
      deployment_id: ROLLBACK_DEPLOYMENT_ID,
      artifact_root: '08_RELEASE_VAULT/candidates/sprint_b_r1/',
      artifact_manifest_sha256: '48fe97c68dc3963c60566b5fb99fe4c36fef96e12b3a3762f58bd2664db15dfe',
      status: 'STANDBY_READY'
    },
    production_baseline_promoted: 'v3.426.0'
  };

  fs.writeFileSync(deploymentReceiptPath, JSON.stringify(prodReceipt, null, 2) + '\n', { flag: 'wx' });
  const prodReceiptSha = sha(fs.readFileSync(deploymentReceiptPath));
  fs.writeFileSync(deploymentReceiptSidecarPath, prodReceiptSha + '\n', { flag: 'wx' });

  console.log(`Production Deployment Receipt: ${deploymentReceiptPath}`);
  console.log(`Receipt SHA-256: ${prodReceiptSha}`);
  console.log(`Sidecar File: ${deploymentReceiptSidecarPath}`);

  console.log(`\n========================================================================`);
  console.log(`JAYT-351 PRODUCTION GO-LIVE COMPLETED AND VERIFIED 100% SUCCESS!`);
  console.log(`========================================================================`);
})().catch(err => {
  console.error(`FATAL ERROR IN JAYT-351 RELEASE RUNNER:`, err);
  process.exit(1);
});
