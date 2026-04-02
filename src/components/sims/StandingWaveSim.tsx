import { useState, useRef, useEffect } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function StandingWaveSim() {
  const [harmonics, setHarmonics] = useState(3);
  const [amplitude, setAmplitude] = useState(50);
  const [stringLength, setStringLength] = useState(400);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const wavelength = (2 * stringLength) / harmonics;
  const nodes = harmonics + 1;

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
      t += 0.03;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const cy = h / 2;
      const pad = 60;
      const len = w - pad * 2;

      // Center line
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(pad, cy); ctx.lineTo(pad + len, cy); ctx.stroke();
      ctx.setLineDash([]);

      // Fixed ends
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillRect(pad - 3, cy - 20, 6, 40);
      ctx.fillRect(pad + len - 3, cy - 20, 6, 40);

      // Standing wave
      ctx.strokeStyle = "#00d4aa"; ctx.lineWidth = 2;
      ctx.shadowColor = "#00d4aa"; ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let x = 0; x <= len; x++) {
        const xNorm = x / len;
        const y = cy + amplitude * Math.sin(harmonics * Math.PI * xNorm) * Math.cos(t * 3);
        x === 0 ? ctx.moveTo(pad + x, y) : ctx.lineTo(pad + x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Envelope
      ctx.strokeStyle = "rgba(0,212,170,0.15)"; ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      for (let x = 0; x <= len; x++) {
        const y = cy + amplitude * Math.abs(Math.sin(harmonics * Math.PI * (x / len)));
        x === 0 ? ctx.moveTo(pad + x, y) : ctx.lineTo(pad + x, y);
      }
      ctx.stroke();
      ctx.beginPath();
      for (let x = 0; x <= len; x++) {
        const y = cy - amplitude * Math.abs(Math.sin(harmonics * Math.PI * (x / len)));
        x === 0 ? ctx.moveTo(pad + x, y) : ctx.lineTo(pad + x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Node markers
      ctx.fillStyle = "#ff6b6b";
      for (let i = 0; i <= harmonics; i++) {
        const nx = pad + (i / harmonics) * len;
        ctx.beginPath(); ctx.arc(nx, cy, 4, 0, Math.PI * 2); ctx.fill();
      }

      // Antinode markers
      ctx.fillStyle = "#ffbb33";
      for (let i = 0; i < harmonics; i++) {
        const ax = pad + ((i + 0.5) / harmonics) * len;
        ctx.beginPath(); ctx.arc(ax, cy, 3, 0, Math.PI * 2); ctx.fill();
      }

      ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "10px JetBrains Mono"; ctx.textAlign = "center";
      ctx.fillText("● Nodes", w * 0.3, h - 15);
      ctx.fillStyle = "#ffbb33"; ctx.fillText("● Antinodes", w * 0.6, h - 15);

      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [harmonics, amplitude, stringLength]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Harmonic (n)" value={harmonics} min={1} max={8} step={1} unit="" onChange={setHarmonics} />
          <ParamSlider label="Amplitude" value={amplitude} min={10} max={80} step={5} unit="px" onChange={setAmplitude} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "Harmonic", value: harmonics.toString(), unit: `(${harmonics === 1 ? "fundamental" : `${harmonics}th`})` },
            { label: "Wavelength", value: (wavelength).toFixed(0), unit: "px" },
            { label: "Nodes", value: nodes.toString(), unit: "" },
            { label: "Antinodes", value: harmonics.toString(), unit: "" },
          ]} />
        </div>
      </div>
    </div>
  );
}
