"use client";

import { motion } from "framer-motion";
import { useState } from "react";

/**
 * Animated profile picture: spinning gradient ring, pulsing glow and two
 * orbiting dots. Reads /profile.jpg from /public — falls back to an "RR"
 * monogram until the photo is added.
 */
export default function Avatar() {
  const [missing, setMissing] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto relative mb-8 h-28 w-28 sm:h-32 sm:w-32"
    >
      {/* pulsing glow */}
      <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-400/25 blur-2xl" />

      {/* spinning gradient ring */}
      <div className="absolute inset-0 overflow-hidden rounded-full p-[3px]">
        <div className="avatar-ring absolute -inset-1/2" />
        <div className="relative h-full w-full overflow-hidden rounded-full bg-[#02080c]">
          {missing ? (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 font-mono text-3xl font-bold text-emerald-300 sm:text-4xl">
              RR
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="/profile.jpg"
              alt="Rajiv Ranjan"
              className="h-full w-full object-cover"
              onError={() => setMissing(true)}
            />
          )}
        </div>
      </div>

      {/* orbiting dots */}
      <div className="avatar-orbit absolute inset-[-14px]">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.8)]" />
      </div>
      <div className="avatar-orbit-reverse absolute inset-[-26px]">
        <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-amber-400 shadow-[0_0_10px_2px_rgba(251,191,36,0.7)]" />
      </div>

    </motion.div>
  );
}
