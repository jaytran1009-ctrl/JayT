const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q141tDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_141t_page_level_blocks');
fs.mkdirSync(q141tDir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/semantic_normalizer_141t.js', dst: 'semantic_normalizer_141t.js' },
  { src: '05_DEAL_AND_AFFILIATE/reprocess_captures_141t.js', dst: 'reprocess_captures_141t.js' },
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_141t.js', dst: 'generic_compiler_141t.js' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_141t_manifest.json', dst: 'batch_capture_141t_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_semantic_integrity_141t.js', dst: 'test_semantic_integrity_141t.js' },
  { src: '07_QUALITY_ASSURANCE/test_generic_compiler_141t.js', dst: 'test_generic_compiler_141t.js' },
  { src: '08_RELEASE_VAULT/JAYT_141T_SEMANTIC_INTEGRITY_REVIEW_PACK.md', dst: 'JAYT_141T_SEMANTIC_INTEGRITY_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q141tDir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 141T
const quarantineManifest141t = {
  manifest_id: 'BATCH_141T_QUARANTINE_MANIFEST',
  directive: 'JAYT-141U — ATOMIC DOM OFFER BOUNDARY & SCHEDULER ACTIVATION BLOCK',
  status: 'PAGE_LEVEL_BLOCKS_QUARANTINED',
  quarantined_at: '2026-08-27T01:25:00+07:00',
  executive_ruling: 'CEO audit identified cross-container merge defect: offer_blocks were parsed from whole-page text, merging navigation menus (e.g. "Vé Của Tôi") with unrelated dates appearing elsewhere on the page.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_30_PAGE_LEVEL_TEXT_OFFER_MERGING',
      description: 'extractStructuredOfferBlocks scanned whole-page text lines, violating atomic container boundaries and cross-merging navigation with dates.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q141tDir, 'BATCH_141T_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest141t, null, 2), 'utf8');

// Build Disclosure Receipt 141U
const disclosureReceipt141u = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_141U_ATOMIC_DOM_BOUNDARY',
  directive: 'JAYT-141U — ATOMIC DOM OFFER BOUNDARY & SCHEDULER ACTIVATION BLOCK',
  severity: 'P0_DOM_ATOMIC_BOUNDARY_DEFICIT',
  status: 'PAGE_LEVEL_BLOCKS_CONTAINED_AND_DEMOTED',
  disclosed_at: '2026-08-27T01:25:00+07:00',
  executive_ruling: 'Demoted all whole-page offer blocks from 141T to PAGE_LEVEL_UNBOUND_SIGNALS. Enforcing single-container DOM_ATOMIC_OFFER_FRAGMENT architecture.',
  root_causes: quarantineManifest141t.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_141t_page_level_blocks/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/atomic_dom_normalizer_141u.js & fresh_source_registry_141u.json'
};

const disclosureReceipt141uPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_141U_ATOMIC_DOM_BOUNDARY.json');
fs.writeFileSync(disclosureReceipt141uPath, JSON.stringify(disclosureReceipt141u, null, 2), 'utf8');

console.log(`✅ [141U-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_141U.`);
