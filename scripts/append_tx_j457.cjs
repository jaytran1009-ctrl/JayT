const fs = require('fs');
const path = require('path');

const memoryPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md');
let content = fs.readFileSync(memoryPath, 'utf8').trimEnd();

const entry = `\n\n<!-- TRANSACTION START: TX_20260919_JAYT_457_AUTHENTICITY_GATE_ENFORCED -->
## TX_20260919_JAYT_457_AUTHENTICITY_GATE_ENFORCED
- **Thời gian hiệu lực**: 2026-09-19T16:17:30+07:00 (19/09/2026).
- **Mã Chủ tịch**: \`CHAIRMAN_DIRECTIVE_20260919_RATIFY_JAYT_456_AUTHENTICITY_ENFORCEMENT\` (JAYT-457).
- **Mã điều hành CEO**: \`CEO_DISPATCH_20260919_JAYT_457_AUTHENTICITY_GATE\` (P0 / RELEASE AUTHENTICITY BLOCKER).
- **Nguyên tắc Tối cao về Bằng chứng**:
  1. *Evidence generator chỉ thu thập, chuẩn hóa và đóng gói bằng chứng; tuyệt đối không sáng tác bằng chứng.*
  2. *Nguồn authority bắt buộc*: GitHub Run ID $\\rightarrow$ GitHub; Git Commit SHA $\\rightarrow$ Git repository; Vercel Deployment ID $\\rightarrow$ Vercel; Live Artifact SHA-256 $\\rightarrow$ bytes tải trực tiếp từ deployment; Canonical Production Authority $\\rightarrow$ Governance Record.
  3. *Cấm tạo identifier ngoại vi bằng fixture, mock, seed script hay random number.*
  4. *Permanent Release Gate*: Thiết lập vĩnh viễn cổng \`EVIDENCE-AUTH-01\` cấp công ty — tự động block toàn bộ tiến trình nếu identifier ngoại vi không thể truy nguyên authority thật.
- **Thực thi Authenticity Pack (\`JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/AUTHENTICITY/\`)**:
  - \`review-authenticity-benchmark.json\`: Bộ dữ liệu benchmark độc lập, máy đọc được, gồm đúng 10 mẫu (5 mẫu seeding qua 5 vector tấn công + 5 mẫu đánh giá thật). SHA-256: \`4cc86e85f3c87a4d92d07218fb4c8f3078e0b5c54a3af47a2cce699b90b110b4\`.
  - \`review-benchmark-verification.json\` (AUTH-05): Kiểm định per-sample phân loại thật trên môi trường sandbox VM. Ma trận nhầm lẫn: TP=5, FP=0, FN=0, TN=5, Precision=1.0, Recall=1.0, F1=1.0. Trạng thái: \`PASS\`.
  - \`github-run-verification.json\` (AUTH-01): Đánh dấu toàn bộ 5 ID mô phỏng trước đây (\`17897450211..215\`) là \`INVALID_FOR_ACCEPTANCE\`. Ghi nhận trung thực hiện tại máy trạm chưa kết nối GitHub remote repository authority và chưa cấu hình token bí mật. Trạng thái: \`NOT_VERIFIED\`.
  - \`git-commit-identity.json\` (AUTH-02): Tách bạch rạch ròi giữa \`git_commit_sha\` và \`source_artifact_sha256\`. Do root workspace không phải Git working tree và host không có git CLI, \`git_commit_sha\` được định danh trung thực là \`NOT_VERIFIED\`. Khóa bất biến \`git_commit_sha != source_artifact_sha256\` (\`PASS\`). Trạng thái: \`NOT_VERIFIED\`.
  - \`canonical-production-authority.json\` (AUTH-04): Thẩm định thẩm quyền Vercel qua HTTP headers live thực tế (\`x-vercel-id\`, \`etag\`, \`server: Vercel\`). URL canonical \`https://jayt-production-v3420.vercel.app\` tải đúng 1,103,674 bytes, SHA-256 \`d253c768aa86014ebd0fc584ee6156a5f53c3f52eacfb1ca381f189e334cd5ca\`, bit-identical match với immutable deployment \`dpl_4zPWezybXB9p2aWABy2i8wu7b6b6\` và local SSOT. Trạng thái: \`PASS\`.
  - \`ceo-matrix-canonical.json\` (AUTH-03): Khôi phục nguyên bản 14 điều kiện canonical (xóa sạch nhãn tự chế C01..C14). Ghi nhận trung thực: 11 điều kiện \`PASS\`, 3 điều kiện \`NOT_VERIFIED\` (do thiếu GitHub remote runner và Git commit authority). Trạng thái tổng: \`NOT_VERIFIED\`.
  - \`authenticity-verdict.json\`: Tổng hợp phán quyết kiểm toán trung thực. Final verdict: \`NOT_VERIFIED\`.
- **Kỷ luật Bàn giao & Release**:
  - \`FEATURE1_UX_HANDOVER = BLOCKED\` (Không tự chuyển approved khi chưa đủ authority thật).
  - \`PUBLIC_RELEASE = BLOCKED\` (Tuân thủ quy trình hiến định: UX completion $\\rightarrow$ Technical Regression $\\rightarrow$ Internal Human Behavior Evidence Gate $\\rightarrow$ Product Final Acceptance $\\rightarrow$ Dual-Key Public Release).
  - \`AFFILIATE_ENABLED = FALSE\` (Fail-Closed bảo toàn tuyệt đối).
<!-- TRANSACTION END: TX_20260919_JAYT_457_AUTHENTICITY_GATE_ENFORCED -->\n`;

fs.writeFileSync(memoryPath, content + entry, 'utf8');
console.log('Appended TX_20260919_JAYT_457_AUTHENTICITY_GATE_ENFORCED to PROJECT_MEMORY.md');
