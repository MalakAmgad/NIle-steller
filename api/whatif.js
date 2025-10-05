import fs from "fs";
import path from "path";
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "No question provided" });

    const csvPath = path.join(process.cwd(), "public", "data", "nasa_papers_meta_cleaned.csv");
    let csv = fs.existsSync(csvPath) ? fs.readFileSync(csvPath, "utf8") : "";

    const lines = csv.split("\n");
    const headers = lines[0];
    const rows = lines.slice(1);

    const questionLower = question.toLowerCase();
    const keywords = [
      'microgravity', 'gravity', 'space', 'radiation', 'astronaut',
      'bone', 'muscle', 'cell', 'dna', 'gene', 'protein', 'immune',
      'mars', 'moon', 'iss', 'orbit', 'cosmic', 'solar'
    ];

    const relevantPapers = rows
      .filter(row => {
        const rowLower = row.toLowerCase();
        return keywords.some(kw => questionLower.includes(kw) && rowLower.includes(kw))
            || rowLower.includes(questionLower.split(' ')[0]);
      })
      .slice(0, 3);

    const paperContext = relevantPapers.length > 0
      ? `\n\nRelevant papers:\n${headers}\n${relevantPapers.join("\n")}`
      : "\n\n(No matching papers found, provide expert analysis)";

    const prompt = `You are a space biology expert with access to NASA research papers.

${paperContext}

Question: "${question}"

Instructions:
1. Provide a scientifically reasoned answer (150-200 words)
2. If papers were provided, cite at least one by title or PMC_ID
3. Format as:

**Answer:** [explanation]

**References:** [paper titles/IDs or "Based on general space biology principles"]`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a space biology expert. Cite papers when available." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "API request failed");

    const answer = data?.choices?.[0]?.message?.content?.trim() || "No answer generated.";
    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
