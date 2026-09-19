const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q138Dir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_138_cross_item_merge');
fs.mkdirSync(q138Dir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_138.js', dst: 'generic_compiler_138.js' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_138_manifest.json', dst: 'batch_capture_138_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_generic_compiler_138.js', dst: 'test_generic_compiler_138.js' },
  { src: '08_RELEASE_VAULT/JAYT_138_LEAF_SUPPLY_REVIEW_PACK.md', dst: 'JAYT_138_LEAF_SUPPLY_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q138Dir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 138
const quarantineManifest138 = {
  manifest_id: 'BATCH_138_QUARANTINE_MANIFEST',
  directive: 'JAYT-139 — ATOMIC PROMOTION UNIT EXTRACTION & CANONICAL LEAF VERIFICATION',
  status: 'CROSS_ITEM_MERGE_QUARANTINED',
  quarantined_at: '2026-08-27T00:30:00+07:00',
  executive_ruling: 'Batch 138 candidate output rejected due to cross-item merge on listing/RSS page (TARGET_138_201): offer from promo A, terms from promo B, validity from promo C stitched together. Enforcing Atomic Promotion Units.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_23_CROSS_ITEM_LISTING_MERGE',
      description: 'Parser evaluated whole-page text on multi-deal listing/RSS pages, stitching fragments from distinct unconnected promotions into a false bundle.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q138Dir, 'BATCH_138_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest138, null, 2), 'utf8');

// Build Disclosure Receipt 139
const disclosureReceipt139 = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_139_ATOMIC_UNIT_ENFORCEMENT',
  directive: 'JAYT-139 — ATOMIC PROMOTION UNIT EXTRACTION & CANONICAL LEAF VERIFICATION',
  severity: 'P0_CROSS_ITEM_MERGE_DEFICIT',
  status: 'COMPILER_138_CONTAINED_AND_QUARANTINED',
  disclosed_at: '2026-08-27T00:30:00+07:00',
  executive_ruling: 'CEO audit identified cross-item merge on multi-deal listing page. Mandated 2-tier architecture (Discovery-Only vs Canonical Leaf) and strict promotion_unit_id enforcement.',
  root_causes: quarantineManifest138.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_138_cross_item_merge/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/generic_compiler_139.js (Atomic Promotion Unit & Canonical Leaf Verification)'
};

const disclosureReceipt139Path = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_139_ATOMIC_UNIT_ENFORCEMENT.json');
fs.writeFileSync(disclosureReceipt139Path, JSON.stringify(disclosureReceipt139, null, 2), 'utf8');

console.log(`✅ [139-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_139.`);
