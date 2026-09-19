const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const baseDir = path.resolve(__dirname, '..');
const indexFile = path.join(baseDir, '06_TRUST_AND_EVIDENCE/j392/ktx_top_10_evidence_index.json');
const receiptFile = path.join(baseDir, '07_QUALITY_ASSURANCE/JAYT_392_KTX_MEDIA_IDENTITY_RECEIPT.json');

console.log('=== VERIFYING JAYT-392 KTX TOP 10 RADAR EVIDENCE ===');
if (!fs.existsSync(indexFile)) {
  console.error(`FATAL: Index file missing: ${indexFile}`);
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
console.log(`Loaded index: ${index.manifest_id}, Required: ${index.required_count}, Verified: ${index.verified_count}`);

function getDimensions(buf, ext) {
  if (ext === '.png') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } else if (ext === '.jpg' || ext === '.jpeg') {
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

const findings = [];
let passedCount = 0;
const allowlist = new Set(index.outbound_host_allowlist);

for (const it of index.items) {
  console.log(`\nAuditing KTX Item [${it.rank}]: ${it.itemId} (${it.brand} - ${it.product_name.substring(0, 35)}...)`);
  const itemFinding = {
    itemId: it.itemId,
    brand: it.brand,
    status: 'PENDING',
    checks: {}
  };

  // 1. Asset File Exists
  const assetPath = path.join(baseDir, it.media.relative_path);
  if (!fs.existsSync(assetPath)) {
    console.error(`  FAIL: Asset missing: ${assetPath}`);
    itemFinding.checks.asset_exists = false;
    findings.push(itemFinding);
    continue;
  }
  itemFinding.checks.asset_exists = true;

  // 2. Decode bytes and verify dimensions
  const buf = fs.readFileSync(assetPath);
  const ext = path.extname(it.media.relative_path).toLowerCase();
  const dim = getDimensions(buf, ext);
  itemFinding.checks.decoded_dimensions = dim;
  itemFinding.checks.dimensions_valid = dim.width > 0 && dim.height > 0;

  // 3. SHA-256 match
  const sha = crypto.createHash('sha256').update(buf).digest('hex');
  const shaMatch = sha === it.media.sha256;
  itemFinding.checks.sha256_match = shaMatch;
  if (!shaMatch) {
    console.error(`  FAIL: SHA mismatch for ${it.itemId}`);
  }

  // 4. Non-placeholder check
  const notPlaceholder = it.media.media_classification === 'PHYSICAL_BRAND_PHOTOGRAPHY_1_TO_1' && !ext.includes('svg');
  itemFinding.checks.not_placeholder = notPlaceholder;

  // 5. Mandatory Disclosure check
  const correctDisclosure = it.disclosure === 'Sản phẩm khảo sát chính hãng — đã đối soát';
  itemFinding.checks.disclosure_exact_match = correctDisclosure;

  // 6. Affiliate strictly false
  const affiliateDisabled = it.affiliate_enabled === false;
  itemFinding.checks.affiliate_disabled = affiliateDisabled;

  // 7. Host Allowlist check
  const mallUrl = new URL(it.official_mall_url);
  const brandUrl = new URL(it.official_brand_source_url);
  const mallHostAllowed = allowlist.has(mallUrl.hostname) || allowlist.has(mallUrl.hostname.replace('www.', ''));
  const brandHostAllowed = allowlist.has(brandUrl.hostname) || allowlist.has(brandUrl.hostname.replace('www.', ''));
  itemFinding.checks.mall_host_allowed = mallHostAllowed;
  itemFinding.checks.brand_host_allowed = brandHostAllowed;

  // 8. Price and observation time
  const priceValid = typeof it.observed_price === 'number' && it.observed_price > 0;
  const timeValid = Boolean(it.observed_at_utc && it.observed_at_utc.startsWith('2026-09'));
  itemFinding.checks.price_valid = priceValid;
  itemFinding.checks.time_valid = timeValid;

  const passed = itemFinding.checks.asset_exists &&
                 itemFinding.checks.dimensions_valid &&
                 itemFinding.checks.sha256_match &&
                 itemFinding.checks.not_placeholder &&
                 itemFinding.checks.disclosure_exact_match &&
                 itemFinding.checks.affiliate_disabled &&
                 itemFinding.checks.mall_host_allowed &&
                 itemFinding.checks.brand_host_allowed &&
                 itemFinding.checks.price_valid &&
                 itemFinding.checks.time_valid;

  if (passed) {
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
let needsWrite = forceWrite || !fs.existsSync(receiptFile);
if (!needsWrite && fs.existsSync(receiptFile)) {
  try {
    const existing = JSON.parse(fs.readFileSync(receiptFile, 'utf8'));
    if (existing.verified_count !== passedCount || existing.required_count !== index.required_count || existing.verdict !== (allPassed ? 'JAYT_392_KTX_MEDIA_IDENTITY_ALL_TEN_VERIFIED_PASS' : 'JAYT_392_KTX_MEDIA_IDENTITY_INSUFFICIENT_HOLD')) {
      needsWrite = true;
    }
  } catch (e) {
    needsWrite = true;
  }
}

if (needsWrite) {
  const receipt = {
    $schema: 'https://jayt.vn/schemas/j392-ktx-media-identity-receipt.v1.json',
    receipt_id: 'JAYT_392_KTX_MEDIA_IDENTITY_RECEIPT',
    work_order: 'WORK_ORDER_J392_RADICAL_BREAKTHROUGH',
    verified_at_utc: new Date().toISOString(),
    target_cluster: 'KTX_TOP_10_VERIFIED_RADAR',
    required_count: index.required_count,
    verified_count: passedCount,
    verdict: allPassed ? 'JAYT_392_KTX_MEDIA_IDENTITY_ALL_TEN_VERIFIED_PASS' : 'JAYT_392_KTX_MEDIA_IDENTITY_INSUFFICIENT_HOLD',
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
console.log('KTX Top 10 verification completed with 100% SUCCESS.');
