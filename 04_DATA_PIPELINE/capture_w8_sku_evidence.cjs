'use strict';

/* W8 public marketplace capture. Fail closed on traffic errors, CAPTCHA or login walls. */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const workspace = path.resolve(__dirname, '..');
const vaultPath = path.join(workspace, '04_DATA_PIPELINE', 'raw_evidence', 'w8_sku_vault');
const registerPath = path.join(vaultPath, 'W8_SKU_CAPTURE_REGISTER.json');
const allowedHosts = new Set(['shopee.vn', 'www.shopee.vn', 'lazada.vn', 'www.lazada.vn', 'lazada.com.vn', 'www.lazada.com.vn']);
const blockedUrlFragments = ['/verify/', '/captcha/', '/login'];
const blockedTextPatterns = [/trang không khả dụng/i, /đã có lỗi xảy ra/i, /unusual traffic/i, /verify you are human/i, /captcha/i, /đăng nhập để tiếp tục/i];
const pricePattern = /(?:₫|đ|vnd|\b\d{1,3}(?:[.,]\d{3}){1,3}\b)/i;
const voucherPattern = /voucher|mã giảm|giảm\s*\d+|freeship|ưu đãi|coupon/i;

function sha256(buffer) { return crypto.createHash('sha256').update(buffer).digest('hex'); }
function validateUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return 'MISSING_CANONICAL_URL';
  let url;
  try { url = new URL(value); } catch (_) { return 'INVALID_CANONICAL_URL'; }
  if (url.protocol !== 'https:' || url.username || url.password || url.port) return 'UNSAFE_CANONICAL_URL';
  if (!allowedHosts.has(url.hostname.toLowerCase())) return 'HOST_NOT_ALLOWED';
  return null;
}
function validateCapture({ status, finalUrl, bodyText }) {
  if (status !== 200) return `HTTP_${status || 'NO_RESPONSE'}`;
  let parsed;
  try { parsed = new URL(finalUrl); } catch (_) { return 'INVALID_FINAL_URL'; }
  if (!allowedHosts.has(parsed.hostname.toLowerCase())) return 'FINAL_HOST_NOT_ALLOWED';
  if (blockedUrlFragments.some((fragment) => parsed.pathname.toLowerCase().includes(fragment))) return 'MARKETPLACE_CHALLENGE_OR_LOGIN';
  if (blockedTextPatterns.some((pattern) => pattern.test(bodyText))) return 'MARKETPLACE_CHALLENGE_OR_ERROR_COPY';
  if (!pricePattern.test(bodyText)) return 'MISSING_PRICE_QUOTE';
  if (!voucherPattern.test(bodyText)) return 'MISSING_VOUCHER_TERMS';
  return null;
}
function safeStem(item) {
  return `slot_${String(item.slot).padStart(2, '0')}_${String(item.category).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '').toLowerCase()}`;
}
async function captureItem(browser, item) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36');
  try {
    const response = await page.goto(item.canonical_url, { waitUntil: 'networkidle2', timeout: 45000 });
    await new Promise((resolve) => setTimeout(resolve, 2500));
    const status = response ? response.status() : 0;
    const finalUrl = page.url();
    const bodyText = await page.evaluate(() => document.body ? document.body.innerText : '');
    const error = validateCapture({ status, finalUrl, bodyText });
    if (error) return { ok: false, error, status, final_url: finalUrl };
    const stem = safeStem(item);
    const htmlName = `${stem}.html`;
    const pngName = `${stem}.png`;
    const htmlBuffer = Buffer.from(await page.content(), 'utf8');
    const pngBuffer = await page.screenshot({ fullPage: true, type: 'png' });
    fs.writeFileSync(path.join(vaultPath, htmlName), htmlBuffer);
    fs.writeFileSync(path.join(vaultPath, pngName), pngBuffer);
    const relevantLines = bodyText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).filter((line) => pricePattern.test(line) || voucherPattern.test(line)).slice(0, 12);
    return { ok: true, final_url: finalUrl, raw_html_logged_out: htmlName, full_page_png: pngName, captured_at_utc: new Date().toISOString(), http_status_200: true, html_sha256: sha256(htmlBuffer), png_sha256: sha256(pngBuffer), price_and_voucher_terms_quotes: relevantLines };
  } finally { await page.close(); }
}
async function main() {
  const register = JSON.parse(fs.readFileSync(registerPath, 'utf8'));
  const validation = register.items.map((item) => ({ item, error: validateUrl(item.canonical_url) }));
  const eligible = validation.filter((entry) => !entry.error).map((entry) => entry.item);
  const skipped = validation.filter((entry) => entry.error).map((entry) => ({ slot: entry.item.slot, category: entry.item.category, reason: entry.error }));
  if (!eligible.length) {
    console.error(JSON.stringify({ status: 'NO_ELIGIBLE_SKU_URLS', reason: 'ADD_AT_LEAST_ONE_EXACT_CANONICAL_PRODUCT_URL', eligible_count: 0, skipped_count: skipped.length, skipped }, null, 2));
    process.exitCode = 2;
    return;
  }
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const results = [];
  try {
    for (const item of eligible) {
      const result = await captureItem(browser, item);
      results.push({ slot: item.slot, category: item.category, ...result });
      if (result.ok) Object.assign(item, result, { status: 'ACCEPTED' });
      else Object.assign(item, { status: `REJECTED_${result.error}`, last_capture_attempt_utc: new Date().toISOString(), last_capture_final_url: result.final_url || null });
    }
  } finally { await browser.close(); }
  const accepted = register.items.filter((item) => item.status === 'ACCEPTED').length;
  register.accepted_count = accepted;
  register.status = accepted === register.required_count ? 'TWENTY_OF_TWENTY_ACCEPTED' : `PARTIAL_${accepted}_OF_${register.required_count}_ACCEPTED`;
  fs.writeFileSync(registerPath, `${JSON.stringify(register, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ status: register.status, accepted_count: accepted, required_count: register.required_count, attempted_count: eligible.length, skipped_count: skipped.length, skipped, results }, null, 2));
  if (accepted !== register.required_count) process.exitCode = 3;
}
main().catch((error) => { console.error(JSON.stringify({ status: 'CAPTURE_BATCH_FAILED', error: error.message }, null, 2)); process.exitCode = 1; });
