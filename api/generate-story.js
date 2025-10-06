export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { link, theme } = req.body;

    if (!theme && !link) {
      return res.status(400).json({ error: "Missing 'theme' or 'link'" });
    }

    const storyPrompt = link
      ? `Write a cinematic 3-part sci-fi story inspired by the research paper at this link: ${link}. 
         Focus on space biology, discovery, and emotional depth.`
      : `Write a 3-part cinematic sci-fi story about: ${theme}. 
         Include a clear structure (Part 1: Setup, Part 2: Conflict, Part 3: Resolution).
         Make it immersive and emotionally engaging.`;

    console.log("🚀 Generating story with prompt:", storyPrompt.slice(0, 150), "...");

    // Call OpenRouter API using native fetch (Node 18+)
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a creative science fiction writer who blends real NASA biology with imaginative storytelling.",
          },
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

    // Map scenes synchronously
    const scenes = parts.map((part, i) => {
      const imagePrompt = `scene ${i + 1} ${theme || link}: ${part}`;
      const encoded = encodeURIComponent(imagePrompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=512&height=384&model=flux`;
      return { part: i + 1, text: part, imageUrl };
    });


;//`https://image.pollinations.ai/prompt/${encoded}?width=256&height=192&model=flux`;
      return { part: i + 1, text: part, imageUrl };
    });

    res.status(200).json({ title: theme || link, storyText, scenes });
  } catch (err) {
    console.error("❌ Story generation failed:", err.message);
    res.status(500).json({ error: "Story generation failed", details: err.message });
  }
}
