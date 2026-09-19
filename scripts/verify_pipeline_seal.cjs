/**
 * JAYT-465 Pipeline Seal Verifier
 *
 * Verifies 24 immutable static artifacts and independently validates the
 * append-only scheduler log. Every natural scheduler run appends to that log.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const SEALED_FILES = [
  ['03_SOURCE_OF_TRUTH/jayt_apex_interface.js', 1103674, 'd253c768aa86014ebd0fc584ee6156a5f53c3f52eacfb1ca381f189e334cd5ca'],
  ['deploy/jayt_apex_interface.js', 1103674, 'd253c768aa86014ebd0fc584ee6156a5f53c3f52eacfb1ca381f189e334cd5ca'],
  ['deploy/public/jayt_apex_interface.js', 1103674, 'd253c768aa86014ebd0fc584ee6156a5f53c3f52eacfb1ca381f189e334cd5ca'],
  ['03_SOURCE_OF_TRUTH/index.html', 1764, '7c50eaf32c058e147e1753b45ebb5a6f69f7aba5d2f7e74d5bb13342cb35c598'],
  ['deploy/index.html', 1764, '7c50eaf32c058e147e1753b45ebb5a6f69f7aba5d2f7e74d5bb13342cb35c598'],
  ['deploy/public/index.html', 1764, '7c50eaf32c058e147e1753b45ebb5a6f69f7aba5d2f7e74d5bb13342cb35c598'],
  ['deploy/published_manifest.json', 10915, '06354a2245701f706319b43af8bc999b159884829cab53a3e787750e605865f1'],
  ['deploy/deals_feed.json', 5256, '9ccccd4f6fc32a2314b35e6f18ab8f94bd2d69108702e0485d03abe0eb5135c8'],
  ['scripts/j392_scheduler_runner.cjs', 6226, 'b8b3634b81778acc5b00592f048ae68bf8e1cd24b5dcbc26ed12eff5b09e8477'],
  ['04_DATA_PIPELINE/capture_shopeefood_danang_w2.cjs', 8611, '351a6587d5b29cfb94ca9e045e960de57fab142ce6324b23e90ea3279cf9426b'],
  ['04_DATA_PIPELINE/capture_and_extract_r3_relational.js', 23214, '27e2b6d121e9bdb45fbb49ab69083358be334239e0364df2aab1bbf7c414002a'],
  ['06_TRUST_AND_EVIDENCE/j392/deals/metiz_relational_scope_r3_20260911T080230_RECEIPT.json', 17893, '35048eb45af76c1643f4794fce33bcc1eff2f51d6fa2c19496aa20759eb4167a'],
  ['06_TRUST_AND_EVIDENCE/j392/deals/metiz_u22_offer_r3_20260911T080230.html', 104616, 'c28588c90144e181df2242ab1dabf3c2b0b16830ea7e3f5d7fc352abf315d393'],
  ['06_TRUST_AND_EVIDENCE/j392/deals/metiz_u22_offer_r3_20260911T080230.png', 707270, 'cf647e2a32902734210078b1ef3000273c8804b71e6d8e4ea804257037bc4f82'],
  ['06_TRUST_AND_EVIDENCE/j392/deals/deal_04_galaxy_happy_day_r3_20260911T080230_RECEIPT.json', 3727, '1ef8a62921eeed5371a2e8b5d4f18fb0c4c4bda92edb6b2534378f596f6e27c5'],
  ['06_TRUST_AND_EVIDENCE/j392/deals/deal_04_galaxy_happy_day_r3_20260911T080230.html', 214784, '544aeb4ae4002a12ec63922bd5b121783dea75a2e26f9cbeb71557d91ab678fd'],
  ['06_TRUST_AND_EVIDENCE/j392/deals/deal_04_galaxy_happy_day_r3_20260911T080230.png', 912796, 'f228a843a0ddd16172b8aeaab90b914c924cecb98418b11e0a155169b406488a'],
  ['01_EXECUTIVE_COUNCIL/JAYT_392_CEO_R3_WAVE1_EVIDENCE_ACCEPTANCE_AND_SYSTEM_RELEASE_HOLD.md', 2634, 'bc71fb730daeb6eb520633c1745383e1e17e2ae894d1189b4274371be71872f9'],
  ['01_EXECUTIVE_COUNCIL/JAYT_392_CEO_R5_NATURAL_SCHEDULER_ACCEPTANCE_AND_SYSTEM_RELEASE_HOLD.md', 2382, 'fc1c04cfe7d32c512b565c72bcb53bf51b0d5bdd509052196d2e8be4580c41de'],
  ['01_EXECUTIVE_COUNCIL/JAYT_394_CEO_STAGING_ACCEPTANCE_AND_WAVE2_RELEASE_HOLD.md', 1559, '1e254d08bde765a0f54990dc1f9bd9fa04609312bf403f461ef333db5f0a52a8'],
  ['08_RELEASE_VAULT/W2_STAGE_TO_PROD_RELEASE_MANIFEST.json', 5338, '0f8915bcef40321457d016100236220bf6b307c8a6e5e7237fd35d913c77345f'],
  ['07_QUALITY_ASSURANCE/runtime_evidence/W2_STAGING_WIDGET_LOCAL_AUDIT_RECEIPT.json', 2868, '75dace324ce6cce3365b587946591a36a81f69b6f6b517d3a7a123e882bac565'],
  ['01_EXECUTIVE_COUNCIL/JAYT_394_W2_STAGE_PACKAGING_AND_DUAL_KEY_HOLD.md', 1446, '8a39ec530085bd057f149cdd06ffdeee2bc19389d903503fa30d2e40d1c0e646'],
  ['07_QUALITY_ASSURANCE/runtime_evidence/JAYT_394_USER_DRIVEN_STAGING_AUDIT_RECEIPT.json', 2113, 'c46531b72a01f7c7d0998b7d5f554a655b1674d4eef77e1b4a4a2373f8892d26']
];

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function verifyStaticSeal() {
  let passed = 0;
  console.log('=== JAYT-465: 24 STATIC SEALED FILES ===');
  for (const [relativePath, expectedBytes, expectedHash] of SEALED_FILES) {
    const fullPath = path.join(ROOT_DIR, relativePath);
    if (!fs.existsSync(fullPath)) {
      console.error(`[DRIFT] Missing: ${relativePath}`);
      continue;
    }
    const data = fs.readFileSync(fullPath);
    const actualHash = sha256(data);
    if (data.length === expectedBytes && actualHash === expectedHash) {
      passed += 1;
      console.log(`[OK] ${relativePath}`);
    } else {
      console.error(`[DRIFT] ${relativePath}`);
      console.error(`  expected ${expectedBytes} bytes / ${expectedHash}`);
      console.error(`  actual   ${data.length} bytes / ${actualHash}`);
    }
  }
  console.log(`Static seal: ${passed}/${SEALED_FILES.length}`);
  return passed === SEALED_FILES.length;
}

function verifyRuntimeLogHealth() {
  const relativePath = '07_QUALITY_ASSURANCE/runtime_evidence/j392_scheduler_run.log';
  const fullPath = path.join(ROOT_DIR, relativePath);
  console.log('\n=== JAYT-465: INDEPENDENT RUNTIME LOG HEALTH GATE ===');
  if (!fs.existsSync(fullPath)) {
    console.error(`[FAIL] Missing runtime log: ${relativePath}`);
    return false;
  }
  const data = fs.readFileSync(fullPath, 'utf8').trim();
  if (!data) {
    console.error('[FAIL] Runtime log is empty.');
    return false;
  }
  const lastLine = data.split(/\r?\n/).filter(Boolean).at(-1);
  let record;
  try {
    record = JSON.parse(lastLine);
  } catch {
    console.error('[FAIL] Last runtime record is not valid JSON.');
    return false;
  }
  const healthy = record.status === 'HEALTHY' && record.exit_code === 0;
  console.log(`Runtime log: ${Buffer.byteLength(data, 'utf8')} bytes; latest status=${record.status}; exit_code=${record.exit_code}`);
  if (!healthy) console.error('[FAIL] Latest scheduler record is not HEALTHY with exit_code 0.');
  return healthy;
}

const staticPass = verifyStaticSeal();
const runtimePass = verifyRuntimeLogHealth();
if (staticPass && runtimePass) {
  console.log('\n24/24 Files In Sealed State (PASS TUYỆT ĐỐI)');
  process.exit(0);
}
console.error('\nPIPELINE SEAL FAILED');
process.exit(1);
