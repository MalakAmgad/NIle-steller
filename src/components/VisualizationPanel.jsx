// src/components/VisualizationPanel.jsx
import React, { useContext } from "react";
import Plot from "react-plotly.js";
import { PaperContext } from "./PaperStore";

/*
 Very simple example visual:
 - counts of papers per year among filtered set
 - you can replace with more domain-specific charts (growth rate, gene expression)
*/

export default function VisualizationPanel() {
  const { filtered } = useContext(PaperContext);

  const years = (filtered || []).map((p) => (p.year ? String(p.year) : "unknown"));
  const counts = years.reduce((acc, y) => {
    acc[y] = (acc[y] || 0) + 1;
    return acc;
  }, {});
  const xs = Object.keys(counts).sort();
  const ys = xs.map((k) => counts[k]);

  return (
    <div className="p-4 border rounded-md bg-white">
      <h3 className="font-semibold">Visualizations</h3>
      <div className="mt-3">
        <Plot
          data={[{ x: xs, y: ys, type: "bar" }]}
          layout={{ title: "Papers by year (filtered set)", autosize: true }}
          style={{ width: "100%", height: "320px" }}
        />
      </div>
    </div>
  );
}
