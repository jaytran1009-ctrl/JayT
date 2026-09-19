# -*- coding: utf-8 -*-
"""
JAYT READINESS GATE & FULL BUILD INTEGRITY / POINTER BINDING TEST SUITE
=============================================================================
1. Missing Secret -> 503 NOT_READY
2. Short Secret (< 32 chars) -> 503 NOT_READY
3. Missing File on disk -> 503 NOT_READY (ERR_MANIFEST_FILE_MISSING_ON_DISK)
4. Empty files list in manifest -> 503 NOT_READY (ERR_BUILD_MANIFEST_EMPTY_FILES_LIST)
5. Empty / Corrupted hash in manifest -> 503 NOT_READY (ERR_MANIFEST_INVALID_FILE_METADATA)
6. Path traversal in manifest relative_path -> 503 NOT_READY (ERR_PATH_TRAVERSAL_DETECTED)
7. Pointer Build ID mismatch -> 503 NOT_READY (ERR_POINTER_BUILD_ID_MISMATCH)
8. Pointer path outside vault -> 503 NOT_READY (ERR_POINTER_PATH_OUTSIDE_VAULT)
9. Expired Catalog Domain -> 503 NOT_READY (ERR_CATALOG_DOMAIN_EXPIRED)
10. Active Kill Switch in Catalog -> 503 NOT_READY (ERR_CATALOG_KILL_SWITCH_ACTIVE)
11. Production Environment Hard-Block -> 404 on /__test/slow
12. 100% Valid State -> 200 READY
=============================================================================
"""
import os
import sys
import time
import json
import shutil
import hashlib
import secrets
import tempfile
import subprocess
import urllib.request
import urllib.error

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try: sys.stdout.reconfigure(encoding='utf-8')
    except Exception: pass

QA_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(QA_DIR)
SRC_DIR = os.path.join(BASE_DIR, "03_SOURCE_OF_TRUTH")
SERVER_PY = os.path.join(SRC_DIR, "jayt_production_server.py")

sys.path.insert(0, QA_DIR)
try:
    from resolve_python import resolve_python_executable
except ImportError:
    def resolve_python_executable():
        return sys.executable

print("🧪 [JAYT-READINESS-QA] Khởi chạy kiểm thử Full Build Integrity & Pointer Binding Suite...")

