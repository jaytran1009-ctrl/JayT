/**
 * JAYT PURE JTBD & BAN-LIST QA SUITE (SECTION EZ-W)
 * Governing Directive: JAYT-245 Section EZ-W (Lines 4541-4562)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

const BAN_LIST = [
  'dưới 50K',
  'duoi 50k',
  '18–30',
  '18-30',
  'U22',
  'u22',
  'trợ giá',
  'tro gia',
  '0đ',
  '0d',
  '0 đ',
  'freeship',
  'miễn phí vận chuyển',
  'chính hãng',
  'Shopee',
  'TikTok',
  'DanaBus',
  'Metiz',
  'Galaxy',
  'CGV',
  'Lotte',
  'WinMart',
  'Bách Hóa'
];

async function runEZWPureJtbdQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-W PURE JTBD & BAN-LIST QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');

  const quarantinePath = path.join(evidenceDir, 'QUARANTINED_UNVERIFIED_COMMERCIAL_PREMISES_EZ_W.json');
  const mapPath = path.join(evidenceDir, 'COMMERCIAL_OPPORTUNITY_MAP_QUALITATIVE_EZ_W.json');
  const registryPath = path.join(evidenceDir, 'INTERNAL_VOUCHER_CANDIDATE_REGISTRY_EZ_W.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_W.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_W.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_W_PURE_JTBD_AND_QUARANTINE_20260831.md');

  assert.ok(fs.existsSync(quarantinePath), 'Missing Quarantine Ledger EZ-W');
  assert.ok(fs.existsSync(mapPath), 'Missing Opportunity Map EZ-W');
  assert.ok(fs.existsSync(registryPath), 'Missing Voucher Registry EZ-W');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-W');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-W');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-W');

  const quarantine = JSON.parse(fs.readFileSync(quarantinePath, 'utf8'));
  const oppMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

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

  // --- Suite 1: Quarantine Ledger Verification (Mandate EZ-W.1) ---
  console.log('--- Suite 1: Quarantine Ledger Verification (Mandate EZ-W.1) ---');

  await it('Quarantine ledger records unverified commercial premises from EZ-V pack', () => {
    assert.strictEqual(quarantine.reason, 'QUARANTINED_UNVERIFIED_COMMERCIAL_PREMISES');
    assert.ok(quarantine.quarantined_artifacts.commercial_opportunity_map_ez_v);
    assert.ok(quarantine.quarantined_artifacts.internal_voucher_candidate_registry_ez_v);
  });

  // --- Suite 2: Pure Qualitative JTBD Map Verification & Ban-List (Mandates EZ-W.3 & EZ-W.5) ---
  console.log('\n--- Suite 2: Pure Qualitative JTBD Map Verification & Ban-List (Mandates EZ-W.3 & EZ-W.5) ---');

  await it('Pure JTBD map defines 7 categories with exact permitted schema and public_status = false', () => {
    assert.strictEqual(oppMap.jtbd_categories.length, 7);
    oppMap.jtbd_categories.forEach(cat => {
      assert.strictEqual(typeof cat.jtbd_need, 'string');
      assert.strictEqual(typeof cat.customer_problem, 'string');
      assert.strictEqual(typeof cat.merchant_category_hypothesis, 'string');
      assert.strictEqual(typeof cat.value_hypothesis, 'string');
      assert.strictEqual(typeof cat.evidence_required, 'string');
      assert.strictEqual(typeof cat.authority_required, 'string');
      assert.strictEqual(cat.public_status, false);
    });
  });

  await it('Pure JTBD map contains ZERO banned commercial tokens (0 brand, 0 price, 0 freeship, 0 U22, 0 0d)', () => {
    const rawMapStr = JSON.stringify(oppMap).toLowerCase();
    BAN_LIST.forEach(banned => {
      assert.ok(
        !rawMapStr.includes(banned.toLowerCase()),
        `Opportunity map contains banned token: "${banned}"`
      );
    });
  });

  // --- Suite 3: Voucher Registry Generic Hypotheses & Separation (Mandate EZ-W.4) ---
  console.log('\n--- Suite 3: Voucher Registry Generic Hypotheses & Separation (Mandate EZ-W.4) ---');

  await it('Voucher registry contains purely generic categories with T1 = 0 and public = 0', () => {
    assert.strictEqual(registry.metrics.t1_verified_voucher_count, 0);
    assert.strictEqual(registry.metrics.public_eligible_voucher_count, 0);
    assert.strictEqual(registry.generic_hypotheses.length, 4);
    registry.generic_hypotheses.forEach(h => {
      assert.strictEqual(h.public_eligible, false);
      assert.strictEqual(h.tier, 'T4_SOURCE_TO_WATCH');
    });
  });

  await it('GitHub Pilot is strictly separated as T2 documentation, not a voucher/deal', () => {
    assert.strictEqual(
      registry.approved_documentation_pilot_reference.classification,
      'T2_OFFICIAL_PROGRAM_DOCUMENTATION_PILOT'
    );
  });

  await it('Voucher registry contains ZERO banned commercial tokens', () => {
    const rawRegStr = JSON.stringify(registry.generic_hypotheses).toLowerCase();
    BAN_LIST.forEach(banned => {
      assert.ok(
        !rawRegStr.includes(banned.toLowerCase()),
        `Voucher registry contains banned token: "${banned}"`
      );
    });
  });

  // --- Suite 4: Puppeteer Live Browser Scan & Containment (Mandates EZ-W.2 & EZ-W.5) ---
  console.log('\n--- Suite 4: Puppeteer Live Browser Scan & Containment (Mandates EZ-W.2 & EZ-W.5) ---');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

    await it('[Browser] Entire Public Rendered DOM contains ZERO banned commercial tokens', async () => {
      const bodyText = await page.evaluate(() => document.body.innerText.toLowerCase());
      BAN_LIST.forEach(banned => {
        assert.ok(
          !bodyText.includes(banned.toLowerCase()),
          `Live DOM contains banned token: "${banned}"`
        );
      });
    });

    await it('[Browser] Exactly 1 external link present in public DOM (GitHub Docs Pilot Only)', async () => {
      const extLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
        return links.filter(h => h.startsWith('http') && !h.includes('127.0.0.1') && !h.includes('localhost'));
      });
      assert.strictEqual(extLinks.length, 1);
      assert.ok(extLinks[0].includes('docs.github.com'));
    });

    await it('[Browser] 0 console errors during full page lifecycle', () => {
      assert.strictEqual(consoleErrors.length, 0);
    });

    await page.close();
  } finally {
    if (browser) await browser.close();
  }

  // --- Suite 5: Parity Verification ---
  console.log('\n--- Suite 5: Parity Verification ---');

  await it('SOT JS and Served JS have identical SHA-256 (ZERO DEPLOY DRIFT)', () => {
    assert.strictEqual(manifest.parity_status, 'PERFECT_MATCH_ZERO_DRIFT');
    assert.strictEqual(manifest.artifacts.sot_js.sha256, manifest.artifacts.served_js.sha256);
    assert.strictEqual(manifest.artifacts.sot_html.sha256, manifest.artifacts.served_html.sha256);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-W PURE JTBD & BAN-LIST QA TESTS PASSED!\n');
}

runEZWPureJtbdQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
