/**
 * Hydrate Batch 16 Verified Items into Staging Storefront
 * Path: 04_DATA_PIPELINE/hydrate_batch_16_staging.cjs
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STAGING_DIR = path.join(ROOT, 'staging_preview_sprint_b');
const JS_PATH = path.join(STAGING_DIR, 'jayt_storefront_sprint_b.js');
const REGISTRY_PATH = path.join(STAGING_DIR, 'registry.json');
const CATALOG_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_16_voucher_matrix_vault', 'run_20260907T134242Z_744863e8', 'BATCH_16_CATALOG.json');

function hydrate() {
  console.log('[HYDRATE] Reading Batch 16 catalog...');
  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
  const verified = catalog.candidates.filter(c => c.classification === 'VERIFIED');
  console.log(`[HYDRATE] Found ${verified.length} verified candidates.`);

  const newVaultItems = verified.map(c => {
    if (c.brand_id === 'jollibee') {
      const num = parseInt(c.observed_value.replace(/\./g, '').replace(/\D+/g, ''), 10);
      return {
        id: c.candidate_id,
        title: c.title,
        brand: 'Jollibee',
        tier: 'PRICE_OBSERVATION',
        price_vnd: isNaN(num) ? null : num,
        source_url: c.official_leaf_url,
        locality_basis: 'Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)',
        validity: 'Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)',
        conditions: c.conditions,
        budget_warning: 'Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá',
        has_code: false,
        code: null,
        claim_instruction: 'Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee',
        raw_sha256: c.source_raw_sha256
      };
    } else if (c.offer_type === 'MEMBER_BENEFIT') {
      return {
        id: c.candidate_id,
        title: c.title,
        brand: 'Phúc Long Coffee & Tea',
        tier: 'BRAND_PROGRAM',
        price_vnd: null,
        source_url: c.official_leaf_url,
        locality_basis: 'Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)',
        validity: 'Áp dụng cho hội viên nhận tin nhắn Zalo Phúc Long; hạn dùng 14 ngày từ khi nhận',
        conditions: c.conditions,
        budget_warning: 'Quyền lợi chỉ kích hoạt khi nhận được tin nhắn mã thành viên từ hệ thống Phúc Long',
        has_code: false,
        code: null,
        claim_instruction: 'Xuất trình tin nhắn voucher qua Zalo Phúc Long tại quầy cửa hàng',
        raw_sha256: c.source_raw_sha256
      };
    } else {
      let price = null;
      if (c.candidate_id === 'B16_PHUCLONG_HONEY_P1') price = 109000;
      else if (c.candidate_id === 'B16_PHUCLONG_LOCO_P1') price = 99000;
      else if (c.candidate_id === 'B16_PHUCLONG_LOCO_P2') price = 389000;

      return {
        id: c.candidate_id,
        title: c.title,
        brand: 'Phúc Long Coffee & Tea',
        tier: 'COUNTER_DEAL',
        price_vnd: price,
        source_url: c.official_leaf_url,
        locality_basis: 'Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)',
        validity: 'Chương trình theo mùa, áp dụng đến khi hết số lượng quà tặng/nguyên liệu',
        conditions: c.conditions,
        budget_warning: 'Số lượng quà tặng và combo có hạn tại từng cửa hàng; có thể kết thúc sớm',
        has_code: false,
        code: null,
        claim_instruction: 'Hỏi mua trực tiếp tại quầy các cửa hàng Phúc Long Đà Nẵng',
        raw_sha256: c.source_raw_sha256
      };
    }
  });

  // 1. Update jayt_storefront_sprint_b.js
  console.log('[HYDRATE] Updating jayt_storefront_sprint_b.js...');
  let js = fs.readFileSync(JS_PATH, 'utf8');

  // Parse existing items
  const startMarker = 'const VOUCHER_VAULT_ITEMS = [';
  const startIdx = js.indexOf(startMarker);
  if (startIdx === -1) throw new Error('Could not find const VOUCHER_VAULT_ITEMS = [ in js file');
  
  const endMarker = '];\n\n  // =========================================================================\n  // JAYT-342 SPRINT B: SMART VALUE RADAR';
  let endIdx = js.indexOf(endMarker, startIdx);
  if (endIdx === -1) {
    // fallback search
    endIdx = js.indexOf('];', startIdx);
  }

  const rawSlice = js.slice(startIdx + 'const VOUCHER_VAULT_ITEMS = '.length, endIdx + 1);
  const existingItems = JSON.parse(rawSlice);
  console.log(`[HYDRATE] Existing VOUCHER_VAULT_ITEMS: ${existingItems.length}`);

  // Deduplicate against existing by ID
  const existingIds = new Set(existingItems.map(x => x.id));
  const itemsToAdd = newVaultItems.filter(x => !existingIds.has(x.id));
  console.log(`[HYDRATE] Adding ${itemsToAdd.length} new items to VOUCHER_VAULT_ITEMS`);

  const combinedVaultItems = [...existingItems, ...itemsToAdd];
  const newVaultJson = JSON.stringify(combinedVaultItems, null, 2);

  const newJs = js.slice(0, startIdx) + `const VOUCHER_VAULT_ITEMS = ${newVaultJson};` + js.slice(endIdx + 2);
  fs.writeFileSync(JS_PATH, newJs, 'utf8');
  console.log(`[HYDRATE] Updated jayt_storefront_sprint_b.js with total ${combinedVaultItems.length} items`);

  // 2. Update registry.json
  console.log('[HYDRATE] Updating registry.json...');
  const reg = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));

  const existingCommercialIds = new Set(reg.approved_commercial_entries.map(x => x.card_id || x.sku_id || x.product_name));
  const newCommercialEntries = [];

  for (const item of itemsToAdd) {
    if (!existingCommercialIds.has(item.id)) {
      newCommercialEntries.push({
        card_id: item.id,
        product_name: item.title,
        brand_id: item.brand.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''),
        source_retailer: `${item.brand} — ${item.tier}`,
        source_url: item.source_url,
        price_amount: item.price_vnd,
        price_currency: 'VND',
        geographic_scope: 'VERIFIED',
        locality_basis: item.locality_basis,
        voucher_tier: item.tier,
        commercial_surface: item.tier,
        provenance_raw_sha256: item.raw_sha256
      });
      existingCommercialIds.add(item.id);
    }
  }

  reg.approved_commercial_entries = [...reg.approved_commercial_entries, ...newCommercialEntries];
  reg.commercial_entities_count = reg.approved_commercial_entries.length;
  reg.total_approved_entities_count = (reg.civic_entities_count || 24) + reg.commercial_entities_count;
  reg.target_version = 'v3.426.0';
  reg.governing_directive = 'JAYT-350';
  reg.release_readiness = 'INTEGRATED_V3426_CANDIDATE_READY';

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(reg, null, 2) + '\n', 'utf8');
  console.log(`[HYDRATE] Updated registry.json: total_approved=${reg.total_approved_entities_count}, commercial=${reg.commercial_entities_count}, civic=${reg.civic_entities_count}`);

  return {
    total_vault_items: combinedVaultItems.length,
    newly_added_count: itemsToAdd.length,
    registry_total: reg.total_approved_entities_count,
    registry_commercial: reg.commercial_entities_count,
    registry_civic: reg.civic_entities_count
  };
}

if (require.main === module) {
  try {
    const res = hydrate();
    console.log('[HYDRATE] Result:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('[HYDRATE] Error:', err);
    process.exit(1);
  }
}

module.exports = { hydrate };
