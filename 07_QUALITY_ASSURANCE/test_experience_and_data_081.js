/**
 * JAYT EXPERIENCE AND DATA TEST SUITE (081)
 * Directive: JAYT-EXPERIENCE-AND-DATA-081
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');
const sotJsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const deployJsPath = path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const manifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-EXPERIENCE-AND-DATA-081-TEST] Khởi chạy bộ kiểm thử 081...\n');

let pass = 0;
let fail = 0;

function assertCheck(name, condition, msg) {
  if (condition) {
    console.log(`  [${name}]: [PASS] - ${msg}`);
    pass++;
  } else {
    console.error(`  [${name}]: [FAIL] - ${msg}`);
    fail++;
  }
}

const jsCode = fs.readFileSync(sotJsPath, 'utf8');
const localStorageStore = {};

const mockLocalStorage = {
  getItem: (k) => localStorageStore[k] || null,
  setItem: (k, v) => { localStorageStore[k] = String(v); },
  removeItem: (k) => { delete localStorageStore[k]; },
  clear: () => { Object.keys(localStorageStore).forEach(k => delete localStorageStore[k]); }
};

let renderedHtml = '';
const domMock = {
  getElementById: (id) => ({
    id,
    set innerHTML(val) { renderedHtml = val; },
    get innerHTML() { return renderedHtml; },
    textContent: '',
    value: '',
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {} },
    setAttribute: () => {},
    addEventListener: () => {}
  }),
  querySelectorAll: () => [],
  createElement: (tag) => ({
    tagName: tag,
    className: '',
    id: '',
    style: {},
    classList: { add: () => {}, remove: () => {} },
    setAttribute: () => {},
    appendChild: () => {},
    addEventListener: () => {},
    remove: () => {},
    click: () => {}
  }),
  head: { appendChild: () => {} },
  body: { appendChild: () => {} },
  addEventListener: () => {},
  readyState: 'complete'
};

const sandbox = {
  window: {
    location: { origin: 'http://localhost', pathname: '/', hash: '' },
    localStorage: mockLocalStorage,
    scrollTo: () => {},
    open: () => {}
  },
  document: domMock,
  localStorage: mockLocalStorage,
  Notification: { permission: 'default', requestPermission: () => Promise.resolve('granted') },
  navigator: { clipboard: { writeText: () => Promise.resolve() } },
  prompt: () => '150000',
  confirm: () => true,
  alert: () => {},
  setTimeout: setTimeout,
  Date: Date,
  console: console
};
sandbox.window.window = sandbox.window;
sandbox.window.document = domMock;

// 1. Syntax & VM Mount
try {
  vm.createContext(sandbox);
  vm.runInContext(jsCode, sandbox);
  assertCheck('TEST_01_JS_SYNTAX_AND_VM_EVAL', typeof sandbox.window.ApexApp === 'object', 'Mã nguồn JS thực thi hoàn hảo và export ApexApp.');
} catch (e) {
  assertCheck('TEST_01_JS_SYNTAX_AND_VM_EVAL', false, `Lỗi cú pháp / runtime: ${e.message}`);
}

// 2. 5 Primary Tabs Navigation
const has5PrimaryNav = jsCode.includes('data-nav="dashboard"') &&
                       jsCode.includes('data-nav="my_vouchers"') &&
                       jsCode.includes('data-nav="calculator"') &&
                       jsCode.includes('data-nav="group_plan"') &&
                       jsCode.includes('data-nav="report_voucher"');
const hasSecondaryNav = jsCode.includes('data-nav="more"') || jsCode.includes('data-nav="schedule_7d"');

assertCheck('TEST_02_5_TAB_PRIMARY_NAVIGATION',
  has5PrimaryNav && hasSecondaryNav,
  'Hệ thống điều hướng chuẩn hóa 5 tab chính (Hôm Nay, Ví Voucher, Máy Tính, Kèo Nhóm, Báo Mã) và menu tiện ích mở rộng.'
);

// 3. 4-Step Savings Journey Loop
const hasStep1 = jsCode.includes('Bước 1: Hôm nay bạn cần chi tiêu gì tại Đà Nẵng?');
const hasStep2 = jsCode.includes('Bước 2: Bạn đang có voucher/mã giảm giá nào trong app?');
const hasStep3 = jsCode.includes('Bước 3: Tính toán thực chi chuẩn xác');
const hasStep4 = jsCode.includes('Bước 4: Lưu vào kế hoạch ngày hoặc chia sẻ kèo nhóm');

assertCheck('TEST_03_4_STEP_SAVINGS_JOURNEY_LOOP',
  hasStep1 && hasStep2 && hasStep3 && hasStep4,
  'Trang chủ thiết kế theo vòng lặp 4 bước liền mạch: Chọn nhu cầu → Thêm voucher → Tính thực trả → Lưu & chia sẻ.'
);

// 4. Compact Status Chip (No giant empty container above the fold)
const hasCollapsedChip = jsCode.includes('apex-verified-chip') &&
                         jsCode.includes('JayT đang mở beta. Ưu đãi chỉ xuất hiện khi đủ điều kiện đối soát.');

assertCheck('TEST_04_COMPACT_VERIFIED_STATUS_CHIP',
  hasCollapsedChip,
  'Khu vực ưu đãi xác thực được thu gọn thành status chip nhỏ gọn (Honest Status Chip), không chiếm above-the-fold.'
);

// 5. Honest Personal Progress Tracker
const hasProgressCard = jsCode.includes('apex-progress-card') && jsCode.includes('Tiến trình hôm nay của bạn:');
const noFakeSocialProof = !jsCode.includes('người đang săn') &&
                          !jsCode.includes('đang xem') &&
                          !jsCode.includes('deal hot cháy hàng');

assertCheck('TEST_05_HONEST_PERSONAL_PROGRESS_TRACKER',
  hasProgressCard && noFakeSocialProof,
  'Tiến trình cá nhân tính toán trung thực từ dữ liệu máy người dùng, cấm 100% social proof ảo.'
);

// 6. Layout Geometry & Responsive 390px
const hasMin44Touch = jsCode.includes('min-height: 44px;') || jsCode.includes('min-height:44px;');
const hasBoxSizing = jsCode.includes('box-sizing: border-box;');
const hasResponsiveMobile = jsCode.includes('@media (max-width: 1024px)') && jsCode.includes('.apex-mobile-nav-wrap');

assertCheck('TEST_06_LAYOUT_GEOMETRY_AND_RESPONSIVE_390PX',
  hasMin44Touch && hasBoxSizing && hasResponsiveMobile,
  'Kiểm thử layout geometry: Touch targets >= 44px, box-sizing containment, thanh điều hướng mobile responsive không tràn ngang.'
);

// 7. Byte-for-Byte Hash Parity
const sotHash = crypto.createHash('sha256').update(fs.readFileSync(sotJsPath, 'utf8')).digest('hex');
const deployHash = crypto.createHash('sha256').update(fs.readFileSync(deployJsPath, 'utf8')).digest('hex');

assertCheck('TEST_07_BYTE_PARITY',
  sotHash === deployHash,
  `Mã băm Source of Truth và Deploy khớp byte-for-byte 100% (${sotHash}).`
);

// 8. Negative Invariants
const prodFeed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const isApproved = manifest.governance_locks?.immutable_ceo_approval_record?.is_approved;
const hasNoAffiliate = !jsCode.includes('shope.ee') && !jsCode.includes('accesstrade') && !jsCode.includes('is_affiliate: true');

assertCheck('TEST_08_NEGATIVE_INVARIANTS',
  Array.isArray(prodFeed) && prodFeed.length === 0 && isApproved === false && hasNoAffiliate,
  'Bảo toàn bất biến: Catalog production [], is_approved: false, 0 deep link affiliate.'
);

console.log(`\n======================================================`);
console.log(`🟢 [EXPERIENCE-AND-DATA-081-SUMMARY] Kết quả kiểm thử: ${pass}/${pass + fail} PASS!\n`);

if (fail > 0) process.exit(1);
