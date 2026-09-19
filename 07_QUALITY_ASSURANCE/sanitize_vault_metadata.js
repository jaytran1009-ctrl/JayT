#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const vault = path.join(__dirname, 'runtime_evidence', 'raw_captures_vault');
const manifestPath = path.join(vault, 'VAULT_INGRESS_MANIFEST.json');
const receiptPath = path.join(vault, 'VAULT_METADATA_SANITIZATION_RECEIPT.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const prohibited = /^(set-cookie|cookie|authorization|proxy-authorization|x-auth|.*token.*)$/i;
const quarantined = new Set(['SEED_01_CGV', 'SEED_02_METIZ']);
const redacted = [];

for (const snapshot of manifest.snapshots) {
  const headers = snapshot.response_headers || {};
  for (const key of Object.keys(headers)) {
    if (prohibited.test(key)) {
      delete headers[key];
      redacted.push({ id: snapshot.id, header: key.toLowerCase() });
    }
  }
  snapshot.response_headers = headers;
  if (quarantined.has(snapshot.id)) {
    snapshot.ingress_status = 'QUARANTINE_URL_MAPPING_PENDING_CEO_APPROVAL';
  }
}

manifest.audit_state = 'SANITIZED_AWAITING_CEO_PROVENANCE_AUDIT';
manifest.metadata_sanitization = {
  completed_at_utc: new Date().toISOString(),
  prohibited_header_values_retained: false,
  url_mapping_quarantined_ids: [...quarantined]
};
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

const bodyHashes = manifest.snapshots.map(snapshot => {
  const filePath = path.join(vault, snapshot.file_name);
  return { id: snapshot.id, file_name: snapshot.file_name, sha256: crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex') };
});
const receipt = { receipt_id: 'VAULT_METADATA_SANITIZATION_RECEIPT', completed_at_utc: new Date().toISOString(), body_files_modified: false, redacted_header_count: redacted.length, redacted_header_names: [...new Set(redacted.map(entry => entry.header))], quarantined_ids: [...quarantined], body_sha256: bodyHashes };
fs.writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ ...receipt, body_sha256: `${bodyHashes.length} verified body files` }, null, 2));
