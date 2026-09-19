/**
 * JAYT DUAL-TRACK WEB UX ENHANCEMENT SCRIPT (164)
 * Directive: JAYT-164: DUAL-TRACK VALUE RELEASE — NHIỀU DEAL THẬT + UX PREMIUM
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const jsSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsDeployPath = path.join(repoRoot, 'deploy', 'jayt_apex_interface.js');
const htmlSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html');
const htmlDeployPath = path.join(repoRoot, 'deploy', 'index.html');

console.log('=== ENHANCING DUAL-TRACK WEB UX (JAYT-164) ===');

// 1. Prepare CSS additions for index.html
const customCss164 = `
/* ==========================================================================
   JAYT-164: DUAL-TRACK UX PREMIUM & 5-STAGE HOMEPAGE FLOW
   ========================================================================== */
.jayt-weekly-savings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-top: 14px;
}
.jayt-weekly-day-card {
  background: var(--bg-card-white);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: all 0.2s ease;
}
.jayt-weekly-day-card:hover {
  border-color: var(--emerald-border);
  box-shadow: var(--shadow-sm);
}
.jayt-weekly-day-badge {
  font-size: 11px;
  font-weight: 800;
  color: var(--emerald-text);
  background: var(--emerald-soft);
  padding: 2px 6px;
  border-radius: 4px;
  width: max-content;
}
.jayt-weekly-day-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-charcoal-deep);
  margin: 0;
}
.jayt-weekly-day-desc {
  font-size: 11.5px;
  color: var(--text-muted);
  line-height: 1.4;
}

.jayt-student-portals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  margin-top: 14px;
}
.jayt-student-portal-card {
  background: var(--bg-card-white);
  border: 1px solid #E9D5FF;
  border-radius: var(--radius-lg);
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  transition: all 0.2s ease;
}
.jayt-student-portal-card:hover {
  border-color: #C084FC;
  box-shadow: 0 4px 12px rgba(107, 33, 168, 0.08);
}

