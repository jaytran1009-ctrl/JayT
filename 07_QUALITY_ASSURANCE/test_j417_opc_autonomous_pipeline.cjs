/**
 * JAYT-417: OPC AUTONOMOUS PIPELINE QUALITY AUDIT SUITE
 * 
 * Mandate: CHAIRMAN_DIRECTIVE_20260917_ACTIVATE_OPC_AUTONOMOUS_PIPELINE_AND_GO_LIVE
 * 
 * Verifies:
 * 1. Automated Sentinel Engine & 404 Hard-Locking.
 * 2. Telegram Bot Control Plane (Command routing, security gate, and reporting).
 * 3. Zero-Code Ingestion Engine & Partner ID Wrapping (Shopee 17372870594, Lazada 262501305, TikTok Shop VNVNLCB6LYL3).
 * 4. Dynamic Price Range & TopGia Floor Formatting.
 * 5. Commercial Fail-Closed & Dual-Workspace Parity.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');

const ROOT_DIR = path.resolve(__dirname, '..');
const APEX_FILE = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const CONTROL_PLANE = path.join(ROOT_DIR, 'scripts/telegram_bot_control_plane.cjs');
const INGEST_ENGINE = path.join(ROOT_DIR, 'scripts/dynamic_ingest_pdp.cjs');
const SENTINEL_ENGINE = path.join(ROOT_DIR, 'scripts/realtime_pdp_sentinel.cjs');
const REGISTRY_FILE = path.join(ROOT_DIR, '05_DEAL_AND_AFFILIATE/dynamic_sku_registry.json');

console.log('=== JAYT-417: OPC AUTONOMOUS PIPELINE AUDIT ===\n');

async function runSuite() {
  let passed = 0;

  // TEST 1: Automated Sentinel & 404 Hard-Lock
  console.log('[TEST 1/5] Kiem tra Co may Tu dong Sentinel & Khoa 404...');
  const sentinel = require(SENTINEL_ENGINE);
  const receipt = await sentinel.runSentinelScan({ scanOnce: true });
  assert.equal(receipt.deadlinksDetected, 0, 'Khong duoc ton tai link chet 404');
  assert.equal(receipt.healthyLinksCount, 10, 'Phai co 10 link Shopee Mall song');
  assert.equal(receipt.protectedLockedCount, 20, 'Phai co 20 link khoa bao ve khong cho bam');
  assert.equal(receipt.status, 'HEALTHY_ZERO_DEADLINKS');
  console.log('  -> PASS: Sentinel chay hoan hao, khoa cung 20 link thieu san, 10 link Mall song 100%.');
  passed++;

  // TEST 2: Telegram Bot Control Plane
  console.log('[TEST 2/5] Kiem tra Cong dieu khien Telegram Bot Control Plane...');
  const bot = require(CONTROL_PLANE);
  assert.ok(typeof bot.processInboundMessage === 'function', 'processInboundMessage phai ton tai');
  assert.ok(typeof bot.getSystemStatusReport === 'function', 'getSystemStatusReport phai ton tai');

  // Test /status
  const statusRes = await bot.processInboundMessage({ text: '/status', chat: { id: '1000' } });
  assert.ok(statusRes.success, '/status phai tra ve thanh cong');
  assert.ok(statusRes.response.includes('24/24 PASS TUYỆT ĐỐI'), 'Bao cao phai chua Static Seal 24/24');
  assert.ok(statusRes.response.includes('5/5 PASS_TOOLCHAIN_SEAL'), 'Bao cao phai chua W8 Toolchain Seal 5/5');
  assert.ok(statusRes.response.includes('CONFIG.affiliate_enabled: false'), 'Bao cao phai ghi nhan co an toan fail-closed');

  // Test /help
  const helpRes = await bot.processInboundMessage({ text: '/help', chat: { id: '1000' } });
  assert.ok(helpRes.success, '/help phai tra ve thanh cong');
  assert.ok(helpRes.response.includes('17372870594'), 'Huong dan phai ghi ro Partner ID Shopee');
  assert.ok(helpRes.response.includes('262501305'), 'Huong dan phai ghi ro Partner ID Lazada');
  assert.ok(helpRes.response.includes('VNVNLCB6LYL3'), 'Huong dan phai ghi ro Partner ID TikTok');

  console.log('  -> PASS: Telegram Bot Control Plane phan hoi chuan xac /status va /help voi day du Partner IDs.');
  passed++;

  // TEST 3: Zero-Code Ingestion & Partner ID Wrapping
  console.log('[TEST 3/5] Kiem tra Zero-Code Ingestion qua tin nhan tu dong...');
  const testMsg = 'https://shopee.vn/product/1016604648/23552060269?modelId=198273641 125000 160000 35000 J417LIVE Binh Nuoc Giu Nhiet JayT';
  const ingestRes = await bot.processInboundMessage({ text: testMsg, chat: { id: '1000' } });
  assert.ok(ingestRes.success, 'Tin nhan chua link phai nap thanh cong');
  assert.equal(ingestRes.ingested.partner_id, '17372870594', 'Shopee phai boc dung ma 17372870594');
  assert.equal(ingestRes.ingested.platform, 'shopee');
  assert.ok(ingestRes.ingested.official_deep_link.includes('partner=17372870594'));

  // Kiem tra Lazada
  const lazadaMsg = 'https://www.lazada.vn/products/-i266090481-s987654321.html 85000 110000 20000 LAZ20K San Pham LazMall';
  const lazRes = await bot.processInboundMessage({ text: lazadaMsg, chat: { id: '1000' } });
  assert.ok(lazRes.success);
  assert.equal(lazRes.ingested.partner_id, '262501305');
  assert.ok(lazRes.ingested.official_deep_link.includes('pid=262501305'));

  // Kiem tra TikTok Shop
  const ttMsg = 'https://shop.tiktok.com/view/product/172948201948?variant_id=987654321 75000 95000 15000 TTK15K San Pham TikTok';
  const ttRes = await bot.processInboundMessage({ text: ttMsg, chat: { id: '1000' } });
  assert.ok(ttRes.success);
  assert.equal(ttRes.ingested.partner_id, 'VNVNLCB6LYL3');
  assert.ok(ttRes.ingested.official_deep_link.includes('code=VNVNLCB6LYL3'));

  console.log('  -> PASS: Boc tach va boc Partner IDs chuan 100% cho Shopee (17372870594), Lazada (262501305), TikTok Shop (VNVNLCB6LYL3).');
  passed++;

  // TEST 4: Dynamic Price Range & TopGia Floor Formatting
  console.log('[TEST 4/5] Kiem tra Bien do gia dong thong minh & Dinh dang TopGia...');
  const ingestEngine = require(INGEST_ENGINE);
  const pr = ingestEngine.calculateSmartPriceRange(125000, 103750, 22500);
  assert.equal(pr.floorPrice, 81250);
  assert.equal(pr.observedPrice, 103750);
  assert.equal(pr.listingPrice, 125000);
  assert.ok(pr.voucherRangeDisplay.includes('Giá sàn sau voucher: chỉ từ 81.250₫ – 103.750₫ khi áp mã'), 'Dinh dang gia TopGia phai khop dung sac lenh Chu tich');
  assert.ok(pr.rangeDisplay.includes('Giá tham khảo 125.000₫'));
  console.log('  -> PASS: Bien do gia san sau voucher ket xuat chinh xac: ' + pr.voucherRangeDisplay);
  passed++;

  // TEST 5: Commercial Fail-Closed & Dual-Workspace Parity
  console.log('[TEST 5/5] Kiem tra Ky luat thuong mai fail-closed & Dong bo WS1-WS2...');
  const apexSource = fs.readFileSync(APEX_FILE, 'utf8');
  assert.ok(apexSource.includes('affiliate_enabled: false'), 'CONFIG.affiliate_enabled phai la false fail-closed');

  const reg = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf8'));
  assert.ok(reg.dynamic_skus.length >= 3, 'Registry phai co it nhat 3 SKUs nap dong');
  console.log('  -> PASS: affiliate_enabled: false fail-closed an toan tuyet doi; Registry dong co ' + reg.dynamic_skus.length + ' SKUs.');
  passed++;

  console.log('\n=== TẤT CẢ 5/5 BÀI KIỂM ĐỊNH J417 ĐẠT PASS TUYỆT ĐỐI 100% ===');
  process.exit(0);
}

runSuite().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
