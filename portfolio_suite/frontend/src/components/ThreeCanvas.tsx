"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────
   1. Morphing Icosahedron — the centrepiece geometry
   ───────────────────────────────────────────────────────── */
function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;

    // Slow organic rotation
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;

    // Mouse-reactive tilt
    meshRef.current.rotation.z += (pointer.x * 0.3 - meshRef.current.rotation.z) * 0.02;
    meshRef.current.rotation.x += (pointer.y * 0.3 - meshRef.current.rotation.x) * 0.02;

    // Organic scaling breath
    const s = 1 + Math.sin(t * 0.5) * 0.05;
    meshRef.current.scale.set(s, s, s);

    // Animate emissive pulse
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.3 + Math.sin(t) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshPhysicalMaterial
          ref={materialRef}
          color="#000000"
          metalness={0.95}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.05}
          wireframe
          emissive="#6366f1"
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

/* ─────────────────────────────────────────────────────────
   2. Orbital particles with trails
   ───────────────────────────────────────────────────────── */
function OrbitalParticles() {
  const count = 200;
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────
   3. Floating ring geometry
   ───────────────────────────────────────────────────────── */
function FloatingRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x = clock.elapsedTime * 0.15;
    ringRef.current.rotation.z = clock.elapsedTime * 0.1;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -2]}>
      <torusGeometry args={[4, 0.02, 16, 100]} />
      <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────
   4. Scene composition
   ───────────────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <color attach="background" args={["#000000"]} />

      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -5, 0]} intensity={3} color="#6366f1" distance={20} decay={2} />
      <pointLight position={[5, 5, 3]} intensity={2} color="#06b6d4" distance={15} decay={2} />

      <MorphingSphere />
      <OrbitalParticles />
      <FloatingRing />

      <EffectComposer enableNormalPass={false}>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.5}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   5. Export
   ───────────────────────────────────────────────────────── */
export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-black">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
