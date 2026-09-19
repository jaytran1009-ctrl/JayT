/**
 * scripts/test_j389_mutation_fixtures.cjs
 * Mandate: JAYT-389 / WORK_ORDER_J389_PROVENANCE_HARVEST
 *
 * Verifies that the build gate fails immediately on 8 mutation fixtures:
 * 1. MUTATION_ID_MISMATCH (Altered SKU ID in registry)
 * 2. MUTATION_URL_MISMATCH (Altered canonical URL in registry)
 * 3. MUTATION_VARIANT_MISMATCH (Altered variant ID in registry)
 * 4. MUTATION_PRICE_MISMATCH (Altered price in registry)
 * 5. MUTATION_SWAPPED_MEDIA (Altered media asset path or classification)
 * 6. MUTATION_DECLARED_BYTES_HASH_MISMATCH (Corrupted byte size or hash in index/leaf)
 * 7. MUTATION_CHALLENGE_STATUS_MASQUERADE (Challenge page falsely claiming is_verified_evidence=true)
 * 8. MUTATION_MISSING_PHYSICAL_ARTIFACT (Deleted raw snapshot or deal file on disk)
 */

const fs = require('fs');
const path = require('path');
const { verifyBuildEquality } = require('./verify_j389_build_equality.cjs');

const FIXTURES_DIR = path.resolve('07_QUALITY_ASSURANCE/mutation_fixtures_j389');
if (!fs.existsSync(FIXTURES_DIR)) {
  fs.mkdirSync(FIXTURES_DIR, { recursive: true });
}

const origRegistryPath = path.resolve('03_SOURCE_OF_TRUTH/j387/sku_registry.json');
const origSkuIndexPath = path.resolve('06_TRUST_AND_EVIDENCE/j389/sku_evidence_index.json');
const origDealIndexPath = path.resolve('06_TRUST_AND_EVIDENCE/j389/deal_evidence_index.json');

