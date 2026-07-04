"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Grid,
  Line,
  MeshDistortMaterial,
  Sparkles,
  Stars,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const EMERALD = "#34d399";
const CYAN = "#22d3ee";
const AMBER = "#fbbf24";

// deterministic pseudo-random so SSR/CSR and every render agree
const rnd = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function Core() {
  const inner = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (inner.current) inner.current.rotation.y = t * 0.2;
    if (wire.current) {
      wire.current.rotation.y = -t * 0.12;
      wire.current.rotation.x = Math.sin(t * 0.25) * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.05, 24]} />
        <MeshDistortMaterial
          color={EMERALD}
          emissive="#065f46"
          distort={0.35}
          speed={1.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <mesh ref={wire} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial wireframe color={EMERALD} transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

/** Satellite nodes linked to the core — a living network graph. */
function NetworkNodes({ count = 9 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<(THREE.Mesh | null)[]>([]);

  const layout = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const theta = (i / count) * Math.PI * 2;
        const phi = Math.acos(2 * rnd(i, 1) - 1);
        const r = 2.5 + rnd(i, 2) * 0.9;
        return {
          position: new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.cos(phi) * 0.75,
            r * Math.sin(phi) * Math.sin(theta)
          ),
          color: i % 3 === 0 ? AMBER : i % 3 === 1 ? CYAN : EMERALD,
          speed: 0.6 + rnd(i, 3) * 1.4,
        };
      }),
    [count]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) group.current.rotation.y = t * 0.06;
    nodes.current.forEach((n, i) => {
      if (n) {
        const s = 1 + Math.sin(t * layout[i].speed * 2 + i) * 0.35;
        n.scale.setScalar(s);
      }
    });
  });

  return (
    <group ref={group}>
      {layout.map((n, i) => (
        <group key={i}>
          <Line
            points={[new THREE.Vector3(0, 0, 0), n.position]}
            color={n.color}
            transparent
            opacity={0.18}
            lineWidth={1}
          />
          <mesh
            ref={(el) => {
              nodes.current[i] = el;
            }}
            position={n.position}
            scale={1}
          >
            <icosahedronGeometry args={[0.09, 1]} />
            <meshStandardMaterial
              color={n.color}
              emissive={n.color}
              emissiveIntensity={1.2}
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Particles streaming upward — data flowing through the pipeline. */
function DataStream({ count = 260 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const a = rnd(i, 4) * Math.PI * 2;
      const r = 2 + rnd(i, 5) * 5;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = rnd(i, 6) * 8 - 4;
      positions[i * 3 + 2] = Math.sin(a) * r;
      speeds[i] = 0.2 + rnd(i, 7) * 0.9;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    if (!points.current) return;
    const attr = points.current.geometry.attributes
      .position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = attr.getY(i) + speeds[i] * delta;
      if (y > 4) y = -4;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={EMERALD}
        size={0.035}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Mouse-parallax camera + scroll-linked rotation. On desktop the whole
 * network drifts right so it shares the hero with the text column; on
 * mobile it stays centered (smaller) behind the copy.
 */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ camera, pointer, size }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.9, 0.04);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      0.4 + pointer.y * 0.5,
      0.04
    );
    camera.lookAt(0, 0, 0);

    if (group.current && typeof window !== "undefined") {
      const progress = window.scrollY / Math.max(window.innerHeight, 1);
      const targetX = size.width >= 1024 ? 2.6 : 0;
      const targetScale = size.width < 640 ? 0.7 : size.width < 1024 ? 0.85 : 1;

      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        progress * 1.4,
        0.06
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        progress * 1.2,
        0.06
      );
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        targetX,
        0.06
      );
      group.current.scale.setScalar(
        THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.06)
      );
    }
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0.4, 6.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <pointLight position={[6, 4, 6]} intensity={40} color={EMERALD} />
        <pointLight position={[-6, -3, 4]} intensity={30} color={CYAN} />

        <Rig>
          <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.7}>
            <Core />
          </Float>
          <NetworkNodes />
          <DataStream />
          <Sparkles count={70} scale={9} size={2} speed={0.3} opacity={0.4} color={CYAN} />
        </Rig>

        <Grid
          position={[0, -2.6, 0]}
          args={[24, 24]}
          cellSize={0.6}
          cellThickness={0.6}
          cellColor="#0c3b2c"
          sectionSize={3}
          sectionThickness={1}
          sectionColor="#10b981"
          fadeDistance={26}
          fadeStrength={2}
          infiniteGrid
        />
        <Stars radius={60} depth={40} count={1800} factor={3.5} fade speed={0.5} />
      </Suspense>
    </Canvas>
  );
}
