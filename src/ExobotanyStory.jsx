// src/pages/ExobotanyStory.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

/** -------------------------------------------------------------
 * ExobotanyStory.jsx — Two-voice, book-style adventure
 * - Elara (higher/clear) + Rafe (deeper) narration 
 * - Dialogue is read line-by-line when you change scenes
 * - Left: image page (carousel); Right: text page
 * - Fixed TopBar/Footer, Back button, Prev/Next pager
 * - Progress ring, narration toggle, subtle SFX (optional)
 * Route: /adventure/exobotany
 * ------------------------------------------------------------- */

/* ---------------- UI chrome ---------------- */
function TopBar() {
  return (
    <div className="fixed top-0 inset-x-0 z-50 h-14 px-4 sm:px-6 lg:px-8
                    flex items-center justify-between
                    backdrop-blur bg-[#050914]/70 border-b border-slate-800/60">
      <Link to="/" className="flex items-center gap-2 group">
        <span className="inline-block w-5 h-5 rounded-full border border-sky-400/50
                         bg-gradient-to-br from-sky-300/30 to-indigo-300/30
                         group-hover:shadow-[0_0_18px_rgba(56,189,248,0.45)] transition" />
        <div className="leading-tight">
          <div className="text-white font-semibold">NileStellar</div>
          <div className="text-[11px] text-slate-300/80">— Space Biology Knowledge Engine</div>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="px-3 py-1.5 rounded-full border border-slate-300/30 text-slate-100 bg-white/0 hover:bg-white/5 transition">
          ← Home
        </Link>
        <Link
          to="/dashboard"
          className="px-3 py-1.5 rounded-full border border-sky-300/60 text-sky-100
                     bg-sky-400/10 hover:bg-sky-400/20 transition">
          Dashboard
        </Link>
      </div>
    </div>
  );
}

function SiteFooter() {
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

/* ---------------- Story data ----------------
   Each scene has:
   - title
   - images: array of left-page image URLs
   - script: array of { speaker: "elara" | "rafe" | "narrator", text: string }
-------------------------------------------------*/
const SCENES = [
  {
    id: "s1",
    title: "Docking at the Greenhouse",
    images: ["/story/exo-1.jpg", "/story /exo-1b.jpg", "/story /exo-1c.jpg"],
    script: [
      { speaker: "narrator", text: "The orbital greenhouse floats like a lantern above the blue limb of Earth." },
      { speaker: "elara", text: "Rows of unfamiliar flora—look at the leaf venation. These aren’t on the charts, Commander." },
      { speaker: "rafe", text: "That’s why you’re here, Doctor Myles. If anyone can coax secrets from alien plants, it’s you." },
      { speaker: "narrator", text: "Fans whisper. A scent of chlorophyll and stainless steel hangs in the airlock." },
    ],
  },
  {
    id: "s2",
    title: "Inside: Capillary Gardens",
    images: ["/story /exo-2.jpg", "/story /exo-2b.jpg", "/story /exo-2c.jpg"],
    script: [
      { speaker: "elara", text: "Wicking substrate, aeroponic misters, trace-gas scrubbers… elegant. But these roots aren’t drinking evenly." },
      { speaker: "rafe", text: "Sensors?" },
      { speaker: "elara", text: "Dry pocket near the trellis. Without gravity, water is the map. We need a thicker wick run and a gentler mist pulse." },
      { speaker: "narrator", text: "Moisture readouts flicker; a tiny droplet clings, refusing to drift free." },
    ],
  },
  {
    id: "s3",
    title: "Spectral Tuning",
    images: ["/story /exo-3.jpg", "/story /exo-3b.jpg"],
    script: [
      { speaker: "rafe", text: "Power budget says we can tweak the LED mix—briefly." },
      { speaker: "elara", text: "Shifting blue down, red steady. If these evolved off-world, their photosystems may prefer a different day." },
      { speaker: "narrator", text: "Leaves ease; stomata open and sigh. Chime-bright pods respond with a soft, crystalline hum." },
    ],
  },
  {
    id: "s4",
    title: "Breath of a Garden",
    images: ["/story /exo-4.jpg", " /story /exo-4b.jpg", "/story /exo-4c.jpg"],
    script: [
      { speaker: "elara", text: "Trace ethylene detected. That’ll stress them in closed loops." },
      { speaker: "rafe", text: "Scrubbers online. Cycling now." },
      { speaker: "narrator", text: "Gas levels fall. Veins glow like quiet star maps beneath a translucent cuticle." },
      { speaker: "elara", text: "Better. Now let’s pulse the aeroponics—droplets captured by fibers, nowhere to float." },
    ],
  },
  {
    id: "s5",
    title: "First Bloom in Orbit",
    images: ["/story /exo-5.jpg", "/story /exo-5b.jpg"],
    script: [
      { speaker: "narrator", text: "Waterlines even out. Chlorophyll sings a note you feel more than hear." },
      { speaker: "rafe", text: "There—open flower, star-yellow. First this week." },
      { speaker: "elara", text: "Pollination in micro-g: a gentle fan, a soft brush. One day, these could feed crews bound further than charts." },
    ],
  },
  {
    id: "s6",
    title: "Night Cycle",
    images: ["/story /exo-6.jpg", "/story /exo-6b.jpg", "/story /exo-6c.jpg"],
    script: [
      { speaker: "rafe", text: "Systems green. Crew morale up. You’ve done good work, Elara." },
      { speaker: "elara", text: "Out here, every seed holds a universe of possibility." },
      { speaker: "narrator", text: "The greenhouse dims to an evening hush. Plants glow like constellations you can touch." },
    ],
  },
];

const THEME = {
  grad: "from-emerald-400 to-sky-400",
  ringColor: "#34d399", // emerald-400
  ringTrack: "rgba(148, 163, 184, .25)",
};

/* ---------------- Web Speech: dual voices ----------------
   - Picks a deeper voice for Rafe, a clearer/lighter one for Elara
   - Reads the current scene script line-by-line
-----------------------------------------------------------*/
function useSpeechDual({ defaultEnabled = true } = {}) {
  const [enabled, setEnabled] = React.useState(defaultEnabled);
  const voicesRef = React.useRef({ elara: null, rafe: null, narrator: null });
  const chainRef = React.useRef({ active: false, stop: () => {} });

  // voice pickers
  const pickVoices = React.useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const voices = synth.getVoices?.() || [];

    const find = (prefs) => {
      for (const re of prefs) {
        const v = voices.find((vv) => re.test(vv.name));
        if (v) return v;
      }
      return null;
    };

    // Try to bias: Rafe = deep male, Elara = clear/bright female, Narr = neutral
    const rafe =
      find([/Matthew/i, /Michael/i, /Guy/i, /Daniel/i, /David/i, /Brian/i, /Google UK English Male/i]) ||
      voices.find(v => /en-/i.test(v.lang) && /male/i.test(v.name)) ||
      voices[0] || null;

    const elara =
      find([/Joanna/i, /Sophia/i, /Olivia/i, /Aria/i, /Charlotte/i, /Amy/i, /Google UK English Female/i]) ||
      voices.find(v => /en-/i.test(v.lang) && /female/i.test(v.name)) ||
      voices[1] || rafe || null;

    const narrator =
      find([/Emma/i, /Salli/i, /Narrator/i]) ||
      voices.find(v => /en-/i.test(v.lang) && v !== elara && v !== rafe) ||
      elara || rafe || null;

    voicesRef.current = { elara, rafe, narrator };
  }, []);

  React.useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;

    const init = () => {
      pickVoices();
      if (enabled) {
        try {
          const noop = new SpeechSynthesisUtterance(" ");
          noop.volume = 0; synth.speak(noop);
        } catch {}
      }
    };

    synth.onvoiceschanged = init;
    init();
    return () => { synth.onvoiceschanged = null; synth.cancel(); };
  }, [enabled, pickVoices]);

  const speakScene = React.useCallback((script = []) => {
    if (!enabled || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    try { synth.cancel(); } catch {}

    let cancelled = false;
    const stop = () => { cancelled = true; try { synth.cancel(); } catch {} };
    chainRef.current.stop(); // stop any previous chain
    chainRef.current = { active: true, stop };

    const next = (i) => {
      if (cancelled || i >= script.length) { chainRef.current.active = false; return; }
      const line = script[i];
      const u = new SpeechSynthesisUtterance(line.text);

      // assign voice + feel
      if (line.speaker === "rafe") {
        u.voice = voicesRef.current.rafe || null;
        u.pitch = 0.85; u.rate = 0.95; u.volume = 1.0;
      } else if (line.speaker === "elara") {
        u.voice = voicesRef.current.elara || null;
        u.pitch = 1.1; u.rate = 1.02; u.volume = 1.0;
      } else {
        u.voice = voicesRef.current.narrator || null;
        u.pitch = 1.0; u.rate = 0.98; u.volume = 1.0;
      }
      u.lang = (u.voice && u.voice.lang) || "en-US";

      u.onend = () => next(i + 1);
      try { synth.speak(u); } catch { next(i + 1); }
    };

    next(0);
    return stop;
  }, [enabled]);

  // external API
  const stopAll = React.useCallback(() => {
    chainRef.current.stop?.();
  }, []);

  return { enabled, setEnabled, speakScene, stopAll };
}

