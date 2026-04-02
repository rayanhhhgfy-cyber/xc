import { useState, useRef, useEffect } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function HeatTransferSim() {
  const [tempHot, setTempHot] = useState(500);
  const [tempCold, setTempCold] = useState(300);
  const [conductivity, setConductivity] = useState(200);
  const [thickness, setThickness] = useState(0.05);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const area = 0.01; // 1cm² = 0.01 m²
  const heatRate = (conductivity * area * (tempHot - tempCold)) / thickness;

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

    // Hot zone
    const hotFrac = (tempHot - 200) / 800;
    const hotGrad = ctx.createLinearGradient(0, 0, w * 0.35, 0);
    hotGrad.addColorStop(0, `rgba(255, ${Math.round(80 - hotFrac * 60)}, 0, 0.3)`);
    hotGrad.addColorStop(1, `rgba(255, ${Math.round(120 - hotFrac * 40)}, 0, 0.1)`);
    ctx.fillStyle = hotGrad;
    ctx.fillRect(0, 0, w * 0.35, h);

    // Cold zone
    const coldGrad = ctx.createLinearGradient(w * 0.65, 0, w, 0);
    coldGrad.addColorStop(0, `rgba(30, 100, 255, 0.1)`);
    coldGrad.addColorStop(1, `rgba(30, 80, 200, 0.2)`);
    ctx.fillStyle = coldGrad;
    ctx.fillRect(w * 0.65, 0, w * 0.35, h);

    // Material slab
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(w * 0.35, h * 0.1, w * 0.3, h * 0.8);
    ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 1;
    ctx.strokeRect(w * 0.35, h * 0.1, w * 0.3, h * 0.8);

    // Heat flow arrows
    const arrows = Math.max(3, Math.min(10, Math.round(heatRate / 100)));
    for (let i = 0; i < arrows; i++) {
      const ay = h * 0.2 + (i / (arrows - 1)) * h * 0.6;
      const intensity = Math.min(1, heatRate / 5000);
      ctx.strokeStyle = `rgba(255, ${Math.round(150 - intensity * 100)}, ${Math.round(50 - intensity * 50)}, ${0.3 + intensity * 0.4})`;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(w * 0.2, ay); ctx.lineTo(w * 0.8, ay); ctx.stroke();
      // Arrowhead
      ctx.beginPath(); ctx.moveTo(w * 0.8, ay); ctx.lineTo(w * 0.77, ay - 4); ctx.lineTo(w * 0.77, ay + 4); ctx.closePath();
      ctx.fillStyle = ctx.strokeStyle; ctx.fill();
    }

    // Labels
    ctx.font = "13px Space Grotesk"; ctx.textAlign = "center";
    ctx.fillStyle = "#ff6b6b"; ctx.fillText(`${tempHot} K`, w * 0.17, h / 2);
    ctx.fillStyle = "#1e90ff"; ctx.fillText(`${tempCold} K`, w * 0.83, h / 2);
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "11px JetBrains Mono";
    ctx.fillText(`Q̇ = ${heatRate.toFixed(0)} W`, w / 2, h - 15);
  }, [tempHot, tempCold, conductivity, thickness, heatRate]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Hot Side" value={tempHot} min={300} max={1000} step={10} unit="K" onChange={setTempHot} />
          <ParamSlider label="Cold Side" value={tempCold} min={100} max={500} step={10} unit="K" onChange={setTempCold} />
          <ParamSlider label="Conductivity" value={conductivity} min={1} max={400} step={5} unit="W/m·K" onChange={setConductivity} />
          <ParamSlider label="Thickness" value={thickness} min={0.01} max={0.2} step={0.01} unit="m" onChange={setThickness} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "Heat Rate", value: heatRate.toFixed(1), unit: "W" },
            { label: "ΔT", value: (tempHot - tempCold).toFixed(0), unit: "K" },
            { label: "Thermal Resist.", value: (thickness / (conductivity * area)).toFixed(2), unit: "K/W" },
          ]} />
        </div>
      </div>
    </div>
  );
}
