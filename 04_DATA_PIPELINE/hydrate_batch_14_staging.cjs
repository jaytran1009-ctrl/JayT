/**
 * BATCH 14 COMMERCIAL STAGING HYDRATION RUNNER (JAYT-330-R3)
 * 
 * Execution Directive: JAYT-330-R3 / CEO PUBLIC_APPROVED_STAGING_ONLY
 * Scope: Staging-only Commercial Catalog Hydration (Port 4176)
 * Immutable Boundary: Production remains strictly frozen at v3.422.0 / 24 cards.
 * 
 * Invariants Enforced:
 * 1. Fail-closed on package hash: Recomputes SHA-256 of BATCH_14_CATALOG_ACCEPTANCE_PACKAGE.json
 *    Must match authorized hash: 4daadbcd4115d0d878dc66410173629cee8590dd8e7069416579c6767be0b9b0
 * 2. Fail-closed on approval status: BATCH_14_CATALOG_PUBLIC_APPROVAL_STAGING_ONLY.json must be signed
 * 3. 4 canonical in-place updates:
 *    - B14_JB_70144 updates PROD_JOLLIBEE_COMBO_02
 *    - B14_PL_DTX64GB updates B12_15
 *    - B14_DMX_M170_DEN updates B12_13
 *    - B14_PLONG_MEMBER_BENEFITS updates B12_05
 * 4. 18 new cards inserted cleanly
 * 5. Exactly 22 unique cards in final catalog
 * 6. User-facing item_url rendered for all Phi Long products (retains master catalog in provenance)
 * 7. Zero affiliate URLs or tracking tokens
 * 8. Galaxy rendered as FROM_PRICE; Phuc Long has price: null; Metiz geographic scope UNVERIFIED
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const AUTHORIZED_PACKAGE_SHA256 = '4daadbcd4115d0d878dc66410173629cee8590dd8e7069416579c6767be0b9b0';
const PACKAGE_PATH = path.resolve('06_TRUST_AND_EVIDENCE/batch_14_catalog_vault/BATCH_14_CATALOG_ACCEPTANCE_PACKAGE.json');
const APPROVAL_PATH = path.resolve('06_TRUST_AND_EVIDENCE/batch_14_catalog_vault/BATCH_14_CATALOG_PUBLIC_APPROVAL_STAGING_ONLY.json');
const STAGING_CARDS_PATH = path.resolve('staging_workspace_j328/approved_commercial_cards.json');

function computeSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function runHydration(options = {}) {
  const dryRun = options.dryRun === true;
  console.log(`=== BẮT ĐẦU CHẠY HYDRATE BATCH 14 VÀO STAGING (JAYT-330-R2) [dryRun=${dryRun}] ===\n`);

  // 1. Recompute package SHA-256 and fail-closed
  assert.ok(fs.existsSync(PACKAGE_PATH), `Package must exist at ${PACKAGE_PATH}`);
  const actualPackageSha256 = computeSha256(PACKAGE_PATH);
  console.log(`1. Băm gói Batch 14 trên đĩa: ${actualPackageSha256}`);
  console.log(`   Băm được phê chuẩn:       ${AUTHORIZED_PACKAGE_SHA256}`);

  if (actualPackageSha256 !== AUTHORIZED_PACKAGE_SHA256) {
    throw new Error(`FAIL-CLOSED: Package hash mismatch! Actual=${actualPackageSha256} !== Expected=${AUTHORIZED_PACKAGE_SHA256}`);
  }
  console.log('   [PASS] Khớp băm gói được phê chuẩn 100%.\n');

  // 2. Verify Approval Decision
  assert.ok(fs.existsSync(APPROVAL_PATH), `Approval decision must exist at ${APPROVAL_PATH}`);
  const approval = JSON.parse(fs.readFileSync(APPROVAL_PATH, 'utf8'));
  assert.strictEqual(approval.approval_status, 'PUBLIC_APPROVED_STAGING_ONLY', 'Approval status must be PUBLIC_APPROVED_STAGING_ONLY');
  assert.strictEqual(approval.approval_granted, true, 'Approval granted must be true');
  assert.strictEqual(approval.target_package_sha256, AUTHORIZED_PACKAGE_SHA256, 'Target package hash in approval must match');
  console.log(`2. Thẩm tra quyết định CEO: ${approval.document_name} (${approval.approval_status}) [PASS]\n`);

  // 3. Read Baseline Staging Cards
  assert.ok(fs.existsSync(STAGING_CARDS_PATH), `Staging cards must exist at ${STAGING_CARDS_PATH}`);
  const preHydrationHash = computeSha256(STAGING_CARDS_PATH);
  const currentCards = JSON.parse(fs.readFileSync(STAGING_CARDS_PATH, 'utf8'));
  console.log(`3. Baseline/Current Staging Cards: ${currentCards.length} thẻ (Băm trước hydrate: ${preHydrationHash})`);

  let baselineCards = [];
  if (currentCards.length === 4) {
    baselineCards = currentCards;
  } else if (currentCards.length === 22) {
    console.log('   [RE-HYDRATION] Phát hiện 22 thẻ Staging. Trích xuất 4 thẻ baseline qua legacy_card_id...');
    baselineCards = currentCards.filter(c => c.legacy_card_id).map(c => ({
      ...c,
      card_id: c.legacy_card_id,
      sku_id: c.legacy_sku_id || c.legacy_card_id
    }));
    assert.strictEqual(baselineCards.length, 4, 'Must extract exactly 4 baseline cards with legacy_card_id');
  } else {
    throw new Error(`Unexpected card count in Staging: ${currentCards.length}`);
  }

  const baselineIds = baselineCards.map(c => c.sku_id || c.card_id);
  console.log(`   Baseline IDs: [${baselineIds.join(', ')}]`);
  assert.strictEqual(baselineCards.length, 4, 'Baseline Staging must have exactly 4 cards under JAYT-330');

  // 4. Read Batch 14 Acceptance Package
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_PATH, 'utf8'));
  assert.strictEqual(pkg.accepted_candidates.length, 22, 'Package must contain exactly 22 candidates');

  const newCandidates = pkg.accepted_candidates.filter(c => c.dedup_status === 'NEW');
  const updateCandidates = pkg.accepted_candidates.filter(c => c.dedup_status === 'UPDATE_EXISTING');
  assert.strictEqual(newCandidates.length, 18, 'Must have exactly 18 NEW candidates');
  assert.strictEqual(updateCandidates.length, 4, 'Must have exactly 4 UPDATE_EXISTING candidates');
  console.log(`4. Phân bổ ứng viên Batch 14: 18 NEW + 4 UPDATE_EXISTING = 22 tổng cộng [PASS]\n`);

  // 5. In-Place Update & Hydration Map
  // Order cards matching approved_candidate_ids in approval document
  const approvedIdsOrder = approval.approved_candidate_ids;
  assert.ok(Array.isArray(approvedIdsOrder) && approvedIdsOrder.length === 22, 'Approval must specify 22 candidate IDs');

  const baselineMap = new Map();
  for (const card of baselineCards) {
    const id = card.sku_id || card.card_id;
    baselineMap.set(id, card);
  }

  const hydratedCardsMap = new Map();

  // Enforce Canonical Update Mappings per JAYT-330-R3
  const EXPECTED_CANONICAL_MAPPINGS = {
    'B14_JB_70144': 'PROD_JOLLIBEE_COMBO_02',
    'B14_PL_DTX64GB': 'B12_15',
    'B14_DMX_M170_DEN': 'B12_13',
    'B14_PLONG_MEMBER_BENEFITS': 'B12_05'
  };

  // Process UPDATE_EXISTING
  for (const upd of updateCandidates) {
    const targetId = upd.existing_card_id;
    const expectedLegacyId = EXPECTED_CANONICAL_MAPPINGS[upd.row_id];
    assert.strictEqual(
      targetId,
      expectedLegacyId,
      `Canonical mapping violation for ${upd.row_id}: expected ${expectedLegacyId}, got ${targetId}`
    );
    assert.ok(baselineMap.has(targetId), `Target card ${targetId} must exist in baseline`);
    const existing = baselineMap.get(targetId);

    const userFacingSourceUrl = upd.provenance?.item_url || upd.provenance?.source_url || existing.source_url;

    let hydratedCard;
    if (upd.brand_id === 'phuclong' || existing.type === 'LOCAL_MEMBER_BENEFIT') {
      // Phuc Long member benefit policy
      hydratedCard = {
        ...existing,
        card_id: upd.row_id,
        sku_id: upd.row_id,
        legacy_card_id: targetId,
        legacy_sku_id: targetId,
        type: 'LOCAL_MEMBER_BENEFIT',
        title: existing.title,
        brand_name: existing.brand_name || 'Phúc Long Coffee & Tea',
        source_url: userFacingSourceUrl,
        price: null, // Strictly null for member policy
        disclaimer: upd.disclaimer || existing.disclaimer,
        geographic_scope: upd.geographic_scope || existing.geographic_scope,
        affiliate_url: null,
        render_permitted: true,
        approval_status: 'PUBLIC_APPROVED_STAGING_ONLY',
        approval_authority: 'CEO / EXECUTIVE_COUNCIL (JAYT-330-R3)',
        scope: 'STAGING_ONLY',
        batch_14_ref: upd.row_id,
        provenance: {
          ...existing.provenance,
          source_raw_sha256: upd.provenance?.source_raw_sha256,
          raw_sha256: upd.provenance?.source_raw_sha256 || existing.provenance?.raw_sha256,
          captured_at_utc: upd.provenance?.captured_at_utc,
          master_catalog_url: upd.provenance?.source_url || null,
          item_url: upd.provenance?.item_url || null
        }
      };
    } else {
      // Commercial price observation
      hydratedCard = {
        ...existing,
        card_id: upd.row_id,
        sku_id: upd.row_id,
        legacy_card_id: targetId,
        legacy_sku_id: targetId,
        product_name: upd.product_name || existing.product_name,
        source_retailer: existing.source_retailer,
        source_url: userFacingSourceUrl,
        price: upd.price,
        captured_at: upd.provenance?.captured_at_utc || existing.captured_at,
        observation_disclaimer: upd.disclaimer || existing.observation_disclaimer,
        geographic_scope: upd.geographic_scope || existing.geographic_scope,
        affiliate_url: null,
        render_permitted: true,
        approval_status: 'PUBLIC_APPROVED_STAGING_ONLY',
        approval_authority: 'CEO / EXECUTIVE_COUNCIL (JAYT-330-R3)',
        scope: 'STAGING_ONLY',
        batch_14_ref: upd.row_id,
        provenance: {
          ...existing.provenance,
          source_raw_sha256: upd.provenance?.source_raw_sha256,
          raw_sha256: upd.provenance?.source_raw_sha256 || existing.provenance?.raw_sha256,
          captured_at_utc: upd.provenance?.captured_at_utc,
          master_catalog_url: upd.provenance?.source_url || null,
          item_url: upd.provenance?.item_url || null
        }
      };
    }

    hydratedCardsMap.set(upd.row_id, hydratedCard);
  }

  // Process NEW candidates
  const retailerMap = {
    'jollibee': 'Jollibee — Thực đơn / giá quan sát',
    'phi_long': 'Phi Long Technology (Đà Nẵng)',
    'metiz_cinema': 'Metiz Cinema Đà Nẵng',
    'galaxy_cinema': 'Galaxy Cinema Đà Nẵng',
    'dien_may_xanh': 'Điện Máy XANH (Thế Giới Di Động)'
  };

  for (const n of newCandidates) {
    assert.ok(!hydratedCardsMap.has(n.row_id), `New candidate ${n.row_id} must not collide`);
    const userFacingSourceUrl = n.provenance?.item_url || n.provenance?.source_url;
    const newCard = {
      card_id: n.row_id,
      sku_id: n.row_id,
      brand_id: n.brand_id,
      catalog_id: n.catalog_id,
      product_name: n.product_name,
      source_retailer: retailerMap[n.brand_id] || n.brand_id,
      source_url: userFacingSourceUrl,
      price: n.price,
      captured_at: n.provenance?.captured_at_utc,
      observation_disclaimer: n.disclaimer,
      geographic_scope: n.geographic_scope,
      affiliate_url: null,
      part_number: n.part_number || null,
      part_number_verified: !!n.part_number,
      vat_status: null,
      vat_status_verified: false,
      stock_status: null,
      local_stock_verified: false,
      provenance: {
        raw_sha256: n.provenance?.source_raw_sha256,
        source_raw_sha256: n.provenance?.source_raw_sha256,
        captured_at_utc: n.provenance?.captured_at_utc,
        catalog_id: n.catalog_id,
        master_catalog_url: n.provenance?.source_url || null,
        item_url: n.provenance?.item_url || null
      },
      claims_audit: {
        cheapest_claim: false,
        stock_guaranteed: false,
        savings_guaranteed: false,
        affiliate_link: false
      },
      render_permitted: true,
      approval_status: 'PUBLIC_APPROVED_STAGING_ONLY',
      approval_authority: 'CEO / EXECUTIVE_COUNCIL (JAYT-330-R3)',
      scope: 'STAGING_ONLY'
    };

    if (n.validity_evidence) {
      newCard.validity_evidence = n.validity_evidence;
    }

    hydratedCardsMap.set(n.row_id, newCard);
  }

  // Assemble final ordered catalog matching approved IDs
  const finalCards = approvedIdsOrder.map(id => {
    assert.ok(hydratedCardsMap.has(id), `Missing hydrated card for approved ID: ${id}`);
    return hydratedCardsMap.get(id);
  });

  assert.strictEqual(finalCards.length, 22, `Expected exactly 22 hydrated cards, got ${finalCards.length}`);

  // 6. Strict Invariant Verifications on hydrated cards
  console.log('5. Thẩm tra các điều kiện bất biến trên tập thẻ sau hydrate:');
  const seenIds = new Set();
  for (const c of finalCards) {
    const id = c.card_id || c.sku_id;
    assert.ok(!seenIds.has(id), `Duplicate card ID detected: ${id}`);
    seenIds.add(id);

    // Verify render_permitted is true
    assert.strictEqual(c.render_permitted, true, `Card ${id} must have render_permitted === true`);

    // Verify affiliate_url is null
    assert.strictEqual(c.affiliate_url, null, `Card ${id} affiliate_url must be null`);

    // Verify no tracking query parameters
    const jsonStr = JSON.stringify(c);
    assert.ok(!/[?&](aff|utm_|ref|subid|click_id|tracking)=/i.test(jsonStr),
      `Card ${id} contains forbidden affiliate/tracking parameter`);
  }
  console.log('   [PASS] 22/22 thẻ có ID duy nhất, render_permitted=true, tuyệt đối không link affiliate/tracking.');

  // Verify Galaxy from_price
  const galaxyCard = finalCards.find(c => c.card_id === 'B14_GALAXY_DANANG_TARIFF');
  assert.ok(galaxyCard, 'Galaxy card must exist');
  assert.strictEqual(galaxyCard.price.from_price, 45000, 'Galaxy from_price must be 45000');
  assert.strictEqual(galaxyCard.price.is_from_price, true, 'Galaxy is_from_price must be true');
  assert.strictEqual(galaxyCard.price.price_qualifier, 'FROM_PRICE', 'Galaxy price_qualifier must be FROM_PRICE');
  console.log('   [PASS] Galaxy Cinema định danh chuẩn "giá từ 45.000 VNĐ" (FROM_PRICE).');

  // Verify Phuc Long member policy
  const plCard = finalCards.find(c => c.card_id === 'B14_PLONG_MEMBER_BENEFITS');
  assert.ok(plCard, 'Phúc Long card must exist');
  assert.strictEqual(plCard.price, null, 'Phúc Long price must be null (MEMBER_POLICY)');
  assert.strictEqual(plCard.type, 'LOCAL_MEMBER_BENEFIT', 'Phúc Long must be LOCAL_MEMBER_BENEFIT');
  console.log('   [PASS] Phúc Long chuẩn hóa chính sách hội viên không giá số (MEMBER_POLICY).');

  // Verify Metiz unverified geographic scope
  const metizCard = finalCards.find(c => c.card_id === 'B14_METIZ_U22_2D');
  assert.ok(metizCard, 'Metiz card must exist');
  assert.strictEqual(metizCard.geographic_scope.da_nang_applicable, 'UNVERIFIED', 'Metiz locality must be UNVERIFIED');
  console.log('   [PASS] Metiz Cinema duy trì trạng thái địa lý UNVERIFIED theo đúng điều khoản tệp nguồn.');

  // 7. Write to Disk if not dry-run
  let postHydrationHash = preHydrationHash;
  if (!dryRun) {
    fs.writeFileSync(STAGING_CARDS_PATH, JSON.stringify(finalCards, null, 2) + '\n', 'utf8');
    postHydrationHash = computeSha256(STAGING_CARDS_PATH);
    console.log(`\n6. Đã ghi 22 thẻ vào ${STAGING_CARDS_PATH}`);
    console.log(`   Băm sau hydrate: ${postHydrationHash}`);
  } else {
    console.log(`\n6. Dry-run hoàn tất. Không thay đổi đĩa.`);
  }

  console.log('\n=== HYDRATION THÀNH CÔNG RỰC RỠ (22 THẺ THƯƠNG MẠI DUY NHẤT) ===\n');

  return {
    success: true,
    dryRun,
    preHydrationHash,
    postHydrationHash,
    finalCardsCount: finalCards.length,
    renderedIds: finalCards.map(c => c.card_id || c.sku_id)
  };
}

if (require.main === module) {
  try {
    const isDryRun = process.argv.includes('--dry-run');
    runHydration({ dryRun: isDryRun });
  } catch (err) {
    console.error('HYDRATION RUNNER ERROR:', err.message);
    process.exit(1);
  }
}

module.exports = { runHydration, AUTHORIZED_PACKAGE_SHA256 };
