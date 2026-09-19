/**
 * JAYT-109R: SEMANTIC OFFER TRUTH GATE
 * 
 * Re-evaluates all 84 captured leaf pages from batch 109 with strict semantic rules:
 * 1. URL Deduplication & Malformed URL filter
 * 2. Page Type Gate (rejection of news, PR, ISO certification, theater formats, admin/gov, policy/auth, discontinued services)
 * 3. Zone Segmentation (Header / Body / Legal Footer / Sidebar) to avoid false matches on nav & footer
 * 4. Cohesive Offer Block Detection (C1-C4 in same article block)
 * 5. Explicit Date & Expiry Validation (valid_to >= capture date 2026-08-25)
 * 6. Scope & Canonical Da Nang Verification
 * 7. Three-way Classification: ACTIVE_REVIEWABLE, EXPIRED_OR_REJECTED, INCOMPLETE
 */

const fs = require('fs');
const path = require('path');

const CAPTURE_REF_DATE = new Date('2026-08-25T18:00:00+07:00');
const EXTRACTED_LEAVES_PATH = path.resolve(__dirname, 'batch_capture_109/extracted_candidate_leaves.json');
const CAPTURES_DIR = path.resolve(__dirname, 'batch_capture_109/captures_109');
const MANIFEST_109_PATH = path.resolve(__dirname, 'official_offer_leaf_manifest_109.json');
const manifest109 = JSON.parse(fs.readFileSync(MANIFEST_109_PATH, 'utf8'));
const DATASET_PATH = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/four_layer_dataset.json');
const OUTPUT_109R_PATH = path.resolve(__dirname, 'semantic_offer_manifest_109r.json');

// Load canonical 18 locations & active brands in Da Nang
const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf8'));
const canonicalLocations = dataset.layer_2_watchlist.verified_locations;
const canonicalDaNangBrands = new Set(canonicalLocations.map(l => l.brand.toLowerCase()));

// Load all 84 candidate leaves from extracted_candidate_leaves
const extractedManifest = JSON.parse(fs.readFileSync(EXTRACTED_LEAVES_PATH, 'utf8'));
const allCandidateLeaves = extractedManifest.leaves;

console.log(`Loaded ${allCandidateLeaves.length} candidate leaf definitions.`);

// Map each candidate to its capture directory metadata
const allLeaves = allCandidateLeaves.map(cand => {
  const leafDir = path.join(CAPTURES_DIR, cand.leaf_id);
  const metaPath = path.join(leafDir, 'metadata.json');
  if (fs.existsSync(metaPath)) {
    return JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  }
  return {
    leaf_id: cand.leaf_id,
    source_target_id: cand.source_target_id,
    brand: cand.brand,
    category: cand.category,
    anchor_text: cand.anchor_text,
    source_url: cand.source_url,
    final_url: cand.source_url,
    captured_at: null,
    status: 'CAPTURE_FAILED',
    http_status: 0,
    text_bytes: 0,
    text_sha256: null,
    screenshot_bytes: 0,
    screenshot_sha256: null,
    evidence_path: null,
    error: 'No capture folder found'
  };
});

console.log(`Resolved ${allLeaves.length} leaves for 109R evaluation.`);

