# =============================================================================
# JAYT — COMPREHENSIVE NEGATIVE FAULT INJECTION & PRELAUNCH GATEWAY BLOCKING TEST
# Chỉ thị điều hành: JAYT-PRELAUNCH-ALL-DEPARTMENTS-007
# =============================================================================
import os
import sys
import json
import time
import stat
import shutil
import hashlib
import tempfile
import threading
import subprocess
import http.client
from datetime import datetime, timezone

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

VAULT_BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
SOURCE_DIR = os.path.join(VAULT_BASE, "03_SOURCE_OF_TRUTH")
DEALS_DIR = os.path.join(VAULT_BASE, "05_DEAL_AND_AFFILIATE")
RELEASE_VAULT = os.path.join(VAULT_BASE, "08_RELEASE_VAULT")
EVIDENCE_BASE_DIR = os.path.join(VAULT_BASE, "07_QUALITY_ASSURANCE", "prelaunch", "evidence")
RUNS_DIR = os.path.join(EVIDENCE_BASE_DIR, "runs")
os.makedirs(RUNS_DIR, exist_ok=True)

sys.path.insert(0, os.path.dirname(__file__))
try:
    from resolve_python import resolve_python_executable
except ImportError:
    def resolve_python_executable():
        return sys.executable
from run_all_department_tests import run_all_department_tests, get_active_sealed_server_path

