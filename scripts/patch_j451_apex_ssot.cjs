/**
 * JAYT-451 APEX SSOT SURGICAL PATCH
 * Mandate: CHAIRMAN_DIRECTIVE_20260919_RATIFY_JAYT_450_R1_AND_AUTHORIZE_EXECUTION (JAYT-451)
 *
 * Implements:
 *  1. Anti-State Leakage: Complete elimination of window.__lastRadar and mutable global fallbacks.
 *  2. Modal Context Isolation: Modals created strictly from triggering card with DOM binding data-product-payload.
 *  3. Modal Cleanup: Absolute state destruction on close.
 *  4. Review Mathematics Raw Schema: Adds positive_mentions, negative_mentions, classified_mentions, claim_evidence_id.
 *  5. 5 Contracts: Embeds Offer, Evidence, Savings, Route, Outcome contracts on window.JAYT_FIVE_CONTRACTS.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const APEX_PATH = path.resolve(__dirname, '..', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const BACKUP_PATH = APEX_PATH + '.bak_j451';

let content = fs.readFileSync(APEX_PATH, 'utf8');

// Step 0: Backup original
fs.writeFileSync(BACKUP_PATH, content, 'utf8');
console.log(`[BACKUP] Saved backup to ${BACKUP_PATH}`);

// Patch 1: dispatchRadarPlatform - Remove window.__lastRadar fallback
const oldDispatchRadarCheck = `  if (!radar && typeof document !== 'undefined') {
    const activeModal = document.getElementById('jayt-voucher-scanner-modal');
    if (activeModal && activeModal._currentRadar && (activeModal.classList.contains('is-open') || activeModal.style.display !== 'none')) {
      radar = activeModal._currentRadar;
    }
  }
  if (!radar && typeof window !== 'undefined' && window.__lastRadar) {
    radar = window.__lastRadar;
  }
  if (!radar) return;`;

const newDispatchRadarCheck = `  if (!radar && typeof document !== 'undefined') {
    const activeModal = document.getElementById('jayt-voucher-scanner-modal');
    if (activeModal && activeModal._currentRadar && (activeModal.classList.contains('is-open') || activeModal.style.display !== 'none')) {
      radar = activeModal._currentRadar;
    }
    if (!radar) {
      const activeRevModal = document.getElementById('jayt-authentic-reviews-modal');
      if (activeRevModal && activeRevModal._currentRadar && (activeRevModal.classList.contains('is-open') || activeRevModal.style.display !== 'none')) {
        radar = activeRevModal._currentRadar;
      }
    }
  }
  // JAYT-451 P0 ANTI-STATE LEAKAGE: Mutable global fallback window.__lastRadar is STRICTLY FORBIDDEN
  if (!radar) return;`;

if (!content.includes(oldDispatchRadarCheck)) {
  console.error('[ERROR] Patch 1 target not found');
  process.exit(1);
}
content = content.replace(oldDispatchRadarCheck, newDispatchRadarCheck);
console.log('[OK] Patch 1: Removed window.__lastRadar fallback in dispatchRadarPlatform');

// Patch 2: Modal Buttons passing this reference
content = content.replace(
  '<button type="button" class="btn-cta-primary" onclick="dispatchRadarPlatform(${i})"',
  '<button type="button" class="btn-cta-primary" onclick="dispatchRadarPlatform(${i}, \'mall\', this)"'
);
content = content.replace(
  '<button type="button" class="btn-cta-primary" onclick="dispatchRadarPlatform(${i})"',
  '<button type="button" class="btn-cta-primary" onclick="dispatchRadarPlatform(${i}, \'mall\', this)"'
);
content = content.replace(
  '<button type="button" class="btn-cta-primary" onclick="dispatchRadarPlatform(${j}, \'trusted\')"',
  '<button type="button" class="btn-cta-primary" onclick="dispatchRadarPlatform(${j}, \'trusted\', this)"'
);
console.log('[OK] Patch 2: Updated modal buttons to pass this');

// Patch 3: Inline radar buttons passing this reference
content = content.replace(
  "'<button type=\"button\" onclick=\"dispatchRadarPlatform(' + i + ')\"'",
  "'<button type=\"button\" onclick=\"dispatchRadarPlatform(' + i + ', \\'mall\\', this)\"'"
);
content = content.replace(
  "'<button type=\"button\" onclick=\"dispatchRadarPlatform(' + i + ')\"'",
  "'<button type=\"button\" onclick=\"dispatchRadarPlatform(' + i + ', \\'mall\\', this)\"'"
);
content = content.replace(
  "'<button type=\"button\" onclick=\"dispatchRadarPlatform(' + j + ', \\'trusted\\')\"'",
  "'<button type=\"button\" onclick=\"dispatchRadarPlatform(' + j + ', \\'trusted\\', this)\"'"
);
console.log('[OK] Patch 3: Updated inline radar buttons to pass this');

// Patch 4: Remove window.__lastRadar assignments (lines 9261, 9941, 11540)
content = content.replace(
  '    const defaultBasket = 120000;\n    const radar = computeCrossPlatformRadar(p, defaultBasket);\n    window.__lastRadar = radar;',
  '    const defaultBasket = 120000;\n    const radar = computeCrossPlatformRadar(p, defaultBasket);'
);

content = content.replace(
  "    // Store references for pop-up reopening\n    if (typeof window !== 'undefined') {\n      window.__lastRadar = radar;\n      window.__lastParsed = parsed;\n      window.__lastInitialStack = initialStack;\n      window.__reExecuteRender = executeRender;\n    }",
  "    // Store references for pop-up reopening (isolated to result container)\n    if (typeof window !== 'undefined') {\n      window.__lastParsed = parsed;\n      window.__lastInitialStack = initialStack;\n      window.__reExecuteRender = executeRender;\n    }"
);

content = content.replace(
  "  if (typeof window !== 'undefined') {\n    window.__lastRadar = radar;\n    window.__lastParsed = parsed;\n    window.__lastInitialStack = initialStack;\n  }",
  "  if (typeof window !== 'undefined') {\n    window.__lastParsed = parsed;\n    window.__lastInitialStack = initialStack;\n  }"
);
console.log('[OK] Patch 4: Removed window.__lastRadar global assignments');

// Patch 5: Modal open button in inline render (line 10042)
const oldPopupBtn = "'<button type=\"button\" class=\"btn-cta-primary\" onclick=\"openVoucherScannerModal(window.__lastRadar, window.__lastParsed, window.__lastInitialStack, ' + defaultBasket + ', ' + defaultDelivery + ')\"";
const newPopupBtn = "'<button type=\"button\" class=\"btn-cta-primary\" onclick=\"openVoucherScannerModal((this.closest(\\'.j401-voucher-result\\') && this.closest(\\'.j401-voucher-result\\')._currentRadar) || null, window.__lastParsed, window.__lastInitialStack, ' + defaultBasket + ', ' + defaultDelivery + ')\"";
if (content.includes(oldPopupBtn)) {
  content = content.replace(oldPopupBtn, newPopupBtn);
  console.log('[OK] Patch 5: Updated pop-up button to read from container instead of window.__lastRadar');
}

// And attach _currentRadar to resultDiv
const oldResultDivInner = "resultDiv.innerHTML = '<div class=\"j401-voucher-result\"";
const newResultDivInner = "resultDiv._currentRadar = radar; resultDiv._currentParsed = parsed; resultDiv._currentInitialStack = initialStack;\n    resultDiv.innerHTML = '<div class=\"j401-voucher-result\"";
content = content.replace(oldResultDivInner, newResultDivInner);

// Patch 6: Review button in radar modals (lines 9706, 10083)
content = content.replace(
  'openAuthenticReviewsModal((this.closest(\'#jayt-voucher-scanner-modal\') && this.closest(\'#jayt-voucher-scanner-modal\')._currentRadar) || (window.__lastRadar ? (window.__lastRadar.matchedTriplet ? window.__lastRadar.matchedTriplet.id : (window.__lastRadar.parsedProduct || null)) : null));',
  'openAuthenticReviewsModal((this.closest(\'#jayt-voucher-scanner-modal\') && this.closest(\'#jayt-voucher-scanner-modal\')._currentRadar) || null);'
);
content = content.replace(
  'openAuthenticReviewsModal(window.__lastRadar ? (window.__lastRadar.matchedTriplet ? window.__lastRadar.matchedTriplet.id : (window.__lastRadar.parsedProduct || null)) : null);',
  'openAuthenticReviewsModal((this.closest(\'.j401-voucher-result\') && this.closest(\'.j401-voucher-result\')._currentRadar) || null);'
);
console.log('[OK] Patch 6: Neutralized window.__lastRadar fallback in review triggers');

// Patch 7: closeVoucherScannerModal & closeAuthenticReviewsModal cleanup
const oldCloseVoucherScanner = `function closeVoucherScannerModal() {
  const modal = document.getElementById('jayt-voucher-scanner-modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.style.display = 'none';
    modal.style.pointerEvents = 'none';
  }`;

const newCloseVoucherScanner = `function closeVoucherScannerModal() {
  const modal = document.getElementById('jayt-voucher-scanner-modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.style.display = 'none';
    modal.style.pointerEvents = 'none';
    modal._currentRadar = null;
    modal._currentParsed = null;
  }`;

content = content.replace(oldCloseVoucherScanner, newCloseVoucherScanner);

const oldCloseReviews = `function closeAuthenticReviewsModal() {
  const modal = document.getElementById('jayt-authentic-reviews-modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.style.display = 'none';
  }
}`;

const newCloseReviews = `function closeAuthenticReviewsModal() {
  const modal = document.getElementById('jayt-authentic-reviews-modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.style.display = 'none';
    modal._currentReview = null;
    modal._currentRadar = null;
    modal._currentBestPlatformId = null;
    modal._currentTargetPayload = null;
    modal._currentVoucherCode = null;
    modal._currentBestPrice = null;
    modal._currentBestPlatformName = null;
  }
}`;

content = content.replace(oldCloseReviews, newCloseReviews);
console.log('[OK] Patch 7: Enhanced modal cleanup on close');

// Patch 8: openSkuCrossPlatformRadar - Support DOM element trigger and card payload
const oldOpenSkuRadarStart = `function openSkuCrossPlatformRadar(skuOrPayload, optTitle = null, optPrice = null, optPlatform = null) {
  let skuId = null;
  let productName = optTitle;
  let basePrice = optPrice;
  let platform = optPlatform || 'shopee';
  let p = null;

  if (typeof skuOrPayload === 'object' && skuOrPayload !== null) {`;

const newOpenSkuRadarStart = `function openSkuCrossPlatformRadar(skuOrPayload, optTitle = null, optPrice = null, optPlatform = null) {
  let skuId = null;
  let productName = optTitle;
  let basePrice = optPrice;
  let platform = optPlatform || 'shopee';
  let p = null;

  // JAYT-451 P0: Extract immutable data-product-payload from triggering DOM element if passed
  if (skuOrPayload && skuOrPayload.nodeType) {
    const cardEl = skuOrPayload.closest ? skuOrPayload.closest('[data-product-payload]') : null;
    if (cardEl && cardEl.dataset && cardEl.dataset.productPayload) {
      try {
        const parsedPayload = JSON.parse(cardEl.dataset.productPayload);
        if (parsedPayload && (parsedPayload.offer_id || parsedPayload.sku_id || parsedPayload.skuId)) {
          skuOrPayload = parsedPayload;
        }
      } catch (e) {}
    }
  }

  if (typeof skuOrPayload === 'object' && skuOrPayload !== null) {`;

content = content.replace(oldOpenSkuRadarStart, newOpenSkuRadarStart);
console.log('[OK] Patch 8: openSkuCrossPlatformRadar now extracts from data-product-payload');

// Patch 9: openAuthenticReviewsModal - Remove window.__lastRadar lookup (lines 12840-12847)
const oldRevModalRadarLookup = `  // 2. Or check if window.__lastRadar strictly matches the requested SKU or product
  else if (typeof window !== 'undefined' && window.__lastRadar) {
    const lr = window.__lastRadar;
    const lrSku = (lr.matchedTriplet && lr.matchedTriplet.id) || (lr.parsedProduct && (lr.parsedProduct.sku_id || lr.parsedProduct.skuId || lr.parsedProduct.itemId));
    const targetSku = (typeof skuOrProduct === 'string') ? skuOrProduct : (skuOrProduct ? (skuOrProduct.sku_id || skuOrProduct.skuId || skuOrProduct.id) : null);
    if (lrSku && targetSku && (lrSku === targetSku || (lr.matchedTriplet && lr.matchedTriplet.matchKeys && lr.matchedTriplet.matchKeys.includes(targetSku)))) {
      currentRadar = lr;
    }
  }`;

const newRevModalRadarLookup = `  // JAYT-451: Mutable global fallback window.__lastRadar lookup is neutralized for strict state isolation
  else if (skuOrProduct && typeof skuOrProduct === 'object' && skuOrProduct._currentRadar) {
    currentRadar = skuOrProduct._currentRadar;
  }`;

content = content.replace(oldRevModalRadarLookup, newRevModalRadarLookup);
console.log('[OK] Patch 9: Removed window.__lastRadar fallback in openAuthenticReviewsModal');

// Also support DOM element trigger in openAuthenticReviewsModal
const oldOpenAuthRevModalStart = `function openAuthenticReviewsModal(skuOrProduct, optTitle = null, optPrice = null, optPlatform = null) {
  if (typeof triggerJaytSensoryFeedback === 'function') triggerJaytSensoryFeedback();

  const review = getAuthenticReviewData(skuOrProduct, optTitle, optPlatform);`;

const newOpenAuthRevModalStart = `function openAuthenticReviewsModal(skuOrProduct, optTitle = null, optPrice = null, optPlatform = null) {
  if (typeof triggerJaytSensoryFeedback === 'function') triggerJaytSensoryFeedback();

  // JAYT-451 P0: Extract immutable data-product-payload if triggered from DOM button
  if (skuOrProduct && skuOrProduct.nodeType) {
    const cardEl = skuOrProduct.closest ? skuOrProduct.closest('[data-product-payload]') : null;
    if (cardEl && cardEl.dataset && cardEl.dataset.productPayload) {
      try {
        const parsedPayload = JSON.parse(cardEl.dataset.productPayload);
        if (parsedPayload && (parsedPayload.offer_id || parsedPayload.sku_id || parsedPayload.skuId)) {
          skuOrProduct = parsedPayload.offer_id || parsedPayload.sku_id || parsedPayload.skuId;
          if (!optTitle) optTitle = parsedPayload.cleanTitle || parsedPayload.title;
          if (!optPrice) optPrice = parsedPayload.observed_price || parsedPayload.price;
          if (!optPlatform) optPlatform = parsedPayload.platform;
        }
      } catch (e) {}
    }
  }

  const review = getAuthenticReviewData(skuOrProduct, optTitle, optPlatform);`;

content = content.replace(oldOpenAuthRevModalStart, newOpenAuthRevModalStart);
console.log('[OK] Patch 9b: openAuthenticReviewsModal now accepts DOM trigger element');

// Patch 10: Product Card Immutable Identity DOM Binding
const oldCardHtmlStart = `<article class="dorm-sku-card" data-sku-id="\${escapeHtml(p.sku_id)}" data-product-payload="\${escapeHtml(JSON.stringify({ skuId: p.sku_id, title: p.product_name, cleanTitle: p.product_name, price: p.observed_price, platform: 'shopee', rawUrl: p.canonical_url }))}"`;

const newCardHtmlStart = `<article class="dorm-sku-card" data-sku-id="\${escapeHtml(p.sku_id)}" data-product-payload="\${escapeHtml(JSON.stringify({ offer_id: p.sku_id, product_id: p.sku_id, platform: (p.platform || 'shopee'), tier: (p.tier || 'GENERIC_VALUE'), route_id: 'route_' + (p.platform || 'shopee') + '_' + p.sku_id, skuId: p.sku_id, title: p.product_name, cleanTitle: p.product_name, price: p.observed_price, observed_price: p.observed_price, pdpUrl: p.canonical_url, rawUrl: p.canonical_url }))}"`;

if (!content.includes(oldCardHtmlStart)) {
  console.error('[ERROR] Patch 10 target not found');
  process.exit(1);
}
content = content.replace(oldCardHtmlStart, newCardHtmlStart);

// Update buttons in dorm sku card to pass this
content = content.replace(
  `openSkuCrossPlatformRadar('\${escapeHtml(p.sku_id)}', '\${escapeHtml(p.product_name)}', \${Number(p.observed_price) || 0}, '\${escapeHtml(p.platform || 'shopee')}')`,
  `openSkuCrossPlatformRadar(this, '\${escapeHtml(p.sku_id)}', '\${escapeHtml(p.product_name)}', \${Number(p.observed_price) || 0}, '\${escapeHtml(p.platform || 'shopee')}')`
);

content = content.replace(
  `openAuthenticReviewsModal('\${escapeHtml(p.sku_id)}', '\${escapeHtml(p.product_name)}', \${Number(p.observed_price) || 0}, '\${escapeHtml(p.platform || 'shopee')}')`,
  `openAuthenticReviewsModal(this, '\${escapeHtml(p.sku_id)}', '\${escapeHtml(p.product_name)}', \${Number(p.observed_price) || 0}, '\${escapeHtml(p.platform || 'shopee')}')`
);
console.log('[OK] Patch 10: Updated dorm-sku-card immutable data-product-payload & button DOM triggers');

// Patch 11: Embed 5 Contracts & Raw Review Math Schema
const fiveContractsEmbed = `
// ============================================================================
// JAYT-451: THE 5 MANDATORY TECHNICAL CONTRACTS ENGINE
// ============================================================================
const JAYT_FIVE_CONTRACTS = Object.freeze({
  createOfferContract: function(data = {}) {
    const offer_id = String(data.offer_id || data.sku_id || data.id || '').trim();
    const offer_version = String(data.offer_version || '1.0.0').trim();
    const product_id = String(data.product_id || data.itemId || data.sku_id || offer_id).trim();
    const title = String(data.title || data.product_name || '').trim();
    const platform = String(data.platform || 'shopee').toLowerCase();
    const tier = String(data.tier || 'GENERIC_VALUE').toUpperCase();
    const route_id = String(data.route_id || ('route_' + platform + '_' + offer_id));
    const observed_price = Number(data.observed_price || data.price || 0);
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
      status: data.status || 'ACTIVE',
      created_at: data.created_at || new Date().toISOString()
    });
  },
  validateOfferContract: function(c) {
    if (!c || c.contract_type !== 'OFFER_CONTRACT') return { valid: false, error: 'Invalid contract type' };
    if (!c.offer_id) return { valid: false, error: 'Missing offer_id' };
    if (!c.product_id) return { valid: false, error: 'Missing product_id' };
    if (!['BRAND_MALL', 'GENERIC_VALUE'].includes(c.tier)) return { valid: false, error: 'Invalid tier' };
    return { valid: true };
  },
  createEvidenceContract: function(data = {}) {
    const claim_evidence_id = data.claim_evidence_id ? String(data.claim_evidence_id).trim() : null;
    const isVerified = Boolean(claim_evidence_id && data.source_ref);
    return Object.freeze({
      contract_type: 'EVIDENCE_CONTRACT',
      claim_id: String(data.claim_id || ('CLAIM_' + Date.now())),
      claim_evidence_id,
      claim_type: data.claim_type || 'PRICE_DISCOUNT',
      status: isVerified ? 'VERIFIED' : 'CLAIM_BLOCKED',
      verified: isVerified,
      source_ref: data.source_ref || null,
      sha256: data.sha256 || null,
      observed_at: data.observed_at || new Date().toISOString()
    });
  },
  validateEvidenceContract: function(c) {
    if (!c || c.contract_type !== 'EVIDENCE_CONTRACT') return { valid: false, error: 'Invalid contract type' };
    if (!c.claim_evidence_id || !c.source_ref) return { valid: false, error: 'CLAIM_BLOCKED' };
    return { valid: true, status: c.status };
  },
  createSavingsContract: function(data = {}) {
    const base_price = Number(data.base_price || data.original_price || 0);
    const target_price = Number(data.target_price || data.observed_price || 0);
    const savings_amount = Math.max(0, base_price - target_price);
    const savings_pct = base_price > 0 ? Math.round((savings_amount / base_price) * 100) : 0;
    let calculation_mode = data.calculation_mode || 'ESTIMATED';
    if (data.is_verified_receipt && data.receipt_id) calculation_mode = 'VERIFIED';
    else if (data.requires_dynamic_voucher) calculation_mode = 'CONDITIONAL';
    return Object.freeze({
      contract_type: 'SAVINGS_CONTRACT',
      offer_id: String(data.offer_id || data.sku_id || ''),
      base_price,
      target_price,
      savings_amount,
      savings_pct,
      currency: 'VND',
      calculation_mode,
      claim_accuracy_guarantee: 'độ chính xác của claim phải được kiểm chứng 100% theo evidence contract',
      condition_terms: data.condition_terms || 'Giá quan sát tại thời điểm kiểm tra.',
      computed_at: new Date().toISOString()
    });
  },
  validateSavingsContract: function(c) {
    if (!c || c.contract_type !== 'SAVINGS_CONTRACT') return { valid: false, error: 'Invalid contract type' };
    if (!['VERIFIED', 'ESTIMATED', 'CONDITIONAL'].includes(c.calculation_mode)) return { valid: false, error: 'Invalid calculation_mode' };
    return { valid: true };
  },
  createRouteContract: function(data = {}) {
    const platform = String(data.platform || 'shopee').toLowerCase();
    let route_type = data.route_type || 'PRODUCT';
    if (data.is_voucher_hub || data.isVoucherPortal) route_type = 'VOUCHER_HUB';
    else if (data.is_food_portal || ['shopeefood', 'grabfood'].includes(platform)) route_type = 'FOOD_PORTAL';
    let destination_url = String(data.destination_url || data.pdpUrl || data.canonical_url || '');
    if (platform === 'shopee') destination_url = destination_url.replace(/shopee_store_/g, '');
    if (platform === 'tiktok' && route_type === 'PRODUCT' && destination_url.includes('/search')) {
      throw new Error('RouteContract: /search is FORBIDDEN as destination for TikTok Product CTA');
    }
    return Object.freeze({
      contract_type: 'ROUTE_CONTRACT',
      route_id: String(data.route_id || ('route_' + Date.now())),
      offer_id: String(data.offer_id || data.sku_id || ''),
      product_id: String(data.product_id || data.itemId || ''),
      platform,
      route_type,
      destination_url,
      deep_link_url: data.deep_link_url || null,
      affiliate_mode: 'FAIL_CLOSED',
      validated: Boolean(destination_url && destination_url.startsWith('http'))
    });
  },
  validateRouteContract: function(c) {
    if (!c || c.contract_type !== 'ROUTE_CONTRACT') return { valid: false, error: 'Invalid contract type' };
    if (!['PRODUCT', 'VOUCHER_HUB', 'FOOD_PORTAL'].includes(c.route_type)) return { valid: false, error: 'Invalid route_type' };
    if (c.route_type === 'PRODUCT' && (!c.destination_url || c.destination_url.includes('/search'))) {
      return { valid: false, error: 'Product CTA must route directly to PDP, not search' };
    }
    return { valid: true };
  },
  createOutcomeContract: function(data = {}) {
    const current_stage = data.current_stage || 'IMPRESSION';
    const stages = ['IMPRESSION','ROUTE_REQUESTED','ROUTE_RESOLVED','PLATFORM_OPENED','ATTRIBUTED_ORDER','VALIDATED_ORDER','COMMISSION_PENDING','COMMISSION_APPROVED','COMMISSION_PAID'];
    return Object.freeze({
      contract_type: 'OUTCOME_CONTRACT',
      transition_id: String(data.transition_id || ('TRANS_' + Date.now())),
      offer_id: String(data.offer_id || ''),
      route_id: String(data.route_id || ''),
      current_stage,
      lifecycle_stages: stages,
      invariant_rule: 'CLICK != REVENUE',
      attributed_commission: Number(data.attributed_commission || 0),
      is_revenue_recognized: ['COMMISSION_APPROVED', 'COMMISSION_PAID'].includes(current_stage),
      recorded_at: new Date().toISOString()
    });
  },
  validateOutcomeContract: function(c) {
    if (!c || c.contract_type !== 'OUTCOME_CONTRACT') return { valid: false, error: 'Invalid contract type' };
    if (['IMPRESSION', 'ROUTE_REQUESTED', 'ROUTE_RESOLVED', 'PLATFORM_OPENED'].includes(c.current_stage)) {
      if (c.is_revenue_recognized || c.attributed_commission > 0) {
        return { valid: false, error: 'Invariant violation: CLICK != REVENUE' };
      }
    }
    return { valid: true };
  }
});
`;

// Insert 5 Contracts engine before window exports
content = content.replace(
  'window.dispatchRadarPlatform = dispatchRadarPlatform;',
  fiveContractsEmbed + '\nwindow.JAYT_FIVE_CONTRACTS = JAYT_FIVE_CONTRACTS;\nwindow.dispatchRadarPlatform = dispatchRadarPlatform;'
);
console.log('[OK] Patch 11: Embedded JAYT_FIVE_CONTRACTS engine');

fs.writeFileSync(APEX_PATH, content, 'utf8');
console.log(`[DONE] Successfully patched ${APEX_PATH} (${content.length} bytes)`);
