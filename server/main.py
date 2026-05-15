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
from agent import AIAgent, LocalVisionAgent

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
CONFIG_FILE = "config.json"
AI_WIDTH = 1024

agent_online = AIAgent()
agent_offline = LocalVisionAgent()

class Action(BaseModel):
    type: str
    x: float = 0
    y: float = 0
    text: str = ""
    button: str = "left"
    amount: int = 0

class Config(BaseModel):
    mode: str = "online" # "online" or "offline"
    api_key: str = ""

def init_files():
    if not os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "w") as f:
            json.dump([], f)
    if not os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, "w") as f:
            json.dump({"mode": "online", "api_key": ""}, f)

init_files()

def get_config():
    with open(CONFIG_FILE, "r") as f:
        return json.load(f)

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
    scale = screen_w / AI_WIDTH
    return int(x_ai * scale), int(y_ai * scale)

@app.get("/api/config")
async def read_config():
    return get_config()

@app.post("/api/config")
async def update_config(config: Config):
    with open(CONFIG_FILE, "w") as f:
        json.dump(config.dict(), f)
    return config

@app.get("/api/screenshot")
async def get_screenshot():
    with mss.mss() as sct:
        screenshot = sct.grab(sct.monitors[1])
        img = Image.frombytes("RGB", screenshot.size, screenshot.bgra, "raw", "BGRX")
        if img.width > AI_WIDTH:
            w_percent = (AI_WIDTH / float(img.width))
            h_size = int((float(img.height) * float(w_percent)))
            img = img.resize((AI_WIDTH, h_size), Image.Resampling.LANCZOS)
        buffered = io.BytesIO()
        img.save(buffered, format="JPEG", quality=50)
        return {"image": base64.b64encode(buffered.getvalue()).decode()}

@app.post("/api/execute")
async def execute_action(action: Action):
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
    return {"status": "success", "real_coords": [real_x, real_y]}

@app.post("/api/step")
async def take_step(goal: str = Body(..., embed=True)):
    config = get_config()
    screenshot = (await get_screenshot())["image"]

    with open(HISTORY_FILE, "r") as f:
        history = json.load(f)

    if config["mode"] == "online":
        result = agent_online.get_next_action(screenshot, history, goal)
    else:
        result = agent_offline.get_next_action(screenshot, history, goal)

    log_to_history({"type": "thought", "content": result["thought"], "tip": result["tip"]})
    return result

@app.post("/api/download_model")
async def download_model():
    try:
        agent_offline.load_model()
        return {"status": "Model loaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/history")
async def get_history():
    with open(HISTORY_FILE, "r") as f:
        return json.load(f)

@app.post("/api/clear_history")
async def clear_history():
    with open(HISTORY_FILE, "w") as f:
        json.dump([], f)
    return {"status": "history cleared"}

if os.path.exists("dist"):
    app.mount("/", StaticFiles(directory="dist", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
