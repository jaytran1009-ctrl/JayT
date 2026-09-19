/**
 * JAYT AFFILIATE & MAP API PERMISSION GATE (162)
 * Directive: JAYT-162: 5 CATEGORY HUBS, TRUSTED-AUTOMATION ONLY
 * 
 * CORE RULES:
 * 1. Zero scraping of Google Maps, photos, reviews or Places content without license.
 * 2. ShopeeFood, Grab, Be, Shopee, TikTok, Klook, Accesstrade require verified credentials or authorized export.
 * 3. When unauthorized: strictly returns UNAUTHORIZED_TRACKED_SOURCE_ONLY. Zero synthetic deep links or vouchers.
 */

const SUPPORTED_COMMERCIAL_PLATFORMS = [
  'SHOPEE_FOOD',
  'GRAB_VIETNAM',
  'BE_GROUP',
  'SHOPEE_VN',
  'TIKTOK_SHOP_VN',
  'KLOOK_VN',
  'ACCESSTRADE_VN',
  'GOOGLE_PLACES_API'
];

function checkPlatformPermission(platformId, credentialsStore = {}) {
  if (!SUPPORTED_COMMERCIAL_PLATFORMS.includes(platformId)) {
    return {
      is_authorized: false,
      status: 'PLATFORM_UNSUPPORTED',
      display_mode: 'TRACKED_SOURCE_CARD_ONLY',
      notice: 'Nền tảng chưa được hỗ trợ trong danh mục thương mại.'
    };
  }

  const creds = credentialsStore[platformId];
  if (!creds || !creds.api_key_or_token || creds.is_verified !== true) {
    return {
      is_authorized: false,
      status: 'UNAUTHORIZED_TRACKED_SOURCE_ONLY',
      display_mode: 'TRACKED_SOURCE_CARD_ONLY',
      can_generate_deep_links: false,
      can_publish_deals: false,
      notice: `Chưa có thỏa thuận kết nối hoặc API credential chính thức với ${platformId}. Chỉ hiển thị source card tham khảo; không cào app và không tạo voucher giả.`
    };
  }

  return {
    is_authorized: true,
    status: 'AUTHORIZED_FEED_ACTIVE',
    display_mode: 'AUTHORIZED_COMMERCIAL_ACTIONS',
    can_generate_deep_links: true,
    can_publish_deals: true,
    feed_id: creds.feed_id,
    authorized_at: creds.authorized_at
  };
}

module.exports = {
  SUPPORTED_COMMERCIAL_PLATFORMS,
  checkPlatformPermission
};
