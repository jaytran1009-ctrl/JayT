/* JAYT-288 single-pass operator ingress. Writes raw bodies plus sanitized metadata only. */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const trust = path.join(root, '06_TRUST_AND_EVIDENCE');
const scope = JSON.parse(fs.readFileSync(path.join(trust, 'JAYT_288_FIVE_CANDIDATE_INGRESS_SCOPE.json'), 'utf8'));
const vault = path.join(root, scope.vault);
const prohibited = /cookie|token|authorization|set-cookie/i;
const allowlisted = new Set(['ued.udn.vn', 'dut.udn.vn', 'www.danangbus.vn', 'danangbus.vn']);
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');

function utf8ByteOffset(text, span) {
  const index = text.indexOf(span);
  return index < 0 ? -1 : Buffer.byteLength(text.slice(0, index), 'utf8');
}

async function capture(target) {
  const startedAt = new Date().toISOString();
  try {
    const response = await fetch(target.url, { redirect: 'manual', headers: { accept: 'text/html,application/xhtml+xml' } });
    const bytes = Buffer.from(await response.arrayBuffer());
    const finalUrl = response.url || target.url;
    const headers = Object.fromEntries([...response.headers.entries()].filter(([key]) => !prohibited.test(key)));
    const text = bytes.toString('utf8');
    const span = target.allowed_card_fact.includes('UED')
      ? 'Miễn, giảm học phí'
      : target.allowed_card_fact.includes('Vallet')
        ? 'Thông báo học bổng Vallet năm học 2026-2027'
        : target.id.includes('8-11-12')
          ? 'Tuyến số 8: kết nối khu vực ven biển Sơn Trà với khu vực phía Nam thành phố.'
          : target.id.includes('CROSSCITY')
            ? 'Tuyến buýt xuyên tâm'
            : 'Đà Nẵng định hình các tuyến buýt trọng điểm tăng kết nối du lịch và liên vùng.';
    const offset = utf8ByteOffset(text, span);
    const metadata = {
      captured_at_utc: new Date().toISOString(),
      capture_started_at_utc: startedAt,
      http_status: response.status,
      final_url: finalUrl,
      sanitized_response_headers: headers,
      raw_body_sha256: sha256(bytes),
      supporting_text_span: span,
      supporting_text_offset_utf8: offset,
      ingress_status: response.status === 200 && allowlisted.has(new URL(finalUrl).hostname) && offset >= 0 ? 'RAW_CAPTURED__AWAITING_VALIDATOR' : 'QUARANTINE_CAPTURE_INCOMPLETE'
    };
    if (response.status === 200 && allowlisted.has(new URL(finalUrl).hostname) && offset >= 0) {
      fs.mkdirSync(vault, { recursive: true });
      fs.writeFileSync(path.join(vault, `${target.id}.operator.raw.html`), bytes);
      fs.writeFileSync(path.join(vault, `${target.id}.operator.metadata.json`), `${JSON.stringify(metadata, null, 2)}\n`);
    }
    return { target_id: target.id, ...metadata, raw_written: metadata.ingress_status === 'RAW_CAPTURED__AWAITING_VALIDATOR' };
  } catch (error) {
    return { target_id: target.id, ingress_status: 'INTAKE_FAILED__QUARANTINE', error: String(error.message || error), raw_written: false };
  }
}

(async () => {
  const results = [];
  for (const target of scope.allowed_targets) results.push(await capture(target));
  const receipt = { receipt_id: 'JAYT-288-OPERATOR-INGRESS-RECEIPT', executed_at_utc: new Date().toISOString(), scope_id: scope.scope_id, results, capture_authorized_count: 5, raw_written_count: results.filter((item) => item.raw_written).length, public_approved_count: 0, render_permitted: false };
  fs.mkdirSync(vault, { recursive: true });
  fs.writeFileSync(path.join(vault, 'JAYT_288_OPERATOR_INGRESS_RECEIPT.json'), `${JSON.stringify(receipt, null, 2)}\n`);
  console.log(JSON.stringify(receipt, null, 2));
  if (receipt.raw_written_count !== scope.allowed_targets.length) process.exitCode = 1;
})();
