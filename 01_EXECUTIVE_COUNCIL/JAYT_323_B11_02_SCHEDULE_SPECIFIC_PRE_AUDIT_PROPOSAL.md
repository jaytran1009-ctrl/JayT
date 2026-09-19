# JAYT-323 — B11_02 Schedule-Specific Pre-Audit Proposal

- **Proposal ID:** `JAYT_323_B11_02_SCHEDULE_SPECIFIC_PRE_AUDIT_PROPOSAL`
- **Governing Directive:** `JAYT-323`
- **Work Order Reference:** [01_EXECUTIVE_COUNCIL/JAYT_323_B11_02_SCHEDULE_SPECIFIC_PRE_AUDIT_WORK_ORDER.md](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/01_EXECUTIVE_COUNCIL/JAYT_323_B11_02_SCHEDULE_SPECIFIC_PRE_AUDIT_WORK_ORDER.md)
- **Submitted by:** Data & Trust Lead & QA Lead
- **Submitted at UTC:** `2026-09-04T15:48:00Z`
- **Mode:** `DISCOVERY_AND_PRE_AUDIT_ONLY` (zero capture quota, zero vault write, zero registry mutation, zero hydration, zero deploy).

---

## 1. Executive Summary & Objective

In strict compliance with [01_EXECUTIVE_COUNCIL/JAYT_323_B11_02_SCHEDULE_SPECIFIC_PRE_AUDIT_WORK_ORDER.md](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/01_EXECUTIVE_COUNCIL/JAYT_323_B11_02_SCHEDULE_SPECIFIC_PRE_AUDIT_WORK_ORDER.md), this proposal refines candidate **B11_02** (`B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022`).

- **Correction of Vague References:** The previous proposal extracted an introductory sentence mentioning activities *"trong thời gian tới"*, which lacked a concrete recurrence rule.
- **Schedule-Specific Refinement:** The official 2026 leaf page contains an exact, recurring operational schedule for the Champa dance cultural program. This proposal targets the explicit recurrence rule sentence, completely rejecting "coming soon" or indefinite timeline language.

---

## 2. Refined Candidate Specification & Verbatim Schedule Span

- **Candidate ID:** `B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022`
- **Slot ID:** `B11_02`
- **Official Leaf URL:** `https://1022.vn/nhieu-trai-nghiem-moi-cho-du-khach-tai-bao-tang-dieu-khac-cham-da-nang/`
- **Publication Date:** `2026-08-28` (Announcement: `2026-08-27`)
- **Publishers:** Cổng Thông tin Dịch vụ công 1022 Đà Nẵng / Báo Đà Nẵng / Bảo tàng Điêu khắc Chăm Đà Nẵng / Sở Văn hóa và Thể thao TP. Đà Nẵng.
- **Content Tier:** `T2_CIVIC_CULTURE`
- **Intended Card Title:** *Lịch biểu diễn nghệ thuật vũ điệu Champa — Bảo tàng Điêu khắc Chăm Đà Nẵng*

### Exact Verbatim Schedule Span:
> *"Chương trình nghệ thuật vũ điệu Champa gồm các tiết mục múa Apsara, hòa tấu nhạc cụ Chăm và múa Vũ hội làng Chăm sẽ được tổ chức vào buổi sáng các ngày 15 và 30 hằng tháng."*

- **Supporting Context Sentence:**
  > *"Mỗi suất diễn kéo dài khoảng 30 phút tại sân vườn phía đông của bảo tàng. Trong trường hợp thời tiết không thuận lợi, chương trình sẽ được chuyển vào Phòng trưng bày chuyên đề tại tầng 2."*

### Forensic Offset Verification:
- **Character Offset in HTML:** `100437`
- **UTF-8 Byte Offset in HTML:** `101310`
- **Occurrences in Body:** Exactly **1** occurrence.
- **Recurrence Rule Certified:** Fixed recurring morning schedule on the **15th and 30th of every month**.

---

## 3. Non-Commercial Card Boundary & Safeguards

- **Mandatory Disclaimer:**
  > *"Thông tin lịch biểu diễn nghệ thuật văn hóa cộng đồng trích xuất từ thông báo chính thức của Bảo tàng Điêu khắc Chăm trên Cổng 1022 Đà Nẵng; không bán vé biểu diễn, không kinh doanh tour du lịch, không thu phí dịch vụ hay thu thập dữ liệu cá nhân."*
- **8 Strict Prohibitions Enforced:**
  1. `ticket_sales` — Prohibited.
  2. `paid_show_booking` — Prohibited.
  3. `tour_agency_intermediary` — Prohibited.
  4. `performance_fees` — Prohibited.
  5. `personal_data_collection` — Prohibited.
  6. `affiliate` — Prohibited.
  7. `tracking` — Prohibited.
  8. `production_mutation` — Prohibited.

---

## 4. Deduplication Audit Against 23 Staging Cards

A comprehensive deduplication cross-check was executed against all 23 cards currently active in the Canonical Registry ([00_PROGRAM_BASELINE/JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json)):

- **Zero Overlap:** No existing card addresses the Cham Sculpture Museum or Champa dance cultural programming.
- **Zero Conflict:** The domain (`T2_CIVIC_CULTURE`) expands the civic utility offerings into municipal heritage and public community performances without commercial entanglement.

---

## 5. Strict Governance Gate & Zero Quota Enforcement

- **Quota Consumed:** Exactly **0** captures performed.
- **Vault Files Written:** Exactly **0** files written to `batch_11_ingress_vault/` for B11_02.
- **Registry Unchanged:** Pinned at 23 cards.
- **Staging Platform Intact:** Serving 23 cards with `PERFECT_MATCH_ZERO_DRIFT` on port 4173.
- **Production Isolation:** Live Production strictly preserved at `v3.420.0` (3 cards, zero deploy authority).
- **Status:** `DISCOVERY_PRE_AUDIT_PROPOSAL_ONLY__AWAITING_COUNCIL_TARGETED_INGRESS_SCOPE`.
