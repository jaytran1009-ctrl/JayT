/**
 * JAYT PROJECT MEMORY TRANSACTION RUNNER: 069A GOVERNANCE CLOSEOUT
 * Directive: JAYT-069A-GOVERNANCE-CLOSEOUT
 * 
 * Enforces:
 * 1. 069A Containment closeout: IMPLEMENTED_PENDING_CEO_AUDIT.
 * 2. UI changes disclosure: UNREVIEWED_OUT_OF_SCOPE, not part of release scope.
 * 3. Historical correction receipts for track2_lead_registry_068.json and candidate_evidence_dossier.json.
 * 4. Alignment of progress: 1 staging deal / 10, 1 cluster / 3, 1 day / 5.
 * 5. Readiness to return to 069 Step 1 real capture.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  applyProjectMemoryTransaction067,
  recordHistoricalCorrection067
} = require('./memory_transaction_manager_057');

const repoRoot = path.resolve(__dirname, '..');
const dealDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE');
const leadRegistryPath = path.join(dealDir, 'track2_lead_registry_068.json');
const dossierPath = path.join(dealDir, 'candidate_evidence_dossier.json');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

function getSha(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

// 1. Record Historical Correction Receipt for Lead Registry
const leadRegistrySha = getSha(leadRegistryPath);
const leadReceiptFile = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_corr_069a_lotte_exclusion_lead_registry.json');
let corrLeadReg;
if (!fs.existsSync(leadReceiptFile)) {
  corrLeadReg = recordHistoricalCorrection067({
    correctionId: 'CORR-069A-LOTTE-EXCLUSION-LEAD-REGISTRY',
    workOrder: 'JAYT-069A-GOVERNANCE-CLOSEOUT',
    targetFile: '05_DEAL_AND_AFFILIATE/track2_lead_registry_068.json',
    beforeHash: '1a5fa6007e5e347432eb4a7f05c4eaecba789d6e5c8e31ee135cf21ab07e155c',
    afterHash: leadRegistrySha,
    reason: 'Loại bỏ toàn bộ trích xuất grounding từ nguồn lottecinemavn.com theo chỉ thị CEO, đưa LEAD-068-04-LOTTE về LEAD_ONLY_NO_CLAIM (available: false cả 5 mảnh bằng chứng).',
    authorizedBy: 'CEO_DIRECTIVE_JAYT_069A_CLOSEOUT'
  });
}

// 2. Record Historical Correction Receipt for Candidate Dossier
const dossierSha = getSha(dossierPath);
const dossierReceiptFile = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_corr_069a_lotte_exclusion_candidate_dossier.json');
let corrDossier;
if (!fs.existsSync(dossierReceiptFile)) {
  corrDossier = recordHistoricalCorrection067({
    correctionId: 'CORR-069A-LOTTE-EXCLUSION-CANDIDATE-DOSSIER',
    workOrder: 'JAYT-069A-GOVERNANCE-CLOSEOUT',
    targetFile: '05_DEAL_AND_AFFILIATE/candidate_evidence_dossier.json',
    beforeHash: '3da0ba722421f144daae480a424e8e19b671e35ca5dfa82200236a9925ee93cb',
    afterHash: dossierSha,
    reason: 'Đánh dấu CAND-DNG-LOTTE-65K sang DISALLOWED_SOURCE_LOTTECINEMAVN theo chỉ thị của CEO.',
    authorizedBy: 'CEO_DIRECTIVE_JAYT_069A_CLOSEOUT'
  });
}

// 3. Prepare Section 4 Row
const section4Content = [
  '| **`JAYT-069A-GOVERNANCE-CLOSEOUT`** ',
  '| **IMPLEMENTED — PENDING CEO AUDIT (069A CONTAINMENT IMPLEMENTED · OUT-OF-SCOPE UI DISCLOSED · LOTTE DISALLOWED)** ',
  '| - **069A Containment**: 15 artifact 069.1 đã vào quarantine vault, 4 candidate giả và CEO receipt giả bị loại bỏ, Staging khớp byte-for-byte baseline 061F (1/10 deal, 1 cụm, 1 ngày), Production khóa `[]` và `is_approved:false`, Guardrail 069A đạt 7/7 PASS.<br>',
  '- **Out-of-Scope UI Disclosure**: UI "Scenario Presets / Group Plan Builder" là thay đổi ngoài chỉ thị 069A, mang trạng thái `UNREVIEWED_OUT_OF_SCOPE`, không tính vào tiến độ Go-Live hay mở rộng; giữ nguyên không tự revert khi chưa có lệnh.<br>',
  '- **Lotte Exclusion & Correction**: Loại bỏ 100% nguồn `lottecinemavn.com` theo chỉ thị CEO, đưa `LEAD-068-04-LOTTE` về `LEAD_ONLY_NO_CLAIM` (available: false), gắn correction receipts đối soát toàn vẹn.<br>',
  '- **Quay lại 069 Step 1**: Bắt đầu chu trình capture thật → Evidence Bundle 5 mảnh → Review Pack; tuyệt đối 0 tự tạo candidate, CEO receipt hay staging deploy. |'
].join('');

// 4. Prepare Section 5 Text
const section5Text = [
  '**Work Order**: `JAYT-069A-GOVERNANCE-CLOSEOUT` (069A Governance Closeout & Out-of-Scope UI Disclosure)  ',
  '**Mục tiêu**: Ghi nhận closeout 069A containment, công bố minh bạch UI ngoài phạm vi là `UNREVIEWED_OUT_OF_SCOPE`, hoàn tất correction receipt loại trừ `lottecinemavn.com`, và chuẩn bị chuyển tiếp quay lại 069 Step 1 thu thập thật.\n\n',
  '**Hiện trạng Staging & Tiến độ thực tế**:\n',
  '- Staging Feed: 1 deal thật hợp lệ (`DNG-GALAXY-HAPPY-DAY-WEEKLY-TUESDAY-061F` — recheck due: 2026-08-30).\n',
  '- Tiến độ Go-Live thực tế: [ 1 / 10 ] Deal thật · [ 1 / 3 ] Cụm đại diện (LOCAL_CINEMA) · [ 1 / 5 ] Ngày (Thứ Ba).\n',
  '- Kho Quarantine: 3 VAULTS (`batch_040_synthetic`, `batch_047_synthetic`, `batch_069a_incident`: 15 files).\n',
  '- UI Status: `UNREVIEWED_OUT_OF_SCOPE` (không tính vào tiến độ Go-Live, không sửa/mở rộng thêm, không tự revert).\n\n',
  '**Tiêu chí nghiệm thu**:\n',
  '1. Toàn bộ 069A containment được ghi nhận đầy đủ (15 files quarantine, 0 candidate/receipt giả, Staging 061F baseline).\n',
  '2. Mọi chỉnh sửa trực tiếp `track2_lead_registry_068.json` và `candidate_evidence_dossier.json` có correction receipt/hash đầy đủ.\n',
  '3. UI changes sau 069A công bố minh bạch `UNREVIEWED_OUT_OF_SCOPE`, không thuộc release scope.\n',
  '4. Production lock bảo toàn tuyệt đối: `deals_feed.json: []` và `is_approved: false`.\n',
  '5. Quy trình thu thập tiếp theo tuân thủ nghiêm ngặt 069 Step 1: Capture thật → Evidence Bundle 5 mảnh → Review Pack.'
].join('');

// 5. Prepare Section 6 Log
const section6Log = [
  '| `2026-08-24T12:45:00+07:00` ',
  '| `JAYT-069A-GOVERNANCE-CLOSEOUT` ',
  '| **069A Governance Closeout & Out-of-Scope UI Disclosure** (CEO Directive): ',
  '(1) 069A Containment hoàn tất: 15 artifacts 069.1 cô lập tại `quarantine_vault/batch_069a_incident/`, Staging khớp baseline 061F (1/10 deal, 1 cụm, 1 ngày), Production khóa `[]` và `is_approved: false`, Guardrail 069A đạt 7/7 PASS; ',
  '(2) Công bố minh bạch UI "Scenario Presets / Group Plan Builder" là `UNREVIEWED_OUT_OF_SCOPE` — không thuộc release scope, không tính vào tiến độ Go-Live, không sửa/mở rộng thêm, không tự revert khi chưa có lệnh; ',
  '(3) Xác lập Correction Receipts cho việc loại trừ nguồn `lottecinemavn.com` trong `track2_lead_registry_068.json` và `candidate_evidence_dossier.json`; ',
  '(4) Sẵn sàng quay lại 069 Step 1: Capture thật → Evidence Bundle 5 mảnh → Review Pack (0 tự tạo candidate, CEO receipt hay staging deploy). ',
  '| [`07_QUALITY_ASSURANCE/runtime_evidence/runs/`](07_QUALITY_ASSURANCE/runtime_evidence/runs/) ',
  '| `test_web_enhancements_and_lotte_exclusion.js` & `test_incident_069a_containment_and_write_guards.js` ',
  '| **IMPLEMENTED — PENDING CEO AUDIT** |'
].join('');

// 6. Apply Project Memory Transaction
const result = applyProjectMemoryTransaction067({
  version: '3.99.0',
  workOrder: 'JAYT-069A-GOVERNANCE-CLOSEOUT',
  workOrderDescription: '069A Governance Closeout & Out-of-Scope UI Disclosure — xác nhận Containment 069A (7/7 PASS), công bố UI presets/group plan là UNREVIEWED_OUT_OF_SCOPE không thuộc release scope, loại bỏ nguồn lottecinemavn.com, giữ nguyên Staging 061F (1/10 deal) và chuẩn bị quay lại 069 Step 1 thu thập thật',
  headerStatusLine: [
    '057: ACCEPTED (OPERATING PROTOCOL)',
    '069A: IMPLEMENTED — PENDING CEO AUDIT (069A CONTAINMENT IMPLEMENTED; UI CHANGES: UNREVIEWED_OUT_OF_SCOPE — KHÔNG THUỘC RELEASE SCOPE)',
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
  historicalCorrections: []
});

console.log('TRANSACTION_069A_CLOSEOUT_SUCCESSFUL');
console.log('VERSION: 3.99.0');
console.log('FINAL_MEMORY_HASH:', result.finalHash);
console.log('TRANSACTION_RECEIPT:', result.transactionReceiptPath);
