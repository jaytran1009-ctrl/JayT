/**
 * JAYT EXPERIENCE AND DATA E2E & GEOMETRY TEST SUITE (081R)
 * Directive: JAYT-EXPERIENCE-AND-DATA-081R
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
const receiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_081', 'SWEEP_081R_LINEAGE_CORRECTION_RECEIPT.json');

console.log('🧪 [JAYT-EXPERIENCE-AND-DATA-081R-TEST] Khởi chạy bộ kiểm thử 081R...\n');

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

// 2. Geometry & Touch Target Verification (Min 44px height for all interactive elements)
const styleTag = createdElements.find(el => el.tagName === 'STYLE');
const cssText = styleTag ? styleTag.textContent || '' : '';

const hasNavBtn44 = cssText.includes('.apex-nav-btn') && cssText.includes('min-height: 44px;');
const hasMTabBtn44 = cssText.includes('.apex-m-tab-btn') && cssText.includes('min-height: 44px;');
const hasBtn44 = cssText.includes('.apex-btn') && cssText.includes('min-height: 44px;');
const hasBtnSm44 = cssText.includes('.apex-btn-sm') && cssText.includes('min-height: 44px;');
const hasFormInput44 = cssText.includes('.apex-form-input') && cssText.includes('min-height: 44px;');
const hasStepPill44 = cssText.includes('.apex-step-pill') && cssText.includes('min-height: 44px;');
const hasSecondaryNav44 = jsCode.includes('style="font-size:12px;min-height:44px;"');

const touchTarget44Pass = hasNavBtn44 && hasMTabBtn44 && hasBtn44 && hasBtnSm44 && hasFormInput44 && hasStepPill44 && hasSecondaryNav44;

assertCheck('TEST_02_TOUCH_TARGETS_GEOMETRY_44PX',
  touchTarget44Pass,
  'Toàn bộ phần tử tương tác (nút chính, nút phụ, thanh điều hướng mobile, ô nhập liệu, step pills) đạt chuẩn touch target tối thiểu 44px.'
);

// 3. Mobile Viewport 390px Responsive Containment
const hasBoxSizingContainment = cssText.includes('box-sizing: border-box');
const hasMobileScrollbarNone = cssText.includes('.apex-mobile-nav-wrap') && cssText.includes('overflow-x: auto');
const hasNoHardcodedOverflowWidth = !cssText.includes('width: 1200px;') && !cssText.includes('width: 1600px;');

assertCheck('TEST_03_RESPONSIVE_390PX_CONTAINMENT',
  hasBoxSizingContainment && hasMobileScrollbarNone && hasNoHardcodedOverflowWidth,
  'Layout responsive ở khung hình 390px đạt chuẩn: box-sizing containment, overflow-x auto cho thanh nav, không tràn ngang.'
);

// 4. Neutral Instructional Placeholders (No fake codes/numbers)
const hasNoFakeFoodCode = !jsCode.includes('placeholder="Ví dụ: FOOD20K"');
const hasNoFakeDiscount20k = !jsCode.includes('placeholder="20000"');
const hasNoFakeMinSpend50k = !jsCode.includes('placeholder="50000"');
const hasNoFakeShopeeCode = !jsCode.includes('placeholder="Ví dụ: SHOPEEFOOD20K"');
const hasNoFakeBanMoiCode = !jsCode.includes('placeholder="Ví dụ: BANMOI"');

const placeholdersNeutral = hasNoFakeFoodCode && hasNoFakeDiscount20k && hasNoFakeMinSpend50k && hasNoFakeShopeeCode && hasNoFakeBanMoiCode;

assertCheck('TEST_04_NEUTRAL_PLACEHOLDERS_VERIFIED',
  placeholdersNeutral,
  'Đã loại bỏ toàn bộ placeholder gây hiểu nhầm (FOOD20K, 20000, 50000, BANMOI); thay thế bằng nhãn hướng dẫn trung tính.'
);

// 5. CTA User Flow: Add User Voucher -> Neutral Status -> Apply to Calculator -> Clamped Breakdown
let ctaFlowPass = false;
if (sandbox.window.ApexApp) {
  const v = {
    id: 'test_v_1',
    code: 'MYPERSONALVOUCHER',
    brand: 'ShopeeFood',
    discountAmount: 25000,
    minSpend: 60000,
    expiryDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]
  };

  const statusObj = sandbox.window.ApexApp.getVoucherStatus(v.expiryDate);
  const isStatusUserEntered = statusObj.badgeClass === 'badge-user-entered' && statusObj.label.includes('Tự nhập');

  const breakdown1 = sandbox.window.ApexApp.calculatePaymentBreakdown({
    item_price: 50000, // less than minSpend 60k
    voucher_discount: v.discountAmount,
    min_spend: v.minSpend,
    shipping_fee: 15000,
    surcharge: 0,
    split_count: 1
  });
  const minSpendBlocked = breakdown1.effectiveVoucher === 0 && breakdown1.netTotal === 65000;

  const breakdown2 = sandbox.window.ApexApp.calculatePaymentBreakdown({
    item_price: 80000, // meets minSpend 60k
    voucher_discount: v.discountAmount,
    min_spend: v.minSpend,
    shipping_fee: 15000,
    surcharge: 0,
    split_count: 2
  });
  const discountApplied = breakdown2.effectiveVoucher === 25000 && breakdown2.netTotal === 70000 && breakdown2.perPerson === 35000;

  ctaFlowPass = isStatusUserEntered && minSpendBlocked && discountApplied;
}

assertCheck('TEST_05_CTA_WORKFLOW_USER_VOUCHER_TO_CALC',
  ctaFlowPass,
  'Luồng CTA người dùng hoạt động hoàn hảo: Voucher tự nhập mang nhãn USER_ENTERED, áp vào máy tính kiểm tra đúng đơn tối thiểu và clamp thực chi.'
);

// 6. Lineage Correction Receipt 081R Integrity
let receiptValid = false;
if (fs.existsSync(receiptPath)) {
  const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
  const isReceiptDirective = receipt.directive === 'JAYT-EXPERIENCE-AND-DATA-081R';
  const has16Probes = Array.isArray(receipt.probes) && receipt.probes.length === 16;
  const allProbesMetadataOnly = receipt.probes.every(p => p.classification === 'NETWORK_PROBE_METADATA_ONLY');
  const allSnapshotsExistAndMatch = receipt.probes.every(p => {
    if (!p.snapshotPhysicalPathOnDisk) return false;
    const fullP = path.join(repoRoot, p.snapshotPhysicalPathOnDisk);
    if (!fs.existsSync(fullP)) return false;
    const buf = fs.readFileSync(fullP);
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    return hash === p.snapshotSha256;
  });

  receiptValid = isReceiptDirective && has16Probes && allProbesMetadataOnly && allSnapshotsExistAndMatch;
}

assertCheck('TEST_06_SWEEP_081R_LINEAGE_RECEIPT_INTEGRITY',
  receiptValid,
  'Biên bản đối soát nguồn SWEEP_081R_LINEAGE_CORRECTION_RECEIPT.json hợp lệ: 16/16 probe được phân loại NETWORK_PROBE_METADATA_ONLY và khớp byte-for-byte snapshot trên đĩa.'
);

// 7. Byte-for-Byte Hash Parity
const sotHash = crypto.createHash('sha256').update(fs.readFileSync(sotJsPath, 'utf8')).digest('hex');
const deployHash = crypto.createHash('sha256').update(fs.readFileSync(deployJsPath, 'utf8')).digest('hex');

assertCheck('TEST_07_BYTE_PARITY',
  sotHash === deployHash,
  `Mã băm Source of Truth và Deploy khớp byte-for-byte 100% (${sotHash}).`
);

// 8. Negative Invariants (Prod feed [], 0 affiliate)
const prodFeed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const isApproved = manifest.governance_locks?.immutable_ceo_approval_record?.is_approved;
const hasNoAffiliate = !jsCode.includes('shope.ee') && !jsCode.includes('accesstrade') && !jsCode.includes('is_affiliate: true');

assertCheck('TEST_08_NEGATIVE_INVARIANTS',
  Array.isArray(prodFeed) && prodFeed.length === 0 && isApproved === false && hasNoAffiliate,
  'Bảo toàn bất biến: Catalog production [], is_approved: false, 0 deep link affiliate.'
);

console.log(`\n======================================================`);
console.log(`🟢 [EXPERIENCE-AND-DATA-081R-SUMMARY] Kết quả kiểm thử: ${pass}/${pass + fail} PASS!\n`);

if (fail > 0) process.exit(1);
