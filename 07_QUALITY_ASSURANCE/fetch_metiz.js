const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { downloadImage } = require('./fetch_real_visual_assets_218');

const repoRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'assets', 'real-verified-assets');
const bundlesDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'verified_exact_bundles');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

async function fetchMetizLogo() {
  const item = {
    card_id: 'CARD_217_13_METIZ_HELIO',
    deal_id: 'CLM_208_13_METIZ_HELIO',
    brand: 'Metiz Cinema Helio',
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'metiz-cinema-official-logo.png',
    source_url: 'https://metiz.vn/rap-va-gia-ve.html',
    image_source_url: 'https://admin.metiz.vn/Fileuploads/images/metiz.png',
    rights_basis: 'OFFICIAL_BRAND_PORTAL_PUBLIC_ASSET',
    relation: 'Metiz Cinema - Tầng 1 Helio Center, Đường 2/9, Hải Châu, Đà Nẵng'
  };

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

    console.log(`✅ Metiz Succeeded: ${buffer.length} bytes (SHA: ${hash.substring(0, 16)}...)`);
  } catch (err) {
    console.error(`❌ Metiz Failed: ${err.message}`);
  }
}

fetchMetizLogo();
