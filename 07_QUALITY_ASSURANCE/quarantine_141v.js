const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q141vDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_141v_nested_fragment_duplication');
fs.mkdirSync(q141vDir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/browser_dom_provenance_141v.js', dst: 'browser_dom_provenance_141v.js' },
  { src: '05_DEAL_AND_AFFILIATE/reprocess_captures_141v.js', dst: 'reprocess_captures_141v.js' },
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_141v.js', dst: 'generic_compiler_141v.js' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_141v_manifest.json', dst: 'batch_capture_141v_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_browser_native_dom_141v.js', dst: 'test_browser_native_dom_141v.js' },
  { src: '07_QUALITY_ASSURANCE/test_generic_compiler_141v.js', dst: 'test_generic_compiler_141v.js' },
  { src: '08_RELEASE_VAULT/JAYT_141V_DOM_PROVENANCE_REVIEW_PACK.md', dst: 'JAYT_141V_DOM_PROVENANCE_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q141vDir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 141V
const quarantineManifest141v = {
  manifest_id: 'BATCH_141V_QUARANTINE_MANIFEST',
  directive: 'JAYT-141W — CANONICAL CARD DEDUPLICATION & DOMINO’S OFFICIAL LEAF BATCH',
  status: 'NESTED_FRAGMENTS_QUARANTINED',
  quarantined_at: '2026-08-27T01:35:00+07:00',
  executive_ruling: 'CEO audit identified nested fragment duplication (cloning card-body, col-*, wrappers into 18 duplicate fragments) and price regex false-positives ("1 đ" from "mua 1 tặng 1"). Quarantined for canonical card deduplication.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_32_NESTED_DOM_FRAGMENT_DUPLICATION',
      description: 'querySelectorAll matched parent cards and nested child wrappers, duplicating single promotions into multiple fragments.'
    },
    {
      cause_id: 'P0_CAUSE_33_AMBIGUOUS_PRICE_REGEX_MATCHING',
      description: 'Generic price regex on card text extracted "1 đ" from "mua 1 tặng 1" condition copy.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q141vDir, 'BATCH_141V_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest141v, null, 2), 'utf8');

// Build Disclosure Receipt 141W
const disclosureReceipt141w = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_141W_CANONICAL_CARD_DEDUP',
  directive: 'JAYT-141W — CANONICAL CARD DEDUPLICATION & DOMINO’S OFFICIAL LEAF BATCH',
  severity: 'P0_NESTED_CARD_DUPLICATION_AND_PRICE_FALSE_POSITIVE',
  status: 'CANONICAL_CARD_DEDUPLICATION_ENFORCED',
  disclosed_at: '2026-08-27T01:35:00+07:00',
  executive_ruling: 'Eliminating nested card duplicates (dedup by source_id + canonical_leaf_url), hardening price extraction (rejecting ambiguous "1 đ"), and running official live leaf capture on Domino’s leaves.',
  root_causes: quarantineManifest141v.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_141v_nested_fragment_duplication/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/canonical_card_normalizer_141w.js & fresh_source_registry_141w.json'
};

const disclosureReceipt141wPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_141W_CANONICAL_CARD_DEDUP.json');
fs.writeFileSync(disclosureReceipt141wPath, JSON.stringify(disclosureReceipt141w, null, 2), 'utf8');

console.log(`✅ [141W-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_141W.`);
