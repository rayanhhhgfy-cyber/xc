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
