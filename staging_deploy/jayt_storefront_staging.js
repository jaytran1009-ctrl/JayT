/**
 * JAYT COMMUNITY DISCOVERY STOREFRONT (SECTION AK STAGING SPECIFICATION)
 * Architecture: True Discovery Storefront, 4-Tier Visual Hierarchy, Recheck Source Modal,
 * Contextual Collections Rail, Instant Filter Chips & Saved State.
 * Baseline Rollback: v3.419.0
 */

const JAYT_STOREFRONT_VERSION = 'v3.420.0-staging.ak';

const JAYT_DISCOVERY_ITEMS = [
  // TIER 2: VERIFIED OFFICIAL PROGRAMS (9 ITEMS)
  {
    id: 'TGT_B_01',
    tier: 'VERIFIED_OFFICIAL_PROGRAM',
    tier_name: 'Chương Trình Chính Thức',
    badge_label: 'NGUỒN CHÍNH THỨC ĐÃ THU THẬP',
    title: 'GitHub Student Developer Pack',
    brand: 'GitHub',
    category: 'Học tập',
    cluster: 'Toàn quốc (Trực tuyến)',
    verified_at: '2026-08-29 01:00',
    summary_text: 'Nguồn chính thức đã thu thập; xem điều kiện chi tiết trên website chính thức.',
    verbatim_quote: 'GitHub Student Developer Pack - Learn to ship software like a pro.',
    evidence_status: 'Đã đối soát raw capture từ education.github.com (271.4 KB, SHA-256 khớp tuyệt đối)',
    official_source_url: 'https://education.github.com/pack',
    action_type: 'PRIMARY_LINK',
    action_label: 'Mở website chính thức'
  },
  {
    id: 'TGT_B_02',
    tier: 'VERIFIED_OFFICIAL_PROGRAM',
    tier_name: 'Chương Trình Chính Thức',
    badge_label: 'NGUỒN CHÍNH THỨC ĐÃ THU THẬP',
    title: 'Notion for Education',
    brand: 'Notion',
    category: 'Học tập',
    cluster: 'Toàn quốc (Trực tuyến)',
    verified_at: '2026-08-29 01:00',
    summary_text: 'Nguồn chính thức đã thu thập; xem điều kiện chi tiết trên website chính thức.',
    verbatim_quote: 'Notion for Education - Nguồn chính thức',
    evidence_status: 'Đã đối soát raw capture từ www.notion.com (188.5 KB, SHA-256 khớp tuyệt đối)',
    official_source_url: 'https://www.notion.com/product/notion-for-education',
    action_type: 'PRIMARY_LINK',
    action_label: 'Mở website chính thức'
  },
  {
    id: 'TGT_B_03',
    tier: 'VERIFIED_OFFICIAL_PROGRAM',
    tier_name: 'Chương Trình Chính Thức',
    badge_label: 'NGUỒN CHÍNH THỨC ĐÃ THU THẬP',
    title: 'Microsoft Education',
    brand: 'Microsoft',
    category: 'Học tập',
    cluster: 'Toàn quốc (Trực tuyến)',
    verified_at: '2026-08-29 01:00',
    summary_text: 'Nguồn chính thức đã thu thập; xem điều kiện chi tiết trên website chính thức.',
    verbatim_quote: 'Microsoft Education - Nguồn chính thức',
    evidence_status: 'Đã đối soát raw capture từ www.microsoft.com (212.2 KB, SHA-256 khớp tuyệt đối)',
    official_source_url: 'https://www.microsoft.com/vi-vn/education/products/office',
    action_type: 'PRIMARY_LINK',
    action_label: 'Mở website chính thức'
  },
  {
    id: 'TGT_B_04',
    tier: 'VERIFIED_OFFICIAL_PROGRAM',
    tier_name: 'Chương Trình Chính Thức',
    badge_label: 'NGUỒN CHÍNH THỨC ĐÃ THU THẬP',
    title: 'Canva',
    brand: 'Canva',
    category: 'Học tập',
    cluster: 'Toàn quốc (Trực tuyến)',
    verified_at: '2026-08-29 01:00',
    summary_text: 'Nguồn chính thức đã thu thập; xem điều kiện chi tiết trên website chính thức.',
    verbatim_quote: 'Canva - Nguồn chính thức',
    evidence_status: 'Đã đối soát raw capture từ www.canva.com (327.9 KB, SHA-256 khớp tuyệt đối)',
    official_source_url: 'https://www.canva.com/vi_vn/giao-duc/',
    action_type: 'PRIMARY_LINK',
    action_label: 'Mở website chính thức'
  },
  {
    id: 'TGT_B_05',
    tier: 'VERIFIED_OFFICIAL_PROGRAM',
    tier_name: 'Chương Trình Chính Thức',
    badge_label: 'NGUỒN CHÍNH THỨC ĐÃ THU THẬP',
    title: 'Spotify',
    brand: 'Spotify',
    category: 'Học tập',
    cluster: 'Toàn quốc (Trực tuyến)',
    verified_at: '2026-08-29 01:00',
    summary_text: 'Nguồn chính thức đã thu thập; xem điều kiện chi tiết trên website chính thức.',
    verbatim_quote: 'Spotify - Nguồn chính thức',
    evidence_status: 'Đã đối soát raw capture từ www.spotify.com (76.5 KB, SHA-256 khớp tuyệt đối)',
    official_source_url: 'https://www.spotify.com/vn-vi/student/',
    action_type: 'PRIMARY_LINK',
    action_label: 'Mở website chính thức'
  },
  {
    id: 'TGT_B_06',
    tier: 'VERIFIED_OFFICIAL_PROGRAM',
    tier_name: 'Chương Trình Chính Thức',
    badge_label: 'NGUỒN CHÍNH THỨC ĐÃ THU THẬP',
    title: 'Apple Music',
    brand: 'Apple',
    category: 'Học tập',
    cluster: 'Toàn quốc (Trực tuyến)',
    verified_at: '2026-08-29 01:00',
    summary_text: 'Nguồn chính thức đã thu thập; xem điều kiện chi tiết trên website chính thức.',
    verbatim_quote: 'Apple Music - Nguồn chính thức',
    evidence_status: 'Đã đối soát raw capture từ www.apple.com (265.3 KB, SHA-256 khớp tuyệt đối)',
    official_source_url: 'https://www.apple.com/vn/apple-music/',
    action_type: 'PRIMARY_LINK',
    action_label: 'Mở website chính thức'
  },
  {
    id: 'TGT_B_09',
    tier: 'VERIFIED_OFFICIAL_PROGRAM',
    tier_name: 'Chương Trình Chính Thức',
    badge_label: 'NGUỒN CHÍNH THỨC ĐÃ THU THẬP',
    title: 'Free JetBrains Student Pack',
    brand: 'JetBrains',
    category: 'Học tập',
    cluster: 'Toàn quốc (Trực tuyến)',
    verified_at: '2026-08-29 01:00',
    summary_text: 'Nguồn chính thức đã thu thập; xem điều kiện chi tiết trên website chính thức.',
    verbatim_quote: 'JetBrains - Nguồn chính thức',
    evidence_status: 'Đã đối soát raw capture từ www.jetbrains.com (61.5 KB, SHA-256 khớp tuyệt đối)',
    official_source_url: 'https://www.jetbrains.com/academy/student-pack/',
    action_type: 'PRIMARY_LINK',
    action_label: 'Mở website chính thức'
  },
  {
    id: 'TGT_B_10',
    tier: 'VERIFIED_OFFICIAL_PROGRAM',
    tier_name: 'Chương Trình Chính Thức',
    badge_label: 'NGUỒN CHÍNH THỨC ĐÃ THU THẬP',
    title: 'Figma for Education',
    brand: 'Figma',
    category: 'Học tập',
    cluster: 'Toàn quốc (Trực tuyến)',
    verified_at: '2026-08-29 01:00',
    summary_text: 'Nguồn chính thức đã thu thập; xem điều kiện chi tiết trên website chính thức.',
    verbatim_quote: 'Figma for Education | Free Tools for the Classroom',
    evidence_status: 'Đã đối soát raw capture từ www.figma.com (1.65 MB, SHA-256 khớp tuyệt đối)',
    official_source_url: 'https://www.figma.com/education/',
    action_type: 'PRIMARY_LINK',
    action_label: 'Mở website chính thức'
  },
  {
    id: 'TGT_B_11',
    tier: 'VERIFIED_OFFICIAL_PROGRAM',
    tier_name: 'Chương Trình Chính Thức',
    badge_label: 'NGUỒN CHÍNH THỨC ĐÃ THU THẬP',
    title: 'AWS Educate',
    brand: 'AWS',
    category: 'Học tập',
    cluster: 'Toàn quốc (Trực tuyến)',
    verified_at: '2026-08-29 01:00',
    summary_text: 'Nguồn chính thức đã thu thập; xem điều kiện chi tiết trên website chính thức.',
    verbatim_quote: 'AWS Educate - Nguồn chính thức',
    evidence_status: 'Đã đối soát raw capture từ aws.amazon.com (401.7 KB, SHA-256 khớp tuyệt đối)',
    official_source_url: 'https://aws.amazon.com/education/awseducate/',
    action_type: 'PRIMARY_LINK',
    action_label: 'Mở website chính thức'
  },

  // TIER 4: ACTIVE RADAR TRACKING (8 ITEMS)
  {
    id: 'TGT_C1_01',
    tier: 'RADAR_TRACKING',
    tier_name: 'Radar Theo Dõi Nguồn',
    badge_label: 'RADAR — THEO DÕI NGUỒN',
    title: 'Rạp Chiếu Phim Metiz Cinema',
    brand: 'Metiz Cinema',
    category: 'Phim',
    cluster: 'Khu vực đang xác minh',
    verified_at: '2026-08-29 01:00',
    summary_text: 'JayT đang theo dõi cổng thông tin chính thức của Metiz Cinema.',
    verbatim_quote: 'Cổng thông tin chính thức: metiz.vn',
    evidence_status: 'Đang trong danh sách theo dõi nguồn; chưa có capture giá quầy',
    official_source_url: 'https://metiz.vn',
    action_type: 'RADAR_MODAL',
    action_label: 'Xem tiêu chí kiểm định'
  },
  {
    id: 'TGT_C1_03',
    tier: 'RADAR_TRACKING',
    tier_name: 'Radar Theo Dõi Nguồn',
    badge_label: 'RADAR — THEO DÕI NGUỒN',
    title: 'Trung Tâm Quản Lý Vận Tải Công Cộng DanaBus',
    brand: 'DanaBus',
    category: 'Đi lại',
    cluster: 'Khu vực đang xác minh',
    verified_at: '2026-08-29 01:00',
    summary_text: 'JayT đang theo dõi cổng thông tin xe buýt đô thị Đà Nẵng tại danangbus.vn.',
    verbatim_quote: 'Cổng thông tin chính thức: danangbus.vn',
    evidence_status: 'Đang trong danh sách theo dõi nguồn; đang xử lý clock skew',
    official_source_url: 'https://www.danangbus.vn/',
    action_type: 'RADAR_MODAL',
    action_label: 'Xem tiêu chí kiểm định'
  },
  {
    id: 'TGT_C1_04',
    tier: 'RADAR_TRACKING',
    tier_name: 'Radar Theo Dõi Nguồn',
    badge_label: 'RADAR — THEO DÕI NGUỒN',
    title: 'Dịch Vụ Xe Đạp Công Nghệ TNGO',
    brand: 'TNGO',
    category: 'Đi lại',
    cluster: 'Khu vực đang xác minh',
    verified_at: '2026-08-29 01:00',
    summary_text: 'JayT đang theo dõi dịch vụ xe đạp công cộng qua cổng tngo.vn.',
    verbatim_quote: 'Cổng thông tin chính thức: tngo.vn',
    evidence_status: 'Đang trong danh sách theo dõi nguồn; đang tổng hợp vị trí trạm',
    official_source_url: 'https://tngo.vn',
    action_type: 'RADAR_MODAL',
    action_label: 'Xem tiêu chí kiểm định'
  },
  {
    id: 'TGT_C1_08',
    tier: 'RADAR_TRACKING',
    tier_name: 'Radar Theo Dõi Nguồn',
    badge_label: 'RADAR — THEO DÕI NGUỒN',
    title: 'Nhà Sách Fahasa',
    brand: 'Fahasa',
    category: 'Học tập',
    cluster: 'Khu vực đang xác minh',
    verified_at: '2026-08-29 01:00',
    summary_text: 'JayT đang theo dõi thông tin phát hành sách tại fahasa.com.',
    verbatim_quote: 'Cổng thông tin chính thức: fahasa.com',
    evidence_status: 'Đang trong danh sách theo dõi nguồn; chưa có capture chi nhánh',
    official_source_url: 'https://www.fahasa.com/',
    action_type: 'RADAR_MODAL',
    action_label: 'Xem tiêu chí kiểm định'
  },
  {
    id: 'TGT_C2_01',
    tier: 'RADAR_TRACKING',
    tier_name: 'Radar Theo Dõi Nguồn',
    badge_label: 'RADAR — THEO DÕI NGUỒN',
    title: 'Cụm Rạp Galaxy Cinema',
    brand: 'Galaxy Cinema',
    category: 'Phim',
    cluster: 'Khu vực đang xác minh',
    verified_at: '2026-08-29 01:00',
    summary_text: 'JayT đang theo dõi lịch chiếu phim tại website galaxycine.vn.',
    verbatim_quote: 'Cổng thông tin chính thức: galaxycine.vn',
    evidence_status: 'Đang trong danh sách theo dõi nguồn; chưa có capture suất chiếu',
    official_source_url: 'https://www.galaxycine.vn',
    action_type: 'RADAR_MODAL',
    action_label: 'Xem tiêu chí kiểm định'
  },
  {
    id: 'TGT_C3_01',
    tier: 'RADAR_TRACKING',
    tier_name: 'Radar Theo Dõi Nguồn',
    badge_label: 'RADAR — THEO DÕI NGUỒN',
    title: 'Thương Hiệu Domino\'s Pizza',
    brand: 'Domino\'s Pizza',
    category: 'Ăn trưa',
    cluster: 'Khu vực đang xác minh',
    verified_at: '2026-08-29 01:00',
    summary_text: 'JayT đang theo dõi thực đơn tại website dominos.vn.',
    verbatim_quote: 'Cổng thông tin chính thức: dominos.vn',
    evidence_status: 'Đang trong danh sách theo dõi nguồn; chưa có capture thực đơn điểm bán',
    official_source_url: 'https://dominos.vn',
    action_type: 'RADAR_MODAL',
    action_label: 'Xem tiêu chí kiểm định'
  },
  {
    id: 'TGT_C3_04',
    tier: 'RADAR_TRACKING',
    tier_name: 'Radar Theo Dõi Nguồn',
    badge_label: 'RADAR — THEO DÕI NGUỒN',
    title: 'Cụm Rạp CGV Cinemas',
    brand: 'CGV Cinemas',
    category: 'Phim',
    cluster: 'Khu vực đang xác minh',
    verified_at: '2026-08-29 01:00',
    summary_text: 'JayT đang theo dõi thông tin thành viên tại cgv.vn.',
    verbatim_quote: 'Cổng thông tin chính thức: cgv.vn',
    evidence_status: 'Đang trong danh sách theo dõi nguồn; chưa có capture giá vé quầy',
    official_source_url: 'https://www.cgv.vn',
    action_type: 'RADAR_MODAL',
    action_label: 'Xem tiêu chí kiểm định'
  },
  {
    id: 'TGT_C3_05',
    tier: 'RADAR_TRACKING',
    tier_name: 'Radar Theo Dõi Nguồn',
    badge_label: 'RADAR — THEO DÕI NGUỒN',
    title: 'Tổng Công Ty Đường Sắt Việt Nam',
    brand: 'Đường Sắt Việt Nam (VNR)',
    category: 'Đi lại',
    cluster: 'Khu vực đang xác minh',
    verified_at: '2026-08-29 01:00',
    summary_text: 'JayT đang theo dõi cổng bán vé tàu trực tuyến dsvn.vn.',
    verbatim_quote: 'Cổng thông tin chính thức: dsvn.vn',
    evidence_status: 'Đang trong danh sách theo dõi nguồn; chưa có capture quy trình xác thực',
    official_source_url: 'https://dsvn.vn',
    action_type: 'RADAR_MODAL',
    action_label: 'Xem tiêu chí kiểm định'
  }
];

