/* JAYT-286 Authorization 01: exactly two official leaf pages, read-only evidence capture. */
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');
const vault = path.resolve(__dirname, '..', '06_TRUST_AND_EVIDENCE/batch_03b_micro_capture_vault');
const forbiddenHeader = /cookie|token|authorization|set-cookie/i;
const targets = [
  { id: 'JAYT286_REPLACEMENT_HK_04', url: 'https://dut.udn.vn/TTHLTT/Thongbao/id/12046', span: 'Thông báo chương trình học bổng Đinh Thiện Lý đối với sinh viên năm cuối năm học 2026-2027' },
  { id: 'BATCH03_AT_02', url: 'https://danang.gov.vn/vi/w/dam-bao-an-toan-cho-nguoi-dan-va-du-khach-khi-tam-bien-tai-cac-bai-bien-cua-thanh-pho-i', span: 'Đảm bảo an toàn cho người dân và du khách khi tắm biển tại các bãi biển của thành phố' }
];
const get = (url) => new Promise((resolve, reject) => {
  const request = https.get(url, { headers: { Accept: 'text/html,application/xhtml+xml', 'User-Agent': 'JayT-Operator-Provenance/1.0' } }, response => {
    const chunks = []; response.on('data', chunk => chunks.push(chunk));
    response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body: Buffer.concat(chunks) }));
  });
  request.setTimeout(20000, () => request.destroy(new Error('request timeout'))); request.on('error', reject);
});
(async () => {
  fs.mkdirSync(vault, { recursive: true }); const result = [];
  for (const target of targets) {
    try {
      const response = await get(target.url); const text = response.body.toString('utf8'); const offset = text.indexOf(target.span);
      if (response.status !== 200 || offset < 0) { result.push({ target_id: target.id, state: 'QUARANTINE_CAPTURE_REJECTED', http_status: response.status, span_offset: offset }); continue; }
      const sha = crypto.createHash('sha256').update(response.body).digest('hex');
      fs.writeFileSync(path.join(vault, `${target.id}.jayt286.operator.raw.html`), response.body);
      fs.writeFileSync(path.join(vault, `${target.id}.jayt286.operator.metadata.json`), `${JSON.stringify({ captured_at_utc: new Date().toISOString(), http_status: response.status, final_url: target.url, sanitized_response_headers: Object.fromEntries(Object.entries(response.headers).filter(([key]) => !forbiddenHeader.test(key))), raw_body_sha256: sha, supporting_text_span: target.span, supporting_text_offset_utf8: offset }, null, 2)}\n`);
      result.push({ target_id: target.id, state: 'ATTACHED_FOR_JAYT_286_VALIDATION', sha256: sha, offset });
    } catch (error) { result.push({ target_id: target.id, state: 'QUARANTINE_NETWORK_FAILURE', reason: error.message }); }
  }
  console.log(JSON.stringify({ extraction: 'JAYT-286-AUTH-01', result }, null, 2));
})();
