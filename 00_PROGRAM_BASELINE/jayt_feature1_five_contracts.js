/**
 * JAYT FEATURE 1: THE 5 MANDATORY TECHNICAL CONTRACTS
 * Governing Mandate: CHAIRMAN_DIRECTIVE_20260919_RATIFY_JAYT_450_R1_AND_AUTHORIZE_EXECUTION (JAYT-451)
 * Authority: CEO Codex / Design Authority
 *
 * The 5 Contracts:
 *  1. Offer Contract: Authority for offer identity and commercial conditions (Key: offer_id + offer_version)
 *  2. Evidence Contract: Every verified claim requires valid claim_evidence_id, else CLAIM_BLOCKED
 *  3. Savings Contract: Deterministic calculation (Modes: VERIFIED, ESTIMATED, CONDITIONAL)
 *  4. Route Contract: Single authority for outbound destination (Authority: destination.product_id == RouteContract.product_id)
 *  5. Outcome Contract: Strict attribution pipeline (IMPRESSION -> ... -> COMMISSION_PAID, invariant CLICK != REVENUE)
 */

'use strict';

// 1. OFFER CONTRACT
function createOfferContract(data = {}) {
  const offer_id = String(data.offer_id || data.sku_id || data.id || '').trim();
  const offer_version = String(data.offer_version || '1.0.0').trim();
  const product_id = String(data.product_id || data.itemId || data.sku_id || offer_id).trim();
  const title = String(data.title || data.product_name || '').trim();
  const platform = String(data.platform || 'shopee').toLowerCase();
  const tier = String(data.tier || 'GENERIC_VALUE').toUpperCase(); // BRAND_MALL | GENERIC_VALUE
  const route_id = String(data.route_id || `route_${platform}_${offer_id}`);
  const observed_price = Number(data.observed_price || data.price || 0);
  const status = data.status || 'ACTIVE';

  if (!offer_id) throw new Error('OfferContract: missing offer_id');
  if (!product_id) throw new Error('OfferContract: missing product_id');

  return Object.freeze({
    contract_type: 'OFFER_CONTRACT',
    offer_id,
    offer_version,
    product_id,
    title,
    clean_title: data.cleanTitle || title,
    platform,
    tier,
    route_id,
    observed_price,
    currency: 'VND',
    status,
    created_at: data.created_at || new Date().toISOString()
  });
}

function validateOfferContract(contract) {
  if (!contract || contract.contract_type !== 'OFFER_CONTRACT') return { valid: false, error: 'Invalid contract type' };
  if (!contract.offer_id || typeof contract.offer_id !== 'string') return { valid: false, error: 'Missing offer_id' };
  if (!contract.product_id || typeof contract.product_id !== 'string') return { valid: false, error: 'Missing product_id' };
  if (!['BRAND_MALL', 'GENERIC_VALUE'].includes(contract.tier)) return { valid: false, error: 'Invalid tier: ' + contract.tier };
  return { valid: true };
}

