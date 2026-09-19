/**
 * JAYT STRICT SEMANTIC-ROOT LEAF DOM PARSER (142T)
 * Directive: JAYT-142T: CẤM BODY FALLBACK, KHÓA RECEIPT TRUTH VÀ SỬA THỨ TỰ PHÂN LOẠI
 * 
 * STRICT ARCHITECTURAL CONSTRAINTS:
 * 1. ABSOLUTELY ZERO document.body fallback as content_root.
 * 2. Mandatorily excludes: header, nav, footer, aside, booking widget, sidebar, modals, login/cart popups.
 * 3. Requires an authentic <article>, <main>, or dedicated promo container containing an actual article heading.
 * 4. Rejects irrelevant global headers like "Tin liên quan", "Mua vé nhanh", "Đăng nhập", "Giỏ hàng".
 * 5. Returns has_content_root: false (NON_OFFER_PAGE_OR_SHELL) with zero extracted fields when no authentic article root exists.
 */

const crypto = require('crypto');

function computeSha256(bufOrStr) {
  return crypto.createHash('sha256').update(bufOrStr).digest('hex');
}

/**
 * Browser DOM evaluation function executed inside Puppeteer
 */
function browserParseStrictSemanticRoot() {
  function getDomSelector(el) {
    if (!el) return null;
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

  // 1. Purge all global widgets, menus, modals, headers, footers, booking bars, related news blocks
  const forbiddenSelectors = [
    'header', 'nav', 'footer', 'aside',
    '[class*="booking"]', '[id*="booking"]',
    '[class*="quick-buy"]', '[class*="buy-ticket"]', '[class*="mua-ve-nhanh"]',
    '[class*="modal"]', '[class*="popup"]', '[class*="dialog"]',
    '[class*="menu"]', '[class*="navbar"]', '[class*="sidebar"]',
    '[class*="login"]', '[class*="social-login"]', '[class*="cart"]',
    '[class*="related"]', '[class*="tin-lien-quan"]', '[class*="other-news"]',
    'script', 'style', 'noscript', 'svg', 'iframe',
    '[hidden]', '[style*="display: none"]', '[style*="visibility: hidden"]'
  ];

  for (const sel of forbiddenSelectors) {
    document.querySelectorAll(sel).forEach(el => el.remove());
  }

  // 2. Identify candidate content_root: STRICTLY article, main, or dedicated promo container (NEVER body)
  const rootCandidates = Array.from(document.querySelectorAll('main, article, [class*="article-content"], [class*="post-content"], [class*="detail-content"], [class*="promo-detail"]'));
  let contentRoot = null;

  for (const el of rootCandidates) {
    // Must NOT be document.body or html
    if (el === document.body || el.tagName.toLowerCase() === 'html') continue;

    const text = normalize(el.innerText);
    const heading = el.querySelector('h1, h2, h3');
    if (heading) {
      const headingText = normalize(heading.innerText);
      // Reject generic headings
      if (/^(tin liên quan|tin mới|mua vé nhanh|đăng nhập|giỏ hàng|error|thông báo)/i.test(headingText)) {
        continue;
      }
      if (text.length >= 40) {
        contentRoot = el;
        break;
      }
    }
  }

  // ABSOLUTELY ZERO fallback to document.body!
  if (!contentRoot) {
    return {
      has_content_root: false,
      content_root_selector: null,
      content_root_tag: null,
      content_root_outer_html: null,
      page_text_length: 0,
      title_node: null,
      price_node: null,
      discount_node: null,
      weekly_schedule_node: null,
      validity_node: null,
      leaf_scope_node: null
    };
  }

  const contentRootSelector = getDomSelector(contentRoot);
  const contentRootTag = contentRoot.tagName.toLowerCase();
  const contentRootOuter = contentRoot.outerHTML;

  // 3. Extract Title strictly inside contentRoot
  const titleCandidates = Array.from(contentRoot.querySelectorAll('h1, h2, h3, [class*="title"], [class*="header"]'));
  let titleNode = null;
  for (const el of titleCandidates) {
    const text = normalize(el.innerText);
    if (text.length >= 5 && text.length <= 150 && !/^(tin liên quan|mua vé nhanh|đăng nhập|giỏ hàng|error)/i.test(text)) {
      titleNode = {
        tag: el.tagName.toLowerCase(),
        selector: getDomSelector(el),
        outer_html: el.outerHTML,
        text: text
      };
      break;
    }
  }

  // 4. Extract Price strictly inside contentRoot
  const priceCandidates = Array.from(contentRoot.querySelectorAll('[class*="price"], [class*="discount"], [class*="amount"], p, span, h3, h4, h5, strong, b'));
  let priceNode = null;

  for (const el of priceCandidates) {
    const rawText = el.innerText || '';
    if (/(?:mua|tặng|thêm)\s*1\s*(?:đ|₫|vnđ|vnd)?/i.test(rawText)) continue;

    const currMatch = rawText.match(/(?:^|\s)\d{1,3}(?:\.\d{3})+\s*(?:đ|₫|vnđ|vnd)(?:\s|$|[.,;!])/i);
    const kMatch = rawText.match(/(?:^|\s)\d{2,3}\s*[kK](?:\s|$|[.,;!])/i);
    const dgMatch = rawText.match(/(?:^|\s)đồng giá\s*\d+(?:\.\d{3})*k?(?:\s|$|[.,;!])/i);

    if (currMatch) {
      priceNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: currMatch[0].trim() };
      break;
    } else if (kMatch) {
      priceNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: kMatch[0].trim() };
      break;
    } else if (dgMatch) {
      priceNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: dgMatch[0].trim() };
      break;
    }
  }

  // 5. Extract Discount Percentage strictly inside contentRoot
  let discountNode = null;
  for (const el of priceCandidates) {
    const rawText = el.innerText || '';
    const discountMatch = rawText.match(/(?:^|\s)(?:giảm\s*|-\s*)\d{1,2}%(?:\s|$|[.,;!])/i);
    if (discountMatch) {
      discountNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: discountMatch[0].trim() };
      break;
    }
  }

  // 6. Extract Schedule strictly inside contentRoot
  let weeklyScheduleNode = null;
  const scheduleRegex = /(?:thứ \d|hàng tuần|hằng tuần|mỗi ngày|hằng ngày|khung giờ|ngày \d{1,2}(?:,\s*\d{1,2})*\s*âm lịch)/i;
  for (const el of priceCandidates) {
    const text = normalize(el.innerText);
    if (text.length >= 5 && text.length <= 150 && scheduleRegex.test(text)) {
      weeklyScheduleNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: text };
      break;
    }
  }

  // 7. Extract Validity strictly inside contentRoot
  let validityNode = null;
  const validityRegex = /(?:từ ngày|đến ngày|hạn sử dụng|hết hạn|áp dụng từ|áp dụng đến|\d{1,2}\/\d{1,2}\/\d{4})/i;
  for (const el of priceCandidates) {
    const text = normalize(el.innerText);
    if (text.length >= 10 && text.length <= 250 && validityRegex.test(text)) {
      validityNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: text };
      break;
    }
  }

  // 8. Extract Scope strictly inside contentRoot
  let leafScopeNode = null;
  const scopeRegex = /(?:đà nẵng|toàn quốc|toàn hệ thống|tất cả các rạp|tất cả nhà hàng|tất cả chi nhánh)/i;
  for (const el of priceCandidates) {
    const text = normalize(el.innerText);
    if (text.length >= 5 && text.length <= 200 && scopeRegex.test(text)) {
      leafScopeNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: text };
      break;
    }
  }

  const cleanText = normalize(contentRoot.innerText);

  return {
    has_content_root: true,
    content_root_selector: contentRootSelector,
    content_root_tag: contentRootTag,
    content_root_outer_html: contentRootOuter,
    page_text_length: cleanText.length,
    title_node: titleNode,
    price_node: priceNode,
    discount_node: discountNode,
    weekly_schedule_node: weeklyScheduleNode,
    validity_node: validityNode,
    leaf_scope_node: leafScopeNode
  };
}

