// src/pages/SpaceBiologyLanding.jsx
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rocket, Atom, Database, Cpu, Globe2, Satellite, BookOpen } from "lucide-react";

/* 3D EARTH + SATELLITE COMPONENTS */
function RotatingEarth(props) {
  const mesh = useRef();
  useFrame((_, delta) => { if (mesh.current) mesh.current.rotation.y += delta * 0.05; });
  return (
    <group {...props}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial color="#6bb1ff" roughness={0.6} />
      </mesh>
    </group>
  );
}

function MiniSatellite({ position = [3, 0.4, -1] }) {
  const ref = useRef();
  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x = Math.sin(Date.now() * 0.0004) * 3.2;
    ref.current.position.z = Math.cos(Date.now() * 0.0004) * 3.2;
  });
  return (
    <group ref={ref} position={position}>
      <mesh><boxGeometry args={[0.25, 0.25, 0.5]} /><meshStandardMaterial color="#cbd5e1" /></mesh>
    </group>
  );
}

/* WHAT-IF CHAT COMPONENT */
function WhatIfChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("/api/whatif", { //http://localhost:5001/api/whatif
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer || "No response received.");
    } catch {
      setAnswer("Error contacting the What-If engine.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-2xl bg-slate-800/50 border border-slate-700/50 p-4 text-slate-200">
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a hypothetical question about space biology..."
        className="w-full h-24 bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-sm resize-none"
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-3 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
      {answer && (
        <div className="mt-4 p-3 rounded-lg bg-slate-900/70 border border-slate-700/60 text-sm max-h-60 overflow-y-auto">
          {answer}
        </div>
      )}
    </div>
  );
}


/* =============================================
   UI HELPERS
   ============================================= */
const Wave = ({ className = "" }) => (
  <svg viewBox="0 0 1440 100" className={className} preserveAspectRatio="none">
    <path d="M0,30 C240,90 480,0 720,40 C960,80 1200,10 1440,50 L1440,100 L0,100 Z" fill="url(#g)"/>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15"/>
      </linearGradient>
    </defs>
  </svg>
);

const Card = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 backdrop-blur shadow-lg hover:shadow-xl hover:border-slate-500/60 transition"
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-xl bg-slate-900/60">
        <Icon size={22} />
      </div>
      <h4 className="text-slate-100 font-semibold tracking-wide uppercase text-sm">{title}</h4>
    </div>
    <p className="text-slate-300 text-sm leading-relaxed">{children}</p>
  </motion.div>
);

/* =============================================
   BRAND: PURE SVG WORDMARK + SPLASH
   ============================================= */
function BrandWordmark({ className = "", size = "md" }) {
  const iconSize = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  const titleSize = size === "sm" ? "text-sm md:text-base" : "text-base md:text-lg";
  const sublineSize = size === "sm" ? "text-[9px] md:text-[10px]" : "text-[10px] md:text-[11px]";

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="NileStellar — Space Biology Knowledge Engine">
      {/* Mark */}
      <svg viewBox="0 0 40 40" className={iconSize} aria-hidden="true">
        <defs>
          <linearGradient id="ns-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60A5FA"/>
            <stop offset="100%" stopColor="#6366F1"/>
          </linearGradient>
          <radialGradient id="ns-b" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,.35)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="20" cy="20" r="19" fill="url(#ns-b)" />
        <ellipse cx="20" cy="18" rx="13" ry="6.2" fill="none" stroke="url(#ns-a)" strokeWidth="1.6" opacity=".9"/>
        <path
          d="M14 31c4-7 12-7 12-16 0-3-2-6-6-6s-6 3-6 6c0 9 8 9 12 16"
          fill="none" stroke="url(#ns-a)" strokeWidth="3" strokeLinecap="round"
        />
      </svg>

      {/* Wordmark */}
      <div className="leading-tight select-none">
        <div className={`text-white font-semibold tracking-tight ${titleSize}`}>
          <span className="font-bold">Nile</span>
          <span className="font-semibold">Stellar</span>
        </div>
        <div className={`hidden sm:block ${sublineSize} text-slate-300/80 tracking-wide`}>
          — Space Biology Knowledge Engine
        </div>
      </div>
    </div>
  );
}

