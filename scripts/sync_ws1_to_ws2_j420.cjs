const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ws1 = path.resolve(__dirname, '..');
const ws2 = path.resolve(__dirname, '../../JayT-Dự-Án-Giá-Trị-Cộng-Đồng');

console.log('WS1:', ws1);
console.log('WS2:', ws2);

const filesToSync = [
  '03_SOURCE_OF_TRUTH/jayt_apex_interface.js',
  'deploy/jayt_apex_interface.js',
  'deploy/public/jayt_apex_interface.js',
  'deploy/jayt_apex_interface.js.sha256',
  'deploy/api/resolve-link.js',
  'api/resolve-link.js',
  'scripts/verify_pipeline_seal.cjs',
  '01_EXECUTIVE_COUNCIL/JAYT_420_CEO_HOTFIX_SHORTLINK_DISPATCH.md',
  '04_DATA_PIPELINE/dispatch/WORK_ORDER_J420_HOTFIX_SHORTLINK.json',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_420_HOTFIX_SHORTLINK_RECEIPT.json',
  '07_QUALITY_ASSURANCE/runtime_evidence/j420_live_shortlink_resolved_iphone.png',
  '07_QUALITY_ASSURANCE/test_j419_hotfix_shortlink_and_deep_verdict.cjs'
];

let allMatch = true;
for (const rel of filesToSync) {
  const p1 = path.join(ws1, rel);
  const p2 = path.join(ws2, rel);

  if (!fs.existsSync(p1)) {
    console.warn('[MISSING WS1]:', rel);
    continue;
  }

  const dir2 = path.dirname(p2);
  if (!fs.existsSync(dir2)) fs.mkdirSync(dir2, { recursive: true });

  fs.copyFileSync(p1, p2);

  const h1 = crypto.createHash('sha256').update(fs.readFileSync(p1)).digest('hex');
  const h2 = crypto.createHash('sha256').update(fs.readFileSync(p2)).digest('hex');

  if (h1 === h2) {
    console.log('[MATCH 100%]:', rel, h1.slice(0, 16) + '...');
  } else {
    console.error('[MISMATCH]:', rel);
    allMatch = false;
  }
}

console.log('\nSync Result:', allMatch ? 'PASS TUYỆT ĐỐI (100% BIT-PARITY)' : 'FAIL');
