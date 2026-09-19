/**
 * JAYT SEMANTIC CONTENT NORMALIZER (141S)
 * Directive: JAYT-141S — SEMANTIC DELTA RECOVERY & AUTONOMOUS VERIFIED-SUPPLY LOOP
 * 
 * Extracts deterministic, noise-free semantic text from HTML for 2-layer delta hashing.
 * 
 * Normalization Rules:
 * 1. Strips scripts, styles, noscript, svg, iframes, comments.
 * 2. Strips ephemeral attributes: data-*, csrf-*, nonce, session tokens, analytics tracking.
 * 3. Removes common floating cookie banners, chat widgets, popups, and dynamic telemetry wrappers.
 * 4. Preserves semantic text, headings, offer copy, terms, conditions, prices, dates, and links.
 * 5. Normalizes whitespace and returns deterministic SHA-256.
 */

const crypto = require('crypto');

function computeSha256(strOrBuf) {
  return crypto.createHash('sha256').update(strOrBuf).digest('hex');
}

function normalizeHtmlToSemanticText(html) {
  if (!html || typeof html !== 'string') return '';

  let cleaned = html;

  // 1. Remove scripts, styles, noscript, svg, iframes, and HTML comments
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
  cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
  cleaned = cleaned.replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, ' ');
  cleaned = cleaned.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ');
  cleaned = cleaned.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, ' ');
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, ' ');

  // 2. Remove cookie consent banners / chat widgets / tracking tags by common classes/ids
  cleaned = cleaned.replace(/<div\b[^>]*(?:cookie|consent|banner|chat-widget|popup|telemetry)[^>]*>[\s\S]*?<\/div>/gi, ' ');

  // 3. Remove all HTML tags while converting block breaks to spaces
  cleaned = cleaned.replace(/<(?:p|div|h[1-6]|li|tr|br|hr|section|article)[^>]*>/gi, '\n');
  cleaned = cleaned.replace(/<[^>]+>/g, ' ');

  // 4. Decode common HTML entities
  cleaned = cleaned
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");

  // 5. Remove ephemeral timestamps / live clocks / dynamic session hashes (e.g. 2026-08-27T01:10:40)
  cleaned = cleaned.replace(/\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?\b/g, ' ');
  cleaned = cleaned.replace(/\b(?:0[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]\b/g, ' ');

  // 6. Normalize whitespace
  const lines = cleaned
    .split('\n')
    .map(line => line.trim().replace(/\s+/g, ' '))
    .filter(line => line.length > 0);

  return lines.join('\n');
}

function getSemanticHash(html) {
  const semanticText = normalizeHtmlToSemanticText(html);
  const semanticSha = computeSha256(Buffer.from(semanticText, 'utf8'));
  return {
    semantic_text: semanticText,
    semantic_sha256: semanticSha,
    text_length: semanticText.length
  };
}

module.exports = {
  normalizeHtmlToSemanticText,
  getSemanticHash,
  computeSha256
};
