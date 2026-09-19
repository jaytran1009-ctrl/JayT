/**
 * PHYSICAL EVIDENCE RECEIPTS & ARTIFACTS AUDIT ENGINE (STEP 1 & STEP 2)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const freshMetizDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step2b_fresh_metiz');
const metizEvidenceDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step2_metiz');
const bookingEvidenceDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step1d_starlight_booking');
const starlight1cEvidenceDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step1c_starlight');
const step1bEvidenceDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step1b');

function getSha(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const receiptsToCheck = [
  // Fresh Metiz (069-Step2B Immutable Batch)
  path.join(freshMetizDir, 'FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json'),
  path.join(freshMetizDir, 'FRESH_CAPTURE_RECEIPT_METIZ_U22.json'),
  path.join(freshMetizDir, 'FRESH_CAPTURE_RECEIPT_METIZ_PROMOTIONS_LISTING_VALIDITY.json'),
  path.join(freshMetizDir, 'FRESH_CAPTURE_RECEIPT_METIZ_DIA_CHI.json'),
  path.join(freshMetizDir, 'FRESH_CAPTURE_RECEIPT_METIZ_LICH_CHIEU.json'),
  // Legacy Mutated Metiz (069-Step2 / Step2A Discovery)
  path.join(metizEvidenceDir, 'CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json'),
  path.join(metizEvidenceDir, 'CAPTURE_RECEIPT_METIZ_U22.json'),
  path.join(metizEvidenceDir, 'CAPTURE_RECEIPT_METIZ_PROMOTIONS_LISTING_VALIDITY.json'),
  path.join(metizEvidenceDir, 'CAPTURE_RECEIPT_METIZ_LICH_CHIEU.json'),
  path.join(metizEvidenceDir, 'CAPTURE_RECEIPT_METIZ_DIA_CHI.json'),
  path.join(metizEvidenceDir, 'CAPTURE_RECEIPT_METIZ_BOOKING_FLOW.json'),
  // Starlight Booking & Pricing (069-Step1D)
  path.join(bookingEvidenceDir, 'CAPTURE_RECEIPT_STARLIGHT_BOOKING_FLOW.json'),
  path.join(bookingEvidenceDir, 'CAPTURE_RECEIPT_STARLIGHT_DAT_VE_LIVE.json'),
  path.join(bookingEvidenceDir, 'CAPTURE_RECEIPT_STARLIGHT_SEAT_SELECTED_PRICE.json'),
  // Starlight Details (069-Step1C)
  path.join(starlight1cEvidenceDir, 'CAPTURE_RECEIPT_STARLIGHT_THU_3_PHIM_VIET.json'),
  path.join(starlight1cEvidenceDir, 'CAPTURE_RECEIPT_STARLIGHT_CT_U22.json'),
  path.join(starlight1cEvidenceDir, 'CAPTURE_RECEIPT_STARLIGHT_BANG_GIA_VE_HIEN_HANH.json'),
  path.join(starlight1cEvidenceDir, 'CAPTURE_RECEIPT_STARLIGHT_DIA_CHI_RAP.json'),
  // Leads (069-Step1B)
  path.join(step1bEvidenceDir, 'CAPTURE_RECEIPT_LEAD-068-05-STARLIGHT.json'),
  path.join(step1bEvidenceDir, 'CAPTURE_RECEIPT_LEAD-068-07-LOTTERIA.json'),
  path.join(step1bEvidenceDir, 'CAPTURE_RECEIPT_LEAD-068-10-PHELA.json')
];

console.log('🔍 [RECONCILIATION-START] Bắt đầu đối soát toàn bộ 16 receipts với artifacts thật trên đĩa...\n');

let totalChecks = 0;
let passChecks = 0;
let errors = [];

for (const rPath of receiptsToCheck) {
  if (!fs.existsSync(rPath)) {
    errors.push(`RECEIPT_NOT_FOUND: ${rPath}`);
    continue;
  }

  const receipt = JSON.parse(fs.readFileSync(rPath, 'utf8'));
  const rName = path.basename(rPath);
  console.log(`📋 Kiểm tra receipt: ${rName}`);

  for (const [artKey, artMeta] of Object.entries(receipt.artifacts || {})) {
    totalChecks++;
    const fullArtPath = path.resolve(repoRoot, artMeta.path);
    if (!fs.existsSync(fullArtPath)) {
      errors.push(`[${rName}] File not found on disk: ${artMeta.path}`);
      continue;
    }

    const actualBytes = fs.statSync(fullArtPath).size;
    const actualSha = getSha(fullArtPath);

    const byteMatch = actualBytes === artMeta.size_bytes;
    const shaMatch = actualSha === artMeta.sha256;

    if (byteMatch && shaMatch) {
      passChecks++;
      console.log(`   ✅ ${artKey}: ${artMeta.path} (${actualBytes} B, SHA: ${actualSha.slice(0, 16)}...) [MATCH]`);
    } else {
      errors.push(`[${rName} -> ${artKey}] MISMATCH: recorded sha=${artMeta.sha256}, actual sha=${actualSha}; recorded bytes=${artMeta.size_bytes}, actual bytes=${actualBytes}`);
      console.error(`   ❌ ${artKey}: MISMATCH! Recorded=${artMeta.sha256} vs Actual=${actualSha}`);
    }
  }
}

console.log(`\n📊 [SUMMARY]: ${passChecks}/${totalChecks} artifact checks PASSED.`);
if (errors.length > 0) {
  console.error(`❌ Có ${errors.length} lỗi sai lệch:`, errors);
  process.exit(1);
} else {
  console.log('🟢 100% SHA-256 VÀ DUNG LƯỢNG KHỚP TUYỆT ĐỐI GIỮA RECEIPT VÀ ĐĨA!');
}
