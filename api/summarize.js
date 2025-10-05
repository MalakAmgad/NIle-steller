import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { text, title, link } = req.body;

    if (!text && !title) {
      return res.status(400).json({ error: "No text provided" });
    }

    const prompt = text
      ? text
      : `Summarize this space biology paper titled "${title}". Paper link: ${link}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
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

    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${JSON.stringify(data)}`);
    }

    const summary = data?.choices?.[0]?.message?.content?.trim() || "No summary generated.";
    res.status(200).json({ summary });
  } catch (err) {
    res.status(500).json({ error: "Summarization failed", details: err.message });
  }
}
