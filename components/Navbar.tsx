"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 24));
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 font-mono text-sm tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 glow-emerald" />
          <span className="text-white/50">~/</span>
          <span className="font-semibold text-white">rajiv-ranjan</span>
          <span className="cursor-blink" />
        </a>

        <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-white/60 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-emerald-300">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:rjrajeev5918@gmail.com"
          className="hidden rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-950 transition-transform hover:scale-105 md:block"
        >
          Hire Me
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass mt-3 flex flex-col gap-1 overflow-hidden px-6 py-2 md:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm uppercase tracking-widest text-white/70 hover:text-emerald-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pb-3">
              <a
                href="mailto:rjrajeev5918@gmail.com"
                onClick={() => setOpen(false)}
                className="block rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-center font-mono text-xs font-semibold uppercase tracking-widest text-emerald-950"
              >
                Hire Me
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
