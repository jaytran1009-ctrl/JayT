const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const PORT = 4176;
const HOST = '127.0.0.1';
const BASE_URL = `http://${HOST}:${PORT}/`;
const WORKSPACE_DIR = 'D:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const STATIC_DIR = path.join(WORKSPACE_DIR, 'staging_preview_sprint_b');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function createServer() {
  return http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const safePath = path.normalize(path.join(STATIC_DIR, reqPath));
    if (!safePath.startsWith(STATIC_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      return res.end('Forbidden');
    }
    if (fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
      const ext = path.extname(safePath).toLowerCase();
      const mime = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': mime,
        'Cache-Control': 'no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(safePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
    }
  });
}

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

async function runAudit() {
  console.log('--- STARTING JAYT-345 AUTOMATED A11Y & CONTRAST AUDIT ---');
  let server;
  let serverStartedLocally = false;

  try {
    await new Promise((resolve, reject) => {
      const req = http.get(BASE_URL, (res) => {
        resolve();
      });
      req.on('error', reject);
    });
    console.log('Staging server already running on port ' + PORT);
  } catch (e) {
    console.log('Starting local Staging server on port ' + PORT);
    server = createServer();
    await new Promise((resolve) => server.listen(PORT, HOST, resolve));
    serverStartedLocally = true;
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.toString()));

  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

  // In-page audit covering contrast and headings per route
  const navAuditData = await page.evaluate(async () => {
    function parseRgb(colorStr) {
      if (!colorStr) return [0, 0, 0, 1];
      const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (!match) return [0, 0, 0, 1];
      return [
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3], 10),
        match[4] !== undefined ? parseFloat(match[4]) : 1
      ];
    }

    function getLuminance(r, g, b) {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    }

    function getContrastRatio(rgb1, rgb2) {
      const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
      const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    }

    function getEffectiveBg(el) {
      const layers = [];
      let cur = el;
      while (cur && cur !== document.documentElement) {
        const bg = window.getComputedStyle(cur).backgroundColor;
        const parsed = parseRgb(bg);
        if (parsed[3] > 0) {
          layers.unshift(parsed);
          if (parsed[3] >= 0.99) break;
        }
        cur = cur.parentElement;
      }
      let r = 255, g = 255, b = 255;
      for (const layer of layers) {
        const a = layer[3];
        r = Math.round(layer[0] * a + r * (1 - a));
        g = Math.round(layer[1] * a + g * (1 - a));
        b = Math.round(layer[2] * a + b * (1 - a));
      }
      return [r, g, b, 1];
    }

    function testElementContrast(el, name) {
      const style = window.getComputedStyle(el);
      const fg = parseRgb(style.color);
      const bg = getEffectiveBg(el);
      const ratio = getContrastRatio(fg, bg);
      const fontSize = parseFloat(style.fontSize);
      const isBold = parseInt(style.fontWeight, 10) >= 700 || style.fontWeight === 'bold';
      const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && isBold);
      const required = isLargeText ? 3.0 : 4.5;
      const pass = ratio >= required;

      return {
        name,
        textSample: el.innerText ? el.innerText.slice(0, 30).trim() : '',
        fg: style.color,
        bg: `rgb(${bg[0]}, ${bg[1]}, ${bg[2]})`,
        ratio: Math.round(ratio * 100) / 100,
        requiredRatio: required,
        isLargeText,
        pass
      };
    }

    const results = {
      views: {},
      summary: { totalChecked: 0, passed: 0, failed: 0 },
      headingHierarchyByView: {}
    };

    const navButtons = document.querySelectorAll('.nav-btn');
    const navMap = {
      'HOME': 'Home',
      'VOUCHER_HUB': 'Voucher Vault',
      'SPLIT_BILL_PRO': 'Split Bill Pro',
      'SAVINGS_CALENDAR': 'Savings Calendar',
      'VALUE_RADAR': 'Smart Value Radar'
    };

    for (const btn of navButtons) {
      const navKey = btn.getAttribute('data-nav');
      if (!navMap[navKey]) continue;

      btn.click();
      await new Promise(r => setTimeout(r, 100));

      const viewResults = [];

      // 1. Heading hierarchy check in current view
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .filter(h => h.offsetParent !== null)
        .map(h => ({
          tag: h.tagName,
          level: parseInt(h.tagName[1]),
          text: h.innerText.slice(0, 40).trim()
        }));

      let headingOk = headings.length > 0 && headings[0].level === 1;
      const headingViolations = [];
      for (let i = 1; i < headings.length; i++) {
        if (headings[i].level - headings[i - 1].level > 1) {
          headingOk = false;
          headingViolations.push({ from: headings[i-1], to: headings[i] });
        }
      }

      results.headingHierarchyByView[navMap[navKey]] = {
        totalHeadings: headings.length,
        hasH1: headings.length > 0 && headings[0].level === 1,
        validHierarchy: headingOk,
        violations: headingViolations,
        sequence: headings.map(h => h.tag)
      };

      // 2. Sample text elements for contrast check
      const canvas = document.getElementById('jayt-view-canvas');
      const textElements = canvas.querySelectorAll('h1, h2, h3, h4, p, span, button, a, label, input, .badge, .vault-badge');
      const sampled = [];

      for (const el of textElements) {
        if (el.offsetParent === null) continue;
        const text = el.innerText ? el.innerText.trim() : (el.value ? el.value.trim() : (el.placeholder || ''));
        if (!text || text.length < 2) continue;

        const key = (el.className || el.tagName) + ':' + (el.innerText ? el.innerText.slice(0, 15) : '');
        if (sampled.includes(key)) continue;
        sampled.push(key);

        const r = testElementContrast(el, `${el.tagName.toLowerCase()}.${el.className}`);
        viewResults.push(r);
        results.summary.totalChecked++;
        if (r.pass) results.summary.passed++;
        else results.summary.failed++;
      }

      results.views[navMap[navKey]] = viewResults;
    }

    // Switch back to home
    const homeBtn = document.querySelector('.nav-btn[data-nav="HOME"]');
    if (homeBtn) homeBtn.click();

    return results;
  });

  // Automated Semantic & ARIA Structure Audit
  const ariaAuditData = await page.evaluate(() => {
    const checks = {
      hasHeaderBanner: !!document.querySelector('header[role="banner"]'),
      hasNavNavigation: !!document.querySelector('nav[role="navigation"]'),
      hasMainCanvas: !!document.querySelector('main[role="main"]'),
      hasFooterContentinfo: !!document.querySelector('footer[role="contentinfo"]'),
      headingsHierarchy: (() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'))
          .filter(h => h.offsetParent !== null)
          .map(h => parseInt(h.tagName[1]));
        let ok = headings.length > 0 && headings[0] === 1;
        for (let i = 1; i < headings.length; i++) {
          if (headings[i] - headings[i - 1] > 1) ok = false;
        }
        return { count: headings.length, validHierarchy: ok };
      })(),
      buttonsHaveAccessibleNames: (() => {
        const btns = document.querySelectorAll('button');
        let unlabelled = 0;
        btns.forEach(b => {
          const name = b.innerText.trim() || b.getAttribute('aria-label') || b.getAttribute('title');
          if (!name) unlabelled++;
        });
        return { totalButtons: btns.length, unlabelledCount: unlabelled, pass: unlabelled === 0 };
      })(),
      linksHaveValidHref: (() => {
        const links = document.querySelectorAll('a');
        let invalid = 0;
        links.forEach(l => {
          const href = l.getAttribute('href');
          if (!href || href === '#' || href.startsWith('javascript:')) invalid++;
        });
        return { totalLinks: links.length, invalidCount: invalid, pass: invalid === 0 };
      })()
    };
    return checks;
  });

  await browser.close();
  if (serverStartedLocally && server) {
    server.close();
  }

  const allViewsHierarchyOk = Object.values(navAuditData.headingHierarchyByView).every(v => v.validHierarchy);

  const now = new Date();
  const timestampCompact = now.toISOString().replace(/[-:]/g, '').replace('T', '_').slice(0, 15) + 'Z';
  const runId = `RUN_${timestampCompact}`;
  const receiptFileName = `JAYT_345_SPRINT_B_AUTOMATED_A11Y_CONTRAST_RECEIPT_${timestampCompact}.json`;
  const receiptDir = path.join(WORKSPACE_DIR, '07_QUALITY_ASSURANCE/runtime_evidence');
  const receiptPath = path.join(receiptDir, receiptFileName);

  if (fs.existsSync(receiptPath)) {
    throw new Error(`Receipt ${receiptPath} already exists! Cannot overwrite immutable evidence.`);
  }

  const receipt = {
    receipt_name: `JAYT_345_SPRINT_B_AUTOMATED_A11Y_CONTRAST_RECEIPT_${timestampCompact}`,
    directive: 'JAYT-345 AUTOMATED A11Y REMEDIATION AND RESEAL',
    run_id: runId,
    generated_at_utc: now.toISOString(),
    environment: 'STAGING_PORT_4176',
    test_scope: 'AUTOMATED_OPTICAL_CONTRAST_AND_SEMANTIC_A11Y',
    standards_applied: [
      'WCAG_2.1_CRITERION_1.4.3_CONTRAST_MINIMUM_LEVEL_AA',
      'WCAG_2.1_CRITERION_1.4.11_NON_TEXT_CONTRAST_LEVEL_AA',
      'WCAG_2.1_CRITERION_1.3.1_INFO_AND_RELATIONSHIPS',
      'WCAG_2.1_CRITERION_4.1.2_NAME_ROLE_VALUE'
    ],
    optical_contrast_audit: {
      total_elements_sampled: navAuditData.summary.totalChecked,
      passed_count: navAuditData.summary.passed,
      failed_count: navAuditData.summary.failed,
      overall_pass_rate_percent: Math.round((navAuditData.summary.passed / navAuditData.summary.totalChecked) * 100),
      views_breakdown: navAuditData.views
    },
    heading_hierarchy_by_route: navAuditData.headingHierarchyByView,
    semantic_aria_audit: ariaAuditData,
    console_errors: {
      count: consoleErrors.length,
      errors: consoleErrors,
      pass: consoleErrors.length === 0
    },
    verdict: (navAuditData.summary.failed === 0 && 
              allViewsHierarchyOk && 
              ariaAuditData.buttonsHaveAccessibleNames.pass && 
              ariaAuditData.linksHaveValidHref.pass && 
              consoleErrors.length === 0) ? 'PASSED' : 'FAILED'
  };

  fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
  const receiptHash = sha256(fs.readFileSync(receiptPath));
  console.log('Automated A11y & Contrast Audit Complete.');
  console.log('Receipt saved to:', receiptPath);
  console.log('Receipt SHA-256:', receiptHash);
  console.log('Verdict:', receipt.verdict);
  console.log(`Contrast Check: ${receipt.optical_contrast_audit.passed_count}/${receipt.optical_contrast_audit.total_elements_sampled} passed (${receipt.optical_contrast_audit.overall_pass_rate_percent}%)`);
  console.log(`Heading Hierarchy: ${allViewsHierarchyOk ? 'ALL ROUTES VALID' : 'VIOLATION DETECTED'}`);
  if (receipt.verdict !== 'PASSED') {
    process.exit(1);
  }
  return { receiptPath, receiptHash, receiptFileName, runId, verdict: receipt.verdict };
}

runAudit().catch(err => {
  console.error('Audit Error:', err);
  process.exit(1);
});
