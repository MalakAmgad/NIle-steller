import React, { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import FilterBar from "./components/FilterBar.jsx";
import PublicationCard from "./components/PublicationCard.jsx";
import OrbitGlobe from "./components/OrbitGlobe.jsx";
import { ChevronDown } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [year, setYear] = useState("");
  const [organism, setOrganism] = useState("");
  const [journal, setJournal] = useState("");

  useEffect(() => {
    Papa.parse("/data/nasa_papers_meta_cleaned.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const clean = result.data
          .map((r) => ({
            id: r.PMC_ID || Math.random(),
            title: (r.Title || "").trim(),
            authors: (r.Authors || "").trim(),
            abstract: (r.Abstract || "").trim(),
            journal: (r.Journal || "").trim(),
            year: (r.Publication_Date || "").split(" ")[0],
            doi: (r.DOI || "").trim(),
            organism: (r.Organism || "").trim(),
            outcome: (r.Outcome_Indicators || "").trim(),
            link:
              (r.Source_Link || "").trim() ||
              (r.DOI ? `https://doi.org/${r.DOI}` : ""),
          }))
          .filter((d) => d.title);
        setData(clean);
      },
      error: (err) => console.error("CSV Load Error:", err),
    });
  }, []);

  // Extract dropdown options
  const years = useMemo(
    () => Array.from(new Set(data.map((d) => d.year))).filter(Boolean).sort((a, b) => b - a),
    [data]
  );

  const organisms = useMemo(
    () => Array.from(new Set(data.map((d) => d.organism))).filter(Boolean).sort(),
    [data]
  );

  const journals = useMemo(
    () => Array.from(new Set(data.map((d) => d.journal))).filter(Boolean).sort(),
    [data]
  );

  // Filtering logic
  const filtered = useMemo(() => {
    return data.filter((d) => {
      const matchQ =
        !q ||
        d.title.toLowerCase().includes(q.toLowerCase()) ||
        d.authors.toLowerCase().includes(q.toLowerCase()) ||
        d.abstract.toLowerCase().includes(q.toLowerCase());
      const matchYear = !year || d.year === year;
      const matchOrganism = !organism || d.organism === organism;
      const matchJournal = !journal || d.journal === journal;
      return matchQ && matchYear && matchOrganism && matchJournal;
    });
  }, [data, q, year, organism, journal]);

  // Limit results to 20
  const limitedResults = filtered.slice(0, 20);

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">NASA Bioscience Dashboard</h1>

          <div className="relative">
            <div className="flex">
              <a
                href="/"
                className="px-3 py-2 rounded-l-lg bg-slate-800/70 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-100"
              >
                Home
              </a>
              <button
                id="explore-trigger"
                className="px-3 py-2 rounded-r-lg bg-slate-800/70 border border-slate-700 border-l-0 hover:border-slate-500 hover:bg-slate-800 text-slate-100 flex items-center gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  const m = document.getElementById("explore-menu");
                  m?.classList.toggle("hidden");
                }}
                onMouseEnter={() =>
                  document.getElementById("explore-menu")?.classList.remove("hidden")
                }
              >
                Explore
                <ChevronDown size={16} className="opacity-80" />
              </button>
            </div>

            {/* Dropdown */}
            <div
              id="explore-menu"
              className="hidden absolute right-0 mt-2 w-56 rounded-xl border border-slate-700 bg-slate-900/95 backdrop-blur shadow-xl z-20"
              onMouseLeave={() =>
                document.getElementById("explore-menu")?.classList.add("hidden")
              }
            >
              <a
                href="/#orbit-earth"
                className="block px-4 py-3 text-slate-200 hover:bg-slate-800/70 rounded-t-xl"
              >
                ORBIT THE EARTH
              </a>
              <button
                className="w-full text-left block px-4 py-3 text-slate-200 hover:bg-slate-800/70 rounded-b-xl"
                onClick={() => alert("Choose your Adventure — coming soon!")}
              >
                Choose your Adventure
              </button>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <FilterBar
          q={q}
          setQ={setQ}
          year={year}
          setYear={setYear}
          subject={organism}
          setSubject={setOrganism}
          mission={journal}
          setMission={setJournal}
          years={years}
          subjects={organisms}
          missions={journals}
        />

        {/* Results */}
        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid gap-4">
            {limitedResults.map((item) => (
              <PublicationCard key={item.id} item={item} />
            ))}

            {filtered.length > 20 && (
              <p className="text-slate-400 text-sm">
                Showing 20 of {filtered.length} results. Refine your filters to narrow down.
              </p>
            )}

            {filtered.length === 0 && (
              <p className="text-slate-400">No results. Try a different search.</p>
            )}
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-sm uppercase tracking-widest text-slate-400 mb-2">
              3D Explorer
            </h3>
            <OrbitGlobe items={limitedResults} />
            <p className="text-xs text-slate-400 mt-2">
              Showing up to 12 filtered orbits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
