/**
 * J358-R3-R4: STRICT OFFER-CARD & DOM-PARSER CLAIM PROVENANCE VALIDATOR
 * Work Order: J358-R3-R4-DOM-PARSER-AND-ARTIFACT-REPRODUCIBILITY
 * Authority: Quyết định CEO JAYT-358-R3-R3 (01_EXECUTIVE_COUNCIL/JAYT_358_CEO_R3_R3_PARTIAL_ACCEPTANCE_AND_REPRODUCIBILITY_GATE.md)
 * 
 * CORE ARCHITECTURE:
 * 1. Structurally verified DOM parser / tokenizer tracking UTF-8 byte boundaries and ancestry.
 * 2. Fail-closed behavior on malformed or unclosed HTML (HELD__SOURCE_PRECONDITION_FAILED__MALFORMED_HTML).
 * 3. Node-level exclusions: <head>, <meta>, <footer>, <nav>, <header>, <select>, <option>, .store-locator, copyright nodes.
 * 4. Explicit Card Selector Allowlist (Req 15):
 *    - Generic div, section, #main, post-content, entry-content, page body and catalog shells are NEVER cards by themselves.
 *    - Cards must match an explicit card pattern in class/role OR have a stable unambiguous offer identifier (data-offer-id or id).
 *    - Missing card fails closed with HELD__NO_EXPLICIT_OFFER_CARD_FOUND.
 * 5. Descendant Evidence Binding (Req 16):
 *    - Title, price, conditions, locality phrase, locality target and validity/year evidence must be descendants of the same accepted card.
 *    - Locality must have an explicit promotional binding clause tied to Đà Nẵng (generic office address or out-of-town branch rejected).
 *    - Validity must contain the target calendar year (2026) in non-copyright card text.
 *    - Rejects cross-card pairing (HELD__CROSS_CARD_ELEMENTS_REJECTED).
 *    - Rejects ambiguous duplicate cards without unique identifier (HELD__AMBIGUOUS_DUPLICATE_CARDS_WITHOUT_IDENTIFIER).
 * 6. Pure evaluator: no pre-assigned fields or precomputed outcomes.
 * 7. Fails closed: 0 VERIFIED is a truthful, acceptable outcome.
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

// Explicit card selector allowlist patterns
const CARD_CLASS_REGEX = /\b(?:deal|offer|promo|voucher|coupon|promotion|discount|combo)-card\b/i;
const CARD_ITEM_REGEX = /\b(?:deal|offer|promo|combo)-item\b/i;
const CARD_PREFIX_REGEX = /\bcard-(?:deal|offer|promo|voucher|item)\b/i;

// Explicitly banned broad/generic containers that can NEVER be cards without an explicit offer identifier
const BANNED_CONTAINER_REGEX = /\b(?:post-content|entry-content|article-content|blog-content|main-content|page-content|site-content|content-area|content|container|wrapper|catalog|menu-catalog|overview|layout|shell|row|column|body|main)\b/i;

// Stable offer identifier attribute patterns
const OFFER_ID_ATTR_REGEX = /^(?:offer|deal|promo|voucher|combo|item|b19)[-_][a-z0-9_-]+$/i;

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
      const isSelfClose = tagContent.endsWith('/') || VOID_ELEMENTS.has(tagName);

      // Parse attributes
      const attrs = {};
      const attrRegex = /([a-zA-Z0-9:-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
      let m;
      const attrPart = tagContent.slice(tagName.length);
      while ((m = attrRegex.exec(attrPart)) !== null) {
        const key = m[1].toLowerCase();
        const val = m[2] !== undefined ? m[2] : (m[3] !== undefined ? m[3] : (m[4] !== undefined ? m[4] : ''));
        attrs[key] = val;
      }

      const elem = new DOMNode('element', tagName, attrs, currentNode, cursor);
      elem.byteStart = charToByte[cursor];
      elem.isExcluded = currentNode.isExcluded || EXCLUDED_TAGS.has(tagName);

      // Node-level store locator exclusion
      if (attrs.class && /\b(?:store-locator|store-selector|store-list)\b/i.test(attrs.class)) {
        elem.isExcluded = true;
      }

      currentNode.children.push(elem);

      if (isSelfClose) {
        elem.charEnd = endTag + 1;
        elem.byteEnd = charToByte[elem.charEnd];
      } else {
        currentNode = elem;
      }

      cursor = endTag + 1;
      continue;
    }

    // Text node
    const nextTag = html.indexOf('<', cursor);
    const textEnd = nextTag === -1 ? len : nextTag;
    const text = html.slice(cursor, textEnd);
    if (text.length > 0) {
      const textNode = new DOMNode('text', '', {}, currentNode, cursor);
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
 * Checks whether a DOM node qualifies as an explicit offer card under the allowlist (Req 15).
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

  // 2. Reject explicitly banned container classes / IDs unless it has an explicit stable offer ID
  const isBanned = BANNED_CONTAINER_REGEX.test(cls) || BANNED_CONTAINER_REGEX.test(id) || tag === 'main' || tag === 'section';
  if (isBanned) {
    const hasExplicitOfferId = (dataOfferId && dataOfferId.trim().length > 0) || OFFER_ID_ATTR_REGEX.test(id);
    if (!hasExplicitOfferId) {
      return false; // Banned container without explicit offer ID is rejected!
    }
  }

  // 3. Condition A: Explicit Offer Card Marker in Class or Tag
  const hasCardClass = CARD_CLASS_REGEX.test(cls) || CARD_ITEM_REGEX.test(cls) || CARD_PREFIX_REGEX.test(cls);
  const isArticleCard = tag === 'article' && /\b(?:deal|offer|promo|card|combo)\b/i.test(cls);

  // 4. Condition B: Stable Offer Identifier
  const hasStableOfferId = (dataOfferId && dataOfferId.trim().length > 0) || OFFER_ID_ATTR_REGEX.test(id);

  return hasCardClass || isArticleCard || hasStableOfferId;
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
 * Gathers concatenated text of all non-excluded descendants of a node.
 */
