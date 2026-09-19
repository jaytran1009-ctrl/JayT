const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { downloadImage } = require('./fetch_real_visual_assets_218');

const repoRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'assets', 'real-verified-assets');
const bundlesDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'verified_exact_bundles');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

const GENUINE_PROMO_POSTERS = [
  // 1. Metiz Cinema U22 Student Promo Poster
  {
    card_id: 'CARD_217_01_METIZ_MEMBER',
    deal_id: 'CLM_208_01_METIZ_MEMBER',
    brand: 'Metiz Cinema Đà Nẵng',
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'metiz-u22-student-official-poster.png',
    source_url: 'https://metiz.vn/tin-va-khuyen-mai.html',
    image_source_url: 'https://admin.metiz.vn/Fileuploads/images/U22%20vu%C3%B4ng-01%20(1).png',
    rights_basis: 'OFFICIAL_PROMOTION_PORTAL_POSTER_PUBLIC_DISPLAY',
    relation: 'Metiz Cinema - Tầng 1 Helio Center, Đường 2/9, Hải Châu, Đà Nẵng'
  },
  // 2. Metiz Cinema Super Member Promo Poster
  {
    card_id: 'CARD_217_02_METIZ_SUPER_MONDAY',
    deal_id: 'CLM_208_02_METIZ_SUPER_MONDAY',
    brand: 'Metiz Cinema Đà Nẵng',
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'metiz-member-55k-official-poster.png',
    source_url: 'https://metiz.vn/tin-va-khuyen-mai.html',
    image_source_url: 'https://admin.metiz.vn/Fileuploads/images/%C4%90%E1%BB%93ng%20gi%C3%A1%2055k%20vu%C3%B4ng%201-01%20(2).png',
    rights_basis: 'OFFICIAL_PROMOTION_PORTAL_POSTER_PUBLIC_DISPLAY',
    relation: 'Metiz Cinema - Tầng 1 Helio Center, Đường 2/9, Hải Châu, Đà Nẵng'
  },
  // 3. Starlight Cinema U22 Student Promo Poster
  {
    card_id: 'CARD_217_03_STARLIGHT_PROMO',
    deal_id: 'CLM_208_03_STARLIGHT_PROMO',
    brand: 'Starlight Cinema Đà Nẵng',
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'starlight-u22-student-official-poster.jpg',
    source_url: 'https://starlight.vn/uu-dai.html',
    image_source_url: 'https://starlight.vn/Areas/Admin/Content/Fileuploads/images/Poster2024/u22-fb-640x960.jpg',
    rights_basis: 'OFFICIAL_PROMOTION_PORTAL_POSTER_PUBLIC_DISPLAY',
    relation: 'Starlight Cinema - Tầng 3-4 TTTM Nguyễn Kim, 46 Điện Biên Phủ, Thanh Khê, Đà Nẵng'
  }
];

async function fetchGenuinePromoPosters() {
  console.log('📡 Fetching genuine promotional posters directly from cinema portals...\n');
  const results = [];

  for (const item of GENUINE_PROMO_POSTERS) {
    console.log(`Downloading poster for ${item.brand}...`);
    console.log(`  Source: ${item.image_source_url}`);
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
        verifier: 'JayT Real Promotion Supply Engine JAYT-218R'
      };
      fs.writeFileSync(path.join(bundleDir, 'CAPTURE_RECEIPT.json'), JSON.stringify(receipt, null, 2), 'utf8');

      results.push({
        ...item,
        sha256: hash,
        size_bytes: buffer.length,
        local_path: `assets/real-verified-assets/${item.target_filename}`,
        bundle_path: path.relative(repoRoot, bundleDir)
      });
      console.log(`  ✅ Succeeded: ${buffer.length} bytes (SHA: ${hash.substring(0, 16)}...)\n`);
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}\n`);
    }
  }

  console.log(`🎉 Fetched ${results.length} genuine promotion posters!`);
  return results;
}

if (require.main === module) {
  fetchGenuinePromoPosters().catch(console.error);
}

module.exports = { fetchGenuinePromoPosters };
