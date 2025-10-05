import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Dna,
  FlaskConical,
  Microscope,
  TestTubes,
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Headphones,
  MessageSquare,
} from "lucide-react";

/* ---------- TopBar & Footer styled like Hub ---------- */
function TopBarLike() {
  return (
    <div className="fixed top-0 inset-x-0 z-50 h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between backdrop-blur bg-[#050914]/70 border-b border-slate-800/60">
      <Link to="/" className="flex items-center gap-2 group">
        <span className="inline-block w-5 h-5 rounded-full border border-sky-400/50 bg-gradient-to-br from-sky-300/30 to-indigo-300/30 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.45)] transition" />
        <div className="leading-tight">
          <div className="text-white font-semibold">NileStellar</div>
          <div className="text-[11px] text-slate-300/80">— Space Biology Knowledge Engine</div>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <Link to="/" className="px-3 py-1.5 rounded-full border border-slate-300/30 text-slate-100 bg-white/0 hover:bg-white/5 transition">
          ← Home
        </Link>
        <Link to="/dashboard" className="px-3 py-1.5 rounded-full border border-sky-300/60 text-sky-100 bg-sky-400/10 hover:bg-sky-400/20 transition">
          Dashboard
        </Link>
      </div>
    </div>
  );
}

function SiteFooterLike() {
  return (
    <footer className="mt-16 mx-auto max-w-7xl px-4 pb-10 pt-6 border-t border-slate-800/60">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-300">
        <p>Techno — Created for NASA Space Apps 2025 · Web Design ©2025</p>
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 h-5 rounded-full border border-sky-400/40 bg-gradient-to-br from-sky-300/30 to-indigo-300/30" />
          <span className="text-slate-200">NileStellar</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Panel ---------- */
const Panel = React.memo(function Panel({ id, title, kicker, body, img, align = "left", active }) {
  return (
    <section id={id} className="min-h-[100svh] grid md:grid-cols-2 items-center gap-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: active ? 1 : 0.35, y: active ? 0 : 10 }}
        transition={{ duration: 0.6 }}
        className={`${align === "left" ? "order-1" : "order-2"} w-full`}
      >
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <img src={img} alt={title} className="w-full h-[52svh] object-cover" loading="lazy" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: active ? 1 : 0.6, y: active ? 0 : 10 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={`${align === "left" ? "order-2" : "order-1"} w-full`}
      >
        <p className="text-sm uppercase tracking-widest text-sky-400/90 font-semibold">{kicker}</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">{title}</h2>
        <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">{body}</p>
      </motion.div>
    </section>
  );
});

/* ---------- Page with Narration + Hub backdrop ---------- */
export default function MicrobiologyStory() {
  const sections = [
    {
      id: "intro",
      icon: <Microscope size={18} />,
      step: "Sterile Workflow",
      kicker: "Wet Lab • Aseptic Technique",
      title: "Setting up a Clean Bench",
      body:
        "We prep a Class II biosafety cabinet: 70% ethanol wipe-down, a stable sterile zone, and labeled disposables. Start with controls, then samples. Gloves on; limit movement and talking to reduce turbulence.",
      img: "/story/micro-1.jpg",
      align: "left",
    },
    {
      id: "cultures",
      icon: <TestTubes size={18} />,
      step: "Cultures",
      kicker: "Agar Plates • Colony Morphology",
      title: "Streak, Incubate, Inspect",
      body:
        "Streak for isolated colonies, incubate at the organism’s preferred temperature, then assess morphology—shape, elevation, color, and hemolysis. Pick a single colony to maintain purity.",
      img: "/story/micro-2.jpg",
      align: "right",
    },
    {
      id: "stain",
      icon: <Microscope size={18} />,
      step: "Gram Stain",
      kicker: "Crystal Violet • Safranin",
      title: "Classifying Cell Walls",
      body:
        "Fix the smear, stain with crystal violet, iodine, decolorize, then counterstain. Gram-positive retain violet; Gram-negative appear pink. This informs antibiotic strategy and isolation steps.",
      img: "/story/micro-3.jpg",
      align: "left",
    },
    {
      id: "crispr",
      icon: <Dna size={18} />,
      step: "CRISPR Edit",
      kicker: "Guide RNA • Donor Template",
      title: "Design → Deliver → Select",
      body:
        "Design a specific gRNA, choose the right Cas variant, and include a donor template for HDR if needed. Deliver via plasmid or RNP. Screen candidates by PCR and confirm with Sanger or NGS.",
      img: "/story/micro-4.jpg",
      align: "right",
    },
    {
      id: "scale",
      icon: <FlaskConical size={18} />,
      step: "Scale & Safety",
      kicker: "Bioreactor • BSL Compliance",
      title: "From Bench to Bioreactor",
      body:
        "Scale to shake flasks or bioreactors. Track OD600, pH, dissolved oxygen, and sterility checks. Log waste decontamination and follow BSL policies, PPE requirements, and incident reporting.",
      img: "/story/micro-5.jpg",
      align: "left",
    },
  ];

  const narrationScripts = useMemo(
    () => [
      "Welcome to the Microbiology and Genetic Engineering lab. First, we set up a sterile workspace. Ethanol wipe-down, stable airflow, and labeled disposables keep contamination low. Controls first, then samples.",
      "Time to culture. Streak the plate for single colonies, incubate at the right temperature, then inspect morphology. Choose one clean colony to stay pure for downstream work.",
      "Let’s Gram stain. Crystal violet, iodine, decolorize, then safranin. Gram-positive cells stay violet; Gram-negative turn pink. This classification guides your antibiotic choices.",
      "Now CRISPR. Design a specific guide RNA, pick the Cas enzyme, and include a donor template if you want HDR. Deliver the edit, then screen by PCR and confirm by sequencing.",
      "Scale up with care. Move to flasks or a bioreactor, watching OD600, pH, and dissolved oxygen. Keep strict BSL compliance, document waste handling, and maintain a sterile process.",
    ],
    []
  );

  const audioSrcs = useMemo(
    () => ["/audio/micro-1.mp3", "/audio/micro-2.mp3", "/audio/micro-3.mp3", "/audio/micro-4.mp3", "/audio/micro-5.mp3"],
    []
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const refs = useRef([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState("tts"); // 'tts' | 'audio'
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [controlsOpen, setControlsOpen] = useState(false);

  useEffect(() => {
    const prev = document.title;
    document.title = "Microbiology & Genetic Engineering — Space Bio";
    return () => (document.title = prev);
  }, []);

  useEffect(() => {
    refs.current = refs.current.slice(0, sections.length);
    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) {
          const idx = refs.current.findIndex((r) => r === top.target);
          if (idx !== -1) setActiveIdx(idx);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "0px 0px -20% 0px" }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [sections.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  const stopNarration = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const speakCurrent = async () => {
    stopNarration();
    if (mode === "audio" && audioRef.current) {
      audioRef.current.src = audioSrcs[activeIdx];
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }
    const text = narrationScripts[activeIdx] || "";
    if (!text || !("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 1.0;
    u.pitch = 1.0;
    u.volume = muted ? 0 : volume;
    u.onend = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    if (isPlaying) speakCurrent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, mode]);

  const go = (dir) => {
    const next = Math.min(Math.max(activeIdx + dir, 0), sections.length - 1);
    const target = refs.current[next];
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopNarration();
    } else {
      setIsPlaying(true);
      speakCurrent();
    }
  };

  const toggleMode = () => {
    setMode((m) => (m === "tts" ? "audio" : "tts"));
    setIsPlaying(false);
    stopNarration();
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* ===== Background like Hub ===== */}
      <div className="absolute inset-0 -z-10">
        {/* hero image (use the same you used on Hub, or replace with your own) */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://c02.purpledshub.com/uploads/sites/48/2024/06/facts-space-and-astronomy.jpg?w=1029&webp=1')",
          }}
        />
        {/* dark vertical gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,20,0.35)_0%,rgba(5,9,20,0.75)_70%,rgba(5,9,20,0.9)_100%)]" />
        {/* radial mask fade */}
        <div className="absolute inset-0 [mask-image:radial-gradient(120%_80%_at_50%_0%,black_60%,transparent_100%)] bg-black/20" />
      </div>

      {/* subtle frame like Hub */}
      <div className="pointer-events-none absolute inset-4 -z-0 rounded-3xl border border-slate-200/15" />

      {/* fixed header */}
      <TopBarLike />

      {/* spacer for fixed header */}
      <div className="h-14" />

      {/* hidden audio element */}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} preload="none" />

      {/* title */}
      <header className="mx-auto max-w-7xl px-4 pt-6 pb-2 text-center">
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Microbiology & Genetic Engineering
        </motion.h1>
        <p className="mt-2 text-slate-200/85 text-sm">Wet lab • Cultures • CRISPR • Narrated Journey</p>
      </header>

      {/* floating narration pill */}
      <div className="fixed right-4 bottom-24 z-40">
        <div className="rounded-full backdrop-blur bg-white/5 border border-white/15 px-3 py-2 flex items-center gap-2 shadow-lg">
          <button onClick={toggleMode} className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-slate-300/30 hover:bg-white/5 text-xs" title={mode === "tts" ? "Switch to Audio files" : "Switch to Text-to-Speech"}>
            {mode === "tts" ? <MessageSquare size={14} /> : <Headphones size={14} />}
            {mode === "tts" ? "TTS" : "Audio"}
          </button>
          <button onClick={() => go(-1)} className="px-2 py-1 rounded-full border border-white/15 hover:bg-white/10 text-xs" title="Prev"><ArrowLeft size={14} /></button>
          <button onClick={togglePlay} className="px-2 py-1 rounded-full border border-white/15 hover:bg-white/10 text-xs" title={isPlaying ? "Pause" : "Play"}>{isPlaying ? <Pause size={14} /> : <Play size={14} />}</button>
          <button onClick={() => go(1)} className="px-2 py-1 rounded-full border border-white/15 hover:bg-white/10 text-xs" title="Next"><ArrowRight size={14} /></button>
          <button onClick={() => setMuted((m) => !m)} className="px-2 py-1 rounded-full border border-white/15 hover:bg-white/10 text-xs" title={muted ? "Unmute" : "Mute"}>{muted ? <VolumeX size={14} /> : <Volume2 size={14} />}</button>
          <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-20 accent-sky-400" title="Volume" />
        </div>
      </div>

      {/* progress bar */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-6 flex items-center gap-3">
          {sections.map((s, i) => (
            <div key={s.id} className="flex-1">
              <div className={`h-1 rounded-full transition-all ${i <= activeIdx ? "bg-sky-400" : "bg-white/15"}`} />
              <div className="mt-2 flex items-center gap-2 text-xs text-white/70">
                <span className={`w-5 h-5 grid place-items-center rounded-full border ${i === activeIdx ? "bg-sky-500 text-black border-sky-400" : "border-white/25"}`}>
                  {s.icon}
                </span>
                <span className={`${i === activeIdx ? "text-white" : ""}`}>{s.step}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* panels */}
      <main className="mx-auto max-w-6xl px-4 space-y-2">
        {sections.map((sec, i) => (
          <div key={sec.id} ref={(el) => (refs.current[i] = el)}>
            <Panel {...sec} active={i === activeIdx} />
          </div>
        ))}
      </main>

      {/* sticky pager */}
      <div className="sticky bottom-4 z-40">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex justify-between">
            <button onClick={() => go(-1)} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/15">
              <ArrowLeft size={16} /> Prev
            </button>
            <button onClick={() => go(1)} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-sky-500/90 hover:bg-sky-400 text-black">
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* footer like Hub */}
      <SiteFooterLike />
    </div>
  );
}