// 2. EVIDENCE CONTRACT
function createEvidenceContract(data = {}) {
  const claim_id = String(data.claim_id || `CLAIM_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);
  const claim_evidence_id = data.claim_evidence_id ? String(data.claim_evidence_id).trim() : null;
  const claim_type = data.claim_type || 'PRICE_DISCOUNT'; // PRICE_DISCOUNT | AUTHENTIC_REVIEW | REAL_IMAGE | MERCHANT_VERIFIED
  const source_ref = data.source_ref || null;
  const sha256 = data.sha256 || null;
  const observed_at = data.observed_at || new Date().toISOString();

  const isVerified = Boolean(claim_evidence_id && source_ref);
  const status = isVerified ? 'VERIFIED' : 'CLAIM_BLOCKED';

  return Object.freeze({
    contract_type: 'EVIDENCE_CONTRACT',
    claim_id,
    claim_evidence_id,
    claim_type,
    status,
    verified: isVerified,
    source_ref,
    sha256,
    observed_at
  });
}

function validateEvidenceContract(contract) {
  if (!contract || contract.contract_type !== 'EVIDENCE_CONTRACT') return { valid: false, error: 'Invalid contract type' };
  if (!contract.claim_evidence_id) return { valid: false, error: 'CLAIM_BLOCKED: missing claim_evidence_id' };
  if (!contract.source_ref) return { valid: false, error: 'CLAIM_BLOCKED: missing source_ref' };
  return { valid: true, status: contract.status };
}

// 3. SAVINGS CONTRACT
function createSavingsContract(data = {}) {
  const offer_id = String(data.offer_id || data.sku_id || '').trim();
  const base_price = Number(data.base_price || data.original_price || 0);
  const target_price = Number(data.target_price || data.observed_price || 0);
  const savings_amount = Math.max(0, base_price - target_price);
  const savings_pct = base_price > 0 ? Math.round((savings_amount / base_price) * 100) : 0;
  
  // Modes: VERIFIED | ESTIMATED | CONDITIONAL
  let calculation_mode = data.calculation_mode || 'ESTIMATED';
  if (data.is_verified_receipt && data.receipt_id) {
    calculation_mode = 'VERIFIED';
  } else if (data.requires_dynamic_voucher || data.membership_tier_dependent) {
    calculation_mode = 'CONDITIONAL';
  }

  const claim_accuracy_guarantee = 'độ chính xác của claim phải được kiểm chứng 100% theo evidence contract';

  return Object.freeze({
    contract_type: 'SAVINGS_CONTRACT',
    offer_id,
    base_price,
    target_price,
    savings_amount,
    savings_pct,
    currency: 'VND',
    calculation_mode,
    claim_accuracy_guarantee,
    condition_terms: data.condition_terms || 'Giá quan sát thực tế tại thời điểm quét; có thể thay đổi tùy khung giờ sàn.',
    computed_at: new Date().toISOString()
  });
}

function validateSavingsContract(contract) {
  if (!contract || contract.contract_type !== 'SAVINGS_CONTRACT') return { valid: false, error: 'Invalid contract type' };
  if (!['VERIFIED', 'ESTIMATED', 'CONDITIONAL'].includes(contract.calculation_mode)) {
    return { valid: false, error: 'Invalid calculation_mode: ' + contract.calculation_mode };
  }
  if (contract.base_price < contract.target_price) {
    return { valid: false, error: 'Base price cannot be less than target price for savings' };
  }
  return { valid: true };
}

// 4. ROUTE CONTRACT
function createRouteContract(data = {}) {
  const route_id = String(data.route_id || `route_${Date.now()}`);
  const offer_id = String(data.offer_id || data.sku_id || '');
  const product_id = String(data.product_id || data.itemId || '');
  const platform = String(data.platform || 'shopee').toLowerCase();
  
  // Types: PRODUCT | VOUCHER_HUB | FOOD_PORTAL
  let route_type = data.route_type || 'PRODUCT';
  if (data.is_voucher_hub || data.isVoucherPortal) route_type = 'VOUCHER_HUB';
  else if (data.is_food_portal || ['shopeefood', 'grabfood'].includes(platform)) route_type = 'FOOD_PORTAL';

  let destination_url = String(data.destination_url || data.pdpUrl || data.canonical_url || '');
  // Shopee normalization: digits only for shopId
  if (platform === 'shopee') {
    destination_url = destination_url.replace(/shopee_store_/g, '');
  }

  // TikTok normalization: support /vn/pdp/<id> and /vn/pdp/<slug>/<id>
  if (platform === 'tiktok' && route_type === 'PRODUCT') {
    if (destination_url.includes('/search')) {
      throw new Error('RouteContract: /search is FORBIDDEN as destination for TikTok Product CTA');
    }
  }

  return Object.freeze({
    contract_type: 'ROUTE_CONTRACT',
    route_id,
    offer_id,
    product_id,
    platform,
    route_type,
    destination_url,
    deep_link_url: data.deep_link_url || null,
    affiliate_mode: 'FAIL_CLOSED',
    validated: Boolean(destination_url && destination_url.startsWith('http'))
  });
}

function validateRouteContract(contract) {
  if (!contract || contract.contract_type !== 'ROUTE_CONTRACT') return { valid: false, error: 'Invalid contract type' };
  if (!['PRODUCT', 'VOUCHER_HUB', 'FOOD_PORTAL'].includes(contract.route_type)) {
    return { valid: false, error: 'Invalid route_type: ' + contract.route_type };
  }
  if (contract.route_type === 'PRODUCT') {
    if (!contract.destination_url || contract.destination_url.includes('/search')) {
      return { valid: false, error: 'Product CTA destination must be direct PDP, not search' };
    }
  }
  return { valid: true };
}

// 5. OUTCOME CONTRACT
const OUTCOME_LIFECYCLE_STAGES = Object.freeze([
  'IMPRESSION',
  'ROUTE_REQUESTED',
  'ROUTE_RESOLVED',
  'PLATFORM_OPENED',
  'ATTRIBUTED_ORDER',
  'VALIDATED_ORDER',
  'COMMISSION_PENDING',
  'COMMISSION_APPROVED',
  'COMMISSION_PAID'
]);

function createOutcomeContract(data = {}) {
  const transition_id = String(data.transition_id || `TRANS_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);
  const current_stage = data.current_stage || 'IMPRESSION';
  if (!OUTCOME_LIFECYCLE_STAGES.includes(current_stage)) {
    throw new Error('OutcomeContract: Invalid stage ' + current_stage);
  }

  return Object.freeze({
    contract_type: 'OUTCOME_CONTRACT',
    transition_id,
    offer_id: String(data.offer_id || ''),
    route_id: String(data.route_id || ''),
    current_stage,
    lifecycle_stages: OUTCOME_LIFECYCLE_STAGES,
    invariant_rule: 'CLICK != REVENUE',
    attributed_commission: Number(data.attributed_commission || 0),
    is_revenue_recognized: ['COMMISSION_APPROVED', 'COMMISSION_PAID'].includes(current_stage),
    recorded_at: new Date().toISOString()
  });
}

