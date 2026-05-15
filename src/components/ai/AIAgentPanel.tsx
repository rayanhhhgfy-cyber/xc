import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Play, Square, RotateCcw, ShieldAlert, Cpu } from "lucide-react";
import ScreenPreview from "./ScreenPreview";
import ThinkingLog from "./ThinkingLog";
import { toast } from "sonner";

const AIAgentPanel = () => {
  const [goal, setGoal] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:8000/api' : '/api';

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE}/history`);
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch history", err);
    }
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleStep = async () => {
    if (!goal) {
      toast.error("Please enter a goal for the AI");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/step`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, api_key: apiKey || null })
      });

      const result = await response.json();

      if (result.action) {
        // Execute the action
        await fetch(`${API_BASE}/execute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.action)
        });

        if (result.action.type === 'done') {
          setIsRunning(false);
          toast.success("AI finished the task!");
        }
      }
    } catch (err) {
      toast.error("Error communicating with AI Agent");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Autonomous loop
  useEffect(() => {
    let timeoutId: any;
    if (isRunning && !isLoading) {
      timeoutId = setTimeout(handleStep, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [isRunning, isLoading]);

  const clearHistory = async () => {
    await fetch(`${API_BASE}/clear_history`, { method: 'POST' });
    setHistory([]);
    toast.info("History cleared");
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <Cpu className="text-blue-500 w-8 h-8" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Computer Control</h1>
          <p className="text-muted-foreground">Autonomous AI Agent powered by Vision</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Screen Monitor</CardTitle>
              <CardDescription>Live preview of what the AI sees</CardDescription>
            </CardHeader>
            <CardContent>
              <ScreenPreview />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Goal & Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Task Goal</label>
                <Input
                  placeholder="e.g., Open notepad and write a poem about chemistry"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  disabled={isRunning}
                />
              </div>

              <div className="flex gap-4">
                {!isRunning ? (
                  <Button className="flex-1 gap-2" onClick={() => setIsRunning(true)}>
                    <Play size={18} /> Start Autonomous Mode
                  </Button>
                ) : (
                  <Button variant="destructive" className="flex-1 gap-2" onClick={() => setIsRunning(false)}>
                    <Square size={18} /> Stop AI
                  </Button>
                )}
                <Button variant="outline" onClick={handleStep} disabled={isRunning || isLoading}>
                  Step Once
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Thinking Stream</CardTitle>
              <Button variant="ghost" size="icon" onClick={clearHistory}>
                <RotateCcw size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              <ThinkingLog history={history} />
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 bg-yellow-500/5">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <ShieldAlert size={16} className="text-yellow-500" />
                Advanced Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">OpenAI API Key</label>
                <Input
                  type="password"
                  placeholder="sk-..."
                  className="h-8 text-xs"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-[10px] text-muted-foreground">Required for intelligent control.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAgentPanel;
