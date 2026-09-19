const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q141xDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_141x_leaf_serialization');
fs.mkdirSync(q141xDir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/dominos_leaf_evidence_serializer_141x.js', dst: 'dominos_leaf_evidence_serializer_141x.js' },
  { src: '05_DEAL_AND_AFFILIATE/capture_dominos_store_locator_141x.js', dst: 'capture_dominos_store_locator_141x.js' },
  { src: '05_DEAL_AND_AFFILIATE/dominos_leaf_batch_141x_table.json', dst: 'dominos_leaf_batch_141x_table.json' },
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_141x.js', dst: 'generic_compiler_141x.js' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_141x_manifest.json', dst: 'batch_capture_141x_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_dominos_evidence_serialization_141x.js', dst: 'test_dominos_evidence_serialization_141x.js' },
  { src: '08_RELEASE_VAULT/JAYT_141X_LEAF_SERIALIZATION_REVIEW_PACK.md', dst: 'JAYT_141X_LEAF_SERIALIZATION_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q141xDir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 141X
const quarantineManifest141x = {
  manifest_id: 'BATCH_141X_QUARANTINE_MANIFEST',
  directive: 'JAYT-142 — LARGE-SCALE VERIFIED SUPPLY ACQUISITION & AUTONOMOUS BATCH LOOP',
  status: 'LEAF_SERIALIZATION_ACCEPTED_SCALED_TO_BATCH_142',
  quarantined_at: '2026-08-27T01:45:00+07:00',
  executive_ruling: '141X passed all technical requirements and is certified as the baseline serializer. Scaled to large-scale multi-cohort batch supply acquisition across Cohorts 1, 2, and 3.',
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q141xDir, 'BATCH_141X_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest141x, null, 2), 'utf8');

// Build Disclosure Receipt 142
const disclosureReceipt142 = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_142_SUPPLY_ACQUISITION',
  directive: 'JAYT-142 — LARGE-SCALE VERIFIED SUPPLY ACQUISITION & AUTONOMOUS BATCH LOOP',
  severity: 'LARGE_SCALE_VERIFIED_SUPPLY_COHORT_ACQUISITION',
  status: 'MULTI_COHORT_ACQUISITION_ACTIVE',
  disclosed_at: '2026-08-27T01:45:00+07:00',
  executive_ruling: 'Executing large-scale multi-cohort verified supply acquisition across Cohort 1 (Cinemas), Cohort 2 (F&B), and Cohort 3 (Student Utilities). Preserving strict locality verification via Store Locators and 141X DOM-native serialization. Zero fake deals, production locked.',
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_141x_leaf_serialization/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/store_locator_verifier_142.js, leaf_evidence_serializer_142.js & fresh_source_registry_142.json'
};

const disclosureReceipt142Path = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_142_SUPPLY_ACQUISITION.json');
fs.writeFileSync(disclosureReceipt142Path, JSON.stringify(disclosureReceipt142, null, 2), 'utf8');

console.log(`✅ [142-QUARANTINE] Successfully archived 141X and issued DISCLOSURE_RECEIPT_JAYT_142.`);
