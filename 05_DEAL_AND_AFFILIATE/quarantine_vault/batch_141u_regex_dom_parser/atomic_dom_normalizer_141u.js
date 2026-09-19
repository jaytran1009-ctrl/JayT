/**
 * JAYT ATOMIC DOM OFFER NORMALIZER & SNAPSHOT ENGINE (141U)
 * Directive: JAYT-141U — ATOMIC DOM OFFER BOUNDARY & SCHEDULER ACTIVATION BLOCK
 * 
 * STRICT ARCHITECTURAL CONSTRAINTS:
 * 1. Prohibits page-wide line-based offer block assembly.
 * 2. DOM_ATOMIC_OFFER_FRAGMENT must originate from a single, unambiguous DOM container:
 *    - article, .promo-item, .card-promo, .event-item, [data-offer-id], or verified leaf section.
 * 3. Menu, header, footer, breadcrumb, login, user nav ("Vé Của Tôi"), and system dates are isolated as PAGE_LEVEL_UNBOUND_SIGNALS.
 * 4. Cross-container merging of title, price, terms, validity, and scope is STRICTLY PROHIBITED.
 * 5. 5-Tier Delta Classification:
 *    - PAGE_RENDER_VARIATION
 *    - PAGE_SEMANTIC_CHANGE_UNBOUND
 *    - ATOMIC_OFFER_FRAGMENT_CHANGED
 *    - NEW_OFFICIAL_OFFER_LEAF_DISCOVERED
 *    - HTTP_ERROR_BACKOFF
 */

const crypto = require('crypto');

const NORMALIZER_VERSION = 'v141u_atomic_dom_boundary_v1';

function computeSha256(strOrBuf) {
  return crypto.createHash('sha256').update(strOrBuf).digest('hex');
}

function normalizeText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/[ \t]+/g, ' ')
    .trim();
}

/**
 * Stack-based container block extractor (with parent wrapper deduplication)
 */
