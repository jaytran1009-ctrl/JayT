/**
 * JAYT STOREFRONT STAGING SOURCE OF TRUTH (SECTION EZ-V)
 * Production release version: v3.420.0
 * Governing Directive: JAYT-245 Section EZ-V (Lines 4475-4539)
 * Port: 4173
 * Containment Invariant: External links are limited to individually CEO-approved official sources.
 * Containment Invariant: 0 Unverified Radar / Merchant / Locality Cards
 * Containment Invariant: 0 "Nguồn chính thức" Labels outside Approved Pilot
 * Containment Invariant: 100% Local-First Savings Lab (Zero Tracking, Zero Network Calls, Zero Commercial Prefills, Transparent Limitation Notice)
 * Containment Invariant: Safe Read-Only "+ Báo nguồn" Modal (Zero PII, Zero Network)
 * Strategic Focus: Commercial JTBD Map, Voucher Evidence Pipeline, Local-First Savings Lab
 */
(function(root) {
  'use strict';

  // FEATURE FLAGS (SECTION EZ-V)
  const FEATURE_FLAGS = {
    T2_DOCUMENTATION_PILOT_ENABLED: true,
    ECONOMIC_CLAIMS_PUBLIC: false,
    AFFILIATE_ACTIVATION: false,
    DEEP_LINKS_ENABLED: false,
    LOGIN_AUTH_ENABLED: false
  };

  // STRICT DATA-BOUNDARY PUBLIC REGISTRY (MANDATE EZ-V.1)
  const APPROVED_PUBLIC_ENTRIES = [
    {
      card_id: "FACT_EZ_G_01_GITHUB_DOCS_ELIGIBILITY",
      public_eligible: true,
      evidence_contract_v3_status: "PUBLISHABLE_DOCUMENTATION_CANDIDATE",
      source_identity_proof: "PROVEN_OFFICIAL_GLOBAL_DOCUMENTATION",
      exact_approved_copy: "Theo tài liệu chính thức của GitHub, người học hoặc giảng viên tại một cơ sở giáo dục được công nhận có thể nộp đơn đăng ký GitHub Education.",
      exact_approved_title: "GitHub Education — Thông tin đăng ký",
      scope_caveat: "Phạm vi: chương trình toàn cầu; điều kiện và quyền lợi áp dụng do GitHub quyết định. JayT không xác nhận voucher, giá hay ưu đãi tại Đà Nẵng.",
      safe_canonical_action: {
        url: "https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students",
        label: "Mở tài liệu chính thức ↗",
        rel: "noopener noreferrer nofollow"
      },
      ceo_approval_id: "CEO_DIRECTIVE_EZ_H"
    },
    {
      card_id: "BATCH03_DS_07_DANABUS_INFORMATION", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "DanaBus hiển thị vị trí của xe trên bản đồ, giúp hành khách chủ động hơn trong việc sắp xếp thời gian di chuyển.",
      exact_approved_title: "DanaBus — Thông tin xe buýt Đà Nẵng",
      scope_caveat: "Phạm vi: thông tin tiện ích công cộng theo bài viết DanaBus ngày 26/06/2026. Hãy kiểm tra điều kiện vận hành tại nguồn; JayT không xác nhận giá vé, thời gian đến trạm hay khả dụng thực tế.",
      safe_canonical_action: { url: "https://www.danangbus.vn/tin-tuc/tin-tuc/danabus--nguoi-ban-dong-hanh-thong-minh-cua-hanh-khach-xe-buyt-da-nang-5727.html", label: "Mở nguồn DanaBus chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "JAYT-285-CEO-ITEM-DS07"
    },
    {
      card_id: "J287_HK_STUDENT_POLICY_UED_20260903", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "UED hướng dẫn thủ tục cho các nhóm chế độ chính sách của sinh viên, gồm miễn giảm học phí, hỗ trợ chi phí học tập, trợ cấp xã hội và hỗ trợ học tập.",
      exact_approved_title: "UED — Hướng dẫn chế độ chính sách sinh viên",
      scope_caveat: "Thông tin thủ tục theo bài đăng UED ngày 03/09/2026. Điều kiện cá nhân, hồ sơ và thời hạn do UED công bố; JayT không xác nhận quyền lợi hay thời điểm tiếp nhận của từng người.",
      safe_canonical_action: { url: "https://ued.udn.vn/2026/09/03/huong-dan-thuc-hien-thu-tuc-cac-che-do-chinh-sach-3/", label: "Mở nguồn UED chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "JAYT-288-CEO-ITEM-UED-POLICY"
    }
  ];

  // LEGACY RADAR DATASET QUARANTINED
  const JAYT_DISCOVERY_ITEMS = [];

  const RUNTIME_FINGERPRINT = {
    ledger_version: 'v3.420.0',
    ledger_sha256: '8286f539eb5f5e1432d516bcad92f3fdf4f8b71c2ac8bb3adcaa3b0050036475',
    counts: {
      an_gi: 0,
      di_dau: 0,
      tien_ich: 0,
      mua_sam_hoc_tap: 0,
      total_public: 1,
      vouchers: 0,
      approved_pilots: 3
    }
  };

  // CONTROLLED T2 PILOT CARD COMPONENT
  function renderT2DocumentationPilotCard() {
    if (!FEATURE_FLAGS.T2_DOCUMENTATION_PILOT_ENABLED) return '';
    const pilot = APPROVED_PUBLIC_ENTRIES[0];
    if (!pilot || !pilot.public_eligible || pilot.evidence_contract_v3_status !== 'PUBLISHABLE_DOCUMENTATION_CANDIDATE') return '';

    return `
      <section class="t2-pilot-card-section" style="margin: 24px 0; background: var(--bg-card); border: 2px solid #0284c7; border-radius: 14px; padding: 20px; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.08);" aria-label="Thí điểm đối soát: Chương trình chính thức T2">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: rgba(2, 132, 199, 0.12); color: #0284c7; padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 800; letter-spacing: 0.3px;">🛡️ T2 • TÀI LIỆU CHƯƠNG TRÌNH CHÍNH THỨC</span>
            <span style="font-size: 0.75rem; color: var(--text-muted); background: var(--bg-card-subtle); padding: 2px 8px; border-radius: 4px;">STAGING PILOT EZ-H</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-secondary);">🔄 Đối soát định kỳ: 30 ngày</span>
        </div>

        <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 10px 0;">${pilot.exact_approved_title}</h2>

        <p style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.55; margin-bottom: 14px; font-weight: 500;">
          ${pilot.exact_approved_copy}
        </p>

        <div style="background: var(--bg-card-subtle); border-left: 4px solid #0284c7; padding: 12px 14px; border-radius: 6px; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
          <strong>Phạm vi:</strong> ${pilot.scope_caveat.replace('Phạm vi: ', '')}
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <a href="${pilot.safe_canonical_action.url}" target="_blank" rel="${pilot.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" style="background: #0369a1; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; min-height: 44px; display: inline-flex; align-items: center; gap: 6px;" aria-label="Mở tài liệu chính thức GitHub Education trong tab mới">
            ${pilot.safe_canonical_action.label}
          </a>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">
            Evidence ID: ${pilot.card_id}
          </div>
        </div>
      </section>
    `;
  }

  function renderDanaBusPublicCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'BATCH03_DS_07_DANABUS_INFORMATION');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0f766e;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(15,118,110,.08);" aria-label="Tiện ích công cộng DanaBus đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(15,118,110,.12);color:#0f766e;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🚌 T3 • TIỆN ÍCH CÔNG CỘNG</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0f766e;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" style="background:#0f766e;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:700;font-size:.9rem;min-height:44px;display:inline-flex;align-items:center;" aria-label="Mở nguồn DanaBus chính thức trong tab mới">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-muted);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderUedStudentPolicyCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'J287_HK_STUDENT_POLICY_UED_20260903');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #7c3aed;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(124,58,237,.08);" aria-label="Hướng dẫn chính sách sinh viên UED đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(124,58,237,.12);color:#6d28d9;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🎓 T2 • THÔNG TIN SINH VIÊN</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #7c3aed;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" style="background:#6d28d9;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:700;font-size:.9rem;min-height:44px;display:inline-flex;align-items:center;" aria-label="Mở nguồn UED chính thức trong tab mới">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-muted);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  // TRANSPARENT ZERO-STATE COMPONENT
  function renderNeutralZeroState() {
    return `
      <section class="zero-state-neutral-provenance" style="background: var(--bg-card); border: 1px dashed var(--border-subtle); border-radius: 14px; padding: 36px 24px; text-align: center; margin: 24px 0;" aria-label="Khu vực Đang Kiểm Định Nguồn">
        <div style="font-size: 2.2rem; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">Khu Vực Đang Kiểm Định Nguồn</h3>
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; max-width: 620px; margin: 0 auto 20px auto;">
          JayT đang kiểm định độc lập từng nguồn tài liệu theo Evidence Contract v3 trước khi công bố. Hiện chưa có nguồn mới đạt chuẩn công bố công khai.
        </p>
        <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
          <button class="btn-zero-action" data-nav="BUY_DECISION" style="background: #0369a1; color: #ffffff; border: none; padding: 10px 20px; min-height: 44px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" aria-label="Mở Bảng tính thực trả của bạn">
            🧮 Tự tính thực trả (Savings Lab) &rarr;
          </button>
          <button class="btn-zero-action" data-nav="EXPLORE" style="background: var(--bg-card-subtle); color: var(--text-primary); border: 1px solid var(--border-subtle); padding: 10px 20px; min-height: 44px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" aria-label="Xem tài liệu GitHub Education đã đối soát">
            🛡️ Tài liệu đã đối soát (GitHub Pilot)
          </button>
        </div>
      </section>
    `;
  }

  // 1. HOME VIEW
  function renderDailyGuideHome() {
    return `
      <div class="cr-experience-container">
        <div class="bento-hero-grid" aria-label="Bảng Điều Khiển Khám Phá Hôm Nay">
          <section class="bento-tile-main-stage hero-landmark-cr vivid-dragon-hero-cf" aria-label="Bìa Khám Phá Tiện Ích">
            <img 
              src="assets/images/board_a_afterglow_hero.svg" 
              alt="Đồ họa minh họa JayT Platform" 
              class="bento-stage-bg-img hero-landmark-img vivid-hero-image" 
              id="hero-main-photo"
              loading="eager"
            />
            <div class="bento-stage-gradient hero-landmark-gradient"></div>

            <div class="hero-landmark-attribution" role="note" aria-label="Thông tin bản quyền đồ họa JayT">
              🎨 Đồ họa JayT
            </div>

            <div class="bento-stage-content hero-landmark-content">
              <span class="hero-moment-pill">✨ MINH BẠCH &bull; ĐỐI SOÁT NGUỒN GỐC</span>
              <h1 class="hero-headline-cr vivid-main-title">
                Hôm Nay Bạn Cần Tìm Gì?
              </h1>
              <p class="hero-subhead-cr vivid-subhead">
                Cổng tra cứu thông tin tiện ích công cộng, học đường và công cụ tự tính toán chi phí thực tế &mdash; phân loại minh bạch, đối soát nguồn gốc.
              </p>

              <div class="hero-shopping-actions-grid">
                <button class="btn-hero-primary-solid" data-nav="EXPLORE" aria-label="Khám phá danh mục tài liệu đã đối soát">
                  🛡️ Danh mục đã đối soát &rarr;
                </button>
                <button class="btn-hero-secondary-outline" data-nav="BUY_DECISION" aria-label="Mở Bảng tính thực trả Local-First">
                  🧮 Bảng tính thực trả &rarr;
                </button>
              </div>
            </div>
          </section>

          <div class="bento-side-column">
            <div class="bento-tile-moment">
              <div class="bento-moment-header">
                <span class="bento-moment-badge">🛡️ Trạng thái Staging</span>
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 700; margin: 8px 0 4px 0;">Đối Soát Nguồn Gốc</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.45;">
                Toàn bộ nguồn đang được kiểm định độc lập theo Evidence Contract v3 trước khi công bố.
              </p>
            </div>

            <div class="bento-tile-dock">
              <span class="dock-badge">⚡ TRUY CẬP NHANH</span>
              <h3 style="font-size: 1.05rem; font-weight: 700; margin: 4px 0 8px 0;">Công Cụ Tiện Ích</h3>
              <div class="bento-dock-row">
                <button class="bento-dock-btn" data-nav="BUY_DECISION" aria-label="Mở Bảng tính thực trả">
                  <span class="bento-dock-icon">🧮</span>
                  <span>Bảng Tính</span>
                </button>
                <button class="bento-dock-btn" data-nav="EXPLORE" aria-label="Mở mục đối soát">
                  <span class="bento-dock-icon">🛡️</span>
                  <span>Đối Soát</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        ${renderT2DocumentationPilotCard()}
        ${renderDanaBusPublicCard()}
        ${renderUedStudentPolicyCard()}
        ${renderNeutralZeroState()}
      </div>
    `;
  }

  // 2. EXPLORE & WALLET & JOURNEY VIEWS
  function renderExploreView() {
    return `
      <div class="cr-experience-container">
        <header style="margin: 20px 0 10px 0;">
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">
            🛡️ Danh Mục Tài Liệu &amp; Tiện Ích Đã Đối Soát
          </h1>
          <p style="font-size: 0.92rem; color: var(--text-secondary);">
            Chỉ hiển thị các tài liệu đã đạt chuẩn Evidence Contract v3 và được phê duyệt chính thức.
          </p>
        </header>

        ${renderT2DocumentationPilotCard()}
        ${renderDanaBusPublicCard()}
        ${renderUedStudentPolicyCard()}
        ${renderNeutralZeroState()}
      </div>
    `;
  }

  function renderWalletView() {
    return renderExploreView();
  }

  function renderVoucherHub() {
    return `
      <div class="cr-experience-container">
        <header style="margin: 20px 0 10px 0;">
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">
            🎟️ Trung Tâm Tra Cứu Ưu Đãi &amp; Voucher (0 mục)
          </h1>
          <p style="font-size: 0.92rem; color: var(--text-secondary);">
            Hiện không có voucher thương mại nào được kích hoạt. Toàn bộ tính năng thương mại đang khóa an toàn.
          </p>
        </header>
        ${renderNeutralZeroState()}
      </div>
    `;
  }

  // 3. STREAM A: LOCAL-FIRST SAVINGS LAB V2 (SECTION EZ-AD ENHANCEMENTS)
  function renderSavingsLabView() {
    return `
      <div class="cr-experience-container">
        <header style="margin: 20px 0 16px 0;">
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">
            🧮 Bảng Tính Thực Trả &mdash; Savings Lab v2 (Local-First)
          </h1>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
            Công cụ tự tính toán chi phí giỏ hàng, ưu đãi và chia tiền nhóm &mdash; 100% xử lý tại trình duyệt của bạn, không gửi dữ liệu qua mạng, không thu thập PII.
          </p>
        </header>

        <!-- Presets Selection (EZ-AD Empty Presets) -->
        <div style="display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;" role="group" aria-label="Lựa chọn chế độ tính toán">
          <button id="preset-solo" class="btn-preset-mode active" style="padding: 8px 16px; border: 1px solid #0284c7; background: rgba(2, 132, 199, 0.08); color: #0284c7; border-radius: 8px; font-weight: 700; font-size: 0.88rem; cursor: pointer;" aria-pressed="true">
            👤 Mua Sắm Cá Nhân (Solo)
          </button>
          <button id="preset-group" class="btn-preset-mode" style="padding: 8px 16px; border: 1px solid var(--border-subtle); background: var(--bg-card-subtle); color: var(--text-secondary); border-radius: 8px; font-weight: 600; font-size: 0.88rem; cursor: pointer;" aria-pressed="false">
            👥 Mua Sắm / Đi Lại Nhóm (Group Split)
          </button>
        </div>

        <section class="calculator-card-section" style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 24px; box-shadow: 0 4px 14px rgba(0,0,0,0.04); margin-bottom: 24px;" aria-label="Bảng tính giỏ hàng thực tế v2">
          <form id="savings-calc-form" onsubmit="return false;" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 20px;">
            <div>
              <label for="calc-item-price" style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">
                Giá niêm yết sản phẩm (VNĐ)
              </label>
              <input type="number" id="calc-item-price" class="calc-input" placeholder="0" min="0" step="1000" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.95rem; background: var(--bg-card-subtle); color: var(--text-primary);" aria-describedby="desc-item-price" />
              <span id="desc-item-price" style="font-size: 0.75rem; color: var(--text-secondary);">Giá gốc trước mọi chiết khấu</span>
            </div>

            <div>
              <label for="calc-shipping-fee" style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">
                Phí vận chuyển / giao hàng (VNĐ)
              </label>
              <input type="number" id="calc-shipping-fee" class="calc-input" placeholder="0" min="0" step="1000" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.95rem; background: var(--bg-card-subtle); color: var(--text-primary);" aria-describedby="desc-shipping" />
              <span id="desc-shipping" style="font-size: 0.75rem; color: var(--text-secondary);">Phí ship nếu có</span>
            </div>

            <div>
              <label for="calc-student-discount" style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">
                Giảm giá trực tiếp (%)
              </label>
              <input type="number" id="calc-student-discount" class="calc-input" placeholder="0" min="0" max="100" step="1" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.95rem; background: var(--bg-card-subtle); color: var(--text-primary);" aria-describedby="desc-pct" />
              <span id="desc-pct" style="font-size: 0.75rem; color: var(--text-secondary);">Tỷ lệ chiết khấu trực tiếp (0-100%)</span>
            </div>

            <div>
              <label for="calc-voucher-discount" style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">
                Giảm từ voucher / mã (VNĐ)
              </label>
              <input type="number" id="calc-voucher-discount" class="calc-input" placeholder="0" min="0" step="1000" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.95rem; background: var(--bg-card-subtle); color: var(--text-primary);" aria-describedby="desc-voucher" />
              <span id="desc-voucher" style="font-size: 0.75rem; color: var(--text-secondary);">Mã giảm giá cố định</span>
            </div>

            <div id="split-people-container">
              <label for="calc-people-split" style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">
                Số người chia tiền (người)
              </label>
              <input type="number" id="calc-people-split" class="calc-input" value="1" min="1" max="50" step="1" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.95rem; background: var(--bg-card-subtle); color: var(--text-primary);" aria-describedby="desc-split" />
              <span id="desc-split" style="font-size: 0.75rem; color: var(--text-secondary);">Chia đều hóa đơn giỏ hàng</span>
            </div>
          </form>

          <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px;">
            <button id="btn-calc-reset" style="padding: 8px 16px; border: 1px solid var(--border-subtle); background: var(--bg-card-subtle); border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer; color: var(--text-secondary);" aria-label="Đặt lại tất cả giá trị về mặc định">
              🔄 Đặt lại giá trị
            </button>
          </div>

          <!-- Component-by-Component Formula Breakdown Display (EZ-AD) -->
          <div style="background: rgba(0,0,0,0.02); border: 1px dashed var(--border-subtle); border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-family: monospace; font-size: 0.85rem; color: var(--text-secondary);">
            <strong>Công thức:</strong> [Giá niêm yết: <span id="formula-price">0</span>] + [Ship: <span id="formula-shipping">0</span>] &minus; [Giảm trực tiếp: <span id="formula-pct">0</span>] &minus; [Voucher: <span id="formula-voucher">0</span>] = <strong><span id="formula-total" style="color: #0284c7;">0 VNĐ</span></strong>
          </div>

          <div style="background: var(--bg-card-subtle); border-radius: 10px; padding: 20px; border: 1px solid var(--border-subtle);" aria-live="polite" id="calc-results-panel">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">📊 Kết Quả Tính Toán Thực Trả</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 16px;">
              <div>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">Tổng số tiền tiết kiệm:</span>
                <div id="res-total-saved" style="font-size: 1.25rem; font-weight: 800; color: #16a34a;">0 VNĐ</div>
              </div>
              <div>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">Tổng số tiền thực trả:</span>
                <div id="res-final-total" style="font-size: 1.25rem; font-weight: 800; color: #0284c7;">0 VNĐ</div>
              </div>
              <div>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">Số tiền mỗi người trả:</span>
                <div id="res-per-person" style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary);">0 VNĐ</div>
              </div>
            </div>

            <div style="background: rgba(2, 132, 199, 0.06); border-left: 4px solid #0284c7; padding: 12px 14px; border-radius: 6px; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
              <strong>Lưu ý:</strong> JayT không đọc giỏ hàng và không xác thực mã cá nhân của bạn. Vui lòng kiểm tra mã tại ứng dụng hoặc giỏ hàng chính thức của đơn vị bán.
            </div>
          </div>
        </section>

        <section class="calculator-card-section" style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 24px;" aria-label="So sánh giỏ hàng tự nhập liệu">
          <h2 style="font-size: 1.15rem; margin: 0 0 8px; color: var(--text-primary);">🍱 So sánh giỏ hàng 3 ứng dụng</h2>
          <p style="font-size: .88rem; line-height: 1.5; color: var(--text-secondary); margin: 0 0 16px;">Nhập số tiền bạn thấy trong từng ứng dụng. JayT chỉ thực hiện phép tính trên trình duyệt; không truy cập ứng dụng, không xác nhận giá và không gửi dữ liệu đi đâu.</p>
          <div id="food-comparator-inputs" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px;">
            ${['ShopeeFood', 'GrabFood', 'BeFood'].map((name, index) => `
              <fieldset style="border: 1px solid var(--border-subtle); border-radius: 10px; padding: 12px; margin: 0;">
                <legend style="font-weight: 700; color: var(--text-primary); padding: 0 4px;">${name}</legend>
                <label style="display:block; font-size:.8rem; margin:8px 0 4px;">Món hàng (VNĐ)<input class="food-input" data-app="${index}" data-field="subtotal" type="number" min="0" step="1000" value="0" style="width:100%; min-height:44px; box-sizing:border-box; margin-top:4px;"></label>
                <label style="display:block; font-size:.8rem; margin:8px 0 4px;">Phí giao hàng (VNĐ)<input class="food-input" data-app="${index}" data-field="shipping" type="number" min="0" step="1000" value="0" style="width:100%; min-height:44px; box-sizing:border-box; margin-top:4px;"></label>
                <label style="display:block; font-size:.8rem; margin:8px 0 4px;">Giảm giá bạn tự nhập (VNĐ)<input class="food-input" data-app="${index}" data-field="discount" type="number" min="0" step="1000" value="0" style="width:100%; min-height:44px; box-sizing:border-box; margin-top:4px;"></label>
                <output id="food-total-${index}" style="display:block; margin-top:10px; font-weight:800; color:#0369a1;">Thực trả: 0 VNĐ</output>
              </fieldset>`).join('')}
          </div>
          <p id="food-comparator-summary" aria-live="polite" style="margin:16px 0 0; font-weight:700; color:var(--text-primary);">Nhập số liệu để so sánh.</p>
        </section>
      </div>
    `;
  }

  function calculateSavingsMath() {
    const rawPrice = parseFloat(document.getElementById('calc-item-price')?.value) || 0;
    const rawShipping = parseFloat(document.getElementById('calc-shipping-fee')?.value) || 0;
    const rawStudentPct = parseFloat(document.getElementById('calc-student-discount')?.value) || 0;
    const rawVoucher = parseFloat(document.getElementById('calc-voucher-discount')?.value) || 0;
    const rawPeople = parseInt(document.getElementById('calc-people-split')?.value, 10) || 1;

    const price = Math.max(0, rawPrice);
    const shipping = Math.max(0, rawShipping);
    const studentPct = Math.min(100, Math.max(0, rawStudentPct));
    const voucher = Math.max(0, rawVoucher);
    const people = Math.max(1, rawPeople);

    const directDiscountVal = (price * studentPct) / 100;
    const totalDiscount = Math.min(price, voucher + directDiscountVal);
    const finalTotal = Math.max(0, (price - totalDiscount) + shipping);
    const perPerson = Math.ceil(finalTotal / people);

    const elSaved = document.getElementById('res-total-saved');
    const elFinal = document.getElementById('res-final-total');
    const elPerPerson = document.getElementById('res-per-person');

    if (elSaved) elSaved.textContent = totalDiscount.toLocaleString('vi-VN') + ' VNĐ';
    if (elFinal) elFinal.textContent = finalTotal.toLocaleString('vi-VN') + ' VNĐ';
    if (elPerPerson) elPerPerson.textContent = perPerson.toLocaleString('vi-VN') + ' VNĐ';

    // Formula breakdown elements
    const fPrice = document.getElementById('formula-price');
    const fShipping = document.getElementById('formula-shipping');
    const fPct = document.getElementById('formula-pct');
    const fVoucher = document.getElementById('formula-voucher');
    const fTotal = document.getElementById('formula-total');

    if (fPrice) fPrice.textContent = price.toLocaleString('vi-VN');
    if (fShipping) fShipping.textContent = shipping.toLocaleString('vi-VN');
    if (fPct) fPct.textContent = directDiscountVal.toLocaleString('vi-VN');
    if (fVoucher) fVoucher.textContent = voucher.toLocaleString('vi-VN');
    if (fTotal) fTotal.textContent = finalTotal.toLocaleString('vi-VN') + ' VNĐ';
  }

  function attachCalculatorEvents() {
    const inputs = document.querySelectorAll('.calc-input');
    inputs.forEach(input => {
      input.addEventListener('input', calculateSavingsMath);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateSavingsMath();
        }
      });
    });

    // Preset buttons
    const btnSolo = document.getElementById('preset-solo');
    const btnGroup = document.getElementById('preset-group');
    const peopleInput = document.getElementById('calc-people-split');

    if (btnSolo && btnGroup && peopleInput) {
      btnSolo.addEventListener('click', () => {
        btnSolo.style.border = '1px solid #0284c7';
        btnSolo.style.background = 'rgba(2, 132, 199, 0.08)';
        btnSolo.style.color = '#0284c7';
        btnSolo.setAttribute('aria-pressed', 'true');

        btnGroup.style.border = '1px solid var(--border-subtle)';
        btnGroup.style.background = 'var(--bg-card-subtle)';
        btnGroup.style.color = 'var(--text-secondary)';
        btnGroup.setAttribute('aria-pressed', 'false');

        peopleInput.value = '1';
        calculateSavingsMath();
      });

      btnGroup.addEventListener('click', () => {
        btnGroup.style.border = '1px solid #0284c7';
        btnGroup.style.background = 'rgba(2, 132, 199, 0.08)';
        btnGroup.style.color = '#0284c7';
        btnGroup.setAttribute('aria-pressed', 'true');

        btnSolo.style.border = '1px solid var(--border-subtle)';
        btnSolo.style.background = 'var(--bg-card-subtle)';
        btnSolo.style.color = 'var(--text-secondary)';
        btnSolo.setAttribute('aria-pressed', 'false');

        if (parseInt(peopleInput.value, 10) <= 1) {
          peopleInput.value = '2';
        }
        peopleInput.focus();
        calculateSavingsMath();
      });
    }

    const resetBtn = document.getElementById('btn-calc-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const itemPrice = document.getElementById('calc-item-price');
        const shipFee = document.getElementById('calc-shipping-fee');
        const stuDisc = document.getElementById('calc-student-discount');
        const vouDisc = document.getElementById('calc-voucher-discount');
        const people = document.getElementById('calc-people-split');

        if (itemPrice) itemPrice.value = '';
        if (shipFee) shipFee.value = '';
        if (stuDisc) stuDisc.value = '';
        if (vouDisc) vouDisc.value = '';
        if (people) people.value = '1';

        calculateSavingsMath();
      });
    }

    document.querySelectorAll('.food-input').forEach(input => input.addEventListener('input', calculateFoodComparison));
  }

  function calculateFoodComparison() {
    const totals = [0, 1, 2].map(index => {
      const value = field => Math.max(0, parseFloat(document.querySelector(`.food-input[data-app="${index}"][data-field="${field}"]`)?.value) || 0);
      const total = Math.max(0, value('subtotal') + value('shipping') - value('discount'));
      const output = document.getElementById(`food-total-${index}`);
      if (output) output.textContent = `Thực trả: ${total.toLocaleString('vi-VN')} VNĐ`;
      return total;
    });
    const names = ['ShopeeFood', 'GrabFood', 'BeFood'];
    const lowest = Math.min(...totals);
    const winner = totals.indexOf(lowest);
    const summary = document.getElementById('food-comparator-summary');
    if (summary) summary.textContent = lowest === 0 && totals.every(total => total === 0) ? 'Nhập số liệu để so sánh.' : `Theo số liệu bạn nhập, ${names[winner]} có tổng thấp nhất: ${lowest.toLocaleString('vi-VN')} VNĐ.`;
  }

  // 4. NAVIGATION ROUTER
  let currentNav = 'HOME';

  function navigateTo(navKey) {
    currentNav = navKey;
    const canvas = document.getElementById('jayt-view-canvas');
    if (!canvas) return;

    // Update active nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-nav') === navKey);
    });

    if (navKey === 'BUY_DECISION') {
      canvas.innerHTML = renderSavingsLabView();
      attachCalculatorEvents();
    } else if (navKey === 'EXPLORE' || navKey === 'WALLET' || navKey === 'FOOD_JOURNEY' || navKey === 'LEISURE_JOURNEY') {
      canvas.innerHTML = renderExploreView();
    } else if (navKey === 'VOUCHER_HUB') {
      canvas.innerHTML = renderVoucherHub();
    } else {
      canvas.innerHTML = renderDailyGuideHome();
    }

    // Attach dynamic click listeners
    attachNavigationListeners();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function attachNavigationListeners() {
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        const target = el.getAttribute('data-nav');
        if (target) {
          e.preventDefault();
          navigateTo(target);
        }
      });
    });
  }

  // 5. REPORT SOURCE MODAL
  function initReportSourceModal() {
    const openBtn = document.getElementById('btn-open-report');
    const modal = document.getElementById('report-modal-overlay');
    const closeBtn = document.getElementById('btn-close-report-modal');
    const closeXBtn = document.getElementById('btn-close-report-modal-x');

    function openModal() {
      if (modal) {
        modal.style.display = 'flex';
        closeBtn?.focus();
      }
    }

    function closeModal() {
      if (modal) {
        modal.style.display = 'none';
        openBtn?.focus();
      }
    }

    openBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });

    closeBtn?.addEventListener('click', closeModal);
    closeXBtn?.addEventListener('click', closeModal);

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
        closeModal();
      }
    });
  }

  // 6. THEME TOGGLE
  function initTheme() {
    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('theme-dark');
        document.body.classList.toggle('theme-dark', !isDark);
        document.body.classList.toggle('theme-light', isDark);
      });
    }
  }

  // 7. INITIALIZATION
  function initStorefront() {
    initTheme();
    initReportSourceModal();
    attachNavigationListeners();
    navigateTo('HOME');
    console.log('🛡️ JayT Storefront initialized under Directive EZ-V.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStorefront);
  } else {
    initStorefront();
  }

  // Export to window for inspection
  root.__JAYT_STOREFRONT__ = {
    version: 'v3.420.0',
    featureFlags: FEATURE_FLAGS,
    approvedPublicEntries: APPROVED_PUBLIC_ENTRIES,
    discoveryItems: JAYT_DISCOVERY_ITEMS,
    runtimeFingerprint: RUNTIME_FINGERPRINT
  };

})(typeof window !== 'undefined' ? window : this);
