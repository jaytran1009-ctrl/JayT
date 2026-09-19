const fs = require('fs');
const path = require('path');

const apexPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let content = fs.readFileSync(apexPath, 'utf8');

console.log('Original content length:', content.length);

// 1. Purge all shopee_store_ from J387_DORM_SKUS merchant_id
const beforeShopeeStoreCount = (content.match(/shopee_store_/g) || []).length;
content = content.replace(/"merchant_id":\s*"shopee_store_(\d+)"/g, '"merchant_id": "$1"');
const afterShopeeStoreCount = (content.match(/shopee_store_/g) || []).length;
console.log(`Purged shopee_store_ from merchant_id: before ${beforeShopeeStoreCount}, after ${afterShopeeStoreCount}`);

// 2. Add data-product-payload to renderJ465DormSkuCard
const oldCardTag = '<article class="dorm-sku-card" data-sku-id="${escapeHtml(p.sku_id)}"';
const newCardTag = '<article class="dorm-sku-card" data-sku-id="${escapeHtml(p.sku_id)}" data-product-payload="${escapeHtml(JSON.stringify({ skuId: p.sku_id, title: p.product_name, cleanTitle: p.product_name, price: p.observed_price, platform: \'shopee\', rawUrl: p.canonical_url }))}"';
if (content.includes(oldCardTag)) {
  content = content.replace(oldCardTag, newCardTag);
  console.log('Added data-product-payload to renderJ465DormSkuCard');
} else {
  console.warn('Could not find oldCardTag in renderJ465DormSkuCard');
}

// 3. Add data-product-payload to btn-master-winner-action (template string version)
const oldWinnerBtn = 'data-search-query="${escapeHtml((radar.masterWinner && radar.masterWinner.payload && radar.masterWinner.payload.searchQuery) || \'\')}"\n          onclick="dispatchRadarPlatform(\'master_winner\', \'trusted\', this)"';
const newWinnerBtn = 'data-search-query="${escapeHtml((radar.masterWinner && radar.masterWinner.payload && radar.masterWinner.payload.searchQuery) || \'\')}"\n          data-product-payload="${escapeHtml(JSON.stringify((radar.masterWinner && radar.masterWinner.payload) || {}))}"\n          onclick="dispatchRadarPlatform(\'master_winner\', \'trusted\', this)"';
if (content.includes(oldWinnerBtn)) {
  content = content.replace(oldWinnerBtn, newWinnerBtn);
  console.log('Added data-product-payload to btn-master-winner-action (template string)');
} else {
  console.warn('Could not find oldWinnerBtn in template string');
}

// 4. Add data-product-payload to btn-master-winner-action (string concat version)
const oldWinnerBtnConcat = "'data-search-query=\"' + escapeHtml((radar.masterWinner && radar.masterWinner.payload && radar.masterWinner.payload.searchQuery) || '') + '\" ' +\n          'onclick=\"dispatchRadarPlatform(\\'master_winner\\', \\'trusted\\', this)\"'";
const newWinnerBtnConcat = "'data-search-query=\"' + escapeHtml((radar.masterWinner && radar.masterWinner.payload && radar.masterWinner.payload.searchQuery) || '') + '\" ' +\n          'data-product-payload=\"' + escapeHtml(JSON.stringify((radar.masterWinner && radar.masterWinner.payload) || {})) + '\" ' +\n          'onclick=\"dispatchRadarPlatform(\\'master_winner\\', \\'trusted\\', this)\"'";
if (content.includes(oldWinnerBtnConcat)) {
  content = content.replace(oldWinnerBtnConcat, newWinnerBtnConcat);
  console.log('Added data-product-payload to btn-master-winner-action (concat)');
} else {
  console.warn('Could not find oldWinnerBtnConcat');
}

