/**
 * J358-R3-R3: OFFER SUBTREE & OCCURRENCE-AWARE CLAIM PROVENANCE VALIDATOR
 * Work Order: J358-R3-R3-SELECTOR-AND-BLOCK-HARDENING
 * Authority: Quyết định CEO JAYT-358-R3-R2 (01_EXECUTIVE_COUNCIL/JAYT_358_CEO_R3_R2_PARTIAL_ACCEPTANCE_AND_SELECTOR_GATE.md)
 * 
 * CORE CONTRACT:
 * - Pure evaluator without pre-assigned fields or precomputed outcomes.
 * - Enforces 6 strict source preconditions (SHA-256, byte length, HTTP 200, fetch failure false, soft-404 false, valid URLs & timestamp).
 * - Occurrence-Aware Span Selection (Req 15):
 *     Every span records its occurrence_index (0-based) and total occurrence_count, plus byte offsets and verified byte slice.
 * - Strict Offer-Card Subtree Resolution (Req 14 & 16):
 *     Zero document fallback. If no safe, closed semantic offer container encloses the offer, returns HELD__SEMANTIC_BLOCK_NOT_FOUND.
 *     Rejects broad catalog sections containing multiple cards or title/price in different subtrees (HELD__CROSS_CARD_ELEMENTS_REJECTED).
 * - Same-Subtree Locality & Validity Binding (Req 16 & 17):
 *     Title, price, conditions, locality, and validity must resolve within ONE smallest safe offer-card subtree (or share one unambiguous offer identifier).
 *     Target year (2026) must reside inside the same offer subtree. Unrelated occurrences elsewhere on the page are strictly rejected.
 * - Fails closed: any violation returns HELD with explicit diagnostic reason code.
 * - Zero VERIFIED is an acceptable truthful outcome.
 */

const crypto = require('crypto');

