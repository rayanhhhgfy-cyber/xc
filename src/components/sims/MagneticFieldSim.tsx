import { useState, useRef, useEffect } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function MagneticFieldSim() {
  const [current, setCurrent] = useState(5);
  const [wireCount, setWireCount] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mu0 = 4 * Math.PI * 1e-7;
  const fieldAt1cm = (mu0 * current) / (2 * Math.PI * 0.01);

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
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;

    // Field lines (concentric circles)
    const rings = 8;
    for (let i = 1; i <= rings; i++) {
      const r = i * 25;
      const intensity = Math.min(1, current / 10);
      ctx.strokeStyle = `rgba(255, 180, 50, ${0.05 + intensity * 0.15 / i})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

      // Direction arrows on field lines
      const arrowAngle = Math.PI / 4;
      const ax = cx + r * Math.cos(arrowAngle);
      const ay = cy + r * Math.sin(arrowAngle);
      ctx.fillStyle = `rgba(255, 180, 50, ${0.3 + intensity * 0.3})`;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax - 6, ay - 3);
      ctx.lineTo(ax - 3, ay + 5);
      ctx.closePath();
      ctx.fill();
    }

    // Wire cross-section
    for (let wi = 0; wi < wireCount; wi++) {
      const offset = (wi - (wireCount - 1) / 2) * 30;
      ctx.beginPath(); ctx.arc(cx + offset, cy, 12, 0, Math.PI * 2);
      ctx.fillStyle = "#ffbb33"; ctx.shadowColor = "#ffbb33"; ctx.shadowBlur = 15; ctx.fill(); ctx.shadowBlur = 0;

      // Current direction indicator (dot = out of screen)
      ctx.fillStyle = "#000"; ctx.beginPath(); ctx.arc(cx + offset, cy, 4, 0, Math.PI * 2); ctx.fill();
    }

    // Labels
    ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px JetBrains Mono"; ctx.textAlign = "center";
    ctx.fillText("Current ⊙ (out of screen)", cx, h - 20);
    ctx.fillText(`B at 1cm = ${(fieldAt1cm * 1e4).toFixed(2)} G`, cx, 25);
  }, [current, wireCount, fieldAt1cm]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Current" value={current} min={0.5} max={20} step={0.5} unit="A" onChange={setCurrent} />
          <ParamSlider label="Wires" value={wireCount} min={1} max={4} step={1} unit="" onChange={setWireCount} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "B at 1cm", value: (fieldAt1cm * 1e4).toFixed(3), unit: "Gauss" },
            { label: "B at 1cm", value: (fieldAt1cm * 1e6).toFixed(1), unit: "μT" },
            { label: "μ₀", value: "1.257e-6", unit: "H/m" },
          ]} />
        </div>
      </div>
    </div>
  );
}