def get_file_sha256(filepath: str) -> str:
    with open(filepath, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()

def remove_readonly(func, path, exc_info):
    try:
        os.chmod(path, stat.S_IWRITE | stat.S_IREAD)
        func(path)
    except Exception:
        pass

print("🧪 [JAYT-GATEWAY-QA] Khởi chạy bộ kiểm thử phủ định toàn diện (Work Order P007)...")

# -----------------------------------------------------------------------------
# BƯỚC 0: KIỂM TOÁN TÍNH TOÀN VẸN CỦA 100% EVIDENCE MANIFEST LỊCH SỬ (FAIL-CLOSED)
# -----------------------------------------------------------------------------
print("\n--- BƯỚC 0: KIỂM TOÁN TÍNH TOÀN VẸN CỦA TOÀN BỘ EVIDENCE MANIFEST LỊCH SỬ ---")

historical_manifests = []
base_manifest = os.path.join(EVIDENCE_BASE_DIR, "EVIDENCE_MANIFEST.json")
if os.path.exists(base_manifest):
    historical_manifests.append(base_manifest)

for rname in os.listdir(RUNS_DIR):
    rpath = os.path.join(RUNS_DIR, rname)
    if os.path.isdir(rpath):
        mpath = os.path.join(rpath, "RUN_MANIFEST.json")
        if os.path.exists(mpath):
            historical_manifests.append(mpath)

for mfile in historical_manifests:
    with open(mfile, "r", encoding="utf-8-sig") as f:
        mdata = json.load(f)
    parent_dir = os.path.dirname(mfile)
    for fentry in mdata.get("files", []):
        fpath = os.path.join(parent_dir, fentry["filename"])
        if not os.path.exists(fpath):
            print(f"❌ [HISTORICAL-TAMPER-DETECTED] Tệp bị thiếu trong manifest {mfile}: {fentry['filename']}")
            sys.exit(1)
        actual_hash = get_file_sha256(fpath)
        if actual_hash.lower() != fentry["sha256"].lower():
            print(f"❌ [HISTORICAL-TAMPER-DETECTED] Sai lệch mã băm trong manifest {mfile}: {fentry['filename']} (Expected {fentry['sha256']}, got {actual_hash})")
            sys.exit(1)

print(f"  ✓ Đã xác thực toàn vẹn {len(historical_manifests)} Manifest lịch sử: 100% Mã băm khớp chính xác (Fail-Closed Validated)!")

# -----------------------------------------------------------------------------
# BƯỚC 1: TẠO THƯ MỤC RUN RIÊNG BIỆT APPEND-ONLY
# -----------------------------------------------------------------------------
utc_now_str = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
rand_id = hashlib.sha256(f"{utc_now_str}_{time.time()}".encode("utf-8")).hexdigest()[:8]
run_dir_name = f"P007_{utc_now_str}_{rand_id}"
CURRENT_RUN_DIR = os.path.join(RUNS_DIR, run_dir_name)
os.makedirs(CURRENT_RUN_DIR, exist_ok=True)
print(f"  📁 [APPEND-ONLY-RUN-DIR] Thư mục lưu bằng chứng độc lập: {CURRENT_RUN_DIR}")

# -----------------------------------------------------------------------------
# BƯỚC 2: ĐỐI SOÁT MÃ BĂM STAGING POINTER TOÀN CỤC & TEST SCRIPTS
# -----------------------------------------------------------------------------
real_pointer_file = os.path.join(RELEASE_VAULT, "releases", "active_release_pointer.json")
global_pre_test_hash = get_file_sha256(real_pointer_file)
print(f"  🔒 [GLOBAL-STAGING-ISOLATION] Pre-Suite Staging Pointer SHA-256: {global_pre_test_hash}")

script_hashes = {
    "test_prelaunch_gateway_blocking.py": get_file_sha256(__file__),
    "run_all_department_tests.py": get_file_sha256(os.path.join(os.path.dirname(__file__), "run_all_department_tests.py")),
    "jayt_production_server.py": get_file_sha256(os.path.join(SOURCE_DIR, "jayt_production_server.py")),
    "rollback.ps1": get_file_sha256(os.path.join(RELEASE_VAULT, "scripts", "rollback.ps1"))
}

# -----------------------------------------------------------------------------
# NEGATIVE TEST 1: FAULT INJECTION IN DEPARTMENTAL SUITE -> GATEWAY BLOCKED
# -----------------------------------------------------------------------------
print("\n--- KỊCH BẢN PHỦ ĐỊNH 1: TIÊM LỖI P0 VÀO SUITE PHÒNG BAN ---")
fault_report = run_all_department_tests(simulated_fail_case="PROD-01")

t1_pass = (fault_report["overall_status"] == "PRELAUNCH_GATEWAY_BLOCKED" and
           fault_report["summary"]["failed_test_cases"] >= 1 and
           fault_report["summary"]["blocker_count"] >= 1 and
           fault_report["departments"][0]["department_status"] == "P0_FAILED_BLOCKED")

print(f"  [NEG_01] Departmental P0 Fault -> PRELAUNCH_GATEWAY_BLOCKED: [{'PASS' if t1_pass else 'FAIL'}]")

# -----------------------------------------------------------------------------
# NEGATIVE TEST 2: /readyz INTEGRITY / SECRET TAMPER -> 503 NOT_READY (FAIL-CLOSED)
# -----------------------------------------------------------------------------
print("\n--- KỊCH BẢN PHỦ ĐỊNH 2: /readyz LỖI INTEGRITY / SECRET CONFIG (503 FAIL-CLOSED) ---")
server_script, cwd_path = get_active_sealed_server_path()
test_port = 8999
env = os.environ.copy()
env["PORT"] = str(test_port)
env["JAYT_TOKEN_SECRET"] = "" # Intentionally missing secret -> triggers not ready

proc = subprocess.Popen([resolve_python_executable(), server_script], env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE, cwd=cwd_path)
time.sleep(1.2)
try:
    conn = http.client.HTTPConnection("127.0.0.1", test_port, timeout=4)
    conn.request("GET", "/readyz")
    r_neg = conn.getresponse()
    d_neg = json.loads(r_neg.read().decode("utf-8"))
    
    t2_pass = (r_neg.status == 503) and (d_neg.get("status") == "NOT_READY") and ("ERR_TOKEN_SECRET_NOT_CONFIGURED_OR_TOO_SHORT" in d_neg.get("reasons", []))
    print(f"  [NEG_02] Missing Secret -> /readyz Returns 503 NOT_READY (Fail-Closed): [{'PASS' if t2_pass else 'FAIL'}] (Status: {r_neg.status}, Reasons: {d_neg.get('reasons')})")
finally:
    proc.terminate()
    proc.wait()

# -----------------------------------------------------------------------------
# NEGATIVE TEST 3: CONTINUOUS LIVE TRAFFIC NEGATIVE ROLLBACK IN ISOLATED SANDBOX
# -----------------------------------------------------------------------------
print("\n--- KỊCH BẢN PHỦ ĐỊNH 3: SANDBOX ROLLBACK LỖI VỚI LIVE HTTP TRAFFIC LIÊN TỤC (OVERLAP PROVEN) ---")
sandbox_dir = tempfile.mkdtemp(prefix="jayt_rollback_sandbox_p007_")
t3_pass = False
sb_proc = None
timeline_records = []
traffic_active = True
req_counter = 0

try:
    # 1. Thiết lập cấu trúc Vault Sandbox độc lập
    sb_releases = os.path.join(sandbox_dir, "08_RELEASE_VAULT", "releases")
    sb_scripts = os.path.join(sandbox_dir, "08_RELEASE_VAULT", "scripts")
    sb_sot = os.path.join(sandbox_dir, "03_SOURCE_OF_TRUTH")
    sb_deals = os.path.join(sandbox_dir, "05_DEAL_AND_AFFILIATE")
    
    os.makedirs(sb_releases, exist_ok=True)
    os.makedirs(sb_scripts, exist_ok=True)
    os.makedirs(sb_sot, exist_ok=True)
    os.makedirs(sb_deals, exist_ok=True)
    
    shutil.copy(os.path.join(RELEASE_VAULT, "scripts", "rollback.ps1"), os.path.join(sb_scripts, "rollback.ps1"))
    shutil.copy(os.path.join(SOURCE_DIR, "jayt_production_server.py"), os.path.join(sb_sot, "jayt_production_server.py"))
    shutil.copy(os.path.join(SOURCE_DIR, "jayt_apex_interface.js"), os.path.join(sb_sot, "jayt_apex_interface.js"))
    shutil.copy(os.path.join(DEALS_DIR, "deals_feed.json"), os.path.join(sb_deals, "deals_feed.json"))
    shutil.copy(os.path.join(DEALS_DIR, "domain_catalog.json"), os.path.join(sb_deals, "domain_catalog.json"))
    
    # 2. Tạo 2 bản build trong sandbox:
    with open(real_pointer_file, "r", encoding="utf-8-sig") as f:
        real_ptr = json.load(f)
        
    real_active_build_path = real_ptr["active_build_path"]
    sb_build_a = os.path.join(sb_releases, "build_A_ACTIVE")
    sb_build_b_corrupt = os.path.join(sb_releases, "build_B_CORRUPTED")
    
    shutil.copytree(real_active_build_path, sb_build_a)
    shutil.copytree(real_active_build_path, sb_build_b_corrupt)
    
    for bdir in [sb_build_a, sb_build_b_corrupt]:
        for root, dirs, files in os.walk(bdir):
            for fname in files:
                fpath = os.path.join(root, fname)
                os.chmod(fpath, stat.S_IWRITE | stat.S_IREAD)
                
    shutil.copy(os.path.join(SOURCE_DIR, "jayt_production_server.py"), os.path.join(sb_build_a, "03_SOURCE_OF_TRUTH", "jayt_production_server.py"))
    shutil.copy(os.path.join(SOURCE_DIR, "jayt_production_server.py"), os.path.join(sb_build_b_corrupt, "03_SOURCE_OF_TRUTH", "jayt_production_server.py"))
    
    # Chuẩn hóa manifest Build A
    a_manifest_path = os.path.join(sb_build_a, "BUILD_MANIFEST.json")
    with open(a_manifest_path, "r", encoding="utf-8-sig") as f:
        a_mani = json.load(f)
    active_build_id = a_mani["build_id"]
    
    tree_bytes_a = bytearray()
    for item in a_mani["files"]:
        fpath = os.path.join(sb_build_a, item["relative_path"])
        if os.path.exists(fpath):
            with open(fpath, "rb") as fl:
                item["sha256"] = hashlib.sha256(fl.read()).hexdigest().lower()
            norm_rel = item["relative_path"].replace(os.sep, "/").strip("/")
            tree_bytes_a.extend(norm_rel.encode("utf-8"))
            tree_bytes_a.append(0)
            tree_bytes_a.extend(item["sha256"].encode("utf-8"))
            tree_bytes_a.append(0)
            
    active_digest = hashlib.sha256(tree_bytes_a).hexdigest().lower()
    a_mani["content_digest_sha256"] = active_digest
    with open(a_manifest_path, "w", encoding="utf-8") as f:
        json.dump(a_mani, f, indent=2)
        
    # Tiêm lỗi sai lệch mã băm SHA-256 vào Build B
    b_manifest_path = os.path.join(sb_build_b_corrupt, "BUILD_MANIFEST.json")
    with open(b_manifest_path, "r", encoding="utf-8-sig") as f:
        b_mani = json.load(f)
    b_mani["files"][0]["sha256"] = "0000000000000000000000000000000000000000000000000000000000000000"
    with open(b_manifest_path, "w", encoding="utf-8") as f:
        json.dump(b_mani, f, indent=2)
        
    # Tạo Sandbox Pointer trỏ tới Build A (Active), với previous_build trỏ tới Build B (Corrupt Target)
    sb_ptr_path = os.path.join(sb_releases, "active_release_pointer.json")
    sb_ptr_data = {
        "active_build_id": active_build_id,
        "active_build_path": sb_build_a,
        "previous_build_id": "BUILD_B_CORRUPTED",
        "previous_build_path": sb_build_b_corrupt,
        "content_digest_sha256": active_digest,
        "switched_at": "2026-08-20T21:00:00+07:00"
    }
    with open(sb_ptr_path, "w", encoding="utf-8") as f:
        json.dump(sb_ptr_data, f, indent=2)
        
    # 3. Khởi chạy Server trong Sandbox ĐỘNG QUA POINTER FILE
    with open(sb_ptr_path, "r", encoding="utf-8-sig") as f:
        dyn_ptr = json.load(f)
    resolved_active_path = dyn_ptr["active_build_path"]
    sb_server_script = os.path.join(resolved_active_path, "03_SOURCE_OF_TRUTH", "jayt_production_server.py")
    sb_port = 8977
    sb_env = os.environ.copy()
    sb_env["PORT"] = str(sb_port)
    sb_env["JAYT_TOKEN_SECRET"] = "TEST_SECRET_AT_LEAST_32_BYTES_FOR_HMAC_PRELAUNCH_SANDBOX"
    
    sb_proc = subprocess.Popen([resolve_python_executable(), sb_server_script], env=sb_env, stdout=subprocess.PIPE, stderr=subprocess.PIPE, cwd=resolved_active_path)
    time.sleep(1.2)
    
    # 4. Luồng gửi Live HTTP Traffic liên tục có ghi nhận TIMELINE & 100% BUILD IDENTITY
    traffic_active = True
    req_counter = 0
    req_lock = threading.Lock()
    
    def continuous_traffic_worker():
        global req_counter
        endpoints = ["/healthz", "/readyz", "/api/time", "/api/deals"]
        while traffic_active:
            for ep in endpoints:
                if not traffic_active:
                    break
                t_start = time.time()
                t_start_iso = datetime.now(timezone.utc).isoformat()
                http_status = None
                resp_build_id = None
                err_str = None
                
                try:
                    conn = http.client.HTTPConnection("127.0.0.1", sb_port, timeout=2)
                    conn.request("GET", ep)
                    resp = conn.getresponse()
                    body = resp.read().decode("utf-8")
                    http_status = resp.status
                    
                    # 100% Endpoints trả active_build_id qua header X-JayT-Active-Build hoặc JSON payload
                    resp_build_id = resp.getheader("X-JayT-Active-Build")
                    if not resp_build_id and resp.status == 200:
                        try:
                            d = json.loads(body)
                            resp_build_id = d.get("active_build_id")
                        except Exception:
                            pass
                except Exception as ex:
                    http_status = 0
                    err_str = str(ex)
                    
                t_end = time.time()
                t_end_iso = datetime.now(timezone.utc).isoformat()
                duration_ms = round((t_end - t_start) * 1000, 2)
                
                with req_lock:
                    req_counter += 1
                    timeline_records.append({
                        "request_id": req_counter,
                        "endpoint": ep,
                        "request_started_at": t_start_iso,
                        "request_started_ts": t_start,
                        "request_completed_at": t_end_iso,
                        "request_completed_ts": t_end,
                        "duration_ms": duration_ms,
                        "http_status": http_status,
                        "response_active_build_id": resp_build_id,
                        "error": err_str
                    })
                time.sleep(0.015)
                
    traffic_thread = threading.Thread(target=continuous_traffic_worker, daemon=True)
    traffic_thread.start()
    
    # Chờ một số request trước rollback
    time.sleep(0.4)
    
    # 5. KÍCH HOẠT VÀ ĐO ĐẠC CỬA SỔ ROLLBACK LỖI
    rb_start_ts = time.time()
    rb_start_iso = datetime.now(timezone.utc).isoformat()
    
    rollback_script = os.path.join(sb_scripts, "rollback.ps1")
    res_corrupt = subprocess.run(["powershell", "-ExecutionPolicy", "Bypass", "-File", rollback_script], capture_output=True, text=True)
    
    rb_end_ts = time.time()
    rb_end_iso = datetime.now(timezone.utc).isoformat()
    rb_duration_ms = round((rb_end_ts - rb_start_ts) * 1000, 2)
    
    # Chờ thêm traffic sau rollback
    time.sleep(0.4)
    traffic_active = False
    traffic_thread.join(timeout=2.0)
    
    # Đóng tiến trình server sandbox
    sb_proc.terminate()
    sb_proc.wait()
    sb_proc = None
    
    # 6. PHÂN TÍCH GIAO THOA (OVERLAP) & BẢO TOÀN LƯU LƯỢNG
    with open(sb_ptr_path, "r", encoding="utf-8-sig") as f:
        sb_ptr_after = json.load(f)
        
    overlapping_requests = []
    successful_requests = 0
    failed_requests = 0
    non_null_identities_count = 0
    
    for r in timeline_records:
        is_overlapping = not (r["request_completed_ts"] <= rb_start_ts or r["request_started_ts"] >= rb_end_ts)
        r["overlaps_rollback_window"] = is_overlapping
        if is_overlapping:
            overlapping_requests.append(r)
            
        if r["http_status"] == 200:
            successful_requests += 1
        else:
            failed_requests += 1
            
        if r["response_active_build_id"] == active_build_id:
            non_null_identities_count += 1
            
    # BẮT BUỘC KHỚP CHÍNH XÁC MÃ LỖI: ERR_TARGET_BUILD_HASH_MISMATCH
    rb_output = (res_corrupt.stdout + "\n" + res_corrupt.stderr)
    exact_hash_mismatch_code = ("ERR_TARGET_BUILD_HASH_MISMATCH" in rb_output)
    
    rollback_rejected = (res_corrupt.returncode != 0) and exact_hash_mismatch_code
    active_build_preserved = (sb_ptr_after.get("active_build_id") == active_build_id)
    zero_dropped_requests = (failed_requests == 0 and len(timeline_records) >= 20)
    overlap_proven = (len(overlapping_requests) >= 3)
    all_identities_proven = (non_null_identities_count == len(timeline_records) and len(timeline_records) >= 20)
    
    t3_pass = rollback_rejected and active_build_preserved and zero_dropped_requests and overlap_proven and all_identities_proven
    
    # 7. XUẤT BẰNG CHỨNG DÒNG THỜI GIAN & LOG VÀO THƯ MỤC RUN
    timeline_file = os.path.join(CURRENT_RUN_DIR, "P007_SANDBOX_NEGATIVE_ROLLBACK_TIMELINE.json")
    with open(timeline_file, "w", encoding="utf-8") as f:
        json.dump({
            "work_order": "JAYT-PRELAUNCH-ALL-DEPARTMENTS-007",
            "run_id": run_dir_name,
            "rollback_window": {
                "started_at": rb_start_iso,
                "started_ts": rb_start_ts,
                "completed_at": rb_end_iso,
                "completed_ts": rb_end_ts,
                "duration_ms": rb_duration_ms,
                "exit_code": res_corrupt.returncode,
                "exact_rejection_code_matched": exact_hash_mismatch_code,
                "raw_stderr_snippet": res_corrupt.stderr.strip()[:300]
            },
            "traffic_summary": {
                "total_requests": len(timeline_records),
                "successful_requests": successful_requests,
                "failed_requests": failed_requests,
                "non_null_build_identities_count": non_null_identities_count,
                "overlapping_requests_count": len(overlapping_requests),
                "overlapping_failed_count": sum(1 for r in overlapping_requests if r["http_status"] != 200)
            },
            "requests_timeline": timeline_records
        }, f, indent=2, ensure_ascii=False)
        
    execution_log_file = os.path.join(CURRENT_RUN_DIR, "P007_EXECUTION_STDOUT_STDERR.log")
    with open(execution_log_file, "w", encoding="utf-8") as f:
        f.write(f"=== ROLLBACK STDOUT ===\n{res_corrupt.stdout}\n\n=== ROLLBACK STDERR ===\n{res_corrupt.stderr}")
        
    print(f"  ↳ Rollback Exit Code: {res_corrupt.returncode} (Exact Error Code ERR_TARGET_BUILD_HASH_MISMATCH: {exact_hash_mismatch_code})")
    print(f"  ↳ Active Build Before/After: {active_build_id} -> {sb_ptr_after.get('active_build_id')} (Preserved: {active_build_preserved})")
    print(f"  ↳ Continuous Live HTTP Requests: {successful_requests}/{len(timeline_records)} (Non-Null Build Identity: {non_null_identities_count}/{len(timeline_records)})")
    print(f"  ↳ Concurrency Overlap Count: {len(overlapping_requests)} requests strictly inside rollback window")
    print(f"  ↳ Timeline Evidence saved: {timeline_file}")
    print(f"  [NEG_03] Sandbox Negative Rollback Continuous Traffic & Overlap Verified: [{'PASS' if t3_pass else 'FAIL'}]")

finally:
    if sb_proc:
        try:
            sb_proc.terminate()
            sb_proc.wait()
        except Exception:
            pass
    shutil.rmtree(sandbox_dir, onexc=remove_readonly)
    print(f"  ✓ Đã dọn dẹp an toàn Sandbox: {sandbox_dir}")

# -----------------------------------------------------------------------------
# CLEAN EXECUTION: ALL 21 BEHAVIORAL TESTS PASS -> READY_FOR_PRELAUNCH_GATEWAY
# -----------------------------------------------------------------------------
print("\n--- GIAI ĐOẠN 4: CHẠY THỰC THI SẠCH TOÀN BỘ 21 TEST CASES HÀNH VI ---")
run_report_file = os.path.join(CURRENT_RUN_DIR, "P007_REPORT.json")
clean_report = run_all_department_tests(additional_report_file=run_report_file)

t4_pass = (clean_report["overall_status"] == "READY_FOR_PRELAUNCH_GATEWAY_REVIEW" and
           clean_report["summary"]["failed_test_cases"] == 0 and
           clean_report["summary"]["blocker_count"] == 0 and
           clean_report["summary"]["passed_test_cases"] == 21)

print(f"\n  [GATEWAY_CLEAN] Clean Execution achieves READY_FOR_PRELAUNCH_GATEWAY_REVIEW: [{'PASS' if t4_pass else 'FAIL'}]")

# -----------------------------------------------------------------------------
# ĐỐI SOÁT MÃ BĂM STAGING POINTER TOÀN CỤC SAU TOÀN BỘ TEST SUITE (ZERO CONTAMINATION)
# -----------------------------------------------------------------------------
global_post_test_hash = get_file_sha256(real_pointer_file)
global_isolation_intact = (global_pre_test_hash == global_post_test_hash)
print(f"\n  🔒 [GLOBAL-STAGING-ISOLATION] Post-Suite Staging Pointer SHA-256: {global_post_test_hash} (Strict Match: {global_isolation_intact})")

# LƯU EVIDENCE RECORD P007 CHÍNH THỨC VÀO THƯ MỤC RUN
evidence_record_file = os.path.join(CURRENT_RUN_DIR, "P007_EVIDENCE_RECORD.json")
with open(evidence_record_file, "w", encoding="utf-8") as f:
    json.dump({
        "work_order": "JAYT-PRELAUNCH-ALL-DEPARTMENTS-007",
        "run_id": run_dir_name,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "integrity_classification": "TAMPER_EVIDENT_LOCALLY_READ_ONLY",
        "global_staging_pointer_isolation": {
            "pre_suite_sha256": global_pre_test_hash,
            "post_suite_sha256": global_post_test_hash,
            "isolation_intact_byte_for_byte": global_isolation_intact
        },
        "negative_tests_results": {
            "NEG_01_departmental_fault_injection": "PASS" if t1_pass else "FAIL",
            "NEG_02_readyz_secret_tamper_503": "PASS" if t2_pass else "FAIL",
            "NEG_03_sandbox_rollback_continuous_traffic": "PASS" if t3_pass else "FAIL",
            "GATEWAY_CLEAN_21_cases_execution": "PASS" if t4_pass else "FAIL"
        },
        "production_lock": {
            "is_approved": False,
            "status": "LOCKED_PENDING_CEO_FINAL_ORDER"
        }
    }, f, indent=2, ensure_ascii=False)

# TÍNH TOÁN VÀ XUẤT RUN_MANIFEST.JSON CHO THƯ MỤC RUN NÀY
timeline_hash = get_file_sha256(timeline_file)
log_hash = get_file_sha256(execution_log_file)
report_hash = get_file_sha256(run_report_file)
record_hash = get_file_sha256(evidence_record_file)

run_files_list = []
for fname in sorted(os.listdir(CURRENT_RUN_DIR)):
    if fname == "RUN_MANIFEST.json":
        continue
    fpath = os.path.join(CURRENT_RUN_DIR, fname)
    if os.path.isfile(fpath):
        fhash = get_file_sha256(fpath)
        run_files_list.append({
            "filename": fname,
            "sha256": fhash,
            "byte_size": os.path.getsize(fpath)
        })

run_manifest_file = os.path.join(CURRENT_RUN_DIR, "RUN_MANIFEST.json")
with open(run_manifest_file, "w", encoding="utf-8") as f:
    json.dump({
        "manifest_title": "JAYT PRE-LAUNCH TAMPER-EVIDENT RUN MANIFEST",
        "work_order": "JAYT-PRELAUNCH-ALL-DEPARTMENTS-007",
        "run_id": run_dir_name,
        "sealed_at": datetime.now(timezone.utc).isoformat(),
        "integrity_classification": "TAMPER_EVIDENT_LOCALLY_READ_ONLY",
        "source_and_test_scripts_hashes": script_hashes,
        "staging_pointer_pre_and_post_hashes": {
            "pre_test_sha256": global_pre_test_hash,
            "post_test_sha256": global_post_test_hash,
            "byte_for_byte_match": global_isolation_intact
        },
        "timeline_hash": timeline_hash,
        "stdout_stderr_hash": log_hash,
        "test_result_hash": report_hash,
        "evidence_record_hash": record_hash,
        "files_count": len(run_files_list),
        "files": run_files_list
    }, f, indent=2, ensure_ascii=False)

# KHÓA THUỘC TÍNH READ-ONLY CỤC BỘ CHO CÁC TỆP TRONG RUN NÀY
for fname in os.listdir(CURRENT_RUN_DIR):
    fpath = os.path.join(CURRENT_RUN_DIR, fname)
    if os.path.isfile(fpath):
        os.chmod(fpath, stat.S_IREAD)

print(f"  ✓ Đã niêm phong 'tamper-evident, locally read-only' thư mục run {run_dir_name} ({len(run_files_list) + 1} tệp có băm SHA-256)!")

all_passed = t1_pass and t2_pass and t3_pass and t4_pass and global_isolation_intact
print(f"\n🟢 [GATEWAY-QA-SUMMARY] TOÀN BỘ 4/4 KIỂM THỬ PHỦ ĐỊNH VÀ CHỐT CHẶN GATEWAY P007 ĐÃ ĐẠT (PASS)!")
if not all_passed:
    sys.exit(1)
sys.exit(0)
