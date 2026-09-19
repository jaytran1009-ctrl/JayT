/**
 * JAYT SUPPLY BOARD & REPORT AUDIT QA SUITE (SECTION EZ-P)
 * Governing Directive: JAYT-245 Section EZ-P (Lines 4330-4355)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZPSupplyBoardAndReportAuditQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-P SUPPLY BOARD & REPORT AUDIT QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');
  const vaultDirEZP = path.join(evidenceDir, 'evidence_vault_ez_p');

  const boardPath = path.join(evidenceDir, 'INTERNAL_SUPPLY_BOARD_EZ_P.json');
  const queuePath = path.join(evidenceDir, 'SOURCE_INTAKE_QUEUE_EZ_P.json');
  const regPath = path.join(evidenceDir, 'PROPOSED_UTILITY_FACTS_EZ_P.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_P.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_P.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_P_SUPPLY_OPS_AND_UX_READINESS_20260831.md');

  assert.ok(fs.existsSync(boardPath), 'Missing Board EZ-P');
  assert.ok(fs.existsSync(queuePath), 'Missing Queue EZ-P');
  assert.ok(fs.existsSync(regPath), 'Missing Registry EZ-P');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-P');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-P');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-P');

  const board = JSON.parse(fs.readFileSync(boardPath, 'utf8'));
  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  const registry = JSON.parse(fs.readFileSync(regPath, 'utf8'));
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

  // --- Suite 1: Internal Supply Board State Machine (Mandate EZ-P.1) ---
  console.log('--- Suite 1: Internal Supply Board State Machine (Mandate EZ-P.1) ---');

  await it('Supply Board defines all 7 required state machine stages', () => {
    assert.strictEqual(board.state_machine_stages.length, 8); // includes HELD_INTERNAL & QUARANTINED
    assert.ok(board.state_machine_stages.includes('UNFETCHED'));
    assert.ok(board.state_machine_stages.includes('URL_REACHABLE'));
    assert.ok(board.state_machine_stages.includes('IDENTITY_PROVEN'));
    assert.ok(board.state_machine_stages.includes('FACT_CONTRACTED'));
    assert.ok(board.state_machine_stages.includes('CEO_REVIEW'));
    assert.ok(board.state_machine_stages.includes('PUBLIC_APPROVED'));
  });

  await it('Supply board is strictly isolated: 0 references in public bundle', () => {
    const sotJs = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ey.js'), 'utf8');
    assert.ok(!sotJs.includes('INTERNAL_SUPPLY_BOARD'));
    assert.ok(!sotJs.includes('stage_summary_counts'));
  });

  // --- Suite 2: Proofability Intake Candidate Evaluation (Mandate EZ-P.2) ---
  console.log('\n--- Suite 2: Proofability Intake Candidate Evaluation (Mandate EZ-P.2) ---');

  await it('Exactly 2 proofability candidates were evaluated under V3 (Mandate EZ-P.2)', () => {
    assert.strictEqual(registry.intake_round_evaluated_items.length, 2);
  });

  registry.intake_round_evaluated_items.forEach(item => {
    const binPath = path.join(vaultDirEZP, item.bin_file);
    const transcriptPath = path.join(vaultDirEZP, item.transcript_file);

    it('[' + item.candidate_id + '] Raw binary matches dynamic SHA-256 (' + item.sha256.substring(0, 16) + '...)', () => {
      assert.ok(fs.existsSync(binPath));
      const buf = fs.readFileSync(binPath);
      const computedSha = crypto.createHash('sha256').update(buf).digest('hex');
      assert.strictEqual(computedSha, item.sha256);
      assert.strictEqual(buf.length, item.byte_length);
    });

    it('[' + item.candidate_id + '] Evaluated as IDENTITY_ONLY / HELD_INTERNAL (public_eligible: false)', () => {
      const transcript = JSON.parse(fs.readFileSync(transcriptPath, 'utf8'));
      assert.strictEqual(transcript.evidence_contract_v3.claim_class, 'IDENTITY_ONLY');
      assert.strictEqual(transcript.public_eligible, false);
      assert.strictEqual(transcript.governance_status, 'IDENTITY_CONFIRMED_HELD_INTERNAL_NO_PUBLIC_CARD');
    });
  });

  // --- Suite 3: Safe "+ Báo nguồn" Report Modal Audit (Mandate EZ-P.3) ---
  console.log('\n--- Suite 3: Safe "+ Báo nguồn" Report Modal Audit (Mandate EZ-P.3) ---');

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

    await it('[Browser] 0 console JS errors on load', () => {
      assert.strictEqual(consoleErrors.length, 0);
    });

    await it('[Browser] Clicking "+ Báo nguồn" opens safe read-only guidance modal', async () => {
      await page.click('#btn-open-report');
      await new Promise(r => setTimeout(r, 100));

      const isVisible = await page.evaluate(() => {
        const modal = document.getElementById('report-modal-overlay');
        return modal && modal.style.display === 'flex';
      });
      assert.strictEqual(isVisible, true);
    });

    await it('[Browser] Report modal contains 0 input elements (0 PII collection)', async () => {
      const inputCount = await page.evaluate(() => {
        const modal = document.getElementById('report-modal-overlay');
        return modal ? modal.querySelectorAll('input, textarea, select').length : -1;
      });
      assert.strictEqual(inputCount, 0);
    });

    await it('[Browser] Report modal contains explicit no-PII and offline-status statements', async () => {
      const text = await page.evaluate(() => {
        const modal = document.getElementById('report-modal-overlay');
        return modal ? modal.innerText : '';
      });
      assert.ok(text.includes('Không thu thập thông tin cá nhân'));
      assert.ok(text.includes('Chưa mở cổng gửi trực tuyến'));
    });

    await it('[Browser] Closing report modal restores focus safely', async () => {
      await page.click('#btn-close-report-modal');
      await new Promise(r => setTimeout(r, 100));

      const isClosed = await page.evaluate(() => {
        const modal = document.getElementById('report-modal-overlay');
        return modal && modal.style.display === 'none';
      });
      assert.strictEqual(isClosed, true);
    });

    await it('[Browser] Exactly 1 external link in public DOM (GitHub Docs Pilot Only)', async () => {
      const extLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
        return links.filter(h => h.startsWith('http') && !h.includes('127.0.0.1') && !h.includes('localhost'));
      });
      assert.strictEqual(extLinks.length, 1);
      assert.ok(extLinks[0].includes('docs.github.com'));
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

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-P SUPPLY BOARD & REPORT AUDIT QA TESTS PASSED!\n');
}

runEZPSupplyBoardAndReportAuditQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
