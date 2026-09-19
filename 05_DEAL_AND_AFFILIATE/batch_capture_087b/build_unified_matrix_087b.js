const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const manifest087aPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a', 'captures_087a', 'batch_manifest_087a.json');
const manifest087bPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087b', 'captures_087b', 'batch_manifest_087b.json');

const manifest087a = JSON.parse(fs.readFileSync(manifest087aPath, 'utf8'));
const manifest087b = JSON.parse(fs.readFileSync(manifest087bPath, 'utf8'));

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('📊 [UNIFIED-MATRIX-087B] Đang xây dựng ma trận hợp nhất từ 087A (40) + 087B (26)...');

const allItems = [];

// Helper to extract verifiable quotes generically without ANY target_id branching
function evaluateItemEvidence(res, baseCaptureDir) {
  const targetDir = path.join(baseCaptureDir, res.target_id);
  const txtPath = path.join(targetDir, 'page.txt');
  const txtContent = fs.existsSync(txtPath) ? fs.readFileSync(txtPath, 'utf8') : '';
  const txtHash = res.receipt && res.receipt.files ? res.receipt.files.text_extract.sha256 : null;
  const relativeTxtPath = path.relative(repoRoot, txtPath).replace(/\\/g, '/');

  const bundle = {
    price_or_discount: null,
    terms_and_conditions: null,
    valid_until: null,
    locality_danang: null,
    redemption_channel: null,
    provenance_hash: txtHash
  };

  // Generic Locality Quote Extraction
  const dnIdx = txtContent.indexOf('Đà Nẵng');
  if (dnIdx !== -1) {
    // Extract exact sentence/slice around 'Đà Nẵng'
    const start = Math.max(0, txtContent.lastIndexOf('\n', dnIdx) + 1);
    let end = txtContent.indexOf('\n', dnIdx);
    if (end === -1) end = Math.min(txtContent.length, dnIdx + 80);
    const quote = txtContent.slice(start, end).trim();
    if (quote.length > 5 && quote.length < 250) {
      bundle.locality_danang = {
        quote: quote,
        artifact_path: relativeTxtPath,
        artifact_sha256: txtHash
      };
    }
  }

  // Generic Terms Quote Extraction
  const termsKeywords = ['Điều khoản', 'Điều kiện', 'Quy định', 'Chính sách'];
  for (const kw of termsKeywords) {
    const kwIdx = txtContent.indexOf(kw);
    if (kwIdx !== -1) {
      const start = Math.max(0, txtContent.lastIndexOf('\n', kwIdx) + 1);
      let end = txtContent.indexOf('\n', kwIdx);
      if (end === -1) end = Math.min(txtContent.length, kwIdx + 100);
      const quote = txtContent.slice(start, end).trim();
      if (quote.length > 5 && quote.length < 250) {
        bundle.terms_and_conditions = {
          quote: quote,
          artifact_path: relativeTxtPath,
          artifact_sha256: txtHash
        };
        break;
      }
    }
  }

  // Generic Redemption Channel Quote Extraction
  const channelKeywords = ['tại quầy', 'ứng dụng', 'cửa hàng', 'App', 'đặt hàng', 'mua vé'];
  for (const kw of channelKeywords) {
    const kwIdx = txtContent.indexOf(kw);
    if (kwIdx !== -1) {
      const start = Math.max(0, txtContent.lastIndexOf('\n', kwIdx) + 1);
      let end = txtContent.indexOf('\n', kwIdx);
      if (end === -1) end = Math.min(txtContent.length, kwIdx + 100);
      const quote = txtContent.slice(start, end).trim();
      if (quote.length > 5 && quote.length < 250) {
        bundle.redemption_channel = {
          quote: quote,
          artifact_path: relativeTxtPath,
          artifact_sha256: txtHash
        };
        break;
      }
    }
  }

  // Strict Classification
  let classification = 'SIGNAL_ONLY';
  let reasoning = '';

  const isComplete6PointBundle = (
    bundle.price_or_discount !== null &&
    bundle.terms_and_conditions !== null &&
    bundle.valid_until !== null &&
    bundle.locality_danang !== null &&
    bundle.redemption_channel !== null &&
    bundle.provenance_hash !== null
  );

  if (res.http_status === 200) {
    if (isComplete6PointBundle) {
      classification = 'VERIFIED_CANDIDATE';
      reasoning = 'Đầy đủ 6/6 điểm chứng cứ vật lý có trích đoạn nguyên văn và mã băm SHA-256 trên đĩa.';
    } else if (res.brand.includes('BHD')) {
      classification = 'NOT_CONFIRMED_FOR_DANANG';
      reasoning = 'Thương hiệu BHD Star Cineplex chưa xác nhận chi nhánh đang hoạt động tại Đà Nẵng.';
    } else {
      classification = 'SIGNAL_ONLY';
      reasoning = 'Trang thông tin/ưu đãi chính thức thu thập thành công; chưa đủ 6/6 điểm chứng cứ vật lý trên đĩa để cấp phát deal.';
    }
  } else if (res.http_status === 403 || res.http_status === 503) {
    classification = 'BLOCKED';
    reasoning = 'Bot challenge';
  } else {
    classification = 'FAILED';
    reasoning = `HTTP ${res.http_status}`;
  }

  return {
    target_id: res.target_id,
    pass: res.target_id.includes('SP') ? '087B_SECOND_PASS' : '087A_FIRST_PASS',
    brand: res.brand,
    sector: res.sector,
    requested_url: res.requested_url,
    final_url: res.final_url,
    http_status: res.http_status,
    classification: classification,
    reasoning: reasoning,
    target_lineage: res.target_lineage,
    bundle_6_point: bundle
  };
}

