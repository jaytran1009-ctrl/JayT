/**
 * J358-R3-R5: Card-Scoped Evidence Validator
 * 
 * Mandate:
 * 1. Strictly enforce card-scoped identifier schema (CARD_SCOPED_ID_REGEX):
 *    - Approved namespaces: offer-, deal-, promo-, campaign-, combo-, voucher-
 *    - Slug of >= 3 characters (e.g. deal-001, deal-2026-combo-a)
 *    - Arbitrary strings (e.g. "x", "1", "test") are strictly rejected.
 * 2. Banned page/broad containers (including post-content, entry-content, main, section shells)
 *    remain ineligible even when they contain an identifier, UNLESS a structural card marker
 *    and card-scoped identifier are BOTH present (Req 16).
 * 3. Descendant Evidence Binding & Semantic Clause Relation (Req 17):
 *    - Locality target (Đà Nẵng) and promotional binding phrase MUST reside in the SAME
 *      semantic text node or tightly specified clause relation (parent block / immediate siblings).
 *    - Validity/recurrence and calendar year (2026) MUST reside in the SAME semantic clause relation.
 *    - Container-wide text search across the card is FORBIDDEN.
 *    - Corporate office addresses and copyright text nodes are strictly excluded.
 * 4. 100% Fail-Closed, Pure, Deterministic Evaluator.
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

// Explicitly banned broad/generic containers that can NEVER be cards unless structural card marker + card-scoped ID are BOTH present
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
 * Validates a card-scoped identifier according to Req 15.
 */
function validateCardScopedIdentifier(idValue) {
  if (!idValue || typeof idValue !== 'string') {
    return { isValid: false, namespace: null, value: null, reason: 'EMPTY_OR_NON_STRING' };
  }
  const trimmed = idValue.trim();
  if (!CARD_SCOPED_ID_REGEX.test(trimmed)) {
    return { isValid: false, namespace: null, value: trimmed, reason: 'INVALID_SCHEMA_PATTERN' };
  }
  const prefixMatch = trimmed.match(/^([a-z0-9]+)-/i);
  const namespace = prefixMatch ? prefixMatch[1].toLowerCase() : null;
  return { isValid: true, namespace, value: trimmed, reason: 'VALID_CARD_SCOPED_SCHEMA' };
}

/**
 * Checks whether a DOM node qualifies as an explicit offer card (Req 15 & 16).
 */
function isExplicitOfferCard(node) {
  if (!node || node.type !== 'element') return false;

  const tag = node.tagName;
  const cls = node.attrs.class || '';
  const id = node.attrs.id || '';
  const dataOfferId = node.attrs['data-offer-id'] || '';

  // 1. Never accept body, html, or excluded container tags
  if (['html', 'body', 'head', 'footer', 'nav', 'header', 'script', 'style'].includes(tag)) {
    return false;
  }

  // 2. Identify banned broad container
  const isBanned = BANNED_CONTAINER_REGEX.test(cls) || BANNED_CONTAINER_REGEX.test(id) || tag === 'main' || tag === 'section';

  // 3. Structural card marker check
  const hasCardClass = CARD_CLASS_REGEX.test(cls) || CARD_ITEM_REGEX.test(cls);
  const isArticleCard = tag === 'article' && /\b(?:deal|offer|promo|card|combo)\b/i.test(cls);
  const hasCardMarker = hasCardClass || isArticleCard;

  // 4. Identifier check
  const rawId = dataOfferId || id;
  const idCheck = validateCardScopedIdentifier(rawId);

  // Requirement 16: Banned page/broad containers (including post-content, entry-content, main and section shells)
  // remain ineligible even when they contain an identifier, unless a structural card marker and card-scoped identifier are both present.
  if (isBanned) {
    if (hasCardMarker && idCheck.isValid) {
      return true;
    }
    return false;
  }

  // Normal elements: must have either structural card marker OR (valid card-scoped identifier and allowed card container element)
  if (hasCardMarker) {
    return true;
  }

  if (idCheck.isValid && ['div', 'article', 'li'].includes(tag)) {
    return true;
  }

  return false;
}

