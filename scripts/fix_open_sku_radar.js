const fs = require('fs');
let code = fs.readFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js', 'utf8');

const target = `function openSkuCrossPlatformRadar(skuOrPayload, optTitle, optPrice, optPlatform) {
  if (typeof triggerJaytSensoryFeedback === 'function') {
    triggerJaytSensoryFeedback();
  }

  let skuId = '';
  let p = null;
  let basePrice = 69000;
  let productName = 'Sản phẩm chọn lọc';
  let platform = 'shopee';

  if (typeof skuOrPayload === 'object' && skuOrPayload !== null) {
    p = skuOrPayload;
    skuId = String(p.sku_id || p.offer_id || p.id || p.itemId || '');
    productName = p.product_name || p.title || optTitle || 'Sản phẩm chọn lọc';
    basePrice = Number(p.observed_price || p.price || optPrice) || 69000;
    platform = (p.platform || optPlatform || 'shopee').toLowerCase();`;

const replacement = `function openSkuCrossPlatformRadar(triggerOrSku, optTitle, optPrice, optPlatform, extraPlatform) {
  if (typeof triggerJaytSensoryFeedback === 'function') {
    triggerJaytSensoryFeedback();
  }

  let skuOrPayload = triggerOrSku;
  let skuId = '';
  let p = null;
  let basePrice = 69000;
  let productName = 'Sản phẩm chọn lọc';
  let platform = 'shopee';

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

  if (typeof skuOrPayload === 'object' && skuOrPayload !== null && !skuOrPayload.nodeType && !skuOrPayload._parentCard) {
    p = skuOrPayload;
    skuId = String(p.sku_id || p.offer_id || p.id || p.itemId || '');
    productName = p.product_name || p.title || optTitle || 'Sản phẩm chọn lọc';
    basePrice = Number(p.observed_price || p.price || optPrice) || 69000;
    platform = String(p.platform || optPlatform || 'shopee').toLowerCase();`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js', code, 'utf8');
  console.log('Successfully updated openSkuCrossPlatformRadar in SSOT');
} else {
  console.error('Target not matched');
  process.exit(1);
}
