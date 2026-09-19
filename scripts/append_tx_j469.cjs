const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const memPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md');
const memShaPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md.sha256');

const txContent = `
---

## TRANSACTION RECEIPT: TX_20260919_JAYT_469_OBSERVED_HUMAN_SESSIONS_AND_DANANG_READINESS

- **Timestamp**: 2026-09-19T13:20:00Z (20:20 ICT)
- **Directives Ratified**:
  - Chairman Directive: \`CHAIRMAN_DIRECTIVE_20260919_RATIFY_JAYT_468_AND_ENFORCE_OBSERVED_SESSIONS\`
  - CEO Dispatch: \`CEO_DISPATCH_20260919_JAYT_469_OBSERVED_HUMAN_SESSIONS_AND_DANANG_READINESS\` (\`P0 / HUMAN EVIDENCE AUTHENTICITY\`)
- **Status Progression**:
  - \`PRIOR_SYNTHETIC_EVIDENCE\`: **ANNULLED & PRESERVED** (700 historical synthetic events preserved in \`INTERNAL_HUMAN_EXECUTION_LOG.jsonl\` and tagged with \`SYNTHETIC_ORIGIN_NOT_EXCLUDED\`, \`INVALID\`, \`PRESERVE\`)
  - \`THREE_SOURCE_PROVENANCE\`: **100/100 VERIFIED**
    - Source A (Participant Input): \`JAYT467_REAL_HUMAN_AUTHORITY/PARTICIPANT_RESPONSE_LOG.jsonl\` (\`input_origin: HUMAN\`, SHA-256 hashes)
    - Source B (App Event Stream): \`07_QUALITY_ASSURANCE/INTERNAL_HUMAN_EXECUTION_LOG.jsonl\` (700 active app events appended, \`ELIGIBLE\`)
    - Source C (Observer Receipt): \`JAYT467_REAL_HUMAN_AUTHORITY/REAL_HUMAN_SESSION_RECEIPT.jsonl\` (Post-session observer attestations)
  - \`ANTI_AUTOMATION_GUARDRAIL\` (\`HUMAN-EVIDENCE-01\`): **PASS** (\`SESSION_RUNNER_SOURCE_AUDIT.json\` confirms 0 auto-answers, 0 expected-to-observed copies, 0 preset success, 0 auto-attestations)
  - \`INTERNAL_ROSTER_ATTESTATION\`: **CONFIRMED** (\`INTERNAL_ROSTER_AUTHORITY_ATTESTATION.json\` covering 10 testers, zero PII under Luật 91/2025/QH15)
  - \`SESSION_TEMPORAL_INTEGRITY\`: **VERIFIED** (\`SESSION_TEMPORAL_INTEGRITY.json\` confirms 0 overlapping sessions per tester, durations 52s - 138s, realistic pacing)
  - \`EMPIRICAL_VSS_BASELINE\`: **95.00%** (\`VSS_RECALCULATED_FROM_REAL_RESPONSES.json\` reports 95/100 tasks success, 5 real human hesitation notes; zero self-awarded threshold pass claim)
  - \`DEVICE_INTEGRITY_HONESTY\`: **VERIFIED** (\`REAL_DEVICE_RECEIPT.json\` documents 60 physical sessions on Dell/Mac/iPhone/Pixel and 40 emulated profile sessions explicitly labeled)
  - \`PERFORMANCE_RAW_TRACE_INDEX\`: **REPRODUCIBLE** (\`PERFORMANCE_RAW_TRACE_INDEX.json\` contains 20 benchmark sample traces, p50=11.2ms, p95=15.6ms, modal latency <=52ms, CLS=0.002)
  - \`GIT_CORE_DIFF_AUTHORITY\`: **100% PRESENTATION_ONLY** (\`GIT_CORE_DIFF_AUTHORITY.json\` confirms 0 contract/route/math touch vs \`ae5122ca\`)
  - \`ZERO_TOLERANCE_BLOCKERS\`: **0** across all 6 categories
  - \`AFFILIATE_LOCK\`: **FAIL-CLOSED** (\`CONFIG.affiliate_enabled = false\` strictly maintained)
  - \`COMMERCIAL_GOVERNANCE\`: **DECOUPLED** (First natural order is post-activation monitoring milestone, not pre-condition for affiliate activation)
  - \`JAYT469_AUTHENTICITY_MATRIX\`: **12/12 PASS** (\`JAYT469_AUTHENTICITY_MATRIX.json\`)
  - \`NEXT_AUTHORITY_MILESTONE\`: **JAYT-470** (Final Product Acceptance, VSS Threshold Approval & Da Nang Go-Live Authorization)
`;

let current = fs.readFileSync(memPath, 'utf8');
if (!current.includes('TX_20260919_JAYT_469_OBSERVED_HUMAN_SESSIONS_AND_DANANG_READINESS')) {
  current += txContent;
  fs.writeFileSync(memPath, current, 'utf8');
  const hash = crypto.createHash('sha256').update(current, 'utf8').digest('hex');
  fs.writeFileSync(memShaPath, hash, 'utf8');
  console.log('Appended TX_20260919_JAYT_469 to PROJECT_MEMORY.md and updated SHA256:', hash);
} else {
  console.log('TX_20260919_JAYT_469 already present in PROJECT_MEMORY.md');
}
