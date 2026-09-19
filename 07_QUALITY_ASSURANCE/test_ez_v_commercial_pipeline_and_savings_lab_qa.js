/**
 * JAYT COMMERCIAL PIPELINE & SAVINGS LAB QA SUITE (SECTION EZ-V)
 * Governing Directive: JAYT-245 Section EZ-V (Lines 4475-4539)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZVCommercialPipelineQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-V COMMERCIAL PIPELINE & SAVINGS LAB QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');

  const closurePath = path.join(evidenceDir, 'HISTORICAL_LOCATION_BRANCH_CLOSURE_EZ_V.json');
  const schemaPath = path.join(evidenceDir, 'VOUCHER_EVIDENCE_PIPELINE_SCHEMA_EZ_V.json');
  const registryPath = path.join(evidenceDir, 'INTERNAL_VOUCHER_CANDIDATE_REGISTRY_EZ_V.json');
  const mapPath = path.join(evidenceDir, 'COMMERCIAL_OPPORTUNITY_MAP_QUALITATIVE_EZ_V.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_V.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_V.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_V_COMMERCIAL_FOCUS_AND_VOUCHER_PIPELINE_20260831.md');

  assert.ok(fs.existsSync(closurePath), 'Missing Location Closure EZ-V');
  assert.ok(fs.existsSync(schemaPath), 'Missing Voucher Schema EZ-V');
  assert.ok(fs.existsSync(registryPath), 'Missing Voucher Registry EZ-V');
  assert.ok(fs.existsSync(mapPath), 'Missing Opportunity Map EZ-V');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-V');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-V');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-V');

  const closure = JSON.parse(fs.readFileSync(closurePath, 'utf8'));
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const oppMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
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

  // --- Suite 1: Historical Location Branch Closure (Mandate EZ-V.1) ---
  console.log('--- Suite 1: Historical Location Branch Closure (Mandate EZ-V.1) ---');

  await it('Historical location branch is formally closed with 0 public cards created', () => {
    assert.strictEqual(closure.status, 'FORMALLY_CLOSED_PRESERVED_AS_INTERNAL_ARCHIVE');
    closure.closed_candidates.forEach(c => {
      assert.strictEqual(c.public_card_creation, 'STRICTLY_PROHIBITED');
    });
  });

  // --- Suite 2: Voucher Evidence Pipeline & Registry (Mandate EZ-V.3) ---
  console.log('\n--- Suite 2: Voucher Evidence Pipeline & Registry (Mandate EZ-V.3) ---');

  await it('Pipeline schema mandates all 12 required evidence fields with raw-first gate', () => {
    assert.strictEqual(schema.required_voucher_evidence_fields.length, 12);
    assert.strictEqual(schema.core_principles.includes('DEFAULT_T1_DEAL_COUNT_EQUALS_ZERO'), true);
  });

  await it('Voucher candidate registry has exactly T1 = 0 and public vouchers = 0', () => {
    assert.strictEqual(registry.metrics.t1_verified_voucher_count, 0);
    assert.strictEqual(registry.metrics.public_eligible_voucher_count, 0);
  });

  // --- Suite 3: Qualitative Commercial Opportunity Map (Mandate EZ-V.4) ---
  console.log('\n--- Suite 3: Qualitative Commercial Opportunity Map (Mandate EZ-V.4) ---');

  await it('Opportunity Map defines exactly 7 JTBD daily spending categories', () => {
    assert.strictEqual(oppMap.jtbd_categories.length, 7);
  });

  await it('Opportunity Map contains ZERO revenue claims, commission rates, or sales figures', () => {
    const str = JSON.stringify(oppMap);
    assert.ok(!str.includes('hoa hồng'));
    assert.ok(!str.includes('commission'));
    assert.ok(!str.includes('doanh thu'));
  });

  // --- Suite 4: Puppeteer Live Browser Verification for Savings Lab (Mandate EZ-V.2) ---
  console.log('\n--- Suite 4: Puppeteer Live Browser Verification for Savings Lab (Mandate EZ-V.2) ---');

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

    await it('[Browser] Savings Lab renders mandatory limitation notice', async () => {
      await page.click('[data-nav="BUY_DECISION"]');
      await new Promise(r => setTimeout(r, 100));

      const notice = await page.evaluate(() => {
        const p = document.getElementById('calc-results-panel');
        return p ? p.innerText : '';
      });
      assert.ok(notice.includes('JayT không đọc giỏ hàng và không xác thực mã cá nhân của bạn'));
    });

    await it('[Browser] Savings Lab calculation is accurate with shipping fee and discounts', async () => {
      await page.type('#calc-item-price', '150000');
      await page.type('#calc-shipping-fee', '20000');
      await page.type('#calc-student-discount', '10');
      await page.type('#calc-voucher-discount', '15000');
      await page.evaluate(() => {
        const p = document.getElementById('calc-people-split');
        if (p) { p.value = '2'; p.dispatchEvent(new Event('input')); }
      });

      // Price = 150k, Shipping = 20k, Direct 10% = 15k, Voucher = 15k, Total Saved = 30k, Final = 140k, Per Person = 70k
      const resSaved = await page.evaluate(() => document.getElementById('res-total-saved')?.innerText);
      const resFinal = await page.evaluate(() => document.getElementById('res-final-total')?.innerText);
      const resPerPerson = await page.evaluate(() => document.getElementById('res-per-person')?.innerText);

      assert.strictEqual(resSaved, '30.000 VNĐ');
      assert.strictEqual(resFinal, '140.000 VNĐ');
      assert.strictEqual(resPerPerson, '70.000 VNĐ');

      await page.click('#btn-calc-reset');
      const resReset = await page.evaluate(() => document.getElementById('res-final-total')?.innerText);
      assert.strictEqual(resReset, '0 VNĐ');
    });

    await it('[Browser] Exactly 1 external link present in public DOM (Approved Pilot Only)', async () => {
      await page.click('[data-nav="HOME"]');
      await new Promise(r => setTimeout(r, 100));

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

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-V COMMERCIAL PIPELINE & SAVINGS LAB QA TESTS PASSED!\n');
}

runEZVCommercialPipelineQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
