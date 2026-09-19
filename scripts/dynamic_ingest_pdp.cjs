/**
 * JAYT DYNAMIC INGESTION PIPELINE (J416)
 * 
 * Mandate: CHAIRMAN_DIRECTIVE_20260917_REALTIME_CONTROL_PLANE_AND_DYNAMIC_INGESTION
 * Purpose: Cổng nạp dữ liệu nhanh không cần sửa file code trung tâm.
 *          Tự động bóc tách thông số sản phẩm (itemId, shopId, biến thể),
 *          kiểm tra mã giảm Shopee Video/Live, bọc mã đối tác chính thức:
 *            - Shopee: 17372870594
 *            - Lazada: 262501305
 *            - TikTok Shop: VNVNLCB6LYL3
 *          Tự động ghi vào dynamic_sku_registry.json để web client fetch & merge runtime.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_REGISTRY = path.join(ROOT_DIR, '05_DEAL_AND_AFFILIATE/dynamic_sku_registry.json');
const PUBLIC_REGISTRY = path.join(ROOT_DIR, 'deploy/public/dynamic_sku_registry.json');

const PARTNER_IDS = Object.freeze({
  shopee: '17372870594',
  lazada: '262501305',
  tiktok: 'VNVNLCB6LYL3'
});

/**
 * Parse raw marketplace product URL
 */
function parseRawProductUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();

  // Shopee patterns
  if (trimmed.includes('shopee.vn')) {
    const productMatch = trimmed.match(/\/product\/(\d+)\/(\d+)/);
    const dashMatch = trimmed.match(/-i\.(\d+)\.(\d+)/);
    const queryMatch = trimmed.match(/[?&]itemid=(\d+)/i);
    const shopQueryMatch = trimmed.match(/[?&]shopid=(\d+)/i);
    const modelMatch = trimmed.match(/[?&]modelId=(\d+)/i);

    let shopId = null;
    let itemId = null;
    let modelId = modelMatch ? modelMatch[1] : null;

    if (productMatch) {
      shopId = productMatch[1];
      itemId = productMatch[2];
    } else if (dashMatch) {
      shopId = dashMatch[1];
      itemId = dashMatch[2];
    } else if (queryMatch) {
      itemId = queryMatch[1];
      shopId = shopQueryMatch ? shopQueryMatch[1] : null;
    }

    if (itemId) {
      return {
        platform: 'shopee',
        itemId,
        shopId,
        modelId,
        pdpUrl: `https://shopee.vn/product/${shopId || '0'}/${itemId}${modelId ? `?modelId=${modelId}` : ''}`,
        partnerId: PARTNER_IDS.shopee,
        wrappedDeepLink: `shopeevn://product?partner=${PARTNER_IDS.shopee}&itemid=${itemId}${shopId ? `&shopid=${shopId}` : ''}${modelId ? `&modelId=${modelId}` : ''}`
      };
    }
  }

  // Lazada patterns
  if (trimmed.includes('lazada.vn')) {
    const itemMatch = trimmed.match(/-i(\d+)(?:-s(\d+))?\.html/i);
    if (itemMatch) {
      const itemId = itemMatch[1];
      const skuId = itemMatch[2] || null;
      return {
        platform: 'lazada',
        itemId,
        skuId,
        pdpUrl: `https://www.lazada.vn/products/-i${itemId}${skuId ? `-s${skuId}` : ''}.html`,
        partnerId: PARTNER_IDS.lazada,
        wrappedDeepLink: `lazada://item?pid=${PARTNER_IDS.lazada}&item_id=${itemId}${skuId ? `&sku=${skuId}` : ''}`
      };
    }
  }

  // TikTok Shop patterns
  if (trimmed.includes('tiktok.com')) {
    const prodMatch = trimmed.match(/\/view\/product\/(\d+)/);
    const variantMatch = trimmed.match(/[?&]variant_id=(\d+)/i);
    if (prodMatch) {
      const productId = prodMatch[1];
      const variantId = variantMatch ? variantMatch[1] : null;
      return {
        platform: 'tiktok',
        productId,
        itemId: productId,
        variantId,
        pdpUrl: `https://shop.tiktok.com/view/product/${productId}${variantId ? `?variant_id=${variantId}` : ''}`,
        partnerId: PARTNER_IDS.tiktok,
        wrappedDeepLink: `snssdk1180://ec/product?id=${productId}${variantId ? `&variant_id=${variantId}` : ''}&code=${PARTNER_IDS.tiktok}`
      };
    }
  }

  return null;
}

/**
 * Calculate smart dynamic price range
 */
