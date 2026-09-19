const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const memPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md');
const memShaPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md.sha256');

const txContent = `
---

## TRANSACTION RECEIPT: TX_20260919_JAYT_459_EXTERNAL_AUTHORITY_CHAIN

- **Timestamp**: 2026-09-19T09:50:00Z (16:50 ICT)
- **Directives Ratified**:
  - Chairman Directive: \`CHAIRMAN_DIRECTIVE_20260919_RATIFY_JAYT_458_AUTHORITY_BOOTSTRAP\`
  - CEO Dispatch: \`CEO_DISPATCH_20260919_JAYT_459_EXTERNAL_AUTHORITY_CHAIN\` (P0 / FINAL AUTHORITY BLOCKER)
- **Status Progression**:
  - \`GIT_REPOSITORY_AUTHORITY\`: **PASS** (Commit: \`a4c7af72c7db582f1d9d3ca7c5a143c1003d546c\`, Branch: \`main\`, Worktree: \`CLEAN\`)
  - \`VERCEL_DEPLOYMENT_AUTHORITY\`: **PASS** (Deployment ID: \`dpl_4zPWezybXB9p2aWABy2i8wu7b6b6\`, bit-identical \`1,103,674\` bytes, SHA-256: \`d253c768aa86014ebd0fc584ee6156a5f53c3f52eacfb1ca381f189e334cd5ca\`)
  - \`CANONICAL_MIGRATION_RECORD\`: **TECHNICALLY_VERIFIED** (\`CANONICAL-MIGRATION-20260919-001\`, Target \`https://jayt-production-v3420.vercel.app\` approved in principle, \`effective_at: null\`)
  - \`GITHUB_REMOTE_AUTHORITY\`: **NOT_VERIFIED** (No remote origin linked; no personal access token stored)
  - \`GITHUB_RUNS_AUTHENTIC\`: **NOT_VERIFIED** (Pending remote repository linkage and \`workflow_dispatch\` runs)
  - \`WATCHDOG_CLOUD_RECOVERY\`: **NOT_VERIFIED** (Pending remote runner execution)
  - \`EVIDENCE-AUTH-01\`: **ENFORCED** (Permanent release gate active; zero synthetic IDs permitted)
  - \`CEO_MATRIX_CANONICAL\`: **12 PASS / 2 NOT_VERIFIED** (Acceptance threshold: 14/14 PASS)
  - \`FEATURE1_UX_HANDOVER\`: **BLOCKED**
  - \`PUBLIC_RELEASE\`: **BLOCKED**
  - \`CONFIG.affiliate_enabled\`: **FALSE** (Strict fail-closed commercial lock)
- **Files Generated / Updated**:
  - \`08_RELEASE_VAULT/CANONICAL_PRODUCTION_MIGRATION_RECORD.json\`
  - \`JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/CANONICAL_PRODUCTION_MIGRATION_RECORD.json\`
  - \`JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/AUTHENTICITY/git-commit-identity.json\` (v2.0.0)
  - \`JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/AUTHENTICITY/github-run-verification.json\` (v2.0.0)
  - \`JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/AUTHENTICITY/canonical-production-authority.json\` (v2.0.0)
  - \`JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/AUTHENTICITY/ceo-matrix-canonical.json\` (v2.0.0)
  - \`JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/AUTHENTICITY/authenticity-verdict.json\` (v2.0.0)
`;

let current = fs.readFileSync(memPath, 'utf8');
if (!current.includes('TX_20260919_JAYT_459_EXTERNAL_AUTHORITY_CHAIN')) {
  current += txContent;
  fs.writeFileSync(memPath, current, 'utf8');
  const hash = crypto.createHash('sha256').update(current, 'utf8').digest('hex');
  fs.writeFileSync(memShaPath, hash, 'utf8');
  console.log('Appended TX_20260919_JAYT_459 to PROJECT_MEMORY.md and updated SHA256:', hash);
} else {
  console.log('TX_20260919_JAYT_459 already present in PROJECT_MEMORY.md');
}
