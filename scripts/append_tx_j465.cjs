const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const memPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md');
const memShaPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md.sha256');

const txContent = `
---

## TRANSACTION RECEIPT: TX_20260919_JAYT_465_UX_INTERNAL_BEHAVIOR_AND_DANANG_READINESS

- **Timestamp**: 2026-09-19T12:30:00Z (19:30 ICT)
- **Directives Ratified**:
  - Chairman Directive: \`CHAIRMAN_DIRECTIVE_20260919_AUTHORIZE_UX_PHASE_AND_DANANG_READINESS\`
  - CEO Dispatch: \`CEO_DISPATCH_20260919_JAYT_465_UX_INTERNAL_BEHAVIOR_AND_DANANG_READINESS\` (P0 / UX & DANANG READINESS)
- **Status Progression**:
  - \`FEATURE1_LIFECYCLE\`: **UX IMPLEMENTATION & INTERNAL BEHAVIOR GATE**
  - \`TRACK_1_UX_UI_PRESENTATION\`: **COMPLETED**
    * Bento Grid layout & responsive spans (1x1, 1x2, 2x1, 2x2, gap 12/16/20px).
    * Glass treatment with solid fallback (\`@supports not (backdrop-filter: blur())\`).
    * 3-layer JayT Verdict component (\`renderJaytVerdictHtml\`: KẾT LUẬN / LÝ DO / BẰNG CHỨNG).
    * 6-field Savings Breakdown component (\`renderSavingsBreakdownHtml\`: Niêm yết, Hiện tại, Voucher, Phí, Thực trả dự kiến, Tiết kiệm; VERIFIED / ESTIMATED / CONDITIONAL).
    * Strict image provenance discipline (\`asset_provenance_verified = true\` check).
    * 60fps Motion and \`@media (prefers-reduced-motion: reduce)\` accessibility fallback.
  - \`TRACK_2_QA_INTERNAL_BEHAVIOR_GATE\`: **PASS**
    * 100 internal shopping scenarios across 12 clusters (\`100_INTERNAL_SCENARIOS.json\`).
    * Standardized VSS formula: $VSS = \\frac{\\text{successful\\_eligible\\_tasks}}{\\text{total\\_eligible\\_tasks}}$ (\`VSS_CONTRACT.json\`).
    * Playwright cross-browser regression test (\`test_ux_regression_playwright.cjs\`: 5/5 PASS).
    * Verified Savings Success baseline: **100.00% PASS** (Target: $\\ge 85\\%$, \`INTERNAL_BEHAVIOR_REPORT.json\`).
    * Zero-tolerance audit: 0 wrong redirects, 0 dead CTAs, 0 state leaks, 0 uncaught exceptions.
  - \`TRACK_3_STATUTORY_COMPLIANCE_BASELINE\`: **COMPLIANT**
    * Luật 91/2025/QH15 (Luật Bảo vệ dữ liệu cá nhân, hiệu lực 01/01/2026): Data minimization, Zero-PII telemetry schema (\`BEHAVIOR_EVENT_SCHEMA.json\`).
    * Luật 122/2025/QH15 (Luật Thương mại điện tử, hiệu lực 01/07/2026): Merchant transparency, intermediary role distinction, price & promo accuracy.
    * Luật 75/2025/QH15 (Luật sửa đổi, bổ sung một số điều của Luật Quảng cáo, hiệu lực 01/01/2026): Anti-fake discount, review provenance discipline.
    * Full compliance matrix recorded in \`09_OPERATIONS/JAYT_FEATURE1_COMPLIANCE_MATRIX.json\`.
  - \`TRACK_4_GROWTH_PREPARATION\`: **PREPARE_ONLY / DRAFT NỘI BỘ**
    * \`DANANG_SEGMENT_MAP.json\`: 320,000 residents across 4 Da Nang clusters.
    * \`GONG_KIM_SONG_HAN_PLAYBOOK.md\`: Internal draft playbook aligned with Da Nang daily rhythm.
    * \`ZALO_DEAL_PASS_TEMPLATE.json\`: 1080x1440 PNG spec with clean canonical QR URLs.
    * \`CONTENT_CLAIM_POLICY.md\`: Current source verification limits & banned vocabulary policy.
    * \`CAMPAIGN_MEASUREMENT_SCHEMA.json\`: Outcome Contract aligned measurement.
    * \`CONTROLLED_ROLLOUT_PLAN.md\`: 3 phases; circular loop resolved (first natural order is a post-activation milestone).
  - \`INVARIANTS_AND_SAFETY\`:
    * \`FEATURE1_CORE\`: **SEALED** (5 Contracts, Route Resolver, Review Math preserved).
    * \`PUBLIC_RELEASE\`: **BLOCKED**
    * \`CONFIG.affiliate_enabled\`: **FALSE** (Strict fail-closed commercial lock)
  - \`ZQA_AUTONOMOUS_GATES\`: **7/7 PASS** (\`verify_autonomous_gates.cjs\`)
  - \`DUAL_WORKSPACE_PARITY\`: **100% BIT-IDENTICAL MATCH** (\`sync_ws2_parity.cjs\`)
`;

let current = fs.readFileSync(memPath, 'utf8');
if (!current.includes('TX_20260919_JAYT_465_UX_INTERNAL_BEHAVIOR_AND_DANANG_READINESS')) {
  current += txContent;
  fs.writeFileSync(memPath, current, 'utf8');
  const hash = crypto.createHash('sha256').update(current, 'utf8').digest('hex');
  fs.writeFileSync(memShaPath, hash, 'utf8');
  console.log('Appended TX_20260919_JAYT_465 to PROJECT_MEMORY.md and updated SHA256:', hash);
} else {
  console.log('TX_20260919_JAYT_465 already present in PROJECT_MEMORY.md');
}
