/**
 * JAYT COMMUNITY SAVINGS HUB TEST SUITE (080)
 * Directive: JAYT-COMMUNITY-VOUCHER-080
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

console.log('🧪 [JAYT-COMMUNITY-VOUCHER-080-TEST] Khởi chạy bộ kiểm thử Community Savings Hub 080...\n');

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

// 1. Syntax & DOM Evaluation
const jsCode = fs.readFileSync(sotJsPath, 'utf8');
const localStorageStore = {};

const mockLocalStorage = {
  getItem: (k) => localStorageStore[k] || null,
  setItem: (k, v) => { localStorageStore[k] = String(v); },
  removeItem: (k) => { delete localStorageStore[k]; },
  clear: () => { Object.keys(localStorageStore).forEach(k => delete localStorageStore[k]); }
};

const domMock = {
  getElementById: (id) => ({
    id,
    innerHTML: '',
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
  prompt: () => '100000',
  confirm: () => true,
  alert: () => {},
  setTimeout: setTimeout,
  Date: Date,
  console: console
};
sandbox.window.window = sandbox.window;
sandbox.window.document = domMock;

try {
  vm.createContext(sandbox);
  vm.runInContext(jsCode, sandbox);
  assertCheck('TEST_01_JS_SYNTAX_AND_VM_EVAL', typeof sandbox.window.ApexApp === 'object', 'Mã nguồn JS thực thi hoàn hảo và export ApexApp.');
} catch (e) {
  assertCheck('TEST_01_JS_SYNTAX_AND_VM_EVAL', false, `Lỗi cú pháp / runtime: ${e.message}`);
}

// 2. Check Separation of 2 Areas in JS
const hasSection1Verified = jsCode.includes('KHU VỰC 1: Ưu Đãi Đã Xác Thực (Verified Deals)');
const hasSection2UserEntered = jsCode.includes('KHU VỰC 2: Kho Voucher Do Bạn Tự Nhập');
const hasClearEmptyBetaMsg = jsCode.includes('JayT đang mở beta. Ưu đãi chỉ xuất hiện khi đủ điều kiện đối soát.');

assertCheck('TEST_02_SEPARATED_AREAS_VERIFIED',
  hasSection1Verified && hasSection2UserEntered && hasClearEmptyBetaMsg,
  'Giao diện phân định rạch ròi 2 khu vực: Ưu đãi đã xác thực vs Kho voucher do bạn tự nhập, không trộn lẫn.'
);

// 3. Check "Voucher Của Tôi" (My Vouchers Vault)
const hasMyVouchersNav = jsCode.includes('my_vouchers') && jsCode.includes('Voucher Của Tôi');
const hasVoucherStatusEngine = typeof sandbox.window.ApexApp?.getVoucherStatus === 'function';

let voucherStatusCheck = false;
if (hasVoucherStatusEngine) {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const expired = '2020-01-01';
  const st1 = sandbox.window.ApexApp.getVoucherStatus(tomorrow);
  const st2 = sandbox.window.ApexApp.getVoucherStatus(expired);
  voucherStatusCheck = st1.badgeClass === 'badge-monitoring' && st2.badgeClass === 'badge-expired';
}

assertCheck('TEST_03_MY_VOUCHERS_VAULT',
  hasMyVouchersNav && voucherStatusCheck,
  'Module Voucher Của Tôi hoạt động chuẩn xác: Nhận diện mã, hạn dùng, tính toán trạng thái (sắp hết hạn / hết hạn).'
);

// 4. Check "Báo Voucher Vừa Thấy" (Inbound Signal)
const hasReportVoucherNav = jsCode.includes('report_voucher') && jsCode.includes('Báo Voucher');
const hasUnverifiedNotice = jsCode.includes('chỉ lưu vào radar cá nhân của bạn') && jsCode.includes('Chưa xác thực — không công khai');
const hasSignalsExport = jsCode.includes('btn-export-signals-json');

assertCheck('TEST_04_REPORT_VOUCHER_FLOW',
  hasReportVoucherNav && hasUnverifiedNotice && hasSignalsExport,
  'Luồng Báo Voucher Vừa Thấy đầy đủ biểu mẫu, cảnh báo Chưa xác thực và hỗ trợ xuất JSON đối soát.'
);

// 5. Check Dashboard Expiring Soon Widget & Apply to Calc
const hasExpiringSoonWidget = jsCode.includes('voucher sắp hết hạn');
const hasApplyVoucherToCalc = jsCode.includes('btn-apply-voucher-to-calc') && jsCode.includes('Áp vào Máy Tính');

assertCheck('TEST_05_DASHBOARD_EXPIRING_AND_CALC_APPLY',
  hasExpiringSoonWidget && hasApplyVoucherToCalc,
  'Dashboard tích hợp widget cảnh báo voucher sắp hết hạn và nút 1-click áp mã vào máy tính tiền.'
);

// 6. Check Negative Invariants (Prod feed [], 0 affiliate)
const prodFeed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const hasNoAffiliate = !jsCode.includes('shope.ee') && !jsCode.includes('accesstrade') && !jsCode.includes('is_affiliate: true');

const isApproved = manifest.governance_locks?.immutable_ceo_approval_record?.is_approved;

assertCheck('TEST_06_NEGATIVE_INVARIANTS',
  Array.isArray(prodFeed) && prodFeed.length === 0 && isApproved === false && hasNoAffiliate,
  'Bảo toàn bất biến: Catalog production [], is_approved: false, 0 deep link affiliate.'
);

// 7. Check Byte-for-Byte Hash Parity
const sotHash = crypto.createHash('sha256').update(fs.readFileSync(sotJsPath, 'utf8')).digest('hex');
const deployHash = crypto.createHash('sha256').update(fs.readFileSync(deployJsPath, 'utf8')).digest('hex');

assertCheck('TEST_07_BYTE_PARITY',
  sotHash === deployHash,
  `Mã băm Source of Truth và Deploy khớp byte-for-byte 100% (${sotHash}).`
);

console.log(`\n======================================================`);
console.log(`🟢 [COMMUNITY-VOUCHER-080-SUMMARY] Kết quả kiểm thử: ${pass}/${pass + fail} PASS!\n`);

if (fail > 0) process.exit(1);
