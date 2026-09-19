/**
 * JAYT COMMUNITY SAVINGS HUB TRUTH TEST (080R)
 * Directive: JAYT-COMMUNITY-VOUCHER-080R
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

console.log('🧪 [JAYT-COMMUNITY-VOUCHER-080R-TEST] Khởi chạy bộ kiểm thử Truth 080R...\n');

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

// 2. Test Voucher Status Neutral Labels
const getVoucherStatus = sandbox.window.ApexApp?.getVoucherStatus;
let neutralStatusPass = false;
let negativeClaimsPass = false;

if (typeof getVoucherStatus === 'function') {
  const future10Days = new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const expired = '2020-01-01';

  const stFuture = getVoucherStatus(future10Days);
  const stNoExpiry = getVoucherStatus(null);
  const stTomorrow = getVoucherStatus(tomorrow);
  const stExpired = getVoucherStatus(expired);

  const isFutureUserEntered = stFuture.badgeClass === 'badge-user-entered' && stFuture.label.includes('Tự nhập (Còn hạn');
  const isNoExpiryUserEntered = stNoExpiry.badgeClass === 'badge-user-entered' && stNoExpiry.label.includes('Tự nhập (Không hạn)');
  const isTomorrowMonitoring = stTomorrow.badgeClass === 'badge-monitoring' && stTomorrow.label.includes('Sắp hết hạn');
  const isExpired = stExpired.badgeClass === 'badge-expired' && stExpired.label.includes('Đã hết hạn');

  neutralStatusPass = isFutureUserEntered && isNoExpiryUserEntered && isTomorrowMonitoring && isExpired;

  // Negative Check: NO "verified", "xác thực", "đối soát"
  const allLabels = [stFuture.label, stNoExpiry.label, stTomorrow.label, stExpired.label].join(' ').toLowerCase();
  const allClasses = [stFuture.badgeClass, stNoExpiry.badgeClass, stTomorrow.badgeClass, stExpired.badgeClass].join(' ').toLowerCase();
  
  negativeClaimsPass = !allLabels.includes('verified') &&
                       !allLabels.includes('xác thực') &&
                       !allLabels.includes('đối soát') &&
                       !allClasses.includes('verified');
}

assertCheck('TEST_02_VOUCHER_STATUS_NEUTRAL_LABELS',
  neutralStatusPass,
  'Trạng thái voucher tự nhập sử dụng nhãn trung tính badge-user-entered ("Tự nhập (Còn hạn ... ngày)"), không dùng badge-verified.'
);

assertCheck('TEST_03_NEGATIVE_NO_VERIFIED_CLAIMS_FOR_USER_VOUCHERS',
  negativeClaimsPass,
  'Test âm đạt 100%: Dữ liệu voucher tự nhập hoàn toàn không chứa class hoặc text "verified", "xác thực", "đối soát".'
);

// 4. Test Neutral Footer Copy
const hasNeutralFooter = jsCode.includes('Xem phạm vi dữ liệu và nguồn thông tin trong mục Minh bạch.');
const hasZeroAbsoluteFooter = !jsCode.includes('0 theo dõi riêng tư');

assertCheck('TEST_04_FOOTER_NEUTRAL_COPY',
  hasNeutralFooter && hasZeroAbsoluteFooter,
  'Footer hiển thị câu trung tính chuẩn mực, đã xóa bỏ cụm từ tuyệt đối "0 theo dõi riêng tư".'
);

// 5. Check Byte-for-Byte Hash Parity
const sotHash = crypto.createHash('sha256').update(fs.readFileSync(sotJsPath, 'utf8')).digest('hex');
const deployHash = crypto.createHash('sha256').update(fs.readFileSync(deployJsPath, 'utf8')).digest('hex');

assertCheck('TEST_05_BYTE_PARITY',
  sotHash === deployHash,
  `Mã băm Source of Truth và Deploy khớp byte-for-byte 100% (${sotHash}).`
);

// 6. Check Negative Invariants
const prodFeed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const isApproved = manifest.governance_locks?.immutable_ceo_approval_record?.is_approved;
const hasNoAffiliate = !jsCode.includes('shope.ee') && !jsCode.includes('accesstrade') && !jsCode.includes('is_affiliate: true');

assertCheck('TEST_06_NEGATIVE_INVARIANTS',
  Array.isArray(prodFeed) && prodFeed.length === 0 && isApproved === false && hasNoAffiliate,
  'Bảo toàn bất biến: Catalog production [], is_approved: false, 0 deep link affiliate.'
);

console.log(`\n======================================================`);
console.log(`🟢 [COMMUNITY-VOUCHER-080R-SUMMARY] Kết quả kiểm thử: ${pass}/${pass + fail} PASS!\n`);

if (fail > 0) process.exit(1);
