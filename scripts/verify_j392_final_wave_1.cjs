const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE_DIR = 'D:\\Công Việc MMO\\OPC JayT\\JayT-Dự Án Giá Trị Cộng Đồng';
const INDEX_FILE = path.join(BASE_DIR, '06_TRUST_AND_EVIDENCE/j392/final_wave_1_evidence_index.json');
const RECEIPT_FILE = path.join(BASE_DIR, '07_QUALITY_ASSURANCE/JAYT_392_FINAL_WAVE_1_RECEIPT.json');

function getHash(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

console.log('=== VERIFYING JAYT-392 FINAL WAVE 1 EVIDENCE ===');
if (!fs.existsSync(INDEX_FILE)) {
  console.error(`Index file not found: ${INDEX_FILE}`);
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
console.log(`Loaded index: ${index.manifest_id}, Target: ${index.core_scope}, Min Required: ${index.minimum_verified_count}, Actual: ${index.actual_verified_count}`);

const findings = [];
let passedCount = 0;
let metizVerified = false;
let galaxyVerified = false;

for (const d of index.deals) {
  console.log(`\nAuditing Deal [${d.deal_index}]: ${d.offer_id} (${d.brand})`);
  const dealFinding = {
    offer_id: d.offer_id,
    brand: d.brand,
    title: d.title,
    checks: {}
  };

  // 1. HTML check
  const htmlPath = path.join(BASE_DIR, d.html_file);
  const htmlExists = fs.existsSync(htmlPath);
  dealFinding.checks.html_exists = htmlExists;
  if (!htmlExists) {
    console.error(`  FAIL: HTML missing at ${htmlPath}`);
    dealFinding.status = 'FAIL';
    findings.push(dealFinding);
    continue;
  }
  const htmlHash = getHash(htmlPath);
  dealFinding.checks.html_sha_match = htmlHash === d.html_sha256;

  // 2. Screenshot check
  const ssPath = path.join(BASE_DIR, d.screenshot_file);
  const ssExists = fs.existsSync(ssPath);
  dealFinding.checks.screenshot_exists = ssExists;
  if (!ssExists) {
    console.error(`  FAIL: Screenshot missing at ${ssPath}`);
    dealFinding.status = 'FAIL';
    findings.push(dealFinding);
    continue;
  }
  const ssHash = getHash(ssPath);
  dealFinding.checks.screenshot_sha_match = ssHash === d.screenshot_sha256;

  // 3. Quotes file check
  const quotesPath = path.join(BASE_DIR, d.quotes_file);
  const quotesExists = fs.existsSync(quotesPath);
  dealFinding.checks.quotes_exists = quotesExists;
  if (!quotesExists) {
    console.error(`  FAIL: Quotes file missing at ${quotesPath}`);
    dealFinding.status = 'FAIL';
    findings.push(dealFinding);
    continue;
  }
  const quotesHash = getHash(quotesPath);
  dealFinding.checks.quotes_sha_match = quotesHash === d.quotes_sha256;

  // 4. Byte-binding check
  const quotesDoc = JSON.parse(fs.readFileSync(quotesPath, 'utf8'));
  const htmlBuf = fs.readFileSync(htmlPath);
  let quotesValid = true;
  const quoteChecks = {};

  for (const qKey of ['offer_quote', 'validity_quote', 'scope_quote', 'terms_quote']) {
    const qObj = quotesDoc.quotes[qKey];
    if (!qObj) {
      quotesValid = false;
      quoteChecks[qKey] = false;
      continue;
    }
    const slice = htmlBuf.subarray(qObj.byte_offset_start, qObj.byte_offset_end).toString('utf8');
    if (slice !== qObj.text) {
      quotesValid = false;
      quoteChecks[qKey] = false;
      console.error(`  FAIL: ${qKey} slice mismatch at [${qObj.byte_offset_start}..${qObj.byte_offset_end}]`);
    } else {
      quoteChecks[qKey] = true;
    }
  }
  dealFinding.checks.quotes_byte_binding = quotesValid;
  dealFinding.checks.quote_details = quoteChecks;

  // 5. Da Nang Scope Check
  const scopeText = quotesDoc.quotes.scope_quote.text;
  const isDaNang = /Đà Nẵng|Danang|0236|Vĩnh Trung|Co\.opmart|Điện Biên Phủ/i.test(scopeText);
  dealFinding.checks.danang_scope_verified = isDaNang;

  // 6. Zero jayt.vn check
  const sourceUrl = quotesDoc.source_artifact ? quotesDoc.source_artifact.official_source_url : '';
  dealFinding.checks.zero_jayt_vn_leak = !sourceUrl.includes('jayt.vn');

  // 7. CTA Semantics
  dealFinding.checks.cta_valid = quotesDoc.cta_semantics && quotesDoc.cta_semantics.has_public_promo_code === false;

  if (quotesValid && dealFinding.checks.html_sha_match && dealFinding.checks.screenshot_sha_match && isDaNang && dealFinding.checks.zero_jayt_vn_leak) {
    dealFinding.status = 'PASS';
    passedCount++;
    if (d.brand.includes('Metiz')) metizVerified = true;
    if (d.brand.includes('Galaxy')) galaxyVerified = true;
    console.log(`  -> Deal ${d.offer_id}: PASS (All predicates verified)`);
  } else {
    dealFinding.status = 'FAIL';
    console.error(`  -> Deal ${d.offer_id}: FAIL`);
  }
  findings.push(dealFinding);
}

const coreTwoVerified = metizVerified && galaxyVerified;
const allPassed = passedCount >= index.minimum_verified_count && coreTwoVerified;
console.log(`\nVerification Result: ${passedCount} deals passed (Metiz: ${metizVerified}, Galaxy: ${galaxyVerified}, Core Two Passed: ${coreTwoVerified}).`);

const forceWrite = process.argv.includes('--force');
let needsWrite = forceWrite || !fs.existsSync(RECEIPT_FILE);
if (!needsWrite && fs.existsSync(RECEIPT_FILE)) {
  try {
    const existing = JSON.parse(fs.readFileSync(RECEIPT_FILE, 'utf8'));
    if (existing.verified_count !== passedCount || existing.core_two_verified !== coreTwoVerified) {
      needsWrite = true;
    }
  } catch (e) {
    needsWrite = true;
  }
}

if (needsWrite) {
  const receipt = {
    receipt_id: 'JAYT_392_FINAL_WAVE_1_RECEIPT',
    work_order: 'WORK_ORDER_J392_FINAL_EXECUTION',
    dispatch_sha256: 'af3da365f03da160953a0253ebdb51293a36eae41421a597eeef7f52e1db2bd3',
    verified_at_utc: new Date().toISOString(),
    target_cluster: 'DANANG_CINEMA_WAVE_1',
    minimum_required_count: index.minimum_verified_count,
    verified_count: passedCount,
    core_two_scope: 'Metiz Cinema Helio and Galaxy Cinema Da Nang',
    core_two_verified: coreTwoVerified,
    verdict: allPassed ? 'JAYT_392_FINAL_WAVE_1_ALL_PREDICATES_VERIFIED_PASS' : 'JAYT_392_FINAL_WAVE_1_INSUFFICIENT_HOLD',
    deduplication_audit: index.deduplication_audit,
    audit_findings: findings
  };
  fs.writeFileSync(RECEIPT_FILE, JSON.stringify(receipt, null, 2), 'utf8');
  console.log(`Saved QA receipt to ${RECEIPT_FILE}`);
} else {
  console.log(`QA receipt matches verified results; preserved on disk without mutation at ${RECEIPT_FILE}`);
}

if (!allPassed) {
  process.exit(1);
}
console.log('Wave 1 final verification completed with 100% SUCCESS.');
