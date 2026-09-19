const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const vaultDir = '06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_jollibee_combos_20260906_082143_dc594d';
const rawPath = path.join(vaultDir, 'PROD_JOLLIBEE_COMBO_02.raw.html');
const dossierPath = path.join(vaultDir, 'PROD_JOLLIBEE_COMBO_02_EVIDENCE_DOSSIER.json');
const previewHtmlPath = 'staging_workspace_j328/internal_preview_jollibee_combo_02.html';
const approvedCardsPath = 'staging_workspace_j328/approved_commercial_cards.json';

const testResults = [];

function assertTest(id, description, passed, details = {}) {
  testResults.push({ id, description, passed, details });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${id}: ${description}`);
  if (!passed) {
    console.error('  Failure details:', details);
  }
}

// 1. Raw file & Dossier integrity
const rawBuf = fs.readFileSync(rawPath);
const rawSha256 = crypto.createHash('sha256').update(rawBuf).digest('hex');
assertTest('QA_1.1', 'Raw file exists and matches expected SHA-256',
  rawSha256 === '6c9aff91c21ea0d0d4162562a87bb4429562052da1397298696e2bf67b4e2e92',
  { actualSha: rawSha256 }
);

const dossier = JSON.parse(fs.readFileSync(dossierPath, 'utf8'));
assertTest('QA_1.2', 'Dossier Product ID parsed via AST/JSON is 679',
  dossier.parser_analysis.bundle_id.verified_integer === 679,
  { bundle_id: dossier.parser_analysis.bundle_id }
);

assertTest('QA_1.3', 'Dossier Base Price parsed from root bundle is 80000 VND',
  dossier.parser_analysis.base_price.value === 80000,
  { base_price: dossier.parser_analysis.base_price }
);

assertTest('QA_1.4', 'Dossier SKU is 70144 and verified in form span',
  dossier.exact_byte_spans.sku.primary_form.text_span === 'data-product-sku="70144"',
  { sku_span: dossier.exact_byte_spans.sku }
);

assertTest('QA_1.5', 'Dossier default ingredients match overview text span',
  dossier.exact_byte_spans.default_ingredients.inner_text.text_span === '1 Mì ý sốt cay vừa + 1 Gà Sốt cay + 1 Nước ngọt',
  { ingredients_span: dossier.exact_byte_spans.default_ingredients }
);

// 2. Internal Preview Content & Disclaimers
const previewHtml = fs.readFileSync(previewHtmlPath, 'utf8');

assertTest('QA_2.1', 'Preview HTML contains product title "MỘT MÌNH HÍT HÀ"',
  previewHtml.includes('MỘT MÌNH HÍT HÀ')
);

assertTest('QA_2.2', 'Preview HTML contains observed base price "80.000 ₫"',
  previewHtml.includes('80.000 ₫')
);

assertTest('QA_2.3', 'Preview HTML contains mandatory disclaimer 1: "Thực đơn / giá quan sát tại thời điểm thu thập"',
  previewHtml.includes('Thực đơn / giá quan sát tại thời điểm thu thập')
);

assertTest('QA_2.4', 'Preview HTML contains mandatory disclaimer 2: "Chưa xác minh áp dụng tại Đà Nẵng"',
  previewHtml.includes('Chưa xác minh áp dụng tại Đà Nẵng')
);

assertTest('QA_2.5', 'Preview HTML contains mandatory disclaimer 3: "Giá có thể thay đổi theo tùy chọn; không phải cam kết giá thanh toán"',
  previewHtml.includes('Giá có thể thay đổi theo tùy chọn; không phải cam kết giá thanh toán')
);

// 3. Absence of Marketing Claims & E-commerce Operations
assertTest('QA_3.1', 'Preview HTML contains ZERO "giảm giá"',
  !previewHtml.includes('giảm giá')
);

assertTest('QA_3.2', 'Preview HTML contains ZERO "tiết kiệm"',
  !previewHtml.includes('tiết kiệm')
);

assertTest('QA_3.3', 'Preview HTML contains ZERO "miễn phí giao hàng"',
  !previewHtml.includes('miễn phí giao hàng')
);

assertTest('QA_3.4', 'Preview HTML contains ZERO cart / buy actions ("thêm vào giỏ", "đặt mua", "mua ngay")',
  !previewHtml.includes('thêm vào giỏ') && !previewHtml.includes('đặt mua') && !previewHtml.includes('mua ngay')
);

// Check all hrefs for affiliate parameters
const hrefMatches = [...previewHtml.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
const hasAffiliateParams = hrefMatches.some(url => {
  return /[?&](aff|utm_|ref|subid|click_id|tracking)=/i.test(url);
});
assertTest('QA_3.5', 'Preview HTML contains ZERO affiliate link parameters in any href',
  !hasAffiliateParams,
  { hrefs: hrefMatches }
);

// 4. Verification of Approved Commercial Cards Baseline (JAYT-330: 4 Cards)
const approvedCards = JSON.parse(fs.readFileSync(approvedCardsPath, 'utf8'));
const approvedIds = approvedCards.map(c => c.sku_id);

assertTest('QA_4.1', 'Approved cards list on Staging contains exactly 4 cards under JAYT-330',
  approvedCards.length === 4,
  { actualCount: approvedCards.length, ids: approvedIds }
);

assertTest('QA_4.2', 'Approved cards list matches strictly [B12_13, B12_15, B12_05, PROD_JOLLIBEE_COMBO_02]',
  JSON.stringify(approvedIds) === JSON.stringify(['B12_13', 'B12_15', 'B12_05', 'PROD_JOLLIBEE_COMBO_02']),
  { approvedIds }
);

assertTest('QA_4.3', 'Approved card PROD_JOLLIBEE_COMBO_02 contains mandatory disclaimers and STAGING_ONLY scope',
  approvedCards.some(c => c.sku_id === 'PROD_JOLLIBEE_COMBO_02' && c.scope === 'STAGING_ONLY' && c.observation_disclaimer.includes('Chưa xác minh áp dụng tại Đà Nẵng')),
  { approvedIds }
);

assertTest('QA_4.4', 'Internal preview maintains public_approved: false and render_permitted: false',
  previewHtml.includes('data-public-approved="false"') && previewHtml.includes('data-render-permitted="false"')
);

const allPassed = testResults.every(t => t.passed);

const qaReceipt = {
  receipt_name: "COMBO_02_INTERNAL_PREVIEW_QA_RECEIPT",
  generated_at_utc: new Date().toISOString(),
  candidate_id: "PROD_JOLLIBEE_COMBO_02",
  item_name: "MỘT MÌNH HÍT HÀ",
  preview_file: previewHtmlPath,
  all_passed: allPassed,
  total_tests: testResults.length,
  passed_tests: testResults.filter(t => t.passed).length,
  failed_tests: testResults.filter(t => !t.passed).length,
  guards: {
    public_approved: false,
    render_permitted: false,
    staging_4_cards_admitted_jayt330: true,
    da_nang_scope_status: "UNVERIFIED",
    marketing_claims_forbidden: true,
    ecommerce_actions_forbidden: true
  },
  tests: testResults
};

const receiptPath = path.join(vaultDir, 'COMBO_02_INTERNAL_PREVIEW_QA_RECEIPT.json');
fs.writeFileSync(receiptPath, JSON.stringify(qaReceipt, null, 2), 'utf8');
console.log('Saved QA receipt to:', receiptPath);

const latestReceiptPath = '06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/LATEST_COMBO_02_INTERNAL_PREVIEW_QA_RECEIPT.json';
fs.writeFileSync(latestReceiptPath, JSON.stringify(qaReceipt, null, 2), 'utf8');
console.log('Saved latest pointer to:', latestReceiptPath);

if (!allPassed) {
  process.exit(1);
}