function sha256(buf) {
  if (!Buffer.isBuffer(buf)) {
    buf = Buffer.from(buf, 'utf8');
  }
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function normalizeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x111;/g, 'đ')
    .replace(/&#x110;/g, 'Đ')
    .replace(/&aacute;/g, 'á')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&agrave;/g, 'à')
    .replace(/&Agrave;/g, 'À')
    .replace(/&atilde;/g, 'ã')
    .replace(/&Atilde;/g, 'Ã')
    .replace(/&eacute;/g, 'é')
    .replace(/&Eacute;/g, 'É')
    .replace(/&ecirc;/g, 'ê')
    .replace(/&Ecirc;/g, 'Ê')
    .replace(/&iacute;/g, 'í')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&igrave;/g, 'ì')
    .replace(/&Igrave;/g, 'Ì')
    .replace(/&oacute;/g, 'ó')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&Ocirc;/g, 'Ô')
    .replace(/&uacute;/g, 'ú')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&yacute;/g, 'ý')
    .replace(/&Yacute;/g, 'Ý')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#x1EBF;/g, 'ế')
    .replace(/&#xE0;/g, 'à')
    .replace(/&#xE1;/g, 'á')
    .replace(/&#xE3;/g, 'ã')
    .replace(/&#x1EAF;/g, 'ắ')
    .replace(/&#x1EB7;/g, 'ặ')
    .replace(/&#x1ED1;/g, 'ố')
    .replace(/&#x1B0;/g, 'ư')
    .replace(/&#xF4;/g, 'ô')
    .replace(/&#x1EB7;/g, 'ặ')
    .replace(/&#x1EB9;/g, 'ẹ')
    .replace(/&#x1ED9;/g, 'ộ')
    .replace(/&#x1EF1;/g, 'ự')
    .replace(/&#x301;/g, '́');
}

/**
 * Find all raw byte occurrences of rawSubstr in rawBuf.
 * Occurrence-aware: every occurrence knows its index and total count.
 */
function findAllRawByteSpans(rawBuf, rawSubstr) {
  if (!rawSubstr) return [];
  const str = rawBuf.toString('utf8');
  const occurrences = [];
  let pos = 0;

  while ((pos = str.indexOf(rawSubstr, pos)) !== -1) {
    const startByte = Buffer.byteLength(str.substring(0, pos), 'utf8');
    const spanLengthBytes = Buffer.byteLength(rawSubstr, 'utf8');
    const endByte = startByte + spanLengthBytes;

    const extracted = rawBuf.subarray(startByte, endByte).toString('utf8');
    const verified = extracted === rawSubstr;

    occurrences.push({
      occurrence_index: occurrences.length,
      raw_substring: rawSubstr,
      normalized_text: normalizeHtmlEntities(rawSubstr),
      start_byte_offset: startByte,
      end_byte_offset: endByte,
      byte_length: spanLengthBytes,
      char_start: pos,
      char_end: pos + rawSubstr.length,
      byte_slice_verified: verified
    });

    pos += rawSubstr.length;
  }

  const count = occurrences.length;
  occurrences.forEach(occ => {
    occ.occurrence_count = count;
  });

  return occurrences;
}

/**
 * Validate source preconditions strictly before any claim evaluation.
 */
function validateSourcePreconditions(rawBuf, meta) {
  if (!Buffer.isBuffer(rawBuf)) {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__INVALID_BUFFER',
      details: 'Provided raw content is not a valid Buffer'
    };
  }

  if (!meta || typeof meta !== 'object') {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__MISSING_METADATA',
      details: 'Source metadata object is missing or invalid'
    };
  }

  const actualHash = sha256(rawBuf);
  if (meta.sha256 !== actualHash) {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__SHA256_MISMATCH',
      details: 'Disk buffer hash (' + actualHash + ') does not match metadata sha256 (' + meta.sha256 + ')'
    };
  }

  if (meta.bytes !== rawBuf.length) {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__BYTE_LENGTH_MISMATCH',
      details: 'Disk buffer byte length (' + rawBuf.length + ') does not match metadata bytes (' + meta.bytes + ')'
    };
  }

  if (meta.http_status !== 200) {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__HTTP_STATUS_NOT_200',
      details: 'Source response HTTP status is ' + meta.http_status + ', expected 200'
    };
  }

  if (meta.is_fetch_failed === true) {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__FETCH_FAILED',
      details: 'Source metadata marks is_fetch_failed as true'
    };
  }

  if (meta.is_soft_404 === true) {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__SOFT_404_DETECTED',
      details: 'Source metadata marks is_soft_404 as true'
    };
  }

  const rawStr = rawBuf.toString('utf8');
  const soft404Regexes = [
    /<title>[^<]*(?:404|không tìm thấy|page not found|not found)[^<]*<\/title>/i,
    /aspxerrorpath/i,
    /\/404(?:\.html|\/|$)/i
  ];
  for (const re of soft404Regexes) {
    if (re.test(rawStr) || (meta.final_url && re.test(meta.final_url))) {
      return {
        ok: false,
        code: 'HELD__SOURCE_PRECONDITION_FAILED__SOFT_404_DETECTED',
        details: 'Raw source content or final URL matched soft-404 signature pattern'
      };
    }
  }

  if (!meta.requested_url || typeof meta.requested_url !== 'string' || meta.requested_url.trim() === '') {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__EMPTY_REQUESTED_URL',
      details: 'Metadata requested_url is empty'
    };
  }
  if (!meta.final_url || typeof meta.final_url !== 'string' || meta.final_url.trim() === '') {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__EMPTY_FINAL_URL',
      details: 'Metadata final_url is empty'
    };
  }
  if (!meta.captured_at_utc || isNaN(Date.parse(meta.captured_at_utc))) {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__INVALID_CAPTURE_TIMESTAMP',
      details: 'Metadata captured_at_utc is missing or not a valid ISO timestamp'
    };
  }

  return { ok: true };
}

/**
 * Parse DOM elements to locate the innermost closed semantic offer-card subtree.
 * ZERO DOCUMENT FALLBACK (Req 14).
 * Enforces single-card resolution (Req 16).
 */
function findOfferCardSubtree(rawBuf, titleSpan, priceSpan) {
  const html = rawBuf.toString('utf8');
  const tagRegex = /<\/?([a-zA-Z0-9]+)([^>]*)>/g;
  let match;
  const stack = [];
  const closedBlocks = [];

  while ((match = tagRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName);
    const tagStart = match.index;
    const tagEnd = tagStart + fullTag.length;

    if (isClosing) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tagName === tagName) {
          const openElem = stack.splice(i, 1)[0];
          openElem.end = tagEnd;
          closedBlocks.push(openElem);
          break;
        }
      }
    } else if (!isSelfClosing) {
      const attrs = match[2] || '';
      stack.push({
        tagName,
        attrs,
        start: tagStart,
        end: -1
      });
    }
  }

  const minChar = Math.min(titleSpan.char_start, priceSpan.char_start);
  const maxChar = Math.max(titleSpan.char_end, priceSpan.char_end);

  // Exclude broad root / prohibited containers
  const prohibitedTags = ['html', 'head', 'body', 'header', 'footer', 'nav', 'aside', 'select'];
  const candidateBlocks = closedBlocks.filter(b => {
    if (b.start > minChar || b.end < maxChar) return false;
    if (prohibitedTags.includes(b.tagName)) return false;
    return true;
  });

  if (candidateBlocks.length === 0) {
    // FAIL CLOSED: No document-wide fallback! (Req 14)
    return null;
  }

  // Sort by smallest length to find the innermost container
  candidateBlocks.sort((a, b) => (a.end - a.start) - (b.end - b.start));
  const best = candidateBlocks[0];

  const rawSubtreeText = html.substring(best.start, best.end);

  // Check if container contains multiple sibling cards (Req 16)
  // If best container has multiple <article> or multiple card containers, title and price belong to different cards!
  const childCardMatches = rawSubtreeText.match(/<article|<div[^>]*class="[^"]*(?:deal|card|product)[^"]*"/gi);
  if (childCardMatches && childCardMatches.length > 1) {
    // Broad container enclosing multiple cards -> cross-card pairing!
    return {
      isCrossCardContainer: true,
      tagName: best.tagName,
      attrs: best.attrs.trim()
    };
  }

  const startByte = Buffer.byteLength(html.substring(0, best.start), 'utf8');
  const endByte = Buffer.byteLength(html.substring(0, best.end), 'utf8');

  // Extract optional offer identifier (e.g. id="..." or data-offer-id="...")
  const idMatch = best.attrs.match(/(?:id|data-offer-id|data-id)s*=s*["']([^"']+)["']/i);
  const offerId = idMatch ? idMatch[1] : null;

  return {
    tagName: best.tagName,
    attrs: best.attrs.trim(),
    offer_id: offerId,
    char_start: best.start,
    char_end: best.end,
    start_byte_offset: startByte,
    end_byte_offset: endByte,
    byte_length: endByte - startByte,
    raw_text: rawBuf.subarray(startByte, endByte).toString('utf8'),
    isCrossCardContainer: false
  };
}

