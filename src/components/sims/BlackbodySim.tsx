import { useState, useRef, useEffect } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function BlackbodySim() {
  const [temperature, setTemperature] = useState(5000);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wienPeak = 2897771.955 / temperature; // nm
  const stefanBoltzmann = 5.67e-8 * Math.pow(temperature, 4);

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

    const pad = 50;
    const gw = w - pad * 2, gh = h - pad * 2;

    // Axes
    ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px JetBrains Mono"; ctx.textAlign = "center";
    ctx.fillText("Wavelength (nm)", w / 2, h - 10);
    ctx.save(); ctx.translate(12, h / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText("Spectral Radiance", 0, 0); ctx.restore();

    // Wavelength axis labels
    const wlRange = [0, 3000];
    for (let wl = 0; wl <= 3000; wl += 500) {
      const x = pad + (wl / wlRange[1]) * gw;
      ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "9px JetBrains Mono";
      ctx.fillText(wl.toString(), x, h - pad + 15);
    }

    // Planck function
    const planck = (wl: number, T: number) => {
      const lam = wl * 1e-9;
      const hh = 6.626e-34, c = 3e8, kb = 1.381e-23;
      return (2 * hh * c * c) / (Math.pow(lam, 5) * (Math.exp((hh * c) / (lam * kb * T)) - 1));
    };

    // Find max for scaling
    let maxVal = 0;
    for (let wl = 10; wl <= 3000; wl += 10) {
      maxVal = Math.max(maxVal, planck(wl, temperature));
    }

    // Draw curve
    ctx.strokeStyle = "#ffbb33"; ctx.lineWidth = 2;
    ctx.shadowColor = "#ffbb33"; ctx.shadowBlur = 5;
    ctx.beginPath();
    for (let wl = 10; wl <= 3000; wl += 5) {
      const val = planck(wl, temperature);
      const x = pad + (wl / wlRange[1]) * gw;
      const y = h - pad - (val / maxVal) * gh * 0.9;
      wl === 10 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Fill under curve with gradient
    ctx.beginPath();
    for (let wl = 10; wl <= 3000; wl += 5) {
      const val = planck(wl, temperature);
      const x = pad + (wl / wlRange[1]) * gw;
      const y = h - pad - (val / maxVal) * gh * 0.9;
      wl === 10 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.lineTo(pad + gw, h - pad);
    ctx.lineTo(pad + (10 / wlRange[1]) * gw, h - pad);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,187,51,0.08)"; ctx.fill();

    // Wien peak marker
    const peakX = pad + (wienPeak / wlRange[1]) * gw;
    ctx.strokeStyle = "#ff6b6b"; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(peakX, pad); ctx.lineTo(peakX, h - pad); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#ff6b6b"; ctx.font = "10px JetBrains Mono";
    ctx.fillText(`λ_max = ${wienPeak.toFixed(0)} nm`, peakX, pad - 8);

    // Visible spectrum bar
    const visStart = pad + (380 / wlRange[1]) * gw;
    const visEnd = pad + (750 / wlRange[1]) * gw;
    const visGrad = ctx.createLinearGradient(visStart, 0, visEnd, 0);
    visGrad.addColorStop(0, "rgba(128,0,255,0.3)");
    visGrad.addColorStop(0.17, "rgba(0,0,255,0.3)");
    visGrad.addColorStop(0.33, "rgba(0,255,255,0.3)");
    visGrad.addColorStop(0.5, "rgba(0,255,0,0.3)");
    visGrad.addColorStop(0.67, "rgba(255,255,0,0.3)");
    visGrad.addColorStop(0.83, "rgba(255,128,0,0.3)");
    visGrad.addColorStop(1, "rgba(255,0,0,0.3)");
    ctx.fillStyle = visGrad;
    ctx.fillRect(visStart, h - pad - 8, visEnd - visStart, 8);
  }, [temperature, wienPeak]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Temperature" value={temperature} min={1000} max={15000} step={100} unit="K" onChange={setTemperature} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "Wien Peak", value: wienPeak.toFixed(0), unit: "nm" },
            { label: "Total Power", value: stefanBoltzmann.toExponential(2), unit: "W/m²" },
            { label: "Visible?", value: wienPeak > 380 && wienPeak < 750 ? "Yes" : "No", unit: "" },
          ]} />
        </div>
      </div>
    </div>
  );
}
