"use client";

import { motion } from "framer-motion";

const marqueeItems = [
  "Java",
  "Spring Boot",
  "Apache Kafka",
  "PostgreSQL",
  "Redis",
  "Docker",
  "AWS",
  "Microservices",
];

const socials = [
  { label: "GitHub", href: "https://github.com/rajeevrj256" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rajiv-ranjan256" },
];

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* marquee */}
      <div className="mb-20 select-none overflow-hidden border-y border-emerald-400/10 py-5">
        <div className="marquee-track flex w-max gap-12 font-mono text-sm uppercase tracking-[0.25em] text-white/30">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-12">
              {item} <span className="text-emerald-500">◆</span>
            </span>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        id="contact"
        className="glass glow-emerald relative mx-6 max-w-4xl overflow-hidden rounded-2xl p-10 text-center sm:mx-auto sm:p-16"
      >
        <div className="blob left-[-20%] top-[-40%] h-72 w-72 bg-emerald-600/20" />
        <div className="blob bottom-[-40%] right-[-15%] h-72 w-72 bg-cyan-500/15" />

        <p className="term-label relative">init connection</p>
        <h2 className="relative mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s build something <span className="text-gradient">reliable</span>
        </h2>
        <p className="relative mx-auto mt-5 max-w-lg text-white/60">
          Open to backend and full-stack SDE roles. Based in Bengaluru, IN —
          shipping production systems at Brick &amp; Bolt.
        </p>

        <div className="relative mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="mailto:rjrajeev5918@gmail.com"
            className="rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3.5 font-mono text-sm font-semibold text-emerald-950 transition-transform hover:scale-105"
          >
            rjrajeev5918@gmail.com
          </a>
          <a
            href="tel:+917050588988"
            className="rounded-md border border-emerald-400/20 px-8 py-3.5 font-mono text-sm font-semibold text-white/80 transition-colors hover:bg-emerald-400/5 hover:text-white"
          >
            +91 70505 88988
          </a>
          <a
            href="/resume.pdf"
            download="Rajiv_Ranjan_Resume.pdf"
            className="rounded-md border border-amber-400/25 px-8 py-3.5 font-mono text-sm font-semibold text-amber-300/90 transition-colors hover:bg-amber-400/5 hover:text-amber-300"
          >
            ↓ download resume
          </a>
        </div>

        <div className="relative mt-8 flex justify-center gap-6 font-mono text-sm text-white/50">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-emerald-300"
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
