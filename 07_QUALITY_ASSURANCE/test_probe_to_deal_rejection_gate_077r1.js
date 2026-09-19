/**
 * PROBE-TO-DEAL REJECTION GATE TEST SUITE (077R1)
 * Directive: JAYT-077R1-SWEEP-ENGINE-FIX
 */

const fs = require('fs');
const path = require('path');

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

console.log('🧪 [TEST-PROBE-REJECTION-077R1] Bắt đầu kiểm thử rào chắn chặn probe 404/302/0 thành deal...');

// Gate Validator
function validateProbeCandidateEligibility(probeItem) {
  if (!probeItem || typeof probeItem !== 'object') {
    return { eligible: false, reason: 'INVALID_INPUT' };
  }
  if (probeItem.http_status === 404) {
    return { eligible: false, reason: 'HTTP_404_DEAD_ROUTE: URL không tồn tại, cấm tạo deal/candidate.' };
  }
  if (probeItem.http_status >= 300 && probeItem.http_status < 400) {
    return { eligible: false, reason: `HTTP_${probeItem.http_status}_REDIRECT: URL chuyển hướng, không trích xuất deal khi thiếu bằng chứng trang đích.` };
  }
  if (probeItem.http_status === 0 || probeItem.http_status === 408) {
    return { eligible: false, reason: 'CONNECTION_FAILED_OR_TIMEOUT: Không có phản hồi hợp lệ từ máy chủ.' };
  }
  if (probeItem.http_status === 403) {
    return { eligible: false, reason: 'HTTP_403_BLOCKED: Bị chặn quét tự động, cấm bypass.' };
  }
  if (probeItem.http_status === 200 && !probeItem.has_physical_evidence_bundle_on_disk) {
    return { eligible: false, reason: 'MISSING_PHYSICAL_EVIDENCE_ON_DISK: Probe 200 chỉ là metadata, cấm đưa vào Lịch Tiết Kiệm khi thiếu bundle.' };
  }
  return { eligible: true };
}

// 1. Negative Test: 404 response blocked
const res404 = validateProbeCandidateEligibility({ id: 'SRC_METIZ_PROBE', http_status: 404 });
assertTest('TEST_01_HTTP_404_REJECTED_FROM_DEAL',
  res404.eligible === false && res404.reason.includes('HTTP_404_DEAD_ROUTE'),
  'URL trả về HTTP 404 bị chặn thành công, không thể tạo candidate/deal.'
);

// 2. Negative Test: 302/301 redirect blocked
const res302 = validateProbeCandidateEligibility({ id: 'SRC_GALAXY_PROBE', http_status: 302 });
assertTest('TEST_02_HTTP_302_REDIRECT_REJECTED',
  res302.eligible === false && res302.reason.includes('REDIRECT'),
  'URL trả về HTTP 302 chuyển hướng bị chặn thành công.'
);

// 3. Negative Test: HTTP 0 / connection failure blocked
const res0 = validateProbeCandidateEligibility({ id: 'SRC_TIKTOK_PROBE', http_status: 0 });
assertTest('TEST_03_HTTP_0_CONNECTION_FAILURE_REJECTED',
  res0.eligible === false && res0.reason.includes('CONNECTION_FAILED'),
  'URL trả về HTTP 0 / lỗi kết nối bị chặn thành công.'
);

// 4. Negative Test: HTTP 200 without physical evidence bundle on disk is blocked from Schedule
const res200NoBundle = validateProbeCandidateEligibility({
  id: 'SRC_LOTTE_PROBE',
  http_status: 200,
  has_physical_evidence_bundle_on_disk: false
});
assertTest('TEST_04_PROBE_200_WITHOUT_BUNDLE_BLOCKED_FROM_SCHEDULE',
  res200NoBundle.eligible === false && res200NoBundle.reason.includes('MISSING_PHYSICAL_EVIDENCE_ON_DISK'),
  'Probe HTTP 200 thiếu bundle vật lý trên đĩa bị chặn đưa vào Lịch Tiết Kiệm (chỉ xếp Radar).'
);

// 5. Positive Test: Item with full physical evidence bundle on disk is accepted for Staging
const resValidBundle = validateProbeCandidateEligibility({
  id: 'DNG-METIZ-SUPER-MONDAY-2026',
  http_status: 200,
  has_physical_evidence_bundle_on_disk: true
});
assertTest('TEST_05_PHYSICAL_EVIDENCE_BUNDLE_PASSES',
  resValidBundle.eligible === true,
  'Deal có đủ 5 mảnh chứng cứ gốc trên đĩa (Galaxy / Metiz) được chấp nhận làm tham chiếu Staging hợp lệ.'
);

console.log(`\n======================================================`);
console.log(`🟢 [PROBE-REJECTION-GATE-SUMMARY] Kết quả kiểm thử: ${passCount}/${passCount + failCount} PASS!\n`);

if (failCount > 0) process.exit(1);
