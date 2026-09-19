/**
 * JAYT PROJECT MEMORY TRANSACTION APPLICATION (070I)
 * Directive: JAYT-070H-R + 070I — BUNDLE ENGINE ROOT REPAIR AND REVALIDATION
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

const version = '3.121.0';
const workOrder = 'JAYT-070I';
const workOrderDescription = 'Bundle Engine Root Repair and Revalidation';

const headerStatusLine = '057: ACCEPTED (OPERATING PROTOCOL) | 070I: IMPLEMENTED — PENDING CEO AUDIT (BLOCK-SCOPED BUNDLE VALIDATOR ACTIVE: 6/6 NEGATIVE TESTS PASS · 8 SEEDS REVALIDATED: 0 COMPLETE, 8 INCOMPLETE · BATCH 4 GATE HELD CLOSED) | 070H-R: SUPERSEDED (DISCLOSURE: 070H DOWNGRADED TO DISCOVERY-ONLY SIGNALS) | 070H: SUPERSEDED | 070G: IMPLEMENTED — PENDING CEO AUDIT (CLASSIFIER ROOT-FIX: 7/7 TESTS PASS · BATCH 3 RECLASSIFIED APPEND-ONLY: 8 PROMO, 7 DEAD_ROUTE, 3 NO_PUBLIC_PROMO, 1 NO_VERIFIED_DANANG, 1 REDIRECT) | 070F-R2: IMPLEMENTED — PENDING CEO AUDIT (SOURCE-BOUND REVIEW PACK 070F REALIGNED · BATCH 3 SWEEP COMPLETED) | 070F-R: SUPERSEDED | 070F: SUPERSEDED | 070E: IMPLEMENTED — PENDING CEO AUDIT (BATCH 2 METADATA MUTATION CONTAINED — QUARANTINED IN BATCH_070E) | 070D: IMPLEMENTED — PENDING CEO AUDIT (CLEAN STAGING REDEPLOY) | 070C: IMPLEMENTED — PENDING CEO AUDIT (STAGING CONTAINED TO BASELINE 061F · CROSS-LAYER GATE CREATED) | 070B: REJECTED (STAGING LINEAGE MUTATION CONTAINED — QUARANTINED IN BATCH_070C) | 070A: PROPOSED (BATCH REVIEW MATRIX GENERATED) | 070: IMPLEMENTED — PENDING CEO AUDIT (BATCH REVIEW PROTOCOL ACTIVE) | 069-STEP2D: IMPLEMENTED — PENDING CEO AUDIT (INTAKE PIPELINE REBUILT · PRE-WRITE GATE & SNAPSHOT LINEAGE CHECKED) | 069-STEP2C: SUPERSEDED (INTAKE LAYOUT GAP · CANDIDATES 42 & 43 QUARANTINED IN BATCH_069D) | 069-STEP2B: IMPLEMENTED — PENDING CEO AUDIT (METIZ RECEIPT LINEAGE RECOVERED · FRESH RECAPTURE COMPLETED) | 069-STEP2A: SUPERSEDED (METIZ DISCOVERY WITH VALIDITY PROOF · LEGACY BATCH ISOLATED) | 069-STEP2: IMPLEMENTED — PENDING CEO AUDIT (METIZ PHYSICAL EVIDENCE CAPTURED) | 069E: IMPLEMENTED — PENDING CEO AUDIT (HANDOFF TRUTH & LESSON CLOSURE) | MANDATORY-GATE: IMPLEMENTED — PENDING CEO AUDIT (LESSONS GATE ENFORCED) | 069-STEP1D: IMPLEMENTED — PENDING CEO AUDIT (STARLIGHT CURRENT PRICE INSPECTED) | 069C: IMPLEMENTED — PENDING CEO AUDIT (RECEIPT LINEAGE CLARIFIED) | 069B: IMPLEMENTED — PENDING CEO AUDIT (AUTHORIZATION ATTRIBUTION DISCLOSURE) | 069A: IMPLEMENTED — PENDING CEO AUDIT (069A CONTAINMENT IMPLEMENTED; UI CHANGES: UNREVIEWED_OUT_OF_SCOPE — KHÔNG THUỘC RELEASE SCOPE) | 069.1: REJECTED (SYNTHETIC CLAIMS & UNAUTHORIZED CEO APPROVAL — QUARANTINED IN BATCH_069A) | 068U: ACCEPTED BY CEO (TIMEZONE BUG FIXED + SHA VALIDATION + DISCONTINUITY DISCLOSED) | 068R: ACCEPTED BY CEO (LEAD-ONLY REGISTRY: 10 LEAD RADAR TRUNG THỰC) | 068T: REJECTED (PROCESS BYPASS — SUPERSEDED BY 068U) | 068: CORRECTED (SEE 068R) | 067A: ACCEPTED BY CEO (MEMORY / GOVERNANCE / LINK FORMAT FROZEN) | 067: ACCEPTED BY CEO (MEMORY TRANSACTION FINAL GATE & ZERO SIDE-EFFECT ISOLATION) | PRODUCTION: LOCKED';

const section4Row = `| Trạng thái hệ thống | Giá trị thực tế | Ý nghĩa vận hành |
| :--- | :--- | :--- |
| **Production Feed** | \`deals_feed.json: []\` (0 records, 0 bytes) | Khóa hoàn toàn (\`is_approved: false\`); 0 rủi ro hiển thị dữ liệu chưa thẩm định. |
| **Staging Feed** | 3 deals thật (Galaxy Happy Day + Metiz Super Monday + Metiz U22) | Đạt 100% Cross-Layer Lineage Gate 070C; 0 biến dạng; 4/5 ngày trong tuần. |
| **Quarantine Vault** | \`batch_070e_synthesized_metadata\` (40 items) | Toàn bộ candidates 48-55 và snapshot receipts đã cô lập an toàn kèm SHA-256 manifest. |
| **Candidate Queue** | 3 deals STAGING APPROVED + 13 probes NEEDS_RECHECK | 0 candidate mới tạo; 8 seeds 070I đều INCOMPLETE (giữ phân loại LEAD_ONLY_NO_CLAIM). |`;

const section5CriteriaText = `### 🎯 Mục tiêu: JAYT-070H-R + 070I — BUNDLE ENGINE ROOT REPAIR AND REVALIDATION

1. **Hiệu chỉnh 070H-R (Append-Only)**: Công bố hạ cấp ma trận 070H xuống \`DISCOVERY_SIGNALS_ONLY\`; không dùng regex keyword rời rạc làm phán quyết bundle.
2. **Sửa Gốc Validator Cấp Khối (070I)**: Xây dựng \`evidence_bundle_validator_070i.js\` thẩm định 5 chiều (Pricing + Terms cùng claim block, Validity có ngày kết thúc xác định, Da Nang Locality có relation key, và Receipts SHA-256 integrity); bộ kiểm thử \`test_evidence_bundle_validator_070i.js\` đạt **6/6 PASS**.
3. **Tái Thẩm Định 8 Seeds (070I)**: Xuất bản [\`BUNDLE_RESOLUTION_MATRIX_070I.md\`](05_DEAL_AND_AFFILIATE/BUNDLE_RESOLUTION_MATRIX_070I.md) và [\`BUNDLE_RESOLUTION_MATRIX_070I.json\`](07_QUALITY_ASSURANCE/runtime_evidence/BUNDLE_RESOLUTION_MATRIX_070I.json) báo cáo **0 COMPLETE, 8 INCOMPLETE** (toàn bộ triaged \`LEAD_ONLY_NO_CLAIM\`; dừng mở Batch 4).
4. **Bổ sung Lesson 14**: Evidence Bundle bắt buộc phải chứng minh quan hệ ngữ cảnh; regex keyword rời rạc không đủ điều kiện cấu thành bundle.
5. **Bảo tồn Tuyệt đối Production & Staging**: Production duy trì \`deals_feed.json: []\` (\`is_approved: false\`); Staging duy trì 3 deal sạch đạt chuẩn.`;

const section6LogEntry = `| \`2026-08-24T14:50:00+07:00\` | \`JAYT-070I\` | Sửa gốc Evidence Bundle validator cấp khối (6/6 test PASS); ban hành disclosure 070H-R; tái thẩm định 8 seed capture không recapture (0 COMPLETE, 8 INCOMPLETE); xuất Bảng Ma Trận Độ Phủ 070I; bổ sung Lesson 14; cập nhật Project Memory v3.121.0. | [\`BUNDLE_RESOLUTION_MATRIX_070I.md\`](05_DEAL_AND_AFFILIATE/BUNDLE_RESOLUTION_MATRIX_070I.md)<br>[\`BUNDLE_RESOLUTION_MATRIX_070I.json\`](07_QUALITY_ASSURANCE/runtime_evidence/BUNDLE_RESOLUTION_MATRIX_070I.json) | 100% PASS (6/6 Bundle Tests · 7/7 Classifier Tests · 8/8 Staging Acceptance · 6/6 Cross-Layer Gate · 10/10 Memory Consistency) | \`IMPLEMENTED_PENDING_CEO_AUDIT\` |`;

// Prepare Lesson 14 insertion via correction receipt
const currentMem = fs.readFileSync(memoryPath, 'utf8');
const targetText = '13. **Ưu tiên lỗi Route & Ranh giới Locality (Hierarchical Fail-Closed Route Classification)**: Navigation text (như menu "cửa hàng", "chi nhánh") không phải bằng chứng locality; lỗi route (404/redirect/blank/auth-wall) bắt buộc có ưu tiên phân loại cao hơn mọi keyword nội dung.';

const replacementText = `13. **Ưu tiên lỗi Route & Ranh giới Locality (Hierarchical Fail-Closed Route Classification)**: Navigation text (như menu "cửa hàng", "chi nhánh") không phải bằng chứng locality; lỗi route (404/redirect/blank/auth-wall) bắt buộc có ưu tiên phân loại cao hơn mọi keyword nội dung.
14. **Quan hệ Ngữ cảnh trong Evidence Bundle (Contextual Co-Location & Relational Binding)**: Evidence Bundle bắt buộc phải chứng minh quan hệ ngữ cảnh (cùng claim block cho price + terms, hạn dùng có ngày kết thúc xác định, và locality có relation key); regex keyword rời rạc không đủ điều kiện cấu thành bundle.`;

const simulatedNewMem = currentMem.replace(targetText, replacementText);
const beforeHash = getSha256(currentMem);
const afterHash = getSha256(simulatedNewMem);

const correctionReceipt = recordHistoricalCorrection067({
  correctionId: `CORRECTION_LESSON_14_070I_${Date.now()}`,
  workOrder: 'JAYT-070I',
  targetFile: 'PROJECT_MEMORY.md',
  beforeHash,
  afterHash,
  reason: 'Codify Lesson 14: Contextual Co-Location & Relational Binding in Evidence Bundles according to CEO Directive 070I',
  authorizedBy: 'CEO_DIRECTIVE_JAYT-070I'
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

console.log('✅ [MEMORY-TRANSACTION-070I-SUCCESS]');
console.log('Version:', res.version);
console.log('PreHash:', res.preHash);
console.log('FinalHash:', res.finalHash);
console.log('Receipt:', res.transactionReceiptPath);
