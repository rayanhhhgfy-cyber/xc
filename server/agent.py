import os
import json
import base64
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class AIAgent:
    def __init__(self, api_key=None):
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.model = "gpt-4o" # Peak reasoning model

    def get_next_action(self, screenshot_b64, history, user_goal, reasoning_level="peak"):
        # Use gpt-4o-mini for 'lite', gpt-4o for 'peak'
        current_model = "gpt-4o" if reasoning_level == "peak" else "gpt-4o-mini"

        system_prompt = """
        You are a World-Class Autonomous AI Agent with full control over the user's computer.
        Your primary directive is to accomplish the user's goal with extreme precision and logical rigor.

        USER GOAL: {goal}

        ### Chain of Thought Protocol:
        Before deciding on an action, you MUST mentally perform the following steps:
        1. OBSERVE: Describe exactly what you see on the screen (windows, buttons, icons, text).
        2. ANALYZE: Evaluate the current state against the goal and the history of actions.
        3. PLAN: Determine the most efficient next step. If a complex task requires multiple steps, break it down.
        4. VERIFY: Ensure the coordinates and action type are perfect for the UI elements visible.

        ### History:
        {history}

        ### Response Format:
        Return ONLY a JSON object:
        {{
            "thought": "Your detailed step-by-step reasoning (Chain of Thought)",
            "tip": "A professional tip for the user to optimize their workflow",
            "action": {{
                "type": "click|type|scroll|move|wait|done",
                "x": 0-1024,
                "y": 0-variable (relative to width),
                "text": "string",
                "amount": integer,
                "button": "left|right"
            }}
        }}

        Important: The screen is scaled to 1024px width for your vision.
        """

        try:
            response = self.client.chat.completions.create(
                model=current_model,
                messages=[
                    {
                        "role": "system",
                        "content": system_prompt.format(goal=user_goal, history=json.dumps(history[-15:]))
                    },
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": "Execute Chain of Thought and provide the next action."},
                            {
                                "type": "image_url",
                                "image_url": {"url": f"data:image/jpeg;base64,{screenshot_b64}"}
                            },
                        ],
                    }
                ],
                response_format={"type": "json_object"}
            )

            result = json.loads(response.choices[0].message.content)
            return result
        except Exception as e:
            return {
                "thought": f"Critical Error in Peak Reasoning: {str(e)}",
                "tip": "Switching to Lite mode or checking API limits might help.",
                "action": {"type": "wait", "amount": 5}
            }

class LocalVisionAgent:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.model_name = "vikhyatk/moondream2"
        self.revision = "2024-08-26"

    def load_model(self):
        if self.model is None:
            from transformers import AutoModelForCausalLM, AutoTokenizer
            import torch

            print(f"Loading local model {self.model_name}...")
            self.model = AutoModelForCausalLM.from_pretrained(
                self.model_name,
                trust_remote_code=True,
                revision=self.revision,
                torch_dtype=torch.float32
            )
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name, revision=self.revision)
            print("Local model loaded.")

    def get_next_action(self, screenshot_b64, history, user_goal):
        try:
            self.load_model()
            from PIL import Image
            import io

            img_data = base64.b64decode(screenshot_b64)
            image = Image.open(io.BytesIO(img_data))

            prompt = f"Goal: {user_goal}. Step-by-step reasoning: Look at the screen, analyze elements, and decide the next move. Return JSON with thought, tip, action (type, x, y, text, amount)."

            answer = self.model.answer_question(image, prompt, self.tokenizer)

            if "{" not in answer:
                return {
                    "thought": answer,
                    "tip": "Local inference complete.",
                    "action": {"type": "wait", "amount": 2}
                }

            return json.loads(answer[answer.find("{"):answer.rfind("}")+1])
        except Exception as e:
            return {
                "thought": f"Local reasoning error: {str(e)}",
                "tip": "Consider freeing up some memory.",
                "action": {"type": "wait", "amount": 5}
            }
