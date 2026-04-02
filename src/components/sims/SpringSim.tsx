import { useState, useRef, useEffect } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function SpringSim() {
  const [k, setK] = useState(50);
  const [mass, setMass] = useState(2);
  const [displacement, setDisplacement] = useState(1);
  const [damping, setDamping] = useState(0.02);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef({ x: 0, v: 0 });

  const omega = Math.sqrt(k / mass);
  const period = (2 * Math.PI) / omega;
  const maxV = displacement * omega;
  const energy = 0.5 * k * displacement * displacement;

  useEffect(() => {
    stateRef.current = { x: displacement, v: 0 };
  }, [displacement, k, mass]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { const r = canvas.parentElement!.getBoundingClientRect(); canvas.width = r.width; canvas.height = r.height; };
    resize(); window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const trailX: number[] = [];

    const step = () => {
      const dt = 0.016;
      const { x, v } = stateRef.current;
      const a = -(k / mass) * x - damping * v;
      stateRef.current.v = v + a * dt;
      stateRef.current.x = x + stateRef.current.v * dt;

      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cy = h / 2;
      const wallX = 60;
      const scale = Math.min(w * 0.3, 150);
      const restX = w / 2;
      const bobX = restX + stateRef.current.x * scale;

      // Wall
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fillRect(wallX - 5, cy - 60, 5, 120);

      // Spring coils
      ctx.strokeStyle = "rgba(30,144,255,0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      const coils = 12;
      const springLen = bobX - wallX;
      for (let i = 0; i <= coils * 4; i++) {
        const t = i / (coils * 4);
        const sx = wallX + t * springLen;
        const sy = cy + Math.sin(i * Math.PI / 2) * 15;
        i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      // Equilibrium line
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(restX, cy - 50); ctx.lineTo(restX, cy + 50); ctx.stroke();
      ctx.setLineDash([]);

      // Bob
      const bobSize = 12 + mass * 4;
      ctx.beginPath(); ctx.arc(bobX, cy, bobSize, 0, Math.PI * 2);
      ctx.fillStyle = "#00d4aa"; ctx.shadowColor = "#00d4aa"; ctx.shadowBlur = 15; ctx.fill(); ctx.shadowBlur = 0;

      // Trail graph at bottom
      trailX.push(stateRef.current.x);
      if (trailX.length > 200) trailX.shift();
      ctx.strokeStyle = "rgba(0,212,170,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      trailX.forEach((val, i) => {
        const gx = w * 0.1 + (i / 200) * w * 0.8;
        const gy = h * 0.85 + val * 20;
        i === 0 ? ctx.moveTo(gx, gy) : ctx.lineTo(gx, gy);
      });
      ctx.stroke();

      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [k, mass, damping, displacement]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Spring Constant" value={k} min={10} max={200} step={5} unit="N/m" onChange={setK} />
          <ParamSlider label="Mass" value={mass} min={0.5} max={10} step={0.5} unit="kg" onChange={setMass} />
          <ParamSlider label="Displacement" value={displacement} min={0.2} max={2} step={0.1} unit="m" onChange={setDisplacement} />
          <ParamSlider label="Damping" value={damping} min={0} max={0.5} step={0.01} unit="" onChange={setDamping} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "Period", value: period.toFixed(3), unit: "s" },
            { label: "Frequency", value: (1 / period).toFixed(3), unit: "Hz" },
            { label: "ω", value: omega.toFixed(2), unit: "rad/s" },
            { label: "Total Energy", value: energy.toFixed(2), unit: "J" },
            { label: "Max Velocity", value: maxV.toFixed(2), unit: "m/s" },
          ]} />
        </div>
      </div>
    </div>
  );
}
