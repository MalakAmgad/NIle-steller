import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mic, MicOff, Play, Pause, ArrowLeft, ArrowRight } from "lucide-react";

/* ---------- Hub-styled TopBar & Footer ---------- */
function TopBarLike() {
  return (
    <div className="fixed top-0 inset-x-0 z-50 h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between backdrop-blur bg-[#050914]/70 border-b border-slate-800/60">
      <Link to="/" className="flex items-center gap-2 group" aria-label="NileStellar Home">
        <span className="inline-block w-5 h-5 rounded-full border border-sky-400/50 bg-gradient-to-br from-sky-300/30 to-indigo-300/30 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.45)] transition" />
        <div className="leading-tight">
          <div className="text-white font-semibold">NileStellar</div>
          <div className="text-[11px] text-slate-300/80">— Space Biology Knowledge Engine</div>
        </div>
      </Link>
      <div className="hidden sm:block text-slate-100 font-medium">
        Astrobiology &amp; Human Adaptation — The Final Adventure
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="px-3 py-1.5 rounded-full border border-slate-300/30 text-slate-100 bg-white/0 hover:bg-white/5 transition"
        >
          ← Home
        </Link>
        <Link
          to="/dashboard"
          className="px-3 py-1.5 rounded-full border border-sky-300/60 text-sky-100 bg-sky-400/10 hover:bg-sky-400/20 transition"
        >
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

/* ---------- Tile ---------- */
function Tile({
  img,
  title,
  body,
  emphasis = false,
  align = "left",
  rtl = false,
  objPos = "50% 50%",   // NEW
  aspect,               // NEW
}) {
  const textAlign = rtl
    ? align === "right"
      ? "items-end text-left"
      : "items-end text-right"
    : align === "right"
    ? "justify-end items-end text-right"
    : "items-end";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20"
      style={{ aspectRatio: aspect || (emphasis ? "16 / 6.5" : "16 / 9") }}
    >
      {img && (
        <img
          src={img}
          alt={title || "scene"}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          style={{ objectPosition: objPos }}   // << focal point fix
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
      <div className={`absolute inset-0 p-5 sm:p-6 flex ${textAlign} pointer-events-none`}>
        <div className="max-w-[32rem]">
          {title && (
            <h3 className={`font-semibold ${emphasis ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"} drop-shadow`}>
              {title}
            </h3>
          )}
          {body && <p className="mt-2 text-sm sm:text-base text-white/85 leading-relaxed">{body}</p>}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Page ---------- */
export default function AstrobiologyStory() {
  const [lang, setLang] = useState("en");
  const rtl = lang === "ar";

  useEffect(() => {
    const prev = document.title;
    document.title =
      lang === "en"
        ? "Astrobiology & Human Adaptation — Space Bio"
        : "علم الأحياء الفلكي وتكيّف الإنسان — مغامرة النهاية";
    return () => (document.title = prev);
  }, [lang]);

  const t = useMemo(() => {
    if (lang === "ar") {
      return {
        title: "علم الأحياء الفلكي وتكيّف الإنسان — مغامرة النهاية",
        back: "العودة إلى المركز",
        narration: "السرد الصوتي",
        play: "تشغيل",
        pause: "إيقاف",
        tiles: [
          { img: "/story/astro-orbit.jpg", title: "الرحيل", body: "لا تبدأ حكايتنا بوجهة، بل بوداع. يبهت دفء الأرض ونحن ننطلق في رحلة الهجرة البشرية الكبرى.", emphasis: true, align: "left" },
          { img: "/story/astro-dna-1.jpg", emphasis: true, align: "left" },
          { img: "/story/astro-mars-dome.jpg", align: "left" },
          { img: "/story/astro-dna-2.jpg", title: "المِحَن الكونية", body: "بيننا وبين أوطاننا الجديدة إشعاع وعُزلة وهجوم الجاذبية الصغرى الصامت على الأجساد. التكيّف ليس خيارًا، بل نجاة.", align: "left" },
          { img: "/story/astro-first-steps.jpg", title: "الخطوات الأولى على المريخ", body: "وصلنا. هواءٌ رقيق، سماءٌ جديدة، وغبار غريب. تبدأ الأعمال: مساكن، دعم حياة، وروتين يومٍ بجاذبية مختلفة.", align: "right" },
          { img: "/story/astro-lab.jpg", align: "left" },
          { img: "/story/astro-biosphere.jpg", title: "المحيط الحيوي المُهندَس", body: "لا نزرع طعامًا فقط؛ بل نُنشئ نظمًا بيئية...", align: "right" },
          { img: "/story/astro-human-scan.jpg", align: "left" },
          { img: "/story/astro-human-team.jpg", title: "المعادلة البشرية", body: "كي نزدهر، نصبح مهندسي الحياة نفسها...", align: "left" },
          { img: "/story/astro-eva.jpg", title: "التكيّف الأعظم", body: "مع كل نشاطٍ خارج المركبة، نصير من السكان لا الضيوف...", align: "right" },
        ],
      };
    }

    // English
    return {
      title: "Astrobiology & Human Adaptation — The Final Adventure",
      back: "Back to Hub",
      narration: "Voice Narration",
      play: "Play",
      pause: "Pause",
      tiles: [
        { img: "/story/astro-orbit.jpg", title: "The Departure", body: "Our story begins not with a destination, but a farewell. Earth’s warmth fades as we embark on the great human migration.", emphasis: true, align: "left" },
        { img: "/story/astro-dna-1.jpg", emphasis: true, align: "left" },
        { img: "/story/astro-mars-dome.jpg",align: "left" },  // FIXED TILE
        { img: "/story/astro-dna-2.jpg", title: "The Cosmic Gauntlet", body: "Between us and our new homes lie radiation, isolation, and microgravity’s quiet assault. Adaptation isn’t optional—it’s survival.", align: "left" },
        { img: "/story/astro-first-steps.jpg", title: "First Steps on Mars", body: "Arrival. Thin air, new skies, and alien dust...", align: "right" },
        { img: "/story/astro-lab.jpg", align: "left" },
        { img: "/story/astro-biosphere.jpg", title: "The Engineered Biosphere", body: "We don’t just grow food; we grow ecosystems...", align: "right" },
        { img: "/story/astro-human-scan.jpg", align: "left" },
        { img: "/story/astro-human-team.jpg", title: "The Human Equation", body: "To thrive, we become architects of life itself...", align: "left" },
        { img: "/story/astro-eva.jpg", title: "The Ultimate Adaptation", body: "With each EVA and each sol, we turn from visitors into natives...", align: "right" },
      ],
    };
  }, [lang]);

  const narration = useMemo(
    () => t.tiles.map((s) => [s.title, s.body].filter(Boolean).join(". ").trim()),
    [t]
  );

  const [idx, setIdx] = useState(0);
  const [narrationOn, setNarrationOn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const stopSpeak = () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  const speak = (text) => {
    if (!("speechSynthesis" in window) || !text) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "ar" ? "ar-EG" : "en-US";
    u.rate = 1.0; u.pitch = 1.0;
    u.onend = () => {
      setIsPlaying(false);
      if (narrationOn && idx < narration.length - 1) {
        setIdx((i) => i + 1);
        setTimeout(() => setIsPlaying(true), 150);
      }
    };
    window.speechSynthesis.speak(u);
  };

  useEffect(() => { stopSpeak(); setIsPlaying(false); setIdx(0); }, [lang]);
  useEffect(() => { if (narrationOn && isPlaying) { stopSpeak(); speak(narration[idx]); } return () => stopSpeak(); }, [idx, narrationOn, isPlaying, lang]);

  return (
    <div className="relative min-h-screen text-white" dir={rtl ? "rtl" : "ltr"}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('https://c02.purpledshub.com/uploads/sites/48/2024/06/facts-space-and-astronomy.jpg?w=1029&webp=1')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,20,0.35)_0%,rgba(5,9,20,0.75)_70%,rgba(5,9,20,0.9)_100%)]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(120%_80%_at_50%_0%,black_60%,transparent_100%)] bg-black/20" />
      </div>

      <div className="pointer-events-none absolute inset-4 -z-0 rounded-3xl border border-slate-200/15" />

      <TopBarLike />
      <div className="h-14" />

      {/* Header row */}
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-2 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold">{t.title}</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang((l) => (l === "en" ? "ar" : "en"))} className="px-3 py-1.5 rounded-full border border-white/15 hover:bg-white/10 text-sm">
            {lang === "en" ? "AR" : "EN"}
          </button>

          <label className="flex items-center gap-2 text-sm text-slate-200/90">
            {narrationOn ? <Mic size={16} /> : <MicOff size={16} />}
            {t.narration}
            <span onClick={() => { setNarrationOn((v) => !v); stopSpeak(); setIsPlaying(false); }}
              className={`ml-2 inline-flex h-6 w-10 items-center rounded-full border border-white/15 cursor-pointer ${narrationOn ? "bg-sky-500/80" : "bg-white/10"}`}>
              <span className={`h-5 w-5 rounded-full bg-white transition-transform mx-0.5 ${narrationOn ? "translate-x-4" : "translate-x-0"}`} />
            </span>
          </label>

          <button onClick={() => narrationOn && setIsPlaying((p) => !p)} disabled={!narrationOn}
            className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 hover:bg-white/10 disabled:opacity-40 text-sm">
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? t.pause : t.play}
          </button>

          <div className="ml-1 inline-flex">
            <button onClick={() => { stopSpeak(); setIsPlaying(false); setIdx((i) => Math.max(i - 1, 0)); if (narrationOn) setTimeout(() => setIsPlaying(true), 120); }}
              className="px-2 py-1 rounded-l-full border border-white/15 hover:bg-white/10 text-sm">
              <ArrowLeft size={16} />
            </button>
            <button onClick={() => { stopSpeak(); setIsPlaying(false); setIdx((i) => Math.min(i + 1, t.tiles.length - 1)); if (narrationOn) setTimeout(() => setIsPlaying(true), 120); }}
              className="px-2 py-1 rounded-r-full border-t border-b border-r border-white/15 hover:bg-white/10 text-sm">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Mosaic grid */}
      <main className="mx-auto max-w-7xl px-4 pb-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${rtl ? "text-right" : ""}`}>
          {t.tiles.map((tile, i) => <Tile key={i} {...tile} rtl={rtl} />)}
        </div>

        <div className="mt-6">
          <Link to="/adventure" className="text-slate-200/90 hover:text-white underline underline-offset-4">{t.back}</Link>
        </div>
      </main>

      <SiteFooterLike />
    </div>
  );
}
