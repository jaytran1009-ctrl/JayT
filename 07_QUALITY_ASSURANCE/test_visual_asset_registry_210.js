const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return fs.existsSync(p) ? sha256Buf(fs.readFileSync(p)) : null; }

function runVisualAssetTests210() {
  console.log('========================================================================');
  console.log('🧪 JAYT-210: OFFICIAL VISUAL ASSET PROGRAM TEST SUITE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  const tests = [];
  function record(name, pass, details) {
    tests.push({ name, pass, details });
    console.log((pass ? '  ✅ PASS: ' : '  ❌ FAIL: ') + name + '\n     ' + details);
  }

  const registryPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'brand_asset_registry.json');
  assert(fs.existsSync(registryPath), 'brand_asset_registry.json missing');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

  const jsCode = fs.readFileSync(path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js'), 'utf8');

  // --- TEST 1: 10-FIELD ASSET REGISTRY SCHEMA ---
  try {
    const requiredFields = [
      'asset_id', 'brand_or_venue', 'asset_url', 'source_page_url',
      'asset_sha256', 'branch_relation', 'rights_basis',
      'permission_evidence', 'attribution_text', 'captured_at', 'expiry_or_recheck_date'
    ];

    const assets = registry.registered_assets || [];
    assert(assets.length >= 5, `Expected >= 5 registered assets, got ${assets.length}`);

    for (const a of assets) {
      for (const f of requiredFields) {
        assert(a[f], `Asset ${a.asset_id} missing mandatory field "${f}"`);
      }
    }

    record('TEST_01_ASSET_REGISTRY_10_FIELD_SCHEMA', true, `All ${assets.length} registered assets satisfy the complete 10-field schema.`);
  } catch (err) {
    record('TEST_01_ASSET_REGISTRY_10_FIELD_SCHEMA', false, err.message);
  }

  // --- TEST 2: WIPO RIGHTS BASIS ALLOWLIST ---
  try {
    const validBases = new Set([
      'OFFICIAL_PRESS_KIT_LICENSE',
      'WRITTEN_PERMISSION_FROM_RIGHTSHOLDER',
      'OWNER_UPLOADED_ORIGINAL',
      'PLATFORM_APPROVED_EMBED'
    ]);

    for (const a of registry.registered_assets || []) {
      assert(validBases.has(a.rights_basis), `Asset ${a.asset_id} has invalid rights_basis "${a.rights_basis}"`);
    }

    record('TEST_02_WIPO_RIGHTS_BASIS_ALLOWLIST', true, '100% registered assets conform to approved WIPO 4 rights bases.');
  } catch (err) {
    record('TEST_02_WIPO_RIGHTS_BASIS_ALLOWLIST', false, err.message);
  }

  // --- TEST 3: PHYSICAL ASSET SHA-256 PARITY ---
  try {
    for (const a of registry.registered_assets || []) {
      const physicalPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', a.asset_url);
      assert(fs.existsSync(physicalPath), `Physical asset file missing at: ${physicalPath}`);
      const computedHash = sha256File(physicalPath);
      assert.strictEqual(computedHash, a.asset_sha256, `SHA-256 mismatch for ${a.asset_id}: expected ${a.asset_sha256}, got ${computedHash}`);
    }

    record('TEST_03_PHYSICAL_ASSET_SHA256_PARITY', true, '100% physical asset files exist and match SHA-256 hashes byte-for-byte.');
  } catch (err) {
    record('TEST_03_PHYSICAL_ASSET_SHA256_PARITY', false, err.message);
  }

  // --- TEST 4: UNVERIFIED BRANDS FALLBACK TO MONOGRAM ONLY ---
  try {
    const unverified = registry.unverified_rights_brands || [];
    assert(unverified.length >= 5, `Expected >= 5 unverified brands cataloged, got ${unverified.length}`);

    for (const u of unverified) {
      assert.strictEqual(u.rights_status, 'UNRESOLVED_RIGHTS_MONOGRAM_ONLY');
    }

    record('TEST_04_FALLBACK_MONOGRAM_DISCIPLINE', true, `${unverified.length} brands with unresolved rights safely defaulted to Monogram Crest.`);
  } catch (err) {
    record('TEST_04_FALLBACK_MONOGRAM_DISCIPLINE', false, err.message);
  }

  // --- TEST 5: HEADLINE AND OS 3.350 EXACT MATCH ---
  try {
    assert(jsCode.includes('Hôm nay: 0 🟢 · ${totalBlue} 🔵 ưu đãi chính thức · ${totalPurple} 🟣 nguồn chính thức đã ghi nhận'), 'Headline template missing');
    assert(jsCode.includes('Visual Asset OS 3.350'), 'Visual Asset OS 3.350 badge missing');

    record('TEST_05_HEADLINE_AND_OS_EXACT_MATCH', true, 'Headline template and Visual Asset OS 3.350 match exactly.');
  } catch (err) {
    record('TEST_05_HEADLINE_AND_OS_EXACT_MATCH', false, err.message);
  }

  console.log('\n========================================================================');
  const allPassed = tests.every(t => t.pass);
  if (!allPassed) {
    console.error('❌ JAYT-210 TEST SUITE FAILED!');
    process.exit(1);
  } else {
    console.log(`🎉 ALL ${tests.length}/${tests.length} JAYT-210 TESTS PASSED [100% EXCELLENCE]`);
  }
}

if (require.main === module) {
  runVisualAssetTests210();
}

module.exports = { runVisualAssetTests210 };
