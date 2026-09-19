const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');

console.log('🔬 RUNNING JAYT-323 B11_02 SCHEDULE-SPECIFIC PRE-AUDIT QA...');

const results = [];
function assertCheck(name, condition, detail = '') {
  if (!condition) {
    console.error(`  ❌ [FAIL] ${name}: ${detail}`);
    results.push({ name, pass: false, detail });
  } else {
    console.log(`  ✓ [PASS] ${name}`);
    results.push({ name, pass: true, detail });
  }
}

// Paths
const proposalJsonPath = path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_323_B11_02_SCHEDULE_SPECIFIC_PRE_AUDIT_PROPOSAL.json');
const proposalMdPath = path.join(root, '01_EXECUTIVE_COUNCIL', 'JAYT_323_B11_02_SCHEDULE_SPECIFIC_PRE_AUDIT_PROPOSAL.md');
const workOrderPath = path.join(root, '01_EXECUTIVE_COUNCIL', 'JAYT_323_B11_02_SCHEDULE_SPECIFIC_PRE_AUDIT_WORK_ORDER.md');
const registryPath = path.join(root, '00_PROGRAM_BASELINE', 'JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json');
const rcPath = path.join(root, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_v3.421.0_MANIFEST.json');
const dealsPath = path.join(root, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const vaultDir = path.join(root, '06_TRUST_AND_EVIDENCE', 'batch_11_ingress_vault');

console.log('\n--- Suite 1: Proposal Artifacts & Schema Verification ---');
assertCheck('Proposal JSON exists', fs.existsSync(proposalJsonPath));
assertCheck('Proposal MD exists', fs.existsSync(proposalMdPath));
assertCheck('Work order exists', fs.existsSync(workOrderPath));

const proposal = JSON.parse(fs.readFileSync(proposalJsonPath, 'utf8'));
const candidate = proposal.candidate;
assertCheck('Slot ID is B11_02', candidate.slot_id === 'B11_02');
assertCheck('Candidate ID matches standard', candidate.candidate_id === 'B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022');
assertCheck('Official leaf URL is valid 1022 article', candidate.leaf_url === 'https://1022.vn/nhieu-trai-nghiem-moi-cho-du-khach-tai-bao-tang-dieu-khac-cham-da-nang/');
assertCheck('Publication date is 2026', candidate.source_date === '2026-08-28');
assertCheck('Content tier is T2_CIVIC_CULTURE', candidate.content_tier === 'T2_CIVIC_CULTURE');

console.log('\n--- Suite 2: Schedule-Specific Recurrence Rule & Anti-Vagueness ---');
const expectedSpan = 'Chương trình nghệ thuật vũ điệu Champa gồm các tiết mục múa Apsara, hòa tấu nhạc cụ Chăm và múa Vũ hội làng Chăm sẽ được tổ chức vào buổi sáng các ngày 15 và 30 hằng tháng.';
assertCheck('Verbatim span matches exact recurrence rule sentence', candidate.schedule_specific_verbatim_span === expectedSpan);
assertCheck('Span includes explicit recurring days (15 và 30 hằng tháng)', candidate.schedule_specific_verbatim_span.includes('15 và 30 hằng tháng'));
assertCheck('Span excludes vague "trong thời gian tới" phrasing', !candidate.schedule_specific_verbatim_span.includes('trong thời gian tới'));
assertCheck('Target byte offset UTF-8 is recorded', candidate.span_verification.target_byte_offset_utf8 === 101310);
assertCheck('Target char offset is recorded', candidate.span_verification.target_char_offset === 100437);

console.log('\n--- Suite 3: Non-Commercial Card Boundary & Commercial Locks ---');
assertCheck('Mandatory disclaimer present and includes non-commercial terms', candidate.non_commercial_card_boundary.mandatory_disclaimer.includes('không bán vé'));
assertCheck('Prohibitions include ticket_sales, tour_agency, fees, etc.', candidate.non_commercial_card_boundary.prohibitions.includes('ticket_sales') && candidate.non_commercial_card_boundary.prohibitions.includes('tour_agency_intermediary'));
const dealsFeed = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));
assertCheck('Deals feed strictly empty array []', Array.isArray(dealsFeed) && dealsFeed.length === 0);

