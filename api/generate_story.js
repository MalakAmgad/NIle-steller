// Vercel Serverless Function (Node.js)
// Creates a 5-scene kids' storyboard from a research paper.
// ENV required: OPENROUTER_API_KEY
// Optional:     OPENROUTER_MODEL  (e.g. "openai/gpt-4o-mini" or "meta-llama/llama-3.1-70b-instruct")

/** Read and parse JSON body safely (works on Vercel serverless). */
async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8") || "{}";
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/** Try to parse JSON from LLM output; if the model wrapped it with text, extract the first JSON block. */
function parseMaybeWrappedJSON(s) {
  try {
    return JSON.parse(s);
  } catch {
    const m = s && s.match(/\{[\s\S]*\}/);
    if (m) {
      try { return JSON.parse(m[0]); } catch {}
    }
    return null;
  }
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "openai/gpt-3.5-turbo";
    if (!apiKey) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "OPENROUTER_API_KEY not set" }));
      return;
    }

    const body = await readJson(req);
    const { item, sections = 5, language = "en-US" } = body || {};
    if (!item || !item.title) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Missing paper 'item' with at least a title" }));
      return;
    }

    // --- Build prompt ---
    const system = `You are a concise children's science storyteller.
Return ONLY compact JSON:
{"title": string, "scenes":[{"title": string, "text": string} ...exactly ${sections} items...]}`;
    const user = `Create a simple, friendly storyboard for kids from this research paper data.

Title: ${item.title}
Subject: ${item.subject || ""}
Mission: ${item.mission || ""}
Organism: ${item.organism || ""}
Instrument: ${item.instrument || ""}
Year: ${item.year || ""}
Journal: ${item.journal || ""}
DOI: ${item.doi || ""}
Abstract: ${item.abstract || item.outcome || "N/A"}

Constraints:
- Exactly ${sections} scenes in this order: Background, Objective, Methods, Results, Implications.
- Each scene 2–3 short sentences, ${language} tone.
- Avoid jargon; explain simply; stay factual to the provided fields.`;

    // --- Call OpenRouter (Node 18+ has global fetch) ---
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        // The next two headers are recommended by OpenRouter (not strictly required)
        "HTTP-Referer": process.env.SITE_URL || "http://localhost",
        "X-Title": "Space Bioscience Story Generator",
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    const j = await r.json();
    const content = j?.choices?.[0]?.message?.content ?? j?.choices?.[0]?.text ?? "";

    let json = parseMaybeWrappedJSON(content);

    // --- Deterministic fallback if LLM fails ---
    if (!json || !Array.isArray(json.scenes) || json.scenes.length === 0) {
      const bg =
        item.abstract ||
        item.outcome ||
        `This study explores ${item.subject || "space bioscience"}${item.mission ? ` on ${item.mission}` : ""}.`;
      const objective = `Understand how ${item.organism || "organisms"} respond in ${item.mission || "microgravity / spaceflight"} conditions.`;
      const methods = item.instrument
        ? `Experiments used ${item.instrument}${item.orbitAltKm ? ` at ~${item.orbitAltKm} km` : ""}${item.inclination ? `, ~${item.inclination}° inclination` : ""}.`
        : `Standard space-bio procedures were applied.`;
      const results = item.outcome || `Key physiological and phenotypic changes were observed.`;
      const implications = `Findings inform future ${(item.subject || "space biology").toLowerCase()} research and mission design${item.doi ? ` (DOI: ${item.doi})` : ""}.`;

      json = {
        title: item.title,
        scenes: [
          { title: "Background", text: bg },
          { title: "Objective", text: objective },
          { title: "Methods", text: methods },
          { title: "Results", text: results },
          { title: "Implications", text: implications },
        ],
      };
    }

    const storyText = json.scenes.map((s) => `${s.title}: ${s.text}`).join("\n\n");

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ title: json.title || item.title, scenes: json.scenes, storyText }));
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: e.message || "Story generation failed" }));
  }
};
