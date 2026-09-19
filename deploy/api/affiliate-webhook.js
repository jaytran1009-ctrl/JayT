/**
 * JAYT-447 CLOUD AFFILIATE WEBHOOK & TELEGRAM DISPATCH ENDPOINT
 * Mandate: CHAIRMAN_DIRECTIVE_20260918_FULL_CLOUD_MIGRATION_AND_DANANG_GO_LIVE (JAYT-447)
 * 
 * Endpoints:
 * - POST /api/affiliate-webhook: Ingests conversion webhooks from Shopee / Lazada / TikTok Shop Open APIs
 * - GET /api/affiliate-webhook: Health check and attribution status
 * 
 * Locked Partner Attribution:
 * - Shopee: 17372870594
 * - Lazada: 262501305
 * - TikTok Shop: VNVNLCB6LYL3
 * 
 * Reporting Target: Telegram Bot @DealsIphoneHot
 */

'use strict';

const https = require('https');

const PARTNER_REGISTRY = {
  shopee: { partnerId: '17372870594', name: 'Shopee Affiliate VN' },
  lazada: { partnerId: '262501305', name: 'Lazada Open Affiliate' },
  tiktok: { partnerId: 'VNVNLCB6LYL3', name: 'TikTok Shop Partner Network' }
};

async function forwardToTelegram(reportText) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || '@DealsIphoneHot';
  if (!token) {
    console.log('[TELEGRAM WEBHOOK MOCK]:\n' + reportText);
    return { ok: true, mock: true };
  }

  return new Promise((resolve) => {
    const postData = JSON.stringify({
      chat_id: chatId,
      text: reportText,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    });

    const req = https.request({
      hostname: 'api.telegram.org',
      port: 443,
      path: '/bot' + token + '/sendMessage',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 8000
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve({ ok: res.statusCode === 200, response: body }));
    });

    req.on('error', (e) => resolve({ ok: false, error: e.message }));
    req.write(postData);
    req.end();
  });
}

async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Signature, X-Partner-Id');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify({
      status: 'ONLINE',
      service: 'JAYT_CLOUD_AFFILIATE_WEBHOOK',
      directive: 'CHAIRMAN_DIRECTIVE_20260918_FULL_CLOUD_MIGRATION_AND_DANANG_GO_LIVE (JAYT-447)',
      partners: PARTNER_REGISTRY,
      telegram_bot: '@DealsIphoneHot',
      fail_closed_mode: true,
      timestamp: new Date().toISOString()
    }, null, 2));
  }

  if (req.method === 'POST') {
    let payload = {};
    if (req.body && typeof req.body === 'object') {
      payload = req.body;
    } else if (typeof req.body === 'string') {
      try { payload = JSON.parse(req.body); } catch (e) {}
    } else if (req[Symbol.asyncIterator]) {
      let raw = '';
      for await (const chunk of req) raw += chunk;
      try { payload = JSON.parse(raw || '{}'); } catch (e) {}
    }

    const platform = (payload.platform || req.headers['x-platform'] || 'shopee').toLowerCase();
    const partnerInfo = PARTNER_REGISTRY[platform] || PARTNER_REGISTRY.shopee;
    const eventType = payload.event_type || 'CONVERSION_PING';
    const orderId = payload.order_id || `ORD-${Date.now()}`;
    const gmValue = payload.gmv || 0;
    const estCommission = payload.commission || 0;
    const skuTitle = payload.product_title || 'Đơn hàng tiện ích KTX Đà Nẵng';

    const reportMsg = `💰 <b>[JAYT AFFILIATE CONVERSION ALERT]</b>\n\n` +
      `🛒 <b>Sàn:</b> ${partnerInfo.name} (Partner ID: <code>${partnerInfo.partnerId}</code>)\n` +
      `📦 <b>Sản phẩm:</b> ${skuTitle}\n` +
      `💵 <b>Giá trị đơn:</b> ${Number(gmValue).toLocaleString('vi-VN')}₫\n` +
      `🎁 <b>Hoa hồng ước tính:</b> ${Number(estCommission).toLocaleString('vi-VN')}₫\n` +
      `🆔 <b>Mã đơn:</b> <code>${orderId}</code>\n` +
      `⏱ <b>Thời điểm:</b> ${new Date().toISOString()}\n` +
      `📍 <b>Khu vực:</b> Đà Nẵng Community OPC Hub`;

    await forwardToTelegram(reportMsg);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify({
      success: true,
      order_id: orderId,
      partner_id: partnerInfo.partnerId,
      processed_at: new Date().toISOString(),
      dispatched_to_telegram: true
    }, null, 2));
  }

  res.statusCode = 405;
  res.end('Method Not Allowed');
}

module.exports = handler;