/**
 * Parses leaf DOM strictly within semantic content_root
 */
async function parseStrictSemanticRootLeaf(html, leafUrl, receiptTruth, browser) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', req => req.abort());
  await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 5000 });

  const rawDom = await page.evaluate(browserParseStrictSemanticRoot);
  await page.close();

  if (!rawDom.has_content_root) {
    return {
      leaf_url: leafUrl,
      has_content_root: false,
      content_root_provenance: null,
      page_text_length: 0,
      title: null,
      title_provenance: null,
      price_claim: null,
      price_provenance: null,
      discount_percentage: null,
      discount_provenance: null,
      weekly_schedule: null,
      weekly_schedule_provenance: null,
      program_validity_span: null,
      validity_provenance: null,
      leaf_scope_stated: null,
      leaf_scope_provenance: null,
      raw_receipt_truth: receiptTruth
    };
  }

  function buildProvenance(node) {
    if (!node) return null;
    return {
      value: node.text,
      source_url_final: receiptTruth.final_url,
      capture_receipt_id: receiptTruth.receipt_id,
      dom_selector: node.selector,
      node_outer_html_sha256: computeSha256(Buffer.from(node.outer_html || '', 'utf8')),
      raw_html_sha256: receiptTruth.fresh_hashes.html_sha256,
      screenshot_sha256: receiptTruth.fresh_hashes.screenshot_sha256,
      captured_at: receiptTruth.captured_at
    };
  }

  return {
    leaf_url: leafUrl,
    has_content_root: true,
    content_root_provenance: {
      tag: rawDom.content_root_tag,
      selector: rawDom.content_root_selector,
      outer_html_sha256: computeSha256(Buffer.from(rawDom.content_root_outer_html || '', 'utf8'))
    },
    page_text_length: rawDom.page_text_length,
    title: rawDom.title_node ? rawDom.title_node.text : null,
    title_provenance: buildProvenance(rawDom.title_node),
    price_claim: rawDom.price_node ? rawDom.price_node.text : null,
    price_provenance: buildProvenance(rawDom.price_node),
    discount_percentage: rawDom.discount_node ? rawDom.discount_node.text : null,
    discount_provenance: buildProvenance(rawDom.discount_node),
    weekly_schedule: rawDom.weekly_schedule_node ? rawDom.weekly_schedule_node.text : null,
    weekly_schedule_provenance: buildProvenance(rawDom.weekly_schedule_node),
    program_validity_span: rawDom.validity_node ? rawDom.validity_node.text : null,
    validity_provenance: buildProvenance(rawDom.validity_node),
    leaf_scope_stated: rawDom.leaf_scope_node ? rawDom.leaf_scope_node.text : null,
    leaf_scope_provenance: buildProvenance(rawDom.leaf_scope_node),
    raw_receipt_truth: receiptTruth
  };
}

module.exports = {
  computeSha256,
  browserParseStrictSemanticRoot,
  parseStrictSemanticRootLeaf
};
