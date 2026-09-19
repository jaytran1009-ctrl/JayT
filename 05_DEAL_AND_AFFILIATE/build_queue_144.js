/**
 * JAYT BATCH 144 QUEUE GENERATOR (30+ SOURCES, 80+ LEAF URLS)
 * Directive: JAYT-144: SCHEDULER THẬT, QUÉT ĐA NGUỒN VÀ VÒNG LẶP CUNG ỨNG TỰ VẬN HÀNH
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const queuePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_queue.json');

// 32 Official Brand Sources
const brandSources = [
  // Cinema (5)
  { brand_id: 'GALAXY_CINEMA', brand_name: 'Galaxy Cinema Vietnam', category: 'CINEMA', locator: 'https://www.galaxycine.vn/rap-gia-ve', leaves: [
    'https://www.galaxycine.vn/khuyen-mai/t2-vui-ve-ngap-tran-uu-dai/',
    'https://www.galaxycine.vn/khuyen-mai/ngay-tri-an-thanh-vien--ngay-hoi-bap-nuoc/',
    'https://www.galaxycine.vn/khuyen-mai/u22-vui-ve--gia-ve-sieu-hat-de/',
    'https://www.galaxycine.vn/khuyen-mai/galaxy-cinema-ra-mat-phim-hay-thang-8/'
  ]},
  { brand_id: 'CGV_CINEMAS', brand_name: 'CGV Cinemas Vietnam', category: 'CINEMA', locator: 'https://www.cgv.vn/default/cinox/site/', leaves: [
    'https://www.cgv.vn/default/culture-day',
    'https://www.cgv.vn/default/u22-vn',
    'https://www.cgv.vn/default/happy-wednesday'
  ]},
  { brand_id: 'LOTTE_CINEMA', brand_name: 'Lotte Cinema Vietnam', category: 'CINEMA', locator: 'https://www.lottecinemavn.com/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=5001', leaves: [
    'https://www.lottecinemavn.com/LCHS/Contents/Event/Event-List.aspx',
    'https://www.lottecinemavn.com/LCHS/Contents/Event/Event-Detail.aspx?EventID=201010010024001'
  ]},
  { brand_id: 'METIZ_CINEMA', brand_name: 'Metiz Cinema Da Nang', category: 'CINEMA', locator: 'https://metiz.vn/rap-va-gia-ve/', leaves: [
    'https://metiz.vn/khuyen-mai/',
    'https://metiz.vn/khuyen-mai/thu-2-happy-day/',
    'https://metiz.vn/khuyen-mai/u22-metiz-gia-ve-sieu-uu-dai/'
  ]},
  { brand_id: 'STARLIGHT_CINEMA', brand_name: 'Starlight Cinema Da Nang', category: 'CINEMA', locator: 'https://starlight.vn/cum-rap.html', leaves: [
    'https://starlight.vn/khuyen-mai.html',
    'https://starlight.vn/khuyen-mai/ngay-hoi-thanh-vien.html',
    'https://starlight.vn/khuyen-mai/u22-gia-ve-uu-dai.html'
  ]},

  // Fast Food & Casual Dining (9)
  { brand_id: 'KFC_VN', brand_name: 'KFC Vietnam', category: 'FNB_FASTFOOD', locator: 'https://kfcvietnam.com.vn/he-thong-nha-hang-kfc', leaves: [
    'https://kfcvietnam.com.vn/khuyen-mai',
    'https://kfcvietnam.com.vn/khuyen-mai/combo-trua-sieu-tiet-kiem'
  ]},
  { brand_id: 'JOLLIBEE_VN', brand_name: 'Jollibee Vietnam', category: 'FNB_FASTFOOD', locator: 'https://jollibee.com.vn/cua-hang', leaves: [
    'https://jollibee.com.vn/khuyen-mai',
    'https://jollibee.com.vn/khuyen-mai/combo-giam-gia-ngap-tran'
  ]},
  { brand_id: 'LOTTERIA_VN', brand_name: 'Lotteria Vietnam', category: 'FNB_FASTFOOD', locator: 'https://www.lotteria.vn/store-locator', leaves: [
    'https://www.lotteria.vn/promotions',
    'https://www.lotteria.vn/promotions/lotteria-happy-hour'
  ]},
  { brand_id: 'PIZZA_HUT_VN', brand_name: 'Pizza Hut Vietnam', category: 'FNB_FASTFOOD', locator: 'https://pizzahut.vn/store-locator', leaves: [
    'https://pizzahut.vn/promotions',
    'https://pizzahut.vn/promotions/mua-1-tang-1'
  ]},
  { brand_id: 'DOMINOS_PIZZA_VN', brand_name: 'Domino\'s Pizza Vietnam', category: 'FNB_FASTFOOD', locator: 'https://dominos.vn/store-locator', leaves: [
    'https://dominos.vn/khuyen-mai',
    'https://dominos.vn/khuyen-mai/thu-5-mua-1-tang-1-pizza'
  ]},
  { brand_id: 'TEXAS_CHICKEN_VN', brand_name: 'Texas Chicken Vietnam', category: 'FNB_FASTFOOD', locator: 'https://texaschicken.vn/he-thong-nha-hang/', leaves: [
    'https://texaschicken.vn/khuyen-mai/',
    'https://texaschicken.vn/khuyen-mai/combo-giai-nhiet-mua-he/'
  ]},
  { brand_id: 'POPEYES_VN', brand_name: 'Popeyes Vietnam', category: 'FNB_FASTFOOD', locator: 'https://popeyes.vn/he-thong-cua-hang', leaves: [
    'https://popeyes.vn/khuyen-mai',
    'https://popeyes.vn/khuyen-mai/ga-tam-nuoc-mam-uu-dai'
  ]},
  { brand_id: 'KICHI_KICHI', brand_name: 'Kichi-Kichi Hotpot', category: 'FNB_RESTAURANT', locator: 'https://kichi.com.vn/vi/he-thong-nha-hang', leaves: [
    'https://kichi.com.vn/vi/uu-dai',
    'https://kichi.com.vn/vi/uu-dai/buffet-lau-bang-chuyen-dong-gia'
  ]},
  { brand_id: 'GOGI_HOUSE', brand_name: 'Gogi House Vietnam', category: 'FNB_RESTAURANT', locator: 'https://gogi.com.vn/vi/he-thong-nha-hang', leaves: [
    'https://gogi.com.vn/vi/uu-dai',
    'https://gogi.com.vn/vi/uu-dai/thit-nuong-han-quoc-uu-dai'
  ]},

  // Coffee, Tea & Dessert (8)
  { brand_id: 'HIGHLANDS_COFFEE', brand_name: 'Highlands Coffee', category: 'COFFEE_TEA', locator: 'https://www.highlandscoffee.com.vn/vn/he-thong-cua-hang.html', leaves: [
    'https://www.highlandscoffee.com.vn/vn/tin-tuc-khuyen-mai.html',
    'https://www.highlandscoffee.com.vn/vn/tin-tuc-khuyen-mai/thu-tu-dong-gia.html'
  ]},
  { brand_id: 'PHUC_LONG', brand_name: 'Phúc Long Coffee & Tea', category: 'COFFEE_TEA', locator: 'https://phuclong.com.vn/he-thong-cua-hang-phuc-long', leaves: [
    'https://phuclong.com.vn/khuyen-mai',
    'https://phuclong.com.vn/khuyen-mai/combo-tra-banh-phuc-long'
  ]},
  { brand_id: 'THE_COFFEE_HOUSE', brand_name: 'The Coffee House', category: 'COFFEE_TEA', locator: 'https://thecoffeehouse.com/pages/danh-sach-cua-hang', leaves: [
    'https://thecoffeehouse.com/pages/khuyen-mai',
    'https://thecoffeehouse.com/pages/uu-dai-thanh-vien'
  ]},
  { brand_id: 'GONG_CHA_VN', brand_name: 'Gong Cha Vietnam', category: 'COFFEE_TEA', locator: 'https://gongcha.com.vn/cua-hang/', leaves: [
    'https://gongcha.com.vn/tin-tuc-khuyen-mai/',
    'https://gongcha.com.vn/tin-tuc-khuyen-mai/happy-tuesday-gong-cha/'
  ]},
  { brand_id: 'KOI_THE_VN', brand_name: 'KOI Thé Vietnam', category: 'COFFEE_TEA', locator: 'https://www.koithe.com/en/global/koi-vietnam', leaves: [
    'https://www.koithe.com/en/news',
    'https://www.koithe.com/en/news/koi-the-special-offer'
  ]},
  { brand_id: 'BASKIN_ROBBINS_VN', brand_name: 'Baskin Robbins Vietnam', category: 'COFFEE_TEA', locator: 'https://baskinrobbins.vn/vn/he-thong-cua-hang', leaves: [
    'https://baskinrobbins.vn/vn/tin-tuc-khuyen-mai',
    'https://baskinrobbins.vn/vn/tin-tuc-khuyen-mai/pink-day-31-kem-dong-gia'
  ]},
  { brand_id: 'TRUNG_NGUYEN_LEGEND', brand_name: 'Trung Nguyên Legend', category: 'COFFEE_TEA', locator: 'https://trungnguyenlegend.com/khong-gian-trung-nguyen-legend-cafe/', leaves: [
    'https://trungnguyenlegend.com/tin-tuc/tin-khuyen-mai/',
    'https://trungnguyenlegend.com/uu-dai-ca-phe-nang-luong/'
  ]},
  { brand_id: 'MIXUE_VN', brand_name: 'Mixue Vietnam', category: 'COFFEE_TEA', locator: 'http://www.mxbc.vn/store/index.html', leaves: [
    'http://www.mxbc.vn/news/index.html',
    'http://www.mxbc.vn/news/kem-tra-trai-cay-gia-re.html'
  ]},

  // Entertainment & Attractions (2)
  { brand_id: 'VINWONDERS_DN', brand_name: 'VinWonders Nam Hội An', category: 'ENTERTAINMENT', locator: 'https://vinwonders.com/vi/vinwonders-nam-hoi-an/', leaves: [
    'https://vinwonders.com/vi/uu-dai/',
    'https://vinwonders.com/vi/uu-dai/uu-dai-ve-vinwonders-nam-hoi-an/'
  ]},
  { brand_id: 'SUNWORLD_BANA', brand_name: 'Sun World Ba Na Hills', category: 'ENTERTAINMENT', locator: 'https://banahills.sunworld.vn/thong-tin-ve', leaves: [
    'https://banahills.sunworld.vn/tin-tuc-khuyen-mai',
    'https://banahills.sunworld.vn/tin-tuc-khuyen-mai/uu-dai-ve-cho-nguoi-da-nang'
  ]},

  // Transportation (3)
  { brand_id: 'DANABUS_DN', brand_name: 'DanaBus (Xe Buýt Đà Nẵng)', category: 'TRANSPORTATION', locator: 'https://danangbus.vn/lo-trinh-cac-tuyen.html', leaves: [
    'https://danangbus.vn/ve-xe-buyt.html',
    'https://danangbus.vn/chinh-sach-ve-thang-sinh-vien.html'
  ]},
  { brand_id: 'DSVN_RAILWAYS', brand_name: 'Đường Sắt Việt Nam (DSVN)', category: 'TRANSPORTATION', locator: 'https://dsvn.vn/#/thongtindichvu/tintuc/Ch%C3%ADnh%20s%C3%A1ch%20gi%E1%BA%A3m%20gi%C3%A1%20v%C3%A9%20cho%20sinh%20vi%C3%AAn', leaves: [
    'https://dsvn.vn/#/thongtindichvu/tintuc/Ch%C3%ADnh%20s%C3%A1ch%20gi%E1%BA%A3m%20gi%C3%A1%20v%C3%A9%20cho%20sinh%20vi%C3%AAn',
    'https://dsvn.vn/#/thongtindichvu/tintuc/Giam-gia-ve-tau-hoc-sinh-sinh-vien'
  ]},
  { brand_id: 'GA_DA_NANG', brand_name: 'Ga Đà Nẵng', category: 'TRANSPORTATION', locator: 'http://gadanang.vn/gio-tau-gia-ve', leaves: [
    'http://gadanang.vn/tin-tuc-khuyen-mai',
    'http://gadanang.vn/chinh-sach-uu-dai-ve-tau'
  ]},

  // Public Utilities & Student Services (5)
  { brand_id: 'GITHUB_EDU', brand_name: 'GitHub Education', category: 'STUDENT_UTILITIES', locator: 'https://education.github.com/pack', leaves: [
    'https://education.github.com/pack',
    'https://education.github.com/benefits'
  ]},
  { brand_id: 'SPOTIFY_STUDENT', brand_name: 'Spotify Vietnam Student', category: 'STUDENT_UTILITIES', locator: 'https://www.spotify.com/vn-vi/student/', leaves: [
    'https://www.spotify.com/vn-vi/student/',
    'https://www.spotify.com/vn-vi/premium/#plans'
  ]},
  { brand_id: 'NOTION_EDU', brand_name: 'Notion Education', category: 'STUDENT_UTILITIES', locator: 'https://www.notion.so/product/notion-for-education', leaves: [
    'https://www.notion.so/product/notion-for-education',
    'https://www.notion.so/pricing'
  ]},
  { brand_id: 'JETBRAINS_EDU', brand_name: 'JetBrains Student Pack', category: 'STUDENT_UTILITIES', locator: 'https://www.jetbrains.com/community/education/#students', leaves: [
    'https://www.jetbrains.com/community/education/#students',
    'https://www.jetbrains.com/shop/eform/students'
  ]},
  { brand_id: 'CANVA_EDU', brand_name: 'Canva for Education', category: 'STUDENT_UTILITIES', locator: 'https://www.canva.com/education/', leaves: [
    'https://www.canva.com/education/',
    'https://www.canva.com/education/students/'
  ]}
];

// Compile 84 items: Cohort A (32 Locators) + Cohort B & C (52 Leaves/Utilities)
const queueItems = [];

// Cohort A: 32 Store Locators
brandSources.forEach((b, idx) => {
  queueItems.push({
    capture_id: `CAP_144_A_${String(idx + 1).padStart(2, '0')}`,
    brand_id: b.brand_id,
    brand_name: b.brand_name,
    category: b.category,
    cohort: 'COHORT_A_LOCALITY',
    target_type: 'STORE_LOCATOR',
    url: b.locator
  });
});

// Cohorts B & C: Leaves & Utilities
let leafIdx = 1;
brandSources.forEach(b => {
  const isUtility = b.category === 'TRANSPORTATION' || b.category === 'STUDENT_UTILITIES';
  const cohortName = isUtility ? 'COHORT_C_UTILITY_STUDENT' : 'COHORT_B_OFFICIAL_OFFER_LEAF';
  b.leaves.forEach(leafUrl => {
    queueItems.push({
      capture_id: `CAP_144_B_${String(leafIdx).padStart(2, '0')}`,
      brand_id: b.brand_id,
      brand_name: b.brand_name,
      category: b.category,
      cohort: cohortName,
      target_type: isUtility ? 'PUBLIC_UTILITY_LEAF' : 'OFFER_LEAF',
      url: leafUrl
    });
    leafIdx++;
  });
});

const queueData = {
  queue_id: 'BATCH_CAPTURE_144_QUEUE',
  directive: 'JAYT-144: SCHEDULER THẬT, QUÉT ĐA NGUỒN VÀ VÒNG LẶP CUNG ỨNG TỰ VẬN HÀNH',
  created_at: new Date().toISOString(),
  total_brand_sources: brandSources.length,
  total_urls_queued: queueItems.length,
  cohort_counts: {
    COHORT_A_LOCALITY: queueItems.filter(i => i.cohort === 'COHORT_A_LOCALITY').length,
    COHORT_B_OFFICIAL_OFFER_LEAF: queueItems.filter(i => i.cohort === 'COHORT_B_OFFICIAL_OFFER_LEAF').length,
    COHORT_C_UTILITY_STUDENT: queueItems.filter(i => i.cohort === 'COHORT_C_UTILITY_STUDENT').length
  },
  items: queueItems
};

fs.writeFileSync(queuePath, JSON.stringify(queueData, null, 2), 'utf8');
console.log(`✅ [QUEUE-144] Generated ${queueItems.length} URLs across ${brandSources.length} official brand sources at: ${queuePath}`);
