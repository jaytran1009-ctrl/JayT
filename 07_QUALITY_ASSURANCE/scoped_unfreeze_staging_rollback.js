#!/usr/bin/env node
'use strict';

// Staging-only emergency rollback. This script deliberately has no deploy,
// network, child-process, or production-path capability.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const feedPath = path.join(root, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const ledgerPaths = [
  path.join(root, 'JAYT_BATCH_03_READINESS_LEDGER.json'),
  path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_BATCH_03_READINESS_LEDGER.json')
];
const receiptDir = path.join(__dirname, 'runtime_evidence');
const receiptPath = path.join(receiptDir, 'SCOPED_UNFREEZE_STAGING_ROLLBACK_RECEIPT.json');
const execute = process.argv.includes('--execute');

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function parseLedger(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function resetProposal(proposal) {
  if (/^BATCH03_(HK|DS)_/.test(proposal.target_id || '')) {
    proposal.render_eligible_flag = false;
    proposal.public_approved_flag = false;
    proposal.admission_state = null;
  }
}

const before = {
  feed_sha256: sha256(fs.readFileSync(feedPath)),
  ledgers: ledgerPaths.map(filePath => ({ filePath, sha256: sha256(fs.readFileSync(filePath)) }))
};

if (execute) {
  fs.writeFileSync(feedPath, '[]\n', 'utf8');
  for (const filePath of ledgerPaths) {
    const ledger = parseLedger(filePath);
    const proposals = ledger.proposals || ledger.target_proposals || [];
    proposals.forEach(resetProposal);
    if (Object.prototype.hasOwnProperty.call(ledger, 'ledger_status')) {
      ledger.ledger_status = 'STATIC_BACKLOG_PROPOSALS_ONLY__PRE_UNFREEZE';
    }
    fs.writeFileSync(filePath, `${JSON.stringify(ledger, null, 2)}\n`, 'utf8');
  }
}

fs.mkdirSync(receiptDir, { recursive: true });
const receipt = {
  receipt_id: 'SCOPED_UNFREEZE_STAGING_ROLLBACK_RECEIPT',
  executed: execute,
  scope: 'STAGING_DATA_ONLY_NO_DEPLOY_NO_NETWORK_NO_PRODUCTION',
  targets: [feedPath, ...ledgerPaths],
  before,
  after: {
    feed_sha256: sha256(fs.readFileSync(feedPath)),
    ledgers: ledgerPaths.map(filePath => ({ filePath, sha256: sha256(fs.readFileSync(filePath)) }))
  },
  utc: new Date().toISOString()
};
fs.writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));
