"use client";

import { motion } from "framer-motion";

const groups = [
  {
    icon: "{ }",
    title: "Languages",
    items: ["Java", "C++", "Python", "SQL"],
  },
  {
    icon: ">_",
    title: "Backend & Frameworks",
    items: ["Spring Boot", "Apache Kafka", "Redis", "Git", "REST APIs", "Microservices"],
  },
  {
    icon: "▤",
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "Indexing & Batch Processing", "JPA / Flyway"],
  },
  {
    icon: "☁",
    title: "Cloud & Tooling",
    items: [
      "AWS (S3, CloudFront, Transcribe)",
      "Docker",
      "Firebase",
      "Grafana",
      "LangChain",
      "AI Assistants (Claude / Codex)",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="term-label mb-3">which --all skills</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Technical <span className="text-gradient">toolbox</span>
        </h2>
      </motion.div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {groups.map((g, i) => (
          <motion.article
            key={g.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
            whileHover={{ y: -6 }}
            className="glass group rounded-2xl p-7 transition-colors hover:border-emerald-400/40"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500/25 to-cyan-500/25 font-mono text-sm text-emerald-300 transition-transform group-hover:scale-110 group-hover:rotate-6">
                {g.icon}
              </div>
              <h3 className="text-lg font-semibold">{g.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-emerald-400/15 bg-emerald-400/5 px-3 py-1.5 font-mono text-xs text-white/70 transition-colors hover:border-cyan-400/40 hover:text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
