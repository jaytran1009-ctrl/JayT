const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { downloadImage } = require('./fetch_real_visual_assets_218');

const repoRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'assets', 'real-verified-assets');
const bundlesDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'verified_exact_bundles');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

const ADDITIONAL_VENUE_AND_PROMO_CANDIDATES = [
  // 5. Autodesk Education
  {
    card_id: 'CARD_217_11_AUTODESK_EDU',
    deal_id: 'CLM_208_11_AUTODESK_EDU',
    brand: 'Autodesk Education',
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'autodesk-education-official-logo.png',
    source_url: 'https://www.autodesk.com/education/edu-software/overview',
    image_source_url: 'https://damassets.autodesk.net/content/dam/autodesk/images/logos/autodesk-primary-logo-black.png',
    rights_basis: 'OFFICIAL_BRAND_MEDIA_PRESS_KIT',
    relation: 'Autodesk Education Community - Sinh viên kỹ thuật, kiến trúc ĐH Bách Khoa ĐN'
  },
  // 6. Domino's Pizza
  {
    card_id: 'CARD_217_05_DOMINOS_DISCOUNT',
    deal_id: 'CLM_208_05_DOMINOS_DISCOUNT',
    brand: "Domino's Pizza",
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'dominos-pizza-official-logo.png',
    source_url: 'https://dominos.vn/khuyen-mai',
    image_source_url: 'https://dominos.vn/img-redesign/logo-domino.svg',
    rights_basis: 'OFFICIAL_BRAND_WEBSITE_PUBLIC_ASSET',
    relation: "Domino's Pizza - Nguyễn Văn Linh & Hùng Vương, Đà Nẵng"
  },
  // 7. CGV Vinh Trung Plaza Da Nang
  {
    card_id: 'CARD_217_16_CGV_VINHTRUNG',
    deal_id: 'CLM_208_16_CGV_VINHTRUNG',
    brand: 'CGV Vĩnh Trung Plaza',
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'cgv-cinemas-official-logo.png',
    source_url: 'https://www.cgv.vn/default/cinox/site/cgv-vinh-trung-plaza',
    image_source_url: 'https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png',
    rights_basis: 'OFFICIAL_BRAND_WEBSITE_PUBLIC_ASSET',
    relation: 'CGV Cinemas - Tầng 3 Vĩnh Trung Plaza, 255-257 Hùng Vương, Thanh Khê, Đà Nẵng'
  },
  // 8. Highlands Coffee Da Nang
  {
    card_id: 'CARD_217_17_HIGHLANDS_DN',
    deal_id: 'CLM_208_17_HIGHLANDS_DN',
    brand: 'Highlands Coffee Đà Nẵng',
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'highlands-coffee-official-logo.png',
    source_url: 'https://www.highlandscoffee.com.vn/vn/he-thong-cua-hang.html',
    image_source_url: 'https://www.highlandscoffee.com.vn/vnt_upload/weblink/logo_highlands.svg',
    rights_basis: 'OFFICIAL_BRAND_WEBSITE_PUBLIC_ASSET',
    relation: 'Highlands Coffee - Chi nhánh Nguyễn Văn Linh & Bạch Đằng, Hải Châu, Đà Nẵng'
  },
  // 9. Danabus Public Bus Da Nang
  {
    card_id: 'CARD_217_23_DANABUS_PUBLIC',
    deal_id: 'CLM_208_23_DANABUS_PUBLIC',
    brand: 'Xe Buýt Danabus Đà Nẵng',
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'danabus-danang-official-logo.png',
    source_url: 'https://danabus.vn/he-thong-tuyen.html',
    image_source_url: 'https://danabus.vn/assets/images/logo.png',
    rights_basis: 'OFFICIAL_PUBLIC_TRANSPORT_PORTAL_ASSET',
    relation: 'Danabus - 497 Bùi Thị Xuân, Sơn Trà & Toàn bộ mạng lưới tuyến nội đô Đà Nẵng'
  },
  // 10. Cổng Dịch Vụ Công Đà Nẵng
  {
    card_id: 'CARD_217_24_DVC_DANANG',
    deal_id: 'CLM_208_24_DVC_DANANG',
    brand: 'Cổng Dịch Vụ Công Đà Nẵng',
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'dvc-danang-official-emblem.png',
    source_url: 'https://dichvucong.danang.gov.vn',
    image_source_url: 'https://dichvucong.danang.gov.vn/themes/custom/dvc_danang/logo.png',
    rights_basis: 'OFFICIAL_GOVERNMENT_PORTAL_PUBLIC_EMBLEM',
    relation: 'Trung Tâm Hành Chính & Cổng Dịch Vụ Công TP Đà Nẵng, 24 Trần Phú, Hải Châu'
  }
];

async function fetchAdditionalAssets() {
  console.log('📡 Fetching additional genuine assets...\n');
  const results = [];

  for (const item of ADDITIONAL_VENUE_AND_PROMO_CANDIDATES) {
    console.log(`Checking ${item.brand}...`);
    try {
      const { buffer, contentType } = await downloadImage(item.image_source_url);
      const hash = sha256Buf(buffer);
      const localFilePath = path.join(assetsDir, item.target_filename);
      fs.writeFileSync(localFilePath, buffer);

      const bundleDir = path.join(bundlesDir, item.card_id);
      if (!fs.existsSync(bundleDir)) fs.mkdirSync(bundleDir, { recursive: true });
      fs.writeFileSync(path.join(bundleDir, item.target_filename), buffer);

      const receipt = {
        card_id: item.card_id,
        brand: item.brand,
        deal_id: item.deal_id,
        visual_kind: item.visual_kind,
        target_filename: item.target_filename,
        source_url: item.source_url,
        image_source_url: item.image_source_url,
        content_type: contentType,
        size_bytes: buffer.length,
        sha256: hash,
        captured_at: new Date().toISOString(),
        rights_basis: item.rights_basis,
        relation: item.relation,
        verifier: 'JayT Real Content Supply Engine JAYT-218'
      };
      fs.writeFileSync(path.join(bundleDir, 'CAPTURE_RECEIPT.json'), JSON.stringify(receipt, null, 2), 'utf8');

      results.push({
        ...item,
        sha256: hash,
        size_bytes: buffer.length,
        local_path: `assets/real-verified-assets/${item.target_filename}`,
        bundle_path: path.relative(repoRoot, bundleDir)
      });
      console.log(`   ✅ Succeeded: ${buffer.length} bytes (SHA: ${hash.substring(0, 16)}...)`);
    } catch (err) {
      console.warn(`   ⚠️ Skipped ${item.brand}: ${err.message}`);
    }
  }

  return results;
}

if (require.main === module) {
  fetchAdditionalAssets().catch(console.error);
}

module.exports = { fetchAdditionalAssets };
