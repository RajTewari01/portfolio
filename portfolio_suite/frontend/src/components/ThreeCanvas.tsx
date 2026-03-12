"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════
   CUSTOM GLSL SHADERS — Iridescent Morphing Sphere
   This is intentionally complex GLSL to be hard to replicate.
   ═══════════════════════════════════════════════════════════ */

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  // Simplex 3D noise
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    // Multi-octave noise displacement
    float slowTime = uTime * 0.15;
    float noise1 = snoise(position * 1.5 + slowTime);
    float noise2 = snoise(position * 3.0 - slowTime * 0.7) * 0.5;
    float noise3 = snoise(position * 6.0 + slowTime * 1.3) * 0.15;

    // Mouse influence
    float mouseInfluence = (uMouse.x * 0.15 + uMouse.y * 0.1);

    float displacement = (noise1 + noise2 + noise3) * (0.35 + mouseInfluence * 0.1);
    vDisplacement = displacement;

    vec3 newPosition = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    // Iridescent color based on view angle and displacement
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

    // Base color palette — deep indigo to cyan
    vec3 color1 = vec3(0.247, 0.255, 0.961); // #3F41F5 indigo
    vec3 color2 = vec3(0.024, 0.714, 0.831); // #06B6D4 cyan
    vec3 color3 = vec3(0.580, 0.337, 0.961); // #9456F5 purple
    vec3 color4 = vec3(0.031, 0.875, 0.643); // #08DFA4 mint

    // Shift colors based on displacement, time, and angle
    float t = vDisplacement * 2.0 + uTime * 0.1;
    vec3 baseColor = mix(color1, color2, sin(t) * 0.5 + 0.5);
    baseColor = mix(baseColor, color3, sin(t * 1.7 + 1.0) * 0.5 + 0.5);
    baseColor = mix(baseColor, color4, fresnel * 0.4);

    // Rim lighting
    float rim = fresnel * 1.2;
    vec3 rimColor = mix(color2, vec3(1.0), 0.5);

    // Combine
    vec3 finalColor = baseColor * (0.6 + vDisplacement * 0.8) + rimColor * rim * 0.5;

    // Subtle scan lines for texture
    float scanline = sin(vPosition.y * 40.0 + uTime * 2.0) * 0.03;
    finalColor += scanline;

    // Alpha fade at edges
    float alpha = 0.85 + fresnel * 0.15;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

/* ═══════════════════════════════════════════════════════════
   MORPHING BLOB COMPONENT
   ═══════════════════════════════════════════════════════════ */
function MorphBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(pointer.x, pointer.y), 0.05
      );
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.2}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════
   FLOATING PARTICLES (very lightweight)
   ═══════════════════════════════════════════════════════════ */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 80;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.015} color="#6366f1" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════
   CANVAS EXPORT
   ═══════════════════════════════════════════════════════════ */
export default function ThreeCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ pointerEvents: "auto" }}
      >
        <MorphBlob />
        <Particles />
      </Canvas>
    </div>
  );
}
