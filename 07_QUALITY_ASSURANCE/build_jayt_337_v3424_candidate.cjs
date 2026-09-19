const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const sourceRoot = path.join(root, '08_RELEASE_VAULT', 'candidates', 'v3.423.0');
const targetRoot = path.join(root, '08_RELEASE_VAULT', 'candidates', 'v3.424.0');
const stagingCatalogPath = path.join(root, 'staging_workspace_j328', 'approved_commercial_cards.json');
const projectMemoryPath = path.join(root, 'PROJECT_MEMORY.md');

const promotedIds = [
  'P2O_GALAXY_MEMBER_2026',
  'P2O_GALAXY_SHOPEEPAY_SEP_2026',
  'P2O_PHILONG_LENOVO_STUDENT_2026',
  'P2O_PHILONG_HP_BTS_2026'
];
const excludedIds = [
  'B14_DMX_M170_DEN',
  'P2O_CGV_FANC_2026',
  'P2O_GALAXY_ZALOPAY_REWARDS_2026Q3',
  'P2O_GALAXY_JCB_WEEKEND_2026Q3'
];

function sha256Buffer(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}
function sha256File(file) {
  return sha256Buffer(fs.readFileSync(file));
}
function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}
function artifact(relativePath) {
  const absolute = path.join(root, relativePath);
  return {
    path: relativePath.replace(/\\/g, '/'),
    size_bytes: fs.statSync(absolute).size,
    sha256: sha256File(absolute)
  };
}

