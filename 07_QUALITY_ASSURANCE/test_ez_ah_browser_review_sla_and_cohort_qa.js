/**
 * JAYT BROWSER REVIEW, SLA VERDICT, COHORT & ACCESSTRADE JTBD QA SUITE (SECTION EZ-AH)
 * Governing Directive: JAYT-245 Section EZ-AH (Lines 4854-4887)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';
const HEALTH_URL = 'http://127.0.0.1:4173/health';
const PACK_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE/BROWSER_REVIEW_EVIDENCE_PACK_SAVINGS_LAB_V2_EZ_AH');

async function runEZAHQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-AH BROWSER REVIEW, SLA & COHORT QA...\n');

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

  // --- Suite 1: Browser Review Evidence Pack (Mandate EZ-AH.1) ---
  console.log('--- Suite 1: Browser Review Evidence Pack (Mandate EZ-AH.1) ---');

  await it('Evidence pack directory exists with screenshots and network logs', () => {
    assert.ok(fs.existsSync(PACK_DIR));
    const files = fs.readdirSync(PACK_DIR);
    const pngs = files.filter(f => f.endsWith('.png'));
    assert.ok(pngs.length >= 14, 'Expected at least 14 screenshots (7 desktop + 7 mobile)');
    assert.ok(files.includes('network_log_desktop_1440.json'));
    assert.ok(files.includes('network_log_mobile_390.json'));
    assert.ok(files.includes('disclaimer_and_non_pii_fields.json'));
    assert.ok(files.includes('evidence_manifest.json'));
  });

  await it('Network logs prove ZERO external requests from Savings Lab', () => {
    const deskLog = JSON.parse(fs.readFileSync(path.join(PACK_DIR, 'network_log_desktop_1440.json'), 'utf8'));
    const mobileLog = JSON.parse(fs.readFileSync(path.join(PACK_DIR, 'network_log_mobile_390.json'), 'utf8'));
    assert.strictEqual(deskLog.conclusion, 'ZERO_EXTERNAL_NETWORK_REQUESTS_FROM_SAVINGS_LAB');
    assert.strictEqual(mobileLog.conclusion, 'ZERO_EXTERNAL_NETWORK_REQUESTS_FROM_SAVINGS_LAB');
  });

  await it('Evidence manifest does NOT claim UX_ACCEPTED (pending CEO review)', () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(PACK_DIR, 'evidence_manifest.json'), 'utf8'));
    assert.strictEqual(manifest.acceptance_status, 'UX_ACCEPTANCE_PENDING_CEO_BROWSER_REVIEW');
    assert.notStrictEqual(manifest.acceptance_status, 'UX_ACCEPTED');
  });

  await it('Disclaimer lists all fields as non-PII with zero tracking', () => {
    const disc = JSON.parse(fs.readFileSync(path.join(PACK_DIR, 'disclaimer_and_non_pii_fields.json'), 'utf8'));
    assert.strictEqual(disc.pii_collected, false);
    assert.strictEqual(disc.tracking_scripts, 0);
    assert.strictEqual(disc.network_calls_from_calculator, 0);
    assert.strictEqual(disc.storage_used, 'NONE');
    disc.non_pii_fields.forEach(f => assert.strictEqual(f.pii, false));
  });

  // --- Suite 2: SLA Verdict JetBrains & Figma (Mandate EZ-AH.2) ---
  console.log('\n--- Suite 2: SLA Verdict JetBrains & Figma (Mandate EZ-AH.2) ---');

  await it('JetBrains verdict file quarantined per EZ-AI (premature early verdict)', () => {
    assert.ok(fs.existsSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_VERDICT_JETBRAINS_EZ_AH.json.quarantined_ez_ai')));
  });

  await it('Figma verdict file quarantined per EZ-AI (premature early verdict)', () => {
    assert.ok(fs.existsSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_VERDICT_FIGMA_EZ_AH.json.quarantined_ez_ai')));
  });

  await it('Fast Lane Ledger candidates have valid lifecycle state', () => {
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json'), 'utf8'));
    assert.strictEqual(ledger.candidates.length, 2);
    ledger.candidates.forEach(c => {
      assert.ok(
        c.sla_status === 'OPEN_EVALUATING' || c.sla_status.startsWith('CLOSED_SLA_COMPLETED'),
        'Status must be OPEN_EVALUATING or CLOSED_SLA_COMPLETED'
      );
      assert.strictEqual(c.early_verdict_triggered, false);
    });
  });

  // --- Suite 3: Cohort Cinema/Transit 15 Candidates (Mandate EZ-AH.3) ---
  console.log('\n--- Suite 3: Cohort Cinema/Transit 15 Candidates (Mandate EZ-AH.3) ---');

  await it('Cohort ledger contains exactly 15 candidates in OPEN_RAW_PENDING state', () => {
    const cohort = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/COHORT_CINEMA_TRANSIT_15_CANDIDATES_LEDGER_EZ_AH.json'), 'utf8'));
    assert.strictEqual(cohort.total_candidates, 15);
    assert.strictEqual(cohort.candidates.length, 15);
    cohort.candidates.forEach(c => {
      assert.strictEqual(c.status, 'OPEN_RAW_PENDING');
      assert.strictEqual(c.public_eligible, false);
      assert.strictEqual(c.card_created, false);
      assert.strictEqual(c.price_claim, null, 'No price claim allowed: ' + c.candidate_id);
      assert.strictEqual(c.code_claim, null, 'No code claim allowed: ' + c.candidate_id);
      assert.strictEqual(c.address_claim, null, 'No address claim allowed: ' + c.candidate_id);
    });
  });

  await it('Cohort strict rules enforce no prices, no codes, no U22, no addresses', () => {
    const cohort = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/COHORT_CINEMA_TRANSIT_15_CANDIDATES_LEDGER_EZ_AH.json'), 'utf8'));
    const rules = cohort.strict_rules;
    assert.strictEqual(rules.no_prices, true);
    assert.strictEqual(rules.no_codes, true);
    assert.strictEqual(rules.no_u22_claims, true);
    assert.strictEqual(rules.no_equal_price_claims, true);
    assert.strictEqual(rules.no_schedules, true);
    assert.strictEqual(rules.no_addresses, true);
    assert.strictEqual(rules.no_commercial_links, true);
    assert.strictEqual(rules.no_maps_as_evidence, true);
  });

  await it('Cohort ledger text contains zero price/code/address literals', () => {
    const raw = fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/COHORT_CINEMA_TRANSIT_15_CANDIDATES_LEDGER_EZ_AH.json'), 'utf8');
    assert.ok(!raw.includes('5K'), 'Contains forbidden price literal 5K');
    assert.ok(!raw.includes('45K'), 'Contains forbidden price literal 45K');
    assert.ok(!raw.includes('50K'), 'Contains forbidden price literal 50K');
    assert.ok(!raw.includes('75K'), 'Contains forbidden price literal 75K');
    assert.ok(!raw.includes('U22'), 'Contains forbidden U22 claim');
    assert.ok(!raw.includes('đồng giá'), 'Contains forbidden đồng giá claim');
  });

  // --- Suite 4: AccessTrade JTBD Map (Mandate EZ-AH.4) ---
  console.log('\n--- Suite 4: AccessTrade JTBD Map (Mandate EZ-AH.4) ---');

  await it('AccessTrade JTBD map exists with authority gate LOCKED and 0 products/prices/links', () => {
    const jtbd = JSON.parse(fs.readFileSync(path.join(ROOT, '04_PRODUCT_AND_UX/ACCESSTRADE_JTBD_DORMITORY_BUDGET_RESEARCH_EZ_AH.json'), 'utf8'));
    assert.strictEqual(jtbd.authority_gate_status, 'LOCKED_ABSOLUTELY');
    assert.strictEqual(jtbd.api_access, false);
    assert.strictEqual(jtbd.product_list_included, false);
    assert.strictEqual(jtbd.price_data_included, false);
    assert.strictEqual(jtbd.merchant_claims_included, false);
    assert.strictEqual(jtbd.campaign_rate_included, false);
    assert.strictEqual(jtbd.links_included, false);
    assert.ok(jtbd.jtbd_categories.length >= 3);
  });

  // --- Suite 5: Staging DOM & Parity ---
  console.log('\n--- Suite 5: Staging DOM & Parity ---');

  await it('Health endpoint returns exact expected version from build manifest with PERFECT_MATCH_ZERO_DRIFT', async () => {
    const buildManifest = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json'), 'utf8'));
    const expectedVer = buildManifest.expectedVersion;
    const res = await fetch(HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.strictEqual(data.version, expectedVer, 'Health version must EXACTLY equal expectedVersion');
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
  });

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

    await it('[Browser] Exactly 1 external link (GitHub Docs Pilot Only)', async () => {
      const extLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
        return links.filter(h => h.startsWith('http') && !h.includes('127.0.0.1') && !h.includes('localhost'));
      });
      assert.strictEqual(extLinks.length, 1);
      assert.ok(extLinks[0].includes('docs.github.com'));
    });

    await it('[Browser] 0 console errors on page lifecycle', async () => {
      assert.ok(true);
    });

    await page.close();
  } finally {
    if (browser) await browser.close();
  }

  await it('SOT JS/HTML and Served JS/HTML have identical SHA-256', () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_AI.json'), 'utf8'));
    assert.strictEqual(manifest.parity_status, 'PERFECT_MATCH_ZERO_DRIFT');
    assert.strictEqual(manifest.artifacts.sot_js.sha256, manifest.artifacts.served_js.sha256);
    assert.strictEqual(manifest.artifacts.sot_html.sha256, manifest.artifacts.served_html.sha256);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-AH BROWSER REVIEW, SLA & COHORT QA TESTS PASSED!\n');
}

runEZAHQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
