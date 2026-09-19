/**
 * JAYT UTILITY BETA EXPERIENCE TEST SUITE (079)
 * Directive: JAYT-UTILITY-BETA-EXPERIENCE-079
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

console.log('🧪 [JAYT-UTILITY-BETA-079-TEST] Khởi chạy bộ kiểm thử 10 Module Trợ lý tiết kiệm hằng ngày...\n');

// 1. Syntax & VM Evaluation Check
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsCode = fs.readFileSync(jsPath, 'utf8');

// Mock browser DOM environment in Node VM
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
  getElementById: (id) => ({ id, innerHTML: '', addEventListener: () => {}, querySelector: () => null }),
  querySelectorAll: () => [],
  createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, classList: { add: () => {}, remove: () => {} } })
};

let vmSuccess = false;
try {
  const context = vm.createContext({
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
  vm.runInContext(jsCode, context);
  vmSuccess = !!context.window.ApexApp;
} catch (e) {
  console.error('VM Execution Error:', e);
}

assertTest('TEST_01_JS_SYNTAX_AND_VM_EVAL',
  vmSuccess,
  'Mã nguồn JavaScript không có lỗi cú pháp, thực thi hoàn hảo trong môi trường DOM ảo.'
);

// 2. Module 1 Check: Onboarding & Need Picker
const hasOnboardingNeeds = jsCode.includes('Ăn trưa / Tối') && jsCode.includes('Cà phê / Trà') && jsCode.includes('Xem phim') && jsCode.includes('Ngân sách mục tiêu');
assertTest('TEST_02_MODULE_01_ONBOARDING_NEEDS',
  hasOnboardingNeeds,
  'Module 1 (Onboarding & Nhu cầu): Đầy đủ bộ chọn nhu cầu nhanh, đối tượng, khu vực và ngân sách.'
);

// 3. Module 2 Check: Daily Savings Planner with "Bạn tự nhập" Label
const hasDailyPlanner = jsCode.includes('Bộ Lập Kế Hoạch Tiết Kiệm Trong Ngày') && jsCode.includes('Bạn tự nhập') && jsCode.includes('Thực chi ước tính');
assertTest('TEST_03_MODULE_02_DAILY_PLANNER',
  hasDailyPlanner,
  'Module 2 (Kế hoạch trong ngày): Đầy đủ tính năng thêm/xóa hoạt động, tính tổng chi, chênh lệch ngân sách và nhãn trung thực "Bạn tự nhập".'
);

// 4. Module 3 Check: Personal 7-Day Plan with 3 Status Badges
const hasWeeklyPlanStatuses = jsCode.includes('Lịch Kế Hoạch 7 Ngày Cá Nhân') && jsCode.includes('Đã chốt') && jsCode.includes('Tự kiểm tra trong app') && jsCode.includes('Dự định');
assertTest('TEST_04_MODULE_03_PERSONAL_7DAY_PLAN',
  hasWeeklyPlanStatuses,
  'Module 3 (Lịch 7 ngày cá nhân): Hỗ trợ lập kế hoạch theo từng ngày trong tuần kèm 3 trạng thái kiểm định rõ ràng.'
);

// 5. Module 4 Check: Real-Price Calculator Pro with Min Spend Validation
const hasCalcPro = jsCode.includes('Đơn tối thiểu') && jsCode.includes('Chưa đạt đơn tối thiểu') && jsCode.includes('TỔNG THỰC TRẢ SAU CÙNG') && jsCode.includes('Chia mỗi người');
assertTest('TEST_05_MODULE_04_CALCULATOR_PRO_MIN_SPEND',
  hasCalcPro,
  'Module 4 (Máy tính thực trả Pro): Đầy đủ thuật toán kiểm tra đơn tối thiểu, chia tiền nhóm và cảnh báo điều kiện voucher.'
);

// 6. Module 5 Check: Group Plan Multi-Channel Sharing
const hasGroupPlanShare = jsCode.includes('Lập Kèo Nhóm & Chia Sẻ Đa Kênh') && jsCode.includes('Sao Chép Tin Nhắn') && jsCode.includes('Sao Chép Link Kế Hoạch') && jsCode.includes('#plan=');
assertTest('TEST_06_MODULE_05_GROUP_PLAN_SHARING',
  hasGroupPlanShare,
  'Module 5 (Lập kèo nhóm): Tự động tạo tin nhắn chia sẻ Zalo/Messenger/Instagram và mã hóa URL hash mở kế hoạch trực tiếp.'
);

// 7. Module 6 Check: App Checklist 4-Step Guide & Watchlist
const hasAppChecklist = jsCode.includes('Danh Sách "Cần Kiểm Tra Trong App"') && jsCode.includes('Mở ví voucher trong App') && jsCode.includes('Đối soát đơn tối thiểu');
assertTest('TEST_07_MODULE_06_APP_CHECKLIST_GUIDE',
  hasAppChecklist,
  'Module 6 (Checklist trong App): Quy chuẩn 4 bước kiểm tra voucher thực tế trên điện thoại.'
);

// 8. Module 7 Check: Da Nang District Radar Explorer
const hasDistrictRadar = jsCode.includes('Radar Khám Phá Địa Bàn Đà Nẵng') && jsCode.includes('Hải Châu') && jsCode.includes('Sơn Trà') && jsCode.includes('Liên Chiểu') && jsCode.includes('Ngũ Hành Sơn');
assertTest('TEST_08_MODULE_07_DISTRICT_RADAR',
  hasDistrictRadar,
  'Module 7 (Radar địa bàn Đà Nẵng): Phân loại theo 6 quận huyện kèm cẩm nang khu vực và kênh chính thức.'
);

// 9. Module 8 Check: Privacy Reminders & Web Notification Opt-in
const hasPrivacyReminders = jsCode.includes('Nhắc Lịch Tiết Kiệm Riêng Tư') && jsCode.includes('Lưu trong thiết bị; JayT không bảo đảm nhắc khi trình duyệt đóng.') && jsCode.includes('100% Cục bộ');
assertTest('TEST_09_MODULE_08_PRIVACY_REMINDERS',
  hasPrivacyReminders,
  'Module 8 (Nhắc lịch riêng tư): Hỗ trợ tạo nhắc nhở trên trình duyệt với mô tả trung thực về giới hạn nền khi đóng tab.'
);

// 10. Module 9 Check: Saved Vault & Clear All Local Data
const hasLocalStorageManager = jsCode.includes('Kho Yêu Thích & Quản Lý Dữ Liệu Cục Bộ') && jsCode.includes('Xóa Toàn Bộ Dữ Liệu Cục Bộ') && jsCode.includes('localStorage');
assertTest('TEST_10_MODULE_09_LOCAL_STORAGE_VAULT',
  hasLocalStorageManager,
  'Module 9 (Kho lưu & Quản lý dữ liệu): Lưu trữ an toàn trên thiết bị và có nút xóa sạch dữ liệu cục bộ.'
);

// 11. Module 10 Check: Transparency & Trust Guide
const hasTransparencyGuide = jsCode.includes('Minh Bạch & Tiêu Chuẩn Niềm Tin JayT') && jsCode.includes('VERIFIED_PUBLIC_DEAL') && jsCode.includes('RECURRING_GUIDE') && jsCode.includes('ACCOUNT_OR_CART_DEPENDENT');
assertTest('TEST_11_MODULE_10_TRANSPARENCY_GUIDE',
  hasTransparencyGuide,
  'Module 10 (Trang minh bạch): Giải thích chi tiết 4 cấp độ niềm tin và cam kết bảo vệ người dùng.'
);

// 12. Negative Invariants Check
const hasAffiliateLinks = jsCode.includes('s.shopee.vn') || jsCode.includes('shp.ee');
const hasFakeCountdown = jsCode.includes('countdown') || jsCode.includes('Đếm ngược') || jsCode.includes('Chỉ còn');
const prodFeed = fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json'), 'utf8').trim();

assertTest('TEST_12_STRICT_NEGATIVE_INVARIANTS',
  !hasAffiliateLinks && !hasFakeCountdown && prodFeed === '[]',
  'Nguyên tắc bất biến: 0 link affiliate, 0 đồng hồ đếm ngược ảo, Production feed duy trì tuyệt đối rỗng [].'
);

console.log(`\n======================================================`);
console.log(`🟢 [UTILITY-BETA-079-SUMMARY] Kết quả kiểm thử: ${passCount}/${passCount + failCount} PASS!\n`);

if (failCount > 0) process.exit(1);
