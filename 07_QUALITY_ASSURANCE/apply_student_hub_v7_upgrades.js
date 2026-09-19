const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');

let htmlCode = fs.readFileSync(htmlPath, 'utf8');
let jsCode = fs.readFileSync(jsPath, 'utf8');

console.log('--- 1. APPLYING STUDENT HUB CSS TO index.html ---');

const studentHubCss = `
    /* ==========================================================================
       JAYT STUDENT HUB 3-IN-1 STYLES (v7.0.0)
       ========================================================================== */
    .student-hub-container {
      background: var(--surface-card);
      border: 1px solid var(--border-hairline);
      border-radius: 24px;
      padding: 24px;
      margin-top: 24px;
      box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
    }

    .hub-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      border-bottom: 1px solid var(--border-hairline);
      padding-bottom: 16px;
      margin-bottom: 20px;
    }

    .hub-title {
      font-size: 18px;
      font-weight: 900;
      color: var(--text-main);
      margin: 0;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .hub-badge-live {
      background: var(--emerald-bg);
      color: var(--emerald);
      font-size: 11px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid rgba(16, 185, 129, 0.3);
      margin-left: 8px;
    }

    .hub-nav-tabs {
      display: flex;
      gap: 8px;
      background: var(--surface-subtle);
      padding: 4px;
      border-radius: 14px;
      border: 1px solid var(--border-hairline);
      overflow-x: auto;
    }
    .hub-nav-tabs::-webkit-scrollbar { display: none; }

    .hub-tab-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-weight: 700;
      font-size: 12.5px;
      padding: 8px 16px;
      border-radius: 10px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .hub-tab-btn.active {
      background: var(--surface-card);
      color: var(--emerald);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    }

    .hub-tab-content {
      display: none;
      animation: fadeIn 0.25s ease;
    }
    .hub-tab-content.active {
      display: block;
    }

    /* Tab 1: Campus Pills */
    .campus-selector-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .campus-pill {
      background: var(--surface-subtle);
      border: 1px solid var(--border-hairline);
      color: var(--text-main);
      font-size: 12px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .campus-pill.active {
      background: var(--emerald-bg);
      border-color: var(--emerald);
      color: var(--emerald);
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
    }

    .food-rescue-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 14px;
    }

    /* Tab 2: Edu Perks */
    .edu-perks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }
    .edu-card {
      background: var(--surface-subtle);
      border: 1px solid var(--border-hairline);
      border-radius: 16px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
    }
    .edu-price {
      font-size: 15px;
      font-weight: 900;
      color: var(--emerald);
      margin: 4px 0;
    }
    .edu-price span {
      font-size: 11.5px;
      color: var(--text-muted);
      text-decoration: line-through;
      margin-left: 4px;
    }
    .btn-edu-action {
      margin-top: 12px;
      background: var(--surface-card);
      border: 1px solid var(--border-hairline);
      color: var(--text-main);
      font-weight: 800;
      font-size: 12px;
      padding: 9px 14px;
      border-radius: 10px;
      text-align: center;
      text-decoration: none;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .btn-edu-action:hover {
      border-color: var(--emerald);
      color: var(--emerald);
      transform: translateY(-1px);
    }

    /* Tab 3: Stacking Simulator */
    .coupon-stack-simulator {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.03) 100%);
      border: 1px dashed var(--emerald);
      border-radius: 16px;
      padding: 16px 20px;
      margin-bottom: 20px;
    }
    .sim-equation {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      font-size: 12px;
      font-weight: 700;
    }
    .sim-equation .step {
      background: var(--surface-card);
      border: 1px solid var(--border-hairline);
      padding: 4px 10px;
      border-radius: 8px;
    }
    .sim-equation .result {
      color: #FFFFFF;
      background: var(--emerald);
      padding: 4px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 900;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
    }
`;

if (!htmlCode.includes('JAYT STUDENT HUB 3-IN-1 STYLES')) {
  const cssAnchor = '/* 1. BỘ LỌC 4 TAB KHO VOUCHER (VOUCHER TAXONOMY TABS) */';
  htmlCode = htmlCode.replace(cssAnchor, studentHubCss + '\n    ' + cssAnchor);
  fs.writeFileSync(htmlPath, htmlCode, 'utf8');
  console.log('✅ Added Student Hub CSS to index.html');
}

