/**
 * scripts/verify_j389_build_equality.cjs
 * Mandate: JAYT-389 / WORK_ORDER_J389_PROVENANCE_HARVEST (Build and Release Gate)
 * Authority: CHAIRMAN_AND_CEO_J389_DISPATCH
 *
 * Verifies:
 * 1. 1-to-1 equality between Registry, UI J387_DORM_SKUS, Worker AUDITED_CATALOGUE, and SKU Evidence Index.
 * 2. Physical on-disk existence, exact byte size, and SHA-256 match for all 30 SKU raw snapshots and 30 SKU leaves.
 * 3. Challenge / blocked status truthfulness (challenge pages must NEVER masquerade as clean verified evidence).
 * 4. Physical on-disk existence, exact byte size, and SHA-256 match for all 15 Da Nang deal artifacts.
 * 5. 100% eradication of self-referential jayt.vn URLs in deal evidence.
 * 6. Provider attribution verification (affiliate_enabled: false, clicks_are_not_revenue: true).
 * 7. Fails build immediately if any mismatch, corruption, masquerade or missing file is detected.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function computeFileSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function verifyBuildEquality(customOptions = {}) {
  const registryPath = customOptions.registryPath || path.resolve('03_SOURCE_OF_TRUTH/j387/sku_registry.json');
  const apexPath = customOptions.apexPath || path.resolve('deploy/jayt_apex_interface.js');
  const healthCheckPath = customOptions.healthCheckPath || path.resolve('deploy/api/health-check.js');
  const skuIndexPath = customOptions.skuIndexPath || path.resolve('06_TRUST_AND_EVIDENCE/j389/sku_evidence_index.json');
  const dealIndexPath = customOptions.dealIndexPath || path.resolve('06_TRUST_AND_EVIDENCE/j389/deal_evidence_index.json');
  const attributionPath = customOptions.attributionPath || path.resolve('06_TRUST_AND_EVIDENCE/j389/provider_attribution_validation.json');
  const rawSnapshotsDir = customOptions.rawSnapshotsDir || path.resolve('06_TRUST_AND_EVIDENCE/j389/raw_snapshots');
  const skuLeavesDir = customOptions.skuLeavesDir || path.resolve('06_TRUST_AND_EVIDENCE/j389/sku_leaves');
  const dealsDir = customOptions.dealsDir || path.resolve('06_TRUST_AND_EVIDENCE/j389/deals');

  const errors = [];
  const checks = [];

  // 1. Load Registry
  if (!fs.existsSync(registryPath)) {
    return { pass: false, errors: ['Registry file missing: ' + registryPath] };
  }
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const regSkus = registry.skus || [];

  if (regSkus.length !== 30) {
    errors.push(`Registry has ${regSkus.length} SKUs, expected exactly 30.`);
  }

  const regMap = new Map();
  for (const s of regSkus) {
    if (regMap.has(s.itemId)) {
      errors.push(`Duplicate itemId in registry: ${s.itemId}`);
    }
    regMap.set(s.itemId, s);
  }

  // 2. Load UI SKUs from apex interface
  if (!fs.existsSync(apexPath)) {
    return { pass: false, errors: ['Apex interface file missing: ' + apexPath] };
  }
  const apexCode = fs.readFileSync(apexPath, 'utf8');
  const apexMatch = apexCode.match(/const J387_DORM_SKUS = (\[[\s\S]*?\n\];)/);
  if (!apexMatch) {
    errors.push('Cannot find "const J387_DORM_SKUS = [...]" in ' + apexPath);
  }
  let uiSkus = [];
  try {
    uiSkus = eval(apexMatch ? apexMatch[1] : '[]');
  } catch (e) {
    errors.push('Failed to evaluate J387_DORM_SKUS in apex: ' + e.message);
  }

  const uiMap = new Map();
  for (const s of uiSkus) {
    const id = s.sku_id || s.itemId;
    if (uiMap.has(id)) {
      errors.push(`Duplicate SKU ID in UI: ${id}`);
    }
    uiMap.set(id, s);
  }

  // 3. Load AUDITED_CATALOGUE from health-check.js
  if (!fs.existsSync(healthCheckPath)) {
    return { pass: false, errors: ['Health check file missing: ' + healthCheckPath] };
  }
  const hcCode = fs.readFileSync(healthCheckPath, 'utf8');
  const hcMatch = hcCode.match(/const AUDITED_CATALOGUE = (\{[\s\S]*?\n\};)/);
  if (!hcMatch) {
    errors.push('Cannot find "const AUDITED_CATALOGUE = {...}" in ' + healthCheckPath);
  }
  let hcCatalog = {};
  try {
    hcCatalog = eval('(' + (hcMatch ? hcMatch[1].replace(/;$/, '') : '{}') + ')');
  } catch (e) {
    errors.push('Failed to evaluate AUDITED_CATALOGUE in health-check.js: ' + e.message);
  }

  // 4. Load SKU Evidence Index
  if (!fs.existsSync(skuIndexPath)) {
    return { pass: false, errors: ['SKU Evidence index file missing: ' + skuIndexPath] };
  }
  const skuIndexDoc = JSON.parse(fs.readFileSync(skuIndexPath, 'utf8'));
  const evLeaves = skuIndexDoc.leaves || [];
  const evMap = new Map();
  for (const l of evLeaves) {
    if (evMap.has(l.itemId)) {
      errors.push(`Duplicate itemId in SKU evidence index: ${l.itemId}`);
    }
    evMap.set(l.itemId, l);
  }

  // 5. Assert 1-to-1 Equality and SKU Physical File Integrity
  for (const [id, regItem] of regMap.entries()) {
    const checkRecord = {
      itemId: id,
      passed: true,
      fields_checked: []
    };

    const uiItem = uiMap.get(id);
    if (!uiItem) {
      errors.push(`[SKU ${id}] Missing in UI J387_DORM_SKUS.`);
      checkRecord.passed = false;
      continue;
    }

    const hcItem = hcCatalog[id];
    if (!hcItem) {
      errors.push(`[SKU ${id}] Missing in Health Worker AUDITED_CATALOGUE.`);
      checkRecord.passed = false;
      continue;
    }

    const evItem = evMap.get(id);
    if (!evItem) {
      errors.push(`[SKU ${id}] Missing in SKU Evidence Index.`);
      checkRecord.passed = false;
      continue;
    }

    // Product Name Equality
    if (regItem.product_name !== uiItem.product_name) {
      errors.push(`[SKU ${id}] Product name mismatch: Registry="${regItem.product_name}" vs UI="${uiItem.product_name}"`);
      checkRecord.passed = false;
    }
    if (regItem.product_name !== hcItem.name) {
      errors.push(`[SKU ${id}] Product name mismatch: Registry="${regItem.product_name}" vs Worker="${hcItem.name}"`);
      checkRecord.passed = false;
    }
    checkRecord.fields_checked.push('product_name');

    // Variant ID Equality
    if (regItem.variant_id !== uiItem.variant_id) {
      errors.push(`[SKU ${id}] Variant ID mismatch: Registry="${regItem.variant_id}" vs UI="${uiItem.variant_id}"`);
      checkRecord.passed = false;
    }
    if (regItem.variant_id !== hcItem.variant_id) {
      errors.push(`[SKU ${id}] Variant ID mismatch: Registry="${regItem.variant_id}" vs Worker="${hcItem.variant_id}"`);
      checkRecord.passed = false;
    }
    checkRecord.fields_checked.push('variant_id');

    // Canonical URL Equality
    if (regItem.canonical_url !== uiItem.canonical_url) {
      errors.push(`[SKU ${id}] Canonical URL mismatch: Registry="${regItem.canonical_url}" vs UI="${uiItem.canonical_url}"`);
      checkRecord.passed = false;
    }
    if (regItem.canonical_url !== hcItem.official_partner_url) {
      errors.push(`[SKU ${id}] Canonical URL mismatch: Registry="${regItem.canonical_url}" vs Worker="${hcItem.official_partner_url}"`);
      checkRecord.passed = false;
    }
    checkRecord.fields_checked.push('canonical_url');

    // Price Equality
    if (regItem.observed_price !== uiItem.observed_price) {
      errors.push(`[SKU ${id}] Price mismatch: Registry=${regItem.observed_price} vs UI=${uiItem.observed_price}`);
      checkRecord.passed = false;
    }
    if (regItem.observed_price !== hcItem.observed_price) {
      errors.push(`[SKU ${id}] Price mismatch: Registry=${regItem.observed_price} vs Worker=${hcItem.observed_price}`);
      checkRecord.passed = false;
    }
    checkRecord.fields_checked.push('observed_price');

    // Media Binding
    if (!regItem.media || !uiItem.media) {
      errors.push(`[SKU ${id}] Missing media record in Registry or UI.`);
      checkRecord.passed = false;
    } else {
      if (regItem.media.asset_path !== uiItem.media.asset_path) {
        errors.push(`[SKU ${id}] Media asset path mismatch: Registry="${regItem.media.asset_path}" vs UI="${uiItem.media.asset_path}"`);
        checkRecord.passed = false;
      }
      if (regItem.media.media_classification !== uiItem.media.media_classification) {
        errors.push(`[SKU ${id}] Media classification mismatch: Registry="${regItem.media.media_classification}" vs UI="${uiItem.media.media_classification}"`);
        checkRecord.passed = false;
      }
      if (regItem.media.is_physical_photograph !== uiItem.media.is_physical_photograph) {
        errors.push(`[SKU ${id}] Media physical photo flag mismatch: Registry=${regItem.media.is_physical_photograph} vs UI=${uiItem.media.is_physical_photograph}`);
        checkRecord.passed = false;
      }
    }
    checkRecord.fields_checked.push('media_binding');

    // Physical Raw Snapshot File & Hash Verification
    const expectedRawFile = path.join(rawSnapshotsDir, `sku_raw_${id}.html`);
    if (!fs.existsSync(expectedRawFile)) {
      errors.push(`[SKU ${id}] Physical raw snapshot file missing on disk: ${expectedRawFile}`);
      checkRecord.passed = false;
    } else {
      const diskRawStat = fs.statSync(expectedRawFile);
      const diskRawBytes = diskRawStat.size;
      const diskRawSha = computeFileSha256(expectedRawFile);

      if (evItem.raw_snapshot_bytes !== diskRawBytes) {
        errors.push(`[SKU ${id}] Raw bytes mismatch: Index declared ${evItem.raw_snapshot_bytes} bytes vs Disk has ${diskRawBytes} bytes.`);
        checkRecord.passed = false;
      }
      if (evItem.raw_snapshot_sha256 !== diskRawSha) {
        errors.push(`[SKU ${id}] Raw SHA-256 mismatch: Index declared ${evItem.raw_snapshot_sha256} vs Disk hash is ${diskRawSha}.`);
        checkRecord.passed = false;
      }
    }
    checkRecord.fields_checked.push('physical_raw_bytes_matched_and_hashed');

    // Physical SKU Leaf File & Hash Verification
    const expectedLeafFile = path.join(skuLeavesDir, `sku_leaf_${id}.json`);
    if (!fs.existsSync(expectedLeafFile)) {
      errors.push(`[SKU ${id}] Physical leaf file missing on disk: ${expectedLeafFile}`);
      checkRecord.passed = false;
    } else {
      const diskLeafSha = computeFileSha256(expectedLeafFile);
      if (evItem.leaf_sha256 !== diskLeafSha) {
        errors.push(`[SKU ${id}] Leaf SHA-256 mismatch: Index declared ${evItem.leaf_sha256} vs Disk hash is ${diskLeafSha}.`);
        checkRecord.passed = false;
      }

      // Check Leaf content
      const leafDoc = JSON.parse(fs.readFileSync(expectedLeafFile, 'utf8'));
      if (leafDoc.snapshot_metadata.file_bytes !== evItem.raw_snapshot_bytes) {
        errors.push(`[SKU ${id}] Leaf metadata byte mismatch: Leaf has ${leafDoc.snapshot_metadata.file_bytes} vs Index has ${evItem.raw_snapshot_bytes}`);
        checkRecord.passed = false;
      }
      if (leafDoc.snapshot_metadata.file_sha256 !== evItem.raw_snapshot_sha256) {
        errors.push(`[SKU ${id}] Leaf metadata hash mismatch: Leaf has ${leafDoc.snapshot_metadata.file_sha256} vs Index has ${evItem.raw_snapshot_sha256}`);
        checkRecord.passed = false;
      }

      // Challenge Status Integrity
      if (leafDoc.snapshot_metadata.is_challenge_page && leafDoc.snapshot_metadata.is_verified_evidence) {
        errors.push(`[SKU ${id}] Challenge page masquerading as clean verified evidence! Violation of J389 Gate.`);
        checkRecord.passed = false;
      }
    }
    checkRecord.fields_checked.push('physical_leaf_matched_and_hashed');

    checks.push(checkRecord);
  }

  // 6. Assert 15 Deals Physical Artifact & URL Integrity
  if (!fs.existsSync(dealIndexPath)) {
    errors.push('Deal Evidence index file missing: ' + dealIndexPath);
  } else {
    const dealDoc = JSON.parse(fs.readFileSync(dealIndexPath, 'utf8'));
    const deals = dealDoc.deals || [];
    if (deals.length !== 15) {
      errors.push(`Deal index has ${deals.length} deals, expected exactly 15.`);
    }

    for (const d of deals) {
      // Check 100% eradication of jayt.vn URLs
      if (d.official_source_url.includes('jayt.vn')) {
        errors.push(`[Deal ${d.offer_id}] Prohibited self-referential URL detected: ${d.official_source_url}`);
      }

      // Check physical artifact file
      const artifactPath = path.resolve(d.retained_artifact.relative_path);
      if (!fs.existsSync(artifactPath)) {
        errors.push(`[Deal ${d.offer_id}] Physical deal artifact missing on disk: ${artifactPath}`);
      } else {
        const stat = fs.statSync(artifactPath);
        if (d.retained_artifact.file_bytes !== stat.size) {
          errors.push(`[Deal ${d.offer_id}] Deal artifact byte mismatch: Declared ${d.retained_artifact.file_bytes} vs Disk ${stat.size}`);
        }
        const sha = computeFileSha256(artifactPath);
        if (d.retained_artifact.file_sha256 !== sha) {
          errors.push(`[Deal ${d.offer_id}] Deal artifact hash mismatch: Declared ${d.retained_artifact.file_sha256} vs Disk ${sha}`);
        }
      }

      // Check Da Nang locality
      if (!d.danang_applicability || !d.danang_applicability.verified_branches || d.danang_applicability.verified_branches.length === 0) {
        errors.push(`[Deal ${d.offer_id}] Missing physical Da Nang branches.`);
      }
    }
  }

  // 7. Assert Commercial Attribution Validation
  if (!fs.existsSync(attributionPath)) {
    errors.push('Provider attribution validation file missing: ' + attributionPath);
  } else {
    const attrDoc = JSON.parse(fs.readFileSync(attributionPath, 'utf8'));
    if (!attrDoc.governing_principles || !attrDoc.governing_principles.clicks_are_not_revenue) {
      errors.push('Attribution policy missing clicks_are_not_revenue mandate.');
    }
    const providers = attrDoc.providers || [];
    for (const p of providers) {
      if (p.affiliate_enabled) {
        errors.push(`Provider ${p.provider_name} has affiliate_enabled=true without replayable provider proof.`);
      }
    }
  }

  const pass = errors.length === 0;
  return {
    pass,
    total_skus: regSkus.length,
    skus_verified: checks.length,
    errors,
    receipt_data: {
      $schema: "https://jayt.vn/schemas/j389-artifact-integrity-receipt.v1.json",
      receipt_id: "JAYT_389_ARTIFACT_INTEGRITY_RECEIPT",
      cycle: "JAYT-389",
      mandate: "WORK_ORDER_J389_PROVENANCE_HARVEST",
      verified_at_utc: new Date().toISOString(),
      gate_status: pass ? "PASS__ALL_GATES_SATISFIED" : "FAIL__EQUALITY_OR_PHYSICAL_DISCREPANCY",
      sku_count: checks.length,
      deal_count: 15,
      zero_self_referential_urls: true,
      all_raw_bytes_on_disk: true,
      all_hashes_matched: pass,
      errors
    }
  };
}

if (require.main === module) {
  const result = verifyBuildEquality();
  console.log(`[J389 BUILD EQUALITY CHECK] Status: ${result.pass ? 'PASS' : 'FAIL'}`);
  console.log(`- Verified SKUs: ${result.skus_verified}/${result.total_skus}`);
  if (!result.pass) {
    console.error('Errors found:');
    result.errors.forEach(e => console.error('  - ' + e));
    process.exit(1);
  } else {
    console.log('All 30 SKUs, 15 Deal artifacts, and Provider Attribution records match 100% on disk!');
    const qaReceiptPath = path.resolve('07_QUALITY_ASSURANCE/JAYT_389_ARTIFACT_INTEGRITY_RECEIPT.json');
    fs.writeFileSync(qaReceiptPath, JSON.stringify(result.receipt_data, null, 2), 'utf8');
    console.log('Receipt written to: ' + qaReceiptPath);
  }
}

module.exports = { verifyBuildEquality };
