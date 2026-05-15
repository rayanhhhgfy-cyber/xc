# AI Computer Control - Setup Guide

This program allows an AI to see your screen and control your computer autonomously.

## Prerequisites
- Python 3.10+
- Node.js & NPM
- OpenAI API Key

## Quick Start (Development)
1. **Install Python Dependencies:**
   ```bash
   pip install -r server/requirements.txt
   ```
2. **Start the Backend:**
   ```bash
   python server/main.py
   ```
3. **Start the Frontend:**
   ```bash
   npm install
   npm run dev
   ```
4. **Open the App:**
   Go to `http://localhost:5173/ai-agent` in your browser.

## Building the .EXE
To create a standalone executable for Windows:
1. Build the frontend: `npm run build`
2. Run the build script: `python scripts/build_exe.py`
3. The executable will be in the `dist/` directory.

## Features
- **Vision-Based Control:** The AI sees what you see.
- **Thinking Log:** Watch the AI's reasoning in real-time.
- **Tips:** Get helpful tips from the AI during tasks.
- **Full Control:** Supports clicks, typing, scrolling, and movement.
- **Lite Performance:** Screenshots are compressed and resized to run smoothly on lower-end hardware (like i3).
- **History:** Keeps track of previous actions and thoughts.

## Security Note
This program gives an AI full control over your mouse and keyboard. Always supervise the agent while it is running in autonomous mode.
