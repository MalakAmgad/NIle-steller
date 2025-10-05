import React from "react";
import { Link } from "react-router-dom";

export default function Gallery() {
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

      {/* 🌌 GALLERY CONTENT */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-transparent to-sky-900/10 pointer-events-none"></div>
        
        {/* Floating stars effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-40 w-1 h-1 bg-sky-300 rounded-full animate-pulse delay-100"></div>
          <div className="absolute bottom-60 left-1/4 w-1 h-1 bg-indigo-300 rounded-full animate-pulse delay-200"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Header section */}
          <div className="mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Space Gallery
            </h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-sky-500"></div>
              <svg className="w-6 h-6 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM2 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012 10zM15 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0115 10z" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-sky-500"></div>
            </div>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Journey through the cosmos with our curated collection of stunning space imagery and mission highlights
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {/* Image 1 */}
            <div className="group relative bg-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/5 transition-colors duration-500"></div>
              <img
                src="/gallery/astro.png"
                alt="Astronaut"
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-xl font-semibold text-white mb-1">Astronaut EVA</h3>
                <p className="text-sky-300 text-sm">Extravehicular Activity</p>
              </div>
            </div>



            {/* Image 2 */}
            <div className="group relative bg-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-500"></div>
              <img
                src="/gallery/earth.png"
                alt="Earth"
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-xl font-semibold text-white mb-1">Earth from Orbit</h3>
                <p className="text-blue-300 text-sm">Our Blue Marble</p>
              </div>
            </div>

            {/* Image 3 */}
            <div className="group relative bg-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors duration-500"></div>
              <img
                src="/gallery/space car.png"
                alt="Space Car"
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-xl font-semibold text-white mb-1">Cosmic Voyager</h3>
                <p className="text-indigo-300 text-sm">Deep Space Explorer</p>
              </div>
            </div>

            {/* Image 4 */}
            <div className="group relative bg-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors duration-500"></div>
              <img
                src="/gallery/sun.png"
                alt="Sun"
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-xl font-semibold text-white mb-1">Solar Surface</h3>
                <p className="text-amber-300 text-sm">Our Life-Giving Star</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    );
    }
  

