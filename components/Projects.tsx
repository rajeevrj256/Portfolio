"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const ProjectScene = dynamic(() => import("./three/ProjectScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-24 w-24 animate-pulse rounded-full bg-emerald-500/20 blur-3xl" />
    </div>
  ),
});

type Project = {
  title: string;
  tagline: string;
  period: string;
  featured?: boolean;
  github?: string;
  scene: import("./three/ProjectScene").SceneVariant;
  sceneLabel: string;
  stack: string[];
  points: string[];
};

const projects: Project[] = [
  {
    title: "Real-Time Algorithmic Trading Platform",
    tagline:
      "Microservices that pick NSE intraday stocks, fire 6+ trading strategies and manage risk — automatically.",
    period: "Apr 2025 — Present",
    featured: true,
    github: "https://github.com/rajeevrj256/algoTrading",
    scene: "trading",
    sceneLabel: "candles · live",
    stack: [
      "Java",
      "Spring Boot",
      "Microservices",
      "Apache Kafka",
      "Groww API",
      "PostgreSQL",
      "Flyway",
      "Cron",
      "Telegram Bot",
    ],
    points: [
      "Microservice-based platform automating NSE intraday stock selection, strategy execution and risk management workflows.",
      "Stock Selector Service integrates market-data APIs to process candle data, compute technical indicators (RSI, momentum, volume) and rank high-probability trading opportunities.",
      "Modular Trading Execution Engine supports 6+ strategies — ORB, VWAP Mean Reversion, EMA Crossover, Supertrend, Gap & Go — built with strategy design patterns.",
      "Event-driven communication with Kafka for asynchronous processing between stock selection, signal generation and trade execution pipelines.",
      "Centralized Risk Management Engine with capital allocation, P&L limits, circuit breakers, confidence filtering and risk-reward validation.",
      "PostgreSQL with JPA/Flyway migrations, scheduled jobs, caching, Telegram alerts and health monitoring for production-ready workflows.",
    ],
  },
  {
    title: "AI-Powered Database Query Assistant",
    tagline:
      "Talk to any database in plain English — LLMs turn it into optimized SQL across PostgreSQL, MySQL and Oracle.",
    period: "Mar 2025 — Apr 2025",
    github: "https://github.com/rajeevrj256/Database_Query_assistant",
    scene: "database",
    sceneLabel: "db cluster · online",
    stack: [
      "React.js",
      "LangChain",
      "RAG",
      "Python",
      "OpenAI LLM",
      "SQL",
      "Redis",
      "Asyncio",
    ],
    points: [
      "Connect to any local or remote database and retrieve data using natural language — no SQL needed.",
      "LLM-powered translation (OpenAI + LangChain) from plain English to optimized SQL, opening database access to non-technical users.",
      "Multi-database support: PostgreSQL, MySQL and Oracle, each with a dedicated backend service deployed on independent servers for scalability and fault isolation.",
      "16 REST APIs across 3 backends balance traffic; Redis caching cuts latency on frequently accessed data.",
      "Asyncio-based concurrency plus connection pooling handle high loads and concurrent database operations.",
      "Bulk table creation — upload files to create tables dynamically in the database.",
      "React.js frontend hosted on Vercel with pagination and lazy loading for large datasets.",
    ],
  },
  {
    title: "Crypto Price Alert App",
    tagline:
      "Real-time Binance price alerts over WebSockets, delivered instantly by email.",
    period: "2024",
    scene: "crypto",
    sceneLabel: "ticker · streaming",
    stack: ["Flask", "MongoDB", "Binance API", "WebSockets", "Docker", "SMTP"],
    points: [
      "Real-time price alert system using WebSockets and SMTP — instant notifications reduce manual monitoring effort by 40%.",
      "Containerized backend with Docker for scalable data processing and reliable deployment.",
    ],
  },
  {
    title: "AI-Based Product Content Generation",
    tagline:
      "Audio and images in — polished e-commerce product descriptions out, at multi-tenant scale.",
    period: "2024",
    scene: "ai",
    sceneLabel: "llm · generating",
    stack: ["React.js", "Node.js", "AWS Transcribe", "Firebase", "Docker", "REST APIs"],
    points: [
      "Backend system processes multimedia inputs (audio/image) using AWS Transcribe and generates product descriptions with LLMs for e-commerce workflows.",
      "REST APIs with user-level data isolation and product management, supporting multi-tenant usage and secure access control.",
    ],
  },
];

function GithubLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 font-mono text-xs font-semibold text-emerald-950 transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
      </svg>
      View Source
    </a>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const project = projects[selected];
  const rest = projects.map((p, i) => ({ p, i })).filter(({ i }) => i !== selected);
  const points = showAll ? project.points : project.points.slice(0, 3);
  const hidden = project.points.length - 4;

  const pick = (i: number) => {
    setSelected(i);
    setShowAll(false);
    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="projects" className="relative overflow-hidden py-28">
      <div className="blob left-[30%] top-[15%] h-[28rem] w-[28rem] bg-emerald-600/10" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="term-label mb-3">ls ~/projects</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Systems that <span className="text-gradient">run in production</span>
          </h2>
        </motion.div>

        {/* main detail container */}
        <div ref={detailRef} className="scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="glass mt-10 grid overflow-hidden rounded-2xl lg:grid-cols-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  {project.featured && (
                    <span className="rounded-md bg-amber-400/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-amber-300">
                      Featured
                    </span>
                  )}
                  <span className="font-mono text-xs text-white/50">
                    {project.period}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-cyan-300">{project.tagline}</p>

                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-white/60">
                  {points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-1 text-emerald-400">▹</span>
                      {p}
                    </li>
                  ))}
                </ul>

                {hidden > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowAll((v) => !v)}
                    className="mt-3 font-mono text-xs text-emerald-300/80 transition-colors hover:text-emerald-300"
                  >
                    {showAll ? "− show less" : `more details`}
                  </button>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-emerald-400/15 bg-emerald-400/5 px-3 py-1 font-mono text-xs text-white/70"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {project.github && (
                  <div className="mt-7">
                    <GithubLink href={project.github} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* themed 3D scene */}
            <div className="relative order-first min-h-[240px] sm:min-h-[280px] lg:order-none lg:min-h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.scene}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <ProjectScene variant={project.scene} />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between p-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
                <span>move your cursor</span>
                <span>{project.sceneLabel}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* other projects — click to swap into the container above */}
        <p className="mt-8 text-center font-mono text-xs text-white/40">
          // more projects — click to load into the viewer
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {rest.map(({ p, i }) => (
              <motion.button
                key={p.title}
                type="button"
                layout
                onClick={() => pick(i)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                className="glass group flex flex-col rounded-2xl p-6 text-left transition-colors hover:border-emerald-400/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                    {p.period}
                  </span>
                  {p.featured && (
                    <span className="rounded-md bg-amber-400/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-300">
                      Featured
                    </span>
                  )}
                </div>

                <h4 className="mt-3 text-base font-semibold transition-colors group-hover:text-emerald-300 sm:text-lg">
                  {p.title}
                </h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">
                  {p.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-emerald-400/15 bg-emerald-400/5 px-2.5 py-1 font-mono text-[11px] text-white/60"
                    >
                      {s}
                    </span>
                  ))}
                  {p.stack.length > 3 && (
                    <span className="rounded-md px-2 py-1 font-mono text-[11px] text-emerald-300/70">
                      +{p.stack.length - 3}
                    </span>
                  )}
                </div>

                <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-emerald-300/80 transition-all group-hover:gap-3 group-hover:text-emerald-300">
                  load project <span aria-hidden>→</span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
