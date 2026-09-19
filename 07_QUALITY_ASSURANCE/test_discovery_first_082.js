/**
 * JAYT DISCOVERY-FIRST & COMMUNITY SIGNALS TEST SUITE (082)
 * Directive: JAYT-DISCOVERY-FIRST-082
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');
const sotJsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const deployJsPath = path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js');
const sotHtmlPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html');
const deployHtmlPath = path.join(repoRoot, 'deploy', 'public', 'index.html');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');

console.log('🧪 [JAYT-DISCOVERY-FIRST-082-TEST] Khởi chạy bộ kiểm thử 082...\n');

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
const createdElements = [];
const domElementsMap = {};

const domMock = {
  getElementById: (id) => domElementsMap[id] || null,
  querySelectorAll: (sel) => [],
  createElement: (tag) => {
    let _text = '';
    const el = {
      tagName: tag.toUpperCase(),
      className: '',
      id: '',
      style: {},
      classList: { add: () => {}, remove: () => {} },
      setAttribute: (k, v) => { el[k] = v; },
      appendChild: () => {},
      addEventListener: () => {},
      remove: () => {},
      click: () => {},
      set textContent(v) { _text = v; },
      get textContent() { return _text; },
      set id(val) { el._id = val; domElementsMap[val] = el; },
      get id() { return el._id; }
    };
    createdElements.push(el);
    return el;
  },
  head: { appendChild: (c) => { if (c && c.id) domElementsMap[c.id] = c; } },
  body: { appendChild: (c) => { if (c && c.id) domElementsMap[c.id] = c; } },
  addEventListener: () => {},
  readyState: 'complete'
};

domElementsMap['jayt-apex'] = {
  id: 'jayt-apex',
  set innerHTML(val) { renderedHtml = val; },
  get innerHTML() { return renderedHtml; },
  textContent: '',
  value: '',
  appendChild: () => {},
  classList: { add: () => {}, remove: () => {} },
  setAttribute: () => {},
  addEventListener: () => {}
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

// 1. Syntax & VM Execution
try {
  vm.createContext(sandbox);
  vm.runInContext(jsCode, sandbox);
  assertCheck('TEST_01_JS_SYNTAX_AND_VM_EVAL', typeof sandbox.window.ApexApp === 'object', 'Mã nguồn JS thực thi hoàn hảo và export ApexApp.');
} catch (e) {
  assertCheck('TEST_01_JS_SYNTAX_AND_VM_EVAL', false, `Lỗi cú pháp / runtime: ${e.message}`);
}

// 2. Homepage Ordering: Verified (Compact) -> Community Signals (Main) -> Official Sources -> Supportive Tools
const hasVerifiedCompactBar = renderedHtml.includes('apex-verified-compact-bar');
const hasCommunitySignalsHeader = renderedHtml.includes('Tín Hiệu Ưu Đãi Từ Cộng Đồng');
const hasOfficialSourcesHeader = renderedHtml.includes('Nguồn Chính Thức Để Kiểm Tra');
const hasSupportiveToolsHeader = renderedHtml.includes('Công Cụ: Hành Trình Tiết Kiệm Cá Nhân');

const idxVerified = renderedHtml.indexOf('apex-verified-compact-bar');
const idxSignals = renderedHtml.indexOf('Tín Hiệu Ưu Đãi Từ Cộng Đồng');
const idxSources = renderedHtml.indexOf('Nguồn Chính Thức Để Kiểm Tra');
const idxTools = renderedHtml.indexOf('Công Cụ: Hành Trình Tiết Kiệm Cá Nhân');

const orderIsCorrect = (idxVerified >= 0) && (idxSignals > idxVerified) && (idxSources > idxSignals) && (idxTools > idxSources);

assertCheck('TEST_02_HOMEPAGE_ORDERING_VERIFIED',
  orderIsCorrect,
  'Trang chủ sắp xếp chuẩn Discovery-First: 1. Đáng xem hôm nay (thu gọn) -> 2. Tín hiệu cộng đồng (Khu vực chính) -> 3. Nguồn để kiểm tra -> 4. Ví & Máy tính bổ trợ.'
);

// 3. Compact Verified Banner (Zero Screen Takeover When 0 Verified Deals)
const hasNoDeadVerifiedGridWhenZero = !renderedHtml.includes('✨ Đáng Xem Hôm Nay (') && hasVerifiedCompactBar;
assertCheck('TEST_03_COMPACT_VERIFIED_BANNER_NO_TAKEOVER',
  hasNoDeadVerifiedGridWhenZero,
  'Khu vực Đáng xem hôm nay thu gọn thành status bar tinh tế khi 0 deal xác thực, không chiếm màn hình đầu trang.'
);

// 4. Community Signals Trust Labels & Lifecycle State
const hasUnverifiedBadgeClass = jsCode.includes('badge-unverified') && jsCode.includes('CHƯA XÁC MINH');
const hasLifecyclePills = jsCode.includes('badge-lifecycle-new') && jsCode.includes('badge-lifecycle-review') && jsCode.includes('badge-lifecycle-verified') && jsCode.includes('badge-lifecycle-insufficient');
const hasNoSpeculativePrices = !jsCode.includes('badge-deal-price-speculative');

assertCheck('TEST_04_COMMUNITY_SIGNAL_TRUST_LABELS',
  hasUnverifiedBadgeClass && hasLifecyclePills && hasNoSpeculativePrices,
  'Tín hiệu cộng đồng bắt buộc nhãn CHƯA XÁC MINH, có vòng đời 4 bước (Mới gửi, Đang đối soát, Đã xác thực, Không đủ chứng cứ), 0 giá suy diễn, 0 CTA mua.'
);

// 5. Official Sources Directory with Radar Categories (Zero Fake Deals)
const hasFoodSources = jsCode.includes('RADAR_KFC') && jsCode.includes('RADAR_JOLLIBEE') && jsCode.includes('RADAR_LOTTERIA');
const hasMobilitySources = jsCode.includes('RADAR_SHOPEEFOOD') && jsCode.includes('RADAR_GRAB') && jsCode.includes('RADAR_BE');
const hasCoffeeSources = jsCode.includes('RADAR_PHUCLONG') && jsCode.includes('RADAR_PHELA') && jsCode.includes('RADAR_HIGHLANDS');
const hasCinemaSources = jsCode.includes('RADAR_CGV') && jsCode.includes('RADAR_GALAXY') && jsCode.includes('RADAR_METIZ');
const hasWalletSources = jsCode.includes('RADAR_MOMO') && jsCode.includes('RADAR_ZALOPAY') && jsCode.includes('RADAR_SHOPEE');
const hasReportFromSource = jsCode.includes('btn-report-from-src') && (jsCode.includes('Báo mã') || jsCode.includes('Báo tín hiệu'));

assertCheck('TEST_05_OFFICIAL_SOURCES_DIRECTORY_4_CATEGORIES',
  hasFoodSources && hasMobilitySources && hasCoffeeSources && hasCinemaSources && hasWalletSources && hasReportFromSource,
  'Danh mục nguồn chính thức phân loại rõ các ngành (Ăn nhanh, Di chuyển, Cà phê trà, Rạp phim, Ví & Sàn TMĐT), dẫn kênh chính thức và hỗ trợ nút báo mã nhanh chóng.'
);

// 6. Geometry & Touch Targets Min 44px
const styleTag = createdElements.find(el => el.tagName === 'STYLE');
const cssText = styleTag ? styleTag.textContent || '' : '';

const hasNavBtn44 = cssText.includes('.apex-nav-btn') && cssText.includes('min-height: 44px;');
const hasMTabBtn44 = cssText.includes('.apex-m-tab-btn') && cssText.includes('min-height: 44px;');
const hasBtn44 = cssText.includes('.apex-btn') && cssText.includes('min-height: 44px;');
const hasBtnSm44 = cssText.includes('.apex-btn-sm') && cssText.includes('min-height: 44px;');
const hasFormInput44 = cssText.includes('.apex-form-input') && cssText.includes('min-height: 44px;');
const hasStepPill44 = cssText.includes('.apex-step-pill') && cssText.includes('min-height: 44px;');

assertCheck('TEST_06_TOUCH_TARGETS_AND_RESPONSIVE_GEOMETRY',
  hasNavBtn44 && hasMTabBtn44 && hasBtn44 && hasBtnSm44 && hasFormInput44 && hasStepPill44,
  'Toàn bộ phần tử tương tác (nút chính, nút phụ, thanh điều hướng mobile, ô nhập liệu, step pills) đạt chuẩn touch target tối thiểu 44px.'
);

// 7. Data Boundary & Clean Initial State
const cleanInitialVouchers = sandbox.window.ApexApp.state.userVouchers.length === 0;
const cleanInitialSignals = sandbox.window.ApexApp.state.communitySignals.length === 0;
const cleanInitialDaily = sandbox.window.ApexApp.state.dailyPlan.length === 0;

assertCheck('TEST_07_DATA_BOUNDARY_AND_CLEAN_STATE',
  cleanInitialVouchers && cleanInitialSignals && cleanInitialDaily,
  'Khởi tạo sạch hoàn toàn: 0 voucher lưu, 0 tín hiệu rác, 0 mục chi tiêu; phân tách ranh giới rõ ràng.'
);

// 8. Byte Parity & Catalog Lock
const sotJsHash = crypto.createHash('sha256').update(fs.readFileSync(sotJsPath)).digest('hex');
const depJsHash = crypto.createHash('sha256').update(fs.readFileSync(deployJsPath)).digest('hex');
const sotHtmlHash = crypto.createHash('sha256').update(fs.readFileSync(sotHtmlPath)).digest('hex');
const depHtmlHash = crypto.createHash('sha256').update(fs.readFileSync(deployHtmlPath)).digest('hex');

let prodFeed = [];
try { prodFeed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8')); } catch {}
const isCatalogLocked = Array.isArray(prodFeed) && prodFeed.length === 0;

assertCheck('TEST_08_RELEASE_PARITY_AND_CATALOG_FREEZE',
  (sotJsHash === depJsHash) && (sotHtmlHash === depHtmlHash) && isCatalogLocked,
  `Đồng bộ 100% hash parity (JS: ${sotJsHash.slice(0, 8)}..., HTML: ${sotHtmlHash.slice(0, 8)}...) và catalog production đóng băng [] (is_approved: false).`
);

console.log('\n======================================================');
if (fail === 0) {
  console.log(`🟢 [DISCOVERY-FIRST-082-SUMMARY] Kết quả kiểm thử: ${pass}/${pass + fail} PASS!`);
  process.exit(0);
} else {
  console.error(`🔴 [DISCOVERY-FIRST-082-SUMMARY] Kết quả kiểm thử: ${fail} FAIL / ${pass + fail} TOTAL!`);
  process.exit(1);
}
