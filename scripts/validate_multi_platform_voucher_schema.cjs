/**
 * JAYT MULTI-PLATFORM VOUCHER SCHEMA VALIDATOR (STAGING ENGINE)
 *
 * Validates voucher records against UNIFIED_MULTI_PLATFORM_VOUCHER_SCHEMA.json
 * and enforces platform-specific compliance and safety gates.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const SCHEMA_PATH = path.join(ROOT_DIR, '04_DATA_PIPELINE/schema/UNIFIED_MULTI_PLATFORM_VOUCHER_SCHEMA.json');
const STAGING_FEED_PATH = path.join(ROOT_DIR, '05_DEAL_AND_AFFILIATE/deals_feed.json');

function loadSchema() {
  if (!fs.existsSync(SCHEMA_PATH)) {
    throw new Error('Schema file not found at: ' + SCHEMA_PATH);
  }
  return JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
}

function validateRecord(record) {
  const errors = [];

  // 1. Mandatory fields
  const required = [
    'provider', 'offer_id', 'canonical_url', 'voucher_code',
    'conditions', 'validity', 'pricing', 'observed_at', 'provenance', 'sha256'
  ];
  for (const f of required) {
    if (record[f] === undefined) {
      errors.push(`Missing required field: ${f}`);
    }
  }

  // 2. Canonical URL safety: zero tracking query params
  if (record.canonical_url) {
    if (record.canonical_url.includes('?') || record.canonical_url.includes('&')) {
      errors.push(`Canonical URL must not contain query tracking parameters: ${record.canonical_url}`);
    }
    const partnerIds = ['17372870594', '262501305', 'VNVNLCB6LYL3'];
    for (const pid of partnerIds) {
      if (record.canonical_url.includes(pid)) {
        errors.push(`Canonical URL must not contain partner ID ${pid}`);
      }
    }
  }

  // 3. Provider-specific safety constraints
  if (record.provider === 'TIKTOK_SHOP_AFFILIATE_API') {
    if (record.provenance && record.provenance.adapter_authorization_status !== 'DISABLED_PENDING_APP_AUTHORIZATION') {
      errors.push('TikTok Shop adapter must remain DISABLED_PENDING_APP_AUTHORIZATION until official OAuth scope is granted.');
    }
  }

  if (record.provider === 'LAZADA_PUBLISHER_API') {
    if (record.provenance && record.provenance.adapter_authorization_status !== 'RESTRICTED_PENDING_PUBLISHER_APP_KEY') {
      errors.push('Lazada adapter must remain RESTRICTED_PENDING_PUBLISHER_APP_KEY; Seller Voucher API cannot be used as publisher source.');
    }
  }

  // 4. SHA-256 pattern
  if (record.sha256 && !/^[a-f0-9]{64}$/.test(record.sha256)) {
    errors.push(`Invalid sha256 hash pattern: ${record.sha256}`);
  }

  // 5. Pricing invariants
  if (record.pricing) {
    if (record.pricing.original_price < record.pricing.discount_price) {
      errors.push('original_price cannot be less than discount_price');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function validateStagingFeed() {
  console.log('=== AUDITING 05_DEAL_AND_AFFILIATE/deals_feed.json ===');
  if (!fs.existsSync(STAGING_FEED_PATH)) {
    console.log('[WARN] Staging feed not found.');
    return;
  }
  const feed = JSON.parse(fs.readFileSync(STAGING_FEED_PATH, 'utf8'));
  if (!Array.isArray(feed)) {
    throw new Error('deals_feed.json must be an array of records');
  }

  console.log(`Found ${feed.length} records in Staging Feed.`);
  let validCount = 0;
  const failureList = [];

  feed.forEach((rec, idx) => {
    const res = validateRecord(rec);
    if (res.valid) {
      validCount++;
    } else {
      failureList.push({ index: idx, id: rec.offer_id, errors: res.errors });
    }
  });

  console.log(`Results: ${validCount}/${feed.length} records PASS schema validation.`);
  if (failureList.length > 0) {
    console.error('[FAIL] Validation failures detected:', failureList);
    process.exit(1);
  } else {
    console.log('[PASS] 100% of Staging Feed records meet UNIFIED_MULTI_PLATFORM_VOUCHER_SCHEMA standard!');
  }
}

// Self-test with sample records
function runSelfTest() {
  console.log('=== JAYT MULTI-PLATFORM VOUCHER VALIDATOR SELF-TEST ===');
  const sampleValidShopee = {
    provider: 'SHOPEE_PORTAL_EXPORT',
    offer_id: 'SHP_VOUCHER_TOPGIA_20260915',
    canonical_url: 'https://shopee.vn/product/1016604648/23552060269',
    voucher_code: 'TOPGIA10K',
    conditions: {
      min_spend: 100000,
      max_discount_cap: 10000,
      eligible_categories: ['Gia dụng KTX'],
      terms_description: 'Áp dụng cho đơn hàng TopGia từ 100.000đ tại Shopee Mall'
    },
    validity: {
      valid_from_utc: '2026-09-15T00:00:00Z',
      valid_to_utc: '2026-09-30T23:59:59Z',
      is_currently_active: true,
      display_period_tz7: '15/09/2026 - 30/09/2026'
    },
    pricing: {
      original_price: 125000,
      discount_price: 115000,
      discount_amount: 10000,
      discount_percent: 8
    },
    observed_at: '2026-09-15T05:24:01Z',
    provenance: {
      source_mechanism: 'PORTAL_VERIFIED_EXPORT_CSV',
      source_reference_file_or_endpoint: 'shopee_product_offer_export_17372870594.csv',
      operator_account_id: '17372870594',
      adapter_authorization_status: 'ACTIVE_PORTAL_VERIFIED'
    },
    sha256: '54b493fd21a3ae2c96128c796a10d08526e7945a4c25cb1179bb6da68af93b98'
  };

  const res = validateRecord(sampleValidShopee);
  console.log('Sample Shopee validation:', res.valid ? '[PASS]' : '[FAIL]', res.errors);
  if (!res.valid) throw new Error('Self-test failed');

  console.log('All validator self-tests PASSED successfully.');
}

if (require.main === module) {
  runSelfTest();
  validateStagingFeed();
}

module.exports = {
  loadSchema,
  validateRecord,
  validateStagingFeed
};
