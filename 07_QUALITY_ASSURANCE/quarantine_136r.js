const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

// 1. Move run_batch_capture_135.js to quarantine 135
const active135Runner = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'run_batch_capture_135.js');
const q135Dir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_135_contaminated_supply');
if (fs.existsSync(active135Runner)) {
  fs.copyFileSync(active135Runner, path.join(q135Dir, 'run_batch_capture_135.js'));
  fs.unlinkSync(active135Runner);
  console.log('✅ Moved run_batch_capture_135.js to quarantine_vault/batch_135_contaminated_supply/');
}

// 2. Setup quarantine 136
const q136Dir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_136_semantic_false_positive');
fs.mkdirSync(q136Dir, { recursive: true });

const manifest136Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_136_manifest.json');
if (fs.existsSync(manifest136Path)) {
  fs.copyFileSync(manifest136Path, path.join(q136Dir, 'batch_capture_136_manifest.json'));
}

const reviewPack136Path = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_136_EVIDENCE_SUPPLY_REVIEW_PACK.md');
if (fs.existsSync(reviewPack136Path)) {
  fs.copyFileSync(reviewPack136Path, path.join(q136Dir, 'JAYT_136_EVIDENCE_SUPPLY_REVIEW_PACK.md'));
}

// Build Quarantine Manifest 136
const quarantineManifest136 = {
  manifest_id: 'BATCH_136_QUARANTINE_MANIFEST',
  directive: 'JAYT-136R — SEMANTIC FALSE-POSITIVE CONTAINMENT',
  status: 'CONTAMINATED_PARSER_OUTPUT_QUARANTINED',
  quarantined_at: '2026-08-26T18:56:00+07:00',
  executive_ruling: 'Batch 136 parser output rejected due to widespread semantic false positives caused by loose keyword regexes matching navigation, footers, and general text rather than bounded offer claims.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_05_LOOSE_KEYWORD_REGEX_EXTRACTION',
      description: 'Parser matched disjoint generic words (ưu đãi, ngày, sinh viên) across headers, footers, and legal disclaimers, falsely promoting general venue and legal pages into ACTIVE_VERIFIED.'
    },
    {
      cause_id: 'P0_CAUSE_06_SYNTHETIC_METADATA_STRINGS',
      description: 'Parser synthesized strings for validity (Chính sách niên khóa) and locality (Cổng sinh viên toàn quốc) that were not present in raw source DOM.'
    },
    {
      cause_id: 'P0_CAUSE_07_NON_DANANG_LOCALITY_LEAKAGE',
      description: 'Parser captured addresses from non-Da Nang branches (e.g. Jollibee Mỹ Tho) as valid locality evidence.'
    },
    {
      cause_id: 'P0_CAUSE_08_INCOMPLETE_CONTAINMENT_IN_135',
      description: 'Active runner run_batch_capture_135.js was left in active directory; now fully quarantined.'
    }
  ],
  quarantined_artifacts: [
    {
      name: 'batch_capture_136_manifest.json',
      sha256: fs.existsSync(manifest136Path) ? getSha256(manifest136Path) : null
    },
    {
      name: 'JAYT_136_EVIDENCE_SUPPLY_REVIEW_PACK.md',
      sha256: fs.existsSync(reviewPack136Path) ? getSha256(reviewPack136Path) : null
    }
  ]
};

const qManifest136Path = path.join(q136Dir, 'BATCH_136_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifest136Path, JSON.stringify(quarantineManifest136, null, 2), 'utf8');

// Build Disclosure Receipt 136R
const disclosureReceipt136r = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_136R',
  directive: 'JAYT-136R — SEMANTIC FALSE-POSITIVE CONTAINMENT & CLAIM-BINDING REBUILD',
  severity: 'P0_SEMANTIC_CLASSIFICATION_CONTAMINATION',
  status: 'SEMANTIC_PARSER_CONTAINED_AND_QUARANTINED',
  disclosed_at: '2026-08-26T18:56:00+07:00',
  executive_ruling: 'Independent CEO audit revealed that semantic parser 136 falsely promoted 16 items to ACTIVE_VERIFIED based on keyword fragments from headers, legal footers, and synthesized strings. All 16 claims demoted to UNREVIEWED_RAW_CAPTURE.',
  root_causes: quarantineManifest136.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_136_semantic_false_positive/',
  remediation_engine: '05_DEAL_AND_AFFILIATE/claim_binding_engine_136r.js (Strict Offset-Bounded Claim Binding Engine)'
};

const disclosureReceipt136rPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_136R_SEMANTIC_FALSE_POSITIVE.json');
fs.writeFileSync(disclosureReceipt136rPath, JSON.stringify(disclosureReceipt136r, null, 2), 'utf8');

console.log('✅ [136R-QUARANTINE] Successfully quarantined Batch 136 parser manifests and issued DISCLOSURE_RECEIPT_JAYT_136R.');
