import React from "react";
import { Link } from "react-router-dom";

export default function Satellites() {
  const satellites = [
    { id: 1, src: "/gallery/satellite.png", name: "NileSat-X1", status: "Active", orbit: "LEO" },
    { id: 2, src: "/gallery/moon.png", name: "Lunar Observer", status: "Active", orbit: "Lunar" },
    { id: 3, src: "/gallery/sate.png", name: "Aurora Link", status: "Active", orbit: "MEO" },
    { id: 4, src: "/gallery/gallrey.png", name: "Stellar Eye", status: "Active", orbit: "GEO" },
    { id: 5, src: "/gallery/earth.png", name: "Terra View", status: "Active", orbit: "LEO" }
  ];

  const reviews = [
    {
      id: 1,
      rating: 5,
      text: "The satellite imagery quality is absolutely exceptional. NileStellar's technology has revolutionized our research capabilities. The real-time data transmission is flawless.",
      author: "Dr. Sarah Chen",
      role: "Chief Astronomer",
      organization: "Space Research Institute",
      avatar: "SC",
      date: "2 weeks ago"
    },
    {
      id: 2,
      rating: 5,
      text: "Working with NileStellar's satellite network has been transformative. The precision and reliability of their systems exceed industry standards. Highly recommend for any serious space operations.",
      author: "Marcus Rodriguez",
      role: "Mission Director",
      organization: "Global Space Agency",
      avatar: "MR",
      date: "1 month ago"
    },
    {
      id: 3,
      rating: 5,
      text: "Incredible engineering and innovation. These satellites provide unparalleled coverage and data accuracy. The technology behind them is truly next-generation.",
      author: "Prof. Amara Johnson",
      role: "Aerospace Engineer",
      organization: "Tech University",
      avatar: "AJ",
      date: "3 weeks ago"
    }
  ];

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
                  <a className="hover:text-white" href="#about">
                    About
                  </a>
      
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
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/10 via-transparent to-indigo-900/10 pointer-events-none"></div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-1/4 w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
          <div className="absolute top-48 right-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 mb-6">
              <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-sky-400 text-sm font-medium">Orbital Fleet</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Our Satellites
            </h1>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-sky-500"></div>
              <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <circle cx="12" cy="12" r="6" strokeWidth={2} />
                <circle cx="12" cy="12" r="2" strokeWidth={2} />
              </svg>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-sky-500"></div>
            </div>
            
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Explore our advanced satellite constellation providing unprecedented coverage and data collection capabilities across multiple orbital zones
            </p>
          </div>

          {/* Satellite Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {satellites.map((satellite, index) => (
              <div 
                key={satellite.id}
                className="group relative bg-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all duration-500 opacity-0 animate-fade-in"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur">
                  <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    {satellite.status}
                  </span>
                </div>

                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 z-10"></div>
                  <img
                    src={satellite.src}
                    alt={satellite.name}
                    className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white mb-2">{satellite.name}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-400">Orbit:</span>
                    <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      {satellite.orbit}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/5 transition-colors duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Reviews Section */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Trusted by Professionals
              </h2>
              <p className="text-slate-400">
                See what industry leaders say about our satellite technology
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div 
                  key={review.id}
                  className="bg-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300 opacity-0 animate-fade-in"
                  style={{animationDelay: `${600 + index * 200}ms`}}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    "{review.text}"
                  </p>

                  <div className="flex items-start gap-3 pt-4 border-t border-slate-700/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {review.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm">{review.author}</p>
                      <p className="text-slate-400 text-xs">{review.role}</p>
                      <p className="text-slate-500 text-xs">{review.organization}</p>
                    </div>
                    <span className="text-slate-500 text-xs whitespace-nowrap">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {0% { opacity: 0; transform: translateY(20px); }100% { opacity: 1; transform: translateY(0); }}
        .animate-fade-in { animation: fade-in 0.8s forwards; }
      `}</style>
    </div>
    </div>

  );
}
