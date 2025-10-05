import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * AdventureHub.jsx — portals + neon chevrons + fixed header
 *  - Category quiz modal (randomized)
 *  - Explore Paths modal (tilt cards + progress)
 *  - View All full-screen Paths Gallery (searchable)
 *  - Portal cards link to story pages (/adventure/:topic)
 */

/* ---------- Fixed TopBar ---------- */
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
        <Link to="/" className="px-3 py-1.5 rounded-full border border-slate-300/30 text-slate-100 bg-white/0 hover:bg-white/5 transition">
          ← Home
        </Link>
        <Link to="/dashboard" className="px-3 py-1.5 rounded-full border border-sky-300/60 text-sky-100
                     bg-sky-400/10 hover:bg-sky-400/20 transition">
          Dashboard
        </Link>
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */
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

/* ---------- QUESTION BANK ---------- */
const BANK = {
  exobotany: [
    { q: "Plants sense gravity primarily with which organelles?", a: ["Chloroplasts", "Statoliths", "Mitochondria", "Guard cells"], correct: 1, tip: "Statoliths sediment on Earth—much less in micro-g." },
    { q: "In microgravity, plant roots tend to grow…", a: ["Randomly (less directed)", "Always toward light", "Only downward", "Straight upward"], correct: 0, tip: "Without gravity vector, cues like moisture/light dominate." },
    { q: "Which system moves water/nutrients up stems?", a: ["Phloem", "Cuticle", "Xylem", "Cortex"], correct: 2, tip: "Capillarity + transpiration—fluid behavior is wild in space." },
    { q: "LED growth chambers in space usually favor which colors?", a: ["Green & yellow", "Red & blue", "IR & UV", "White only"], correct: 1, tip: "Red+blue supports photosynthesis while saving power." },
    { q: "Best substrate for plant growth in orbit often uses…", a: ["Loose soil", "Aero/hydroponics & wicks", "Clay pellets only", "Sand"], correct: 1, tip: "We manage fluids with porous media and capillary action." },
    { q: "Ethylene gas in closed habitats can…", a: ["Enhance leaf health", "Accelerate ripening & stress", "Cool the cabin", "Fix nitrogen"], correct: 1, tip: "Control ethylene or plants get ‘space stress’." },
  ],
  micro: [
    { q: "CRISPR-Cas9 is primarily used to…", a: ["Edit DNA sequences", "Image cells", "Freeze tissues", "Measure pH"], correct: 0, tip: "Guide RNA brings Cas9 to a specific locus." },
    { q: "Microbes in microgravity often show…", a: ["No change at all", "Altered virulence/growth", "Immediate death", "Turn into plants"], correct: 1, tip: "Gene expression & biofilm formation can shift." },
    { q: "Sterile technique in space labs needs special handling because…", a: ["Water boils at 0°C", "Fluids float & form spheres", "No microbes survive", "Free gravity increases mixing"], correct: 1, tip: "Surface tension dominates; closed tools & wicking used." },
    { q: "PCR requires which temperature-cycling enzyme?", a: ["Lactase", "Polymerase (e.g., Taq)", "Ligase only", "RNAse"], correct: 1, tip: "Thermostable polymerase handles denature/anneal/extend." },
    { q: "Sequencing in orbit has used which handheld device?", a: ["Nanopore (MinION)", "Cryo-TEM", "Sanger capillary", "FACS cytometer"], correct: 0, tip: "Nanopore sequencing flew on ISS." },
    { q: "A plasmid is best described as…", a: ["Viral capsid", "Small circular DNA", "Mitochondrion", "RNA hairpin"], correct: 1, tip: "Used widely for cloning & expression." },
  ],
  astro: [
    { q: "Main reason bone density drops in microgravity?", a: ["Calcium-poor food", "Reduced mechanical loading", "Spacesuit pressure", "Cosmic rays dissolve bone"], correct: 1, tip: "No weight-bearing → osteoclasts win." },
    { q: "Exercise devices substitute gravity with…", a: ["Elastic/vacuum resistance", "Magnets", "Water tanks", "Gyros"], correct: 0, tip: "Treadmills + resistive machines + cycle ergometers." },
    { q: "Which orbit is best for rapid experiment turnaround?", a: ["LEO (300–1500 km)", "GEO", "MEO", "HEO"], correct: 0, tip: "LEO enables frequent resupply/return." },
    { q: "Space motion sickness is linked to…", a: ["Oxygen levels", "Vestibular conflict", "Cold air", "Muscle growth"], correct: 1, tip: "Inner-ear signals mismatch visual cues." },
    { q: "Radiation in deep space is mitigated with…", a: ["Lead hats", "Water/polymer shielding & ops limits", "Green lasers", "Extra oxygen"], correct: 1, tip: "Hydrogen-rich materials, timing, and dosimetry." },
    { q: "Vision changes on long missions relate to…", a: ["SANS (fluid shifts)", "Low nitrogen", "Vitamin C", "Cryostress"], correct: 0, tip: "Spaceflight-Associated Neuro-Ocular Syndrome." },
  ],
};

