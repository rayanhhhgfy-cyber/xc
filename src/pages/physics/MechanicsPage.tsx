import ExperimentTabs from "@/components/ui/ExperimentTabs";
import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import PendulumSim from "@/components/sims/PendulumSim";
import SpringSim from "@/components/sims/SpringSim";
import CollisionSim from "@/components/sims/CollisionSim";
import CircularMotionSim from "@/components/sims/CircularMotionSim";
import InclinedPlaneSim from "@/components/sims/InclinedPlaneSim";

function ProjectileSim() {
  const { t } = useTranslation();
  const [velocity, setVelocity] = useState(30);
  const [angle, setAngle] = useState(45);
  const [gravity, setGravity] = useState(9.81);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const trailRef = useRef<{ x: number; y: number }[]>([]);

  const angleRad = (angle * Math.PI) / 180;
  const vx = velocity * Math.cos(angleRad);
  const vy = velocity * Math.sin(angleRad);
  const totalTime = (2 * vy) / gravity;
  const maxHeight = (vy * vy) / (2 * gravity);
  const range = (velocity * velocity * Math.sin(2 * angleRad)) / gravity;

  const getPos = useCallback((t: number) => ({ x: vx * t, y: vy * t - 0.5 * gravity * t * t }), [vx, vy, gravity]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width, h = canvas.height, pad = 40;
    const scaleX = (w - pad * 2) / Math.max(range, 1);
    const scaleY = (h - pad * 2) / Math.max(maxHeight * 1.2, 1);
    const scale = Math.min(scaleX, scaleY);
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.04)"; ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 50) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }
    ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.beginPath(); ctx.moveTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();
    ctx.strokeStyle = "rgba(30,144,255,0.15)"; ctx.setLineDash([4, 4]); ctx.beginPath();
    for (let t = 0; t <= totalTime; t += totalTime / 100) { const p = getPos(t); const sx = pad + p.x * scale; const sy = h - pad - p.y * scale; t === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy); }
    ctx.stroke(); ctx.setLineDash([]);
    if (trailRef.current.length > 1) { ctx.strokeStyle = "#1e90ff"; ctx.lineWidth = 2; ctx.shadowColor = "#1e90ff"; ctx.shadowBlur = 10; ctx.beginPath(); trailRef.current.forEach((p, i) => { const sx = pad + p.x * scale; const sy = h - pad - p.y * scale; i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy); }); ctx.stroke(); ctx.shadowBlur = 0; }
    const pos = getPos(time);
    if (pos.y >= 0 || !running) { const bx = pad + pos.x * scale; const by = h - pad - Math.max(0, pos.y) * scale; ctx.beginPath(); ctx.arc(bx, by, 8, 0, Math.PI * 2); ctx.fillStyle = "#00d4aa"; ctx.shadowColor = "#00d4aa"; ctx.shadowBlur = 15; ctx.fill(); ctx.shadowBlur = 0; }
  }, [time, range, maxHeight, totalTime, getPos, running]);

  useEffect(() => { const canvas = canvasRef.current; if (!canvas) return; const resize = () => { const rect = canvas.parentElement!.getBoundingClientRect(); canvas.width = rect.width; canvas.height = rect.height; }; resize(); window.addEventListener("resize", resize); return () => window.removeEventListener("resize", resize); }, []);
  useEffect(() => { draw(); }, [draw]);
  useEffect(() => { if (!running) return; let last = performance.now(); const step = (now: number) => { const dt = (now - last) / 1000; last = now; setTime((prev) => { const next = prev + dt; const pos = getPos(next); if (pos.y < 0) { setRunning(false); return prev; } trailRef.current.push(pos); return next; }); animRef.current = requestAnimationFrame(step); }; animRef.current = requestAnimationFrame(step); return () => cancelAnimationFrame(animRef.current); }, [running, getPos]);

  const launch = () => { setTime(0); trailRef.current = []; setRunning(true); };
  const reset = () => { setRunning(false); setTime(0); trailRef.current = []; };
  const pos = getPos(time);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full"><canvas ref={canvasRef} className="w-full h-full" /></div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">{t('physics.mechanics_page.projectile.controls')}</h3>
          <ParamSlider label={t('physics.mechanics_page.projectile.velocity')} value={velocity} min={5} max={80} step={1} unit="m/s" onChange={(v) => { setVelocity(v); reset(); }} />
          <ParamSlider label={t('physics.mechanics_page.projectile.angle')} value={angle} min={5} max={85} step={1} unit="°" onChange={(v) => { setAngle(v); reset(); }} />
          <ParamSlider label={t('physics.mechanics_page.projectile.gravity')} value={gravity} min={1} max={25} step={0.1} unit="m/s²" onChange={(v) => { setGravity(v); reset(); }} />
          <div className="flex gap-2 xs:gap-2.5 sm:gap-3">
            <button onClick={launch} className="flex-1 py-2 xs:py-2.5 sm:py-3 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm md:text-base font-semibold">{t('physics.mechanics_page.projectile.launch')}</button>
            <button onClick={reset} className="flex-1 py-2 xs:py-2.5 sm:py-3 rounded-lg bg-muted text-foreground text-xs sm:text-sm md:text-base font-medium">{t('physics.mechanics_page.projectile.reset')}</button>
          </div>
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">{t('physics.mechanics_page.projectile.results')}</h3>
          <ResultDisplay items={[
            { label: t('physics.common.time'), value: time.toFixed(2), unit: "s" },
            { label: "X", value: Math.max(0, pos.x).toFixed(1), unit: "m" },
            { label: "Y", value: Math.max(0, pos.y).toFixed(1), unit: "m" },
            { label: t('physics.mechanics_page.projectile.maxHeight'), value: maxHeight.toFixed(1), unit: "m" },
            { label: t('physics.mechanics_page.projectile.range'), value: range.toFixed(1), unit: "m" },
          ]} />
        </div>
      </div>
    </div>
  );
}

export default function MechanicsPage() {
  const { t } = useTranslation();

  const tabs = [
    { id: "projectile", label: t('physics.mechanics_page.tabs.projectile') },
    { id: "pendulum", label: t('physics.mechanics_page.tabs.pendulum') },
    { id: "spring", label: t('physics.mechanics_page.tabs.spring') },
    { id: "collision", label: t('physics.mechanics_page.tabs.collision') },
    { id: "circular", label: t('physics.mechanics_page.tabs.circular') },
    { id: "incline", label: t('physics.mechanics_page.tabs.incline') },
  ];

  return (
    <div className="min-h-screen w-full pt-10 xs:pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-8 xs:pb-10 sm:pb-12 md:pb-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0.5 xs:mb-1 sm:mb-2 md:mb-3 text-gradient-primary">{t('physics.mechanics_page.title')}</h1>
        <p className="text-muted-foreground text-xs xs:text-sm sm:text-base md:text-lg mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8">{t('physics.mechanics_page.description')}</p>
        <ExperimentTabs tabs={tabs}>
          {(active) => (
            <div className="flex flex-col gap-6">
              {active === "projectile" && <ProjectileSim />}
              {active === "pendulum" && <PendulumSim />}
              {active === "spring" && <SpringSim />}
              {active === "collision" && <CollisionSim />}
              {active === "circular" && <CircularMotionSim />}
              {active === "incline" && <InclinedPlaneSim />}
              
              {/* Scientific Explanation Section */}
              <div className="glass rounded-3xl p-6 sm:p-8 border-emerald-500/10 bg-emerald-500/[0.02]">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-400">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm font-mono">?</span>
                  {t('physics.common.about_experiment')}
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                    {t(`physics.mechanics_page.descriptions.${active}`)}
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
