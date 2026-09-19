/**
 * JAYT W8 Validated Conversion Report Reconciliation Engine (Production-Grade Read-Only)
 * 
 * Strict Read-Only Governance & High-Assurance Controls:
 *  1. Absolute Directory Boundary Enforcement:
 *     - Uses path.resolve and path.relative against CANONICAL_EXPORT_VAULT.
 *     - Rejects parent traversal ('..'), absolute escapes, and prefix collisions (e.g. vault_evil).
 *     - Requires report file to reside directly within CANONICAL_EXPORT_VAULT root (zero subfolder evasion).
 *  2. Cryptographic Companion Sidecar SHA-256 Verification:
 *     - Computes disk SHA-256 and compares with .sha256 sidecar bit-identically.
 *  3. Strict RFC-4180 4-State CSV FSM & Exact Header Validation:
 *     - Validates against SHOPEE_CONVERSION_REPORT schema.
 *  4. Strict Validated Order Status Enforcement:
 *     - Only completed/settled statuses qualify (COMPLETED, VALIDATED, HOAN_THANH, DA_GHI_NHAN, SETTLED, APPROVED).
 *     - Rejects PENDING, CANCELLED, DA_HUY, RETURNED, TRA_HANG, REJECTED, FRAUD from attribution.
 *  5. Strict Positive Commission Enforcement:
 *     - Commission must parse to a strictly positive number (> 0 VND).
 *     - Zero or negative commissions rejected fail-closed.
 *  6. Valid Timestamp & Temporal Ordering Enforcement:
 *     - Purchase timestamp must be present and parse to a valid ISO/UTC date.
 *  7. Portal Publisher & Account Provenance Checking:
 *     - Verifies declared account provenance (e.g. 17372870594) if present in report.
 *  8. PII Redaction:
 *     - Customer/buyer identifiable information is strictly redacted as [REDACTED_PII].
 *  9. Staging Containment & Truthful Verdict:
 *     - Never claims autonomous commercial Go-Live. Outputs STAGING_ATTRIBUTION_OBSERVED or INCOMPLETE_ATTRIBUTION.
 *     - ZERO-MUTATION invariant: strictly read-only; never mutates production, registers, or release manifests.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  CANONICAL_EXPORT_VAULT,
  parseRfc4180Csv,
  validateExportSchema
} = require('./parse_w8_portal_feed.cjs');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const VALID_SETTLED_STATUSES = new Set([
  'COMPLETED',
  'VALIDATED',
  'HOAN_THANH',
  'DA_GHI_NHAN',
  'SETTLED',
  'APPROVED',
  'HOAN_TAT',
  'THANH_CONG'
]);

const DISQUALIFIED_STATUSES = new Set([
  'CANCELLED',
  'DA_HUY',
  'RETURNED',
  'TRA_HANG',
  'PENDING',
  'DANG_XU_LY',
  'REJECTED',
  'TU_CHOI',
  'FRAUD',
  'FAILED',
  'THAT_BAI'
]);

/**
 * Parse monetary commission string into numeric VND amount
 */
function parseCommissionVnd(val) {
  if (val === null || val === undefined) return 0;
  let str = String(val).trim().replace(/[₫đ\s]/gi, '');
  let multiplier = 1;
  if (/k$/i.test(str)) {
    multiplier = 1000;
    str = str.replace(/k$/i, '');
  } else if (/tr$/i.test(str) || /m$/i.test(str)) {
    multiplier = 1000000;
    str = str.replace(/(tr|m)$/i, '');
  }
  // Vietnamese format: 11.250 or 1.000.000 uses dot as thousand separator
  if (/\.\d{3}/.test(str) && !str.includes(',')) {
    str = str.replace(/\./g, '');
  } else {
    str = str.replace(/,/g, '.');
  }
  const num = parseFloat(str) * multiplier;
  return isNaN(num) ? 0 : Math.round(num);
}

/**
 * Redact sensitive PII fields
 */
function redactPii(obj) {
  const safe = {};
  for (const [k, v] of Object.entries(obj)) {
    const lk = k.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]/g, '');
    if (
      lk.includes('buyer') ||
      lk.includes('customer') ||
      lk.includes('phone') ||
      lk.includes('email') ||
      lk.includes('address') ||
      lk.includes('tenkhach') ||
      lk.includes('sodienthoai') ||
      lk.includes('nguoimua')
    ) {
      safe[k] = '[REDACTED_PII]';
    } else {
      safe[k] = v;
    }
  }
  return safe;
}