console.log('\n--- 2. APPLYING STUDENT HUB CONTROLLER & TEMPLATE TO jayt_apex_interface.js ---');

const studentHubController = `
  // --- JAYT STUDENT HUB CONTROLLER (v7.0.0) ---
  const campusRescueData = {
    BK_SP: [
      { name: "Cơm Tấm Sườn Cay", address: "42 Ngô Văn Sở (Hòa Khánh)", price: "20.000₫ - 25.000₫", perk: "Trà đá + Canh thêm 0đ", dist: "0.4km" },
      { name: "Bún Mắm Nêm Dì Nga", address: "Chợ Hòa Khánh", price: "15.000₫ - 20.000₫", perk: "Suất ăn no lâu", dist: "0.6km" },
      { name: "Bánh Mì Chả Bò Cô Bích", address: "Khu F Bách Khoa", price: "12.000₫ - 15.000₫", perk: "Mở 06:00 - 22:00", dist: "0.2km" }
    ],
    DUE: [
      { name: "Cơm Gà Xé Kiệt K48", address: "48 Hồ Xuân Hương (DUE)", price: "25.000₫", perk: "Xin thêm cơm trắng 0đ", dist: "0.5km" },
      { name: "Bánh Mì Que & Xôi Gà", address: "Chợ Bắc Mỹ An", price: "12.000₫ - 18.000₫", perk: "Ngon rẻ trứ danh sinh viên", dist: "0.7km" },
      { name: "Bún Thịt Nướng Cô Ba", address: "Khu Phố Tây An Thượng", price: "20.000₫ - 25.000₫", perk: "Rau sống + Nước lèo thêm 0đ", dist: "0.8km" }
    ],
    DUYTAN: [
      { name: "Cơm Bình Dân Dì Mai", address: "100 Thái Phiên (Hải Châu)", price: "20.000₫ - 25.000₫", perk: "Có phòng máy lạnh", dist: "0.3km" },
      { name: "Bún Bò Quê", address: "Kiệt Quang Trung (Duy Tân)", price: "20.000₫ - 25.000₫", perk: "Ưu tiên suất HSSV", dist: "0.2km" }
    ],
    NN_SPKT: [
      { name: "Bún Chả Cá & Bánh Bột Lọc", address: "Lương Nhữ Hộc (Khuê Trung)", price: "15.000₫ - 20.000₫", perk: "Giá niêm yết cố định cho HSSV", dist: "0.3km" },
      { name: "Cơm Chiên Dương Châu", address: "Gần ĐH Sư Phạm Kỹ Thuật", price: "20.000₫ - 25.000₫", perk: "Đĩa đầy đặn + Trà đá 0đ", dist: "0.4km" }
    ]
  };

  function switchStudentTab(tabType, btnElement) {
    playHapticTick();
    document.querySelectorAll('.hub-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.hub-tab-content').forEach(c => c.classList.remove('active'));

    if (btnElement) btnElement.classList.add('active');

    const targetContent = document.getElementById(\`tab-\${tabType.toLowerCase().replace('_', '-')}\`);
    if (targetContent) targetContent.classList.add('active');
  }

  function filterCampus(campusKey, pillBtn) {
    playHapticTick();
    document.querySelectorAll('.campus-pill').forEach(p => p.classList.remove('active'));
    if (pillBtn) pillBtn.classList.add('active');

    const container = document.getElementById('foodRescueGrid');
    if (!container) return;
    const items = campusRescueData[campusKey] || campusRescueData.BK_SP || [];

    container.innerHTML = items.map(item => \`
      <div class="edu-card apex-spring-interactive">
        <div style="font-weight: 900; font-size: 14.5px; color: var(--text-main);">\${item.name}</div>
        <div style="font-size: 11.5px; color: var(--text-muted); margin: 3px 0;">📍 \${item.address} · 🛵 \${item.dist}</div>
        <div class="edu-price">\${item.price}</div>
        <div style="font-size: 11.5px; color: var(--emerald); font-weight: 800; margin-top: 4px;">🎁 \${item.perk}</div>
      </div>
    \`).join('');
  }
`;