/* ---------------- Tiny SFX (optional) ---------------- */
function useSfx() {
  const clickRef = React.useRef(null);
  React.useEffect(() => {
    try {
      clickRef.current = new Audio("/sfx/click.mp3");
      clickRef.current.volume = 0.35;
    } catch {}
  }, []);
  const click = React.useCallback(() => clickRef.current?.play().catch(() => {}), []);
  return { click };
}

/* ---------------- Helpers ---------------- */
function ringStyle(pct, color = THEME.ringColor, track = THEME.ringTrack) {
  const deg = Math.max(0, Math.min(100, pct)) * 3.6;
  return { background: `conic-gradient(${color} ${deg}deg, ${track} ${deg}deg)` };
}

/* ---------------- Page ---------------- */
export default function ExobotanyStory() {
  const nav = useNavigate();
  const [idx, setIdx] = React.useState(0);
  const scene = SCENES[idx];
  const pct = Math.round((idx / (SCENES.length - 1)) * 100);
  const { enabled, setEnabled, speakScene, stopAll } = useSpeechDual({ defaultEnabled: true });
  const { click } = useSfx();

  // image carousel per scene
  const [imgI, setImgI] = React.useState(0);
  React.useEffect(() => {
    setImgI(0);
    const id = setInterval(() => {
      setImgI((i) => (scene.images?.length ? (i + 1) % scene.images.length : 0));
    }, 3800);
    return () => clearInterval(id);
  }, [idx, scene.images]);

  // read current scene (line-by-line) whenever idx changes
  React.useEffect(() => {
    stopAll();
    if (enabled && scene?.script) speakScene(scene.script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, enabled]);

  // attempt a second kick on mount in case voices load late
  React.useEffect(() => {
    const t = setTimeout(() => {
      if (idx === 0 && enabled && scene?.script) speakScene(scene.script);
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prev = () => { click(); setIdx((i) => Math.max(0, i - 1)); };
  const next = () => { click(); setIdx((i) => Math.min(SCENES.length - 1, i + 1)); };

  return (
    <div className="min-h-screen w-full text-slate-100 relative overflow-hidden flex flex-col">
      <TopBar />

      {/* Background wash */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-center bg-cover bg-no-repeat"
             style={{ backgroundImage: "url('/exobotany.png')" }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,20,.35)_0%,rgba(5,9,20,.88)_100%)]" />
      </div>

      <main className="flex-1 pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-4">

          {/* HERO / title card */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/40">
            <div className="w-full h-[220px] md:h-[260px] bg-cover bg-center"
                 style={{ backgroundImage: `url('${scene.images?.[0] || "/exobotany.png"}')` }} />
            <div className="absolute inset-x-0 bottom-0 bg-black/55 backdrop-blur px-5 py-3">
              <div className="text-lg md:text-xl font-semibold">Exobotany in Orbit</div>
              <div className="text-sm text-slate-300">by: Mena Osman</div>
            </div>
          </div>

          {/* Top controls */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => nav(-1)}
                className="px-3 py-1.5 rounded-full border border-slate-300/30 hover:bg-white/5">
                ← Back
              </button>

              <div className="relative w-10 h-10 rounded-full" style={ringStyle(pct)}>
                <div className="absolute inset-[3px] rounded-full bg-slate-900/70 grid place-items-center text-xs">
                  {pct}%
                </div>
              </div>

              <h1 className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent
                             bg-gradient-to-r from-emerald-300 to-sky-300">
                {scene.title}
              </h1>
            </div>

            <button
              onClick={() => {
                const nextState = !enabled;
                setEnabled(nextState);
                stopAll();
                if (nextState && scene?.script) speakScene(scene.script);
              }}
              className={[
                "px-3 py-1.5 rounded-full border text-sm transition",
                enabled
                  ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-100"
                  : "border-slate-300/30 hover:bg-white/5"
              ].join(" ")}
            >
              {enabled ? "🔊 Narration On" : "🔈 Narration Off"}
            </button>
          </div>

          {/* Book spread */}
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.28 }}
            className="mt-6 grid md:grid-cols-2 gap-6 items-start"
          >
            {/* Left page: image with subtle carousel */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40">
              <div className="w-full h-[320px] md:h-[420px] bg-cover bg-center transition-all"
                   style={{ backgroundImage: `url('${scene.images?.[imgI] || "/exobotany.png"}')` }} />
              <div className="absolute left-3 top-3 text-[11px] px-2 py-1 rounded-full border border-emerald-300/50 bg-black/40">
                {imgI + 1}/{scene.images?.length || 1}
              </div>
              <Sparkles className="absolute top-3 right-3 w-4 h-4 text-emerald-200/70" />
            </div>

            {/* Right page: dialogue */}
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-2xl opacity-60 blur-2xl
                              bg-gradient-to-r from-emerald-400/10 to-sky-400/10 pointer-events-none" />
              <div className="relative rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <ul className="space-y-3">
                  {scene.script.map((line, i) => (
                    <li key={i} className="leading-relaxed">
                      <span className={[
                        "mr-2 inline-block px-2 py-0.5 rounded-full text-[11px] align-middle",
                        line.speaker === "elara" && "border border-emerald-300/60 bg-emerald-400/10",
                        line.speaker === "rafe" && "border border-sky-300/60 bg-sky-400/10",
                        line.speaker === "narrator" && "border border-slate-400/40 bg-slate-500/10"
                      ].filter(Boolean).join(" ")}>
                        {line.speaker === "elara" ? "Elara" : line.speaker === "rafe" ? "Rafe" : "Narrator"}
                      </span>
                      <span className="text-slate-200">{line.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Pager */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={idx === 0}
              className="px-4 py-2 rounded-full border border-slate-300/40 hover:bg-white/5 disabled:opacity-40">
              ← Previous
            </button>
            <button
              onClick={next}
              disabled={idx === SCENES.length - 1}
              className="px-4 py-2 rounded-full border border-emerald-300/60 bg-emerald-400/10 hover:bg-emerald-400/20 disabled:opacity-40">
              Next →
            </button>
          </div>

          {/* End screen (when last scene is visible) */}
          <AnimatePresence>
            {idx === SCENES.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 text-center"
              >
                <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-sky-300">
                  Mission Complete 🌼
                </h2>
                <p className="mt-2 text-slate-300">
                  First bloom logged, systems stable, crew morale +5. Ready for another grow cycle?
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/adventure"
                    className="px-5 py-2 rounded-full border border-slate-300/40 hover:bg-white/5">
                    Back to Adventure
                  </Link>
                  <button
                    onClick={() => setIdx(0)}
                    className="px-5 py-2 rounded-full border text-sky-100
                               border-emerald-300/60 bg-emerald-400/10 hover:bg-emerald-400/20">
                    Replay Story
                  </button>
                </div>

                {/* Themed marquee */}
                <div className="mt-6 relative h-8 overflow-hidden rounded-full border border-slate-800">
                  <motion.div
                    className="absolute inset-y-0 left-0 flex items-center gap-8 px-4 text-slate-300 text-sm whitespace-nowrap"
                    initial={{ x: 0 }}
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  >
                    🌱 Wicks, light, and capillary magic • 🚿 Misters that don’t escape • 🌼 Pollinate the stars • 🛰️ Grow food off-world
                    <span className="mx-8">|</span>
                    🌱 Wicks, light, and capillary magic • 🚿 Misters that don’t escape • 🌼 Pollinate the stars • 🛰️ Grow food off-world
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