// 1. Process 087A Items
const dir087a = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a', 'captures_087a');
manifest087a.results.forEach(res => {
  allItems.push(evaluateItemEvidence(res, dir087a));
});

// 2. Process 087B Items
const dir087b = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087b', 'captures_087b');
manifest087b.results.forEach(res => {
  allItems.push(evaluateItemEvidence(res, dir087b));
});

const unifiedMatrix = {
  matrix_id: 'MATRIX_087B_UNIFIED_GROUND_TRUTH',
  evaluated_at: new Date().toISOString(),
  total_targets: allItems.length,
  pass_counts: {
    pass_087a_targets: manifest087a.results.length,
    pass_087b_second_pass_targets: manifest087b.results.length
  },
  cohorts: {
    CINEMA: { total: 0, verified_candidates: 0, signal_only: 0, not_confirmed_danang: 0, failed: 0, blocked: 0 },
    FNB_FASTFOOD: { total: 0, verified_candidates: 0, signal_only: 0, not_confirmed_danang: 0, failed: 0, blocked: 0 },
    COFFEE_TEA: { total: 0, verified_candidates: 0, signal_only: 0, not_confirmed_danang: 0, failed: 0, blocked: 0 },
    FOOD_AND_RIDE: { total: 0, verified_candidates: 0, signal_only: 0, not_confirmed_danang: 0, failed: 0, blocked: 0 },
    ECOMMERCE_WALLETS: { total: 0, verified_candidates: 0, signal_only: 0, not_confirmed_danang: 0, failed: 0, blocked: 0 }
  },
  evidence_point_deficits: {
    price_or_discount_missing: 0,
    terms_and_conditions_missing: 0,
    valid_until_missing: 0,
    locality_danang_missing: 0,
    redemption_channel_missing: 0
  },
  items: allItems
};

allItems.forEach(item => {
  const c = unifiedMatrix.cohorts[item.sector];
  if (c) {
    c.total++;
    if (item.classification === 'VERIFIED_CANDIDATE') c.verified_candidates++;
    else if (item.classification === 'SIGNAL_ONLY') c.signal_only++;
    else if (item.classification === 'NOT_CONFIRMED_FOR_DANANG') c.not_confirmed_danang++;
    else if (item.classification === 'BLOCKED') c.blocked++;
    else if (item.classification === 'FAILED') c.failed++;
  }

  const b = item.bundle_6_point;
  if (b.price_or_discount === null) unifiedMatrix.evidence_point_deficits.price_or_discount_missing++;
  if (b.terms_and_conditions === null) unifiedMatrix.evidence_point_deficits.terms_and_conditions_missing++;
  if (b.valid_until === null) unifiedMatrix.evidence_point_deficits.valid_until_missing++;
  if (b.locality_danang === null) unifiedMatrix.evidence_point_deficits.locality_danang_missing++;
  if (b.redemption_channel === null) unifiedMatrix.evidence_point_deficits.redemption_channel_missing++;
});

console.log('\n📊 Cohort Summary Unified 087B:');
console.log(JSON.stringify(unifiedMatrix.cohorts, null, 2));

console.log('\n📉 Evidence Point Deficits:');
console.log(JSON.stringify(unifiedMatrix.evidence_point_deficits, null, 2));

const matrixPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087b', 'ground_truth_matrix_087b.json');
fs.writeFileSync(matrixPath, JSON.stringify(unifiedMatrix, null, 2), 'utf8');
console.log(`\n💾 Unified ground truth matrix 087B saved to: ${matrixPath}`);
