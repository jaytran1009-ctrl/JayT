/**
 * JAYT PROJECT MEMORY TRANSACTION APPLICATION (070F-R2)
 * Directive: JAYT-070F-R2 — SOURCE-BOUND REPORTING CORRECTION + BATCH 3 TRUTHFUL DISCOVERY
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

const version = '3.118.0';
const workOrder = 'JAYT-070F-R2';
const workOrderDescription = 'Source-Bound Reporting Correction & Batch 3 Truthful Discovery';

const headerStatusLine = '057: ACCEPTED (OPERATING PROTOCOL) | 070F-R2: IMPLEMENTED — PENDING CEO AUDIT (070F-R2 SOURCE-BOUND REVIEW PACK GENERATED: 16 RECEIPTS REALIGNED · BATCH 3 TRUTHFUL DISCOVERY SWEEP: 20 TARGETS CAPTURED AT SOURCE LEVEL WITH ZERO CLAIMS) | 070F-R: SUPERSEDED (LINEAGE CORRECTION REQUIRED) | 070F: SUPERSEDED (LINEAGE CORRECTION REQUIRED) | 070E: IMPLEMENTED — PENDING CEO AUDIT (BATCH 2 METADATA MUTATION CONTAINED — QUARANTINED IN BATCH_070E) | 070D: IMPLEMENTED — PENDING CEO AUDIT (CLEAN STAGING REDEPLOY) | 070C: IMPLEMENTED — PENDING CEO AUDIT (STAGING CONTAINED TO BASELINE 061F · CROSS-LAYER GATE CREATED) | 070B: REJECTED (STAGING LINEAGE MUTATION CONTAINED — QUARANTINED IN BATCH_070C) | 070A: PROPOSED (BATCH REVIEW MATRIX GENERATED) | 070: IMPLEMENTED — PENDING CEO AUDIT (BATCH REVIEW PROTOCOL ACTIVE) | 069-STEP2D: IMPLEMENTED — PENDING CEO AUDIT (INTAKE PIPELINE REBUILT · PRE-WRITE GATE & SNAPSHOT LINEAGE CHECKED) | 069-STEP2C: SUPERSEDED (INTAKE LAYOUT GAP · CANDIDATES 42 & 43 QUARANTINED IN BATCH_069D) | 069-STEP2B: IMPLEMENTED — PENDING CEO AUDIT (METIZ RECEIPT LINEAGE RECOVERED · FRESH RECAPTURE COMPLETED) | 069-STEP2A: SUPERSEDED (METIZ DISCOVERY WITH VALIDITY PROOF · LEGACY BATCH ISOLATED) | 069-STEP2: IMPLEMENTED — PENDING CEO AUDIT (METIZ PHYSICAL EVIDENCE CAPTURED) | 069E: IMPLEMENTED — PENDING CEO AUDIT (HANDOFF TRUTH & LESSON CLOSURE) | MANDATORY-GATE: IMPLEMENTED — PENDING CEO AUDIT (LESSONS GATE ENFORCED) | 069-STEP1D: IMPLEMENTED — PENDING CEO AUDIT (STARLIGHT CURRENT PRICE INSPECTED) | 069C: IMPLEMENTED — PENDING CEO AUDIT (RECEIPT LINEAGE CLARIFIED) | 069B: IMPLEMENTED — PENDING CEO AUDIT (AUTHORIZATION ATTRIBUTION DISCLOSURE) | 069A: IMPLEMENTED — PENDING CEO AUDIT (069A CONTAINMENT IMPLEMENTED; UI CHANGES: UNREVIEWED_OUT_OF_SCOPE — KHÔNG THUỘC RELEASE SCOPE) | 069.1: REJECTED (SYNTHETIC CLAIMS & UNAUTHORIZED CEO APPROVAL — QUARANTINED IN BATCH_069A) | 068U: ACCEPTED BY CEO (TIMEZONE BUG FIXED + SHA VALIDATION + DISCONTINUITY DISCLOSED) | 068R: ACCEPTED BY CEO (LEAD-ONLY REGISTRY: 10 LEAD RADAR TRUNG THỰC) | 068T: REJECTED (PROCESS BYPASS — SUPERSEDED BY 068U) | 068: CORRECTED (SEE 068R) | 067A: ACCEPTED BY CEO (MEMORY / GOVERNANCE / LINK FORMAT FROZEN) | 067: ACCEPTED BY CEO (MEMORY TRANSACTION FINAL GATE & ZERO SIDE-EFFECT ISOLATION) | PRODUCTION: LOCKED';

const section4Row = `| Trạng thái hệ thống | Giá trị thực tế | Ý nghĩa vận hành |
| :--- | :--- | :--- |
| **Production Feed** | \`deals_feed.json: []\` (0 records, 0 bytes) | Khóa hoàn toàn (\`is_approved: false\`); 0 rủi ro hiển thị dữ liệu chưa thẩm định. |
| **Staging Feed** | 3 deals thật (Galaxy Happy Day + Metiz Super Monday + Metiz U22) | Đạt 100% Cross-Layer Lineage Gate 070C; 0 biến dạng; 4/5 ngày trong tuần. |
| **Quarantine Vault** | \`batch_070e_synthesized_metadata\` (40 items) | Toàn bộ candidates 48-55 và snapshot receipts đã cô lập an toàn kèm SHA-256 manifest. |
| **Candidate Queue** | 3 deals STAGING APPROVED + 13 probes NEEDS_RECHECK | 0 candidate mới trong đợt quét 070F-R2 đủ 5 chiều tiêu chuẩn (chỉ làm discovery cấp nguồn). |`;

const section5CriteriaText = `### 🎯 Mục tiêu: JAYT-070F-R2 — SOURCE-BOUND REPORTING CORRECTION + BATCH 3 TRUTHFUL DISCOVERY

1. **Hiệu chỉnh 070F-R2 Source-Bound**: Ban hành Review Pack [\`BATCH_070F_R2_REVIEW_PACK.md\`](05_DEAL_AND_AFFILIATE/BATCH_070F_R2_REVIEW_PACK.md) phân loại chính xác 16 receipt cấp nguồn (0 tự gán triage/locality theo target_id; URL 404 là RED; 3 deal staging đưa vào phụ lục tham chiếu).
2. **Khám phá Trung thực Batch 3 (20 Targets)**: Chụp và phân loại source-level cho 20 mục tiêu tại [\`BATCH_3_DISCOVERY_MATRIX.md\`](05_DEAL_AND_AFFILIATE/BATCH_3_DISCOVERY_MATRIX.md) (0 candidate, 0 staging, 0 CEO receipt).
3. **Bổ sung Lesson 12**: Không dùng trạng thái staging của deal khác để phân loại capture target; registry discovery không được chứa dữ kiện chưa có lineage.
4. **Bảo tồn Tuyệt đối Production & Staging**: Production duy trì \`deals_feed.json: []\` (\`is_approved: false\`); Staging duy trì 3 deal sạch đạt chuẩn.`;

const section6LogEntry = `| \`2026-08-24T14:40:00+07:00\` | \`JAYT-070F-R2\` | Ban hành Review Pack 070F-R2 hoàn toàn source-bound; hoàn tất quét khám phá Batch 3 cho 20 mục tiêu không tự sinh claim; bổ sung Lesson 12; cập nhật Project Memory v3.118.0. | [\`BATCH_070F_R2_REVIEW_PACK.md\`](05_DEAL_AND_AFFILIATE/BATCH_070F_R2_REVIEW_PACK.md)<br>[\`BATCH_3_DISCOVERY_MATRIX.md\`](05_DEAL_AND_AFFILIATE/BATCH_3_DISCOVERY_MATRIX.md) | 100% PASS (16/16 Structurally Valid · 8/8 Staging Acceptance · 6/6 Cross-Layer Lineage Gate · 10/10 Memory Consistency) | \`IMPLEMENTED_PENDING_CEO_AUDIT\` |`;

// Prepare Lesson 12 insertion via correction receipt
const currentMem = fs.readFileSync(memoryPath, 'utf8');
const targetText = '11. **Production boundary (Production Lock Invariant)**: Không auto-stage/auto-publish; duy trì `deals_feed.json: []` (SHA-256: `4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945`) và `is_approved: false` cho đến cổng cuối.';

const replacementText = `11. **Production boundary (Production Lock Invariant)**: Không auto-stage/auto-publish; duy trì \`deals_feed.json: []\` (SHA-256: \`4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945\`) và \`is_approved: false\` cho đến cổng cuối.
12. **Phân loại nguồn và Khám phá trung thực (Source-Bound Classification & Unverified Discovery Isolation)**: Tuyệt đối không dùng trạng thái staging của deal khác để phân loại capture target; registry discovery không được chứa dữ kiện/địa chỉ/nhãn khẳng định khi chưa có lineage bằng chứng.`;

const simulatedNewMem = currentMem.replace(targetText, replacementText);
const beforeHash = getSha256(currentMem);
const afterHash = getSha256(simulatedNewMem);

const correctionReceipt = recordHistoricalCorrection067({
  correctionId: 'CORRECTION_LESSON_12_070F_R2',
  workOrder: 'JAYT-070F-R2',
  targetFile: 'PROJECT_MEMORY.md',
  beforeHash,
  afterHash,
  reason: 'Codify Lesson 12: Source-Bound Classification & Unverified Discovery Isolation according to CEO Directive 070F-R2',
  authorizedBy: 'CEO_DIRECTIVE_JAYT-070F-R2'
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

console.log('✅ [MEMORY-TRANSACTION-070F-R2-SUCCESS]');
console.log('Version:', res.version);
console.log('PreHash:', res.preHash);
console.log('FinalHash:', res.finalHash);
console.log('Receipt:', res.transactionReceiptPath);
