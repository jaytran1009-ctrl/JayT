# JAYT W6 R6 — PREVIEW RECONCILIATION & ON-THE-SPOT STATUS

## Kết luận điều hành

Preview được chỉ định duy nhất cho hồ sơ này là deployment `dpl_E53DRiWGF7zbiWFRnZdP4bcPmFAJ`, URL `https://jayt-production-v3420-ez9n5dmvi-kuntran777-6857s-projects.vercel.app`, trạng thái CLI `READY`. Chấp thuận kỹ thuật hiện dựa trên bằng chứng Puppeteer local; không tuyên bố HTTP/DOM từ xa cho URL này khi môi trường còn giới hạn quota.

## Local evidence — PASS

- Script: `07_QUALITY_ASSURANCE/test_j397_counter_hud.cjs`; viewport `390x844`.
- Local HTTP `200`, 0 lỗi console, `scrollWidth=clientWidth=390`, không tràn ngang.
- Counter dock: cao `56px`, `z-index: 90`, nền `rgba(9,13,20,0.9)`, viền trên `rgb(30,41,59)`, bốn vùng chạm `44px`.
- Modal latency: Metiz `0.1ms`, Galaxy `0.1ms`, Lunch `0.3ms`, Split `0.3ms`, On-Site HUD `0.9ms`.
- Split sample: `100001 / 3 => 33.334đ/người`; banner cảnh báo trung lập hiện diện.

## Reconciliation policy

`08_RELEASE_VAULT/JAYT_W6_CANONICAL_PREVIEW_RECONCILED_RECEIPT.json` là biên nhận chuẩn. Biên nhận trong `07_QUALITY_ASSURANCE/runtime_evidence/` tham chiếu deployment khác (`dpl_93FeMQT45GjtooiTPtVJKAVyvmjY`) nên không được dùng để xác nhận Preview E53. Biên nhận cũ ghi `NOT_VERIFIED` cho URL `imeykffvj` cũng được giữ nguyên lịch sử.

## Source and seal integrity

- Sáu bản sao `jayt_apex_interface.js`: `437,574` bytes, SHA-256 `b65bbe9e0e795fb9cec2ef0c006c2a934763ed50a4d6aa8687e93911dafb8d98`.
- `J397_FNB_DIRECTORY` không còn khóa giá cố định/claim giảm giá cũ; mẹo tại quầy dùng cảnh báo trung lập.
- `scripts/verify_pipeline_seal.cjs`: `24/24 PASS` trên WS1 và WS2; runtime log `HEALTHY`, exit code `0`.

## Release boundary

- Manifest: `08_RELEASE_VAULT/W6_CANONICAL_RELEASE_MANIFEST.json`.
- Trạng thái: `PENDING_DUAL_KEY__LOCAL_EVIDENCE_ACCEPTED__REMOTE_PREVIEW_NOT_VERIFIED`.
- Production giữ nguyên `v3.449.0-j397` / `dpl_FwJP784G3382XTajmuWJ9JuYDzjN` tại `https://jayt-production-v3420.vercel.app`.
- `production_authorized=false`, `alias_mutation_authorized=false`, `affiliate_enabled=false`; chưa có deploy, tracking, affiliate dispatch hay ủy quyền đối tác.

## Điều kiện tiếp theo

1. Nhận đủ chữ ký Chairman Sponsor và Strategic Advisor.
2. Có quyết định promote Production riêng biệt; manifest này không tự cấp quyền.
3. Nếu cần xác nhận edge remote, chạy lại kiểm tra read-only đúng URL E53 khi quota cho phép hoặc ghi nhận waiver độc lập.