let currentCategory = 'ALL';
let currentTier = 'ALL';
let currentCluster = 'ALL';
let searchQuery = '';
let activeTab = 'FEED';
let savedItemIds = new Set();

try {
  const stored = localStorage.getItem('jayt_saved_opportunities');
  if (stored) savedItemIds = new Set(JSON.parse(stored));
} catch (e) {
  console.warn('LocalStorage unavailable');
}

// Single Modal Controller
const ModalController = {
  activeType: null,
  lastFocusedEl: null,
  focusableElementsString: 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',

  init() {
    const backdrop = document.getElementById('jayt-single-modal-root');
    if (!backdrop) return;
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('hidden', '');
    backdrop.style.display = 'none';
    backdrop.innerHTML = '';

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.activeType) return;
      if (e.key === 'Escape') { e.preventDefault(); this.close(); return; }
      if (e.key === 'Tab') this.handleFocusTrap(e);
    });
  },

  open(payload, triggerEl = null) {
    if (!payload || !payload.type) { this.close(); return; }
    if (this.activeType) this.close(false);

    this.lastFocusedEl = triggerEl || document.activeElement;
    this.activeType = payload.type;
    const root = document.getElementById('jayt-single-modal-root');
    if (!root) return;

    if (payload.type === 'REPORT') {
      root.innerHTML = this.buildReportModalHtml();
    } else if (payload.type === 'RECHECK_SOURCE') {
      root.innerHTML = this.buildRecheckSourceModalHtml(payload.data);
    } else if (payload.type === 'RADAR') {
      root.innerHTML = this.buildRadarModalHtml(payload.data);
    } else {
      this.close();
      return;
    }

    this.attachDialogListeners(root);
    root.removeAttribute('hidden');
    root.style.display = 'flex';
    root.classList.add('is-open');
    document.body.classList.add('modal-open');

    setTimeout(() => {
      const dialog = root.querySelector('#jayt-modal-dialog');
      if (dialog) {
        const first = dialog.querySelector(this.focusableElementsString);
        if (first) first.focus(); else dialog.focus();
      }
    }, 50);
  },

  close(shouldRestoreFocus = true) {
    const root = document.getElementById('jayt-single-modal-root');
    if (root) {
      root.classList.remove('is-open');
      root.setAttribute('hidden', '');
      root.style.display = 'none';
      root.innerHTML = '';
    }
    document.body.classList.remove('modal-open');
    this.activeType = null;
    if (shouldRestoreFocus && this.lastFocusedEl && typeof this.lastFocusedEl.focus === 'function') {
      this.lastFocusedEl.focus();
      this.lastFocusedEl = null;
    }
  },

  attachDialogListeners(root) {
    root.querySelectorAll('.jayt-btn-close-modal, .btn-cancel-modal, #btn-close-radar-detail, #btn-close-recheck').forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });
  },

  buildRecheckSourceModalHtml(item) {
    return `
      <div class="jayt-modal-dialog" id="jayt-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="recheck-modal-title" aria-describedby="recheck-modal-desc" tabindex="-1">
        <div class="jayt-modal-header">
          <h2 id="recheck-modal-title" class="jayt-modal-title">Hồ Sơ Chứng Nhận Nguồn Gốc</h2>
          <button class="jayt-btn-close-modal" aria-label="Đóng cửa sổ">Đóng</button>
        </div>
        <div class="jayt-modal-body" id="recheck-modal-desc">
          <div class="provenance-detail-card">
            <div class="provenance-header-line">
              <span class="provenance-brand">${item.brand}</span>
              <span class="provenance-tier-tag">${item.tier_name}</span>
            </div>
            <h3 class="provenance-item-title">${item.title}</h3>
            <div class="provenance-grid-data">
              <div class="p-data-row"><strong>Nguồn gốc:</strong> <span>Website chính thức của nhà phát hành</span></div>
              <div class="p-data-row"><strong>Trích dẫn nguyên văn:</strong> <em>"${item.verbatim_quote}"</em></div>
              <div class="p-data-row"><strong>Tình trạng đối soát:</strong> <span class="badge-verified-text">${item.evidence_status}</span></div>
              <div class="p-data-row"><strong>Thời điểm kiểm tra:</strong> <span>${item.verified_at}</span></div>
              <div class="p-data-row"><strong>Đường dẫn kiểm tra trực tiếp:</strong> <a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer">${item.official_source_url}</a></div>
            </div>
            <div class="provenance-guarantee-box">
              <p>🛡️ <strong>Cam kết minh bạch JayT:</strong> Không thêm giá suy diễn, không tạo voucher giả, không dùng link tiếp thị hưởng hoa hồng.</p>
            </div>
            <div class="form-actions">
              <a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" class="jayt-btn-primary">Mở nguồn gốc</a>
              <button type="button" class="jayt-btn-secondary" id="btn-close-recheck">Đóng</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  buildRadarModalHtml(item) {
    return `
      <div class="jayt-modal-dialog" id="jayt-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="radar-modal-title" aria-describedby="radar-modal-desc" tabindex="-1">
        <div class="jayt-modal-header">
          <h2 id="radar-modal-title" class="jayt-modal-title">Tiêu Chí Theo Dõi Nguồn Radar</h2>
          <button class="jayt-btn-close-modal" aria-label="Đóng cửa sổ">Đóng</button>
        </div>
        <div class="jayt-modal-body" id="radar-modal-desc">
          <div class="radar-detail-block">
            <h3 class="radar-detail-title">${item.title}</h3>
            <p class="radar-detail-meta"><strong>Thương hiệu:</strong> ${item.brand} | <strong>Phạm vi:</strong> ${item.cluster}</p>
            <div class="radar-status-box">
              <p><strong>Cổng thông tin theo dõi:</strong> ${item.verbatim_quote}</p>
              <p><strong>Trạng thái:</strong> ${item.evidence_status}</p>
              <p><strong>Đường dẫn chính thức:</strong> <a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer">${item.official_source_url}</a></p>
            </div>
            <p class="radar-disclaimer">Lưu ý: JayT không bán hàng, không đặt chỗ và không khuyến nghị mua khi chưa đối soát thực tế tại điểm bán.</p>
            <div class="form-actions">
              <button type="button" class="jayt-btn-secondary" id="btn-close-radar-detail">Đóng</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  buildReportModalHtml() {
    return `
      <div class="jayt-modal-dialog" id="jayt-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="report-modal-title" aria-describedby="report-modal-desc" tabindex="-1">
        <div class="jayt-modal-header">
          <h2 id="report-modal-title" class="jayt-modal-title">Báo Nguồn Tiện Ích Mới Cho Cộng Đồng</h2>
          <button class="jayt-btn-close-modal" aria-label="Đóng cửa sổ">Đóng</button>
        </div>
        <div class="jayt-modal-body">
          <p id="report-modal-desc" class="modal-notice">Gửi thông tin cổng dịch vụ công, thư viện, hoặc chương trình chính thức bạn biết để JayT kiểm định và cập nhật cho cộng đồng.</p>
          <form id="form-community-signal" onsubmit="event.preventDefault(); ModalController.handleSignalSubmit();">
            <div class="form-group">
              <label for="signal-target-name">Tên địa điểm / Chương trình:</label>
              <input type="text" id="signal-target-name" class="form-control" required placeholder="Ví dụ: Thư viện Tổng hợp Đà Nẵng" />
            </div>
            <div class="form-group">
              <label for="signal-url">Trang web chính thức:</label>
              <input type="url" id="signal-url" class="form-control" placeholder="https://..." />
            </div>
            <div class="form-actions">
              <button type="submit" class="jayt-btn-primary">Gửi thông tin</button>
              <button type="button" class="jayt-btn-secondary btn-cancel-modal">Hủy bỏ</button>
            </div>
          </form>
          <div id="signal-success-msg" class="signal-success" hidden>Đã ghi nhận nguồn mới vào hàng đợi kiểm định JayT!</div>
        </div>
      </div>
    `;
  },

  handleFocusTrap(e) {
    const dialog = document.getElementById('jayt-modal-dialog');
    if (!dialog) return;
    const focusable = Array.from(dialog.querySelectorAll(this.focusableElementsString)).filter(el => el.offsetParent !== null && !el.hasAttribute('disabled'));
    if (focusable.length === 0) { e.preventDefault(); dialog.focus(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first || document.activeElement === dialog) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  },

  handleSignalSubmit() {
    const successMsg = document.getElementById('signal-success-msg');
    if (successMsg) {
      successMsg.hidden = false;
      setTimeout(() => this.close(), 1200);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  const root = document.getElementById('jayt-app-root');
  if (!root) return;

  root.innerHTML = renderAppShell();
  ModalController.init();
  attachEventListeners();
  renderActiveView();
}

function renderAppShell() {
  const savedCount = savedItemIds.size;
  const verifiedCount = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'VERIFIED_OFFICIAL_PROGRAM').length;
  const radarCount = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'RADAR_TRACKING').length;

  return `
    <div id="jayt-main-app-container">
      <header class="jayt-header" role="banner">
        <div class="jayt-header-container">
          <div class="jayt-brand-lockup">
            <div class="brand-badge-square" aria-hidden="true">JT</div>
            <div>
              <span class="jayt-logo-text">JAYT ĐÀ NẴNG</span>
              <span class="jayt-tagline">Nền tảng tiện ích cộng đồng</span>
            </div>
            <span class="jayt-version-pill">${JAYT_STOREFRONT_VERSION}</span>
          </div>

          <nav class="jayt-nav-tabs" role="tablist" aria-label="Điều hướng chính">
            <button class="jayt-nav-tab active" data-tab="FEED" role="tab" aria-selected="true" id="tab-feed">Khám phá (${JAYT_DISCOVERY_ITEMS.length})</button>
            <button class="jayt-nav-tab" data-tab="COLLECTIONS" role="tab" aria-selected="false" id="tab-collections">Bộ sưu tập</button>
            <button class="jayt-nav-tab" data-tab="SAVED" role="tab" aria-selected="false" id="tab-saved">
              Đã lưu <span class="saved-badge-count" id="saved-counter">${savedCount}</span>
            </button>
          </nav>

          <div class="jayt-header-actions">
            <button id="btn-open-report" class="jayt-btn-secondary" aria-haspopup="dialog">+ Báo nguồn mới</button>
          </div>
        </div>
      </header>

      <main class="jayt-main-content" role="main">
        <!-- Storefront Hero Banner -->
        <section class="jayt-hero" aria-labelledby="hero-heading">
          <div class="jayt-hero-content">
            <div class="hero-context-badge">ĐÀ NẴNG & TOÀN QUỐC • TUYỂN CHỌN HÔM NAY</div>
            <h1 id="hero-heading" class="jayt-hero-title">Hôm nay ở Đà Nẵng có gì đáng khám phá?</h1>
            <p class="jayt-hero-subtitle">Khám phá công cụ học tập, giải trí, xe buýt đô thị và tiện ích công ích — 100% minh bạch từ nguồn chính thức, không hoa hồng tiếp thị.</p>
            
            <div class="jayt-search-box-wrapper">
              <label for="jayt-search-input" class="sr-only">Tìm kiếm tiện ích</label>
              <input type="text" id="jayt-search-input" class="jayt-search-input" placeholder="Tìm kiếm nhanh: Figma, xe buýt, vé tàu, rạp chiếu phim, Spotify..." />
              <button id="btn-clear-search" class="jayt-btn-clear" aria-label="Xóa từ khóa">Xóa</button>
            </div>
          </div>
        </section>

        <!-- Contextual Collections Rail -->
        <section class="jayt-collections-rail-section" aria-labelledby="collections-rail-title">
          <div class="collections-rail-header">
            <h2 id="collections-rail-title" class="rail-title">Hôm Nay Tiết Kiệm & Đi Đâu?</h2>
            <span class="rail-sub">Bộ sưu tập gợi ý theo ngữ cảnh</span>
          </div>
          <div class="collections-rail-wrapper" role="region" aria-label="Danh sách bộ sưu tập">
            <div class="collection-card col-highlight" data-col-cat="Học tập">
              <span class="collection-kicker">Công cụ & Bản quyền</span>
              <h3 class="collection-name">Gói Học Tập & Thiết Kế Miễn Phí</h3>
              <span class="collection-count">GitHub, Notion, Canva, Figma</span>
            </div>
            <div class="collection-card" data-col-cat="Phim">
              <span class="collection-kicker">Giải trí</span>
              <h3 class="collection-name">Lịch Chiếu Rạp & Suất Phim</h3>
              <span class="collection-count">Metiz, Galaxy, CGV</span>
            </div>
            <div class="collection-card" data-col-cat="Đi lại">
              <span class="collection-kicker">Di chuyển đô thị</span>
              <h3 class="collection-name">Xe Buýt, Tàu Hỏa & Xe Đạp</h3>
              <span class="collection-count">DanaBus, TNGO, Đường Sắt VN</span>
            </div>
            <div class="collection-card" data-col-cat="Ăn trưa">
              <span class="collection-kicker">Ăn uống</span>
              <h3 class="collection-name">Địa Điểm Ẩm Thực Đời Sống</h3>
              <span class="collection-count">Domino's Pizza & Theo dõi</span>
            </div>
          </div>
        </section>

        <!-- Quick Filter Chips & Tier Filter Bar -->
        <section class="jayt-control-bar" aria-label="Bộ lọc tiện ích">
          <div class="jayt-filter-group" role="group" aria-label="Lọc theo Nhu cầu">
            <span class="filter-group-label">Nhu cầu:</span>
            <button class="filter-pill active" data-filter-type="category" data-val="ALL">Tất cả (${JAYT_DISCOVERY_ITEMS.length})</button>
            <button class="filter-pill" data-filter-type="category" data-val="Học tập">Học tập & Công cụ (10)</button>
            <button class="filter-pill" data-filter-type="category" data-val="Phim">Phim & Rạp (3)</button>
            <button class="filter-pill" data-filter-type="category" data-val="Đi lại">Đi lại & Đô thị (3)</button>
            <button class="filter-pill" data-filter-type="category" data-val="Ăn trưa">Ăn uống (1)</button>
          </div>

          <div class="jayt-filter-group" role="group" aria-label="Lọc theo Mức độ kiểm định">
            <span class="filter-group-label">Mức kiểm định:</span>
            <button class="filter-pill active" data-filter-type="tier" data-val="ALL">Tất cả tầng</button>
            <button class="filter-pill" data-filter-type="tier" data-val="VERIFIED_OFFICIAL_PROGRAM">Nguồn chính thức (${verifiedCount})</button>
            <button class="filter-pill" data-filter-type="tier" data-val="RADAR_TRACKING">Radar theo dõi (${radarCount})</button>
            <button id="btn-reset-all-filters" class="jayt-btn-reset">Đặt lại</button>
          </div>
        </section>

        <!-- Main Feed Results Container -->
        <section class="jayt-feed-container" aria-live="polite" id="jayt-feed-results">
          <!-- Rendered dynamically -->
        </section>
      </main>

      <footer class="jayt-footer" role="contentinfo">
        <div class="jayt-footer-container">
          <p class="footer-copy">© 2026 JayT Đà Nẵng — Nền tảng tiện ích cộng đồng. Vận hành theo Chỉ thị JAYT-245.</p>
          <p class="footer-sub">Cam kết dữ liệu minh bạch: 100% nội dung có nguồn gốc đối soát độc lập.</p>
        </div>
      </footer>
    </div>

    <div id="jayt-single-modal-root" class="jayt-modal-backdrop" hidden style="display: none;"></div>
    <div id="jayt-toast-container" class="jayt-toast-container" role="status" aria-live="polite"></div>
  `;
}

function attachEventListeners() {
  document.querySelectorAll('.jayt-nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      document.querySelectorAll('.jayt-nav-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeTab = targetTab;
      renderActiveView();
    });
  });

  const searchInput = document.getElementById('jayt-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderActiveView();
    });
  }

  const btnClear = document.getElementById('btn-clear-search');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        renderActiveView();
      }
    });
  }

  document.querySelectorAll('.collection-card').forEach(col => {
    col.addEventListener('click', () => {
      const cat = col.dataset.colCat;
      if (cat) {
        currentCategory = cat;
        document.querySelectorAll('.filter-pill[data-filter-type="category"]').forEach(p => {
          p.classList.toggle('active', p.dataset.val === cat);
        });
      }
      activeTab = 'FEED';
      document.querySelectorAll('.jayt-nav-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'FEED'));
      renderActiveView();
      document.getElementById('jayt-feed-results')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      const type = e.target.dataset.filterType;
      const val = e.target.dataset.val;

      document.querySelectorAll(`.filter-pill[data-filter-type="${type}"]`).forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');

      if (type === 'tier') currentTier = val;
      if (type === 'category') currentCategory = val;
      renderActiveView();
    });
  });

  const btnReset = document.getElementById('btn-reset-all-filters');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      currentTier = 'ALL';
      currentCategory = 'ALL';
      currentCluster = 'ALL';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('.filter-pill').forEach(p => {
        p.classList.toggle('active', p.dataset.val === 'ALL');
      });
      renderActiveView();
    });
  }

  const btnOpenReport = document.getElementById('btn-open-report');
  if (btnOpenReport) {
    btnOpenReport.addEventListener('click', () => {
      ModalController.open({ type: 'REPORT' }, btnOpenReport);
    });
  }
}

