/**
 * JAYT-436 QA TEST SUITE: BAN KIỂM ĐỊNH KỸ TRỊ ZQA 10-GATE VERIFICATION
 * Directive: CHAIRMAN_DIRECTIVE_20260918_FIX_TIER2_SEARCH_LOGIC_AND_ESTABLISH_ZQA_DIVISION (JAYT-436)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execSync } = require('child_process');

const APEX_PATH = path.join(__dirname, '..', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const content = fs.readFileSync(APEX_PATH, 'utf8');

console.log('================================================================');
console.log('  JAYT-436 QA TEST SUITE: BAN KIỂM ĐỊNH KỸ TRỊ ZQA 10 GATES');
console.log('  Directive: CHAIRMAN_DIRECTIVE_20260918_FIX_TIER2_SEARCH_LOGIC');
console.log('================================================================\n');

const results = [];
function recordGate(num, name, passed, details) {
  results.push({ num, name, passed, details });
  console.log(`${passed ? '[PASS]' : '[FAIL]'} Gate ${num}: ${name}`);
  if (!passed) console.error(`       Error: ${details}`);
}

(async () => {
  // Sandbox VM setup
  const sandbox = {
    window: {},
    document: { body: { style: {} }, createElement: () => ({ style: {} }), getElementById: () => null },
    localStorage: { getItem: () => null, setItem: () => {} },
    performance: { now: () => Date.now() },
    console: console,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    addEventListener: () => {}
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(content, sandbox);

  // Extract data
  const flashMatch = content.match(/const JAYT_FLASH_ARBITRAGE_DEALS_70_80 = (?:Object\.freeze\()?\[([\s\S]*?)\n\]\)?;?/);
  const flashDeals = eval('[' + flashMatch[1] + ']');

  // GATE 1: Image Sanity & Zero Duplicate Media
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

  // GATE 2: Dual-Tier Semantic Decoupling (No Brand Leakage in Tầng 2)
  const pillowParsed = sandbox.extractSmartProductMeta('https://shop.tiktok.com/vn/pdp/1734961837103548126', 'tiktok', null, '1734961837103548126');
  const pillowRadar = sandbox.computeCrossPlatformRadar(pillowParsed, 179000);
  let g2Pass = true;
  let g2Details = '';
  if (!pillowRadar || !pillowRadar.tierTrusted || pillowRadar.tierTrusted.length === 0) {
    g2Pass = false;
    g2Details = 'Missing tierTrusted';
  } else {
    for (const tp of pillowRadar.tierTrusted) {
      const titleLower = String(tp.title || tp.cleanTitle || tp.displayName || '').toLowerCase();
      const queryLower = String(tp.payload ? tp.payload.searchQuery : '').toLowerCase();
      const brandInPayload = tp.payload ? tp.payload.brand : null;
      if (titleLower.includes('ema') || queryLower.includes('ema') || brandInPayload !== null) {
        g2Pass = false;
        g2Details = `Brand leakage in ${tp.name}: title="${tp.title}", query="${tp.payload ? tp.payload.searchQuery : ''}"`;
        break;
      }
    }
  }
  if (g2Pass) g2Details = 'Tầng 2 completely decoupled: 0 "Ema" brand references, generic title & search query';
  recordGate(2, 'Dual-Tier Semantic Decoupling', g2Pass, g2Details);

  // GATE 3: Routing & TikTok 404 Elimination
  const noShopTiktokSearch = !content.includes('shop.tiktok.com/search');
  const hasStandardSearch = content.includes("'https://www.tiktok.com/search?q=' + encodeURIComponent(searchQuery)");
  const g3Pass = noShopTiktokSearch && hasStandardSearch;
  recordGate(3, 'Routing & TikTok 404 Elimination', g3Pass,
    g3Pass ? 'Zero shop.tiktok.com/search, standard www.tiktok.com/search?q= enforced' : 'Found invalid TikTok search domain');

  // GATE 4: Winner Action & Direct PDP Bypass (Honors 99.330₫ floor price)
  const masterWinner = pillowRadar.masterWinner;
  const g4Pass = masterWinner &&
                 (masterWinner.payable === 99330 || Math.round(masterWinner.payable) === 99330) &&
                 masterWinner.payload &&
                 masterWinner.payload.pdpUrl &&
                 masterWinner.payload.isSearchFallback === false;
  recordGate(4, 'Winner Action & Direct PDP Bypass', g4Pass,
    g4Pass ? `Floor price 99.330₫ honored on TikTok Shop Uy Tín, direct PDP bypass verified` : `Failed floor price or direct PDP check`);

  // GATE 5: Latency SLA <= 5ms
  const { performance } = require('perf_hooks');
  const t0 = performance.now();
  for (let i = 0; i < 100; i++) {
    sandbox.computeCrossPlatformRadar(pillowParsed, 179000);
  }
  const t1 = performance.now();
  const avgLatency = (t1 - t0) / 100;
  const g5Pass = avgLatency <= 5.0;
  recordGate(5, 'Client Latency SLA (<= 5ms)', g5Pass,
    g5Pass ? `Average latency ${avgLatency.toFixed(3)}ms <= 5ms SLA` : `Latency ${avgLatency.toFixed(3)}ms exceeded SLA`);

  // GATE 6: Affiliate Attribution Lock
  const hasShopeePid = content.includes('17372870594');
  const hasLazadaPid = content.includes('262501305');
  const hasTikTokPid = content.includes('VNVNLCB6LYL3');
  const g6Pass = hasShopeePid && hasLazadaPid && hasTikTokPid;
  recordGate(6, 'Affiliate Attribution Lock', g6Pass,
    g6Pass ? '100% Partner IDs present (Shopee 17372870594, Lazada 262501305, TikTok VNVNLCB6LYL3)' : 'Missing partner ID');

  // GATE 7: AI Review 30s & Thư Viện Ảnh Thật
  const hasAiReviews = content.includes('JAYT_AUTHENTIC_PRODUCT_REVIEWS') &&
                       content.includes('openAuthenticReviewsModal') &&
                       content.includes('dispatchReviewModalBuyAction');
  recordGate(7, 'AI Review 30s & Thư Viện Ảnh Thật', hasAiReviews,
    hasAiReviews ? 'AI Review 30s radar and unedited photo library functions verified' : 'AI review functions missing');

  // GATE 8: Kệ Săn Sập Sàn 70% – 80% (12 Deals Giá Đáy)
  const g8Pass = flashDeals.length === 12 && flashDeals.every(d => d.canonicalUrl && !d.canonicalUrl.includes('search?'));
  recordGate(8, 'Kệ Săn Sập Sàn 70% – 80% (12 Deals Giá Đáy)', g8Pass,
    g8Pass ? '12/12 Deals with direct PDP links verified' : 'Flash deals count or PDP links mismatch');

  // GATE 9: Chrono-Calendar & Radar Giờ Vàng (11:30 & 20:00)
  const hasChronoCalendar = content.includes('JAYT_MEGA_SALE_CALENDAR') &&
                            content.includes('JAYT_GOLDEN_HOURS_RADAR') &&
                            content.includes('downloadJaytEventIcs');
  recordGate(9, 'Chrono-Calendar & Radar Giờ Vàng', hasChronoCalendar,
    hasChronoCalendar ? 'Chrono-Calendar and Golden Hours radar intact' : 'Calendar logic missing');

  // GATE 10: Ban Kiểm Định Kỹ Trị ZQA Script Execution
  let g10Pass = false;
  try {
    const out = execSync('node scripts/verify_autonomous_gates.cjs', { encoding: 'utf8' });
    g10Pass = out.includes('6/6 CỔNG THÔNG QUA (BUILD GREEN)');
  } catch (_) {
    g10Pass = false;
  }
  recordGate(10, 'Ban Kiểm Định Kỹ Trị ZQA Script Execution', g10Pass,
    g10Pass ? 'scripts/verify_autonomous_gates.cjs executed with 6/6 PASS' : 'Script execution failed');

  // Summary
  const allPassed = results.every(r => r.passed);
  console.log('\n================================================================');
  if (allPassed) {
    console.log('  RESULT: 10/10 GATES PASSED (JAYT-436 FULL COMPLIANCE)');
    console.log('================================================================');
    process.exit(0);
  } else {
    console.error('  RESULT: SOME GATES FAILED');
    console.log('================================================================');
    process.exit(1);
  }
})();
