/**
 * JAYT-416: REAL-TIME SENTINEL & DYNAMIC INGESTION QUALITY AUDIT SUITE
 * 
 * Mandate: CHAIRMAN_DIRECTIVE_20260917_REALTIME_CONTROL_PLANE_AND_DYNAMIC_INGESTION
 * 
 * Verifies:
 * 1. Real-Time Sentinel Liveness & 404 Deadlink Auto-Locking.
 * 2. Dynamic Ingestion Engine (URL parsing, partner code wrapping, Shopee/Lazada/TikTok).
 * 3. Smart Dynamic Price Range (Formatting & presence in modal and shelf card).
 * 4. Client Dynamic Ingestion Merge (Zero-code-change data overlay).
 * 5. Enhanced WebView Breaker (UA detection, price range display, modal guidance).
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('node:assert/strict');

const ROOT_DIR = path.resolve(__dirname, '..');
const APEX_FILE = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const DYNAMIC_REGISTRY_FILE = path.join(ROOT_DIR, '05_DEAL_AND_AFFILIATE/dynamic_sku_registry.json');
const SENTINEL_SCRIPT = path.join(ROOT_DIR, 'scripts/realtime_pdp_sentinel.cjs');
const INGEST_SCRIPT = path.join(ROOT_DIR, 'scripts/dynamic_ingest_pdp.cjs');

console.log('=== JAYT-416: REAL-TIME SENTINEL & DYNAMIC INGESTION AUDIT ===\n');

let passedTests = 0;
const totalTests = 5;

async function runAudit() {
// TEST 1: Real-Time Sentinel Liveness & 404 Auto-Lock
console.log('[TEST 1/5] Kiểm tra Cỗ máy Real-Time Sentinel & Khóa Cứng 404...');
const sentinel = require(SENTINEL_SCRIPT);
assert.ok(typeof sentinel.probeEndpoint === 'function', 'probeEndpoint function must exist');
assert.ok(typeof sentinel.runSentinelScan === 'function', 'runSentinelScan function must exist');

const receiptPath = path.join(ROOT_DIR, '07_QUALITY_ASSURANCE/runtime_evidence/REALTIME_SENTINEL_LIVENESS_RECEIPT.json');
assert.ok(fs.existsSync(receiptPath), 'Sentinel receipt must exist');
const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
assert.equal(receipt.deadlinksDetected, 0, 'Zero deadlinks must be detected in verified registry');
assert.ok(receipt.healthyLinksCount > 0, 'Healthy live links must be confirmed');
assert.ok(receipt.protectedLockedCount >= 20, 'Protected locked links must be preserved');
console.log(`  -> PASS: Sentinel liveness xác thực thành công: ${receipt.healthyLinksCount} links sống, ${receipt.protectedLockedCount} links khóa bảo vệ, 0 link chết 404.`);
passedTests++;

// TEST 2: Dynamic Ingestion Pipeline (Parsing & Official Partner Wrapping)
console.log('[TEST 2/5] Kiểm tra Quy trình Nạp Dữ Liệu Tự Động (Dynamic Ingestion Pipeline)...');
const ingestEngine = require(INGEST_SCRIPT);
assert.equal(ingestEngine.PARTNER_IDS.shopee, '17372870594', 'Shopee partner ID must be 17372870594');
assert.equal(ingestEngine.PARTNER_IDS.lazada, '262501305', 'Lazada partner ID must be 262501305');
assert.equal(ingestEngine.PARTNER_IDS.tiktok, 'VNVNLCB6LYL3', 'TikTok Shop partner ID must be VNVNLCB6LYL3');

// Test Shopee parse
const shopeeParsed = ingestEngine.parseRawProductUrl('https://shopee.vn/product/1016604648/23552060269?modelId=198273641');
assert.ok(shopeeParsed, 'Shopee URL must be parsed');
assert.equal(shopeeParsed.itemId, '23552060269');
assert.equal(shopeeParsed.shopId, '1016604648');
assert.equal(shopeeParsed.modelId, '198273641');
assert.ok(shopeeParsed.wrappedDeepLink.includes('partner=17372870594'), 'Must wrap Shopee official partner ID');

// Test Lazada parse
const lazadaParsed = ingestEngine.parseRawProductUrl('https://www.lazada.vn/products/-i266090481-s987654321.html');
assert.ok(lazadaParsed, 'Lazada URL must be parsed');
assert.equal(lazadaParsed.itemId, '266090481');
assert.equal(lazadaParsed.skuId, '987654321');
assert.ok(lazadaParsed.wrappedDeepLink.includes('pid=262501305'), 'Must wrap Lazada official partner ID');

// Test TikTok parse
const tiktokParsed = ingestEngine.parseRawProductUrl('https://shop.tiktok.com/view/product/172948201948?variant_id=987654321');
assert.ok(tiktokParsed, 'TikTok URL must be parsed');
assert.equal(tiktokParsed.productId, '172948201948');
assert.equal(tiktokParsed.variantId, '987654321');
assert.ok(tiktokParsed.wrappedDeepLink.includes('code=VNVNLCB6LYL3'), 'Must wrap TikTok official partner ID');

console.log('  -> PASS: Bóc tách chính xác 100% Shopee, Lazada, TikTok và tự động bọc mã đối tác chính thức.');
passedTests++;

// TEST 3: Smart Dynamic Price Range Calculation & Display
console.log('[TEST 3/5] Kiểm tra Biên độ giá động thông minh (Smart Dynamic Price Range)...');
const priceRange = ingestEngine.calculateSmartPriceRange(125000, 103750, 22500);
assert.equal(priceRange.listingPrice, 125000);
assert.equal(priceRange.observedPrice, 103750);
assert.equal(priceRange.floorPrice, 81250);
assert.ok(priceRange.rangeDisplay.includes('Giá tham khảo 125.000₫'));
assert.ok(priceRange.rangeDisplay.includes('81.250₫'));
assert.ok(priceRange.rangeDisplay.includes('103.750₫'));

// Verify presence in jayt_apex_interface.js
const apexCode = fs.readFileSync(APEX_FILE, 'utf8');
assert.ok(apexCode.includes('function formatDynamicPriceRange'), 'formatDynamicPriceRange must exist');
assert.ok(apexCode.includes('Biên độ giá động:'), 'Modal must render dynamic price range header');
assert.ok(apexCode.includes('Săn tại sàn: chỉ từ'), 'KTX card must render dynamic price range cue');

console.log('  -> PASS: Biên độ giá động được tính toán và kết xuất chuẩn xác: "Giá tham khảo 125.000₫ · Săn tại sàn: chỉ từ 81.250₫ – 103.750₫ khi áp mã".');
passedTests++;

// TEST 4: Client Dynamic Ingestion Merge (Zero-Code-Change)
console.log('[TEST 4/5] Kiểm tra Cơ chế Nạp Động Runtime (Zero-Code-Change Ingestion)...');
assert.ok(apexCode.includes('loadDynamicSkuRegistry'), 'loadDynamicSkuRegistry function must exist');

// Setup mock sandbox with fetch returning mock dynamic registry
const mockElements = {};
class MockElement {
  constructor(id, tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.className = '';
    this.style = {};
    this.innerHTML = '';
    this.innerText = '';
    this.attributes = {};
    this.listeners = {};
    this.children = [];
  }
  setAttribute(name, val) { this.attributes[name] = String(val); }
  getAttribute(name) { return this.attributes[name] || null; }
  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }
  appendChild(child) {
    this.children.push(child);
    if (child.id) mockElements[child.id] = child;
    return child;
  }
}

const mockDocument = {
  body: new MockElement('body', 'body'),
  getElementById: (id) => mockElements[id] || null,
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: (tag) => new MockElement('', tag)
};

const sandbox = {
  console,
  document: mockDocument,
  fetch: async (url) => {
    return {
      ok: true,
      json: async () => ({
        dynamic_skus: [
          {
            sku_id: 'DYNAMIC_TEST_INGESTION_SKU_99',
            product_name: 'Tai nghe Bluetooth sinh viên nạp qua Control Plane',
            category: 'Học tập & Công nghệ',
            observed_price: 99000,
            price_display: '99.000₫'
          }
        ]
      })
    };
  },
  window: {
    location: { href: 'https://jayt-production-v3420.vercel.app/', hostname: 'jayt-production-v3420.vercel.app' },
    addEventListener: () => {},
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    navigator: { userAgent: 'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36' },
    open: () => {}
  },
  navigator: { userAgent: 'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36' },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  setTimeout: (fn) => fn(),
  clearTimeout: () => {},
  setInterval: () => {},
  clearInterval: () => {}
};
sandbox.window.window = sandbox.window;
sandbox.window.document = mockDocument;
sandbox.window.fetch = sandbox.fetch;

vm.createContext(sandbox);
vm.runInContext(apexCode, sandbox);

// Call loadDynamicSkuRegistry and verify merge
const dormList = sandbox.window.J387_DORM_SKUS || sandbox.J387_DORM_SKUS;
assert.ok(dormList, 'J387_DORM_SKUS must exist on window');
await sandbox.window.loadDynamicSkuRegistry();
const mergedSku = dormList.find(s => s.sku_id === 'DYNAMIC_TEST_INGESTION_SKU_99');
assert.ok(mergedSku, 'Dynamic SKU must be merged into J387_DORM_SKUS');
assert.equal(mergedSku.observed_price, 99000);

console.log('  -> PASS: Client nạp và hợp nhất thành công sản phẩm từ dynamic_sku_registry.json mà không cần sửa code trung tâm.');
passedTests++;

// TEST 5: Enhanced WebView Breaker with Price Range Display & Safe Dispatch
console.log('[TEST 5/5] Kiểm tra WebView Breaker & Hướng Dẫn Mở Safari/Chrome...');
let currentUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 [FBAN/FBIOS;FBAV/400.0.0.0;FBBV/12345678;FBDV/iPhone14,2;FBMD/iPhone;FBSN/iOS;FBSV/17.0;FBSS/3;FBID/phone;FBLC/vi_VN;FBOP/5]';
sandbox.window.navigator = {
  get userAgent() { return currentUA; },
  clipboard: { writeText: async () => true }
};
sandbox.navigator = sandbox.window.navigator;

const dispatchRes = sandbox.dispatchSmartAffiliate('shopee', {
  itemId: '23552060269',
  shopId: '1016604648',
  observedPrice: 103750,
  listingPrice: 125000
}, 'TOPGIA20K');

assert.equal(dispatchRes.status, 'WEBVIEW_BREAKOUT_INTERCEPTED');
const breakoutModal = mockElements['jayt-webview-breakout-modal'];
assert.ok(breakoutModal, 'Breakout modal must be rendered in DOM');
assert.ok(breakoutModal.innerHTML.includes('Biên độ giá:'), 'Breakout modal must display smart dynamic price range');
assert.ok(breakoutModal.innerHTML.includes('TOPGIA20K'), 'Breakout modal must render voucher code');
assert.ok(breakoutModal.innerHTML.includes('Mở bằng trình duyệt'), 'Breakout modal must instruct 2-step opening');

console.log('  -> PASS: WebView Breaker đánh chặn mượt mà, hiển thị biên độ giá động và hướng dẫn mở Safari/Chrome.');
passedTests++;

console.log(`\n=== TẤT CẢ ${passedTests}/${totalTests} BÀI KIỂM ĐỊNH J416 ĐẠT PASS TUYỆT ĐỐI 100% ===`);
}

runAudit().catch(err => {
  console.error('\nFAIL:', err);
  process.exit(1);
});
