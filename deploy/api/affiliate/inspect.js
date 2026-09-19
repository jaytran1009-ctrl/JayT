'use strict';

const https = require('https');
const dns = require('dns').promises;
const net = require('net');
const crypto = require('crypto');

const ALLOWED_HOSTS = new Set([
  'shopee.vn',
  'www.shopee.vn',
  's.shopee.vn',
  'lazada.vn',
  'www.lazada.vn',
  'lazada.com.vn',
  'www.lazada.com.vn'
]);
const MAX_URL_BYTES = 2048;
const MAX_REDIRECTS = 4;
const REQUEST_TIMEOUT_MS = 2500;
const CACHE_TTL_MS = 15 * 60 * 1000;
const CACHE_MAX_ENTRIES = 256;
const resolutionCache = new Map();

function cacheKey(url) {
  return crypto.createHash('sha256').update(url.href).digest('hex');
}

function readCache(url, now = Date.now()) {
  const key = cacheKey(url);
  const entry = resolutionCache.get(key);
  if (!entry || entry.expires_at <= now) {
    if (entry) resolutionCache.delete(key);
    return null;
  }
  return entry.value;
}

function writeCache(url, value, now = Date.now()) {
  if (resolutionCache.size >= CACHE_MAX_ENTRIES) {
    const oldestKey = resolutionCache.keys().next().value;
    if (oldestKey) resolutionCache.delete(oldestKey);
  }
  resolutionCache.set(cacheKey(url), { expires_at: now + CACHE_TTL_MS, value });
}

function isPrivateAddress(address) {
  if (!net.isIP(address)) return true;
  if (address.includes(':')) {
    const value = address.toLowerCase();
    return value === '::1' || value === '::' || value.startsWith('fc') || value.startsWith('fd') || value.startsWith('fe8') || value.startsWith('fe9') || value.startsWith('fea') || value.startsWith('feb');
  }
  const parts = address.split('.').map(Number);
  return parts[0] === 0 || parts[0] === 10 || parts[0] === 127 ||
    (parts[0] === 169 && parts[1] === 254) ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168) || parts[0] >= 224;
}

function parseMarketplaceUrl(input) {
  if (typeof input !== 'string' || Buffer.byteLength(input, 'utf8') > MAX_URL_BYTES) return null;
  let url;
  try { url = new URL(input.trim()); } catch (_) { return null; }
  if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
  const host = url.hostname.toLowerCase();
  if (!ALLOWED_HOSTS.has(host)) return null;
  return url;
}

function extractIdentity(url) {
  const value = url.href;
  const shopeeDash = value.match(/-i\.(\d+)\.(\d+)/);
  const shopeeProduct = value.match(/\/product\/(\d+)\/(\d+)/);
  const itemQuery = value.match(/[?&]itemid=(\d+)/i);
  const shopQuery = value.match(/[?&]shopid=(\d+)/i);
  const lazadaItem = value.match(/-i(\d+)(?:-s\d+)?\.html/i);
  if (shopeeDash) return { platform: 'shopee', shop_id: shopeeDash[1], item_id: shopeeDash[2] };
  if (shopeeProduct) return { platform: 'shopee', shop_id: shopeeProduct[1], item_id: shopeeProduct[2] };
  if (itemQuery && shopQuery) return { platform: 'shopee', shop_id: shopQuery[1], item_id: itemQuery[1] };
  if (lazadaItem) return { platform: 'lazada', shop_id: null, item_id: lazadaItem[1] };
  return { platform: url.hostname.includes('lazada') ? 'lazada' : 'shopee', shop_id: null, item_id: null };
}

async function resolvePublicAddress(hostname) {
  const records = await dns.lookup(hostname, { all: true, verbatim: true });
  const record = records.find((entry) => !isPrivateAddress(entry.address));
  if (!record) throw new Error('unsafe_destination');
  return record;
}

async function requestRedirect(url) {
  const pinned = await resolvePublicAddress(url.hostname);
  return new Promise((resolve, reject) => {
    const request = https.request({
      protocol: 'https:', hostname: url.hostname, servername: url.hostname, path: url.pathname + url.search,
      method: 'HEAD', timeout: REQUEST_TIMEOUT_MS,
      headers: { 'User-Agent': 'JayT-Link-Inspector/1.0', Accept: 'text/html' },
      lookup: (_hostname, _options, callback) => callback(null, pinned.address, pinned.family)
    }, (response) => {
      response.resume();
      resolve({ status: response.statusCode || 0, location: response.headers.location || null });
    });
    request.on('timeout', () => request.destroy(new Error('upstream_timeout')));
    request.on('error', reject);
    request.end();
  });
}

async function resolveAllowlistedRedirects(initialUrl) {
  let current = initialUrl;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    const identity = extractIdentity(current);
    if (identity.item_id) return { final_url: current.href, redirect_hops: hop, ...identity };
    if (hop === MAX_REDIRECTS) break;
    const response = await requestRedirect(current);
    if (response.status < 300 || response.status >= 400 || !response.location) break;
    const next = parseMarketplaceUrl(new URL(response.location, current).href);
    if (!next) throw new Error('redirect_destination_not_allowed');
    current = next;
  }
  return { final_url: current.href, redirect_hops: MAX_REDIRECTS, ...extractIdentity(current) };
}

async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'METHOD_NOT_ALLOWED' });
  const input = parseMarketplaceUrl(req.body && req.body.url);
  if (!input) return res.status(400).json({ ok: false, error: 'INVALID_OR_UNSUPPORTED_URL' });
  try {
    let result = readCache(input);
    const cacheStatus = result ? 'HIT' : 'MISS';
    if (!result) {
      result = await resolveAllowlistedRedirects(input);
      if (result.item_id) writeCache(input, result);
    }
    res.setHeader('X-JayT-Resolver-Cache', cacheStatus);
    return res.status(200).json({
      ok: true,
      ...result,
      voucher_data: null,
      price_history: null,
      affiliate_url: null,
      disclosure: 'Chỉ nhận diện liên kết công khai; chưa gọi API voucher hoặc tạo liên kết tiếp thị.'
    });
  } catch (_) {
    return res.status(422).json({ ok: false, error: 'SAFE_RESOLUTION_FAILED' });
  }
}

module.exports = handler;
module.exports.parseMarketplaceUrl = parseMarketplaceUrl;
module.exports.extractIdentity = extractIdentity;
module.exports.isPrivateAddress = isPrivateAddress;
module.exports.resolveAllowlistedRedirects = resolveAllowlistedRedirects;
module.exports.readCache = readCache;
module.exports.writeCache = writeCache;
module.exports.resolutionCache = resolutionCache;
