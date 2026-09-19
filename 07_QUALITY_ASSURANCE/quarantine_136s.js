const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q136rDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_136r_failed_classification');
fs.mkdirSync(q136rDir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/claim_binding_engine_136r.js', dst: 'claim_binding_engine_136r.js' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_136r_manifest.json', dst: 'batch_capture_136r_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_claim_binding_engine_136r.js', dst: 'test_claim_binding_engine_136r.js' },
  { src: '08_RELEASE_VAULT/JAYT_136R_CLAIM_BINDING_REVIEW_PACK.md', dst: 'JAYT_136R_CLAIM_BINDING_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q136rDir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 136R
const quarantineManifest136r = {
  manifest_id: 'BATCH_136R_QUARANTINE_MANIFEST',
  directive: 'JAYT-136S — CLAIM-SEMANTIC SEPARATION & RELATIONAL-LINEAGE GATE',
  status: 'FAILED_CLASSIFICATION_LAYER_QUARANTINED',
  quarantined_at: '2026-08-26T19:01:00+07:00',
  executive_ruling: '136R classification layer rejected due to hardcoded target_id branching, reusing identical single words for all 4 claim fields, absence of relational lineage for nationwide offers, and superficial offset testing.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_09_HARDCODED_TARGET_ID_BRANCHING',
      description: 'claim_binding_engine_136r.js contained explicit if (targetId === "TARGET_136_XX") branching instead of general semantic parsing.'
    },
    {
      cause_id: 'P0_CAUSE_10_IDENTICAL_CLAIM_RECYCLING',
      description: 'The exact same string (e.g. MUA1TANG1, sinh viên, Student Developer Pack) was recycled across offer, terms, validity, and locality fields.'
    },
    {
      cause_id: 'P0_CAUSE_11_MISSING_RELATIONAL_LINEAGE',
      description: 'Nationwide offers lacked formal relational receipts binding the nationwide promotion to official Da Nang physical venue captures.'
    },
    {
      cause_id: 'P0_CAUSE_12_SHALLOW_OFFSET_VERIFICATION',
      description: 'Test suite only verified substring existence for offer/terms without enforcing semantic differentiation, disjoint offsets, or context windows.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q136rDir, 'BATCH_136R_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest136r, null, 2), 'utf8');

// Build Disclosure Receipt 136S
const disclosureReceipt136s = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_136S',
  directive: 'JAYT-136S — CLAIM-SEMANTIC SEPARATION & RELATIONAL-LINEAGE GATE',
  severity: 'P0_CLASSIFIER_INTEGRITY_AND_SEMANTIC_OVERLAP_DEFICIT',
  status: 'CLASSIFICATION_LAYER_CONTAINED_AND_QUARANTINED',
  disclosed_at: '2026-08-26T19:01:00+07:00',
  executive_ruling: 'Independent CEO audit discovered that 136R violated architectural separation by branching on target_id and recycling single words across all 4 claim fields. All 7 offers demoted to UNREVIEWED_RAW_CAPTURE.',
  root_causes: quarantineManifest136r.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_136r_failed_classification/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/claim_semantic_lineage_engine_136s.js (Strict 4-Fragment Disjoint Semantic & Relational Lineage Engine)'
};

const disclosureReceipt136sPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_136S_CLAIM_SEMANTIC_SEPARATION.json');
fs.writeFileSync(disclosureReceipt136sPath, JSON.stringify(disclosureReceipt136s, null, 2), 'utf8');

console.log(`✅ [136S-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_136S.`);
