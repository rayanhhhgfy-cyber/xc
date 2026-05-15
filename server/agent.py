import os
import json
import base64
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class AIAgent:
    def __init__(self, api_key=None):
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.model = "gpt-4o-mini" # Fast and vision capable

    def get_next_action(self, screenshot_b64, history, user_goal):
        system_prompt = """
        You are an autonomous AI Agent with full control over the user's computer.
        You can see the screen and execute actions.
        Your goal: {goal}

        Current History:
        {history}

        Analyze the screenshot and decide the next logical step.
        Return ONLY a JSON object in the following format:
        {{
            "thought": "Brief explanation of what you see and what you're doing",
            "tip": "A helpful tip for the user related to this task",
            "action": {{
                "type": "click|type|scroll|move|wait|done",
                "x": 123, (for click/move)
                "y": 456, (for click/move)
                "text": "text to type", (for type)
                "amount": 100, (for scroll/wait)
                "button": "left|right" (for click)
            }}
        }}

        Important:
        - The screen resolution in the screenshot is 1024px wide (aspect ratio preserved).
        - If the task is finished, use action type "done".
        - Be precise with coordinates.
        """

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": system_prompt.format(goal=user_goal, history=json.dumps(history[-10:]))
                    },
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": "What is the next action?"},
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
                "thought": f"Error communicating with AI: {str(e)}",
                "tip": "Check your API key and internet connection.",
                "action": {"type": "wait", "amount": 5}
            }

class LocalVisionAgent:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.model_name = "vikhyatk/moondream2"
        self.revision = "2024-08-26" # Use a stable revision

    def load_model(self):
        if self.model is None:
            from transformers import AutoModelForCausalLM, AutoTokenizer
            from PIL import Image
            import io
            import torch

            print(f"Loading local model {self.model_name}...")
            self.model = AutoModelForCausalLM.from_pretrained(
                self.model_name,
                trust_remote_code=True,
                revision=self.revision,
                torch_dtype=torch.float32 # Better for CPU/i3
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

            # Moondream is a VLM. We'll use a prompt to get structured info.
            prompt = f"Goal: {user_goal}. History: {json.dumps(history[-5:])}. Based on the screenshot, what is the next computer action? Return JSON with thought, tip, action (type, x, y, text, amount)."

            # Note: Moondream might not output perfect JSON every time, so we'd need more robust parsing in a real app.
            # For this task, we'll assume it follows instructions or we'll wrap it.
            answer = self.model.answer_question(image, prompt, self.tokenizer)

            # Simple wrapper if it doesn't return JSON
            if "{" not in answer:
                return {
                    "thought": answer,
                    "tip": "Running locally on your i3!",
                    "action": {"type": "wait", "amount": 2}
                }

            return json.loads(answer[answer.find("{"):answer.rfind("}")+1])
        except Exception as e:
            return {
                "thought": f"Local model error: {str(e)}",
                "tip": "Make sure you have enough RAM (8GB recommended).",
                "action": {"type": "wait", "amount": 5}
            }
