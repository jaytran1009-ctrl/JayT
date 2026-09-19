/**
 * JAYT-420: HOTFIX SCRIPT FOR SHORTLINK RESOLUTION & DEEP VERDICT MATRIX
 * Directive: CHAIRMAN_DIRECTIVE_20260917_HOTFIX_SHORTLINK_RESOLVER_AND_DEEP_VERDICT
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const APEX_PATH = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let code = fs.readFileSync(APEX_PATH, 'utf8');

console.log('Original apex interface size:', code.length);

// 1. Insert helper functions if not already present
if (!code.includes('function isGibberishText')) {
  const helpers = `
function isGibberishText(str) {
  if (!str || typeof str !== 'string') return true;
  const s = str.trim();
  if (s.length < 3) return true;
  if (/\\s+/.test(s)) {
    const words = s.split(/\\s+/).filter(Boolean);
    const gibberishWords = words.filter(w => /^ZS[0-9A-Za-z_-]{6,}$/i.test(w) || (/^[0-9a-zA-Z_-]{10,}$/.test(w) && !/[aeiouyàáạảãâèéẹẻẽêìíịỉĩòóọỏõôùúụủũưỳýỵỷỹ]/i.test(w)));
    if (words.length > 0 && gibberishWords.length === words.length) return true;
    return false;
  }
  if (/^ZS[0-9A-Za-z_-]{6,}$/i.test(s)) return true;
  if (/^[0-9a-zA-Z_-]{10,}$/.test(s) && !/[aeiouyAEIOUYàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/.test(s)) return true;
  return false;
}

function extractUrlAndShareText(inputVal) {
  const raw = String(inputVal || '').trim();
  if (!raw) return { url: null, shareText: '', cleanShareText: '' };
  const match = raw.match(/https?:\\/\\/[^\\s]+/i);
  if (!match) return { url: null, shareText: raw, cleanShareText: raw };
  const url = match[0];
  let shareText = raw.replace(url, '').trim();
  let cleanShare = shareText
    .replace(/\\b(xem|xem sản phẩm|mua ngay|chi tiết|tại|trên shopee|trên lazada|trên tiktok shop|giá siêu hời|chính hãng|mã giảm giá)\\b/gi, '')
    .replace(/[\\-\\|\\[\\]\\(\\):]+/g, ' ')
    .replace(/\\s+/g, ' ')
    .trim();
  return { url, shareText, cleanShareText: cleanShare };
}

function cleanProductSearchQuery(parsed) {
  if (!parsed) return 'sản phẩm chính hãng';
  if (parsed.searchQuery && !isGibberishText(parsed.searchQuery)) {
    return parsed.searchQuery.trim();
  }
  let brand = (parsed.brand && parsed.brand !== 'Chính Hãng') ? parsed.brand.trim() : '';
  let title = (parsed.cleanTitle || parsed.coreModel || parsed.title || '').trim();
  if (isGibberishText(title)) {
    title = parsed.category || 'Sản phẩm';
  }
  if (brand && title.toLowerCase().includes(brand.toLowerCase())) {
    return title;
  }
  return (brand ? (brand + ' ' + title) : title).trim();
}
`;

  // Insert before extractSmartProductMeta
  const insertIdx = code.indexOf('function extractSmartProductMeta(');
  if (insertIdx !== -1) {
    code = code.slice(0, insertIdx) + helpers + '\n' + code.slice(insertIdx);
    console.log('Helpers inserted successfully.');
  } else {
    console.error('Could not find extractSmartProductMeta insertion point!');
  }
}

// 2. Enhance extractSmartProductMeta signature and slug handling
const oldSlugRegex = /if \(cleanSlug\.length > 3\) \{\s*title = cleanSlug;\s*coreModel = cleanSlug;\s*\}/;
if (oldSlugRegex.test(code)) {
  code = code.replace(oldSlugRegex, `if (cleanSlug.length > 3) {
      if (!isGibberishText(cleanSlug)) {
        title = cleanSlug;
        coreModel = cleanSlug;
      } else if (options && options.cleanShareText && options.cleanShareText.length > 3) {
        title = options.cleanShareText;
        coreModel = options.cleanShareText;
      }
    }`);
  console.log('Updated cleanSlug handling to block gibberish.');
}

// Update function signature of extractSmartProductMeta to accept options
code = code.replace(
  'function extractSmartProductMeta(rawUrl, platform, shopId, itemId) {',
  'function extractSmartProductMeta(rawUrl, platform, shopId, itemId, options = null) {'
);

// 3. Update resolveHeadlessProductLink to extractUrlAndShareText
const oldResolveStart = `function resolveHeadlessProductLink(inputVal) {
  const startPerf = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const str = String(inputVal || '').trim();
  if (!str) return null;
  let url;
  try { url = new URL(str); } catch (_) { return null; }`;

const newResolveStart = `function resolveHeadlessProductLink(inputVal, options = null) {
  const startPerf = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const { url: extractedUrl, shareText, cleanShareText } = extractUrlAndShareText(inputVal);
  const targetUrlStr = extractedUrl || String(inputVal || '').trim();
  if (!targetUrlStr) return null;
  let url;
  try { url = new URL(targetUrlStr); } catch (_) { return null; }`;

if (code.includes(oldResolveStart)) {
  code = code.replace(oldResolveStart, newResolveStart);
  console.log('Updated resolveHeadlessProductLink input parsing.');
}

// Update the call to extractSmartProductMeta inside resolveHeadlessProductLink
code = code.replace(
  'const meta = extractSmartProductMeta(url.href, platform, shopId, itemId);',
  `const isShortlink = /vt\\.tiktok\\.com|vn\\.shp\\.ee|s\\.lazada\\.vn|s\\.shopee\\.vn/i.test(host);
  const metaOptions = Object.assign({}, options, { shareText, cleanShareText, isShortlink });
  const meta = extractSmartProductMeta(url.href, platform, shopId, itemId, metaOptions);`
);

// Update return object of resolveHeadlessProductLink
const oldReturnObj = `  return {
    platform,
    platformName,
    shopId,
    itemId,
    title: meta.title,
    brand: meta.brand,
    coreModel: meta.coreModel || meta.title,
    category: meta.category,
    categoryCode: meta.categoryCode,
    rawUrl: url.href,
    host,
    badge,
    badgeLabel,
    badgeColor,
    resolvedLocally: true,
    resolvedInMs: Math.min(800, latency),
    status: 'RESOLVED'
  };`;

const newReturnObj = `  const finalCleanTitle = meta.cleanTitle || (meta.title && !isGibberishText(meta.title) ? meta.title : (cleanShareText || (isShortlink ? 'Sản phẩm liên kết' : 'Sản phẩm hot')));
  const finalBrand = meta.brand || (cleanShareText && /atys/i.test(cleanShareText) ? 'ATYS' : 'Chính Hãng');
  return {
    platform,
    platformName,
    shopId,
    itemId,
    title: finalCleanTitle,
    cleanTitle: finalCleanTitle,
    brand: finalBrand,
    coreModel: finalCleanTitle,
    category: meta.category,
    categoryCode: meta.categoryCode,
    rawUrl: url.href,
    host,
    badge,
    badgeLabel,
    badgeColor,
    isShortlink,
    shareText,
    isGibberishBlocked: Boolean(meta.isGibberishBlocked || isGibberishText(meta.title)),
    searchQuery: cleanProductSearchQuery({ brand: finalBrand, title: finalCleanTitle, cleanTitle: finalCleanTitle, category: meta.category }),
    resolvedLocally: true,
    resolvedInMs: Math.min(800, latency),
    status: 'RESOLVED'
  };`;

if (code.includes(oldReturnObj)) {
  code = code.replace(oldReturnObj, newReturnObj);
  console.log('Updated resolveHeadlessProductLink return object.');
}

fs.writeFileSync(APEX_PATH, code, 'utf8');
console.log('Phase 1 applied. New size:', fs.readFileSync(APEX_PATH, 'utf8').length);
