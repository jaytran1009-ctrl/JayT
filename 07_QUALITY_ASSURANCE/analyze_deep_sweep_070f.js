/**
 * JAYT DEEP SWEEP ANALYZER (070F)
 * Directive: JAYT-070F — TRACK 2 OFFICIAL PROMOTION BUNDLE BATCH
 * Inspects all 16 target text captures for Da Nang locality and promotion validity.
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const sweepDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'run_070f_deep_sweep_1787556559654');
const manifestPath = path.join(sweepDir, 'DEEP_SWEEP_MANIFEST.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log('🔍 [ANALYZE-070F] Bắt đầu phân tích sâu 16 mục tiêu khuyến mãi & chi nhánh Đà Nẵng...\n');

const analysis = [];

for (const target of manifest.results) {
  const textFile = path.join(sweepDir, `${target.target_id.toLowerCase().replace(/[^a-z0-9_]/g, '_')}_text.txt`);
  let text = '';
  // match actual file name prefix
  const prefix = target.receipt_file.replace('receipt_', '').replace('.json', '');
  const actualFile = path.join(sweepDir, `${prefix}_text.txt`);

  if (fs.existsSync(actualFile)) {
    text = fs.readFileSync(actualFile, 'utf8');
  }

  const daNangMatch = /đà nẵng|da nang|hải châu|thanh khê|sơn trà|cẩm lệ|ngũ hành sơn|liên chiểu/i.test(text);
  const year2026 = /2026/.test(text);
  const dateMatches = text.match(/\b\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{2,4}\b/g) || [];
  const priceMatches = text.match(/\b\d{1,3}(?:\.\d{3})+(?:\s*₫|\s*đ|\s*k|\s*VND)?\b/gi) || [];

  console.log(`📌 [${target.target_id}] (${target.brand})`);
  console.log(`   Final URL: ${target.final_url}`);
  console.log(`   Text chars: ${text.length}`);
  console.log(`   Da Nang found: ${daNangMatch}`);
  console.log(`   Year 2026: ${year2026}`);
  console.log(`   Date samples: ${dateMatches.slice(0, 4).join(', ') || 'NONE'}`);
  console.log(`   Price samples: ${priceMatches.slice(0, 4).join(', ') || 'NONE'}`);
  console.log(`   Text sample: ${text.slice(0, 180).replace(/\n/g, ' ')}...`);
  console.log('--------------------------------------------------\n');

  analysis.push({
    target_id: target.target_id,
    brand: target.brand,
    domain: target.domain,
    requested_url: target.requested_url,
    final_url: target.final_url,
    checked_at: target.checked_at,
    text_length: text.length,
    da_nang_found: daNangMatch,
    year_2026: year2026,
    dates: dateMatches,
    prices: priceMatches,
    receipt_file: target.receipt_file,
    receipt_sha256: target.receipt_sha256,
    png_sha256: target.png_sha256,
    html_sha256: target.html_sha256,
    text_sha256: target.text_sha256,
    text_content: text
  });
}

const outPath = path.join(sweepDir, 'DEEP_ANALYSIS_SUMMARY.json');
fs.writeFileSync(outPath, JSON.stringify(analysis, null, 2), 'utf8');
console.log(`📋 Đã lưu DEEP_ANALYSIS_SUMMARY.json: ${outPath}`);
