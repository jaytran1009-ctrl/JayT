/**
 * QUARANTINE STEP 2C CANDIDATES & PUBLISH REJECTION RECEIPT (069-STEP2D)
 * Directive: JAYT-069-STEP2D — METIZ CANDIDATE INTAKE REBUILD
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const pendingDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');
const quarantineDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_069d_candidate_intake_incident');
fs.mkdirSync(quarantineDir, { recursive: true });

function getSha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const filesToQuarantine = [
  'candidate_42_CAND-DNG-METIZ-SUPER-MONDAY-REAL.json',
  'candidate_43_CAND-DNG-METIZ-U22-REAL.json',
  'dossier_CAND-DNG-METIZ-SUPER-MONDAY-REAL.md',
  'dossier_CAND-DNG-METIZ-U22-REAL.md'
];

const quarantinedManifest = {
  $schema: 'https://jayt.vn/schemas/quarantine-manifest.v1.json',
  manifest_id: 'QUARANTINE_MANIFEST_069D',
  work_order: 'JAYT-069-STEP2D-METIZ-CANDIDATE-INTAKE-REBUILD',
  quarantined_at: new Date().toISOString(),
  reason: 'Candidate 42 và 43 không vượt qua validate_candidate_evidence.js do artifact layout không resolve đúng snapshotsDir và claim snippet chứa ellipsis (...) không phải substring nguyên văn.',
  quarantined_files: {}
};

console.log('📦 Đang di chuyển các candidate lỗi sang Quarantine Vault batch_069d_candidate_intake_incident...\n');

for (const fname of filesToQuarantine) {
  const srcPath = path.join(pendingDir, fname);
  const destPath = path.join(quarantineDir, fname);

  if (fs.existsSync(srcPath)) {
    const sha = getSha256(srcPath);
    const size = fs.statSync(srcPath).size;

    // Copy to quarantine
    fs.copyFileSync(srcPath, destPath);
    // Remove from active pending_review
    fs.unlinkSync(srcPath);

    quarantinedManifest.quarantined_files[fname] = {
      sha256: sha,
      size_bytes: size,
      original_path: `05_DEAL_AND_AFFILIATE/candidates/pending_review/${fname}`,
      quarantine_path: `05_DEAL_AND_AFFILIATE/quarantine_vault/batch_069d_candidate_intake_incident/${fname}`
    };

    console.log(`  🔒 Quarantined: ${fname} (${size} B, SHA: ${sha.slice(0, 16)}...)`);
  }
}

quarantinedManifest.total_files_quarantined = Object.keys(quarantinedManifest.quarantined_files).length;
const manifestPath = path.join(quarantineDir, 'QUARANTINE_MANIFEST_069D.json');
fs.writeFileSync(manifestPath, JSON.stringify(quarantinedManifest, null, 2), 'utf8');
console.log(`\n📋 Đã tạo Quarantine Manifest: ${manifestPath}`);

// Create Rejection Receipt
const rejectionReceipt = {
  $schema: 'https://jayt.vn/schemas/rejection-receipt.v1.json',
  receipt_id: `REJECTION_RECEIPT_069D_CANDIDATE_INTAKE_${Date.now()}`,
  work_order: 'JAYT-069-STEP2D-METIZ-CANDIDATE-INTAKE-REBUILD',
  rejection_type: 'CANDIDATE_INTAKE_VALIDATION_FAILURE',
  created_at: new Date().toISOString(),
  authorized_by: 'CEO_DIRECTIVE_JAYT_069_STEP2D',
  rejected_candidates: [
    {
      candidate_id: 'CAND-DNG-METIZ-SUPER-MONDAY-REAL',
      deal_id: 'DNG-METIZ-SUPER-MONDAY-REAL',
      reasons: [
        'Artifact/receipt references không resolve theo snapshotsDir layout của validator.',
        'Extracted claims conditions_snippet chứa ellipsis (...) không phải substring nguyên văn liên tục.'
      ]
    },
    {
      candidate_id: 'CAND-DNG-METIZ-U22-REAL',
      deal_id: 'DNG-METIZ-U22-REAL',
      reasons: [
        'Artifact/receipt references không resolve theo snapshotsDir layout của validator.',
        'Extracted claims conditions_snippet chứa ellipsis (...) không phải substring nguyên văn liên tục.'
      ]
    }
  ],
  quarantine_reference: {
    vault_batch: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_069d_candidate_intake_incident',
    manifest_file: 'QUARANTINE_MANIFEST_069D.json',
    quarantined_count: quarantinedManifest.total_files_quarantined
  },
  remediation_order: 'Xây dựng intake pipeline hoàn chỉnh: tạo byte-for-byte evidence snapshot, trích xuất claim substring nguyên văn 100%, chạy validator trước khi ghi candidate lên đĩa.'
};

const rejectionReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'rejection_receipt_069d_candidate_intake_rejection.json');
fs.writeFileSync(rejectionReceiptPath, JSON.stringify(rejectionReceipt, null, 2), 'utf8');
console.log(`🧾 Đã tạo Rejection Receipt: ${rejectionReceiptPath}`);
