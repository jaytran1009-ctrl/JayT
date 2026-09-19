/**
 * JAYT UTILITY BETA RELEASE GATE TEST SUITE (079R3)
 * Directive: JAYT-UTILITY-BETA-079R3-RELEASE-GATE
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');

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

console.log('🧪 [JAYT-UTILITY-BETA-079R3-TEST] Khởi chạy bộ kiểm thử Release Gate 079R3...\n');

const sotJsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const deployJsPath = path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js');
const sotJsCode = fs.readFileSync(sotJsPath, 'utf8');
const deployJsCode = fs.readFileSync(deployJsPath, 'utf8');

// 1. Absolute Claims Strict Check
const forbiddenPhrases = [
  '100% minh bạch',
  'đã đối soát 5 chiều',
  'cam kết deal thật',
  'deal thật 100%'
];
let hasForbiddenPhrase = false;
forbiddenPhrases.forEach(p => {
  if (sotJsCode.toLowerCase().includes(p.toLowerCase())) {
    hasForbiddenPhrase = true;
  }
});

assertTest('TEST_01_ABSOLUTE_CLAIMS_FORBIDDEN',
  !hasForbiddenPhrase,
  'Giao diện Beta không chứa bất kỳ từ ngữ cam kết tuyệt đối nào ("100% minh bạch", "cam kết deal thật", ...).'
);

// 2. Hero Exact Phrasing Check
const expectedHeroPhrase = 'Trợ lý lập kế hoạch và tính tiền chi tiêu mỗi ngày cho sinh viên và người đi làm Đà Nẵng. Dữ liệu kế hoạch được lưu cục bộ trên thiết bị của bạn.';
assertTest('TEST_02_HERO_EXACT_PHRASING',
  sotJsCode.includes(expectedHeroPhrase),
  `Hero hiển thị chính xác câu trung thực: "${expectedHeroPhrase}".`
);

// 3. Neutralized App Checklist Check
const hasDiscountPromiseInChecklist = sotJsCode.includes('thường có thêm chiết khấu') || sotJsCode.includes('đảm bảo giỏ hàng đủ điều kiện áp mã để không bị hủy giảm giá');
const hasNeutralChecklist = sotJsCode.includes('Kiểm tra các phương thức thanh toán được hỗ trợ trên đơn.') && sotJsCode.includes('Khoảng cách và phụ phí giao nhận tại Đà Nẵng do từng ứng dụng quy định.');

assertTest('TEST_03_NEUTRALIZED_APP_CHECKLIST',
  !hasDiscountPromiseInChecklist && hasNeutralChecklist,
  'App Checklist trung tính hoàn toàn, không ngầm hứa hẹn có giảm giá/chiết khấu.'
);

// 4. Source of Truth vs Deploy Byte Parity Check
const sotHash = crypto.createHash('sha256').update(sotJsCode, 'utf8').digest('hex');
const deployHash = crypto.createHash('sha256').update(deployJsCode, 'utf8').digest('hex');

assertTest('TEST_04_BYTE_FOR_BYTE_HASH_PARITY',
  sotHash === deployHash,
  `Source of Truth và Deploy JS khớp byte-for-byte 100% (SHA-256: ${sotHash}).`
);

// 5. Invariants Check
const prodFeed = fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json'), 'utf8').trim();
const hasAffiliate = sotJsCode.includes('s.shopee.vn') || sotJsCode.includes('shp.ee');

assertTest('TEST_05_INVARIANTS_MAINTAINED',
  prodFeed === '[]' && !hasAffiliate,
  'Nguyên tắc bất biến bảo toàn: Production feed rỗng [], 0 affiliate link.'
);

console.log(`\n======================================================`);
console.log(`🟢 [UTILITY-BETA-079R3-SUMMARY] Kết quả kiểm thử: ${passCount}/${passCount + failCount} PASS!\n`);

if (failCount > 0) process.exit(1);
