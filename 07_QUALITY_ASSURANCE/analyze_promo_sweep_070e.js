/**
 * JAYT OFFICIAL PROMOTIONS SEMANTIC ANALYZER (070E)
 * Directive: JAYT-070E
 * Evaluates raw capture text dumps against strict 5-dimension candidate criteria.
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const sweepDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'run_070e_promo_sweep_1787556266070');
const manifestPath = path.join(sweepDir, 'SWEEP_MANIFEST.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log('📊 [ANALYZE-070E] Bắt đầu phân tích ngữ nghĩa 12 trang khuyến mãi...\n');

const analysisResults = [];

for (const res of manifest.results) {
  if (!res.success) {
    analysisResults.push({
      brand: res.brand,
      url: res.url,
      verdict: 'FAIL_CAPTURE',
      reason: res.error
    });
    continue;
  }

  const textFile = path.join(sweepDir, `receipt_${res.receipt_file.replace('receipt_', '').replace('.json', '')}_text.txt`.replace('receipt_receipt_', 'receipt_'));
  // Actually text file is res.prefix_text.txt
  const prefix = res.receipt_file.replace('receipt_', '').replace('.json', '');
  const actualTextFile = path.join(sweepDir, `${prefix}_text.txt`);

  const text = fs.readFileSync(actualTextFile, 'utf8');

  // Search for date patterns like dd/mm/yyyy or dd.mm.yyyy or năm 2026
  const dateMatches = text.match(/\b\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{2,4}\b/g) || [];
  const year2026 = /2026/.test(text);
  const priceMatches = text.match(/\b\d{1,3}(?:\.\d{3})+(?:\s*₫|\s*đ|\s*k|\s*VND)?\b/gi) || [];
  const discountMatches = text.match(/\b\d{1,2}%\b/g) || [];

  console.log(`🔎 [${res.brand}] (${res.final_url})`);
  console.log(`   Text chars: ${text.length}`);
  console.log(`   Date patterns: ${dateMatches.slice(0, 5).join(', ') || 'NONE'}`);
  console.log(`   Has 2026: ${year2026}`);
  console.log(`   Price samples: ${priceMatches.slice(0, 5).join(', ') || 'NONE'}`);
  console.log(`   Discount samples: ${discountMatches.slice(0, 5).join(', ') || 'NONE'}`);

  let verdict = 'LEAD_ONLY_NO_CLAIM';
  let detailedReason = '';

  if (res.final_url.includes('page-not-found') || res.final_url.includes('404')) {
    verdict = 'DEAD_URL_REDIRECT';
    detailedReason = `Endpoint redirected to 404 / page-not-found: ${res.final_url}`;
  } else if (!year2026 && dateMatches.length === 0) {
    verdict = 'LEAD_ONLY_NO_CLAIM';
    detailedReason = 'No explicit expiration date or 2026 temporal proof observed on page (Catalog/Menu listing or general promo hub).';
  } else {
    detailedReason = `Dates observed: [${dateMatches.slice(0, 3).join(', ')}], Year 2026: ${year2026}. Needs manual audit for leaf deal bounding.`;
  }

  console.log(`   Verdict: ${verdict} | Reason: ${detailedReason}\n`);

  analysisResults.push({
    brand: res.brand,
    domain: res.domain,
    requested_url: res.requested_url,
    final_url: res.final_url,
    checked_at: res.checked_at,
    text_length: res.text_length,
    date_matches: dateMatches,
    has_2026: year2026,
    price_matches: priceMatches.slice(0, 8),
    discount_matches: discountMatches.slice(0, 8),
    verdict: verdict,
    detailed_reason: detailedReason,
    receipt_file: res.receipt_file,
    receipt_sha256: res.receipt_sha256,
    png_sha256: res.png_sha256,
    html_sha256: res.html_sha256,
    text_sha256: res.text_sha256,
    text_snippet: text.slice(0, 500)
  });
}

const analysisOutPath = path.join(sweepDir, 'PROMO_SWEEP_ANALYSIS.json');
fs.writeFileSync(analysisOutPath, JSON.stringify(analysisResults, null, 2), 'utf8');
console.log(`📋 Đã lưu PROMO_SWEEP_ANALYSIS.json: ${analysisOutPath}`);
