import ExperimentTabs from "@/components/ui/ExperimentTabs";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import HeatTransferSim from "@/components/sims/HeatTransferSim";

function IdealGasSim() {
  const { t } = useTranslation();
  const [temperature, setTemperature] = useState(300);
  const [volume, setVolume] = useState(2);
  const [moles, setMoles] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);

  const R = 8.314;
  const pressure = (moles * R * temperature) / volume;
  const kineticEnergy = 1.5 * moles * R * temperature;
  const rmsSpeed = Math.sqrt((3 * R * temperature) / 0.028);

  useEffect(() => {
    const count = Math.round(moles * 30);
    const speed = Math.sqrt(temperature) * 0.3;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.8 + 0.1,
      vx: (Math.random() - 0.5) * speed, vy: (Math.random() - 0.5) * speed,
    }));
  }, [moles, temperature]);

  useEffect(() => { const canvas = canvasRef.current; if (!canvas) return; const resize = () => { const r = canvas.parentElement!.getBoundingClientRect(); canvas.width = r.width; canvas.height = r.height; }; resize(); window.addEventListener("resize", resize); return () => window.removeEventListener("resize", resize); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const boxW = () => Math.min(canvas.width * 0.7, volume * 100);
    const boxH = () => canvas.height * 0.6;
    const speed = Math.sqrt(temperature) * 0.3;

    const step = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const bw = boxW(), bh = boxH(), bx = (w - bw) / 2, by = (h - bh) / 2;
      ctx.strokeStyle = "rgba(255,100,50,0.4)"; ctx.lineWidth = 2; ctx.strokeRect(bx, by, bw, bh);
      const t = Math.min(1, (temperature - 100) / 800);
      const grad = ctx.createLinearGradient(bx, by, bx, by + bh);
      grad.addColorStop(0, `rgba(255, ${Math.round(100 - t * 80)}, ${Math.round(50 - t * 50)}, ${0.05 + t * 0.1})`);
      grad.addColorStop(1, `rgba(255, ${Math.round(50 - t * 50)}, 0, ${0.02 + t * 0.05})`);
      ctx.fillStyle = grad; ctx.fillRect(bx, by, bw, bh);

      particlesRef.current.forEach((p) => {
        p.x += p.vx * 0.003; p.y += p.vy * 0.003;
        if (p.x < 0.05 || p.x > 0.95) { p.vx *= -1; p.x = Math.max(0.05, Math.min(0.95, p.x)); }
        if (p.y < 0.05 || p.y > 0.95) { p.vy *= -1; p.y = Math.max(0.05, Math.min(0.95, p.y)); }
        const px = bx + p.x * bw, py = by + p.y * bh;
        const s = Math.abs(p.vx + p.vy) / speed;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${Math.round(200 + s * 55)}, ${Math.round(100 - s * 60)}, 50)`;
        ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
      });
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [temperature, volume, moles]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full"><canvas ref={canvasRef} className="w-full h-full" /></div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">{t('physics.common.controls')}</h3>
          <ParamSlider label={t('physics.common.temperature')} value={temperature} min={100} max={900} step={10} unit="K" onChange={setTemperature} />
          <ParamSlider label={t('physics.common.volume')} value={volume} min={0.5} max={5} step={0.1} unit="L" onChange={setVolume} />
          <ParamSlider label="Moles" value={moles} min={0.5} max={5} step={0.5} unit="mol" onChange={setMoles} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">{t('physics.common.results')}</h3>
          <ResultDisplay items={[
            { label: t('physics.common.pressure'), value: (pressure / 1000).toFixed(1), unit: "kPa" },
            { label: t('physics.common.energy'), value: kineticEnergy.toFixed(0), unit: "J" },
            { label: "RMS Speed", value: rmsSpeed.toFixed(0), unit: "m/s" },
          ]} />
        </div>
      </div>
    </div>
  );
}

export default function ThermodynamicsPage() {
  const { t } = useTranslation();

  const tabs = [
    { id: "gas", label: t('physics.thermodynamics_page.tabs.gas') },
    { id: "heat", label: t('physics.thermodynamics_page.tabs.heat') },
  ];

  return (
    <div className="min-h-screen w-full pt-10 xs:pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-8 xs:pb-10 sm:pb-12 md:pb-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0.5 xs:mb-1 sm:mb-2 md:mb-3 text-gradient-primary">{t('physics.thermodynamics_page.title')}</h1>
        <p className="text-muted-foreground text-xs xs:text-sm sm:text-base md:text-lg mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8">{t('physics.thermodynamics_page.description')}</p>
        <ExperimentTabs tabs={tabs}>
          {(active) => (
            <div className="flex flex-col gap-6">
              {active === "gas" && <IdealGasSim />}
              {active === "heat" && <HeatTransferSim />}

              {/* Scientific Explanation Section */}
              <div className="glass rounded-3xl p-6 sm:p-8 border-emerald-500/10 bg-emerald-500/[0.02]">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-400">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm font-mono">?</span>
                  {t('physics.common.about_experiment')} / شرح علمي
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                    {t(`physics.thermodynamics_page.descriptions.${active}`)}
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
