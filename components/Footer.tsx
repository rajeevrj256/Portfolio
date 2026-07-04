export default function Footer() {
  return (
    <footer className="border-t border-emerald-400/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 font-mono text-xs text-white/40 sm:flex-row">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-widest text-white/70">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400" />
          ~/rajiv-ranjan
        </a>
       
        <p>© {new Date().getFullYear()} Rajiv Ranjan · Bengaluru, IN</p>
      </div>
    </footer>
  );
}
