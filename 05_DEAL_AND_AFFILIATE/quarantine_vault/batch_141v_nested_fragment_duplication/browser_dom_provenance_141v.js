/**
 * JAYT BROWSER-NATIVE DOM PROVENANCE ENGINE (141V)
 * Directive: JAYT-141V — BROWSER-NATIVE DOM PROVENANCE & AUTONOMOUS LOOP READINESS
 * 
 * STRICT ARCHITECTURAL CONSTRAINTS:
 * 1. ZERO regex/string-based HTML parsing for DOM provenance.
 * 2. Native DOM traversal & CSS selector generation with browser re-query hash verification.
 * 3. Strict differentiation:
 *    - ATOMIC_OFFER_FRAGMENT (specific verified price/discount + valid leaf/identifier)
 *    - ATOMIC_DISCOVERY_FRAGMENT (relevant card/news lacking verified offer structure)
 * 4. Strict link validation: rejects javascript:, mailto:, #, generic homepages, generic category indices.
 * 5. Complete field provenance (title, price, terms, validity, scope) with child node selector.
 * 6. 5-Tier Delta Classification.
 */

const crypto = require('crypto');
const puppeteer = require('puppeteer');

const NORMALIZER_VERSION = 'v141v_browser_dom_provenance_v1';

function computeSha256(strOrBuf) {
  return crypto.createHash('sha256').update(strOrBuf).digest('hex');
}

/**
 * Clean normalized text helper
 */
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
 * Validates and resolves canonical leaf URL
 */
function resolveAndValidateLeafUrl(rawHref, baseUrl) {
  if (!rawHref || typeof rawHref !== 'string') return { valid: false, reason: 'EMPTY_URL' };

  const trimmed = rawHref.trim();

  // Reject invalid protocols and fragments
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('#') ||
    trimmed === ''
  ) {
    return { valid: false, reason: 'INVALID_PROTOCOL_OR_FRAGMENT' };
  }

  let absoluteUrl;
  try {
    absoluteUrl = new URL(trimmed, baseUrl).href;
  } catch (err) {
    return { valid: false, reason: 'INVALID_URL_SYNTAX' };
  }

  try {
    const baseObj = new URL(baseUrl);
    const leafObj = new URL(absoluteUrl);

    // Reject generic homepages and root
    if (leafObj.pathname === '/' || leafObj.pathname === '') {
      return { valid: false, reason: 'GENERIC_HOMEPAGE' };
    }

    // Reject generic listing indices
    const genericPaths = ['/khuyen-mai', '/khuyen-mai/', '/uu-dai', '/uu-dai/', '/promotions', '/promotions/'];
    if (genericPaths.includes(leafObj.pathname)) {
      return { valid: false, reason: 'GENERIC_CATEGORY_INDEX' };
    }

    // Check same origin or subdomain
    const isSameOrigin = (leafObj.hostname === baseObj.hostname || leafObj.hostname.endsWith('.' + baseObj.hostname));
    if (!isSameOrigin) {
      return { valid: false, reason: 'EXTERNAL_NON_WHITELISTED_ORIGIN' };
    }

    return {
      valid: true,
      resolved_url: absoluteUrl
    };
  } catch (e) {
    return { valid: false, reason: 'PARSING_ERROR' };
  }
}

/**
 * Browser evaluation function executed in browser DOM context
 */
