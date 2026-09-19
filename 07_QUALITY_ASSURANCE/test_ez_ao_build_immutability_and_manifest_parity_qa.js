/**
 * JAYT BUILD IMMUTABILITY & EXACT MANIFEST ARTIFACT HASH QA SUITE (SECTION EZ-AO)
 * Governing Directive: JAYT-245 Section EZ-AO (Lines 5018-5040)
 *
 * Verifies:
 * 1. Single Build Manifest Contract & Immutable Identity for v3.483.0-staging.ao
 * 2. Historical Manifest v3.482.0-staging.ez preserved as immutable audit evidence
 * 3. 4-Way Absolute Equality: SOT hash === Served hash === Manifest hash === Health hash
 * 4. Negative Fixtures: Stale HTML hash, off-by-one hash, off-by-one version MUST FAIL
 * 5. Network-Denied Browser Lifecycle on 1440, 768, 390 with zero console errors and 0 external requests
 * 6. Governance & Platform State Invariants (Fast Lane OPEN_EVALUATING, Cohort 15 pre-SLA, Prod HOLD)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const HEALTH_URL = 'http://127.0.0.1:4173/health';
const STAGING_URL = 'http://127.0.0.1:4173/';
const BUILD_MANIFEST_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json');
const HISTORICAL_MANIFEST_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST_v3.482.0-staging.ez.json');

// Verification function enforcing exact match policy
function verifyExactVersionMatch(actual, expected, context) {
  if (actual !== expected) {
    throw new Error(`EXACT_VERSION_GATE_FAILURE [${context}]: '${actual}' !== '${expected}'`);
  }
  return true;
}

function verifyExactHashMatch(actual, expected, context) {
  if (actual !== expected) {
    throw new Error(`EXACT_HASH_GATE_FAILURE [${context}]: '${actual}' !== '${expected}'`);
  }
  return true;
}

async function runEZAOBuildImmutabilityQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-AO BUILD IMMUTABILITY & MANIFEST PARITY QA...\n');

  let totalTests = 0;
  let passedTests = 0;

  async function it(name, fn) {
    totalTests++;
    try {
      await fn();
      console.log('  ✓ ' + name);
      passedTests++;
    } catch (err) {
      console.error('  ✕ ' + name + ': ' + err.message);
      throw err;
    }
  }

  // Load active build manifest
  assert.ok(fs.existsSync(BUILD_MANIFEST_PATH), 'Build manifest must exist');
  const buildManifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8'));
  const EXPECTED_VERSION = buildManifest.expectedVersion;
  assert.strictEqual(EXPECTED_VERSION, 'v3.483.0-staging.ao');

  // --- Suite 1: Single Build Manifest Contract & Immutable Identity (Mandates EZ-AO.1 & EZ-AO.2) ---
  console.log('--- Suite 1: Single Build Manifest Contract & Immutable Identity (Mandates EZ-AO.1 & EZ-AO.2) ---');

  await it('Historical manifest v3.482.0-staging.ez exists and is preserved as immutable evidence', () => {
    assert.ok(fs.existsSync(HISTORICAL_MANIFEST_PATH));
    const hist = JSON.parse(fs.readFileSync(HISTORICAL_MANIFEST_PATH, 'utf8'));
    assert.strictEqual(hist.expectedVersion, 'v3.482.0-staging.ez');
    assert.ok(hist.artifacts.sot_html.sha256);
  });

  await it('Live staging health endpoint returns EXACT expectedVersion (v3.483.0-staging.ao)', async () => {
    const res = await fetch(HEALTH_URL);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    verifyExactVersionMatch(data.version, EXPECTED_VERSION, 'health_endpoint');
  });

  await it('SOT JS and Served JS versions strictly equal expectedVersion', () => {
    const sotJsPath = path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ey.js');
    const servedJsPath = path.join(ROOT, 'staging_deploy_ey/jayt_storefront_staging_ey.js');
    const sotJsContent = fs.readFileSync(sotJsPath, 'utf8');
    const servedJsContent = fs.readFileSync(servedJsPath, 'utf8');

    assert.ok(sotJsContent.includes(`ledger_version: '${EXPECTED_VERSION}'`));
    assert.ok(sotJsContent.includes(`version: '${EXPECTED_VERSION}'`));
    assert.ok(servedJsContent.includes(`ledger_version: '${EXPECTED_VERSION}'`));
    assert.ok(servedJsContent.includes(`version: '${EXPECTED_VERSION}'`));
  });

  await it('HTML title, data-ledger-version, tagline, and footer strictly equal expectedVersion', () => {
    const htmlPath = path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    assert.ok(htmlContent.includes(`<title>JayT Platform — Tra Cứu Tiện Ích & Bảng Tính Thực Trả (${EXPECTED_VERSION})</title>`));
    assert.ok(htmlContent.includes(`data-ledger-version="${EXPECTED_VERSION}"`));
    assert.ok(htmlContent.includes(`<span class="brand-tagline">Nền Tảng Tiện Ích Minh Bạch &bull; ${EXPECTED_VERSION}</span>`));
    assert.ok(htmlContent.includes(`Không lưu trữ PII &bull; ${EXPECTED_VERSION}</p>`));
  });

  await it('Release receipt and parity manifest strictly equal expectedVersion', () => {
    const receipt = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_AO.json'), 'utf8'));
    const parity = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_AO.json'), 'utf8'));

    verifyExactVersionMatch(receipt.version, EXPECTED_VERSION, 'release_receipt');
    verifyExactVersionMatch(parity.version, EXPECTED_VERSION, 'parity_manifest');
  });

  // --- Suite 2: Exact Artifact Hash 4-Way Absolute Equality (Mandates EZ-AO.2 & EZ-AO.3) ---
  console.log('\n--- Suite 2: Exact Artifact Hash 4-Way Absolute Equality (Mandates EZ-AO.2 & EZ-AO.3) ---');

  const sotJsPath = path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ey.js');
  const servedJsPath = path.join(ROOT, 'staging_deploy_ey/jayt_storefront_staging_ey.js');
  const sotHtmlPath = path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html');
  const servedHtmlPath = path.join(ROOT, 'staging_deploy_ey/index.html');

  const computedSotJsSha = crypto.createHash('sha256').update(fs.readFileSync(sotJsPath)).digest('hex');
  const computedServedJsSha = crypto.createHash('sha256').update(fs.readFileSync(servedJsPath)).digest('hex');
  const computedSotHtmlSha = crypto.createHash('sha256').update(fs.readFileSync(sotHtmlPath)).digest('hex');
  const computedServedHtmlSha = crypto.createHash('sha256').update(fs.readFileSync(servedHtmlPath)).digest('hex');

  await it('JavaScript SHA-256 has 4-way absolute equality: SOT === Served === Manifest === Health', async () => {
    const res = await fetch(HEALTH_URL);
    const health = await res.json();

    const manifestJsSha = buildManifest.artifacts.sot_js.sha256;
    verifyExactHashMatch(computedSotJsSha, computedServedJsSha, 'sot_vs_served_js');
    verifyExactHashMatch(computedSotJsSha, manifestJsSha, 'sot_vs_manifest_js');
    verifyExactHashMatch(computedSotJsSha, health.sot_js_sha256, 'sot_vs_health_sot_js');
    verifyExactHashMatch(computedServedJsSha, health.served_js_sha256, 'served_vs_health_served_js');
  });

  await it('HTML SHA-256 has 4-way absolute equality: SOT === Served === Manifest === Health', async () => {
    const res = await fetch(HEALTH_URL);
    const health = await res.json();

    const manifestHtmlSha = buildManifest.artifacts.sot_html.sha256;
    verifyExactHashMatch(computedSotHtmlSha, computedServedHtmlSha, 'sot_vs_served_html');
    verifyExactHashMatch(computedSotHtmlSha, manifestHtmlSha, 'sot_vs_manifest_html');
    verifyExactHashMatch(computedSotHtmlSha, health.sot_html_sha256, 'sot_vs_health_sot_html');
    verifyExactHashMatch(computedServedHtmlSha, health.served_html_sha256, 'served_vs_health_served_html');
  });

  // --- Suite 3: Negative Fixtures — Stale Hash & Off-By-One Hash (Mandate EZ-AO.4) ---
  console.log('\n--- Suite 3: Negative Fixtures — Stale Hash & Off-By-One Hash (Mandate EZ-AO.4) ---');

  await it('[Negative Fixture 1] Stale EZ-AJ HTML hash (0da20913...) MUST FAIL exact hash gate', () => {
    const staleHtmlHash = '0da2091311849797cb0e2c0cc7f60f0674d4d859d936d14cc0bba74af14b1310';
    assert.throws(
      () => verifyExactHashMatch(staleHtmlHash, computedSotHtmlSha, 'stale_ez_aj_html_hash'),
      /EXACT_HASH_GATE_FAILURE/
    );
  });

  await it('[Negative Fixture 2] Stale EZ-AN HTML hash (4d22c0a2...) MUST FAIL exact hash gate', () => {
    const staleEZANHash = '4d22c0a29f79a66144e58b1933e144a29a1fe186e890c58851893c52a32c2532';
    assert.throws(
      () => verifyExactHashMatch(staleEZANHash, computedSotHtmlSha, 'stale_ez_an_html_hash'),
      /EXACT_HASH_GATE_FAILURE/
    );
  });

  await it('[Negative Fixture 3] Off-by-one character in HTML hash MUST FAIL exact hash gate', () => {
    const offByOneHtmlSha = computedSotHtmlSha.slice(0, -1) + (computedSotHtmlSha.slice(-1) === 'a' ? 'b' : 'a');
    assert.throws(
      () => verifyExactHashMatch(offByOneHtmlSha, computedSotHtmlSha, 'off_by_one_html_sha'),
      /EXACT_HASH_GATE_FAILURE/
    );
  });

  await it('[Negative Fixture 4] Off-by-one character in JS hash MUST FAIL exact hash gate', () => {
    const offByOneJsSha = computedSotJsSha.slice(0, -1) + (computedSotJsSha.slice(-1) === 'a' ? 'b' : 'a');
    assert.throws(
      () => verifyExactHashMatch(offByOneJsSha, computedSotJsSha, 'off_by_one_js_sha'),
      /EXACT_HASH_GATE_FAILURE/
    );
  });

  await it('[Negative Fixture 5] Off-by-one version string (v3.483.1 vs v3.483.0) MUST FAIL exact version gate', () => {
    assert.throws(
      () => verifyExactVersionMatch('v3.483.1-staging.ao', EXPECTED_VERSION, 'off_by_one_version'),
      /EXACT_VERSION_GATE_FAILURE/
    );
  });

  // --- Suite 4: Network-Denied Browser Lifecycle Across 1440, 768, 390 (Mandate EZ-AO.5) ---
  console.log('\n--- Suite 4: Network-Denied Browser Lifecycle Across 1440, 768, 390 (Mandate EZ-AO.5) ---');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const interceptedRequests = [];
    const consoleErrors = [];

    page.on('request', req => {
      interceptedRequests.push(req.url());
    });

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', err => {
      consoleErrors.push(err.message);
    });

    await page.goto(STAGING_URL, { waitUntil: 'networkidle0' });

    await it('[Request Audit] 100% of network requests on page load are local (ZERO external fonts/CDNs)', () => {
      assert.ok(interceptedRequests.length > 0);
      interceptedRequests.forEach(url => {
        assert.ok(
          url.startsWith('http://127.0.0.1:4173') || url.startsWith('http://localhost:4173'),
          `External request forbidden: ${url}`
        );
        assert.ok(!url.includes('googleapis.com'));
        assert.ok(!url.includes('gstatic.com'));
      });
    });

    await it('[Browser Desktop 1440] Page DOM displays exact v3.483.0-staging.ao and 0 console errors', async () => {
      await page.setViewport({ width: 1440, height: 900 });

      const title = await page.title();
      assert.ok(title.includes(EXPECTED_VERSION), `Title must include ${EXPECTED_VERSION}, got ${title}`);

      const ledgerVer = await page.$eval('body', el => el.getAttribute('data-ledger-version'));
      verifyExactVersionMatch(ledgerVer, EXPECTED_VERSION, 'browser_body_data_ledger_version');

      const tagline = await page.$eval('.brand-tagline', el => el.textContent.trim());
      assert.ok(tagline.endsWith(EXPECTED_VERSION), `Tagline must end with ${EXPECTED_VERSION}`);

      const footer = await page.$eval('.footer-note', el => el.textContent.trim());
      assert.ok(footer.includes(EXPECTED_VERSION), `Footer must include ${EXPECTED_VERSION}`);

      assert.strictEqual(consoleErrors.length, 0, `Console errors on 1440: ${consoleErrors.join('; ')}`);
    });

    await it('[Browser Tablet 768] Zero console errors on tablet reload', async () => {
      await page.setViewport({ width: 768, height: 1024 });
      await page.reload({ waitUntil: 'networkidle0' });
      assert.strictEqual(consoleErrors.length, 0);
    });

    await it('[Browser Mobile 390] Zero console errors on mobile reload', async () => {
      await page.setViewport({ width: 390, height: 844 });
      await page.reload({ waitUntil: 'networkidle0' });
      assert.strictEqual(consoleErrors.length, 0);
    });

    await it('[Browser Savings Lab] Savings Lab v2 CEO Test: 100k + 20k - 10% (10k) - 5k = 105k (split 2 = 52.5k)', async () => {
      await page.setViewport({ width: 1440, height: 900 });

      // Navigate to Savings Lab
      await page.evaluate(() => document.querySelector('button[data-nav="BUY_DECISION"]').click());
      await new Promise(r => setTimeout(r, 400));

      // Choose Group preset (defaults to 2 people)
      await page.evaluate(() => document.getElementById('preset-group').click());
      await new Promise(r => setTimeout(r, 200));

      // Type test values
      await page.evaluate(() => {
        document.getElementById('calc-item-price').value = '100000';
        document.getElementById('calc-shipping-fee').value = '20000';
        document.getElementById('calc-student-discount').value = '10';
        document.getElementById('calc-voucher-discount').value = '5000';
        document.getElementById('calc-item-price').dispatchEvent(new Event('input', { bubbles: true }));
      });
      await new Promise(r => setTimeout(r, 300));

      const finalTotal = await page.evaluate(() => document.getElementById('res-final-total').textContent.trim());
      const perPerson = await page.evaluate(() => document.getElementById('res-per-person').textContent.trim());

      assert.strictEqual(finalTotal, '105.000 VNĐ', 'Final total must be 105.000 VNĐ');
      assert.strictEqual(perPerson, '52.500 VNĐ', 'Per person must be 52.500 VNĐ');
    });
  } finally {
    await browser.close();
  }

  // --- Suite 5: Governance & Platform State Invariants ---
  console.log('\n--- Suite 5: Governance & Platform State Invariants ---');

  await it('Fast Lane Ledger preserves JetBrains and Figma with zero premature verdict and zero public eligibility', () => {
    const fastLane = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json'), 'utf8'));
    assert.strictEqual(fastLane.batch_summary.total_candidates_active, 2);
    assert.strictEqual(fastLane.candidates.length, 2);
    fastLane.candidates.forEach(c => {
      assert.ok(c.sla_status === 'OPEN_EVALUATING' || c.sla_status.startsWith('CLOSED_SLA_COMPLETED'));
      assert.strictEqual(c.early_verdict_triggered, false);
      assert.strictEqual(c.public_eligible, false);
    });
  });

  await it('Cohort 15 candidates maintain clean pre-SLA semantics (14 OPEN_EVALUATING, 1 INTAKE_FAILED_NO_RAW, 0 tier)', () => {
    const cohort = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/COHORT_CINEMA_TRANSIT_15_CANDIDATES_LEDGER_EZ_AM.json'), 'utf8'));
    assert.strictEqual(cohort.total_candidates, 15);
    const openCands = cohort.candidates.filter(c => c.status === 'OPEN_EVALUATING');
    assert.strictEqual(openCands.length, 14);
    openCands.forEach(c => {
      assert.strictEqual(c.interim_assessment, undefined);
      assert.strictEqual(c.verdict_tier, undefined);
    });
    const bhd = cohort.candidates.find(c => c.candidate_id === 'COHORT_EZ_AM_04');
    assert.strictEqual(bhd.status, 'INTAKE_FAILED_NO_RAW');
    assert.strictEqual(bhd.interim_assessment, undefined);
    assert.strictEqual(cohort.batch_summary.early_verdicts_rendered, 0);
  });

  await it('Release receipt and parity manifest record build v3.483.0-staging.ao and production locked at v3.420.0', () => {
    const r = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_AO.json'), 'utf8'));
    assert.strictEqual(r.version, EXPECTED_VERSION);
    assert.strictEqual(r.production_locked, true);
    assert.strictEqual(r.production_version, 'v3.420.0');
    assert.strictEqual(r.voucher_verified_t1_count, 0);
    assert.strictEqual(r.affiliate_activation, false);
    assert.strictEqual(r.public_eligible_t2_documentation_count, 1);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-AO BUILD IMMUTABILITY & MANIFEST PARITY QA TESTS PASSED!\n');
}

runEZAOBuildImmutabilityQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
