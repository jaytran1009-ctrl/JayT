'use strict';

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function readEnv(file) {
  const values = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) values[match[1]] = match[2];
  }
  return values;
}

const env = readEnv(path.resolve(__dirname, '..', '.env'));
const partnerId = env.SHOPEE_AFFILIATE_PARTNER_ID || '';
const secret = env.SHOPEE_API_SECRET || '';
const timestamp = '1726300800';
const suppliedSignature = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';
const query = 'query InspectProductOffer($itemId: String!, $shopId: String!) { productOfferV2(itemId: $itemId, shopId: $shopId) { itemId productName originalPrice priceAfterDiscount priceMin priceMax historicalFloorPrice30d shopVouchers { voucherCode discountValue minSpend expiryDate } platformVouchers { voucherCode discountPercentage capAmount voucherType } } }';
const variables = { itemId: '17372870594', shopId: '9876543210' };
const payload = JSON.stringify({ query, variables });
const computed = secret
  ? crypto.createHmac('sha256', secret).update(partnerId + timestamp + payload).digest('hex')
  : null;

const report = {
  verifier: 'W8_GRAPHQL_SUPPLIED_VECTOR_LOCAL_VERIFIER',
  secret_present: Boolean(secret),
  partner_id_present: Boolean(partnerId),
  supplied_signature_matches_canonical_payload: Boolean(computed && crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(suppliedSignature))),
  vector_item_id_equals_partner_id: variables.itemId === partnerId,
  request_payload_bytes_specified_by_source: false,
  provider_provenance_present: false,
  provider_test_vector_accepted: false,
  reason: 'The supplied text does not identify exact signed payload bytes or official Partner Center provenance; its signature does not validate against the canonicalized payload used by this verifier.'
};

process.stdout.write(JSON.stringify(report, null, 2) + '\n');
process.exit(report.supplied_signature_matches_canonical_payload && report.provider_provenance_present ? 0 : 2);
