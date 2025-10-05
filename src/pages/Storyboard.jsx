import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, Volume2, Pause, Play, Square, Download, Image as ImgIcon } from "lucide-react";

export default function Storyboard() {
  const nav = useNavigate();
  const loc = useLocation();

  // Accept state from navigation or recover from sessionStorage
  const incoming = loc.state || (() => {
    try { return JSON.parse(sessionStorage.getItem("storyboard_state") || "null"); } catch { return null; }
  })();

  const [payload, setPayload] = React.useState(incoming);
  const [story, setStory] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    if (!incoming) return;
    // Save so refresh keeps it
    sessionStorage.setItem("storyboard_state", JSON.stringify(incoming));
  }, [incoming]);

  if (!payload) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Storyboard</h1>
          <button onClick={() => nav(-1)} className="px-3 py-2 rounded-lg border border-slate-600">Back</button>
        </div>
        <p className="text-slate-400">No storyboard data found. Open a paper, click <b>Show Story → Generate Images</b> again.</p>
      </div>
    );
  }

  const { title, heroSrc, meta, sections, images } = payload;

  // ===== Text-to-Speech for final story =====
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;
  const speak = () => {
    if (!canSpeak || !story) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(story);
    u.lang = "en-US";
    u.rate = 1.0;
    window.speechSynthesis.speak(u);
  };
  const stop = () => canSpeak && window.speechSynthesis.cancel();

  // === Generate story based on the generated images (LLM-first, with local fallback)
  const generateStoryFromImages = async () => {
    setBusy(true);
    try {
      // If you add a vision model endpoint later, point here:
      const r = await fetch("/api/story_from_images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, meta, sections, images }),
      });

      if (r.ok) {
        const j = await r.json();
        setStory(j.storyText || "");
        return;
      }

      // Fallback (no vision API yet): compose from section texts we used to make images
      const fromSections = sections.map((s) => `${s.title}: ${s.text}`).join("\n\n");
      setStory(fromSections);
    } catch (e) {
      console.error(e);
      const fromSections = sections.map((s) => `${s.title}: ${s.text}`).join("\n\n");
      setStory(fromSections);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 text-slate-100">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{title || "Storyboard"}</h1>
          <p className="text-slate-400 text-sm mt-1">
            {meta?.subject || "Space Bioscience"}
            {meta?.mission ? ` • ${meta.mission}` : ""} {meta?.instrument ? ` • ${meta.instrument}` : ""}
          </p>
        </div>
        <button onClick={() => nav(-1)} className="p-2 rounded-lg border border-slate-700 hover:bg-slate-800" title="Close">
          <X size={18} />
        </button>
      </div>

      {heroSrc && (
        <div className="relative h-52 md:h-64 lg:h-72 mt-3 overflow-hidden rounded-xl border border-slate-800">
          <img src={heroSrc} alt="hero" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Images grid */}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={generateStoryFromImages}
          disabled={busy}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600/30 border border-purple-600/50 hover:bg-purple-600/50 disabled:opacity-50"
        >
          <ImgIcon size={16} /> {busy ? "Generating Story…" : "Generate Story from Images"}
        </button>
        {story && canSpeak && (
          <>
            <button onClick={speak} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-600/30 border border-sky-600/50 hover:bg-sky-600/50">
              <Volume2 size={16}/> Listen
            </button>
            <button onClick={stop} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 hover:bg-slate-700">
              <Square size={16}/> Stop
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {sections.map((sec, i) => (
          <div key={sec.id || i} className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden">
            <div className="relative h-48">
              <img src={images[sec.id]} alt={sec.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h4 className="text-slate-100 font-semibold">{sec.title}</h4>
                <a
                  href={images[sec.id]}
                  download={`${(title || "story").replace(/\s+/g, "_").toLowerCase()}_${i + 1}.png`}
                  className="p-2 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-700"
                  title="Download image"
                >
                  <Download size={16} />
                </a>
              </div>
              <p className="text-slate-300 text-sm mt-2">{sec.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Final story */}
      {story && (
        <div className="mt-6 bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-2">Story</h3>
          <p className="text-slate-200 whitespace-pre-wrap">{story}</p>
        </div>
      )}
    </div>
  );
}
