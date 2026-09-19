/**
 * MEMORY TRANSACTION APPLIER (132B)
 * Directive: JAYT-132B-FOUR-JOURNEYS-SUPPLY-SPRINT
 * Version: v3.251.0
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

const transactionHeader = `
## [2026-08-26] TRANSACTION: JAYT-132B-FOUR-JOURNEYS-SUPPLY-SPRINT (v3.251.0)
- **Directive**: JAYT-132B-FOUR-JOURNEYS-SUPPLY-SPRINT
- **Status**: PRODUCTION_VERIFIED_AND_DEPLOYED
- **Production URL**: https://deploy-ten-xi-48.vercel.app
- **Four Journeys Supply Sprint Upgrades**:
  1. **Lane 1: Cinema Planning Engine (7-Day & Monthly Calendar)**:
     - 5 verified records (CGV Payday 30k, CGV VNPAY BOGO, CGV ZaloPay Suất trưa 50k, Metiz U22 45k, Starlight Combo 10k).
     - 7-Day calendar across 5 chains (CGV, Metiz, Starlight, Galaxy, Lotte Cinema); Future month labeled as reliable Watchlist.
     - "Lập kèo xem phim 👥" action button for verified showtimes.
  2. **Lane 2: Lunch & F&B Engine (11 items across 10 brands)**:
     - Added Lotteria Happy Lunch (40.000₫ – 45.000₫) and Dookki Buffet Tokpokki (139.000₫).
     - Menu items strictly labeled as "📋 GIÁ THAM KHẢO (MENU NIÊM YẾT)" with 0 speculative discount words.
  3. **Lane 3: Delivery & Mobility Engine**:
     - Public transit utility DanaBus 6.000₫/lượt active before 21:00 with after-21:00 safe transit guidance.
     - Real-Pay Comparison Desk features exact arithmetic formula (\`Giá món + Ship - Voucher = Thực trả\`) and 0 winning app speculation.
  4. **Lane 4: Community & Locality (5 Campus Clusters)**:
     - 5 campus & living clusters (Hòa Khánh, Hải Châu, Ngũ Hành Sơn, Thanh Khê, Sơn Trà) covering 26 verified locations.
     - Enforced mandatory unverified offer disclaimer: "Địa điểm hoạt động — ưu đãi chưa được đối soát; kiểm tra tại quầy/app."
  5. **Five Customer Acceptance Standards Met**:
     - 11:05 shows max 3 lunch options (KFC, Jollibee, Lotteria) without evening party meals, night movies, or transit.
     - Comparison desk calculates net total with formula or shows "No data", never guesses a winning app.
     - 17:30 shows Metiz U22 45k, DanaBus 6k, KFC Xô Hợp Cạ 189k with group plan actions.
     - Future calendar labeled as Watchlist (0 synthetic discount promises).
     - Every card has actionable CTAs (Mở nguồn ↗, Chia bill 🧮, Lập kèo 👥, Báo tin 🚩).
`;

let memoryContent = fs.readFileSync(memoryPath, 'utf8');

if (!memoryContent.includes('JAYT-132B-FOUR-JOURNEYS-SUPPLY-SPRINT')) {
  memoryContent = transactionHeader + '\n' + memoryContent;
  fs.writeFileSync(memoryPath, memoryContent, 'utf8');
  console.log('✅ Applied memory transaction JAYT-132B to PROJECT_MEMORY.md');
} else {
  console.log('ℹ️ Memory transaction JAYT-132B already present in PROJECT_MEMORY.md');
}
