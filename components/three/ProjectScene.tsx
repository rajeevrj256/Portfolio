"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

export type SceneVariant = "trading" | "database" | "crypto" | "ai";

const EMERALD = "#34d399";
const CYAN = "#22d3ee";
const AMBER = "#fbbf24";
const RED = "#f87171";

// deterministic pseudo-random — SSR-safe, stable across renders
const rnd = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/** Gentle pointer-follow tilt shared by all variants. */
function Tilt({
  children,
  base = [0, 0, 0] as [number, number, number],
}: {
  children: React.ReactNode;
  base?: [number, number, number];
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      base[0] - pointer.y * 0.25,
      0.05
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      base[1] + pointer.x * 0.4,
      0.05
    );
  });

  return (
    <group ref={group} rotation={base}>
      {children}
    </group>
  );
}

/* ---------------- trading: animated candlestick chart ---------------- */

const CANDLE_COUNT = 13;
const CANDLE_STEP = 0.42;

function TradingScene() {
  const glow = useRef<THREE.Mesh>(null);

  const candles = useMemo(() => {
    let price = 0;
    const walk = Array.from({ length: CANDLE_COUNT }, (_, i) => {
      const open = price;
      price += (rnd(i, 11) - 0.42) * 0.55;
      const close = price;
      return {
        open,
        close,
        high: Math.max(open, close) + rnd(i, 12) * 0.18,
        low: Math.min(open, close) - rnd(i, 13) * 0.18,
        up: close >= open,
      };
    });
    const mean =
      walk.reduce((s, c) => s + (c.open + c.close) / 2, 0) / walk.length;
    return walk.map((c) => ({
      ...c,
      open: c.open - mean,
      close: c.close - mean,
      high: c.high - mean,
      low: c.low - mean,
    }));
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (glow.current) {
      // price marker sweeping across candle closes
      const f = (t * 1.6) % (CANDLE_COUNT - 1);
      const i = Math.floor(f);
      const frac = f - i;
      const x = (i + frac - (CANDLE_COUNT - 1) / 2) * CANDLE_STEP;
      const y = THREE.MathUtils.lerp(
        candles[i].close,
        candles[i + 1].close,
        frac
      );
      glow.current.position.set(x, y, 0.25);
    }
  });

  return (
    <Tilt base={[0.15, -0.25, 0]}>
      {candles.map((c, i) => {
        const x = (i - (CANDLE_COUNT - 1) / 2) * CANDLE_STEP;
        const bodyH = Math.max(Math.abs(c.close - c.open), 0.07);
        const color = c.up ? EMERALD : RED;
        return (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, (c.high + c.low) / 2, 0]}>
              <boxGeometry args={[0.025, c.high - c.low, 0.025]} />
              <meshBasicMaterial color={color} transparent opacity={0.55} />
            </mesh>
            <mesh position={[0, (c.open + c.close) / 2, 0]}>
              <boxGeometry args={[0.2, bodyH, 0.2]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.45}
                roughness={0.3}
                metalness={0.4}
              />
            </mesh>
          </group>
        );
      })}

      {/* sweeping price marker */}
      <mesh ref={glow}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={AMBER} />
      </mesh>

      {/* baseline */}
      <mesh position={[0, -1.15, 0]}>
        <boxGeometry args={[CANDLE_COUNT * CANDLE_STEP, 0.012, 0.012]} />
        <meshBasicMaterial color={EMERALD} transparent opacity={0.3} />
      </mesh>

      <Sparkles count={30} scale={5} size={1.6} speed={0.3} opacity={0.4} color={EMERALD} />
    </Tilt>
  );
}

/* ---------------- database: cylinder stack + orbiting data ---------------- */

function DatabaseScene() {
  const stack = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);

  const orbiters = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        angle: (i / 10) * Math.PI * 2,
        radius: 1.7 + rnd(i, 21) * 0.3,
        y: (rnd(i, 22) - 0.5) * 1.4,
        color: i % 3 === 0 ? AMBER : i % 3 === 1 ? CYAN : EMERALD,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (stack.current) stack.current.rotation.y = t * 0.35;
    if (ring.current) ring.current.rotation.y = -t * 0.6;
  });

  return (
    <Tilt base={[0.35, 0, 0]}>
      <group ref={stack}>
        {[0.85, 0, -0.85].map((y, i) => (
          <group key={i} position={[0, y, 0]}>
            <mesh>
              <cylinderGeometry args={[1, 1, 0.55, 48]} />
              <meshStandardMaterial
                color="#065f46"
                emissive={EMERALD}
                emissiveIntensity={0.18}
                roughness={0.25}
                metalness={0.7}
              />
            </mesh>
            <mesh position={[0, 0.28, 0]}>
              <cylinderGeometry args={[1.001, 1.001, 0.02, 48]} />
              <meshBasicMaterial color={EMERALD} transparent opacity={0.5} />
            </mesh>
          </group>
        ))}
      </group>

      {/* orbiting query packets */}
      <group ref={ring}>
        {orbiters.map((o, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(o.angle) * o.radius,
              o.y,
              Math.sin(o.angle) * o.radius,
            ]}
            scale={0.09}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={o.color}
              emissive={o.color}
              emissiveIntensity={1}
            />
          </mesh>
        ))}
      </group>

      <Sparkles count={25} scale={5} size={1.5} speed={0.25} opacity={0.35} color={CYAN} />
    </Tilt>
  );
}

