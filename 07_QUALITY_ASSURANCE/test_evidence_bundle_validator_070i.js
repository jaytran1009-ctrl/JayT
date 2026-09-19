/**
 * JAYT EVIDENCE BUNDLE VALIDATOR 070I UNIT & NEGATIVE TEST SUITE
 * Directive: JAYT-070H-R + 070I — BUNDLE ENGINE ROOT REPAIR AND REVALIDATION
 */

const fs = require('fs');
const path = require('path');
const { validateEvidenceBundle070i, getSha256 } = require('./evidence_bundle_validator_070i');

const repoRoot = path.resolve(__dirname, '..');
const testDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', `test_bundle_070i_${Date.now()}`);
fs.mkdirSync(testDir, { recursive: true });

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

console.log('🧪 [TEST-070I-BUNDLE-ENGINE] Khởi chạy bộ kiểm thử Evidence Bundle 5 chiều...');

// Setup Mock Artifacts and Receipts
function createMockPair(prefix, promoText, localityText) {
  const pTextFile = path.join(testDir, `${prefix}_promo_text.txt`);
  const lTextFile = path.join(testDir, `${prefix}_locality_text.txt`);
  const pReceiptFile = path.join(testDir, `receipt_${prefix}_promo.json`);
  const lReceiptFile = path.join(testDir, `receipt_${prefix}_locality.json`);

  fs.writeFileSync(pTextFile, promoText, 'utf8');
  fs.writeFileSync(lTextFile, localityText, 'utf8');

  fs.writeFileSync(pReceiptFile, JSON.stringify({
    capture_id: `CAP_${prefix}_P`,
    checked_at: new Date().toISOString()
  }, null, 2), 'utf8');

  fs.writeFileSync(lReceiptFile, JSON.stringify({
    capture_id: `CAP_${prefix}_L`,
    checked_at: new Date().toISOString()
  }, null, 2), 'utf8');

  return {
    promoArtifactPath: pTextFile,
    promoReceiptPath: pReceiptFile,
    localityArtifactPath: lTextFile,
    localityReceiptPath: lReceiptFile
  };
}

// Test 1: Isolated "2026" without explicit end date => REJECT
const pair1 = createMockPair('t1_no_end_date',
  'Chương trình ưu đãi trà sữa\n\nGiảm 50% cho thành viên mua trực tiếp.\n\nBản quyền thuộc về Brand 2026.',
  'Danh sách cửa hàng: 123 Nguyễn Văn Linh, Đà Nẵng.'
);
const t1Res = validateEvidenceBundle070i({
  seedId: 'TEST_01',
  brand: 'Brand Tea',
  domain: 'brandtea.vn',
  relationKey: 'Brand Tea',
  ...pair1
});
assertTest('TEST_01_ISOLATED_2026_REJECTED',
  t1Res.pieces.validity.status === 'FAIL' && t1Res.verdict !== 'COMPLETE',
  `Từ '2026' rời rạc trong copyright không có ngày kết thúc bị từ chối chính xác (validity: ${t1Res.pieces.validity.status})`
);

// Test 2: Price present but terms missing => REJECT
const pair2 = createMockPair('t2_no_terms',
  'Bảng giá sản phẩm\n\nPizza hải sản đồng giá 99.000VND size M.\n\nÁp dụng đến 31/08/2026.',
  'Địa chỉ cửa hàng: 456 Hùng Vương, Đà Nẵng.'
);
// Make block with price but without terms in the same block
const pTextNoTerms = 'Menu đồ ăn\n\nPizza hải sản 99.000VND ngon tuyệt.\n\nChính sách bảo mật công ty.';
fs.writeFileSync(pair2.promoArtifactPath, pTextNoTerms, 'utf8');
const t2Res = validateEvidenceBundle070i({
  seedId: 'TEST_02',
  brand: 'Pizza Brand',
  domain: 'pizzabrand.vn',
  relationKey: 'Pizza Brand',
  ...pair2
});
assertTest('TEST_02_PRICE_WITHOUT_TERMS_REJECTED',
  t2Res.pieces.pricing.status === 'FAIL' && t2Res.verdict !== 'COMPLETE',
  `Khối có giá nhưng thiếu điều kiện áp dụng bị từ chối chính xác (pricing: ${t2Res.pieces.pricing.status})`
);

