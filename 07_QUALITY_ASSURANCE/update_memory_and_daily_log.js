const fs = require('fs');
const path = require('path');

const memoryPath = path.resolve(__dirname, '../PROJECT_MEMORY.md');
const dailyLogDir = path.resolve(__dirname, '../09_OPERATIONS/daily_logs');
const dailyLogPath = path.join(dailyLogDir, 'OPERATIONAL_LOG_2026_08_26.md');

let memory = fs.readFileSync(memoryPath, 'utf8');

const newTransaction = `## [2026-08-26] TRANSACTION: P0-INCIDENT-JAYT-134B-CONTAINMENT (v3.255.0)
- **Directive**: JAYT-134B — P0 TRUTH, CONTACT & ASSET CONTAINMENT
- **Severity**: P0_CRITICAL (ALL PRIOR ACCEPTANCE 133/134A FORMALLY SUSPENDED & REVOKED)
- **Status**: PRODUCTION_CONTAINED_AND_VERIFIED_CLEAN
- **Production URL**: https://deploy-ten-xi-48.vercel.app
- **Root Cause & Disclosure**:
  - The previous 133/134A workflows failed to catch hard-coded unverified synthetic data introduced into \`jayt_apex_interface.js\` (including fake student venues, synthetic phone numbers like \`0905123456\`, unverified \`tel:\` links, stock Unsplash images falsely attributed to real brands, synthetic \`Freeship 0đ\` claims, fake Fintech CPA banners, and synthetic Klook affiliate buttons).
  - All previously claimed departmental review scores (e.g. 9.07/10, 9.62/10) and "100% PASS" representations for synthetic modules are officially revoked and declared void.
- **P0 Containment Execution Summary**:
  1. **Purged All Synthetic Venues & Direct Contacts**:
     - Removed \`campusRescueDirectoryV9\` containing handwritten non-canonical venues, unverified free perks ("Trà đá + canh thêm 0đ"), fake phone numbers, and \`tel:\` links.
     - Replaced Student Hub Tab 1 with \`canonicalStudentWatchlist\` pointing exclusively to 26 canonical locations in \`four_layer_dataset.json\` with disk evidence pointers (\`05_DEAL_AND_AFFILIATE/batch_capture_...\`).
  2. **Purged 100% Stock/Unsplash Assets**:
     - Removed all 20 occurrences of \`images.unsplash.com\` across the codebase. Zero unverified stock images remain in source or build bundles.
  3. **Purged Synthetic Ecommerce & Affiliate Claims**:
     - Removed all synthetic KTX gear items (\`quat_kep_ktx_01\`, etc.) and all unverified \`Freeship 0đ\` claims. Replaced with honest containment notice.
     - Removed synthetic Fintech CPA banner (Cake/MBBank 50k cash) and synthetic Klook weekend affiliate CTA buttons.
  4. **Strict Fail-Closed QA Guardrails**:
     - Created \`07_QUALITY_ASSURANCE/test_p0_truth_containment_134b.js\` enforcing zero stock images, zero unverified phones/tel, zero unverified maps, and zero synthetic ecommerce claims (6/6 PASS).
  5. **Live CDN Verification & Incident Manifest**:
     - Created immutable append-only incident ledger \`08_RELEASE_VAULT/INCIDENT_MANIFEST_JAYT_134B_CONTAINMENT.json\`.
     - Live Puppeteer audit on \`https://deploy-ten-xi-48.vercel.app\` verified \`unsplashImagesCount: 0\`, \`telLinksCount: 0\`, \`fakePhonesCount: 0\`.

`;

if (!memory.includes('TRANSACTION: P0-INCIDENT-JAYT-134B-CONTAINMENT')) {
  memory = newTransaction + memory;
  fs.writeFileSync(memoryPath, memory, 'utf8');
  console.log('✅ Updated PROJECT_MEMORY.md with P0 Containment Transaction');
}

// Daily log update
let dailyLog = '';
if (fs.existsSync(dailyLogPath)) {
  dailyLog = fs.readFileSync(dailyLogPath, 'utf8');
} else {
  dailyLog = '# OPERATIONAL LOG — 2026-08-26\n\n';
}

const dailyEntry = `
## [17:55] P0 INCIDENT JAYT-134B CONTAINMENT REPORT
- **Severity**: P0 Critical
- **Directive**: JAYT-134B — P0 TRUTH, CONTACT & ASSET CONTAINMENT
- **Actions Executed**:
  1. Purged all 20 occurrences of Unsplash images.
  2. Purged all fake phone numbers (0905123456, etc.) and tel: protocol links.
  3. Purged synthetic campus food directory, replacing with canonicalStudentWatchlist with provenance.
  4. Purged synthetic Freeship 0đ claims, synthetic KTX gear items, and fake affiliate CPA/Klook buttons.
  5. Established append-only incident manifest: 08_RELEASE_VAULT/INCIDENT_MANIFEST_JAYT_134B_CONTAINMENT.json.
  6. Verified 100% clean on Vercel Production via Puppeteer Live Audit.
  7. Formally revoked all previous 133/134A acceptance scores.
`;

if (!dailyLog.includes('P0 INCIDENT JAYT-134B CONTAINMENT REPORT')) {
  dailyLog += '\n' + dailyEntry.trim() + '\n';
  fs.writeFileSync(dailyLogPath, dailyLog, 'utf8');
  console.log('✅ Updated daily operational log for 2026-08-26');
}
