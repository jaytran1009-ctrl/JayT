'use strict';

const assert = require('assert');
const endpoint = require('../deploy/api/affiliate/inspect.js');

assert.strictEqual(endpoint.parseMarketplaceUrl('http://shopee.vn/product/1/2'), null);
assert.strictEqual(endpoint.parseMarketplaceUrl('https://example.com/product/1/2'), null);
assert.strictEqual(endpoint.parseMarketplaceUrl('https://user:pass@shopee.vn/product/1/2'), null);
assert.strictEqual(endpoint.isPrivateAddress('127.0.0.1'), true);
assert.strictEqual(endpoint.isPrivateAddress('192.168.1.1'), true);
assert.deepStrictEqual(
  endpoint.extractIdentity(new URL('https://shopee.vn/product/17372870594/9876543210')),
  { platform: 'shopee', shop_id: '17372870594', item_id: '9876543210' }
);
assert.deepStrictEqual(
  endpoint.extractIdentity(new URL('https://www.lazada.vn/products/example-i123456789-s987654321.html')),
  { platform: 'lazada', shop_id: null, item_id: '123456789' }
);

const cacheUrl = new URL('https://shopee.vn/product/10/20');
const cacheValue = { platform: 'shopee', shop_id: '10', item_id: '20', final_url: cacheUrl.href, redirect_hops: 0 };
endpoint.writeCache(cacheUrl, cacheValue, 1000);
assert.deepStrictEqual(endpoint.readCache(cacheUrl, 1001), cacheValue);
assert.strictEqual(endpoint.readCache(cacheUrl, 1000 + (15 * 60 * 1000) + 1), null);

console.log('W8 affiliate inspect: PASS (URL contract, allowlist, credential rejection, SSRF guard, public ID parsing, bounded TTL cache)');
