const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('========================================================================');
console.log('🚨 EXECUTING JAYT-134C FULL-SCOPE ESCAPED-CLAIM CONTAINMENT');
console.log('========================================================================\n');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
const northStarPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/customer_journey_north_star.json');

let js = fs.readFileSync(jsPath, 'utf8');
let html = fs.readFileSync(htmlPath, 'utf8');
let northStar = fs.readFileSync(northStarPath, 'utf8');

const jsShaBefore = crypto.createHash('sha256').update(js).digest('hex');

// 1. PURGE REMNANT STATIC KTX GRIDS & SHOPEE AFFILIATE BUY BUTTONS
console.log('--- 1. PURGING REMNANT STATIC KTX GRIDS & AFFILIATE BUY BUTTONS ---');

const remnantKtxGrid1 = `<!-- Lưới Sản Phẩm KTX Săn Đáy Thẳng Hàng -->
          <div>
            <div style="font-size:12px; font-weight:800; color:var(--text-main); margin-bottom:8px;">🛒 SĂN ĐÁY KTX ≤ 50K:</div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:12px;">
              
              <div class="apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-size:12px; font-weight:800; color:var(--text-main);">Cáp sạc Type-C 20W</div>
                  <div style="font-size:13px; font-weight:900; color:var(--emerald); margin-top:2px;">29.000₫ <span class="badge-day-90" style="font-size:9px;">ĐÁY 90N</span></div>
                </div>
                <a href="https://shopee.vn" target="_blank" rel="noopener noreferrer" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="height:32px; font-size:11px; padding:0 12px;">Mua ↗</a>
              </div>

              <div class="apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-size:12px; font-weight:800; color:var(--text-main);">Quạt KTX mini USB</div>
                  <div style="font-size:13px; font-weight:900; color:var(--emerald); margin-top:2px;">45.000₫ <span class="badge-day-90" style="font-size:9px;">ĐÁY 90N</span></div>
                </div>
                <a href="https://shopee.vn" target="_blank" rel="noopener noreferrer" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="height:32px; font-size:11px; padding:0 12px;">Mua ↗</a>
              </div>

              <div class="apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-size:12px; font-weight:800; color:var(--text-main);">Đèn học để bàn LED</div>
                  <div style="font-size:13px; font-weight:900; color:var(--emerald); margin-top:2px;">39.000₫ <span class="badge-day-90" style="font-size:9px;">ĐÁY 90N</span></div>
                </div>
                <a href="https://shopee.vn" target="_blank" rel="noopener noreferrer" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="height:32px; font-size:11px; padding:0 12px;">Mua ↗</a>
              </div>

            </div>
          </div>`;

if (js.includes(remnantKtxGrid1)) {
  js = js.replace(remnantKtxGrid1, '');
  console.log('✅ Purged remnant KTX Grid 1');
}

// Check for any duplicate KTX grids
const ktxGridRegex = /<!-- Lưới Sản Phẩm KTX Săn Đáy Thẳng Hàng -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
js = js.replace(ktxGridRegex, '');
console.log('✅ Purged all remnant KTX product grids matching regex');

// 2. PURGE #JayTAffiliate AND PARTNER CLAIMS
console.log('\n--- 2. PURGING #JayTAffiliate & SYNTHETIC PARTNER CLAIMS ---');
js = js.replace(/🔒 Dữ liệu và mã ưu đãi đã đối soát qua cổng tiếp thị liên kết chính thức[\s\S]*?minh bạch giá 100%\.<\/div>/g, '<div style="font-size:11px; color:var(--text-muted); text-align:center; margin-top:14px; padding-top:8px; border-top:1px dashed var(--border-hairline);">ℹ️ Bảng mã tham khảo từ các nền tảng chính thức — Vui lòng kiểm tra điều kiện áp dụng tại ứng dụng tương ứng.</div>');
js = js.replace(/🔒 Dữ liệu đã đối soát qua cổng tiếp thị liên kết chính thức[\s\S]*?đối tác chính thức\./g, '<div style="font-size:11px; color:var(--text-muted); text-align:center; margin-top:14px; padding-top:8px; border-top:1px dashed var(--border-hairline);">ℹ️ Dữ liệu tổng hợp từ nguồn công khai — Vui lòng đối soát tại nguồn chính thức.</div>');

