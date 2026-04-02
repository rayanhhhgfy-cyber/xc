import { useState, useRef, useEffect } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function OhmsLawSim() {
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const current = voltage / resistance;
  const power = voltage * current;

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
      const boxW = w * 0.5, boxH = h * 0.4;
      const x0 = cx - boxW / 2, y0 = cy - boxH / 2;

      // Circuit loop
      ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x0, y0); ctx.lineTo(x0 + boxW, y0);
      ctx.lineTo(x0 + boxW, y0 + boxH); ctx.lineTo(x0, y0 + boxH);
      ctx.closePath(); ctx.stroke();

      // Battery (left side)
      const batY = cy;
      ctx.strokeStyle = "#ffbb33"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(x0 - 8, batY - 15); ctx.lineTo(x0 - 8, batY + 15); ctx.stroke();
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x0 + 4, batY - 8); ctx.lineTo(x0 + 4, batY + 8); ctx.stroke();
      ctx.fillStyle = "#ffbb33"; ctx.font = "11px JetBrains Mono"; ctx.textAlign = "center";
      ctx.fillText(`${voltage}V`, x0 - 25, batY + 4);

      // Resistor (right side) - zigzag
      const rx = x0 + boxW;
      ctx.strokeStyle = "#ff6b6b"; ctx.lineWidth = 2;
      ctx.beginPath();
      const zigN = 6;
      const zigH = boxH * 0.4;
      const zigStart = cy - zigH / 2;
      for (let i = 0; i <= zigN; i++) {
        const zy = zigStart + (i / zigN) * zigH;
        const zx = rx + (i % 2 === 0 ? -10 : 10);
        i === 0 ? ctx.moveTo(rx, zy) : ctx.lineTo(zx, zy);
      }
      ctx.lineTo(rx, zigStart + zigH);
      ctx.stroke();
      ctx.fillStyle = "#ff6b6b"; ctx.textAlign = "center";
      ctx.fillText(`${resistance}Ω`, rx + 30, cy + 4);

      // Electron flow animation
      const speed = current * 80;
      const numElectrons = Math.max(4, Math.round(current * 30));
      ctx.fillStyle = "#1e90ff";
      for (let i = 0; i < numElectrons; i++) {
        const phase = ((t * speed + i * (boxW * 2 + boxH * 2) / numElectrons) % (boxW * 2 + boxH * 2));
        let ex: number, ey: number;
        const perimeter = boxW * 2 + boxH * 2;
        const p = phase % perimeter;
        if (p < boxW) { ex = x0 + p; ey = y0; }
        else if (p < boxW + boxH) { ex = x0 + boxW; ey = y0 + (p - boxW); }
        else if (p < boxW * 2 + boxH) { ex = x0 + boxW - (p - boxW - boxH); ey = y0 + boxH; }
        else { ex = x0; ey = y0 + boxH - (p - boxW * 2 - boxH); }
        ctx.beginPath(); ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.shadowColor = "#1e90ff"; ctx.shadowBlur = 6; ctx.fill(); ctx.shadowBlur = 0;
      }

      // Current label
      ctx.fillStyle = "#1e90ff"; ctx.font = "12px JetBrains Mono"; ctx.textAlign = "center";
      ctx.fillText(`I = ${(current * 1000).toFixed(1)} mA`, cx, y0 - 15);

      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [voltage, resistance, current]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Voltage" value={voltage} min={1} max={50} step={1} unit="V" onChange={setVoltage} />
          <ParamSlider label="Resistance" value={resistance} min={10} max={1000} step={10} unit="Ω" onChange={setResistance} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "Current", value: (current * 1000).toFixed(2), unit: "mA" },
            { label: "Power", value: power.toFixed(3), unit: "W" },
            { label: "Energy/sec", value: power.toFixed(3), unit: "J/s" },
          ]} />
        </div>
      </div>
    </div>
  );
}
