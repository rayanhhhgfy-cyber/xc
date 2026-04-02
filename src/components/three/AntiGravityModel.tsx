import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Normalized scroll position [0..1] tracked globally via a scroll listener.
 * This approach avoids requiring drei's ScrollControls wrapper.
 */
function useWindowScroll() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const normalized = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollY(normalized);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollY;
}

/* ---------- individual glass shape ---------- */

interface GlassShapeProps {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  scale: number;
  color: string;
  floatSpeed: number;
  floatIntensity: number;
  rotationIntensity: number;
  scrollInfluence: number;
  scrollY: number;
}

function GlassShape({
  geometry,
  position,
  scale,
  color,
  floatSpeed,
  floatIntensity,
  rotationIntensity,
  scrollInfluence,
  scrollY,
}: GlassShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseY = position[1];

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    // gentle scroll-driven Y offset + rotation
    meshRef.current.position.y = baseY + scrollY * scrollInfluence * 3;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.08;
  });

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
    >
      <mesh
        ref={meshRef}
        geometry={geometry}
        position={position}
        scale={scale}
      >
        <MeshTransmissionMaterial
          backside={false}
          resolution={256} // Lowered from 512 for performance
          samples={1}      // Lowered from 3 to reduce ray-tracing cost
          thickness={0.2}
          chromaticAberration={0.03} // Subtle chromatic aberration
          anisotropy={0}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.05}
          ior={1.2}
          color={color}
          transmission={0.9}
          roughness={0.1}
          toneMapped={true}
        />
      </mesh>
    </Float>
  );
}

/* ---------- main scene content ---------- */

export default function AntiGravityModel() {
  const scrollY = useWindowScroll();

  // Pre-create geometries once
  const geometries = useMemo(
    () => ({
      icosahedron: new THREE.IcosahedronGeometry(1, 1),
      octahedron: new THREE.OctahedronGeometry(1, 0),
      dodecahedron: new THREE.DodecahedronGeometry(1, 0),
      torusKnot: new THREE.TorusKnotGeometry(0.7, 0.25, 80, 16),
      sphere: new THREE.SphereGeometry(1, 32, 32),
    }),
    []
  );

  // Brand-matched color palette (cyan-400 → purple-400)
  const brandCyan = "#22d3ee"; // matches --primary / --chem-cyan region
  const brandPurple = "#a855f7"; // matches --secondary / --chem-purple region
  const brandBlue = "#3b82f6"; // accent blue to bridge the two

  return (
    <group>
      {/* Large central icosahedron — hero piece */}
      <GlassShape
        geometry={geometries.icosahedron}
        position={[-3.2, 1.5, -2]}
        scale={1.8}
        color={brandCyan}
        floatSpeed={2}
        floatIntensity={2}
        rotationIntensity={1}
        scrollInfluence={-1.5}
        scrollY={scrollY}
      />

      {/* Octahedron — top-right */}
      <GlassShape
        geometry={geometries.octahedron}
        position={[3.5, 2.2, -3]}
        scale={1.3}
        color={brandPurple}
        floatSpeed={1.6}
        floatIntensity={1.8}
        rotationIntensity={0.8}
        scrollInfluence={-2}
        scrollY={scrollY}
      />

      {/* Dodecahedron — mid-left */}
      <GlassShape
        geometry={geometries.dodecahedron}
        position={[-4.5, -1.8, -4]}
        scale={1.1}
        color={brandBlue}
        floatSpeed={2.2}
        floatIntensity={2.5}
        rotationIntensity={1.2}
        scrollInfluence={-1}
        scrollY={scrollY}
      />

      {/* Torus knot — bottom-right accent */}
      <GlassShape
        geometry={geometries.torusKnot}
        position={[4.2, -1.4, -2.5]}
        scale={0.9}
        color={brandCyan}
        floatSpeed={1.8}
        floatIntensity={1.6}
        rotationIntensity={1.5}
        scrollInfluence={-1.8}
        scrollY={scrollY}
      />

      {/* Small sphere — subtle filler */}
      <GlassShape
        geometry={geometries.sphere}
        position={[0.5, -2.8, -3.5]}
        scale={0.7}
        color={brandPurple}
        floatSpeed={2.5}
        floatIntensity={3}
        rotationIntensity={0.6}
        scrollInfluence={-2.5}
        scrollY={scrollY}
      />

      {/* Tiny icosahedron — far background */}
      <GlassShape
        geometry={geometries.icosahedron}
        position={[1.5, 3, -6]}
        scale={0.55}
        color={brandBlue}
        floatSpeed={3}
        floatIntensity={2}
        rotationIntensity={0.5}
        scrollInfluence={-0.8}
        scrollY={scrollY}
      />
    </group>
  );
}