const sourceRegistry = JSON.parse(fs.readFileSync(path.join(sourceRoot, 'registry.json'), 'utf8'));
const stagingCatalog = JSON.parse(fs.readFileSync(stagingCatalogPath, 'utf8'));
const additions = promotedIds.map(id => {
  const card = stagingCatalog.find(item => (item.sku_id || item.card_id || item.id) === id);
  if (!card) throw new Error(`Missing promoted card ${id}`);
  if (card.render_permitted !== true || card.affiliate_url) throw new Error(`Unsafe promoted card ${id}`);
  if (card.geographic_scope?.da_nang_applicable !== 'VERIFIED') throw new Error(`Locality not verified for ${id}`);
  if (!/^https:\/\//.test(card.source_url || '')) throw new Error(`Non-HTTPS source for ${id}`);
  if (!/^[a-f0-9]{64}$/.test(card.provenance?.source_raw_sha256 || card.provenance?.raw_sha256 || '')) {
    throw new Error(`Missing source SHA-256 for ${id}`);
  }
  return card;
});

let js = fs.readFileSync(path.join(sourceRoot, 'jayt_storefront_v3423.js'), 'utf8');
const arrayStart = js.indexOf('  const APPROVED_COMMERCIAL_ENTRIES = [');
const arrayEndMarker = '\n];\n\n\n  // LEGACY RADAR DATASET QUARANTINED';
const arrayEnd = js.indexOf(arrayEndMarker, arrayStart);
if (arrayStart < 0 || arrayEnd < 0) throw new Error('Commercial array markers not found');
const sourceArrayLiteral = js.slice(arrayStart + '  const APPROVED_COMMERCIAL_ENTRIES = '.length, arrayEnd + 2);
const existingCards = JSON.parse(sourceArrayLiteral);
if (existingCards.length !== 23) throw new Error(`Expected 23 baseline cards, got ${existingCards.length}`);
const existingIds = new Set(existingCards.map(item => item.sku_id || item.card_id || item.id));
for (const id of promotedIds) if (existingIds.has(id)) throw new Error(`Duplicate promoted card ${id}`);
const commercialCards = [...existingCards, ...additions];
if (commercialCards.length !== 27) throw new Error(`Expected 27 safe commercial cards, got ${commercialCards.length}`);
for (const id of excludedIds) {
  if (commercialCards.some(item => (item.sku_id || item.card_id || item.id) === id)) throw new Error(`Excluded card leaked: ${id}`);
}

js = js.slice(0, arrayStart) +
  '  const APPROVED_COMMERCIAL_ENTRIES = ' + JSON.stringify(commercialCards, null, 2) + ';' +
  js.slice(arrayEnd + 2);
js = js.replaceAll('v3.423.0', 'v3.424.0').replaceAll('v3423', 'v3424');
js = js.replace("card.className = 'commercial-card' + (cardData.type === 'LOCAL_MEMBER_BENEFIT' ? ' member-benefit-card' : ' price-observation-card');",
  "card.className = 'commercial-card' + (cardData.type === 'LOCAL_MEMBER_BENEFIT' ? ' member-benefit-card' : cardData.type === 'LOCAL_OFFER_PROGRAM' ? ' offer-program-card' : ' price-observation-card');");
js = js.replace(
  "    if (cardData.jayt_333) {\n      card.setAttribute('data-commercial-surface', cardData.jayt_333.commercial_surface || 'COUNTER_DEAL');\n      card.setAttribute('data-voucher-tier', cardData.jayt_333.voucher_tier || 'COUNTER_DEAL');\n    }",
  "    const commercialSurface = cardData.commercial_surface || cardData.jayt_333?.commercial_surface || 'COUNTER_DEAL';\n    const voucherTier = cardData.voucher_tier || cardData.jayt_333?.voucher_tier || commercialSurface;\n    card.setAttribute('data-commercial-surface', commercialSurface);\n    card.setAttribute('data-voucher-tier', voucherTier);"
);
js = js.replace(
  "    } else if (cardData.price) {",
  "    } else if (cardData.type === 'LOCAL_OFFER_PROGRAM') {\n      const offerSec = document.createElement('div');\n      offerSec.className = 'offer-program-rules';\n      const validity = document.createElement('p');\n      validity.className = 'offer-validity';\n      validity.textContent = 'Hiệu lực: ' + (cardData.validity || 'Kiểm tra tại nguồn chính thức.');\n      const conditions = document.createElement('p');\n      conditions.className = 'offer-conditions';\n      conditions.textContent = 'Điều kiện: ' + (cardData.conditions || 'Áp dụng theo điều kiện tại nguồn chính thức.');\n      offerSec.appendChild(validity);\n      offerSec.appendChild(conditions);\n      card.appendChild(offerSec);\n    } else if (cardData.price) {"
);
js = js.replace('Kho Ưu Đãi &amp; Voucher Đà Nẵng (23 mục đối soát)', 'Kho Ưu Đãi &amp; Voucher Đà Nẵng (27 mục đối soát)');
js = js.replace('data-count="ALL">23<', 'data-count="ALL">27<');
js = js.replace('data-count="BRAND_PROGRAM">1<', 'data-count="BRAND_PROGRAM">2<');
js = js.replace('data-count="APP_HIDDEN_CODE">0<', 'data-count="APP_HIDDEN_CODE">1<');
js = js.replace('data-count="VALUE_RADAR">13<', 'data-count="VALUE_RADAR">15<');
js = js.replace('Đang hiển thị 23 thẻ thương mại đã xác minh địa bàn Đà Nẵng.', 'Đang hiển thị 27 thẻ thương mại đã xác minh địa bàn Đà Nẵng.');

let html = fs.readFileSync(path.join(sourceRoot, 'index.html'), 'utf8');
html = html.replaceAll('v3.423.0', 'v3.424.0')
  .replaceAll('jayt_storefront_v3423.js', 'jayt_storefront_v3424.js')
  .replace('data-count-vouchers="23"', 'data-count-vouchers="27"');

fs.mkdirSync(path.join(targetRoot, 'assets', 'images'), { recursive: true });
write(path.join(targetRoot, 'jayt_storefront_v3424.js'), js);
write(path.join(targetRoot, 'index.html'), html);
fs.copyFileSync(path.join(sourceRoot, 'styles.css'), path.join(targetRoot, 'styles.css'));
fs.copyFileSync(
  path.join(sourceRoot, 'assets', 'images', 'board_a_afterglow_hero.svg'),
  path.join(targetRoot, 'assets', 'images', 'board_a_afterglow_hero.svg')
);

const normalizedAdditions = additions.map(card => ({
  candidate_id: card.sku_id || card.card_id,
  title: card.title || card.product_name,
  source_url: card.source_url,
  source_raw_sha256: card.provenance.source_raw_sha256 || card.provenance.raw_sha256,
  geographic_scope: 'VERIFIED',
  commercial_surface: card.commercial_surface,
  voucher_tier: card.voucher_tier,
  validity: card.validity,
  conditions: card.conditions,
  public_approval: 'PUBLIC_APPROVED_STAGING_ONLY__JAYT_335',
  render_permitted: true
}));
const registry = {
  registry_id: 'JAYT_RELEASE_CANDIDATE_V3424_REGISTRY',
  governing_directive: 'JAYT-337',
  target_version: 'v3.424.0',
  baseline_production_version: 'v3.423.0',
  requested_total_entities_count: 52,
  total_approved_entities_count: 51,
  civic_entities_count: 24,
  commercial_entities_count: 27,
  release_readiness: 'BLOCKED__REQUESTED_52_NOT_SATISFIED__SAFE_51_PACKAGED',
  governance_exclusions: [
    { candidate_id: 'B14_DMX_M170_DEN', reason: 'FAIL_CLOSED__LOCALITY_UNVERIFIED__OFFICIAL_ENDPOINTS_HTTP_500', action: 'EXCLUDED' },
    ...excludedIds.slice(1).map(candidate_id => ({ candidate_id, reason: 'HELD__INSUFFICIENT_OR_FAILED_EVIDENCE', action: 'EXCLUDED' }))
  ],
  approved_civic_entries: sourceRegistry.approved_civic_entries,
  approved_commercial_entries: [...sourceRegistry.approved_commercial_entries, ...normalizedAdditions]
};
write(path.join(targetRoot, 'registry.json'), JSON.stringify(registry, null, 2) + '\n');

const rollbackSourceFiles = ['index.html', 'styles.css', 'jayt_storefront_v3423.js', 'registry.json'];
const rollbackManifest = {
  manifest_id: 'JAYT_337_V3424_DETERMINISTIC_ROLLBACK_MANIFEST',
  target_version: 'v3.423.0',
  target_cards_count: 47,
  strategy: 'ATOMIC_VERCEL_ALIAS_REPOINT_TO_LAST_HEALTHY_DEPLOYMENT',
  deployment_id: 'dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA',
  production_url: 'https://jayt-production-v3420.vercel.app',
  source_bundle: '08_RELEASE_VAULT/candidates/v3.423.0/',
  trigger_policy: 'ANY_POST_DEPLOY_GATE_FAILURE',
  artifacts: Object.fromEntries(rollbackSourceFiles.map(name => [name, {
    size_bytes: fs.statSync(path.join(sourceRoot, name)).size,
    sha256: sha256File(path.join(sourceRoot, name))
  }]))
};
write(path.join(targetRoot, 'rollback_manifest.json'), JSON.stringify(rollbackManifest, null, 2) + '\n');

const manifest = {
  manifest_id: 'JAYT_337_V3424_PREFLIGHT_PACKAGE',
  governing_directive: 'JAYT-337',
  target_version: 'v3.424.0',
  generated_at_utc: new Date().toISOString(),
  requested_cards_count: 52,
  packaged_cards_count: 51,
  civic_cards_count: 24,
  commercial_cards_count: 27,
  status: 'PREFLIGHT_BLOCKED__TARGET_52_UNSATISFIED__SAFE_51_PACKAGED',
  deployment_authorized: false,
  blocking_reason: 'B14_DMX_M170_DEN remains locality-unverified after official source HTTP 500; JAYT-245 forbids synthetic promotion.',
  promoted_batch_15_ids: promotedIds,
  governance_exclusions: excludedIds,
  source_receipts: {
    batch_15_technical_acceptance: {
      path: '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_336_BATCH_15_P2_FINAL_TECHNICAL_ACCEPTANCE_RECEIPT.json',
      sha256: sha256File(path.join(root, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'JAYT_336_BATCH_15_P2_FINAL_TECHNICAL_ACCEPTANCE_RECEIPT.json'))
    },
    project_memory_pre_jayt_337: { sha256: sha256File(projectMemoryPath) }
  },
  artifacts: {
    js: artifact('08_RELEASE_VAULT/candidates/v3.424.0/jayt_storefront_v3424.js'),
    html: artifact('08_RELEASE_VAULT/candidates/v3.424.0/index.html'),
    css: artifact('08_RELEASE_VAULT/candidates/v3.424.0/styles.css'),
    registry: artifact('08_RELEASE_VAULT/candidates/v3.424.0/registry.json'),
    hero_svg: artifact('08_RELEASE_VAULT/candidates/v3.424.0/assets/images/board_a_afterglow_hero.svg'),
    rollback_manifest: artifact('08_RELEASE_VAULT/candidates/v3.424.0/rollback_manifest.json')
  }
};
write(path.join(targetRoot, 'candidate_manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

console.log(JSON.stringify({
  status: manifest.status,
  requested: manifest.requested_cards_count,
  packaged: manifest.packaged_cards_count,
  civic: manifest.civic_cards_count,
  commercial: manifest.commercial_cards_count,
  js_sha256: manifest.artifacts.js.sha256,
  registry_sha256: manifest.artifacts.registry.sha256
}, null, 2));
