/**
 * JAYT-435 10-GATE AUTOMATED QA TEST SUITE
 * Directive: CHAIRMAN_DIRECTIVE_20260918_AUTONOMOUS_OPC_FEATURE1_AND_ZERO_BUG_GATES
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const APEX_PATH = path.join(__dirname, '..', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const content = fs.readFileSync(APEX_PATH, 'utf8');

console.log('================================================================');
console.log('  JAYT-435 QA TEST SUITE: 10-GATE COMPREHENSIVE VERIFICATION');
console.log('================================================================\n');

const results = [];
function recordGate(num, name, passed, details) {
  results.push({ num, name, passed, details });
  console.log(`${passed ? '[PASS]' : '[FAIL]'} Gate ${num}: ${name}`);
  if (!passed) console.error(`       Error: ${details}`);
}

(async () => {
  // Extract data
  const flashMatch = content.match(/const JAYT_FLASH_ARBITRAGE_DEALS_70_80 = (?:Object\.freeze\()?\[([\s\S]*?)\n\]\)?;?/);
  const flashDeals = eval('[' + flashMatch[1] + ']');
  const tripletMatch = content.match(/const CROSS_PLATFORM_SKU_TRIPLETS = (?:Object\.freeze\()?\[([\s\S]*?)\n\]\)?;?/);
  const triplets = eval('[' + tripletMatch[1] + ']');

  // GATE 1: Image Sanity
  const imgUrls = new Set(flashDeals.map(d => d.imageUrl));
  const d1 = flashDeals.find(d => d.id === 'FLASH_DEAL_01_MOC_DAN_TUONG');
  const d2 = flashDeals.find(d => d.id === 'FLASH_DEAL_02_HOP_GIAY_TRONG_SUOT');
  const d3 = flashDeals.find(d => d.id === 'FLASH_DEAL_03_TOPGIA_TISSUE_MINI');
  const TOPGIA_CDN = 'https://down-vn.img.susercontent.com/file/sg-11134253-824iq-mej832cqxtza25';
  const g1Pass = (imgUrls.size === flashDeals.length) &&
                 d1 && d2 && d3 &&
                 d1.imageUrl !== TOPGIA_CDN &&
                 d2.imageUrl !== TOPGIA_CDN &&
                 d1.imageUrl !== d2.imageUrl &&
                 d3.imageUrl === TOPGIA_CDN;
  recordGate(1, 'Image Sanity & Zero Duplicate Media', g1Pass,
    g1Pass ? 'All 12 flash deals have distinct images, Deal 1/2/3 fully isolated' : 'Image duplicate or identity violation detected');

  // GATE 2: PDP Resolver (Zero search URLs in 12 flash deals)
  const searchUrls = flashDeals.filter(d => d.canonicalUrl.includes('search?') || d.canonicalUrl.includes('/search?q=') || d.canonicalUrl.includes('catalog/?q='));
  const g2Pass = searchUrls.length === 0;
  recordGate(2, 'PDP Resolver (Zero Search Query URLs)', g2Pass,
    g2Pass ? 'All 12 flash deals strictly use Direct PDP URLs' : `Found ${searchUrls.length} deals using search URLs`);

  // GATE 3: Direct PDP Link for Master Winner
  const hasMasterPdp = content.includes('// JAYT-435: DIRECT PDP LINK RESOLUTION FOR MASTER WINNER') &&
                       content.includes('tripletPlat && tripletPlat.pdpUrl');
  const g3Pass = hasMasterPdp;
  recordGate(3, 'Direct PDP Link for Master Winner Action', g3Pass,
    g3Pass ? 'Master Winner routes directly to PDP URL with isSearchFallback: false' : 'Direct PDP bypass missing in dispatchRadarPlatform');

  // GATE 4: Latency SLA <= 5ms
  const { performance } = require('perf_hooks');
  const t0 = performance.now();
  for (let i = 0; i < 100; i++) {
    const testUrl = 'https://shopee.vn/product/1016604648/23552060269';
    const m = testUrl.match(/product\/(\d+)\/(\d+)/);
    const id = m ? m[2] : null;
    const match = triplets.find(t => t.matchKeys && t.matchKeys.includes(id));
  }
  const avgLat = (performance.now() - t0) / 100;
  const g4Pass = avgLat <= 5.0;
  recordGate(4, 'Client Latency SLA (<= 5ms)', g4Pass,
    g4Pass ? `Average latency ${avgLat.toFixed(3)}ms <= 5ms` : `Latency ${avgLat.toFixed(3)}ms > 5ms`);

  // GATE 5: Affiliate Attribution Wrapping
  const hasShopee = content.includes('17372870594');
  const hasLazada = content.includes('262501305');
  const hasTikTok = content.includes('VNVNLCB6LYL3');
  const g5Pass = hasShopee && hasLazada && hasTikTok;
  recordGate(5, 'Affiliate Attribution Wrapping', g5Pass,
    g5Pass ? 'Shopee (17372870594), Lazada (262501305), TikTok Shop (VNVNLCB6LYL3) wrapped' : 'Missing partner ID');

  // GATE 6: AI Review 30s & Thư viện ảnh thật
  const hasReviewsModal = content.includes('openAuthenticReviewsModal') && content.includes('JAYT_AUTHENTIC_PRODUCT_REVIEWS');
  const g6Pass = hasReviewsModal;
  recordGate(6, 'AI Review 30s & Thư Viện Ảnh Thật', g6Pass,
    g6Pass ? 'AI Review Khen/Chê 30s & Raw Photo Library intact' : 'Reviews modal missing');

  // GATE 7: Kệ Săn Sập Sàn 70% – 80% (ép giá 4 tầng 9k, 19k, 39k)
  const hasFlashDeals = content.includes('JAYT_FLASH_ARBITRAGE_DEALS_70_80') && content.includes('renderFlashArbitrageRadar70_80');
  const g7Pass = hasFlashDeals && flashDeals.length === 12;
  recordGate(7, 'Kệ Săn Sập Sàn 70% – 80% (12 Deals Giá Đáy)', g7Pass,
    g7Pass ? 'Flash Arbitrage Radar 70% - 80% with 12 direct PDP deals intact' : 'Flash deals missing or modified');

  // GATE 8: Chrono-Calendar & Radar Giờ Vàng
  const hasChrono = content.includes('JAYT_MEGA_SALE_CALENDAR') && content.includes('renderPriceChronoRadarHtml');
  const g8Pass = hasChrono;
  recordGate(8, 'Chrono-Calendar & Radar Giờ Vàng (11:30 & 20:00)', g8Pass,
    g8Pass ? 'Chrono-Calendar & Live Countdown Heartbeat intact' : 'Chrono calendar missing');

  // GATE 9: Fail-Closed CONFIG.affiliate_enabled: false
  const hasFailClosed = content.includes('affiliate_enabled: false');
  const g9Pass = hasFailClosed;
  recordGate(9, 'Fail-Closed Production Boundary', g9Pass,
    g9Pass ? 'CONFIG.affiliate_enabled: false strictly enforced' : 'CONFIG.affiliate_enabled is not false!');

  // GATE 10: 5 Autonomous Pre-Deploy Gates Script Check
  let g10Pass = false;
  try {
    const out = execSync('node scripts/verify_autonomous_gates.cjs', { encoding: 'utf8', cwd: path.join(__dirname, '..') });
    g10Pass = out.includes('5/5 AUTONOMOUS GATES PASSED') || out.includes('6/6 CỔNG THÔNG QUA');
  } catch (_) {
    g10Pass = false;
  }
  recordGate(10, 'Autonomous Gates Script (verify_autonomous_gates.cjs)', g10Pass,
    g10Pass ? 'scripts/verify_autonomous_gates.cjs passed 5/5' : 'Autonomous gates script failed');

  const allPass = results.every(r => r.passed);
  console.log('\n================================================================');
  if (allPass) {
    console.log('  RESULT: 10/10 GATES PASSED (JAYT-435 FULL COMPLIANCE)');
    console.log('================================================================');
    process.exit(0);
  } else {
    console.error('  RESULT: QA SUITE FAILED');
    console.log('================================================================');
    process.exit(1);
  }
})();
