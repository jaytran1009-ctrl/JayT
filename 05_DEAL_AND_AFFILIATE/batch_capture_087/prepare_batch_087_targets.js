const fs = require('fs');
const path = require('path');

const rawTargets = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'discovered_subpage_targets_raw.json'), 'utf8')
);

// Group by sector and select distinct, valid URLs
const curatedBatch = [
  // --- COHORT 1: CINEMA (8 targets) ---
  { id: 'CINEMA_METIZ_SUPER_MONDAY', sector: 'CINEMA', brand: 'Metiz Cinema', domain: 'metiz.vn', url: 'https://metiz.vn/tin-va-khuyen-mai/super-monday-gia-ve-chi-55k-cac-ngay-thu-2-hang-tuan/' },
  { id: 'CINEMA_METIZ_U22_MEMBER', sector: 'CINEMA', brand: 'Metiz Cinema', domain: 'metiz.vn', url: 'https://metiz.vn/tin-va-khuyen-mai/u22-gia-ve-uu-dai-cho-thanh-vien-duoi-22-tuoi/' },
  { id: 'CINEMA_METIZ_COUPLE_DAY', sector: 'CINEMA', brand: 'Metiz Cinema', domain: 'metiz.vn', url: 'https://metiz.vn/tin-va-khuyen-mai/happy-couple-day-ngay-hoi-cho-cac-cap-doi/' },
  { id: 'CINEMA_LOTTE_EVENT_MOVIE_DAY', sector: 'CINEMA', brand: 'Lotte Cinema', domain: 'lottecinemavn.com', url: 'https://lottecinemavn.com/LCHS/Contents/Event/event-list.aspx' },
  { id: 'CINEMA_LOTTE_CINEMA_LIST', sector: 'CINEMA', brand: 'Lotte Cinema', domain: 'lottecinemavn.com', url: 'http://www.lottecinemavn.com/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=4&cinemaID=7001' },
  { id: 'CINEMA_BHD_SPECIAL_OFFERS', sector: 'CINEMA', brand: 'BHD Star Cineplex', domain: 'bhdstar.vn', url: 'https://bhdstar.vn/uu-dai-dac-biet/' },
  { id: 'CINEMA_BHD_HE_THONG_RAP', sector: 'CINEMA', brand: 'BHD Star Cineplex', domain: 'bhdstar.vn', url: 'https://www.bhdstar.vn/he-thong-rap/' },
  { id: 'CINEMA_GALAXY_PROMO_HOME', sector: 'CINEMA', brand: 'Galaxy Cinema', domain: 'galaxycine.vn', url: 'https://galaxycine.vn/khuyen-mai' },

  // --- COHORT 2: FNB_FASTFOOD (7 targets) ---
  { id: 'FNB_KFC_MENU_COMBO_1', sector: 'FNB_FASTFOOD', brand: 'KFC Vietnam', domain: 'kfcvietnam.com.vn', url: 'https://kfcvietnam.com.vn/combo-1-nguoi' },
  { id: 'FNB_KFC_MENU_COMBO_NHOM', sector: 'FNB_FASTFOOD', brand: 'KFC Vietnam', domain: 'kfcvietnam.com.vn', url: 'https://kfcvietnam.com.vn/combo-nhom' },
  { id: 'FNB_KFC_MENU_UU_DAI', sector: 'FNB_FASTFOOD', brand: 'KFC Vietnam', domain: 'kfcvietnam.com.vn', url: 'https://kfcvietnam.com.vn/uu-dai' },
  { id: 'FNB_LOTTERIA_MENU_PROMO', sector: 'FNB_FASTFOOD', brand: 'Lotteria Vietnam', domain: 'lotteria.vn', url: 'https://lotteria.vn/khuyen-mai' },
  { id: 'FNB_LOTTERIA_STORE_LIST', sector: 'FNB_FASTFOOD', brand: 'Lotteria Vietnam', domain: 'lotteria.vn', url: 'https://lotteria.vn/he-thong-cua-hang' },
  { id: 'FNB_DOMINOS_PROMO_HOME', sector: 'FNB_FASTFOOD', brand: "Domino's Pizza", domain: 'dominos.vn', url: 'https://dominos.vn/khuyen-mai' },
  { id: 'FNB_JOLLIBEE_PROMO_HOME', sector: 'FNB_FASTFOOD', brand: 'Jollibee Vietnam', domain: 'jollibee.com.vn', url: 'https://jollibee.com.vn/khuyen-mai' },

  // --- COHORT 3: COFFEE_TEA (8 targets) ---
  { id: 'COFFEE_PHUCLONG_HE_THONG', sector: 'COFFEE_TEA', brand: 'Phúc Long Coffee & Tea', domain: 'phuclong.com.vn', url: 'https://phuclong.com.vn/he-thong-cua-hang' },
  { id: 'COFFEE_PHUCLONG_DRINKS', sector: 'COFFEE_TEA', brand: 'Phúc Long Coffee & Tea', domain: 'phuclong.com.vn', url: 'https://phuclong.com.vn/thuc-uong' },
  { id: 'COFFEE_PHELA_STORES', sector: 'COFFEE_TEA', brand: 'Phê La', domain: 'phela.vn', url: 'https://phela.vn/he-thong-cua-hang/' },
  { id: 'COFFEE_PHELA_SAN_PHAM', sector: 'COFFEE_TEA', brand: 'Phê La', domain: 'phela.vn', url: 'https://phela.vn/san-pham/' },
  { id: 'COFFEE_KATINAT_STORE_LIST', sector: 'COFFEE_TEA', brand: 'Katinat Saigon Kafe', domain: 'katinat.vn', url: 'https://katinat.vn/cua-hang/' },
  { id: 'COFFEE_GONGCHA_PROMOTIONS', sector: 'COFFEE_TEA', brand: 'Gong Cha Vietnam', domain: 'gongcha.com.vn', url: 'https://gongcha.com.vn/tin-tuc-khuyen-mai/' },
  { id: 'COFFEE_HIGHLANDS_NEWS', sector: 'COFFEE_TEA', brand: 'Highlands Coffee', domain: 'highlandscoffee.com.vn', url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc.html' },
  { id: 'COFFEE_THECOFFEEHOUSE_HOME', sector: 'COFFEE_TEA', brand: 'The Coffee House', domain: 'thecoffeehouse.com', url: 'https://thecoffeehouse.com/' },

  // --- COHORT 4: FOOD_AND_RIDE (5 targets) ---
  { id: 'RIDE_BE_BEBIKE_SERVICE', sector: 'FOOD_AND_RIDE', brand: 'Be Group', domain: 'be.com.vn', url: 'https://be.com.vn/dich-vu/bebike/' },
  { id: 'RIDE_BE_BECAR_SERVICE', sector: 'FOOD_AND_RIDE', brand: 'Be Group', domain: 'be.com.vn', url: 'https://be.com.vn/dich-vu/becar/' },
  { id: 'RIDE_BE_BEFOOD_SERVICE', sector: 'FOOD_AND_RIDE', brand: 'Be Group', domain: 'be.com.vn', url: 'https://be.com.vn/dich-vu/befood/' },
  { id: 'RIDE_SHOPEEFOOD_HOME', sector: 'FOOD_AND_RIDE', brand: 'ShopeeFood Vietnam', domain: 'shopeefood.vn', url: 'https://shopeefood.vn/' },
  { id: 'RIDE_GRAB_PROMOTIONS', sector: 'FOOD_AND_RIDE', brand: 'Grab Vietnam', domain: 'grab.com', url: 'https://grab.com/vn/blog/' },

  // --- COHORT 5: ECOMMERCE_WALLETS (7 targets) ---
  { id: 'WALLET_MOMO_PROMO_LIST', sector: 'ECOMMERCE_WALLETS', brand: 'Ví MoMo', domain: 'momo.vn', url: 'https://momo.vn/tin-tuc/khuyen-mai' },
  { id: 'WALLET_MOMO_PROMO_CHONMOMO', sector: 'ECOMMERCE_WALLETS', brand: 'Ví MoMo', domain: 'momo.vn', url: 'https://momo.vn/tin-tuc/khuyen-mai/ban-moi-nhap-ma-chonmomo-co-qua-500000d-giam-8225' },
  { id: 'WALLET_MOMO_PROMO_CINEMA', sector: 'ECOMMERCE_WALLETS', brand: 'Ví MoMo', domain: 'momo.vn', url: 'https://momo.vn/cinema' },
  { id: 'WALLET_ZALOPAY_PROMO_LIST', sector: 'ECOMMERCE_WALLETS', brand: 'Ví ZaloPay', domain: 'zalopay.vn', url: 'https://zalopay.vn/khuyen-mai' },
  { id: 'WALLET_ZALOPAY_PROMO_DETAIL_VINPEARL', sector: 'ECOMMERCE_WALLETS', brand: 'Ví ZaloPay', domain: 'zalopay.vn', url: 'https://zalopay.vn/khuyen-mai/vinpearl' },
  { id: 'WALLET_VNPAY_PROMOTIONS', sector: 'ECOMMERCE_WALLETS', brand: 'VNPAY', domain: 'vnpay.vn', url: 'https://vnpay.vn/khuyen-mai' },
  { id: 'WALLET_SHOPEE_PROMO_HOME', sector: 'ECOMMERCE_WALLETS', brand: 'Shopee Vietnam', domain: 'shopee.vn', url: 'https://shopee.vn/m/ma-giam-gia' }
];

console.log(`Total Curated Targets for 087 Batch: ${curatedBatch.length}`);
console.log('Breakdown by sector:');
const counts = {};
curatedBatch.forEach(t => counts[t.sector] = (counts[t.sector] || 0) + 1);
console.log(counts);

fs.writeFileSync(
  path.join(__dirname, 'batch_087_curated_targets.json'),
  JSON.stringify(curatedBatch, null, 2),
  'utf8'
);