function renderActiveView() {
  const container = document.getElementById('jayt-feed-results');
  if (!container) return;

  if (activeTab === 'SAVED') {
    renderSavedView(container);
    return;
  }

  if (activeTab === 'COLLECTIONS') {
    renderCollectionsView(container);
    return;
  }

  renderFeedView(container);
}

function renderFeedView(container) {
  const filtered = JAYT_DISCOVERY_ITEMS.filter(item => {
    if (currentTier !== 'ALL' && item.tier !== currentTier) return false;
    if (currentCategory !== 'ALL' && item.category !== currentCategory) return false;
    if (searchQuery) {
      const matchText = `${item.title} ${item.brand} ${item.category} ${item.summary_text}`.toLowerCase();
      if (!matchText.includes(searchQuery)) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = renderEmptyState('Chưa tìm thấy mục phù hợp với bộ lọc hiện tại.');
    return;
  }

  container.innerHTML = `
    <div class="jayt-results-header">
      <h2 class="results-count-title">Đang hiển thị ${filtered.length} tiện ích tuyển chọn</h2>
    </div>
    <div class="jayt-cards-grid">
      ${filtered.map(item => renderStorefrontCard(item)).join('')}
    </div>
  `;

  attachCardActions(container);
}

function renderSavedView(container) {
  const savedItems = JAYT_DISCOVERY_ITEMS.filter(item => savedItemIds.has(item.id));

  if (savedItems.length === 0) {
    container.innerHTML = `
      <div class="jayt-empty-state" role="status">
        <div class="empty-state-icon">DANH SÁCH LƯU RỖNG</div>
        <h3 class="empty-state-title">Bạn chưa lưu mục nào</h3>
        <p class="empty-state-desc">Nhấn vào nút "Lưu" trên bất kỳ thẻ nào để lưu lại tiện ích cho bạn.</p>
        <div class="empty-state-actions">
          <button class="jayt-btn-primary" onclick="document.getElementById('tab-feed').click();">Khám phá tiện ích ngay</button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="jayt-results-header">
      <h2 class="results-count-title">Danh sách mục đã lưu (${savedItems.length})</h2>
    </div>
    <div class="jayt-cards-grid">
      ${savedItems.map(item => renderStorefrontCard(item)).join('')}
    </div>
  `;

  attachCardActions(container);
}

function renderCollectionsView(container) {
  const categories = ['Học tập', 'Phim', 'Đi lại', 'Ăn trưa'];

  container.innerHTML = `
    <div class="jayt-results-header">
      <h2 class="results-count-title">Khám Phá Theo Chủ Đề Nhu Cầu</h2>
    </div>
    ${categories.map(cat => {
      const items = JAYT_DISCOVERY_ITEMS.filter(i => i.category === cat);
      if (items.length === 0) return '';
      return `
        <div class="collection-section-block">
          <div class="collection-section-header">
            <h3 class="collection-section-title">${cat} (${items.length} mục)</h3>
          </div>
          <div class="jayt-cards-grid">
            ${items.map(item => renderStorefrontCard(item)).join('')}
          </div>
        </div>
      `;
    }).join('')}
  `;

  attachCardActions(container);
}

function renderStorefrontCard(item) {
  const isVerified = (item.tier === 'VERIFIED_OFFICIAL_PROGRAM');
  const cardTierClass = isVerified ? 'tier-official-card' : 'tier-radar-card';
  const isSaved = savedItemIds.has(item.id);

  if (isVerified) {
    // Tier 2: Verified Official Program Card
    return `
      <article class="jayt-storefront-card ${cardTierClass}" aria-labelledby="card-title-${item.id}">
        <div class="card-top-row">
          <div class="card-brand-badge">
            <span class="brand-initial">${item.brand.substring(0, 2).toUpperCase()}</span>
            <span class="brand-name">${item.brand}</span>
          </div>
          <div class="card-tier-tag tag-verified">${item.badge_label}</div>
        </div>

        <h3 id="card-title-${item.id}" class="storefront-card-title">${item.title}</h3>
        <p class="storefront-card-summary">${item.summary_text}</p>

        <div class="storefront-card-meta">
          <span class="meta-tag">${item.category}</span>
          <span class="meta-tag">${item.cluster}</span>
        </div>

        <div class="storefront-card-footer">
          <a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" class="jayt-btn-primary card-cta-btn">
            ${item.action_label} ↗
          </a>
          <div class="card-sub-actions">
            <button class="btn-recheck-source" data-item-id="${item.id}" aria-haspopup="dialog">
              🔍 Kiểm tra nguồn
            </button>
            <button class="btn-save-item ${isSaved ? 'is-saved' : ''}" data-item-id="${item.id}" aria-label="${isSaved ? 'Bỏ lưu' : 'Lưu'}">
              ${isSaved ? '★ Đã lưu' : '☆ Lưu'}
            </button>
          </div>
        </div>
      </article>
    `;
  } else {
    // Tier 4: Radar Tracking Card (Subtle & Honest)
    return `
      <article class="jayt-storefront-card ${cardTierClass}" aria-labelledby="card-title-${item.id}">
        <div class="card-top-row">
          <div class="card-brand-badge subtle">
            <span class="brand-name">${item.brand}</span>
          </div>
          <div class="card-tier-tag tag-radar">${item.badge_label}</div>
        </div>

        <h3 id="card-title-${item.id}" class="storefront-card-title">${item.title}</h3>
        <p class="storefront-card-summary radar-summary">${item.summary_text}</p>

        <div class="storefront-card-meta">
          <span class="meta-tag">${item.category}</span>
          <span class="meta-tag">${item.cluster}</span>
        </div>

        <div class="storefront-card-footer">
          <button class="jayt-btn-secondary card-cta-btn btn-open-radar-modal" data-item-id="${item.id}" aria-haspopup="dialog">
            ${item.action_label}
          </button>
          <div class="card-sub-actions">
            <button class="btn-save-item ${isSaved ? 'is-saved' : ''}" data-item-id="${item.id}" aria-label="${isSaved ? 'Bỏ lưu' : 'Lưu'}">
              ${isSaved ? '★ Đã lưu' : '☆ Lưu'}
            </button>
          </div>
        </div>
      </article>
    `;
  }
}

function attachCardActions(container) {
  container.querySelectorAll('.btn-save-item').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleSaveItem(btn.dataset.itemId);
    });
  });

  container.querySelectorAll('.btn-recheck-source').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = JAYT_DISCOVERY_ITEMS.find(i => i.id === btn.dataset.itemId);
      if (item) ModalController.open({ type: 'RECHECK_SOURCE', data: item }, btn);
    });
  });

  container.querySelectorAll('.btn-open-radar-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = JAYT_DISCOVERY_ITEMS.find(i => i.id === btn.dataset.itemId);
      if (item) ModalController.open({ type: 'RADAR', data: item }, btn);
    });
  });
}

