const { applyProjectMemoryTransaction067 } = require('./memory_transaction_manager_057.js');

const res = applyProjectMemoryTransaction067({
  version: '3.197.0',
  workOrder: 'JAYT-095-STAGING-UI-CONVERGENCE-AND-FREEZE',
  workOrderDescription: 'Khắc phục triệt để lỗi taxonomy work order bị từ chối và hoàn tất closeout 095 ở trạng thái Staging UI Review Only',
  headerStatusLine: '095: IN_PROGRESS — STAGING UI REVIEW ONLY (NO RELEASE CANDIDATE EMITTED · REJECTED WO TAXONOMY RECTIFIED · PRODUCTION LOCKED)',
  section4Row: '| **Trạng Thái Giao Diện 095** | `STAGING_UI_REVIEW_ONLY` | Đóng băng 094/094A/094B; gỡ khỏi danh sách CEO-approved; dừng emit candidate; hoàn thiện Staging UI với 100% dữ liệu thật. |',
  section5CriteriaText: `### 🎯 Mục Tiêu JAYT-095 (STAGING UI CONVERGENCE & FREEZE)

1. **Đóng Băng Candidates 094/094A/094B & Công Bố Sự Cố Append-Only**:
   - Ban hành \`DISCLOSURE_RECORD_094B_RE_EMISSION_AND_DIRECT_MUTATION.json\`, cô lập 094, 094A, 094B; dừng phát hành candidate liên tiếp trong work order 095.
2. **Khắc Phục Toàn Diện Taxonomy Work Order Bị Từ Chối (094/094A/094B)**:
   - Gỡ vĩnh viễn 094, 094A, 094B khỏi danh sách CEO-approved trong \`memory_transaction_manager_057.js\`; ban hành \`CORRECTION_RECEIPT_095_REJECTED_WO_TAXONOMY_INTEGRITY.json\`; bổ sung negative test chặn fail-closed mọi claim phê duyệt cho 3 mã bị từ chối.
3. **Hoàn Thiện Giao Diện Staging Bento Discovery (100% Dữ Liệu Thật)**:
   - Tinh chỉnh Bento Discovery Engine (45% Hero Discovery Card, 30% Context Cards Gong Cha/Phê La, 25% Fintech Split Bill & Amber Radar, Viewport 2 với 4 địa điểm xác minh tại Đà Nẵng); 0 claim ảo, 0 tràn ngang, touch targets >= 44px.
4. **Kiểm Thử & Đánh Giá Thẩm Mỹ Thị Giác Trực Quan (Chưa Phát Hành Candidate)**:
   - Chụp ảnh render từ Staging HTTP (1440px, 768px, 390px) phục vụ CEO đánh giá thẩm mỹ thị giác; không phát hành candidate mới cho đến khi CEO chốt duyệt UI.
5. **Bảo Toàn Khóa Sản Xuất Tuyệt Đối**:
   - \`deals_feed.json: []\` (0 records, 0 bytes) và \`RELEASE_MANIFEST.is_approved: false\`.`,
  section6LogEntry: `| \`2026-08-25T15:22:00+07:00\` | \`JAYT-095-STAGING-UI-CONVERGENCE-AND-FREEZE\` | Khắc phục lỗi taxonomy work order bị từ chối & Đóng closeout 095 ở chế độ Staging UI Review: (1) Gỡ 094, 094A, 094B khỏi HISTORICAL_CEO_APPROVED_WORK_ORDERS; (2) Ban hành CORRECTION_RECEIPT_095_REJECTED_WO_TAXONOMY_INTEGRITY.json; (3) Bổ sung test âm chặn fail-closed mọi claim phê duyệt cho 094/094A/094B (12/12 PASS); (4) Đóng 095 ở trạng thái STAGING UI REVIEW ONLY, tuyệt đối không tạo candidate mới cho đến khi CEO chốt duyệt UI; (5) Khóa sản xuất deals_feed.json: [] (is_approved: false). | [\`08_RELEASE_VAULT/CORRECTION_RECEIPT_095_REJECTED_WO_TAXONOMY_INTEGRITY.json\`](08_RELEASE_VAULT/CORRECTION_RECEIPT_095_REJECTED_WO_TAXONOMY_INTEGRITY.json) | \`test_staging_ui_freeze_095.js\` (12/12 PASS) | **IN_PROGRESS — STAGING UI REVIEW ONLY** |`
});

console.log('✅ Closeout 095 Success:', res);
