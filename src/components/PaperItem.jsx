// src/components/PaperItem.jsx
import React, { useState } from "react";
import SummaryModal from "./SummaryModal";

// simple placeholder summary generator (abstractive could be LLM-based)
function quickAutoSummary(paper) {
  // naive: use first 2 sentences of abstract or excerpt of full_text
  const text = (paper.abstract || paper.full_text || "").trim();
  if (!text) return "No text available for summary.";
  // break into sentences
  const sentences = text.split(/(?<=[.?!])\s+/);
  return sentences.slice(0, 2).join(" ").trim();
}

export default function PaperItem({ paper }) {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState(null);

  const handleGenerate = async () => {
  try {
    const resp = await fetch("http://localhost:5000/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: paper.title,
        link: paper.link,
      }),
    });

    const data = await resp.json();
    if (data.summary) setSummary(data.summary);
    else setSummary("No summary returned from the model.");
  } catch (err) {
    console.error("Summarization failed:", err);
    setSummary("Error generating summary.");
  }
};



  return (
    <>
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h3 className="font-semibold">{paper.title}</h3>
        <div className="text-xs text-gray-600">{paper.authors} • {paper.year}</div>

        <p className="text-sm mt-2 line-clamp-3">{paper.abstract}</p>

        <div className="mt-3 flex gap-2">
          <button
            className="px-2 py-1 rounded border text-sm"
            onClick={() => setOpen(true)}
          >
            Show Summary
          </button>

          <a className="px-2 py-1 rounded border text-sm" href={paper.full_text || "#"} target="_blank" rel="noreferrer">
            Open Paper
          </a>
        </div>
      </div>

      <SummaryModal
        open={open}
        onClose={() => setOpen(false)}
        paper={paper}
        summary={summary}
        onGenerateSummary={handleGenerate}
      />
    </>
  );
}