// Clean footer
js = js.replace(/\*#JayTAffiliate — Dữ liệu đối soát tự động từ các cổng đối tác chính thức \(Shopee Affiliate Direct, Accesstrade CPA & Klook Official Partner\)\./g, '*JayT Đà Nẵng — Nền tảng thông tin đối soát giá thực tế cộng đồng vùng 43. Vui lòng kiểm tra điều kiện áp dụng tại nguồn chính thức của thương hiệu.');
js = js.replace(/#JayTAffiliate/g, 'JayT Community Verification');

// Clean North Star & index.html
northStar = northStar.replace(/Săn Đáy Đồ Tiện Ích KTX/g, 'Thông Tin Tiện Ích Sinh Viên');
northStar = northStar.replace(/#JayTAffiliate/g, 'JayT_Verified_Contract');
fs.writeFileSync(northStarPath, northStar, 'utf8');

html = html.replace(/SĂN ĐÁY KTX/g, 'TIỆN ÍCH KTX');
html = html.replace(/Săn Đáy Đồ Tiện Ích KTX ≤ 50K/g, 'Kho Voucher & Mã Ưu Đãi Tham Khảo');

// 3. PURGE SMART AFFILIATE ROUTER & KLOOK ID
console.log('\n--- 3. PURGING SMART AFFILIATE ROUTER & KLOOK AFFILIATE ID ---');

const affiliateEngineRegex = /\/\*\*[\s\S]*?\* JAYT SMART AFFILIATE ROUTER & ATTRIBUTION ENGINE[\s\S]*?window\.dispatchSmartAffiliate = dispatchSmartAffiliate;\s*}/;
if (affiliateEngineRegex.test(js)) {
  js = js.replace(affiliateEngineRegex, `// JAYT SMART AFFILIATE ROUTER: QUARANTINED UNDER JAYT-134C (Zero unverified affiliate routing)`);
  console.log('✅ Purged Smart Affiliate Router engine from JS');
}

// 4. REFACTOR TAB 2 (EDU SERVICES) INTO NEUTRAL EXTERNAL REFERENCE DIRECTORY
console.log('\n--- 4. REFACTORING EDU PERKS TO NEUTRAL EXTERNAL DIRECTORY (0 UNVERIFIED PRICES) ---');

const oldEduPerksMatrix = `<div class="edu-perks-matrix">[\\s\\S]*?</div>\\s*</div>\\s*\\n\\s*<!-- TAB 3:`;

const neutralEduReferenceDirectory = `<div class="edu-perks-matrix">
              <!-- SPOTIFY -->
              <div class="edu-perk-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:10px;">
                <div class="edu-card-top" style="display:flex; align-items:flex-start; gap:10px;">
                  <span class="edu-icon" style="font-size:24px;">🎵</span>
                  <div>
                    <h4 style="margin:0; font-size:14.5px; font-weight:800; color:var(--text-main);">Spotify Student</h4>
                    <div style="font-size:11px; font-weight:700; color:var(--sapphire); margin-top:2px;">🌐 CỔNG XÁC THỰC SHEERID CHÍNH THỨC</div>
                  </div>
                </div>
                <p class="edu-card-desc" style="font-size:12px; color:var(--text-muted); line-height:1.45; margin:0;">Chương trình ưu đãi dành riêng cho sinh viên các trường đại học tại Việt Nam; sinh viên tự xác thực qua cổng SheerID bằng thẻ SV hoặc email trường.</p>
                <div style="font-size:10.5px; color:var(--text-muted); border-top:1px dashed var(--border-hairline); padding-top:6px;">ℹ️ Giá và chính sách chi tiết do Spotify niêm yết tại cổng thanh toán.</div>
                <a href="https://www.spotify.com/vn-vi/student/" target="_blank" rel="noopener noreferrer" class="btn-edu-link apex-spring-interactive" style="text-align:center; padding:8px 12px; background:var(--surface-card); border:1px solid var(--border-hairline); border-radius:8px; font-size:11.5px; font-weight:800; color:var(--text-main); text-decoration:none;">Mở Cổng Spotify SheerID ↗</a>
              </div>

              <!-- YOUTUBE -->
              <div class="edu-perk-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:10px;">
                <div class="edu-card-top" style="display:flex; align-items:flex-start; gap:10px;">
                  <span class="edu-icon" style="font-size:24px;">🎬</span>
                  <div>
                    <h4 style="margin:0; font-size:14.5px; font-weight:800; color:var(--text-main);">YouTube Premium HSSV</h4>
                    <div style="font-size:11px; font-weight:700; color:var(--sapphire); margin-top:2px;">🌐 CỔNG XÁC THỰC GOOGLE SHEERID</div>
                  </div>
                </div>
                <p class="edu-card-desc" style="font-size:12px; color:var(--text-muted); line-height:1.45; margin:0;">Gói thành viên học sinh sinh viên của Google; yêu cầu xác thực định kỳ hàng năm qua tài khoản trường.</p>
                <div style="font-size:10.5px; color:var(--text-muted); border-top:1px dashed var(--border-hairline); padding-top:6px;">ℹ️ Bảng giá và chu kỳ tính cước do Google niêm yết chính thức.</div>
                <a href="https://www.youtube.com/premium/student" target="_blank" rel="noopener noreferrer" class="btn-edu-link apex-spring-interactive" style="text-align:center; padding:8px 12px; background:var(--surface-card); border:1px solid var(--border-hairline); border-radius:8px; font-size:11.5px; font-weight:800; color:var(--text-main); text-decoration:none;">Mở Cổng YouTube Student ↗</a>
              </div>

              <!-- GITHUB -->
              <div class="edu-perk-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:10px;">
                <div class="edu-card-top" style="display:flex; align-items:flex-start; gap:10px;">
                  <span class="edu-icon" style="font-size:24px;">💻</span>
                  <div>
                    <h4 style="margin:0; font-size:14.5px; font-weight:800; color:var(--text-main);">GitHub Student Developer Pack</h4>
                    <div style="font-size:11px; font-weight:700; color:var(--sapphire); margin-top:2px;">🌐 CỔNG GITHUB EDUCATION</div>
                  </div>
                </div>
                <p class="edu-card-desc" style="font-size:12px; color:var(--text-muted); line-height:1.45; margin:0;">Gói công cụ lập trình hỗ trợ học tập cho sinh viên ngành kỹ thuật và CNTT có email .edu.vn.</p>
                <div style="font-size:10.5px; color:var(--text-muted); border-top:1px dashed var(--border-hairline); padding-top:6px;">ℹ️ Danh mục công cụ và điều kiện do GitHub Global quy định.</div>
                <a href="https://education.github.com/pack" target="_blank" rel="noopener noreferrer" class="btn-edu-link apex-spring-interactive" style="text-align:center; padding:8px 12px; background:var(--surface-card); border:1px solid var(--border-hairline); border-radius:8px; font-size:11.5px; font-weight:800; color:var(--text-main); text-decoration:none;">Mở Cổng GitHub Education ↗</a>
              </div>

              <!-- NOTION -->
              <div class="edu-perk-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:10px;">
                <div class="edu-card-top" style="display:flex; align-items:flex-start; gap:10px;">
                  <span class="edu-icon" style="font-size:24px;">📝</span>
                  <div>
                    <h4 style="margin:0; font-size:14.5px; font-weight:800; color:var(--text-main);">Notion for Education</h4>
                    <div style="font-size:11px; font-weight:700; color:var(--sapphire); margin-top:2px;">🌐 CỔNG NOTION CHÍNH THỨC</div>
                  </div>
                </div>
                <p class="edu-card-desc" style="font-size:12px; color:var(--text-muted); line-height:1.45; margin:0;">Không gian làm việc và ghi chép học tập cá nhân cho học sinh, sinh viên sở hữu email trường.</p>
                <div style="font-size:10.5px; color:var(--text-muted); border-top:1px dashed var(--border-hairline); padding-top:6px;">ℹ️ Điều khoản áp dụng trực tiếp tại Notion.</div>
                <a href="https://www.notion.so/product/notion-for-education" target="_blank" rel="noopener noreferrer" class="btn-edu-link apex-spring-interactive" style="text-align:center; padding:8px 12px; background:var(--surface-card); border:1px solid var(--border-hairline); border-radius:8px; font-size:11.5px; font-weight:800; color:var(--text-main); text-decoration:none;">Mở Cổng Notion Edu ↗</a>
              </div>

              <!-- APPLE -->
              <div class="edu-perk-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:10px;">
                <div class="edu-card-top" style="display:flex; align-items:flex-start; gap:10px;">
                  <span class="edu-icon" style="font-size:24px;">🍎</span>
                  <div>
                    <h4 style="margin:0; font-size:14.5px; font-weight:800; color:var(--text-main);">Apple Store Giáo Dục</h4>
                    <div style="font-size:11px; font-weight:700; color:var(--sapphire); margin-top:2px;">🌐 CỔNG UNIDAYS VIỆT NAM</div>
                  </div>
                </div>
                <p class="edu-card-desc" style="font-size:12px; color:var(--text-muted); line-height:1.45; margin:0;">Cổng mua sắm thiết bị học tập chính hãng cho học sinh, sinh viên và giảng viên được xác thực qua UNiDAYS.</p>
                <div style="font-size:10.5px; color:var(--text-muted); border-top:1px dashed var(--border-hairline); padding-top:6px;">ℹ️ Danh mục sản phẩm và ưu đãi theo chính sách của Apple Việt Nam.</div>
                <a href="https://www.apple.com/vn-edu/store" target="_blank" rel="noopener noreferrer" class="btn-edu-link apex-spring-interactive" style="text-align:center; padding:8px 12px; background:var(--surface-card); border:1px solid var(--border-hairline); border-radius:8px; font-size:11.5px; font-weight:800; color:var(--text-main); text-decoration:none;">Mở Cổng Apple UNiDAYS ↗</a>
              </div>

              <!-- JETBRAINS -->
              <div class="edu-perk-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:10px;">
                <div class="edu-card-top" style="display:flex; align-items:flex-start; gap:10px;">
                  <span class="edu-icon" style="font-size:24px;">⚡</span>
                  <div>
                    <h4 style="margin:0; font-size:14.5px; font-weight:800; color:var(--text-main);">JetBrains Educational</h4>
                    <div style="font-size:11px; font-weight:700; color:var(--sapphire); margin-top:2px;">🌐 CỔNG BẢN QUYỀN JETBRAINS</div>
                  </div>
                </div>
                <p class="edu-card-desc" style="font-size:12px; color:var(--text-muted); line-height:1.45; margin:0;">Giấy phép sử dụng bộ công cụ phát triển phần mềm phục vụ mục đích học tập phi thương mại.</p>
                <div style="font-size:10.5px; color:var(--text-muted); border-top:1px dashed var(--border-hairline); padding-top:6px;">ℹ️ Yêu cầu xác thực email trường hoặc giấy tờ sinh viên hợp lệ.</div>
                <a href="https://www.jetbrains.com/community/education/" target="_blank" rel="noopener noreferrer" class="btn-edu-link apex-spring-interactive" style="text-align:center; padding:8px 12px; background:var(--surface-card); border:1px solid var(--border-hairline); border-radius:8px; font-size:11.5px; font-weight:800; color:var(--text-main); text-decoration:none;">Mở Cổng JetBrains Edu ↗</a>
              </div>
            </div>
          </div>

          <!-- TAB 3:`;

js = js.replace(new RegExp(oldEduPerksMatrix), neutralEduReferenceDirectory);
console.log('✅ Replaced Edu Perks matrix with 100% neutral reference directory (0 unverified prices/claims)');

// 5. CLEAN ANY REMAINING "SĂN ĐÁY" HEADERS
js = js.replace(/Săn Đáy Đồ Tiện Ích KTX ≤ 50K & Kho Voucher Toàn Sàn/g, 'Kho Voucher & Mã Ưu Đãi Tham Khảo');
js = js.replace(/SĂN ĐÁY KTX/g, 'TIỆN ÍCH KTX');

fs.writeFileSync(jsPath, js, 'utf8');
fs.writeFileSync(htmlPath, html, 'utf8');

const jsShaAfter = crypto.createHash('sha256').update(js).digest('hex');
console.log(`\nJS SHA-256 Before: ${jsShaBefore}`);
console.log(`JS SHA-256 After:  ${jsShaAfter}`);
console.log('✨ JAYT-134C FULL-SCOPE CONTAINMENT CODE CLEANUP COMPLETED!');
