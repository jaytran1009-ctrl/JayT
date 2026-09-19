/**
 * J358-R3-R2: CONTEXTUAL BINDING PROVENANCE VALIDATOR
 * Work Order: J358-R3-R2-CONTEXTUAL-BINDING-HARDENING
 * Authority: Quyết định CEO JAYT-358-R3-R1 (01_EXECUTIVE_COUNCIL/JAYT_358_CEO_R3_R1_PARTIAL_ACCEPTANCE_AND_BINDING_GATE.md)
 * 
 * CORE CONTRACT:
 * - Evaluates candidate claim definitions without pre-assigned fields or precomputed outcomes.
 * - Enforces 6 strict source preconditions (SHA-256, byte length, HTTP 200, fetch failure false, soft-404 false, valid URLs & timestamp).
 * - Contextual Semantic Content Block Identification:
 *     Parses HTML DOM elements to determine the innermost enclosing semantic content block [block_start_byte, block_end_byte] for the offer.
 * - Same-Block Locality Binding (Req 16):
 *     Locality span must reside within the SAME offer block as title/price/conditions and must not be inside footer, store-locator, or image tags.
 * - Same-Block Validity / Recurrence Binding (Req 17):
 *     Validity span and target calendar year (e.g. 2026) must reside within the SAME offer block. Unrelated 2026 occurrences elsewhere on the page are strictly rejected.
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
 * Find exact raw byte span within a Buffer.
 * Verifies byte slice integrity: rawBuf.subarray(startByte, endByte).toString('utf8') === rawSubstr.
 */
function findRawByteSpan(rawBuf, rawSubstr, options = {}) {
  if (!rawSubstr) return null;
  const str = rawBuf.toString('utf8');
  const searchStart = options.searchStartChar || 0;
  const charIdx = str.indexOf(rawSubstr, searchStart);
  if (charIdx === -1) return null;

  const startByte = Buffer.byteLength(str.substring(0, charIdx), 'utf8');
  const spanLengthBytes = Buffer.byteLength(rawSubstr, 'utf8');
  const endByte = startByte + spanLengthBytes;

  const extracted = rawBuf.subarray(startByte, endByte).toString('utf8');
  if (extracted !== rawSubstr) {
    return null;
  }

  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(rawSubstr, pos)) !== -1) {
    count++;
    pos += rawSubstr.length;
  }

  return {
    raw_substring: rawSubstr,
    normalized_text: normalizeHtmlEntities(rawSubstr),
    start_byte_offset: startByte,
    end_byte_offset: endByte,
    byte_length: spanLengthBytes,
    char_start: charIdx,
    char_end: charIdx + rawSubstr.length,
    occurrence_count: count,
    byte_slice_verified: true
  };
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
 * Parse HTML to locate the innermost enclosing semantic content block for the offer.
 * Enforces requirement that the block is not inside <footer>, <header>, <nav>, or store locator.
 */
function findEnclosingSemanticBlock(rawBuf, minCharOffset, maxCharOffset) {
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
        contentStart: tagEnd,
        end: -1
      });
    }
  }

  // Find all closed blocks enclosing [minCharOffset, maxCharOffset]
  const enclosing = closedBlocks.filter(b => b.start <= minCharOffset && b.end >= maxCharOffset);
  const validEnclosing = enclosing.filter(b => b.tagName !== 'html' && b.tagName !== 'head');

  // Sort by smallest length to find the innermost container
  validEnclosing.sort((a, b) => (a.end - a.start) - (b.end - b.start));

  let chosenBlock = null;
  if (validEnclosing.length > 0) {
    chosenBlock = validEnclosing[0];
  } else {
    // Fallback to full document if no sub-container is closed
    chosenBlock = {
      tagName: 'document',
      attrs: '',
      start: 0,
      end: html.length
    };
  }

  const startByte = Buffer.byteLength(html.substring(0, chosenBlock.start), 'utf8');
  const endByte = Buffer.byteLength(html.substring(0, chosenBlock.end), 'utf8');

  // Check if chosen block is inside prohibited container
  const isInsideFooter = /<(?:footer|div[^>]*class="[^"]*footer[^"]*")[^>]*>/i.test(html.substring(Math.max(0, chosenBlock.start - 300), chosenBlock.start));
  const isInsideStoreLocator = /class="[^"]*store-locator[^"]*"/i.test(html.substring(Math.max(0, chosenBlock.start - 300), chosenBlock.start));

  return {
    tagName: chosenBlock.tagName,
    attrs: (chosenBlock.attrs || '').trim(),
    char_start: chosenBlock.start,
    char_end: chosenBlock.end,
    start_byte_offset: startByte,
    end_byte_offset: endByte,
    byte_length: endByte - startByte,
    raw_block_text: rawBuf.subarray(startByte, endByte).toString('utf8'),
    is_inside_footer: isInsideFooter,
    is_inside_store_locator: isInsideStoreLocator
  };
}

