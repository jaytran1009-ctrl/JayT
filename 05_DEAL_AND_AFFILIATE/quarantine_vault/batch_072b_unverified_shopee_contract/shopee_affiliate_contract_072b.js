/**
 * SHOPEE AFFILIATE OPEN API CONTRACT SPECIFICATION (072B)
 * Directive: JAYT-LEAN-PIVOT-072
 * 
 * Formal implementation of Shopee Vietnam Affiliate GraphQL Open API.
 */

const crypto = require('crypto');

const SHOPEE_AFFILIATE_CONTRACT_072B = Object.freeze({
  provider_key: 'SHOPEE_AFFILIATE',
  contract_id: 'JAYT_CONTRACT_SHOPEE_AFFILIATE_GRAPHQL_V1',
  support_status: 'SUPPORTED_SPEC_VERIFIED',
  official_endpoint: 'https://open-api.affiliate.shopee.vn/graphql',
  doc_spec_ref: '05_DEAL_AND_AFFILIATE/feed_gateway/provider_docs/shopee_affiliate_open_api_spec.md',

  /**
   * Computes the HMAC-SHA256 signature according to Shopee's official specification:
   * base_string = app_id + timestamp + payload + secret_key
   * signature = HMAC_SHA256(secret_key, base_string).hex
   */
  computeSignature(appId, secretKey, timestamp, payloadString) {
    if (!appId || !secretKey || !timestamp || typeof payloadString !== 'string') {
      throw new Error('FAIL-CLOSED: Missing required arguments for Shopee Affiliate signature generation.');
    }
    const baseString = `${appId}${timestamp}${payloadString}${secretKey}`;
    return crypto.createHmac('sha256', secretKey).update(baseString, 'utf8').digest('hex');
  },

  /**
   * Builds the exact Authorization header string:
   * Authorization: SHA256 Credential={app_id}, Signature={signature}, Timestamp={timestamp}
   */
  buildAuthorizationHeader(appId, secretKey, timestamp, payloadString) {
    const signature = this.computeSignature(appId, secretKey, timestamp, payloadString);
    return `SHA256 Credential=${appId}, Signature=${signature}, Timestamp=${timestamp}`;
  },

  /**
   * GraphQL Queries
   */
  queries: {
    generateShortLink: `mutation GenerateLink($originUrl: String!, $subIds: [String]) {
  generateShortLink(input: {
    originUrl: $originUrl,
    subIds: $subIds
  }) {
    shortLink
  }
}`,
    productOfferV2: `query GetProductOffers($page: Int, $limit: Int, $keyword: String, $sortType: Int) {
  productOfferV2(page: $page, limit: $limit, keyword: $keyword, sortType: $sortType) {
    nodes {
      itemId
      productName
      price
      discountRate
      commissionRate
      productLink
      offerLink
      shopId
      shopName
    }
  }
}`,
    shopOfferV2: `query GetShopOffers($page: Int, $limit: Int) {
  shopOfferV2(page: $page, limit: $limit) {
    nodes {
      shopId
      shopName
      commissionRate
      shopLink
      offerLink
    }
  }
}`
  }
});

module.exports = SHOPEE_AFFILIATE_CONTRACT_072B;
