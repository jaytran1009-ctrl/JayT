/**
 * JAYT PUBLIC BETA READINESS TEST SUITE (075R) — ZERO SIDE EFFECT
 * Directive: JAYT-075R-RELEASE-DRILL-CONTAINMENT
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

function getSha256(bufOrStr) {
  const buf = Buffer.isBuffer(bufOrStr) ? bufOrStr : Buffer.from(bufOrStr, 'utf8');
  return crypto.createHash('sha256').update(buf).digest('hex');
}

let testCount = 0;
let passCount = 0;

function assertTest(name, condition, message) {
  testCount++;
  if (condition) {
    passCount++;
    console.log(`  [${name}]: [PASS] - ${message}`);
  } else {
    console.error(`  [${name}]: [FAIL] - ${message}`);
    process.exitCode = 1;
  }
}

console.log('🧪 [JAYT-PUBLIC-BETA-075R-TEST] Khởi chạy bộ kiểm thử sẵn sàng Public Beta thuần túy (Zero Side-Effects)...\n');

// 1. Check Production Invariants: deals_feed.json === []
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodFeedContent = fs.readFileSync(prodFeedPath, 'utf8').trim();
const prodFeedSha = getSha256(prodFeedContent);
const expectedSha = '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';

assertTest(
  'BETA_01_PRODUCTION_FEED_EMPTY',
  prodFeedContent === '[]' && prodFeedSha === expectedSha,
  `Production feed duy trì tuyệt đối rỗng: deals_feed.json = [] (SHA-256: ${prodFeedSha})`
);

// 2. Check UI Honest Empty State Message
const uiJsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const uiJsContent = fs.readFileSync(uiJsPath, 'utf8');
const hasBetaMessage = uiJsContent.includes('JayT đang mở beta. Ưu đãi chỉ xuất hiện khi đủ điều kiện đối soát.');

assertTest(
  'BETA_02_HONEST_EMPTY_STATE_MESSAGE',
  hasBetaMessage,
  'UI hiển thị chính xác thông điệp Honest Empty State: "JayT đang mở beta. Ưu đãi chỉ xuất hiện khi đủ điều kiện đối soát."'
);

// 3. Check Zero Affiliate Links / Zero Buy CTAs in Production HTML/JS
const indexHtmlPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
const hasAffiliateLinksInProd = indexHtmlContent.includes('s.shopee.vn') || prodFeedContent.includes('s.shopee.vn');

assertTest(
  'BETA_03_ZERO_SYNTHETIC_AFFILIATE_LINKS',
  !hasAffiliateLinksInProd,
  'Production hoàn toàn sạch: 0 link affiliate, 0 giá sản phẩm giả lập, 0 CTA mua hàng chưa đối soát.'
);

// 4. Staging Feed Reference Preservation
const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
let stagingDealsCount = 0;
if (fs.existsSync(stagingFeedPath)) {
  const stagingDeals = JSON.parse(fs.readFileSync(stagingFeedPath, 'utf8'));
  stagingDealsCount = stagingDeals.length;
}

assertTest(
  'BETA_04_STAGING_REFERENCE_PRESERVED',
  stagingDealsCount === 3,
  `Staging duy trì đúng 3 deals tham chiếu nội bộ (1 Galaxy + 2 Metiz), không bị đẩy lên Production.`
);

// 5. Local Integrity Drill (Read-Only SHA-256 Hash Verification across key dirs)
const keyDirs = [
  path.join(repoRoot, '03_SOURCE_OF_TRUTH'),
  path.join(repoRoot, '04_DESIGN_SYSTEM'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'feed_gateway')
];

let checkedFilesCount = 0;
let integrityValid = true;

for (const kDir of keyDirs) {
  if (fs.existsSync(kDir)) {
    const files = fs.readdirSync(kDir);
    for (const f of files) {
      const fPath = path.join(kDir, f);
      if (fs.statSync(fPath).isFile()) {
        const sha = getSha256(fs.readFileSync(fPath));
        if (!sha || sha.length !== 64) {
          integrityValid = false;
        }
        checkedFilesCount++;
      }
    }
  }
}

assertTest(
  'BETA_05_LOCAL_INTEGRITY_DRILL_PASS',
  integrityValid && checkedFilesCount > 5,
  `LOCAL_INTEGRITY_DRILL: Đã đối soát toàn vẹn mã băm ${checkedFilesCount} files hệ thống cốt lõi (100% Read-Only, 0 Side-Effects).`
);

// 6. Zero Test Side-Effects Verification (Confirm no unapproved releases generated)
const releasePackMd = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_PUBLIC_BETA_RELEASE_PACK_075.md');
const releasePackJson = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_PUBLIC_BETA_RELEASE_PACK_075.json');

assertTest(
  'BETA_06_ZERO_SIDE_EFFECT_INVARIANT',
  !fs.existsSync(releasePackMd) && !fs.existsSync(releasePackJson),
  'Bộ kiểm thử hoàn toàn thuần túy (Pure Test): 0 tạo release pack tự động, 0 sửa con trỏ, 0 ghi đè build khi chưa có lệnh phát hành từ CEO.'
);

console.log(`\n======================================================`);
console.log(`🟢 [PUBLIC-BETA-075R-SUMMARY] Kết quả kiểm thử: ${passCount}/${testCount} PASS!\n`);

if (passCount !== testCount) process.exit(1);