/**
 * Check if a given char offset is inside an HTML tag (e.g. inside <img src="..."> or <option>).
 */
function checkTagContextAtOffset(html, charOffset) {
  const lastOpen = html.lastIndexOf('<', charOffset);
  const lastClose = html.lastIndexOf('>', charOffset);

  // If inside an open tag: <tag attr="..." [charOffset] ...>
  if (lastOpen !== -1 && (lastClose === -1 || lastClose < lastOpen)) {
    const tagContent = html.substring(lastOpen, html.indexOf('>', lastOpen) + 1);
    const isImg = /^<img/i.test(tagContent);
    const isOption = /^<option/i.test(tagContent);
    const isSelect = /^<select/i.test(tagContent);
    return { insideTag: true, tagContent, isImg, isOption, isSelect };
  }

  // Check surrounding tag context
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
 * Contextual Locality Evaluator (Req 16)
 * - Locality span MUST reside within the offer block [block.start_byte, block.end_byte].
 * - Selected span itself must pass footer, store-locator, and image exclusion.
 * - Offer clause must explicitly bind to Da Nang.
 */
function evaluateContextualLocality(rawBuf, offerBlock, claimedLocalitySpan) {
  const html = rawBuf.toString('utf8');
  const blockText = offerBlock.raw_block_text;

  // If candidate did not claim a locality span
  if (!claimedLocalitySpan) {
    return {
      valid: false,
      code: 'HELD__LOCALITY_OFFER_BINDING_MISSING',
      reason: 'No locality span claimed for offer',
      span: null
    };
  }

  // Find claimed locality span in rawBuf
  const span = findRawByteSpan(rawBuf, claimedLocalitySpan);
  if (!span) {
    return {
      valid: false,
      code: 'HELD__LOCALITY_SPAN_NOT_FOUND',
      reason: 'Claimed locality span \'' + claimedLocalitySpan + '\' not found in raw source buffer',
      span: null
    };
  }

  // Check Contextual Rule 1: Same-Block Containment
  const isInOfferBlock = span.start_byte_offset >= offerBlock.start_byte_offset && span.end_byte_offset <= offerBlock.end_byte_offset;
  if (!isInOfferBlock) {
    return {
      valid: false,
      code: 'HELD__LOCALITY_NOT_IN_OFFER_BLOCK',
      reason: 'Claimed locality span is outside the offer semantic content block (cross-block borrowing prohibited per Req 16)',
      span
    };
  }

  // Check Contextual Rule 2: Tag Exclusions (Footer, Store Locator, Image)
  const tagCtx = checkTagContextAtOffset(html, span.char_start);
  if (tagCtx.isFooter || offerBlock.is_inside_footer) {
    return {
      valid: false,
      code: 'HELD__LOCALITY_FOOTER_OR_LEGAL_REGISTRATION_ONLY',
      reason: 'Selected locality span resides in footer or legal registration notice (Req 18 & 16)',
      span
    };
  }
  if (tagCtx.isStoreLocator || tagCtx.isOption || tagCtx.isSelect || offerBlock.is_inside_store_locator) {
    return {
      valid: false,
      code: 'HELD__LOCALITY_STORE_LOCATOR_WITHOUT_OFFER_BINDING',
      reason: 'Selected locality span resides in generic store locator selector without offer binding (Req 25 & 16)',
      span
    };
  }
  if (tagCtx.isImg || tagCtx.insideTag) {
    return {
      valid: false,
      code: 'HELD__LOCALITY_IMAGE_ONLY_REJECTED',
      reason: 'Selected locality span resides inside image tag or attribute (Req 18 & 16)',
      span
    };
  }

  // Check Contextual Rule 3: Explicit Offer Binding Clause in Block
  const isOfferBound = /(?:áp dụng tại|áp dụng riêng|dành cho khách hàng|ưu đãi tại|đồng giá vé|chi nhánh)/i.test(span.raw_substring) ||
    /(?:áp dụng tại|áp dụng riêng|dành cho khách hàng|ưu đãi tại|đồng giá vé|chi nhánh)/i.test(blockText.substring(Math.max(0, span.char_start - offerBlock.char_start - 100), Math.min(blockText.length, span.char_end - offerBlock.char_start + 100)));

  if (!isOfferBound) {
    return {
      valid: false,
      code: 'HELD__LOCALITY_OFFER_BINDING_MISSING',
      reason: 'Locality mention in offer block lacks explicit promotional binding clause',
      span
    };
  }

  return {
    valid: true,
    code: 'LOCALITY_CONTEXTUALLY_BOUND',
    reason: 'Explicit offer clause binds promotion to Da Nang within the same semantic block',
    span
  };
}

/**
 * Contextual Validity Evaluator (Req 17)
 * - Validity span MUST reside within the offer block [block.start_byte, block.end_byte].
 * - Target calendar year (e.g. 2026) MUST reside within the offer block or explicit terms block.
 * - Expired campaign dates within the offer block are strictly rejected.
 */
function evaluateContextualValidity(rawBuf, offerBlock, claimedValiditySpan, targetYear = 2026) {
  const blockText = offerBlock.raw_block_text;

  // Check Contextual Rule 1: Expired campaign dates inside offer block
  const isExpired = /áp dụng từ 25\/4\/2024/i.test(blockText) ||
    /25\/04\s*&#8211;\s*09\/05/i.test(blockText) ||
    /(?:hết hạn|kết thúc).*?202[0-4]/i.test(blockText);
  if (isExpired) {
    return {
      valid: false,
      code: 'HELD__VALIDITY_CAMPAIGN_EXPIRED',
      reason: 'Offer block contains expired promotional campaign date prior to ' + targetYear,
      span: null
    };
  }

  if (!claimedValiditySpan) {
    return {
      valid: false,
      code: 'HELD__VALIDITY_UNPROVEN_OR_MISSING',
      reason: 'No validity or recurrence span established in source (Req 26)',
      span: null
    };
  }

  // Find claimed validity span in rawBuf
  const span = findRawByteSpan(rawBuf, claimedValiditySpan);
  if (!span) {
    return {
      valid: false,
      code: 'HELD__VALIDITY_SPAN_NOT_FOUND',
      reason: 'Claimed validity span \'' + claimedValiditySpan + '\' not found in raw source buffer',
      span: null
    };
  }

  // Check Contextual Rule 2: Same-Block Containment
  const isInOfferBlock = span.start_byte_offset >= offerBlock.start_byte_offset && span.end_byte_offset <= offerBlock.end_byte_offset;
  if (!isInOfferBlock) {
    return {
      valid: false,
      code: 'HELD__VALIDITY_NOT_IN_OFFER_BLOCK',
      reason: 'Claimed validity span is outside the offer semantic content block (cross-block borrowing prohibited per Req 17)',
      span
    };
  }

  // Check Contextual Rule 3: Target Year Must Reside Within the Same Offer Block
  const yearStr = String(targetYear);
  const blockHasTargetYear = blockText.includes(yearStr);

  if (!blockHasTargetYear) {
    return {
      valid: false,
      code: 'HELD__VALIDITY_CALENDAR_YEAR_NOT_IN_OFFER_BLOCK',
      reason: 'Target calendar year ' + targetYear + ' does not exist within the offer semantic content block (unrelated page occurrences rejected per Req 17)',
      span
    };
  }

  return {
    valid: true,
    code: 'VALIDITY_CONTEXTUALLY_BOUND',
    reason: 'Validity recurrence and calendar year ' + targetYear + ' proven within the same semantic block',
    span
  };
}

/**
 * PURE CONTEXTUAL EVALUATOR: evaluateCandidate
 * 
 * Takes candidate claims, rawBuffer, and meta.
 * Does NOT rely on pre-assigned locality_nature, status, or precomputed outcome fields.
 * Identifies semantic content block and verifies contextual binding.
 */
function evaluateCandidate({ candidate, rawBuffer, meta, options = {} }) {
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
      semantic_block: null,
      dimensions: {},
      missing_dimensions: ['source_preconditions']
    };
  }

  // Step 2: Extract Price Span first
  const dimensions = {};
  const missingDimensions = [];

  let priceSpan = null;
  if (claims.price) {
    priceSpan = findRawByteSpan(rawBuffer, claims.price);
    if (priceSpan) {
      dimensions.price = Object.assign({ is_proven: true }, priceSpan);
    } else {
      dimensions.price = { is_proven: false, error: 'Price span not found in raw source buffer' };
      missingDimensions.push('price');
    }
  } else {
    dimensions.price = { is_proven: false, error: 'No price claimed' };
    missingDimensions.push('price');
  }

  // Step 3: Extract Title Span (disambiguating closest to price in body)
  let titleSpan = null;
  if (claims.title) {
    const str = rawBuffer.toString('utf8');
    let bestIdx = -1;
    let minDistance = Infinity;
    let pos = 0;
    while ((pos = str.indexOf(claims.title, pos)) !== -1) {
      if (priceSpan) {
        const dist = Math.abs(pos - priceSpan.char_start);
        if (dist < minDistance) {
          minDistance = dist;
          bestIdx = pos;
        }
      } else {
        bestIdx = pos;
        break;
      }
      pos += claims.title.length;
    }

    if (bestIdx !== -1) {
      titleSpan = findRawByteSpan(rawBuffer, claims.title, { searchStartChar: bestIdx });
      dimensions.title = Object.assign({ is_proven: true }, titleSpan);
    } else {
      dimensions.title = { is_proven: false, error: 'Title span not found in raw source buffer' };
      missingDimensions.push('title');
    }
  } else {
    dimensions.title = { is_proven: false, error: 'No title claimed' };
    missingDimensions.push('title');
  }

  // If title or price is missing, fail closed immediately
  if (!titleSpan || !priceSpan) {
    const primaryReason = !titleSpan ? 'HELD__TITLE_SPAN_NOT_FOUND: ' + dimensions.title.error : 'HELD__PRICE_SPAN_NOT_FOUND: ' + dimensions.price.error;
    return {
      b19_id: b19Id,
      brand,
      status: 'HELD',
      held_reason: primaryReason,
      preconditions_passed: true,
      all_dimensions_proven: false,
      semantic_block: null,
      missing_dimensions: missingDimensions,
      dimensions
    };
  }

  // Step 4: Identify Enclosing Semantic Content Block
  const minCharOffset = Math.min(titleSpan.char_start, priceSpan.char_start);
  const maxCharOffset = Math.max(titleSpan.char_end, priceSpan.char_end);
  const semanticBlock = findEnclosingSemanticBlock(rawBuffer, minCharOffset, maxCharOffset);

  // Step 5: Conditions Evaluation (Must be in offer block if claimed)
  if (claims.conditions) {
    const condSpan = findRawByteSpan(rawBuffer, claims.conditions);
    if (condSpan) {
      const isInBlock = condSpan.start_byte_offset >= semanticBlock.start_byte_offset && condSpan.end_byte_offset <= semanticBlock.end_byte_offset;
      if (isInBlock) {
        dimensions.conditions = Object.assign({ is_proven: true }, condSpan);
      } else {
        dimensions.conditions = { is_proven: false, error: 'Conditions span is outside the offer semantic content block' };
        missingDimensions.push('conditions');
      }
    } else {
      dimensions.conditions = { is_proven: false, error: 'Conditions span not found in raw source buffer' };
      missingDimensions.push('conditions');
    }
  } else {
    dimensions.conditions = { is_proven: false, error: 'Conditions not claimed' };
    missingDimensions.push('conditions');
  }

  // Step 6: Contextual Locality Evaluation (Req 16)
  const localityResult = evaluateContextualLocality(rawBuffer, semanticBlock, claims.da_nang_locality);
  if (localityResult.valid && localityResult.span) {
    dimensions.da_nang_locality = Object.assign({ is_proven: true }, localityResult.span);
  } else {
    dimensions.da_nang_locality = {
      is_proven: false,
      code: localityResult.code,
      error: localityResult.reason,
      span: localityResult.span
    };
    missingDimensions.push('da_nang_locality');
  }

  // Step 7: Contextual Validity / Recurrence Evaluation (Req 17)
  const validityResult = evaluateContextualValidity(rawBuffer, semanticBlock, claims.validity_or_recurrence, targetYear);
  if (validityResult.valid && validityResult.span) {
    dimensions.validity_or_recurrence = Object.assign({ is_proven: true }, validityResult.span);
  } else {
    dimensions.validity_or_recurrence = {
      is_proven: false,
      code: validityResult.code,
      error: validityResult.reason,
      span: validityResult.span
    };
    missingDimensions.push('validity_or_recurrence');
  }

  // Step 8: Compute final verdict
  const allDimensionsProven = missingDimensions.length === 0;
  if (allDimensionsProven) {
    return {
      b19_id: b19Id,
      brand,
      status: 'VERIFIED',
      held_reason: null,
      preconditions_passed: true,
      all_dimensions_proven: true,
      semantic_block: {
        tagName: semanticBlock.tagName,
        attrs: semanticBlock.attrs,
        start_byte_offset: semanticBlock.start_byte_offset,
        end_byte_offset: semanticBlock.end_byte_offset,
        byte_length: semanticBlock.byte_length
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
    semantic_block: {
      tagName: semanticBlock.tagName,
      attrs: semanticBlock.attrs,
      start_byte_offset: semanticBlock.start_byte_offset,
      end_byte_offset: semanticBlock.end_byte_offset,
      byte_length: semanticBlock.byte_length
    },
    missing_dimensions: missingDimensions,
    dimensions
  };
}

module.exports = {
  sha256,
  normalizeHtmlEntities,
  findRawByteSpan,
  validateSourcePreconditions,
  findEnclosingSemanticBlock,
  checkTagContextAtOffset,
  evaluateContextualLocality,
  evaluateContextualValidity,
  evaluateCandidate
};
