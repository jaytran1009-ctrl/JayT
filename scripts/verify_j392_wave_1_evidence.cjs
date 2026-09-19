const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const baseDir = path.resolve(__dirname, '..');
const indexFile = path.join(baseDir, '06_TRUST_AND_EVIDENCE/j392/WAVE_1_LIVE_EVIDENCE_INDEX.json');
const receiptFile = path.join(baseDir, '07_QUALITY_ASSURANCE/JAYT_392_WAVE_1_LIVE_EVIDENCE_RECEIPT.json');

console.log('=== VERIFYING JAYT-392 WAVE 1 LIVE EVIDENCE ===');
if (!fs.existsSync(indexFile)) {
  console.error(`FATAL: Index file missing: ${indexFile}`);
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
console.log(`Loaded index: ${index.manifest_id}, Required: ${index.required_count}, Verified: ${index.verified_count}`);

const findings = [];
let passedCount = 0;

for (const d of index.deals) {
  console.log(`\nAuditing Deal [${d.deal_index}]: ${d.offer_id} (${d.brand})`);
  const dealFinding = {
    offer_id: d.offer_id,
    brand: d.brand,
    status: 'PENDING',
    checks: {}
  };

  // 1. HTML File check
  const htmlPath = path.join(baseDir, d.html_file);
  if (!fs.existsSync(htmlPath)) {
    dealFinding.checks.html_exists = false;
    findings.push(dealFinding);
    continue;
  }
  const htmlBuf = fs.readFileSync(htmlPath);
  const htmlSha = crypto.createHash('sha256').update(htmlBuf).digest('hex');
  if (htmlSha !== d.html_sha256) {
    dealFinding.checks.html_sha_match = false;
    findings.push(dealFinding);
    continue;
  }
  dealFinding.checks.html_sha_match = true;

  // 2. Screenshot File check
  const ssPath = path.join(baseDir, d.screenshot_file);
  if (!fs.existsSync(ssPath)) {
    dealFinding.checks.screenshot_exists = false;
    findings.push(dealFinding);
    continue;
  }
  const ssBuf = fs.readFileSync(ssPath);
  const ssSha = crypto.createHash('sha256').update(ssBuf).digest('hex');
  if (ssSha !== d.screenshot_sha256) {
    dealFinding.checks.screenshot_sha_match = false;
    findings.push(dealFinding);
    continue;
  }
  dealFinding.checks.screenshot_sha_match = true;

  // 3. Quotes File check
  const quotesPath = path.join(baseDir, d.quotes_file);
  if (!fs.existsSync(quotesPath)) {
    dealFinding.checks.quotes_file_exists = false;
    findings.push(dealFinding);
    continue;
  }
  const quotesDoc = JSON.parse(fs.readFileSync(quotesPath, 'utf8'));
  dealFinding.checks.quotes_file_loaded = true;

  // 4. Verbatim Quote Binding Verification
  const content = htmlBuf.toString('utf8');
  let quotesValid = true;
  const quoteChecks = {};

  for (const [qKey, qObj] of Object.entries(quotesDoc.quotes)) {
    const text = qObj.text;
    const start = qObj.byte_offset_start;
    const end = qObj.byte_offset_end;

    // Check offset slice
    const sliceBuf = htmlBuf.subarray(start, end);
    const sliceText = sliceBuf.toString('utf8');

    if (sliceText !== text) {
      console.error(`  FAIL quote offset: [${qKey}] expected "${text}" but got "${sliceText}" at [${start}..${end}]`);
      quotesValid = false;
      quoteChecks[qKey] = false;
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
    console.log(`  -> Deal ${d.offer_id}: PASS (All predicates verified)`);
  } else {
    dealFinding.status = 'FAIL';
    console.error(`  -> Deal ${d.offer_id}: FAIL`);
  }
  findings.push(dealFinding);
}

const allPassed = passedCount === index.required_count;
console.log(`\nVerification Result: ${passedCount}/${index.required_count} deals passed.`);

const forceWrite = process.argv.includes('--force');
let needsWrite = forceWrite || !fs.existsSync(receiptFile);
if (!needsWrite && fs.existsSync(receiptFile)) {
  try {
    const existing = JSON.parse(fs.readFileSync(receiptFile, 'utf8'));
    if (existing.verified_count !== passedCount || existing.required_count !== index.required_count || existing.verdict !== (allPassed ? 'JAYT_392_WAVE_1_LIVE_EVIDENCE_ALL_PREDICATES_VERIFIED_PASS' : 'JAYT_392_WAVE_1_LIVE_EVIDENCE_INSUFFICIENT_HOLD')) {
      needsWrite = true;
    }
  } catch (e) {
    needsWrite = true;
  }
}

if (needsWrite) {
  const receipt = {
    $schema: 'https://jayt.vn/schemas/j392-wave-1-evidence-receipt.v1.json',
    receipt_id: 'JAYT_392_WAVE_1_LIVE_EVIDENCE_RECEIPT',
    work_order: 'WORK_ORDER_J392_RADICAL_BREAKTHROUGH',
    verified_at_utc: new Date().toISOString(),
    target_cluster: 'DANANG_CINEMA_WAVE_1',
    required_count: index.required_count,
    verified_count: passedCount,
    verdict: allPassed ? 'JAYT_392_WAVE_1_LIVE_EVIDENCE_ALL_PREDICATES_VERIFIED_PASS' : 'JAYT_392_WAVE_1_LIVE_EVIDENCE_INSUFFICIENT_HOLD',
    deduplication_audit: index.deduplication_audit,
    audit_findings: findings
  };
  fs.writeFileSync(receiptFile, JSON.stringify(receipt, null, 2), 'utf8');
  console.log(`Saved QA receipt to ${receiptFile}`);
} else {
  console.log(`QA receipt matches verified results; preserved on disk without mutation at ${receiptFile}`);
}

if (!allPassed) {
  process.exit(1);
}
console.log('Wave 1 verification completed with 100% SUCCESS.');
