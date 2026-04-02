import { useState, useRef, useEffect } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function CircularMotionSim() {
  const [radius, setRadius] = useState(2);
  const [mass, setMass] = useState(1);
  const [speed, setSpeed] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const omega = speed / radius;
  const centripetal = (mass * speed * speed) / radius;
  const period = (2 * Math.PI * radius) / speed;

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
    let t = 0;

    const step = () => {
      t += 0.016;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2, cy = h / 2;
      const scale = Math.min(w, h) * 0.15;
      const r = radius * scale / 2;

      // Orbit path
      ctx.strokeStyle = "rgba(30,144,255,0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

      // Center
      ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.fill();

      const angle = omega * t;
      const bx = cx + r * Math.cos(angle);
      const by = cy + r * Math.sin(angle);

      // Radius line
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();
      ctx.setLineDash([]);

      // Velocity vector (tangent)
      const vLen = 30;
      const vx = -Math.sin(angle) * vLen;
      const vy = Math.cos(angle) * vLen;
      ctx.strokeStyle = "#00d4aa";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + vx, by + vy); ctx.stroke();

      // Centripetal acceleration (inward)
      const aLen = 25;
      const ax = (cx - bx) / r * aLen;
      const ay = (cy - by) / r * aLen;
      ctx.strokeStyle = "#ff6b6b";
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + ax, by + ay); ctx.stroke();

      // Ball
      ctx.beginPath(); ctx.arc(bx, by, 10 + mass * 3, 0, Math.PI * 2);
      ctx.fillStyle = "#1e90ff"; ctx.shadowColor = "#1e90ff"; ctx.shadowBlur = 12; ctx.fill(); ctx.shadowBlur = 0;

      // Legend
      ctx.font = "11px JetBrains Mono";
      ctx.fillStyle = "#00d4aa"; ctx.fillText("→ velocity", 20, h - 30);
      ctx.fillStyle = "#ff6b6b"; ctx.fillText("→ centripetal", 20, h - 15);

      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [radius, mass, speed, omega]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Radius" value={radius} min={0.5} max={5} step={0.1} unit="m" onChange={setRadius} />
          <ParamSlider label="Mass" value={mass} min={0.5} max={5} step={0.5} unit="kg" onChange={setMass} />
          <ParamSlider label="Speed" value={speed} min={1} max={15} step={0.5} unit="m/s" onChange={setSpeed} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "Angular Vel (ω)", value: omega.toFixed(2), unit: "rad/s" },
            { label: "Centripetal Force", value: centripetal.toFixed(2), unit: "N" },
            { label: "Period", value: period.toFixed(3), unit: "s" },
            { label: "Centripetal Accel", value: (speed * speed / radius).toFixed(2), unit: "m/s²" },
          ]} />
        </div>
      </div>
    </div>
  );
}
