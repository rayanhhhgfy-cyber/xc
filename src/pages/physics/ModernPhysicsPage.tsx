import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import WebGLErrorBoundary from "@/components/WebGLErrorBoundary";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import PhotoelectricSim from "@/components/sims/PhotoelectricSim";
import BlackbodySim from "@/components/sims/BlackbodySim";
import NuclearDecaySim from "@/components/sims/NuclearDecaySim";

function EnergyLevels({ levels }: { levels: number }) {
  return (
    <group>
      {Array.from({ length: levels }, (_, i) => {
        const r = 0.8 + i * 0.6;
        const color = new THREE.Color().setHSL(0.55 + i * 0.07, 0.8, 0.5);
        return (
          <group key={i}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[r, 0.02, 8, 64]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.6} />
            </mesh>
            <Electron radius={r} speed={2 + i * 0.5} offset={i * 1.5} />
          </group>
        );
      })}
    </group>
  );
}

function Electron({ radius, speed, offset }: { radius: number; speed: number; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={2} />
    </mesh>
  );
}

function AtomNucleus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.5; });
  return (
    <Float speed={2} floatIntensity={0.2}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.35, 2]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.8} wireframe />
      </mesh>
    </Float>
  );
}

function QuantumAtomSim() {
  const { t } = useTranslation();
  const [energyLevel, setEnergyLevel] = useState(3);
  const [photonEnergy, setPhotonEnergy] = useState(3);
  const [velocity, setVelocity] = useState(0.5);

  const c = 3e8, hConst = 6.626e-34, eV = 1.602e-19;
  const gamma = 1 / Math.sqrt(1 - velocity * velocity);
  const photonWavelength = (hConst * c) / (photonEnergy * eV);
  const bohrEnergy = -13.6 / (energyLevel * energyLevel);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <WebGLErrorBoundary>
          <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
            <ambientLight intensity={0.15} />
            <pointLight position={[3, 3, 3]} intensity={0.6} color="#8b5cf6" />
            <pointLight position={[-3, -2, 2]} intensity={0.3} color="#00d4aa" />
            <AtomNucleus />
            <EnergyLevels levels={energyLevel} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </WebGLErrorBoundary>
      </div>
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 space-y-2 xs:space-y-2.5 sm:space-y-3">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider">{t('physics.common.controls')}</h3>
          <ParamSlider label="Energy Levels" value={energyLevel} min={1} max={6} step={1} unit="n" onChange={setEnergyLevel} />
          <ParamSlider label="Photon Energy" value={photonEnergy} min={1} max={15} step={0.5} unit="eV" onChange={setPhotonEnergy} />
          <ParamSlider label="Velocity (β)" value={velocity} min={0.01} max={0.99} step={0.01} unit="c" onChange={setVelocity} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5">
          <h3 className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-2 xs:mb-2.5 sm:mb-3">{t('physics.common.results')}</h3>
          <ResultDisplay items={[
            { label: "Bohr E(n)", value: bohrEnergy.toFixed(2), unit: "eV" },
            { label: "Photon λ", value: (photonWavelength * 1e9).toFixed(1), unit: "nm" },
            { label: "Lorentz γ", value: gamma.toFixed(3), unit: "" },
            { label: "Time Dilation", value: gamma.toFixed(3), unit: "×" },
            { label: "Length Contract", value: (1 / gamma).toFixed(3), unit: "×" },
          ]} />
        </div>
      </div>
    </div>
  );
}

export default function ModernPhysicsPage() {
  const { t } = useTranslation();

  const tabs = [
    { id: "atom", label: t('physics.modern_page.tabs.atoms') },
    { id: "photoelectric", label: t('physics.modern_page.tabs.quantum') },
    { id: "blackbody", label: t('physics.modern_page.tabs.relativity') },
    { id: "decay", label: t('physics.modern_page.tabs.nuclear') },
  ];

  return (
    <div className="min-h-screen w-full pt-10 xs:pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-8 xs:pb-10 sm:pb-12 md:pb-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0.5 xs:mb-1 sm:mb-2 md:mb-3 text-gradient-primary">{t('physics.modern_page.title')}</h1>
        <p className="text-muted-foreground text-xs xs:text-sm sm:text-base md:text-lg mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8">{t('physics.modern_page.description')}</p>
        <ExperimentTabs tabs={tabs}>
          {(active) => (
            <div className="flex flex-col gap-6">
              {active === "atom" && <QuantumAtomSim />}
              {active === "photoelectric" && <PhotoelectricSim />}
              {active === "blackbody" && <BlackbodySim />}
              {active === "decay" && <NuclearDecaySim />}

              {/* Scientific Explanation Section */}
              <div className="glass rounded-3xl p-6 sm:p-8 border-emerald-500/10 bg-emerald-500/[0.02]">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-400">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm font-mono">?</span>
                  {t('physics.common.about_experiment')} / شرح علمي
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                    {t(`physics.modern_page.descriptions.${active}`)}
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
