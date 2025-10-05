import React from "react";

export default function FilterBar({ q, setQ, year, setYear, subject, setSubject, mission, setMission, years, subjects, missions }) {
  return (
    <div className="grid md:grid-cols-5 gap-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search title / organism / outcome"
        className="md:col-span-2 px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 focus:outline-none focus:border-sky-500"
      />
      <select value={year} onChange={(e)=>setYear(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700">
        <option value="">Year</option>
        {years.map((y)=> <option key={y} value={y}>{y}</option>)}
      </select>
      <select value={subject} onChange={(e)=>setSubject(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700">
        <option value="">Subject</option>
        {subjects.map((s)=> <option key={s} value={s}>{s}</option>)}
      </select>
      <select value={mission} onChange={(e)=>setMission(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700">
        <option value="">Mission</option>
        {missions.map((m)=> <option key={m} value={m}>{m}</option>)}
      </select>
    </div>
  );
}
