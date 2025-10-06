export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { link, theme } = req.body;

    if (!theme && !link) {
      return res.status(400).json({ error: "Missing 'theme' or 'link'" });
    }

    let storyPrompt;
    
    if (link) {
      // Enhanced scientific storytelling prompt
      storyPrompt = `Create a scientifically-grounded 3-part sci-fi story based on this research: ${link}
      
SCIENTIFIC STORYTELLING FRAMEWORK:
PART 1: THE DISCOVERY - Introduce the real biological phenomenon from the paper as a central plot element
PART 2: THE CRISIS - Show the physiological consequences playing out in a space mission context  
PART 3: THE SOLUTION - Resolve using plausible scientific interventions related to the research

REQUIREMENTS:
- Feature the actual organism from the study (mice, humans, etc.)
- Incorporate the specific biological mechanisms mentioned
- Make the scientific challenge the central conflict
- Keep emotional depth while respecting the science
- Use accurate terminology from the field

Example approach: If the paper shows microgravity causes bone loss through osteoclast activity, create a story where astronauts must solve this exact problem during a long-term mission.`;
    } else {
      storyPrompt = `Write a 3-part cinematic sci-fi story about: ${theme}. 
         Include a clear structure (Part 1: Setup, Part 2: Conflict, Part 3: Resolution).
         Make it immersive and emotionally engaging.`;
    }

    console.log("🔬 Generating scientifically-grounded story...");

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
            content: "You are a science-literate fiction writer who creates stories grounded in real NASA biology research. You blend accurate science with compelling narratives.",
          },
          { role: "user", content: storyPrompt },
        ],
        temperature: 0.7, // Lower temperature for more scientific accuracy
        max_tokens: 1200,
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

    // Enhanced image prompts for scientific context
    const scenes = parts.map((part, i) => {
      const scientificContext = link ? "NASA biology research space mission" : "sci-fi";
      const imagePrompt = `cinematic scene ${i + 1}, ${scientificContext}: ${part}, scientific illustration style`;
      const encoded = encodeURIComponent(imagePrompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=512&height=384&model=flux`;
      return { part: i + 1, text: part, imageUrl };
    });

    res.status(200).json({ 
      title: theme || `Inspired by: ${link}`, 
      storyText, 
      scenes,
      scientific: !!link // Flag to indicate scientific basis
    });
    
  } catch (err) {
    console.error("❌ Story generation failed:", err.message);
    res.status(500).json({ error: "Story generation failed", details: err.message });
  }
}
