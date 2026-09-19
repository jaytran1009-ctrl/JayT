/**
 * JAYT PROJECT MEMORY TRANSACTION RUNNER (069.1 — Batch 1 Staging Deployment)
 * Directive: JAYT-REAL-DATA-TO-LAUNCH-069
 */

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const {
  applyProjectMemoryTransaction067,
  recordHistoricalCorrection067
} = require('./memory_transaction_manager_057');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const memText = fs.readFileSync(memoryPath, 'utf8');

const targetStr = '- **Hàng đợi candidate**: 14 candidate lịch sử (13 `NEEDS_RECHECK`, 1 CGV Staging Review; duy trì 0 PASS / 0 IMPORT).';
const replacementStr = '- **Hàng đợi candidate**: 13 candidate lịch sử (13 `NEEDS_RECHECK`; duy trì 0 PASS / 0 IMPORT) + 4 candidate thật được CEO duyệt vào Staging (Batch 1 069: Galaxy, Lotte, Lotteria, Phê La).';

let histCorrections = [];
if (memText.includes(targetStr)) {
  const beforeH = crypto.createHash('sha256').update(targetStr).digest('hex');
  const afterH = crypto.createHash('sha256').update(replacementStr).digest('hex');
  const corr = recordHistoricalCorrection067({
    correctionId: 'CORR-069-1-CANDIDATE-COUNT-ALIGNMENT',
    workOrder: 'JAYT-REAL-DATA-TO-LAUNCH-069',
    targetFile: 'PROJECT_MEMORY.md',
    beforeHash: beforeH,
    afterHash: afterH,
    reason: 'Đồng bộ chính xác số lượng 13 candidate lịch sử NEEDS_RECHECK và 4 candidate thật mới được duyệt vào Staging Batch 1 069',
    authorizedBy: 'CEO_JAY_TRAN'
  });
  histCorrections.push({
    correction_receipt_path: corr.receiptPath,
    target: targetStr,
    replacement: replacementStr
  });
}

const section4Content = [
  '| **`JAYT-REAL-DATA-TO-LAUNCH-069`** ',
  '| **IMPLEMENTED — PENDING CEO AUDIT (ACTIVE OPERATIONAL DIRECTIVE: BATCH 1 STAGED)** ',
  '| - Chỉ thị vận hành: tích lũy 10+ deal thật qua Evidence Bundle 5 điểm, phủ 3+ cụm và 5/7 ngày, hoàn tất HTTPS staging + backup/restore, trình CEO quyết định Go-Live.<br>',
  '- **Batch 1 Đã Triển Khai Staging**: 4 Candidate Deals (Galaxy Happy Day 50K, Lotte Amazing Day 65K, Lotteria Gà Cay M1T1 37K, Phê La Free Ly <=54K) phủ 3/3 cụm (CINEMA, F_AND_B, COFFEE_TEA) và 5/7 ngày.<br>',
  '- **Cổng Go-Live**: Tiếp tục tích lũy đến 10+ deal staging + HTTPS + backup + recheck catalog + quyết định CEO.<br>',
  '- `deals_feed.json: []` và `is_approved: false` cho đến quyết định cuối. |'
].join('');

