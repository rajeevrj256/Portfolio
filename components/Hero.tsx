"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-emerald-500/20 blur-3xl" />
    </div>
  ),
});

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const roles = [
  "Backend Engineer",
  "Java · Spring Boot",
  "Kafka & Event-Driven Systems",
  "PostgreSQL at Scale",
];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let delay = deleting ? 40 : 90;
    if (!deleting && text === word) delay = 1500;
    else if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return text;
}

const stats = [
  "40% ↓ query latency on 13M+ rows",
  "55% ↑ lead qualification via Kafka",
  "1000ms → 200ms API response",
];

export default function Hero() {
  const role = useTypewriter(roles);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* 3D scene — core drifts to the right on desktop (see Rig in HeroScene) */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* readability + ambience */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent lg:from-background/80 lg:via-background/20" />
      <div className="grid-overlay pointer-events-none absolute inset-0" />
      <div className="blob left-[-12%] top-[15%] h-96 w-96 bg-emerald-600/20" />

      {/* content — left column; right column is the 3D core's stage */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl px-6 pb-24 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:pb-0 lg:pt-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.div variants={item} className="flex justify-center lg:justify-start">
            <Avatar />
          </motion.div>

          <motion.p
            variants={item}
            className="font-mono text-sm text-emerald-300"
          >
            <span className="text-amber-300">~ $</span> whoami
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-3 text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl xl:text-7xl"
          >
            Rajiv <span className="text-gradient">Ranjan</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-4 h-8 font-mono text-lg text-cyan-300 sm:text-xl"
          >
            {role}
            <span className="cursor-blink" />
          </motion.div>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-xl text-base text-white/60 sm:text-lg lg:mx-0"
          >
            SDE-1 at Brick&nbsp;&amp;&nbsp;Bolt, Bengaluru. I make databases
            fast, pipelines event-driven and systems hard to break.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <a
              href="#projects"
              className="glow-emerald w-full rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3.5 font-mono text-sm font-semibold text-emerald-950 transition-transform hover:scale-105 sm:w-auto"
            >
              ./view-projects
            </a>
            <a
              href="#contact"
              className="glass w-full rounded-md px-8 py-3.5 font-mono text-sm font-semibold text-white/80 transition-colors hover:text-emerald-300 sm:w-auto"
            >
              $ contact --me
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="glass w-full rounded-md border border-amber-400/25 px-8 py-3.5 font-mono text-sm font-semibold text-amber-300/90 transition-colors hover:border-amber-400/50 hover:text-amber-300 sm:w-auto"
            >
              view resume.pdf ↗
            </a>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] text-white/60 sm:text-xs lg:justify-start"
          >
            {stats.map((stat) => (
              <li key={stat} className="glass rounded-md px-4 py-2">
                {stat}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* right column intentionally empty — the 3D network core lives here on lg+ */}
        <div className="hidden lg:block" />
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-emerald-300/25 p-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-emerald-300/70"
          />
        </div>
      </motion.div>
    </section>
  );
}
