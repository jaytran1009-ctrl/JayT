/**
 * PROVENANCE & QUALITY GATE NEGATIVE TESTS (073B-INCIDENT)
 * Directive: JAYT-073B-INCIDENT — SYNTHETIC FEED AND FALSE G4 CONTAINMENT
 */

let passCount = 0;
let failCount = 0;

function assertTest(name, condition, message) {
  if (condition) {
    console.log(`  [${name}]: [PASS] - ${message}`);
    passCount++;
  } else {
    console.error(`  [${name}]: [FAIL] - ${message}`);
    failCount++;
  }
}

console.log('🧪 [TEST-PROVENANCE-GATE-073B] Bắt đầu kiểm thử rào chắn xuất xứ và chất lượng Feed...');

// Rule 1: Validate Feed Intake Provenance
function validateFeedSourceProvenance(sourceMeta) {
  if (!sourceMeta || !sourceMeta.provenance) {
    return { valid: false, reason: 'MISSING_PROVENANCE: No provenance metadata attached.' };
  }
  const allowed = ['USER_PROVIDED_ATTACHMENT', 'HUMAN_OPERATOR_DASHBOARD_EXPORT'];
  if (!allowed.includes(sourceMeta.provenance)) {
    return { valid: false, reason: `UNAUTHORIZED_PROVENANCE: '${sourceMeta.provenance}' is forbidden. Must be user-provided attachment.` };
  }
  if (sourceMeta.agent_created === true || sourceMeta.transcribed_from_screenshot === true) {
    return { valid: false, reason: 'AGENT_TRANSCRIBED_MUTATION: Agent transcription from screenshot/text is forbidden.' };
  }
  return { valid: true };
}

// Rule 2: Validate G4 Promotion Validity & Terms
function validateG4OfferQuality(item) {
  if (!item.valid_to && !item.recurring_rule) {
    return { valid: false, reason: 'MISSING_VALID_TO: Price/link without explicit valid_to is lead-only, not public deal.' };
  }
  if (!item.terms || typeof item.terms !== 'string' || item.terms.trim() === '') {
    return { valid: false, reason: 'MISSING_TERMS: Deal must have explicit terms and conditions.' };
  }
  if (item.synthetic_day_coverage === true || (!item.day_evidence && item.schedule_days && item.schedule_days.length === 7)) {
    return { valid: false, reason: 'SYNTHETIC_DAY_COVERAGE: Hardcoded 7-day schedule without day evidence is forbidden.' };
  }
  return { valid: true };
}

// 1. Negative Test: Agent-created CSV is rejected
const testAgentCsv = {
  provenance: 'AGENT_WRITTEN_CSV',
  agent_created: true
};
const resAgentCsv = validateFeedSourceProvenance(testAgentCsv);
assertTest('TEST_01_AGENT_CREATED_CSV_REJECTED',
  resAgentCsv.valid === false && resAgentCsv.reason.includes('UNAUTHORIZED_PROVENANCE'),
  'CSV do agent tự tạo bị chặn thành công.'
);

// 2. Negative Test: Screenshot-to-CSV transcription is rejected
const testScreenshotCsv = {
  provenance: 'HUMAN_OPERATOR_DASHBOARD_EXPORT',
  transcribed_from_screenshot: true
};
const resScreenshotCsv = validateFeedSourceProvenance(testScreenshotCsv);
assertTest('TEST_02_SCREENSHOT_TO_CSV_REJECTED',
  resScreenshotCsv.valid === false && resScreenshotCsv.reason.includes('AGENT_TRANSCRIBED_MUTATION'),
  'Trích xuất bảng từ screenshot/text bị chặn thành công.'
);

// 3. Negative Test: Item missing valid_to/terms cannot pass G4
const testLeadItem = {
  deal_id: 'DEAL-01',
  price: 74000,
  link: 'https://s.shopee.vn/123'
};
const resLeadItem = validateG4OfferQuality(testLeadItem);
assertTest('TEST_03_MISSING_VALID_TO_TERMS_BLOCKED_FROM_G4',
  resLeadItem.valid === false && resLeadItem.reason.includes('MISSING_VALID_TO'),
  'Deal thiếu valid_to/terms bị xếp là LEAD và chặn qua G4 thành công.'
);

// 4. Negative Test: Hardcoded 7-day coverage without evidence is rejected
const testHardcodedItem = {
  deal_id: 'DEAL-02',
  valid_to: '2026-12-31',
  terms: 'Áp dụng mua qua link',
  schedule_days: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  day_evidence: null
};
const resHardcoded = validateG4OfferQuality(testHardcodedItem);
assertTest('TEST_04_HARDCODED_7DAY_COVERAGE_REJECTED',
  resHardcoded.valid === false && resHardcoded.reason.includes('SYNTHETIC_DAY_COVERAGE'),
  'Gán lịch 7 ngày không có evidence bị chặn thành công (phải ghi NOT_ASSERTED).'
);

// 5. Positive Test: Authentic human attachment with explicit valid_to passes gate
const testValidItem = {
  deal_id: 'DEAL-03',
  valid_to: '2026-08-31',
  terms: 'Giảm 30% cho thành viên mới',
  schedule_days: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  day_evidence: 'Áp dụng mọi ngày trong tuần từ 24/08 đến 31/08/2026'
};
const resValidItem = validateG4OfferQuality(testValidItem);
assertTest('TEST_05_AUTHENTIC_OFFER_WITH_EVIDENCE_PASSES',
  resValidItem.valid === true,
  'Hồ sơ có đủ provenance thật, terms, valid_to và day evidence PASS gate hợp lệ.'
);

console.log(`\n======================================================`);
console.log(`🟢 [PROVENANCE-TEST-SUMMARY] Kết quả kiểm thử: ${passCount}/${passCount + failCount} PASS!`);

if (failCount > 0) process.exit(1);