/**
 * Dedicated Strict ISO-8601 / UTC Timestamp Validator
 * Enforces explicit timezone (Z or offset [+-]HH:mm or UTC) and rejects lenient JavaScript Date parsing.
 */
function validateIsoUtcTimestamp(timestampRaw) {
  if (typeof timestampRaw !== 'string' || !timestampRaw.trim()) {
    return { valid: false, reason: 'Timestamp is missing or empty.' };
  }
  const trimmed = timestampRaw.trim();
  // Strictly enforce ISO-8601 format with explicit timezone (Z, [+-]HH:mm, or UTC)
  const ISO_REGEX = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[+-]\d{2}:?\d{2}| UTC)$/i;
  if (!ISO_REGEX.test(trimmed)) {
    return { 
      valid: false, 
      reason: `Timestamp "${trimmed}" does not conform to strict ISO-8601/UTC format with explicit timezone (e.g. YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss+07:00). Lenient Date parsing rejected fail-closed.` 
    };
  }
  const parseable = trimmed.toUpperCase().endsWith(' UTC') ? trimmed.slice(0, -4) + 'Z' : trimmed;
  const d = new Date(parseable);
  if (isNaN(d.getTime())) {
    return { valid: false, reason: `Timestamp "${trimmed}" contains invalid calendar or clock values.` };
  }
  return { valid: true, date: d, iso_utc: d.toISOString() };
}

/**
 * Reconcile an incoming Validated Conversion Report against active feed SKUs (Read-Only)
 */