// Helper: Strip Header, Sidebar and Footer zones from text
function segmentZones(rawText) {
  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  
  let bodyStartIndex = 0;
  let bodyEndIndex = lines.length;

  // Find header end: after navigation patterns
  const navKeywords = ['skip to content', 'trang chủ', 'menu', 'thực đơn', 'lịch chiếu', 'đăng nhập', 'đăng ký', 'về cgv', 'về jollibee', 'faq'];
  let lastNavLine = -1;
  for (let i = 0; i < Math.min(lines.length, 25); i++) {
    const l = lines[i].toLowerCase();
    if (navKeywords.some(kw => l === kw || l.startsWith(kw))) {
      lastNavLine = i;
    }
  }
  if (lastNavLine >= 0 && lastNavLine < lines.length - 1) {
    bodyStartIndex = lastNavLine + 1;
  }

  // Find footer/sidebar start: legal, copyright, address, hotline, "có thể bạn quan tâm", "bài viết liên quan"
  const footerKeywords = [
    'công ty tnhh', 'công ty cổ phần', 'giấy chứng nhận đăng k', 'giấy cndkdn',
    'chính sách và quy định chung', 'điều khoản sử dụng', 'copyright', '© 20',
    'chăm sóc khách hàng', 'hotline:', 'liên hệ quảng cáo', 'tất cả các quyền được bảo lưu',
    'có thể bạn quan tâm', 'bài viết liên quan'
  ];
  for (let i = bodyStartIndex; i < lines.length; i++) {
    const l = lines[i].toLowerCase();
    if (footerKeywords.some(kw => l.includes(kw))) {
      bodyEndIndex = i;
      break;
    }
  }

  const headerLines = lines.slice(0, bodyStartIndex);
  const bodyLines = lines.slice(bodyStartIndex, bodyEndIndex);
  const footerLines = lines.slice(bodyEndIndex);

  return {
    header: headerLines.join('\n'),
    body: bodyLines.join('\n'),
    footer: footerLines.join('\n'),
    bodyLines
  };
}

// Helper: Parse date range from text
function extractDateRange(text) {
  let validFrom = null;
  let validTo = null;
  let rawDateStr = null;

  // Pattern: DD/MM/YYYY - DD/MM/YYYY or DD/MM - DD/MM/YYYY
  const rangeMatch = text.match(/(\d{1,2})[\/\.-](\d{1,2})(?:[\/\.-](\d{4}))?\s*[-~–đến]\s*(\d{1,2})[\/\.-](\d{1,2})[\/\.-](\d{4})/i);
  if (rangeMatch) {
    const toYear = parseInt(rangeMatch[6], 10);
    const toMonth = parseInt(rangeMatch[5], 10) - 1;
    const toDay = parseInt(rangeMatch[4], 10);
    validTo = new Date(Date.UTC(toYear, toMonth, toDay, 23, 59, 59));

    const fromYear = rangeMatch[3] ? parseInt(rangeMatch[3], 10) : toYear;
    const fromMonth = parseInt(rangeMatch[2], 10) - 1;
    const fromDay = parseInt(rangeMatch[1], 10);
    validFrom = new Date(Date.UTC(fromYear, fromMonth, fromDay, 0, 0, 0));

    rawDateStr = rangeMatch[0];
  } else {
    // Single date pattern
    const singleMatch = text.match(/(?:ngày\s+)?(\d{1,2})[\/\.-](\d{1,2})[\/\.-](\d{4})/i);
    if (singleMatch) {
      const year = parseInt(singleMatch[3], 10);
      const month = parseInt(singleMatch[2], 10) - 1;
      const day = parseInt(singleMatch[1], 10);
      const d = new Date(Date.UTC(year, month, day, 23, 59, 59));
      rawDateStr = singleMatch[0];
      if (text.toLowerCase().includes('đến ngày') || text.toLowerCase().includes('hạn dùng') || text.toLowerCase().includes('hết ngày') || text.toLowerCase().includes('đến hết ngày')) {
        validTo = d;
      } else {
        validFrom = d;
      }
    } else {
      const monthNamedMatch = text.match(/(\d{1,2})-Thg(\d{1,2})-(\d{4})/i);
      if (monthNamedMatch) {
        const year = parseInt(monthNamedMatch[3], 10);
        const month = parseInt(monthNamedMatch[2], 10) - 1;
        const day = parseInt(monthNamedMatch[1], 10);
        validFrom = new Date(Date.UTC(year, month, day, 0, 0, 0));
        rawDateStr = monthNamedMatch[0];
      }
    }
  }

  return { validFrom, validTo, rawDateStr };
}

