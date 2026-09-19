#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const ledgerPath = path.join(root, 'JAYT_BATCH_03_READINESS_LEDGER.json');
const scopePath = path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_BATCH_03_INTAKE_SCOPE.json');
const ledgerBytes = fs.readFileSync(ledgerPath);
const ledger = JSON.parse(ledgerBytes);
const started = new Date();
const scope = {
  scope_id: 'JAYT-272-BATCH03-SCOPED-INTAKE',
  execution_state: 'INTAKE_AUTHORIZED__NOT_CANDIDATE__NOT_PUBLIC',
  governing_directive: 'JAYT-272',
  created_at_utc: started.toISOString(),
  closes_at_utc: new Date(started.getTime() + 8 * 60 * 60 * 1000).toISOString(),
  source_ledger_path: 'JAYT_BATCH_03_READINESS_LEDGER.json',
  source_ledger_sha256: crypto.createHash('sha256').update(ledgerBytes).digest('hex'),
  immutable_rules: { mutate_source_ledger: false, public_approved: 0, render: false, feed_mutation: false, affiliate: false, production_deploy: false, on_failure: 'INTAKE_FAILED__QUARANTINE' },
  vault_path: '06_TRUST_AND_EVIDENCE/batch_03_intake_vault/',
  targets: ledger.proposals.map(proposal => ({ target_id: proposal.target_id, cluster: proposal.cluster, authorized_source_url: proposal.source_url_placeholder, evidence_field_contract: proposal.evidence_field_contract, intake_status: 'AUTHORIZED_FOR_READ_ONLY_CAPTURE_ONLY', candidate_status: 'NOT_A_CANDIDATE', public_approved: false }))
};
fs.writeFileSync(scopePath, `${JSON.stringify(scope, null, 2)}\n`);
console.log(JSON.stringify({ scope_id: scope.scope_id, target_count: scope.targets.length, closes_at_utc: scope.closes_at_utc, source_ledger_sha256: scope.source_ledger_sha256 }, null, 2));
