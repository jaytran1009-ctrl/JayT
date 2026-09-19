/**
 * JAYT BOUNDED SEMANTIC NORMALIZER & SNAPSHOT ENGINE (141T)
 * Directive: JAYT-141T — SEMANTIC INTEGRITY REPAIR BEFORE AUTONOMOUS ACTIVATION
 * 
 * ARCHITECTURAL SPECIFICATIONS:
 * 1. Safe-Bounded DOM Normalization:
 *    - Never deletes <div> tags matching 'banner', 'popup', or general classes.
 *    - Preserves all promotional banners, hero cards, and offer sections.
 *    - Strictly preserves operational hours (e.g. 11:00:00), dates, prices, discounts, payment terms, and scope.
 *    - Targeted stripping only for unambiguous telemetry/scripts/trackers: script, style, noscript, svg, iframe, onetrust, fb-root.
 * 2. Structured Semantic Snapshot:
 *    - visible_text (normalized text with hours & prices intact)
 *    - canonical_offer_links[] (extracted valid offer URLs)
 *    - offer_blocks[] (detected structured offer entities with title, price, terms, validity, scope)
 *    - semantic_content_sha256
 *    - normalizer_version: 'v141t_bounded_dom_v1'
 * 3. True Semantic Delta Evaluator:
 *    - Compares structured snapshots (not naive keywords).
 *    - Distinguishes UNCHANGED_IDENTICAL, UNCHANGED_RENDER_VARIATION, SEMANTIC_CHANGED_REVIEW_REQUIRED, OFFER_RELEVANT_DELTA, BASELINE_SEMANTIC_REQUIRED.
 */

const crypto = require('crypto');

const NORMALIZER_VERSION = 'v141t_bounded_dom_v1';

function computeSha256(strOrBuf) {
  return crypto.createHash('sha256').update(strOrBuf).digest('hex');
}

/**
 * Extracts clean visible text while preserving operational hours, dates, prices, and banners
 */
function normalizeHtmlBounded(html) {
  if (!html || typeof html !== 'string') return '';

  let cleaned = html;

  // 1. Remove non-content tags & HTML comments (scripts, styles, noscript, svg, iframes)
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
  cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
  cleaned = cleaned.replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, ' ');
  cleaned = cleaned.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ');
  cleaned = cleaned.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, ' ');
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, ' ');

  // 2. Targeted removal only for unambiguous external tracker SDK overlays
  cleaned = cleaned.replace(/<div\b[^>]*(?:id|class)=["'](?:onetrust-consent-sdk|cookie-law-info-bar|fb-root|chat-widget-container|livechat-widget)["'][^>]*>[\s\S]*?<\/div>/gi, ' ');

  // 3. Convert block elements to newlines
  cleaned = cleaned.replace(/<(?:p|div|h[1-6]|li|tr|br|hr|section|article|header|footer|main|aside)[^>]*>/gi, '\n');
  cleaned = cleaned.replace(/<[^>]+>/g, ' ');

  // 4. Decode common HTML entities
  cleaned = cleaned
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");

  // 5. Remove ONLY ephemeral ISO UTC timestamps (e.g. 2026-08-27T01:15:04.123Z)
  // CRITICAL: DO NOT remove operational hours like 11:00:00 or 14:00:00!
  cleaned = cleaned.replace(/\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z\b/g, ' ');

  // 6. Normalize whitespace
  const lines = cleaned
    .split('\n')
    .map(line => line.trim().replace(/[ \t]+/g, ' '))
    .filter(line => line.length > 0);

  return lines.join('\n');
}

/**
 * Extracts canonical offer links from HTML
 */
function extractCanonicalOfferLinks(html, baseUrl = '') {
  if (!html || typeof html !== 'string') return [];

  const links = new Set();
  const linkRegex = /<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1].trim();
    if (
      href.includes('/khuyen-mai/') ||
      href.includes('/uu-dai') ||
      href.includes('/promotions') ||
      href.includes('/tin-tuc-uu-dai') ||
      href.includes('/news-offer') ||
      href.includes('/bieu-gia') ||
      href.includes('/student') ||
      href.includes('/pack')
    ) {
      if (!href.startsWith('javascript:') && !href.startsWith('#') && !href.startsWith('mailto:')) {
        links.add(href);
      }
    }
  }

  return Array.from(links).sort();
}

/**
 * Extracts structured offer blocks from visible text
 */
