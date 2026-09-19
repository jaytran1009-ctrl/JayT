/**
 * MEMORY TRANSACTION APPLIER (129)
 * Directive: JAYT-129-MOMENT-FIT-AND-CARD-TRUTH
 * Version: v3.246.0
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

const transactionHeader = `
## [2026-08-26] TRANSACTION: JAYT-129-MOMENT-FIT-AND-CARD-TRUTH (v3.246.0)
- **Directive**: JAYT-129-MOMENT-FIT-AND-CARD-TRUTH
- **Status**: PRODUCTION_VERIFIED_AND_DEPLOYED
- **Production URL**: https://deploy-ten-xi-48.vercel.app
- **Key Architectures Implemented**:
  1. **Moment-Fit Engine**: Strict filtering where Today Board cards must strictly match active slot (\`valid_time_windows\`). Slot 11:05 (Lunch) has ZERO night cinema showtimes, ZERO tan ca dinner combos, and ZERO transit clutter.
  2. **Card Truth Contract**: Eliminated all placeholder labels ("Deal 1", "Deal 2") in multi-deal cards, replaced with truthful specific benefit tags (e.g. \`[Mã PAYDAY (-30k)]\`, \`[VNPAY (Mua 1 Tặng 1)]\`). Every card has strictly 1 Primary Action CTA + a clean secondary utilities row (\`🧮 Chia bill\`, \`👥 Lập kèo\`, \`🚩 Báo tin\`).
  3. **Asset Truth Gate**: Restricted visual context images strictly to brands with verified physical assets (\`assetPath\` match). All other brands render high-contrast vector monogram crests with official domain attribution.
  4. **Three-Second Decision Home**: Replaced the automatic dump of 5 long verified cards on homepage with a clean 5-Destination Discovery Portal (\`Lịch Rạp 7 Ngày\`, \`So Sánh Thực Trả\`, \`5 Cụm Sinh Hoạt\`, \`Kèo Nhóm & Radar\`, \`Toàn Bộ Dữ Liệu\`).
  5. **Customer Care Loop**: User feedback now captures \`offerId\`, automatically shifts the card to \`RECHECK_PENDING\` locally, and suppresses it from active recommendations on that device.
  6. **Dark Mode Neutral Slate**: Unified single-surface \`#0B0F17\` dark design system with emerald action (\`#10B981\`), amber warning (\`#F59E0B\`), and slate neutral typography (\`#CBD5E1\`).
`;

let memoryContent = fs.readFileSync(memoryPath, 'utf8');

if (!memoryContent.includes('JAYT-129-MOMENT-FIT-AND-CARD-TRUTH')) {
  memoryContent = transactionHeader + '\n' + memoryContent;
  fs.writeFileSync(memoryPath, memoryContent, 'utf8');
  console.log('✅ Applied memory transaction JAYT-129 to PROJECT_MEMORY.md');
} else {
  console.log('ℹ️ Memory transaction JAYT-129 already present in PROJECT_MEMORY.md');
}
