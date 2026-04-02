import { useState, useRef, useEffect } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function PhotoelectricSim() {
  const [frequency, setFrequency] = useState(8);
  const [workFunction, setWorkFunction] = useState(4.5);
  const [intensity, setIntensity] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const h = 6.626e-34;
  const eV = 1.602e-19;
  const photonEnergy = frequency * 1e14 * h / eV; // in eV
  const ke = Math.max(0, photonEnergy - workFunction);
  const emitted = photonEnergy > workFunction;
  const thresholdFreq = (workFunction * eV) / h / 1e14;

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
    const electrons: { x: number; y: number; vx: number; vy: number }[] = [];

    const step = () => {
      t += 0.016;
      const w = canvas.width, h2 = canvas.height;
      ctx.clearRect(0, 0, w, h2);

      // Metal plate
      const plateX = w * 0.55;
      ctx.fillStyle = "rgba(100,120,150,0.3)";
      ctx.fillRect(plateX, h2 * 0.15, w * 0.12, h2 * 0.7);
      ctx.strokeStyle = "rgba(200,220,240,0.2)"; ctx.lineWidth = 1;
      ctx.strokeRect(plateX, h2 * 0.15, w * 0.12, h2 * 0.7);
      ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "11px Space Grotesk"; ctx.textAlign = "center";
      ctx.fillText("Metal", plateX + w * 0.06, h2 * 0.1);

      // Incoming photons
      const photonCount = Math.round(intensity * 2);
      const wl = 3e8 / (frequency * 1e14) * 1e9;
      for (let i = 0; i < photonCount; i++) {
        const py = h2 * 0.2 + (i / photonCount) * h2 * 0.6;
        const px = w * 0.1 + ((t * 100 + i * 50) % (plateX - w * 0.1));
        const color = wl < 400 ? "#8b5cf6" : wl < 500 ? "#1e90ff" : wl < 600 ? "#00d4aa" : "#ffbb33";
        ctx.beginPath();
        ctx.moveTo(px - 8, py); ctx.lineTo(px, py);
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.shadowColor = color; ctx.shadowBlur = 5; ctx.stroke(); ctx.shadowBlur = 0;
        // Wavy
        ctx.beginPath();
        for (let dx = -20; dx < 0; dx++) {
          ctx.lineTo(px + dx, py + Math.sin(dx * 0.5 + t * 10) * 3);
        }
        ctx.strokeStyle = `${color}60`; ctx.lineWidth = 1; ctx.stroke();
      }

      // Emitted electrons
      if (emitted && Math.random() < 0.1 * intensity * 0.016 * 60) {
        electrons.push({
          x: plateX + w * 0.12,
          y: h2 * 0.2 + Math.random() * h2 * 0.6,
          vx: 50 + ke * 30,
          vy: (Math.random() - 0.5) * 40,
        });
      }

      for (let i = electrons.length - 1; i >= 0; i--) {
        const e = electrons[i];
        e.x += e.vx * 0.016;
        e.y += e.vy * 0.016;
        if (e.x > w || e.y < 0 || e.y > h2) { electrons.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(e.x, e.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#00d4aa"; ctx.shadowColor = "#00d4aa"; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
      }

      if (!emitted) {
        ctx.fillStyle = "rgba(255,100,100,0.5)"; ctx.font = "13px Space Grotesk"; ctx.textAlign = "center";
        ctx.fillText("Below threshold — no emission", w / 2, h2 - 20);
      }

      if (electrons.length > 60) electrons.splice(0, 30);
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [frequency, workFunction, intensity, emitted, ke]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Frequency" value={frequency} min={3} max={15} step={0.5} unit="×10¹⁴ Hz" onChange={setFrequency} />
          <ParamSlider label="Work Function" value={workFunction} min={1} max={8} step={0.1} unit="eV" onChange={setWorkFunction} />
          <ParamSlider label="Intensity" value={intensity} min={1} max={10} step={1} unit="" onChange={setIntensity} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "Photon Energy", value: photonEnergy.toFixed(2), unit: "eV" },
            { label: "KE (max)", value: ke.toFixed(2), unit: "eV" },
            { label: "Threshold f", value: thresholdFreq.toFixed(2), unit: "×10¹⁴ Hz" },
            { label: "Emission", value: emitted ? "Yes" : "No", unit: "" },
          ]} />
        </div>
      </div>
    </div>
  );
}