/**
 * Finds the semantic clause element enclosing a text node within an accepted card.
 * Container-wide text search is forbidden per Req 17.
 */
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
 * PURE OFFER CARD EVALUATOR: evaluateCandidate
 * Fully reproducible, card-scoped identifier schema, node-relation semantic clause binding, zero container-wide fallback.
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

  // Step 4: Locate all DOM nodes that qualify as an explicit offer card under allowlist & schema (Req 15 & 16)
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
      held_reason: 'HELD__NO_EXPLICIT_OFFER_CARD_FOUND: No element matching explicit card selector allowlist or card-scoped identifier schema found',
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

  // Disambiguate duplicate identical cards without unique identifier (Req 19)
  const uniqueCards = Array.from(new Set(candidateMatches.map(m => m.card)));
  if (uniqueCards.length > 1) {
    const hasDistinguishingId = uniqueCards.some(c => {
      const oid = c.attrs['data-offer-id'] || c.attrs.id || '';
      return validateCardScopedIdentifier(oid).isValid;
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

  // Record identifier audit proof (Req 15)
  const rawOfferId = chosenCard.attrs['data-offer-id'] || chosenCard.attrs.id || null;
  const idAudit = validateCardScopedIdentifier(rawOfferId);
  const identifierProof = {
    raw_identifier: rawOfferId,
    attribute_source: chosenCard.attrs['data-offer-id'] ? 'data-offer-id' : (chosenCard.attrs.id ? 'id' : 'none'),
    is_card_scoped_schema_valid: idAudit.isValid,
    namespace: idAudit.namespace,
    tag_name: chosenCard.tagName,
    class_name: chosenCard.attrs.class || '',
    structural_card_marker_present: CARD_CLASS_REGEX.test(chosenCard.attrs.class || '') || (chosenCard.tagName === 'article' && /\b(?:deal|offer|promo|card|combo)\b/i.test(chosenCard.attrs.class || ''))
  };

  dimensions.title = Object.assign({ is_proven: true }, bestMatch.titleNode.span);
  dimensions.price = Object.assign({ is_proven: true }, bestMatch.priceNode.span);

  // Step 6: Validate Conditions (must be descendant of chosenCard)
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

  // Step 7: Validate Da Nang Locality with SEMANTIC CLAUSE BINDING (Req 17: Container-wide text search forbidden!)
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
      // Find the enclosing text node and its semantic clause element (Req 17)
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

        // 1. Must NOT be a generic office address in this clause
        const isOfficeAddress = /(?:địa chỉ văn phòng|trụ sở chính|văn phòng đại diện):?\s*[^.]*đà nẵng/i.test(locClauseText);
        if (isOfficeAddress) {
          dimensions.da_nang_locality = {
            is_proven: false,
            code: 'HELD__LOCALITY_OFFICE_ADDRESS_REJECTED',
            error: 'Locality mention in clause is a corporate office address without promotional offer binding'
          };
          missingDimensions.push('da_nang_locality');
        } else {
          // 2. Must contain explicit promotional binding clause tied to Đà Nẵng WITHIN THIS SEMANTIC CLAUSE
          const isOfferBound = /(?:áp dụng tại|áp dụng riêng|dành riêng cho khách hàng|ưu đãi tại|đồng giá vé|chi nhánh|cụm rạp).{0,60}đà nẵng/i.test(locClauseText) ||
            /đà nẵng.{0,60}(?:áp dụng|đồng giá)/i.test(locClauseText);

          if (!isOfferBound) {
            dimensions.da_nang_locality = {
              is_proven: false,
              code: 'HELD__LOCALITY_OFFER_BINDING_MISSING',
              error: 'Locality mention in semantic clause lacks explicit promotional binding clause'
            };
            missingDimensions.push('da_nang_locality');
          } else {
            dimensions.da_nang_locality = Object.assign({ is_proven: true, semantic_clause_verified: true }, validLocInCard);
          }
        }
      }
    }
  }

  // Step 8: Validate Validity & Target Calendar Year 2026 with SEMANTIC CLAUSE BINDING (Req 17: Container-wide search forbidden!)
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

        // Check for past expired dates (e.g. 2024, 2025) in this clause
        const expiredMatch = valClauseText.match(/(?:hết hạn|thời hạn|đến|hết ngày|áp dụng từ)\s*[^.]*?(?:202[0-5]|2024|2025)/i);
        if (expiredMatch) {
          dimensions.validity_or_recurrence = {
            is_proven: false,
            code: 'HELD__VALIDITY_CAMPAIGN_EXPIRED',
            error: `Validity clause contains expired campaign validity: ${expiredMatch[0]}`
          };
          missingDimensions.push('validity_or_recurrence');
        } else {
          // Target year (2026) MUST be present in THIS validity semantic clause (Req 17)
          const hasTargetYearInClause = new RegExp(`\\b${targetYear}\\b`).test(valClauseText);
          if (!hasTargetYearInClause) {
            dimensions.validity_or_recurrence = {
              is_proven: false,
              code: 'HELD__VALIDITY_CALENDAR_YEAR_NOT_IN_OFFER_CLAUSE',
              error: `Target calendar year ${targetYear} not found in the promotional validity semantic clause (container-wide search forbidden per Req 17)`
            };
            missingDimensions.push('validity_or_recurrence');
          } else {
            dimensions.validity_or_recurrence = Object.assign({ is_proven: true, semantic_clause_verified: true }, validValInCard);
          }
        }
      }
    }
  }

  // Step 9: Final Decision
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
  validateCardScopedIdentifier,
  isExplicitOfferCard,
  getSemanticClauseElement,
  getNodeText,
  getDescendantTextNodes,
  findAllRawByteSpans,
  evaluateCandidate,
  CARD_SCOPED_ID_REGEX,
  CARD_CLASS_REGEX,
  BANNED_CONTAINER_REGEX
};
