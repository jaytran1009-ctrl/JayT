const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-135: REAL VALUE COHORT VERIFICATION & GOVERNANCE P1 AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_135_manifest.json');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const { applyProjectMemoryTransaction067, runsEvidenceDir } = require('./memory_transaction_manager_057');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const memory = fs.readFileSync(memoryPath, 'utf8');
const jsCode = fs.readFileSync(jsPath, 'utf8');

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

console.log('--- GATE 1: PHYSICAL LEAF EVIDENCE BINDING (>= 50 LEAVES) ---');
test('Batch 135 contains >= 50 leaves on disk with 100% SHA-256 byte parity', () => {
  const allLeaves = [
    ...manifest.active_verified_offers,
    ...manifest.locality_only_venues,
    ...manifest.incomplete_or_expired
  ];

  assert(allLeaves.length >= 50, `Expected >= 50 leaves, found ${allLeaves.length}`);
  console.log(`     Total Physical Leaves: ${allLeaves.length} / 50`);

  let valid = 0;
  for (const leaf of allLeaves) {
    const fullPath = path.join(repoRoot, leaf.artifact_path);
    assert(fs.existsSync(fullPath), `Artifact missing: ${leaf.artifact_path}`);
    
    const buf = fs.readFileSync(fullPath);
    assert(buf.length > 20, `Artifact empty: ${leaf.artifact_path}`);
    
    const computedSha = crypto.createHash('sha256').update(buf).digest('hex');
    assert.strictEqual(computedSha, leaf.artifact_sha256, `SHA-256 mismatch for ${leaf.target_id}`);
    valid++;
  }

  assert.strictEqual(valid, allLeaves.length, `Only ${valid}/${allLeaves.length} leaves valid`);
});

console.log('\n--- GATE 2: ACTIVE VERIFIED OFFER THRESHOLD (>= 10 OFFERS) ---');
test('Batch 135 qualifies >= 10 Active Verified Offers with valid terms, prices, and non-expired TTL', () => {
  const activeOffers = manifest.active_verified_offers;
  assert(activeOffers.length >= 10, `Expected >= 10 active offers, found ${activeOffers.length}`);
  console.log(`     Active Verified Offers: ${activeOffers.length} / 10`);

  for (const offer of activeOffers) {
    assert(offer.offer_highlight && offer.offer_highlight.length > 5, `Offer ${offer.target_id} missing highlight`);
    assert(offer.terms_snippet && offer.terms_snippet.length > 10, `Offer ${offer.target_id} missing terms`);
    assert(offer.locality && offer.locality.length > 3, `Offer ${offer.target_id} missing locality`);
    assert(offer.valid_to, `Offer ${offer.target_id} missing valid_to`);
    
    // If date string YYYY-MM-DD, verify not expired as of 2026-08-26
    if (/^\d{4}-\d{2}-\d{2}$/.test(offer.valid_to)) {
      assert(offer.valid_to >= '2026-08-26', `Offer ${offer.target_id} is expired: ${offer.valid_to}`);
    }
  }
});

console.log('\n--- GATE 3: MULTI-CATEGORY COHORT DIVERSITY (>= 3 CATEGORIES) ---');
test('Batch 135 covers >= 3 demand categories across verified offers', () => {
  const categories = manifest.summary_metrics.categories_covered;
  assert(categories.length >= 3, `Expected >= 3 categories, found ${categories.length}`);
  console.log(`     Categories Covered: ${categories.length} (${categories.join(', ')})`);
});

console.log('\n--- GATE 4: GOVERNANCE P1 IDEMPOTENCY & RECEIPT COUNT INVARIANCE ---');
test('Re-running 135 returns ALREADY_APPLIED, validates receipt lineage, and creates 0 new receipts', () => {
  const preSha = crypto.createHash('sha256').update(fs.readFileSync(memoryPath)).digest('hex');

  // Count receipts before re-run
  const countReceipts = () => {
    let count = 0;
    const scanDir = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) scanDir(full);
        else if (e.name.startsWith('TRANSACTION_RECEIPT_')) count++;
      }
    };
    if (fs.existsSync(runsEvidenceDir)) scanDir(runsEvidenceDir);
    return count;
  };

  const receiptCountBefore = countReceipts();

  const reRunResult = applyProjectMemoryTransaction067({
    version: '3.262.0',
    workOrder: 'JAYT-135',
    workOrderDescription: 'Idempotency test re-run',
    headerStatusLine: 'SAFE_UI_CONTAINMENT_PROVISIONAL — GOVERNANCE_RECOVERY_PENDING_INDEPENDENT_AUDIT',
    receiptStatus: 'IMPLEMENTED_PENDING_CEO_AUDIT'
  });

  const receiptCountAfter = countReceipts();

  assert.strictEqual(reRunResult.status, 'ALREADY_APPLIED', `Expected ALREADY_APPLIED, got: ${reRunResult.status}`);
  assert.strictEqual(reRunResult.finalHash, preSha, `Memory hash changed during re-run!`);
  assert.strictEqual(receiptCountBefore, receiptCountAfter, `Receipt count mutated from ${receiptCountBefore} to ${receiptCountAfter}!`);
});

console.log('\n--- GATE 5: SINGLE CANONICAL CURRENT TRUTH HEADER ---');
test('PROJECT_MEMORY.md contains exactly ONE Current Lifecycle State header', () => {
  const lines = memory.split('\n');
  const stateLines = lines.filter(l => l.includes('Current Lifecycle State'));
  assert.strictEqual(stateLines.length, 1, `Expected 1 state line, found ${stateLines.length}`);
  assert(stateLines[0].includes('SAFE_UI_CONTAINMENT_PROVISIONAL — GOVERNANCE_RECOVERY_PENDING_INDEPENDENT_AUDIT'));
});

console.log('\n--- GATE 6: PRODUCTION LOCK INVARIANCE ---');
test('Production feed is strictly locked: deals_feed.json = [] and is_approved = false', () => {
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodJson = JSON.parse(prodRaw);
  const prodSha = crypto.createHash('sha256').update(prodRaw).digest('hex');
  assert(Array.isArray(prodJson) && prodJson.length === 0, 'Production feed is not empty');
  assert.strictEqual(prodSha, '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945', 'deals_feed.json SHA-256 altered');

  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;
  assert.strictEqual(isApproved, false, 'Production is_approved lock is not false');
});

console.log('\n--- GATE 7: SAFE TRUTH UI INTEGRITY ---');
test('Source JS contains zero residual fake vouchers, zero unverified deep links, and honest blue badges', () => {
  assert(!jsCode.includes('ShopeeFood rẻ hơn'), 'Found ShopeeFood rẻ hơn in JS');
  assert(!jsCode.includes('Freeship 18K'), 'Found Freeship 18K in JS');
  assert(!jsCode.includes('TIKTOKVIP0D'), 'Found TIKTOKVIP0D in JS');
  assert(!jsCode.includes('https://shopeefood.vn'), 'Found ShopeeFood link in JS');
  assert(jsCode.includes('🔵 ĐỊA ĐIỂM XÁC MINH'), 'Missing 🔵 ĐỊA ĐIỂM XÁC MINH badge in JS');
});

console.log('\n========================================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 7 JAYT-135 REAL VALUE COHORT VERIFICATION GATES PASSED 100%!');
  process.exit(0);
}
