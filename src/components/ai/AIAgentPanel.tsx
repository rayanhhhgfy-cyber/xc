import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Square, RotateCcw, ShieldAlert, Cpu, Download, Globe, CloudOff, Loader2 } from "lucide-react";
import ScreenPreview from "./ScreenPreview";
import ThinkingLog from "./ThinkingLog";
import { toast } from "sonner";

const AIAgentPanel = () => {
  const [goal, setGoal] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [mode, setMode] = useState("online");
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:8000/api' : '/api';

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${API_BASE}/config`);
        const data = await response.json();
        setMode(data.mode);
        setApiKey(data.api_key);
      } catch (err) {
        console.error("Failed to fetch config", err);
      }
    };
    fetchConfig();
  }, []);

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

  const saveConfig = async (newMode: string, newKey: string) => {
    await fetch(`${API_BASE}/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: newMode, api_key: newKey })
    });
  };

  const handleModeChange = (val: string) => {
    setMode(val);
    saveConfig(val, apiKey);
  };

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    saveConfig(mode, val);
  };

  const handleStep = async () => {
    if (!goal) {
      toast.error("Please enter a goal for the AI");
      return;
    }
    if (mode === 'online' && !apiKey) {
      toast.error("OpenAI API Key is required for Online mode");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/step`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal })
      });

      const result = await response.json();

      if (result.action) {
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

  const setupOffline = async () => {
    setIsDownloading(true);
    toast.promise(fetch(`${API_BASE}/download_model`, { method: 'POST' }), {
      loading: 'Initializing local model (Moondream2)...',
      success: () => {
        setIsDownloading(false);
        return 'Local model ready!';
      },
      error: (err) => {
        setIsDownloading(false);
        return 'Failed to load model: ' + err.message;
      }
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Cpu className="text-blue-500 w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Computer Control</h1>
            <p className="text-muted-foreground">Autonomous AI Agent (i3 Optimized)</p>
          </div>
        </div>
        <Tabs value={mode} onValueChange={handleModeChange} className="w-[300px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="online" className="gap-2">
              <Globe size={14} /> Online
            </TabsTrigger>
            <TabsTrigger value="offline" className="gap-2">
              <CloudOff size={14} /> Offline
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Screen Monitor</CardTitle>
                <CardDescription>Visual feedback of AI actions</CardDescription>
              </div>
              {mode === 'offline' && (
                <Button variant="outline" size="sm" onClick={setupOffline} disabled={isDownloading}>
                  {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                  Init Local Model
                </Button>
              )}
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
                  placeholder="e.g., Open browser and find recipes for lunch"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  disabled={isRunning}
                />
              </div>

              <div className="flex gap-4">
                {!isRunning ? (
                  <Button className="flex-1 gap-2" onClick={() => setIsRunning(true)}>
                    <Play size={18} /> Start Agent
                  </Button>
                ) : (
                  <Button variant="destructive" className="flex-1 gap-2" onClick={() => setIsRunning(false)}>
                    <Square size={18} /> Stop Agent
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

          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <ShieldAlert size={16} className="text-blue-500" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mode === 'online' ? (
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">OpenAI API Key</label>
                  <Input
                    type="password"
                    placeholder="sk-..."
                    className="h-8 text-xs"
                    value={apiKey}
                    onChange={(e) => handleApiKeyChange(e.target.value)}
                  />
                  <p className="text-[10px] text-muted-foreground">Used for GPT-4o-mini vision analysis.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-blue-600">Offline Mode Active</p>
                  <p className="text-[10px] text-muted-foreground">Using Moondream2. This runs entirely on your CPU/RAM. Initialization may take a few minutes on first run.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAgentPanel;
