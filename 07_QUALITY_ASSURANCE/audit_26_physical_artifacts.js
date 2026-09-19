const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const fourLayerPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');
const dataset = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));

const locations = dataset.layer_2_watchlist.verified_locations;
console.log(`=== AUDITING ${locations.length} LOCATIONS AGAINST PHYSICAL DISK ARTIFACTS ===\n`);

const results = [];
let validCount = 0;
let invalidCount = 0;

locations.forEach((loc, idx) => {
  const pointer = loc.evidence_pointer;
  const itemResult = {
    index: idx + 1,
    id: loc.id,
    brand: loc.brand,
    venue_name: loc.venue_name,
    district: loc.district,
    declared_artifact: pointer ? pointer.artifact_path : null,
    declared_sha256: pointer ? pointer.artifact_sha256 : null,
    quote: pointer ? pointer.quote : null,
    physical_file_exists: false,
    computed_sha256: null,
    hash_matches: false,
    quote_matches: false,
    status: 'FAIL',
    rejection_reasons: []
  };

  if (!pointer) {
    itemResult.rejection_reasons.push('MISSING_EVIDENCE_POINTER');
  } else {
    if (!pointer.artifact_path) {
      itemResult.rejection_reasons.push('MISSING_ARTIFACT_PATH');
    } else {
      const fullPath = path.join(repoRoot, pointer.artifact_path);
      if (!fs.existsSync(fullPath)) {
        itemResult.rejection_reasons.push(`FILE_NOT_FOUND: ${pointer.artifact_path}`);
      } else {
        itemResult.physical_file_exists = true;
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        const computedHash = crypto.createHash('sha256').update(fileContent).digest('hex');
        itemResult.computed_sha256 = computedHash;

        if (computedHash === pointer.artifact_sha256) {
          itemResult.hash_matches = true;
        } else {
          itemResult.rejection_reasons.push(`HASH_MISMATCH (Declared: ${pointer.artifact_sha256.substring(0, 16)}... vs Computed: ${computedHash.substring(0, 16)}...)`);
        }

        if (pointer.quote && fileContent.includes(pointer.quote)) {
          itemResult.quote_matches = true;
        } else {
          itemResult.rejection_reasons.push(`QUOTE_NOT_FOUND_IN_FILE: "${pointer.quote}"`);
        }
      }
    }
  }

  if (itemResult.physical_file_exists && itemResult.hash_matches && itemResult.quote_matches) {
    itemResult.status = 'VALID_CANONICAL';
    validCount++;
    console.log(`[PASS ${idx + 1}/${locations.length}] ${loc.id} (${loc.venue_name || loc.brand}): VALID`);
  } else {
    itemResult.status = 'REJECTED';
    invalidCount++;
    console.log(`[FAIL ${idx + 1}/${locations.length}] ${loc.id} (${loc.venue_name || loc.brand}): REJECTED`);
    console.log(`       Reasons: ${itemResult.rejection_reasons.join('; ')}`);
  }

  results.push(itemResult);
});

console.log('\n========================================================================');
console.log(`📊 SUMMARY: ${validCount} VALID, ${invalidCount} REJECTED OUT OF ${locations.length} TOTAL`);
console.log('========================================================================');

const auditReportPath = path.join(repoRoot, '08_RELEASE_VAULT', 'PHYSICAL_EVIDENCE_AUDIT_26_LOCATIONS_134F.json');
fs.writeFileSync(auditReportPath, JSON.stringify({
  audited_at: new Date().toISOString(),
  total_locations: locations.length,
  valid_count: validCount,
  rejected_count: invalidCount,
  results: results
}, null, 2), 'utf8');
console.log(`✅ Detailed Physical Evidence Audit Report saved to: ${auditReportPath}`);