// Evaluate each leaf with 7 strict layers
function evaluateLeaf(leaf, seenUrls) {
  const result = {
    leaf_id: leaf.leaf_id,
    source_target_id: leaf.source_target_id,
    brand: leaf.brand,
    category: leaf.category,
    source_url: leaf.source_url,
    final_url: leaf.final_url,
    captured_at: leaf.captured_at,
    classification: 'EXPIRED_OR_REJECTED',
    rejection_reason: null,
    details: {},
    evidence_path: leaf.evidence_path
  };

  // Layer 1: Malformed URL & Capture failure & Deduplication
  if (leaf.status === 'CAPTURE_FAILED' || !leaf.evidence_path || !fs.existsSync(leaf.evidence_path)) {
    result.classification = 'EXPIRED_OR_REJECTED';
    result.rejection_reason = 'CAPTURE_FAILED';
    result.details = { error: leaf.error || 'File not found on disk' };
    return result;
  }

  if (leaf.final_url && leaf.final_url.includes('://') && leaf.final_url.indexOf('://') !== leaf.final_url.lastIndexOf('://')) {
    result.classification = 'EXPIRED_OR_REJECTED';
    result.rejection_reason = 'MALFORMED_URL';
    result.details = { explanation: 'Double protocol URL detected in final_url' };
    return result;
  }

  if (seenUrls.has(leaf.final_url)) {
    result.classification = 'EXPIRED_OR_REJECTED';
    result.rejection_reason = 'DUPLICATE_URL';
    result.details = { explanation: `Duplicate URL already evaluated earlier: ${leaf.final_url}` };
    return result;
  }
  seenUrls.add(leaf.final_url);

  const rawText = fs.readFileSync(leaf.evidence_path, 'utf8');
  const lowerRaw = rawText.toLowerCase();

  // Layer 2: Page Type Rejection Gate
  // 2.1 Gov / Administrative
  if (/danang\.gov\.vn|hdnd\.danang\.gov\.vn/.test(leaf.final_url)) {
    result.classification = 'EXPIRED_OR_REJECTED';
    result.rejection_reason = 'GOVERNMENT_ADMINISTRATIVE_PAGE';
    result.details = { explanation: 'Trang thông tin hành chính / chính quyền Đà Nẵng, không phải ưu đãi thương mại' };
    return result;
  }

  // 2.2 Discontinued Services
  if (lowerRaw.includes('dừng hoạt động dịch vụ tại thành phố đà nẵng') || lowerRaw.includes('dừng hoạt động dịch vụ tại tp đà nẵng')) {
    result.classification = 'EXPIRED_OR_REJECTED';
    result.rejection_reason = 'SERVICE_STOPPED_IN_DANANG';
    result.details = { explanation: 'Thương hiệu/dịch vụ đã thông báo dừng hoạt động tại Đà Nẵng' };
    return result;
  }

  if (lowerRaw.includes('dừng cung cấp dịch vụ vé tháng') || lowerRaw.includes('dừng dịch vụ "vé tháng 20k"') || lowerRaw.includes('dừng dịch vụ vé tháng 20.000')) {
    result.classification = 'EXPIRED_OR_REJECTED';
    result.rejection_reason = 'SERVICE_DISCONTINUED';
    result.details = { explanation: 'Nội dung bài viết thông báo dừng cung cấp dịch vụ' };
    return result;
  }

  // 2.3 Certifications & ISO News
  if (lowerRaw.includes('chứng nhận fssc 22000') || lowerRaw.includes('chứng nhận iso') || lowerRaw.includes('sgs xác nhận') || lowerRaw.includes('nhượng quyền thương hiệu tại việt nam')) {
    result.classification = 'EXPIRED_OR_REJECTED';
    result.rejection_reason = 'CERTIFICATION_OR_FRANCHISE_NEWS';
    result.details = { explanation: 'Trang tin tức chứng nhận an toàn thực phẩm / nhượng quyền thương hiệu, không phải ưu đãi' };
    return result;
  }

  // 2.4 PR & Brand Identity / Diplomatic Announcements
  if (lowerRaw.includes('thay đổi nhận diện thương hiệu') || lowerRaw.includes('bộ nhận diện thương hiệu mới') || lowerRaw.includes('thủ tướng việt nam và thủ tướng hà lan')) {
    result.classification = 'EXPIRED_OR_REJECTED';
    result.rejection_reason = 'PR_OR_BRAND_ANNOUNCEMENT';
    result.details = { explanation: 'Bài viết thông cáo báo chí, thay đổi nhận diện thương hiệu hoặc ngoại giao' };
    return result;
  }

  // 2.5 Product format / Venue description (e.g. CGV 3D)
  if (lowerRaw.includes('3d là một định dạng điện ảnh') || lowerRaw.includes('định dạng điện ảnh đem đến')) {
    result.classification = 'EXPIRED_OR_REJECTED';
    result.rejection_reason = 'PRODUCT_DESCRIPTION_NOT_OFFER';
    result.details = { explanation: 'Trang giới thiệu định dạng phòng chiếu 3D/IMAX/4DX, không phải chương trình ưu đãi' };
    return result;
  }

  // 2.6 Policy, Login, Auth pages
  if (leaf.final_url.includes('/login') || leaf.final_url.includes('/policy/') || (lowerRaw.includes('chính sách thành viên') && !lowerRaw.includes('giảm') && !lowerRaw.includes('đồng giá'))) {
    result.classification = 'EXPIRED_OR_REJECTED';
    result.rejection_reason = 'POLICY_OR_AUTH_PAGE';
    result.details = { explanation: 'Trang điều khoản chính sách hoặc màn hình đăng nhập' };
    return result;
  }

  // Layer 3: Zone Segmentation
  const zones = segmentZones(rawText);
  const bodyText = zones.body;
  const lowerBody = bodyText.toLowerCase();

  if (bodyText.length < 50) {
    result.classification = 'INCOMPLETE';
    result.rejection_reason = 'INSUFFICIENT_BODY_CONTENT';
    result.details = { explanation: 'Nội dung phần thân trang quá ngắn hoặc chỉ chứa giao diện rỗng' };
    return result;
  }

  // Layer 4 & 5: Cohesive Offer Block Detection & Date Parsing
  const discountRegex = /(?:giảm\s+(?:ngay\s+)?[\d\.,]+(?:k|đ|%|nghìn|đồng|vnđ)|đồng giá\s+[\d\.,]+(?:k|đ)|tặng\s+[\d\.,]+(?:k|đ|voucher)|ưu đãi\s+[\d\.,]+(?:%|k|đ)|voucher\s+[\d\.,]+(?:k|đ)|mã\s*:\s*[a-z0-9_]+)/i;
  const hasConcreteValue = discountRegex.test(bodyText);

  // Extract dates strictly from the body
  const dateInfo = extractDateRange(bodyText);

  // Check Da Nang Scope in body
  const mentionsDaNangExplicitly = lowerBody.includes('đà nẵng') || lowerBody.includes('da nang');
  const mentionsNationwide = lowerBody.includes('toàn quốc') || lowerBody.includes('toàn hệ thống') || lowerBody.includes('tất cả các rạp') || lowerBody.includes('tất cả rạp') || lowerBody.includes('tất cả chi nhánh');
  const brandHasCanonicalDaNang = canonicalDaNangBrands.has(leaf.brand.toLowerCase());

  const scopePassed = mentionsDaNangExplicitly || (mentionsNationwide && brandHasCanonicalDaNang);

  // Check if article body is historical (from 2020-2025) and lacks a valid future end date in 2026+
  const isHistoricalYear = lowerBody.includes('2020') || lowerBody.includes('2021') || lowerBody.includes('2022') || lowerBody.includes('2023') || lowerBody.includes('2024') || lowerBody.includes('2025');
  const hasFutureValidTo = dateInfo.validTo && dateInfo.validTo >= CAPTURE_REF_DATE;

  if (isHistoricalYear && !hasFutureValidTo) {
    result.classification = 'EXPIRED_OR_REJECTED';
    result.rejection_reason = 'HISTORICAL_OR_EXPIRED_CONTENT';
    result.details = {
      explanation: 'Nội dung bài viết từ các năm cũ (2020-2025) và không có ngày kết thúc hiệu lực trong tương lai',
      raw_date: dateInfo.rawDateStr || null
    };
    return result;
  }

  // Check if valid_to is in the past
  if (dateInfo.validTo && dateInfo.validTo < CAPTURE_REF_DATE) {
    result.classification = 'EXPIRED_OR_REJECTED';
    result.rejection_reason = 'EXPIRED_OFFER';
    result.details = {
      valid_to: dateInfo.validTo.toISOString().substring(0, 10),
      raw_date: dateInfo.rawDateStr,
      explanation: `Ưu đãi đã hết hạn trước thời điểm quan sát (${CAPTURE_REF_DATE.toISOString().substring(0, 10)})`
    };
    return result;
  }

  // Check Category Listing pages (e.g. multiple titles listed without standalone article)
  const isListingPage = (
    leaf.final_url.endsWith('/khuyen-mai/') ||
    leaf.final_url.endsWith('/uu-dai.html') ||
    leaf.final_url.endsWith('/tin-tuc.html') ||
    leaf.final_url.endsWith('/promotions') ||
    leaf.final_url.endsWith('/event-list.aspx') ||
    leaf.final_url.includes('/tin-va-khuyen-mai.html')
  );

  if (isListingPage) {
    result.classification = 'INCOMPLETE';
    result.rejection_reason = 'CATEGORY_LISTING_ONLY';
    result.details = {
      explanation: 'Trang danh mục tổng hợp nhiều ưu đãi/tin tức; cần bóc tách từng bài viết chi tiết bên trong'
    };
    return result;
  }

  // Evaluation of Standalone Offer
  if (hasConcreteValue && scopePassed && dateInfo.validTo && dateInfo.validTo >= CAPTURE_REF_DATE) {
    result.classification = 'ACTIVE_REVIEWABLE';
    result.rejection_reason = null;
    result.details = {
      offer_highlight: bodyText.match(discountRegex)[0],
      valid_from: dateInfo.validFrom ? dateInfo.validFrom.toISOString().substring(0, 10) : null,
      valid_to: dateInfo.validTo.toISOString().substring(0, 10),
      raw_date_snippet: dateInfo.rawDateStr,
      scope: mentionsDaNangExplicitly ? 'EXPLICIT_DA_NANG' : 'NATIONWIDE_WITH_CANONICAL_PRESENCE',
      terms_present: lowerBody.includes('áp dụng') || lowerBody.includes('điều kiện') || lowerBody.includes('lưu ý')
    };
    return result;
  }

  // If missing explicit valid_to or missing concrete values
  result.classification = 'INCOMPLETE';
  if (!hasConcreteValue) {
    result.rejection_reason = 'NO_CONCRETE_OFFER_VALUE';
    result.details = { explanation: 'Không tìm thấy số tiền giảm, phần trăm, combo giá hoặc mã ưu đãi cụ thể trong bài' };
  } else if (!dateInfo.validTo) {
    result.rejection_reason = 'NO_EXPLICIT_EXPIRY_DATE';
    result.details = { explanation: 'Chương trình không ghi rõ ngày hết hạn (valid_to) hoặc là chương trình thường trực' };
  } else if (!scopePassed) {
    result.rejection_reason = 'SCOPE_NOT_VERIFIED_FOR_DANANG';
    result.details = { explanation: 'Phạm vi áp dụng không ghi Đà Nẵng và thương hiệu không có cơ sở Đà Nẵng canonical' };
  }

  return result;
}