function findContainerBlocks(html) {
  const containers = [];
  const tagRegex = /<(\/)?([a-zA-Z0-9]+)([^>]*)>/g;
  let match;
  const openStack = [];
  const allowedContainerTags = new Set(['article', 'div', 'li', 'section', 'main']);

  while ((match = tagRegex.exec(html)) !== null) {
    const isClosing = match[1] === '/';
    const tagName = match[2].toLowerCase();
    const attrs = match[3];
    const startIndex = match.index;
    const fullTag = match[0];
    const endIndex = startIndex + fullTag.length;

    if (['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName) || attrs.trim().endsWith('/')) {
      continue;
    }

    if (!isClosing) {
      const isContainerTag = allowedContainerTags.has(tagName);
      const isCandidateClass = /(?:promo-item|event-item|card|news-item|offer-item|item-deal)/i.test(attrs) || (/(?:promo|uu-dai|khuyen-mai)/i.test(attrs) && !/(?:grid|list|wrapper|container|section|row)/i.test(attrs));
      const isCandidate = isContainerTag && (tagName === 'article' || isCandidateClass);
      const isExcluded = /(?:menu|header|footer|nav|breadcrumb|user-account|sidebar|login|search)/i.test(attrs);

      openStack.push({
        tagName,
        attrs,
        isCandidate: isCandidate && !isExcluded,
        startIndex,
        endIndex
      });
    } else {
      for (let i = openStack.length - 1; i >= 0; i--) {
        if (openStack[i].tagName === tagName) {
          const matched = openStack[i];
          openStack.splice(i, 1);
          if (matched.isCandidate) {
            const innerHtml = html.substring(matched.endIndex, startIndex);
            containers.push({
              tagName: matched.tagName,
              attrs: matched.attrs,
              startIndex: matched.startIndex,
              endIndex: startIndex,
              innerHtml
            });
          }
          break;
        }
      }
    }
  }

  // Filter out outer containers if smaller child containers exist inside their span
  const leafContainers = containers.filter(parent => {
    const hasChild = containers.some(child => 
      child !== parent &&
      child.startIndex > parent.startIndex &&
      child.endIndex < parent.endIndex
    );
    return !hasChild;
  });

  return leafContainers;
}

/**
 * Extracts DOM Atomic Offer Fragments from structured containers
 */
function extractAtomicOfferFragments(html, canonicalUrl = '') {
  if (!html || typeof html !== 'string') return [];

  const rawContainers = findContainerBlocks(html);
  const fragments = [];
  let index = 0;

  for (const c of rawContainers) {
    let cleanedInner = c.innerHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<(?:p|div|h[1-6]|li|tr|br)[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, ' ');

    const visibleLines = cleanedInner
      .split('\n')
      .map(normalizeText)
      .filter(l => l.length > 0);

    const fragmentText = visibleLines.join(' ');
    const lowerText = fragmentText.toLowerCase();

    const hasOfferKeyword = /(?:ưu đãi|khuyến mãi|combo|vé|mua 1 tặng 1|giảm|đồng giá|giá vé|học sinh|sinh viên|siêu hội)/i.test(lowerText);
    const hasPriceOrDiscount = /(?:\d+[kK]|\d+(?:\.\d{3})*[\s]*(?:đ|vnđ|vnd)|giảm\s*\d+%|đồng giá\s*\d+k?)/i.test(lowerText);

    if (hasOfferKeyword || hasPriceOrDiscount) {
      index++;
      const classMatch = c.attrs.match(/class=["']([^"']+)["']/i);
      const className = classMatch ? classMatch[1].trim() : '';
      const selector = `${c.tagName}${className ? `[class="${className}"]` : ''}:nth-of-type(${index})`;

      const linkMatch = c.innerHtml.match(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/i);
      const leafUrl = linkMatch ? linkMatch[1].trim() : null;

      const priceMatch = fragmentText.match(/(?:\d+[kK]|\d+(?:\.\d{3})*[\s]*(?:đ|vnđ|vnd)|giảm\s*\d+%|đồng giá\s*\d+k?)/i);
      const validityMatch = fragmentText.match(/(?:áp dụng|từ ngày|đến ngày|hạn sử dụng|hết hạn|thứ \d|hằng tuần|hàng tuần|\d{1,2}\/\d{1,2}(?:\/\d{4})?)[\s\S]{0,40}/i);
      const scopeMatch = fragmentText.match(/(?:đà nẵng|toàn quốc|hệ thống|chi nhánh)/i);

      const fragmentHtmlSha = computeSha256(Buffer.from(c.innerHtml, 'utf8'));
      const fragmentSemanticSha = computeSha256(Buffer.from(fragmentText, 'utf8'));

      fragments.push({
        fragment_id: `FRAGMENT_${index}`,
        container_selector: selector,
        canonical_leaf_url: leafUrl,
        raw_fragment_html_sha256: fragmentHtmlSha,
        semantic_fragment_sha256: fragmentSemanticSha,
        fragment_visible_text: fragmentText.substring(0, 300),
        extracted_fields: {
          title: visibleLines[0] || fragmentText.substring(0, 80),
          price: priceMatch ? priceMatch[0] : null,
          validity: validityMatch ? validityMatch[0].trim() : null,
          scope: scopeMatch ? scopeMatch[0] : null
        }
      });
    }
  }

  return fragments;
}

/**
 * Extracts Page-Level Unbound Signals (navigation, system text, headers)
 */
function extractPageLevelUnboundSignals(html) {
  if (!html || typeof html !== 'string') return [];

  const signals = [];

  const navRegex = /<(?:a|span|button|div|nav|li)\b[^>]*\b(?:class|id)=["'][^"']*(?:menu|nav|user|account|ticket|header|footer)[^"']*["'][^>]*>([\s\S]*?)<\/(?:a|span|button|div|nav|li)>/gi;
  let match;

  while ((match = navRegex.exec(html)) !== null) {
    const text = normalizeText(match[1].replace(/<[^>]+>/g, ' '));
    if (text.length > 2 && text.length < 60) {
      signals.push(text);
    }
  }

  return Array.from(new Set(signals)).slice(0, 20);
}

/**
 * Creates Structured Atomic Semantic Snapshot (141U)
 */
function createAtomicSemanticSnapshot(html, canonicalUrl = '') {
  let cleaned = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<div\b[^>]*(?:id|class)=["'](?:onetrust-consent-sdk|cookie-law-info-bar|fb-root|chat-widget-container)["'][^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<(?:p|div|h[1-6]|li|tr|br|hr|section|article|header|footer|main|aside)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z\b/g, ' ');

  const visibleText = cleaned
    .split('\n')
    .map(normalizeText)
    .filter(l => l.length > 0)
    .join('\n');

  const atomicFragments = extractAtomicOfferFragments(html, canonicalUrl);
  const pageLevelUnboundSignals = extractPageLevelUnboundSignals(html);

  const snapshotPayload = JSON.stringify({
    version: NORMALIZER_VERSION,
    page_text: visibleText,
    fragments: atomicFragments
  });

  const semanticSha256 = computeSha256(Buffer.from(snapshotPayload, 'utf8'));

  return {
    normalizer_version: NORMALIZER_VERSION,
    semantic_content_sha256: semanticSha256,
    visible_text_length: visibleText.length,
    visible_text_sample: visibleText.substring(0, 300),
    page_level_unbound_signals: pageLevelUnboundSignals,
    atomic_offer_fragments: atomicFragments,
    atomic_offer_fragments_count: atomicFragments.length
  };
}

/**
 * Compares Atomic DOM Semantic Snapshots (141U)
 */
function compareAtomicSnapshots141U(baseSnap, currSnap, rawBaseHtml, rawCurrHtml) {
  if (!baseSnap || !baseSnap.normalizer_version) {
    return {
      state: 'BASELINE_SEMANTIC_REQUIRED',
      reason: 'Missing baseline atomic snapshot. Baseline establishment required.'
    };
  }

  const rawBaseSha = computeSha256(Buffer.from(rawBaseHtml || '', 'utf8'));
  const rawCurrSha = computeSha256(Buffer.from(rawCurrHtml || '', 'utf8'));

  if (rawBaseSha === rawCurrSha && baseSnap.semantic_content_sha256 === currSnap.semantic_content_sha256) {
    return {
      state: 'PAGE_RENDER_VARIATION',
      sub_state: 'RAW_AND_SEMANTIC_IDENTICAL',
      reason: 'Both raw HTML and atomic semantic snapshot are 100% byte-for-byte identical.'
    };
  }

  if (baseSnap.semantic_content_sha256 === currSnap.semantic_content_sha256) {
    return {
      state: 'PAGE_RENDER_VARIATION',
      sub_state: 'RAW_JITTER_SEMANTIC_IDENTICAL',
      reason: 'Raw HTML changed due to DOM/nonce/cookie jitter, but structured atomic snapshot is 100% identical.'
    };
  }

  const baseLeafUrls = new Set((baseSnap.atomic_offer_fragments || []).map(f => f.canonical_leaf_url).filter(Boolean));
  const currLeafUrls = (currSnap.atomic_offer_fragments || []).map(f => f.canonical_leaf_url).filter(Boolean);
  const newLeafUrls = currLeafUrls.filter(u => !baseLeafUrls.has(u));

  if (newLeafUrls.length > 0) {
    return {
      state: 'NEW_OFFICIAL_OFFER_LEAF_DISCOVERED',
      reason: `Discovered ${newLeafUrls.length} new canonical offer leaf URLs inside atomic DOM containers.`,
      new_leaf_urls: newLeafUrls
    };
  }

  const baseFragmentsStr = JSON.stringify(baseSnap.atomic_offer_fragments || []);
  const currFragmentsStr = JSON.stringify(currSnap.atomic_offer_fragments || []);

  if (baseFragmentsStr !== currFragmentsStr && (baseSnap.atomic_offer_fragments.length > 0 || currSnap.atomic_offer_fragments.length > 0)) {
    return {
      state: 'ATOMIC_OFFER_FRAGMENT_CHANGED',
      reason: 'Structured DOM atomic offer fragment changed within bounded container.',
      fragment_diff: {
        prior_count: baseSnap.atomic_offer_fragments.length,
        current_count: currSnap.atomic_offer_fragments.length
      }
    };
  }

  return {
    state: 'PAGE_SEMANTIC_CHANGE_UNBOUND',
    reason: 'Page text changed outside atomic containers (e.g. copyright/footer/news copy). 0 atomic offer fragments changed.'
  };
}

module.exports = {
  NORMALIZER_VERSION,
  computeSha256,
  normalizeText,
  findContainerBlocks,
  extractAtomicOfferFragments,
  extractPageLevelUnboundSignals,
  createAtomicSemanticSnapshot,
  compareAtomicSnapshots141U
};
