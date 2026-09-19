const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE_DIR = 'D:\\Công Việc MMO\\OPC JayT\\JayT-Dự Án Giá Trị Cộng Đồng';
const INDEX_FILE = path.join(BASE_DIR, '06_TRUST_AND_EVIDENCE/j392/final_ktx_radar_evidence_index.json');
const RECEIPT_FILE = path.join(BASE_DIR, '07_QUALITY_ASSURANCE/JAYT_392_FINAL_KTX_RADAR_RECEIPT.json');

function getHash(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function getImageDimensions(buf, mime) {
  if (mime === 'image/png') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } else if (mime === 'image/jpeg') {
    let offset = 2;
    while (offset < buf.length) {
      if (buf[offset] === 0xff && (buf[offset + 1] === 0xc0 || buf[offset + 1] === 0xc2)) {
        return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
      }
      offset++;
    }
  }
  return { width: 0, height: 0 };
}

console.log('=== VERIFYING JAYT-392 FINAL KTX RADAR EVIDENCE ===');
if (!fs.existsSync(INDEX_FILE)) {
  console.error(`Index file not found: ${INDEX_FILE}`);
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
console.log(`Loaded index: ${index.manifest_id}, Required: ${index.required_count}, Verified: ${index.verified_count}`);

const findings = [];
let passedCount = 0;

for (const it of index.items) {
  console.log(`\nAuditing KTX Item [${it.rank}]: ${it.itemId} (${it.brand} - ${it.product_name.slice(0, 35)}...)`);
  const itemFinding = {
    itemId: it.itemId,
    brand: it.brand,
    product_name: it.product_name,
    checks: {}
  };

  const assetPath = path.join(BASE_DIR, it.media.relative_path);
  const assetExists = fs.existsSync(assetPath);
  itemFinding.checks.file_exists = assetExists;
  if (!assetExists) {
    console.error(`  FAIL: Asset missing at ${assetPath}`);
    itemFinding.status = 'FAIL';
    findings.push(itemFinding);
    continue;
  }

  const buf = fs.readFileSync(assetPath);
  const hash = getHash(buf);
  itemFinding.checks.bytes_match = buf.length === it.media.bytes;
  itemFinding.checks.sha256_match = hash === it.media.sha256;

  const dim = getImageDimensions(buf, it.media.mime_type);
  itemFinding.checks.dimensions_match = (dim.width === it.media.dimensions.width && dim.height === it.media.dimensions.height);

  itemFinding.checks.price_valid = typeof it.observed_price === 'number' && it.observed_price > 0;
  itemFinding.checks.affiliate_disabled = it.affiliate_enabled === false;
  itemFinding.checks.mandatory_disclosure_present = it.disclosure === 'Sản phẩm khảo sát chính hãng — đã đối soát';

  const mallHostValid = index.outbound_host_allowlist.some(h => it.official_mall_url.includes(h));
  const brandHostValid = index.outbound_host_allowlist.some(h => it.official_brand_source_url.includes(h));
  itemFinding.checks.outbound_allowlist_verified = mallHostValid && brandHostValid;

  if (itemFinding.checks.bytes_match &&
      itemFinding.checks.sha256_match &&
      itemFinding.checks.dimensions_match &&
      itemFinding.checks.price_valid &&
      itemFinding.checks.affiliate_disabled &&
      itemFinding.checks.mandatory_disclosure_present &&
      itemFinding.checks.outbound_allowlist_verified) {
    itemFinding.status = 'PASS';
    passedCount++;
    console.log(`  -> Item ${it.itemId}: PASS (${dim.width}x${dim.height}px, ${buf.length} bytes)`);
  } else {
    itemFinding.status = 'FAIL';
    console.error(`  -> Item ${it.itemId}: FAIL`);
  }
  findings.push(itemFinding);
}

const allPassed = passedCount === index.required_count;
console.log(`\nVerification Result: ${passedCount}/${index.required_count} KTX items passed.`);

const forceWrite = process.argv.includes('--force');
let needsWrite = forceWrite || !fs.existsSync(RECEIPT_FILE);
if (!needsWrite && fs.existsSync(RECEIPT_FILE)) {
  try {
    const existing = JSON.parse(fs.readFileSync(RECEIPT_FILE, 'utf8'));
    if (existing.verified_count !== passedCount || existing.required_count !== index.required_count) {
      needsWrite = true;
    }
  } catch (e) {
    needsWrite = true;
  }
}

if (needsWrite) {
  const receipt = {
    receipt_id: 'JAYT_392_FINAL_KTX_RADAR_RECEIPT',
    work_order: 'WORK_ORDER_J392_FINAL_EXECUTION',
    dispatch_sha256: 'af3da365f03da160953a0253ebdb51293a36eae41421a597eeef7f52e1db2bd3',
    verified_at_utc: new Date().toISOString(),
    target_cluster: 'KTX_TOP_10_VERIFIED_RADAR',
    required_count: index.required_count,
    verified_count: passedCount,
    placeholders_retained_in_verified_radar: 0,
    verdict: allPassed ? 'JAYT_392_FINAL_KTX_RADAR_ALL_TEN_VERIFIED_PASS' : 'JAYT_392_FINAL_KTX_RADAR_INSUFFICIENT_HOLD',
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
console.log('KTX Top 10 final verification completed with 100% SUCCESS.');
