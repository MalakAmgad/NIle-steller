import fetch from "node-fetch";

export default async function handler(req, res) {
  console.log("🚀 [GENERATE-STORY] Function invoked!");
  console.log("📥 [GENERATE-STORY] Method:", req.method);
  console.log("📥 [GENERATE-STORY] Headers:", JSON.stringify(req.headers));
  
  if (req.method !== 'POST') {
    console.log("❌ [GENERATE-STORY] Wrong method, returning 405");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  console.log("✅ [GENERATE-STORY] POST method confirmed");

  try {
    console.log("📦 [GENERATE-STORY] Request body:", JSON.stringify(req.body));
    
    const { link, theme } = req.body;

    if (!theme && !link) {
      console.log("⚠️ [GENERATE-STORY] Missing theme and link");
      return res.status(400).json({ error: "Missing 'theme' or 'link' in request body" });
    }

    console.log("✅ [GENERATE-STORY] Theme:", theme);
    console.log("✅ [GENERATE-STORY] Link:", link);

    // Check API key
    const hasApiKey = !!process.env.OPENROUTER_API_KEY;
    console.log("🔑 [GENERATE-STORY] API Key present:", hasApiKey);
    if (!hasApiKey) {
      console.error("❌ [GENERATE-STORY] OPENROUTER_API_KEY is missing!");
      return res.status(500).json({ error: "Server configuration error: API key missing" });
    }
    console.log("🔑 [GENERATE-STORY] API Key length:", process.env.OPENROUTER_API_KEY.length);

    const storyPrompt = link
      ? `Write a cinematic 3-part sci-fi story inspired by the research paper at this link: ${link}. Focus on space biology, discovery, and emotional depth.`
      : `Write a 3-part cinematic sci-fi story about: ${theme}. Include a clear structure (Part 1: Setup, Part 2: Conflict, Part 3: Resolution). Make it immersive and emotionally engaging.`;

    console.log("📝 [GENERATE-STORY] Prompt created, length:", storyPrompt.length);
    console.log("📝 [GENERATE-STORY] Prompt preview:", storyPrompt.slice(0, 100) + "...");

    console.log("🌐 [GENERATE-STORY] Calling OpenRouter API...");
    const startTime = Date.now();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
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

    const apiTime = Date.now() - startTime;
    console.log(`⏱️ [GENERATE-STORY] OpenRouter API call took ${apiTime}ms`);
    console.log("📡 [GENERATE-STORY] Response status:", response.status);
    console.log("📡 [GENERATE-STORY] Response ok:", response.ok);

    const data = await response.json();
    console.log("📦 [GENERATE-STORY] Response data keys:", Object.keys(data));

    if (!response.ok) {
      console.error("❌ [GENERATE-STORY] API returned error:", JSON.stringify(data));
      throw new Error(`API error ${response.status}: ${JSON.stringify(data)}`);
    }

    console.log("✅ [GENERATE-STORY] API call successful");

    const storyText = data?.choices?.[0]?.message?.content?.trim();
    
    if (!storyText) {
      console.error("❌ [GENERATE-STORY] No story text in response!");
      throw new Error("No story generated");
    }

    console.log("📖 [GENERATE-STORY] Story text received, length:", storyText.length);
    console.log("📖 [GENERATE-STORY] Story preview:", storyText.slice(0, 100) + "...");

    // Split story into parts for visual scenes (limit to 3)
    console.log("✂️ [GENERATE-STORY] Splitting story into parts...");
    const parts = storyText.split(/\n\s*\n/).filter(Boolean);
    console.log("✂️ [GENERATE-STORY] Total parts found:", parts.length);
    
    const limitedParts = parts.slice(0, 3);
    console.log("✂️ [GENERATE-STORY] Using", limitedParts.length, "parts (max 3)");

    // Generate scene image URLs
    console.log("🎨 [GENERATE-STORY] Generating image URLs...");
    const scenes = limitedParts.map((part, i) => {
      const shortPrompt = part.slice(0, 150);
      const prompt = `scene ${i + 1} ${theme || 'space'}: ${shortPrompt}`;
      const encoded = encodeURIComponent(prompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=768&model=flux`;
      console.log(`🎨 [GENERATE-STORY] Scene ${i + 1} URL length:`, imageUrl.length);
      return { part: i + 1, text: part, imageUrl };
    });

    console.log("✅ [GENERATE-STORY] Generated", scenes.length, "scenes");
    console.log("📤 [GENERATE-STORY] Sending response...");

    const totalTime = Date.now() - startTime;
    console.log(`⏱️ [GENERATE-STORY] Total execution time: ${totalTime}ms`);

    res.status(200).json({ title: theme || link, storyText, scenes });
    console.log("✅ [GENERATE-STORY] Response sent successfully!");

  } catch (err) {
    console.error("💥 [GENERATE-STORY] CAUGHT ERROR:", err);
    console.error("💥 [GENERATE-STORY] Error name:", err.name);
    console.error("💥 [GENERATE-STORY] Error message:", err.message);
    console.error("💥 [GENERATE-STORY] Error stack:", err.stack);
    
    res.status(500).json({ 
      error: "Story generation failed", 
      details: err.message,
      errorName: err.name
    });
  }
}
