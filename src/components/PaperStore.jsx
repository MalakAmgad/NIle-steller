// src/components/PaperStore.jsx
import React, { createContext, useEffect, useState } from "react";
import Papa from "papaparse";

export const PaperContext = createContext();

export function PaperProvider({ children }) {
  const [papers, setPapers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try CSV first; if missing, fall back to local JSON (/src/data/bioscience_samples.json)
    async function loadPapers() {
      // Helper to normalize records to a common shape
      const normalize = (r) => ({
        id: r.id || r.ID || null,
        title: r.title || r.Title || r.paper_title || "Untitled",
        year: Number(r.year || r.Year || r.pub_year || "") || null,
        journal: r.journal || r.Journal || r.source || null,
        authors: r.authors || r.Authors || r.author || null,
        abstract: r.abstract || r.Abstract || r.summary || null,
        subject: r.subject || r.Subject || r.topic || null,
        organism: r.organism || r.Organism || null,
        mission: r.mission || r.Mission || null,
        doi: r.doi || r.DOI || null,
        link: r.link || r.url || r.URL || null,
        image: r.image || null,
        orbitAltKm: r.orbitAltKm ? Number(r.orbitAltKm) : null,
        inclination: r.inclination ? Number(r.inclination) : null,
      });
      try {
        const res = await fetch('/data/nasa_papers_meta_cleaned.csv', { cache: 'no-store' });
        if (!res.ok) throw new Error('CSV not found');
        const csvText = await res.text();
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        const rows = (parsed?.data || []).map(normalize).filter(x => x && x.title);
        setPapers(rows);
        setFiltered(rows);
        setLoading(false);
      } catch (e) {
        // Fallback: local JSON within src
        try {
          const mod = await import('../data/bioscience_samples.json');
          const rows = (mod?.default || []).map(normalize);
          setPapers(rows);
          setFiltered(rows);
        } catch (err) {
          console.error('Failed to load papers from CSV and JSON:', err);
        } finally {
          setLoading(false);
        }
      }
    }
    loadPapers();
    fetch("/data/papers.csv")
      .then((r) => r.text())
      .then((csvText) => {
        const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        setPapers(data);
        // default filter: ISS + Arabidopsis + Veggie
        const def = data.filter(
          (p) =>
            (p.mission?.toLowerCase() || "").includes("iss") &&
            (p.organism?.toLowerCase() || "").includes("arabidopsis") &&
            (p.instrument?.toLowerCase() || "").includes("veggie")
        );
        setFiltered(def);
      })
      .catch((err) => {
        console.error("Failed to load papers.csv", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filter = (filters) => {
    // simple filter function; filters: { mission, organism, instrument, subject }
    const res = papers.filter((p) => {
      if (filters.mission && !(p.mission || "").toLowerCase().includes(filters.mission.toLowerCase())) return false;
      if (filters.organism && !(p.organism || "").toLowerCase().includes(filters.organism.toLowerCase())) return false;
      if (filters.instrument && !(p.instrument || "").toLowerCase().includes(filters.instrument.toLowerCase())) return false;
      if (filters.subject && !(p.subject || "").toLowerCase().includes(filters.subject.toLowerCase())) return false;
      return true;
    });
    setFiltered(res);
  };

  return (
    <PaperContext.Provider value={{ papers, filtered, loading, filter }}>
      {children}
    </PaperContext.Provider>
  );
}
