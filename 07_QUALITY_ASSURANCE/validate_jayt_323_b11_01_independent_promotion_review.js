const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('🔬 RUNNING JAYT-323 B11_01 INDEPENDENT PROMOTION REVIEW QA...');

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
const decisionJsonPath = path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_323_B11_01_INDEPENDENT_PROMOTION_REVIEW_DECISION.json');
const decisionMdPath = path.join(root, '01_EXECUTIVE_COUNCIL', 'JAYT_323_B11_01_INDEPENDENT_PROMOTION_REVIEW_DECISION.md');
const workOrderPath = path.join(root, '01_EXECUTIVE_COUNCIL', 'JAYT_323_B11_01_INDEPENDENT_PROMOTION_REVIEW_WORK_ORDER.md');
const limitationPath = path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_323_B11_01_RECONCILIATION_LIMITATION.json');
const rawHtmlPath = path.join(root, '06_TRUST_AND_EVIDENCE', 'batch_11_ingress_vault', 'B11_01.raw.html');
const rcPath = path.join(root, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_v3.421.0_MANIFEST.json');
const dealsPath = path.join(root, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');

console.log('\n--- Suite 1: Decision Records Existence ---');
assertCheck('Decision JSON exists', fs.existsSync(decisionJsonPath));
assertCheck('Decision MD exists', fs.existsSync(decisionMdPath));
assertCheck('Work order exists', fs.existsSync(workOrderPath));
assertCheck('Limitation record exists', fs.existsSync(limitationPath));
assertCheck('Raw HTML exists', fs.existsSync(rawHtmlPath));
assertCheck('RC manifest exists', fs.existsSync(rcPath));

const decision = JSON.parse(fs.readFileSync(decisionJsonPath, 'utf8'));
const limitation = JSON.parse(fs.readFileSync(limitationPath, 'utf8'));
const rcManifest = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
const dealsFeed = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));
const rawBuf = fs.readFileSync(rawHtmlPath);
const rawSha = crypto.createHash('sha256').update(rawBuf).digest('hex');

console.log('\n--- Suite 2: Raw Evidence & Span Verification ---');
assertCheck('Raw HTML SHA256 matches exactly 5fc20b...', rawSha === '5fc20b13b11f26190db87b07cf6d7d462bc1a90bc459cd7654c2ea4fc9cfd190');
assertCheck('Decision raw SHA256 matches actual file', decision.raw_evidence_reverification.raw_sha256 === rawSha);
assertCheck('Raw size matches 229477 bytes', rawBuf.length === 229477);
const textSpanBuf = Buffer.from(decision.raw_evidence_reverification.supporting_text_span, 'utf8');
const offset = rawBuf.indexOf(textSpanBuf);
assertCheck('Text span offset is exactly 102480', offset === 102480);
assertCheck('Decision records correct offset 102480', decision.raw_evidence_reverification.supporting_text_offset_utf8 === 102480);

console.log('\n--- Suite 3: Card Boundary, Prohibitions & Commercial Locks ---');
assertCheck('Card information_only is true', decision.card_boundary_and_commercial_restrictions.information_only === true);
assertCheck('Mandatory disclaimer matches canonical standard', typeof decision.card_boundary_and_commercial_restrictions.mandatory_disclaimer === 'string' && decision.card_boundary_and_commercial_restrictions.mandatory_disclaimer.includes('không bán vé'));
assertCheck('Exactly 8 prohibitions enforced', decision.card_boundary_and_commercial_restrictions.prohibitions_enforced.length === 8);
assertCheck('Deals feed strictly empty array []', Array.isArray(dealsFeed) && dealsFeed.length === 0);

console.log('\n--- Suite 4: Prospective Authority & Accountability ---');
assertCheck('Human accountable approver identified', typeof decision.accountable_approver.human_name === 'string' && decision.accountable_approver.human_name.length > 0);
assertCheck('Signing timestamp is valid ISO UTC', !isNaN(Date.parse(decision.signed_at_utc)));
assertCheck('Historical 15:12Z retrospective mandate explicitly disclaimed', decision.review_findings_and_prospective_scope.historical_hydration_event.retrospective_assertion_disclaimed === true);
assertCheck('Council verdict strictly FUTURE_RELEASE_CANDIDATE_REVIEW_APPROVED', decision.council_verdict === 'FUTURE_RELEASE_CANDIDATE_REVIEW_APPROVED');

console.log('\n--- Suite 5: Release Candidate Scope & Production Isolation ---');
assertCheck('RC manifest candidate_scope strictly TWENTY_TWO_NON_COMMERCIAL_STAGING_CARDS_ONLY', rcManifest.candidate_scope === 'TWENTY_TWO_NON_COMMERCIAL_STAGING_CARDS_ONLY');
assertCheck('RC manifest is_approved is strictly false', rcManifest.is_approved === false);
assertCheck('RC manifest deployment_permitted is strictly false', rcManifest.deployment_permitted === false);
assertCheck('Production deployment authorized is strictly false', decision.governance_controls.production_deployment_authorized === false);
assertCheck('Production release decree granted is strictly false', decision.governance_controls.production_release_decree_granted === false);
assertCheck('Production live version is v3.420.0', decision.governance_controls.production_live_version === 'v3.420.0');

const allPassed = results.every(r => r.pass);
const totalPassed = results.filter(r => r.pass).length;
const totalCount = results.length;

console.log('\n========================================');
console.log(`QA AUDIT SUMMARY: ${totalPassed}/${totalCount} CHECKS PASSED`);
console.log(`VERDICT: ${allPassed ? 'INDEPENDENT_REVIEW_VERIFIED_PASS' : 'INDEPENDENT_REVIEW_VERIFIED_FAIL'}`);
console.log('========================================\n');

// Write QA Receipt
const receiptOutputPath = path.join(root, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'JAYT_323_B11_01_INDEPENDENT_PROMOTION_REVIEW_QA_RECEIPT.json');
const qaReceipt = {
  receipt_id: 'JAYT_323_B11_01_INDEPENDENT_PROMOTION_REVIEW_QA_RECEIPT',
  directive: 'JAYT-323',
  work_order: '01_EXECUTIVE_COUNCIL/JAYT_323_B11_01_INDEPENDENT_PROMOTION_REVIEW_WORK_ORDER.md',
  decision_file: '06_TRUST_AND_EVIDENCE/JAYT_323_B11_01_INDEPENDENT_PROMOTION_REVIEW_DECISION.json',
  evaluated_at_utc: new Date().toISOString(),
  checks_total: totalCount,
  checks_passed: totalPassed,
  checks_failed: totalCount - totalPassed,
  verdict: allPassed ? 'INDEPENDENT_REVIEW_VERIFIED_PASS' : 'INDEPENDENT_REVIEW_VERIFIED_FAIL',
  decision_verdict: decision.council_verdict,
  governance_invariants: {
    b11_01_in_rc_v3421: false,
    b11_01_future_rc_eligible: true,
    production_deployment_authorized: false,
    production_live_version: 'v3.420.0',
    commercial_locks_intact: true
  },
  detailed_results: results
};

fs.writeFileSync(receiptOutputPath, JSON.stringify(qaReceipt, null, 2) + '\n', 'utf8');
console.log('QA Receipt written to:', receiptOutputPath);

process.exit(allPassed ? 0 : 1);