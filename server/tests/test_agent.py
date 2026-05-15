import pytest
from server.agent import AIAgent, LocalVisionAgent
import json
from unittest.mock import MagicMock

def test_agent_initialization():
    agent = AIAgent(api_key="test_key")
    assert agent.model == "gpt-4o-mini"
    assert agent.client.api_key == "test_key"

def test_local_agent_initialization():
    agent = LocalVisionAgent()
    assert agent.model_name == "vikhyatk/moondream2"
    assert agent.model is None

def test_history_logging():
    history = []
    action = {"type": "click", "x": 100, "y": 200}
    history.append({"type": "action", "detail": action})
    assert len(history) == 1
    assert history[0]["detail"]["type"] == "click"