if (!jsCode.includes('JAYT STUDENT HUB CONTROLLER')) {
  const insertAnchor = '  // MAXIMUM 3: Đồng Bộ Ánh Sáng Môi Trường Theo Giờ Đà Nẵng (Sun-Sync Ambient)';
  jsCode = jsCode.replace(insertAnchor, studentHubController + '\n\n' + insertAnchor);
  console.log('✅ Added Student Hub Controller to JS');
}

// Student Hub HTML Section to be inserted in Tier 4-5
const studentHubSectionHtml = `
        <!-- 5. JAYT STUDENT HUB: ĐẶC QUYỀN & SINH TỒN VÙNG 43 (3-IN-1) -->
        <section class="student-hub-container apex-canvas-tier specular-glass-panel">
          <div class="hub-header">
            <div style="display:flex; align-items:center;">
              <h3 class="hub-title">🎓 JayT Student Hub — Đặc Quyền & Sinh Tồn Sinh Viên Đà Nẵng</h3>
              <span class="hub-badge-live">VÙNG 43 · ĐÃ ĐỐI SOÁT</span>
            </div>
            <!-- 3 Tab Chức Năng Cốt Lõi -->
            <div class="hub-nav-tabs">
              <button type="button" class="hub-tab-btn active apex-spring-interactive" data-action="switch-student-tab" data-tab="CUU_DOI">⚡ Deal Cứu Đói ≤ 25K</button>
              <button type="button" class="hub-tab-btn apex-spring-interactive" data-action="switch-student-tab" data-tab="EDU_PERKS">💎 Đặc Quyền .edu.vn (0đ)</button>
              <button type="button" class="hub-tab-btn apex-spring-interactive" data-action="switch-student-tab" data-tab="KTX_STACK">🛒 Săn Đồ KTX Xếp Mã</button>
            </div>
          </div>

          <!-- TAB 1: RADAR CỨU ĐÓI <= 25K -->
          <div id="tab-cuu-doi" class="hub-tab-content active">
            <div class="campus-selector-bar">
              <span style="font-size:12px; font-weight:800; color:var(--text-muted);">📍 Chọn Cụm Trường:</span>
              <button type="button" class="campus-pill active apex-spring-interactive" data-action="filter-student-campus" data-campus="BK_SP">🎓 Bách Khoa / Sư Phạm (Hòa Khánh)</button>
              <button type="button" class="campus-pill apex-spring-interactive" data-action="filter-student-campus" data-campus="DUE">🎓 Kinh Tế (DUE)</button>
              <button type="button" class="campus-pill apex-spring-interactive" data-action="filter-student-campus" data-campus="DUYTAN">🎓 Duy Tân</button>
              <button type="button" class="campus-pill apex-spring-interactive" data-action="filter-student-campus" data-campus="NN_SPKT">🎓 Ngoại Ngữ / SP Kỹ Thuật</button>
            </div>
            <div class="food-rescue-grid" id="foodRescueGrid">
              <!-- Default: Bách Khoa - Sư Phạm -->
              <div class="edu-card apex-spring-interactive">
                <div style="font-weight: 900; font-size: 14.5px; color: var(--text-main);">Cơm Tấm Sườn Cay</div>
                <div style="font-size: 11.5px; color: var(--text-muted); margin: 3px 0;">📍 42 Ngô Văn Sở (Hòa Khánh) · 🛵 0.4km</div>
                <div class="edu-price">20.000₫ - 25.000₫</div>
                <div style="font-size: 11.5px; color: var(--emerald); font-weight: 800; margin-top: 4px;">🎁 Trà đá + Canh thêm 0đ</div>
              </div>
              <div class="edu-card apex-spring-interactive">
                <div style="font-weight: 900; font-size: 14.5px; color: var(--text-main);">Bún Mắm Nêm Dì Nga</div>
                <div style="font-size: 11.5px; color: var(--text-muted); margin: 3px 0;">📍 Chợ Hòa Khánh · 🛵 0.6km</div>
                <div class="edu-price">15.000₫ - 20.000₫</div>
                <div style="font-size: 11.5px; color: var(--emerald); font-weight: 800; margin-top: 4px;">🎁 Suất ăn no lâu</div>
              </div>
              <div class="edu-card apex-spring-interactive">
                <div style="font-weight: 900; font-size: 14.5px; color: var(--text-main);">Bánh Mì Chả Bò Cô Bích</div>
                <div style="font-size: 11.5px; color: var(--text-muted); margin: 3px 0;">📍 Khu F Bách Khoa · 🛵 0.2km</div>
                <div class="edu-price">12.000₫ - 15.000₫</div>
                <div style="font-size: 11.5px; color: var(--emerald); font-weight: 800; margin-top: 4px;">🎁 Mở 06:00 - 22:00</div>
              </div>
            </div>
          </div>

          <!-- TAB 2: ĐẶC QUYỀN EMAIL EDU -->
          <div id="tab-edu-perks" class="hub-tab-content">
            <div class="edu-perks-grid">
              
              <div class="edu-card apex-spring-interactive">
                <div>
                  <div style="font-size:24px; margin-bottom:4px;">🎵</div>
                  <div style="font-weight:900; font-size:15px; color:var(--text-main);">Spotify Student</div>
                  <div class="edu-price">29.500₫/tháng <span>(Gốc 59.000₫)</span></div>
                  <div style="font-size:11.5px; color:var(--text-muted); line-height:1.45; margin-top:4px;">
                    Nghe nhạc bản quyền không quảng cáo, tải offline mọi thiết bị.
                  </div>
                </div>
                <a href="https://www.spotify.com/vn-vi/student/" target="_blank" rel="noopener noreferrer" class="btn-edu-action apex-spring-interactive">
                  🔗 Xác Thực SheerID ↗
                </a>
              </div>

              <div class="edu-card apex-spring-interactive">
                <div>
                  <div style="font-size:24px; margin-bottom:4px;">🎬</div>
                  <div style="font-weight:900; font-size:15px; color:var(--text-main);">YouTube Premium HSSV</div>
                  <div class="edu-price">49.000₫/tháng <span>(Gốc 79.000₫)</span></div>
                  <div style="font-size:11.5px; color:var(--text-muted); line-height:1.45; margin-top:4px;">
                    Chặn 100% quảng cáo, phát trong nền và tải video Full HD.
                  </div>
                </div>
                <a href="https://www.youtube.com/premium/student" target="_blank" rel="noopener noreferrer" class="btn-edu-action apex-spring-interactive">
                  🔗 Xác Thực Email Edu ↗
                </a>
              </div>

              <div class="edu-card apex-spring-interactive">
                <div>
                  <div style="font-size:24px; margin-bottom:4px;">💻</div>
                  <div style="font-weight:900; font-size:15px; color:var(--text-main);">GitHub Student Pack</div>
                  <div class="edu-price">0₫ <span>(Trị giá ~$1.200/năm)</span></div>
                  <div style="font-size:11.5px; color:var(--text-muted); line-height:1.45; margin-top:4px;">
                    Tặng GitHub Copilot AI, Domain .me, Canva Pro, JetBrains IDE.
                  </div>
                </div>
                <a href="https://education.github.com/pack" target="_blank" rel="noopener noreferrer" class="btn-edu-action apex-spring-interactive">
                  🔗 Nhận Bằng Email SV ↗
                </a>
              </div>

              <div class="edu-card apex-spring-interactive">
                <div>
                  <div style="font-size:24px; margin-bottom:4px;">📝</div>
                  <div style="font-weight:900; font-size:15px; color:var(--text-main);">Notion Plus & Canva Pro</div>
                  <div class="edu-price">0₫ <span>(Trọn đời sinh viên)</span></div>
                  <div style="font-size:11.5px; color:var(--text-muted); line-height:1.45; margin-top:4px;">
                    Quản lý bài tập, làm slide nhóm không giới hạn lưu trữ.
                  </div>
                </div>
                <a href="https://www.notion.so/product/notion-for-education" target="_blank" rel="noopener noreferrer" class="btn-edu-action apex-spring-interactive">
                  🔗 Đăng Ký 0đ ↗
                </a>
              </div>

              <div class="edu-card apex-spring-interactive">
                <div>
                  <div style="font-size:24px; margin-bottom:4px;">🍎</div>
                  <div style="font-weight:900; font-size:15px; color:var(--text-main);">Apple Education Store</div>
                  <div class="edu-price">-2.000.000₫ <span>(Tặng Pencil/Tai nghe)</span></div>
                  <div style="font-size:11.5px; color:var(--text-muted); line-height:1.45; margin-top:4px;">
                    Ưu đãi giáo dục iPad/MacBook + Tặng Apple Pencil chính hãng.
                  </div>
                </div>
                <a href="https://www.apple.com/vn-edu/store" target="_blank" rel="noopener noreferrer" class="btn-edu-action apex-spring-interactive">
                  🔗 Vào Apple UNiDAYS ↗
                </a>
              </div>

              <div class="edu-card apex-spring-interactive">
                <div>
                  <div style="font-size:24px; margin-bottom:4px;">⚡</div>
                  <div style="font-weight:900; font-size:15px; color:var(--text-main);">JetBrains All Products</div>
                  <div class="edu-price">0₫ <span>(Gốc $289/năm)</span></div>
                  <div style="font-size:11.5px; color:var(--text-muted); line-height:1.45; margin-top:4px;">
                    Miễn phí trọn bộ IntelliJ, WebStorm, PyCharm cho SV CNTT.
                  </div>
                </div>
                <a href="https://www.jetbrains.com/community/education/#students" target="_blank" rel="noopener noreferrer" class="btn-edu-action apex-spring-interactive">
                  🔗 Nhận License Sinh Viên ↗
                </a>
              </div>

            </div>
          </div>

          <!-- TAB 3: SĂN ĐỒ KTX XẾP CHỒNG 3 MÃ -->
          <div id="tab-ktx-stack" class="hub-tab-content">
            <div class="coupon-stack-simulator">
              <div style="font-size:13px; font-weight:900; color:var(--text-main); margin-bottom:6px;">
                🧮 Trình Mô Phỏng Xếp Chồng 3 Tầng Mã Shopee / TikTok Shop
              </div>
              <div class="sim-equation">
                <span class="step">[1] Giá Gốc: 85.000₫</span>
                <span style="color:var(--text-muted); font-weight:800;">-</span>
                <span class="step">[2] Mã Shop: 10.000₫</span>
                <span style="color:var(--text-muted); font-weight:800;">-</span>
                <span class="step">[3] Mã Sàn: 15.000₫</span>
                <span style="color:var(--text-muted); font-weight:800;">-</span>
                <span class="step">[4] Freeship: 21.000₫</span>
                <span style="color:var(--text-muted); font-weight:800;">=</span>
                <span class="result">Thực Trả Đáy: 39.000₫</span>
              </div>
            </div>

            <div class="food-rescue-grid">
              
              <div class="edu-card apex-spring-interactive">
                <div>
                  <div style="font-weight:900; font-size:14px; color:var(--text-main);">Quạt tích điện để bàn mini USB</div>
                  <div class="edu-price">39.000₫ <span>85.000₫</span></div>
                  <div style="font-size:11px; color:var(--text-muted); margin:4px 0;">Pin trâu 4h · 3 tốc độ gió chống cúp điện KTX</div>
                  <span class="badge-freeship-xtra" style="font-size:10px;">🟢 FREESHIP XTRA 0Đ</span>
                </div>
                <a href="https://shopee.vn" target="_blank" rel="noopener noreferrer" class="btn-edu-action apex-spring-interactive" style="background:#EA580C; color:#FFFFFF; border:none; margin-top:10px;">
                  Săn Đáy 39K ↗
                </a>
              </div>

              <div class="edu-card apex-spring-interactive">
                <div>
                  <div style="font-weight:900; font-size:14px; color:var(--text-main);">Đèn LED kẹp bàn chống cận</div>
                  <div class="edu-price">29.000₫ <span>69.000₫</span></div>
                  <div style="font-size:11px; color:var(--text-muted); margin:4px 0;">3 chế độ sáng · Cắm cổng USB học bài đêm</div>
                  <span class="badge-freeship-xtra" style="font-size:10px;">🟢 FREESHIP XTRA 0Đ</span>
                </div>
                <a href="https://shopee.vn" target="_blank" rel="noopener noreferrer" class="btn-edu-action apex-spring-interactive" style="background:#EA580C; color:#FFFFFF; border:none; margin-top:10px;">
                  Săn Đáy 29K ↗
                </a>
              </div>

              <div class="edu-card apex-spring-interactive">
                <div>
                  <div style="font-weight:900; font-size:14px; color:var(--text-main);">Nồi lẩu mini nấu mì 1.5L</div>
                  <div class="edu-price">55.000₫ <span>115.000₫</span></div>
                  <div style="font-size:11px; color:var(--text-muted); margin:4px 0;">Chống dính cao cấp · Tự ngắt điện khi cạn nước</div>
                  <span class="badge-freeship-xtra" style="font-size:10px;">🟢 FREESHIP XTRA 0Đ</span>
                </div>
                <a href="https://shopee.vn" target="_blank" rel="noopener noreferrer" class="btn-edu-action apex-spring-interactive" style="background:#EA580C; color:#FFFFFF; border:none; margin-top:10px;">
                  Săn Đáy 55K ↗
                </a>
              </div>

              <div class="edu-card apex-spring-interactive">
                <div>
                  <div style="font-weight:900; font-size:14px; color:var(--text-main);">Cáp sạc Type-C 20W bọc dù</div>
                  <div class="edu-price">29.000₫ <span>55.000₫</span></div>
                  <div style="font-size:11px; color:var(--text-muted); margin:4px 0;">Dây bọc dù siêu bền · Sạc nhanh 50% trong 30p</div>
                  <span class="badge-freeship-xtra" style="font-size:10px;">🟢 FREESHIP XTRA 0Đ</span>
                </div>
                <a href="https://shopee.vn" target="_blank" rel="noopener noreferrer" class="btn-edu-action apex-spring-interactive" style="background:#EA580C; color:#FFFFFF; border:none; margin-top:10px;">
                  Săn Đáy 29K ↗
                </a>
              </div>

            </div>
          </div>
        </section>
`;

