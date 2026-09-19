# HỘI ĐỒNG ĐIỀU HÀNH JAYT: BIÊN BẢN HỢP NHẤT CHUẨN HÓA TITLE SEMANTIC MAPPING & LITERAL CONTRACT (MỤC AH — JAYT-245)

**Thời gian:** 2026-08-29T00:44:00+07:00  
**Địa điểm:** Trực tuyến / Phòng Điều hành JayT  
**Chủ trì:** Hội đồng Điều hành 7 Phòng ban  
**Căn cứ chỉ thị:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục AH)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Vault Raw Evidence Thật (9 Targets):** [real_raw_evidence_vault](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/04_DATA_PIPELINE/real_raw_evidence_vault)  
**Field-Complete Manifest AH:** [field_provenance_manifest_ah.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/04_DATA_PIPELINE/field_provenance_manifest_ah.json)  
**Real Mutation Test Suite (AH):** [test_real_mutation_and_validator_suite.js](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/test_real_mutation_and_validator_suite.js)  
**Biên Nhận Release Parity v3.417.0:** [production_release_receipt_v3417.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/production_release_receipt_v3417.json)  
**Phiên bản Production Live:** \`v3.417.0\`  
**Địa chỉ Live:** [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)  
**Trạng thái Quản trị:** \`AH TITLE SEMANTIC MAPPING & LITERAL CONTRACT — 9 OFFICIAL SOURCES + 8 RADAR ITEMS ON PRODUCTION LIVE\`

---

## 1. Báo Cáo Triển Khai Lệnh P0 Của 7 Phòng Ban (Mục AH)

| Phòng Ban | Trưởng Bộ Phận | Kết Quả Thực Thi Chu Kỳ Mục AH |
|---|---|---|
| **Data & Trust** | Chief Data Officer | - **Chuẩn Hóa 100% Literal Exact Title Cho 9 Nguồn (`field_provenance_manifest_ah.json`):**\<br\>  * Loại bỏ hoàn toàn các từ ngữ suy diễn không có chứng minh trực tiếp trong quote (như "Gói Sinh Viên", "Premium Sinh Viên", "365 Giáo Dục").\<br\>  * Chuyển toàn bộ 9 title sang \`LITERAL_EXACT\` mapping: \`title.value === title.exact_quote\` (GitHub Student Developer Pack, Notion for Education, Microsoft Education, Canva, Spotify, Apple Music, Free JetBrains Student Pack, Figma for Education, AWS Educate).\<br\>  * Khai báo rõ ràng quy ước offset: \`unicode_codepoint_offset\`. |
| **QA Directorate** | QA Director | - **Nâng Cấp Validator Engine (`provenance_validator_engine.js`):**\<br\>  * Bắt buộc kiểm tra khắt khe: Nếu \`mapping_type === 'LITERAL_EXACT'\` thì \`value\` phải bằng đúng \`exact_quote\`. Cấm mọi sự suy diễn/mở rộng title từ quote ngắn.\<br\>  * Thử thách 10 bài test đột biến đối kháng (đặc biệt Mutation 1: Bắt trúng việc cố tình mở rộng title từ quote thương hiệu) $\\rightarrow$ **100% bắt được và fail-closed**. |
| **Product & UX/CX** | UX/CX Lead | - **Cập Nhật Giao Diện v3.417.0:**\<br\>  * Hiển thị trung thực 100% literal title của 9 nguồn chính thức.\<br\>  * 9 Card gắn badge "NGUỒN CHÍNH THỨC ĐÃ THU THẬP", tóm tắt "Nguồn chính thức đã thu thập; xem điều kiện chi tiết trên website chính thức.", phạm vi "Phạm vi theo trang nguồn".\<br\>  * 8 Radar giữ nguyên trạng thái "Radar theo dõi nguồn". |
| **Engineering & Architecture** | Chief Architect | - Hoàn tất triển khai baseline \`v3.417.0\` lên Vercel Production. Đảm bảo Release Parity SHA-256 100% khớp tuyệt đối giữa mã nguồn local và production live. |
| **Affiliate & Growth** | Growth Lead | - Tiếp tục duy trì công bố minh bạch \`PORTAL_ACCESS_NOT_VERIFIED\` cho đến khi có phiên truy cập portal hợp lệ được ủy quyền độc lập; 0 link affiliate, 0 campaign. |

---

## 2. Thống Kê 9 Nguồn Chính Thức Đã Chuẩn Hóa Title Semantic Mapping

| Target ID | Title Render Live (Literal Exact) | Exact Quote Trong Raw HTML | Offset Unicode | Mapping Type | Thẩm Định QA |
|---|---|---|:---:|:---:|:---:|
| **TGT_B_01** | GitHub Student Developer Pack | "GitHub Student Developer Pack" | 153 | LITERAL_EXACT | **100% PASS** |
| **TGT_B_02** | Notion for Education | "Notion for Education" | 240 | LITERAL_EXACT | **100% PASS** |
| **TGT_B_03** | Microsoft Education | "Microsoft Education" | 1079 | LITERAL_EXACT | **100% PASS** |
| **TGT_B_04** | Canva | "Canva" | 791 | LITERAL_EXACT | **100% PASS** |
| **TGT_B_05** | Spotify | "Spotify" | 559 | LITERAL_EXACT | **100% PASS** |
| **TGT_B_06** | Apple Music | "Apple Music" | 9440 | LITERAL_EXACT | **100% PASS** |
| **TGT_B_09** | Free JetBrains Student Pack | "Free JetBrains Student Pack" | 4763 | LITERAL_EXACT | **100% PASS** |
| **TGT_B_10** | Figma for Education | "Figma for Education" | 5156 | LITERAL_EXACT | **100% PASS** |
| **TGT_B_11** | AWS Educate | "AWS Educate" | 9912 | LITERAL_EXACT | **100% PASS** |

---

## 3. Cam Kết Quản Trị & Kế Hoạch Tiếp Theo

1. **Bảo Tồn Tuyệt Đối Sự Thật & Tính Toàn Vẹn Ngữ Nghĩa:** Mọi title và trường dữ liệu công khai trên JayT phải là bản sao nguyên văn (literal exact) hoặc chuẩn hóa có bằng chứng đầy đủ.
2. **Tiếp Tục Nghiên Cứu Làn C Tại Đà Nẵng:** Thu thập dữ liệu tiện ích công cộng cho giai đoạn tiếp theo.

**Ký tên xác nhận bởi Hội đồng 7 Phòng ban:**  
*Product Directorate · Design System Authority · UX/CX Research Group · Growth & Partnerships · Data & Trust Security · Engineering Core · Quality Assurance Directorate*
