// src/components/PaperList.jsx
import React, { useContext } from "react";
import { PaperContext } from "./PaperStore";
import PaperItem from "./PaperItem";

export default function PaperList() {
  const { filtered, loading } = useContext(PaperContext);

  if (loading) return <div>Loading papers…</div>;
  if (!filtered || filtered.length === 0) return <div>No papers match your filters.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((p, i) => (
        <PaperItem key={p.id || i} paper={p} />
      ))}
    </div>
  );
}