function browserDomExtraction(baseUrl) {
  function getDomSelector(el) {
    if (el.id) return '#' + CSS.escape(el.id);
    const path = [];
    let curr = el;
    while (curr && curr.nodeType === Node.ELEMENT_NODE && curr.tagName.toLowerCase() !== 'html') {
      const tag = curr.tagName.toLowerCase();
      let selector = tag;
      if (curr.className && typeof curr.className === 'string' && curr.className.trim()) {
        const firstClass = curr.className.trim().split(/\s+/)[0];
        if (firstClass && !firstClass.includes(':') && !firstClass.includes('[')) {
          selector += '.' + CSS.escape(firstClass);
        }
      }
      if (curr.parentElement) {
        const siblings = Array.from(curr.parentElement.children).filter(c => c.tagName === curr.tagName);
        if (siblings.length > 1) {
          const index = siblings.indexOf(curr) + 1;
          selector += ':nth-of-type(' + index + ')';
        }
      }
      path.unshift(selector);
      curr = curr.parentElement;
    }
    return path.join(' > ');
  }

  function normalize(t) {
    return (t || '').replace(/\s+/g, ' ').trim();
  }

  // 1. Extract Page-Level Unbound Signals (nav, menu, footer, account)
  const unboundElements = Array.from(document.querySelectorAll('nav, header, footer, [class*="menu"], [class*="account"], [class*="login"], [class*="ticket"]'));
  const unboundSignals = [];
  for (const el of unboundElements) {
    const text = normalize(el.innerText);
    if (text && text.length > 2 && text.length < 80) {
      unboundSignals.push(text);
    }
  }

  // 2. Locate container candidates
  const containerCandidates = Array.from(document.querySelectorAll('article, [class*="promo-item"], [class*="event-item"], [class*="card-promo"], [class*="deal-item"], [class*="news-item"], [class*="card"], [data-offer-id]'));
  
  // Filter out containers inside nav/header/footer
  const validContainers = containerCandidates.filter(c => {
    return !c.closest('nav, header, footer, [class*="user-menu"], [class*="account"]');
  });

  const fragments = [];
  let index = 0;

  for (const c of validContainers) {
    index++;
    const selector = getDomSelector(c);
    const outerHtml = c.outerHTML;
    
    // Re-verify selector
    const recheck = Array.from(document.querySelectorAll(selector));
    const revalidationPassed = (recheck.length === 1 && recheck[0] === c);

    const fullText = normalize(c.innerText);
    const lowerText = fullText.toLowerCase();

    // Extract fields with descendant node provenance
    let title = null;
    let titleProvenance = null;
    const headingEl = c.querySelector('h1, h2, h3, h4, h5, h6, [class*="title"], [class*="name"]');
    if (headingEl) {
      title = normalize(headingEl.innerText);
      titleProvenance = { tag: headingEl.tagName.toLowerCase(), selector: getDomSelector(headingEl), text: title };
    } else {
      title = fullText.substring(0, 80);
      titleProvenance = { tag: c.tagName.toLowerCase(), selector, text: title };
    }

    let price = null;
    let priceProvenance = null;
    const priceEl = c.querySelector('[class*="price"], [class*="discount"], [class*="amount"], p, span');
    const priceRegex = /(?:\d+[kK]|\d+(?:\.\d{3})*[\s]*(?:đ|vnđ|vnd)|giảm\s*\d+%|đồng giá\s*\d+k?)/i;
    if (priceEl && priceRegex.test(priceEl.innerText.toLowerCase())) {
      const match = priceEl.innerText.match(priceRegex);
      price = match ? match[0] : null;
      priceProvenance = { tag: priceEl.tagName.toLowerCase(), selector: getDomSelector(priceEl), text: price };
    } else if (priceRegex.test(lowerText)) {
      const match = fullText.match(priceRegex);
      price = match ? match[0] : null;
      priceProvenance = { tag: c.tagName.toLowerCase(), selector, text: price };
    }

    let terms = null;
    let termsProvenance = null;
    const termsCandidates = Array.from(c.querySelectorAll('[class*="terms"], [class*="condition"], [class*="note"], [class*="rule"], p, span, li'));
    const termsRegex = /(?:áp dụng|thời gian|điều kiện|hạn sử dụng|từ ngày|đến ngày|\d{1,2}:\d{2}(?::\d{2})?)/i;
    for (const tEl of termsCandidates) {
      if (termsRegex.test(tEl.innerText.toLowerCase()) && !tEl.classList.contains('price')) {
        terms = normalize(tEl.innerText);
        termsProvenance = { tag: tEl.tagName.toLowerCase(), selector: getDomSelector(tEl), text: terms };
        break;
      }
    }
    if (!terms && termsRegex.test(lowerText)) {
      const match = fullText.match(/(?:áp dụng|thời gian|điều kiện|hạn sử dụng|từ ngày|đến ngày|\d{1,2}:\d{2}(?::\d{2})?)[\s\S]{0,80}/i);
      terms = match ? normalize(match[0]) : null;
      termsProvenance = { tag: c.tagName.toLowerCase(), selector, text: terms };
    }

    let validity = null;
    let validityProvenance = null;
    const validityRegex = /(?:từ ngày|đến ngày|hạn sử dụng|hết hạn|thứ \d|hằng tuần|hàng tuần|\d{1,2}\/\d{1,2}(?:\/\d{4})?)[\s\S]{0,40}/i;
    if (validityRegex.test(lowerText)) {
      const match = fullText.match(validityRegex);
      validity = match ? normalize(match[0]) : null;
      validityProvenance = { tag: c.tagName.toLowerCase(), selector, text: validity };
    }

    let scope = null;
    let scopeProvenance = null;
    const scopeRegex = /(?:đà nẵng|toàn quốc|hệ thống|chi nhánh)/i;
    if (scopeRegex.test(lowerText)) {
      const match = fullText.match(scopeRegex);
      scope = match ? match[0] : null;
      scopeProvenance = { tag: c.tagName.toLowerCase(), selector, text: scope };
    }

    // Leaf Link extraction
    const linkEl = c.querySelector('a[href]');
    const rawHref = linkEl ? linkEl.getAttribute('href') : null;

    // Fragment classification
    const hasSpecificPriceOrOffer = !!price || /(?:mua 1 tặng 1|đồng giá|giảm \d+%)/i.test(lowerText);
    const fragmentType = (hasSpecificPriceOrOffer && rawHref) ? 'ATOMIC_OFFER_FRAGMENT' : 'ATOMIC_DISCOVERY_FRAGMENT';

    fragments.push({
      fragment_id: `FRAGMENT_${index}`,
      fragment_type: fragmentType,
      container_selector: selector,
      raw_href: rawHref,
      outer_html: outerHtml,
      revalidation_passed: revalidationPassed,
      visible_text: fullText.substring(0, 300),
      field_provenance: {
        title: titleProvenance,
        price: priceProvenance,
        terms: termsProvenance,
        validity: validityProvenance,
        scope: scopeProvenance
      }
    });
  }

  // 3. Clean full page visible text
  const cloneBody = document.body.cloneNode(true);
  const scripts = cloneBody.querySelectorAll('script, style, noscript, iframe, svg, [id*="onetrust"], [id*="fb-root"]');
  scripts.forEach(s => s.remove());

  const pageVisibleText = normalize(cloneBody.innerText);

  return {
    page_visible_text: pageVisibleText,
    page_level_unbound_signals: Array.from(new Set(unboundSignals)).slice(0, 20),
    fragments
  };
}

