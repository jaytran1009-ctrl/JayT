/**
 * J358-R3-R7: Sealed Authentication Validator
 * 
 * Mandate:
 * 1. Unconditionally reject known broad/page shells (post-content, entry-content,
 *    main, section, catalog, layout shells) regardless of class markers or ID attributes (Req 15).
 * 2. Card ID Authenticity (Req 16): Replace schema-only pattern matching with authenticity proof.
 *    Card ID must be present in sealed capture metadata/manifest mapping for the selected source.
 *    Record mapping key, authenticated ID, and digest.
 * 3. Directed Locality Semantics (Req 17): An offer-binding predicate must directly govern
 *    the claimed locality target. Reject clauses that bind an offer to another city, contain
 *    conflicting localities, or merely co-locate a target city with a generic promotion phrase.
 * 4. Validity Semantics (Req 18): The validity/recurrent predicate and target year must be
 *    in a clause that asserts promotional applicability/effectiveness. Branding, planning,
 *    strategy, or copyright sentences containing 2026 are strictly insufficient.
 * 5. 100% Fail-Closed, Deterministic, Pure Evaluator.
 */

'use strict';

const crypto = require('crypto');

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function decodeHTMLEntities(str) {
  if (!str || typeof str !== 'string') return '';
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
    .replace(/&Uacute;/g, 'Ú');
}

// HTML5 void elements without closing tags
const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

// Tags strictly excluded from text / claim extraction
const EXCLUDED_TAGS = new Set([
  'head', 'script', 'style', 'footer', 'nav', 'header', 'select', 'option', 'noscript', 'iframe'
]);

// Structural card selector patterns
const CARD_CLASS_REGEX = /\b(?:deal|offer|promo|voucher|combo|product|pricing|discount)[-_]card\b/i;
const CARD_ITEM_REGEX = /\bcard[-_](?:deal|offer|promo|voucher|combo|item)\b/i;

// Explicitly banned broad/page shells that are UNCONDITIONALLY REJECTED (Req 15)
const BANNED_CONTAINER_REGEX = /\b(?:post-content|entry-content|article-content|blog-content|main-content|page-content|site-content|content-area|content|container|wrapper|catalog|menu-catalog|overview|layout|shell|row|column|body|main)\b/i;

// Card-scoped identifier schema: namespace + slug of at least 3 characters
const CARD_SCOPED_ID_REGEX = /^(?:offer|deal|promo|campaign|combo|voucher)-[a-z0-9]{3,}(?:-[a-z0-9]+)*$/i;

class DOMNode {
  constructor(type, tagName = '', attrs = {}, parent = null, charStart = 0) {
    this.type = type; // 'element' | 'text' | 'root'
    this.tagName = tagName.toLowerCase();
    this.attrs = attrs;
    this.parent = parent;
    this.children = [];
    this.charStart = charStart;
    this.charEnd = charStart;
    this.byteStart = 0;
    this.byteEnd = 0;
    this.text = '';
    this.isExcluded = false;
    this.isCopyright = false;
  }
}

/**
 * State-machine parser converting HTML string/buffer to a verified DOM tree with exact UTF-8 byte offsets.
 */
