const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const LOCATOR_ROOT = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_13_locator_vault');
const INPUT = path.join(ROOT, 'staging_workspace_j328', 'approved_commercial_cards.json');
const OUTPUT = path.join(ROOT, 'staging_workspace_j328', 'JAYT_333_COMMERCIAL_PILOT_CATALOG.json');
const RECEIPT = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'JAYT_333_INHERITED_LOCALITY_RECEIPT.json');

const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const idOf = card => card.sku_id || card.card_id || card.id;

function latestUsableLocatorRun() {
  const runs = fs.readdirSync(LOCATOR_ROOT, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && entry.name.startsWith('run_'))
    .map(entry => path.join(LOCATOR_ROOT, entry.name))
    .sort().reverse();
  for (const run of runs) {
    const locationsPath = path.join(run, 'LOCATIONS_DA_NANG_VERIFIED.json');
    const summaryPath = path.join(run, 'HARVEST_SUMMARY_REPORT.json');
    if (fs.existsSync(locationsPath) && fs.existsSync(summaryPath)) {
      const locations = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));
      const required = ['jollibee', 'phi_long', 'phuclong'];
      if (required.every(brand => locations.some(location => location.brand_id === brand && location.is_facility_verified === true))) {
        return { run, locationsPath, summaryPath, locations };
      }
    }
  }
  throw new Error('No locator run contains verified Jollibee, Phi Long and Phuc Long facilities.');
}

const sourceBuffer = fs.readFileSync(INPUT);
const sourceCards = JSON.parse(sourceBuffer.toString('utf8'));
const locator = latestUsableLocatorRun();
const locationBuffer = fs.readFileSync(locator.locationsPath);
const locationsSha = sha256(locationBuffer);
const brandMap = new Map();
for (const location of locator.locations) {
  if (!location.is_facility_verified) continue;
  if (!brandMap.has(location.brand_id)) brandMap.set(location.brand_id, []);
  brandMap.get(location.brand_id).push(location);
}

const inheritedBrands = new Set(['jollibee', 'phi_long', 'phuclong']);
const pilotCards = sourceCards.map(original => {
  const card = structuredClone(original);
  const cardId = idOf(card);
  // A few legacy approved rows predate brand_id. Derive only from stable,
  // already-approved ID namespaces; never from free-form marketing text.
  const normalizedBrandId = card.brand_id
    || (cardId === 'B14_PLONG_MEMBER_BENEFITS' ? 'phuclong' : null)
    || (cardId.startsWith('B14_JB_') ? 'jollibee' : null)
    || (cardId.startsWith('B14_PL_') ? 'phi_long' : null)
    || (cardId.startsWith('B14_DMX_') ? 'dien_may_xanh' : null);
  card.brand_id = normalizedBrandId || card.brand_id;
  const locations = brandMap.get(normalizedBrandId) || [];
  const sourceIsPriceObservation = card.type !== 'LOCAL_MEMBER_BENEFIT';

  card.jayt_333 = {
    commercial_surface: normalizedBrandId === 'phi_long' || normalizedBrandId === 'dien_may_xanh'
      ? 'VALUE_RADAR'
      : card.type === 'LOCAL_MEMBER_BENEFIT'
        ? 'BRAND_PROGRAM'
        : 'COUNTER_DEAL',
    voucher_tier: card.type === 'LOCAL_MEMBER_BENEFIT' ? 'BRAND_PROGRAM' : 'COUNTER_DEAL',
    voucher_code: null,
    affiliate_ready_schema: true,
    affiliate_activation_status: 'LOCKED__NO_TRACKING_LINK_ATTACHED',
    locality_rule: inheritedBrands.has(normalizedBrandId)
      ? 'BRAND_PRESENCE_ONLY__DOES_NOT_PROVE_ITEM_STOCK_OR_LOCAL_PRICE'
      : 'UNCHANGED_FROM_PRIOR_ITEM_AUDIT'
  };

  if (inheritedBrands.has(normalizedBrandId) && locations.length > 0) {
    const sample = locations[0];
    card.geographic_scope = {
      ...(card.geographic_scope || {}),
      da_nang_applicable: normalizedBrandId === 'phuclong' ? 'ELIGIBLE_WITH_EXCEPTION' : 'VERIFIED',
      verification_basis: 'INHERITED_BRAND_PRESENCE',
      verified_facility_count: locations.length,
      facility_evidence: {
        location_id: sample.location_id,
        name: sample.name,
        verbatim_address: sample.verbatim_address,
        raw_sha256: sample.provenance && sample.provenance.raw_sha256,
        locator_locations_sha256: locationsSha
      },
      scope_note: 'Thương hiệu có cơ sở được đối soát tại Đà Nẵng. Không đồng nghĩa mặt hàng còn tồn, giá quan sát áp dụng tại mọi cơ sở hoặc không có phụ phí.'
    };
    if (sourceIsPriceObservation) {
      card.local_stock_verified = false;
      card.local_price_verified = false;
      card.observation_disclaimer = 'Giá quan sát từ nguồn chính thức tại thời điểm thu thập. Đã xác minh thương hiệu có cơ sở tại Đà Nẵng; chưa xác minh tồn kho, giá tại từng cơ sở hoặc phụ phí. Vui lòng kiểm tra lại trên nguồn trước khi mua.';
    }
  }

  card.affiliate_url = null;
  card.tracking_parameters = [];
  card.render_permitted = true;
  card.publication_scope = 'STAGING_ONLY__PENDING_M4_COMMERCIAL_DECREE';
  card.jayt_333.stable_id = cardId;
  return card;
});

