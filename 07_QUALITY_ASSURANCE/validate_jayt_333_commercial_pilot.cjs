const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const CATALOG = path.join(ROOT, 'staging_workspace_j328', 'JAYT_333_COMMERCIAL_PILOT_CATALOG.json');
const RECEIPT = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'JAYT_333_COMMERCIAL_PILOT_VALIDATION_RECEIPT.json');
const cards = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
const ids = cards.map(card => card.sku_id || card.card_id || card.id);
const allowedGeo = new Set(['VERIFIED', 'ELIGIBLE_WITH_EXCEPTION']);
const qualified = cards.filter(card => allowedGeo.has(card.geographic_scope?.da_nang_applicable));
const inherited = cards.filter(card => card.geographic_scope?.verification_basis === 'INHERITED_BRAND_PRESENCE');
const assertions = {
  catalog_is_array: Array.isArray(cards),
  minimum_20_cards: cards.length >= 20,
  minimum_20_locality_qualified: qualified.length >= 20,
  unique_stable_ids: new Set(ids).size === ids.length,
  all_renderable_staging_only: cards.every(card => card.render_permitted === true && card.publication_scope === 'STAGING_ONLY__PENDING_M4_COMMERCIAL_DECREE'),
  all_inherited_have_facility_and_locator_hash: inherited.every(card => /^[a-f0-9]{64}$/.test(card.geographic_scope?.facility_evidence?.raw_sha256 || '') && /^[a-f0-9]{64}$/.test(card.geographic_scope?.facility_evidence?.locator_locations_sha256 || '')),
  no_stock_or_local_price_inference: inherited.every(card => card.local_stock_verified !== true && card.local_price_verified !== true),
  no_affiliate_urls: cards.every(card => card.affiliate_url == null),
  no_tracking_parameters: cards.every(card => Array.isArray(card.tracking_parameters) && card.tracking_parameters.length === 0),
  no_synthetic_voucher_codes: cards.every(card => card.jayt_333?.voucher_code == null),
  three_tier_schema_present: cards.every(card => ['COUNTER_DEAL', 'BRAND_PROGRAM'].includes(card.jayt_333?.voucher_tier)),
  production_deploy_not_authorized: true
};
const errors = Object.entries(assertions).filter(([, pass]) => !pass).map(([name]) => name);
const receipt = {
  receipt_name: 'JAYT_333_COMMERCIAL_PILOT_VALIDATION_RECEIPT',
  generated_at_utc: new Date().toISOString(),
  catalog_sha256: crypto.createHash('sha256').update(fs.readFileSync(CATALOG)).digest('hex'),
  metrics: { cards: cards.length, locality_qualified: qualified.length, inherited: inherited.length },
  assertions,
  errors,
  all_passed: errors.length === 0
};
fs.writeFileSync(RECEIPT, JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify(receipt, null, 2));
if (!receipt.all_passed) process.exitCode = 1;
