/**
 * JAYT STANDALONE PUBLIC BETA RELEASE PACKAGER (075R)
 * Directive: JAYT-075R-RELEASE-DRILL-CONTAINMENT
 * NOTE: This action script is EXPLICIT and is ONLY invoked upon CEO approval.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

const { createSealedRelease } = require('./release_manager');

function getSha256(bufOrStr) {
  const buf = Buffer.isBuffer(bufOrStr) ? bufOrStr : Buffer.from(bufOrStr, 'utf8');
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('📦 [PACKAGE-RELEASE-075R] Bắt đầu đóng gói bản phát hành Public Beta theo phê duyệt của CEO...');

const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodFeedContent = fs.readFileSync(prodFeedPath, 'utf8').trim();
const prodFeedSha = getSha256(prodFeedContent);

if (prodFeedContent !== '[]') {
  throw new Error('FAIL-CLOSED: Production feed is not empty. Aborting release.');
}

const sealed = createSealedRelease('JayT Public Beta Release 075R', {
  scope: 'PUBLIC_BETA_RELEASE',
  is_approved: true
});

const releasePackMd = `# JAYT PUBLIC BETA RELEASE PACK (075R)

**Mã đợt phát hành**: \`RELEASE_PACK_PUBLIC_BETA_075R\`  
**Chỉ thị phê duyệt**: \`CEO_APPROVED_PUBLIC_BETA_RELEASE\`  
**Thời điểm niêm phong**: ${new Date().toISOString()}  
**Build ID**: \`${sealed.buildId}\`  
**Trạng thái phê duyệt**: \`APPROVED_BY_CEO\` (\`is_approved: true\`)

---

## 1. PHẠM VI PHÁT HÀNH PUBLIC BETA
- **UI Honest Empty State**: *"JayT đang mở beta, dữ liệu ưu đãi sẽ chỉ xuất hiện khi được đối soát."*
- **Production Feed**: \`deals_feed.json: []\` (0 link affiliate, 0 giá sản phẩm, 0 ngày ưu đãi).
- **Staging Feed**: 3 deal tham chiếu nội bộ.
`;

const releasePackPath = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_PUBLIC_BETA_RELEASE_PACK_075R.md');
fs.writeFileSync(releasePackPath, releasePackMd, 'utf8');

console.log(`✅ [RELEASE-PACKAGED] Build ID: ${sealed.buildId}`);
console.log(`   Release Pack MD: ${releasePackPath}`);