/* ---------------- crypto: spinning coin + sparks ---------------- */

function CryptoScene() {
  const coin = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coin.current) {
      coin.current.rotation.y = t * 1.1;
      coin.current.rotation.x = Math.sin(t * 0.7) * 0.12;
      coin.current.position.y = Math.sin(t * 1.4) * 0.12;
    }
  });

  return (
    <Tilt>
      <group ref={coin}>
        {/* coin standing on edge */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 0.16, 64]} />
          <meshStandardMaterial
            color={AMBER}
            emissive="#92400e"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* rim */}
        <mesh>
          <torusGeometry args={[1.05, 0.045, 16, 64]} />
          <meshStandardMaterial color="#fde68a" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* face detail rings */}
        {[0.09, -0.09].map((z, i) => (
          <mesh key={i} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55, 0.035, 12, 48]} />
            <meshStandardMaterial color="#fde68a" metalness={0.85} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* orbiting sparks */}
      {Array.from({ length: 6 }, (_, i) => (
        <Float key={i} speed={2 + rnd(i, 31)} rotationIntensity={1.5} floatIntensity={2}>
          <mesh
            position={[
              Math.cos((i / 6) * Math.PI * 2) * (1.8 + rnd(i, 32) * 0.5),
              (rnd(i, 33) - 0.5) * 1.6,
              Math.sin((i / 6) * Math.PI * 2) * 0.8,
            ]}
            scale={0.07 + rnd(i, 34) * 0.05}
          >
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={1} />
          </mesh>
        </Float>
      ))}

      <Sparkles count={35} scale={5} size={1.8} speed={0.35} opacity={0.45} color={AMBER} />
    </Tilt>
  );
}

/* ---------------- ai: neural orb + orbiting content cards ---------------- */

function AiScene() {
  const cards = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (cards.current) cards.current.rotation.y = t * 0.5;
  });

  return (
    <Tilt>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[0.85, 24]} />
          <MeshDistortMaterial
            color={CYAN}
            emissive="#155e75"
            distort={0.42}
            speed={2.4}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
      </Float>

      {/* orbiting content cards */}
      <group ref={cards}>
        {Array.from({ length: 4 }, (_, i) => {
          const a = (i / 4) * Math.PI * 2;
          return (
            <group
              key={i}
              position={[Math.cos(a) * 1.9, Math.sin(a * 2) * 0.35, Math.sin(a) * 1.9]}
              rotation={[0, -a + Math.PI / 2, 0]}
            >
              <mesh>
                <planeGeometry args={[0.55, 0.75]} />
                <meshStandardMaterial
                  color="#0f2e33"
                  emissive={CYAN}
                  emissiveIntensity={0.25}
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.9}
                />
              </mesh>
              {/* text lines on the card */}
              {[0.22, 0.08, -0.06, -0.2].map((y, j) => (
                <mesh key={j} position={[j === 0 ? -0.08 : 0, y, 0.01]}>
                  <planeGeometry args={[j === 0 ? 0.28 : 0.4, 0.035]} />
                  <meshBasicMaterial
                    color={j === 0 ? AMBER : CYAN}
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              ))}
            </group>
          );
        })}
      </group>

      <Sparkles count={35} scale={5} size={1.8} speed={0.35} opacity={0.45} color={CYAN} />
    </Tilt>
  );
}

/* ---------------- shell ---------------- */

const SCENES: Record<SceneVariant, React.ComponentType> = {
  trading: TradingScene,
  database: DatabaseScene,
  crypto: CryptoScene,
  ai: AiScene,
};

const LIGHTS: Record<SceneVariant, [string, string]> = {
  trading: [EMERALD, CYAN],
  database: [EMERALD, CYAN],
  crypto: [AMBER, "#fde68a"],
  ai: [CYAN, EMERALD],
};

export default function ProjectScene({ variant }: { variant: SceneVariant }) {
  const Scene = SCENES[variant];
  const [l1, l2] = LIGHTS[variant];

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0.2, 4.6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 4, 5]} intensity={35} color={l1} />
        <pointLight position={[-4, -2, 3]} intensity={22} color={l2} />
        <Scene />
      </Suspense>
    </Canvas>
  );
}