const section5Text = [
  '**Work Order**: `JAYT-REAL-DATA-TO-LAUNCH-069`  ',
  '**Mục tiêu**: Tích lũy 10+ deal thật đã được CEO phê duyệt vào Staging, ',
  'phủ 3+ cụm giá trị và 5/7 ngày hữu ích; sau đó hoàn tất HTTPS staging, ',
  'backup/restore và trình CEO quyết định Go-Live.\n\n',
  '**Tiến độ hiện tại (Batch 1)**:\n',
  '- Đã thẩm duyệt & nạp Staging: 4/10 deal thật (Galaxy, Lotte, Lotteria, Phê La).\n',
  '- Độ phủ cụm: 3/3 cụm giá trị (CINEMA, F_AND_B, COFFEE_TEA) — ĐẠT.\n',
  '- Độ phủ ngày: 5/7 ngày trong tuần — ĐẠT.\n',
  '- Kế hoạch Batch 2: Tiếp tục tìm kiếm & xác minh thêm 6+ deal thật cho các thương hiệu còn lại.\n\n',
  '**Tiêu chí nghiệm thu**:\n',
  '1. Mỗi candidate phải có đủ Evidence Bundle 5 điểm: pricing_and_terms, validity_window, danang_locality_scope, relational_lineage, checked_at_recheck_at + artifact hashes.\n',
  '2. Candidate gom batch tối đa 5, trình CEO Review Pack với bảng: giá, điều kiện, hạn, địa điểm, hash, link nguồn, trạng thái recheck.\n',
  '3. Chỉ sau quyết định CEO mới nạp Staging; không tự nạp production.\n',
  '4. Recheck cadence: deal ngày/flash trước áp dụng & khi hết hạn; deal tuần recheck hằng tuần; deal dài hạn hằng tháng.\n',
  '5. Go-Live gate: 10+ deal staging + 3+ cụm + 5/7 ngày + HTTPS + backup/restore drill + recheck catalog + CEO quyết định.\n',
  '6. `deals_feed.json: []` và `is_approved: false` cho đến quyết định cuối.\n',
  '7. Mọi cập nhật PROJECT_MEMORY qua `applyProjectMemoryTransaction067` — không sửa trực tiếp.'
].join('');

const section6Log = [
  '| `2026-08-24T11:45:00+07:00` ',
  '| `JAYT-REAL-DATA-TO-LAUNCH-069` ',
  '| **Batch 1 Staging Deployed** (CEO Approved): ',
  '(1) CEO duyệt Batch 1 Review Pack gồm 4 Candidate Deals: Galaxy Happy Day (45K-50K), Lotte Amazing Day (65K), Lotteria Gà Cay M1T1 (37K, hạn 30/08), Phê La DONGLONGDICHILL (Free ly <=54K, hạn 31/08); ',
  '(2) Đã nạp 4 deal vào Staging Feed (`staging_instance/05_DEAL_AND_AFFILIATE/deals_feed.json`); ',
  '(3) Đạt 3/3 cụm giá trị (CINEMA, F_AND_B, COFFEE_TEA) và 5/7 ngày; ',
  '(4) Cập nhật Track 2 Registry 068 với 4 Staged Candidates; ',
  '(5) Ban hành Staging Manifest 069 và CEO Decision Receipt; ',
  '(6) Khóa sản xuất bảo toàn `deals_feed.json: []` và `is_approved: false`. ',
  '| [`07_QUALITY_ASSURANCE/runtime_evidence/CEO_DECISION_RECEIPT_069_BATCH1.json`](07_QUALITY_ASSURANCE/runtime_evidence/CEO_DECISION_RECEIPT_069_BATCH1.json) & [`07_QUALITY_ASSURANCE/runtime_evidence/STAGING_ACCEPTANCE_MANIFEST_069.json`](07_QUALITY_ASSURANCE/runtime_evidence/STAGING_ACCEPTANCE_MANIFEST_069.json) ',
  '| `test_staging_acceptance_069.js` (7/7 PASS) ',
  '| **IMPLEMENTED — PENDING CEO AUDIT** |'
].join('');

