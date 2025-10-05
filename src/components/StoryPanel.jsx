// src/components/StoryPanel.jsx
import React, { useContext, useState } from "react";
import { PaperContext } from "./PaperStore";

/*
 StoryPanel:
 - shows one manual story (you can embed a video URL)
 - generates an automated narrative from a selected paper
*/

export default function StoryPanel() {
  const { filtered } = useContext(PaperContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoStory, setAutoStory] = useState("");

  const paper = filtered && filtered.length ? filtered[selectedIndex] : null;

  function generateAutoStory(p) {
    // lightweight template-based story. Replace this with LLM call for richer result.
    if (!p) {
      setAutoStory("No paper selected.");
      return;
    }
    const title = p.title || "this experiment";
    const mission = p.mission || "the ISS";
    const organism = p.organism || "the organism";
    const year = p.year || "";
    const s = `On ${mission}, researchers investigated ${title} (${year}). The focus was ${organism}. Key takeaways: ${p.abstract?.slice(0, 180)}...`;
    setAutoStory(s);
  }

  return (
    <div className="p-4 border rounded-md bg-white">
      <h3 className="font-semibold">Storytelling</h3>

      <div className="mt-3">
        <label className="block text-sm">Choose paper</label>
        <select
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
          className="mt-1 p-2 border rounded"
        >
          {filtered && filtered.map((p, i) => <option key={i} value={i}>{p.title?.slice(0,60) || `Paper ${i+1}`}</option>)}
        </select>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={() => generateAutoStory(paper)} className="px-3 py-1 rounded bg-green-600 text-white">Generate Automated Story</button>
        <a className="px-3 py-1 rounded border" href="#manual" onClick={(e)=>e.preventDefault()}>Show Manual Story</a>
      </div>

      {autoStory && (
        <div className="mt-4 p-3 bg-gray-50 rounded whitespace-pre-wrap">
          <strong>Automated narrative</strong>
          <p className="mt-2">{autoStory}</p>
        </div>
      )}

      <div id="manual" className="mt-4">
        <h4 className="font-medium">Manual story (example video)</h4>
        {/* Replace src with your manual video or embed */}
        <div className="mt-2">
          <iframe title="manual-story" width="100%" height="240" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
}