function getNodeDescendantText(node, excludeCopyright = false) {
  const textNodes = getDescendantTextNodes(node);
  return textNodes
    .filter(tn => !excludeCopyright || !tn.isCopyright)
    .map(tn => tn.text)
    .join(' ');
}

/**
 * Checks if a node is an ancestor of another node.
 */
function isAncestorOf(ancestor, child) {
  let curr = child.parent;
  while (curr) {
    if (curr === ancestor) return true;
    curr = curr.parent;
  }
  return false;
}

/**
 * Finds all raw byte spans in buffer with verbatim verification and occurrence accounting.
 */
function findAllRawByteSpans(rawBuf, needle) {
  if (!needle || typeof needle !== 'string') return [];
  const str = rawBuf.toString('utf8');
  const occurrences = [];
  let pos = 0;

  while ((pos = str.indexOf(needle, pos)) !== -1) {
    const charStart = pos;
    const charEnd = pos + needle.length;
    const byteStart = Buffer.byteLength(str.slice(0, charStart), 'utf8');
    const byteEnd = Buffer.byteLength(str.slice(0, charEnd), 'utf8');
    const byteLen = byteEnd - byteStart;

    const slice = rawBuf.subarray(byteStart, byteEnd);
    const verbatim = slice.toString('utf8');

    occurrences.push({
      occurrence_index: occurrences.length,
      char_start: charStart,
      char_end: charEnd,
      byte_start_offset: byteStart,
      byte_end_offset: byteEnd,
      byte_length: byteLen,
      raw_substring: verbatim,
      is_verbatim_match: verbatim === needle
    });

    pos += needle.length;
  }

  const total = occurrences.length;
  for (const occ of occurrences) {
    occ.occurrence_count = total;
  }
  return occurrences;
}

