import ExperimentTabs from "@/components/ui/ExperimentTabs";
import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import OhmsLawSim from "@/components/sims/OhmsLawSim";
import MagneticFieldSim from "@/components/sims/MagneticFieldSim";

function CoulombSim() {
  const { t } = useTranslation();
  const [charge1, setCharge1] = useState(5);
  const [charge2, setCharge2] = useState(-3);
  const [distance, setDistance] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const k = 8.99e9;
  const force = (k * Math.abs(charge1 * charge2) * 1e-12) / (distance * distance);
  const fieldAtMid = (k * Math.abs(charge1) * 1e-6) / ((distance / 2) * (distance / 2));
  const isAttractive = charge1 * charge2 < 0;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }
    const cx = w / 2, cy = h / 2;
    const sep = Math.min(w * 0.35, distance * 60);
    const x1 = cx - sep, x2 = cx + sep;
    const numLines = 12;
    for (let i = 0; i < numLines; i++) {
      const a = (i / numLines) * Math.PI * 2;
      const r = 30;
      ctx.strokeStyle = charge1 > 0 ? "rgba(255,80,80,0.2)" : "rgba(80,140,255,0.2)";
      ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x1 + Math.cos(a) * r, cy + Math.sin(a) * r);
      if (isAttractive) { const ta = Math.PI - a; ctx.quadraticCurveTo(cx, cy + Math.sin(a) * 60, x2 + Math.cos(ta) * r, cy + Math.sin(ta) * r); }
      else { ctx.lineTo(x1 + Math.cos(a) * r * 4, cy + Math.sin(a) * r * 4); }
      ctx.stroke();
    }
    const drawCharge = (x: number, q: number) => { const size = Math.min(30, Math.abs(q) * 5 + 10); const color = q > 0 ? "#ff5050" : "#5090ff"; ctx.beginPath(); ctx.arc(x, cy, size, 0, Math.PI * 2); ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 20; ctx.fill(); ctx.shadowBlur = 0; ctx.fillStyle = "#fff"; ctx.font = "bold 16px Space Grotesk"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(q > 0 ? "+" : "−", x, cy); };
    drawCharge(x1, charge1); drawCharge(x2, charge2);
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "12px JetBrains Mono"; ctx.textAlign = "center";
    ctx.fillText(`F = ${force.toExponential(2)} N`, cx, h - 30);
  }, [charge1, charge2, distance, force, isAttractive]);

  useEffect(() => { const canvas = canvasRef.current; if (!canvas) return; const resize = () => { const rect = canvas.parentElement!.getBoundingClientRect(); canvas.width = rect.width; canvas.height = rect.height; }; resize(); window.addEventListener("resize", resize); return () => window.removeEventListener("resize", resize); }, []);
  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full"><canvas ref={canvasRef} className="w-full h-full" /></div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">{t('physics.common.controls')}</h3>
          <ParamSlider label="Charge 1" value={charge1} min={-10} max={10} step={0.5} unit="μC" onChange={setCharge1} />
          <ParamSlider label="Charge 2" value={charge2} min={-10} max={10} step={0.5} unit="μC" onChange={setCharge2} />
          <ParamSlider label="Distance" value={distance} min={0.5} max={5} step={0.1} unit="m" onChange={setDistance} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">{t('physics.common.results')}</h3>
          <ResultDisplay items={[
            { label: t('physics.common.force'), value: force.toExponential(2), unit: "N" },
            { label: "Type", value: isAttractive ? "Attractive" : "Repulsive", unit: "" },
            { label: "Field at mid", value: fieldAtMid.toExponential(2), unit: "N/C" },
          ]} />
        </div>
      </div>
    </div>
  );
}

export default function ElectromagnetismPage() {
  const { t } = useTranslation();

  const tabs = [
    { id: "coulomb", label: t('physics.electromagnetism_page.tabs.fields') },
    { id: "ohm", label: t('physics.electromagnetism_page.tabs.circuits') },
    { id: "magnetic", label: t('physics.electromagnetism_page.tabs.magnetic') },
  ];

  return (
    <div className="min-h-screen w-full pt-10 xs:pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-8 xs:pb-10 sm:pb-12 md:pb-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0.5 xs:mb-1 sm:mb-2 md:mb-3 text-gradient-primary">{t('physics.electromagnetism_page.title')}</h1>
        <p className="text-muted-foreground text-xs xs:text-sm sm:text-base md:text-lg mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8">{t('physics.electromagnetism_page.description')}</p>
        <ExperimentTabs tabs={tabs}>
          {(active) => (
            <div className="flex flex-col gap-6">
              {active === "coulomb" && <CoulombSim />}
              {active === "ohm" && <OhmsLawSim />}
              {active === "magnetic" && <MagneticFieldSim />}
              
              {/* Scientific Explanation Section */}
              <div className="glass rounded-3xl p-6 sm:p-8 border-emerald-500/10 bg-emerald-500/[0.02]">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-400">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm font-mono">?</span>
                  {t('physics.common.about_experiment')} / شرح علمي
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                    {t(`physics.electromagnetism_page.descriptions.${active}`)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </ExperimentTabs>
      </div>
    </div>
  );
}