const testCases = [
  {
    name: "MUTATION_01_ID_MISMATCH",
    description: "Mutate itemId of SKU 01 in registry copy -> Should fail equality check",
    setup: () => {
      const reg = JSON.parse(fs.readFileSync(origRegistryPath, 'utf8'));
      reg.skus[0].itemId = "DORM_SKU_MUTATED_ID_999";
      const target = path.join(FIXTURES_DIR, 'reg_mutated_id.json');
      fs.writeFileSync(target, JSON.stringify(reg, null, 2));
      return { registryPath: target };
    }
  },
  {
    name: "MUTATION_02_URL_MISMATCH",
    description: "Mutate canonical_url of SKU 02 in registry copy -> Should fail equality check",
    setup: () => {
      const reg = JSON.parse(fs.readFileSync(origRegistryPath, 'utf8'));
      reg.skus[1].canonical_url = "https://shopee.vn/tampered-url-sku-02";
      const target = path.join(FIXTURES_DIR, 'reg_mutated_url.json');
      fs.writeFileSync(target, JSON.stringify(reg, null, 2));
      return { registryPath: target };
    }
  },
  {
    name: "MUTATION_03_VARIANT_MISMATCH",
    description: "Mutate variant_id of SKU 03 in registry copy -> Should fail equality check",
    setup: () => {
      const reg = JSON.parse(fs.readFileSync(origRegistryPath, 'utf8'));
      reg.skus[2].variant_id = "TAMPERED_VARIANT_XYZ";
      const target = path.join(FIXTURES_DIR, 'reg_mutated_variant.json');
      fs.writeFileSync(target, JSON.stringify(reg, null, 2));
      return { registryPath: target };
    }
  },
  {
    name: "MUTATION_04_PRICE_MISMATCH",
    description: "Mutate observed_price of SKU 04 in registry copy -> Should fail equality check",
    setup: () => {
      const reg = JSON.parse(fs.readFileSync(origRegistryPath, 'utf8'));
      reg.skus[3].observed_price = 99999999;
      const target = path.join(FIXTURES_DIR, 'reg_mutated_price.json');
      fs.writeFileSync(target, JSON.stringify(reg, null, 2));
      return { registryPath: target };
    }
  },
  {
    name: "MUTATION_05_SWAPPED_MEDIA",
    description: "Mutate media asset path of SKU 05 in registry copy -> Should fail equality check",
    setup: () => {
      const reg = JSON.parse(fs.readFileSync(origRegistryPath, 'utf8'));
      reg.skus[4].media.asset_path = "assets/images/products/unauthorized_photo.png";
      const target = path.join(FIXTURES_DIR, 'reg_mutated_media.json');
      fs.writeFileSync(target, JSON.stringify(reg, null, 2));
      return { registryPath: target };
    }
  },
  {
    name: "MUTATION_06_DECLARED_BYTES_HASH_MISMATCH",
    description: "Corrupt declared raw snapshot byte length in SKU evidence index -> Should fail equality check",
    setup: () => {
      const idx = JSON.parse(fs.readFileSync(origSkuIndexPath, 'utf8'));
      idx.leaves[0].raw_snapshot_bytes = 9999999; // Corrupted byte count
      const target = path.join(FIXTURES_DIR, 'idx_corrupted_bytes.json');
      fs.writeFileSync(target, JSON.stringify(idx, null, 2));
      return { skuIndexPath: target };
    }
  },
  {
    name: "MUTATION_07_CHALLENGE_STATUS_MASQUERADE",
    description: "Falsely set is_verified_evidence=true on a challenge page leaf -> Should fail equality check",
    setup: () => {
      // Create a temporary mutated leaf directory
      const tempLeavesDir = path.join(FIXTURES_DIR, 'mutated_leaves');
      if (!fs.existsSync(tempLeavesDir)) fs.mkdirSync(tempLeavesDir, { recursive: true });
      const origLeaves = fs.readdirSync('06_TRUST_AND_EVIDENCE/j389/sku_leaves');
      for (const f of origLeaves) {
        fs.copyFileSync(path.join('06_TRUST_AND_EVIDENCE/j389/sku_leaves', f), path.join(tempLeavesDir, f));
      }
      // Mutate leaf 1
      const leaf1Path = path.join(tempLeavesDir, 'sku_leaf_DORM_SKU_01_OCAM_DIENQUANG.json');
      const leaf1 = JSON.parse(fs.readFileSync(leaf1Path, 'utf8'));
      leaf1.snapshot_metadata.is_challenge_page = true;
      leaf1.snapshot_metadata.is_verified_evidence = true; // Masquerade!
      fs.writeFileSync(leaf1Path, JSON.stringify(leaf1, null, 2));
      return { skuLeavesDir: tempLeavesDir };
    }
  },
  {
    name: "MUTATION_08_MISSING_PHYSICAL_ARTIFACT",
    description: "Point raw snapshots to a directory missing SKU 01 raw file -> Should fail equality check",
    setup: () => {
      const tempRawDir = path.join(FIXTURES_DIR, 'temp_raw_missing_file');
      if (!fs.existsSync(tempRawDir)) fs.mkdirSync(tempRawDir, { recursive: true });
      const origFiles = fs.readdirSync('06_TRUST_AND_EVIDENCE/j389/raw_snapshots');
      // Copy all except the first one
      for (let i = 1; i < origFiles.length; i++) {
        fs.copyFileSync(
          path.join('06_TRUST_AND_EVIDENCE/j389/raw_snapshots', origFiles[i]),
          path.join(tempRawDir, origFiles[i])
        );
      }
      return { rawSnapshotsDir: tempRawDir };
    }
  }
];

function runMutationTests() {
  console.log(`[J389 MUTATION TESTS] Running ${testCases.length} mutation fixtures...`);
  let passedFixtures = 0;
  const results = [];

  for (const tc of testCases) {
    const opts = tc.setup();
    const result = verifyBuildEquality(opts);

    // Build equality must REJECT (pass === false) the mutated build!
    if (!result.pass) {
      passedFixtures++;
      console.log(`[PASS - MUTATION REJECTED AS EXPECTED] ${tc.name}`);
      console.log(`  Reason: ${result.errors[0]}`);
      results.push({
        test: tc.name,
        verdict: "PASS__MUTATION_REJECTED",
        rejection_error: result.errors[0]
      });
    } else {
      console.error(`[FAIL - MUTATION NOT DETECTED!] ${tc.name}`);
      results.push({
        test: tc.name,
        verdict: "FAIL__MUTATION_PERMITTED_LEAK"
      });
    }
  }

  // Cleanup fixtures dir
  try {
    fs.rmSync(FIXTURES_DIR, { recursive: true, force: true });
  } catch (e) {}

  console.log(`\n========================================`);
  console.log(`J389 Mutation Fixtures: ${passedFixtures}/${testCases.length} PASS`);
  console.log(`========================================`);

  if (passedFixtures !== testCases.length) {
    process.exit(1);
  }
}

runMutationTests();
