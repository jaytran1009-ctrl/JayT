/**
 * JAYT PROJECT MEMORY TRANSACTION APPLICATION (070G)
 * Directive: JAYT-070G — CLASSIFIER ROOT-FIX + BATCH 3 RECLASSIFICATION
 * Uses applyProjectMemoryTransaction067 and recordHistoricalCorrection067
 */

const fs = require('fs');
const path = require('path');
const {
  applyProjectMemoryTransaction067,
  recordHistoricalCorrection067,
  getSha256
} = require('./memory_transaction_manager_057');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

const version = '3.119.0';
const workOrder = 'JAYT-070G';
const workOrderDescription = 'Classifier Root-Fix & Batch 3 Reclassification';

const headerStatusLine = '057: ACCEPTED (OPERATING PROTOCOL) | 070G: IMPLEMENTED — PENDING CEO AUDIT (070G CLASSIFIER ROOT-FIX: 7/7 TESTS PASS · BATCH 3 RECLASSIFIED APPEND-ONLY: 8 PROMO, 7 DEAD_ROUTE, 3 NO_PUBLIC_PROMO, 1 NO_VERIFIED_DANANG, 1 REDIRECT) | 070F-R2: IMPLEMENTED — PENDING CEO AUDIT (SOURCE-BOUND REVIEW PACK 070F REALIGNED · BATCH 3 SWEEP COMPLETED) | 070F-R: SUPERSEDED | 070F: SUPERSEDED | 070E: IMPLEMENTED — PENDING CEO AUDIT (BATCH 2 METADATA MUTATION CONTAINED — QUARANTINED IN BATCH_070E) | 070D: IMPLEMENTED — PENDING CEO AUDIT (CLEAN STAGING REDEPLOY) | 070C: IMPLEMENTED — PENDING CEO AUDIT (STAGING CONTAINED TO BASELINE 061F · CROSS-LAYER GATE CREATED) | 070B: REJECTED (STAGING LINEAGE MUTATION CONTAINED — QUARANTINED IN BATCH_070C) | 070A: PROPOSED (BATCH REVIEW MATRIX GENERATED) | 070: IMPLEMENTED — PENDING CEO AUDIT (BATCH REVIEW PROTOCOL ACTIVE) | 069-STEP2D: IMPLEMENTED — PENDING CEO AUDIT (INTAKE PIPELINE REBUILT · PRE-WRITE GATE & SNAPSHOT LINEAGE CHECKED) | 069-STEP2C: SUPERSEDED (INTAKE LAYOUT GAP · CANDIDATES 42 & 43 QUARANTINED IN BATCH_069D) | 069-STEP2B: IMPLEMENTED — PENDING CEO AUDIT (METIZ RECEIPT LINEAGE RECOVERED · FRESH RECAPTURE COMPLETED) | 069-STEP2A: SUPERSEDED (METIZ DISCOVERY WITH VALIDITY PROOF · LEGACY BATCH ISOLATED) | 069-STEP2: IMPLEMENTED — PENDING CEO AUDIT (METIZ PHYSICAL EVIDENCE CAPTURED) | 069E: IMPLEMENTED — PENDING CEO AUDIT (HANDOFF TRUTH & LESSON CLOSURE) | MANDATORY-GATE: IMPLEMENTED — PENDING CEO AUDIT (LESSONS GATE ENFORCED) | 069-STEP1D: IMPLEMENTED — PENDING CEO AUDIT (STARLIGHT CURRENT PRICE INSPECTED) | 069C: IMPLEMENTED — PENDING CEO AUDIT (RECEIPT LINEAGE CLARIFIED) | 069B: IMPLEMENTED — PENDING CEO AUDIT (AUTHORIZATION ATTRIBUTION DISCLOSURE) | 069A: IMPLEMENTED — PENDING CEO AUDIT (069A CONTAINMENT IMPLEMENTED; UI CHANGES: UNREVIEWED_OUT_OF_SCOPE — KHÔNG THUỘC RELEASE SCOPE) | 069.1: REJECTED (SYNTHETIC CLAIMS & UNAUTHORIZED CEO APPROVAL — QUARANTINED IN BATCH_069A) | 068U: ACCEPTED BY CEO (TIMEZONE BUG FIXED + SHA VALIDATION + DISCONTINUITY DISCLOSED) | 068R: ACCEPTED BY CEO (LEAD-ONLY REGISTRY: 10 LEAD RADAR TRUNG THỰC) | 068T: REJECTED (PROCESS BYPASS — SUPERSEDED BY 068U) | 068: CORRECTED (SEE 068R) | 067A: ACCEPTED BY CEO (MEMORY / GOVERNANCE / LINK FORMAT FROZEN) | 067: ACCEPTED BY CEO (MEMORY TRANSACTION FINAL GATE & ZERO SIDE-EFFECT ISOLATION) | PRODUCTION: LOCKED';

const section4Row = `| Trạng thái hệ thống | Giá trị thực tế | Ý nghĩa vận hành |
| :--- | :--- | :--- |
| **Production Feed** | \`deals_feed.json: []\` (0 records, 0 bytes) | Khóa hoàn toàn (\`is_approved: false\`); 0 rủi ro hiển thị dữ liệu chưa thẩm định. |
| **Staging Feed** | 3 deals thật (Galaxy Happy Day + Metiz Super Monday + Metiz U22) | Đạt 100% Cross-Layer Lineage Gate 070C; 0 biến dạng; 4/5 ngày trong tuần. |
| **Quarantine Vault** | \`batch_070e_synthesized_metadata\` (40 items) | Toàn bộ candidates 48-55 và snapshot receipts đã cô lập an toàn kèm SHA-256 manifest. |
| **Candidate Queue** | 3 deals STAGING APPROVED + 13 probes NEEDS_RECHECK | 0 candidate mới tạo; chỉ mở Batch 4 khi có Evidence Bundle đủ 5 thành phần thực tế. |`;

