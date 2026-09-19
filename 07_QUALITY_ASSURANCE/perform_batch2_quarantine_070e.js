/**
 * JAYT BATCH 2 EVIDENCE-LINEAGE CONTAINMENT ENGINE (070E)
 * Directive: JAYT-070E — BATCH 2 EVIDENCE-LINEAGE CONTAINMENT AND REBUILD
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const quarantineDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_070e_synthesized_metadata');
const pendingDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');
const snapshotsDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'evidence_snapshots');

fs.mkdirSync(quarantineDir, { recursive: true });

function getSha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const candidateFiles = [
  'candidate_48_CAND-VNM-LOTTERIA-SET-YEU-THUONG-1-2026.json',
  'candidate_49_CAND-VNM-LOTTERIA-SET-YEU-THUONG-2-2026.json',
  'candidate_50_CAND-VNM-LOTTERIA-SET-YEU-THUONG-3-2026.json',
  'candidate_51_CAND-VNM-LOTTERIA-SET-RON-RANG-1-2026.json',
  'candidate_52_CAND-VNM-SHOPEE-VOUCHER-25PCT-2026.json',
  'candidate_53_CAND-VNM-SHOPEE-VOUCHER-20PCT-2026.json',
  'candidate_54_CAND-DNG-SHOPEEFOOD-KHOI-DONG-TUAN-MOI-40K-2026.json',
  'candidate_55_CAND-DNG-SHOPEEFOOD-QUAN-NGON-GAN-NHA-35K-2026.json'
];

const snapshotFiles = [
  'capture_receipt_CAND-VNM-LOTTERIA-SET-YEU-THUONG-1-2026.json',
  'capture_receipt_CAND-VNM-LOTTERIA-SET-YEU-THUONG-2-2026.json',
  'capture_receipt_CAND-VNM-LOTTERIA-SET-YEU-THUONG-3-2026.json',
  'capture_receipt_CAND-VNM-LOTTERIA-SET-RON-RANG-1-2026.json',
  'capture_receipt_CAND-VNM-SHOPEE-VOUCHER-25PCT-2026.json',
  'capture_receipt_CAND-VNM-SHOPEE-VOUCHER-20PCT-2026.json',
  'capture_receipt_CAND-DNG-SHOPEEFOOD-KHOI-DONG-TUAN-MOI-40K-2026.json',
  'capture_receipt_CAND-DNG-SHOPEEFOOD-QUAN-NGON-GAN-NHA-35K-2026.json',
  'cand-vnm-lotteria-set-yeu-thuong-1-2026_official_promo_capture.png',
  'cand-vnm-lotteria-set-yeu-thuong-1-2026_official_promo_raw.html',
  'cand-vnm-lotteria-set-yeu-thuong-1-2026_official_promo_text.txt',
  'cand-vnm-lotteria-set-yeu-thuong-2-2026_official_promo_capture.png',
  'cand-vnm-lotteria-set-yeu-thuong-2-2026_official_promo_raw.html',
  'cand-vnm-lotteria-set-yeu-thuong-2-2026_official_promo_text.txt',
  'cand-vnm-lotteria-set-yeu-thuong-3-2026_official_promo_capture.png',
  'cand-vnm-lotteria-set-yeu-thuong-3-2026_official_promo_raw.html',
  'cand-vnm-lotteria-set-yeu-thuong-3-2026_official_promo_text.txt',
  'cand-vnm-lotteria-set-ron-rang-1-2026_official_promo_capture.png',
  'cand-vnm-lotteria-set-ron-rang-1-2026_official_promo_raw.html',
  'cand-vnm-lotteria-set-ron-rang-1-2026_official_promo_text.txt',
  'cand-vnm-shopee-voucher-25pct-2026_official_promo_capture.png',
  'cand-vnm-shopee-voucher-25pct-2026_official_promo_raw.html',
  'cand-vnm-shopee-voucher-25pct-2026_official_promo_text.txt',
  'cand-vnm-shopee-voucher-20pct-2026_official_promo_capture.png',
  'cand-vnm-shopee-voucher-20pct-2026_official_promo_raw.html',
  'cand-vnm-shopee-voucher-20pct-2026_official_promo_text.txt',
  'cand-dng-shopeefood-khoi-dong-tuan-moi-40k-2026_official_promo_capture.png',
  'cand-dng-shopeefood-khoi-dong-tuan-moi-40k-2026_official_promo_raw.html',
  'cand-dng-shopeefood-khoi-dong-tuan-moi-40k-2026_official_promo_text.txt',
  'cand-dng-shopeefood-quan-ngon-gan-nha-35k-2026_official_promo_capture.png',
  'cand-dng-shopeefood-quan-ngon-gan-nha-35k-2026_official_promo_raw.html',
  'cand-dng-shopeefood-quan-ngon-gan-nha-35k-2026_official_promo_text.txt'
];

const quarantinedEntries = [];

console.log('🔒 [QUARANTINE-070E] Bắt đầu cô lập Candidate 48-55 và Snapshot receipts...');

// 1. Quarantine Candidates
for (const f of candidateFiles) {
  const src = path.join(pendingDir, f);
  const dst = path.join(quarantineDir, f);

  if (fs.existsSync(src)) {
    const sha = getSha256(src);
    const size = fs.statSync(src).size;
    fs.copyFileSync(src, dst);
    fs.unlinkSync(src);

    const dstSha = getSha256(dst);
    if (sha !== dstSha) {
      throw new Error(`BYTE-FOR-BYTE CORRUPTION ON QUARANTINE: ${f}`);
    }

    quarantinedEntries.push({
      filename: f,
      type: 'CANDIDATE_FILE',
      size_bytes: size,
      sha256: sha,
      quarantine_reason: 'Metadata validity/timestamp was synthesized and is not evidence-bound.'
    });
    console.log(`  📦 Quarantined candidate: ${f} (${size} B, SHA: ${sha.slice(0, 16)}...)`);
  }
}

// 2. Quarantine Snapshots & Receipts
for (const f of snapshotFiles) {
  const src = path.join(snapshotsDir, f);
  const dst = path.join(quarantineDir, f);

  if (fs.existsSync(src)) {
    const sha = getSha256(src);
    const size = fs.statSync(src).size;
    fs.copyFileSync(src, dst);
    fs.unlinkSync(src);

    const dstSha = getSha256(dst);
    if (sha !== dstSha) {
      throw new Error(`BYTE-FOR-BYTE CORRUPTION ON QUARANTINE: ${f}`);
    }

    quarantinedEntries.push({
      filename: f,
      type: 'SNAPSHOT_OR_RECEIPT_FILE',
      size_bytes: size,
      sha256: sha,
      quarantine_reason: 'Minted/Synthesized snapshot receipt and aligned artifacts from 070D intake.'
    });
    console.log(`  📦 Quarantined snapshot/receipt: ${f} (${size} B, SHA: ${sha.slice(0, 16)}...)`);
  }
}

// Write Quarantine Manifest
const manifest = {
  $schema: 'https://jayt.vn/schemas/quarantine-manifest.v1.json',
  manifest_id: 'QUARANTINE_MANIFEST_070E_BATCH2_SYNTHESIZED_METADATA',
  work_order: 'JAYT-070E',
  quarantine_reason: '070D Batch 2: REJECTED_PENDING_REBUILD — metadata validity/timestamp was synthesized and is not evidence-bound.',
  quarantined_at: new Date().toISOString(),
  snapshot_byte_for_byte_persisted: true,
  total_files_quarantined: quarantinedEntries.length,
  items: quarantinedEntries
};

const manifestPath = path.join(quarantineDir, 'QUARANTINE_MANIFEST_070E.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
const manifestSha = getSha256(manifestPath);

console.log(`\n📋 [MANIFEST-SAVED] ${manifestPath}`);
console.log(`   SHA-256: ${manifestSha}`);
console.log(`   Total items: ${quarantinedEntries.length}`);
