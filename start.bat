@echo off
echo Setting up AI Computer Control...

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed. Please install Python 3.10 or higher.
    pause
    exit /b
)

:: Create virtual environment
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

:: Install dependencies
echo Installing dependencies...
call venv\Scripts\activate
pip install -r server/requirements.txt

:: Build frontend
echo Building frontend (requires Node.js)...
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    npm install && npm run build
) else (
    echo Node.js not found. Skipping frontend build.
    echo If you already have the 'dist' folder, the app will still run.
)

:: Start the app
echo Starting AI Computer Control...
echo Open your browser to http://localhost:8000
python server/main.py
pause
