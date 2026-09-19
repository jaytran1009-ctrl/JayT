/**
 * JAYT DISCOVERY SEED NEUTRALIZATION TEST SUITE (084B)
 * Directive: JAYT-084B-DISCOVERY-SEED-NEUTRALIZATION
 * 
 * Verifies:
 * 1. 28 official brand discovery seeds exist with neutral copy.
 * 2. 100% absence of price patterns, discount percentages, promo program names, schedules, and conditions.
 * 3. Quarantine vault integrity for Batch 084 (62 files, SHA-256 intact).
 * 4. Production invariants locked [].
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const discoverySeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'discovery_seeds', 'official_brand_discovery_urls.json');
const quarantineManifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_084_false_cdp_incident', 'BATCH_084_QUARANTINE_MANIFEST.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

console.log('🧪 [JAYT-084B-TEST] Khởi chạy bộ kiểm thử Discovery Seed Neutralization 084B...\n');

let passedTests = 0;
const totalTests = 6;

function runTest(testName, testFn) {
  try {
    testFn();
    passedTests++;
    console.log(`  [${testName}]: [PASS]`);
  } catch (err) {
    console.error(`  [${testName}]: [FAIL] - ${err.message}`);
    process.exitCode = 1;
  }
}

// TEST 01: 28 items exist with valid structure
runTest('TEST_01_DISCOVERY_SEEDS_STRUCTURE_28_ITEMS', () => {
  assert.ok(fs.existsSync(discoverySeedPath), 'Discovery seed file missing');
  const seeds = JSON.parse(fs.readFileSync(discoverySeedPath, 'utf8'));
  assert.strictEqual(seeds.length, 28);

  for (const item of seeds) {
    assert.ok(item.brand, 'Missing brand');
    assert.ok(item.sector, 'Missing sector');
    assert.ok(item.domain, 'Missing domain');
    assert.ok(item.discovery_url, 'Missing discovery_url');
    assert.ok(item.description, 'Missing description');
  }
});

// TEST 02: Neutral copy enforced across all descriptions
runTest('TEST_02_ALL_DESCRIPTIONS_EXACTLY_NEUTRAL', () => {
  const seeds = JSON.parse(fs.readFileSync(discoverySeedPath, 'utf8'));
  for (const item of seeds) {
    assert.strictEqual(item.description, 'Cổng thông tin ưu đãi chính thức của thương hiệu',
      `Non-neutral description found for ${item.brand}: "${item.description}"`);
  }
});

// TEST 03: Negative price patterns prohibited
runTest('TEST_03_NEGATIVE_NO_PRICE_PATTERNS', () => {
  const rawText = fs.readFileSync(discoverySeedPath, 'utf8');
  const priceRegex = /\b\d+k\b|\b\d+\.000\b|\bđồng\b|\bvnđ\b/i;
  assert.ok(!priceRegex.test(rawText), `Price pattern detected in discovery seeds file: ${rawText.match(priceRegex)}`);
});

// TEST 04: Negative percentage and promo claim patterns prohibited
runTest('TEST_04_NEGATIVE_NO_PROMO_CLAIMS_OR_PERCENTAGES', () => {
  const rawText = fs.readFileSync(discoverySeedPath, 'utf8');
  const promoClaimRegex = /\b\d+%\b|mua 1 tặng 1|happy hour|freeship|super monday|tri ân|thành viên mới/i;
  assert.ok(!promoClaimRegex.test(rawText), `Promo claim pattern detected in discovery seeds: ${rawText.match(promoClaimRegex)}`);
});

// TEST 05: Quarantine vault 084 remains 100% intact (62 files)
runTest('TEST_05_QUARANTINE_VAULT_084_INTEGRITY', () => {
  assert.ok(fs.existsSync(quarantineManifestPath), 'Quarantine manifest missing');
  const manifest = JSON.parse(fs.readFileSync(quarantineManifestPath, 'utf8'));
  assert.strictEqual(manifest.total_files_quarantined, 62);

  for (const entry of manifest.quarantined_entries) {
    const qAbs = path.join(repoRoot, entry.quarantine_path);
    assert.ok(fs.existsSync(qAbs), `Quarantined file missing on disk: ${entry.quarantine_path}`);
    const actualSha = getSha256(qAbs);
    assert.strictEqual(actualSha, entry.sha256, `Hash mismatch for quarantined file: ${entry.quarantine_path}`);
  }
});

// TEST 06: Production invariants locked []
runTest('TEST_06_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [NEUTRALIZATION-084B-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [NEUTRALIZATION-084B-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
