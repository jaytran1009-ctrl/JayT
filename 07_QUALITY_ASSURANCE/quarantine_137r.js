const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q137Dir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_137_semantic_false_positive');
fs.mkdirSync(q137Dir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_137.js', dst: 'generic_compiler_137.js' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_137_manifest.json', dst: 'batch_capture_137_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_generic_compiler_137.js', dst: 'test_generic_compiler_137.js' },
  { src: '08_RELEASE_VAULT/JAYT_137_EXPANDED_SUPPLY_REVIEW_PACK.md', dst: 'JAYT_137_EXPANDED_SUPPLY_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q137Dir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 137
const quarantineManifest137 = {
  manifest_id: 'BATCH_137_QUARANTINE_MANIFEST',
  directive: 'JAYT-137R — SEMANTIC FALSE-POSITIVE CORRECTION & CORPUS RECERTIFICATION',
  status: 'SEMANTIC_FALSE_POSITIVE_QUARANTINED',
  quarantined_at: '2026-08-26T23:25:00+07:00',
  executive_ruling: 'Batch 137 output rejected due to two identified false positives: (1) CGV offer quote was a generic heading without quantified benefit; (2) Danang Fantasticity matched copyright footer year (2024 UBND TP. Đà Nẵng...) into LOCALITY_ONLY_STRICT.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_21_GENERIC_HEADING_ACCEPTED_AS_OFFER',
      description: 'generic_compiler_137.js accepted broad heading / category title without an explicit quantified benefit (price, discount amount, percentage, BOGO).'
    },
    {
      cause_id: 'P0_CAUSE_22_COPYRIGHT_FOOTER_PARSED_AS_ADDRESS',
      description: 'Address regex parsed year (2024) in copyright footer (2024 UBND TP. Đà Nẵng) as a house number and TP. as an administrative unit inside text.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q137Dir, 'BATCH_137_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest137, null, 2), 'utf8');

// Build Disclosure Receipt 137R
const disclosureReceipt137r = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_137R',
  directive: 'JAYT-137R — SEMANTIC FALSE-POSITIVE CORRECTION & CORPUS RECERTIFICATION',
  severity: 'P0_SEMANTIC_FALSE_POSITIVE_DEFICIT',
  status: 'COMPILER_137_CONTAINED_AND_QUARANTINED',
  disclosed_at: '2026-08-26T23:25:00+07:00',
  executive_ruling: 'Independent CEO audit discovered generic heading accepted as offer in CGV and copyright footer parsed as address in Danang Fantasticity. Entire 137 manifest rejected and quarantined for recertification.',
  root_causes: quarantineManifest137.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_137_semantic_false_positive/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/generic_compiler_137r.js (Quantified Benefit Enforcement & Venue Address Semantic Role Classifier)'
};

const disclosureReceipt137rPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_137R_SEMANTIC_CORRECTION.json');
fs.writeFileSync(disclosureReceipt137rPath, JSON.stringify(disclosureReceipt137r, null, 2), 'utf8');

console.log(`✅ [137R-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_137R.`);
