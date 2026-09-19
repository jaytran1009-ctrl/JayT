const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q141wDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_141w_regex_leaf_metadata');
fs.mkdirSync(q141wDir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/canonical_card_normalizer_141w.js', dst: 'canonical_card_normalizer_141w.js' },
  { src: '05_DEAL_AND_AFFILIATE/reprocess_captures_141w.js', dst: 'reprocess_captures_141w.js' },
  { src: '05_DEAL_AND_AFFILIATE/run_dominos_leaf_capture_141w.js', dst: 'run_dominos_leaf_capture_141w.js' },
  { src: '05_DEAL_AND_AFFILIATE/dominos_leaf_batch_141w_report.json', dst: 'dominos_leaf_batch_141w_report.json' },
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_141w.js', dst: 'generic_compiler_141w.js' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_141w_manifest.json', dst: 'batch_capture_141w_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_canonical_card_dedup_141w.js', dst: 'test_canonical_card_dedup_141w.js' },
  { src: '07_QUALITY_ASSURANCE/test_generic_compiler_141w.js', dst: 'test_generic_compiler_141w.js' },
  { src: '08_RELEASE_VAULT/JAYT_141W_CANONICAL_CARD_REVIEW_PACK.md', dst: 'JAYT_141W_CANONICAL_CARD_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q141wDir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 141W
const quarantineManifest141w = {
  manifest_id: 'BATCH_141W_QUARANTINE_MANIFEST',
  directive: 'JAYT-141X — DOMINO’S LEAF EVIDENCE SERIALIZATION & DANANG SCOPE RESOLUTION',
  status: 'LEAF_REGEX_METADATA_QUARANTINED',
  quarantined_at: '2026-08-27T01:40:00+07:00',
  executive_ruling: 'CEO audit identified that 141W leaf metadata used page-wide regex, falsely extracting "1 đ" from "Mua 1 Tặng 1" copy and truncating validity spans. Raw leaf captures (HTML/text/screenshots/receipts) are preserved as valid physical artifacts, while 141W metadata is quarantined for DOM-native serialization.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_34_UNTRUSTED_PAGEWIDE_REGEX_LEAF_METADATA',
      description: 'Pagewide regex extracted ambiguous numbers and truncated validity strings instead of node-specific DOM provenance.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q141wDir, 'BATCH_141W_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest141w, null, 2), 'utf8');

// Build Disclosure Receipt 141X
const disclosureReceipt141x = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_141X_DOMINOS_LEAF_SERIALIZATION',
  directive: 'JAYT-141X — DOMINO’S LEAF EVIDENCE SERIALIZATION & DANANG SCOPE RESOLUTION',
  severity: 'P0_LEAF_METADATA_REGEX_OVER_REACH',
  status: 'DOM_NATIVE_LEAF_SERIALIZATION_ENFORCED',
  disclosed_at: '2026-08-27T01:40:00+07:00',
  executive_ruling: 'Preserving 6 raw leaf captures from 141W; re-parsing each leaf with DOM-native node selector provenance; capturing Domino’s Store Locator to resolve Da Nang scope with strict zero-assumption policy.',
  root_causes: quarantineManifest141w.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_141w_regex_leaf_metadata/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/dominos_leaf_evidence_serializer_141x.js & fresh_source_registry_141x.json'
};

const disclosureReceipt141xPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_141X_DOMINOS_LEAF_SERIALIZATION.json');
fs.writeFileSync(disclosureReceipt141xPath, JSON.stringify(disclosureReceipt141x, null, 2), 'utf8');

console.log(`✅ [141X-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_141X.`);
