from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
import json
import base64
import io
from PIL import Image
import mss
import pyautogui
import time
from agent import AIAgent

app = FastAPI()

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HISTORY_FILE = "history.json"
agent = AIAgent()

# Coordinate scaling factor
AI_WIDTH = 1024

class Action(BaseModel):
    type: str
    x: float = 0
    y: float = 0
    text: str = ""
    button: str = "left"
    amount: int = 0

def init_history():
    if not os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "w") as f:
            json.dump([], f)

init_history()

def log_to_history(entry):
    try:
        with open(HISTORY_FILE, "r+") as f:
            history = json.load(f)
            history.append({**entry, "timestamp": time.time()})
            f.seek(0)
            json.dump(history[-200:], f)
            f.truncate()
    except Exception:
        pass

def get_screen_size():
    with mss.mss() as sct:
        monitor = sct.monitors[1]
        return monitor["width"], monitor["height"]

def scale_coords(x_ai, y_ai):
    screen_w, screen_h = get_screen_size()
    # Assuming AI was shown a 1024px wide image with aspect ratio preserved
    scale = screen_w / AI_WIDTH
    return int(x_ai * scale), int(y_ai * scale)

@app.get("/api/status")
async def root():
    return {"message": "AI Agent Backend is running"}

def capture_screen_b64():
    with mss.mss() as sct:
        screenshot = sct.grab(sct.monitors[1])
        img = Image.frombytes("RGB", screenshot.size, screenshot.bgra, "raw", "BGRX")
        if img.width > AI_WIDTH:
            w_percent = (AI_WIDTH / float(img.width))
            h_size = int((float(img.height) * float(w_percent)))
            img = img.resize((AI_WIDTH, h_size), Image.Resampling.LANCZOS)
        buffered = io.BytesIO()
        img.save(buffered, format="JPEG", quality=50)
        return base64.b64encode(buffered.getvalue()).decode()

@app.get("/api/screenshot")
async def get_screenshot():
    try:
        return {"image": capture_screen_b64()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/execute")
async def execute_action(action: Action):
    try:
        real_x, real_y = scale_coords(action.x, action.y)

        if action.type == "move":
            pyautogui.moveTo(real_x, real_y, duration=0.5)
        elif action.type == "click":
            pyautogui.click(real_x, real_y, button=action.button)
        elif action.type == "type":
            pyautogui.write(action.text, interval=0.1)
        elif action.type == "scroll":
            pyautogui.scroll(action.amount)
        elif action.type == "wait":
            time.sleep(action.amount or 1)

        log_to_history({"type": "action", "detail": action.dict()})
        return {"status": "success", "action": action.type, "real_coords": [real_x, real_y]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/step")
async def take_step(goal: str = Body(..., embed=True), api_key: str = Body(None, embed=True)):
    try:
        if api_key:
            agent.client.api_key = api_key

        screenshot = capture_screen_b64()
        with open(HISTORY_FILE, "r") as f:
            history = json.load(f)

        result = agent.get_next_action(screenshot, history, goal)

        log_to_history({"type": "thought", "content": result["thought"], "tip": result["tip"]})

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/history")
async def get_history():
    try:
        with open(HISTORY_FILE, "r") as f:
            return json.load(f)
    except Exception:
        return []

@app.post("/api/clear_history")
async def clear_history():
    with open(HISTORY_FILE, "w") as f:
        json.dump([], f)
    return {"status": "history cleared"}

# Serve frontend static files
if os.path.exists("dist"):
    app.mount("/", StaticFiles(directory="dist", html=True), name="static")
elif os.path.exists("ui"):
    app.mount("/", StaticFiles(directory="ui", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