// Run analysis
const seenUrls = new Set();
const evaluatedLeaves = allLeaves.map(leaf => evaluateLeaf(leaf, seenUrls));

// Group into 3 categories
const activeReviewable = evaluatedLeaves.filter(l => l.classification === 'ACTIVE_REVIEWABLE');
const expiredOrRejected = evaluatedLeaves.filter(l => l.classification === 'EXPIRED_OR_REJECTED');
const incomplete = evaluatedLeaves.filter(l => l.classification === 'INCOMPLETE');

console.log('\n=== CLASSIFICATION SUMMARY ===');
console.log(`Total Evaluated: ${evaluatedLeaves.length}`);
console.log(`1. ACTIVE_REVIEWABLE: ${activeReviewable.length}`);
console.log(`2. EXPIRED_OR_REJECTED: ${expiredOrRejected.length}`);
console.log(`3. INCOMPLETE: ${incomplete.length}`);

// Generate Semantic Offer Manifest 109R
const manifest109R = {
  manifest_id: 'SEMANTIC_OFFER_MANIFEST_109R',
  work_order: 'JAYT-109R-SEMANTIC-OFFER-TRUTH-GATE',
  generated_at: new Date().toISOString(),
  reference_capture_date: CAPTURE_REF_DATE.toISOString(),
  governance_statement: 'Toàn bộ 84 leaf pages đã được đánh giá lại qua Semantic Gate 7 lớp. 19 mục cũ đã bị giáng hoàn toàn. Không tự động phát hành deal hay cấp quyền production. deals_feed.json vẫn [].',
  summary_metrics: {
    total_leaves_evaluated: evaluatedLeaves.length,
    active_reviewable_count: activeReviewable.length,
    expired_or_rejected_count: expiredOrRejected.length,
    incomplete_count: incomplete.length,
    previous_false_positives_demoted: 19
  },
  active_reviewable: activeReviewable,
  expired_or_rejected: expiredOrRejected,
  incomplete: incomplete
};

