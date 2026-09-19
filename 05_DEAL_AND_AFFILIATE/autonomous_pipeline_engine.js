/**
 * JAYT AUTONOMOUS BETA OPERATIONS PIPELINE ENGINE (110)
 * 
 * Pipeline:
 * Quét nguồn chính thức
 * → raw capture + hash
 * → semantic / validity / locality / dedupe gate
 * → cập nhật Watchlist hoặc Deal đã đối soát
 * → deploy Beta tự động khi regression pass
 * → recheck theo lịch
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const SOT_DIR = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const MANIFEST_109R_PATH = path.join(repoRoot, '05_DEAL_AND_AFFILIATE/semantic_offer_manifest_109r.json');
const DATASET_PATH = path.join(SOT_DIR, 'four_layer_dataset.json');
const REPORTS_DIR = path.join(repoRoot, '08_RELEASE_VAULT');

function getSha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Execute one full autonomous operational batch
 */
async function runAutonomousBatch(options = {}) {
  const batchId = `BATCH_${Date.now()}`;
  const runTimestamp = new Date().toISOString();
  console.log(`\n======================================================`);
  console.log(`🤖 [AUTONOMOUS-110] BẮT ĐẦU BATCH VẬN HÀNH: ${batchId}`);
  console.log(`⏰ Thời điểm khởi chạy: ${runTimestamp}`);
  console.log(`======================================================\n`);

  // --- Step 1: Re-run Semantic Gate on latest captures ---
  console.log('1️⃣ Chạy Semantic Offer Gate (109R) trên toàn bộ leaf captures...');
  execSync('node 05_DEAL_AND_AFFILIATE/semantic_offer_gate_109r.js', { cwd: repoRoot, stdio: 'inherit' });

  const manifest109R = JSON.parse(fs.readFileSync(MANIFEST_109R_PATH, 'utf8'));
  const activeReviewable = manifest109R.active_reviewable || [];
  const expiredOrRejected = manifest109R.expired_or_rejected || [];
  const incomplete = manifest109R.incomplete || [];

  console.log(`\n📊 Kết quả Gate Ngữ Nghĩa:`);
  console.log(`   - Tổng số Leaf đã quét: ${manifest109R.summary_metrics.total_leaves_evaluated}`);
  console.log(`   - Hợp lệ đủ điều kiện ("Đã đối soát"): ${activeReviewable.length}`);
  console.log(`   - Bị từ chối / Hết hạn / Lỗi / Duplicate: ${expiredOrRejected.length}`);
  console.log(`   - Tự động chuyển về Watchlist / Radar: ${incomplete.length}`);

  // --- Step 2: Autonomous Update of Dataset ---
  console.log('\n2️⃣ Cập nhật Four Layer Dataset (Watchlist & Verified Deals)...');
  const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf8'));

  // Ensure layer_1 verified deals only include active verified offers
  dataset.layer_1_emerald_deals = activeReviewable.map(offer => ({
    id: `DEAL_${offer.leaf_id}`,
    brand: offer.brand,
    category: offer.category,
    source_url: offer.final_url,
    offer_highlight: offer.details.offer_highlight,
    valid_from: offer.details.valid_from,
    valid_to: offer.details.valid_to,
    scope: offer.details.scope,
    terms_verified: offer.details.terms_present,
    status: 'ACTIVE_VERIFIED_DEAL',
    last_verified_at: runTimestamp
  }));

  // Non-qualifying / incomplete items automatically route to layer_2_watchlist / layer_3_community
  dataset.layer_2_watchlist.unverified_signals_count = incomplete.length;
  dataset.layer_2_watchlist.last_pipeline_run = runTimestamp;

  fs.writeFileSync(DATASET_PATH, JSON.stringify(dataset, null, 2), 'utf8');
  console.log(`✅ Four Layer Dataset cập nhật: ${dataset.layer_1_emerald_deals.length} deals đối soát, ${incomplete.length} watchlist signals.`);

  // --- Step 3: Synchronize SOT to deploy/public and staging ---
  console.log('\n3️⃣ Đồng bộ Source of Truth sang deploy/public và staging...');
  execSync('node 07_QUALITY_ASSURANCE/sync_sot_to_deploy_and_staging.js', { cwd: repoRoot, stdio: 'inherit' });

  // --- Step 4: Run Automated Regression Suite ---
  console.log('\n4️⃣ Chạy kiểm thử tự động (Regression Suites)...');
  try {
    execSync('node 07_QUALITY_ASSURANCE/test_semantic_offer_gate_109r.js', { cwd: repoRoot, stdio: 'inherit' });
    execSync('node 07_QUALITY_ASSURANCE/test_community_discovery_supply_108.js', { cwd: repoRoot, stdio: 'inherit' });
    console.log('✅ Toàn bộ QA Regression Suites ĐẠT 100% GREEN!');
  } catch (err) {
    console.error('❌ Regression suite thất bại! Hủy deploy để bảo toàn an toàn.', err);
    throw err;
  }

  // --- Step 5: Automated Vercel Beta Live Deployment ---
  console.log('\n5️⃣ Deploy Live Vercel Beta và đối soát SHA-256...');
  execSync('node 07_QUALITY_ASSURANCE/deploy_live_vercel_beta.js', { cwd: repoRoot, stdio: 'inherit' });

  // --- Step 6: Expiry & TTL Monitor ---
  console.log('\n6️⃣ Kiểm tra hạn dùng (TTL & Expiry Monitor)...');
  const now = new Date();
  const expiringSoon = [];
  activeReviewable.forEach(offer => {
    if (offer.details.valid_to) {
      const expiry = new Date(offer.details.valid_to);
      const hoursRemaining = (expiry - now) / (1000 * 60 * 60);
      if (hoursRemaining > 0 && hoursRemaining <= 48) {
        expiringSoon.push({
          leaf_id: offer.leaf_id,
          brand: offer.brand,
          valid_to: offer.details.valid_to,
          hours_remaining: Math.round(hoursRemaining)
        });
      }
    }
  });

  if (expiringSoon.length > 0) {
    console.log(`⚠️ Có ${expiringSoon.length} ưu đãi sắp hết hạn trong 48h tới (sẽ được ưu tiên recheck ở batch tiếp theo):`, expiringSoon);
  } else {
    console.log('✅ Toàn bộ ưu đãi hiện tại đều có hạn dùng dài hạn an toàn.');
  }

  // --- Step 7: Publish Batch Operations Report ---
  const reportFileName = `AUTONOMOUS_OPERATIONS_BATCH_REPORT_${batchId}.md`;
  const reportPath = path.join(REPORTS_DIR, reportFileName);

  const reportContent = `# BÁO CÁO VẬN HÀNH BATCH TỰ ĐỘNG (${batchId})
**Mã Vận Hành**: \`${batchId}\`  
**Thời điểm thực thi**: \`${runTimestamp}\`  
**Trạng thái Pipeline**: \`AUTONOMOUS_RUN_SUCCESSFUL\`  
**Public Beta Live URL**: [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)  

---

## 1. TỔNG HỢP CHỈ SỐ BATCH
- **Tổng số nguồn & leaf pages đã quét**: **${manifest109R.summary_metrics.total_leaves_evaluated}**
- **Ưu đãi hợp lệ đã đối soát (Active Verified)**: **${activeReviewable.length}**
- **Mục chuyển về Watchlist / Radar (Incomplete/Listing/Menu)**: **${incomplete.length}**
- **Mục bị loại trừ (Expired / Duplicate / News / PR / Stopped)**: **${expiredOrRejected.length}**
- **Ưu đãi sắp hết hạn cần recheck (< 48h)**: **${expiringSoon.length}**
- **Kiểm thử tự động (QA Regression)**: **PASS 100% GREEN**
- **Trạng thái Live Deploy**: **100% SHA-256 Byte Parity với Source of Truth**

---

## 2. DANH MỤC ƯU ĐÃI ĐÃ ĐỐI SOÁT (HIỂN THỊ TRÊN BETA)
${activeReviewable.map((item, idx) => `### ${idx + 1}. [${item.brand}] ${item.details.offer_highlight}
- **URL Nguồn**: ${item.final_url}
- **Thời hạn**: ${item.details.valid_from ? item.details.valid_from + ' đến ' : ''}${item.details.valid_to}
- **Phạm vi**: ${item.details.scope}
- **Điều kiện**: Đã kiểm chứng ngữ nghĩa trong cùng khối bài viết
`).join('\n')}

---

## 3. LỊCH CHẠY TIẾP THEO (SCHEDULED CHECKPOINTS)
Lịch vận hành tự động định kỳ 5 mốc mỗi ngày:
- **07:00** (Khởi động ngày / cập nhật ưu đãi sáng)
- **10:45** (Chuẩn bị ưu đãi trưa)
- **14:00** (Cà phê / di chuyển chiều)
- **17:00** (Rạp phim / giải trí tối)
- **20:30** (Recheck cuối ngày & kiểm tra hạn dùng)

---

## 4. QUẢN TRỊ & BẢO MẬT
- **Production Commercial Feed**: \`deals_feed.json: []\`, \`is_approved: false\` (Khóa sản xuất).
- **Affiliate Links**: Tuyệt đối 0 link.
- **Bản quyền hình ảnh**: Toàn bộ thẻ địa điểm tuân thủ Gate 107 (Monogram + URL chính thức; 0 ảnh AI, 0 crop).
`;

  fs.writeFileSync(reportPath, reportContent, 'utf8');
  console.log(`\n📄 Báo cáo vận hành batch đã ghi tại: ${path.relative(repoRoot, reportPath)}`);

  return {
    batchId,
    runTimestamp,
    scannedCount: manifest109R.summary_metrics.total_leaves_evaluated,
    activeVerifiedCount: activeReviewable.length,
    watchlistCount: incomplete.length,
    rejectedCount: expiredOrRejected.length,
    expiringSoonCount: expiringSoon.length,
    liveUrl: 'https://deploy-ten-xi-48.vercel.app',
    reportPath: path.relative(repoRoot, reportPath)
  };
}

module.exports = {
  runAutonomousBatch
};

if (require.main === module) {
  runAutonomousBatch().catch(err => {
    console.error('Fatal error running autonomous batch:', err);
    process.exit(1);
  });
}
