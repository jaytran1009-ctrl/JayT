const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q142rDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_142r_unbound_semantic_quarantine');
fs.mkdirSync(q142rDir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/generic_leaf_dom_parser_142r.js', dst: 'generic_leaf_dom_parser_142r.js' },
  { src: '05_DEAL_AND_AFFILIATE/locality_verifier_142r.js', dst: 'locality_verifier_142r.js' },
  { src: '05_DEAL_AND_AFFILIATE/reprocess_batch_142r.js', dst: 'reprocess_batch_142r.js' },
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_142r.js', dst: 'generic_compiler_142r.js' },
  { src: '05_DEAL_AND_AFFILIATE/brand_locality_registry_142r.json', dst: 'brand_locality_registry_142r.json' },
  { src: '05_DEAL_AND_AFFILIATE/leaf_batch_142r_table.json', dst: 'leaf_batch_142r_table.json' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_142r_manifest.json', dst: 'batch_capture_142r_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_reprocessing_142r.js', dst: 'test_reprocessing_142r.js' },
  { src: '08_RELEASE_VAULT/JAYT_142R_REPROCESSING_PACK.md', dst: 'JAYT_142R_REPROCESSING_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q142rDir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 142R
const quarantineManifest142r = {
  manifest_id: 'BATCH_142R_QUARANTINE_MANIFEST',
  directive: 'JAYT-142S: SEMANTIC-ROOT RECOVERY & RECEIPT-TRUST REBUILD',
  status: 'REJECTED_FOR_UNBOUND_WIDGET_EXTRACTION',
  quarantined_at: new Date().toISOString(),
  executive_ruling: 'CEO audit identified that 142R extracted global UI widgets ("Mua vé nhanh", "Miễn phí") outside the article content root, relied on inherited locator metadata, and matched raw keyword mentions instead of address units. Quarantining derived 142R files; proceeding with genuine semantic-root parser and address-unit locality extraction.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_36_UNBOUND_GLOBAL_WIDGET_POLLUTION',
      description: 'Extracted title and price from shared booking widget/navigation container instead of scoping strictly to the leaf article content root.'
    },
    {
      cause_id: 'P0_CAUSE_37_INHERITED_RECEIPT_TRUST_VIOLATION',
      description: 'Receipts contained inherited metadata from revoked batch 142 that was not stripped before re-evaluation.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q142rDir, 'BATCH_142R_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest142r, null, 2), 'utf8');

// Build Disclosure Receipt 142S
const disclosureReceipt142s = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_142S_SEMANTIC_ROOT',
  directive: 'JAYT-142S: SEMANTIC-ROOT RECOVERY & RECEIPT-TRUST REBUILD',
  severity: 'P0_SEMANTIC_ROOT_AND_RECEIPT_TRUST_ENFORCEMENT',
  status: 'GENUINE_CONTENT_ROOT_AND_ADDRESS_UNIT_ENFORCED',
  disclosed_at: new Date().toISOString(),
  executive_ruling: 'Mandating strict content_root boundaries (excluding header/nav/footer/sidebar/booking widgets), physical receipt recalculation (ignoring inherited metadata), and address-unit validation for Da Nang locality.',
  root_causes: quarantineManifest142r.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_142r_unbound_semantic_quarantine/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/semantic_root_dom_parser_142s.js, address_unit_locality_verifier_142s.js & fresh_source_registry_142s.json'
};

const disclosureReceipt142sPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_142S_SEMANTIC_ROOT.json');
fs.writeFileSync(disclosureReceipt142sPath, JSON.stringify(disclosureReceipt142s, null, 2), 'utf8');

console.log(`✅ [142S-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_142S.`);