const result = applyProjectMemoryTransaction067({
  version: '3.97.0',
  workOrder: 'JAYT-REAL-DATA-TO-LAUNCH-069',
  workOrderDescription: 'Real Data to Launch — Batch 1 (4 candidates) CEO approved & deployed to Staging',
  headerStatusLine: [
    '057: ACCEPTED (OPERATING PROTOCOL)',
    '069: IMPLEMENTED — PENDING CEO AUDIT (ACTIVE OPERATIONAL DIRECTIVE: REAL DATA TO LAUNCH - BATCH 1 STAGED)',
    '068U: ACCEPTED BY CEO (TIMEZONE BUG FIXED + SHA VALIDATION + DISCONTINUITY DISCLOSED)',
    '068R: ACCEPTED BY CEO (LEAD-ONLY REGISTRY: 10 LEAD RADAR TRUNG THỰC)',
    '068T: REJECTED (PROCESS BYPASS — SUPERSEDED BY 068U)',
    '068: CORRECTED (SEE 068R)',
    '067A: ACCEPTED BY CEO (MEMORY / GOVERNANCE / LINK FORMAT FROZEN)',
    '067: ACCEPTED BY CEO (MEMORY TRANSACTION FINAL GATE & ZERO SIDE-EFFECT ISOLATION)',
    '066: IMPLEMENTED — PENDING CEO AUDIT (PROJECT MEMORY TRANSACTION & REPORTING HANDOVER MANDATE)',
    '065: IMPLEMENTED — PENDING CEO AUDIT (10-STEP SELF-VERIFICATION 100% PASS · 11 HUBS · 19 PROMOTION LEADS: 0 QUALIFIED, 19 OBSERVED_NOT_QUALIFIED)',
    '064C: IMPLEMENTED — PENDING CEO AUDIT (SUPERSEDED BY CONSOLIDATED BATCH GATE 065)',
    '064B: PARTIALLY ACCEPTED BY CEO (RAW OBSERVATION VALID; STRICT PROMOTION-LEAD QUALIFICATION REJECTED)',
    '064A: ACCEPTED AS RAW NEUTRAL OBSERVATION ONLY — CANDIDATE/DEEP-PROMOTION QUALIFICATION REJECTED',
    '063F: ACCEPTED BY CEO (LESSONS LEARNED ENFORCED IN WRITE PATHS)',
    '063E: PARTIALLY ACCEPTED',
    '063D: REJECTED',
    '063C: PARTIALLY ACCEPTED',
    '063B: ACCEPTED AS GOVERNANCE / REGRESSION BASELINE',
    '063A: ACCEPTED AS HISTORICAL LESSONS REGISTER',
    '062C: ACCEPTED AS APPEND-ONLY PROTOTYPE',
    '062B: REJECTED',
    '062A: ACCEPTED WITH STRUCTURAL LINEAGE REMEDIATION',
    '062: ACCEPTED AS RAW NEUTRAL OBSERVATION ONLY — CANDIDATE QUALIFICATION REJECTED',
    '061G: ACCEPTED BY CEO (GALAXY STAGING DECISION SEALED — 1/10 DEAL · 1/3 CỤM · 1/5 NGÀY)',
    '061F: ACCEPTED BY CEO',
    '061E: REJECTED',
    '061D: ACCEPTED BY CEO',
    '061C: PARTIALLY ACCEPTED',
    '061B: PARTIALLY ACCEPTED',
    '061A: REJECTED',
    '061: REJECTED',
    '060C: ACCEPTED BY CEO (16/16 LIVE CAPTURE LINEAGE VERIFIED — CGV STAGING REFRESHED)',
    '060B: REJECTED',
    '060A: PARTIALLY ACCEPTED',
    '060: REJECTED',
    '058D: ACCEPTED BY CEO',
    '058C: ACCEPTED',
    '058A: PARTIALLY ACCEPTED',
    '058: REJECTED',
    '056C: ACCEPTED WITH CONDITIONS BY CEO',
    'SCHEDULER: 4 TASKS REGISTERED, READY, AND SCHEDULED_WHEN_USER_LOGGED_IN — NATURAL RUN PENDING — UNVERIFIED_IN_CODEX_AUDIT_ENVIRONMENT',
    'PRODUCTION: LOCKED'
  ].join(' | '),
  section4Row: section4Content,
  section5CriteriaText: section5Text,
  section6LogEntry: section6Log,
  historicalCorrections: histCorrections
});

console.log('TRANSACTION_069_1_SUCCESSFUL');
console.log('VERSION: 3.97.0');
console.log('FINAL_MEMORY_HASH:', result.finalHash);
console.log('TRANSACTION_RECEIPT:', result.transactionReceiptPath);

