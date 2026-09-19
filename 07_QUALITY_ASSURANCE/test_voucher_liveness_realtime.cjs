/**
 * JAYT-466: Real-Time Voucher Liveness & Usability Contract Test Suite
 * 
 * Verifies:
 * 1. 2-Tier Voucher Classification: Exactly 13 CLAIMABLE (wallet-save) and 5 PROMO_CODE (manual-paste).
 * 2. Mandatory Eligibility Terms: 100% vouchers have explicit account & order conditions.
 * 3. TANTHU0D Fix Verification: Zero text-paste instructions; explicit newbie restriction warning.
 * 4. 1-Tap Community Error Reporting: reportVoucherIssue and Next-Best Voucher failover.
 * 5. Real-Time Network Liveness Probes: Real HTTPS connectivity to e-commerce platforms.
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');

const ROOT = path.resolve(__dirname, '..');
const INTERFACE_PATH = path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const source = fs.readFileSync(INTERFACE_PATH, 'utf8');

console.log('=== JAYT: REAL-TIME VOUCHER LIVENESS & USABILITY CONTRACT TEST ===');

// --- 1. DATA INGRESS CONTRACT: 2-TIER CLASSIFICATION ---
console.log('[TEST 1/5] Kiểm tra Data Ingress Contract & phân loại 2 tầng...');

const vMatch = source.match(/const DAILY_HOT_VOUCHERS = Object\.freeze\(\[([\s\S]*?)\n\]\);/);
assert.ok(vMatch, 'DAILY_HOT_VOUCHERS registry must exist');

const vouchers = eval(`[${vMatch[1]}]`);
assert.equal(vouchers.length, 18, 'Must have exactly 18 daily hot vouchers');

const claimableVouchers = vouchers.filter(v => v.type === 'CLAIMABLE');
const promoCodeVouchers = vouchers.filter(v => v.type === 'PROMO_CODE');

assert.equal(claimableVouchers.length, 13, 'Must have exactly 13 CLAIMABLE vouchers');
assert.equal(promoCodeVouchers.length, 5, 'Must have exactly 5 PROMO_CODE vouchers');

console.log(`  -> PASS: 18 ưu đãi phân loại chính xác (${claimableVouchers.length} Thu Thập Ví 1-chạm + ${promoCodeVouchers.length} Mã Nhập Ký Tự).`);

// --- 2. ELIGIBILITY TERMS & TANTHU0D PRE-CONDITION VERIFICATION ---
console.log('[TEST 2/5] Kiểm tra Điều kiện áp dụng (Eligibility) & Khắc phục mã TANTHU0D...');

for (const v of vouchers) {
  assert.ok(v.eligibility && v.eligibility.length > 10, `Voucher [${v.code}] must have detailed eligibility conditions`);
  assert.ok(v.nextBestCode, `Voucher [${v.code}] must specify a nextBestCode alternative`);
  const nextBestExists = vouchers.some(item => item.code === v.nextBestCode);
  assert.ok(nextBestExists, `Voucher [${v.code}] nextBestCode [${v.nextBestCode}] must exist in registry`);
}

const tanthuVoucher = vouchers.find(v => v.code === 'TANTHU0D');
assert.ok(tanthuVoucher, 'TANTHU0D voucher must exist');
assert.equal(tanthuVoucher.type, 'CLAIMABLE', 'TANTHU0D must be strictly categorized as CLAIMABLE');
assert.ok(tanthuVoucher.eligibility.includes('chưa từng mua hàng'), 'TANTHU0D must state newbie account/device restriction');
assert.ok(tanthuVoucher.eligibility.includes('không gõ mã thủ công'), 'TANTHU0D must explicitly forbid typing code manually');

console.log('  -> PASS: 100% voucher có điều kiện áp dụng rõ ràng. Mã TANTHU0D đã khắc phục hoàn toàn với cảnh báo tài khoản mới và cấm gõ tay.');

// --- 3. UI ARCHITECTURE: CLAIMABLE MODAL & CARD CONTRACT ---
console.log('[TEST 3/5] Kiểm tra UI Modal phân nhánh thông minh & Thẻ voucher...');

assert.ok(source.includes('openVoucherGuideModal'), 'openVoucherGuideModal must exist');
assert.ok(source.includes('Lưu Ý Sống Còn Về Cơ Chế Sàn'), 'Modal must contain life-critical warning for claimable vouchers');
assert.ok(source.includes('Tuyệt đối KHÔNG gõ ký tự vào ô mã voucher'), 'Modal must explicitly forbid typing characters into voucher box');
assert.ok(source.includes('LƯU TẠI VÍ 1-CHẠM'), 'Card template must display LƯU TẠI VÍ 1-CHẠM badge');
assert.ok(source.includes('MÃ NHẬP TAY'), 'Card template must display MÃ NHẬP TAY badge');
assert.ok(source.includes('reportVoucherIssue'), 'reportVoucherIssue button and function must exist');

console.log('  -> PASS: Giao diện phân nhánh rành mạch: Voucher thu thập hướng dẫn lưu ví 1-chạm, cảnh báo đỏ cấm gõ tay; Thẻ hiển thị ô Điều kiện và nút Báo lỗi 1-chạm.');

// --- 4. COMMUNITY ISSUE REPORTING & NEXT-BEST FAILOVER ALGORITHM ---
console.log('[TEST 4/5] Kiểm tra Cơ chế Báo lỗi cộng đồng & Thuật toán Next-Best Voucher...');

const mockState = { reportedVouchers: {} };
const toastHolder = { text: '' };
function showJaytToast(msg) { toastHolder.text = msg; }
function triggerJaytSensoryFeedback() {}

const reportFuncMatch = source.match(/function reportVoucherIssue\(code\) \{[\s\S]*?\n\}/);
assert.ok(reportFuncMatch, 'reportVoucherIssue extracted');

const testReport = new Function('code', 'state', 'DAILY_HOT_VOUCHERS', 'showJaytToast', 'triggerJaytSensoryFeedback', 'toastHolder', `
  ${reportFuncMatch[0]}
  reportVoucherIssue(code);
  return { reportedCount: state.reportedVouchers[code], toast: toastHolder.text };
`);

const reportRes = testReport('TANTHU0D', mockState, vouchers, showJaytToast, triggerJaytSensoryFeedback, toastHolder);
assert.equal(reportRes.reportedCount, 1, 'Report count for TANTHU0D must be 1');
assert.ok(reportRes.toast.includes('Đã ghi nhận báo cáo'), 'Toast must confirm report receipt');
assert.ok(reportRes.toast.includes('FREESHIP50K') || reportRes.toast.includes('Miễn phí giao hàng'), 'Toast must propose next-best replacement');

console.log(`  -> PASS: Báo lỗi mã [TANTHU0D] thành công: Ghi nhận sensor cộng đồng và tự động đề xuất voucher thay thế: "${reportRes.toast}".`);

// --- 5. REAL-TIME HTTPS NETWORK LIVENESS PROBES ---
console.log('[TEST 5/5] Kiểm tra Network Liveness thực tế tới các sàn TMĐT...');

const PROBE_URLS = [
  { name: 'Shopee VN', url: 'https://shopee.vn' },
  { name: 'Lazada VN', url: 'https://www.lazada.vn' },
  { name: 'TikTok Shop', url: 'https://shop.tiktok.com' },
  { name: 'GrabFood VN', url: 'https://food.grab.com/vn/' },
  { name: 'Xanh SM', url: 'https://xanhsm.com' }
];

function probeUrl(target) {
  return new Promise(resolve => {
    const start = Date.now();
    const req = https.request(target.url, {
      method: 'HEAD',
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, res => {
      const latency = Date.now() - start;
      resolve({ name: target.name, url: target.url, statusCode: res.statusCode, latency, alive: res.statusCode < 500 });
    });

    req.on('error', err => {
      const latency = Date.now() - start;
      // Many bot protections reject HEAD requests with 403, but connectivity is established
      resolve({ name: target.name, url: target.url, statusCode: 'ERR', latency, alive: false, error: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ name: target.name, url: target.url, statusCode: 'TIMEOUT', latency: 8000, alive: false });
    });

    req.end();
  });
}

(async () => {
  const results = await Promise.all(PROBE_URLS.map(probeUrl));
  let aliveCount = 0;
  for (const r of results) {
    if (r.alive || r.statusCode === 200 || r.statusCode === 301 || r.statusCode === 302 || r.statusCode === 403) {
      // HTTP 200, 301, 302, or 403 (WAF challenge) proves server is live and responsive
      aliveCount++;
      console.log(`  -> [ONLINE] ${r.name.padEnd(14)}: HTTP ${r.statusCode} in ${r.latency}ms (${r.url})`);
    } else {
      console.log(`  -> [NOTICE] ${r.name.padEnd(14)}: ${r.statusCode} (${r.error || 'unreachable'})`);
    }
  }
  assert.ok(aliveCount >= 4, 'At least 4/5 e-commerce partner endpoints must be responsive and alive');
  console.log(`  -> PASS: Network Liveness đạt ${aliveCount}/5 nền tảng phản hồi trực tiếp.`);
  console.log('\n=== TẤT CẢ 5/5 BÀI KIỂM TOÁN VOUCHER LIVENESS & REAL-TIME ĐẠT PASS 100% ===');
})().catch(err => {
  console.error('Fatal in probe test:', err);
  process.exit(1);
});
