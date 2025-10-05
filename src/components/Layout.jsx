// src/components/Layout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

/* ---------- Fixed top bar shown on every page ---------- */
export function TopBar() {
  return (
    <div className="fixed top-0 inset-x-0 z-50 h-14 px-4 sm:px-6 lg:px-8
                    flex items-center justify-between
                    backdrop-blur bg-[#050914]/70 border-b border-slate-800/60">
      {/* Brand (clicking it returns home) */}
      <Link to="/" className="flex items-center gap-2 group">
        <span className="inline-block w-5 h-5 rounded-full border border-sky-400/50
                         bg-gradient-to-br from-sky-300/30 to-indigo-300/30
                         group-hover:shadow-[0_0_18px_rgba(56,189,248,0.45)] transition" />
        <div className="leading-tight">
          <div className="text-white font-semibold">NileStellar</div>
          <div className="text-[11px] text-slate-300/80">— Space Biology Knowledge Engine</div>
        </div>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="px-3 py-1.5 rounded-full border border-slate-300/30 text-slate-100
                     bg-white/0 hover:bg-white/5 transition"
        >
          ← Home
        </Link>
        <Link
          to="/dashboard"
          className="px-3 py-1.5 rounded-full border border-sky-300/60 text-sky-100
                     bg-sky-400/10 hover:bg-sky-400/20 transition"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}

/* ---------- Site footer shown on every page ---------- */
export function SiteFooter() {
  return (
    <footer className="mt-10 mx-auto max-w-7xl px-4 pb-10 pt-6 border-t border-slate-800/60">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-300">
        <p>Techno — Created for NASA Space Apps 2025 · Web Design ©2025</p>
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 h-5 rounded-full border border-sky-400/40
                           bg-gradient-to-br from-sky-300/30 to-indigo-300/30" />
          <span className="text-slate-200">NileStellar</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Layout component (route wrapper or manual wrapper) ---------- */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#050914] text-slate-100">
      <TopBar />
      {/* spacing so content doesn't sit under the fixed bar */}
      <main className="pt-16">
        {/* Use children if provided, else render nested route via <Outlet /> */}
        {children ?? <Outlet />}
      </main>
      <SiteFooter />
    </div>
  );
}
