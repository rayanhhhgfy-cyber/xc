import ExperimentTabs from "@/components/ui/ExperimentTabs";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import StandingWaveSim from "@/components/sims/StandingWaveSim";
import DopplerSim from "@/components/sims/DopplerSim";
import DoubleSlitSim from "@/components/sims/DoubleSlitSim";

function TransverseWaveSim() {
  const { t } = useTranslation();
  const [frequency, setFrequency] = useState(2);
  const [amplitude, setAmplitude] = useState(50);
  const [wavelength, setWavelength] = useState(150);
  const [showSecond, setShowSecond] = useState(false);
  const [freq2, setFreq2] = useState(2.5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef(performance.now());

  const speed = frequency * wavelength;
  const period = 1 / frequency;

  useEffect(() => { const canvas = canvasRef.current; if (!canvas) return; const resize = () => { const r = canvas.parentElement!.getBoundingClientRect(); canvas.width = r.width; canvas.height = r.height; }; resize(); window.addEventListener("resize", resize); return () => window.removeEventListener("resize", resize); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    startRef.current = performance.now();
    const step = (now: number) => {
      const t = (now - startRef.current) / 1000;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
      ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke(); ctx.setLineDash([]);

      const drawWave = (freq: number, amp: number, wl: number, color: string, yOff: number) => {
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.shadowColor = color; ctx.shadowBlur = 10; ctx.beginPath();
        for (let x = 0; x < w; x++) { const y = yOff + amp * Math.sin(2 * Math.PI * (x / wl - freq * t)); x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
        ctx.stroke(); ctx.shadowBlur = 0;
      };
      drawWave(frequency, amplitude, wavelength, "#00d4aa", h / 2);
      if (showSecond) {
        drawWave(freq2, amplitude, wavelength, "#8b5cf6", h / 2);
        ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1.5; ctx.setLineDash([2, 3]); ctx.beginPath();
        for (let x = 0; x < w; x++) { const y1 = amplitude * Math.sin(2 * Math.PI * (x / wavelength - frequency * t)); const y2 = amplitude * Math.sin(2 * Math.PI * (x / wavelength - freq2 * t)); x === 0 ? ctx.moveTo(x, h / 2 + y1 + y2) : ctx.lineTo(x, h / 2 + y1 + y2); }
        ctx.stroke(); ctx.setLineDash([]);
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [frequency, amplitude, wavelength, showSecond, freq2]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full"><canvas ref={canvasRef} className="w-full h-full" /></div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">{t('physics.common.controls')}</h3>
          <ParamSlider label={t('physics.common.frequency')} value={frequency} min={0.5} max={5} step={0.1} unit="Hz" onChange={setFrequency} />
          <ParamSlider label={t('physics.common.amplitude')} value={amplitude} min={10} max={100} step={1} unit="px" onChange={setAmplitude} />
          <ParamSlider label={t('physics.common.wavelength')} value={wavelength} min={50} max={300} step={5} unit="px" onChange={setWavelength} />
          <button onClick={() => setShowSecond(!showSecond)} className={`w-full py-2 xs:py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition ${showSecond ? "bg-secondary/30 text-secondary" : "bg-muted text-foreground"}`}>
            {showSecond ? "Hide" : "Show"} Second Wave
          </button>
          {showSecond && <ParamSlider label="Wave 2 Freq" value={freq2} min={0.5} max={5} step={0.1} unit="Hz" onChange={setFreq2} />}
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">{t('physics.common.results')}</h3>
          <ResultDisplay items={[
            { label: "Wave Speed", value: speed.toFixed(0), unit: "px/s" },
            { label: t('physics.common.period'), value: period.toFixed(2), unit: "s" },
            { label: "ω", value: (2 * Math.PI * frequency).toFixed(2), unit: "rad/s" },
          ]} />
        </div>
      </div>
    </div>
  );
}

export default function WavesPage() {
  const { t } = useTranslation();

  const tabs = [
    { id: "transverse", label: t('physics.waves_page.tabs.sine') },
    { id: "standing", label: t('physics.waves_page.tabs.sound') },
    { id: "doppler", label: t('physics.waves_page.tabs.light') },
    { id: "doubleslit", label: t('physics.waves_page.tabs.interference') },
  ];

  return (
    <div className="min-h-screen w-full pt-10 xs:pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-8 xs:pb-10 sm:pb-12 md:pb-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0.5 xs:mb-1 sm:mb-2 md:mb-3 text-gradient-primary">{t('physics.waves_page.title')}</h1>
        <p className="text-muted-foreground text-xs xs:text-sm sm:text-base md:text-lg mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8">{t('physics.waves_page.description')}</p>
        <ExperimentTabs tabs={tabs}>
          {(active) => (
            <div className="flex flex-col gap-6">
              {active === "transverse" && <TransverseWaveSim />}
              {active === "standing" && <StandingWaveSim />}
              {active === "doppler" && <DopplerSim />}
              {active === "doubleslit" && <DoubleSlitSim />}

              {/* Scientific Explanation Section */}
              <div className="glass rounded-3xl p-6 sm:p-8 border-emerald-500/10 bg-emerald-500/[0.02]">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-400">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm font-mono">?</span>
                  {t('physics.common.about_experiment')} / شرح علمي
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                    {t(`physics.waves_page.descriptions.${active}`)}
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
