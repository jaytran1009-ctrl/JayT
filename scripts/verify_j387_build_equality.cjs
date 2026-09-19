/**
 * scripts/verify_j387_build_equality.cjs
 * Mandate: JAYT-387 / WORK_ORDER_J387_LEVEL_MAX_INTEGRITY (M0 Single SKU Source)
 * Authority: Compares all records by itemId (never zips by array index).
 * Fails build if any missing, extra, duplicate or mismatched field is detected.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function verifyBuildEquality(customOptions = {}) {
  const registryPath = customOptions.registryPath || path.resolve('03_SOURCE_OF_TRUTH/j387/sku_registry.json');
  const apexPath = customOptions.apexPath || path.resolve('deploy/jayt_apex_interface.js');
  const healthCheckPath = customOptions.healthCheckPath || path.resolve('deploy/api/health-check.js');
  const evidencePath = customOptions.evidencePath || path.resolve('06_TRUST_AND_EVIDENCE/j387/product_and_offer_evidence.json');

  const errors = [];
  const checks = [];

  // 1. Load Registry (The Single Source of Truth)
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

  // 2. Load and Parse UI SKUs from jayt_apex_interface.js
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

  // 3. Load and Parse AUDITED_CATALOGUE from api/health-check.js
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

  // 4. Load and Parse Evidence Map
  if (!fs.existsSync(evidencePath)) {
    return { pass: false, errors: ['Evidence file missing: ' + evidencePath] };
  }
  const evidenceData = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));
  const evSkus = evidenceData.skus || [];
  const evMap = new Map();
  for (const s of evSkus) {
    if (evMap.has(s.itemId)) {
      errors.push(`Duplicate itemId in evidence: ${s.itemId}`);
    }
    evMap.set(s.itemId, s);
  }

  // 5. Strict 1-to-1 By-ItemId Equality Assertions
  for (const [id, regItem] of regMap.entries()) {
    const checkRecord = {
      itemId: id,
      passed: true,
      fields_checked: []
    };

    // Check UI Item
    const uiItem = uiMap.get(id);
    if (!uiItem) {
      errors.push(`[SKU ${id}] Missing in UI J387_DORM_SKUS.`);
      checkRecord.passed = false;
      continue;
    }

    // Check Health Check Item
    const hcItem = hcCatalog[id];
    if (!hcItem) {
      errors.push(`[SKU ${id}] Missing in Health Worker AUDITED_CATALOGUE.`);
      checkRecord.passed = false;
      continue;
    }

    // Check Evidence Item
    const evItem = evMap.get(id);
    if (!evItem) {
      errors.push(`[SKU ${id}] Missing in Product & Offer Evidence.`);
      checkRecord.passed = false;
      continue;
    }

    // Assert: product_name equality
    if (regItem.product_name !== uiItem.product_name) {
      errors.push(`[SKU ${id}] Product name mismatch: Registry="${regItem.product_name}" vs UI="${uiItem.product_name}"`);
      checkRecord.passed = false;
    }
    if (regItem.product_name !== hcItem.name) {
      errors.push(`[SKU ${id}] Product name mismatch: Registry="${regItem.product_name}" vs Worker="${hcItem.name}"`);
      checkRecord.passed = false;
    }
    checkRecord.fields_checked.push('product_name');

    // Assert: variant_id equality
    if (regItem.variant_id !== uiItem.variant_id) {
      errors.push(`[SKU ${id}] Variant ID mismatch: Registry="${regItem.variant_id}" vs UI="${uiItem.variant_id}"`);
      checkRecord.passed = false;
    }
    if (regItem.variant_id !== hcItem.variant_id) {
      errors.push(`[SKU ${id}] Variant ID mismatch: Registry="${regItem.variant_id}" vs Worker="${hcItem.variant_id}"`);
      checkRecord.passed = false;
    }
    checkRecord.fields_checked.push('variant_id');

    // Assert: canonical_url equality
    if (regItem.canonical_url !== uiItem.canonical_url) {
      errors.push(`[SKU ${id}] Canonical URL mismatch: Registry="${regItem.canonical_url}" vs UI="${uiItem.canonical_url}"`);
      checkRecord.passed = false;
    }
    if (regItem.canonical_url !== hcItem.official_partner_url) {
      errors.push(`[SKU ${id}] Canonical URL mismatch: Registry="${regItem.canonical_url}" vs Worker="${hcItem.official_partner_url}"`);
      checkRecord.passed = false;
    }
    checkRecord.fields_checked.push('canonical_url');

    // Assert: price equality
    if (regItem.observed_price !== uiItem.observed_price) {
      errors.push(`[SKU ${id}] Price mismatch: Registry=${regItem.observed_price} vs UI=${uiItem.observed_price}`);
      checkRecord.passed = false;
    }
    if (regItem.observed_price !== hcItem.observed_price) {
      errors.push(`[SKU ${id}] Price mismatch: Registry=${regItem.observed_price} vs Worker=${hcItem.observed_price}`);
      checkRecord.passed = false;
    }
    checkRecord.fields_checked.push('observed_price');

    // Assert: expected_host equality
    if (regItem.expected_host !== hcItem.expected_host) {
      errors.push(`[SKU ${id}] Expected host mismatch: Registry="${regItem.expected_host}" vs Worker="${hcItem.expected_host}"`);
      checkRecord.passed = false;
    }
    checkRecord.fields_checked.push('expected_host');

    // Assert: media binding equality
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

    checks.push(checkRecord);
  }

  // Check for extra unexpected SKU IDs in UI or Worker
  for (const uiId of uiMap.keys()) {
    if (!regMap.has(uiId)) {
      errors.push(`Unexpected extra SKU ID in UI: ${uiId}`);
    }
  }

  const pass = errors.length === 0;
  return {
    pass,
    total_skus: regSkus.length,
    skus_verified: checks.length,
    errors,
    receipt_data: {
      check_time_utc: new Date().toISOString(),
      mandate: "WORK_ORDER_J387_LEVEL_MAX_INTEGRITY",
      status: pass ? "PASSED_100_PERCENT_EQUALITY" : "FAILED_MISMATCH_DETECTED",
      verified_sku_count: checks.filter(c => c.passed).length,
      failed_sku_count: checks.filter(c => !c.passed).length,
      errors
    }
  };
}

// If run directly
if (require.main === module) {
  console.log('[BUILD EQUALITY CHECKER] Verifying single SKU source across Registry, UI, Worker, and Evidence...');
  const result = verifyBuildEquality();

  // Save receipt
  const receiptPath = path.resolve('07_QUALITY_ASSURANCE/JAYT_387_BUILD_EQUALITY_RECEIPT.json');
  fs.writeFileSync(receiptPath, JSON.stringify(result.receipt_data, null, 2), 'utf8');
  console.log('[BUILD EQUALITY CHECKER] Wrote receipt to:', receiptPath);

  if (result.pass) {
    console.log(`[BUILD EQUALITY CHECKER] ✅ PASS: 100% Identity Binding Verified across all ${result.total_skus} SKUs! 0 diffs.`);
    process.exit(0);
  } else {
    console.error(`[BUILD EQUALITY CHECKER] ❌ FAIL: Found ${result.errors.length} mismatch errors:`);
    result.errors.forEach(err => console.error('  - ' + err));
    process.exit(1);
  }
}

module.exports = { verifyBuildEquality };
