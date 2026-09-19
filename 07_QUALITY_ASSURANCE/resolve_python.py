# =============================================================================
# JAYT PORTABLE PYTHON RUNTIME RESOLVER (PYTHON MODULE)
# =============================================================================
import os
import sys
import shutil

def resolve_python_executable() -> str:
    """
    Locates a valid Python interpreter with strict fail-closed precedence:
    1. JAYT_PYTHON environment variable
    2. sys.executable (if valid file)
    3. PATH resolution
    4. Bundled workspace runtimes & known system locations
    5. FAIL-CLOSED RuntimeError if not found
    """
    # 1. Check JAYT_PYTHON environment variable
    env_py = os.environ.get("JAYT_PYTHON")
    if env_py and os.path.isfile(env_py):
        return env_py

    # 2. Check sys.executable
    if sys.executable and os.path.isfile(sys.executable):
        return sys.executable

    # 3. Check PATH
    which_py = shutil.which("python") or shutil.which("python3")
    if which_py and os.path.isfile(which_py) and "WindowsApps" not in which_py:
        return which_py

    # 4. Check known bundled and standard locations
    local_app_data = os.environ.get("LOCALAPPDATA", "")
    program_files = os.environ.get("ProgramFiles", r"C:\Program Files")
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

    candidates = [
        r"C:\Users\tritr\AppData\Local\Python\pythoncore-3.14-64\python.exe",
        os.path.join(local_app_data, "Python", "pythoncore-3.14-64", "python.exe"),
        os.path.join(local_app_data, "Programs", "Python", "Python314", "python.exe"),
        os.path.join(local_app_data, "Programs", "Python", "Python313", "python.exe"),
        os.path.join(local_app_data, "Programs", "Python", "Python312", "python.exe"),
        os.path.join(local_app_data, "Programs", "Python", "Python311", "python.exe"),
        os.path.join(local_app_data, "Programs", "Python", "Python310", "python.exe"),
        os.path.join(program_files, "Python314", "python.exe"),
        os.path.join(program_files, "Python313", "python.exe"),
        os.path.join(program_files, "Python312", "python.exe"),
        os.path.join(program_files, "Python311", "python.exe"),
        os.path.join(program_files, "Python310", "python.exe"),
        r"C:\Python314\python.exe",
        r"C:\Python313\python.exe",
        r"C:\Python312\python.exe",
        r"C:\Python311\python.exe",
        r"C:\Python310\python.exe",
        os.path.join(base_dir, ".venv", "Scripts", "python.exe"),
        os.path.join(base_dir, "venv", "Scripts", "python.exe"),
    ]

    for candidate in candidates:
        if candidate and os.path.isfile(candidate):
            return candidate

    raise RuntimeError("ERR_PYTHON_RUNTIME_NOT_FOUND: Failed to resolve Python runtime in JAYT_PYTHON, PATH, or known workspace locations. Execution aborted (Fail-Closed).")

if __name__ == "__main__":
    resolved = resolve_python_executable()
    print(f"RESOLVED_PYTHON: {resolved}")
