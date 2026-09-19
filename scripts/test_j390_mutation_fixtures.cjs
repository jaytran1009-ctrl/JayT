/**
 * scripts/test_j390_mutation_fixtures.cjs
 * Mandate: JAYT-390 / WORK_ORDER_J390_AUTONOMOUS_GOLIVE (Phase 1: T12_PHYSICAL_PROVENANCE)
 * Authority: DIRECT_CHAIRMAN_AND_CEO_J390_DISPATCH
 *
 * Verifies that the build gate fails immediately on 8 mutation fixtures:
 * 1. MUTATION_01_ID_MISMATCH (Altered SKU ID in registry)
 * 2. MUTATION_02_URL_MISMATCH (Altered canonical URL in registry)
 * 3. MUTATION_03_VARIANT_MISMATCH (Altered variant ID in registry)
 * 4. MUTATION_04_PRICE_MISMATCH (Altered price in registry)
 * 5. MUTATION_05_SWAPPED_MEDIA (Altered media asset path or classification)
 * 6. MUTATION_06_DECLARED_BYTES_HASH_MISMATCH (Corrupted byte size or hash in index/leaf)
 * 7. MUTATION_07_CHALLENGE_STATUS_MASQUERADE (Challenge page falsely claiming is_verified_evidence=true)
 * 8. MUTATION_08_MISSING_PHYSICAL_ARTIFACT (Deleted raw snapshot or deal file on disk)
 */

const fs = require('fs');
const path = require('path');
const { verifyBuildEquality } = require('./verify_j390_build_equality.cjs');

const FIXTURES_DIR = path.resolve('07_QUALITY_ASSURANCE/mutation_fixtures_j390');
if (!fs.existsSync(FIXTURES_DIR)) {
  fs.mkdirSync(FIXTURES_DIR, { recursive: true });
}

const origRegistryPath = path.resolve('03_SOURCE_OF_TRUTH/j387/sku_registry.json');
const origSkuIndexPath = path.resolve('06_TRUST_AND_EVIDENCE/j390/sku_evidence_index.json');
const origDealIndexPath = path.resolve('06_TRUST_AND_EVIDENCE/j390/deal_evidence_index.json');

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
    description: "Mutate media classification in registry copy -> Should fail equality check",
    setup: () => {
      const reg = JSON.parse(fs.readFileSync(origRegistryPath, 'utf8'));
      reg.skus[4].media.media_classification = "VERIFIED_MERCHANT_MEDIA";
      reg.skus[4].media.is_physical_photograph = true;
      const target = path.join(FIXTURES_DIR, 'reg_mutated_media.json');
      fs.writeFileSync(target, JSON.stringify(reg, null, 2));
      return { registryPath: target };
    }
  },
  {
    name: "MUTATION_06_DECLARED_BYTES_HASH_MISMATCH",
    description: "Mutate declared byte count in SKU index copy -> Should fail equality check",
    setup: () => {
      const idx = JSON.parse(fs.readFileSync(origSkuIndexPath, 'utf8'));
      idx.leaves[0].raw_snapshot_bytes = 12345;
      const target = path.join(FIXTURES_DIR, 'sku_index_mutated_bytes.json');
      fs.writeFileSync(target, JSON.stringify(idx, null, 2));
      return { skuIndexPath: target };
    }
  },
  {
    name: "MUTATION_07_CHALLENGE_STATUS_MASQUERADE",
    description: "Falsely claim challenge response is clean verified evidence in leaf -> Should fail gate",
    setup: () => {
      const leavesDir = path.join(FIXTURES_DIR, 'mutated_leaves');
      if (!fs.existsSync(leavesDir)) fs.mkdirSync(leavesDir, { recursive: true });
      const origLeafPath = path.resolve('06_TRUST_AND_EVIDENCE/j390/sku_leaves/sku_leaf_DORM_SKU_01_OCAM_DIENQUANG.json');
      const leaf = JSON.parse(fs.readFileSync(origLeafPath, 'utf8'));
      leaf.snapshot_metadata.is_challenge_page = true;
      leaf.snapshot_metadata.is_verified_evidence = true;
      fs.writeFileSync(path.join(leavesDir, 'sku_leaf_DORM_SKU_01_OCAM_DIENQUANG.json'), JSON.stringify(leaf, null, 2));
      return { skuLeavesDir: leavesDir };
    }
  },
  {
    name: "MUTATION_08_MISSING_PHYSICAL_ARTIFACT",
    description: "Point to non-existent snapshot directory -> Should fail physical existence check",
    setup: () => {
      const emptyDir = path.join(FIXTURES_DIR, 'empty_snapshots');
      if (!fs.existsSync(emptyDir)) fs.mkdirSync(emptyDir, { recursive: true });
      return { rawSnapshotsDir: emptyDir };
    }
  }
];

console.log('================================================================');
console.log('STARTING JAYT-390 MUTATION FIXTURE AUDIT (8 TEST CASES)');
console.log('Mandate: Every mutation fixture MUST be REJECTED (pass: false)');
console.log('================================================================\n');

let passedFixtures = 0;
for (let i = 0; i < testCases.length; i++) {
  const tc = testCases[i];
  console.log(`Running Test Case ${i + 1}/8: ${tc.name}...`);
  console.log(`  Description: ${tc.description}`);

  let opts = {};
  try {
    opts = tc.setup();
  } catch (e) {
    console.error(`  [ERROR during setup]: ${e.message}`);
    continue;
  }

  const result = verifyBuildEquality(opts);
  if (!result.pass) {
    console.log(`  [PASS - CORRECTLY REJECTED]: Gate failed with ${result.errors.length} error(s).`);
    console.log(`  Sample error: ${result.errors[0]}`);
    passedFixtures++;
  } else {
    console.error(`  [FATAL FAILURE]: Gate unexpectedly PASSED mutated state!`);
  }
  console.log('');
}

console.log('================================================================');
console.log(`MUTATION RESULTS: ${passedFixtures}/${testCases.length} MUTATIONS CORRECTLY REJECTED`);
console.log('================================================================');

if (passedFixtures !== testCases.length) {
  console.error('CRITICAL: One or more mutation fixtures were not rejected!');
  process.exit(1);
} else {
  console.log('ALL 8 MUTATION FIXTURES SUCCESSFULLY REJECTED. BUILD GATE IS SOUND.');
}
