import { useState, useRef, useEffect } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function DoubleslitSim() {
  const [wavelength, setWavelength] = useState(550);
  const [slitSep, setSlitSep] = useState(0.1);
  const [screenDist, setScreenDist] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fringeSpacing = (wavelength * 1e-9 * screenDist) / (slitSep * 1e-3) * 1e3; // mm

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

    // Wall with slits
    const wallX = w * 0.3;
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(wallX - 3, 0, 6, h);
    // Clear slits
    const slitGap = 30;
    ctx.clearRect(wallX - 3, h / 2 - slitGap - 2, 6, 4);
    ctx.clearRect(wallX - 3, h / 2 + slitGap - 2, 6, 4);
    ctx.fillStyle = "#00d4aa";
    ctx.fillRect(wallX - 1, h / 2 - slitGap - 1, 2, 2);
    ctx.fillRect(wallX - 1, h / 2 + slitGap - 1, 2, 2);

    // Source
    ctx.beginPath(); ctx.arc(w * 0.1, h / 2, 6, 0, Math.PI * 2);
    ctx.fillStyle = colorFromWavelength(wavelength);
    ctx.shadowColor = colorFromWavelength(wavelength); ctx.shadowBlur = 10;
    ctx.fill(); ctx.shadowBlur = 0;

    // Incoming waves
    ctx.strokeStyle = `${colorFromWavelength(wavelength)}40`;
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const rx = w * 0.1 + i * 20;
      ctx.beginPath(); ctx.arc(w * 0.1, h / 2, i * 20 + 10, -0.3, 0.3); ctx.stroke();
    }

    // Interference pattern on screen
    const screenX = w * 0.85;
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(screenX - 2, 0, 4, h);

    const d = slitSep * 1e-3; // m
    const lam = wavelength * 1e-9; // m

    for (let y = 0; y < h; y++) {
      const yPos = (y - h / 2) / h * 0.02; // physical position in m
      const pathDiff = d * yPos / screenDist;
      const phase = (2 * Math.PI * pathDiff) / lam;
      const intensity = Math.pow(Math.cos(phase / 2), 2);

      ctx.fillStyle = colorFromWavelength(wavelength, intensity * 0.8);
      ctx.fillRect(screenX - 8, y, 16, 1);
    }

    // Label
    ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px JetBrains Mono"; ctx.textAlign = "center";
    ctx.fillText("Source", w * 0.1, h / 2 + 20);
    ctx.fillText("Screen", screenX, 15);
  }, [wavelength, slitSep, screenDist]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">Controls</h3>
          <ParamSlider label="Wavelength" value={wavelength} min={380} max={750} step={10} unit="nm" onChange={setWavelength} />
          <ParamSlider label="Slit Separation" value={slitSep} min={0.05} max={0.5} step={0.01} unit="mm" onChange={setSlitSep} />
          <ParamSlider label="Screen Distance" value={screenDist} min={0.5} max={5} step={0.1} unit="m" onChange={setScreenDist} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">Results</h3>
          <ResultDisplay items={[
            { label: "Fringe Spacing", value: fringeSpacing.toFixed(2), unit: "mm" },
            { label: "λ", value: wavelength.toString(), unit: "nm" },
            { label: "Color", value: getColorName(wavelength), unit: "" },
          ]} />
        </div>
      </div>
    </div>
  );
}

function colorFromWavelength(wl: number, alpha = 1): string {
  let r = 0, g = 0, b = 0;
  if (wl >= 380 && wl < 440) { r = -(wl - 440) / 60; b = 1; }
  else if (wl >= 440 && wl < 490) { g = (wl - 440) / 50; b = 1; }
  else if (wl >= 490 && wl < 510) { g = 1; b = -(wl - 510) / 20; }
  else if (wl >= 510 && wl < 580) { r = (wl - 510) / 70; g = 1; }
  else if (wl >= 580 && wl < 645) { r = 1; g = -(wl - 645) / 65; }
  else if (wl >= 645 && wl <= 750) { r = 1; }
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`;
}

function getColorName(wl: number): string {
  if (wl < 440) return "Violet";
  if (wl < 490) return "Blue";
  if (wl < 510) return "Cyan";
  if (wl < 580) return "Green";
  if (wl < 645) return "Yellow/Orange";
  return "Red";
}
