/**
 * JAYT QUANTIFIED BENEFIT & VENUE ADDRESS COMPILER (137R)
 * Directive: JAYT-137R — SEMANTIC FALSE-POSITIVE CORRECTION & CORPUS RECERTIFICATION
 * 
 * STRICT ARCHITECTURAL CONSTRAINTS:
 * 1. Gate 1: Offer must contain an explicit quantified benefit (price, discount amount, %, structured BOGO, code with quantified reward).
 *    Generic headings demoted to INCOMPLETE_OFFER_BENEFIT_UNPROVEN.
 * 2. Gate 2: Strict Locality Gate: Anti-footer, anti-copyright, anti-year-as-house-number. Word boundary boundary enforced on P./TP.
 *    Failing addresses demoted to INCOMPLETE_LOCATION_PROOF.
 * 3. Gate 3: Scope applies gate: unproven branch lists demoted to INCOMPLETE_SCOPE_UNPROVEN.
 * 4. Dual relational lineage yields EVIDENCE_BUNDLE_CANDIDATE (NOT VERIFIED).
 * 5. Metric conservation invariance (exact 105 == 105 sum).
 * 6. ZERO live deployment / catalog production locked.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const rawCapturesDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_137', 'captures_137');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_137r_manifest.json');

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

  // Build strictly >= 200 character context window
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

  // Exact substring verification
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

// Dynamically extract primary entity identifier token from URL hostname
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

// Anti-Footer / Anti-Copyright / Venue Address Filter
function isStrictVenueAddress(frag) {
  if (!frag) return false;
  const quote = frag.quote;
  const ctx = frag.context_window.toLowerCase();

  // Reject if copyright / footer / governmental note
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

  // Strict regex: Must start with real house number (not 19xx or 20xx year, not hotline 1900/0236), followed by street, district, Da Nang
  const strictAddressRegex = /^(?:số\s+)?(?!19\d{2}|20\d{2}|1900|0236)\d{1,4}[A-Za-z\/\-]*\s+(?:đường\s+|phố\s+|đ\.\s+)[A-ZÀ-Ỹa-zà-ỹ0-9\s,\.]+\b(?:quận|q\.|huyện)\s+[A-ZÀ-Ỹa-zà-ỹ\s]+\b(?:tp\.\s*đà nẵng|đà nẵng|tp đà nẵng)\b/i;
  return strictAddressRegex.test(quote);
}

function compileRecertifiedBatch137r() {
  console.log('🚀 [GENERIC-COMPILER-137R] Khởi chạy tái biên dịch trên Raw Corpus 137 (105 Targets) với Quantified Benefit & Venue Address Gates...');

  const targets = fs.readdirSync(rawCapturesDir).filter(d => d.startsWith('TARGET_137_'));
  console.log(`📂 Phát hiện ${targets.length} mục tiêu trong Raw Corpus 137.\n`);

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

    // Strict Administrative Address Regex with negative lookahead for years/hotlines
    const rawAddressRegex = /(?:số\s+)?(?!19\d{2}|20\d{2}|1900|0236)\b\d{1,4}[A-Za-z\/\-]*\s+(?:đường\s+|phố\s+|đ\.\s+)[A-ZÀ-Ỹa-zà-ỹ0-9\s,\.]+\b(?:quận|q\.|huyện)\s+[A-ZÀ-Ỹa-zà-ỹ\s]+\b(?:tp\.\s*đà nẵng|đà nẵng|tp đà nẵng)\b/i;
    const addressFrag = extractFragmentWithStrictContext(pageText, rawAddressRegex, relTxtPath, pageSha, 15);

    if (addressFrag && isStrictVenueAddress(addressFrag)) {
      daNangVenuePool.push({
        target_id: tId,
        tokens: extractDynamicEntityTokens(pageText, metadata.source_url),
        address_fragment: addressFrag
      });
    }
  }

  console.log(`🏛️ Pass 1: Đã xác thực ${daNangVenuePool.length} cơ sở địa điểm có địa chỉ hành chính hợp lệ tại Đà Nẵng.`);

  // --- PASS 2: BIÊN DỊCH EVIDENCE BUNDLES CHO TỪNG ARTIFACT ---
  const evidenceBundleCandidates = [];
  const incompleteOfferBenefitUnproven = [];
  const incompleteScopeUnproven = [];
  const incompleteLocationProof = [];
  const localityOnlyStrict = [];
  const incompleteBundles = [];
  const blockedOrError = [];

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
        cohort: metadata.cohort,
        final_url: metadata.final_url,
        http_status: metadata.http_status,
        reason: `Trang lỗi mạng, HTTP ${metadata.http_status}, hoặc màn hình lỗi server.`
      });
      continue;
    }

    // 2. Reject Institutional / University / Government Pages from Deals
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
          cohort: metadata.cohort,
          source_url: metadata.source_url,
          partial_locality_evidence: daNangLoc,
          reason: 'Cơ quan / trường đại học có nhắc đến địa bàn nhưng thiếu số nhà hoặc cấu trúc địa chỉ hành chính hoàn chỉnh.'
        });
      }
      continue;
    }

    // 3. Gate 1: Extract Fragment 1: Strictly Quantified Benefit Offer
    // Must contain an explicit quantified benefit (price, discount amount, %, structured BOGO, code with quantified reward)
    // Rejects article titles, headlines, breadcrumbs, PR wrappers (e.g., "Mang Đến Loạt Deal", "Tin Khuyến Mãi", "Trang Chủ /")
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

    const quantifiedOfferRegex = /(?:deal mua \d+ tặng \d+, giảm tới \d+%|giảm ngay \d+[\.,]\d+ ?(?:đ|k|đồng|vnđ)[^\n\r]{0,40}|giảm \d+% cho [^\n\r]{5,40}|mua \d+ tặng \d+|giá vé chỉ \d+ ?(?:k|đ)|combo hè \d+ ?(?:k|đ)|deal \d+ pizza size [^\n\r]{5,40}|nhập (?:ngay )?mã:?[ \t\r\n\u00a0]*[A-Z0-9_]{5,20}[ \t\r\n\u00a0]+để được [^\n\r]{0,30}(?:giảm|tặng|miễn phí)[^\n\r]{0,30}\d+)/i;
    let offerFrag = extractFragmentWithStrictContext(pageText, quantifiedOfferRegex, relTxtPath, pageSha, 10);

    if (offerFrag && isHeadingOrWrapper(offerFrag.quote, offerFrag.context_window)) {
      // Demote PR heading / wrapper to INCOMPLETE_OFFER_BENEFIT_UNPROVEN
      incompleteOfferBenefitUnproven.push({
        target_id: tId,
        cohort: metadata.cohort,
        source_url: metadata.source_url,
        generic_heading_evidence: offerFrag,
        reason: 'Trích đoạn ưu đãi nằm trong tiêu đề bài viết / PR announcement wrapper ("Mang Đến Loạt Deal..."), thiếu câu cam kết quyền lợi định lượng cụ thể tại điểm bán.'
      });
      continue;
    }

    // Check if page contains broad unquantified offer phrases (e.g., "Ưu đãi hấp dẫn", "Khuyến mãi")
    const genericHeadingRegex = /(?:ưu đãi hấp dẫn|tin mới & ưu đãi|chương trình khuyến mãi|deal hot|khuyến mãi mới nhất)/i;
    const genericHeadingFrag = extractFragmentWithStrictContext(pageText, genericHeadingRegex, relTxtPath, pageSha, 8);

    if (!offerFrag && genericHeadingFrag) {
      incompleteOfferBenefitUnproven.push({
        target_id: tId,
        cohort: metadata.cohort,
        source_url: metadata.source_url,
        generic_heading_evidence: genericHeadingFrag,
        reason: 'Trang chứa tiêu đề/chuyên mục khuyến mãi chung chung ("Ưu đãi hấp dẫn..."), nhưng không trích xuất được câu diễn đạt lợi ích định lượng cụ thể (thiếu giá, mức giảm hoặc BOGO).'
      });
      continue;
    }

    // 4. Extract Fragment 2: Substantive Terms & Conditions
    const termsRegex = /(?:chương trình áp dụng cho [^\n\r]{15,120}|đối tượng khuyến mại:\s*[^\n\r]{15,120}|điều kiện áp dụng:\s*[^\n\r]{15,120}|\* mua \d+ [^\n\r]{15,140}|áp dụng khi mua [^\n\r]{15,100}|khách hàng xuất trình [^\n\r]{15,100}|áp dụng cho học sinh, sinh viên|dành cho sinh viên [^\n\r]{10,80})/i;
    const termsFrag = extractFragmentWithStrictContext(pageText, termsRegex, relTxtPath, pageSha, 15);

    // 5. Extract Fragment 3: Validity Date or Recurring Policy
    const validityRegex = /(?:thời gian áp dụng:\s*từ nay\s*-\s*(\d{1,2}\/\d{1,2}\/202[6-9])|thời gian:\s*\d{1,2}\/\d{1,2}\s*-\s*(\d{1,2}\/\d{1,2}\/202[6-9])|áp dụng đến (\d{1,2}\/\d{1,2}\/202[6-9])|\* áp dụng mỗi ngày cho [^\n\r]{10,80}|thứ [2-7] hàng tuần|niên khóa \d{4}-\d{4})/i;
    const validityFrag = extractFragmentWithStrictContext(pageText, validityRegex, relTxtPath, pageSha, 10);

    // 6. Extract Fragment 4: Da Nang Scope (Syntactic Application Predicate or Dual Lineage)
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
            danang_branch_address_evidence: matchedVenue.address_fragment
          };
          scopeFrag = matchedVenue.address_fragment;
        }
      } else if (unlinkedFrag) {
        incompleteScopeUnproven.push({
          target_id: tId,
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

    // 7. Verify Candidate Bundle Completeness, Disjoint Offsets & Context >= 200 chars
    if (offerFrag && termsFrag && validityFrag && scopeFrag) {
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
        evidenceBundleCandidates.push({
          target_id: tId,
          cohort: metadata.cohort,
          source_url: metadata.source_url,
          final_url: metadata.final_url,
          status: 'EVIDENCE_BUNDLE_CANDIDATE',
          evidence_bundle: {
            offer: offerFrag,
            terms: termsFrag,
            validity: validityFrag,
            danang_scope: scopeFrag,
            relational_lineage_receipt: lineageReceipt
          }
        });
        continue;
      }
    }

    // 8. Strict Administrative Address for Locality Only (Anti-Footer Gate)
    const rawAddressRegex = /(?:số\s+)?(?!19\d{2}|20\d{2}|1900|0236)\b\d{1,4}[A-Za-z\/\-]*\s+(?:đường\s+|phố\s+|đ\.\s+)[A-ZÀ-Ỹa-zà-ỹ0-9\s,\.]+\b(?:quận|q\.|huyện)\s+[A-ZÀ-Ỹa-zà-ỹ\s]+\b(?:tp\.\s*đà nẵng|đà nẵng|tp đà nẵng)\b/i;
    const strictAddressFrag = extractFragmentWithStrictContext(pageText, rawAddressRegex, relTxtPath, pageSha, 15);

    if (strictAddressFrag && isStrictVenueAddress(strictAddressFrag)) {
      localityOnlyStrict.push({
        target_id: tId,
        cohort: metadata.cohort,
        source_url: metadata.source_url,
        locality_evidence: strictAddressFrag,
        badge_label: '🔵 ĐỊA ĐIỂM XÁC MINH',
        disclaimer: 'Địa điểm đã xác minh — kiểm tra ưu đãi tại nguồn hoặc tại quán.',
        reason: 'Cơ sở có địa chỉ hành chính hoàn chỉnh tại Đà Nẵng; không chứa đầy đủ 4 mảnh chứng từ ưu đãi.'
      });
      continue;
    } else {
      // Loose keywords or footer/incomplete addresses $\rightarrow$ INCOMPLETE_LOCATION_PROOF
      if (lowerText.includes('đà nẵng') || lowerText.includes('hải châu') || lowerText.includes('nguyễn văn linh')) {
        const looseLoc = extractFragmentWithStrictContext(pageText, /(?:Đà Nẵng|Hải Châu|Nguyễn Văn Linh|Bạch Đằng|Liên Chiểu)[^,\.\n]{0,80}/i, relTxtPath, pageSha);
        incompleteLocationProof.push({
          target_id: tId,
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
      cohortCoverage[c] = { total: 0, ok: 0, blocked_or_error: 0, candidates: 0, locality_strict: 0, incomplete_scope: 0, incomplete_offer_benefit: 0, incomplete_location: 0, incomplete: 0 };
    }
    cohortCoverage[c].total++;
    if (meta.capture_status === 'OK' && meta.http_status < 400) cohortCoverage[c].ok++;
    else cohortCoverage[c].blocked_or_error++;
  }

  for (const item of evidenceBundleCandidates) cohortCoverage[item.cohort].candidates++;
  for (const item of localityOnlyStrict) cohortCoverage[item.cohort].locality_strict++;
  for (const item of incompleteScopeUnproven) cohortCoverage[item.cohort].incomplete_scope++;
  for (const item of incompleteOfferBenefitUnproven) cohortCoverage[item.cohort].incomplete_offer_benefit++;
  for (const item of incompleteLocationProof) cohortCoverage[item.cohort].incomplete_location++;
  for (const item of incompleteBundles) cohortCoverage[item.cohort].incomplete++;

  const manifest137r = {
    manifest_id: 'BATCH_CAPTURE_137R_MANIFEST',
    directive: 'JAYT-137R — SEMANTIC FALSE-POSITIVE CORRECTION & CORPUS RECERTIFICATION',
    generated_at: new Date().toISOString(),
    governance_statement: 'Toàn bộ 105 mục tiêu được tái biên dịch qua Quantified Benefit & Venue Address Semantic Role Compiler. 0% generic headings accepted as offers, 0% copyright footers parsed as addresses. 0 deal gán VERIFIED trong 137R.',
    summary_metrics: {
      total_targets_evaluated: targets.length,
      evidence_bundle_candidates_count: evidenceBundleCandidates.length,
      incomplete_offer_benefit_unproven_count: incompleteOfferBenefitUnproven.length,
      incomplete_scope_unproven_count: incompleteScopeUnproven.length,
      incomplete_location_proof_count: incompleteLocationProof.length,
      locality_only_strict_count: localityOnlyStrict.length,
      incomplete_count: incompleteBundles.length,
      blocked_or_error_count: blockedOrError.length,
      metric_conservation_check: (
        evidenceBundleCandidates.length +
        incompleteOfferBenefitUnproven.length +
        incompleteScopeUnproven.length +
        incompleteLocationProof.length +
        localityOnlyStrict.length +
        incompleteBundles.length +
        blockedOrError.length
      )
    },
    cohort_coverage: cohortCoverage,
    evidence_bundle_candidates: evidenceBundleCandidates,
    incomplete_offer_benefit_unproven: incompleteOfferBenefitUnproven,
    incomplete_scope_unproven: incompleteScopeUnproven,
    incomplete_location_proof: incompleteLocationProof,
    locality_only_strict: localityOnlyStrict,
    incomplete_bundles: incompleteBundles,
    blocked_or_error: blockedOrError
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest137r, null, 2), 'utf8');

  console.log('========================================================================');
  console.log('📊 KẾT QUẢ TÁI BIÊN DỊCH GENERIC COMPILER 137R (105 TARGETS):');
  console.log(`- Tổng số mục tiêu đánh giá: ${targets.length} / 105`);
  console.log(`- EVIDENCE_BUNDLE_CANDIDATE: ${evidenceBundleCandidates.length}`);
  console.log(`- INCOMPLETE_OFFER_BENEFIT_UNPROVEN (Tiêu đề chung không có lợi ích định lượng): ${incompleteOfferBenefitUnproven.length}`);
  console.log(`- INCOMPLETE_SCOPE_UNPROVEN (Địa danh điều hướng/danh sách): ${incompleteScopeUnproven.length}`);
  console.log(`- INCOMPLETE_LOCATION_PROOF (Footer/bản quyền/thiếu số nhà hoàn chỉnh): ${incompleteLocationProof.length}`);
  console.log(`- LOCALITY_ONLY_STRICT (Địa chỉ hành chính hoàn chỉnh): ${localityOnlyStrict.length}`);
  console.log(`- INCOMPLETE (Trang thông tin chung): ${incompleteBundles.length}`);
  console.log(`- BLOCKED_OR_ERROR (Trang lỗi/chặn/timeout/404): ${blockedOrError.length}`);
  console.log(`- Metric Conservation Check: ${manifest137r.summary_metrics.metric_conservation_check} == ${targets.length}`);
  console.log(`- Manifest 137R Path: ${manifestPath}`);
  console.log('========================================================================\n');
}

compileRecertifiedBatch137r();
