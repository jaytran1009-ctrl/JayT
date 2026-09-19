/* JAYT-275 static research output. This script performs no network I/O or capture. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ledger = JSON.parse(fs.readFileSync(path.join(root, 'JAYT_BATCH_03_READINESS_LEDGER.json'), 'utf8'));
const output = path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_BATCH_03B_LEAF_PAGE_PROPOSALS.json');

const researched = {
  BATCH03_HK_04: {
    proposed_leaf_url: 'https://ued.udn.vn/2025/02/18/thong-bao-ve-hoc-bong-ho-tro-sinh-vien-nghien-cuu-khoa-hoc-nam-2025/',
    source_date: '2025-02-18',
    supporting_text_span: 'Thông báo về Học bổng hỗ trợ sinh viên nghiên cứu khoa học năm 2025.',
    rationale: 'Official UED leaf-page candidate that directly names a 2025 student-support program.'
  },
  BATCH03_HC_07: {
    proposed_leaf_url: 'https://www.danang.gov.vn/vi/web/dng/w/to-chuc-phun-nuoc-phun-lua-cau-rong-va-quay-nhip-cau-song-han-phuc-vu-tet-nguyen-dan-binh-ngo-2026',
    source_date: '2026-02-03',
    supporting_text_span: 'Tổ chức phun nước, phun lửa cầu Rồng và quay nhịp cầu sông Hàn phục vụ Tết Nguyên đán Bính Ngọ 2026.',
    rationale: 'Official municipal leaf page with a dated 2026 notice for the specific Dragon Bridge activity.'
  },
  BATCH03_DS_07: {
    proposed_leaf_url: 'https://www.danangbus.vn/tin-tuc/tin-tuc/danabus--nguoi-ban-dong-hanh-thong-minh-cua-hanh-khach-xe-buyt-da-nang-5727.html',
    source_date: '2026-06-26',
    supporting_text_span: 'DanaBus hiển thị vị trí của xe trên bản đồ, giúp hành khách chủ động hơn trong việc sắp xếp thời gian di chuyển.',
    rationale: 'Official DanaBus 2026 leaf page that directly describes the proposed route-information application.'
  }
};

const proposals = ledger.proposals.map((item) => {
  const found = researched[item.target_id];
  return {
    target_id: item.target_id,
    cluster: item.cluster,
    community_need: item.community_need,
    original_url_rejected: item.source_url_placeholder,
    proposal_state: found ? 'LEAF_PAGE_PROPOSED__AWAITING_CEO_CAPTURE_AUTHORIZATION' : 'NO_CURRENT_LEAF_PAGE_PROPOSAL__HELD_FOR_RESEARCH',
    proposed_leaf_url: found ? found.proposed_leaf_url : null,
    source_date: found ? found.source_date : null,
    supporting_text_span: found ? found.supporting_text_span : null,
    rationale: found ? found.rationale : 'No official 2025–2026 leaf page meeting the identity, recency, and supporting-text requirements was proposed in this research pass.',
    capture_authorized: false,
    candidate_status: 'NOT_A_CANDIDATE',
    public_approved: false,
    render_permitted: false
  };
});

const document = {
  document_id: 'JAYT-275-BATCH03B-LEAF-PAGE-PROPOSALS',
  governing_order: 'JAYT-275 — LEAF-PAGE SOURCING PROTOCOL & BATCH 03B PROPOSAL STANDARDIZATION',
  scope: 'STATIC_PROPOSAL_LIST_ONLY',
  generated_at_utc: new Date().toISOString(),
  methodology: {
    excluded: ['homepages', 'HTTP-200 error pages', 'pre-2024 archives', 'sources without text that identifies the proposed utility'],
    included_only_when: ['official source domain', '2025-2026 dated leaf page', 'supporting text names the relevant utility'],
    no_network_capture_performed: true,
    no_runner_or_collector_activation: true
  },
  summary: {
    reviewed: proposals.length,
    leaf_pages_proposed: proposals.filter((p) => p.proposed_leaf_url).length,
    held_for_research: proposals.filter((p) => !p.proposed_leaf_url).length,
    public_approved: 0
  },
  proposals
};

fs.writeFileSync(output, `${JSON.stringify(document, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(document.summary, null, 2));
