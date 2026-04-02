import { useState, useRef, useEffect } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function NuclearDecaySim() {
  const [halfLife, setHalfLife] = useState(5);
  const [initialAtoms, setInitialAtoms] = useState(200);
  const [running, setRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const atomsRef = useRef<{ x: number; y: number; alive: boolean; decayTime: number }[]>([]);

  const decayConstant = Math.LN2 / halfLife;

  const start = () => {
    timeRef.current = 0;
    atomsRef.current = Array.from({ length: initialAtoms }, () => ({
      x: Math.random(), y: Math.random(), alive: true,
      decayTime: -halfLife * Math.log(Math.random()) / Math.LN2,
    }));
    setRunning(true);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { const r = canvas.parentElement!.getBoundingClientRect(); canvas.width = r.width; canvas.height = r.height; };
    resize(); window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const step = () => {
      timeRef.current += 0.05;
      const t = timeRef.current;
      const w = canvas.width, h2 = canvas.height;
      ctx.clearRect(0, 0, w, h2);

      const boxW = w * 0.45, boxH = h2 * 0.7;
      const bx = 30, by = (h2 - boxH) / 2;

      ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1;
      ctx.strokeRect(bx, by, boxW, boxH);

      let alive = 0;
      atomsRef.current.forEach((atom) => {
        if (atom.alive && t > atom.decayTime) atom.alive = false;
        const ax = bx + atom.x * boxW;
        const ay = by + atom.y * boxH;
        ctx.beginPath(); ctx.arc(ax, ay, 3, 0, Math.PI * 2);
        if (atom.alive) {
          ctx.fillStyle = "#00d4aa"; alive++;
        } else {
          ctx.fillStyle = "rgba(255,100,100,0.3)";
        }
        ctx.fill();
      });

      // Decay curve graph on right
      const gx = w * 0.55, gy = by, gw2 = w * 0.4, gh = boxH;
      ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(gx, gy + gh); ctx.lineTo(gx + gw2, gy + gh); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.stroke();

      // Theoretical curve
      ctx.strokeStyle = "rgba(0,212,170,0.3)"; ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const tt = (i / 100) * halfLife * 5;
        const n = initialAtoms * Math.exp(-decayConstant * tt);
        const px = gx + (tt / (halfLife * 5)) * gw2;
        const py = gy + gh - (n / initialAtoms) * gh;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Current point
      const curN = alive;
      const px = gx + Math.min(1, t / (halfLife * 5)) * gw2;
      const py = gy + gh - (curN / initialAtoms) * gh;
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#00d4aa"; ctx.shadowColor = "#00d4aa"; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;

      // Labels
      ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px JetBrains Mono"; ctx.textAlign = "center";
      ctx.fillText(`t = ${t.toFixed(1)}s  |  N = ${alive}`, w / 2, h2 - 10);

      // Half-life markers
      ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.setLineDash([3, 3]);
      for (let hl = 1; hl <= 4; hl++) {
        const hlx = gx + (hl * halfLife / (halfLife * 5)) * gw2;
        ctx.beginPath(); ctx.moveTo(hlx, gy); ctx.lineTo(hlx, gy + gh); ctx.stroke();
      }
      ctx.setLineDash([]);

      if (alive === 0) { setRunning(false); return; }
      if (t > halfLife * 6) { setRunning(false); return; }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [running, halfLife, initialAtoms, decayConstant]);

  const theoreticalN = initialAtoms * Math.exp(-decayConstant * timeRef.current);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Half-life" value={halfLife} min={1} max={20} step={0.5} unit="s" onChange={setHalfLife} />
          <ParamSlider label="Initial Atoms" value={initialAtoms} min={50} max={500} step={50} unit="" onChange={setInitialAtoms} />
          <button onClick={start} className="w-full py-2 xs:py-2.5 sm:py-3 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm md:text-base font-semibold">
            Start Decay
          </button>
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "Decay Constant", value: decayConstant.toFixed(4), unit: "s⁻¹" },
            { label: "Mean Lifetime", value: (1 / decayConstant).toFixed(2), unit: "s" },
            { label: "Activity", value: (decayConstant * initialAtoms).toFixed(1), unit: "Bq" },
          ]} />
        </div>
      </div>
    </div>
  );
}
