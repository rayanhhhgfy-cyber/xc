import { useState, useRef, useEffect, useCallback } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function PendulumSim() {
  const [length, setLength] = useState(2);
  const [mass, setMass] = useState(1);
  const [angle0, setAngle0] = useState(30);
  const [gravity, setGravity] = useState(9.81);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef({ theta: 0, omega: 0 });

  const period = 2 * Math.PI * Math.sqrt(length / gravity);
  const maxSpeed = Math.sqrt(2 * gravity * length * (1 - Math.cos((angle0 * Math.PI) / 180)));

  useEffect(() => {
    stateRef.current = { theta: (angle0 * Math.PI) / 180, omega: 0 };
  }, [angle0, length, gravity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { const r = canvas.parentElement!.getBoundingClientRect(); canvas.width = r.width; canvas.height = r.height; };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dt = 0.016;

    const step = () => {
      const { theta, omega } = stateRef.current;
      const alpha = -(gravity / length) * Math.sin(theta);
      stateRef.current.omega = omega + alpha * dt;
      stateRef.current.theta = theta + stateRef.current.omega * dt;
      stateRef.current.omega *= 0.999; // tiny damping

      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      for (let i = 0; i < w; i += 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
      for (let i = 0; i < h; i += 50) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }

      const pivotX = w / 2, pivotY = h * 0.15;
      const scale = Math.min(w, h) * 0.25;
      const bobX = pivotX + Math.sin(stateRef.current.theta) * scale;
      const bobY = pivotY + Math.cos(stateRef.current.theta) * scale;

      // String
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(pivotX, pivotY); ctx.lineTo(bobX, bobY); ctx.stroke();

      // Pivot
      ctx.beginPath(); ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.fill();

      // Bob
      const bobSize = 10 + mass * 5;
      ctx.beginPath(); ctx.arc(bobX, bobY, bobSize, 0, Math.PI * 2);
      ctx.fillStyle = "#1e90ff"; ctx.shadowColor = "#1e90ff"; ctx.shadowBlur = 15; ctx.fill(); ctx.shadowBlur = 0;

      // Trail arc
      ctx.strokeStyle = "rgba(30,144,255,0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, scale, Math.PI / 2 - (angle0 * Math.PI) / 180, Math.PI / 2 + (angle0 * Math.PI) / 180);
      ctx.stroke();

      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [length, gravity, mass, angle0]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Length" value={length} min={0.5} max={5} step={0.1} unit="m" onChange={setLength} />
          <ParamSlider label="Mass" value={mass} min={0.5} max={5} step={0.5} unit="kg" onChange={setMass} />
          <ParamSlider label="Initial Angle" value={angle0} min={5} max={80} step={1} unit="°" onChange={setAngle0} />
          <ParamSlider label="Gravity" value={gravity} min={1} max={25} step={0.1} unit="m/s²" onChange={setGravity} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "Period", value: period.toFixed(3), unit: "s" },
            { label: "Frequency", value: (1 / period).toFixed(3), unit: "Hz" },
            { label: "Max Speed", value: maxSpeed.toFixed(2), unit: "m/s" },
            { label: "Max KE", value: (0.5 * mass * maxSpeed * maxSpeed).toFixed(2), unit: "J" },
          ]} />
        </div>
      </div>
    </div>
  );
}
