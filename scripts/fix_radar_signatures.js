const fs = require('fs');

let code = fs.readFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js', 'utf8');

// 1. Update openSkuCrossPlatformRadar parameter handling
const oldOpenSkuRadar = `function openSkuCrossPlatformRadar(skuOrPayload, optTitle = null, optPrice = null, optPlatform = null) {
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

  if (typeof skuOrPayload === 'object' && skuOrPayload !== null) {
    p = skuOrPayload;
    skuId = String(p.sku_id || p.offer_id || p.id || p.itemId || '');
    productName = p.product_name || p.title || optTitle || 'Sản phẩm chọn lọc';
    basePrice = Number(p.observed_price || p.price || optPrice) || 69000;
    platform = (p.platform || optPlatform || 'shopee').toLowerCase();`;

const newOpenSkuRadar = `function openSkuCrossPlatformRadar(triggerOrSku, optTitle = null, optPrice = null, optPlatform = null, extraPlatform = null) {
  let skuOrPayload = triggerOrSku;
  let skuId = null;
  let productName = optTitle;
  let basePrice = optPrice;
  let platform = optPlatform || 'shopee';
  let p = null;

  // JAYT-451 P0: Extract immutable data-product-payload from triggering DOM element if passed
  if (triggerOrSku && (triggerOrSku.nodeType || (typeof triggerOrSku === 'object' && triggerOrSku._parentCard))) {
    const cardEl = triggerOrSku.closest ? triggerOrSku.closest('[data-product-payload]') : null;
    let cardPayload = null;
    if (cardEl && cardEl.dataset && cardEl.dataset.productPayload) {
      try { cardPayload = JSON.parse(cardEl.dataset.productPayload); } catch (e) {}
    }
    if (cardPayload) {
      skuOrPayload = cardPayload;
    } else {
      skuOrPayload = optTitle;
      productName = optPrice;
      basePrice = Number(optPlatform) || 69000;
      platform = extraPlatform || 'shopee';
    }
  }

  if (typeof skuOrPayload === 'object' && skuOrPayload !== null && !skuOrPayload.nodeType) {
    p = skuOrPayload;
    skuId = String(p.sku_id || p.offer_id || p.id || p.itemId || '');
    productName = p.product_name || p.title || optTitle || 'Sản phẩm chọn lọc';
    basePrice = Number(p.observed_price || p.price || optPrice) || 69000;
    platform = String(p.platform || optPlatform || 'shopee').toLowerCase();`;

if (code.includes(oldOpenSkuRadar)) {
  code = code.replace(oldOpenSkuRadar, newOpenSkuRadar);
  console.log('Updated openSkuCrossPlatformRadar successfully');
} else {
  console.log('oldOpenSkuRadar pattern not matched directly');
}

// 2. Update openAuthenticReviewsModal parameter handling
const oldOpenAuthModal = `function openAuthenticReviewsModal(skuOrProduct, optTitle = null, optPrice = null, optPlatform = null) {
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
  }`;

const newOpenAuthModal = `function openAuthenticReviewsModal(triggerOrSku, optTitle = null, optPrice = null, optPlatform = null, extraPlatform = null) {
  if (typeof triggerJaytSensoryFeedback === 'function') triggerJaytSensoryFeedback();

  let skuOrProduct = triggerOrSku;

  // JAYT-451 P0: Extract immutable data-product-payload if triggered from DOM button
  if (triggerOrSku && (triggerOrSku.nodeType || (typeof triggerOrSku === 'object' && triggerOrSku._parentCard))) {
    const cardEl = triggerOrSku.closest ? triggerOrSku.closest('[data-product-payload]') : null;
    let cardPayload = null;
    if (cardEl && cardEl.dataset && cardEl.dataset.productPayload) {
      try { cardPayload = JSON.parse(cardEl.dataset.productPayload); } catch (e) {}
    }
    if (cardPayload) {
      skuOrProduct = cardPayload.offer_id || cardPayload.sku_id || cardPayload.skuId;
      optTitle = cardPayload.cleanTitle || cardPayload.title;
      optPrice = cardPayload.observed_price || cardPayload.price;
      optPlatform = String(cardPayload.platform || 'shopee').toLowerCase();
    } else {
      skuOrProduct = optTitle;
      optTitle = optPrice;
      optPrice = Number(optPlatform) || 69000;
      optPlatform = String(extraPlatform || 'shopee').toLowerCase();
    }
  }`;

if (code.includes(oldOpenAuthModal)) {
  code = code.replace(oldOpenAuthModal, newOpenAuthModal);
  console.log('Updated openAuthenticReviewsModal successfully');
} else {
  console.log('oldOpenAuthModal pattern not matched directly');
}

fs.writeFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js', code, 'utf8');
console.log('Saved changes to 03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
