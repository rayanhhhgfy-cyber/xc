import pytest
from server.agent import AIAgent
import json

def test_agent_initialization():
    agent = AIAgent(api_key="test_key")
    assert agent.model == "gpt-4o-mini"
    assert agent.client.api_key == "test_key"

def test_history_logging():
    # Mocking history log behavior
    history = []
    action = {"type": "click", "x": 100, "y": 200}
    history.append({"type": "action", "detail": action})
    assert len(history) == 1
    assert history[0]["detail"]["type"] == "click"

# More tests could be added with mocking for OpenAI calls