function extractStructuredOfferBlocks(visibleText) {
  if (!visibleText || typeof visibleText !== 'string') return [];

  const blocks = [];
  const lines = visibleText.split('\n');

  let currentBlock = null;

  for (const line of lines) {
    const isHeaderOrTitle = /^(?:ƯU ĐÃI|KHUYẾN MÃI|COMBO|MUA 1 TẶNG 1|ĐỒNG GIÁ|VÉ|GIẢM|GIẢM GIÁ|SIÊU HỘI|HAPPY DAY|THỨ \d)/i.test(line);
    const hasPriceOrDiscount = /\b(?:\d+[kK]|\d+(?:\.\d{3})*[\s]*(?:đ|vnđ|vnd)|giảm\s*\d+%|đồng giá\s*\d+k?)\b/i.test(line);
    const hasValidity = /\b(?:áp dụng|từ ngày|đến ngày|hạn sử dụng|hết hạn|thứ \d|hằng tuần|hàng tuần|\d{1,2}\/\d{1,2}(?:\/\d{4})?)\b/i.test(line);

    if (isHeaderOrTitle || (hasPriceOrDiscount && line.length < 120)) {
      if (currentBlock && (currentBlock.price || currentBlock.validity)) {
        blocks.push(currentBlock);
      }
      currentBlock = {
        title: line,
        price: null,
        terms: null,
        validity: null,
        scope: null
      };
    }

    if (currentBlock) {
      if (hasPriceOrDiscount && !currentBlock.price) {
        currentBlock.price = line;
      }
      if (hasValidity && !currentBlock.validity) {
        currentBlock.validity = line;
      }
      if (/đà nẵng|toàn quốc|hệ thống/i.test(line) && !currentBlock.scope) {
        currentBlock.scope = line;
      }
    }
  }

  if (currentBlock && (currentBlock.price || currentBlock.validity)) {
    blocks.push(currentBlock);
  }

  return blocks;
}

/**
 * Builds full structured Semantic Snapshot
 */
function createSemanticSnapshot(html, options = {}) {
  const visibleText = normalizeHtmlBounded(html);
  const offerLinks = extractCanonicalOfferLinks(html, options.baseUrl);
  const offerBlocks = extractStructuredOfferBlocks(visibleText);

  // Deterministic snapshot payload string for hashing
  const snapshotPayload = JSON.stringify({
    version: NORMALIZER_VERSION,
    text: visibleText,
    links: offerLinks,
    blocks: offerBlocks
  });

  const semanticSha256 = computeSha256(Buffer.from(snapshotPayload, 'utf8'));

  return {
    normalizer_version: NORMALIZER_VERSION,
    semantic_content_sha256: semanticSha256,
    visible_text_length: visibleText.length,
    visible_text_sample: visibleText.substring(0, 300),
    visible_text: visibleText,
    canonical_offer_links: offerLinks,
    offer_blocks: offerBlocks
  };
}

/**
 * True Semantic Snapshot Diffing Engine
 */
function compareSemanticSnapshots141T(baselineSnapshot, currentSnapshot, rawBaseHtml, rawCurrentHtml) {
  if (!baselineSnapshot || !baselineSnapshot.visible_text) {
    return {
      state: 'BASELINE_SEMANTIC_REQUIRED',
      reason: 'Missing baseline semantic snapshot. Baseline establishment required.'
    };
  }

  const rawBaseSha = computeSha256(Buffer.from(rawBaseHtml || '', 'utf8'));
  const rawCurrentSha = computeSha256(Buffer.from(rawCurrentHtml || '', 'utf8'));

  if (rawBaseSha === rawCurrentSha && baselineSnapshot.semantic_content_sha256 === currentSnapshot.semantic_content_sha256) {
    return {
      state: 'UNCHANGED_IDENTICAL',
      reason: 'Both raw HTML and semantic snapshot are 100% byte-for-byte identical.'
    };
  }

  if (baselineSnapshot.semantic_content_sha256 === currentSnapshot.semantic_content_sha256) {
    return {
      state: 'UNCHANGED_RENDER_VARIATION',
      reason: 'Raw HTML changed due to DOM/nonce/cookie jitter, but structured semantic snapshot is 100% identical.'
    };
  }

  // Check for genuine offer delta:
  // 1. New canonical offer links added
  const baseLinks = new Set(baselineSnapshot.canonical_offer_links || []);
  const currentLinks = currentSnapshot.canonical_offer_links || [];
  const newLinks = currentLinks.filter(l => !baseLinks.has(l));

  // 2. Offer blocks changed (title, price, validity, scope)
  const baseBlocksStr = JSON.stringify(baselineSnapshot.offer_blocks || []);
  const currentBlocksStr = JSON.stringify(currentSnapshot.offer_blocks || []);
  const blocksChanged = baseBlocksStr !== currentBlocksStr;

  if (newLinks.length > 0 || (blocksChanged && (currentSnapshot.offer_blocks.length > 0 || baselineSnapshot.offer_blocks.length > 0))) {
    return {
      state: 'OFFER_RELEVANT_DELTA',
      reason: `Genuine offer changes detected: ${newLinks.length} new links, blocks_changed=${blocksChanged}.`,
      diff: {
        new_links: newLinks,
        prior_blocks_count: (baselineSnapshot.offer_blocks || []).length,
        current_blocks_count: (currentSnapshot.offer_blocks || []).length
      }
    };
  }

  // General text changed without offer delta
  return {
    state: 'SEMANTIC_CHANGED_REVIEW_REQUIRED',
    reason: 'General page text changed (e.g. footer/policy/news copy), but no new offer links or offer block variance detected.'
  };
}

module.exports = {
  NORMALIZER_VERSION,
  computeSha256,
  normalizeHtmlBounded,
  extractCanonicalOfferLinks,
  extractStructuredOfferBlocks,
  createSemanticSnapshot,
  compareSemanticSnapshots141T
};
