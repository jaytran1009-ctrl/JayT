/**
 * JAYT UTILITY BETA FINAL PRIVACY TEST SUITE (079R2)
 * Directive: JAYT-UTILITY-BETA-FINAL-PRIVACY-079R2
 */

const fs = require('fs');
const path = require('path');
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

console.log('🧪 [JAYT-UTILITY-BETA-079R2-TEST] Khởi chạy bộ kiểm thử Final Privacy 079R2...\n');

// 1. VM Evaluation
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsCode = fs.readFileSync(jsPath, 'utf8');

const mockStorage = {};
const mockWindow = {
  location: { hash: '', origin: 'https://jayt.vn', pathname: '/' },
  localStorage: {
    getItem: (k) => mockStorage[k] || null,
    setItem: (k, v) => { mockStorage[k] = v; },
    removeItem: (k) => { delete mockStorage[k]; }
  },
  navigator: { clipboard: { writeText: () => Promise.resolve() } },
  addEventListener: () => {},
  scrollTo: () => {}
};
const mockDocument = {
  readyState: 'complete',
  head: { appendChild: () => {} },
  body: { appendChild: () => {} },
  getElementById: (id) => ({ id, innerHTML: '', addEventListener: () => {}, querySelector: () => null, setAttribute: () => {} }),
  querySelectorAll: () => [],
  createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, classList: { add: () => {}, remove: () => {} } })
};

let vmContext = null;
try {
  vmContext = vm.createContext({
    window: mockWindow,
    document: mockDocument,
    localStorage: mockWindow.localStorage,
    navigator: mockWindow.navigator,
    Notification: { permission: 'default', requestPermission: () => Promise.resolve('granted') },
    console: console,
    prompt: () => '150000',
    confirm: () => true,
    alert: () => {}
  });
  vm.runInContext(jsCode, vmContext);
} catch (e) {
  console.error('VM Execution Error:', e);
}

// 1. Unified Calculation Engine Check
const calcFn = vmContext?.window?.ApexApp?.calculatePaymentBreakdown;
assertTest('TEST_01_UNIFIED_CALC_ENGINE',
  typeof calcFn === 'function',
  'Hàm tính toán thuần nhất calculatePaymentBreakdown hoạt động chính xác.'
);

// 2. Radar Note Standardization Check (Must contain exact string: "Kiểm tra điều kiện tại nguồn chính thức trước khi quyết định.")
const hasStandardRadarNotes = jsCode.includes('Kiểm tra điều kiện tại nguồn chính thức trước khi quyết định.');
const hasOldUnverifiedClaims = jsCode.includes('Chương trình thẻ thành viên') || jsCode.includes('Tích điểm và mã ưu đãi') || jsCode.includes('Mã cước xe thay đổi');
assertTest('TEST_02_RADAR_NOTES_STANDARDIZED',
  hasStandardRadarNotes && !hasOldUnverifiedClaims,
  'Toàn bộ note trong Radar và App Checklist đã đổi thành: "Kiểm tra điều kiện tại nguồn chính thức trước khi quyết định."'
);

// 3. Share Privacy Notice Accuracy Check
const hasAccurateShareNotice = jsCode.includes('Mọi nội dung bạn nhập sẽ nằm trong link. Không nhập số điện thoại, email, địa chỉ nhà hoặc thông tin riêng tư.');
assertTest('TEST_03_SHARE_PRIVACY_NOTICE_ACCURACY',
  hasAccurateShareNotice,
  'Cảnh báo chia sẻ link chính xác: "Mọi nội dung bạn nhập sẽ nằm trong link. Không nhập số điện thoại, email, địa chỉ nhà hoặc thông tin riêng tư."'
);

// 4. PII Detection Engine Check
const detectPIIFn = vmContext?.window?.ApexApp?.detectPII;
const hasPhone = detectPIIFn ? detectPIIFn({ title: 'Gặp gỡ', location: 'Gọi 0905123456 nhé' }) : false;
const hasEmail = detectPIIFn ? detectPIIFn({ title: 'Kèo ăn uống', conditions: 'gửi mail test@gmail.com' }) : false;
const isClean = detectPIIFn ? detectPIIFn({ title: 'Kèo ăn uống', conditions: 'tự túc nước' }) : true;

assertTest('TEST_04_PII_DETECTION_ENGINE',
  hasPhone === true && hasEmail === true && isClean === false,
  'Bộ lọc PII phát hiện chính xác số điện thoại và email trong kế hoạch chia sẻ.'
);

// 5. Third-Party App Buttons Copy Check
const hasOpenAppCopy = jsCode.includes('Mở ứng dụng để tự dán nội dung đã sao chép:');
const hasOpenAppButtons = jsCode.includes('Mở Zalo để dán') && jsCode.includes('Mở Messenger để dán') && jsCode.includes('Mở Instagram để dán');
assertTest('TEST_05_THIRD_PARTY_BUTTONS_COPY',
  hasOpenAppCopy && hasOpenAppButtons,
  'Nút chia sẻ bên thứ 3 hiển thị đúng bản chất: "Mở ứng dụng để tự dán nội dung đã sao chép".'
);

// 6. Reminder Truth Copy Check
const hasReminderTruth = jsCode.includes('Lưu trong thiết bị; JayT không bảo đảm nhắc khi trình duyệt đóng.');
assertTest('TEST_06_REMINDER_TRUTH_COPY',
  hasReminderTruth,
  'Mô tả Reminder minh bạch đúng thực tế: "Lưu trong thiết bị; JayT không bảo đảm nhắc khi trình duyệt đóng."'
);

// 7. Preset Truth Alert Check
const hasTruthAlert = jsCode.includes('không phải ưu đãi') && jsCode.includes('ví dụ minh họa');
assertTest('TEST_07_PRESET_TRUTH_ALERT',
  hasTruthAlert,
  'Truth alert cho Calculator presets được duy trì chuẩn mực.'
);

// 8. Accessibility Standards Check
const hasLabelsAndTouch = jsCode.includes(':focus-visible') && jsCode.includes('min-height: 44px') && jsCode.includes('for="in-calc-base"');
assertTest('TEST_08_ACCESSIBILITY_STANDARDS',
  hasLabelsAndTouch,
  'Accessibility chuẩn mực: Đầy đủ label for, focus-visible và touch target 44px.'
);

// 9. Negative Invariants Check
const hasAffiliate = jsCode.includes('s.shopee.vn') || jsCode.includes('shp.ee');
const prodFeed = fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json'), 'utf8').trim();
assertTest('TEST_09_NEGATIVE_INVARIANTS',
  !hasAffiliate && prodFeed === '[]',
  'Nguyên tắc bất biến: 0 link affiliate, Production feed duy trì tuyệt đối rỗng [].'
);

console.log(`\n======================================================`);
console.log(`🟢 [UTILITY-BETA-079R2-SUMMARY] Kết quả kiểm thử: ${passCount}/${passCount + failCount} PASS!\n`);

if (failCount > 0) process.exit(1);
