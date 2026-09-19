/**
 * JAYT AUTONOMOUS FRESH SUPPLY COMPILER (140)
 * Directive: JAYT-140 — FRESH SUPPLY OPERATING LOOP & BATCH STAGING AUTONOMY
 * 
 * STRICT ARCHITECTURAL CONSTRAINTS:
 * 1. Operates on 3 Parallel Supply Streams: Fresh Source Loop, Community Signal Intake, Inbound Evidence.
 * 2. Tier 1 (Discovery-Only): RSS, hubs, category roots, listings classified as DISCOVERY_ONLY_LISTING. Zero candidate generation.
 * 3. Tier 2 (Canonical Leaf): Each leaf has a unique promotion_unit_id.
 * 4. Atomicity Gate: Offer, terms, validity MUST all share the same promotion_unit_id within the single canonical leaf.
 * 5. Gate 1: Offer must contain an explicit quantified benefit.
 * 6. Gate 2: Strict Locality Gate: Anti-footer, anti-copyright, anti-year-as-house-number. Word boundary enforced on P./TP.
 * 7. Automated Staging Gate Evaluation (Threshold: >= 10 candidates, >= 3 cohorts, >= 5 days/week).
 * 8. Safe Community Feed Assembly (Exposes only verified venues, unverified community signals under review, and monitored sources).
 * 9. Metric conservation invariance (exact 360 == 360 sum).
 * 10. ZERO live deployment / catalog production locked.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const rawCapturesDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_139', 'captures_139');
const freshRegistryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_140.json');
const communityQueuePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'community_signal_queue_140.json');
const inboundIntakePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'inbound_evidence_intake_140.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_140_manifest.json');

function getSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function extractFragmentWithStrictContext(haystack, regex, artifactRelPath, artifactSha, minLength = 6) {
  const match = haystack.match(regex);
  if (!match) return null;
  const quote = match[0].trim();
  if (quote.length < minLength) return null;

  const startOffset = match.index;
  const endOffset = startOffset + match[0].length;

  let pad = 120;
  let ctxStart = Math.max(0, startOffset - pad);
  let ctxEnd = Math.min(haystack.length, endOffset + pad);
  let contextWindow = haystack.substring(ctxStart, ctxEnd);

  while (contextWindow.length < 200 && (ctxStart > 0 || ctxEnd < haystack.length)) {
    pad += 50;
    ctxStart = Math.max(0, startOffset - pad);
    ctxEnd = Math.min(haystack.length, endOffset + pad);
    contextWindow = haystack.substring(ctxStart, ctxEnd);
  }

  if (haystack.substring(startOffset, endOffset) !== match[0]) {
    return null;
  }

  return {
    artifact_path: artifactRelPath,
    artifact_sha256: artifactSha,
    quote: match[0],
    start_offset: startOffset,
    end_offset: endOffset,
    context_window: contextWindow
  };
}

function areOffsetsDisjoint(fragments) {
  const inPageFrags = fragments.filter(f => f && f.start_offset !== undefined && f.end_offset !== undefined);
  for (let i = 0; i < inPageFrags.length; i++) {
    for (let j = i + 1; j < inPageFrags.length; j++) {
      const f1 = inPageFrags[i];
      const f2 = inPageFrags[j];
      if (f1.artifact_path === f2.artifact_path) {
        if (Math.max(f1.start_offset, f2.start_offset) < Math.min(f1.end_offset, f2.end_offset)) {
          return false;
        }
      }
    }
  }
  return true;
}

function extractDynamicEntityTokens(text, sourceUrl) {
  const tokens = [];
  try {
    const u = new URL(sourceUrl);
    const hostParts = u.hostname.replace(/^www\./, '').split('.');
    if (hostParts.length > 0 && hostParts[0].length >= 3) {
      tokens.push(hostParts[0].toLowerCase());
    }
  } catch (e) {}

  return tokens;
}

function isStrictVenueAddress(frag) {
  if (!frag) return false;
  const quote = frag.quote;
  const ctx = frag.context_window.toLowerCase();

  if (
    ctx.includes('copyright') ||
    ctx.includes('©') ||
    ctx.includes('bản quyền') ||
    ctx.includes('ubnd') ||
    ctx.includes('sở ') ||
    ctx.includes('giấy phép') ||
    ctx.includes('gpkd') ||
    ctx.includes('chịu trách nhiệm')
  ) {
    return false;
  }

  const strictAddressRegex = /^(?:số\s+)?(?!19\d{2}|20\d{2}|1900|0236)\d{1,4}[A-Za-z\/\-]*\s+(?:đường\s+|phố\s+|đ\.\s+)[A-ZÀ-Ỹa-zà-ỹ0-9\s,\.]+\b(?:quận|q\.|huyện)\s+[A-ZÀ-Ỹa-zà-ỹ\s]+\b(?:tp\.\s*đà nẵng|đà nẵng|tp đà nẵng)\b/i;
  return strictAddressRegex.test(quote);
}

function isDiscoveryListing(url, text) {
  const lowerUrl = (url || '').toLowerCase();
  const lowerText = (text || '').toLowerCase();

  return (
    lowerUrl.includes('/rss/') ||
    lowerUrl.includes('/feed/') ||
    lowerUrl.endsWith('/khuyen-mai') ||
    lowerUrl.endsWith('/khuyen-mai/') ||
    lowerUrl.endsWith('/uu-dai') ||
    lowerUrl.endsWith('/uu-dai/') ||
    lowerUrl.includes('/category/') ||
    lowerUrl.includes('/tag/') ||
    lowerText.includes('tin khuyến mãi và ưu đãi hấp dẫn') ||
    lowerText.includes('danh mục khuyến mãi')
  );
}

function extractDaysOfWeekCovered(validityQuote, termsQuote) {
  const text = (validityQuote + ' ' + termsQuote).toLowerCase();
  const days = new Set();

  if (text.includes('mỗi ngày') || text.includes('hàng ngày') || text.includes('tất cả các ngày') || text.includes('suốt tuần')) {
    ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].forEach(d => days.add(d));
  }
  if (text.includes('từ thứ 2 đến thứ 6') || text.includes('thứ 2 - thứ 6')) {
    ['MON', 'TUE', 'WED', 'THU', 'FRI'].forEach(d => days.add(d));
  }
  if (text.includes('thứ 2') || text.includes('thứ hai')) days.add('MON');
  if (text.includes('thứ 3') || text.includes('thứ ba')) days.add('TUE');
  if (text.includes('thứ 4') || text.includes('thứ tư')) days.add('WED');
  if (text.includes('thứ 5') || text.includes('thứ năm')) days.add('THU');
  if (text.includes('thứ 6') || text.includes('thứ sáu')) days.add('FRI');
  if (text.includes('thứ 7') || text.includes('thứ bảy')) days.add('SAT');
  if (text.includes('chủ nhật')) days.add('SUN');

  return Array.from(days);
}

function compileFreshSupplyBatch140() {
  console.log('🚀 [AUTONOMOUS-SUPPLY-COMPILER-140] Khởi chạy biên dịch Fresh Supply Operating Loop 140...');

  // Load Stream Registries
  const freshRegistry = JSON.parse(fs.readFileSync(freshRegistryPath, 'utf8'));
  const communityQueue = JSON.parse(fs.readFileSync(communityQueuePath, 'utf8'));
  const inboundIntake = JSON.parse(fs.readFileSync(inboundIntakePath, 'utf8'));

  const targets = fs.readdirSync(rawCapturesDir).filter(d => d.startsWith('TARGET_139_'));
  console.log(`📂 Đọc ${targets.length} mục tiêu từ Canonical Leaf Lake.`);
  console.log(`📡 Stream 1 (Fresh Sources Monitored): ${freshRegistry.sources.length}`);
  console.log(`👥 Stream 2 (Community Signals Queue): ${communityQueue.signals.length}`);
  console.log(`📥 Stream 3 (Inbound Submissions): ${inboundIntake.inbound_submissions.length}\n`);

  // --- PASS 1: XÂY DỰNG DANH MỤC CƠ SỞ ĐỊA ĐIỂM ĐÀ NẴNG (STRICT ADMINISTRATIVE VENUE ADDRESS) ---
  const daNangVenuePool = [];

  for (const tId of targets) {
    const targetDir = path.join(rawCapturesDir, tId);
    const txtPath = path.join(targetDir, 'page.txt');
    const metaPath = path.join(targetDir, 'metadata.json');

    if (!fs.existsSync(txtPath) || !fs.existsSync(metaPath)) continue;

    const pageText = fs.readFileSync(txtPath, 'utf8');
    const pageSha = getSha256(fs.readFileSync(txtPath));
    const relTxtPath = path.relative(repoRoot, txtPath).replace(/\\/g, '/');
    const metadata = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

    const rawAddressRegex = /(?:số\s+)?(?!19\d{2}|20\d{2}|1900|0236)\b\d{1,4}[A-Za-z\/\-]*\s+(?:đường\s+|phố\s+|đ\.\s+)[A-ZÀ-Ỹa-zà-ỹ0-9\s,\.]+\b(?:quận|q\.|huyện)\s+[A-ZÀ-Ỹa-zà-ỹ\s]+\b(?:tp\.\s*đà nẵng|đà nẵng|tp đà nẵng)\b/i;
    const addressFrag = extractFragmentWithStrictContext(pageText, rawAddressRegex, relTxtPath, pageSha, 15);

    if (addressFrag && isStrictVenueAddress(addressFrag)) {
      daNangVenuePool.push({
        target_id: tId,
        promotion_unit_id: metadata.promotion_unit_id,
        tokens: extractDynamicEntityTokens(pageText, metadata.source_url),
        address_fragment: addressFrag
      });
    }
  }

  console.log(`🏛️ Pass 1: Đã xác thực ${daNangVenuePool.length} cơ sở địa điểm có địa chỉ hành chính hợp lệ tại Đà Nẵng.`);

  // --- PASS 2: BIÊN DỊCH ATOMIC EVIDENCE BUNDLES CHO TỪNG CANONICAL LEAF ---
  const evidenceBundleCandidates = [];
  const discoveryOnlyListing = [];
  const crossItemMergeBlocked = [];
  const incompleteOfferBenefitUnproven = [];
  const incompleteScopeUnproven = [];
  const incompleteLocationProof = [];
  const localityOnlyStrict = [];
  const incompleteBundles = [];
  const blockedOrError = [];

  const weeklyCoverageAccumulator = new Set();

  for (const tId of targets) {
    const targetDir = path.join(rawCapturesDir, tId);
    const txtPath = path.join(targetDir, 'page.txt');
    const metaPath = path.join(targetDir, 'metadata.json');

    if (!fs.existsSync(txtPath) || !fs.existsSync(metaPath)) continue;

    const pageText = fs.readFileSync(txtPath, 'utf8');
    const pageSha = getSha256(fs.readFileSync(txtPath));
    const relTxtPath = path.relative(repoRoot, txtPath).replace(/\\/g, '/');
    const metadata = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

    const lowerText = pageText.toLowerCase();
    const lowerUrl = (metadata.final_url || '').toLowerCase();

    // 1. Error / 404 / 500 / Blocked Gate
    if (
      metadata.capture_status !== 'OK' ||
      metadata.http_status >= 400 ||
      lowerUrl.includes('error') ||
      lowerUrl.includes('404') ||
      lowerUrl.includes('login') ||
      lowerUrl.includes('dang-nhap') ||
      lowerText.includes('server error in') ||
      lowerText.includes('trang này không thể được tìm thấy') ||
      lowerText.includes('404 not found') ||
      pageText.trim().length < 40
    ) {
      blockedOrError.push({
        target_id: tId,
        promotion_unit_id: metadata.promotion_unit_id,
        cohort: metadata.cohort,
        final_url: metadata.final_url,
        http_status: metadata.http_status,
        reason: `Trang lỗi mạng, HTTP ${metadata.http_status}, hoặc màn hình lỗi server.`
      });
      continue;
    }

    // 2. Tier 1: Discovery-Only Listing / RSS / Hub Gate
    if (isDiscoveryListing(metadata.final_url, pageText)) {
      discoveryOnlyListing.push({
        target_id: tId,
        promotion_unit_id: metadata.promotion_unit_id,
        cohort: metadata.cohort,
        source_url: metadata.source_url,
        final_url: metadata.final_url,
        reason: 'Trang RSS feed, danh mục tổng hợp hoặc listing nhiều ưu đãi (Discovery-Only); chỉ dùng để trích xuất canonical leaf links, không tạo candidate.'
      });
      continue;
    }

    // 3. Reject Institutional / University / Government Pages from Deals
    if (
      lowerText.includes('chức năng và nhiệm vụ') ||
      lowerText.includes('cổng thông tin điện tử thành phố đà nẵng') ||
      lowerText.includes('giới thiệu chung về trường') ||
      lowerText.includes('cơ cấu tổ chức')
    ) {
      const rawAddressRegex = /(?:số\s+)?(?!19\d{2}|20\d{2}|1900|0236)\b\d{1,4}[A-Za-z\/\-]*\s+(?:đường\s+|phố\s+|đ\.\s+)[A-ZÀ-Ỹa-zà-ỹ0-9\s,\.]+\b(?:quận|q\.|huyện)\s+[A-ZÀ-Ỹa-zà-ỹ\s]+\b(?:tp\.\s*đà nẵng|đà nẵng|tp đà nẵng)\b/i;
      const strictAddr = extractFragmentWithStrictContext(pageText, rawAddressRegex, relTxtPath, pageSha, 15);
      if (strictAddr && isStrictVenueAddress(strictAddr)) {
        localityOnlyStrict.push({
          target_id: tId,
          promotion_unit_id: metadata.promotion_unit_id,
          cohort: metadata.cohort,
          source_url: metadata.source_url,
          locality_evidence: strictAddr,
          badge_label: '🔵 ĐỊA ĐIỂM XÁC MINH',
          disclaimer: 'Địa điểm đã xác minh — kiểm tra ưu đãi tại nguồn hoặc tại trường.',
          reason: 'Cơ sở giáo dục / hành chính có địa chỉ xác thực tại Đà Nẵng; không có ưu đãi thương mại.'
        });
      } else {
        const daNangLoc = extractFragmentWithStrictContext(pageText, /(?:Đà Nẵng|Hòa Khánh|Liên Chiểu|Hải Châu|Ngũ Hành Sơn)[^,\.\n]{0,80}/i, relTxtPath, pageSha);
        incompleteLocationProof.push({
          target_id: tId,
          promotion_unit_id: metadata.promotion_unit_id,
          cohort: metadata.cohort,
          source_url: metadata.source_url,
          partial_locality_evidence: daNangLoc,
          reason: 'Cơ quan / trường đại học có nhắc đến địa bàn nhưng thiếu số nhà hoặc cấu trúc địa chỉ hành chính hoàn chỉnh.'
        });
      }
      continue;
    }

    // 4. Extract Fragment 1: Strictly Quantified Benefit Offer
    const isHeadingOrWrapper = (quote, ctx) => {
      const lower = (quote + ' ' + ctx).toLowerCase();
      return (
        lower.includes('trang chủ\n/') ||
        lower.includes('news & offer') ||
        lower.includes('tin mới & ưu đãi') ||
        lower.includes('ưu đãi đặt vé') ||
        lower.includes('mang đến loạt deal') ||
        lower.includes('tin khuyến mãi và ưu đãi hấp dẫn') ||
        lower.includes('lộ diện')
      );
    };

    const quantifiedOfferRegex = /(?:deal mua \d+ tặng \d+, giảm tới \d+%|giảm ngay \d+[\.,]\d+ ?(?:đ|k|đồng|vnđ)[^\n\r]{0,40}|giảm \d+% cho [^\n\r]{5,40}|mua \d+ tặng \d+|giá vé chỉ \d+ ?(?:k|đ)|combo hè \d+ ?(?:k|đ)|deal \d+ pizza size [^\n\r]{5,40}|nhập (?:ngay )?mã:?[ \t\r\n\u00a0]*[A-Z0-9_]{5,20}[ \t\r\n\u00a0]+để được [^\n\r]{0,30}(?:giảm|tặng|miễn phí)[^\n\r]{0,30}\d+|giảm \d+% giá vé|vé xe buýt trợ giá \d+[\.,]\d+ ?(?:đ|đồng)|đồng giá \d+[\.,]\d+ ?(?:đ|k|đồng|vnđ)|chỉ từ \d+[\.,]\d+ ?(?:đ|k|đồng|vnđ))/i;
    let offerFrag = extractFragmentWithStrictContext(pageText, quantifiedOfferRegex, relTxtPath, pageSha, 10);

    if (offerFrag && isHeadingOrWrapper(offerFrag.quote, offerFrag.context_window)) {
      incompleteOfferBenefitUnproven.push({
        target_id: tId,
        promotion_unit_id: metadata.promotion_unit_id,
        cohort: metadata.cohort,
        source_url: metadata.source_url,
        generic_heading_evidence: offerFrag,
        reason: 'Trích đoạn ưu đãi nằm trong tiêu đề bài viết / PR announcement wrapper ("Mang Đến Loạt Deal..."), thiếu câu cam kết quyền lợi định lượng cụ thể tại điểm bán.'
      });
      continue;
    }

    const genericHeadingRegex = /(?:ưu đãi hấp dẫn|tin mới & ưu đãi|chương trình khuyến mãi|deal hot|khuyến mãi mới nhất)/i;
    const genericHeadingFrag = extractFragmentWithStrictContext(pageText, genericHeadingRegex, relTxtPath, pageSha, 8);

    if (!offerFrag && genericHeadingFrag) {
      incompleteOfferBenefitUnproven.push({
        target_id: tId,
        promotion_unit_id: metadata.promotion_unit_id,
        cohort: metadata.cohort,
        source_url: metadata.source_url,
        generic_heading_evidence: genericHeadingFrag,
        reason: 'Trang chứa tiêu đề/chuyên mục khuyến mãi chung chung ("Ưu đãi hấp dẫn..."), nhưng không trích xuất được câu diễn đạt lợi ích định lượng cụ thể (thiếu giá, mức giảm hoặc BOGO).'
      });
      continue;
    }

    // 5. Extract Fragment 2: Substantive Terms & Conditions
    const termsRegex = /(?:chương trình áp dụng cho [^\n\r]{15,120}|đối tượng khuyến mại:\s*[^\n\r]{15,120}|điều kiện áp dụng:\s*[^\n\r]{15,120}|\* mua \d+ [^\n\r]{15,140}|áp dụng khi mua [^\n\r]{15,100}|khách hàng xuất trình [^\n\r]{15,100}|áp dụng cho học sinh, sinh viên|dành cho sinh viên [^\n\r]{10,80}|áp dụng đối với [^\n\r]{10,80})/i;
    const termsFrag = extractFragmentWithStrictContext(pageText, termsRegex, relTxtPath, pageSha, 15);

    // 6. Extract Fragment 3: Validity Date or Recurring Policy
    const validityRegex = /(?:thời gian áp dụng:\s*từ nay\s*-\s*(\d{1,2}\/\d{1,2}\/202[6-9])|thời gian:\s*\d{1,2}\/\d{1,2}\s*-\s*(\d{1,2}\/\d{1,2}\/202[6-9])|áp dụng đến (\d{1,2}\/\d{1,2}\/202[6-9])|\* áp dụng mỗi ngày cho [^\n\r]{10,80}|thứ [2-7] hàng tuần|niên khóa \d{4}-\d{4}|thứ [2-7] và thứ [2-7] hàng tuần|áp dụng vào thứ [2-7])/i;
    const validityFrag = extractFragmentWithStrictContext(pageText, validityRegex, relTxtPath, pageSha, 10);

    // 7. Extract Fragment 4: Da Nang Scope (Syntactic Application Predicate or Dual Lineage)
    const directScopePredicateRegex = /(?:áp dụng (?:tại|cho|ở)|chỉ áp dụng tại|tại các? (?:rạp|chi nhánh|cửa hàng))[^\n\r]{2,80}(?:tp\.\s*đà nẵng|đà nẵng)/i;
    let scopeFrag = extractFragmentWithStrictContext(pageText, directScopePredicateRegex, relTxtPath, pageSha, 12);
    let lineageReceipt = null;

    if (!scopeFrag && offerFrag && termsFrag) {
      const unlinkedBranchRegex = /(?:[A-ZÀ-Ỹa-zà-ỹ0-9\s]{3,30}\s+đà nẵng)/i;
      const unlinkedFrag = extractFragmentWithStrictContext(pageText, unlinkedBranchRegex, relTxtPath, pageSha, 8);

      const nationwideRegex = /(?:địa điểm sử dụng:\s*hệ thống [^\n\r]{0,30} trên toàn quốc|áp dụng trên toàn quốc|áp dụng toàn hệ thống trên toàn quốc|toàn bộ chi nhánh trên toàn quốc|áp dụng trên toàn lãnh thổ việt nam)/i;
      const nationwideFrag = extractFragmentWithStrictContext(pageText, nationwideRegex, relTxtPath, pageSha, 15);

      if (nationwideFrag) {
        const currentTokens = extractDynamicEntityTokens(pageText, metadata.source_url);
        const matchedVenue = daNangVenuePool.find(v => {
          return currentTokens.some(tok => v.tokens.includes(tok));
        });

        if (matchedVenue) {
          lineageReceipt = {
            lineage_type: 'NATIONWIDE_OFFER_BOUND_TO_PHYSICAL_DANANG_BRANCH',
            nationwide_scope_evidence: nationwideFrag,
            bound_venue_target_id: matchedVenue.target_id,
            bound_promotion_unit_id: matchedVenue.promotion_unit_id,
            danang_branch_address_evidence: matchedVenue.address_fragment
          };
          scopeFrag = matchedVenue.address_fragment;
        }
      } else if (unlinkedFrag) {
        incompleteScopeUnproven.push({
          target_id: tId,
          promotion_unit_id: metadata.promotion_unit_id,
          cohort: metadata.cohort,
          source_url: metadata.source_url,
          offer_evidence: offerFrag,
          terms_evidence: termsFrag,
          validity_evidence: validityFrag,
          unproven_scope_evidence: unlinkedFrag,
          reason: 'Địa danh Đà Nẵng xuất hiện trên trang nhưng không có mệnh đề cú pháp chứng minh ưu đãi áp dụng tại Đà Nẵng (Scope appears, but scope application unproven).'
        });
        continue;
      }
    }

    // 8. Atomicity Check & Fragment Validation
    if (offerFrag && termsFrag && validityFrag && scopeFrag) {
      const maxOffsetDist = Math.max(offerFrag.start_offset, termsFrag.start_offset, validityFrag.start_offset) - 
                            Math.min(offerFrag.start_offset, termsFrag.start_offset, validityFrag.start_offset);

      if (maxOffsetDist > 4000) {
        crossItemMergeBlocked.push({
          target_id: tId,
          promotion_unit_id: metadata.promotion_unit_id,
          cohort: metadata.cohort,
          source_url: metadata.source_url,
          offer_evidence: offerFrag,
          terms_evidence: termsFrag,
          validity_evidence: validityFrag,
          offset_distance: maxOffsetDist,
          reason: `Khoảng cách giữa các mảnh chứng cứ quá lớn (${maxOffsetDist} ký tự) trên trang; nghi vấn ghép mảnh giữa các bài viết khác nhau (Cross-Item Merge Blocked).`
        });
        continue;
      }

      const inPageOffsets = [offerFrag, termsFrag, validityFrag];
      if (!lineageReceipt) inPageOffsets.push(scopeFrag);

      const disjoint = areOffsetsDisjoint(inPageOffsets);
      const quotesDistinct = (
        offerFrag.quote !== termsFrag.quote &&
        offerFrag.quote !== validityFrag.quote &&
        termsFrag.quote !== validityFrag.quote
      );
      const contextValid = (
        offerFrag.context_window.length >= 200 &&
        termsFrag.context_window.length >= 200 &&
        validityFrag.context_window.length >= 200 &&
        scopeFrag.context_window.length >= 200
      );

      if (disjoint && quotesDistinct && contextValid) {
        const daysCovered = extractDaysOfWeekCovered(validityFrag.quote, termsFrag.quote);
        daysCovered.forEach(d => weeklyCoverageAccumulator.add(d));

        evidenceBundleCandidates.push({
          target_id: tId,
          promotion_unit_id: metadata.promotion_unit_id,
          cohort: metadata.cohort,
          source_url: metadata.source_url,
          final_url: metadata.final_url,
          provenance: metadata.provenance,
          status: 'EVIDENCE_BUNDLE_CANDIDATE',
          evidence_bundle: {
            promotion_unit_id: metadata.promotion_unit_id,
            offer: offerFrag,
            terms: termsFrag,
            validity: validityFrag,
            danang_scope: scopeFrag,
            days_of_week_covered: daysCovered,
            relational_lineage_receipt: lineageReceipt
          }
        });
        continue;
      }
    }

    // 9. Strict Administrative Address for Locality Only (Anti-Footer Gate)
    const rawAddressRegex = /(?:số\s+)?(?!19\d{2}|20\d{2}|1900|0236)\b\d{1,4}[A-Za-z\/\-]*\s+(?:đường\s+|phố\s+|đ\.\s+)[A-ZÀ-Ỹa-zà-ỹ0-9\s,\.]+\b(?:quận|q\.|huyện)\s+[A-ZÀ-Ỹa-zà-ỹ\s]+\b(?:tp\.\s*đà nẵng|đà nẵng|tp đà nẵng)\b/i;
    const strictAddressFrag = extractFragmentWithStrictContext(pageText, rawAddressRegex, relTxtPath, pageSha, 15);

    if (strictAddressFrag && isStrictVenueAddress(strictAddressFrag)) {
      localityOnlyStrict.push({
        target_id: tId,
        promotion_unit_id: metadata.promotion_unit_id,
        cohort: metadata.cohort,
        source_url: metadata.source_url,
        locality_evidence: strictAddressFrag,
        badge_label: '🔵 ĐỊA ĐIỂM XÁC MINH',
        disclaimer: 'Địa điểm đã xác minh — kiểm tra ưu đãi tại nguồn hoặc tại quán.',
        reason: 'Cơ sở có địa chỉ hành chính hoàn chỉnh tại Đà Nẵng; không chứa đầy đủ 4 mảnh chứng từ ưu đãi.'
      });
      continue;
    } else {
      if (lowerText.includes('đà nẵng') || lowerText.includes('hải châu') || lowerText.includes('nguyễn văn linh')) {
        const looseLoc = extractFragmentWithStrictContext(pageText, /(?:Đà Nẵng|Hải Châu|Nguyễn Văn Linh|Bạch Đằng|Liên Chiểu)[^,\.\n]{0,80}/i, relTxtPath, pageSha);
        incompleteLocationProof.push({
          target_id: tId,
          promotion_unit_id: metadata.promotion_unit_id,
          cohort: metadata.cohort,
          source_url: metadata.source_url,
          partial_locality_evidence: looseLoc,
          reason: 'Địa điểm có nhắc đến địa bàn Đà Nẵng hoặc footer/bản quyền nhưng thiếu số nhà hoặc cấu trúc địa chỉ hành chính cơ sở phục vụ khách.'
        });
        continue;
      }
    }

    incompleteBundles.push({
      target_id: tId,
      promotion_unit_id: metadata.promotion_unit_id,
      cohort: metadata.cohort,
      source_url: metadata.source_url,
      missing_fragments: {
        offer: !offerFrag,
        terms: !termsFrag,
        validity: !validityFrag,
        danang_scope: !scopeFrag
      },
      reason: 'Trang thông tin chung, thiếu các mảnh chứng từ ưu đãi hợp lệ hoặc thiếu địa chỉ hoàn chỉnh.'
    });
  }

  // Cohort breakdown
  const cohortCoverage = {};
  for (const t of targets) {
    const meta = JSON.parse(fs.readFileSync(path.join(rawCapturesDir, t, 'metadata.json'), 'utf8'));
    const c = meta.cohort || 'OTHER';
    if (!cohortCoverage[c]) {
      cohortCoverage[c] = { total: 0, ok: 0, blocked_or_error: 0, candidates: 0, discovery_only: 0, cross_item_blocked: 0, locality_strict: 0, incomplete_scope: 0, incomplete_offer_benefit: 0, incomplete_location: 0, incomplete: 0 };
    }
    cohortCoverage[c].total++;
    if (meta.capture_status === 'OK' && meta.http_status < 400) cohortCoverage[c].ok++;
    else cohortCoverage[c].blocked_or_error++;
  }

  for (const item of evidenceBundleCandidates) cohortCoverage[item.cohort].candidates++;
  for (const item of discoveryOnlyListing) cohortCoverage[item.cohort].discovery_only++;
  for (const item of crossItemMergeBlocked) cohortCoverage[item.cohort].cross_item_blocked++;
  for (const item of localityOnlyStrict) cohortCoverage[item.cohort].locality_strict++;
  for (const item of incompleteScopeUnproven) cohortCoverage[item.cohort].incomplete_scope++;
  for (const item of incompleteOfferBenefitUnproven) cohortCoverage[item.cohort].incomplete_offer_benefit++;
  for (const item of incompleteLocationProof) cohortCoverage[item.cohort].incomplete_location++;
  for (const item of incompleteBundles) cohortCoverage[item.cohort].incomplete++;

  const distinctCohortsWithCandidates = Object.keys(cohortCoverage).filter(k => cohortCoverage[k].candidates > 0).length;
  const daysOfWeekCount = weeklyCoverageAccumulator.size;
  const isStagingProposalReady = (
    evidenceBundleCandidates.length >= 10 &&
    distinctCohortsWithCandidates >= 3 &&
    daysOfWeekCount >= 5
  );

  const automatedDecision = isStagingProposalReady ? 'STAGING_PROPOSAL_READY' : 'CONTINUE_ACQUISITION';

  // Build Community Safe Feed Elements (Transparent Display while Accumulating Supply)
  const safeCommunityFeed = {
    verified_venues_count: localityOnlyStrict.length,
    community_signals_under_review: communityQueue.signals.map(s => ({
      signal_id: s.signal_id,
      badge: '🟡 TÍN HIỆU CỘNG ĐỒNG ĐANG KIỂM TRA',
      canonical_domain: s.validation.canonical_hostname,
      submitted_description: s.submitted_description,
      status: s.status,
      disclaimer: 'Tín hiệu cộng đồng gửi lên — đang chờ kiểm chứng qua bài viết chính thức; không phải ưu đãi đã xác thực.'
    })),
    monitored_official_sources: freshRegistry.sources.map(s => ({
      source_id: s.source_id,
      badge: '🟣 NGUỒN ĐANG THEO DÕI',
      brand_name: s.brand_name,
      source_type: s.source_type,
      canonical_url: s.canonical_url,
      last_checked: s.last_captured_timestamp,
      disclaimer: 'Nguồn chính thức đang được theo dõi định kỳ để phát hiện ưu đãi mới.'
    }))
  };

  const manifest140 = {
    manifest_id: 'BATCH_CAPTURE_140_MANIFEST',
    directive: 'JAYT-140 — FRESH SUPPLY OPERATING LOOP & BATCH STAGING AUTONOMY',
    generated_at: new Date().toISOString(),
    governance_statement: 'Vận hành 3 luồng nguồn cung tự chủ (Fresh Source Loop, Community Signals, Inbound Evidence). Zero deal gán VERIFIED trong 140. Production locked.',
    streams_summary: {
      fresh_sources_monitored: freshRegistry.sources.length,
      community_signals_queued: communityQueue.signals.length,
      inbound_submissions: inboundIntake.inbound_submissions.length
    },
    summary_metrics: {
      total_targets_evaluated: targets.length,
      evidence_bundle_candidates_count: evidenceBundleCandidates.length,
      discovery_only_listing_count: discoveryOnlyListing.length,
      cross_item_merge_blocked_count: crossItemMergeBlocked.length,
      incomplete_offer_benefit_unproven_count: incompleteOfferBenefitUnproven.length,
      incomplete_scope_unproven_count: incompleteScopeUnproven.length,
      incomplete_location_proof_count: incompleteLocationProof.length,
      locality_only_strict_count: localityOnlyStrict.length,
      incomplete_count: incompleteBundles.length,
      blocked_or_error_count: blockedOrError.length,
      metric_conservation_check: (
        evidenceBundleCandidates.length +
        discoveryOnlyListing.length +
        crossItemMergeBlocked.length +
        incompleteOfferBenefitUnproven.length +
        incompleteScopeUnproven.length +
        incompleteLocationProof.length +
        localityOnlyStrict.length +
        incompleteBundles.length +
        blockedOrError.length
      ),
      weekly_coverage_days: Array.from(weeklyCoverageAccumulator),
      weekly_coverage_days_count: daysOfWeekCount,
      cohorts_with_candidates_count: distinctCohortsWithCandidates,
      automated_staging_gate_evaluation: {
        min_candidates_met: evidenceBundleCandidates.length >= 10,
        min_cohorts_met: distinctCohortsWithCandidates >= 3,
        min_days_met: daysOfWeekCount >= 5,
        decision_verdict: automatedDecision
      }
    },
    safe_community_feed: safeCommunityFeed,
    cohort_coverage: cohortCoverage,
    evidence_bundle_candidates: evidenceBundleCandidates,
    discovery_only_listing: discoveryOnlyListing,
    cross_item_merge_blocked: crossItemMergeBlocked,
    incomplete_offer_benefit_unproven: incompleteOfferBenefitUnproven,
    incomplete_scope_unproven: incompleteScopeUnproven,
    incomplete_location_proof: incompleteLocationProof,
    locality_only_strict: localityOnlyStrict,
    incomplete_bundles: incompleteBundles,
    blocked_or_error: blockedOrError
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest140, null, 2), 'utf8');

  console.log('========================================================================');
  console.log('📊 KẾT QUẢ BIÊN DỊCH FRESH SUPPLY LOOP 140 (360 TARGETS):');
  console.log(`- Tổng số mục tiêu đánh giá: ${targets.length} / 360`);
  console.log(`- Stream 1 (Fresh Sources Monitored): ${freshRegistry.sources.length}`);
  console.log(`- Stream 2 (Community Signals Queued): ${communityQueue.signals.length}`);
  console.log(`- Stream 3 (Inbound Submissions): ${inboundIntake.inbound_submissions.length}`);
  console.log(`- EVIDENCE_BUNDLE_CANDIDATE: ${evidenceBundleCandidates.length}`);
  console.log(`- DISCOVERY_ONLY_LISTING: ${discoveryOnlyListing.length}`);
  console.log(`- CROSS_ITEM_MERGE_BLOCKED: ${crossItemMergeBlocked.length}`);
  console.log(`- INCOMPLETE_OFFER_BENEFIT_UNPROVEN: ${incompleteOfferBenefitUnproven.length}`);
  console.log(`- INCOMPLETE_SCOPE_UNPROVEN: ${incompleteScopeUnproven.length}`);
  console.log(`- INCOMPLETE_LOCATION_PROOF: ${incompleteLocationProof.length}`);
  console.log(`- LOCALITY_ONLY_STRICT: ${localityOnlyStrict.length}`);
  console.log(`- INCOMPLETE: ${incompleteBundles.length}`);
  console.log(`- BLOCKED_OR_ERROR: ${blockedOrError.length}`);
  console.log(`- Metric Conservation Check: ${manifest140.summary_metrics.metric_conservation_check} == ${targets.length}`);
  console.log(`- Automated Staging Decision: 🎯 [${automatedDecision}]`);
  console.log(`- Manifest 140 Path: ${manifestPath}`);
  console.log('========================================================================\n');
}

compileFreshSupplyBatch140();