// Test 3: Price and terms in disjoint blocks => REJECT
const pair3 = createMockPair('t3_disjoint_blocks',
  'Khối 1: Bảng giá chung\nPizza hải sản 99.000VND.\n\nKhối 2: Điều khoản giao hàng chung\nÁp dụng cho mọi đơn hàng dùng tại chỗ.\n\nKhối 3: Thời hạn đến 31/12/2026.',
  'Chi nhánh Đà Nẵng: 07 Nguyễn Văn Linh, Hải Châu, Đà Nẵng.'
);
const t3Res = validateEvidenceBundle070i({
  seedId: 'TEST_03',
  brand: 'Disjoint Brand',
  domain: 'disjoint.vn',
  relationKey: 'Disjoint Brand',
  ...pair3
});
assertTest('TEST_03_DISJOINT_BLOCKS_REJECTED',
  t3Res.pieces.terms.same_block_verified === false && t3Res.verdict !== 'COMPLETE',
  `Giá và điều kiện ở các khối tách biệt bị từ chối chính xác (same_block_verified: ${t3Res.pieces.terms.same_block_verified})`
);

// Test 4: Missing receipt file => REJECT
const pair4 = createMockPair('t4_missing_receipt',
  'Khuyến mãi Combo\n\nCombo 118.000VND áp dụng cho 2 người dùng tại chỗ đến 31/08/2026.',
  'Chi nhánh: 478 Điện Biên Phủ, Thanh Khê, Đà Nẵng.'
);
const t4Res = validateEvidenceBundle070i({
  seedId: 'TEST_04',
  brand: 'Receipt Brand',
  domain: 'receipt.vn',
  relationKey: 'Receipt Brand',
  promoArtifactPath: pair4.promoArtifactPath,
  promoReceiptPath: 'non_existent_promo_receipt.json',
  localityArtifactPath: pair4.localityArtifactPath,
  localityReceiptPath: pair4.localityReceiptPath
});
assertTest('TEST_04_MISSING_RECEIPT_REJECTED',
  t4Res.pieces.receipt_integrity.status === 'FAIL' && t4Res.verdict !== 'COMPLETE',
  `Thiếu file receipt bị từ chối chính xác (receipt_integrity: ${t4Res.pieces.receipt_integrity.status})`
);

// Test 5: Locality without Da Nang proof or unmatched relation_key => REJECT
const pair5 = createMockPair('t5_no_danang_locality',
  'Chương trình ưu đãi\n\nCombo 118.000VND áp dụng cho 2 người dùng tại chỗ đến 31/08/2026.',
  'Danh sách cửa hàng: 123 Phố Huế, Hai Bà Trưng, Hà Nội. 456 Cầu Giấy, Hà Nội.'
);
const t5Res = validateEvidenceBundle070i({
  seedId: 'TEST_05',
  brand: 'Hanoi Only Brand',
  domain: 'hanoionly.vn',
  relationKey: 'Hanoi Only Brand',
  ...pair5
});
assertTest('TEST_05_NO_DANANG_LOCALITY_REJECTED',
  t5Res.pieces.locality.status === 'FAIL' && t5Res.verdict !== 'COMPLETE',
  `Trang địa chỉ không có Đà Nẵng bị từ chối chính xác (locality: ${t5Res.pieces.locality.status})`
);

// Test 6: Valid 5-Piece Cohesive Bundle => COMPLETE
const pair6 = createMockPair('t6_valid_complete',
  'CHƯƠNG TRÌNH KHUYẾN MÃI ĐỈNH\n\nDeal Đôi Bánh Đỉnh: Combo 118.000VND áp dụng cho 2 người dùng tại chỗ đến 31/08/2026.',
  'DANH SÁCH CỬA HÀNG VALID BRAND: Chi nhánh Đà Nẵng: 07 Nguyễn Văn Linh, Hải Châu, Đà Nẵng.'
);
const t6Res = validateEvidenceBundle070i({
  seedId: 'TEST_06_VALID',
  brand: 'Valid Brand',
  domain: 'validbrand.vn',
  relationKey: 'Valid Brand',
  ...pair6
});
assertTest('TEST_06_VALID_5_PIECE_BUNDLE_COMPLETE',
  t6Res.verdict === 'COMPLETE' &&
  t6Res.pieces.pricing.status === 'PASS' &&
  t6Res.pieces.terms.same_block_verified === true &&
  t6Res.pieces.validity.status === 'PASS' &&
  t6Res.pieces.locality.status === 'PASS' &&
  t6Res.pieces.receipt_integrity.status === 'PASS',
  `Bundle có đủ 5 mảnh gắn kết xác thực đạt chuẩn COMPLETE (verdict: ${t6Res.verdict})`
);

// Clean sandbox test directory
fs.rmSync(testDir, { recursive: true, force: true });

console.log(`\n======================================================`);
console.log(`🟢 [TEST-SUMMARY] Kết quả kiểm thử Bundle Engine: ${passCount}/${passCount + failCount} PASS!`);

if (failCount > 0) {
  process.exit(1);
}
