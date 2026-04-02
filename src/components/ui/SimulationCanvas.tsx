import { ReactNode } from "react";

interface SimulationCanvasProps {
  title: string;
  description: string;
  controls: ReactNode;
  canvas: ReactNode;
  results?: ReactNode;
}

export default function SimulationCanvas({ title, description, controls, canvas, results }: SimulationCanvasProps) {
  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="container">
        <h1 className="text-3xl font-bold mb-1 text-gradient-primary">{title}</h1>
        <p className="text-muted-foreground mb-6 text-sm">{description}</p>
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="glass rounded-xl overflow-hidden aspect-video relative">{canvas}</div>
          <div className="space-y-4">
            <div className="glass rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Controls</h3>
              {controls}
            </div>
            {results && (
              <div className="glass rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">Results</h3>
                {results}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
