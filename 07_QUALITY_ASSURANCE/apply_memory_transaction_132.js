/**
 * MEMORY TRANSACTION APPLIER (132)
 * Directive: JAYT-132-STUDENT-SAVINGS-DAILY-DECISION-OS
 * Version: v3.249.0
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

const transactionHeader = `
## [2026-08-26] TRANSACTION: JAYT-132-STUDENT-SAVINGS-DAILY-DECISION-OS (v3.249.0)
- **Directive**: JAYT-132-STUDENT-SAVINGS-DAILY-DECISION-OS
- **Status**: PRODUCTION_VERIFIED_AND_DEPLOYED
- **Production URL**: https://deploy-ten-xi-48.vercel.app
- **Unified 7 Workstreams & 4 Decision Questions Architecture**:
  1. **Cinema Planning**: 7-Day schedule across 5 chains with 3 transparency tiers, "Lập kèo xem phim 👥", and "⭐ Theo dõi ngày này".
  2. **Real-Pay Comparison**: 3 modes, exact formula without declaring fake winners, and honest user CTA "So sánh bằng giá bạn đang thấy 🧮".
  3. **Nearby Savings Radar**: 3 student campus clusters (Hòa Khánh, Ngũ Hành Sơn, Hải Châu), 0 GPS tracking, and Watchlist venues.
  4. **Habit Engine 5 Slots**: 07:30, 11:05, 14:30, 17:30, 20:00 with strict Moment-Fit Gate and post-21h transit guard.
  5. **Card Truth & Premium UI**: Single primary CTA, 0 placeholders, semantic #0B0F17 dark mode across viewports.
  6. **Data Supply Operations**: Evidence Ledger Batch 132 băm SHA-256 tracking 15 supply records and 26 watchlist venues.
  7. **Operational Governance**: Daily Brief, Append-Only log, and 4 Core Decision Questions verification.
`;

let memoryContent = fs.readFileSync(memoryPath, 'utf8');

if (!memoryContent.includes('JAYT-132-STUDENT-SAVINGS-DAILY-DECISION-OS')) {
  memoryContent = transactionHeader + '\n' + memoryContent;
  fs.writeFileSync(memoryPath, memoryContent, 'utf8');
  console.log('✅ Applied memory transaction JAYT-132 to PROJECT_MEMORY.md');
} else {
  console.log('ℹ️ Memory transaction JAYT-132 already present in PROJECT_MEMORY.md');
}