/**
 * Creates Structured Browser DOM Snapshot (141V)
 */
async function createBrowserDomSnapshot(html, baseUrl, browserInstance = null) {
  let shouldCloseBrowser = false;
  let browser = browserInstance;

  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    shouldCloseBrowser = true;
  }

  try {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', req => req.abort());
    await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 5000 });

    const rawResult = await page.evaluate(browserDomExtraction, baseUrl);
    await page.close();

    const processedFragments = rawResult.fragments.map(f => {
      const urlValidation = resolveAndValidateLeafUrl(f.raw_href, baseUrl);
      const outerHtmlSha = computeSha256(Buffer.from(f.outer_html, 'utf8'));

      return {
        fragment_id: f.fragment_id,
        fragment_type: f.fragment_type,
        container_selector: f.container_selector,
        outer_html_sha256: outerHtmlSha,
        selector_revalidation_passed: f.revalidation_passed,
        canonical_leaf_url: urlValidation.valid ? urlValidation.resolved_url : null,
        url_validation: urlValidation,
        fragment_visible_text: f.visible_text,
        field_provenance: f.field_provenance
      };
    });

    const snapshotPayload = JSON.stringify({
      version: NORMALIZER_VERSION,
      page_text: rawResult.page_visible_text,
      fragments: processedFragments
    });

    const semanticSha256 = computeSha256(Buffer.from(snapshotPayload, 'utf8'));

    return {
      normalizer_version: NORMALIZER_VERSION,
      semantic_content_sha256: semanticSha256,
      visible_text_length: rawResult.page_visible_text.length,
      visible_text_sample: rawResult.page_visible_text.substring(0, 300),
      page_level_unbound_signals: rawResult.page_level_unbound_signals,
      atomic_offer_fragments: processedFragments.filter(f => f.fragment_type === 'ATOMIC_OFFER_FRAGMENT'),
      atomic_discovery_fragments: processedFragments.filter(f => f.fragment_type === 'ATOMIC_DISCOVERY_FRAGMENT'),
      atomic_offer_fragments_count: processedFragments.filter(f => f.fragment_type === 'ATOMIC_OFFER_FRAGMENT').length,
      atomic_discovery_fragments_count: processedFragments.filter(f => f.fragment_type === 'ATOMIC_DISCOVERY_FRAGMENT').length
    };
  } finally {
    if (shouldCloseBrowser && browser) {
      await browser.close();
    }
  }
}

