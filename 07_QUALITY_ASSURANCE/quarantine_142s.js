const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q142sDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_142s_body_fallback_quarantine');
fs.mkdirSync(q142sDir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/receipt_truth_verifier_142s.js', dst: 'receipt_truth_verifier_142s.js' },
  { src: '05_DEAL_AND_AFFILIATE/address_unit_locality_verifier_142s.js', dst: 'address_unit_locality_verifier_142s.js' },
  { src: '05_DEAL_AND_AFFILIATE/semantic_root_dom_parser_142s.js', dst: 'semantic_root_dom_parser_142s.js' },
  { src: '05_DEAL_AND_AFFILIATE/reprocess_batch_142s.js', dst: 'reprocess_batch_142s.js' },
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_142s.js', dst: 'generic_compiler_142s.js' },
  { src: '05_DEAL_AND_AFFILIATE/brand_locality_registry_142s.json', dst: 'brand_locality_registry_142s.json' },
  { src: '05_DEAL_AND_AFFILIATE/leaf_batch_142s_table.json', dst: 'leaf_batch_142s_table.json' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_142s_manifest.json', dst: 'batch_capture_142s_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_adversarial_semantic_root_142s.js', dst: 'test_adversarial_semantic_root_142s.js' },
  { src: '08_RELEASE_VAULT/JAYT_142S_REPROCESSING_PACK.md', dst: 'JAYT_142S_REPROCESSING_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q142sDir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 142S
const quarantineManifest142s = {
  manifest_id: 'BATCH_142S_QUARANTINE_MANIFEST',
  directive: 'JAYT-142T: CẤM BODY FALLBACK, KHÓA RECEIPT TRUTH VÀ SỬA THỨ TỰ PHÂN LOẠI',
  status: 'REJECTED_FOR_BODY_FALLBACK_AND_RECEIPT_DEFAULTS',
  quarantined_at: new Date().toISOString(),
  executive_ruling: 'CEO audit identified that 142S allowed document.body fallback as content_root (extracting "Tin liên quan" on Galaxy leaves) and filled missing receipt fields with default assumptions (http_status 200, final_url). Quarantining derived 142S files; proceeding with zero body fallback, strict receipt truth without defaults, normalized address units, and 5-step classification order.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_38_BODY_FALLBACK_SEMANTIC_POLLUTION',
      description: 'Permitted document.body fallback as content_root when no article container existed, capturing unrelated page-level headers like "Tin liên quan".'
    },
    {
      cause_id: 'P0_CAUSE_39_RECEIPT_TRUTH_DEFAULT_INFERENCE',
      description: 'Populated missing receipt fields with default values (http_status 200, final_url) instead of flagging them UNPROVEN.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q142sDir, 'BATCH_142S_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest142s, null, 2), 'utf8');

// Build Disclosure Receipt 142T
const disclosureReceipt142t = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_142T_TRUST_RECOVERY',
  directive: 'JAYT-142T: CẤM BODY FALLBACK, KHÓA RECEIPT TRUTH VÀ SỬA THỨ TỰ PHÂN LOẠI',
  severity: 'P0_ZERO_BODY_FALLBACK_AND_STRICT_RECEIPT_PROVENANCE',
  status: 'STRICT_CONTENT_ROOT_AND_UNBIASED_RECEIPT_TRUTH_ENFORCED',
  disclosed_at: new Date().toISOString(),
  executive_ruling: 'Eliminating all document.body fallbacks, enforcing strict receipt truth without fallback defaults, normalizing address units by distinct address string, and enforcing strict 5-step classification order.',
  root_causes: quarantineManifest142s.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_142s_body_fallback_quarantine/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/strict_semantic_root_dom_parser_142t.js, strict_receipt_truth_verifier_142t.js & address_unit_locality_verifier_142t.js'
};

const disclosureReceipt142tPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_142T_TRUST_RECOVERY.json');
fs.writeFileSync(disclosureReceipt142tPath, JSON.stringify(disclosureReceipt142t, null, 2), 'utf8');

console.log(`✅ [142T-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_142T.`);