function SplashLockup() {
  return (
    <div className="flex flex-col items-center text-center">
      <svg viewBox="0 0 520 320" className="w-[260px] md:w-[360px] h-auto drop-shadow-[0_12px_30px_rgba(56,189,248,.35)]">
        <defs>
          <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60A5FA"/><stop offset="100%" stopColor="#6366F1"/>
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,.35)"/><stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <circle cx="260" cy="140" r="130" fill="url(#glow)" opacity=".5"/>
        <ellipse cx="260" cy="120" rx="145" ry="38" fill="none" stroke="url(#lg1)" strokeWidth="3"/>
        <path d="M200 250c50-85 120-70 120-140 0-28-20-50-60-50s-60 22-60 50c0 70 70 55 120 140"
              fill="none" stroke="url(#lg1)" strokeWidth="12" strokeLinecap="round"/>
        <g transform="translate(0,260)">
          <text x="260" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="54" fontFamily="ui-sans-serif, system-ui">NileStellar</text>
          <text x="260" y="28" textAnchor="middle" fill="rgba(226,232,240,.9)" fontSize="16" letterSpacing=".04em">
            — Space Biology Knowledge Engine
          </text>
        </g>
      </svg>

      <div className="mt-3">
        <div className="mx-auto h-[3px] w-48 rounded-full bg-slate-600/40 overflow-hidden">
          <div className="h-full w-1/3 animate-[splashbar_1.2s_ease_infinite] bg-gradient-to-r from-sky-400 to-indigo-400" />
        </div>
        <p className="mt-3 text-slate-300/90 text-sm">Engaging Systems…</p>
      </div>
      <style>{`
        @keyframes splashbar { 0%{transform:translateX(-50%)}50%{transform:translateX(150%)}100%{transform:translateX(350%)}}
      `}</style>
    </div>
  );
}

/* Optional splash overlay controller */
function SplashScreen({ onDone, duration = 1400 }) {
  useEffect(() => {
    const t = setTimeout(() => onDone?.(), duration);
    return () => clearTimeout(t);
  }, [onDone, duration]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050914]">
      {/* soft rounded frame + stars */}
      <div className="absolute inset-4 rounded-3xl bg-gradient-to-b from-[#0b1224] to-[#050914] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
      <div className="relative z-10">
        <SplashLockup />
      </div>
    </div>
  );
}

/* =============================================
   PAGE
   ============================================= */
