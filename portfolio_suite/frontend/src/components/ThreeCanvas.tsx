"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Stars, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function FloatingParticles() {
  const count = 300;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const light = useRef<THREE.PointLight>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = Math.random() * 100 + 20;
      const speed = Math.random() * 0.01 + 0.005;
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { time, factor, speed, x, y, z } = particle;
      time = particle.time += speed / 2;
      const s = Math.cos(time);
      dummy.position.set(
        x + Math.cos((time / 10) * factor) + (Math.sin(time * 1) * factor) / 10,
        y + Math.sin((time / 10) * factor) + (Math.cos(time * 2) * factor) / 10,
        z + Math.cos((time / 10) * factor) + (Math.sin(time * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#58a6ff" roughness={0.1} metalness={0.8} />
      </instancedMesh>
    </>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
      <color attach="background" args={["#050505"]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#58a6ff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#a100ff" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <FloatingParticles />
      </Float>
      
      <Environment preset="city" />
    </>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] w-full h-full bg-[#050505]">
      <Canvas dpr={[1, 2]}>
        <Scene />
      </Canvas>
      
      {/* Overlay gradient to ease transition to HTML content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none" />
    </div>
  );
}
