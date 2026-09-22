#!/usr/bin/env python3

import pathlib
import subprocess
import sys
import datetime

ROOT = pathlib.Path(__file__).resolve().parent
REPORT = ROOT / "wattai-manager-report.txt"
TERMUX = pathlib.Path("/data/data/com.termux").exists()

def run(cmd, timeout=180):
    try:
        r = subprocess.run(
            cmd,
            cwd=ROOT,
            text=True,
            capture_output=True,
            timeout=timeout
        )
        return r.returncode, (r.stdout + r.stderr).strip()
    except Exception as e:
        return 1, str(e)

def header():
    print("WattAI Manager v0.4")
    print("Mode: local safe manager")
    print(f"Project: {ROOT}")
    print(f"Termux: {'YES' if TERMUX else 'NO'}")
    print()

def write_report(items):
    text = [
        "WattAI Manager v0.4",
        datetime.datetime.now().isoformat(),
        ""
    ]

    for title, code, output in items:
        text += [
            f"=== {title} ===",
            output or "(no output)",
            f"EXIT={code}",
            ""
        ]

    REPORT.write_text("\n".join(text), encoding="utf-8")

def status():
    code, output = run(["git", "status", "--short"])
    print("=== Git status ===")
    print(output or "(clean)")
    return code, output

def test():
    results = []

    print("=== TypeScript ===")
    code, output = run(["npx", "tsc", "--noEmit"])
    print(output or "(no output)")
    results.append(("TypeScript", code, output))

    print("\n=== ESLint ===")
    code, output = run(["npm", "run", "lint"])
    print(output or "(no output)")
    results.append(("ESLint", code, output))

    return results

def doctor():
    results = []

    code, output = status()
    results.append(("Git status", code, output))

    results += test()

    print("\n=== Safe repair engine ===")
    print(safe_fix("Failed to load SWC binary" if TERMUX else ""))

    print("\n=== Build strategy ===")

    if TERMUX:
        output = (
            "Android/Termux detected.\n"
            "Local Next.js production build skipped.\n"
            "Use Vercel/CI for production build."
        )
        print(output)
        results.append(("Build", 0, output))
    else:
        code, output = run(["npm", "run", "build"], timeout=300)
        print(output or "(no output)")
        results.append(("Next build", code, output))

    write_report(results)

    print("\n==============================")
    print("Doctor finished.")
    print(f"Report: {REPORT}")
    print("==============================")

    return 0 if all(code == 0 for _, code, _ in results) else 1

def safe_fix(build_output):
    if "Failed to load SWC binary" in build_output or "next-swc.android-arm64" in build_output:
        return "SWC/Android detected: local build skipped; use Vercel/CI."
    return "No known safe fix required."

def main():
    header()

    command = sys.argv[1] if len(sys.argv) > 1 else "doctor"

    if command == "status":
        status()
    elif command == "test":
        results = test()
        write_report(results)
    elif command == "doctor":
        raise SystemExit(doctor())
    else:
        print("Usage:")
        print("  python wattai-manager.py doctor")
        print("  python wattai-manager.py status")
        print("  python wattai-manager.py test")
        raise SystemExit(2)

if __name__ == "__main__":
    main()
