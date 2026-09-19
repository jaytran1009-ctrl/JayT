/**
 * JAYT UTILITY BETA TRUTH & PRIVACY TEST SUITE (079R)
 * Directive: JAYT-UTILITY-BETA-TRUTH-AND-PRIVACY-079R
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

console.log('🧪 [JAYT-UTILITY-BETA-079R-TEST] Khởi chạy bộ kiểm thử Truth & Privacy 079R...\n');

// 1. VM Evaluation & Unified Calculation Engine Test
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

const calcFn = vmContext?.window?.ApexApp?.calculatePaymentBreakdown;
assertTest('TEST_01_UNIFIED_CALC_ENGINE_EXISTS',
  typeof calcFn === 'function',
  'Hàm tính toán thuần nhất calculatePaymentBreakdown được export trên window.ApexApp.'
);

// Test calculation cases:
const caseA = calcFn({ item_price: 60000, voucher_discount: 15000, min_spend: 50000, shipping_fee: 15000, surcharge: 5000, split_count: 2 });
const caseB = calcFn({ item_price: 40000, voucher_discount: 15000, min_spend: 50000, shipping_fee: 10000, surcharge: 0, split_count: 1 });
const caseC = calcFn({ item_price: 20000, voucher_discount: 50000, min_spend: 0, shipping_fee: 10000, surcharge: 0, split_count: 1 });

assertTest('TEST_02_CALC_NORMAL_CASE',
  caseA.netTotal === 65000 && caseA.perPerson === 32500 && caseA.effectiveVoucher === 15000,
  `Trường hợp chuẩn: 60k - 15k voucher + 15k ship + 5k surcharge = 65k (chia 2 = 32.5k). Nhận được: net=${caseA.netTotal}, perPerson=${caseA.perPerson}`
);

assertTest('TEST_03_CALC_MIN_SPEND_NOT_MET',
  caseB.netTotal === 50000 && caseB.effectiveVoucher === 0 && !caseB.meetsMinSpend,
  `Trường hợp chưa đạt đơn tối thiểu: 40k < 50k min_spend -> voucher không áp dụng (0đ), net = 40k + 10k = 50k. Nhận được: net=${caseB.netTotal}`
);

assertTest('TEST_04_CALC_VOUCHER_GREATER_THAN_PRICE_CLAMPED',
  caseC.netTotal === 10000 && caseC.effectiveVoucher === 20000 && caseC.discountedItemPrice === 0,
  `Trường hợp voucher lớn hơn giá món: 50k voucher > 20k giá món -> clamp giá sau giảm = 0đ, net = 0đ + 10k ship = 10k (không âm!). Nhận được: net=${caseC.netTotal}`
);

// 2. Truth Banner for Presets / Samples Check
const hasTruthAlert = jsCode.includes('không phải ưu đãi') && jsCode.includes('Ví dụ minh họa');
assertTest('TEST_05_TRUTH_ALERT_FOR_PRESETS',
  hasTruthAlert,
  'Giao diện hiển thị rõ ràng nhãn cảnh báo: "Ví dụ minh họa — không phải ưu đãi của JayT; hãy nhập các số tiền thực tế trên đơn của bạn."'
);

// 3. Radar Zero Unverified Claims Check
const hasRadarSpecificHourClaims = jsCode.includes('11:00 & 17:00') || jsCode.includes('Khung giờ Sale') || jsCode.includes('Culture Day 58K');
const hasRadarOnlySafeLabels = jsCode.includes('Nguồn công khai đang theo dõi') && jsCode.includes('Tự kiểm tra trong app');
assertTest('TEST_06_RADAR_ZERO_CLAIMS_OR_HOURS',
  !hasRadarSpecificHourClaims && hasRadarOnlySafeLabels,
  'Radar không còn bất kỳ claim giờ/giá/ưu đãi giả định nào; chỉ hiển thị "Nguồn công khai đang theo dõi" hoặc "Tự kiểm tra trong app".'
);

// 4. Reminder Copy Accuracy Check
const hasReminderTruthCopy = jsCode.includes('Lưu trong thiết bị; JayT không bảo đảm nhắc khi trình duyệt đóng.');
assertTest('TEST_07_REMINDER_COPY_ACCURACY',
  hasReminderTruthCopy,
  'Mô tả Reminder minh bạch đúng thực tế: "Lưu trong thiết bị; JayT không bảo đảm nhắc khi trình duyệt đóng."'
);

// 5. Share Privacy Notice Check
const hasSharePrivacyNotice = jsCode.includes('Mọi nội dung bạn nhập sẽ nằm trong link. Không nhập số điện thoại, email, địa chỉ nhà hoặc thông tin riêng tư.');
assertTest('TEST_08_SHARE_PRIVACY_DISCLOSURE',
  hasSharePrivacyNotice,
  'Chia sẻ kế hoạch có cảnh báo riêng tư: "Mọi nội dung bạn nhập sẽ nằm trong link. Không nhập số điện thoại, email, địa chỉ nhà hoặc thông tin riêng tư."'
);

// 6. Accessibility, Touch Targets & Keyboard Focus Check
const hasInputLabels = jsCode.includes('for="in-calc-base"') && jsCode.includes('for="in-calc-voucher"') && jsCode.includes('for="in-gp-title"');
const hasFocusVisibleStyles = jsCode.includes(':focus-visible') && jsCode.includes('outline:');
const hasTouchTargetMin44 = jsCode.includes('min-height: 44px');

assertTest('TEST_09_ACCESSIBILITY_LABELS_AND_FOCUS',
  hasInputLabels && hasFocusVisibleStyles && hasTouchTargetMin44,
  'Accessibility đạt chuẩn: Toàn bộ input có <label for="...">, có styles :focus-visible và touch target tối thiểu 44px.'
);

// 7. Negative Invariants Check
const hasAffiliateLinks = jsCode.includes('s.shopee.vn') || jsCode.includes('shp.ee');
const prodFeed = fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json'), 'utf8').trim();

assertTest('TEST_10_NEGATIVE_INVARIANTS',
  !hasAffiliateLinks && prodFeed === '[]',
  'Nguyên tắc bất biến: 0 link affiliate, Production feed duy trì tuyệt đối rỗng [].'
);

console.log(`\n======================================================`);
console.log(`🟢 [UTILITY-BETA-079R-SUMMARY] Kết quả kiểm thử: ${passCount}/${passCount + failCount} PASS!\n`);

if (failCount > 0) process.exit(1);
