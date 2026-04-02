import { useState, useRef, useEffect } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function DopplerSim() {
  const [sourceFreq, setSourceFreq] = useState(440);
  const [sourceSpeed, setSourceSpeed] = useState(30);
  const [soundSpeed, setSoundSpeed] = useState(343);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const fApproach = sourceFreq * (soundSpeed / (soundSpeed - sourceSpeed));
  const fRecede = sourceFreq * (soundSpeed / (soundSpeed + sourceSpeed));

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
    const wavefronts: { x: number; y: number; r: number; born: number }[] = [];

    const step = () => {
      t += 0.016;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cy = h / 2;
      const sourceX = w * 0.3 + Math.sin(t * 0.5) * w * 0.15 * (sourceSpeed / soundSpeed);

      // Emit wavefronts
      if (Math.floor(t * sourceFreq / 50) > Math.floor((t - 0.016) * sourceFreq / 50)) {
        wavefronts.push({ x: sourceX, y: cy, r: 0, born: t });
      }

      // Draw wavefronts
      for (let i = wavefronts.length - 1; i >= 0; i--) {
        const wf = wavefronts[i];
        wf.r += soundSpeed * 0.016 * 0.3;
        const age = t - wf.born;
        const opacity = Math.max(0, 0.4 - age * 0.08);
        if (opacity <= 0) { wavefronts.splice(i, 1); continue; }

        ctx.strokeStyle = `rgba(0, 212, 170, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(wf.x, wf.y, wf.r, 0, Math.PI * 2); ctx.stroke();
      }

      // Source
      ctx.beginPath(); ctx.arc(sourceX, cy, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#ff6b6b"; ctx.shadowColor = "#ff6b6b"; ctx.shadowBlur = 15; ctx.fill(); ctx.shadowBlur = 0;

      // Direction arrow
      ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(sourceX + 15, cy); ctx.lineTo(sourceX + 35, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(sourceX + 35, cy); ctx.lineTo(sourceX + 30, cy - 4); ctx.lineTo(sourceX + 30, cy + 4); ctx.closePath();
      ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.fill();

      // Observer markers
      ctx.fillStyle = "#1e90ff"; ctx.font = "11px JetBrains Mono"; ctx.textAlign = "center";
      ctx.fillText(`← f = ${fApproach.toFixed(0)} Hz`, w * 0.8, cy - 5);
      ctx.fillText("Observer", w * 0.8, cy + 12);

      ctx.fillStyle = "#ffbb33";
      ctx.fillText(`f = ${fRecede.toFixed(0)} Hz →`, w * 0.12, cy - 5);
      ctx.fillText("Observer", w * 0.12, cy + 12);

      if (wavefronts.length > 100) wavefronts.splice(0, 50);
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [sourceFreq, sourceSpeed, soundSpeed, fApproach, fRecede]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Source Freq" value={sourceFreq} min={100} max={1000} step={10} unit="Hz" onChange={setSourceFreq} />
          <ParamSlider label="Source Speed" value={sourceSpeed} min={0} max={300} step={5} unit="m/s" onChange={setSourceSpeed} />
          <ParamSlider label="Sound Speed" value={soundSpeed} min={200} max={500} step={5} unit="m/s" onChange={setSoundSpeed} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "f (approach)", value: fApproach.toFixed(1), unit: "Hz" },
            { label: "f (recede)", value: fRecede.toFixed(1), unit: "Hz" },
            { label: "Mach", value: (sourceSpeed / soundSpeed).toFixed(3), unit: "" },
          ]} />
        </div>
      </div>
    </div>
  );
}
