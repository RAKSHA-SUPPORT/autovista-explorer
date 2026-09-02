import React from "react";
import { Link } from "wouter";

export const AutoVistaLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-wider bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent cursor-pointer">
            AUTOVISTA
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="text-neutral-300 hover:text-white transition-colors">Home</Link>
            <Link href="/catalog" className="text-neutral-300 hover:text-white transition-colors">Catalog</Link>
            <Link href="/makes" className="text-neutral-300 hover:text-white transition-colors">Makes</Link>
            <Link href="/compare" className="text-neutral-300 hover:text-white transition-colors">Compare</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto p-4">
        {children}
      </main>
      <footer className="border-t border-neutral-800 py-6 text-center text-xs text-neutral-500">
        AutoVista Performance Supercar Catalog
      </footer>
    </div>
  );
};

export default AutoVistaLayout;
