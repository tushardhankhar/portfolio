"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* Brand colours used to tint the particle cloud */
const C_PURPLE = new THREE.Color("#864797");
const C_SOFT = new THREE.Color("#b190c1");
const C_GOLD = new THREE.Color("#e9c84b");
const C_BLUE = new THREE.Color("#0cc0df");

/** Generate a fibonacci-sphere point cloud with a little inner scatter + per-point colour. */
function useSpherePoints(count: number, radius: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      // jitter radius slightly so it's a shell with depth, not a hard surface
      const rad = radius * (0.82 + Math.random() * 0.3);
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      positions[i * 3] = x * rad;
      positions[i * 3 + 1] = y * rad;
      positions[i * 3 + 2] = z * rad;

      // colour blend: mostly purple/soft-purple, occasional gold/blue sparkle
      const t = Math.random();
      if (t > 0.94) tmp.copy(C_GOLD);
      else if (t > 0.86) tmp.copy(C_BLUE);
      else tmp.copy(C_PURPLE).lerp(C_SOFT, Math.random());

      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    return { positions, colors };
  }, [count, radius]);
}

function ParticleSphere({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const { positions, colors } = useSpherePoints(count, 2.1);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    // constant slow spin
    group.current.rotation.y += delta * 0.06;
    group.current.rotation.x += delta * 0.012;
    // gentle parallax toward cursor
    group.current.position.x += (pointer.x * 0.25 - group.current.position.x) * 0.04;
    group.current.position.y += (pointer.y * 0.18 - group.current.position.y) * 0.04;
    // subtle tilt following horizontal cursor travel
    group.current.rotation.z = pointer.x * 0.28 * 0.05;
  });

  return (
    <group ref={group}>
      <Points positions={positions} colors={colors} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={0.018}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {/* faint inner core glow via a second, smaller dimmer cloud */}
      <Points positions={positions} colors={colors} stride={3} scale={0.55}>
        <PointMaterial
          transparent
          color="#b190c1"
          size={0.012}
          sizeAttenuation
          depthWrite={false}
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function HeroCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [profile, setProfile] = useState<{
    count: number;
    dpr: [number, number];
    reduced: boolean;
  } | null>(null);

  // Detect device profile once on mount (client only).
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;
    setProfile({
      // fewer particles on mobile → less vertex work per frame
      count: coarse || small ? 1400 : 2600,
      // cap DPR below full retina — indistinguishable for additive points, ~2x cheaper
      dpr: [1, coarse || small ? 1.5 : 1.75],
      reduced,
    });
  }, []);

  // Pause the render loop entirely when the hero is scrolled out of view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!profile) return <div ref={wrapRef} className="h-full w-full" />;

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 50 }}
        dpr={profile.dpr}
        // additive-blended points don't benefit from MSAA — skip the cost
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        // reduced motion → render a single static frame; off-screen → stop the loop
        frameloop={profile.reduced ? "demand" : inView ? "always" : "never"}
        style={{ background: "transparent" }}
      >
        <ParticleSphere count={profile.count} />
      </Canvas>
    </div>
  );
}
