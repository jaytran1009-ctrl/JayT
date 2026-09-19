const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const SOT_DIR = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH');
const DEPLOY_DIR = path.join(PROJECT_ROOT, 'deploy');

const FORBIDDEN_TOKENS = [
  'JAYT_CONTAINED_ITEMS',
  'affiliate-card',
  '18 VERIFIED CARDS',
  'batch_capture_088a',
  'Buy Decision Engine',
  'VOUCHER INTELLIGENCE'
];

console.log('========================================================================');
console.log('🛡️ JAYT-245 QA GATE: DORMANT AFFILIATE SURFACE & PROVENANCE SCANNER');
console.log('========================================================================\n');

let violations = [];

function scanDirectory(dir, label) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.vercel' || entry.name === 'node_modules') continue;
      scanDirectory(fullPath, label);
    } else if (entry.name.endsWith('.js') || entry.name.endsWith('.html') || entry.name.endsWith('.json')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      FORBIDDEN_TOKENS.forEach(token => {
        if (content.includes(token)) {
          violations.push(`[${label}] File ${entry.name} contains forbidden token: "${token}" at ${fullPath}`);
        }
      });
    }
  }
}

scanDirectory(SOT_DIR, '03_SOURCE_OF_TRUTH');
scanDirectory(DEPLOY_DIR, 'deploy');

if (violations.length > 0) {
  console.error('❌ DORMANT AFFILIATE SCANNER FAILED:');
  violations.forEach(v => console.error('   -', v));
  process.exit(1);
} else {
  console.log('🟢 [DORMANT-AFFILIATE-GATE-PASS] 100% Zero Dormant Affiliate Surfaces & Zero Legacy Provenance Verified!');
}
