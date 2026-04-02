import { useState, useRef, useEffect } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function InclinedPlaneSim() {
  const [angle, setAngle] = useState(30);
  const [mass, setMass] = useState(2);
  const [friction, setFriction] = useState(0.2);
  const [running, setRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const velRef = useRef(0);

  const g = 9.81;
  const rad = (angle * Math.PI) / 180;
  const gParallel = g * Math.sin(rad);
  const gNormal = g * Math.cos(rad);
  const frictionForce = friction * mass * gNormal;
  const netAccel = Math.max(0, gParallel - friction * gNormal);
  const normalForce = mass * gNormal;

  const start = () => { posRef.current = 0; velRef.current = 0; setRunning(true); };

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
      const dt = 0.016;
      velRef.current += netAccel * dt;
      posRef.current += velRef.current * dt;

      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Ramp
      const rampW = w * 0.7;
      const rampH = rampW * Math.tan(rad);
      const x0 = w * 0.15, y0 = h * 0.85;
      const x1 = x0 + rampW, y1 = y0 - Math.min(rampH, h * 0.6);

      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.lineTo(x1, y1); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();

      // Block on ramp
      const rampLen = Math.sqrt(rampW * rampW + (y0 - y1) * (y0 - y1));
      const t = Math.min(posRef.current * 30, rampLen - 20);
      const frac = t / rampLen;
      const bx = x1 - frac * (x1 - x0);
      const by = y1 + frac * (y0 - y1);

      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(-rad);
      ctx.fillStyle = "#1e90ff";
      ctx.shadowColor = "#1e90ff"; ctx.shadowBlur = 10;
      const boxSize = 15 + mass * 3;
      ctx.fillRect(-boxSize, -boxSize * 2, boxSize * 2, boxSize * 2);
      ctx.shadowBlur = 0;
      ctx.restore();

      // Angle arc
      ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(x1, y0, 40, -Math.PI, -Math.PI + rad); ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px JetBrains Mono";
      ctx.fillText(`${angle}°`, x1 - 55, y0 - 10);

      if (posRef.current * 30 > rampLen) { setRunning(false); return; }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [running, angle, mass, friction, netAccel, rad]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Angle" value={angle} min={5} max={75} step={1} unit="°" onChange={setAngle} />
          <ParamSlider label="Mass" value={mass} min={0.5} max={10} step={0.5} unit="kg" onChange={setMass} />
          <ParamSlider label="Friction (μ)" value={friction} min={0} max={1} step={0.05} unit="" onChange={setFriction} />
          <button onClick={start} className="w-full py-2 xs:py-2.5 sm:py-3 rounded-lg bg-primary text-primary-foreground text-xs xs:text-xs sm:text-sm font-semibold">Release Block</button>
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "Net Accel", value: netAccel.toFixed(2), unit: "m/s²" },
            { label: "Normal Force", value: normalForce.toFixed(2), unit: "N" },
            { label: "Friction Force", value: frictionForce.toFixed(2), unit: "N" },
            { label: "g∥", value: (mass * gParallel).toFixed(2), unit: "N" },
          ]} />
        </div>
      </div>
    </div>
  );
}
