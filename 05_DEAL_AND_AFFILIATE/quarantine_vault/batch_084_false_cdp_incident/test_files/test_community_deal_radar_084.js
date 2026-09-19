/**
 * JAYT COMMUNITY DEAL RADAR TEST SUITE (084)
 * Directive: JAYT-COMMUNITY-DEAL-RADAR-084
 * 
 * Verifies:
 * 1. 28 official brand sources scanned across 5 sectors with physical snapshots & receipts on disk.
 * 2. 100% byte-for-byte SHA-256 integrity of all artifacts and receipts.
 * 3. 3-Tier architecture integrity (Tier 1 Verified, Tier 2 Signal Radar, Tier 3 Community Reported).
 * 4. Zero fabricated vouchers, zero inferred prices, zero buy CTAs.
 * 5. Production catalog invariant locked [].
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const catalogPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_084_community_deal_radar', 'official_sources_catalog_084.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_084_community_deal_radar', 'BATCH_084_RAW_COLLECTION_MANIFEST.json');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_084_community_deal_radar', 'BATCH_084_RADAR_REVIEW_REGISTRY.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

console.log('🧪 [JAYT-084-TEST] Khởi chạy bộ kiểm thử Community Deal Radar 084...\n');

let passedTests = 0;
const totalTests = 7;

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

// TEST 01: Catalog covers 5 sectors with 25+ major brands
runTest('TEST_01_OFFICIAL_CATALOG_5_SECTORS_COVERAGE', () => {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  assert.ok(catalog.length >= 25, `Expected >= 25 brands, got ${catalog.length}`);

  const sectors = new Set(catalog.map(c => c.sector));
  assert.ok(sectors.has('CINEMA'), 'Missing CINEMA sector');
  assert.ok(sectors.has('FNB_FASTFOOD'), 'Missing FNB_FASTFOOD sector');
  assert.ok(sectors.has('COFFEE_TEA'), 'Missing COFFEE_TEA sector');
  assert.ok(sectors.has('FOOD_AND_RIDE'), 'Missing FOOD_AND_RIDE sector');
  assert.ok(sectors.has('ECOMMERCE_WALLETS'), 'Missing ECOMMERCE_WALLETS sector');
});

// TEST 02: Raw collection manifest integrity on disk
runTest('TEST_02_RAW_COLLECTION_MANIFEST_DISK_INTEGRITY', () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.strictEqual(manifest.total_sources_probed, 28);
  assert.strictEqual(manifest.sources.length, 28);

  for (const src of manifest.sources) {
    const artPath = path.join(repoRoot, src.artifact_path);
    const recPath = path.join(repoRoot, src.receipt_path);

    assert.ok(fs.existsSync(artPath), `Artifact file missing on disk: ${src.artifact_path}`);
    assert.ok(fs.existsSync(recPath), `Receipt file missing on disk: ${src.receipt_path}`);

    const actualArtHash = getSha256(artPath);
    const actualRecHash = getSha256(recPath);

    assert.strictEqual(actualArtHash, src.artifact_sha256, `Artifact hash mismatch for ${src.source_id}`);
    assert.strictEqual(actualRecHash, src.receipt_sha256, `Receipt hash mismatch for ${src.source_id}`);
  }
});

// TEST 03: Receipt Provenance Origin compliance (Framework 083F)
runTest('TEST_03_RECEIPT_PROVENANCE_ORIGIN_COMPLIANCE', () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  for (const src of manifest.sources) {
    const recPath = path.join(repoRoot, src.receipt_path);
    const receiptData = JSON.parse(fs.readFileSync(recPath, 'utf8'));

    assert.strictEqual(receiptData.capture_origin, 'REAL_BROWSER_CDP');
    assert.strictEqual(receiptData.capture_method, 'LIVE_CHROME_CDP_ANONYMOUS');
    assert.strictEqual(receiptData.artifact_type, 'dom_html');
    assert.ok(receiptData.receipt_id.startsWith('RECEIPT_RADAR_084_'));
    assert.ok(receiptData.checked_at.length > 0);
  }
});

// TEST 04: Three-Tier Architecture Integrity
runTest('TEST_04_THREE_TIER_ARCHITECTURE_INTEGRITY', () => {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  assert.strictEqual(registry.batch_work_order, 'JAYT-COMMUNITY-DEAL-RADAR-084');

  assert.ok(registry.tier_1_verified_active.length > 0, 'Tier 1 must contain verified staging references');
  assert.strictEqual(registry.tier_2_signal_radar.length, 28, 'Tier 2 must contain 28 radar items');
  assert.ok(registry.tier_3_community_reported.length > 0, 'Tier 3 must contain community queue');
});

// TEST 05: Zero Fabricated Prices & Zero Fake Vouchers in Radar Layer
runTest('TEST_05_ZERO_FABRICATED_PRICES_IN_RADAR', () => {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

  for (const item of registry.tier_2_signal_radar) {
    assert.strictEqual(item.trust_constraint.prohibit_inferred_prices, true);
    assert.strictEqual(item.trust_constraint.prohibit_fabricated_codes, true);
    assert.strictEqual(item.price_spec, undefined, 'Radar items must not claim inferred prices');
  }

  for (const item of registry.tier_3_community_reported) {
    assert.strictEqual(item.trust_label, '⚠️ CHƯA XÁC MINH');
    assert.strictEqual(item.prohibit_buy_cta, true);
    assert.strictEqual(item.prohibit_price_claim, true);
  }
});

// TEST 06: Staging Tier 1 Lineage Verification
runTest('TEST_06_STAGING_TIER_1_LINEAGE_VERIFICATION', () => {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  for (const item of registry.tier_1_verified_active) {
    assert.ok(item.deal_id.startsWith('DNG-'));
    assert.ok(item.price_spec.length > 0);
    assert.ok(item.terms_summary.length > 0);
    assert.ok(item.validity_window.length > 0);
    assert.ok(item.geographic_scope.length > 0);
  }
});

// TEST 07: Production Invariants Locked
runTest('TEST_07_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [RADAR-084-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [RADAR-084-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
