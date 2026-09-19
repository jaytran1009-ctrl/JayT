const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');
const runArg = process.argv[2];
if (!runArg) throw new Error('Usage: node validate_jayt_346_batch_16_array.cjs <run-directory>');
const runDir = path.resolve(ROOT, runArg);
const catalogPath = path.join(runDir, 'BATCH_16_CATALOG.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const allowed = new Set(['VERIFIED', 'HELD__INSUFFICIENT_EVIDENCE', 'FAILED_FETCH']);
const verified = catalog.candidates.filter(x => x.classification === 'VERIFIED');
const checks = {
  catalog_is_array: Array.isArray(catalog.candidates),
  unique_candidate_ids: new Set(catalog.candidates.map(x => x.candidate_id)).size === catalog.candidates.length,
  classifications_allowed: catalog.candidates.every(x => allowed.has(x.classification)),
  verified_fields_complete: verified.every(x => x.candidate_id && x.brand_id && /^https:\/\//.test(x.official_leaf_url) && x.offer_name && x.observed_value && x.conditions && x.observed_at_utc && x.validity && /^[a-f0-9]{64}$/.test(x.raw_sha256) && x.provenance_reference && x.locality_status === 'INHERITED_LOCALITY_VERIFIED'),
  raw_hashes_match: verified.every(x => { const f = path.join(path.dirname(runDir), x.provenance_reference); return fs.existsSync(f) && sha(fs.readFileSync(f)) === x.raw_sha256; }),
  zero_affiliate_tracking_synthetic: catalog.candidates.every(x => x.affiliate === false && x.tracking === false && x.synthetic_voucher_code === false && !/[?&](utm_|aff|affiliate|clickid|subid|tracking)=/i.test(x.official_leaf_url)),
  threshold_20_verified: verified.length >= 20,
  production_not_mutated: catalog.production_mutated === false
};
const verdict = Object.values(checks).every(Boolean) ? 'PASS_100_PERCENT' : 'FAIL_CLOSED';
const now = new Date();
const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
const receiptPath = path.join(runDir, `BATCH_16_ARRAY_VALIDATION_RECEIPT_${stamp}.json`);
if (fs.existsSync(receiptPath)) throw new Error('Refusing to overwrite immutable receipt');
const receipt = { receipt_id: `JAYT_346_BATCH_16_ARRAY_VALIDATION_${stamp}`, run_id: catalog.run_id, validated_at_utc: now.toISOString(), catalog_sha256: sha(fs.readFileSync(catalogPath)), counts: catalog.counts, checks, verdict, staging_hydration_permitted: verdict === 'PASS_100_PERCENT', production_deploy_permitted: false };
fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify({ receipt_path: path.relative(ROOT, receiptPath), receipt_sha256: sha(fs.readFileSync(receiptPath)), ...receipt }, null, 2));
if (verdict !== 'PASS_100_PERCENT') process.exitCode = 1;