export default function SpaceBiologyLanding() {
  const [showSplash, setShowSplash] = useState(false); // set true if you want it on first load

  return (
    <div className="min-h-screen w-full bg-[#050914] text-slate-100 selection:bg-sky-400/30 selection:text-white">
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur bg-[#050914]/70 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* New SVG wordmark */}
          <Link to="/" className="hover:opacity-95 transition" aria-label="NileStellar home">
            <BrandWordmark />
          </Link>

          <nav className="hidden md:flex gap-8 text-slate-300 text-sm">
            <a className="hover:text-white" href="#about">About</a>

            {/* TECHNOLOGY with hover dropdown */}
            <div className="relative group">
              <a href="#technology" className="hover:text-white flex items-center gap-1">
                Technology
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </a>

              {/* Dropdown */}
              <div
                className="pointer-events-auto invisible opacity-0 translate-y-2 scale-95
                           group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                           focus-within:visible focus-within:opacity-100 focus-within:translate-y-0 focus-within:scale-100
                           transition duration-200 ease-out will-change-transform
                           absolute right-0 mt-2 w-56 rounded-xl border border-slate-700
                           bg-slate-900/95 backdrop-blur shadow-2xl z-50"
                role="menu"
                aria-label="Technology menu"
              >
                {/* If you want to jump within the same page keep anchors */}
                <a
                  href="#orbit-earth"
                  role="menuitem"
                  className="block px-4 py-3 text-slate-200 hover:bg-slate-800/70 rounded-t-xl focus:outline-none focus:bg-slate-800/70"
                >
                  ORBIT THE EARTH
                </a>
                <a
                  href="#adventure"
                  role="menuitem"
                  className="block px-4 py-3 text-slate-200 hover:bg-slate-800/70 rounded-b-xl focus:outline-none focus:bg-slate-800/70"
                >
                  Choose your Adventure
                </a>
              </div>
            </div>

            <Link className="hover:text-white" to="/gallery">Gallery</Link>
            <Link className="hover:text-white" to="/satellites">Satellites</Link>
            <Link
              className="px-3 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500/30"
              to="#apply"
            >
              Apply
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero video directly under the nav bar */}
      <div className="w-full h-[800px] overflow-hidden relative">
        <video
          className="w-full h-full object-cover"
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* HERO */}
      <section id="orbit-earth" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 items-center gap-10 py-16 md:py-24">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              ORBIT THE <span className="text-sky-400">EARTH</span>
            </motion.h1>
            <p className="mt-5 text-slate-300 max-w-xl">
              NASA has been performing biology experiments in space for decades, generating a tremendous amount of
              information. Your challenge: build a dynamic dashboard powered by AI and knowledge graphs to summarize
              bioscience publications and explore the impact of space experiments.
            </p>
            <div className="mt-6 flex gap-4">
              <Link to="/dashboard" className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold">
                Get Started
              </Link>
              <a href="#learn-more" className="px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-400">
                Learn More
              </a>
            </div>
          </div>

          {/* 3D EARTH */}
          <div className="relative h-[360px] md:h-[440px] lg:h-[520px] rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
            <Canvas camera={{ position: [0, 1.2, 5], fov: 50 }} shadows>
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 5, 2]} intensity={1.2} castShadow />
              <Stars radius={80} depth={60} count={6000} factor={4} fade />
              <RotatingEarth position={[0, 0, 0]} />
              <MiniSatellite />
              <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.2} />
            </Canvas>
            <div className="absolute inset-x-0 bottom-0 pointer-events-none">
              <Wave className="w-full h-16 opacity-80" />
            </div>
          </div>
        </div>

        {/* Stat cards row */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Card icon={Globe2} title="LEO (Low Earth Orbit)">300–1500 km altitude. Rapid revisit cycles and microgravity suited for bioscience payloads.</Card>
          <Card icon={Rocket} title="H+ SPEED">~28,000 km/h orbital velocity. Complete an orbit in ~90 minutes.</Card>
          <Card icon={Atom} title="EARTH ORBIT">365D / year observation window. Day–night cycles enable multi-modal experiments.</Card>
        </div>
      </section>

      {/* ================= CHOOSE YOUR ADVENTURE (overlay style) ================= */}
      <section id="adventure" className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            style={{
              backgroundImage: "url('/adventure-lab.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_20%_20%,rgba(2,6,23,0.15),transparent)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040816]/80 via-[#040816]/40 to-transparent" />

            <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-16 max-w-3xl">
              <h2 className="text-white font-extrabold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] text-4xl sm:text-5xl md:text-6xl leading-tight">
                Unlock the <span className="text-sky-400">Cosmos</span> of Biology
              </h2>

              <div className="mt-6">
                <Link
                  to="/adventure"  // UPDATED
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl
                             bg-gradient-to-r from-sky-400 to-indigo-400 text-slate-900 font-semibold
                             shadow-[0_8px_30px_rgba(56,189,248,0.35)]
                             hover:from-sky-300 hover:to-indigo-300 transition"
                >
                  Choose Your Adventure
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>

              <p className="mt-2 text-xs text-slate-300/80">
                Simulated environment
              </p>
            </div>

            <div className="pt-[46%] sm:pt-[36%] md:pt-[32%] lg:pt-[28%]" />
          </div>

          {/* Cards below — redesigned */}
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Latest Research */}
            <div className="relative rounded-3xl border border-slate-700/60 bg-slate-900/60 backdrop-blur p-6 shadow-[0_10px_40px_rgba(2,6,23,.35)]">
              <h3 className="text-xl font-semibold text-white">Latest Research</h3>
              <div className="mt-4 rounded-2xl border border-slate-700/60 bg-gradient-to-b from-slate-800/60 to-slate-900/40 p-4">
                <svg viewBox="0 0 320 140" className="w-full h-36">
                  <defs>
                    <linearGradient id="lr-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(56,189,248,.35)" />
                      <stop offset="100%" stopColor="rgba(56,189,248,0)" />
                    </linearGradient>
                  </defs>
                  {[20,40,60,80,100,120].map((y) => (
                    <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(148,163,184,.15)" strokeWidth="1" />
                  ))}
                  <path
                    d="M0,110 L0,100 L40,96 L80,98 L120,84 L160,88 L200,70 L240,76 L280,60 L320,64 L320,110 Z"
                    fill="url(#lr-fill)"
                  />
                  <polyline
                    fill="none"
                    stroke="rgb(56,189,248)"
                    strokeWidth="3"
                    points="0,100 40,96 80,98 120,84 160,88 200,70 240,76 280,60 320,64"
                  />
                </svg>
                <div className="mt-3 flex flex-wrap items-center gap-5 text-xs text-slate-300">
                  <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-sky-400" /> Bone Density</span>
                  <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-sky-300/60" /> Muscle Atrophy</span>
                </div>
              </div>
              <div className="mt-6 leading-none">
                <div className="text-4xl font-extrabold text-white">125% <span className="text-rose-400 align-middle">↓</span></div>
                <div className="mt-1 text-lg font-semibold text-white">Mission Duration</div>
              </div>
            </div>

            {/* What-If Scenario Chat */}
            <div
              className="relative rounded-3xl border border-slate-700/60 bg-slate-900/60 backdrop-blur p-6 shadow-[0_10px_40px_rgba(2,6,23,.35)] overflow-hidden"
              style={{
                backgroundImage: "url('/dna.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-4">What-If Scenario Chat</h3>
            
                <WhatIfChat />
              </div>
            </div>


            {/* Learning Paths */}
            <div className="relative rounded-3xl border border-slate-700/60 bg-slate-900/60 backdrop-blur p-6 shadow-[0_10px_40px_rgba(2,6,23,.35)]">
              <h3 className="text-xl font-semibold text-white">Learning Paths</h3>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <Link to="/dashboard" className="rounded-2xl p-4 border border-sky-500/30 bg-gradient-to-br from-sky-500/20 to-sky-500/5 hover:from-sky-500/30 hover:to-sky-500/10 transition">
                  <div className="h-8 w-8 rounded-full bg-sky-400/30 mb-3" />
                  <div className="text-sky-200 text-sm font-semibold">Mentari’s Guide to<br/>Xenobiology</div>
                </Link>
                <Link to="/dashboard" className="rounded-2xl p-4 border border-pink-500/30 bg-gradient-to-br from-pink-500/20 to-pink-500/5 hover:from-pink-500/30 hover:to-pink-500/10 transition">
                  <div className="h-8 w-8 rounded-full bg-pink-400/30 mb-3" />
                  <div className="text-pink-200 text-sm font-semibold">Uncharted Plant Species</div>
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Upcoming Paths</span><span>Learner Story Quests</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-700/60 overflow-hidden">
                    <div className="h-full w-2/3 bg-sky-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Upanner Story Quests</span><span>&nbsp;</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-700/60 overflow-hidden">
                    <div className="h-full w-1/2 bg-sky-400" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ================= end adventure ================= */}

      {/* MISSION */}
      <section id="technology" className="relative py-20 md:py-24">
        <div className="absolute inset-x-0 -top-8">
          <Wave className="w-full h-16" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">OUR MISSION <span className="text-sky-400">RAPIDSCAT</span></h2>
            <p className="mt-4 text-slate-300">
              Improve weather forecasting and ocean-surface wind understanding. In our context, RAPIDSCAT-like datasets
              feed the Knowledge Engine to enrich bioscience experiment metadata.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#view-all" className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold">View All</a>
              <a href="#docs" className="px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-400">Docs</a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 p-2">
            <div className="h-[320px] rounded-xl overflow-hidden">
              <Canvas camera={{ position: [0, 1.5, 4.2], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[3,3,2]} intensity={1.1} />
                <MiniSatellite position={[0,0,0]} />
                <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
                <Stars radius={40} depth={20} count={3000} factor={2} fade />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-950 to-[#050914] border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">Functions of the Knowledge Engine</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card icon={Database} title="Knowledge Graph">
              Link experiments, organisms, missions, instruments, and outcomes to power faceted exploration.
            </Card>
            <Card icon={Cpu} title="AI Summaries">
              Generate concise, reliable abstracts for NASA bioscience publications with source grounding.
            </Card>
            <Card icon={BookOpen} title="Learning Hub">
              Education-ready views for students and youth. Explain microgravity biology with visuals.
            </Card>
            <Card icon={Satellite} title="Mission Browser">
              Filter by orbit, mission, payload, or year. Compare outcomes across platforms.
            </Card>
            <Card icon={Globe2} title="3D Explorer">
              Inspect Earth orbit, toggle inclination bands, and preview payload trajectories.
            </Card>
            <Card icon={Atom} title="Bio-Impact Maps">
              Map experimental variables to phenotypic effects; export figures for reports.
            </Card>
          </div>
          <div className="mt-10 flex gap-4">
            <a href="#try" className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold">View All</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>Techno — Created for NASA Space Apps 2025 · Web Design ©2025</p>
          {/* Brand wordmark reused, compact size */}
          <Link to="/" className="hover:opacity-95 transition" aria-label="NileStellar home">
            <BrandWordmark size="sm" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
