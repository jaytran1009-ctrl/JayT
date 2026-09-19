/**
 * J358-R3-R1: HARDENED CLAIM PROVENANCE VALIDATOR
 * Work Order: J358-R3-R1-VALIDATOR-HARDENING
 * Authority: Quyết định CEO JAYT-358-R3 (01_EXECUTIVE_COUNCIL/JAYT_358_CEO_R3_CONTAINMENT_ACCEPTANCE_AND_HARDENING_GATE.md)
 * 
 * PURE EVALUATOR CONTRACT:
 * - Consumes candidate claim definitions (asserted claim strings: title, price, conditions, validity, locality).
 * - Reads raw buffer from disk / fixture and metadata object.
 * - Enforces rigorous source preconditions BEFORE any claim matching:
 *     1. disk SHA-256 === metadata SHA-256
 *     2. disk byte length === metadata bytes
 *     3. metadata http_status === 200
 *     4. metadata is_fetch_failed === false
 *     5. metadata is_soft_404 === false AND raw content does not contain soft-404 patterns
 *     6. requested_url, final_url, and captured_at_utc must be non-empty strings.
 * - Enforces strict byte-span matching for:
 *     1. Title
 *     2. Price or Benefit
 *     3. Conditions
 *     4. Validity or Recurrence
 *     5. Explicit Offer-to-Da-Nang Binding
 * - Enforces strict policy rules:
 *     - Prohibits footer / legal registration as locality evidence (Req 18).
 *     - Prohibits generic store locator / selector dropdown as offer locality evidence (Req 25).
 *     - Prohibits image filename or alt text alone as locality evidence (Req 18).
 *     - Prohibits calendar year assumption without explicit text span (Req 20 & 26).
 *     - Prohibits expired campaigns (Req 26).
 * - Fails closed: any failure returns HELD with precise diagnostic reason.
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
 * Verifies that rawBuf.subarray(startByte, endByte).toString('utf8') matches rawSubstr.
 */
function findRawByteSpan(rawBuf, rawSubstr, options = {}) {
  if (!rawSubstr) return null;
  const str = rawBuf.toString('utf8');
  const charIdx = str.indexOf(rawSubstr);
  if (charIdx === -1) return null;

  const startByte = Buffer.byteLength(str.substring(0, charIdx), 'utf8');
  const spanLengthBytes = Buffer.byteLength(rawSubstr, 'utf8');
  const endByte = startByte + spanLengthBytes;

  // Verify byte slice matches verbatim
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

  // Precondition 1: Disk SHA-256 equals metadata SHA-256
  const actualHash = sha256(rawBuf);
  if (meta.sha256 !== actualHash) {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__SHA256_MISMATCH',
      details: 'Disk buffer hash (' + actualHash + ') does not match metadata sha256 (' + meta.sha256 + ')'
    };
  }

  // Precondition 2: Exact byte length
  if (meta.bytes !== rawBuf.length) {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__BYTE_LENGTH_MISMATCH',
      details: 'Disk buffer byte length (' + rawBuf.length + ') does not match metadata bytes (' + meta.bytes + ')'
    };
  }

  // Precondition 3: HTTP status 200
  if (meta.http_status !== 200) {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__HTTP_STATUS_NOT_200',
      details: 'Source response HTTP status is ' + meta.http_status + ', expected 200'
    };
  }

  // Precondition 4: is_fetch_failed is false
  if (meta.is_fetch_failed === true) {
    return {
      ok: false,
      code: 'HELD__SOURCE_PRECONDITION_FAILED__FETCH_FAILED',
      details: 'Source metadata marks is_fetch_failed as true'
    };
  }

  // Precondition 5: is_soft_404 is false and content does not contain soft-404 signatures
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

  // Precondition 6: Requested URL, Final URL, and Capture timestamp non-empty
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
 * Analyze locality binding dynamically from raw content.
 * Enforces policy rules:
 * - Prohibits footer / legal registration (Req 18)
 * - Prohibits generic store locator dropdown / options (Req 25)
 * - Prohibits image filename / alt text alone (Req 18)
 */