const categories = [
  { key: "mixed", label: "Mixed" },
  { key: "exobotany", label: "Exobotany" },
  { key: "micro", label: "Microbiology" },
  { key: "astro", label: "Astrobiology" },
];

function sample(array, n) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

function buildQuiz(catKey) {
  if (catKey === "mixed") {
    const pool = [...sample(BANK.exobotany, 2), ...sample(BANK.micro, 2), ...sample(BANK.astro, 1)];
    return sample(pool, 5);
  }
  return sample(BANK[catKey], 5);
}

/* ---------- Inline Quiz Modal ---------- */
function QuizModal({ open, onClose, initialCat = "mixed" }) {
  const [cat, setCat] = React.useState(initialCat);
  const [items, setItems] = React.useState(buildQuiz(initialCat));
  const [i, setI] = React.useState(0);
  const [pick, setPick] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const total = items.length;

  React.useEffect(() => {
    if (!open) return;
    setCat(initialCat);
    const next = buildQuiz(initialCat);
    setItems(next); setI(0); setPick(null); setScore(0); setDone(false);
  }, [open, initialCat]);

  React.useEffect(() => {
    if (!open) return;
    const next = buildQuiz(cat);
    setItems(next); setI(0); setPick(null); setScore(0); setDone(false);
  }, [cat]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (["1","2","3","4"].includes(e.key)) setPick(Number(e.key) - 1);
      if (e.key === "Enter") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, pick, i, done]);

  function next() {
    if (pick === null) return;
    if (pick === items[i].correct) setScore((s) => s + 1);
    setPick(null);
    if (i + 1 < total) setI((x) => x + 1);
    else setDone(true);
  }

  function reroll() {
    const next = buildQuiz(cat);
    setItems(next); setI(0); setPick(null); setScore(0); setDone(false);
  }

  const q = items[i];

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-[min(92vw,820px)] rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur p-6 md:p-8 text-slate-100 shadow-[0_20px_80px_rgba(2,6,23,.6)]"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl md:text-2xl font-semibold">Quick Space-Bio Quiz</h3>
              <button onClick={onClose} className="px-3 py-1.5 rounded-full border border-slate-300/30 hover:bg-white/5">✕</button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map(({ key, label }) => (
                <button key={key} onClick={() => setCat(key)}
                  className={["px-3 py-1.5 rounded-full border text-sm transition",
                    cat === key ? "border-sky-300/70 bg-sky-400/10 text-sky-100"
                                : "border-slate-600/60 hover:bg-white/5 text-slate-200"].join(" ")}>{label}</button>
              ))}
              <button onClick={reroll}
                className="ml-auto px-3 py-1.5 rounded-full border border-emerald-400/60 bg-emerald-400/10 text-emerald-100 hover:bg-emerald-400/20 text-sm">
                Shuffle 5
              </button>
            </div>

            <div className="mt-4">
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-sky-400 to-indigo-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${(done ? total : i) / total * 100}%` }}
                  transition={{ type: "spring", stiffness: 90, damping: 20 }}
                />
              </div>
              <div className="mt-1 text-xs text-slate-400 text-right">
                {done ? `${total}/${total}` : `${i}/${total}`} answered — Score {score}
              </div>
            </div>

            {!done ? (
              <div className="mt-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl border border-sky-400/40 grid place-items-center bg-sky-400/10 font-bold">
                    {i + 1}
                  </div>
                  <div className="text-lg md:text-xl font-semibold">{q.q}</div>
                </div>

                <div className="mt-4 grid gap-3">
                  {q.a.map((ans, idx) => {
                    const isPicked = pick === idx;
                    const isCorrect = pick !== null && idx === q.correct;
                    const isWrong = pick !== null && isPicked && !isCorrect;
                    return (
                      <button key={idx} onClick={() => setPick(idx)}
                        className={[
                          "text-left px-4 py-3 rounded-xl border transition backdrop-blur hover:bg-white/5",
                          isCorrect ? "border-emerald-400/60 bg-emerald-400/10" : "border-slate-700/60",
                          isWrong ? "border-rose-400/60 bg-rose-400/10" : "",
                          isPicked ? "ring-2 ring-sky-300/60" : "",
                        ].join(" ")}
                      >
                        <span className="text-sm md:text-base">{idx + 1}. {ans}</span>
                      </button>
                    );
                  })}
                </div>

                {pick !== null && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="mt-3 text-slate-300/90 text-sm">
                    💡 {q.tip}
                  </motion.div>
                )}

                <div className="mt-5 flex items-center justify-end gap-2">
                  <button onClick={onClose} className="px-4 py-2 rounded-full border border-slate-300/40 hover:bg-white/5">Close</button>
                  <button onClick={next} disabled={pick === null}
                    className="px-5 py-2 rounded-full border border-sky-300/60 text-sky-100 bg-sky-400/10 hover:bg-sky-400/20 disabled:opacity-40">
                    {i + 1 === total ? "Finish" : "Next"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 text-center">
                <h4 className="text-2xl font-extrabold">Nice flight! 🎉</h4>
                <p className="mt-1 text-slate-300">
                  You scored <span className="text-sky-300 font-semibold">{score}</span> / {total} in{" "}
                  <span className="font-medium capitalize">{cat}</span> mode.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <button onClick={reroll} className="px-5 py-2 rounded-full border border-slate-300/40 hover:bg-white/5">
                    Play Again (Shuffle)
                  </button>
                  <Link to="/dashboard"
                    className="px-5 py-2 rounded-full border border-emerald-400/60 text-emerald-100 bg-emerald-400/10 hover:bg-emerald-400/20">
                    Explore Dashboard
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Explore Paths Modal ---------- */
function PathsModal({ open, onClose, onStartQuiz, onOpenGallery }) {
  const paths = [
    { key: "exobotany", title: "Mentari’s Guide to Xenobiology", blurb: "Grow life off-world: light, nutrients, capillary tricks.", color: "from-emerald-400 to-sky-400", progress: 65 },
    { key: "micro", title: "Microbes & Gene Editing Lab", blurb: "Biofilms, PCR, CRISPR—keep it sterile in zero-g.", color: "from-fuchsia-400 to-violet-400", progress: 42 },
    { key: "astro", title: "Astrobiology & Human Adaptation", blurb: "Radiation, SANS, countermeasures, EVA drills.", color: "from-sky-400 to-indigo-400", progress: 23 },
  ];

  function tilt(e) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
  }
  const untilt = (e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-[min(94vw,1000px)] rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur p-6 md:p-8 text-slate-100 shadow-[0_20px_80px_rgba(2,6,23,.6)]"
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 28, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">Pick a Path</h3>
                <p className="text-slate-300/80 text-sm">Short, gamified learning tracks with progress.</p>
              </div>
              <button onClick={onClose} className="px-3 py-1.5 rounded-full border border-slate-300/30 hover:bg-white/5">✕</button>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-5">
              {paths.map((p, idx) => (
                <motion.div key={p.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.35 }}
                  className="relative rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
                  <div onMouseMove={tilt} onMouseLeave={untilt}
                    style={{ transform: "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transition: "transform 180ms ease" }}
                    className="relative p-5 h-full">
                    <div className={`absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition bg-gradient-to-br ${p.color}/20`} />
                    <div className="absolute -inset-px rounded-2xl ring-1 ring-slate-700/60 pointer-events-none" />
                    <h4 className="text-lg font-semibold pr-10">{p.title}</h4>
                    <p className="mt-2 text-sm text-slate-300/90">{p.blurb}</p>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Progress</span><span>{p.progress}%</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${p.color}`} style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <button
                        onClick={() => onStartQuiz?.(p.key)}
                        className="px-4 py-2 rounded-full border text-sm transition border-sky-300/60 bg-sky-400/10 hover:bg-sky-400/20">
                        Start Path
                      </button>
                      <button
                        onClick={() => { onClose?.(); onOpenGallery?.(); }}
                        className="px-4 py-2 rounded-full border text-sm transition border-slate-300/30 hover:bg-white/5">
                        View All
                      </button>
                    </div>

                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-sky-300 shadow-[0_0_20px_6px_rgba(56,189,248,0.6)]" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* marquee */}
            <div className="mt-6 relative h-8 overflow-hidden rounded-full border border-slate-800">
              <motion.div
                className="absolute inset-y-0 left-0 flex items-center gap-8 px-4 text-slate-300 text-sm whitespace-nowrap"
                initial={{ x: 0 }} animate={{ x: ["0%", "-50%"] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
                🌱 Grow food off-world • 🧫 Edit genomes in micro-g • 🧠 Adapt bodies for deep space • 🛰️ Build your space-bio superpowers
                <span className="mx-8">|</span>
                🌱 Grow food off-world • 🧫 Edit genomes in micro-g • 🧠 Adapt bodies for deep space • 🛰️ Build your space-bio superpowers
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Full-screen Paths Gallery ---------- */
function PathsGallery({ open, onClose, onStartQuiz }) {
  const [query, setQuery] = React.useState("");
  const cards = [
    { key: "exobotany", title: "Exobotany • Green Habitats", tag: "plants", color: "from-emerald-400 to-sky-400", href: "/paths/exobotany" },
    { key: "micro", title: "Micro • Gene Editing Lab", tag: "microbes", color: "from-fuchsia-400 to-violet-400", href: "/paths/micro" },
    { key: "astro", title: "Astro • Human Adaptation", tag: "crew", color: "from-sky-400 to-indigo-400", href: "/paths/astro" },
  ];

  const filtered = cards.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {/* starry backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0a1b3b_0%,#050914_50%,#050914_100%)]/95" />
          <div className="absolute inset-0 opacity-[0.08]"
               style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)", backgroundSize: "26px 26px" }} />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <motion.div
            className="relative z-10 w-[min(96vw,1200px)] max-h-[92vh] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur p-6 md:p-8 text-slate-100 shadow-[0_30px_120px_rgba(2,6,23,.7)]"
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 28, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            {/* header + search */}
            <div className="flex flex-wrap items-center gap-3 justify-between">
              <h3 className="text-xl md:text-2xl font-semibold">All Learning Paths</h3>
              <div className="flex items-center gap-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search paths…"
                  className="px-3 py-1.5 rounded-full border border-slate-600/70 bg-slate-900/60 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300/50"
                />
                <button onClick={onClose} className="px-3 py-1.5 rounded-full border border-slate-300/30 hover:bg-white/5">✕</button>
              </div>
            </div>

            {/* cards grid */}
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pr-1 overflow-y-auto max-h-[68vh]">
              {filtered.map((c, idx) => (
                <motion.div key={c.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.35 }}
                  className="relative rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
                  <div className="p-5">
                    <div className={`absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition bg-gradient-to-br ${c.color}/15`} />
                    <div className="absolute -inset-px rounded-2xl ring-1 ring-slate-700/60 pointer-events-none" />
                    <h4 className="text-lg font-semibold">{c.title}</h4>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{c.tag}</p>

                    <div className="mt-4 h-28 rounded-xl border border-slate-700/60 bg-gradient-to-br from-slate-800/60 to-slate-900/40" />

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => onStartQuiz?.(c.key)}
                        className="px-4 py-2 rounded-full border text-sm transition border-sky-300/60 bg-sky-400/10 hover:bg-sky-400/20">
                        Start Path
                      </button>
                      <Link
                        to={c.href}
                        onClick={onClose}
                        className="px-4 py-2 rounded-full border text-sm transition border-slate-300/30 hover:bg-white/5">
                        Open Path
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full text-center text-slate-400 py-10">
                  No paths match “{query}”.
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Adventure content ---------- */

// overlay to keep portal text readable over images
const archOverlay =
  "linear-gradient(180deg, rgba(4,8,22,0) 0%, rgba(4,8,22,0.15) 55%, rgba(4,8,22,0.45) 100%)";

function ArchCard({ title, subtitle, to = "#", bg, delay = 0 }) {
  const [pos, setPos] = React.useState({ x: "50%", y: "50%" });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: [6, 0, 6] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }} className="relative">
      <Link to={to} className="group block" aria-label={title}>
        <div
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            setPos({ x: `${x}%`, y: `${y}%` });
          }}
          className="relative w-[300px] sm:w-[340px] lg:w-[360px] h-[460px] mx-auto overflow-hidden
                     transition-transform duration-300 ease-out will-change-transform
                     group-hover:-translate-y-1 group-hover:scale-[1.035]"
          style={{
            WebkitMask: "radial-gradient(140px_140px at 50% 0, #000 99%, #0000 100%) top/100% 52% no-repeat, linear-gradient(#000 0 0) bottom/100% 48% no-repeat",
            mask: "radial-gradient(140px_140px at 50% 0, #000 99%, #0000 100%) top/100% 52% no-repeat, linear-gradient(#000 0 0) bottom/100% 48% no-repeat",
            backgroundImage: bg,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "28px",
            "--hx": pos.x,
            "--hy": pos.y,
          }}
        >
          <div className="absolute inset-0 rounded-[28px] ring-1 ring-sky-300/30 transition group-hover:ring-sky-300/70" />
          <div className="absolute inset-0 rounded-[28px] transition group-hover:shadow-[0_0_70px_-10px_rgba(125,211,252,0.65)]" />
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
            style={{ background: "radial-gradient(200px 200px at var(--hx) var(--hy), rgba(125,211,252,0.20), rgba(56,189,248,0.10) 35%, transparent 60%)" }} />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
            <div className="mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-sky-300/40 to-transparent mb-3" />
            <h3 className="text-lg font-semibold tracking-tight drop-shadow-sm">{title}</h3>
            {subtitle && <p className="text-slate-300/90 text-sm mt-1">{subtitle}</p>}
          </div>
          <Sparkles className="absolute top-4 right-4 w-4 h-4 opacity-40" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function AdventureHub() {
  const [quizOpen, setQuizOpen] = React.useState(false);
  const [pathsOpen, setPathsOpen] = React.useState(false);
  const [galleryOpen, setGalleryOpen] = React.useState(false);
  const [quizCat, setQuizCat] = React.useState("mixed");

  function handleStartQuiz(catKey) {
    setPathsOpen(false);
    setGalleryOpen(false);
    setQuizCat(catKey || "mixed");
    setTimeout(() => setQuizOpen(true), 0);
  }

  return (
    <div className="min-h-screen w-full text-slate-100 relative overflow-hidden">
      <TopBar />

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('https://c02.purpledshub.com/uploads/sites/48/2024/06/facts-space-and-astronomy.jpg?w=1029&webp=1')" }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,20,0.35)_0%,rgba(5,9,20,0.75)_70%,rgba(5,9,20,0.9)_100%)]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(120%_80%_at_50%_0%,black_60%,transparent_100%)] bg-black/20" />
      </div>

      {/* Frame */}
      <div className="pointer-events-none absolute inset-4 -z-0 rounded-3xl border border-slate-200/15" />

      {/* Header */}
      <header className="mx-auto max-w-7xl px-4 pt-20 pb-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
          Choose Your Adventure
        </motion.h1>
      </header>

      {/* Portals -> to story pages */}
      <main className="mx-auto max-w-7xl px-4 pb-10">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <ArchCard
            title="Terrestrial Biology & Exobotany"
            subtitle="Habitats • Flora • Life support"
            to="/adventure/exobotany"
            bg={`${archOverlay}, url('/exobotany.png')`}
            delay={0.05}
          />
          
          <ArchCard
            title="Microbiology & Genetic Engineering"
            subtitle="Wet lab • Cultures • CRISPR"
            to="/adventure/micro-genetics"
            bg={`${archOverlay}, url('/microbiology.png')`}
            delay={0.12}
          />

          <ArchCard
            title="Astrobiology & Human Adaptation"
            subtitle="Stations • EVA • Physiology"
            to="/adventure/astro-human"
            bg={`${archOverlay}, url('/astrobio.png')`}
            delay={0.19}
          />
        </div>
      </main>

      {/* Center chevrons */}
      <div className="relative mx-auto w-full max-w-7xl px-4">
        <div className="relative mx-auto mb-4 h-[2px] w-72 sm:w-[26rem] bg-gradient-to-r from-transparent via-sky-300/80 to-transparent">
          <div className="absolute inset-x-10 -top-3 h-8 blur-2xl bg-sky-400/30" />
        </div>
        <motion.div initial={{ opacity: 0, y: 6, scale: 0.98 }} animate={{ opacity: 1, y: [0, -3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-16 h-16 rounded-full bg-sky-400/10 border border-sky-400/40 flex items-center justify-center
                     [filter:drop-shadow(0_0_14px_rgba(56,189,248,0.65))]">
          <svg viewBox="0 0 48 48" width="36" height="36" fill="none" className="text-sky-200">
            <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 28 L24 16 L36 28" /><path d="M12 34 L24 22 L36 34" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => { setQuizCat("mixed"); setQuizOpen(true); }}
            className="px-6 py-2 rounded-full border border-slate-200/40 text-slate-100
                       bg-white/0 hover:bg-white/5 transition
                       hover:shadow-[0_0_30px_-6px_rgba(148,163,184,0.35)]
                       focus:outline-none focus:ring-2 focus:ring-sky-300/50">
            Start Quiz
          </button>
          <button
            onClick={() => setPathsOpen(true)}
            className="px-6 py-2 rounded-full border border-sky-300/60 text-sky-100
                       bg-sky-400/5 hover:bg-sky-400/15 transition
                       hover:shadow-[0_0_36px_-6px_rgba(56,189,248,0.45)]
                       focus:outline-none focus:ring-2 focus:ring-sky-300/60">
            Explore Paths
          </button>
        </div>
      </div>

      <SiteFooter />

      {/* Modals */}
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} initialCat={quizCat} />
      <PathsModal
        open={pathsOpen}
        onClose={() => setPathsOpen(false)}
        onStartQuiz={handleStartQuiz}
        onOpenGallery={() => setGalleryOpen(true)}
      />
      <PathsGallery
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        onStartQuiz={handleStartQuiz}
      />
    </div>
  );
}
