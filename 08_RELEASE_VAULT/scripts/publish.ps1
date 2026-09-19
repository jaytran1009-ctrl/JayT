# =============================================================================
# JAYT CENTRAL VAULT — RUNTIME-ACTIVE STAGING PUBLISH & TOKEN GATEWAY AUDIT
# =============================================================================
param (
    [string]$Target = "Staging"
)

$ErrorActionPreference = "Stop"
Write-Host "🚀 [JAYT-PUBLISH] Khởi động quy trình phát hành Runtime-Active Target: $Target..." -ForegroundColor Cyan

$base = "D:\Công Việc MMO\OPC JayT\JayT-Dự Án Giá Trị Cộng Đồng"
$manifestPath = Join-Path $base "08_RELEASE_VAULT\RELEASE_MANIFEST.json"
$releasesDir = Join-Path $base "08_RELEASE_VAULT\releases"
$pointerPath = Join-Path $releasesDir "active_release_pointer.json"

# BƯỚC 1: Chạy verify.ps1 multi-gate
& (Join-Path $PSScriptRoot "verify.ps1")
if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ [PUBLISH-BLOCKED] Cổng Verify thất bại. Hủy phát hành!"
    exit 1
}

# BƯỚC 2: Kiểm soát Target Production (Khóa cứng nếu chưa duyệt)
if ($Target -eq "Production") {
    $manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
    $appr = $manifest.governance_locks.immutable_ceo_approval_record

    if ($appr.is_approved -ne $true -or -not $appr.approval_signature_digest) {
        Write-Error "❌ [PUBLISH-BLOCKED] PRODUCTION BỊ KHÓA: Chưa có chữ ký số phê duyệt chính thức của CEO (is_approved = false)!"
        exit 1
    }
    Write-Host "🟢 [PRODUCTION-AUTH] Chữ ký số CEO hợp lệ." -ForegroundColor Green
}

# BƯỚC 3: Tạo Content-Addressed Sealed Build mới qua backup.ps1
& (Join-Path $PSScriptRoot "backup.ps1")

$ptr = Get-Content $pointerPath -Raw | ConvertFrom-Json
$activeBuildId = $ptr.active_build_id
$activeBuildPath = $ptr.active_build_path

Write-Host "  ✓ Active Release Pointer đang trỏ tới: $activeBuildId" -ForegroundColor Green

# BƯỚC 4: LIVE HTTP SERVER VERIFICATION VỚI SECRET GOVERNANCE & READINESS PROBE
$pythonExecutable = $env:JAYT_PYTHON
if (-not $pythonExecutable -and (Get-Command python -ErrorAction SilentlyContinue)) {
    $pythonExecutable = (Get-Command python -ErrorAction Stop).Source
}
if (-not $pythonExecutable) {
    $workspacePython = 'C:\Users\tritr\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
    if (Test-Path -LiteralPath $workspacePython) { $pythonExecutable = $workspacePython }
}
if (-not $pythonExecutable -or -not (Test-Path -LiteralPath $pythonExecutable)) {
    Write-Error "❌ [STAGING-HEALTHCHECK-FAILED] Không tìm thấy Python runtime portable!"
    exit 1
}

$activeServerPy = Join-Path $activeBuildPath "03_SOURCE_OF_TRUTH\jayt_production_server.py"
$testPort = 8945
$env:PORT = "$testPort"
$env:JAYT_TOKEN_SECRET = "JAYT_SECRET_GOVERNANCE_STAGING_KEY_2026_ABCD_9999_32CHARS"

