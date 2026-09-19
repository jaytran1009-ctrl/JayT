const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const WS1 = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const WS2 = 'd:/Công Việc MMO/OPC JayT/JayT-Dự-Án-Giá-Trị-Cộng-Đồng';

const filesToSync = [
  '03_SOURCE_OF_TRUTH/jayt_apex_interface.js',
  'deploy/jayt_apex_interface.js',
  'deploy/public/jayt_apex_interface.js',
  'deploy/jayt_apex_interface.js.sha256',
  'scripts/verify_pipeline_seal.cjs',
  'scripts/verify_remote_j421.cjs',
  'scripts/verify_live_j421_iphone.cjs',
  '07_QUALITY_ASSURANCE/test_j421_buying_advisory_engine.cjs',
  '01_EXECUTIVE_COUNCIL/JAYT_421_CEO_ADVISORY_ENGINE_DISPATCH.md',
  '04_DATA_PIPELINE/dispatch/WORK_ORDER_J421_ADVISORY_ENGINE.json',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_421_ADVISORY_ENGINE_RECEIPT.json',
  '07_QUALITY_ASSURANCE/runtime_evidence/j421_live_advisory_engine_iphone.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j421_live_inline_advisory_iphone.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j421_live_advisory_bottom_iphone.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j421_live_advisory_pillars_iphone.png'
];

console.log('=== SYNCING J421 DELIVERABLES: WS1 -> WS2 ===\n');

let allMatch = true;
for (const relPath of filesToSync) {
  const p1 = path.join(WS1, relPath);
  const p2 = path.join(WS2, relPath);

  if (!fs.existsSync(p1)) {
    console.error(`[ERROR] Missing in WS1: ${relPath}`);
    allMatch = false;
    continue;
  }

  const p2Dir = path.dirname(p2);
  if (!fs.existsSync(p2Dir)) {
    fs.mkdirSync(p2Dir, { recursive: true });
  }

  fs.copyFileSync(p1, p2);

  const b1 = fs.readFileSync(p1);
  const b2 = fs.readFileSync(p2);
  const h1 = crypto.createHash('sha256').update(b1).digest('hex');
  const h2 = crypto.createHash('sha256').update(b2).digest('hex');

  if (h1 === h2 && b1.length === b2.length) {
    console.log(`[OK] ${relPath} (${b1.length} bytes, SHA: ${h1.slice(0, 16)}...)`);
  } else {
    console.error(`[MISMATCH] ${relPath}`);
    allMatch = false;
  }
}

if (allMatch) {
  console.log('\n=== WS1 <-> WS2 100% BIT-PARITY ACHIEVED FOR ALL J421 ARTIFACTS ===');
  process.exit(0);
} else {
  console.error('\n=== WS1 <-> WS2 PARITY FAILED ===');
  process.exit(1);
}