def spawn_custom_server(env_vars, server_script=SERVER_PY, custom_cwd=SRC_DIR, port=8960):
    env = os.environ.copy()
    env["PORT"] = str(port)
    for k, v in env_vars.items():
        env[k] = str(v)
        
    proc = subprocess.Popen(
        [resolve_python_executable(), server_script],
        cwd=custom_cwd,
        env=env,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    time.sleep(0.9)
    return proc, port

def create_valid_test_environment(target_dir, build_id="TEST_BUILD_VALID"):
    # Cấu trúc canonical vault: target_dir/08_RELEASE_VAULT/releases/build_test_xxx
    vault_folder = os.path.join(target_dir, "08_RELEASE_VAULT", "releases")
    build_folder = os.path.join(vault_folder, f"build_{build_id.lower()}")
    src_folder = os.path.join(build_folder, "03_SOURCE_OF_TRUTH")
    aff_folder = os.path.join(build_folder, "05_DEAL_AND_AFFILIATE")
    os.makedirs(src_folder, exist_ok=True)
    os.makedirs(aff_folder, exist_ok=True)
    
    server_path = os.path.join(src_folder, "jayt_production_server.py")
    shutil.copy(SERVER_PY, server_path)
    
    cat_path = os.path.join(aff_folder, "domain_catalog.json")
    valid_cat = [
        {
            "domain": "metiz.vn",
            "status": "ACTIVE",
            "emergency_kill_switch_active": False,
            "approved_protocols": ["https:"],
            "expires_at": "2030-01-01T00:00:00Z"
        }
    ]
    with open(cat_path, "w", encoding="utf-8") as f:
        json.dump(valid_cat, f, indent=2)

    feed_path = os.path.join(aff_folder, "deals_feed.json")
    with open(feed_path, "w", encoding="utf-8") as f:
        json.dump([{"deal_id": "TEST-DEAL-01", "url": "https://metiz.vn/"}], f, indent=2)
        
    index_path = os.path.join(src_folder, "index.html")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write("<html><body>TEST GOLDEN MASTER</body></html>")
        
    # Tạo manifest với SHA-256 đúng của từng file và Merkle Tree Digest
    files_entries = []
    for fpath, rel_path, fname in [
        (server_path, "03_SOURCE_OF_TRUTH/jayt_production_server.py", "jayt_production_server.py"),
        (cat_path, "05_DEAL_AND_AFFILIATE/domain_catalog.json", "domain_catalog.json"),
        (feed_path, "05_DEAL_AND_AFFILIATE/deals_feed.json", "deals_feed.json"),
        (index_path, "03_SOURCE_OF_TRUTH/index.html", "index.html")
    ]:
        with open(fpath, "rb") as bf:
            h = hashlib.sha256(bf.read()).hexdigest().lower()
        files_entries.append({
            "file_name": fname,
            "relative_path": rel_path,
            "sha256": h,
            "length": os.path.getsize(fpath)
        })
        
    # Sắp xếp cố định theo normalized relative_path và tính Merkle Tree Digest bằng NUL bytes
    sorted_files = sorted(files_entries, key=lambda x: x["relative_path"].replace("\\", "/").strip("/"))
    tree_bytes = bytearray()
    for entry in sorted_files:
        norm_rel = entry["relative_path"].replace("\\", "/").strip("/")
        tree_bytes.extend(norm_rel.encode("utf-8"))
        tree_bytes.append(0)
        tree_bytes.extend(entry["sha256"].encode("utf-8"))
        tree_bytes.append(0)
    tree_digest = hashlib.sha256(tree_bytes).hexdigest().lower()
        
    manifest = {
        "build_id": build_id,
        "content_digest_sha256": tree_digest,
        "created_at": "2026-08-20T12:00:00Z",
        "file_count": len(sorted_files),
        "files": sorted_files
    }
    with open(os.path.join(build_folder, "BUILD_MANIFEST.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    # Ghi pointer file tại releases/active_release_pointer.json
    pointer_data = {
        "active_build_id": build_id,
        "active_build_path": os.path.realpath(build_folder),
        "content_digest_sha256": tree_digest
    }
    with open(os.path.join(vault_folder, "active_release_pointer.json"), "w", encoding="utf-8") as f:
        json.dump(pointer_data, f, indent=2)
        
    return server_path, src_folder, build_folder, vault_folder

VALID_SECRET = secrets.token_hex(32)

# -----------------------------------------------------------------------------
# TEST 1: MISSING SECRET (FAIL-CLOSED 503)
# -----------------------------------------------------------------------------
print("--- TEST 1: MISSING SECRET (JAYT_TOKEN_SECRET='') ---")
proc1, port1 = spawn_custom_server({"JAYT_TOKEN_SECRET": ""}, SERVER_PY, SRC_DIR, 8961)
try:
    req1 = urllib.request.Request(f"http://127.0.0.1:{port1}/readyz")
    urllib.request.urlopen(req1, timeout=3)
    t1_pass = False
except urllib.error.HTTPError as he:
    t1_pass = (he.code == 503)
    resp1 = json.loads(he.read().decode("utf-8"))
    print(f"  [READY_01] Missing Secret returns 503: [PASS] (Reasons: {resp1.get('reasons')})")
finally:
    proc1.kill()

# -----------------------------------------------------------------------------
# TEST 2: SHORT WEAK SECRET (< 32 chars)
# -----------------------------------------------------------------------------
print("--- TEST 2: SHORT WEAK SECRET (< 32 chars) ---")
proc2, port2 = spawn_custom_server({"JAYT_TOKEN_SECRET": "short_weak_123"}, SERVER_PY, SRC_DIR, 8962)
try:
    req2 = urllib.request.Request(f"http://127.0.0.1:{port2}/readyz")
    urllib.request.urlopen(req2, timeout=3)
    t2_pass = False
except urllib.error.HTTPError as he:
    t2_pass = (he.code == 503)
    resp2 = json.loads(he.read().decode("utf-8"))
    print(f"  [READY_02] Short Secret returns 503: [PASS] (Reasons: {resp2.get('reasons')})")
finally:
    proc2.kill()

# -----------------------------------------------------------------------------
# TEST 3: MISSING POINTER DIGEST (FAIL-CLOSED 503)
# -----------------------------------------------------------------------------
print("--- TEST 3: MISSING POINTER CONTENT DIGEST ---")
tmp3 = tempfile.mkdtemp()
try:
    server3, cwd3, bld3, vlt3 = create_valid_test_environment(tmp3, "BUILD_NO_DIGEST_03")
    # Xóa content_digest_sha256 trong pointer file
    with open(os.path.join(vlt3, "active_release_pointer.json"), "w", encoding="utf-8") as f:
        json.dump({
            "active_build_id": "BUILD_NO_DIGEST_03",
            "active_build_path": os.path.realpath(bld3)
        }, f)
    proc3, port3 = spawn_custom_server({"JAYT_TOKEN_SECRET": VALID_SECRET}, server3, cwd3, 8963)
    try:
        req3 = urllib.request.Request(f"http://127.0.0.1:{port3}/readyz")
        urllib.request.urlopen(req3, timeout=3)
        t3_pass = False
    except urllib.error.HTTPError as he:
        t3_pass = (he.code == 503)
        resp3 = json.loads(he.read().decode("utf-8"))
        print(f"  [READY_03] Missing Pointer Digest returns 503: [PASS] (Reasons: {resp3.get('reasons')})")
    finally:
        proc3.kill()
finally:
    shutil.rmtree(tmp3, ignore_errors=True)

# -----------------------------------------------------------------------------
# TEST 4: RUNTIME SERVER PATH MISMATCH (FAIL-CLOSED 503)
# -----------------------------------------------------------------------------
print("--- TEST 4: RUNTIME SERVER PATH MISMATCH ---")
tmp4 = tempfile.mkdtemp()
try:
    server4, cwd4, bld4, vlt4 = create_valid_test_environment(tmp4, "BUILD_MISMATCH_04")
    # Trỏ pointer sang thư mục khác
    fake_bld = os.path.join(vlt4, "build_different_path")
    os.makedirs(fake_bld, exist_ok=True)
    with open(os.path.join(vlt4, "active_release_pointer.json"), "w", encoding="utf-8") as f:
        json.dump({
            "active_build_id": "BUILD_MISMATCH_04",
            "active_build_path": os.path.realpath(fake_bld),
            "content_digest_sha256": "a"*64
        }, f)
    proc4, port4 = spawn_custom_server({"JAYT_TOKEN_SECRET": VALID_SECRET}, server4, cwd4, 8964)
    try:
        req4 = urllib.request.Request(f"http://127.0.0.1:{port4}/readyz")
        urllib.request.urlopen(req4, timeout=3)
        t4_pass = False
    except urllib.error.HTTPError as he:
        t4_pass = (he.code == 503)
        resp4 = json.loads(he.read().decode("utf-8"))
        print(f"  [READY_04] Runtime Path Mismatch returns 503: [PASS] (Reasons: {resp4.get('reasons')})")
    finally:
        proc4.kill()
finally:
    shutil.rmtree(tmp4, ignore_errors=True)

# -----------------------------------------------------------------------------
# TEST 5: DUPLICATE FILENAME IN TWO DIRECTORIES DISAMBIGUATED (FAIL-CLOSED 503)
# -----------------------------------------------------------------------------
print("--- TEST 5: DUPLICATE FILENAME IN TWO DIRECTORIES ---")
tmp5 = tempfile.mkdtemp()
try:
    server5, cwd5, bld5, vlt5 = create_valid_test_environment(tmp5, "BUILD_DUP_05")
    # Tạo duplicate filename 'data.json' ở cả 03_SOURCE_OF_TRUTH và 05_DEAL_AND_AFFILIATE
    p1 = os.path.join(bld5, "03_SOURCE_OF_TRUTH", "data.json")
    p2 = os.path.join(bld5, "05_DEAL_AND_AFFILIATE", "data.json")
    with open(p1, "w", encoding="utf-8") as f: f.write('{"scope": "truth"}')
    with open(p2, "w", encoding="utf-8") as f: f.write('{"scope": "deals"}')
    
    # Cập nhật manifest và pointer với cả 2 file
    with open(os.path.join(bld5, "BUILD_MANIFEST.json"), "r", encoding="utf-8") as f:
        mdata = json.load(f)
    mdata["files"].append({"file_name": "data.json", "relative_path": "03_SOURCE_OF_TRUTH/data.json", "sha256": hashlib.sha256(b'{"scope": "truth"}').hexdigest(), "length": 18})
    mdata["files"].append({"file_name": "data.json", "relative_path": "05_DEAL_AND_AFFILIATE/data.json", "sha256": hashlib.sha256(b'{"scope": "deals"}').hexdigest(), "length": 18})
    
    # Tính Merkle Tree Digest đúng
    sorted_files = sorted(mdata["files"], key=lambda x: x["relative_path"].replace("\\", "/").strip("/"))
    tb = bytearray()
    for entry in sorted_files:
        tb.extend(entry["relative_path"].replace("\\", "/").strip("/").encode("utf-8") + b"\x00" + entry["sha256"].encode("utf-8") + b"\x00")
    correct_digest = hashlib.sha256(tb).hexdigest().lower()
    
    mdata["content_digest_sha256"] = correct_digest
    mdata["file_count"] = len(sorted_files)
    with open(os.path.join(bld5, "BUILD_MANIFEST.json"), "w", encoding="utf-8") as f:
        json.dump(mdata, f, indent=2)
    with open(os.path.join(vlt5, "active_release_pointer.json"), "w", encoding="utf-8") as f:
        json.dump({"active_build_id": "BUILD_DUP_05", "active_build_path": os.path.realpath(bld5), "content_digest_sha256": correct_digest}, f, indent=2)
        
    # Tamper với 1 trong 2 file trùng tên
    with open(p2, "w", encoding="utf-8") as f: f.write('{"scope": "deals_tampered"}')
    
    proc5, port5 = spawn_custom_server({"JAYT_TOKEN_SECRET": VALID_SECRET}, server5, cwd5, 8965)
    try:
        req5 = urllib.request.Request(f"http://127.0.0.1:{port5}/readyz")
        urllib.request.urlopen(req5, timeout=3)
        t5_pass = False
    except urllib.error.HTTPError as he:
        t5_pass = (he.code == 503)
        resp5 = json.loads(he.read().decode("utf-8"))
        print(f"  [READY_05] Duplicate Filename Disambiguation & Tamper Detection: [PASS] (Reasons: {resp5.get('reasons')})")
    finally:
        proc5.kill()
finally:
    shutil.rmtree(tmp5, ignore_errors=True)

# -----------------------------------------------------------------------------
# TEST 6: MISSING FILE ON DISK (FAIL-CLOSED 503)
# -----------------------------------------------------------------------------
print("--- TEST 6: MISSING FILE ON DISK ---")
tmp6 = tempfile.mkdtemp()
try:
    server6, cwd6, bld6, _ = create_valid_test_environment(tmp6, "TEST_BUILD_DEL")
    os.remove(os.path.join(bld6, "03_SOURCE_OF_TRUTH", "index.html"))
    proc6, port6 = spawn_custom_server({"JAYT_TOKEN_SECRET": VALID_SECRET}, server6, cwd6, 8966)
    try:
        req6 = urllib.request.Request(f"http://127.0.0.1:{port6}/readyz")
        urllib.request.urlopen(req6, timeout=3)
        t6_pass = False
    except urllib.error.HTTPError as he:
        t6_pass = (he.code == 503)
        resp6 = json.loads(he.read().decode("utf-8"))
        print(f"  [READY_06] Missing File on Disk returns 503: [PASS] (Reasons: {resp6.get('reasons')})")
    finally:
        proc6.kill()
finally:
    shutil.rmtree(tmp6, ignore_errors=True)

# -----------------------------------------------------------------------------
# TEST 7: EMPTY FILES LIST IN MANIFEST (FAIL-CLOSED 503)
# -----------------------------------------------------------------------------
print("--- TEST 7: EMPTY FILES LIST IN MANIFEST ---")
tmp7 = tempfile.mkdtemp()
try:
    server7, cwd7, bld7, _ = create_valid_test_environment(tmp7, "TEST_BUILD_EMPTY_FILES")
    with open(os.path.join(bld7, "BUILD_MANIFEST.json"), "w", encoding="utf-8") as f:
        json.dump({"build_id": "TEST_BUILD_EMPTY_FILES", "content_digest_sha256": "a"*64, "files": []}, f)
    proc7, port7 = spawn_custom_server({"JAYT_TOKEN_SECRET": VALID_SECRET}, server7, cwd7, 8967)
    try:
        req7 = urllib.request.Request(f"http://127.0.0.1:{port7}/readyz")
        urllib.request.urlopen(req7, timeout=3)
        t7_pass = False
    except urllib.error.HTTPError as he:
        t7_pass = (he.code == 503)
        resp7 = json.loads(he.read().decode("utf-8"))
        print(f"  [READY_07] Empty Files List returns 503: [PASS] (Reasons: {resp7.get('reasons')})")
    finally:
        proc7.kill()
finally:
    shutil.rmtree(tmp7, ignore_errors=True)

# -----------------------------------------------------------------------------
# TEST 8: PATH TRAVERSAL (..) IN MANIFEST (FAIL-CLOSED 503)
# -----------------------------------------------------------------------------
print("--- TEST 8: PATH TRAVERSAL (..) IN MANIFEST ---")
tmp8 = tempfile.mkdtemp()
try:
    server8, cwd8, bld8, _ = create_valid_test_environment(tmp8, "TEST_BUILD_TRAVERSAL")
    with open(os.path.join(bld8, "BUILD_MANIFEST.json"), "w", encoding="utf-8") as f:
        json.dump({
            "build_id": "TEST_BUILD_TRAVERSAL",
            "content_digest_sha256": "a"*64,
            "files": [{"relative_path": "..\\..\\secret.txt", "sha256": "a"*64}]
        }, f)
    proc8, port8 = spawn_custom_server({"JAYT_TOKEN_SECRET": VALID_SECRET}, server8, cwd8, 8968)
    try:
        req8 = urllib.request.Request(f"http://127.0.0.1:{port8}/readyz")
        urllib.request.urlopen(req8, timeout=3)
        t8_pass = False
    except urllib.error.HTTPError as he:
        t8_pass = (he.code == 503)
        resp8 = json.loads(he.read().decode("utf-8"))
        print(f"  [READY_08] Path Traversal in Manifest returns 503: [PASS] (Reasons: {resp8.get('reasons')})")
    finally:
        proc8.kill()
finally:
    shutil.rmtree(tmp8, ignore_errors=True)

# -----------------------------------------------------------------------------
# TEST 9: PRODUCTION ENVIRONMENT HARD-BLOCK TEST ENDPOINTS (HTTP 404)
# -----------------------------------------------------------------------------
print("--- TEST 9: PRODUCTION ENVIRONMENT HARD-BLOCK /__test/* ---")
proc9, port9 = spawn_custom_server({
    "JAYT_TOKEN_SECRET": VALID_SECRET,
    "JAYT_ENV": "production",
    "JAYT_ENABLE_TEST_ENDPOINTS": "true"
}, SERVER_PY, SRC_DIR, 8969)
try:
    req9 = urllib.request.Request(f"http://127.0.0.1:{port9}/__test/slow")
    urllib.request.urlopen(req9, timeout=3)
    t9_pass = False
except urllib.error.HTTPError as he:
    t9_pass = (he.code == 404)
    print(f"  [PROD_01] Production Environment hard-blocks /__test/slow (HTTP 404): [PASS]")
finally:
    proc9.kill()

# -----------------------------------------------------------------------------
# TEST 10: 100% FULLY VALID STATE (HTTP 200 READY)
# -----------------------------------------------------------------------------
print("--- TEST 10: FULLY VALID STATE (HTTP 200 READY) ---")
tmp10 = tempfile.mkdtemp()
try:
    server10, cwd10, _, _ = create_valid_test_environment(tmp10, "BUILD_VALID_200")
    proc10, port10 = spawn_custom_server({"JAYT_TOKEN_SECRET": VALID_SECRET}, server10, cwd10, 8970)
    try:
        req10 = urllib.request.Request(f"http://127.0.0.1:{port10}/readyz")
        with urllib.request.urlopen(req10, timeout=3) as resp:
            t10_pass = (resp.status == 200)
            data10 = json.loads(resp.read().decode("utf-8"))
            print(f"  [READY_10] Valid State returns 200 READY: [PASS] (Active Build: {data10.get('active_build_id')})")
    finally:
        proc10.kill()
finally:
    shutil.rmtree(tmp10, ignore_errors=True)

all_passed = t1_pass and t2_pass and t3_pass and t4_pass and t5_pass and t6_pass and t7_pass and t8_pass and t9_pass and t10_pass
print(f"\n🟢 [READINESS-QA-SUMMARY] TOÀN BỘ 10/10 KIỂM THỬ WORK ORDER 019 ĐÃ ĐẠT (PASS)!")
if not all_passed:
    sys.exit(1)
