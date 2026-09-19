/**
 * SHOPEE AFFILIATE AUTH & QUERY PROBE CLIENT (072B)
 * Directive: JAYT-LEAN-PIVOT-072
 * 
 * Secure, non-ingesting probe for Shopee Vietnam Affiliate GraphQL Open API.
 * Reads credentials strictly from environment variables.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const SHOPEE_AFFILIATE_CONTRACT_072B = require('./provider_contracts/shopee_affiliate_contract_072b');

const repoRoot = path.resolve(__dirname, '..', '..');

// Load environment variables from .env if present
const envPath = path.join(repoRoot, '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const k = trimmed.slice(0, idx).trim();
      const v = trimmed.slice(idx + 1).trim();
      if (!process.env[k]) {
        process.env[k] = v;
      }
    }
  }
}

const appId = process.env.SHOPEE_APP_ID || '17372870594';
const secretKey = process.env.SHOPEE_SECRET_KEY || process.env.SHOPEE_APP_SECRET || '';

async function runShopeeProbe() {
  console.log('🔍 [SHOPEE-AFFILIATE-PROBE-072B] Bắt đầu phiên kiểm tra kết nối an toàn (Zero Ingestion)...');
  console.log(`   App ID / Partner ID: ${appId}`);
  console.log(`   Endpoint: ${SHOPEE_AFFILIATE_CONTRACT_072B.official_endpoint}`);

  if (!secretKey) {
    console.log('\n⚠️ [CREDENTIALS-REQUIRED]: Chưa phát hiện `SHOPEE_SECRET_KEY` trong biến môi trường hoặc tệp `.env`.');
    console.log('📌 Hướng dẫn kích hoạt an toàn (Không cần dán key vào chat):');
    console.log('   Cách 1: Tạo/Sửa tệp `.env` tại thư mục gốc dự án với nội dung:');
    console.log('           SHOPEE_APP_ID=17372870594');
    console.log('           SHOPEE_SECRET_KEY=khoa_bi_mat_lay_tu_shopee_affiliate_portal\n');
    console.log('   Cách 2: Gán biến môi trường trong PowerShell:');
    console.log('           $env:SHOPEE_SECRET_KEY="khoa_bi_mat_lay_tu_shopee_affiliate_portal"');
    console.log('           node 05_DEAL_AND_AFFILIATE/feed_gateway/probe_shopee_affiliate_072b.js\n');
    return {
      status: 'AWAITING_ENV_CREDENTIALS',
      app_id: appId,
      endpoint: SHOPEE_AFFILIATE_CONTRACT_072B.official_endpoint
    };
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const payloadObj = {
    query: SHOPEE_AFFILIATE_CONTRACT_072B.queries.shopOfferV2,
    variables: { page: 0, limit: 10 }
  };
  const payloadString = JSON.stringify(payloadObj);
  const authHeader = SHOPEE_AFFILIATE_CONTRACT_072B.buildAuthorizationHeader(appId, secretKey, timestamp, payloadString);

  console.log(`   Timestamp: ${timestamp}`);
  console.log(`   Gửi truy vấn thăm dò GraphQL shopOfferV2...`);

  try {
    const response = await fetch(SHOPEE_AFFILIATE_CONTRACT_072B.official_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: payloadString
    });

    const responseText = await response.text();
    let responseJson = null;
    try { responseJson = JSON.parse(responseText); } catch {}

    const runDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', `run_shopee_probe_${Date.now()}`);
    fs.mkdirSync(runDir, { recursive: true });

    const rawResponseFile = path.join(runDir, 'shopee_raw_response.json');
    fs.writeFileSync(rawResponseFile, responseText, 'utf8');

    const receiptObj = {
      $schema: 'https://jayt.vn/schemas/raw-capture-receipt.v1.json',
      provider: 'SHOPEE_AFFILIATE',
      endpoint: SHOPEE_AFFILIATE_CONTRACT_072B.official_endpoint,
      app_id: appId,
      timestamp: timestamp,
      http_status: response.status,
      response_sha256: crypto.createHash('sha256').update(Buffer.from(responseText)).digest('hex'),
      captured_at: new Date().toISOString()
    };
    const receiptFile = path.join(runDir, 'receipt_shopee_probe.json');
    fs.writeFileSync(receiptFile, JSON.stringify(receiptObj, null, 2), 'utf8');

    console.log(`\n🟢 [PROBE-COMPLETED] HTTP Status: ${response.status}`);
    console.log(`   Raw Response Hash: ${receiptObj.response_sha256}`);
    console.log(`   Lưu trữ raw evidence tại: ${runDir}`);

    return {
      status: response.ok ? 'PROBE_SUCCESS' : 'PROBE_HTTP_ERROR',
      http_status: response.status,
      receipt_path: receiptFile,
      raw_response: responseJson || responseText
    };

  } catch (err) {
    console.error(`\n🔴 [PROBE-ERROR]: ${err.message}`);
    return {
      status: 'NETWORK_ERROR',
      error: err.message
    };
  }
}

if (require.main === module) {
  runShopeeProbe();
}

module.exports = {
  runShopeeProbe
};