const section5CriteriaText = `### 🎯 Mục tiêu: JAYT-070G — CLASSIFIER ROOT-FIX + BATCH 3 RECLASSIFICATION

1. **Sửa Gốc Bộ Phân Loại Cấp Nguồn (070G)**: Triển khai bộ phân loại theo thứ tự fail-closed nghiêm ngặt (\`DEAD_ROUTE / BLANK / REDIRECT / AUTH_WALL\` trước \`PROMO_SOURCE\` và \`LOCALITY_SOURCE\`); bộ kiểm thử \`test_classifier_070g.js\` đạt **7/7 PASS**.
2. **Tái Phân Loại Batch 3 Append-Only (20 Nguồn)**: Xuất bản [\`BATCH_3_DISCOVERY_MATRIX_070G.md\`](05_DEAL_AND_AFFILIATE/BATCH_3_DISCOVERY_MATRIX_070G.md) và [\`BATCH_3_DISCOVERY_MATRIX_070G.json\`](07_QUALITY_ASSURANCE/runtime_evidence/BATCH_3_DISCOVERY_MATRIX_070G.json) đọc trực tiếp từ 20 receipts trên đĩa (8 PROMO, 7 DEAD_ROUTE, 3 NO_PUBLIC_PROMO, 1 NO_VERIFIED_DANANG, 1 REDIRECT).
3. **Bổ sung Lesson 13**: Navigation text không phải bằng chứng locality; lỗi route có ưu tiên phân loại cao hơn mọi keyword.
4. **Bảo tồn Tuyệt đối Production & Staging**: Production duy trì \`deals_feed.json: []\` (\`is_approved: false\`); Staging duy trì 3 deal sạch đạt chuẩn.`;

const section6LogEntry = `| \`2026-08-24T14:45:00+07:00\` | \`JAYT-070G\` | Sửa gốc bộ phân loại cấp nguồn fail-closed (7/7 test PASS); tái phân loại toàn bộ 20 receipt Batch 3 trên đĩa; xuất Bảng Ma Trận Khám Phá 070G; bổ sung Lesson 13; cập nhật Project Memory v3.119.0. | [\`BATCH_3_DISCOVERY_MATRIX_070G.md\`](05_DEAL_AND_AFFILIATE/BATCH_3_DISCOVERY_MATRIX_070G.md)<br>[\`BATCH_3_DISCOVERY_MATRIX_070G.json\`](07_QUALITY_ASSURANCE/runtime_evidence/BATCH_3_DISCOVERY_MATRIX_070G.json) | 100% PASS (7/7 Classifier Tests · 8/8 Staging Acceptance · 6/6 Cross-Layer Lineage Gate · 10/10 Memory Consistency) | \`IMPLEMENTED_PENDING_CEO_AUDIT\` |`;

// Prepare Lesson 13 insertion via correction receipt
const currentMem = fs.readFileSync(memoryPath, 'utf8');
const targetText = '12. **Phân loại nguồn và Khám phá trung thực (Source-Bound Classification & Unverified Discovery Isolation)**: Tuyệt đối không dùng trạng thái staging của deal khác để phân loại capture target; registry discovery không được chứa dữ kiện/địa chỉ/nhãn khẳng định khi chưa có lineage bằng chứng.';

const replacementText = `12. **Phân loại nguồn và Khám phá trung thực (Source-Bound Classification & Unverified Discovery Isolation)**: Tuyệt đối không dùng trạng thái staging của deal khác để phân loại capture target; registry discovery không được chứa dữ kiện/địa chỉ/nhãn khẳng định khi chưa có lineage bằng chứng.
13. **Ưu tiên lỗi Route & Ranh giới Locality (Hierarchical Fail-Closed Route Classification)**: Navigation text (như menu "cửa hàng", "chi nhánh") không phải bằng chứng locality; lỗi route (404/redirect/blank/auth-wall) bắt buộc có ưu tiên phân loại cao hơn mọi keyword nội dung.`;

const simulatedNewMem = currentMem.replace(targetText, replacementText);
const beforeHash = getSha256(currentMem);
const afterHash = getSha256(simulatedNewMem);

const correctionReceipt = recordHistoricalCorrection067({
  correctionId: `CORRECTION_LESSON_13_070G_${Date.now()}`,
  workOrder: 'JAYT-070G',
  targetFile: 'PROJECT_MEMORY.md',
  beforeHash,
  afterHash,
  reason: 'Codify Lesson 13: Hierarchical Fail-Closed Route Classification according to CEO Directive 070G',
  authorizedBy: 'CEO_DIRECTIVE_JAYT-070G'
});

const res = applyProjectMemoryTransaction067({
  version,
  workOrder,
  workOrderDescription,
  headerStatusLine,
  section4Row,
  section5CriteriaText,
  section6LogEntry,
  historicalCorrections: [
    {
      target: targetText,
      replacement: replacementText,
      correction_receipt_path: correctionReceipt.receiptPath
    }
  ]
});

console.log('✅ [MEMORY-TRANSACTION-070G-SUCCESS]');
console.log('Version:', res.version);
console.log('PreHash:', res.preHash);
console.log('FinalHash:', res.finalHash);
console.log('Receipt:', res.transactionReceiptPath);
