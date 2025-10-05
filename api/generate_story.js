import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { link, theme } = req.body;
    if (!theme && !link) return res.status(400).json({ error: "Missing 'theme' or 'link'" });

    const storyPrompt = link
      ? `Write a cinematic 3-part sci-fi story inspired by the research paper at this link: ${link}.`
      : `Write a 3-part cinematic sci-fi story about: ${theme}.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a creative science fiction writer blending real space biology with storytelling." },
          { role: "user", content: storyPrompt },
        ],
        temperature: 0.9,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(`API error ${response.status}: ${JSON.stringify(data)}`);

    const storyText = data?.choices?.[0]?.message?.content?.trim() || "No story generated.";
    const parts = storyText.split(/\n\s*\n/).filter(Boolean);

    const scenes = parts.map((part, i) => ({
      part: i + 1,
      text: part,
      imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(`scene ${i + 1} ${theme || link}: ${part}`)}?width=1024&height=768&model=flux`
    }));

    res.status(200).json({ title: theme || link, storyText, scenes });
  } catch (err) {
    res.status(500).json({ error: "Story generation failed", details: err.message });
  }
}
