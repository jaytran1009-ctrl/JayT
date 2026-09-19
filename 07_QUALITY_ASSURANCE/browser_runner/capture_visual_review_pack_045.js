/**
 * JAYT APEX VISUAL REVIEW PACK CAPTURE RUNNER (045C)
 * Captures pixel-perfect screenshots across viewports using real Google Chrome Headless engine.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const repoRoot = path.resolve(__dirname, '..', '..');

const { parseAndVerifyPng } = require('../validate_candidate_evidence');

const chromeCandidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.CHROME_BIN || ''
];

let chromePath = null;
for (const cand of chromeCandidates) {
  if (cand && fs.existsSync(cand)) {
    chromePath = cand;
    break;
  }
}

if (!chromePath) {
  console.error('❌ [JAYT-VISUAL-PACK-045] Không tìm thấy Chrome executable!');
  process.exit(1);
}

const outputDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'visual_pack_045');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const targetFile = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html');
const targetFileUrl = `file:///${targetFile.replace(/\\/g, '/')}`;

const VIEWPORT_TARGETS = [
  {
    name: 'home_mobile_390',
    description: 'Home Mobile Viewport (iPhone 14 standard 390x844)',
    fileName: 'jayt_apex_home_mobile_390.png',
    url: targetFileUrl,
    width: 390,
    height: 844
  },
  {
    name: 'staging_mobile_390',
    description: 'Staging Review Mobile Viewport (iPhone 14 standard 390x844)',
    fileName: 'jayt_apex_staging_mobile_390.png',
    url: `${targetFileUrl}#staging_review`,
    width: 390,
    height: 844
  },
  {
    name: 'tablet_768',
    description: 'Tablet Viewport (iPad standard 768x1024)',
    fileName: 'jayt_apex_tablet_768.png',
    url: targetFileUrl,
    width: 768,
    height: 1024
  },
  {
    name: 'desktop_1440',
    description: 'Desktop Viewport (MacBook standard 1440x900)',
    fileName: 'jayt_apex_desktop_1440.png',
    url: targetFileUrl,
    width: 1440,
    height: 900
  }
];

console.log('📸 [JAYT-VISUAL-PACK-045C] Khởi động bộ chụp ảnh kiểm chứng đa thiết bị Apex Visual (045C)...');
console.log(`🌐 Target File URL: ${targetFileUrl}`);
console.log(`🚀 Sử dụng Chrome engine: ${chromePath}`);

const manifest = {
  work_order: 'JAYT-APEX-VISUAL-045C',
  captured_at: new Date().toISOString(),
  theme: 'Light Luxury (Porcelain Base + Deep Forest Pine + Champagne Gold)',
  viewports: []
};

for (const target of VIEWPORT_TARGETS) {
  const outPath = path.join(outputDir, target.fileName);
  if (fs.existsSync(outPath)) {
    fs.unlinkSync(outPath);
  }

  const chromeArgs = [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    `--window-size=${target.width},${target.height}`,
    `--screenshot=${outPath}`,
    target.url
  ];

  try {
    execFileSync(chromePath, chromeArgs, { stdio: 'pipe', timeout: 30000 });

    if (!fs.existsSync(outPath)) {
      throw new Error(`Chrome không xuất file screenshot: ${outPath}`);
    }

    const pngBuf = fs.readFileSync(outPath);
    const sha256 = crypto.createHash('sha256').update(pngBuf).digest('hex');
    const pngParsed = parseAndVerifyPng(pngBuf);

    if (!pngParsed.ok) {
      throw new Error(`Xác thực PNG thất bại: ${pngParsed.message}`);
    }

    console.log(`  [OK] Chụp thành công ${target.description} -> ${target.fileName} (${pngBuf.length} bytes, SHA-256: ${sha256.slice(0, 12)}...)`);

    manifest.viewports.push({
      name: target.name,
      description: target.description,
      file: target.fileName,
      path: outPath,
      width: target.width,
      height: target.height,
      bytes: pngBuf.length,
      sha256: sha256,
      crc32_zlib_verified: true
    });
  } catch (err) {
    console.error(`  [FAIL] Lỗi khi chụp ${target.name}:`, err.message);
    process.exit(1);
  }
}

const manifestPath = path.join(outputDir, 'VISUAL_REVIEW_PACK_MANIFEST.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

console.log(`\n📦 Visual Review Pack Manifest đã lưu tại: ${manifestPath}`);
console.log('🟢 [JAYT-VISUAL-PACK-045C] HOÀN TẤT CHỤP BỘ ẢNH KIỂM CHỨNG ĐA THIẾT BỊ!\n');
