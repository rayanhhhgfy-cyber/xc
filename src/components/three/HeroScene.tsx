import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import WebGLErrorBoundary from "@/components/WebGLErrorBoundary";

function ElectronRing({ radius, speed, tilt }: { radius: number; speed: number; tilt: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = tilt;
      ref.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const t = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(t) * radius, Math.sin(t) * radius, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  return (
    <group ref={ref}>
      <line>
        <bufferGeometry attach="geometry" {...curve} />
        <lineBasicMaterial attach="material" color="#1e90ff" transparent opacity={0.2} />
      </line>
    </group>
  );
}

function AtomModel() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        <ElectronRing radius={1.2} speed={1.5} tilt={0} />
        <ElectronRing radius={1.5} speed={-1.2} tilt={Math.PI / 3} />
        <ElectronRing radius={1.8} speed={0.9} tilt={-Math.PI / 4} />
      </group>
    </Float>
  );
}

function CSSFallbackHero() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />
      {Array.from({ length: 60 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/20 animate-pulse-glow"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-orbit" style={{ animationDuration: "6s" }} />
        <div className="absolute inset-[-20px] rounded-full border border-secondary/15 animate-orbit" style={{ animationDuration: "8s", animationDirection: "reverse" }} />
        <div className="absolute inset-[-40px] rounded-full border border-accent/10 animate-orbit" style={{ animationDuration: "10s" }} />
        <div className="absolute inset-[35%] rounded-full bg-primary/30 animate-pulse-glow" />
      </div>
    </div>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <WebGLErrorBoundary fallback={<CSSFallbackHero />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#1e90ff" />
          <Stars radius={100} depth={50} count={2000} factor={3} fade speed={1} />
          <AtomModel />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
