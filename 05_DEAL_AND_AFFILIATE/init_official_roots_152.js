/**
 * JAYT OFFICIAL ROOT SOURCES INITIALIZER (152)
 * Directive: JAYT-152: OFFICIAL ROOT DISCOVERY & LEAF RE-CAPTURE CAMPAIGN
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const rootsOutputPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'official_root_sources_152.json');

const OFFICIAL_32_ROOTS = [
  // COHORT A — CINEMA & ENTERTAINMENT (7 Brands)
  { brand_id: 'GALAXY_CINEMA', brand_name: 'Galaxy Cinema Vietnam', cohort_151: 'COHORT_A_CINEMA_ENTERTAINMENT', category: 'CINEMA', root_url: 'https://www.galaxycine.vn/' },
  { brand_id: 'CGV_CINEMAS', brand_name: 'CGV Cinemas Vietnam', cohort_151: 'COHORT_A_CINEMA_ENTERTAINMENT', category: 'CINEMA', root_url: 'https://www.cgv.vn/' },
  { brand_id: 'LOTTE_CINEMA', brand_name: 'Lotte Cinema Vietnam', cohort_151: 'COHORT_A_CINEMA_ENTERTAINMENT', category: 'CINEMA', root_url: 'https://www.lottecinemavn.com/' },
  { brand_id: 'METIZ_CINEMA', brand_name: 'Metiz Cinema Da Nang', cohort_151: 'COHORT_A_CINEMA_ENTERTAINMENT', category: 'CINEMA', root_url: 'https://metiz.vn/' },
  { brand_id: 'STARLIGHT_CINEMA', brand_name: 'Starlight Cinema Da Nang', cohort_151: 'COHORT_A_CINEMA_ENTERTAINMENT', category: 'CINEMA', root_url: 'https://starlight.vn/' },
  { brand_id: 'VINWONDERS_DN', brand_name: 'VinWonders Nam Hội An', cohort_151: 'COHORT_A_CINEMA_ENTERTAINMENT', category: 'ENTERTAINMENT', root_url: 'https://vinwonders.com/vi/vinwonders-nam-hoi-an/' },
  { brand_id: 'SUNWORLD_BANA', brand_name: 'Sun World Ba Na Hills', cohort_151: 'COHORT_A_CINEMA_ENTERTAINMENT', category: 'ENTERTAINMENT', root_url: 'https://banahills.sunworld.vn/' },

  // COHORT B — F&B & COFFEE (17 Brands)
  { brand_id: 'KFC_VN', brand_name: 'KFC Vietnam', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'FAST_FOOD', root_url: 'https://kfcvietnam.com.vn/' },
  { brand_id: 'JOLLIBEE_VN', brand_name: 'Jollibee Vietnam', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'FAST_FOOD', root_url: 'https://jollibee.com.vn/' },
  { brand_id: 'LOTTERIA_VN', brand_name: 'Lotteria Vietnam', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'FAST_FOOD', root_url: 'https://www.lotteria.vn/' },
  { brand_id: 'PIZZA_HUT_VN', brand_name: 'Pizza Hut Vietnam', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'PIZZA', root_url: 'https://pizzahut.vn/' },
  { brand_id: 'DOMINOS_PIZZA_VN', brand_name: "Domino's Pizza Vietnam", cohort_151: 'COHORT_B_FNB_COFFEE', category: 'PIZZA', root_url: 'https://dominos.vn/' },
  { brand_id: 'TEXAS_CHICKEN_VN', brand_name: 'Texas Chicken Vietnam', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'FAST_FOOD', root_url: 'https://texaschicken.vn/' },
  { brand_id: 'POPEYES_VN', brand_name: 'Popeyes Vietnam', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'FAST_FOOD', root_url: 'https://popeyes.vn/' },
  { brand_id: 'KICHI_KICHI', brand_name: 'Kichi-Kichi Hotpot', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'HOTPOT', root_url: 'https://kichi.com.vn/' },
  { brand_id: 'GOGI_HOUSE', brand_name: 'Gogi House Vietnam', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'BBQ', root_url: 'https://gogi.com.vn/' },
  { brand_id: 'HIGHLANDS_COFFEE', brand_name: 'Highlands Coffee', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'COFFEE', root_url: 'https://www.highlandscoffee.com.vn/' },
  { brand_id: 'PHUC_LONG', brand_name: 'Phúc Long Coffee & Tea', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'TEA_COFFEE', root_url: 'https://phuclong.com.vn/' },
  { brand_id: 'THE_COFFEE_HOUSE', brand_name: 'The Coffee House', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'COFFEE', root_url: 'https://thecoffeehouse.com/' },
  { brand_id: 'GONG_CHA_VN', brand_name: 'Gong Cha Vietnam', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'MILK_TEA', root_url: 'https://gongcha.com.vn/' },
  { brand_id: 'KOI_THE_VN', brand_name: 'KOI Thé Vietnam', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'MILK_TEA', root_url: 'https://koithe.com/' },
  { brand_id: 'BASKIN_ROBBINS_VN', brand_name: 'Baskin Robbins Vietnam', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'ICE_CREAM', root_url: 'https://baskinrobbins.vn/' },
  { brand_id: 'TRUNG_NGUYEN_LEGEND', brand_name: 'Trung Nguyên Legend', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'COFFEE', root_url: 'https://trungnguyenlegend.com/' },
  { brand_id: 'MIXUE_VN', brand_name: 'Mixue Vietnam', cohort_151: 'COHORT_B_FNB_COFFEE', category: 'ICE_CREAM_TEA', root_url: 'https://mixue.vn/' },

  // COHORT C — TRANSIT & STUDENT UTILITY (8 Brands)
  { brand_id: 'DANABUS_DN', brand_name: 'DanaBus (Xe Buýt Đà Nẵng)', cohort_151: 'COHORT_C_TRANSIT_STUDENT', category: 'PUBLIC_TRANSIT', root_url: 'https://danangbus.vn/' },
  { brand_id: 'DSVN_RAILWAYS', brand_name: 'Đường Sắt Việt Nam (DSVN)', cohort_151: 'COHORT_C_TRANSIT_STUDENT', category: 'RAILWAY', root_url: 'https://dsvn.vn/' },
  { brand_id: 'GA_DA_NANG', brand_name: 'Ga Đà Nẵng', cohort_151: 'COHORT_C_TRANSIT_STUDENT', category: 'RAILWAY_STATION', root_url: 'http://gadanang.vn/' },
  { brand_id: 'GITHUB_EDU', brand_name: 'GitHub Education', cohort_151: 'COHORT_C_TRANSIT_STUDENT', category: 'STUDENT_UTILITY', root_url: 'https://education.github.com/pack' },
  { brand_id: 'SPOTIFY_STUDENT', brand_name: 'Spotify Vietnam Student', cohort_151: 'COHORT_C_TRANSIT_STUDENT', category: 'STUDENT_UTILITY', root_url: 'https://www.spotify.com/vn-vi/student/' },
  { brand_id: 'NOTION_EDU', brand_name: 'Notion Education', cohort_151: 'COHORT_C_TRANSIT_STUDENT', category: 'STUDENT_UTILITY', root_url: 'https://www.notion.so/product/notion-for-education' },
  { brand_id: 'JETBRAINS_EDU', brand_name: 'JetBrains Student Pack', cohort_151: 'COHORT_C_TRANSIT_STUDENT', category: 'STUDENT_UTILITY', root_url: 'https://www.jetbrains.com/community/education/#students' },
  { brand_id: 'CANVA_EDU', brand_name: 'Canva for Education', cohort_151: 'COHORT_C_TRANSIT_STUDENT', category: 'STUDENT_UTILITY', root_url: 'https://www.canva.com/education/' }
];

function initOfficialRoots152() {
  const rootData = {
    registry_id: 'OFFICIAL_ROOT_SOURCES_152',
    directive: 'JAYT-152: OFFICIAL ROOT DISCOVERY & LEAF RE-CAPTURE CAMPAIGN',
    created_at: new Date().toISOString(),
    total_roots: OFFICIAL_32_ROOTS.length,
    cohort_breakdown: {
      COHORT_A_CINEMA_ENTERTAINMENT: OFFICIAL_32_ROOTS.filter(r => r.cohort_151 === 'COHORT_A_CINEMA_ENTERTAINMENT').length,
      COHORT_B_FNB_COFFEE: OFFICIAL_32_ROOTS.filter(r => r.cohort_151 === 'COHORT_B_FNB_COFFEE').length,
      COHORT_C_TRANSIT_STUDENT: OFFICIAL_32_ROOTS.filter(r => r.cohort_151 === 'COHORT_C_TRANSIT_STUDENT').length
    },
    roots: OFFICIAL_32_ROOTS
  };

  fs.writeFileSync(rootsOutputPath, JSON.stringify(rootData, null, 2), 'utf8');
  console.log(`✅ [ROOTS-152] Initialized ${OFFICIAL_32_ROOTS.length} official root sources across 3 cohorts at: ${rootsOutputPath}`);
  return rootData;
}

if (require.main === module) {
  initOfficialRoots152();
}

module.exports = {
  initOfficialRoots152,
  OFFICIAL_32_ROOTS
};