function calculateSmartPriceRange(listingPrice, observedPrice, voucherSaving = 0) {
  const listing = Math.round(Number(listingPrice) || 0);
  const observed = Math.round(Number(observedPrice) || listing);
  const saving = Math.round(Number(voucherSaving) || 0);
  const floorPrice = Math.max(1000, observed - saving);

  const formatVnd = (n) => n.toLocaleString('vi-VN') + '₫';

  return {
    listingPrice: listing,
    observedPrice: observed,
    floorPrice: floorPrice,
    maxSaving: (listing - floorPrice),
    rangeDisplay: `Giá tham khảo ${formatVnd(listing)} · Săn tại sàn: chỉ từ ${formatVnd(floorPrice)} – ${formatVnd(observed)} khi áp mã`,
    voucherRangeDisplay: `Giá sàn sau voucher: chỉ từ ${formatVnd(floorPrice)} – ${formatVnd(observed)} khi áp mã`,
    badgeDisplay: `Săn từ ${formatVnd(floorPrice)}`
  };
}

/**
 * Ingest SKU into dynamic registry
 */
function ingestDynamicSku(skuPayload) {
  const parsedUrl = parseRawProductUrl(skuPayload.rawUrl || skuPayload.url);
  if (!parsedUrl) {
    throw new Error('Không thể phân tích định dạng URL: ' + (skuPayload.rawUrl || skuPayload.url));
  }

  const priceCalc = calculateSmartPriceRange(
    skuPayload.listingPrice || skuPayload.observedPrice * 1.2,
    skuPayload.observedPrice || 100000,
    skuPayload.voucherDiscount || 25000
  );

  const skuId = skuPayload.skuId || `DYNAMIC_SKU_${Date.now()}_${parsedUrl.itemId}`;
  const record = {
    sku_id: skuId,
    product_name: skuPayload.title || 'Sản phẩm nạp tự động qua Dynamic Ingestion',
    platform: parsedUrl.platform,
    category: skuPayload.category || 'Tiện ích sinh viên',
    partner_id: parsedUrl.partnerId,
    item_id: parsedUrl.itemId,
    shop_id: parsedUrl.shopId || null,
    model_id: parsedUrl.modelId || parsedUrl.skuId || parsedUrl.variantId || null,
    canonical_url: parsedUrl.pdpUrl,
    official_deep_link: parsedUrl.wrappedDeepLink,
    observed_price: priceCalc.observedPrice,
    listing_price: priceCalc.listingPrice,
    floor_price: priceCalc.floorPrice,
    price_display: priceCalc.observedPrice.toLocaleString('vi-VN') + '₫',
    price_range_display: priceCalc.rangeDisplay,
    voucher_range_display: priceCalc.voucherRangeDisplay,
    voucher_code: skuPayload.voucherCode || null,
    voucher_type: skuPayload.voucherType || (skuPayload.voucherCode ? 'CLAIMABLE' : null),
    available: true,
    ingested_at: new Date().toISOString(),
    ingestion_source: 'OPC_JAYT_DYNAMIC_CONTROL_PLANE'
  };

  // Read existing registries
  let registryData = { dynamic_skus: [], dynamic_triplets: [], dynamic_vouchers: [] };
  if (fs.existsSync(SRC_REGISTRY)) {
    try {
      registryData = JSON.parse(fs.readFileSync(SRC_REGISTRY, 'utf8'));
    } catch (_) {}
  }

  // Update or append
  const idx = (registryData.dynamic_skus || []).findIndex(s => s.sku_id === skuId || s.item_id === parsedUrl.itemId);
  if (idx >= 0) {
    registryData.dynamic_skus[idx] = record;
  } else {
    if (!registryData.dynamic_skus) registryData.dynamic_skus = [];
    registryData.dynamic_skus.push(record);
  }

  registryData.last_updated_utc = new Date().toISOString();

  // Save to both locations
  fs.writeFileSync(SRC_REGISTRY, JSON.stringify(registryData, null, 2), 'utf8');
  const pubDir = path.dirname(PUBLIC_REGISTRY);
  if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true });
  fs.writeFileSync(PUBLIC_REGISTRY, JSON.stringify(registryData, null, 2), 'utf8');

  console.log(`[DYNAMIC INGESTION SUCCESS] SKU: ${skuId} | Platform: ${parsedUrl.platform} | Price: ${record.price_range_display}`);
  return record;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--test-sample')) {
    console.log('=== RUNNING DYNAMIC INGESTION SAMPLE TEST ===');
    const sampleRecord = ingestDynamicSku({
      skuId: 'DYNAMIC_SAMPLE_SHIN_CASE_TEST',
      title: 'Ốp lưng Shin Cậu Bé Bút Chì Chống Sốc Shopee Mall',
      url: 'https://shopee.vn/product/89827191/26609048170?modelId=235048271',
      listingPrice: 45000,
      observedPrice: 24050,
      voucherDiscount: 7215,
      voucherCode: 'CASEVIP10',
      voucherType: 'CLAIMABLE',
      category: 'Phụ kiện điện thoại'
    });
    console.log('Sample Ingested Successfully:', sampleRecord.sku_id);
    process.exit(0);
  }
}

module.exports = {
  PARTNER_IDS,
  parseRawProductUrl,
  calculateSmartPriceRange,
  ingestDynamicSku
};