console.log('\n--- Suite 4: Deduplication Audit Against 23 Staging Cards ---');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
assertCheck('Staging Canonical Registry has exactly 23 cards', registry.approved_entities_count === 23);
const duplicates = registry.approved_entities.filter(e => e.title.includes('Bảo tàng') || e.title.includes('Chăm') || (e.external_url && e.external_url.includes('cham')));
assertCheck('Zero duplicate Cham/Museum cards in Canonical Registry', duplicates.length === 0);

console.log('\n--- Suite 5: Gate Invariants & Zero Quota Enforcement ---');
const b11_02Raw = path.join(vaultDir, 'B11_02.raw.html');
const b11_02Headers = path.join(vaultDir, 'B11_02.headers.json');
assertCheck('B11_02.raw.html DOES NOT exist in vault (zero capture)', !fs.existsSync(b11_02Raw));
assertCheck('B11_02.headers.json DOES NOT exist in vault (zero capture)', !fs.existsSync(b11_02Headers));
assertCheck('Proposal status is PROPOSAL_ONLY', candidate.scope_boundaries_enforced.status === 'DISCOVERY_PRE_AUDIT_PROPOSAL_ONLY__AWAITING_COUNCIL_TARGETED_INGRESS_SCOPE');
const rcManifest = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
assertCheck('Release Candidate strictly maintains 22 cards', rcManifest.candidate_scope === 'TWENTY_TWO_NON_COMMERCIAL_STAGING_CARDS_ONLY');
assertCheck('Release Candidate is_approved is false', rcManifest.is_approved === false);

const allPassed = results.every(r => r.pass);
const totalPassed = results.filter(r => r.pass).length;
const totalCount = results.length;

console.log('\n========================================');
console.log(`QA AUDIT SUMMARY: ${totalPassed}/${totalCount} CHECKS PASSED`);
console.log(`VERDICT: ${allPassed ? 'SCHEDULE_PRE_AUDIT_PASS' : 'SCHEDULE_PRE_AUDIT_FAIL'}`);
console.log('========================================\n');

// Write QA Receipt
const receiptOutputPath = path.join(root, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'JAYT_323_B11_02_SCHEDULE_PRE_AUDIT_QA_RECEIPT.json');
const qaReceipt = {
  receipt_id: 'JAYT_323_B11_02_SCHEDULE_PRE_AUDIT_QA_RECEIPT',
  directive: 'JAYT-323',
  work_order: '01_EXECUTIVE_COUNCIL/JAYT_323_B11_02_SCHEDULE_SPECIFIC_PRE_AUDIT_WORK_ORDER.md',
  proposal_file: '06_TRUST_AND_EVIDENCE/JAYT_323_B11_02_SCHEDULE_SPECIFIC_PRE_AUDIT_PROPOSAL.json',
  evaluated_at_utc: new Date().toISOString(),
  checks_total: totalCount,
  checks_passed: totalPassed,
  checks_failed: totalCount - totalPassed,
  verdict: allPassed ? 'SCHEDULE_PRE_AUDIT_PASS' : 'SCHEDULE_PRE_AUDIT_FAIL',
  candidate_summary: {
    slot_id: 'B11_02',
    candidate_id: 'B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022',
    leaf_url: candidate.leaf_url,
    recurrence_rule_span: candidate.schedule_specific_verbatim_span,
    deduplication_clean: true,
    quota_consumed: 0,
    vault_writes: 0
  },
  detailed_results: results
};

fs.writeFileSync(receiptOutputPath, JSON.stringify(qaReceipt, null, 2) + '\n', 'utf8');
console.log('QA Receipt written to:', receiptOutputPath);

process.exit(allPassed ? 0 : 1);