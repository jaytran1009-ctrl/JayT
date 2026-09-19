const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('🔬 RUNNING JAYT-323 B11_01 PROVENANCE RECONCILIATION QA...');

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

// 1. Files existence & byte hashes
const attestationPath = path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_323_B11_01_PROVENANCE_RECONCILIATION_ATTESTATION.json');
const approvalPath = path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_323_B11_01_PUBLIC_APPROVAL_STAGING_ONLY.json');
const receiptPath = path.join(root, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'STAGING_B11_01_HYDRATION_RECEIPT.json');
const ingressManifestPath = path.join(root, '06_TRUST_AND_EVIDENCE', 'batch_11_ingress_vault', 'JAYT_323_B11_01_INGRESS_MANIFEST.json');
const rawHtmlPath = path.join(root, '06_TRUST_AND_EVIDENCE', 'batch_11_ingress_vault', 'B11_01.raw.html');
const exceptionPath = path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_323_B11_01_PROVENANCE_EXCEPTION.json');
const memoryPath = path.join(root, 'PROJECT_MEMORY.md');
const rcPath = path.join(root, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_v3.421.0_MANIFEST.json');
const registryPath = path.join(root, '00_PROGRAM_BASELINE', 'JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json');

console.log('\n--- Suite 1: Artifact Existence and Preservation ---');
assertCheck('Attestation JSON exists', fs.existsSync(attestationPath));
assertCheck('Canonical approval exists', fs.existsSync(approvalPath));
assertCheck('Hydration receipt exists', fs.existsSync(receiptPath));
assertCheck('Ingress manifest exists', fs.existsSync(ingressManifestPath));
assertCheck('Raw HTML exists', fs.existsSync(rawHtmlPath));
assertCheck('Exception JSON exists', fs.existsSync(exceptionPath));
assertCheck('PROJECT_MEMORY.md exists', fs.existsSync(memoryPath));
assertCheck('Release Candidate manifest exists', fs.existsSync(rcPath));

const attestation = JSON.parse(fs.readFileSync(attestationPath, 'utf8'));
const approval = JSON.parse(fs.readFileSync(approvalPath, 'utf8'));
const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
const ingressManifest = JSON.parse(fs.readFileSync(ingressManifestPath, 'utf8'));
const exception = JSON.parse(fs.readFileSync(exceptionPath, 'utf8'));
const rcManifest = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const memoryContent = fs.readFileSync(memoryPath, 'utf8');

console.log('\n--- Suite 2: Byte-for-Byte Preservation Verification ---');
const approvalSha = getSha256(approvalPath);
const receiptSha = getSha256(receiptPath);
const ingressSha = getSha256(ingressManifestPath);
const rawHtmlSha = getSha256(rawHtmlPath);
const registrySha = getSha256(registryPath);

assertCheck('Approval SHA256 matches preserved record', approvalSha === attestation.artifact_preservation_ledger.canonical_approval_preserved.sha256, `${approvalSha} vs ${attestation.artifact_preservation_ledger.canonical_approval_preserved.sha256}`);
assertCheck('Receipt SHA256 matches preserved record', receiptSha === attestation.artifact_preservation_ledger.staging_hydration_receipt_preserved.sha256, `${receiptSha} vs ${attestation.artifact_preservation_ledger.staging_hydration_receipt_preserved.sha256}`);
assertCheck('Ingress manifest SHA256 matches preserved record', ingressSha === attestation.artifact_preservation_ledger.ingress_manifest_preserved.sha256, `${ingressSha} vs ${attestation.artifact_preservation_ledger.ingress_manifest_preserved.sha256}`);
assertCheck('Raw HTML SHA256 matches preserved record', rawHtmlSha === attestation.artifact_preservation_ledger.raw_html_payload_preserved.sha256, `${rawHtmlSha} vs ${attestation.artifact_preservation_ledger.raw_html_payload_preserved.sha256}`);
assertCheck('Raw HTML SHA256 matches canonical expected 5fc20b...', rawHtmlSha === '5fc20b13b11f26190db87b07cf6d7d462bc1a90bc459cd7654c2ea4fc9cfd190');
assertCheck('Canonical registry SHA256 matches preserved record', registrySha === attestation.artifact_preservation_ledger.canonical_registry_preserved.sha256);
assertCheck('Registry contains exactly 23 approved entities', registry.approved_entities_count === 23 && registry.approved_entities.length === 23);

console.log('\n--- Suite 3: Cross-Artifact Reconciliation & Identifiers ---');
assertCheck('Canonical approval ID matches across attestation, exception, and approval file',
  approval.approval_id === 'JAYT_323_B11_01_PUBLIC_APPROVAL_STAGING_ONLY' &&
  exception.facts.canonical_approval_id === 'JAYT_323_B11_01_PUBLIC_APPROVAL_STAGING_ONLY' &&
  attestation.accountable_approver.canonical_approval_id === 'JAYT_323_B11_01_PUBLIC_APPROVAL_STAGING_ONLY'
);

assertCheck('Canonical approval timestamp matches across attestation, exception, and approval file',
  approval.approved_at_utc === '2026-09-04T15:30:00Z' &&
  exception.facts.canonical_approval_timestamp_utc === '2026-09-04T15:30:00Z' &&
  attestation.artifact_preservation_ledger.canonical_approval_preserved.timestamp_utc === '2026-09-04T15:30:00Z'
);

assertCheck('Hydration receipt evaluation timestamp matches across attestation, exception, and receipt file',
  receipt.evaluated_at_utc === '2026-09-04T15:17:43.806Z' &&
  exception.facts.receipt_evaluated_at_utc === '2026-09-04T15:17:43.806Z' &&
  attestation.artifact_preservation_ledger.staging_hydration_receipt_preserved.evaluated_at_utc === '2026-09-04T15:17:43.806Z'
);

assertCheck('Receipt approval reference alias matches across attestation, exception, and receipt file',
  receipt.ceo_approval_references.includes('CEO-JAYT-323-B11-01-STAGING-ONLY') &&
  exception.facts.receipt_approval_reference === 'CEO-JAYT-323-B11-01-STAGING-ONLY' &&
  attestation.governance_and_promotion_determination.alias_resolution.receipt_reference === 'CEO-JAYT-323-B11-01-STAGING-ONLY'
);

assertCheck('Ingress raw SHA256 consistent across manifest, approval, receipt, and attestation',
  ingressManifest.raw_sha256 === '5fc20b13b11f26190db87b07cf6d7d462bc1a90bc459cd7654c2ea4fc9cfd190' &&
  approval.evidence.raw_body_sha256 === '5fc20b13b11f26190db87b07cf6d7d462bc1a90bc459cd7654c2ea4fc9cfd190' &&
  receipt.hydrated_candidates[0].raw_body_sha256 === '5fc20b13b11f26190db87b07cf6d7d462bc1a90bc459cd7654c2ea4fc9cfd190' &&
  attestation.artifact_preservation_ledger.raw_html_payload_preserved.sha256 === '5fc20b13b11f26190db87b07cf6d7d462bc1a90bc459cd7654c2ea4fc9cfd190'
);

assertCheck('UTF-8 offset 102480 consistent across manifest, approval, and receipt',
  ingressManifest.span_byte_offset_utf8 === 102480 &&
  approval.evidence.supporting_text_offset_utf8 === 102480 &&
  receipt.hydrated_candidates[0].supporting_text_offset_utf8 === 102480
);

console.log('\n--- Suite 4: Memory Ledger & Governance Traceability ---');
assertCheck('Memory ledger records TX_20260904_JAYT_323_B11_01_PROVENANCE_EXCEPTION', memoryContent.includes('TX_20260904_JAYT_323_B11_01_PROVENANCE_EXCEPTION'));
assertCheck('Memory ledger records TX_20260904_JAYT_323_B11_01_CEO_STAGING_APPROVAL', memoryContent.includes('TX_20260904_JAYT_323_B11_01_CEO_STAGING_APPROVAL'));
assertCheck('Memory ledger records TX_20260904_JAYT_323_B11_01_INGRESS_EXECUTION', memoryContent.includes('TX_20260904_JAYT_323_B11_01_INGRESS_EXECUTION'));
assertCheck('Memory ledger records TX_20260904_JAYT_323_B11_01_STAGING_HYDRATION', memoryContent.includes('TX_20260904_JAYT_323_B11_01_STAGING_HYDRATION'));

console.log('\n--- Suite 5: Release Candidate Isolation & Promotion Lock ---');
assertCheck('Release candidate candidate_scope strictly TWENTY_TWO_NON_COMMERCIAL_STAGING_CARDS_ONLY', rcManifest.candidate_scope === 'TWENTY_TWO_NON_COMMERCIAL_STAGING_CARDS_ONLY');
assertCheck('Release candidate is_approved is strictly false', rcManifest.is_approved === false);
assertCheck('Release candidate deployment_permitted is strictly false', rcManifest.deployment_permitted === false);
assertCheck('Attestation confirms release_candidate_inclusion_authorized: false', attestation.governance_and_promotion_determination.promotion_policy.release_candidate_inclusion_authorized === false);
assertCheck('Attestation confirms production_promotion_authorized: false', attestation.governance_and_promotion_determination.promotion_policy.production_promotion_authorized === false);
assertCheck('Attestation confirms re_review_required_before_future_promotion: true', attestation.governance_and_promotion_determination.promotion_policy.re_review_required_before_future_promotion === true);

const allPassed = results.every(r => r.pass);
const totalPassed = results.filter(r => r.pass).length;
const totalCount = results.length;

console.log('\n========================================');
console.log(`QA AUDIT SUMMARY: ${totalPassed}/${totalCount} CHECKS PASSED`);
console.log(`VERDICT: ${allPassed ? 'RECONCILIATION_VERIFIED_PASS' : 'RECONCILIATION_VERIFIED_FAIL'}`);
console.log('========================================\n');

// Write QA receipt
const receiptOutputPath = path.join(root, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'JAYT_323_B11_01_PROVENANCE_RECONCILIATION_QA_RECEIPT.json');
const qaReceipt = {
  receipt_id: 'JAYT_323_B11_01_PROVENANCE_RECONCILIATION_QA_RECEIPT',
  directive: 'JAYT-323',
  work_order: '01_EXECUTIVE_COUNCIL/JAYT_323_B11_01_PROVENANCE_RECONCILIATION_WORK_ORDER.md',
  attestation_file: '06_TRUST_AND_EVIDENCE/JAYT_323_B11_01_PROVENANCE_RECONCILIATION_ATTESTATION.json',
  evaluated_at_utc: new Date().toISOString(),
  checks_total: totalCount,
  checks_passed: totalPassed,
  checks_failed: totalCount - totalPassed,
  verdict: allPassed ? 'RECONCILIATION_VERIFIED_PASS' : 'RECONCILIATION_VERIFIED_FAIL',
  governance_locks: {
    b11_01_in_rc_v3421: false,
    b11_01_staging_evaluation_active: true,
    production_promotion_authorized: false,
    production_deployment_authorized: false,
    production_live_version: 'v3.420.0',
    deals_feed_empty: true
  },
  detailed_results: results
};

fs.writeFileSync(receiptOutputPath, JSON.stringify(qaReceipt, null, 2) + '\n', 'utf8');
console.log('QA Receipt written to:', receiptOutputPath);

process.exit(allPassed ? 0 : 1);