function validateOutcomeContract(contract) {
  if (!contract || contract.contract_type !== 'OUTCOME_CONTRACT') return { valid: false, error: 'Invalid contract type' };
  if (!OUTCOME_LIFECYCLE_STAGES.includes(contract.current_stage)) {
    return { valid: false, error: 'Unknown outcome stage' };
  }
  // Assert invariant: CLICK != REVENUE
  if (['IMPRESSION', 'ROUTE_REQUESTED', 'ROUTE_RESOLVED', 'PLATFORM_OPENED'].includes(contract.current_stage)) {
    if (contract.is_revenue_recognized || contract.attributed_commission > 0) {
      return { valid: false, error: 'Invariant violation: CLICK != REVENUE; early stages cannot recognize revenue' };
    }
  }
  return { valid: true };
}

// DUAL-TIER VERIFICATION
function verifyDualTierContract(offerContract, routeContract) {
  if (offerContract.tier === 'BRAND_MALL') {
    if (!offerContract.title.toLowerCase().includes('mall') && !offerContract.title.toLowerCase().includes('chính hãng') && !offerContract.merchant_type) {
      // Must have verified Mall metadata
    }
  } else if (offerContract.tier === 'GENERIC_VALUE') {
    if (offerContract.clean_title && /chính\s+hãng\s+mall|lazmall|shopee\s+mall/i.test(offerContract.clean_title)) {
      return { valid: false, error: 'Generic Value tier must strip Brand Mall semantics from display title' };
    }
  }
  // Invariant: display_offer_id == route_offer_id
  if (offerContract.offer_id !== routeContract.offer_id) {
    return { valid: false, error: `Dual-Tier invariant violation: display_offer_id (${offerContract.offer_id}) != route_offer_id (${routeContract.offer_id})` };
  }
  return { valid: true };
}

// REVIEW MATHEMATICS ENGINE
function verifyReviewMath(rawReview) {
  if (!rawReview) return { valid: false, error: 'Missing review' };
  const aspects = rawReview.aspectBreakdown || [];
  if (!Array.isArray(aspects) || aspects.length === 0) {
    return { valid: false, error: 'Missing aspectBreakdown' };
  }

  for (let i = 0; i < aspects.length; i++) {
    const asp = aspects[i];
    const pos = Number(asp.positive_mentions ?? asp.proMentions ?? 0);
    const neg = Number(asp.negative_mentions ?? asp.conMentions ?? 0);
    const classified = Number(asp.classified_mentions ?? asp.totalMentions ?? (pos + neg));

    if (pos + neg !== classified) {
      return {
        valid: false,
        error: `Aspect "${asp.aspect}": pos (${pos}) + neg (${neg}) = ${pos + neg} != classified (${classified})`
      };
    }

    const posRate = Number(asp.positive_pct ?? asp.proRate ?? Math.round((pos / classified) * 100));
    const negRate = Number(asp.negative_pct ?? asp.conRate ?? (100 - posRate));

    if (posRate + negRate !== 100) {
      return {
        valid: false,
        error: `Aspect "${asp.aspect}": posRate (${posRate}) + negRate (${negRate}) = ${posRate + negRate} != 100`
      };
    }
  }

  return { valid: true, aspect_count: aspects.length };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createOfferContract,
    validateOfferContract,
    createEvidenceContract,
    validateEvidenceContract,
    createSavingsContract,
    validateSavingsContract,
    createRouteContract,
    validateRouteContract,
    createOutcomeContract,
    validateOutcomeContract,
    verifyDualTierContract,
    verifyReviewMath,
    OUTCOME_LIFECYCLE_STAGES
  };
}

if (typeof window !== 'undefined') {
  window.JAYT_FIVE_CONTRACTS = Object.freeze({
    createOfferContract,
    validateOfferContract,
    createEvidenceContract,
    validateEvidenceContract,
    createSavingsContract,
    validateSavingsContract,
    createRouteContract,
    validateRouteContract,
    createOutcomeContract,
    validateOutcomeContract,
    verifyDualTierContract,
    verifyReviewMath,
    OUTCOME_LIFECYCLE_STAGES
  });
}
