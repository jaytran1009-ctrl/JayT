/**
 * JAYT CERTIFIED CAPTURE RED-TEAM TEST SUITE (143R)
 * Directive: JAYT-143R: CAPTURE-PROVENANCE INCIDENT, HARNESS CERTIFICATION & SCHEDULER FREEZE
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('puppeteer');
const { verifyStrictRawCaptureReceipt143R } = require('../05_DEAL_AND_AFFILIATE/strict_receipt_truth_verifier_143r');
const { verifyNormalizedAddressUnits143R } = require('../05_DEAL_AND_AFFILIATE/address_unit_locality_verifier_143r');
const { parseStrictSemanticRootLeaf143R } = require('../05_DEAL_AND_AFFILIATE/strict_semantic_root_dom_parser_143r');
const { checkSchedulerStatus143R } = require('../05_DEAL_AND_AFFILIATE/scheduler_daemon_143r');

console.log('========================================================================');
console.log('🧪 JAYT-143R: CERTIFIED CAPTURE RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const capturesBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_143r_captures');
const brandRegistryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'brand_locality_registry_143r.json');
const batchTablePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_143r_table.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_143r_manifest.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

let passCount = 0;
let failCount = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

async function runCertifiedCaptureAudit() {
  console.log('--- GATE 1: STATIC CODE SCAN (ZERO STATIC DICTIONARIES & ZERO FALLBACKS) ---');
  test('Active data processing pipeline contains 0 occurrences of static dictionary patterns', () => {
    const targetDirs = [
      path.join(repoRoot, '05_DEAL_AND_AFFILIATE'),
      path.join(repoRoot, '07_QUALITY_ASSURANCE')
    ];
    const forbidden = ['leaf' + 'Semantics' + 'Map', 'expected_' + 'da_nang_' + 'verified', 'known_' + 'da_nang_' + 'venues'];
    for (const dir of targetDirs) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('quarantine') && !f.includes('test_certified_capture_143r.js'));
      for (const file of files) {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        for (const word of forbidden) {
          assert(!content.includes(word), `Forbidden static dictionary token '${word}' found in active file ${file}!`);
        }
      }
    }
    console.log('     Scanned all active JS files: ZERO static dictionary tokens found.');
  });

  console.log('\n--- GATE 2: NATIVE RECEIPT PROVENANCE CHECK (BATCH 143R ARTIFACTS) ---');
  test('100% of receipts in batch 143R contain required native network event fields', () => {
    if (!fs.existsSync(capturesBaseDir)) {
      throw new Error('batch_143r_captures folder does not exist yet!');
    }
    const folders = fs.readdirSync(capturesBaseDir).filter(f => f.startsWith('CAP_143_'));
    assert.strictEqual(folders.length, 51, `Expected exactly 51 capture folders, found ${folders.length}`);
    for (const f of folders) {
      const folderPath = path.join(capturesBaseDir, f);
      const receiptTruth = verifyStrictRawCaptureReceipt143R(folderPath);
      assert.notStrictEqual(receiptTruth.capture_run_id, 'RUN_ID_UNPROVEN');
      assert.strictEqual(receiptTruth.capture_method, 'PUPPETEER_NATIVE_EVENT_ONLY');
      assert.notStrictEqual(receiptTruth.browser_version, 'BROWSER_VERSION_UNPROVEN');
    }
    console.log(`     Verified all 51 raw capture receipts adhere strictly to native network events.`);
  });

  console.log('\n--- GATE 3: RECEIPT VERIFIER ENFORCES ZERO SYNTHETIC DEFAULTS ---');
  test('Missing fields in receipt are strictly marked UNPROVEN with zero fallback defaults', () => {
    const dummyEmptyFolder = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'test_dummy_incomplete_receipt_143r');
    fs.mkdirSync(dummyEmptyFolder, { recursive: true });
    fs.writeFileSync(path.join(dummyEmptyFolder, 'page.html'), '<html></html>', 'utf8');
    fs.writeFileSync(path.join(dummyEmptyFolder, 'receipt.json'), JSON.stringify({ receipt_id: 'TEST_INCOMPLETE' }), 'utf8');

    const verified = verifyStrictRawCaptureReceipt143R(dummyEmptyFolder);
    fs.rmSync(dummyEmptyFolder, { recursive: true, force: true });

    assert.strictEqual(verified.final_url, 'FINAL_URL_UNPROVEN');
    assert.strictEqual(verified.redirect_chain, 'REDIRECT_CHAIN_UNPROVEN');
    assert.strictEqual(verified.http_status, 'HTTP_STATUS_UNPROVEN');
    assert.strictEqual(verified.status, 'CAPTURE_RECEIPT_INVALID');
    assert.strictEqual(verified.is_receipt_trusted, false);
    console.log('     Verified incomplete receipt is strictly flagged CAPTURE_RECEIPT_INVALID without defaults.');
  });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  console.log('\n--- GATE 4: LOCALITY DEPENDS ON RECEIPT TRUST ---');
  try {
    const dummyHtmlWithAddress = `
      <html>
        <body>
          <main>
            <div class="store-card">
              <h3>Rạp Chi Nhánh</h3>
              <p>46 Điện Biên Phủ, quận Thanh Khê, TP. Đà Nẵng</p>
            </div>
          </main>
        </body>
      </html>
    `;
    const untrustedReceipt = { is_receipt_trusted: false, status: 'CAPTURE_RECEIPT_INVALID' };
    const resUntrusted = await verifyNormalizedAddressUnits143R(dummyHtmlWithAddress, 'https://test.com', untrustedReceipt, browser);

    assert.strictEqual(resUntrusted.locality_status, 'LOCALITY_PENDING_FRESH_RECEIPT_CERTIFICATION');
    assert.strictEqual(resUntrusted.distinct_normalized_address_units_count, 0);

    console.log('  ✅ PASS: Verified address parser yields LOCALITY_PENDING_FRESH_RECEIPT_CERTIFICATION when receipt is not trusted.');
    passCount++;
  } catch (err) {
    console.error('  ❌ FAIL: Gate 4 failed: ' + err.message);
    failCount++;
  }

  await browser.close();

  console.log('\n--- GATE 5: 51 CAPTURES INVARIANCE (21 LOCATORS + 30 LEAVES/UTILITIES) ---');
  test('Total captures equals 21 locators + 30 non-locators = 51 items', () => {
    const brandRegistry = JSON.parse(fs.readFileSync(brandRegistryPath, 'utf8'));
    const batchTable = JSON.parse(fs.readFileSync(batchTablePath, 'utf8'));

    assert.strictEqual(brandRegistry.total_brands_audited, 21);
    assert.strictEqual(batchTable.total_leaves_and_utilities_evaluated, 30);
    assert.strictEqual(batchTable.total_urls_queued, 51);
    console.log('     Verified 51 captures invariance: 21 locators + 30 non-locators = 51.');
  });

  console.log('\n--- GATE 6: COLLISION COUNT INVARIANCE ---');
  test('Collision count is strictly identical across table and manifest', () => {
    const batchTable = JSON.parse(fs.readFileSync(batchTablePath, 'utf8'));
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    const tableCollisions = batchTable.state_distribution.CAPTURE_IDENTITY_COLLISION;
    const manifestCollisions = manifest.receipt_trust_summary.identity_collisions_detected;

    assert.strictEqual(tableCollisions, manifestCollisions);
    console.log(`     Collision Invariance: ${tableCollisions} == ${manifestCollisions}.`);
  });

  console.log('\n--- GATE 7: AUTOMATED STAGING GATE (CONTINUE_ACQUISITION) ---');
  test('Automated staging gate evaluates CONTINUE_ACQUISITION due to < 10 complete bundles', () => {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.strictEqual(manifest.automated_staging_gate_evaluation.decision_verdict, 'CONTINUE_ACQUISITION');
  });

  console.log('\n--- GATE 8: SCHEDULER DAEMON AUDIT (FROZEN -> STANDBY AFTER CERT) ---');
  test('Autonomous scheduler evaluates CONTINUE_ACQUISITION with locked governance state', () => {
    const schedStatus = checkSchedulerStatus143R();
    assert.strictEqual(schedStatus.staging_gate_status, 'CONTINUE_ACQUISITION');
    assert.strictEqual(schedStatus.governance_lock, 'LIVE_DEPLOYMENT_LOCKED_PENDING_CEO_APPROVAL');
  });

  console.log('\n--- GATE 9: PRODUCTION LOCKED & ZERO LIVE DEPLOYMENT ---');
  test('deals_feed.json is [] and is_approved is false', () => {
    const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
    const prodJson = JSON.parse(prodRaw);
    assert(Array.isArray(prodJson) && prodJson.length === 0);
    const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
    const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;
    assert.strictEqual(isApproved, false);
  });

  console.log('\n========================================================================');
  console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('========================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('✨ ALL 9 JAYT-143R CERTIFIED CAPTURE RED-TEAM TESTS PASSED 100% CLEAN!');
    process.exit(0);
  }
}

runCertifiedCaptureAudit();
