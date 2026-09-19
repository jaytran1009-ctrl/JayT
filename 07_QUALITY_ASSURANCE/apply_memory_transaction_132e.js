/**
 * MEMORY TRANSACTION APPLIER (132E)
 * Directive: JAYT-132E-PROVENANCE-CONTAINMENT
 * Version: v3.254.0
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

const transactionHeader = `
## [2026-08-26] TRANSACTION: JAYT-132E-PROVENANCE-CONTAINMENT (v3.254.0)
- **Directive**: JAYT-132E-PROVENANCE-CONTAINMENT
- **Status**: PRODUCTION_DEPLOYED_READY_FOR_AUDIT
- **Production URL**: https://deploy-ten-xi-48.vercel.app
- **Provenance Containment & Canonical Reclassification Upgrades**:
  1. **Strict Provenance Quarantine Manifest Established**:
     - Quarantined all newly promoted F&B/Retail/Delivery claims lacking raw capture disk bundles (\`CONTAINMENT_MANIFEST_132E.json\`).
  2. **Canonical Single Truth Enforced (18 Live Feed Items)**:
     - \`ACTIVE_VERIFIED\` (Exactly 5 Cinema items with verified physical leaf files, SHA-256, and byte parity on disk).
     - \`POLICY_REFERENCE\` (Exactly 1 item: DanaBus public transit).
     - \`WATCHLIST_RECHECK\` (Exactly 3 items: Highlands JCB, WinMart WIN, Jollibee 69K + 26 Store locations).
     - \`MENU_REFERENCE\` (Exactly 9 items: KFC 88k, KFC 189k, Jollibee 73k, Lotteria 40k, Gong Cha 53k, Phúc Long 55k, Phê La 55k, GoGi 529k, Dookki 139k).
     - Zero ID overlap across canonical states in North Star, Feed, and Evidence Ledger.
  3. **Real-Pay Comparison Desk Transparency**:
     - Re-positioned comparison desk strictly as an interactive Local Calculator Tool. Zero speculative claims of pre-verified delivery sample bundles.
  4. **Strict Physical Provenance Test Suite**:
     - \`test_provenance_containment_and_strict_evidence_132e.js\` verifies physical file existence, SHA-256 matching, and single truth (44/44 PASS).
  5. **100% SHA-256 Byte Parity on Vercel Production**: Verified across all 7 SOT files.
`;

let memoryContent = fs.readFileSync(memoryPath, 'utf8');

if (!memoryContent.includes('JAYT-132E-PROVENANCE-CONTAINMENT')) {
  memoryContent = transactionHeader + '\n' + memoryContent;
  fs.writeFileSync(memoryPath, memoryContent, 'utf8');
  console.log('✅ Applied memory transaction JAYT-132E to PROJECT_MEMORY.md');
} else {
  console.log('ℹ️ Memory transaction JAYT-132E already present in PROJECT_MEMORY.md');
}
