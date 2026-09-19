/* JAYT-276: one read-only capture attempt for exactly three approved Batch 03B leaf pages. */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const vault = path.join(root, '06_TRUST_AND_EVIDENCE', 'batch_03b_micro_capture_vault');
const manifestPath = path.join(vault, 'JAYT_276_MICRO_CAPTURE_MANIFEST.json');
const targets = [
  { id: 'BATCH03_HK_04', url: 'https://ued.udn.vn/2025/02/18/thong-bao-ve-hoc-bong-ho-tro-sinh-vien-nghien-cuu-khoa-hoc-nam-2025/', span: 'Thông báo về Học bổng hỗ trợ sinh viên nghiên cứu khoa học năm 2025.' },
  { id: 'BATCH03_HC_07', url: 'https://www.danang.gov.vn/vi/web/dng/w/to-chuc-phun-nuoc-phun-lua-cau-rong-va-quay-nhip-cau-song-han-phuc-vu-tet-nguyen-dan-binh-ngo-2026', span: 'Tổ chức phun nước, phun lửa cầu Rồng và quay nhịp cầu sông Hàn phục vụ Tết Nguyên đán Bính Ngọ 2026.' },
  { id: 'BATCH03_DS_07', url: 'https://www.danangbus.vn/tin-tuc/tin-tuc/danabus--nguoi-ban-dong-hanh-thong-minh-cua-hanh-khach-xe-buyt-da-nang-5727.html', span: 'DanaBus hiển thị vị trí của xe trên bản đồ, giúp hành khách chủ động hơn trong việc sắp xếp thời gian di chuyển.' }
];

const forbiddenHeader = /cookie|token|authorization|set-cookie/i;
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');

async function main() {
  if (fs.existsSync(manifestPath)) throw new Error('JAYT-276 single-shot quota already consumed: manifest exists.');
  fs.mkdirSync(vault, { recursive: true });
  const startedAt = new Date();
  const deadline = new Date(startedAt.getTime() + 2 * 60 * 60 * 1000);
  const items = [];

  for (const target of targets) {
    const item = { target_id: target.id, authorized_url: target.url, expected_supporting_text_span: target.span, started_at_utc: new Date().toISOString(), capture_authorized: true, public_approved: false, render_permitted: false };
    try {
      const response = await fetch(target.url, { method: 'GET', redirect: 'error', headers: { accept: 'text/html,application/xhtml+xml' } });
      const body = Buffer.from(await response.arrayBuffer());
      const headers = Object.fromEntries([...response.headers.entries()].filter(([key]) => !forbiddenHeader.test(key)));
      item.completed_at_utc = new Date().toISOString();
      item.http_status = response.status;
      item.final_url = response.url;
      item.sanitized_headers = headers;
      item.raw_body_sha256 = sha256(body);
      item.raw_body_bytes = body.length;
      const text = body.toString('utf8');
      item.supporting_text_offset_utf8 = text.indexOf(target.span);
      if (response.status !== 200) {
        item.capture_state = 'INTAKE_FAILED__QUARANTINE';
        item.reason = `HTTP status ${response.status}`;
      } else if (item.supporting_text_offset_utf8 < 0) {
        item.capture_state = 'CAPTURED_TEXT_MISMATCH__QUARANTINE';
        item.reason = 'Required supporting text span was not found verbatim in raw payload.';
      } else {
        const fileName = `${target.id}.raw.html`;
        fs.writeFileSync(path.join(vault, fileName), body);
        item.raw_body_file = fileName;
        item.capture_state = 'EVIDENCE_COMPLETE_INTERNAL_HELD';
        item.candidate_status = 'NOT_A_CANDIDATE';
      }
    } catch (error) {
      item.completed_at_utc = new Date().toISOString();
      item.capture_state = 'INTAKE_FAILED__QUARANTINE';
      item.reason = error.message;
    }
    items.push(item);
  }

  const manifest = {
    manifest_id: 'JAYT-276-SCOPED-MICRO-CAPTURE',
    authorization: 'JAYT-276 — AUTHORIZATION OF SCOPED MICRO-CAPTURE FOR 3 LEAF-PAGES (BATCH 03B)',
    started_at_utc: startedAt.toISOString(), deadline_utc: deadline.toISOString(), finished_at_utc: new Date().toISOString(),
    controls: { max_targets: 3, single_get_per_target: true, redirects_followed: false, headers_redacted: true, collector_activated_for_other_targets: false, production_mutated: false, public_dom_mutated: false },
    summary: { authorized: 3, evidence_complete_internal_held: items.filter((x) => x.capture_state === 'EVIDENCE_COMPLETE_INTERNAL_HELD').length, quarantined: items.filter((x) => x.capture_state !== 'EVIDENCE_COMPLETE_INTERNAL_HELD').length, public_approved: 0 },
    items
  };
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(manifest.summary, null, 2));
}

main().catch((error) => { console.error(`JAYT_276_CAPTURE_ERROR: ${error.message}`); process.exit(1); });