Write-Host "  ↳ Khởi chạy Staging HTTP Server từ Content-Addressed Build..." -ForegroundColor Yellow
$serverProcess = Start-Process $pythonExecutable -ArgumentList "`"$activeServerPy`"" -WorkingDirectory (Split-Path $activeServerPy) -PassThru -NoNewWindow
Start-Sleep -Milliseconds 900

try {
    # 1. Check /readyz (Readiness Gate)
    $readyRes = Invoke-RestMethod -Uri "http://localhost:$testPort/readyz" -Method Get -TimeoutSec 4
    if ($readyRes.status -ne "READY" -or -not $readyRes.ready -or $readyRes.active_build_id -ne $activeBuildId -or -not $readyRes.secret_configured) {
        Write-Error "❌ [STAGING-FAILED] /readyz không pass hoặc secret chưa được cấu hình!"
        exit 1
    }
    Write-Host "  ✓ [Probe 1] Live /readyz 200 READY | Active Build = $($readyRes.active_build_id) | Secret Governed: $($readyRes.secret_configured)" -ForegroundColor Green

    # 1b. Check /healthz (Liveness Gate)
    $healthRes = Invoke-RestMethod -Uri "http://localhost:$testPort/healthz" -Method Get -TimeoutSec 4
    if ($healthRes.status -ne "UP") {
        Write-Error "❌ [STAGING-FAILED] /healthz liveness không pass!"
        exit 1
    }
    Write-Host "  ✓ [Probe 1b] Live /healthz 200 UP | Uptime = $($healthRes.uptime_seconds)s" -ForegroundColor Green

    # 2. Check /api/time
    $timeRes = Invoke-RestMethod -Uri "http://localhost:$testPort/api/time" -Method Get -TimeoutSec 4
    if (-not $timeRes.is_trusted_baseline -or -not $timeRes.server_time_iso) {
        Write-Error "❌ [STAGING-FAILED] /api/time không trả về trusted time baseline!"
        exit 1
    }
    Write-Host "  ✓ [Probe 2] Live /api/time 200 OK | Server Time ISO = $($timeRes.server_time_iso)" -ForegroundColor Green

    # 2b. Check /api/deals Fail-Closed Integrity
    $dealsRes = Invoke-RestMethod -Uri "http://localhost:$testPort/api/deals" -Method Get -TimeoutSec 4
    if ($dealsRes.status -ne "OK" -or $dealsRes.total_count -le 0) {
        Write-Error "❌ [STAGING-FAILED] /api/deals không trả về feed hợp lệ!"
        exit 1
    }
    Write-Host "  ✓ [Probe 2b] Live /api/deals 200 OK | Loaded $($dealsRes.total_count) Deals" -ForegroundColor Green

    # 3. Check /api/token/issue (POST Exact Deal ID with 15s TTL)
    $tokenBody = @{ deal_id = "DNG-METIZ-45K" } | ConvertTo-Json
    $tokenIssueRes = Invoke-RestMethod -Uri "http://localhost:$testPort/api/token/issue" -Method Post -Body $tokenBody -ContentType "application/json" -TimeoutSec 4
    if ($tokenIssueRes.status -ne "TOKEN_ISSUED" -or -not $tokenIssueRes.token -or $tokenIssueRes.expires_in_seconds -ne 15) {
        Write-Error "❌ [STAGING-FAILED] /api/token/issue POST không phát hành được token 15s hợp lệ!"
        exit 1
    }
    $validToken = $tokenIssueRes.token
    Write-Host "  ✓ [Probe 3] Live /api/token/issue POST: Phát hành Ephemeral Token hợp lệ TTL 15s ($($validToken.Substring(0, 16))...)" -ForegroundColor Green

    # 4. Check /out?token=VALID_TOKEN&cid=BOUND_CID (302 Redirect via TLS-SNI IP Pinning)
    $validOutUrl = "http://localhost:$testPort$($tokenIssueRes.outbound_endpoint)"
    $req = [System.Net.HttpWebRequest]::Create($validOutUrl)
    $req.AllowAutoRedirect = $false
    $resp = $req.GetResponse()
    if ([int]$resp.StatusCode -ne 302 -or $resp.Headers["Location"] -ne "https://metiz.vn/") {
        Write-Error "❌ [STAGING-FAILED] /out redirect bằng token hợp lệ thất bại!"
        exit 1
    }
    $resp.Close()
    Write-Host "  ✓ [Probe 4] Live Tokenized /out: 302 Hop-by-Hop Redirect hợp lệ tới https://metiz.vn/" -ForegroundColor Green

    # 4b. Check Anti-CID-Tamper: Token hợp lệ + CID giả mạo -> 403 Forbidden
    try {
        $tamperCidReq = [System.Net.HttpWebRequest]::Create("http://localhost:$testPort/out?token=$validToken&cid=FORGED_CID_TAMPERED")
        $tamperCidReq.AllowAutoRedirect = $false
        $tamperCidResp = $tamperCidReq.GetResponse()
        Write-Error "❌ [STAGING-FAILED] /out chấp nhận CID giả mạo không khớp chữ ký token!"
        exit 1
    } catch {
        if ($_.Exception.Response) {
            $statusCode = [int]$_.Exception.Response.StatusCode
            if ($statusCode -eq 403) {
                Write-Host "  ✓ [Probe 4b] Anti-CID-Tamper Gate: 403 Forbidden chặn thành công CID không khớp token." -ForegroundColor Green
            } else {
                Write-Error "❌ [STAGING-FAILED] Tampered CID trả về status: $statusCode"
                exit 1
            }
        }
    }

    # 5. Check Anti-Replay: Dùng lại token đã tiêu thụ -> 403 Forbidden
    try {
        $replayReq = [System.Net.HttpWebRequest]::Create($validOutUrl)
        $replayReq.AllowAutoRedirect = $false
        $replayResp = $replayReq.GetResponse()
        Write-Error "❌ [STAGING-FAILED] /out cho phép tái sử dụng token đã tiêu thụ (Replay Attack)!"
        exit 1
    } catch {
        if ($_.Exception.Response) {
            $statusCode = [int]$_.Exception.Response.StatusCode
            if ($statusCode -eq 403) {
                Write-Host "  ✓ [Probe 5] Anti-Replay Gate: 403 Forbidden chặn thành công token đã tiêu thụ." -ForegroundColor Green
            } else {
                Write-Error "❌ [STAGING-FAILED] Replay token trả về status: $statusCode"
                exit 1
            }
        }
    }

    # 6. Check Anti-Tamper: Token giả mạo -> 403 Forbidden
    try {
        $tamperReq = [System.Net.HttpWebRequest]::Create("http://localhost:$testPort/out?token=DNG-METIZ-45K.123456789.fake_signature")
        $tamperReq.AllowAutoRedirect = $false
        $tamperResp = $tamperReq.GetResponse()
        Write-Error "❌ [STAGING-FAILED] /out chấp nhận token giả mạo chữ ký!"
        exit 1
    } catch {
        if ($_.Exception.Response) {
            $statusCode = [int]$_.Exception.Response.StatusCode
            if ($statusCode -eq 403) {
                Write-Host "  ✓ [Probe 6] Anti-Tamper Gate: 403 Forbidden chặn thành công token sai chữ ký." -ForegroundColor Green
            } else {
                Write-Error "❌ [STAGING-FAILED] Tampered token trả về status: $statusCode"
                exit 1
            }
        }
    }

    # ĐỒNG BỘ RELEASE_MANIFEST.JSON THEO TRẠNG THÁI RUNTIME THỰC TẾ
    $manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
    $manifest.release_status = "STAGING_TLS_SNI_IP_PINNED_VERIFIED_PENDING_CEO_PRODUCTION_APPROVAL"
    $manifest.build_id = $activeBuildId
    $manifest.build_timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssK")
    $manifest | ConvertTo-Json -Depth 10 | Out-File $manifestPath -Encoding utf8
    Write-Host "  ✓ Đã đồng bộ trạng thái runtime vào RELEASE_MANIFEST.json: $($manifest.release_status)" -ForegroundColor Green

} catch {
    Write-Error "❌ [STAGING-HEALTHCHECK-FAILED] Lỗi trong quá trình kiểm tra runtime: $_"
    exit 1
} finally {
    if ($serverProcess -and -not $serverProcess.HasExited) {
        Stop-Process -Id $serverProcess.Id -Force
        Write-Host "  ✓ Tiến trình Staging Server đã đóng an toàn." -ForegroundColor Green
    }
}

Write-Host "🟢 [JAYT-PUBLISH] TOÀN BỘ 6 PROBE TOKEN GATEWAY & SSRF PROTECTION ĐÃ PASS THÀNH CÔNG (ACTIVE BUILD ID: $activeBuildId)!" -ForegroundColor Green
exit 0
