# =============================================================================
# JAYT CENTRAL VAULT — DETERMINISTIC NUL-BYTE MERKLE TREE SEALED BUILD SCRIPT
# =============================================================================
$ErrorActionPreference = "Stop"
$base = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$releasesDir = Join-Path $base "08_RELEASE_VAULT\releases"
$pointerPath = Join-Path $releasesDir "active_release_pointer.json"

$ts = Get-Date -Format "yyyyMMdd_HHmmss"

# Tạo thư mục build tạm để tính toán Content-Addressed Hash
$tempBuild = Join-Path $releasesDir "temp_build_$ts"
New-Item -ItemType Directory -Path $tempBuild -Force | Out-Null

Copy-Item (Join-Path $base "03_SOURCE_OF_TRUTH") $tempBuild -Recurse -Force
Copy-Item (Join-Path $base "05_DEAL_AND_AFFILIATE") $tempBuild -Recurse -Force
Copy-Item (Join-Path $base "08_RELEASE_VAULT\RELEASE_MANIFEST.json") $tempBuild -Force

# Lọc bỏ __pycache__ để đảm bảo tính thuần nhất mã nguồn
$rawFiles = Get-ChildItem -Path $tempBuild -Recurse -File | Where-Object { $_.FullName -notmatch '__pycache__' }
$manifestEntries = @()
foreach ($f in $rawFiles) {
    $rel = $f.FullName.Replace($tempBuild, "").Replace("\", "/").TrimStart("/")
    $h = (Get-FileHash -Path $f.FullName -Algorithm SHA256).Hash.ToLower()
    $manifestEntries += @{
        "file_name" = $f.Name
        "relative_path" = $rel
        "sha256" = $h
        "length" = $f.Length
    }
}

# Sắp xếp thứ tự cố định theo relative_path
$sortedEntries = $manifestEntries | Sort-Object { $_.relative_path }

# Tính Content-Addressed Merkle Digest dùng normalized_relative_path + NUL + sha256 + NUL
$treeBytes = [System.Collections.Generic.List[byte]]::new()
foreach ($entry in $sortedEntries) {
    $rel = $entry.relative_path.Replace("\", "/").Trim("/")
    $relBytes = [System.Text.Encoding]::UTF8.GetBytes($rel)
    $hashBytes = [System.Text.Encoding]::UTF8.GetBytes($entry.sha256.ToLower())
    $treeBytes.AddRange($relBytes)
    $treeBytes.Add(0)
    $treeBytes.AddRange($hashBytes)
    $treeBytes.Add(0)
}

$hasher = [System.Security.Cryptography.SHA256]::Create()
$contentDigest = [System.BitConverter]::ToString($hasher.ComputeHash($treeBytes.ToArray())).Replace("-", "").ToLower()
$shortDigest = $contentDigest.Substring(0, 12)

$buildId = "BUILD-$shortDigest-$ts"
$sealedBuildDir = Join-Path $releasesDir "build_$shortDigest`_$ts"

# Đổi tên sang Content-Addressed Directory
Move-Item $tempBuild $sealedBuildDir -Force

$buildManifest = @{
    "build_id" = $buildId
    "content_digest_sha256" = $contentDigest
    "created_at" = (Get-Date -Format "o")
    "file_count" = $sortedEntries.Count
    "files" = $sortedEntries
}
$buildManifest | ConvertTo-Json -Depth 5 | Out-File "$sealedBuildDir\BUILD_MANIFEST.json" -Encoding utf8
$buildManifest | ConvertTo-Json -Depth 5 | Out-File "$base\BUILD_MANIFEST.json" -Encoding utf8

# KHÓA READ-ONLY DUY NHẤT CHO THƯ MỤC BUILD ĐÃ SEAL
Get-ChildItem -Path $sealedBuildDir -Recurse -File | ForEach-Object {
    Set-ItemProperty -Path $_.FullName -Name IsReadOnly -Value $true
}

# Cập nhật Active Release Pointer
$prevBuildId = $null
$prevBuildPath = $null
if (Test-Path $pointerPath) {
    $oldPtr = Get-Content $pointerPath -Raw | ConvertFrom-Json
    $prevBuildId = $oldPtr.active_build_id
    $prevBuildPath = $oldPtr.active_build_path
}

$pointerData = @{
    "active_build_id" = $buildId
    "active_build_path" = $sealedBuildDir
    "previous_build_id" = $prevBuildId
    "previous_build_path" = $prevBuildPath
    "content_digest_sha256" = $contentDigest
    "sealed_at" = (Get-Date -Format "o")
}
$pointerData | ConvertTo-Json -Depth 3 | Out-File $pointerPath -Encoding utf8

Write-Host "🟢 [JAYT-BUILD] Content-Addressed Sealed Build đã tạo: $buildId" -ForegroundColor Green
Write-Host "  ↳ Content-Digest: $contentDigest" -ForegroundColor Cyan
Write-Host "  ↳ Active Pointer cập nhật: $buildId (Previous: $prevBuildId)" -ForegroundColor Cyan
Write-Host "  ↳ Đã áp dụng thuộc tính Read-Only bảo vệ Sealed Build." -ForegroundColor Green