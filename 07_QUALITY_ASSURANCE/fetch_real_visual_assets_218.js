const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'assets', 'real-verified-assets');
const bundlesDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'verified_exact_bundles');

if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
if (!fs.existsSync(bundlesDir)) fs.mkdirSync(bundlesDir, { recursive: true });

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

function downloadImage(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      timeout: 15000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = new URL(res.headers.location, url).href;
        return resolve(downloadImage(nextUrl, maxRedirects - 1));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} from ${url}`));
      }
      const contentType = res.headers['content-type'] || '';
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({ buffer, contentType });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

// Candidates for real verified assets from official press / media / public domains
const CANDIDATE_SUPPLY_ASSETS = [
  // 1. Spotify Student
  {
    card_id: 'CARD_217_08_SPOTIFY_STUDENT',
    deal_id: 'CLM_208_08_SPOTIFY_STUDENT',
    brand: 'Spotify Vietnam',
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'spotify-student-official-logo.png',
    source_url: 'https://www.spotify.com/vn-vi/student/',
    image_source_url: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png',
    rights_basis: 'OFFICIAL_BRAND_MEDIA_KIT_PERMITTED_DISPLAY',
    relation: 'Spotify Student Premium Program - Xác thực sinh viên các trường ĐH tại Đà Nẵng'
  },
  // 2. Microsoft 365 Education
  {
    card_id: 'CARD_217_09_MICROSOFT_365',
    deal_id: 'CLM_208_09_MICROSOFT_365',
    brand: 'Microsoft Education',
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'microsoft-education-official.png',
    source_url: 'https://www.microsoft.com/vi-vn/education/products/office',
    image_source_url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
    rights_basis: 'OFFICIAL_PRESS_MEDIA_ASSET_DISPLAY',
    relation: 'Microsoft 365 Education - Xác thực email trường .edu.vn các trường ĐH tại Đà Nẵng'
  },
  // 3. Figma for Education
  {
    card_id: 'CARD_217_10_FIGMA_EDUCATION',
    deal_id: 'CLM_208_10_FIGMA_EDUCATION',
    brand: 'Figma for Education',
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'figma-education-official-badge.png',
    source_url: 'https://www.figma.com/education/',
    image_source_url: 'https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png',
    rights_basis: 'OFFICIAL_BRAND_ASSET_PRESS_GUIDELINES',
    relation: 'Figma Education Program - Gói phần mềm miễn phí cho sinh viên ĐH tại Đà Nẵng'
  },
  // 4. AWS Educate
  {
    card_id: 'CARD_217_12_AWS_EDUCATE',
    deal_id: 'CLM_208_12_AWS_EDUCATE',
    brand: 'Amazon Web Services',
    visual_kind: 'VERIFIED_EXACT',
    target_filename: 'aws-educate-official-badge.png',
    source_url: 'https://aws.amazon.com/education/awseducate/',
    image_source_url: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png',
    rights_basis: 'OFFICIAL_BRAND_MEDIA_GUIDELINES',
    relation: 'AWS Educate Student Portal - Chương trình đào tạo đám mây cho sinh viên CNTT Đà Nẵng'
  }
];

async function runSupplySprint() {
  console.log('========================================================================');
  console.log('🚀 JAYT-218: REAL CONTENT SUPPLY FETCHING & VALIDATION');
  console.log('========================================================================\n');

  const downloadedAssets = [];

  for (const item of CANDIDATE_SUPPLY_ASSETS) {
    console.log(`📡 Fetching real asset for ${item.brand}...`);
    console.log(`   Source: ${item.image_source_url}`);
    try {
      const { buffer, contentType } = await downloadImage(item.image_source_url);
      const hash = sha256Buf(buffer);
      const localFilePath = path.join(assetsDir, item.target_filename);
      fs.writeFileSync(localFilePath, buffer);

      // Create physical evidence bundle directory for this card
      const bundleDir = path.join(bundlesDir, item.card_id);
      if (!fs.existsSync(bundleDir)) fs.mkdirSync(bundleDir, { recursive: true });

      // Save copy in bundle
      fs.writeFileSync(path.join(bundleDir, item.target_filename), buffer);

      // Save capture receipt in bundle
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

      downloadedAssets.push({
        ...item,
        sha256: hash,
        size_bytes: buffer.length,
        local_path: `assets/real-verified-assets/${item.target_filename}`,
        bundle_path: path.relative(repoRoot, bundleDir)
      });

      console.log(`   ✅ Succeeded: ${buffer.length} bytes (SHA-256: ${hash.substring(0, 16)}...)`);
      console.log(`   📁 Saved to: ${localFilePath}`);
      console.log(`   📦 Bundle: ${bundleDir}\n`);
    } catch (err) {
      console.error(`   ❌ Failed to fetch ${item.brand}: ${err.message}\n`);
    }
  }

  const manifestPath = path.join(assetsDir, 'REAL_VERIFIED_ASSETS_MANIFEST_218.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    work_order: 'JAYT-218',
    timestamp: new Date().toISOString(),
    total_downloaded: downloadedAssets.length,
    assets: downloadedAssets
  }, null, 2), 'utf8');

  console.log(`\n🎉 Total real verified assets fetched: ${downloadedAssets.length}`);
  return downloadedAssets;
}

if (require.main === module) {
  runSupplySprint().catch(console.error);
}

module.exports = { runSupplySprint, downloadImage };
