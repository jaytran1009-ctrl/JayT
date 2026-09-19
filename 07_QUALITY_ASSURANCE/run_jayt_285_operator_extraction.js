/* JAYT-285: exact three-URL operator extraction. Uses no cookies/auth and never publishes content. */
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');
const root = path.resolve(__dirname, '..');
const vault = path.join(root, '06_TRUST_AND_EVIDENCE/batch_03b_micro_capture_vault');
const secretHeader = /cookie|token|authorization|set-cookie/i;
const targets = [
  { id: 'BATCH03_HK_04', url: 'https://ued.udn.vn/2025/02/18/thong-bao-ve-hoc-bong-ho-tro-sinh-vien-nghien-cuu-khoa-hoc-nam-2025/', span: 'Thông báo về Học bổng hỗ trợ sinh viên nghiên cứu khoa học năm 2025' },
  { id: 'BATCH03_HC_07', url: 'https://www.danang.gov.vn/vi/web/dng/w/to-chuc-phun-nuoc-phun-lua-cau-rong-va-quay-nhip-cau-song-han-phuc-vu-tet-nguyen-dan-binh-ngo-2026', span: 'Tổ chức phun nước, phun lửa cầu Rồng và quay nhịp cầu sông Hàn phục vụ Tết Nguyên đán Bính Ngọ 2026' }
];
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
function get(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { headers: { Accept: 'text/html,application/xhtml+xml', 'User-Agent': 'JayT-Operator-Provenance/1.0' } }, (response) => {
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body: Buffer.concat(chunks) }));
    });
    request.setTimeout(20000, () => request.destroy(new Error('request timeout')));
    request.on('error', reject);
  });
}
async function main() {
  fs.mkdirSync(vault, { recursive: true });
  const result = [];
  for (const target of targets) {
    try {
      const received = await get(target.url);
      const text = received.body.toString('utf8');
      const offset = text.indexOf(target.span);
      if (received.status !== 200 || offset < 0) {
        result.push({ target_id: target.id, state: 'QUARANTINE_CAPTURE_REJECTED', http_status: received.status, span_offset: offset });
        continue;
      }
      const rawName = `${target.id}.operator.raw.html`;
      const rawPath = path.join(vault, rawName);
      fs.writeFileSync(rawPath, received.body);
      const metadata = {
        captured_at_utc: new Date().toISOString(), http_status: received.status, final_url: target.url,
        sanitized_response_headers: Object.fromEntries(Object.entries(received.headers).filter(([key]) => !secretHeader.test(key))),
        raw_body_sha256: sha256(received.body), supporting_text_span: target.span, supporting_text_offset_utf8: offset
      };
      fs.writeFileSync(path.join(vault, `${target.id}.operator.metadata.json`), `${JSON.stringify(metadata, null, 2)}\n`, 'utf8');
      result.push({ target_id: target.id, state: 'ATTACHED_FOR_JAYT_279_VALIDATION', sha256: metadata.raw_body_sha256, offset });
    } catch (error) {
      result.push({ target_id: target.id, state: 'QUARANTINE_NETWORK_FAILURE', reason: error.message });
    }
  }
  console.log(JSON.stringify({ extraction: 'JAYT-285', result }, null, 2));
}
main();
