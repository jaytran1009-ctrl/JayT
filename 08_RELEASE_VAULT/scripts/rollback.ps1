# =============================================================================
# JAYT CENTRAL VAULT — PURE POINTER ATOMIC ROLLBACK SCRIPT (ZERO COPY-ITEM)
# =============================================================================
$ErrorActionPreference = "Stop"
$base = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$releasesDir = Join-Path $base "08_RELEASE_VAULT\releases"
$pointerPath = Join-Path $releasesDir "active_release_pointer.json"

$sw = [System.Diagnostics.Stopwatch]::StartNew()
Write-Host "🚨 [JAYT-ROLLBACK] KÍCH HOẠT PURE POINTER ATOMIC ROLLBACK (ZERO COPY-ITEM)..." -ForegroundColor Yellow

# BƯỚC 1: Đọc Active Release Pointer
if (-not (Test-Path $pointerPath)) {
    Write-Error "❌ [ROLLBACK-BLOCKED] Không tìm thấy active_release_pointer.json!"
    exit 1
}
$pointer = Get-Content $pointerPath -Raw | ConvertFrom-Json
$targetRestorePath = $pointer.previous_build_path
$targetBuildId = $pointer.previous_build_id

if (-not $targetRestorePath -or -not (Test-Path $targetRestorePath)) {
    Write-Error "❌ [ROLLBACK-BLOCKED] Không có Previous Build hợp lệ để rollback (Target: $targetRestorePath)!"
    exit 1
}
Write-Host "  ✓ [Bước 1] Xác định Target Rollback Build: $targetBuildId" -ForegroundColor Green

# BƯỚC 2: PRE-VALIDATION: Kiểm tra 100% SHA-256 của Target Build TRƯỚC KHI chuyển pointer!
$manifestPath = Join-Path $targetRestorePath "BUILD_MANIFEST.json"
if (-not (Test-Path $manifestPath)) {
    Write-Error "❌ [ROLLBACK-ABORTED] Target build thiếu BUILD_MANIFEST.json! NGUYÊN TRẠNG ĐƯỢC BẢO TOÀN."
    exit 1
}
$targetManifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
foreach ($item in $targetManifest.files) {
    $filePath = Join-Path $targetRestorePath $item.relative_path.TrimStart("\/")
    if (-not (Test-Path $filePath)) {
        Write-Error "❌ [ROLLBACK-ABORTED] Target build thiếu file: $filePath! NGUYÊN TRẠNG ĐƯỢC BẢO TOÀN."
        exit 1
    }
    $h = (Get-FileHash -Path $filePath -Algorithm SHA256).Hash.ToLower()
    if ($h -ne $item.sha256.ToLower()) {
        Write-Error "❌ [ROLLBACK-ABORTED] ERR_TARGET_BUILD_HASH_MISMATCH: Mã băm file target không khớp: $filePath! NGUYÊN TRẠNG ĐƯỢC BẢO TOÀN."
        exit 1
    }
}
Write-Host "  ✓ [Bước 2] Pre-Validation 100% SHA-256 Target Build ($($targetManifest.file_count) tệp): HOÀN TOÀN HỢP LỆ." -ForegroundColor Green

# BƯỚC 3: SINGLE ATOMIC POINTER SWITCH (ZERO COPY-ITEM)
$rolledPointer = @{
    "active_build_id" = $targetBuildId
    "active_build_path" = $targetRestorePath
    "previous_build_id" = $pointer.active_build_id
    "previous_build_path" = $pointer.active_build_path
    "content_digest_sha256" = $targetManifest.content_digest_sha256
    "switched_at" = (Get-Date -Format "o")
    "rollback_event" = $true
}
$tmpPointer = "$pointerPath.tmp"
$rolledPointer | ConvertTo-Json -Depth 3 | Out-File $tmpPointer -Encoding utf8
Move-Item $tmpPointer $pointerPath -Force
Write-Host "  ✓ [Bước 3] Single Atomic Pointer Switch: ĐÃ CHUYỂN CON TRỎ SANG $targetBuildId (ZERO Copy-Item)" -ForegroundColor Green

# BƯỚC 4: LIVE HTTP READINESS CHECK CHỨNG MINH RUNTIME ĐÃ PHỤC HỒI BUILD CŨ
$pythonExecutable = $env:JAYT_PYTHON
if (-not $pythonExecutable -and (Get-Command python -ErrorAction SilentlyContinue)) {
    $pythonExecutable = (Get-Command python -ErrorAction Stop).Source
}
if (-not $pythonExecutable) {
    $workspacePython = 'C:\Users\tritr\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
    if (Test-Path -LiteralPath $workspacePython) { $pythonExecutable = $workspacePython }
}

$activeServerPy = Join-Path $targetRestorePath "03_SOURCE_OF_TRUTH\jayt_production_server.py"
$testPort = 8911
$env:PORT = "$testPort"
if (-not $env:JAYT_TOKEN_SECRET -or $env:JAYT_TOKEN_SECRET.Length -lt 32) {
    $env:JAYT_TOKEN_SECRET = [System.Guid]::NewGuid().ToString("N") + [System.Guid]::NewGuid().ToString("N")
}

Write-Host "  ↳ Khởi chạy HTTP Server từ Rolled-Back Build: $targetBuildId..." -ForegroundColor Yellow
$serverProcess = Start-Process $pythonExecutable -ArgumentList "`"$activeServerPy`"" -WorkingDirectory (Split-Path $activeServerPy) -PassThru -NoNewWindow
Start-Sleep -Milliseconds 900

try {
    $readyUri = "http://localhost:$testPort/readyz"
    $response = Invoke-RestMethod -Uri $readyUri -Method Get -TimeoutSec 4
    if ($response.status -ne "READY" -or $response.active_build_id -ne $targetBuildId) {
        Write-Error "❌ [ROLLBACK-VERIFY-FAILED] Phản hồi readyz không khớp build: $($response.active_build_id)"
        exit 1
    }
    
    $mHash = if ($response.build_manifest_hash) { $response.build_manifest_hash.Substring(0, [Math]::Min(16, $response.build_manifest_hash.Length)) } else { "N/A" }
    Write-Host "  ✓ Live HTTP GET /readyz: 200 READY | Active Build = $($response.active_build_id) | Manifest Hash = $mHash..." -ForegroundColor Green
} catch {
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errBody = $reader.ReadToEnd()
        Write-Error "❌ [ROLLBACK-VERIFY-FAILED] HTTP Error Body: $errBody"
    } else {
        Write-Error "❌ [ROLLBACK-VERIFY-FAILED] Lỗi kết nối HTTP tới máy chủ sau rollback: $_"
    }
    exit 1
} finally {
    if ($serverProcess -and -not $serverProcess.HasExited) {
        Stop-Process -Id $serverProcess.Id -Force
        Write-Host "  ✓ Tiến trình Staging Server đã đóng an toàn." -ForegroundColor Green
    }
}

$sw.Stop()
$rtoMs = $sw.ElapsedMilliseconds
Write-Host "🟢 [JAYT-ROLLBACK] PURE POINTER ATOMIC ROLLBACK HOÀN TẤT VỚI RTO: $rtoMs ms!" -ForegroundColor Green
exit 0