// Insert studentHubSectionHtml right above </section>\n\n      </div> in renderFiveTierDailyDealCanvas
const canvasCloseAnchor = '🔒 Dữ liệu đã đối soát qua cổng tiếp thị liên kết chính thức <strong>#JayTAffiliate</strong> — Dữ liệu đối soát từ đối tác chính thức.\n          </div>\n        </section>\n\n      </div>';

if (jsCode.includes(canvasCloseAnchor) && !jsCode.includes('JayT Student Hub')) {
  jsCode = jsCode.replace(canvasCloseAnchor, canvasCloseAnchor.replace('</div>\n        </section>\n\n      </div>', '</div>\n        </section>\n' + studentHubSectionHtml + '\n      </div>'));
  console.log('✅ Integrated Student Hub 3-in-1 section into renderFiveTierDailyDealCanvas()');
}

// Add event listeners for Student Hub tabs and campus pills
const studentHubListeners = `
    // v7.0.0 Student Hub Tabs & Campus Filter Listeners
    document.querySelectorAll('[data-action="switch-student-tab"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab') || 'CUU_DOI';
        switchStudentTab(tab, e.currentTarget);
      });
    });

    document.querySelectorAll('[data-action="filter-student-campus"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campus = e.currentTarget.getAttribute('data-campus') || 'BK_SP';
        filterCampus(campus, e.currentTarget);
      });
    });
`;

if (!jsCode.includes('[data-action="switch-student-tab"]')) {
  const listenerPoint = 'document.querySelectorAll(\'[data-action="launch-kinetic-roulette"]\').forEach';
  jsCode = jsCode.replace(listenerPoint, studentHubListeners + '\n    ' + listenerPoint);
  console.log('✅ Added Student Hub event listeners to JS');
}

fs.writeFileSync(jsPath, jsCode, 'utf8');
console.log('✨ JAYT STUDENT HUB v7.0.0 FULLY INTEGRATED!');
