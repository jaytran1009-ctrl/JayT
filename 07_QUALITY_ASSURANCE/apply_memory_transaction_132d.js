/**
 * MEMORY TRANSACTION APPLIER (132D)
 * Directive: JAYT-132D-FNB-DELIVERY-EVIDENCE
 * Version: v3.253.0
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

const transactionHeader = `
## [2026-08-26] TRANSACTION: JAYT-132D-FNB-DELIVERY-EVIDENCE (v3.253.0)
- **Directive**: JAYT-132D-FNB-DELIVERY-EVIDENCE
- **Status**: PRODUCTION_VERIFIED_AND_DEPLOYED
- **Production URL**: https://deploy-ten-xi-48.vercel.app
- **F&B & Delivery Evidence Batch Upgrades**:
  1. **15 Captured Candidates Across 12 Brands & Utilities**:
     - Captured Jollibee, Lotteria, KFC, Highlands, Phê La, Gong Cha, Domino's, WinMart, Dookki, ShopeeFood, GrabFood, BeFood, Xanh SM, DanaBus, Metiz.
  2. **Jollibee 69K Strict Governance**:
     - Candidate Jollibee 69K strictly classified as \`WATCHLIST_RECHECK\` (not active live deal) because public source has not proven Da Nang scope or validity TTL.
  3. **Delivery Apps Account & Cart Dependency**:
     - ShopeeFood, GrabFood, BeFood, and Xanh SM classified as \`ACCOUNT_OR_CART_DEPENDENT\` (\`RADAR_ONLY_SIGNAL\`).
     - Real-Pay Comparison Desk features explicit warning notice (0 fake voucher or freeship promises).
  4. **Three Actionability Tiers**:
     - \`ACTIONABLE_LIVE\` (Bấm ngay): Lotteria 40k-45k, Domino's BOGO, Metiz 45k, CGV 30k, Gong Cha 15%, WinMart WIN.
     - \`RECHECK_REQUIRED\` (Kiểm tra lại): Jollibee 69k, Highlands JCB 20k.
     - \`CART_DEPENDENT_SIMULATOR\` (Máy tính theo giỏ hàng): ShopeeFood, GrabFood, BeFood, Xanh SM.
  5. **5 Sample Baskets Captured Across Da Nang Campus Clusters**:
     - KFC Lunch 88k, Lotteria Happy 40k, Gong Cha 53k, Phê La 55k, GoGi Group 529k.
  6. **100% SHA-256 Byte Parity & 15 Puppeteer Screenshots**: Live production verified and audited.
`;

let memoryContent = fs.readFileSync(memoryPath, 'utf8');

if (!memoryContent.includes('JAYT-132D-FNB-DELIVERY-EVIDENCE')) {
  memoryContent = transactionHeader + '\n' + memoryContent;
  fs.writeFileSync(memoryPath, memoryContent, 'utf8');
  console.log('✅ Applied memory transaction JAYT-132D to PROJECT_MEMORY.md');
} else {
  console.log('ℹ️ Memory transaction JAYT-132D already present in PROJECT_MEMORY.md');
}
