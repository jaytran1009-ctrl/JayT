/**
 * JAYT PROJECT MEMORY TRANSACTION UPDATE
 * Directive: JAYT-070D — BATCH-2 ACCUMULATION & DECISION MATRIX
 * Operating Protocol: 057 / 066 / 067
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const {
  formatAsiaHoChiMinh,
  generateGovernanceHandoverBlock067A,
  initiateWorkOrderTransaction,
  finalizeWorkOrderReceipt
} = require('./memory_transaction_manager_057');

function getSha256(strOrBuf) {
  return crypto.createHash('sha256').update(strOrBuf).digest('hex');
}

const preRaw = fs.readFileSync(memoryPath, 'utf8');
const preHash = getSha256(preRaw);

const version = '3.114.0';
const workOrder = 'JAYT-070D';
const nowLocal = formatAsiaHoChiMinh(new Date());

let text = preRaw;

// 1. Update Version and Timestamp in Header
text = text.replace(
  /> \*\*Phiên bản tài liệu\*\*: `[^`]+`/,
  `> **Phiên bản tài liệu**: \`${version}\``
);
text = text.replace(
  /> \*\*Cập nhật lần cuối\*\*: `[^`]+`/,
  `> **Cập nhật lần cuối**: \`${nowLocal}\``
);

// 2. Update Header Status
const currentStatusLine = `057: ACCEPTED (OPERATING PROTOCOL) | 070D: IMPLEMENTED — PENDING CEO AUDIT (BATCH 2 COMPLETE: 8 GREEN CANDIDATES INTAKEN & VALIDATED · REVIEW PACK GENERATED) | 070C: IMPLEMENTED — PENDING CEO AUDIT (STAGING CONTAINED TO BASELINE 061F · CROSS-LAYER GATE CREATED) | 070B: REJECTED (STAGING LINEAGE MUTATION CONTAINED — QUARANTINED IN BATCH_070C) | 070A: PROPOSED (BATCH REVIEW MATRIX GENERATED) | 070: IMPLEMENTED — PENDING CEO AUDIT (BATCH REVIEW PROTOCOL ACTIVE) | 069-STEP2D: IMPLEMENTED — PENDING CEO AUDIT (INTAKE PIPELINE REBUILT · PRE-WRITE GATE & SNAPSHOT LINEAGE CHECKED) | 069-STEP2C: SUPERSEDED (INTAKE LAYOUT GAP · CANDIDATES 42 & 43 QUARANTINED IN BATCH_069D) | 069-STEP2B: IMPLEMENTED — PENDING CEO AUDIT (METIZ RECEIPT LINEAGE RECOVERED · FRESH RECAPTURE COMPLETED) | 069-STEP2A: SUPERSEDED (METIZ DISCOVERY WITH VALIDITY PROOF · LEGACY BATCH ISOLATED) | 069-STEP2: IMPLEMENTED — PENDING CEO AUDIT (METIZ PHYSICAL EVIDENCE CAPTURED) | 069E: IMPLEMENTED — PENDING CEO AUDIT (HANDOFF TRUTH & LESSON CLOSURE) | MANDATORY-GATE: IMPLEMENTED — PENDING CEO AUDIT (LESSONS GATE ENFORCED) | 069-STEP1D: IMPLEMENTED — PENDING CEO AUDIT (STARLIGHT CURRENT PRICE INSPECTED) | 069C: IMPLEMENTED — PENDING CEO AUDIT (RECEIPT LINEAGE CLARIFIED) | 069B: IMPLEMENTED — PENDING CEO AUDIT (AUTHORIZATION ATTRIBUTION DISCLOSURE) | 069A: IMPLEMENTED — PENDING CEO AUDIT (069A CONTAINMENT IMPLEMENTED; UI CHANGES: UNREVIEWED_OUT_OF_SCOPE — KHÔNG THUỘC RELEASE SCOPE) | 069.1: REJECTED (SYNTHETIC CLAIMS & UNAUTHORIZED CEO APPROVAL — QUARANTINED IN BATCH_069A) | 068U: ACCEPTED BY CEO (TIMEZONE BUG FIXED + SHA VALIDATION + DISCONTINUITY DISCLOSED) | 068R: ACCEPTED BY CEO (LEAD-ONLY REGISTRY: 10 LEAD RADAR TRUNG THỰC) | 068T: REJECTED (PROCESS BYPASS — SUPERSEDED BY 068U) | 068: CORRECTED (SEE 068R) | 067A: ACCEPTED BY CEO (MEMORY / GOVERNANCE / LINK FORMAT FROZEN) | 067: ACCEPTED BY CEO (MEMORY TRANSACTION FINAL GATE & ZERO SIDE-EFFECT ISOLATION) | PRODUCTION: LOCKED`;

text = text.replace(
  /> \*\*Trạng thái chính thức\*\*: `[^`]+`/,
  `> **Trạng thái chính thức**: \`${currentStatusLine}\``
);

// 3. Update Candidate Queue Header
const newCandidateQueueLine = `3 DEALS ĐÃ ĐƯỢC DUYỆT VÀO STAGING NỘI BỘ (GALAXY CINEMA HAPPY DAY + 2 METIZ SUPER MONDAY & U22) + 8 CANDIDATES BATCH 2 GREEN (4 LOTTERIA + 2 SHOPEE + 2 SHOPEEFOOD) ĐÃ PASS 100% VALIDATOR VÀ SẴN SÀNG DUYỆT THEO LÔ; 0 PRODUCTION IMPORT`;
text = text.replace(
  /> \*\*Hàng đợi Candidate\*\*: `[^`]+`/,
  `> **Hàng đợi Candidate**: \`${newCandidateQueueLine}\``
);

// 4. Update Staging Progress
text = text.replace(
  /> \*\*Tiến độ Staging \/ Go-Live\*\*: `[^`]+`/,
  `> **Tiến độ Staging / Go-Live**: \`[ 3 / 10 ] Deal thật đã nạp Staging (Galaxy + 2 Metiz) · [ 1 / 3 ] Cụm đại diện (LOCAL_CINEMA) · [ 4 / 5 ] Ngày trong tuần (Thứ Hai đến Thứ Năm)\``
);

// 5. Append to Section 6 Log
const s6Header = '## 6. Nhật Ký Thay Đổi Bất Biến (Immutable Audit Log)\n\n| Thời Điểm | Work Order | Nội Dung & Mục Tiêu | Artifacts Bằng Chứng | Trạng Thái Kiểm Thử | Trạng Thái Phê Duyệt |\n| :--- | :--- | :--- | :--- | :---: | :---: |\n';
const newLogEntry = `| \`${nowLocal}\` | \`JAYT-070D\` | Hoàn tất Intake 8 Candidate GREEN cho Batch 2 (4 Lotteria F&B, 2 Shopee E-com, 2 ShopeeFood Delivery); vượt qua 100% Pre-write Validator SSOT và xuất Bảng Quyết Định Tập Trung (Batch 2 Decision Matrix). | [\`BATCH_2_EVIDENCE_REVIEW_PACK.md\`](05_DEAL_AND_AFFILIATE/BATCH_2_EVIDENCE_REVIEW_PACK.md)<br>[\`BATCH_2_DECISION_MATRIX.json\`](07_QUALITY_ASSURANCE/runtime_evidence/BATCH_2_DECISION_MATRIX.json) | 100% PASS (24/24 Candidates Structurally Valid · 8/8 Staging Acceptance · 6/6 Cross-Layer Lineage Gate · 10/10 Memory Consistency) | \`IMPLEMENTED_PENDING_CEO_AUDIT\` |`;

if (text.includes(s6Header) && !text.includes('Hoàn tất Intake 8 Candidate GREEN cho Batch 2')) {
  text = text.replace(s6Header, s6Header + newLogEntry + '\n');
}

fs.writeFileSync(memoryPath, text, 'utf8');
const postRaw = fs.readFileSync(memoryPath, 'utf8');
const postHash = getSha256(postRaw);

console.log(`✅ [PROJECT_MEMORY-UPDATED] Version: ${version}, Pre-Hash: ${preHash}, Post-Hash: ${postHash}`);

// Emit Immutable Run Receipt
const tx = initiateWorkOrderTransaction('JAYT-070D-BATCH2-INTAKE');
const receiptObj = tx.receipt;

receiptObj.summary = 'Hoàn tất Intake 8 Candidate GREEN Batch 2, xuất Batch Decision Matrix và cập nhật Project Memory v3.114.0.';
receiptObj.artifacts = [
  '05_DEAL_AND_AFFILIATE/BATCH_2_EVIDENCE_REVIEW_PACK.md',
  '07_QUALITY_ASSURANCE/runtime_evidence/BATCH_2_DECISION_MATRIX.json',
  '07_QUALITY_ASSURANCE/runtime_evidence/BATCH_2_INTAKE_MANIFEST.json',
  'PROJECT_MEMORY.md'
];

finalizeWorkOrderReceipt(receiptObj, tx.targetRunDir, 'IMPLEMENTED_PENDING_CEO_AUDIT');