/**
 * PURE OFFER CARD EVALUATOR: evaluateCandidate
 * Fully reproducible, strict card selector allowlist, descendant binding, zero document fallback.
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

  // Step 4: Locate all DOM nodes that qualify as an explicit offer card under allowlist
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
      held_reason: 'HELD__NO_EXPLICIT_OFFER_CARD_FOUND: No element matching explicit card selector allowlist or stable offer identifier found',
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

  // Disambiguate duplicate identical cards without unique identifier (Req 20 Attack 5)
  const uniqueCards = Array.from(new Set(candidateMatches.map(m => m.card)));
  if (uniqueCards.length > 1) {
    const hasDistinguishingId = uniqueCards.some(c => {
      const oid = c.attrs['data-offer-id'] || c.attrs.id || '';
      return oid.trim().length > 0;
    });
    if (!hasDistinguishingId) {
      return {
        b19_id: b19Id,
        brand,
        status: 'HELD',
        held_reason: 'HELD__AMBIGUOUS_DUPLICATE_CARDS_WITHOUT_IDENTIFIER: Duplicate identical cards exist without distinct offer identifier',
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

  dimensions.title = Object.assign({ is_proven: true }, bestMatch.titleNode.span);
  dimensions.price = Object.assign({ is_proven: true }, bestMatch.priceNode.span);

  const cardDescendantText = getNodeDescendantText(chosenCard, false);
  const nonCopyrightCardText = getNodeDescendantText(chosenCard, true);

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

  // Step 7: Validate Da Nang Locality (must be descendant of chosenCard with explicit promo binding)
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
        error: 'Claimed locality span is outside the accepted offer card (cross-card borrowing strictly rejected per Req 16)'
      };
      missingDimensions.push('da_nang_locality');
    } else {
      // Must not be a generic office address
      const isOfficeAddress = /(?:địa chỉ văn phòng|trụ sở chính|văn phòng đại diện):?\s*[^.]*đà nẵng/i.test(cardDescendantText);
      if (isOfficeAddress) {
        dimensions.da_nang_locality = {
          is_proven: false,
          code: 'HELD__LOCALITY_OFFICE_ADDRESS_REJECTED',
          error: 'Locality mention in card is a corporate office address without promotional offer binding'
        };
        missingDimensions.push('da_nang_locality');
      } else {
        // Must contain explicit promotional binding clause tied to Đà Nẵng
        const isOfferBound = /(?:áp dụng tại|áp dụng riêng|dành riêng cho khách hàng|ưu đãi tại|đồng giá vé|chi nhánh|cụm rạp).{0,60}đà nẵng/i.test(cardDescendantText) ||
          /đà nẵng.{0,60}(?:áp dụng|đồng giá)/i.test(cardDescendantText);

        if (!isOfferBound) {
          dimensions.da_nang_locality = {
            is_proven: false,
            code: 'HELD__LOCALITY_OFFER_BINDING_MISSING',
            error: 'Locality mention in card lacks explicit promotional binding clause'
          };
          missingDimensions.push('da_nang_locality');
        } else {
          dimensions.da_nang_locality = Object.assign({ is_proven: true }, validLocInCard);
        }
      }
    }
  }

  // Step 8: Validate Validity & Target Calendar Year 2026
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
      // Check for past expired dates (e.g. 2024, 2025)
      const expiredMatch = cardDescendantText.match(/(?:hết hạn|thời hạn|đến|hết ngày|áp dụng từ)\s*[^.]*?(?:202[0-5]|2024|2025)/i);
      if (expiredMatch) {
        dimensions.validity_or_recurrence = {
          is_proven: false,
          code: 'HELD__VALIDITY_CAMPAIGN_EXPIRED',
          error: `Card contains expired campaign validity: ${expiredMatch[0]}`
        };
        missingDimensions.push('validity_or_recurrence');
      } else {
        // Target year (2026) must be present in NON-COPYRIGHT card text
        const hasTargetYearInNonCopyright = new RegExp(`\\b${targetYear}\\b`).test(nonCopyrightCardText);
        if (!hasTargetYearInNonCopyright) {
          dimensions.validity_or_recurrence = {
            is_proven: false,
            code: 'HELD__VALIDITY_CALENDAR_YEAR_NOT_IN_CARD',
            error: `Target calendar year ${targetYear} not found in promotional card text (copyright text excluded)`
          };
          missingDimensions.push('validity_or_recurrence');
        } else {
          dimensions.validity_or_recurrence = Object.assign({ is_proven: true }, validValInCard);
        }
      }
    }
  }

  // Step 9: Compute final verdict
  const cardSummary = {
    tagName: chosenCard.tagName,
    attrs: chosenCard.attrs,
    offer_id: chosenCard.attrs['data-offer-id'] || chosenCard.attrs.id || null,
    start_byte_offset: chosenCard.byteStart,
    end_byte_offset: chosenCard.byteEnd,
    byte_length: chosenCard.byteEnd - chosenCard.byteStart
  };

  const allDimensionsProven = missingDimensions.length === 0;
  if (allDimensionsProven) {
    return {
      b19_id: b19Id,
      brand,
      status: 'VERIFIED',
      held_reason: null,
      preconditions_passed: true,
      all_dimensions_proven: true,
      offer_card: cardSummary,
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
    offer_card: cardSummary,
    missing_dimensions: missingDimensions,
    dimensions
  };
}

module.exports = {
  sha256,
  normalizeHtmlEntities,
  parseHTMLToDOM,
  isExplicitOfferCard,
  getDescendantTextNodes,
  getNodeDescendantText,
  findAllRawByteSpans,
  validateSourcePreconditions,
  evaluateCandidate,
  DOMNode
};
