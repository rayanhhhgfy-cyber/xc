import { useState, useRef, useEffect } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function CollisionSim() {
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(3);
  const [v1, setV1] = useState(5);
  const [v2, setV2] = useState(-2);
  const [elastic, setElastic] = useState(true);
  const [running, setRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef({ x1: 0, x2: 0, v1f: 0, v2f: 0, collided: false });

  // Elastic collision
  const v1f_e = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
  const v2f_e = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
  // Inelastic
  const vf_i = (m1 * v1 + m2 * v2) / (m1 + m2);

  const keBefore = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
  const keAfter = elastic
    ? 0.5 * m1 * v1f_e * v1f_e + 0.5 * m2 * v2f_e * v2f_e
    : 0.5 * (m1 + m2) * vf_i * vf_i;

  const start = () => {
    stateRef.current = { x1: 0.2, x2: 0.8, v1f: v1, v2f: v2, collided: false };
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
      const w = canvas.width, h = canvas.height;
      const s = stateRef.current;
      const dt = 0.002;
      const r1 = 15 + m1 * 5, r2 = 15 + m2 * 5;

      s.x1 += s.v1f * dt / 20;
      s.x2 += s.v2f * dt / 20;

      // Collision detection
      if (!s.collided && Math.abs(s.x1 * w - s.x2 * w) < r1 + r2) {
        s.collided = true;
        if (elastic) {
          s.v1f = v1f_e;
          s.v2f = v2f_e;
        } else {
          s.v1f = vf_i;
          s.v2f = vf_i;
        }
      }

      ctx.clearRect(0, 0, w, h);
      const cy = h / 2;

      // Track
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(30, cy + 40); ctx.lineTo(w - 30, cy + 40); ctx.stroke();

      // Ball 1
      ctx.beginPath(); ctx.arc(s.x1 * w, cy, r1, 0, Math.PI * 2);
      ctx.fillStyle = "#1e90ff"; ctx.shadowColor = "#1e90ff"; ctx.shadowBlur = 12; ctx.fill(); ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.font = "10px JetBrains Mono"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(`${m1}kg`, s.x1 * w, cy);

      // Ball 2
      ctx.beginPath(); ctx.arc(s.x2 * w, cy, r2, 0, Math.PI * 2);
      ctx.fillStyle = "#ff6b6b"; ctx.shadowColor = "#ff6b6b"; ctx.shadowBlur = 12; ctx.fill(); ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillText(`${m2}kg`, s.x2 * w, cy);

      // Velocity arrows
      const drawArrow = (x: number, vel: number, color: string) => {
        if (Math.abs(vel) < 0.1) return;
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x, cy + 55); ctx.lineTo(x + vel * 8, cy + 55); ctx.stroke();
      };
      drawArrow(s.x1 * w, s.v1f, "#1e90ff");
      drawArrow(s.x2 * w, s.v2f, "#ff6b6b");

      if (s.x1 < -0.1 || s.x1 > 1.1 || s.x2 < -0.1 || s.x2 > 1.1) {
        setRunning(false); return;
      }

      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [running, elastic, m1, m2, v1, v2, v1f_e, v2f_e, vf_i]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Mass 1" value={m1} min={1} max={10} step={0.5} unit="kg" onChange={setM1} />
          <ParamSlider label="Velocity 1" value={v1} min={-10} max={10} step={0.5} unit="m/s" onChange={setV1} />
          <ParamSlider label="Mass 2" value={m2} min={1} max={10} step={0.5} unit="kg" onChange={setM2} />
          <ParamSlider label="Velocity 2" value={v2} min={-10} max={10} step={0.5} unit="m/s" onChange={setV2} />
          <button onClick={() => setElastic(!elastic)} className={`w-full py-2 xs:py-2.5 sm:py-3 rounded-lg text-xs xs:text-xs sm:text-sm font-semibold transition ${elastic ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"}`}>
            {elastic ? "Elastic" : "Inelastic"} Collision
          </button>
          <button onClick={start} className="w-full py-2 xs:py-2.5 sm:py-3 rounded-lg bg-primary text-primary-foreground text-xs xs:text-xs sm:text-sm font-semibold">
            Run Collision
          </button>
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "KE Before", value: keBefore.toFixed(1), unit: "J" },
            { label: "KE After", value: keAfter.toFixed(1), unit: "J" },
            { label: "Momentum", value: (m1 * v1 + m2 * v2).toFixed(1), unit: "kg·m/s" },
            ...(elastic
              ? [{ label: "v1 after", value: v1f_e.toFixed(2), unit: "m/s" }, { label: "v2 after", value: v2f_e.toFixed(2), unit: "m/s" }]
              : [{ label: "Final v", value: vf_i.toFixed(2), unit: "m/s" }]),
          ]} />
        </div>
      </div>
    </div>
  );
}
