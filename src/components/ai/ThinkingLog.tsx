import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Lightbulb } from "lucide-react";

interface ThinkingLogProps {
  history: any[];
}

const ThinkingLog: React.FC<ThinkingLogProps> = ({ history }) => {
  const thoughts = history.filter(h => h.type === 'thought');

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-slate-900 text-slate-200">
      <div className="space-y-4">
        {thoughts.map((item, i) => (
          <div key={i} className="flex flex-col gap-2 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-blue-400">
              <MessageSquare size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">AI Thought</span>
            </div>
            <p className="text-sm leading-relaxed">{item.content}</p>
            {item.tip && (
              <div className="mt-1 p-2 bg-slate-800 rounded flex gap-2 items-start">
                <Lightbulb size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 italic">{item.tip}</p>
              </div>
            )}
          </div>
        ))}
        {thoughts.length === 0 && (
          <div className="text-slate-500 text-center py-10 italic">
            Waiting for AI to start thinking...
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default ThinkingLog;
