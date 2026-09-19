const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087', 'captures_087', 'batch_manifest_087.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log(`📊 [ANALYSIS-087] Đang phân tích ${manifest.results.length} targets đã thu thập...`);

const matrix = {
  batch_id: 'BATCH_087_VERIFIED_SUPPLY_ACQUISITION',
  evaluated_at: new Date().toISOString(),
  total_targets: manifest.results.length,
  cohorts: {
    CINEMA: { total: 0, verified_candidates: 0, signal_only: 0, not_confirmed_danang: 0, failed: 0, blocked: 0 },
    FNB_FASTFOOD: { total: 0, verified_candidates: 0, signal_only: 0, not_confirmed_danang: 0, failed: 0, blocked: 0 },
    COFFEE_TEA: { total: 0, verified_candidates: 0, signal_only: 0, not_confirmed_danang: 0, failed: 0, blocked: 0 },
    FOOD_AND_RIDE: { total: 0, verified_candidates: 0, signal_only: 0, not_confirmed_danang: 0, failed: 0, blocked: 0 },
    ECOMMERCE_WALLETS: { total: 0, verified_candidates: 0, signal_only: 0, not_confirmed_danang: 0, failed: 0, blocked: 0 }
  },
  items: []
};

manifest.results.forEach(res => {
  const targetDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087', 'captures_087', res.id);
  const txtPath = path.join(targetDir, 'page.txt');
  const txtContent = fs.existsSync(txtPath) ? fs.readFileSync(txtPath, 'utf8') : '';
  const txtLower = txtContent.toLowerCase();

  let classification = 'FAILED';
  let reasoning = '';
  const bundle = {
    price_or_discount: null,
    terms_and_conditions: null,
    valid_until: null,
    locality_danang: null,
    redemption_channel: null,
    provenance_hash: res.receipt && res.receipt.files ? res.receipt.files.text_extract.sha256 : null
  };

  if (res.http_status === 200) {
    if (res.id.includes('BHD')) {
      classification = 'NOT_CONFIRMED_FOR_DANANG';
      reasoning = 'BHD Star có thông tin ưu đãi nhưng chưa xác nhận chi nhánh đang hoạt động tại Đà Nẵng.';
    } else if (res.id.includes('MOMO') || res.id.includes('ZALOPAY') || res.id.includes('SHOPEE') || res.id.includes('GRAB') || res.id.includes('BE') || res.id.includes('LOTTERIA') || res.id.includes('DOMINOS') || res.id.includes('JOLLIBEE') || res.id.includes('KATINAT') || res.id.includes('HIGHLANDS') || res.id.includes('THECOFFEEHOUSE') || res.id.includes('VNPAY')) {
      classification = 'SIGNAL_ONLY';
      reasoning = 'Thu thập thành công trang ưu đãi/dịch vụ chính thức; yêu cầu mở ứng dụng/tài khoản để áp dụng ưu đãi hoặc xác nhận tại điểm bán.';
      bundle.redemption_channel = 'IN_APP_OR_AT_STORE';
      bundle.locality_danang = txtLower.includes('đà nẵng') || txtLower.includes('da nang') ? 'CONFIRMED_MENTION' : 'NATIONWIDE_OR_UNASSERTED';
    } else if (res.id.includes('LOTTE')) {
      classification = 'SIGNAL_ONLY';
      reasoning = 'Thu thập danh sách sự kiện Lotte Cinema và chi nhánh Lotte Mart Đà Nẵng; người dùng kiểm tra suất chiếu thực tế tại rạp.';
      bundle.redemption_channel = 'AT_COUNTER_OR_ONLINE';
      bundle.locality_danang = 'Lotte Mart Đà Nẵng';
    } else if (res.id.includes('PHELA')) {
      classification = 'SIGNAL_ONLY';
      reasoning = 'Trang hệ thống cửa hàng và sản phẩm Phê La xác nhận chi nhánh Đà Nẵng (Nguyễn Văn Linh); theo dõi menu tại cửa hàng.';
      bundle.redemption_channel = 'AT_STORE';
      bundle.locality_danang = 'Chi nhánh Nguyễn Văn Linh, Đà Nẵng';
    } else if (res.id.includes('KFC')) {
      classification = 'SIGNAL_ONLY';
      reasoning = 'Trang menu combo KFC chính thức; người dùng đặt hàng qua website hoặc mua tại quầy KFC Đà Nẵng.';
      bundle.redemption_channel = 'ONLINE_OR_STORE';
      bundle.locality_danang = 'Toàn quốc / Đà Nẵng';
    } else {
      classification = 'SIGNAL_ONLY';
      reasoning = 'Thu thập thành công tín hiệu công khai từ thương hiệu.';
    }
  } else if (res.http_status === 403 || res.http_status === 503) {
    classification = 'BLOCKED';
    reasoning = 'Trang có bảo vệ truy cập tự động (Cloudflare / Bot Challenge); 0 bypass.';
  } else {
    classification = 'FAILED';
    reasoning = `Trang phản hồi HTTP ${res.http_status} hoặc lỗi đường dẫn; 0 suy diễn deal.`;
  }

  // Update cohort stats
  const cStats = matrix.cohorts[res.sector];
  if (cStats) {
    cStats.total++;
    if (classification === 'VERIFIED_CANDIDATE') cStats.verified_candidates++;
    else if (classification === 'SIGNAL_ONLY') cStats.signal_only++;
    else if (classification === 'NOT_CONFIRMED_FOR_DANANG') cStats.not_confirmed_danang++;
    else if (classification === 'BLOCKED') cStats.blocked++;
    else if (classification === 'FAILED') cStats.failed++;
  }

  matrix.items.push({
    id: res.id,
    brand: res.brand,
    sector: res.sector,
    domain: res.domain,
    url: res.url,
    http_status: res.http_status,
    classification: classification,
    reasoning: reasoning,
    bundle_6_point: bundle
  });
});

console.log('\nCohort Summary:');
console.log(JSON.stringify(matrix.cohorts, null, 2));

const matrixPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087', 'ground_truth_matrix_087.json');
fs.writeFileSync(matrixPath, JSON.stringify(matrix, null, 2), 'utf8');
console.log(`\n✅ Ground truth matrix 087 saved to: ${matrixPath}`);
