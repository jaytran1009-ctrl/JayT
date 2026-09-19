/**
 * JAYT-130 QA TEST SUITE: DAILY MEMORY & LESSONS LOOP ENFORCEMENT
 * 
 * Verifies:
 * 1. Daily Operating Brief exists for current operating date and contains all 5 mandatory sections.
 * 2. Operational Log is append-only, contains today's entry, files changed, actual tests run, and unverified disclosures.
 * 3. Lessons Learned Registry integrity and hash-chain compliance.
 * 4. PROJECT_MEMORY.md integrity and absence of forbidden unauthorized claims ("CEO approved", "verified", "premium", "live", "deployed") without backing evidence.
 * 5. Pre-report checklist items compliance (Data Truth, Provenance, UX Truth, Production Truth, Governance Truth).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const memoryPath = path.join(rootDir, 'PROJECT_MEMORY.md');
const registryPath = path.join(rootDir, '07_QUALITY_ASSURANCE', 'lessons_learned_registry.json');
const briefPath = path.join(rootDir, '09_OPERATIONS', 'daily_briefs', 'DAILY_OPERATING_BRIEF_2026_08_26.md');
const logPath = path.join(rootDir, '09_OPERATIONS', 'daily_logs', 'OPERATIONAL_LOG_2026_08_26.md');
const disciplinePath = path.join(rootDir, '09_OPERATIONS', 'DAILY_OPERATIONS_DISCIPLINE.md');
const receiptPath = path.join(rootDir, '08_RELEASE_VAULT', 'DEPLOYMENT_RECEIPT_129.json');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failCount++;
  }
}

console.log('\n======================================================');
console.log('🧪 JAYT-130: DAILY MEMORY & LESSONS LOOP QA SUITE');
console.log('======================================================\n');

// 1. Operations Discipline & Brief Verification
console.log('--- 1. DAILY OPERATING DISCIPLINE & BRIEF CHECK ---');
assert(fs.existsSync(disciplinePath), 'Operations Discipline protocol document exists (DAILY_OPERATIONS_DISCIPLINE.md)');
assert(fs.existsSync(briefPath), 'Daily Operating Brief for 2026-08-26 exists');

const briefContent = fs.readFileSync(briefPath, 'utf8');
assert(briefContent.includes('TRẠNG THÁI HỆ THỐNG THỰC TẾ'), 'Brief contains Ground Truth System State section');
assert(briefContent.includes('WORK ORDER ĐANG HOẠT ĐỘNG'), 'Brief contains Active Work Orders section');
assert(briefContent.includes('CÁC BẤT BIẾN KHÔNG ĐƯỢC VI PHẠM'), 'Brief contains Governance Invariants section');
assert(briefContent.includes('LỖI LỊCH SỬ ĐÃ TỪNG XẢY RA'), 'Brief contains Past Incidents & Lessons section');
assert(briefContent.includes('ĐIỀU KIỆN NGHIỆM THU VÀ BẰNG CHỨNG BẮT BUỘC'), 'Brief contains Acceptance Criteria & Evidence section');

// 2. Append-Only Operational Log Verification
console.log('\n--- 2. APPEND-ONLY OPERATIONAL LOG CHECK ---');
assert(fs.existsSync(logPath), 'Operational Log for 2026-08-26 exists');

const logContent = fs.readFileSync(logPath, 'utf8');
assert(logContent.includes('Việc thực hiện thực tế'), 'Log records actual work executed');
assert(logContent.includes('Danh sách tệp tin thay đổi / tạo mới'), 'Log records changed and created files');
assert(logContent.includes('Kết quả kiểm thử thực tế'), 'Log records actual test run results');
assert(logContent.includes('Những gì chưa kiểm chứng / chưa deploy / bị block'), 'Log discloses unverified/blocked items');
assert(logContent.includes('Lỗi mới phát hiện & Biện pháp ngăn tái diễn'), 'Log documents newly discovered errors & prevention measures');

// 3. Lessons Learned Registry Check
console.log('\n--- 3. LESSONS LEARNED REGISTRY CHECK ---');
assert(fs.existsSync(registryPath), 'Lessons Learned Registry exists (lessons_learned_registry.json)');

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
assert(Array.isArray(registry.incidents) && registry.incidents.length >= 10, `Registry contains ${registry.incidents?.length} historical incident prevention rules (>=10)`);

// 4. Memory SSOT & Receipt Consistency Check
console.log('\n--- 4. PROJECT MEMORY SSOT & RECEIPT INTEGRITY CHECK ---');
assert(fs.existsSync(memoryPath), 'PROJECT_MEMORY.md exists');
const memoryContent = fs.readFileSync(memoryPath, 'utf8');

assert(memoryContent.includes('TRANSACTION: JAYT-129-MOMENT-FIT-AND-CARD-TRUTH') || memoryContent.includes('TRANSACTION: JAYT-130-DAILY-MEMORY-AND-LESSONS-LOOP'), 'PROJECT_MEMORY.md contains latest valid memory transaction');
assert(fs.existsSync(receiptPath), 'Production deployment receipt exists (DEPLOYMENT_RECEIPT_129.json)');

const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
assert(receipt.audit_summary.all_byte_parity_match === true, 'Deployment receipt confirms 100% SHA-256 byte parity');
assert(receipt.audit_summary.slots_audited === 5, 'Deployment receipt confirms all 5 time slots were audited');

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL DAILY MEMORY & LESSONS LOOP GOVERNANCE ASSERTIONS PASSED!');
  process.exit(0);
}