/* Dark Mode Overrides for 164 Components */
body[data-theme="dark"] .jayt-weekly-day-card {
  background: #1E293B;
  border-color: #334155;
}
body[data-theme="dark"] .jayt-weekly-day-title {
  color: #F8FAFC;
}
body[data-theme="dark"] .jayt-student-portal-card {
  background: #1E293B;
  border-color: #4C1D95;
}
`;

let htmlContent = fs.readFileSync(htmlSotPath, 'utf8');
if (!htmlContent.includes('JAYT-164: DUAL-TRACK UX PREMIUM')) {
  htmlContent = htmlContent.replace('</style>', customCss164 + '\n</style>');
  fs.writeFileSync(htmlSotPath, htmlContent, 'utf8');
  fs.writeFileSync(htmlDeployPath, htmlContent, 'utf8');
  console.log('✅ Updated index.html with 164 CSS.');
}

// 2. Prepare Enhanced 5-Stage Life-Rhythm JS Code for jayt_apex_interface.js
const jsWeeklySchedule164 = `
  // 📅 Weekly Savings Calendar Definition (7 Days)
  const WEEKLY_SAVINGS_CALENDAR_164 = [
    { day: 'Thứ 2', icon: '⚡', title: 'Khởi Đầu Tuần Mới', desc: 'Bữa trưa công sở & cà phê tập trung; kiểm tra ưu đãi thẻ sinh viên.' },
    { day: 'Thứ 3', icon: '🎬', title: 'Happy Tuesday Starlight', desc: 'Ngày hội giá vé thành viên tại Starlight Nguyễn Kim Đà Nẵng.' },
    { day: 'Thứ 4', icon: '🍿', title: 'Happy Wednesday CGV / Galaxy', desc: 'Ngày tri ân thành viên CGV & Galaxy Cinema toàn quốc.' },
    { day: 'Thứ 5', icon: '☕', title: 'Không Gian Chạy Deadline', desc: 'Cà phê học bài wifi mạnh, bàn rộng & cắm sạc yên tĩnh.' },
    { day: 'Thứ 6', icon: '🍕', title: 'Kèo Nhóm Cuối Tuần', desc: 'Ưu đãi pizza, gà rán và trà sữa cho nhóm bạn sau giờ học.' },
    { day: 'Thứ 7', icon: '🏖️', title: 'Dạo Phố & Di Chuyển', desc: 'Tuyến buýt DanaBus kết nối trung tâm Hải Châu đến Sơn Trà / Ngũ Hành Sơn.' },
    { day: 'Chủ Nhật', icon: '🚆', title: 'Đặt Vé Tàu DSVN', desc: 'Giảm giá vé tàu hỏa thẻ sinh viên tại Ga Đà Nẵng cho chuyến đi xa.' }
  ];

  function renderWeeklySavingsScheduleSection() {
    return \`
      <!-- 3. LỊCH TUẦN TIẾT KIỆM (7-DAY SAVINGS CALENDAR) -->
      <section class="jayt-tier-section" style="margin-top: 10px;">
        <div class="jayt-tier-header">
          <div class="jayt-tier-title-box">
            <span style="font-size:20px;">📅</span>
            <div>
              <h3 class="jayt-tier-title">3. Lịch Tiết Kiệm Tuần (Đà Nẵng Life-Rhythm)</h3>
              <div style="font-size:11px; color:var(--text-muted);">Biết trước ngày hội rạp phim, tuyến xe buýt và lịch kèo nhóm tiết kiệm</div>
            </div>
          </div>
          <span class="apex-badge" style="background:#EFF6FF; color:#1E40AF; border:1px solid #BFDBFE; font-weight:800; font-size:11px;">
            📆 LỊCH 7 NGÀY
          </span>
        </div>

        <div class="jayt-weekly-savings-grid">
          \${WEEKLY_SAVINGS_CALENDAR_164.map(w => \`
            <div class="jayt-weekly-day-card apex-spring-interactive">
              <span class="jayt-weekly-day-badge">\${w.icon} \${w.day}</span>
              <h4 class="jayt-weekly-day-title">\${w.title}</h4>
              <div class="jayt-weekly-day-desc">\${w.desc}</div>
            </div>
          \`).join('')}
        </div>
      </section>
    \`;
  }

  function renderOnlineStudentPortalsSection() {
    const studentPortals = CATEGORY_HUBS_REGISTRY_163.filter(i => i.stream === 'STREAM_B_ONLINE_STUDENT_SOURCES' || i.target_type === 'ONLINE_STUDENT_SOURCE');
    return \`
      <!-- 4. CỔNG XÁC THỰC ƯU ĐÃI SINH VIÊN TRỰC TUYẾN -->
      <section class="jayt-tier-section" style="margin-top: 10px;">
        <div class="jayt-tier-header">
          <div class="jayt-tier-title-box">
            <span style="font-size:20px;">🎓</span>
            <div>
              <h3 class="jayt-tier-title">4. Cổng Xác Thực Sinh Viên Trực Tuyến (\${studentPortals.length} Cổng Chính Thức)</h3>
              <div style="font-size:11px; color:var(--text-muted);">Quyền lợi sinh viên quốc tế xác thực trực tiếp qua email trường hoặc SheerID</div>
            </div>
          </div>
          <span class="jayt-tier-badge jayt-tier-badge-purple">🟣 SINH VIÊN QUỐC TẾ</span>
        </div>

        <div class="jayt-student-portals-grid">
          \${studentPortals.map(p => \`
            <div class="jayt-student-portal-card apex-spring-interactive">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:6px;">
                  <div style="font-size:14.5px; font-weight:800; color:var(--text-charcoal-deep);">\${esc(p.name)}</div>
                  <span style="font-size:10px; font-weight:800; color:#6B21A8; background:#FAF5FF; padding:2px 6px; border-radius:4px;">CHÍNH THỨC</span>
                </div>
                <div style="font-size:11.5px; color:#6B21A8; font-weight:700; margin-top:2px;">🏛️ \${esc(p.provider)}</div>
                <div style="font-size:11.5px; color:var(--text-muted); margin-top:6px; line-height:1.4;">
                  Xác thực bằng thẻ SV hoặc email trường (.edu.vn) trực tiếp tại cổng đối tác.
                </div>
              </div>
              <div style="border-top:1px dashed #E9D5FF; padding-top:8px; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:10px; color:var(--text-muted);">0 quảng cáo ảo</span>
                <a href="\${p.url || p.official_source_url}" target="_blank" rel="noopener noreferrer" class="apex-btn apex-btn-sm apex-btn-secondary" style="font-size:11px; text-decoration:none; padding:4px 10px;">
                  Mở Cổng Xác Thực ↗
                </a>
              </div>
            </div>
          \`).join('')}
        </div>
      </section>
    \`;
  }

  function renderCommunityProofIntakePromptSection() {
    return \`
      <!-- 5. BÁO NGUỒN ƯU ĐÃI & BẰNG CHỨNG CỘNG ĐỒNG -->
      <section class="jayt-tier-section" style="margin-top: 10px; background: linear-gradient(135deg, rgba(6, 78, 59, 0.04) 0%, #FFFFFF 100%); border: 1px dashed var(--emerald-border);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-size:15px; font-weight:900; color:var(--emerald-text); display:flex; align-items:center; gap:6px;">
              <span>➕</span> 5. Báo Nguồn Ưu Đãi / Quán Ăn Bạn Vừa Thấy
            </div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">
              Cùng sinh viên Đà Nẵng xây dựng nguồn tin cậy: Tự động lọc thông tin riêng tư (PII) và đối soát thực tế trước khi lên 🟢.
            </div>
          </div>
          <button type="button" class="apex-btn apex-btn-sm apex-btn-pine" data-action="open-report-deal-modal" style="min-height:44px; padding:0 18px; font-weight:800;">
            📝 Gửi Tín Hiệu Mới
          </button>
        </div>
      </section>
    \`;
  }
`;

let jsContent = fs.readFileSync(jsSotPath, 'utf8');

// Insert the new section renderers
if (!jsContent.includes('WEEKLY_SAVINGS_CALENDAR_164')) {
  jsContent = jsContent.replace(
    '// --- MAIN 5 CATEGORY HUBS EXPERIENCE CENTER ---',
    jsWeeklySchedule164 + '\n  // --- MAIN 5 CATEGORY HUBS EXPERIENCE CENTER ---'
  );
}

// Update renderCategoryHubsCenter163 to include the 5-Stage Life-Rhythm sequence
if (!jsContent.includes('renderWeeklySavingsScheduleSection()')) {
  jsContent = jsContent.replace(
    '<!-- TẦNG 3: 🟣 NGUỒN CÔNG KHAI ĐANG THEO DÕI (TRACKED SOURCES) -->',
    `\${renderWeeklySavingsScheduleSection()}

        \${renderOnlineStudentPortalsSection()}

        \${renderCommunityProofIntakePromptSection()}

        <!-- TẦNG 3: 🟣 NGUỒN CÔNG KHAI ĐANG THEO DÕI (TRACKED SOURCES) -->`
  );
}

fs.writeFileSync(jsSotPath, jsContent, 'utf8');
fs.writeFileSync(jsDeployPath, jsContent, 'utf8');
console.log('✅ Updated jayt_apex_interface.js and deploy/jayt_apex_interface.js with 5-Stage Life-Rhythm UX.');