// 5. Add data-product-payload to btn-review-modal-buy-action
const oldReviewBuyBtn = 'data-search-query="${escapeHtml(targetPayload && targetPayload.searchQuery || \'\')}"\n          onclick="triggerJaytSensoryFeedback(event); dispatchReviewModalBuyAction(this);"';
const newReviewBuyBtn = 'data-search-query="${escapeHtml(targetPayload && targetPayload.searchQuery || \'\')}"\n          data-product-payload="${escapeHtml(JSON.stringify(targetPayload || {}))}"\n          onclick="triggerJaytSensoryFeedback(event); dispatchReviewModalBuyAction(this);"';
if (content.includes(oldReviewBuyBtn)) {
  content = content.replace(oldReviewBuyBtn, newReviewBuyBtn);
  console.log('Added data-product-payload to btn-review-modal-buy-action');
} else {
  console.warn('Could not find oldReviewBuyBtn');
}

// 6. Update dispatchRadarPlatform to read data-product-payload
const targetDispatchRadar = "  // JAYT-443 MARTIAL LAW STATE-INTEGRITY SANITY CHECK: Cross-Category Contamination Neutralization";
const replacementDispatchRadar = `  // JAYT-444 MARTIAL LAW: Read immutable data-product-payload from button or parent card
  if (triggerBtn && triggerBtn.dataset && triggerBtn.dataset.productPayload) {
    try {
      const directPayload = JSON.parse(triggerBtn.dataset.productPayload);
      if (directPayload && (directPayload.pdpUrl || directPayload.searchQuery || directPayload.cleanTitle)) {
        if (!targetPlatform) targetPlatform = {};
        targetPlatform.payload = Object.assign({}, targetPlatform.payload || {}, directPayload);
      }
    } catch (e) {}
  } else if (triggerBtn && triggerBtn.closest) {
    const cardEl = triggerBtn.closest('[data-product-payload]');
    if (cardEl && cardEl.dataset && cardEl.dataset.productPayload) {
      try {
        const cardPayload = JSON.parse(cardEl.dataset.productPayload);
        if (cardPayload && (cardPayload.pdpUrl || cardPayload.searchQuery || cardPayload.cleanTitle)) {
          if (!targetPlatform) targetPlatform = {};
          targetPlatform.payload = Object.assign({}, targetPlatform.payload || {}, cardPayload);
        }
      } catch (e) {}
    }
  }

  // JAYT-443 MARTIAL LAW STATE-INTEGRITY SANITY CHECK: Cross-Category Contamination Neutralization`;

if (content.includes(targetDispatchRadar)) {
  content = content.replace(targetDispatchRadar, replacementDispatchRadar);
  console.log('Updated dispatchRadarPlatform with immutable data-product-payload read');
} else {
  console.warn('Could not find targetDispatchRadar');
}

// 7. Update dispatchReviewModalBuyAction to read data-product-payload
const targetDispatchReview = "    if (directUrl) {\n      targetPayload = { pdpUrl: directUrl, cleanTitle: cleanTitle, isSearchFallback: false };\n    } else if (searchQuery) {\n      targetPayload = { searchQuery: searchQuery, cleanTitle: cleanTitle, isSearchFallback: true, isTrustedShop: true };\n    }\n  }";
const replacementDispatchReview = `    if (triggerBtn.dataset.productPayload) {
      try {
        const parsedPayload = JSON.parse(triggerBtn.dataset.productPayload);
        if (parsedPayload && (parsedPayload.pdpUrl || parsedPayload.searchQuery || parsedPayload.cleanTitle)) {
          targetPayload = Object.assign({ cleanTitle: cleanTitle }, parsedPayload);
        }
      } catch (e) {}
    }
    if (!targetPayload) {
      if (directUrl) {
        targetPayload = { pdpUrl: directUrl, cleanTitle: cleanTitle, isSearchFallback: false };
      } else if (searchQuery) {
        targetPayload = { searchQuery: searchQuery, cleanTitle: cleanTitle, isSearchFallback: true, isTrustedShop: true };
      }
    }
  }`;

if (content.includes(targetDispatchReview)) {
  content = content.replace(targetDispatchReview, replacementDispatchReview);
  console.log('Updated dispatchReviewModalBuyAction with immutable data-product-payload read');
} else {
  console.warn('Could not find targetDispatchReview');
}

fs.writeFileSync(apexPath, content, 'utf8');
console.log('Saved updated SSOT. New length:', content.length);
