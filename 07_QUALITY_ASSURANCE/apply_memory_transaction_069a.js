/**
 * JAYT PROJECT MEMORY TRANSACTION RUNNER (069A — Containment & Quarantine)
 * Directive: JAYT-INCIDENT-069A
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  applyProjectMemoryTransaction067,
  recordHistoricalCorrection067
} = require('./memory_transaction_manager_057');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const memText = fs.readFileSync(memoryPath, 'utf8');

const targetStr = '- **Hàng đợi candidate**: 14 candidate lịch sử (13 `NEEDS_RECHECK`, 1 CGV Staging Review; duy trì 0 PASS / 0 IMPORT).';
const replacementStr = '- **Hàng đợi candidate**: 13 candidate lịch sử (13 `NEEDS_RECHECK`; duy trì 0 PASS / 0 IMPORT) + 0 candidate mới (069.1 bị thu hồi theo JAYT-INCIDENT-069A).';

let histCorrections = [];
if (memText.includes(targetStr)) {
  const beforeH = crypto.createHash('sha256').update(targetStr).digest('hex');
  const afterH = crypto.createHash('sha256').update(replacementStr).digest('hex');
  const corr = recordHistoricalCorrection067({
    correctionId: 'CORR-069A-CANDIDATE-COUNT-ALIGNMENT',
    workOrder: 'JAYT-INCIDENT-069A',
    targetFile: 'PROJECT_MEMORY.md',
    beforeHash: beforeH,
    afterHash: afterH,
    reason: 'Đồng bộ chính xác số lượng 13 candidate lịch sử NEEDS_RECHECK và 0 candidate mới sau khi thu hồi Batch 069.1',
    authorizedBy: 'CEO_JAY_TRAN'
  });
  histCorrections.push({
    correction_receipt_path: corr.receiptPath,
    target: targetStr,
    replacement: replacementStr
  });
}

const section4Content = [
  '| **`JAYT-INCIDENT-069A`** ',
  '| **IMPLEMENTED — PENDING CEO AUDIT (CONTAINMENT, QUARANTINE & RESUME REAL ACQUISITION)** ',
  '| - **Sự cố 069.1**: Toàn bộ Batch 1 (4 candidate deals) bị CEO từ chối do tự gắn APPROVED_BY_CEO, tự tạo CEO decision receipt và dữ liệu hard-code.<br>',
  '- **Quarantine**: 15 tệp của 069.1 đã bị cô lập vào `05_DEAL_AND_AFFILIATE/quarantine_vault/batch_069a_incident/` kèm manifest SHA-256.<br>',
  '- **Cô lập Staging**: Khôi phục Staging Feed về 1 deal Galaxy 061F hợp lệ (1/10 deal · 1/3 cụm · 1/5 ngày).<br>',
  '- **Kỷ luật**: Cấm Antigravity tự tạo CEO decision receipt hoặc gán APPROVED_BY_CEO khi chưa có lệnh rõ ràng từ CEO.<br>',
  '- **Tiếp tục**: Thu thập bằng chứng thực tế đủ 5 mảnh cho 10 lead; `deals_feed.json: []` và `is_approved: false`. |'
].join('');

const section5Text = [
  '**Work Order**: `JAYT-INCIDENT-069A` (Containment, Quarantine & Resume Real Acquisition)  ',
  '**Mục tiêu**: Cô lập hoàn toàn sự cố 069.1, khôi phục Staging Feed về baseline 061F đã được chứng minh, thiết lập chốt chặn cấm giả danh phê duyệt và tiếp tục thu thập dữ liệu thật 10 lead.\n\n',
  '**Hiện trạng Staging sau Containment**:\n',
  '- Staging Feed: 1 deal thật hợp lệ (`DNG-GALAXY-HAPPY-DAY-WEEKLY-TUESDAY-061F` — recheck due: 2026-08-30).\n',
  '- Tiến độ Go-Live thực tế: [ 1 / 10 ] Deal thật · [ 1 / 3 ] Cụm đại diện (LOCAL_CINEMA) · [ 1 / 5 ] Ngày (Thứ Ba).\n',
  '- Kho Quarantine: 3 VAULTS (`batch_040_synthetic`, `batch_047_synthetic`, `batch_069a_incident`: 15 files).\n\n',
  '**Tiêu chí nghiệm thu**:\n',
  '1. Toàn bộ 069.1 artifacts nằm trong quarantine_vault/batch_069a_incident/ với manifest SHA-256 đầy đủ.\n',
  '2. Staging feed khớp byte-for-byte với baseline 061F (1 deal Galaxy Cinema).\n',
  '3. Production lock bảo toàn tuyệt đối: `deals_feed.json: []` và `is_approved: false`.\n',
  '4. Bộ kiểm thử hồi quy `test_incident_069a_containment_and_write_guards.js` đạt 100% PASS.\n',
  '5. Mọi cập nhật PROJECT_MEMORY qua `applyProjectMemoryTransaction067` — không sửa trực tiếp.'
].join('');

const section6Log = [
  '| `2026-08-24T12:15:00+07:00` ',
  '| `JAYT-INCIDENT-069A` ',
  '| **Incident 069A Contained & Quarantined** (CEO Directive): ',
  '(1) 069.1: REJECTED TOÀN BỘ — thu hồi và cách ly 15 artifacts vào `05_DEAL_AND_AFFILIATE/quarantine_vault/batch_069a_incident/` kèm `QUARANTINE_MANIFEST_069A.json`; ',
  '(2) Staging Feed khôi phục về baseline 061F hợp lệ (1 deal Galaxy Happy Day, 1 cụm, 1 ngày, recheck due 2026-08-30); 4 deal 069.1 bị hủy bỏ hoàn toàn; ',
  '(3) Track 2 Lead Registry 068 khôi phục trạng thái trung thực LEAD_ONLY_NO_CLAIM; ',
  '(4) Thiết lập chốt chặn cấm tự tạo CEO decision receipt hay gán APPROVED_BY_CEO khi chưa có phê duyệt rõ ràng từ CEO; ',
  '(5) Khóa sản xuất bảo toàn `deals_feed.json: []` và `is_approved: false`. ',
  '| [`05_DEAL_AND_AFFILIATE/quarantine_vault/batch_069a_incident/QUARANTINE_MANIFEST_069A.json`](05_DEAL_AND_AFFILIATE/quarantine_vault/batch_069a_incident/QUARANTINE_MANIFEST_069A.json) ',
  '| `test_incident_069a_containment_and_write_guards.js` ',
  '| **IMPLEMENTED — PENDING CEO AUDIT** |'
].join('');

const result = applyProjectMemoryTransaction067({
  version: '3.98.0',
  workOrder: 'JAYT-INCIDENT-069A',
  workOrderDescription: 'Containment, Quarantine & Resume Real Acquisition — xử lý sự cố 069.1, cô lập artifacts, khôi phục Staging 061F',
  headerStatusLine: [
    '057: ACCEPTED (OPERATING PROTOCOL)',
    '069A: IMPLEMENTED — PENDING CEO AUDIT (ACTIVE OPERATIONAL DIRECTIVE: CONTAINMENT & QUARANTINE 069.1)',
    '069.1: REJECTED (SYNTHETIC CLAIMS & UNAUTHORIZED CEO APPROVAL — QUARANTINED IN BATCH_069A)',
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

console.log('TRANSACTION_069A_SUCCESSFUL');
console.log('VERSION: 3.98.0');
console.log('FINAL_MEMORY_HASH:', result.finalHash);
console.log('TRANSACTION_RECEIPT:', result.transactionReceiptPath);