const eligibleStatuses = new Set(['VERIFIED', 'ELIGIBLE_WITH_EXCEPTION']);
const qualified = pilotCards.filter(card => eligibleStatuses.has(card.geographic_scope && card.geographic_scope.da_nang_applicable));
const inherited = pilotCards.filter(card => card.geographic_scope && card.geographic_scope.verification_basis === 'INHERITED_BRAND_PRESENCE');
const radar = pilotCards.filter(card => card.jayt_333.commercial_surface === 'VALUE_RADAR');
const counterDeals = pilotCards.filter(card => card.jayt_333.commercial_surface === 'COUNTER_DEAL');
const brandPrograms = pilotCards.filter(card => card.jayt_333.commercial_surface === 'BRAND_PROGRAM');

fs.writeFileSync(OUTPUT, JSON.stringify(pilotCards, null, 2) + '\n');
const outputBuffer = fs.readFileSync(OUTPUT);
const receipt = {
  receipt_name: 'JAYT_333_INHERITED_LOCALITY_RECEIPT',
  generated_at_utc: new Date().toISOString(),
  scope: 'COMMERCIAL_STAGING_ONLY',
  source_catalog: path.relative(ROOT, INPUT).replaceAll('\\', '/'),
  source_catalog_sha256: sha256(sourceBuffer),
  output_catalog: path.relative(ROOT, OUTPUT).replaceAll('\\', '/'),
  output_catalog_sha256: sha256(outputBuffer),
  locator_run: path.relative(ROOT, locator.run).replaceAll('\\', '/'),
  locator_locations_sha256: locationsSha,
  metrics: {
    total_renderable_cards: pilotCards.length,
    locality_qualified_cards: qualified.length,
    inherited_locality_cards: inherited.length,
    counter_deal_cards: counterDeals.length,
    brand_program_cards: brandPrograms.length,
    value_radar_cards: radar.length,
    real_voucher_codes_published: 0,
    affiliate_links_published: 0
  },
  assertions: {
    minimum_20_locality_qualified: qualified.length >= 20,
    all_inherited_have_facility_evidence: inherited.every(card => card.geographic_scope.facility_evidence && card.geographic_scope.facility_evidence.raw_sha256),
    no_local_stock_inferred: inherited.every(card => card.local_stock_verified !== true),
    no_affiliate_or_tracking: pilotCards.every(card => card.affiliate_url == null && card.tracking_parameters.length === 0),
    no_synthetic_voucher_codes: pilotCards.every(card => card.jayt_333.voucher_code == null),
    original_catalog_untouched: sha256(fs.readFileSync(INPUT)) === sha256(sourceBuffer)
  },
  production: {
    deployment_authorized: false,
    baseline_frozen: 'v3.422.0',
    rollback_standby: 'v3.421.0'
  }
};
receipt.all_passed = Object.values(receipt.assertions).every(Boolean);
fs.writeFileSync(RECEIPT, JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify(receipt, null, 2));
if (!receipt.all_passed) process.exitCode = 1;
