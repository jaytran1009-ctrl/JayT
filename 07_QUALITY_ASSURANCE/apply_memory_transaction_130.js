/**
 * MEMORY TRANSACTION APPLIER (130)
 * Directive: JAYT-130-DAILY-MEMORY-AND-LESSONS-LOOP
 * Version: v3.247.0
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

const transactionHeader = `
## [2026-08-26] TRANSACTION: JAYT-130-DAILY-MEMORY-AND-LESSONS-LOOP (v3.247.0)
- **Directive**: JAYT-130-DAILY-MEMORY-AND-LESSONS-LOOP
- **Status**: OPERATIONAL_DISCIPLINE_ACTIVE
- **Key Frameworks Established**:
  1. **Daily Operating Brief Protocol**: Before any task, agent reads \`PROJECT_MEMORY.md\`, \`lessons_learned_registry.json\`, latest receipts, and generates a formal Brief covering Ground Truth, Active Work Orders, Governance Invariants, Past Incident Lessons, and Mandatory Acceptance Evidence.
  2. **Append-Only Daily Operational Log**: Post-batch logging in \`09_OPERATIONS/daily_logs/OPERATIONAL_LOG_YYYY_MM_DD.md\` recording exact actions, file changes, test outputs, unverified disclosures, and regression prevention steps.
  3. **Non-Superficial Memory Discipline**: Memory review is strict operational SSOT alignment, not superficial document version incrementing.
  4. **Strict Pre-Report Checklist**: Mandatory checks on Data Truth, Provenance, UX Truth, Production Truth, and Governance Truth before delivering responses.
  5. **Batch-Level Reporting Protocol**: 5-point concise batch reporting answering what was done, what changed for user, what remains unsolved, errors prevented, and next highest-impact step.
`;

let memoryContent = fs.readFileSync(memoryPath, 'utf8');

if (!memoryContent.includes('JAYT-130-DAILY-MEMORY-AND-LESSONS-LOOP')) {
  memoryContent = transactionHeader + '\n' + memoryContent;
  fs.writeFileSync(memoryPath, memoryContent, 'utf8');
  console.log('✅ Applied memory transaction JAYT-130 to PROJECT_MEMORY.md');
} else {
  console.log('ℹ️ Memory transaction JAYT-130 already present in PROJECT_MEMORY.md');
}