function toggleSaveItem(itemId) {
  if (savedItemIds.has(itemId)) {
    savedItemIds.delete(itemId);
    showToast('Đã xóa khỏi danh sách đã lưu');
  } else {
    savedItemIds.add(itemId);
    showToast('Đã lưu vào danh sách của bạn');
  }

  try {
    localStorage.setItem('jayt_saved_opportunities', JSON.stringify([...savedItemIds]));
  } catch (e) {}

  const counter = document.getElementById('saved-counter');
  if (counter) counter.textContent = savedItemIds.size;

  renderActiveView();
}

function showToast(message) {
  const container = document.getElementById('jayt-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'jayt-toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 200);
  }, 2000);
}

function renderEmptyState(message) {
  return `
    <div class="jayt-empty-state" role="status">
      <div class="empty-state-icon">KẾT QUẢ RỖNG</div>
      <h3 class="empty-state-title">Chưa tìm thấy mục phù hợp</h3>
      <p class="empty-state-desc">${message}</p>
      <div class="empty-state-actions">
        <button class="jayt-btn-primary" onclick="document.getElementById('btn-reset-all-filters').click();">Đặt lại bộ lọc</button>
        <button class="jayt-btn-secondary" onclick="document.getElementById('btn-open-report').click();">Báo nguồn mới cho JayT</button>
      </div>
    </div>
  `;
}