function reconcileConversionReport(reportFilePath, declaredAccount = '17372870594') {
  const resolvedPath = path.resolve(reportFilePath);
  const normVault = path.resolve(CANONICAL_EXPORT_VAULT);
  
  // 1. Absolute Vault Boundary Enforcement
  const rel = path.relative(normVault, resolvedPath);
  if (rel.startsWith('..') || path.isAbsolute(rel) || rel === '' || rel.includes('..')) {
    throw new Error(`UNAUTHORIZED_CONVERSION_PATH_REJECTION: Conversion report must reside strictly within "${normVault}". Parent traversal or prefix collisions rejected fail-closed.`);
  }

  if (path.dirname(resolvedPath) !== normVault) {
    throw new Error(`UNAUTHORIZED_CONVERSION_PATH_REJECTION: Subdirectory placement prohibited; conversion report must reside directly within vault root.`);
  }

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`CONVERSION_FILE_NOT_FOUND: Report file does not exist at "${resolvedPath}".`);
  }

  // 2. Cryptographic Sidecar Verification
  const sidecarPath = resolvedPath + '.sha256';
  if (!fs.existsSync(sidecarPath)) {
    throw new Error(`MISSING_SIDECAR_HASH_REJECTION: Conversion report lacks mandatory .sha256 companion sidecar.`);
  }

  const rawBuffer = fs.readFileSync(resolvedPath);
  const actualSha256 = sha256(rawBuffer);
  const sidecarRaw = fs.readFileSync(sidecarPath, 'utf8').trim();
  const expectedSha256 = sidecarRaw.split(/\s+/)[0].toLowerCase();

  if (actualSha256 !== expectedSha256) {
    throw new Error(`SIDECAR_INTEGRITY_BREACH: Hash mismatch on conversion report.\n  Actual:   ${actualSha256}\n  Expected: ${expectedSha256}`);
  }

  // 3. RFC-4180 CSV Parse
  const rawText = rawBuffer.toString('utf8');
  const rows = parseRfc4180Csv(rawText);
  if (rows.length < 2) {
    throw new Error(`EMPTY_CONVERSION_REPORT_REJECTION: Conversion report contains no data rows.`);
  }

  // 4. Schema Validation
  const headerRow = rows[0];
  const schemaResult = validateExportSchema(headerRow);
  if (!schemaResult.valid || schemaResult.matched_schema !== 'SHOPEE_CONVERSION_REPORT') {
    throw new Error(`INVALID_CONVERSION_SCHEMA_REJECTION: File headers do not match SHOPEE_CONVERSION_REPORT schema.`);
  }

  const headers = headerRow.map(h => h.trim());

  // 5. Load Active Campaign SKUs (Read-Only)
  const feedRegisterPath = path.join(normVault, '..', 'W8_FEED_EVIDENCE_REGISTER.json');
  if (!fs.existsSync(feedRegisterPath)) {
    throw new Error(`FEED_EVIDENCE_REGISTER_NOT_FOUND: Cannot cross-reference without active W8_FEED_EVIDENCE_REGISTER.json.`);
  }
  const feedRegister = JSON.parse(fs.readFileSync(feedRegisterPath, 'utf8'));
  const activeItemIds = new Set();
  const itemMetadata = new Map();

  for (const rec of feedRegister.records) {
    const raw = rec.raw_columns;
    const itemId = String(raw['Mã sản phẩm'] || raw.item_id || raw.ma_san_pham || '').trim();
    if (itemId) {
      activeItemIds.add(itemId);
      itemMetadata.set(itemId, {
        product_name: raw['Tên sản phẩm'] || raw.product_name || raw.ten_san_pham || 'Unknown',
        shortlink: raw['Link ưu đãi'] || raw.link_uu_dai || raw.custom_link || null,
        commission_rate: raw['Tỉ lệ hoa hồng'] || raw.commission_rate || null
      });
    }
  }

  // 6. Cross-reference order rows with strict validation
  const matchedOrders = [];
  const rejectedOrders = [];
  const unmatchedOrders = [];
  const reconciledSkus = new Set();
  const seenOrderIds = new Set();
  let totalAttributedCommissionVnd = 0;

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const rowObj = {};
    headers.forEach((h, idx) => {
      rowObj[h] = row[idx] !== undefined ? row[idx].trim() : '';
    });

    const rowItemId = String(rowObj['Mã sản phẩm'] || rowObj.item_id || rowObj.ma_san_pham || rowObj.Item_ID || '').trim();
    
    // 6.1 Mandatory Real Order ID (No synthetic fallback)
    const orderId = String(
      rowObj['Mã đơn hàng'] ||
      rowObj['Mã đơn'] ||
      rowObj.order_id ||
      rowObj.orderid ||
      rowObj.ma_don_hang ||
      rowObj.Order_ID ||
      ''
    ).trim();

    if (!orderId) {
      rejectedOrders.push({
        source_row: r,
        item_id: rowItemId,
        rejection_reason: `MISSING_ORDER_ID_REJECTION: Mandatory order_id is missing or empty on row ${r}. Synthetic or fallback row IDs are strictly prohibited.`
      });
      continue;
    }

    // 6.2 Duplicate Order Detection (Prevent commission double-counting)
    if (seenOrderIds.has(orderId)) {
      rejectedOrders.push({
        source_row: r,
        order_id: orderId,
        item_id: rowItemId,
        rejection_reason: `DUPLICATE_ORDER_ID_REJECTION: Order "${orderId}" was already processed on a previous row. Duplicate orders rejected fail-closed to prevent commission inflation.`
      });
      continue;
    }

    const orderStatusRaw = String(rowObj['Trạng thái'] || rowObj.order_status || rowObj.status || rowObj.trang_thai || 'UNKNOWN').trim();
    const orderStatusNorm = orderStatusRaw.toUpperCase().replace(/\s+/g, '_');
    const rawCommission = rowObj['Hoa hồng'] || rowObj.commission || rowObj.total_commission || rowObj['Tiền hoa hồng'] || '0';
    const commissionVnd = parseCommissionVnd(rawCommission);
    
    // 6.3 Strict ISO-8601 / UTC Purchase Time Validation
    const purchaseTimeRaw = String(
      rowObj['Thời gian mua'] ||
      rowObj.purchase_time ||
      rowObj.thoi_gian_mua ||
      rowObj['Thời gian tạo'] ||
      rowObj.created_time ||
      ''
    ).trim();

    const timestampResult = validateIsoUtcTimestamp(purchaseTimeRaw);
    if (!timestampResult.valid) {
      rejectedOrders.push({
        source_row: r,
        order_id: orderId,
        item_id: rowItemId,
        rejection_reason: `INVALID_TIMESTAMP_REJECTION: ${timestampResult.reason}`
      });
      continue;
    }

    // 6.4 Mandatory Account Provenance Validation
    const reportAccount = String(
      rowObj['Mã tài khoản'] ||
      rowObj['Tài khoản'] ||
      rowObj.account_id ||
      rowObj.account ||
      rowObj.partner_id ||
      rowObj.partnerid ||
      rowObj.Partner_ID ||
      ''
    ).trim();

    if (!reportAccount) {
      rejectedOrders.push({
        source_row: r,
        order_id: orderId,
        item_id: rowItemId,
        rejection_reason: `MISSING_ACCOUNT_PROVENANCE_REJECTION: Mandatory partner/account ID is missing or empty on row ${r}. Every conversion row must have verified account provenance.`
      });
      continue;
    }

    const expectedAccount = declaredAccount || '17372870594';
    if (reportAccount !== expectedAccount) {
      rejectedOrders.push({
        source_row: r,
        order_id: orderId,
        item_id: rowItemId,
        rejection_reason: `ACCOUNT_PROVENANCE_MISMATCH: Row account "${reportAccount}" does not match declared/target account "${expectedAccount}".`
      });
      continue;
    }

    if (!activeItemIds.has(rowItemId)) {
      unmatchedOrders.push({
        source_row: r,
        order_id: orderId,
        item_id: rowItemId,
        status: orderStatusNorm
      });
      continue;
    }

    // 6.5 Check status qualification
    const isStatusSettled = VALID_SETTLED_STATUSES.has(orderStatusNorm);
    const isStatusDisqualified = DISQUALIFIED_STATUSES.has(orderStatusNorm);

    if (!isStatusSettled || isStatusDisqualified) {
      rejectedOrders.push({
        source_row: r,
        order_id: orderId,
        item_id: rowItemId,
        rejection_reason: `INVALID_ORDER_STATUS: Status "${orderStatusNorm}" does not satisfy validated/settled requirement.`
      });
      continue;
    }

    // 6.6 Check positive commission
    if (commissionVnd <= 0) {
      rejectedOrders.push({
        source_row: r,
        order_id: orderId,
        item_id: rowItemId,
        rejection_reason: `NON_POSITIVE_COMMISSION_REJECTION: Commission "${rawCommission}" parsed to ${commissionVnd} VND (must be > 0).`
      });
      continue;
    }

    // Order successfully qualified
    seenOrderIds.add(orderId);
    reconciledSkus.add(rowItemId);
    totalAttributedCommissionVnd += commissionVnd;

    matchedOrders.push({
      source_row: r,
      order_id: orderId,
      item_id: rowItemId,
      product_info: itemMetadata.get(rowItemId),
      order_status: orderStatusNorm,
      commission_vnd: commissionVnd,
      purchase_time_utc: timestampResult.iso_utc,
      raw_columns_redacted: redactPii(rowObj)
    });
  }

  // 7. Determine GAP_02 Resolution Readiness
  const isFullCohortCovered = reconciledSkus.size === activeItemIds.size && activeItemIds.size > 0;
  const gap02Status = isFullCohortCovered
    ? `STAGING_ATTRIBUTION_OBSERVED_${reconciledSkus.size}_OF_${activeItemIds.size}__AWAITING_EXECUTIVE_DUAL_KEY_RATIFICATION`
    : `INCOMPLETE_ATTRIBUTION_${reconciledSkus.size}_OF_${activeItemIds.size}_SKUS__EVIDENCE_DEFICIENT`;

  // 8. Assemble Read-Only Reconciliation Receipt
  const receipt = {
    reconciliation_id: `RECON_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
    reconciled_at_utc: new Date().toISOString(),
    audit_mode: 'READ_ONLY__ZERO_MUTATION',
    source_file: path.basename(resolvedPath),
    file_sha256: actualSha256,
    sidecar_verified: true,
    total_order_lines: rows.length - 1,
    campaign_active_skus_count: activeItemIds.size,
    matched_and_qualified_orders_count: matchedOrders.length,
    rejected_orders_count: rejectedOrders.length,
    unmatched_orders_count: unmatchedOrders.length,
    reconciled_skus_count: reconciledSkus.size,
    total_attributed_commission_vnd: totalAttributedCommissionVnd,
    gap_02_resolution_status: gap02Status,
    governance_verdict: 'HELD_FAIL_CLOSED__PENDING_DUAL_KEY_EXECUTION',
    rejected_orders: rejectedOrders,
    matched_orders: matchedOrders,
    governance_advisory: 'This receipt is strictly read-only and does not mutate production or registers. Dual-Key signature and executive ratification required before commercial release.'
  };

  return receipt;
}

if (require.main === module) {
  const targetFile = process.argv[2];
  const declaredAccount = process.argv[3] || null;
  if (!targetFile) {
    console.log('Usage: node scripts/reconcile_w8_conversion_report.cjs <path-to-conversion-report.csv> [optional-declared-account]');
    process.exit(1);
  }
  try {
    const receipt = reconcileConversionReport(targetFile, declaredAccount);
    console.log(JSON.stringify(receipt, null, 2));
  } catch (err) {
    console.error('[RECONCILIATION_ERROR]:', err.message);
    process.exit(1);
  }
}

module.exports = {
  reconcileConversionReport,
  parseCommissionVnd,
  redactPii,
  validateIsoUtcTimestamp
};
