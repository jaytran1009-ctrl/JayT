const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q142Dir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_142_static_semantics_quarantine');
fs.mkdirSync(q142Dir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/store_locator_verifier_142.js', dst: 'store_locator_verifier_142.js' },
  { src: '05_DEAL_AND_AFFILIATE/leaf_evidence_serializer_142.js', dst: 'leaf_evidence_serializer_142.js' },
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_142.js', dst: 'generic_compiler_142.js' },
  { src: '05_DEAL_AND_AFFILIATE/brand_locality_registry_142.json', dst: 'brand_locality_registry_142.json' },
  { src: '05_DEAL_AND_AFFILIATE/leaf_batch_142_table.json', dst: 'leaf_batch_142_table.json' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_142_manifest.json', dst: 'batch_capture_142_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_large_scale_supply_142.js', dst: 'test_large_scale_supply_142.js' },
  { src: '08_RELEASE_VAULT/JAYT_142_LARGE_SCALE_SUPPLY_REVIEW_PACK.md', dst: 'JAYT_142_LARGE_SCALE_SUPPLY_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q142Dir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 142
const quarantineManifest142 = {
  manifest_id: 'BATCH_142_QUARANTINE_MANIFEST',
  directive: 'JAYT-142R: THU HỒI KẾT LUẬN 142, KHÔI PHỤC BẰNG CHỨNG GỐC VÀ TÁI XỬ LÝ BATCH LỚN',
  status: 'REJECTED_FOR_DATA_QUALIFICATION',
  quarantined_at: new Date().toISOString(),
  executive_ruling: 'CEO audit identified that 142 populated locality and leaf semantics via static hardcoded maps (leafSemanticsMap, expected_da_nang_verified, known_da_nang_venues) instead of purely extracting from raw node provenance. Derived outputs quarantined; raw captures (HTML/text/screenshots/receipts) preserved for genuine DOM-native reprocessing.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_35_STATIC_DICTIONARY_OVERRIDE_IN_PIPELINE',
      description: 'Used static dictionaries (leafSemanticsMap, expected_da_nang_verified) to inject structured fields and locality verdicts into compiler outputs rather than parsing raw DOM nodes.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q142Dir, 'BATCH_142_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest142, null, 2), 'utf8');

// Build Disclosure Receipt 142R
const disclosureReceipt142r = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_142R_RECOVERY',
  directive: 'JAYT-142R: THU HỒI KẾT LUẬN 142, KHÔI PHỤC BẰNG CHỨNG GỐC VÀ TÁI XỬ LÝ BATCH LỚN',
  severity: 'P0_STATIC_SEMANTIC_OVERRIDE_REVOCATION',
  status: 'GENUINE_DOM_PROVENANCE_REPROCESSING_ENFORCED',
  disclosed_at: new Date().toISOString(),
  executive_ruling: 'Quarantining all static dictionary outputs from 142. Preserving all physical raw captures. Implementing 100% generic DOM-native parser with full node provenance, collision detection, strict locality proof, and zero static mappings.',
  root_causes: quarantineManifest142.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_142_static_semantics_quarantine/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/generic_leaf_dom_parser_142r.js, locality_verifier_142r.js & fresh_source_registry_142r.json'
};

const disclosureReceipt142rPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_142R_RECOVERY.json');
fs.writeFileSync(disclosureReceipt142rPath, JSON.stringify(disclosureReceipt142r, null, 2), 'utf8');

console.log(`✅ [142R-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_142R.`);