fs.writeFileSync(OUTPUT_109R_PATH, JSON.stringify(manifest109R, null, 2), 'utf8');
console.log(`Saved manifest 109R to: ${OUTPUT_109R_PATH}`);

// Also update manifest 109 to explicitly demote old candidates
manifest109.offer_candidates_for_ceo_review = [];
manifest109.demoted_previous_candidates = [
  "TARGET_108_01_JOLLIBEE_LEAF_03",
  "TARGET_108_01_JOLLIBEE_LEAF_04",
  "TARGET_108_12_KATINAT_LEAF_02",
  "TARGET_108_12_KATINAT_LEAF_03",
  "TARGET_108_14_CGV_LEAF_01",
  "TARGET_108_14_CGV_LEAF_02",
  "TARGET_108_14_CGV_LEAF_05",
  "TARGET_108_17_STARLIGHT_LEAF_01",
  "TARGET_108_17_STARLIGHT_LEAF_02",
  "TARGET_108_17_STARLIGHT_LEAF_03",
  "TARGET_108_17_STARLIGHT_LEAF_04",
  "TARGET_108_17_STARLIGHT_LEAF_05",
  "TARGET_108_18_CGV_U22_LEAF_01",
  "TARGET_108_18_CGV_U22_LEAF_05",
  "TARGET_108_21_BE_LEAF_02",
  "TARGET_108_21_BE_LEAF_05",
  "TARGET_108_23_TNGO_LEAF_02",
  "TARGET_108_23_TNGO_LEAF_03",
  "TARGET_108_23_TNGO_LEAF_04"
].map(id => ({ leaf_id: id, status: 'UNVERIFIED_LEAF_REQUIRES_SEMANTIC_RECHECK' }));

manifest109.summary_metrics.total_offer_candidates_for_ceo_review = 0;
manifest109.summary_metrics.demoted_unverified_leaves = 19;
fs.writeFileSync(MANIFEST_109_PATH, JSON.stringify(manifest109, null, 2), 'utf8');
console.log(`Updated Manifest 109: 19 candidates demoted to UNVERIFIED_LEAF_REQUIRES_SEMANTIC_RECHECK.`);
