const fs = require('fs');
const path = require('path');
const { applyProjectMemoryTransaction067 } = require('./memory_transaction_manager_057');

console.log('=== EXECUTING MEMORY TRANSACTION VIA IDEMPOTENT TRANSACTION MANAGER 067: JAYT-214 ===\n');

try {
  const result = applyProjectMemoryTransaction067({
    version: '3.354.0',
    workOrder: 'JAYT-214',
    headerStatusLine: '057: ACCEPTED | 067: ACCEPTED | 067A: ACCEPTED | 068R: ACCEPTED BY CEO | 068U: ACCEPTED BY CEO | 079R3: ACCEPTED BY CEO | 080R: ACCEPTED BY CEO | 083F: ACCEPTED BY CEO | 084B: ACCEPTED BY CEO | 085: ACCEPTED BY CEO | 086: ACCEPTED BY CEO | 086V: ACCEPTED BY CEO | 087A: ACCEPTED BY CEO | 088: ACCEPTED BY CEO | 088B: ACCEPTED BY CEO | 088C: ACCEPTED BY CEO | 088D: ACCEPTED BY CEO | 090: ACCEPTED BY CEO | 090A: ACCEPTED BY CEO | 091: ACCEPTED BY CEO | 091B: ACCEPTED BY CEO | 093A: ACCEPTED BY CEO | 093B: ACCEPTED BY CEO | 179: IMPLEMENTED_PENDING_CEO_AUDIT | 180: IMPLEMENTED_PENDING_CEO_AUDIT | 181: IMPLEMENTED_PENDING_CEO_AUDIT | 182: REJECTED | 183: REJECTED_ARCHIVE_AUDIT | 183R: IMPLEMENTED_PENDING_CEO_AUDIT | 184: IMPLEMENTED_PENDING_CEO_AUDIT | 185: IMPLEMENTED_PENDING_CEO_AUDIT | 186: IMPLEMENTED_PENDING_CEO_AUDIT | 187: IMPLEMENTED_PENDING_CEO_AUDIT | 188: REJECTED | 189: ACCEPTED_CONTAINMENT | 190: REJECTED_SEMANTIC_OVERCLAIM | 191: ACCEPTED_EVIDENCE_PENDING_SEPARATION | 192: ACCEPTED_DAILY_STUDENT_SPLIT_PENDING_LOCALITY | 193: ACCEPTED_BRANCH_PROOF_PENDING_APPLICABILITY | 194: ACCEPTED_APPLICABILITY_COUNTING | 195: REJECTED | 196: ACCEPTED_CONTAINMENT | 197: ACCEPTED_SCALE_REAL_SUPPLY | 198: REJECTED | 199: ACCEPTED_CONTAINMENT | 200: ACCEPTED_AUTOPILOT_SPRINT | 201: REJECTED | 202: ACCEPTED_CONTAINMENT | 205: REJECTED | 206: ACCEPTED_CONTAINMENT | 207: ACCEPTED | 208: ACCEPTED | 209: ACCEPTED | 210: REJECTED_SEMANTIC_OVERCLAIM | 211: ACCEPTED | 212: REJECTED_SEMANTIC_OVERCLAIM | 213: REJECTED_UNPROVEN_DEPLOYMENT | 214: IMPLEMENTED_PENDING_CEO_AUDIT',
    changesSummary: 'Thực thi Chỉ thị CEO JAYT-214 (Live Visual Release & First-View Experience Fix): (1) Nâng cấp card visual canvas lớn (min-height >= 156px mobile / >= 180px desktop) với monogram 56px dập nổi, loại bỏ card chữ dày đặc; (2) Tinh gọn viewport đầu tiên để card hiển thị ngay above the fold; (3) Tích hợp Detail Sheet Modal với Hero Visual và 4 Layer Visual Gallery; (4) Giữ vững nhãn trung thực "Nhận diện thương hiệu — chưa có ảnh ưu đãi/địa điểm xác minh" và báo cáo chính xác 0/29 ảnh khuyến mãi độc quyền; (5) Deploy trực tiếp lên Vercel Production và xác nhận 3 Cổng với mã băm từ xa khớp 100%; (6) Thu thập 5 ảnh chụp live thực tế và vượt qua 17/17 Final Gate.',
    affectedFiles: [
      '03_SOURCE_OF_TRUTH/index.html',
      '03_SOURCE_OF_TRUTH/jayt_apex_interface.js',
      '07_QUALITY_ASSURANCE/test_live_visual_release_214.js',
      '07_QUALITY_ASSURANCE/certify_live_visual_release_214.js',
      '07_QUALITY_ASSURANCE/runtime_evidence/evidence_214_certification/CERTIFICATION_214_LIVE_REPORT.json',
      '08_RELEASE_VAULT/DISCLOSURE_214_LIVE_VISUAL_RELEASE_AND_FIRST_VIEW_FIX.md'
    ]
  });

  console.log('✅ [TRANSACTION-214-RESULT]');
  console.log('Status: ' + result.status);
  console.log('Version: ' + result.version);
  console.log('Pre-Hash: ' + result.preHash);
  console.log('Final-Hash: ' + result.finalHash);
  console.log('Receipt Path: ' + result.receiptPath);
  console.log('\nHANDOVER BLOCK:');
  console.log(result.handoverBlock);

} catch (err) {
  console.error('❌ FATAL TRANSACTION ERROR:', err.message);
  process.exit(1);
}