function parseHTMLToDOM(htmlBuffer) {
  const html = Buffer.isBuffer(htmlBuffer) ? htmlBuffer.toString('utf8') : htmlBuffer;
  const buf = Buffer.isBuffer(htmlBuffer) ? htmlBuffer : Buffer.from(htmlBuffer, 'utf8');

  // Compute char to byte index table
  const charToByte = new Int32Array(html.length + 1);
  let bIdx = 0;
  for (let cIdx = 0; cIdx < html.length; cIdx++) {
    charToByte[cIdx] = bIdx;
    const code = html.charCodeAt(cIdx);
    if (code <= 0x7f) {
      bIdx += 1;
    } else if (code <= 0x7ff) {
      bIdx += 2;
    } else if (code >= 0xd800 && code <= 0xdbff) {
      bIdx += 4;
      cIdx++;
      charToByte[cIdx] = bIdx;
    } else {
      bIdx += 3;
    }
  }
  charToByte[html.length] = bIdx;

  const root = new DOMNode('root', 'root', {}, null, 0);
  root.byteStart = 0;
  root.byteEnd = buf.length;

  let currentNode = root;
  let cursor = 0;
  const len = html.length;
  let isMalformed = false;

  while (cursor < len) {
    if (html[cursor] === '<') {
      // Comments <!-- ... -->
      if (html.startsWith('<!--', cursor)) {
        const endComment = html.indexOf('-->', cursor + 4);
        if (endComment === -1) {
          isMalformed = true;
          break;
        }
        cursor = endComment + 3;
        continue;
      }

      // DOCTYPE or processing instructions
      if (html.startsWith('<!', cursor) || html.startsWith('<?', cursor)) {
        const endTag = html.indexOf('>', cursor);
        if (endTag === -1) {
          isMalformed = true;
          break;
        }
        cursor = endTag + 1;
        continue;
      }

      // Closing tag </tagName>
      if (html[cursor + 1] === '/') {
        const endTag = html.indexOf('>', cursor);
        if (endTag === -1) {
          isMalformed = true;
          break;
        }
        const closingTagMatch = html.slice(cursor + 2, endTag).trim().match(/^([a-zA-Z0-9:-]+)/);
        if (closingTagMatch) {
          const closingTag = closingTagMatch[1].toLowerCase();
          let matchNode = currentNode;
          while (matchNode && matchNode.type === 'element' && matchNode.tagName !== closingTag) {
            matchNode = matchNode.parent;
          }
          if (matchNode && matchNode.tagName === closingTag) {
            matchNode.charEnd = endTag + 1;
            matchNode.byteEnd = charToByte[matchNode.charEnd];
            currentNode = matchNode.parent || root;
          } else {
            isMalformed = true; // Unmatched closing tag
          }
        }
        cursor = endTag + 1;
        continue;
      }

      // Opening tag <tagName attrs...>
      const endTag = html.indexOf('>', cursor);
      if (endTag === -1) {
        isMalformed = true;
        break;
      }

      const tagContent = html.slice(cursor + 1, endTag);
      const tagMatch = tagContent.match(/^([a-zA-Z0-9:-]+)/);
      if (!tagMatch) {
        cursor = endTag + 1;
        continue;
      }

      const tagName = tagMatch[1].toLowerCase();
      const isSelfClosing = tagContent.trim().endsWith('/') || VOID_ELEMENTS.has(tagName);

      // Parse attributes
      const attrs = {};
      const attrRegex = /([a-zA-Z0-9:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
      let attrMatch;
      const attrString = tagContent.slice(tagMatch[0].length);
      while ((attrMatch = attrRegex.exec(attrString)) !== null) {
        const attrName = attrMatch[1].toLowerCase();
        const attrVal = attrMatch[2] !== undefined ? attrMatch[2] :
          (attrMatch[3] !== undefined ? attrMatch[3] :
            (attrMatch[4] !== undefined ? attrMatch[4] : ''));
        attrs[attrName] = attrVal;
      }

      const elemNode = new DOMNode('element', tagName, attrs, currentNode, cursor);
      elemNode.byteStart = charToByte[cursor];
      elemNode.isExcluded = currentNode.isExcluded || EXCLUDED_TAGS.has(tagName);

      // Also exclude if element has role="navigation" or class store-locator
      if (attrs.role === 'navigation' || (attrs.class && /\bstore-locator\b/i.test(attrs.class))) {
        elemNode.isExcluded = true;
      }

      currentNode.children.push(elemNode);

      if (isSelfClosing) {
        elemNode.charEnd = endTag + 1;
        elemNode.byteEnd = charToByte[elemNode.charEnd];
      } else {
        currentNode = elemNode;
      }

      cursor = endTag + 1;
      continue;
    }

    // Text content
    const nextTag = html.indexOf('<', cursor);
    const textEnd = nextTag === -1 ? len : nextTag;
    const text = html.slice(cursor, textEnd);
    if (text.length > 0) {
      const textNode = new DOMNode('text', '#text', {}, currentNode, cursor);
      textNode.charEnd = textEnd;
      textNode.byteStart = charToByte[cursor];
      textNode.byteEnd = charToByte[textEnd];
      textNode.text = text;
      textNode.isExcluded = currentNode.isExcluded;

      // Check for copyright / legal notice inside text node
      if (/(?:©|&copy;|copyright|\(c\))\s*(?:20\d\d)?/i.test(text) || /all rights reserved/i.test(text)) {
        textNode.isCopyright = true;
      }

      currentNode.children.push(textNode);
    }
    cursor = textEnd;
  }

  // If non-void element remains open at EOF, mark malformed
  if (currentNode && currentNode !== root) {
    isMalformed = true;
  }
  while (currentNode && currentNode !== root) {
    currentNode.charEnd = len;
    currentNode.byteEnd = buf.length;
    currentNode = currentNode.parent;
  }

  return { root, isMalformed, charToByte, buffer: buf };
}

/**
 * Validates strict source preconditions.
 */
function validateSourcePreconditions(rawBuffer, meta) {
  if (!rawBuffer || !Buffer.isBuffer(rawBuffer) || rawBuffer.length === 0) {
    return { ok: false, code: 'HELD__SOURCE_PRECONDITION_FAILED__EMPTY_OR_NON_BUFFER', details: 'Buffer is empty or not a buffer' };
  }
  if (!meta || typeof meta !== 'object') {
    return { ok: false, code: 'HELD__SOURCE_PRECONDITION_FAILED__NULL_METADATA', details: 'Metadata object is null or missing' };
  }

  const diskSha = sha256(rawBuffer);
  if (diskSha !== meta.sha256) {
    return { ok: false, code: 'HELD__SOURCE_PRECONDITION_FAILED__SHA256_MISMATCH', details: `Disk SHA-256 (${diskSha}) does not match metadata SHA-256 (${meta.sha256})` };
  }

  if (rawBuffer.length !== meta.bytes) {
    return { ok: false, code: 'HELD__SOURCE_PRECONDITION_FAILED__BYTE_LENGTH_MISMATCH', details: `Disk byte length (${rawBuffer.length}) does not match metadata bytes (${meta.bytes})` };
  }

  if (meta.http_status !== 200) {
    return { ok: false, code: 'HELD__SOURCE_PRECONDITION_FAILED__HTTP_STATUS_NOT_200', details: `HTTP status is ${meta.http_status}, expected 200` };
  }

  if (meta.is_fetch_failed === true) {
    return { ok: false, code: 'HELD__SOURCE_PRECONDITION_FAILED__FETCH_FAILED', details: 'Metadata indicates fetch failure' };
  }

  if (meta.is_soft_404 === true) {
    return { ok: false, code: 'HELD__SOURCE_PRECONDITION_FAILED__SOFT_404_FLAGGED', details: 'Metadata indicates soft-404' };
  }

  const content = rawBuffer.toString('utf8');
  const soft404Patterns = [
    /<title>[^<]*(?:404|not found|không tìm thấy|không tồn tại)[^<]*<\/title>/i,
    /<h1>[^<]*(?:404|không tìm thấy trang)[^<]*<\/h1>/i,
    /trang bạn tìm kiếm không tồn tại/i
  ];
  for (const pat of soft404Patterns) {
    if (pat.test(content)) {
      return { ok: false, code: 'HELD__SOURCE_PRECONDITION_FAILED__SOFT_404_DETECTED', details: 'Soft-404 error pattern detected in source content' };
    }
  }

  if (!meta.requested_url || typeof meta.requested_url !== 'string' || meta.requested_url.trim() === '') {
    return { ok: false, code: 'HELD__SOURCE_PRECONDITION_FAILED__EMPTY_REQUESTED_URL', details: 'Metadata requested_url is empty' };
  }
  if (!meta.final_url || typeof meta.final_url !== 'string' || meta.final_url.trim() === '') {
    return { ok: false, code: 'HELD__SOURCE_PRECONDITION_FAILED__EMPTY_FINAL_URL', details: 'Metadata final_url is empty' };
  }
  if (!meta.captured_at_utc || typeof meta.captured_at_utc !== 'string' || isNaN(Date.parse(meta.captured_at_utc))) {
    return { ok: false, code: 'HELD__SOURCE_PRECONDITION_FAILED__INVALID_CAPTURED_TIMESTAMP', details: 'Metadata captured_at_utc timestamp is invalid' };
  }

  return { ok: true, code: 'PRECONDITIONS_VERIFIED', disk_sha256: diskSha, byte_length: rawBuffer.length };
}

/**
 * Checks whether a DOM node qualifies as an explicit offer card.
 * UNCONDITIONALLY REJECTS known broad/page shells regardless of class markers or ID attributes (Req 15).
 */
function isExplicitOfferCard(node) {
  if (!node || node.type !== 'element') return false;

  const tag = node.tagName;
  const cls = node.attrs.class || '';
  const id = node.attrs.id || '';

  // 1. Never accept body, html, or excluded tags
  if (['html', 'body', 'head', 'footer', 'nav', 'header', 'script', 'style', 'main', 'section'].includes(tag)) {
    return false;
  }

  // 2. UNCONDITIONAL REJECTION: Known broad/page shells (Req 15)
  // Regardless of whether it also has "deal-card" or any ID attribute, broad shells are NEVER cards!
  if (BANNED_CONTAINER_REGEX.test(cls) || BANNED_CONTAINER_REGEX.test(id)) {
    return false;
  }

  // 3. Structural card marker check
  const hasCardClass = CARD_CLASS_REGEX.test(cls) || CARD_ITEM_REGEX.test(cls);
  const isArticleCard = tag === 'article' && /\b(?:deal|offer|promo|card|combo)\b/i.test(cls);

  return hasCardClass || isArticleCard;
}

/**
 * Authenticates a card identifier against sealed capture metadata/manifest mapping (Req 16).
 */
function authenticateCardIdentifier(rawOfferId, chosenCard, rawBuffer, meta, options = {}) {
  // 1. Caller injection protection (Req 15):
  // Never inspect candidate for authenticity. Candidate data is strictly claims only.
  if (!rawOfferId || typeof rawOfferId !== 'string') {
    return {
      isValid: false,
      isAuthenticated: false,
      raw_id: null,
      namespace: null,
      reason: 'HELD__CARD_IDENTIFIER_MISSING: Offer card has no id or data-offer-id attribute'
    };
  }

  const trimmed = rawOfferId.trim();

  // 2. Schema check (Req 17: reject schema-only IDs)
  if (!CARD_SCOPED_ID_REGEX.test(trimmed)) {
    return {
      isValid: false,
      isAuthenticated: false,
      raw_id: trimmed,
      namespace: null,
      reason: 'HELD__INVALID_CARD_IDENTIFIER_SCHEMA: Offer ID does not conform to card-scoped schema'
    };
  }

  const prefixMatch = trimmed.match(/^([a-z0-9]+)-/i);
  const namespace = prefixMatch ? prefixMatch[1].toLowerCase() : null;

  // 3. Sealed Metadata Manifest Lookup (Req 16)
  if (!meta || typeof meta !== 'object') {
    return {
      isValid: true,
      isAuthenticated: false,
      raw_id: trimmed,
      namespace,
      reason: 'HELD__UNAUTHENTICATED_CARD_IDENTIFIER: Metadata object is missing or invalid'
    };
  }

  const manifest = meta.offer_card_manifest || meta.authenticated_offer_cards || meta.card_manifest || null;
  if (!manifest || typeof manifest !== 'object') {
    return {
      isValid: true,
      isAuthenticated: false,
      raw_id: trimmed,
      namespace,
      reason: 'HELD__UNAUTHENTICATED_CARD_IDENTIFIER: No sealed offer card manifest found in metadata'
    };
  }

  const binding = manifest[trimmed];
  if (!binding || typeof binding !== 'object') {
    return {
      isValid: true,
      isAuthenticated: false,
      raw_id: trimmed,
      namespace,
      reason: 'HELD__UNAUTHENTICATED_CARD_IDENTIFIER: Offer ID is not present in sealed offer card manifest'
    };
  }

  // 4. Multi-Attribute Binding Verification (Req 16, 17)
  const targetLeafId = meta.leaf_id || (options && options.leaf_id) || null;
  const rawSourceSha = rawBuffer ? sha256(rawBuffer) : null;

  // (a) Leaf ID binding check
  if (binding.leaf_id && targetLeafId && binding.leaf_id !== targetLeafId) {
    return {
      isValid: true,
      isAuthenticated: false,
      raw_id: trimmed,
      namespace,
      reason: 'HELD__MANIFEST_LEAF_ID_MISMATCH: Bound leaf_id "' + binding.leaf_id + '" does not match target leaf "' + targetLeafId + '"'
    };
  }

  // (b) Source SHA-256 binding check
  if (binding.source_sha256 && rawSourceSha && binding.source_sha256 !== rawSourceSha) {
    return {
      isValid: true,
      isAuthenticated: false,
      raw_id: trimmed,
      namespace,
      reason: 'HELD__MANIFEST_SOURCE_SHA_MISMATCH: Bound source_sha256 "' + binding.source_sha256 + '" does not match raw source SHA "' + rawSourceSha + '"'
    };
  }

  // (c) DOM Selector binding check
  if (chosenCard && binding.dom_selector) {
    const sel = binding.dom_selector.toLowerCase();
    const tagMatch = sel.match(/^([a-z0-9]+)/i);
    const classMatch = sel.match(/\.([a-z0-9_-]+)/i);
    const idMatch = sel.match(/#([a-z0-9_-]+)/i);

    let selectorMatches = true;
    if (tagMatch && chosenCard.tagName !== tagMatch[1]) selectorMatches = false;
    if (classMatch && (!chosenCard.attrs.class || !chosenCard.attrs.class.toLowerCase().split(/\s+/).includes(classMatch[1]))) selectorMatches = false;
    if (idMatch && (!chosenCard.attrs.id || chosenCard.attrs.id !== idMatch[1])) selectorMatches = false;

    if (!selectorMatches) {
      return {
        isValid: true,
        isAuthenticated: false,
        raw_id: trimmed,
        namespace,
        reason: 'HELD__MANIFEST_CARD_SELECTOR_MISMATCH: Bound DOM selector "' + binding.dom_selector + '" does not match chosen card <' + chosenCard.tagName + ' class="' + (chosenCard.attrs.class || '') + '">'
      };
    }
  }

  // (d) Card Byte Range binding check
  if (chosenCard && binding.card_byte_range) {
    let boundStart, boundEnd;
    if (Array.isArray(binding.card_byte_range)) {
      boundStart = binding.card_byte_range[0];
      boundEnd = binding.card_byte_range[1];
    } else if (typeof binding.card_byte_range === 'object') {
      boundStart = binding.card_byte_range.start;
      boundEnd = binding.card_byte_range.end;
    }

    if (boundStart !== chosenCard.byteStart || boundEnd !== chosenCard.byteEnd) {
      return {
        isValid: true,
        isAuthenticated: false,
        raw_id: trimmed,
        namespace,
        reason: 'HELD__MANIFEST_CARD_RANGE_MISMATCH: Bound byte range [' + boundStart + ', ' + boundEnd + '] does not match card byte range [' + chosenCard.byteStart + ', ' + chosenCard.byteEnd + ']'
      };
    }
  }

  // (e) Receipt Input Hash Registration Check (Req 17)
  if (options && Array.isArray(options.validMetadataHashes) && options.validMetadataHashes.length > 0) {
    const metaHash = options.metadataSha256 || (meta.sha256 ? meta.sha256 : sha256(Buffer.from(JSON.stringify(meta), 'utf8')));
    if (!options.validMetadataHashes.includes(metaHash)) {
      return {
        isValid: true,
        isAuthenticated: false,
        raw_id: trimmed,
        namespace,
        reason: 'HELD__METADATA_HASH_ABSENT_FROM_RECEIPT: Metadata hash "' + metaHash + '" is not present in receipt input list'
      };
    }
  }

  const mappingKey = 'meta.offer_card_manifest["' + trimmed + '"]';
  const manifestDigest = sha256(Buffer.from(JSON.stringify(binding), 'utf8'));

  return {
    isValid: true,
    isAuthenticated: true,
    raw_id: trimmed,
    namespace,
    mapping_key: mappingKey,
    binding_proof: {
      leaf_id: binding.leaf_id,
      source_sha256: binding.source_sha256,
      dom_selector: binding.dom_selector,
      card_byte_range: binding.card_byte_range,
      manifest_digest: manifestDigest
    },
    digest: sha256(trimmed),
    reason: 'AUTHENTICATED_BY_SEALED_SOURCE_BOUND_MANIFEST'
  };
}

function getSemanticClauseElement(textNode, cardNode) {
  let curr = textNode.parent;
  // Climb past inline elements
  const INLINE_TAGS = new Set(['span', 'strong', 'em', 'b', 'i', 'a', 'u', 'small', 'mark', 'label', 'code']);
  while (curr && curr !== cardNode && INLINE_TAGS.has(curr.tagName)) {
    curr = curr.parent;
  }
  return curr || cardNode;
}

/**
 * Extracts text from a DOM node.
 */
function getNodeText(node, excludeCopyright = false) {
  let res = '';
  function tr(n) {
    if (n.isExcluded) return;
    if (excludeCopyright && n.isCopyright) return;
    if (n.type === 'text') {
      res += n.text;
    } else if (n.children) {
      for (const c of n.children) tr(c);
    }
  }
  tr(node);
  return res;
}

/**
 * Checks ancestry relation between two nodes.
 */
function isAncestorOf(ancestor, descendant) {
  let curr = descendant ? descendant.parent : null;
  while (curr) {
    if (curr === ancestor) return true;
    curr = curr.parent;
  }
  return false;
}

/**
 * Gathers all non-excluded text nodes descending from a node.
 */
function getDescendantTextNodes(node) {
  const result = [];
  function traverse(n) {
    if (n.isExcluded) return;
    if (n.type === 'text') {
      result.push(n);
    } else if (n.children) {
      for (const child of n.children) {
        traverse(child);
      }
    }
  }
  traverse(node);
  return result;
}

/**
 * Finds all occurrences of needle inside raw buffer with occurrence accounting.
 */
function findAllRawByteSpans(rawBuf, needle) {
  if (!needle || typeof needle !== 'string' || needle.length === 0) return [];

  const rawStr = rawBuf.toString('utf8');
  const occurrences = [];

  const forms = [needle];
  const decoded = decodeHTMLEntities(needle);
  if (decoded !== needle) forms.push(decoded);

  for (const form of forms) {
    let searchPos = 0;
    while (searchPos < rawStr.length) {
      const idx = rawStr.indexOf(form, searchPos);
      if (idx === -1) break;

      const prefixBuf = Buffer.from(rawStr.slice(0, idx), 'utf8');
      const matchBuf = Buffer.from(form, 'utf8');
      const byteStart = prefixBuf.length;
      const byteEnd = byteStart + matchBuf.length;

      const already = occurrences.some(o => o.byte_start_offset === byteStart && o.byte_end_offset === byteEnd);
      if (!already) {
        occurrences.push({
          raw_needle: needle,
          matched_form: form,
          char_start: idx,
          char_end: idx + form.length,
          byte_start_offset: byteStart,
          byte_end_offset: byteEnd,
          byte_length: matchBuf.length,
          sha256: sha256(matchBuf)
        });
      }
      searchPos = idx + 1;
    }
  }

  occurrences.sort((a, b) => a.byte_start_offset - b.byte_start_offset);
  const totalCount = occurrences.length;
  occurrences.forEach((occ, index) => {
    occ.occurrence_index = index;
    occ.occurrence_count = totalCount;
  });

  return occurrences;
}

/**
 * Validates directed locality semantics and rejects conflicting localities (Req 17).
 */
function validateDirectedLocality(clauseText, localityTarget) {
  // Split clause into sentences
  const sentences = clauseText.split(/(?<=[.!?\n])\s+/);
  const targetRegex = new RegExp(localityTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  const targetSentences = sentences.filter(s => targetRegex.test(s));

  if (targetSentences.length === 0) {
    return { ok: false, code: 'HELD__LOCALITY_NOT_IN_CLAUSE', error: 'Target locality not found in semantic clause' };
  }

  // 1. Check if any sentence binds conflicting cities without Đà Nẵng
  const conflictingMatch = clauseText.match(/(?:áp dụng tại|ưu đãi tại|chi nhánh|cụm rạp)\s+([^.!?;\r\n]*)/i);
  if (conflictingMatch) {
    const governedScope = conflictingMatch[1].toLowerCase();
    const governsTarget = governedScope.includes('đà nẵng') || governedScope.includes('toàn quốc');
    const hasOtherCity = /(?:hà nội|tp\.?\s*hcm|hồ chí minh|cần thơ|hải phòng)/i.test(governedScope);
    if (hasOtherCity && !governsTarget) {
      return {
        ok: false,
        code: 'HELD__LOCALITY_CONFLICTING_OR_UNDIRECTED_BINDING',
        error: `Promotional predicate governs conflicting city without target locality: "${conflictingMatch[0]}"`
      };
    }
  }

  // 2. Target sentence must have an explicit directed offer-binding predicate governing the target
  let hasValidDirectedBinding = false;
  for (const s of targetSentences) {
    // Must not be office address
    if (/(?:địa chỉ văn phòng|trụ sở chính|văn phòng đại diện):?\s*[^.]*đà nẵng/i.test(s)) {
      return { ok: false, code: 'HELD__LOCALITY_OFFICE_ADDRESS_REJECTED', error: 'Target locality sentence is a corporate office address' };
    }
    // Must not be pure travel / description sentence
    if (/(?:điểm đến|du lịch|thành phố đáng sống|bãi biển|danh lam|thắng cảnh)/i.test(s) && !/(?:áp dụng|ưu đãi|khuyến mãi|đồng giá)/i.test(s)) {
      continue; // Pure travel sentence, check if other target sentence exists
    }

    // Directed offer predicate governing Đà Nẵng
    const directedPattern = /(?:áp dụng tại|áp dụng riêng|dành riêng cho khách hàng tại|ưu đãi tại|đồng giá vé tại|chi nhánh|cụm rạp|khu vực|toàn quốc).{0,60}đà nẵng/i;
    const reverseDirected = /đà nẵng.{0,40}(?:áp dụng|đồng giá vé)/i;
    if (directedPattern.test(s) || reverseDirected.test(s)) {
      hasValidDirectedBinding = true;
      break;
    }
  }

  if (!hasValidDirectedBinding) {
    return {
      ok: false,
      code: 'HELD__LOCALITY_OFFER_BINDING_MISSING',
      error: 'Sentence containing target locality lacks directed promotional offer binding'
    };
  }

  return { ok: true };
}

/**
 * Validates validity semantics asserting offer applicability/effectiveness (Req 18).
 */
function validateValiditySemantics(clauseText, validityClaim, targetYear) {
  const sentences = clauseText.split(/(?<=[.!?\n])\s+/);
  const yearSentences = sentences.filter(s => new RegExp(`\\b${targetYear}\\b`).test(s));

  if (yearSentences.length === 0) {
    return { ok: false, code: 'HELD__VALIDITY_CALENDAR_YEAR_NOT_IN_OFFER_CLAUSE', error: `Target year ${targetYear} not found in offer clause` };
  }

  let hasValidPromoEffectiveness = false;

  for (const s of yearSentences) {
    // 1. Reject branding / strategy / corporate vision sentences (Req 18)
    if (/(?:chiến lược|tầm nhìn|thương hiệu|kế hoạch|định hướng|mục tiêu|cam kết đồng hành|phát triển|sứ mệnh)/i.test(s)) {
      return {
        ok: false,
        code: 'HELD__VALIDITY_NON_PROMOTIONAL_CONTEXT',
        error: `Sentence containing ${targetYear} is a branding or corporate strategy statement: "${s.trim()}"`
      };
    }
    // 2. Reject copyright
    if (/(?:©|&copy;|copyright|\(c\)|all rights reserved)/i.test(s)) {
      return {
        ok: false,
        code: 'HELD__VALIDITY_CALENDAR_YEAR_NOT_IN_OFFER_CLAUSE',
        error: `Sentence containing ${targetYear} is a copyright notice: "${s.trim()}"`
      };
    }
    // 3. Check for expired dates
    const expiredMatch = s.match(/(?:hết hạn|thời hạn|đến|hết ngày|áp dụng từ)\s*[^.]*?(?:202[0-5]|2024|2025)/i);
    if (expiredMatch) {
      return {
        ok: false,
        code: 'HELD__VALIDITY_CAMPAIGN_EXPIRED',
        error: `Sentence contains expired campaign validity: "${expiredMatch[0]}"`
      };
    }
    // 4. Assert offer applicability/effectiveness
    if (/(?:áp dụng|khuyến mãi|ưu đãi|thời hạn|hiệu lực|thời gian|có giá trị|hạn sử dụng|hàng tuần)/i.test(s)) {
      hasValidPromoEffectiveness = true;
      break;
    }
  }

  if (!hasValidPromoEffectiveness) {
    return {
      ok: false,
      code: 'HELD__VALIDITY_NON_PROMOTIONAL_CONTEXT',
      error: `Sentence containing ${targetYear} does not assert promotional applicability or effectiveness`
    };
  }

  return { ok: true };
}

/**
 * PURE OFFER CARD EVALUATOR: evaluateCandidate
 * Full compliance with Work Order J358-R3-R6:
 * - Unconditional broad shell rejection
 * - Authenticated card ID mapping proof
 * - Directed locality semantics
 * - Promotional validity semantics
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
  const leafId = candidate.leaf_id || (meta && meta.leaf_id) || null;

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
      offer_card: null,
      dimensions: {},
      missing_dimensions: ['source_preconditions']
    };
  }

  // Step 2: Parse HTML into verified DOM structure
  const { root, isMalformed } = parseHTMLToDOM(rawBuffer);
  if (isMalformed) {
    return {
      b19_id: b19Id,
      brand,
      status: 'HELD',
      held_reason: 'HELD__SOURCE_PRECONDITION_FAILED__MALFORMED_HTML: Unclosed or corrupt HTML structure detected',
      preconditions_passed: false,
      offer_card: null,
      dimensions: {},
      missing_dimensions: ['source_structure']
    };
  }

  // Step 3: Find Title and Price occurrences in non-excluded text nodes
  const dimensions = {};
  const missingDimensions = [];

  const rawTitleSpans = claims.title ? findAllRawByteSpans(rawBuffer, claims.title) : [];
  const rawPriceSpans = claims.price ? findAllRawByteSpans(rawBuffer, claims.price) : [];

  if (rawTitleSpans.length === 0) {
    dimensions.title = { is_proven: false, error: 'Title span not found in raw source buffer' };
    missingDimensions.push('title');
  }
  if (rawPriceSpans.length === 0) {
    dimensions.price = { is_proven: false, error: 'Price span not found in raw source buffer' };
    missingDimensions.push('price');
  }

  if (rawTitleSpans.length === 0 || rawPriceSpans.length === 0) {
    const primary = rawPriceSpans.length === 0 ? 'HELD__PRICE_SPAN_NOT_FOUND' : 'HELD__TITLE_SPAN_NOT_FOUND';
    return {
      b19_id: b19Id,
      brand,
      status: 'HELD',
      held_reason: primary,
      preconditions_passed: true,
      all_dimensions_proven: false,
      offer_card: null,
      missing_dimensions: missingDimensions,
      dimensions
    };
  }

  // Map occurrences to DOM text nodes (must NOT be in excluded nodes like <head>, <meta>, <footer>)
  const allTextNodes = getDescendantTextNodes(root);

  function findEnclosingTextNode(span) {
    return allTextNodes.find(tn => span.char_start >= tn.charStart && span.char_end <= tn.charEnd && !tn.isExcluded);
  }

  const validTitleNodes = rawTitleSpans
    .map(s => ({ span: s, textNode: findEnclosingTextNode(s) }))
    .filter(x => x.textNode !== undefined);

  const validPriceNodes = rawPriceSpans
    .map(s => ({ span: s, textNode: findEnclosingTextNode(s) }))
    .filter(x => x.textNode !== undefined);

  if (validTitleNodes.length === 0 || validPriceNodes.length === 0) {
    return {
      b19_id: b19Id,
      brand,
      status: 'HELD',
      held_reason: 'HELD__TITLE_OR_PRICE_IN_EXCLUDED_NODE: Title or price exists only in head, meta, footer, or excluded element',
      preconditions_passed: true,
      all_dimensions_proven: false,
      offer_card: null,
      missing_dimensions: ['title_or_price_in_body'],
      dimensions
    };
  }

  // Step 4: Locate all DOM nodes that qualify as an explicit offer card (Req 15)
  const allCardNodes = [];
  function findCards(n) {
    if (n.isExcluded) return;
    if (isExplicitOfferCard(n)) {
      allCardNodes.push(n);
    }
    if (n.children) {
      for (const child of n.children) {
        findCards(child);
      }
    }
  }
  findCards(root);

  // If no explicit offer cards exist anywhere on the page, fail closed immediately!
  if (allCardNodes.length === 0) {
    return {
      b19_id: b19Id,
      brand,
      status: 'HELD',
      held_reason: 'HELD__NO_EXPLICIT_OFFER_CARD_FOUND: No element matching explicit card selector allowlist found',
      preconditions_passed: true,
      all_dimensions_proven: false,
      offer_card: null,
      missing_dimensions: ['explicit_offer_card'],
      dimensions
    };
  }

  // Step 5: Find matching card(s) that enclose both title and price
  const candidateMatches = [];

  for (const t of validTitleNodes) {
    for (const p of validPriceNodes) {
      for (const card of allCardNodes) {
        if (isAncestorOf(card, t.textNode) && isAncestorOf(card, p.textNode)) {
          // Check if title and price belong to DIFFERENT child cards inside this card
          const childCards = allCardNodes.filter(c => c !== card && isAncestorOf(card, c));
          const tInChild = childCards.find(c => isAncestorOf(c, t.textNode));
          const pInChild = childCards.find(c => isAncestorOf(c, p.textNode));

          if (tInChild && pInChild && tInChild !== pInChild) {
            // Cross-card pairing detected!
            continue;
          }

          candidateMatches.push({
            card,
            titleNode: t,
            priceNode: p,
            depth: getDepth(card)
          });
        }
      }
    }
  }

  function getDepth(n) {
    let d = 0;
    let curr = n.parent;
    while (curr) {
      d++;
      curr = curr.parent;
    }
    return d;
  }

  if (candidateMatches.length === 0) {
    const tInAnyCard = allCardNodes.some(c => validTitleNodes.some(t => isAncestorOf(c, t.textNode)));
    const pInAnyCard = allCardNodes.some(c => validPriceNodes.some(p => isAncestorOf(c, p.textNode)));
    const reason = (tInAnyCard && pInAnyCard)
      ? 'HELD__CROSS_CARD_ELEMENTS_REJECTED: Title and price reside in different offer-card elements'
      : 'HELD__NO_EXPLICIT_OFFER_CARD_FOUND: Title or price is not enclosed within any explicit offer card';

    return {
      b19_id: b19Id,
      brand,
      status: 'HELD',
      held_reason: reason,
      preconditions_passed: true,
      all_dimensions_proven: false,
      offer_card: null,
      missing_dimensions: ['offer_card_binding'],
      dimensions
    };
  }

  // Disambiguate duplicate identical cards without unique identifier
  const uniqueCards = Array.from(new Set(candidateMatches.map(m => m.card)));
  if (uniqueCards.length > 1) {
    const hasDistinguishingId = uniqueCards.some(c => {
      const oid = c.attrs['data-offer-id'] || c.attrs.id || '';
      return authenticateCardIdentifier(oid, c, rawBuffer, meta, { leaf_id: leafId }).isValid;
    });
    if (!hasDistinguishingId) {
      return {
        b19_id: b19Id,
        brand,
        status: 'HELD',
        held_reason: 'HELD__AMBIGUOUS_DUPLICATE_CARDS_WITHOUT_IDENTIFIER: Duplicate identical cards exist without distinct card-scoped identifier',
        preconditions_passed: true,
        all_dimensions_proven: false,
        offer_card: null,
        missing_dimensions: ['card_identifier'],
        dimensions
      };
    }
  }

  // Choose the deepest (most specific) card
  candidateMatches.sort((a, b) => b.depth - a.depth);
  const bestMatch = candidateMatches[0];
  const chosenCard = bestMatch.card;

  // Step 6: Authenticate Card Identifier strictly via sealed manifest (Req 15, 16, 17)
  const rawOfferId = chosenCard.attrs['data-offer-id'] || chosenCard.attrs.id || null;
  const idAuth = authenticateCardIdentifier(
    rawOfferId,
    chosenCard,
    rawBuffer,
    meta,
    Object.assign({}, options, { leaf_id: leafId })
  );

  // Requirement 16: Must authenticate through sealed metadata/manifest
  if (!idAuth.isAuthenticated) {
    return {
      b19_id: b19Id,
      brand,
      status: 'HELD',
      held_reason: idAuth.reason,
      preconditions_passed: true,
      all_dimensions_proven: false,
      offer_card: {
        tag_name: chosenCard.tagName,
        class_name: chosenCard.attrs.class || '',
        raw_identifier: rawOfferId,
        id_authenticity_failed: true,
        reason: idAuth.reason
      },
      missing_dimensions: ['authenticated_card_identifier'],
      dimensions
    };
  }

  // If card has an offer identifier, it MUST be authenticated against sealed capture metadata!
  if (rawOfferId && !idAuth.isAuthenticated) {
    return {
      b19_id: b19Id,
      brand,
      status: 'HELD',
      held_reason: idAuth.reason,
      preconditions_passed: true,
      all_dimensions_proven: false,
      offer_card: {
        tag_name: chosenCard.tagName,
        class_name: chosenCard.attrs.class || '',
        raw_identifier: rawOfferId,
        id_authenticity_failed: true
      },
      missing_dimensions: ['authenticated_card_identifier'],
      dimensions
    };
  }

  const identifierProof = {
    raw_identifier: rawOfferId,
    attribute_source: chosenCard.attrs['data-offer-id'] ? 'data-offer-id' : (chosenCard.attrs.id ? 'id' : 'none'),
    is_card_scoped_schema_valid: idAuth.isValid,
    is_authenticated_by_metadata: idAuth.isAuthenticated,
    mapping_key: idAuth.mapping_key || null,
    binding_proof: idAuth.binding_proof || null,
    digest: idAuth.digest || null,
    tag_name: chosenCard.tagName,
    class_name: chosenCard.attrs.class || ''
  };

  dimensions.title = Object.assign({ is_proven: true }, bestMatch.titleNode.span);
  dimensions.price = Object.assign({ is_proven: true }, bestMatch.priceNode.span);

  // Step 7: Validate Conditions (must be descendant of chosenCard)
  if (claims.conditions) {
    const condSpans = findAllRawByteSpans(rawBuffer, claims.conditions);
    const validCondInCard = condSpans.find(cs => cs.byte_start_offset >= chosenCard.byteStart && cs.byte_end_offset <= chosenCard.byteEnd);
    if (validCondInCard) {
      dimensions.conditions = Object.assign({ is_proven: true }, validCondInCard);
    } else {
      dimensions.conditions = {
        is_proven: false,
        code: 'HELD__CONDITIONS_NOT_IN_CARD',
        error: 'Conditions span not found inside the accepted offer card'
      };
      missingDimensions.push('conditions');
    }
  } else {
    dimensions.conditions = { is_proven: true, note: 'No explicit conditions claimed' };
  }

  // Step 8: Validate Directed Locality Semantics (Req 17)
  if (!claims.da_nang_locality) {
    dimensions.da_nang_locality = {
      is_proven: false,
      code: 'HELD__LOCALITY_OFFER_BINDING_MISSING',
      error: 'No locality span claimed for offer'
    };
    missingDimensions.push('da_nang_locality');
  } else {
    const locSpans = findAllRawByteSpans(rawBuffer, claims.da_nang_locality);
    const validLocInCard = locSpans.find(ls => ls.byte_start_offset >= chosenCard.byteStart && ls.byte_end_offset <= chosenCard.byteEnd);

    if (!validLocInCard) {
      dimensions.da_nang_locality = {
        is_proven: false,
        code: 'HELD__LOCALITY_NOT_IN_CARD',
        error: 'Claimed locality span is outside the accepted offer card'
      };
      missingDimensions.push('da_nang_locality');
    } else {
      const locTextNode = findEnclosingTextNode(validLocInCard);
      if (!locTextNode) {
        dimensions.da_nang_locality = {
          is_proven: false,
          code: 'HELD__LOCALITY_IN_EXCLUDED_NODE',
          error: 'Locality span is located inside an excluded DOM node'
        };
        missingDimensions.push('da_nang_locality');
      } else {
        const locClauseElem = getSemanticClauseElement(locTextNode, chosenCard);
        const locClauseText = getNodeText(locClauseElem, false);

        // Directed locality semantics check
        const dirCheck = validateDirectedLocality(locClauseText, claims.da_nang_locality);
        if (!dirCheck.ok) {
          dimensions.da_nang_locality = {
            is_proven: false,
            code: dirCheck.code,
            error: dirCheck.error
          };
          missingDimensions.push('da_nang_locality');
        } else {
          dimensions.da_nang_locality = Object.assign({ is_proven: true, directed_locality_verified: true }, validLocInCard);
        }
      }
    }
  }

  // Step 9: Validate Validity & Target Calendar Year 2026 Semantics (Req 18)
  if (!claims.validity_or_recurrence) {
    dimensions.validity_or_recurrence = {
      is_proven: false,
      code: 'HELD__VALIDITY_OFFER_BINDING_MISSING',
      error: 'No validity or recurrence claimed for offer'
    };
    missingDimensions.push('validity_or_recurrence');
  } else {
    const valSpans = findAllRawByteSpans(rawBuffer, claims.validity_or_recurrence);
    const validValInCard = valSpans.find(vs => vs.byte_start_offset >= chosenCard.byteStart && vs.byte_end_offset <= chosenCard.byteEnd);

    if (!validValInCard) {
      dimensions.validity_or_recurrence = {
        is_proven: false,
        code: 'HELD__VALIDITY_NOT_IN_CARD',
        error: 'Claimed validity span is outside the accepted offer card'
      };
      missingDimensions.push('validity_or_recurrence');
    } else {
      const valTextNode = findEnclosingTextNode(validValInCard);
      if (!valTextNode) {
        dimensions.validity_or_recurrence = {
          is_proven: false,
          code: 'HELD__VALIDITY_IN_EXCLUDED_NODE',
          error: 'Validity span is located inside an excluded DOM node'
        };
        missingDimensions.push('validity_or_recurrence');
      } else {
        const valClauseElem = getSemanticClauseElement(valTextNode, chosenCard);
        const valClauseText = getNodeText(valClauseElem, true);

        // Validity semantics check (asserts offer applicability, rejects branding context)
        const valCheck = validateValiditySemantics(valClauseText, claims.validity_or_recurrence, targetYear);
        if (!valCheck.ok) {
          dimensions.validity_or_recurrence = {
            is_proven: false,
            code: valCheck.code,
            error: valCheck.error
          };
          missingDimensions.push('validity_or_recurrence');
        } else {
          dimensions.validity_or_recurrence = Object.assign({ is_proven: true, validity_semantics_verified: true }, validValInCard);
        }
      }
    }
  }

  // Step 10: Final Decision
  const allProven = missingDimensions.length === 0 &&
    dimensions.title && dimensions.title.is_proven &&
    dimensions.price && dimensions.price.is_proven &&
    dimensions.conditions && dimensions.conditions.is_proven &&
    dimensions.da_nang_locality && dimensions.da_nang_locality.is_proven &&
    dimensions.validity_or_recurrence && dimensions.validity_or_recurrence.is_proven;

  const cardDetails = {
    tag_name: chosenCard.tagName,
    class_name: chosenCard.attrs.class || '',
    id: chosenCard.attrs.id || null,
    data_offer_id: chosenCard.attrs['data-offer-id'] || null,
    byte_start: chosenCard.byteStart,
    byte_end: chosenCard.byteEnd,
    char_start: chosenCard.charStart,
    char_end: chosenCard.charEnd,
    depth: bestMatch.depth,
    identifier_proof: identifierProof
  };

  if (!allProven) {
    let primaryReason = 'HELD__UNKNOWN_DEFICIT';
    for (const dim of ['source_preconditions', 'explicit_offer_card', 'title', 'price', 'conditions', 'da_nang_locality', 'validity_or_recurrence']) {
      if (dimensions[dim] && dimensions[dim].code) {
        primaryReason = dimensions[dim].code + ': ' + dimensions[dim].error;
        break;
      }
      if (missingDimensions.includes(dim)) {
        if (dim === 'da_nang_locality') primaryReason = 'HELD__LOCALITY_OFFER_BINDING_MISSING: No locality span claimed for offer';
        else if (dim === 'validity_or_recurrence') primaryReason = 'HELD__VALIDITY_OFFER_BINDING_MISSING: No validity or recurrence claimed for offer';
        else primaryReason = `HELD__DIMENSION_MISSING_${dim.toUpperCase()}`;
        break;
      }
    }

    return {
      b19_id: b19Id,
      brand,
      status: 'HELD',
      held_reason: primaryReason,
      preconditions_passed: true,
      all_dimensions_proven: false,
      offer_card: cardDetails,
      missing_dimensions: missingDimensions,
      dimensions
    };
  }

  return {
    b19_id: b19Id,
    brand,
    status: 'VERIFIED',
    held_reason: null,
    preconditions_passed: true,
    all_dimensions_proven: true,
    offer_card: cardDetails,
    missing_dimensions: [],
    dimensions
  };
}

module.exports = {
  sha256,
  decodeHTMLEntities,
  parseHTMLToDOM,
  validateSourcePreconditions,
  authenticateCardIdentifier,
  isExplicitOfferCard,
  getSemanticClauseElement,
  getNodeText,
  getDescendantTextNodes,
  findAllRawByteSpans,
  validateDirectedLocality,
  validateValiditySemantics,
  evaluateCandidate,
  CARD_SCOPED_ID_REGEX,
  CARD_CLASS_REGEX,
  BANNED_CONTAINER_REGEX
};
