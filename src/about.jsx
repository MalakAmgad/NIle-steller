import React from "react";
import { Link } from "react-router-dom";
import { Globe, Satellite, Star } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen w-full bg-[#050914] text-slate-100 relative overflow-hidden">
      {/* Galaxy Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1b2e] to-[#050914]"></div>
        
        {/* Nebula clouds */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/25 rounded-full blur-[120px] animate-pulse" style={{animationDuration: '8s'}}></div>
          <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[150px] animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-sky-900/20 rounded-full blur-[130px] animate-pulse" style={{animationDuration: '12s', animationDelay: '4s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-blue-800/15 rounded-full blur-[140px] animate-pulse" style={{animationDuration: '9s', animationDelay: '1s'}}></div>
        </div>
        
        {/* Animated stars - small */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => {
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = 2 + Math.random() * 3;
            return (
              <div
                key={`star-${i}`}
                className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`
                }}
              ></div>
            );
          })}
        </div>
        
        {/* Larger twinkling stars */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => {
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const delay = Math.random() * 4;
            const duration = 3 + Math.random() * 4;
            return (
              <div
                key={`bigstar-${i}`}
                className="absolute w-1 h-1 bg-blue-200 rounded-full animate-pulse"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  boxShadow: '0 0 4px rgba(147, 197, 253, 0.8)'
                }}
              ></div>
            );
          })}
        </div>
        
        {/* Shooting stars */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-200 to-transparent animate-shooting-star" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-2/3 right-0 w-40 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-shooting-star-reverse" style={{animationDelay: '7s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-36 h-0.5 bg-gradient-to-r from-transparent via-sky-300 to-transparent animate-shooting-star" style={{animationDelay: '12s'}}></div>
        </div>
        
        {/* Milky Way effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/10 to-cyan-900/15 opacity-60"></div>
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* ✅ NAVBAR */}
        <header className="sticky top-0 z-40 backdrop-blur bg-[#050914]/70 border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* 🌌 Text logo */}
            <Link
              to="/"
              className="text-sky-400 font-semibold text-lg transition duration-300 hover:text-sky-300 hover:drop-shadow-[0_0_10px_#38bdf8]"
              aria-label="NileStellar home"
            >
              NileStellar
            </Link>
  
            <nav className="hidden md:flex gap-8 text-slate-300 text-sm">
              <Link className="hover:text-white" to="/about">
                About
              </Link>
  
              <div className="relative group">
                <a
                  href="#technology"
                  className="hover:text-white flex items-center gap-1"
                >
                  Technology
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
  
                <div
                  className="pointer-events-auto invisible opacity-0 translate-y-2 scale-95
                             group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                             transition duration-200 ease-out will-change-transform
                             absolute right-0 mt-2 w-56 rounded-xl border border-slate-700
                             bg-slate-900/95 backdrop-blur shadow-2xl z-50"
                  role="menu"
                  aria-label="Technology menu"
                >
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
  
              <Link className="hover:text-sky-400 text-sky-400" to="/gallery">
                Gallery
              </Link>
              <Link className="hover:text-white" to="/satellites">
                Satellites
              </Link>
              <a
                className="px-3 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500/30"
                href="#apply"
              >
                Apply
              </a>
            </nav>
          </div>
        </header>
  
        {/* HERO SECTION */}
        <div className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/10 via-transparent to-indigo-900/10 pointer-events-none"></div>
          
          <div className="relative max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 mb-8 opacity-0 animate-fade-in">
              <Star className="w-4 h-4 text-sky-400" />
              <span className="text-sky-400 text-sm font-medium">Pioneering Space Biology</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-7xl font-bold mb-8 bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              About NileStellar
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-sky-500"></div>
              <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM2 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012 10zM15 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0115 10z" />
              </svg>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-sky-500"></div>
            </div>

            {/* Description */}
            <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              NileStellar is our NASA Space Apps 2025 Challenge project: a dynamic dashboard leveraging AI and knowledge graphs to summarize NASA bioscience publications and enable exploration of biological experiments conducted in space.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <div className="text-center">
                <div className="text-4xl font-bold text-sky-400 mb-2">600+</div>
                <div className="text-slate-400 text-sm">NASA Publications</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">AI</div>
                <div className="text-slate-400 text-sm">Powered Summaries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-400 mb-2">Smart</div>
                <div className="text-slate-400 text-sm">Search & Filter</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-slate-400 text-sm">Data Access</div>
              </div>
            </div>
          </div>
        </div>

        {/* MISSION / VISION / VALUES */}
        <div className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Foundation</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Driven by innovation and guided by purpose, these core principles shape everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative p-8 bg-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur hover:border-sky-500/50 transition-all duration-500 text-center opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/5 group-hover:to-transparent rounded-2xl transition-all duration-500"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500/20 to-sky-600/20 border border-sky-500/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-8 h-8 text-sky-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Mission</h3>
                  <p className="text-slate-400 leading-relaxed">
                    To build a dynamic dashboard that leverages AI and data visualization to summarize NASA bioscience publications, enabling researchers and students to explore the impact of space experiments on living organisms.
                  </p>
                </div>
              </div>

              <div className="group relative p-8 bg-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur hover:border-blue-500/50 transition-all duration-500 text-center opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent rounded-2xl transition-all duration-500"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Satellite className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Vision</h3>
                  <p className="text-slate-400 leading-relaxed">
                    To create an accessible platform where researchers, educators, and students can explore decades of NASA space biology data through smart search, AI summaries, and interactive guided stories about experiments in microgravity.
                  </p>
                </div>
              </div>

              <div className="group relative p-8 bg-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur hover:border-indigo-500/50 transition-all duration-500 text-center opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:to-transparent rounded-2xl transition-all duration-500"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 border border-indigo-500/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Values</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Innovation through AI-powered analysis, accessibility for all learners, and scientific accuracy are at the core of everything we build, ensuring reliable insights from NASA's decades of space biology research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HISTORY / STORY */}
        <div className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Story</h2>
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-sky-500"></div>
                <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-sky-500"></div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative p-8 bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-700/50 hover:border-sky-500/30 transition-all duration-300">
                <div className="absolute -left-4 top-8 w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 border-4 border-[#050914] flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-sky-400 mb-3">The Beginning</h3>
                <p className="text-slate-300 leading-relaxed">
                  Created for the NASA Space Apps 2025 Challenge, NileStellar began as a vision to make decades of NASA space biology research accessible and understandable. We recognized that NASA has generated tremendous information from biology experiments in space, but this valuable data needed a modern, AI-powered platform to unlock its full potential.
                </p>
              </div>

              <div className="relative p-8 bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
                <div className="absolute -left-4 top-8 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-4 border-[#050914] flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Key Features</h3>
                <p className="text-slate-300 leading-relaxed">
                  Our Space Biology Knowledge Engine combines smart search and filtering (by organism, tissue, mission, duration, and exposure) with AI-powered summaries of each study. We've developed interactive guided stories exploring topics like bone loss and plants in microgravity, plus a scenario simulator that predicts biological effects for missions like 6 months on Mars.
                </p>
              </div>

              <div className="relative p-8 bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300">
                <div className="absolute -left-4 top-8 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-4 border-[#050914] flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-indigo-400 mb-3">Today & Beyond</h3>
                <p className="text-slate-300 leading-relaxed">
                  Today, the Space Biology Knowledge Engine serves as a comprehensive dashboard for browsing and searching NASA's bioscience research. Through gamified storytelling and interactive scenario simulators, we help users understand complex biological effects of space travel—from bone density changes to plant growth in microgravity—making space biology education engaging and accessible for students, educators, and researchers worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s forwards;
        }
        @keyframes shooting-star {
          0% { transform: translateX(-100px) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(1000px) translateY(200px); opacity: 0; }
        }
        @keyframes shooting-star-reverse {
          0% { transform: translateX(100px) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(-1000px) translateY(200px); opacity: 0; }
        }
        .animate-shooting-star {
          animation: shooting-star 3s ease-in-out infinite;
        }
        .animate-shooting-star-reverse {
          animation: shooting-star-reverse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}