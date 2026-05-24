import os
import subprocess
import sys

def build():
    print("Step 1: Building React Frontend...")
    # Check if npm is available
    try:
        subprocess.run(["npm", "install"], check=True, shell=True)
        subprocess.run(["npm", "run", "build"], check=True, shell=True)
    except Exception as e:
        print(f"Error building frontend: {e}")
        return

    print("Step 2: Bundling Python Backend with PyInstaller...")
    # Check if pyinstaller is installed
    try:
        import PyInstaller
    except ImportError:
        print("PyInstaller not found. Installing...")
        subprocess.run([sys.executable, "-m", "pip", "install", "pyinstaller"], check=True)

    # Bundle the 'dist' folder into the EXE
    # We use --noconsole for a GUI app experience
    cmd = [
        "pyinstaller",
        "--onefile",
        "--noconsole",
        "--add-data", "dist:dist" if os.name != 'nt' else "dist;dist",
        "--name", "AI_Computer_Control",
        "server/main.py"
    ]

    print(f"Executing: {' '.join(cmd)}")
    try:
        subprocess.run(cmd, check=True)
        print("\nSUCCESS! Executable created in the 'dist' folder (within the root, not the react dist).")
    except Exception as e:
        print(f"Error bundling with PyInstaller: {e}")

if __name__ == "__main__":
    build()