/**
 * Check if a given char offset is inside an HTML tag or prohibited context.
 */
function checkTagContextAtOffset(html, charOffset) {
  const lastOpen = html.lastIndexOf('<', charOffset);
  const lastClose = html.lastIndexOf('>', charOffset);

  if (lastOpen !== -1 && (lastClose === -1 || lastClose < lastOpen)) {
    const tagContent = html.substring(lastOpen, html.indexOf('>', lastOpen) + 1);
    const isImg = /^<img/i.test(tagContent);
    const isOption = /^<option/i.test(tagContent);
    const isSelect = /^<select/i.test(tagContent);
    const isMeta = /^<meta/i.test(tagContent);
    return { insideTag: true, tagContent, isImg, isOption, isSelect, isMeta };
  }

  const surrounding = html.substring(Math.max(0, charOffset - 200), Math.min(html.length, charOffset + 200));
  const isFooter = /<(?:footer|div[^>]*class="[^"]*footer[^"]*")[^>]*>/i.test(html.substring(Math.max(0, charOffset - 500), charOffset)) ||
    /(?:Phòng Đăng ký kinh doanh|Sở kế hoạch và đầu tư|Giấy chứng nhận đăng ký doanh nghiệp|GPKD|ĐKKD|Trụ sở)/i.test(surrounding);
  const isStoreLocator = /<(?:select|option)[^>]*>/i.test(surrounding) ||
    /"IsStore"\s*:\s*true/i.test(surrounding) ||
    /class="[^"]*store-locator[^"]*"/i.test(surrounding);
  const isImg = /<img[^>]*>/i.test(surrounding);

  return { insideTag: false, isFooter, isStoreLocator, isImg };
}