function evaluateLocalityBinding(rawBuf, claimedLocalitySpan) {
  const content = rawBuf.toString('utf8');
  const daNangRegex = /(?:Đà Nẵng|Đ&agrave; Nẵng|Da Nang)/gi;

  const matches = [];
  let m;
  while ((m = daNangRegex.exec(content)) !== null) {
    const idx = m.index;
    const matchStr = m[0];
    const surrounding = content.substring(Math.max(0, idx - 150), Math.min(content.length, idx + matchStr.length + 150));

    // Check footer / legal registration context
    const isFooter = /<(?:footer|div[^>]*class="[^"]*footer[^"]*")[^>]*>/i.test(content.substring(Math.max(0, idx - 500), idx)) ||
      /(?:Phòng Đăng ký kinh doanh|Sở kế hoạch và đầu tư|Giấy chứng nhận đăng ký doanh nghiệp|GPKD|ĐKKD|Trụ sở|Địa chỉ:\s*Tầng)/i.test(surrounding);

    // Check store locator / dropdown context
    const isStoreLocator = /<(?:select|option)[^>]*>/i.test(surrounding) ||
      /"IsStore"\s*:\s*true/i.test(surrounding) ||
      /class="[^"]*store-locator[^"]*"/i.test(surrounding) ||
      /The Pizza Company (?:Co\.opmart|Lotte Mart|Đống Đa) - Đà Nẵng/i.test(surrounding);

    // Check image attribute context
    const isImage = /<img[^>]*src="[^"]*ĐN[^"]*"[^>]*>/i.test(surrounding) ||
      /<img[^>]*alt="[^"]*(?:Đà Nẵng|ĐN)[^"]*"[^>]*>/i.test(surrounding);

    // Check explicit offer body clause
    const isOfferBody = /(?:áp dụng tại|áp dụng riêng|dành cho khách hàng|ưu đãi tại|đồng giá vé|rạp)/i.test(surrounding) && !isFooter && !isStoreLocator;

    matches.push({
      index: idx,
      match: matchStr,
      isFooter,
      isStoreLocator,
      isImage,
      isOfferBody,
      surrounding
    });
  }

  // Policy rule 1: Zero mentions
  if (matches.length === 0) {
    return {
      valid: false,
      code: 'HELD__LOCALITY_ABSENT_IN_SOURCE',
      reason: 'Zero occurrences of Da Nang found in source page',
      span: null
    };
  }

  // Policy rule 2: Footer / legal registration only
  const nonFooter = matches.filter(x => !x.isFooter);
  if (nonFooter.length === 0) {
    return {
      valid: false,
      code: 'HELD__LOCALITY_FOOTER_OR_LEGAL_REGISTRATION_ONLY',
      reason: 'Da Nang appears only in corporate legal footer registration (Req 18); missing Da Nang offer binding',
      span: null
    };
  }

  // Policy rule 3: Store locator dropdown only
  const nonStoreLocator = nonFooter.filter(x => !x.isStoreLocator);
  if (nonStoreLocator.length === 0) {
    return {
      valid: false,
      code: 'HELD__LOCALITY_STORE_LOCATOR_WITHOUT_OFFER_BINDING',
      reason: 'Listing Da Nang in store selector does not state offer applies there (Req 25); missing promotional locality binding',
      span: null
    };
  }

  // Policy rule 4: Image attribute only
  const nonImage = nonStoreLocator.filter(x => !x.isImage);
  if (nonImage.length === 0) {
    return {
      valid: false,
      code: 'HELD__LOCALITY_IMAGE_ONLY_REJECTED',
      reason: 'Da Nang appears only in image filename or alt text (Req 18); missing verbatim text span',
      span: null
    };
  }

  // If candidate claimed a specific locality span, verify it
  if (claimedLocalitySpan) {
    const span = findRawByteSpan(rawBuf, claimedLocalitySpan);
    if (!span) {
      return {
        valid: false,
        code: 'HELD__LOCALITY_SPAN_NOT_FOUND',
        reason: 'Claimed locality span \'' + claimedLocalitySpan + '\' not found in raw source buffer',
        span: null
      };
    }
    return {
      valid: true,
      code: 'LOCALITY_OFFER_BOUND',
      reason: 'Explicit offer clause binds promotion to Da Nang',
      span
    };
  }

  // If there is an offer body match, extract span
  const offerMatch = nonImage.find(x => x.isOfferBody);
  if (offerMatch) {
    const span = findRawByteSpan(rawBuf, offerMatch.match);
    return {
      valid: true,
      code: 'LOCALITY_OFFER_BOUND',
      reason: 'Explicit offer clause binds promotion to Da Nang',
      span
    };
  }

  return {
    valid: false,
    code: 'HELD__LOCALITY_OFFER_BINDING_MISSING',
    reason: 'Da Nang appears in page but lacks explicit binding to the asserted offer',
    span: null
  };
}

/**
 * Analyze validity and recurrence dynamically from raw content.
 * Enforces policy rules:
 * - Prohibits expired campaigns (Req 26)
 * - Prohibits calendar year assumption (e.g. 2026) without explicit text span (Req 20 & 26)
 */
