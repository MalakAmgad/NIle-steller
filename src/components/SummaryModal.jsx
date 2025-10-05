// src/components/SummaryModal.jsx
import React from "react";

export default function SummaryModal({ open, onClose, title, summary, link, onGenerate, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#0b1220] text-slate-100 rounded-2xl w-full max-w-xl p-6 shadow-lg">
        <header className="flex justify-between items-start">
          <div className="pr-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="text-xs text-slate-400 mt-1">Summary</div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-sky-300 hover:underline"
            >
              Open paper
            </a>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
              ✕
            </button>
          </div>
        </header>

        <section className="mt-4 min-h-[80px]">
          {loading ? (
            <div className="text-sm text-slate-300">Generating summary…</div>
          ) : summary ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{summary}</p>
          ) : (
            <div className="text-sm text-slate-400">
              <p>No summary yet.</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={onGenerate}
                  className="px-3 py-1 bg-sky-600 text-white rounded text-sm"
                >
                  Generate Summary
                </button>
              </div>
            </div>
          )}
        </section>

        <footer className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-3 py-1 border border-slate-700 rounded text-sm text-slate-200">
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
