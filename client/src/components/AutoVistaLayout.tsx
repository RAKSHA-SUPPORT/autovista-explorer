import React from "react";
import { Link, useLocation } from "wouter";

export default function AutoVistaLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      <header className="border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-lime-400 text-black flex items-center justify-center font-black text-sm">
              AV
            </div>
            <div>
              <span className="font-bold tracking-wider text-sm">AUTOVISTA</span>
              <span className="block text-[9px] text-neutral-500 font-mono tracking-widest">100+ VEHICLES ARCHIVE</span>
            </div>
          </Link>

          <nav className="flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <Link href="/" className={`hover:text-lime-400 transition-colors ${location === "/" ? "text-lime-400" : ""}`}>
              Archive
            </Link>
            <Link href="/catalog" className={`hover:text-lime-400 transition-colors ${location === "/catalog" ? "text-lime-400" : ""}`}>
              Catalog
            </Link>
            <Link href="/compare" className={`hover:text-lime-400 transition-colors ${location === "/compare" ? "text-lime-400" : ""}`}>
              Compare
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="border-t border-neutral-900 bg-neutral-950 py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-neutral-500 tracking-wider">
            © 2026 AUTOVISTA INTELLIGENCE. ALL RIGHTS RESERVED.
          </p>
          <p className="mt-2 text-xs font-mono font-medium text-lime-400 tracking-widest uppercase">
            Developed by R.A.K.S.H.A labs
          </p>
        </div>
      </footer>
    </div>
  );
}