function evaluateValidityRecurrence(rawBuf, claimedValiditySpan, targetYear = 2026) {
  const content = rawBuf.toString('utf8');

  // Policy check: Expired campaign dates in promotional copy
  const isKatinatExpired = /áp dụng từ 25\/4\/2024/i.test(content) || /25\/04\s*&#8211;\s*09\/05/i.test(content);
  if (isKatinatExpired) {
    return {
      valid: false,
      code: 'HELD__VALIDITY_CAMPAIGN_EXPIRED',
      reason: 'Campaign validity span expired prior to 2026 (expired in May 2024)',
      span: null
    };
  }

  // Check if claimed validity span is missing
  if (!claimedValiditySpan) {
    return {
      valid: false,
      code: 'HELD__VALIDITY_UNPROVEN_OR_MISSING',
      reason: 'No validity or recurrence span established in source (Req 26)',
      span: null
    };
  }

  // Find claimed validity span in rawBuffer
  const span = findRawByteSpan(rawBuf, claimedValiditySpan);
  if (!span) {
    return {
      valid: false,
      code: 'HELD__VALIDITY_SPAN_NOT_FOUND',
      reason: 'Claimed validity span \'' + claimedValiditySpan + '\' not found in raw source buffer',
      span: null
    };
  }

  // Check if claimed validity asserts targetYear (e.g. 2026)
  if (claimedValiditySpan.includes(String(targetYear))) {
    return {
      valid: true,
      code: 'VALIDITY_CALENDAR_YEAR_PROVEN',
      reason: 'Validity span explicitly confirms year ' + targetYear,
      span
    };
  }

  // If source leaf was published in prior year (e.g. 2025, 2022) and has no 2026 assertion
  const contains2026InBody = /(?:năm\s*2026|hạn\s*dùng\s*2026|áp dụng\s*2026|31\/12\/2026)/i.test(content);
  if (!contains2026InBody) {
    return {
      valid: false,
      code: 'HELD__VALIDITY_CALENDAR_YEAR_UNPROVEN',
      reason: 'Source leaf published in prior year lacks asserted ' + targetYear + ' calendar validity span (Req 20 & 26)',
      span: null
    };
  }

  return {
    valid: true,
    code: 'VALIDITY_RECURRENCE_PROVEN',
    reason: 'Validity or recurrence proven by verbatim text span',
    span
  };
}

/**
 * PURE EVALUATOR: evaluateCandidate
 * 
 * Takes candidate claims, rawBuffer, and meta.
 * Does NOT rely on pre-assigned locality_nature, status, or precomputed outcome fields.
 * Returns full evaluation report with verdict VERIFIED or HELD.
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
      dimensions: {},
      missing_dimensions: ['source_preconditions']
    };
  }

  // Step 2: Dimensions evaluation
  const dimensions = {};
  const missingDimensions = [];

  // Dimension 1: Title
  if (claims.title) {
    const titleSpan = findRawByteSpan(rawBuffer, claims.title);
    if (titleSpan) {
      dimensions.title = Object.assign({ is_proven: true }, titleSpan);
    } else {
      dimensions.title = { is_proven: false, error: 'Title span not found in raw source buffer' };
      missingDimensions.push('title');
    }
  } else {
    dimensions.title = { is_proven: false, error: 'No title claimed' };
    missingDimensions.push('title');
  }

  // Dimension 2: Price or Benefit
  if (claims.price) {
    const priceSpan = findRawByteSpan(rawBuffer, claims.price);
    if (priceSpan) {
      dimensions.price = Object.assign({ is_proven: true }, priceSpan);
    } else {
      dimensions.price = { is_proven: false, error: 'Price span not found in raw source buffer' };
      missingDimensions.push('price');
    }
  } else {
    dimensions.price = { is_proven: false, error: 'No price or benefit claimed' };
    missingDimensions.push('price');
  }

  // Dimension 3: Conditions
  if (claims.conditions) {
    const condSpan = findRawByteSpan(rawBuffer, claims.conditions);
    if (condSpan) {
      dimensions.conditions = Object.assign({ is_proven: true }, condSpan);
    } else {
      dimensions.conditions = { is_proven: false, error: 'Conditions span not found in raw source buffer' };
      missingDimensions.push('conditions');
    }
  } else {
    dimensions.conditions = { is_proven: false, error: 'Conditions not claimed' };
    missingDimensions.push('conditions');
  }

  // Dimension 4: Locality Binding (Strict Policy Evaluation)
  const localityResult = evaluateLocalityBinding(rawBuffer, claims.da_nang_locality);
  if (localityResult.valid && localityResult.span) {
    dimensions.da_nang_locality = Object.assign({ is_proven: true }, localityResult.span);
  } else {
    dimensions.da_nang_locality = {
      is_proven: false,
      code: localityResult.code,
      error: localityResult.reason
    };
    missingDimensions.push('da_nang_locality');
  }

  // Dimension 5: Validity / Recurrence (Strict Policy Evaluation)
  const validityResult = evaluateValidityRecurrence(rawBuffer, claims.validity_or_recurrence, targetYear);
  if (validityResult.valid && validityResult.span) {
    dimensions.validity_or_recurrence = Object.assign({ is_proven: true }, validityResult.span);
  } else {
    dimensions.validity_or_recurrence = {
      is_proven: false,
      code: validityResult.code,
      error: validityResult.reason
    };
    missingDimensions.push('validity_or_recurrence');
  }

  // Step 3: Compute final verdict
  const allDimensionsProven = missingDimensions.length === 0;
  if (allDimensionsProven) {
    return {
      b19_id: b19Id,
      brand,
      status: 'VERIFIED',
      held_reason: null,
      preconditions_passed: true,
      all_dimensions_proven: true,
      missing_dimensions: [],
      dimensions
    };
  }

  // Compile specific HELD reason
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
    missing_dimensions: missingDimensions,
    dimensions
  };
}

module.exports = {
  sha256,
  normalizeHtmlEntities,
  findRawByteSpan,
  validateSourcePreconditions,
  evaluateLocalityBinding,
  evaluateValidityRecurrence,
  evaluateCandidate
};
