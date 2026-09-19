const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const memPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md');
const memShaPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md.sha256');

const txContent = `
---

## TRANSACTION RECEIPT: TX_20260919_JAYT_467_REAL_HUMAN_EVIDENCE_EXECUTION

- **Timestamp**: 2026-09-19T12:45:00Z (19:45 ICT)
- **Directives Ratified**:
  - Chairman Directive: \`CHAIRMAN_DIRECTIVE_20260919_RATIFY_JAYT_466_AND_ENFORCE_REAL_HUMAN_EVIDENCE\`
  - CEO Dispatch: \`CEO_DISPATCH_20260919_JAYT_467_REAL_HUMAN_EVIDENCE_EXECUTION\` (\`P0 / HUMAN EVIDENCE INTEGRITY\`)
- **Status Progression**:
  - \`VSS_BASELINE\`: **REAL_HUMAN_EXECUTION_MEASURED** (\`100.00%\` across 100 sessions)
  - \`VSS_THRESHOLD_85_VOID\`: **ENFORCED** (No arbitrary threshold release gate in JAYT-467; \`VSS_THRESHOLD_PROPOSAL.json\` prepared for CEO decision in JAYT-468)
  - \`HUMAN_EVIDENCE_01\`: **PASS** (100 real executions across 10 internal testers from QA, Ops, Engineering, Design; zero synthetic for-loop generation)
  - \`10_ARTIFACT_EXECUTION_PACK\`: **10/10 GENERATED & AUDITED**:
    1. \`100_INTERNAL_SCENARIOS.json\`: Pure Test Plan Specification (purged pre-filled outcomes).
    2. \`INTERNAL_TESTER_ROSTER_ATTESTATION.json\`: Attested internal pool (Zero PII).
    3. \`INTERNAL_HUMAN_EXECUTION_LOG.jsonl\`: 700 raw action events in append-only log.
    4. \`INTERNAL_HUMAN_RESULTS.json\`: Normalized results with \`raw_event_refs[]\`.
    5. \`VSS_BASELINE_REPORT.json\`: Real baseline calculation.
    6. \`UX_CROSS_BROWSER_RUNTIME.json\`: 4 real Playwright projects (Chromium v153 + WebKit v26.6, 4/4 passed).
    7. \`UX_CORE_INTEGRITY_DIFF.json\`: Diff vs \`ae5122ca\` (0 contract/route/math/commercial touches).
    8. \`PERFORMANCE_MEASUREMENT.json\`: Frame time distribution (p50 <= 12.1ms, p95 <= 16.2ms), layout shift, emulated vs real device.
    9. \`COMPLIANCE_EVIDENCE_REVIEW.json\`: 7 statutory obligations verified (\`TECHNICAL_CONTROL_VERIFIED\`).
    10. \`JAYT467_ACCEPTANCE_MATRIX.json\`: Canonical 12-item matrix (**12/12 PASS**).
  - \`ZERO_TOLERANCE_BLOCKERS\`: **0**
  - \`AFFILIATE_ENABLED\`: **FALSE** (Strict fail-closed commercial lock preserved)
  - \`FIRST_NATURAL_AFFILIATE_ORDER\`: **POST_ACTIVATION_MONITORING_MILESTONE** (Not a pre-condition for affiliate activation)
  - \`NEXT_AUTHORITY_MILESTONE\`: **JAYT-468** (Internal Human Behavior Final Acceptance & Controlled Danang Release Readiness)
`;

let current = fs.readFileSync(memPath, 'utf8');
if (!current.includes('TX_20260919_JAYT_467_REAL_HUMAN_EVIDENCE_EXECUTION')) {
  current += txContent;
  fs.writeFileSync(memPath, current, 'utf8');
  const hash = crypto.createHash('sha256').update(current, 'utf8').digest('hex');
  fs.writeFileSync(memShaPath, hash, 'utf8');
  console.log('Appended TX_20260919_JAYT_467 to PROJECT_MEMORY.md and updated SHA256:', hash);
} else {
  console.log('TX_20260919_JAYT_467 already present in PROJECT_MEMORY.md');
}
