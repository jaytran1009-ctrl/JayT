# JAYT-396 — Chứng nhận tách Runtime Log khỏi Static Pipeline Seal

**Quyết định CEO:** `PIPELINE_SEAL_DRIFT_RESOLVED__DUAL_WORKSPACE_24_OF_24_PASS_CERTIFIED`  
**Thời điểm kiểm toán:** 2026-09-12T12:08:55+07:00

## Phạm vi thay đổi

- `j392_scheduler_run.log` không còn thuộc tập hash tĩnh. Log được kiểm tra độc lập: phải tồn tại, không rỗng, và bản ghi JSON cuối cùng có `status: "HEALTHY"` cùng `exit_code: 0`.
- Vị trí artifact tĩnh thứ 24 là `JAYT_394_USER_DRIVEN_STAGING_AUDIT_RECEIPT.json` với SHA-256 `c46531b72a01f7c7d0998b7d5f554a655b1674d4eef77e1b4a4a2373f8892d26`.
- Verifier J396 kiểm tra byte length và SHA-256 của đúng 24 artifact tĩnh hiện có. Nó không dùng hash/đường dẫn lịch sử không tồn tại và không dùng so khớp chuỗi sai cho JSON log.

## Kết quả độc lập

| Workspace | Static seal | Runtime gate | Kết quả |
| --- | --- | --- | --- |
| WS1 | 24/24 | `HEALTHY`, `exit_code=0` | PASS |
| WS2 | 24/24 | `HEALTHY`, `exit_code=0` | PASS |

`scripts/verify_pipeline_seal.cjs` có SHA-256 `2af0b5bdeed99f68b9bd81837614f2895a2bc6000293fd5980ff37a8c09c5d84` và khớp giữa hai workspace.

## Ranh giới không thay đổi

JAYT-396 chỉ xử lý kiến trúc kiểm tra integrity. Không cấp quyền Production, không đổi canonical alias, không thêm deal, và không bật affiliate/tracking/sub-ID.
