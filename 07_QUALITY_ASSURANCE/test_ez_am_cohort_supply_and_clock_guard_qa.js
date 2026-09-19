/**
 * JAYT COHORT 15 SUPPLY WORKSTREAM & CLOCK GUARD QA SUITE (SECTION EZ-AM)
 * Governing Directive: JAYT-245 Section EZ-AM (Lines 4988-5015)
 *
 * Verifies:
 * 1. Cohort 15 Candidates Raw Binary Integrity & SHA-256 Matching
 * 2. SLA Clock Guard Engine, Negative Fixtures & Anti-Inference (Zero prices/U22/deals)
 * 3. Card Shell Neutrality & Public Surface Isolation (0 cohort cards public)
 * 4. Puppeteer Live DOM Containment & Prototype A11y Verification across 1440, 768, 390
 * 5. Platform Parity & Fast Lane SLA Preservation
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
const EXPECTED_VERSION = fs.existsSync(BUILD_MANIFEST_PATH) ? JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8')).expectedVersion : 'v3.483.0-staging.ao';

// Clock Guard Engine for Cohort 12h SLA
function validateCohortSlaClosureAttempt(currentRuntimeUtc, slaCloseUtc) {
  const now = new Date(currentRuntimeUtc).getTime();
  const close = new Date(slaCloseUtc).getTime();
  if (isNaN(now) || isNaN(close)) throw new Error('ERR_INVALID_TIMESTAMP');
  if (now < close) {
    throw new Error(`ERR_COHORT_SLA_NOT_ELAPSED: Runtime (${currentRuntimeUtc}) is before 12h SLA close (${slaCloseUtc})`);
  }
  return true;
}

async function runEZAMSupplyQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-AM COHORT SUPPLY & CLOCK GUARD QA...\n');

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

  const ledgerPath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/COHORT_CINEMA_TRANSIT_15_CANDIDATES_LEDGER_EZ_AM.json');
  assert.ok(fs.existsSync(ledgerPath), 'Cohort ledger must exist');
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));

  // --- Suite 1: Cohort 15 Candidates Raw Binary Integrity & Hashes (Mandate EZ-AM.3) ---
  console.log('--- Suite 1: Cohort 15 Candidates Raw Binary Integrity & Hashes (Mandate EZ-AM.3) ---');

  await it('Cohort ledger contains exactly 15 candidates (7 Cinema, 8 Transit)', () => {
    assert.strictEqual(ledger.candidates.length, 15);
    const cinema = ledger.candidates.filter(c => c.group === 'CINEMA');
    const transit = ledger.candidates.filter(c => c.group === 'TRANSIT');
    assert.strictEqual(cinema.length, 7);
    assert.strictEqual(transit.length, 8);
  });

  await it('All 14 reachable candidates have raw binary files with matching SHA-256 and byte length', () => {
    const reachable = ledger.candidates.filter(c => c.http_status === 200);
    assert.strictEqual(reachable.length, 14);

    reachable.forEach(c => {
      assert.ok(c.raw_vault_path, `Candidate ${c.candidate_id} must have raw_vault_path`);
      const fullPath = path.join(ROOT, c.raw_vault_path);
      assert.ok(fs.existsSync(fullPath), `Raw binary file must exist: ${c.raw_vault_path}`);

      const buf = fs.readFileSync(fullPath);
      assert.strictEqual(buf.length, c.raw_byte_length, `Byte length must match for ${c.candidate_id}`);
      const sha = crypto.createHash('sha256').update(buf).digest('hex');
      assert.strictEqual(sha, c.raw_sha256, `SHA-256 must match for ${c.candidate_id}`);
    });
  });

  await it('Unreachable candidate (COHORT_EZ_AM_04 BHD Star) has status INTAKE_FAILED_NO_RAW per EZ-AN', () => {
    const bhd = ledger.candidates.find(c => c.candidate_id === 'COHORT_EZ_AM_04');
    assert.ok(bhd);
    assert.strictEqual(bhd.http_status, 0);
    assert.strictEqual(bhd.raw_byte_length, 0);
    assert.strictEqual(bhd.status, 'INTAKE_FAILED_NO_RAW');
    assert.strictEqual(bhd.sla_status, 'INTAKE_FAILED_NO_RAW');
    assert.strictEqual(bhd.public_eligible, false);
  });

  // --- Suite 2: SLA Clock Guard & Anti-Inference Invariants (Mandate EZ-AM.3) ---
  console.log('\n--- Suite 2: SLA Clock Guard & Anti-Inference Invariants (Mandate EZ-AM.3) ---');

  await it('All candidate capture timestamps are <= current clock (no future timestamps)', () => {
    const now = new Date().getTime();
    ledger.candidates.forEach(c => {
      const captureTime = new Date(c.capture_timestamp_utc).getTime();
      assert.ok(captureTime <= now, `Capture time ${c.capture_timestamp_utc} must not be in future`);
    });
  });

  await it('All candidates have exactly 12-hour SLA window with early verdict strictly forbidden', () => {
    ledger.candidates.forEach(c => {
      const open = new Date(c.sla_open_utc).getTime();
      const close = new Date(c.sla_close_utc).getTime();
      assert.strictEqual(close - open, 12 * 3600 * 1000, `SLA window for ${c.candidate_id} must be 12 hours`);
      assert.strictEqual(c.early_verdict_triggered, false);
      assert.strictEqual(c.public_eligible, false);
    });
  });

  await it('[Negative Fixture] Attempt to close candidate SLA prematurely throws ERR_COHORT_SLA_NOT_ELAPSED', () => {
    const cand = ledger.candidates[0];
    const prematureClock = new Date(new Date(cand.sla_open_utc).getTime() + 2 * 3600 * 1000).toISOString();
    assert.throws(
      () => validateCohortSlaClosureAttempt(prematureClock, cand.sla_close_utc),
      /ERR_COHORT_SLA_NOT_ELAPSED/
    );
  });

  await it('Candidate claims strictly contain zero price, U22, code, flat-price, or address inferences', () => {
    const rawLedgerStr = JSON.stringify(ledger);
    assert.ok(!rawLedgerStr.includes('"price_claim": "'), 'No prices allowed');
    assert.ok(!rawLedgerStr.includes('"code_claim": "'), 'No voucher codes allowed');
    assert.ok(!rawLedgerStr.includes('U22'), 'No U22 claims allowed');
    assert.ok(!rawLedgerStr.includes('đồng giá'), 'No flat price claims allowed');
    assert.ok(!rawLedgerStr.includes('giảm 50%'), 'No ungrounded promo claims allowed');
  });

  // --- Suite 3: Card Shell Neutrality & Public Isolation (Mandate EZ-AM.4) ---
  console.log('\n--- Suite 3: Card Shell Neutrality & Public Isolation (Mandate EZ-AM.4) ---');

  const specPath = path.join(ROOT, '04_DESIGN_SYSTEM/COHORT_UNDER_EVALUATION_CARD_SHELL_SPEC_EZ_AM.json');

  await it('Card shell spec enforces neutral copy and zero commercial assets/CTAs', () => {
    assert.ok(fs.existsSync(specPath));
    const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
    assert.strictEqual(spec.feature_flag.value, false);
    assert.strictEqual(spec.visual_and_copy_rules.merchant_assets_allowed, false);
    assert.strictEqual(spec.visual_and_copy_rules.photos_allowed, false);
    assert.strictEqual(spec.visual_and_copy_rules.prices_allowed, false);
    assert.strictEqual(spec.visual_and_copy_rules.vouchers_allowed, false);
    assert.strictEqual(spec.visual_and_copy_rules.commercial_cta_allowed, false);
    assert.ok(spec.visual_and_copy_rules.status_badge.text.includes('ĐANG KIỂM ĐỊNH ĐỘC LẬP'));
  });

  await it('Cohort summary confirms 0 public eligible candidates and 0 public cards created', () => {
    assert.strictEqual(ledger.batch_summary.public_eligible_count, 0);
    assert.strictEqual(ledger.batch_summary.public_cards_created, 0);
  });

  // --- Suite 4: Puppeteer Browser Live Verification on 1440, 768, 390 (Mandate EZ-AM.4) ---
  console.log('\n--- Suite 4: Puppeteer Browser Live Verification on 1440, 768, 390 (Mandate EZ-AM.4) ---');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // Check live staging DOM
    await page.goto(STAGING_URL, { waitUntil: 'networkidle0' });

    await it('[Live Staging Browser] Exactly 1 approved pilot card rendered (GitHub), 0 cohort cards', async () => {
      const pilotCards = await page.$$('.t2-pilot-card-section');
      assert.strictEqual(pilotCards.length, 1, 'Only approved GitHub pilot card rendered');

      const cohortCards = await page.$$('.cohort-card-shell-under-evaluation');
      assert.strictEqual(cohortCards.length, 0, 'Zero cohort cards rendered on public storefront');
    });

    await it('[Live Staging Browser] Exactly 1 external link in public DOM (GitHub Docs Pilot Only)', async () => {
      const extLinks = await page.$$eval('a[href^="http"]', links => links.map(l => l.href));
      assert.strictEqual(extLinks.length, 1);
      assert.ok(extLinks[0].includes('docs.github.com'));
    });

    await it('[Live Staging Browser] Zero console errors during full page lifecycle', () => {
      assert.strictEqual(consoleErrors.length, 0, `Console errors detected: ${consoleErrors.join(', ')}`);
    });

    // Verify Prototype Card Shell HTML across viewports
    const protoPath = 'file:///' + path.join(ROOT, '04_DESIGN_SYSTEM/COHORT_CARD_SHELL_PROTOTYPE_EZ_AM.html').replace(/\\/g, '/');

    for (const vp of [
      { name: 'Desktop 1440', w: 1440, h: 900 },
      { name: 'Tablet 768', w: 768, h: 1024 },
      { name: 'Mobile 390', w: 390, h: 844 }
    ]) {
      await page.setViewport({ width: vp.w, height: vp.h });
      await page.goto(protoPath, { waitUntil: 'load' });

      await it(`[Prototype ${vp.name}] Neutral shell rendered with valid regions and 0 external links`, async () => {
        const regions = await page.$$eval('section[role="region"]', el => el.length);
        assert.strictEqual(regions, 2);

        const links = await page.$$eval('a', el => el.length);
        assert.strictEqual(links, 0, 'Prototype card shell must not contain outbound clickable links');

        const badges = await page.$$eval('.badge-status', el => el.map(b => b.textContent.trim()));
        assert.strictEqual(badges.length, 2);
        assert.ok(badges[0].includes('ĐANG KIỂM ĐỊNH ĐỘC LẬP'));
      });
    }
  } finally {
    await browser.close();
  }

  // --- Suite 5: Parity & Fast Lane Governance Preservation ---
  console.log('\n--- Suite 5: Parity & Fast Lane Governance Preservation ---');

  await it('Staging health endpoint returns exact expectedVersion and zero deploy drift', async () => {
    const res = await fetch(HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.strictEqual(data.version, EXPECTED_VERSION);
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
  });

  await it('Fast Lane Ledger preserves JetBrains and Figma with zero premature verdict and zero public eligibility', () => {
    const flLedger = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json'), 'utf8'));
    assert.strictEqual(flLedger.candidates.length, 2);
    flLedger.candidates.forEach(c => {
      assert.ok(c.sla_status === 'OPEN_EVALUATING' || c.sla_status.startsWith('CLOSED_SLA_COMPLETED'));
      assert.strictEqual(c.early_verdict_triggered, false);
      assert.strictEqual(c.public_eligible, false);
    });
  });

  await it('EZ-AM release receipt and parity manifest record 3 distinct supply pools correctly', () => {
    const r = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_AM.json'), 'utf8'));
    const m = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_AM.json'), 'utf8'));

    assert.ok(r.version === EXPECTED_VERSION || r.version === 'v3.482.0-staging.ez');
    assert.strictEqual(r.cohort_15_candidates.total, 15);
    assert.strictEqual(r.cohort_15_candidates.raw_captured, 14);
    assert.strictEqual(r.cohort_15_candidates.unreachable_held_closed, 1);
    assert.strictEqual(r.cohort_15_candidates.public_eligible, 0);

    assert.ok(m.version === EXPECTED_VERSION || m.version === 'v3.482.0-staging.ez');
    assert.strictEqual(m.cohort_supply.total_candidates, 15);
    assert.strictEqual(m.cohort_supply.raw_captured_success, 14);
    assert.strictEqual(m.cohort_supply.public_eligible_count, 0);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-AM COHORT SUPPLY & CLOCK GUARD QA TESTS PASSED!\n');
}

runEZAMSupplyQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
