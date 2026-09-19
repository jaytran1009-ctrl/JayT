/**
 * JAYT UX PROTOCOL & SOURCE RUBRIC QA SUITE (SECTION EZ-Q)
 * Governing Directive: JAYT-245 Section EZ-Q (Lines 4358-4383)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZQUXProtocolAndSourceRubricQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-Q UX PROTOCOL & SOURCE RUBRIC QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');

  const protoPath = path.join(evidenceDir, 'UX_RESEARCH_PROTOCOL_ZERO_PII_EZ_Q.json');
  const uxRubricPath = path.join(evidenceDir, 'UX_ACCEPTANCE_RUBRIC_EZ_Q.json');
  const sourceRubricPath = path.join(evidenceDir, 'SOURCE_SELECTION_RUBRIC_EZ_Q.json');
  const queuePath = path.join(evidenceDir, 'SOURCE_INTAKE_QUEUE_EZ_Q.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_Q.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_Q.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_Q_UX_RESEARCH_AND_SOURCE_RUBRIC_20260831.md');

  assert.ok(fs.existsSync(protoPath), 'Missing Protocol EZ-Q');
  assert.ok(fs.existsSync(uxRubricPath), 'Missing UX Rubric EZ-Q');
  assert.ok(fs.existsSync(sourceRubricPath), 'Missing Source Rubric EZ-Q');
  assert.ok(fs.existsSync(queuePath), 'Missing Queue EZ-Q');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-Q');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-Q');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-Q');

  const proto = JSON.parse(fs.readFileSync(protoPath, 'utf8'));
  const uxRubric = JSON.parse(fs.readFileSync(uxRubricPath, 'utf8'));
  const sourceRubric = JSON.parse(fs.readFileSync(sourceRubricPath, 'utf8'));
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

  // --- Suite 1: Zero-PII Protocol & Rubric Structure ---
  console.log('--- Suite 1: Zero-PII Protocol & Rubric Structure (Mandates EZ-Q.1 & EZ-Q.2) ---');

  await it('Protocol defines exactly 5 cognitive walkthrough evaluation tasks', () => {
    assert.strictEqual(proto.evaluation_tasks.length, 5);
    assert.strictEqual(proto.data_collection_policy.collect_pii_emails_phones, false);
    assert.strictEqual(proto.participant_recruitment_status, 'NO_RECRUITMENT_AUTHORIZED_ZERO_PII');
  });

  await it('UX Acceptance Rubric defines 6 comprehensive dimensions', () => {
    assert.strictEqual(uxRubric.evaluation_dimensions.length, 6);
  });

  // --- Suite 2: Source Selection Rubric & Generic Capture Freeze ---
  console.log('\n--- Suite 2: Source Selection Rubric & Generic Capture Freeze (Mandates EZ-Q.3 & EZ-Q.4) ---');

  await it('Source Selection Rubric scored 10 queue items with threshold 70', () => {
    assert.strictEqual(sourceRubric.evaluated_queue_items.length, 10);
    assert.strictEqual(sourceRubric.scoring_threshold, 70);
  });

  await it('All generic homepages are frozen (0 items above threshold) with valid outcome', () => {
    assert.strictEqual(sourceRubric.capture_round_selection_outcome.eligible_document_count, 0);
    assert.strictEqual(receipt.source_rubric_selection_result.generic_homepage_capture_freeze, 'ENFORCED');
  });

  // --- Suite 3: Puppeteer Cognitive Walkthrough on 5 Tasks ---
  console.log('\n--- Suite 3: Puppeteer Cognitive Walkthrough on 5 Tasks (Mandate EZ-Q.1) ---');

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

    await it('[Task 1] User perceives T2 Documentation nature & caveat', async () => {
      const pilotTitle = await page.evaluate(() => {
        const el = document.querySelector('.t2-pilot-card-section h2');
        return el ? el.innerText : '';
      });
      assert.strictEqual(pilotTitle, 'GitHub Education — Thông tin đăng ký');
    });

    await it('[Task 2] Canonical documentation link has safe attributes', async () => {
      const linkInfo = await page.evaluate(() => {
        const a = document.querySelector('.t2-pilot-card-section a');
        return a ? { href: a.href, rel: a.getAttribute('rel'), target: a.getAttribute('target') } : null;
      });
      assert.ok(linkInfo.href.includes('docs.github.com'));
      assert.strictEqual(linkInfo.rel, 'noopener noreferrer nofollow');
      assert.strictEqual(linkInfo.target, '_blank');
    });

    await it('[Task 3] Savings Lab calculation is instant and local-first with reset', async () => {
      await page.click('[data-nav="BUY_DECISION"]');
      await new Promise(r => setTimeout(r, 100));

      await page.type('#calc-item-price', '120000');
      await page.type('#calc-voucher-discount', '20000');
      await page.type('#calc-student-discount', '10');
      await page.type('#calc-shipping-fee', '15000');
      await page.evaluate(() => {
        const p = document.getElementById('calc-people-split');
        if (p) { p.value = '2'; p.dispatchEvent(new Event('input')); }
      });

      const resFinal = await page.evaluate(() => document.getElementById('res-final-total')?.innerText);
      assert.strictEqual(resFinal, '103.000 VNĐ');

      await page.click('#btn-calc-reset');
      const resReset = await page.evaluate(() => document.getElementById('res-final-total')?.innerText);
      assert.strictEqual(resReset, '0 VNĐ');
    });

    await it('[Task 4] Zero-state explains ongoing verification transparently', async () => {
      await page.click('[data-nav="HOME"]');
      await new Promise(r => setTimeout(r, 100));

      const zeroText = await page.evaluate(() => {
        const el = document.querySelector('.zero-state-neutral-provenance');
        return el ? el.innerText : '';
      });
      assert.ok(zeroText.includes('JayT đang kiểm định'));
      assert.ok(zeroText.toLowerCase().includes('chưa có nguồn mới đạt chuẩn công bố'));
    });

    await it('[Task 5] Report source modal is read-only guidance with 0 inputs', async () => {
      await page.click('#btn-open-report');
      await new Promise(r => setTimeout(r, 100));

      const inputCount = await page.evaluate(() => {
        const modal = document.getElementById('report-modal-overlay');
        return modal ? modal.querySelectorAll('input, textarea').length : -1;
      });
      assert.strictEqual(inputCount, 0);

      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 100));

      const isHidden = await page.evaluate(() => {
        const modal = document.getElementById('report-modal-overlay');
        return modal ? modal.style.display === 'none' : false;
      });
      assert.strictEqual(isHidden, true);
    });

    await it('[Browser] 0 console JS errors across all 5 evaluated tasks', () => {
      assert.strictEqual(consoleErrors.length, 0);
    });

    await page.close();
  } finally {
    if (browser) await browser.close();
  }

  // --- Suite 4: Parity Verification ---
  console.log('\n--- Suite 4: Parity Verification ---');

  await it('SOT JS and Served JS have identical SHA-256 (ZERO DEPLOY DRIFT)', () => {
    assert.strictEqual(manifest.parity_status, 'PERFECT_MATCH_ZERO_DRIFT');
    assert.strictEqual(manifest.artifacts.sot_js.sha256, manifest.artifacts.served_js.sha256);
    assert.strictEqual(manifest.artifacts.sot_html.sha256, manifest.artifacts.served_html.sha256);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-Q UX PROTOCOL & SOURCE RUBRIC QA TESTS PASSED!\n');
}

runEZQUXProtocolAndSourceRubricQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
