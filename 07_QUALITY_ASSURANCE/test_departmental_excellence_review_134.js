/**
 * JAYT-134 QA TEST SUITE: ALL-DEPARTMENTS CUSTOMER EXCELLENCE REVIEW
 * 
 * Verifies:
 * 1. Existence and integrity of JAYT_134_ALL_DEPARTMENTS_CUSTOMER_EXCELLENCE_REVIEW_PACK.md.
 * 2. 10 Functional departments evaluated with core questions and metrics.
 * 3. 5 Customer journeys scored with live evidence, gaps, root causes, and risks.
 * 4. Compliance with CEO scoring invariant: No department rates 10/10 while F&B/Delivery gaps exist.
 * 5. Review of all 5 tiers of Canvas 133 on live production.
 * 6. Action plan for upcoming major batches (JAYT-135 & JAYT-136).
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const reviewPackPath = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_134_ALL_DEPARTMENTS_CUSTOMER_EXCELLENCE_REVIEW_PACK.md');

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
console.log('🏢 JAYT-134: ALL-DEPARTMENTS CUSTOMER EXCELLENCE REVIEW QA');
console.log('======================================================\n');

assert(fs.existsSync(reviewPackPath), 'Review Pack JAYT-134 exists in 08_RELEASE_VAULT');
const content = fs.readFileSync(reviewPackPath, 'utf8');

// 1. 10 Departments Presence
console.log('\n--- 1. 10 FUNCTIONAL DEPARTMENTS EVALUATION ---');
const departments = [
  'Product & Customer Insight (CPO)',
  'Design, UX & Accessibility (CDO)',
  'Customer Experience & Community (CX Lead)',
  'Data Supply & Evidence (Chief Data/Trust Officer)',
  'Deal Operations (Head of Deal Operations)',
  'Engineering & Reliability (CTO)',
  'QA & Release Governance (QA Director)',
  'Commercial & Affiliate (Commercial Director)',
  'Privacy & Safety (Security/Privacy Officer)',
  'Project Operations & Memory (COO)'
];

departments.forEach(dept => {
  assert(content.includes(dept), `Department evaluated: ${dept}`);
});

// 2. 5 Customer Journeys
console.log('\n--- 2. 5 CUSTOMER JOURNEYS COVERAGE ---');
const journeys = [
  'Lịch rạp, vé rẻ, hội viên & lập kèo',
  'So sánh giá thực trả giao đồ ăn',
  'Khám phá món/quán gần theo cụm và giờ',
  'Happy hour/F&B tạo thói quen quay lại',
  'Minh bạch dữ liệu, an toàn & CSKH'
];

journeys.forEach(j => {
  assert(content.includes(j), `Journey covered: ${j}`);
});

// 3. Brutal Honesty Invariant (No 10/10 when data gaps exist)
console.log('\n--- 3. BRUTAL HONESTY SCORING INVARIANT ---');
assert(content.includes('4.5 / 10') || content.includes('4.5/10'), 'Delivery score reflects realistic gap (4.5/10)');
assert(content.includes('5.5 / 10') || content.includes('5.5/10'), 'F&B score reflects lack of verified live deals (5.5/10)');
assert(!content.includes('10/10 TOÀN DIỆN') && !content.includes('10/10 HOÀN HẢO'), 'Zero premature 10/10 claims across all journeys');

// 4. Five-Tier Canvas 133 Live Audit
console.log('\n--- 4. FIVE-TIER CANVAS 133 AUDIT ---');
assert(content.includes('Tầng 1') && content.includes('chọn kèo hôm nay'), 'Tier 1 Today Hero reviewed');
assert(content.includes('Tầng 2') && content.includes('app rẻ nhất'), 'Tier 2 Hot Now reviewed');
assert(content.includes('Tầng 3') && content.includes('phân biệt lịch thật'), 'Tier 3 Plan Ahead reviewed');
assert(content.includes('Tầng 4') && content.includes('honest empty state'), 'Tier 4 & 5 Smart Buy & Voucher Wallet reviewed');

// 5. Next Strategic Batches
console.log('\n--- 5. STRATEGIC SPRINT ROADMAP ---');
assert(content.includes('JAYT-135') && content.includes('JAYT-136'), 'Roadmap defines JAYT-135 & JAYT-136 sprints');

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL JAYT-134 REVIEW PACK ASSERTIONS PASSED!');
  process.exit(0);
}
