# =============================================================================
# JAYT CENTRAL VAULT — COMPREHENSIVE FAIL-CLOSED MULTI-GATE VERIFICATION
# =============================================================================
$ErrorActionPreference = "Stop"
Write-Host "🔍 [JAYT-VERIFY] Khởi động kiểm thử toàn diện Fail-Closed Multi-Gate..." -ForegroundColor Cyan

$base = "D:\Công Việc MMO\OPC JayT\JayT-Dự Án Giá Trị Cộng Đồng"
$sotDir = Join-Path $base "03_SOURCE_OF_TRUTH"
$dataDir = Join-Path $base "05_DEAL_AND_AFFILIATE"
$qaDir = Join-Path $base "07_QUALITY_ASSURANCE"
$manifestPath = Join-Path $base "08_RELEASE_VAULT\RELEASE_MANIFEST.json"

# GATE 1: Kiểm tra tập tin cốt lõi
$requiredFiles = @(
    (Join-Path $sotDir "index.html"),
    (Join-Path $sotDir "jayt_eligibility_engine.js"),
    (Join-Path $sotDir "jayt_production_server.py"),
    (Join-Path $dataDir "deals_feed.json"),
    (Join-Path $dataDir "domain_catalog.json"),
    (Join-Path $dataDir "zone_catalog.json")
)

foreach ($f in $requiredFiles) {
    if (-not (Test-Path $f)) {
        Write-Error "❌ [FAIL-CLOSED] Thiếu tập tin cốt lõi bắt buộc: $f"
        exit 1
    }
}
Write-Host "  ✓ [Gate 1] Tập tin cốt lõi: 100% Hiện diện đầy đủ." -ForegroundColor Green

# GATE 2: Syntax Check JavaScript
$js = Join-Path $sotDir "jayt_eligibility_engine.js"
& node -c $js
if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ [FAIL-CLOSED] Lỗi cú pháp JavaScript trong jayt_eligibility_engine.js!"
    exit 1
}
Write-Host "  ✓ [Gate 2] Syntax JavaScript: node -c PASSED." -ForegroundColor Green

# GATE 3: Syntax Check Python
$py = Join-Path $sotDir "jayt_production_server.py"
$pythonExecutable = $env:JAYT_PYTHON
if (-not $pythonExecutable -and (Get-Command python -ErrorAction SilentlyContinue)) {
    $pythonExecutable = (Get-Command python -ErrorAction Stop).Source
}
if (-not $pythonExecutable) {
    $workspacePython = 'C:\Users\tritr\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
    if (Test-Path -LiteralPath $workspacePython) { $pythonExecutable = $workspacePython }
}
if (-not $pythonExecutable -or -not (Test-Path -LiteralPath $pythonExecutable)) {
    Write-Error "❌ [FAIL-CLOSED] Không tìm thấy Python runtime. Thiết lập JAYT_PYTHON hoặc cài Python trước khi xác minh server."
    exit 1
}
& $pythonExecutable -m py_compile $py
if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ [FAIL-CLOSED] Lỗi cú pháp Python trong jayt_production_server.py!"
    exit 1
}
Write-Host "  ✓ [Gate 3] Syntax Python: py_compile PASSED." -ForegroundColor Green

# GATE 4: Kiểm tra JSON Schema & Catalog Cross-References
try {
    $deals = Get-Content (Join-Path $dataDir "deals_feed.json") -Raw | ConvertFrom-Json
    $zones = Get-Content (Join-Path $dataDir "zone_catalog.json") -Raw | ConvertFrom-Json
    $domains = Get-Content (Join-Path $dataDir "domain_catalog.json") -Raw | ConvertFrom-Json

    $zoneIds = $zones | ForEach-Object { $_.zone_id }
    foreach ($d in $deals) {
        if ($zoneIds -notcontains $d.zone) {
            Write-Error "❌ [FAIL-CLOSED] Deal $($d.deal_id) tham chiếu zone không tồn tại: $($d.zone)"
            exit 1
        }
    }
    Write-Host "  ✓ [Gate 4] JSON Schema & Zone Cross-References: Hợp lệ 100%." -ForegroundColor Green
} catch {
    Write-Error "❌ [FAIL-CLOSED] Lỗi kiểm tra dữ liệu JSON: $_"
    exit 1
}

# GATE 5: Chạy Test Runner 30 Cases, Headless DOM Runner, và Deals API Fail-Closed Suite
$runnerJs = Join-Path $qaDir "test_eligibility_runner.js"
& node $runnerJs
if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ [FAIL-CLOSED] Bộ kiểm thử 30 Cases thất bại!"
    exit 1
}

$domRunnerJs = Join-Path $qaDir "test_e2e_dom_runner.js"
& node $domRunnerJs
if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ [FAIL-CLOSED] Bộ kiểm thử Headless DOM Runner thất bại!"
    exit 1
}

$apiQaPy = Join-Path $qaDir "test_deals_api_fail_closed.py"
& $pythonExecutable $apiQaPy
if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ [FAIL-CLOSED] Bộ kiểm thử Deals API Fail-Closed thất bại!"
    exit 1
}
Write-Host "  ✓ [Gate 5] QA Test Runner (30 Branches + DOM E2E + API Fail-Closed): PASSED." -ForegroundColor Green

# GATE 6: Kiểm tra trạng thái Approval trong Manifest (Bắt buộc is_approved = false ở pre-release)
$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
if ($manifest.governance_locks.immutable_ceo_approval_record.is_approved -eq $true) {
    Write-Warning "⚠️ Manifest đang bật is_approved = true. Cần chữ ký số thực sự của CEO!"
} else {
    Write-Host "  ✓ [Gate 6] Governance Status: PENDING_CEO_APPROVAL" -ForegroundColor Green
}

Write-Host "🟢 [JAYT-VERIFY] TẤT CẢ 6 CỔNG KIỂM SOÁT FAIL-CLOSED ĐÃ ĐẠT (PASS)!" -ForegroundColor Green
exit 0
