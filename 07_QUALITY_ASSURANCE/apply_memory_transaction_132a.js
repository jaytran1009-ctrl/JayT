/**
 * MEMORY TRANSACTION APPLIER (132A)
 * Directive: JAYT-132A-SINGLE-TRUTH-REAL-DECISION
 * Version: v3.250.0
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

const transactionHeader = `
## [2026-08-26] TRANSACTION: JAYT-132A-SINGLE-TRUTH-REAL-DECISION (v3.250.0)
- **Directive**: JAYT-132A-SINGLE-TRUTH-REAL-DECISION
- **Status**: PRODUCTION_VERIFIED_AND_DEPLOYED
- **Production URL**: https://deploy-ten-xi-48.vercel.app
- **SSOT Harmonization & Canonical Taxonomy Upgrades**:
  1. **Consolidated Single Truth**:
     - Upgraded \`customer_journey_north_star.json\` to v3.0.0 (\`JAYT_CUSTOMER_JOURNEY_NORTH_STAR_132A\`), eliminating all internal contradictions.
     - Enforced Four Canonical Statuses across all catalogs: \`ACTIVE_VERIFIED\` (5 items), \`POLICY_REFERENCE\` (1 item), \`WATCHLIST_RECHECK\` (1 item), \`MENU_REFERENCE\` (8 items).
  2. **Menu Truth & Card Truth Contract**:
     - Standard F&B items (KFC, Jollibee, GoGi, Phê La) strictly labeled as "📋 GIÁ THAM KHẢO (MENU NIÊM YẾT)", never using "giảm" or "deal".
  3. **Cinema Experience Truth**:
     - Lịch rạp 7 ngày theo từng cụm rạp phân 3 cấp độ minh bạch; "Tháng tới" là Watchlist theo dõi; nút "Lập kèo xem phim 👥" lấy suất chiếu thật.
  4. **Real-Pay Comparison Truth**:
     - 3 modes, formula breakdown, 0 winning app declaration, CTA "So sánh bằng giá bạn đang thấy 🧮".
  5. **Nearby Radar Truth**:
     - 3 student clusters (Hòa Khánh, Ngũ Hành Sơn, Hải Châu), 0 GPS tracking, and mandatory unverified offer disclaimer: "Địa điểm hoạt động — ưu đãi chưa được đối soát; kiểm tra tại quầy/app."
  6. **Habit Engine Moment-Fit**:
     - 5 Slots (07:30, 11:05, 14:30, 17:30, 20:00); 11:05 lunch slot strictly filters out night movies, evening party combos, and transit.
`;

let memoryContent = fs.readFileSync(memoryPath, 'utf8');

if (!memoryContent.includes('JAYT-132A-SINGLE-TRUTH-REAL-DECISION')) {
  memoryContent = transactionHeader + '\n' + memoryContent;
  fs.writeFileSync(memoryPath, memoryContent, 'utf8');
  console.log('✅ Applied memory transaction JAYT-132A to PROJECT_MEMORY.md');
} else {
  console.log('ℹ️ Memory transaction JAYT-132A already present in PROJECT_MEMORY.md');
}
