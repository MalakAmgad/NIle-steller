// src/components/StoryModal.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { X, Volume2, Pause, Play, Square, Download, ImagePlus } from "lucide-react";

/** Split the story text into titled sections by blank lines or double spaces after a period */
const splitIntoSections = (story) => {
  if (!story) return [];
  const parts = story.split(/\n\n+|(?<=\.)\s{2,}/g).filter(Boolean).slice(0, 8);
  const defaultTitles = ["Background", "Objective", "Methods", "Results", "Implications"];
  return parts.map((t, i) => {
    const m = /^([A-Z][A-Za-z ]+):\s*/.exec(t); // honor "Title: ..." if present
    const title = m ? m[1] : defaultTitles[i] || `Scene ${i + 1}`;
    const text = (m ? t.slice(m[0].length) : t).trim();
    return { id: `sec-${i}`, title, text };
  });
};

/** Generate a clean SVG image that reflects subject/mission/instrument */
const makeSceneSVG = ({ title, text, subject, mission, instrument, width = 1280, height = 720 }) => {
  const safe = (s) => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const hue =
    subject && /micro/i.test(subject) ? 260 :
    subject && /flora|fauna/i.test(subject) ? 150 : 200;

  const footer = [subject || "", mission || "", instrument || ""].filter(Boolean).join(" • ");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue},70%,16%)"/>
      <stop offset="100%" stop-color="hsl(${hue},70%,28%)"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" />
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="table" tableValues="0 0.12"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" filter="url(#grain)" opacity="0.18"/>
  <g>
    <text x="50%" y="18%" text-anchor="middle" fill="#EAF2FF" font-family="Inter, system-ui" font-size="44" font-weight="700">${safe(title)}</text>
    <foreignObject x="8%" y="26%" width="84%" height="56%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="color:#E6F2F0;font-size:24px;line-height:1.4;font-family:Inter,system-ui">${safe(text.slice(0, 380))}</div>
    </foreignObject>
    <g fill="#D1FADF" font-family="Inter, system-ui" font-size="16" opacity="0.85">
      <text x="4%" y="${height - 40}">${safe(footer)}</text>
    </g>
  </g>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export default function StoryModal({
  open,
  onClose,
  title,
  story,
  scenes,         // optional structured scenes from the API
  loading,
  heroSrc,
  meta = {},      // expects fields like subject, mission, instrument (the selected paper)
}) {
  const navigate = useNavigate();

  // Prefer structured scenes; otherwise split the plain story string.
  const sections = React.useMemo(() => {
    if (Array.isArray(scenes) && scenes.length) {
      return scenes.map((s, i) => ({
        id: `sec-${i}`,
        title: s.title || `Scene ${i + 1}`,
        text: s.text || "",
      }));
    }
    return splitIntoSections(story);
  }, [scenes, story]);

  // Images
  const [images, setImages] = React.useState({}); // {sectionId: dataURI}
  const [genBusy, setGenBusy] = React.useState(false);

  // Generate images in-place (no navigation) — used by narration & by the open button if needed.
  const generateImagesOnly = async () => {
    if (!sections.length) return {};
    setGenBusy(true);
    try {
      const out = {};
      for (const sec of sections) {
        out[sec.id] = makeSceneSVG({
          title: sec.title,
          text: sec.text,
          subject: meta.subject,
          mission: meta.mission,
          instrument: meta.instrument,
        });
      }
      setImages(out);
      return out;
    } finally {
      setGenBusy(false);
    }
  };

  // Build payload and navigate to /storyboard
  const openStoryboard = (out) => {
    const payload = {
      title,
      heroSrc,
      meta,
      sections: sections.map((s) => ({ id: s.id, title: s.title, text: s.text })),
      images: out || images,
    };
    sessionStorage.setItem("storyboard_state", JSON.stringify(payload));
    // Close modal to avoid overlay flash (optional)
    onClose?.();
    navigate("/storyboard", { state: payload });
  };

  // Button handler: generate and open storyboard page
  const generateAllImagesAndOpen = async () => {
    if (!sections.length) return;
    const out = await generateImagesOnly();
    openStoryboard(out);
  };

  const regenerateOne = (sec) => {
    setImages((prev) => ({
      ...prev,
      [sec.id]: makeSceneSVG({
        title: sec.title,
        text: sec.text,
        subject: meta.subject,
        mission: meta.mission,
        instrument: meta.instrument,
      }),
    }));
  };

  // ===== Text-to-Speech (storybook narration) =====
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;
  const [isPlayingAll, setIsPlayingAll] = React.useState(false);
  const [currentIdx, setCurrentIdx] = React.useState(0);

  const speakOne = React.useCallback((i) => {
    if (!canSpeak || !sections[i]) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(`${sections[i].title}. ${sections[i].text}`);
    u.lang = "en-US";
    u.rate = 1.0;
    u.onend = () => {
      if (isPlayingAll) {
        const next = i + 1;
        if (next < sections.length) {
          setCurrentIdx(next);
          speakOne(next);
        } else {
          setIsPlayingAll(false);
        }
      }
    };
    window.speechSynthesis.speak(u);
  }, [sections, isPlayingAll, canSpeak]);

  const playAll = async () => {
    if (!canSpeak || !sections.length) return;
    if (Object.keys(images).length === 0) await generateImagesOnly(); // no navigation here
    setIsPlayingAll(true);
    setCurrentIdx(0);
    speakOne(0);
  };
  const pause = () => canSpeak && window.speechSynthesis.pause();
  const resume = () => canSpeak && window.speechSynthesis.resume();
  const stop = () => {
    if (canSpeak) window.speechSynthesis.cancel();
    setIsPlayingAll(false);
  };

  // Cancel narration when the modal closes
  React.useEffect(() => {
    if (!open && canSpeak) window.speechSynthesis.cancel();
  }, [open, canSpeak]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-[min(1100px,96vw)] max-h-[92vh] overflow-y-auto bg-slate-900 rounded-2xl border border-slate-700 p-4 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-slate-50">{title || "Story"}</h3>
            <p className="text-slate-400 text-sm mt-1">
              {meta.subject || "Space Bioscience"}
              {meta.mission ? ` • ${meta.mission}` : ""} {meta.instrument ? ` • ${meta.instrument}` : ""}
            </p>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="p-2 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Hero image */}
        {heroSrc && (
          <div className="relative h-52 md:h-64 lg:h-72 mt-3 overflow-hidden rounded-xl border border-slate-800">
            <img src={heroSrc} alt="hero" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {/* Generate → open storyboard */}
          <button
            type="button"
            onClick={generateImagesOnly}
            disabled={genBusy || !sections.length}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600/30 border border-purple-600/50 text-purple-100 hover:bg-purple-600/50 disabled:opacity-50"
            title="Generate one image per scene and open the Storyboard page"
          >
            <ImagePlus size={16} /> {genBusy ? "Generating…" : "Generate Images"}
          </button>

          {/* Open storyboard without re-generating (enabled only if images exist) */}
          <button
            type="button"
            onClick={() => openStoryboard()}
            disabled={!sections.length || !images || Object.keys(images).length === 0}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-600 text-slate-100 hover:bg-slate-700"
            title="Open Storyboard Page"
          >
            Open Storyboard Page
          </button>

          <button
            onClick={playAll}
            disabled={!canSpeak || !sections.length}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-600/30 border border-sky-600/50 text-sky-100 hover:bg-sky-600/50 disabled:opacity-50"
          >
            <Volume2 size={16} /> Play All
          </button>
          <button
            onClick={pause}
            disabled={!canSpeak}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-100 hover:bg-slate-700"
          >
            <Pause size={16} /> Pause
          </button>
          <button
            onClick={resume}
            disabled={!canSpeak}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-100 hover:bg-slate-700"
          >
            <Play size={16} /> Resume
          </button>
          <button
            onClick={stop}
            disabled={!canSpeak}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-100 hover:bg-slate-700"
          >
            <Square size={16} /> Stop
          </button>
          {loading && <span className="text-slate-400 text-sm ml-2">Preparing story…</span>}
        </div>

        {/* Scenes grid */}
        {!sections.length ? (
          <div className="text-slate-400 text-sm mt-6">
            Click <b>Show Story</b> on a paper card to generate a storyboard, then click <b>Generate Images</b>.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {sections.map((sec, i) => {
              const uri = images[sec.id];
              const isCurrent = i === currentIdx && isPlayingAll;
              return (
                <div
                  key={sec.id}
                  className={`bg-slate-800/60 border rounded-xl overflow-hidden ${
                    isCurrent ? "border-sky-400" : "border-slate-700"
                  }`}
                >
                  <div className="relative h-44">
                    {uri ? (
                      <img src={uri} alt={sec.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-900/70 flex items-center justify-center text-slate-500 text-sm">
                        No image yet
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-slate-100 font-semibold">{sec.title}</h4>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsPlayingAll(false);
                            setCurrentIdx(i);
                            speakOne(i);
                          }}
                          disabled={!canSpeak}
                          className="p-2 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-700"
                          title="Narrate this scene"
                        >
                          <Play size={16} />
                        </button>
                        <button
                          onClick={() => regenerateOne(sec)}
                          className="p-2 rounded-lg border border-purple-600/50 text-purple-200 hover:bg-purple-700/40"
                          title="Generate (or re-generate) this scene's image"
                        >
                          <ImagePlus size={16} />
                        </button>
                        {uri && (
                          <a
                            href={uri}
                            download={`${(title || "story").replace(/\s+/g, "_").toLowerCase()}_${i + 1}.png`}
                            className="p-2 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-700"
                            title="Download image"
                          >
                            <Download size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm mt-2">{sec.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
