import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import WebGLErrorBoundary from "@/components/WebGLErrorBoundary";
import AntiGravityModel from "./AntiGravityModel";

/**
 * Full-viewport Canvas overlay that renders the anti-gravity 3D elements.
 *
 * Key design decisions:
 *  - `position: fixed` + `inset: 0` ⇒ spans entire viewport
 *  - `pointer-events: none` ⇒ doesn't block any existing UI clicks
 *  - `z-index: 1` ⇒ sits above the background orbs (z-0) but below content (z-10)
 *  - Low Environment intensity (0.5) keeps lighting subtle and web-appropriate
 *  - Transparent Canvas (`gl.alpha = true`) so the existing CSS background shows through
 */
export default function AntiGravityOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    >
      <WebGLErrorBoundary fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
          dpr={1}
        >
          <Suspense fallback={null}>
            {/* Ambient fill — very low so it doesn't flatten the glass */}
            <ambientLight intensity={0.15} />

            {/* Subtle directional kick for specular highlights */}
            <directionalLight
              position={[5, 5, 5]}
              intensity={0.3}
              color="#22d3ee"
            />
            <directionalLight
              position={[-5, -3, 2]}
              intensity={0.15}
              color="#a855f7"
            />

            {/* Environment map drives the transmission / reflections */}
            <Environment preset="city" environmentIntensity={0.5} />

            <AntiGravityModel />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
