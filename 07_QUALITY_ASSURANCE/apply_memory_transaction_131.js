/**
 * MEMORY TRANSACTION APPLIER (131)
 * Directive: JAYT-131-STUDENT-DAILY-DECISION-OS
 * Version: v3.248.0
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

const transactionHeader = `
## [2026-08-26] TRANSACTION: JAYT-131-STUDENT-DAILY-DECISION-OS (v3.248.0)
- **Directive**: JAYT-131-STUDENT-DAILY-DECISION-OS
- **Status**: PRODUCTION_VERIFIED_AND_DEPLOYED
- **Production URL**: https://deploy-ten-xi-48.vercel.app
- **Architecture & System Upgrades**:
  1. **Two-Layer Operating Model**:
     - Daily Decision Layer: 3-second rapid decision making for students/youth in Da Nang.
     - Evidence Layer: Truth-bounded gating where prices, promo codes, calendar showtimes, venues, apps, and CTAs only appear up to what data proves.
  2. **Four Core Engines Fully Operational**:
     - **Cinema Planning Engine**: 7-day schedule across 5 chains (CGV, Metiz, Starlight, Galaxy, Lotte) with 3 mandatory status tiers (🟢 Verified Active, ⚠️ Periodic Policy Recheck, 🏢 Verified Venue Listed Price), explicit Watchlist labeling for future dates, and zero synthetic showtime forecasting.
     - **Real-Pay Comparison Engine**: 3 transparent modes (🟢 Verified Real Pay, 🧮 Local Calculator, ℹ️ Insufficient Data Warning); strictly features user CTA "So sánh bằng giá bạn đang thấy" with 0 "Mở app rẻ nhất" speculative claims.
     - **Nearby Savings Engine**: 3 core student clusters (🎓 Hòa Khánh BK/SP, 🏖️ Ngũ Hành Sơn DUE/VKU, 🏢 Hải Châu DTU/Foreign Lang); max 6 venues initial limit; 0 GPS tracking; honest venue cards when deal is absent.
     - **Habit & Group Engine**: 5 slots moment-fit; listed total vs net per-person bill split; post-21:00 DanaBus serviceability guard with transparent late-night transit notice.
  3. **Evidence Ledger Batch 131**: Formal ledger (\`06_TRUST_AND_EVIDENCE/evidence_records/EVIDENCE_LEDGER_BATCH_131.json\`) tracking 15 supply records and 26 watchlist venues with SHA-256 hashes, TTL, locality, and serviceability gates.
  4. **Four Student User Journeys Verified**: Weekly movie planning, real-pay self-comparison, campus cluster discovery, and group bill splitting.
`;

let memoryContent = fs.readFileSync(memoryPath, 'utf8');

if (!memoryContent.includes('JAYT-131-STUDENT-DAILY-DECISION-OS')) {
  memoryContent = transactionHeader + '\n' + memoryContent;
  fs.writeFileSync(memoryPath, memoryContent, 'utf8');
  console.log('✅ Applied memory transaction JAYT-131 to PROJECT_MEMORY.md');
} else {
  console.log('ℹ️ Memory transaction JAYT-131 already present in PROJECT_MEMORY.md');
}