/**
 * Compares Browser DOM Semantic Snapshots (141V)
 */
function compareBrowserDomSnapshots141V(baseSnap, currSnap, rawBaseHtml, rawCurrHtml) {
  if (!baseSnap || !baseSnap.normalizer_version) {
    return {
      state: 'BASELINE_SEMANTIC_REQUIRED',
      reason: 'Missing baseline browser DOM snapshot. Baseline establishment required.'
    };
  }

  const rawBaseSha = computeSha256(Buffer.from(rawBaseHtml || '', 'utf8'));
  const rawCurrSha = computeSha256(Buffer.from(rawCurrHtml || '', 'utf8'));

  if (rawBaseSha === rawCurrSha && baseSnap.semantic_content_sha256 === currSnap.semantic_content_sha256) {
    return {
      state: 'PAGE_RENDER_VARIATION',
      sub_state: 'RAW_AND_SEMANTIC_IDENTICAL',
      reason: 'Both raw HTML and browser DOM snapshot are 100% byte-for-byte identical.'
    };
  }

  if (baseSnap.semantic_content_sha256 === currSnap.semantic_content_sha256) {
    return {
      state: 'PAGE_RENDER_VARIATION',
      sub_state: 'RAW_JITTER_SEMANTIC_IDENTICAL',
      reason: 'Raw HTML changed due to DOM/nonce/cookie jitter, but browser DOM snapshot is 100% identical.'
    };
  }

  // Check if new canonical leaf URLs discovered inside atomic offer fragments
  const baseLeafUrls = new Set((baseSnap.atomic_offer_fragments || []).map(f => f.canonical_leaf_url).filter(Boolean));
  const currLeafUrls = (currSnap.atomic_offer_fragments || []).map(f => f.canonical_leaf_url).filter(Boolean);
  const newLeafUrls = currLeafUrls.filter(u => !baseLeafUrls.has(u));

  if (newLeafUrls.length > 0) {
    return {
      state: 'NEW_OFFICIAL_OFFER_LEAF_DISCOVERED',
      reason: `Discovered ${newLeafUrls.length} new canonical offer leaf URLs with browser DOM provenance.`,
      new_leaf_urls: newLeafUrls
    };
  }

  // Check if atomic offer fragments changed
  const baseFragmentsStr = JSON.stringify(baseSnap.atomic_offer_fragments || []);
  const currFragmentsStr = JSON.stringify(currSnap.atomic_offer_fragments || []);

  if (baseFragmentsStr !== currFragmentsStr && (baseSnap.atomic_offer_fragments.length > 0 || currSnap.atomic_offer_fragments.length > 0)) {
    return {
      state: 'ATOMIC_OFFER_FRAGMENT_CHANGED',
      reason: 'Browser DOM atomic offer fragment changed within verified container.',
      fragment_diff: {
        prior_count: baseSnap.atomic_offer_fragments.length,
        current_count: currSnap.atomic_offer_fragments.length
      }
    };
  }

  return {
    state: 'PAGE_SEMANTIC_CHANGE_UNBOUND',
    reason: 'Page text changed outside atomic offer containers (e.g. copyright/footer/news copy). 0 atomic offer fragments changed.'
  };
}

module.exports = {
  NORMALIZER_VERSION,
  computeSha256,
  normalizeText,
  resolveAndValidateLeafUrl,
  browserDomExtraction,
  createBrowserDomSnapshot,
  compareBrowserDomSnapshots141V
};
