// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

// More permissive CORS for development
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true
}));

app.use(express.json());
const PORT = 5001;

// ✅ Test endpoint to verify server is running
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running!", timestamp: new Date().toISOString() });
});

// === Summarization API ===
app.post("/api/summarize", async (req, res) => {
  try {
    const { text, title, link } = req.body;

    if (!text && !title) {
      console.log("⚠️ No text or title provided in request body:", req.body);
      return res.status(400).json({ error: "No text provided" });
    }

    const prompt = text
      ? text
      : `Summarize this space biology paper titled "${title}". Paper link: ${link}`;

    console.log("➡️ Sending to OpenRouter with prompt:", prompt.slice(0, 150), "...");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "SpaceBio Dashboard Summarizer"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful scientific summarizer for space biology papers." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    console.log("📩 OpenRouter raw response:", data);

    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${JSON.stringify(data)}`);
    }

    const summary = data?.choices?.[0]?.message?.content?.trim() || "No summary generated.";
    res.json({ summary });
  } catch (err) {
    console.error("❌ Summarization failed:", err.message);
    res.status(500).json({ error: "Summarization failed", details: err.message });
  }
});

// === What-If Chat API ===
app.post("/api/whatif", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "No question provided" });

    console.log("📥 What-If question:", question);

    // Load NASA CSV data
    const csvPath = path.join(process.cwd(), "public", "data", "nasa_papers_meta_cleaned.csv");
    let csv = "";
    
    if (fs.existsSync(csvPath)) {
      csv = fs.readFileSync(csvPath, "utf8");
      console.log("✅ CSV loaded");
    } else {
      console.log("⚠️ CSV not found at:", csvPath);
    }

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
        return keywords.some(kw => 
          questionLower.includes(kw) && rowLower.includes(kw)
        ) || rowLower.includes(questionLower.split(' ')[0]);
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

    console.log(`🔍 Found ${relevantPapers.length} relevant papers`);
    console.log("🚀 Calling OpenRouter API...");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "SpaceBio What-If Chat",
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
    console.log("📦 Response status:", response.status);

    if (!response.ok) {
      console.error("❌ API Error:", data.error);
      throw new Error(data.error?.message || "API request failed");
    }

    const answer = data?.choices?.[0]?.message?.content?.trim() || "No answer generated.";
    console.log("✅ Answer generated");
    res.json({ answer });
    
  } catch (err) {
    console.error("❌ What-If error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add process error handlers to prevent silent crashes
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
});

//////
app.post("/api/generate-story", async (req, res) => {
  try {
    const { link, theme } = req.body;

    if (!theme && !link) {
      return res.status(400).json({ error: "Missing 'theme' or 'link' in request body" });
    }

    const storyPrompt = link
      ? `Write a cinematic 3-part sci-fi story inspired by the research paper at this link: ${link}. 
         Focus on space biology, discovery, and emotional depth.`
      : `Write a 3-part cinematic sci-fi story about: ${theme}. 
         Include a clear structure (Part 1: Setup, Part 2: Conflict, Part 3: Resolution).
         Make it immersive and emotionally engaging.`;

    console.log("🚀 Generating story with prompt:", storyPrompt.slice(0, 150), "...");

    // Call OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "SpaceBio Story Generator",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a creative science fiction writer who blends real NASA biology with imaginative storytelling." },
          { role: "user", content: storyPrompt },
        ],
        temperature: 0.9,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    console.log("📦 Story generation response:", data);

    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${JSON.stringify(data)}`);
    }

    const storyText = data?.choices?.[0]?.message?.content?.trim() || "No story generated.";

    // Split story into parts for visual scenes
    const parts = storyText.split(/\n\s*\n/).filter(Boolean);

    const scenes = await Promise.all(
      parts.map(async (part, i) => {
        const prompt = `scene ${i + 1} ${theme || link}: ${part}`;
        const encoded = encodeURIComponent(prompt);
        const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=768&model=flux`;
        return { part: i + 1, text: part, imageUrl };
      })
    );

    res.json({ title: theme || link, storyText, scenes });
  } catch (err) {
    console.error("❌ Story generation failed:", err.message);
    res.status(500).json({ error: "Story generation failed", details: err.message });
  }
});

// Start server with error handling
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ Test health endpoint: http://localhost:${PORT}/api/health`);
  console.log(`✅ API Key loaded: ${process.env.OPENROUTER_API_KEY ? 'Yes' : 'No ⚠️'}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Kill the process or use a different port.`);
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
});