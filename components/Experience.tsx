"use client";

import { motion } from "framer-motion";

const entries = [
  {
    kind: "Work",
    role: "Software Development Engineer 1",
    org: "Brick & Bolt",
    place: "Bengaluru, IN",
    period: "Aug 2025 — Present",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Kafka", "Grafana", "Cron"],
    points: [
      "Optimized PostgreSQL queries on 13M+ records using indexing and batch processing, reducing query latency by 40%.",
      "Built a Kafka-based pipeline for asynchronous call auditing, enabling scalable processing of high-volume data and improving lead qualification rate by 55%.",
      "Resolved third-party API failures caused by load balancer timeouts — analyzed Grafana logs and implemented a custom HTTP client with keep-alive strategy, improving request reliability.",
      "Implemented scheduled data ingestion with cron jobs to fetch call data from Goodmeeting.ai APIs for downstream processing.",
      "Leveraged AI coding assistants (Claude/Codex) to generate APIs, test cases and refactors via structured prompts, with production-grade validation and review.",
    ],
  },
  {
    kind: "Work",
    role: "Software Development Engineer Intern",
    org: "Brick & Bolt",
    place: "Bengaluru, IN",
    period: "Apr 2025 — Jul 2025",
    stack: ["Java", "Spring Boot", "PostgreSQL", "AWS S3", "CloudFront"],
    points: [
      "Improved API response time from 1000ms to 200ms by optimizing PostgreSQL queries and introducing caching.",
      "Developed 10+ REST APIs with Spring Boot to manage subscription plan configurations, enabling real-time updates by business teams.",
      "Refactored legacy Java components, improving maintainability and reducing production bugs by 25%.",
      "Integrated AWS S3 and CloudFront for banner management, cutting backend load and frontend network calls.",
    ],
  },
  {
    kind: "Education",
    role: "B.Tech — Computer Science and Engineering",
    org: "Vellore Institute of Technology (VIT), Bhopal",
    place: "Bhopal, MP",
    period: "Sep 2021 — May 2025",
    stack: ["GPA 8.14 / 10", "DSA", "OOP", "Distributed Systems"],
    points: [
      "Graduated with a GPA of 8.14/10, focusing on data structures, algorithms and systems engineering.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="term-label mb-3">cat experience.log</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Experience &amp; <span className="text-gradient">education</span>
        </h2>
      </motion.div>

      <div className="relative mt-16 border-l border-emerald-400/15 pl-8 sm:pl-12">
        {entries.map((e, i) => (
          <motion.article
            key={e.role}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative mb-12 last:mb-0"
          >
            {/* timeline dot */}
            <span className="absolute -left-[41px] top-1.5 flex h-5 w-5 items-center justify-center sm:-left-[57px]">
              <span className="absolute h-5 w-5 animate-ping rounded-full bg-emerald-400/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400" />
            </span>

            <div className="glass rounded-xl p-6 transition-colors hover:border-emerald-400/40 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-md bg-emerald-500/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-emerald-300">
                  {e.kind}
                </span>
                <span className="font-mono text-xs text-white/50">{e.period}</span>
              </div>

              <h3 className="mt-4 text-lg font-semibold sm:text-xl">{e.role}</h3>
              <p className="mt-1 text-sm text-cyan-300">
                {e.org} · <span className="text-white/50">{e.place}</span>
              </p>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/60">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-1 text-emerald-400">▹</span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {e.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-emerald-400/15 bg-emerald-400/5 px-3 py-1 font-mono text-xs text-white/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
