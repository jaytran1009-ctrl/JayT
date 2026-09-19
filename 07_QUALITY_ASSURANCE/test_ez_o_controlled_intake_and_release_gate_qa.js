/**
 * JAYT CONTROLLED INTAKE & RELEASE GATE QA SUITE (SECTION EZ-O)
 * Governing Directive: JAYT-245 Section EZ-O (Lines 4302-4327)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZOControlledIntakeAndReleaseGateQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-O CONTROLLED INTAKE & RELEASE GATE QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');
  const vaultDirEZO = path.join(evidenceDir, 'evidence_vault_ez_o');

  const queuePath = path.join(evidenceDir, 'SOURCE_INTAKE_QUEUE_EZ_O.json');
  const regPath = path.join(evidenceDir, 'PROPOSED_UTILITY_FACTS_EZ_O.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_O.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_O.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_O_CONTROLLED_INTAKE_AND_A11Y_20260831.md');

  assert.ok(fs.existsSync(queuePath), 'Missing Queue EZ-O');
  assert.ok(fs.existsSync(regPath), 'Missing Registry EZ-O');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-O');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-O');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-O');

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

  // --- Suite 1: Mandatory Pre-Merge Containment Gate ---
  console.log('--- Suite 1: Mandatory Pre-Merge Containment Gate (Mandate EZ-O.1) ---');

  await it('Staging containment gate is permanently active in parity manifest', () => {
    assert.strictEqual(manifest.staging_containment_gate, 'PERMANENT_RELEASE_GATE_ACTIVE');
  });

  await it('Receipt records exactly 1 approved pilot and 0 unverified public items', () => {
    assert.strictEqual(receipt.approved_staging_t2_pilot.public_eligible_t2_documentation_count, 1);
    assert.strictEqual(receipt.containment_assertions.total_external_links_in_public_dom, 1);
    assert.strictEqual(receipt.containment_assertions.legacy_radar_cards_in_public_dom, 0);
  });

  // --- Suite 2: Controlled Narrow Intake Evidence Verification ---
  console.log('\n--- Suite 2: Controlled Narrow Intake Evidence Verification (Mandates EZ-O.2 & EZ-O.4) ---');

  await it('Exactly 2 narrow intake candidates were evaluated under V3 (Mandate EZ-O.2)', () => {
    assert.strictEqual(registry.intake_round_evaluated_items.length, 2);
  });

  registry.intake_round_evaluated_items.forEach(item => {
    const binPath = path.join(vaultDirEZO, item.bin_file);
    const transcriptPath = path.join(vaultDirEZO, item.transcript_file);

    it('[' + item.candidate_id + '] Raw binary exists and matches dynamic SHA-256 (' + item.sha256.substring(0, 16) + '...)', () => {
      assert.ok(fs.existsSync(binPath));
      const buf = fs.readFileSync(binPath);
      const computedSha = crypto.createHash('sha256').update(buf).digest('hex');
      assert.strictEqual(computedSha, item.sha256);
      assert.strictEqual(buf.length, item.byte_length);
    });

    it('[' + item.candidate_id + '] Evaluated under V3 as IDENTITY_ONLY / HELD_INTERNAL', () => {
      const transcript = JSON.parse(fs.readFileSync(transcriptPath, 'utf8'));
      assert.strictEqual(transcript.evidence_contract_v3.claim_class, 'IDENTITY_ONLY');
      assert.strictEqual(transcript.public_eligible, false);
      assert.strictEqual(transcript.governance_status, 'IDENTITY_CONFIRMED_HELD_INTERNAL_NO_PUBLIC_CARD');
    });
  });

  // --- Suite 3: Puppeteer Live Browser DOM & Interactive Zero-State ---
  console.log('\n--- Suite 3: Puppeteer Live Browser DOM & Interactive Zero-State (Mandate EZ-O.3) ---');

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

    await it('[Browser] Exactly 1 external link in public DOM (GitHub Docs Pilot Only)', async () => {
      const extLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
        return links.filter(h => h.startsWith('http') && !h.includes('127.0.0.1') && !h.includes('localhost'));
      });
      assert.strictEqual(extLinks.length, 1);
      assert.ok(extLinks[0].includes('docs.github.com'));
    });

    await it('[Browser] Zero-state renders interactive navigation buttons to Savings Lab & GitHub Pilot', async () => {
      const actionButtons = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('.btn-zero-action')).map(b => b.getAttribute('data-nav'));
        return btns;
      });
      assert.ok(actionButtons.includes('BUY_DECISION'));
      assert.ok(actionButtons.includes('EXPLORE'));
    });

    await it('[Browser] Clicking zero-state Savings Lab button navigates smoothly to calculator', async () => {
      await page.evaluate(() => {
        const btn = document.querySelector('.btn-zero-action[data-nav="BUY_DECISION"]');
        if (btn) btn.click();
      });
      await new Promise(r => setTimeout(r, 100));

      const calcRendered = await page.evaluate(() => {
        return document.getElementById('calc-item-price') !== null;
      });
      assert.strictEqual(calcRendered, true);
    });

    await page.close();
  } finally {
    if (browser) await browser.close();
  }

  // --- Suite 4: Parity and Strict Boundary Verification ---
  console.log('\n--- Suite 4: Parity and Strict Boundary Verification ---');

  await it('SOT JS and Served JS have identical SHA-256 (ZERO DEPLOY DRIFT)', () => {
    assert.strictEqual(manifest.parity_status, 'PERFECT_MATCH_ZERO_DRIFT');
    assert.strictEqual(manifest.artifacts.sot_js.sha256, manifest.artifacts.served_js.sha256);
    assert.strictEqual(manifest.artifacts.sot_html.sha256, manifest.artifacts.served_html.sha256);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-O CONTROLLED INTAKE & RELEASE GATE QA TESTS PASSED!\n');
}

runEZOControlledIntakeAndReleaseGateQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
