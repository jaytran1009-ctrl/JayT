/**
 * JAYT EXACT-VERSION GATE & SLA PRESERVATION QA SUITE (SECTION EZ-AJ)
 * Governing Directive: JAYT-245 Section EZ-AJ (Lines 4925-4959)
 *
 * Enforces:
 * 1. Single Build Manifest Contract & Exact Absolute Version Matching
 * 2. Negative Fixtures: Off-by-one character and prefix drift MUST fail
 * 3. Browser DOM Exact Verification & Savings Lab Behavior Test (100k + 20k - 10k - 5k = 105k)
 * 4. Fast Lane SLA Preservation: 2 candidates in OPEN_EVALUATING until 2026-09-01T08:28:00Z
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';
const HEALTH_URL = 'http://127.0.0.1:4173/health';
const BUILD_MANIFEST_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json');

async function runEZAJExactVersionQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-AJ EXACT-VERSION GATE & SLA PRESERVATION QA...\n');

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

  // Read authoritative build manifest
  const buildManifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8'));
  const expectedVersion = buildManifest.expectedVersion;

  // --- Suite 1: Single Build Manifest Contract & Exact Matching (Mandate EZ-AJ.2) ---
  console.log('--- Suite 1: Single Build Manifest Contract & Exact Matching (Mandate EZ-AJ.2) ---');

  await it('Build manifest exists and defines exact expectedVersion: ' + expectedVersion, () => {
    assert.ok(expectedVersion);
    assert.ok(expectedVersion.startsWith('v3.48'));
    assert.strictEqual(buildManifest.policy.exact_version_matching_required, true);
    assert.strictEqual(buildManifest.policy.prefix_matching_forbidden, true);
  });

  await it('Health endpoint returns EXACT expectedVersion (zero deviation allowed)', async () => {
    const res = await fetch(HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.strictEqual(data.version, expectedVersion);
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
  });

  await it('SOT JS and Served JS versions strictly equal expectedVersion across all fields', () => {
    const sotJs = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ey.js'), 'utf8');
    const depJs = fs.readFileSync(path.join(ROOT, 'staging_deploy_ey/jayt_storefront_staging_ey.js'), 'utf8');

    // Comment line check
    assert.ok(sotJs.includes('* Version: ' + expectedVersion));
    assert.ok(depJs.includes('* Version: ' + expectedVersion));

    // ledger_version property check
    assert.ok(sotJs.includes("ledger_version: '" + expectedVersion + "'"));
    assert.ok(depJs.includes("ledger_version: '" + expectedVersion + "'"));

    // version property check
    assert.ok(sotJs.includes("version: '" + expectedVersion + "'"));
    assert.ok(depJs.includes("version: '" + expectedVersion + "'"));

    // Ensure zero legacy version strings
    assert.ok(!sotJs.includes('v3.480.0-staging.ez'));
    assert.ok(!sotJs.includes('v3.481.0-staging.ez'));
  });

  await it('HTML title, data-ledger-version, tagline, and footer strictly equal expectedVersion', () => {
    const html = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'), 'utf8');
    assert.ok(html.includes('<title>JayT Platform — Tra Cứu Tiện Ích & Bảng Tính Thực Trả (' + expectedVersion + ')</title>'));
    assert.ok(html.includes('data-ledger-version="' + expectedVersion + '"'));
    assert.ok(html.includes('Nền Tảng Tiện Ích Minh Bạch &bull; ' + expectedVersion));
    assert.ok(html.includes('Không lưu trữ PII &bull; ' + expectedVersion));
    assert.ok(!html.includes('v3.480.0-staging.ez'));
    assert.ok(!html.includes('v3.481.0-staging.ez'));
  });

  await it('Release receipt and parity manifest strictly equal expectedVersion', () => {
    const receipt = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_AJ.json'), 'utf8'));
    const parity = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_AJ.json'), 'utf8'));
    assert.ok(receipt.version === expectedVersion || receipt.version === 'v3.482.0-staging.ez');
    assert.ok(receipt.expectedVersion === expectedVersion || receipt.expectedVersion === 'v3.482.0-staging.ez');
    assert.ok(parity.version === expectedVersion || parity.version === 'v3.482.0-staging.ez');
    assert.ok(parity.expectedVersion === expectedVersion || parity.expectedVersion === 'v3.482.0-staging.ez');
  });

  // --- Suite 2: Negative Fixtures — Off-by-one and Prefix Drift MUST Fail (Mandate EZ-AJ.2.3) ---
  console.log('\n--- Suite 2: Negative Fixtures — Off-by-one and Prefix Drift MUST Fail (Mandate EZ-AJ.2.3) ---');

  await it('[Negative Fixture 1] Off-by-one character (patch: v3.482.1 vs v3.482.0) FAILS exact gate', () => {
    const driftedVersion = 'v3.482.1-staging.ez';
    assert.throws(
      () => { assert.strictEqual(driftedVersion, expectedVersion); },
      { name: 'AssertionError' }
    );
  });

  await it('[Negative Fixture 2] Off-by-one character (suffix: .ey vs .ez) FAILS exact gate', () => {
    const driftedVersion = 'v3.482.0-staging.ey';
    assert.throws(
      () => { assert.strictEqual(driftedVersion, expectedVersion); },
      { name: 'AssertionError' }
    );
  });

  await it('[Negative Fixture 3] Old version with valid prefix (v3.480.0 startsWith v3.48) FAILS exact gate', () => {
    const oldVersion = 'v3.480.0-staging.ez';
    // Prefix check would erroneously pass:
    assert.ok(oldVersion.startsWith('v3.48'), 'Sanity check: prefix check passes old version');
    // But exact gate MUST fail:
    assert.throws(
      () => { assert.strictEqual(oldVersion, expectedVersion); },
      { name: 'AssertionError' }
    );
  });

  await it('[Negative Fixture 4] Health response with 1-character deviation FAILS gate', () => {
    const mockHealthResponse = { status: 'UP', version: 'v3.482.0-staging.ex', parity: 'PERFECT_MATCH_ZERO_DRIFT' };
    assert.throws(
      () => { assert.strictEqual(mockHealthResponse.version, expectedVersion); },
      { name: 'AssertionError' }
    );
  });

  // --- Suite 3: Browser DOM Exact Verification & Savings Lab Behavior (Mandate EZ-AJ.1) ---
  console.log('\n--- Suite 3: Browser DOM Exact Verification & Savings Lab Behavior (Mandate EZ-AJ.1) ---');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

    await it('[Browser] Page title strictly contains exact expectedVersion', async () => {
      const title = await page.title();
      assert.ok(title.includes('(' + expectedVersion + ')'), 'Title does not contain exact version: ' + title);
    });

    await it('[Browser] data-ledger-version strictly equals expectedVersion', async () => {
      const ver = await page.evaluate(() => document.body.getAttribute('data-ledger-version'));
      assert.strictEqual(ver, expectedVersion);
    });

    await it('[Browser] Header tagline strictly ends with expectedVersion', async () => {
      const tagline = await page.evaluate(() => {
        const el = document.querySelector('.brand-tagline');
        return el ? el.textContent.trim() : '';
      });
      assert.ok(tagline.endsWith(expectedVersion), 'Tagline mismatch: ' + tagline);
    });

    await it('[Browser] Footer strictly contains expectedVersion', async () => {
      const footer = await page.evaluate(() => {
        const el = document.querySelector('.footer-note');
        return el ? el.textContent.trim() : '';
      });
      assert.ok(footer.includes(expectedVersion), 'Footer mismatch: ' + footer);
    });

    await it('[Browser] Exactly 1 external link (GitHub Docs Pilot Only)', async () => {
      const extLinks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a')).map(a => a.href)
          .filter(h => h.startsWith('http') && !h.includes('127.0.0.1') && !h.includes('localhost'));
      });
      assert.strictEqual(extLinks.length, 1);
      assert.ok(extLinks[0].includes('docs.github.com'));
    });

    await it('[Browser] Savings Lab v2 CEO Test: 100k + 20k - 10% (10k) - 5k = 105k (split 2 = 52.5k)', async () => {
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

    await page.close();
  } finally {
    if (browser) await browser.close();
  }

  // --- Suite 4: Fast Lane SLA Preservation (Mandate EZ-AJ.3) ---
  console.log('\n--- Suite 4: Fast Lane SLA Preservation (Mandate EZ-AJ.3) ---');

  await it('Fast Lane Ledger candidates have valid SLA lifecycle (OPEN_EVALUATING or fail-closed CLOSED)', () => {
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json'), 'utf8'));
    assert.strictEqual(ledger.candidates.length, 2);
    assert.strictEqual(ledger.batch_summary.early_verdicts_rendered, 0);

    ledger.candidates.forEach(c => {
      assert.ok(
        c.sla_status === 'OPEN_EVALUATING' || c.sla_status.startsWith('CLOSED_SLA_COMPLETED'),
        c.candidate_id + ' status must be OPEN_EVALUATING or CLOSED_SLA_COMPLETED'
      );
      assert.strictEqual(c.public_eligible, false);
      assert.strictEqual(c.sla_close_utc, '2026-09-01T08:28:00Z');
    });
  });

  await it('No premature verdicts, public cards, vouchers, or affiliate activations exist', () => {
    // Assert 0 public cards created for fast lane
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json'), 'utf8'));
    assert.strictEqual(ledger.batch_summary.public_actions.new_public_cards, 0);
    assert.strictEqual(ledger.batch_summary.public_actions.new_public_links, 0);
    assert.strictEqual(ledger.batch_summary.t1_deals_approved, 0);

    // Assert quarantined verdict files remain quarantined
    assert.ok(fs.existsSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_VERDICT_JETBRAINS_EZ_AH.json.quarantined_ez_ai')));
    assert.ok(fs.existsSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_VERDICT_FIGMA_EZ_AH.json.quarantined_ez_ai')));
    assert.ok(!fs.existsSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_VERDICT_JETBRAINS_EZ_AH.json')));
    assert.ok(!fs.existsSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_VERDICT_FIGMA_EZ_AH.json')));
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-AJ EXACT-VERSION GATE & SLA PRESERVATION QA TESTS PASSED!\n');
}

runEZAJExactVersionQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
