/**
 * JAYT CLASSIFIER 070G UNIT & NEGATIVE TEST SUITE
 * Directive: JAYT-070G — CLASSIFIER ROOT-FIX + BATCH 3 RECLASSIFICATION
 */

const { classifySource070g } = require('./batch3_source_classifier_070g');

let passCount = 0;
let failCount = 0;

function assertTest(name, condition, message) {
  if (condition) {
    console.log(`  [${name}]: [PASS] - ${message}`);
    passCount++;
  } else {
    console.error(`  [${name}]: [FAIL] - ${message}`);
    failCount++;
  }
}

console.log('🧪 [TEST-070G-CLASSIFIER] Khởi chạy bộ kiểm thử phân loại nguồn fail-closed...');

// Test 1: 404 page containing word "cửa hàng" / "danh sách cửa hàng" => DEAD_ROUTE
const t1Res = classifySource070g({
  targetId: 'B3_DOMINOS_STORE_LOCATOR',
  requestedUrl: 'https://dominos.vn/danh-sach-cua-hang',
  finalUrl: 'https://dominos.vn/danh-sach-cua-hang',
  textContent: 'MÃ E-VOUCHER KHUYẾN MÃI THỰC ĐƠN DANH SÁCH CỬA HÀNG 404 THE PAGE WHICH YOU ARE LOOKING FOR IS NOT FOUND',
  expectedType: 'STORE_LOCATOR'
});
assertTest('TEST_01_404_WITH_STORE_KEYWORD_IS_DEAD_ROUTE',
  t1Res.classification === 'DEAD_ROUTE' && t1Res.triage === 'RED',
  `Trang 404 có từ 'cửa hàng' được phân loại chính xác là DEAD_ROUTE (kết quả: ${t1Res.classification})`
);

// Test 2: Promo page with navigation "cửa hàng" => PROMO_SOURCE, NOT LOCALITY_SOURCE
const t2Res = classifySource070g({
  targetId: 'B3_DOMINOS_PROMO_LISTING',
  requestedUrl: 'https://dominos.vn/promotion-listing',
  finalUrl: 'https://dominos.vn/promotion-listing',
  textContent: 'MÃ E-VOUCHER KHUYẾN MÃI THỰC ĐƠN DANH SÁCH CỬA HÀNG BLOG Deal Đôi Bánh Đỉnh 118.000VND Giảm 50% Menu Chay',
  expectedType: 'PROMO_HUB'
});
assertTest('TEST_02_PROMO_PAGE_WITH_STORE_NAV_IS_PROMO_SOURCE',
  t2Res.classification === 'PROMO_SOURCE' && t2Res.triage === 'AMBER',
  `Trang khuyến mãi có nav 'cửa hàng' được phân loại đúng là PROMO_SOURCE (kết quả: ${t2Res.classification})`
);

// Test 3: Store locator without Da Nang locality => NO_VERIFIED_DANANG_LOCALITY
const t3Res = classifySource070g({
  targetId: 'B3_TEST_LOCATOR_HANOI_ONLY',
  requestedUrl: 'https://example.com/stores',
  finalUrl: 'https://example.com/stores',
  textContent: 'Hệ thống cửa hàng: Chi nhánh 1: 123 Phố Huế, Hai Bà Trưng, Hà Nội. Chi nhánh 2: 456 Cầu Giấy, Hà Nội.',
  expectedType: 'STORE_LOCATOR'
});
assertTest('TEST_03_LOCATOR_WITHOUT_DANANG_IS_NO_VERIFIED_DANANG',
  t3Res.classification === 'NO_VERIFIED_DANANG_LOCALITY' && t3Res.triage === 'AMBER',
  `Trang locator không có Đà Nẵng phân loại đúng NO_VERIFIED_DANANG_LOCALITY (kết quả: ${t3Res.classification})`
);

// Test 4: Blank page / 0 length => BLANK
const t4Res = classifySource070g({
  targetId: 'B3_KATINAT_BLANK',
  requestedUrl: 'https://katinat.vn/',
  finalUrl: 'about:blank',
  textContent: '',
  expectedType: 'BRAND_HOME'
});
assertTest('TEST_04_BLANK_RENDER_IS_BLANK',
  t4Res.classification === 'BLANK' && t4Res.triage === 'RED',
  `Trang trắng được phân loại đúng là BLANK (kết quả: ${t4Res.classification})`
);

// Test 5: Redirect to homepage without data => REDIRECT
const t5Res = classifySource070g({
  targetId: 'B3_TCH_REDIRECT',
  requestedUrl: 'https://thecoffeehouse.com/collections/ca-phe',
  finalUrl: 'https://thecoffeehouse.com/',
  textContent: 'ORDER NOW Chọn thương hiệu để bắt đầu The Coffee House Điều khoản sử dụng',
  expectedType: 'MENU_CATALOG'
});
assertTest('TEST_05_HOMEPAGE_REDIRECT_IS_REDIRECT',
  t5Res.classification === 'REDIRECT' && t5Res.triage === 'RED',
  `Trang redirect trang chủ rỗng được phân loại đúng là REDIRECT (kết quả: ${t5Res.classification})`
);

// Test 6: Auth-wall page => AUTH_WALL
const t6Res = classifySource070g({
  targetId: 'B3_TEST_AUTH',
  requestedUrl: 'https://example.com/member/deals',
  finalUrl: 'https://example.com/member/deals',
  textContent: 'Vui lòng đăng nhập để tiếp tục xem danh sách khuyến mãi thành viên.',
  expectedType: 'PROMO_LEAF'
});
assertTest('TEST_06_AUTH_WALL_IS_AUTH_WALL',
  t6Res.classification === 'AUTH_WALL' && t6Res.triage === 'RED',
  `Trang yêu cầu đăng nhập được phân loại đúng là AUTH_WALL (kết quả: ${t6Res.classification})`
);

// Test 7: Real Da Nang store locator => LOCALITY_SOURCE with snippet
const t7Res = classifySource070g({
  targetId: 'B3_PHELA_STORES',
  requestedUrl: 'https://phela.vn/cua-hang-2/',
  finalUrl: 'https://phela.vn/cua-hang-2/',
  textContent: 'DANH SÁCH CỬA HÀNG PHÊ LA: Cửa hàng Đà Nẵng: 07 Nguyễn Văn Linh, Phường Bình Hiên, Quận Hải Châu, Đà Nẵng.',
  expectedType: 'STORE_LOCATOR'
});
assertTest('TEST_07_REAL_DANANG_LOCATOR_IS_LOCALITY_SOURCE',
  t7Res.classification === 'LOCALITY_SOURCE' && t7Res.triage === 'AMBER' && t7Res.snippet.includes('Đà Nẵng'),
  `Trang có địa chỉ Đà Nẵng thật được phân loại đúng LOCALITY_SOURCE (snippet: ${t7Res.snippet})`
);

console.log(`\n======================================================`);
console.log(`🟢 [TEST-SUMMARY] Kết quả kiểm thử: ${passCount}/${passCount + failCount} PASS!`);

if (failCount > 0) {
  process.exit(1);
}
