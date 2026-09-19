/**
 * JAYT GENERIC LEAF DOM PARSER (142R)
 * Directive: JAYT-142R: THU HỒI KẾT LUẬN 142, KHÔI PHỤC BẰNG CHỨNG GỐC VÀ TÁI XỬ LÝ BATCH LỚN
 * 
 * STRICT ARCHITECTURAL CONSTRAINTS:
 * 1. ZERO brand-specific hardcoding, zero static mappings, zero leaf_id dictionaries.
 * 2. Parses raw HTML in real Puppeteer browser DOM context.
 * 3. Extracts fields directly from descendant DOM nodes with full provenance.
 * 4. Strictly sets price: null when no explicit numeric currency node exists (rejects "1 đ" from "mua 1 tặng 1").
 * 5. Strictly preserves complete validity spans without string truncation.
 * 6. Every proven field attaches: value, source_url_final, capture_receipt_id, dom_selector, node_outer_html_sha256, raw_html_sha256, screenshot_sha256, captured_at.
 */

const crypto = require('crypto');

function computeSha256(bufOrStr) {
  return crypto.createHash('sha256').update(bufOrStr).digest('hex');
}

/**
 * Browser DOM evaluation function executed inside Puppeteer
 */
function browserParseLeafDom() {
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

  // 1. Extract Title Node
  const titleCandidates = Array.from(document.querySelectorAll('h1, h2, [class*="title"], [class*="header"]'));
  let titleNode = null;
  for (const el of titleCandidates) {
    if (el.closest('nav, header, footer, [class*="menu"], [class*="sidebar"]')) continue;
    const text = normalize(el.innerText);
    if (text.length >= 5 && text.length <= 150) {
      titleNode = {
        element: el,
        tag: el.tagName.toLowerCase(),
        selector: getDomSelector(el),
        outer_html: el.outerHTML,
        text: text
      };
      break;
    }
  }

  if (!titleNode) {
    const docTitle = document.title ? normalize(document.title) : null;
    if (docTitle && docTitle.length >= 3) {
      titleNode = {
        element: null,
        tag: 'title',
        selector: 'html > head > title',
        outer_html: `<title>${docTitle}</title>`,
        text: docTitle
      };
    }
  }

  // 2. Extract Price Node (Dedicated currency node)
  const priceCandidates = Array.from(document.querySelectorAll('[class*="price"], [class*="discount"], [class*="amount"], p, span, h3, h4, h5, strong, b'));
  let priceNode = null;
  let priceFlags = [];

  for (const el of priceCandidates) {
    if (el.closest('nav, header, footer, [class*="menu"], [class*="sidebar"]')) continue;
    const rawText = el.innerText || '';
    if (/(?:mua|tặng|thêm)\s*1\s*(?:đ|₫|vnđ|vnd)?/i.test(rawText)) {
      priceFlags.push('AMBIGUOUS_NUMERIC_TOKEN_REJECTED');
      continue;
    }

    // Exact complete currency pattern (e.g. 45.000đ, 120.000 VND)
    const currMatch = rawText.match(/(?:^|\s)\d{1,3}(?:\.\d{3})+\s*(?:đ|₫|vnđ|vnd)(?:\s|$|[.,;!])/i);
    // Exact k pattern (e.g. 45k, 99k, 39k)
    const kMatch = rawText.match(/(?:^|\s)\d{2,3}\s*[kK](?:\s|$|[.,;!])/i);
    // Đồng giá pattern (e.g. đồng giá 39k, đồng giá 45.000đ)
    const dgMatch = rawText.match(/(?:^|\s)đồng giá\s*\d+(?:\.\d{3})*k?(?:\s|$|[.,;!])/i);
    // Free / 0đ
    const freeMatch = rawText.match(/(?:^|\s)(?:miễn phí|0đ|0\s*vnd)(?:\s|$|[.,;!])/i);

    if (currMatch) {
      priceNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: currMatch[0].trim() };
      break;
    } else if (kMatch) {
      priceNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: kMatch[0].trim() };
      break;
    } else if (dgMatch) {
      priceNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: dgMatch[0].trim() };
      break;
    } else if (freeMatch) {
      priceNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: freeMatch[0].trim() };
      break;
    }
  }

  // 3. Extract Discount Percentage Node
  let discountNode = null;
  for (const el of priceCandidates) {
    if (el.closest('nav, header, footer, [class*="menu"], [class*="sidebar"]')) continue;
    const rawText = el.innerText || '';
    const discountMatch = rawText.match(/(?:^|\s)(?:giảm\s*|-\s*)\d{1,2}%(?:\s|$|[.,;!])/i);
    if (discountMatch) {
      discountNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: discountMatch[0].trim() };
      break;
    }
  }

  // 4. Extract Weekly / Recurring Schedule Node
  let weeklyScheduleNode = null;
  const scheduleRegex = /(?:thứ \d|hàng tuần|hằng tuần|mỗi ngày|hằng ngày|khung giờ|ngày \d{1,2}(?:,\s*\d{1,2})*\s*âm lịch)/i;
  for (const el of priceCandidates) {
    if (el.closest('nav, header, footer, [class*="menu"], [class*="sidebar"]')) continue;
    const text = normalize(el.innerText);
    if (text.length >= 5 && text.length <= 150 && scheduleRegex.test(text)) {
      weeklyScheduleNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: text };
      break;
    }
  }

  // 5. Extract Program Validity Span Node
  let validityNode = null;
  const validityRegex = /(?:từ ngày|đến ngày|hạn sử dụng|hết hạn|áp dụng từ|áp dụng đến|\d{1,2}\/\d{1,2}\/\d{4})/i;
  for (const el of priceCandidates) {
    if (el.closest('nav, header, footer, [class*="menu"], [class*="sidebar"]')) continue;
    const text = normalize(el.innerText);
    if (text.length >= 10 && text.length <= 250 && validityRegex.test(text)) {
      validityNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: text };
      break;
    }
  }

  // 6. Extract Direct Scope Stated in Leaf
  let leafScopeNode = null;
  const scopeRegex = /(?:đà nẵng|toàn quốc|toàn hệ thống|tất cả các rạp|tất cả nhà hàng|tất cả chi nhánh)/i;
  for (const el of priceCandidates) {
    if (el.closest('nav, header, footer, [class*="menu"], [class*="sidebar"]')) continue;
    const text = normalize(el.innerText);
    if (text.length >= 5 && text.length <= 200 && scopeRegex.test(text)) {
      leafScopeNode = { tag: el.tagName.toLowerCase(), selector: getDomSelector(el), outer_html: el.outerHTML, text: text };
      break;
    }
  }

  // Clean full page visible text length
  const clone = document.body.cloneNode(true);
  const scripts = clone.querySelectorAll('script, style, noscript, iframe, svg');
  scripts.forEach(s => s.remove());
  const cleanText = normalize(clone.innerText);

  return {
    page_text_length: cleanText.length,
    page_text_sample: cleanText.substring(0, 300),
    title_node: titleNode,
    price_node: priceNode,
    discount_node: discountNode,
    weekly_schedule_node: weeklyScheduleNode,
    validity_node: validityNode,
    leaf_scope_node: leafScopeNode,
    price_flags: priceFlags
  };
}

/**
 * Generic DOM parser for a single leaf
 */
async function parseLeafDomNative(html, leafUrl, receipt, browser) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', req => req.abort());
  await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 5000 });

  const rawDom = await page.evaluate(browserParseLeafDom);
  await page.close();

  function buildProvenance(node) {
    if (!node) return null;
    return {
      value: node.text,
      source_url_final: leafUrl,
      capture_receipt_id: receipt.receipt_id,
      dom_selector: node.selector,
      node_outer_html_sha256: computeSha256(Buffer.from(node.outer_html || '', 'utf8')),
      raw_html_sha256: receipt.hashes.html_sha256,
      screenshot_sha256: receipt.hashes.screenshot_sha256,
      captured_at: receipt.captured_at
    };
  }

  return {
    leaf_url: leafUrl,
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
    price_flags: rawDom.price_flags
  };
}

module.exports = {
  computeSha256,
  browserParseLeafDom,
  parseLeafDomNative
};
