const fs = require('fs');
const path = require('path');

const feedPath = path.join(__dirname, '..', '03_SOURCE_OF_TRUTH', 'daily_supply_feed_126.json');
const feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));

const enrichMap = {
  'DEAL_120_CGV_PAYDAY_30K': {
    slot: 'SLOT_2000',
    valid_time_windows: ['SLOT_2000'],
    benefit_short: 'Giảm 30k (Từ 2 vé)',
    visual_asset_status: 'VERIFIED_EDITORIAL_ASSET',
    curated_image_url: 'assets/discovery-images/cinema-context-v1.png'
  },
  'DEAL_120_CGV_MUA1TANG1': {
    slot: 'SLOT_2000',
    valid_time_windows: ['SLOT_2000'],
    benefit_short: 'VNPAY (Mua 1 Tặng 1)',
    visual_asset_status: 'VERIFIED_EDITORIAL_ASSET',
    curated_image_url: 'assets/discovery-images/cinema-context-v1.png'
  },
  'DEAL_120_CGV_ZALOPAY_50K': {
    slot: 'SLOT_1105',
    valid_time_windows: ['SLOT_1105'],
    benefit_short: 'ZaloPay 12h-13h (Giảm 50%)',
    visual_asset_status: 'VERIFIED_EDITORIAL_ASSET',
    curated_image_url: 'assets/discovery-images/cinema-context-v1.png'
  },
  'DEAL_120_STARLIGHT_COMBO_10K': {
    slot: 'SLOT_1430',
    valid_time_windows: ['SLOT_1430'],
    benefit_short: 'Giảm 10k Combo bắp nước',
    visual_asset_status: 'VECTOR_MONOGRAM_TREATMENT',
    curated_image_url: null
  },
  'DEAL_120_METIZ_U22_AND_SUPER_MONDAY': {
    slot: 'SLOT_1730',
    valid_time_windows: ['SLOT_1730', 'SLOT_2000'],
    benefit_short: 'Đồng giá vé 45.000₫',
    visual_asset_status: 'VECTOR_MONOGRAM_TREATMENT',
    curated_image_url: null
  },
  'WATCHLIST_120_HIGHLANDS_JCB_30': {
    slot: 'SLOT_0730',
    valid_time_windows: ['SLOT_0730'],
    benefit_short: 'Thẻ JCB (Giảm 30%)',
    visual_asset_status: 'VECTOR_MONOGRAM_TREATMENT',
    curated_image_url: null
  },
  'WATCHLIST_120_WINMART_WINECO_20': {
    slot: 'SLOT_1730',
    valid_time_windows: ['SLOT_1730'],
    benefit_short: 'Hội viên WIN',
    visual_asset_status: 'VECTOR_MONOGRAM_TREATMENT',
    curated_image_url: null
  },
  'MENU_120_GOGI_HOUSE_SIGNATURE': {
    slot: 'SLOT_2000',
    valid_time_windows: ['SLOT_2000'],
    benefit_short: 'Combo nướng ~176k/người',
    visual_asset_status: 'VERIFIED_EDITORIAL_ASSET',
    curated_image_url: 'assets/discovery-images/lunch-context-v1.png'
  },
  'MENU_120_KFC_XO_HOP_CA_189K': {
    slot: 'SLOT_1730',
    valid_time_windows: ['SLOT_1730'],
    benefit_short: 'Xô Hợp Cạ 189.000₫',
    visual_asset_status: 'VECTOR_MONOGRAM_TREATMENT',
    curated_image_url: null
  },
  'MENU_120_KFC_DZUT_DEAL_88K': {
    slot: 'SLOT_1105',
    valid_time_windows: ['SLOT_1105'],
    benefit_short: 'Dzựt Deal trưa 88.000₫',
    visual_asset_status: 'VECTOR_MONOGRAM_TREATMENT',
    curated_image_url: null
  },
  'MENU_120_JOLLIBEE_COMBO_73K': {
    slot: 'SLOT_1105',
    valid_time_windows: ['SLOT_0730', 'SLOT_1105'],
    benefit_short: 'Combo gà mì ý 73.000₫',
    visual_asset_status: 'VECTOR_MONOGRAM_TREATMENT',
    curated_image_url: null
  },
  'MENU_120_PHELA_SPECIALTY': {
    slot: 'SLOT_1430',
    valid_time_windows: ['SLOT_1105', 'SLOT_1430', 'SLOT_2000'],
    benefit_short: 'Trà đặc sản ~55.000₫',
    visual_asset_status: 'VERIFIED_EDITORIAL_ASSET',
    curated_image_url: 'assets/discovery-images/coffee-context-v1.png'
  },
  'MENU_120_GONGCHA_ALISAN': {
    slot: 'SLOT_1430',
    valid_time_windows: ['SLOT_1430'],
    benefit_short: 'Trà sữa Alisan ~53.000₫',
    visual_asset_status: 'VECTOR_MONOGRAM_TREATMENT',
    curated_image_url: null
  },
  'MENU_120_PHUCLONG_TEA_BAKERY': {
    slot: 'SLOT_1430',
    valid_time_windows: ['SLOT_1430'],
    benefit_short: 'Trà đào cam sả ~55.000₫',
    visual_asset_status: 'VECTOR_MONOGRAM_TREATMENT',
    curated_image_url: null
  },
  'UTILITY_120_DANABUS_TRANSIT': {
    slot: 'SLOT_0730',
    valid_time_windows: ['SLOT_0730', 'SLOT_1730'],
    benefit_short: 'Xe buýt trợ giá 6.000₫',
    visual_asset_status: 'VECTOR_MONOGRAM_TREATMENT',
    curated_image_url: null
  }
};

function updateList(arr) {
  if (!Array.isArray(arr)) return;
  arr.forEach(item => {
    const meta = enrichMap[item.id];
    if (meta) {
      Object.assign(item, meta);
    }
  });
}

updateList(feed.limited_time_deals);
updateList(feed.watchlist_deals);
updateList(feed.planning_menu_and_utilities);
updateList(feed.verified_savings);
updateList(feed.needs_recheck_deals);
updateList(feed.public_menu_combos);

feed.directive = 'JAYT-129-MOMENT-FIT-AND-CARD-TRUTH';
feed.feed_version = '129.0.0';
feed.generated_at = new Date().toISOString();

fs.writeFileSync(feedPath, JSON.stringify(feed, null, 2), 'utf8');
console.log('✅ Đã cập nhật daily_supply_feed_126.json với chuẩn Moment-Fit 129!');