/**
 * PURE OFFER SUBTREE EVALUATOR: evaluateCandidate
 */
function evaluateCandidate(arg1, arg2, arg3, arg4) {
  let candidate, rawBuffer, meta, options;
  if (arg1 && typeof arg1 === 'object' && !Buffer.isBuffer(arg1) && (arg1.candidate || (arg1.rawBuffer && arg1.meta))) {
    candidate = arg1.candidate;
    rawBuffer = arg1.rawBuffer;
    meta = arg1.meta;
    options = arg1.options || {};
  } else {
    candidate = arg1;
    rawBuffer = arg2;
    meta = arg3;
    options = arg4 || {};
  }

  if (!candidate || typeof candidate !== 'object') {
    return {
      status: 'HELD',
      held_reason: 'HELD__INVALID_CANDIDATE_OBJECT: candidate is null or invalid',
      dimensions: {},
      missing_dimensions: ['candidate_definition']
    };
  }

  const b19Id = candidate.b19_id || 'UNKNOWN_CANDIDATE';
  const brand = candidate.brand || 'UNKNOWN_BRAND';
  const claims = candidate.claims || {};
  const targetYear = options.targetYear || 2026;
  const html = rawBuffer.toString('utf8');

  // Step 1: Precondition checks
  const precond = validateSourcePreconditions(rawBuffer, meta);
  if (!precond.ok) {
    return {
      b19_id: b19Id,
      brand,
      status: 'HELD',
      held_reason: precond.code + ': ' + precond.details,
      preconditions_passed: false,
      precondition_failure: precond,
      offer_subtree: null,
      dimensions: {},
      missing_dimensions: ['source_preconditions']
    };
  }

  // Step 2: Extract Price Occurrence Spans
  const dimensions = {};
  const missingDimensions = [];

  const priceOccurrences = findAllRawByteSpans(rawBuffer, claims.price);
  if (priceOccurrences.length === 0) {
    dimensions.price = { is_proven: false, error: 'Price span not found in raw source buffer' };
    missingDimensions.push('price');
  }

  // Step 3: Extract Title Occurrence Spans
  const titleOccurrences = findAllRawByteSpans(rawBuffer, claims.title);
  if (titleOccurrences.length === 0) {
    dimensions.title = { is_proven: false, error: 'Title span not found in raw source buffer' };
    missingDimensions.push('title');
  }

  if (priceOccurrences.length === 0 || titleOccurrences.length === 0) {
    const primary = priceOccurrences.length === 0 ? 'HELD__PRICE_SPAN_NOT_FOUND' : 'HELD__TITLE_SPAN_NOT_FOUND';
    return {
      b19_id: b19Id,
      brand,
      status: 'HELD',
      held_reason: primary,
      preconditions_passed: true,
      all_dimensions_proven: false,
      offer_subtree: null,
      missing_dimensions: missingDimensions,
      dimensions
    };
  }

  // Step 4: Resolve Innermost Offer Subtree enclosing title and price occurrences
  // Filter out title occurrences in <head> or <meta>
  const bodyTitleOccurrences = titleOccurrences.filter(t => {
    const ctx = checkTagContextAtOffset(html, t.char_start);
    return !ctx.isMeta && !ctx.insideTag;
  });

  const searchTitles = bodyTitleOccurrences.length > 0 ? bodyTitleOccurrences : titleOccurrences;

  let chosenSubtree = null;
  let chosenTitle = null;
  let chosenPrice = null;

  for (const tSpan of searchTitles) {
    for (const pSpan of priceOccurrences) {
      const subtree = findOfferCardSubtree(rawBuffer, tSpan, pSpan);
      if (subtree) {
        if (subtree.isCrossCardContainer) {
          // Cross-card pairing detected
          return {
            b19_id: b19Id,
            brand,
            status: 'HELD',
            held_reason: 'HELD__CROSS_CARD_ELEMENTS_REJECTED: Title and price reside in different offer-card subtrees within a broad container',
            preconditions_passed: true,
            all_dimensions_proven: false,
            offer_subtree: null,
            missing_dimensions: ['offer_card_subtree'],
            dimensions
          };
        }
        chosenSubtree = subtree;
        chosenTitle = tSpan;
        chosenPrice = pSpan;
        break;
      }
    }
    if (chosenSubtree) break;
  }

  // If no closed semantic subtree encloses title and price -> FAIL CLOSED (Req 14)
  if (!chosenSubtree) {
    return {
      b19_id: b19Id,
      brand,
      status: 'HELD',
      held_reason: 'HELD__SEMANTIC_BLOCK_NOT_FOUND: No closed semantic offer-card container encloses the claimed title and price',
      preconditions_passed: true,
      all_dimensions_proven: false,
      offer_subtree: null,
      missing_dimensions: ['offer_card_subtree'],
      dimensions
    };
  }

  // Assign verified title and price dimensions
  dimensions.title = Object.assign({ is_proven: true }, chosenTitle);
  dimensions.price = Object.assign({ is_proven: true }, chosenPrice);

  // Step 5: Conditions (Must have occurrence inside chosenSubtree)
  if (claims.conditions) {
    const condOccurrences = findAllRawByteSpans(rawBuffer, claims.conditions);
    const inSubtree = condOccurrences.find(c => c.start_byte_offset >= chosenSubtree.start_byte_offset && c.end_byte_offset <= chosenSubtree.end_byte_offset);
    if (inSubtree) {
      dimensions.conditions = Object.assign({ is_proven: true }, inSubtree);
    } else {
      dimensions.conditions = { is_proven: false, error: 'Conditions span not found inside the offer subtree' };
      missingDimensions.push('conditions');
    }
  } else {
    dimensions.conditions = { is_proven: false, error: 'No conditions claimed' };
    missingDimensions.push('conditions');
  }

  // Step 6: Locality Binding (Must have occurrence inside chosenSubtree and not in prohibited tags)
  if (!claims.da_nang_locality) {
    dimensions.da_nang_locality = {
      is_proven: false,
      code: 'HELD__LOCALITY_OFFER_BINDING_MISSING',
      error: 'No locality span claimed for offer'
    };
    missingDimensions.push('da_nang_locality');
  } else {
    const localityOccurrences = findAllRawByteSpans(rawBuffer, claims.da_nang_locality);
    const inSubtree = localityOccurrences.find(loc => loc.start_byte_offset >= chosenSubtree.start_byte_offset && loc.end_byte_offset <= chosenSubtree.end_byte_offset);

    if (!inSubtree) {
      dimensions.da_nang_locality = {
        is_proven: false,
        code: 'HELD__LOCALITY_NOT_IN_OFFER_SUBTREE',
        error: 'Claimed locality span is outside the offer-card subtree (cross-block/card borrowing prohibited per Req 16)'
      };
      missingDimensions.push('da_nang_locality');
    } else {
      const tagCtx = checkTagContextAtOffset(html, inSubtree.char_start);
      if (tagCtx.isFooter) {
        dimensions.da_nang_locality = {
          is_proven: false,
          code: 'HELD__LOCALITY_FOOTER_OR_LEGAL_REGISTRATION_ONLY',
          error: 'Selected locality span resides in footer or legal notice (Req 18)'
        };
        missingDimensions.push('da_nang_locality');
      } else if (tagCtx.isStoreLocator || tagCtx.isOption || tagCtx.isSelect) {
        dimensions.da_nang_locality = {
          is_proven: false,
          code: 'HELD__LOCALITY_STORE_LOCATOR_WITHOUT_OFFER_BINDING',
          error: 'Selected locality span resides in store locator dropdown (Req 25)'
        };
        missingDimensions.push('da_nang_locality');
      } else if (tagCtx.isImg || tagCtx.insideTag) {
        dimensions.da_nang_locality = {
          is_proven: false,
          code: 'HELD__LOCALITY_IMAGE_ONLY_REJECTED',
          error: 'Selected locality span resides inside image tag or attribute (Req 18)'
        };
        missingDimensions.push('da_nang_locality');
      } else {
        const subtreeText = chosenSubtree.raw_text;
        const isOfferBound = /(?:áp dụng tại|áp dụng riêng|dành cho khách hàng|ưu đãi tại|đồng giá vé|chi nhánh|cụm rạp)/i.test(inSubtree.raw_substring) ||
          /(?:áp dụng tại|áp dụng riêng|dành cho khách hàng|ưu đãi tại|đồng giá vé|chi nhánh|cụm rạp)/i.test(subtreeText);

        if (!isOfferBound) {
          dimensions.da_nang_locality = {
            is_proven: false,
            code: 'HELD__LOCALITY_OFFER_BINDING_MISSING',
            error: 'Locality mention in subtree lacks explicit promotional binding clause'
          };
          missingDimensions.push('da_nang_locality');
        } else {
          dimensions.da_nang_locality = Object.assign({ is_proven: true }, inSubtree);
        }
      }
    }
  }

  // Step 7: Validity / Recurrence (Must have occurrence inside chosenSubtree, year 2026 inside subtree, no past expired dates)
  if (!claims.validity_or_recurrence) {
    dimensions.validity_or_recurrence = {
      is_proven: false,
      code: 'HELD__VALIDITY_UNPROVEN_OR_MISSING',
      error: 'No validity or recurrence span claimed'
    };
    missingDimensions.push('validity_or_recurrence');
  } else {
    const validityOccurrences = findAllRawByteSpans(rawBuffer, claims.validity_or_recurrence);
    const inSubtree = validityOccurrences.find(v => v.start_byte_offset >= chosenSubtree.start_byte_offset && v.end_byte_offset <= chosenSubtree.end_byte_offset);

    if (!inSubtree) {
      dimensions.validity_or_recurrence = {
        is_proven: false,
        code: 'HELD__VALIDITY_NOT_IN_OFFER_SUBTREE',
        error: 'Claimed validity span is outside the offer-card subtree (Req 17)'
      };
      missingDimensions.push('validity_or_recurrence');
    } else {
      const subtreeText = chosenSubtree.raw_text;
      const isExpired = /áp dụng từ 25\/4\/2024/i.test(subtreeText) ||
        /25\/04\s*&#8211;\s*09\/05/i.test(subtreeText) ||
        /(?:hết hạn|kết thúc).*?202[0-4]/i.test(subtreeText);

      if (isExpired) {
        dimensions.validity_or_recurrence = {
          is_proven: false,
          code: 'HELD__VALIDITY_CAMPAIGN_EXPIRED',
          error: 'Offer subtree contains expired promotional campaign date prior to ' + targetYear
        };
        missingDimensions.push('validity_or_recurrence');
      } else {
        const yearStr = String(targetYear);
        const hasYearInSubtree = subtreeText.includes(yearStr);

        if (!hasYearInSubtree) {
          dimensions.validity_or_recurrence = {
            is_proven: false,
            code: 'HELD__VALIDITY_CALENDAR_YEAR_NOT_IN_OFFER_SUBTREE',
            error: 'Target calendar year ' + targetYear + ' does not exist within the offer-card subtree (unrelated page occurrences rejected per Req 17)'
          };
          missingDimensions.push('validity_or_recurrence');
        } else {
          dimensions.validity_or_recurrence = Object.assign({ is_proven: true }, inSubtree);
        }
      }
    }
  }

  // Step 8: Step 8: Duplicate Identical Offers Check (Req 18)
  // If the document contains duplicate identical cards with same title & price, require explicit offer_id
  if (titleOccurrences.length > 1 && priceOccurrences.length > 1 && !chosenSubtree.offer_id) {
    // Check if another subtree also matches title and price
    let identicalSubtreeCount = 0;
    for (const t of bodyTitleOccurrences) {
      for (const p of priceOccurrences) {
        const st = findOfferCardSubtree(rawBuffer, t, p);
        if (st && !st.isCrossCardContainer) identicalSubtreeCount++;
      }
    }
    if (identicalSubtreeCount > 1) {
      return {
        b19_id: b19Id,
        brand,
        status: 'HELD',
        held_reason: 'HELD__AMBIGUOUS_DUPLICATE_OFFERS_WITHOUT_IDENTIFIER: Duplicate identical offers exist without unambiguous offer identifier (Req 18)',
        preconditions_passed: true,
        all_dimensions_proven: false,
        offer_subtree: null,
        missing_dimensions: ['offer_identifier'],
        dimensions
      };
    }
  }

  // Step 9: Final verdict computation
  const allDimensionsProven = missingDimensions.length === 0;
  if (allDimensionsProven) {
    return {
      b19_id: b19Id,
      brand,
      status: 'VERIFIED',
      held_reason: null,
      preconditions_passed: true,
      all_dimensions_proven: true,
      offer_subtree: {
        tagName: chosenSubtree.tagName,
        attrs: chosenSubtree.attrs,
        offer_id: chosenSubtree.offer_id,
        start_byte_offset: chosenSubtree.start_byte_offset,
        end_byte_offset: chosenSubtree.end_byte_offset,
        byte_length: chosenSubtree.byte_length
      },
      missing_dimensions: [],
      dimensions
    };
  }

  let primaryHeldReason = '';
  if (!dimensions.da_nang_locality.is_proven) {
    primaryHeldReason = dimensions.da_nang_locality.code + ': ' + dimensions.da_nang_locality.error;
  } else if (!dimensions.validity_or_recurrence.is_proven) {
    primaryHeldReason = dimensions.validity_or_recurrence.code + ': ' + dimensions.validity_or_recurrence.error;
  } else if (!dimensions.price.is_proven) {
    primaryHeldReason = 'HELD__PRICE_SPAN_NOT_FOUND: ' + dimensions.price.error;
  } else if (!dimensions.title.is_proven) {
    primaryHeldReason = 'HELD__TITLE_SPAN_NOT_FOUND: ' + dimensions.title.error;
  } else {
    primaryHeldReason = 'HELD__CONDITIONS_SPAN_NOT_FOUND: ' + dimensions.conditions.error;
  }

  return {
    b19_id: b19Id,
    brand,
    status: 'HELD',
    held_reason: primaryHeldReason,
    preconditions_passed: true,
    all_dimensions_proven: false,
    offer_subtree: {
      tagName: chosenSubtree.tagName,
      attrs: chosenSubtree.attrs,
      offer_id: chosenSubtree.offer_id,
      start_byte_offset: chosenSubtree.start_byte_offset,
      end_byte_offset: chosenSubtree.end_byte_offset,
      byte_length: chosenSubtree.byte_length
    },
    missing_dimensions: missingDimensions,
    dimensions
  };
}

module.exports = {
  sha256,
  normalizeHtmlEntities,
  findAllRawByteSpans,
  validateSourcePreconditions,
  findOfferCardSubtree,
  checkTagContextAtOffset,
  evaluateCandidate
};
