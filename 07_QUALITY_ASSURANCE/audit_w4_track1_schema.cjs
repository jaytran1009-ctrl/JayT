'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const sourcePath = path.join(ROOT, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const contractPath = path.join(ROOT, '05_DEAL_AND_AFFILIATE', 'track1_compliance', 'W4_TRACK1_SUB_ID_SCHEMA_CONTRACT.json');
const receiptPath = path.join(ROOT, '05_DEAL_AND_AFFILIATE', 'track1_compliance', 'W4_TRACK1_SCHEMA_AUDIT_RECEIPT.json');
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');

const source = fs.readFileSync(sourcePath, 'utf8');
const contractBytes = fs.readFileSync(contractPath);
const contract = JSON.parse(contractBytes.toString('utf8'));
const checks = {
  router_declared: source.includes('function dispatchSmartAffiliate(providerKey)'),
  router_pending_partner_authentication: source.includes("status: provider ? 'PENDING_PARTNER_AUTHENTICATION'"),
  affiliate_disabled: source.includes('affiliateEnabled: false'),
  dispatch_not_performed: source.includes('dispatchPerformed: false'),
  destination_null: source.includes('destinationUrl: null'),
  tracking_null: source.includes('trackingParameters: null'),
  contract_runtime_disabled: contract.runtime_state.affiliate_enabled === false && contract.runtime_state.tracking_enabled === false && contract.runtime_state.redirect_enabled === false && contract.runtime_state.sub_id_insertion_enabled === false,
  schema_values_bounded: JSON.stringify(contract.parameter_schema.sub1.allowed_values) === JSON.stringify(['dut', 'due', 'dtu', 'ued']) && JSON.stringify(contract.parameter_schema.sub2.allowed_values) === JSON.stringify(['hoa_khanh', 'ngu_hanh_son', 'hai_chau']),
  disclosure_has_no_lowest_price_claim: !contract.disclosure.candidate_text.toLowerCase().includes('thấp nhất')
};
const pass = Object.values(checks).every(Boolean);
const receipt = {
  receipt_id: 'W4_TRACK1_SCHEMA_AUDIT_RECEIPT',
  audited_at_utc: new Date().toISOString(),
  source: { file: '03_SOURCE_OF_TRUTH/jayt_apex_interface.js', sha256: sha256(Buffer.from(source, 'utf8')) },
  contract: { file: '05_DEAL_AND_AFFILIATE/track1_compliance/W4_TRACK1_SUB_ID_SCHEMA_CONTRACT.json', sha256: sha256(contractBytes) },
  checks,
  audit_status: pass ? 'PASS__NON_DISPATCHING_SCHEMA_CONTRACT__AFFILIATE_REMAINS_DISABLED' : 'FAIL__TRACK1_BOUNDARY_DRIFT',
  production_affiliate_enabled: false,
  public_disclosure_displayed: false
};
fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify(receipt, null, 2));
process.exitCode = pass ? 0 : 1;
