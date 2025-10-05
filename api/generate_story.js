// api/generate-story.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log(`❌ Wrong method: ${req.method}`);
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    console.log('📥 Request body:', JSON.stringify(req.body));
    
    const { link, theme } = req.body;

    if (!theme && !link) {
      console.log('⚠️ Missing theme and link');
      return res.status(400).json({ error: "Missing 'theme' or 'link' in request body" });
    }

    // Check if API key exists
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('❌ OPENROUTER_API_KEY not set in environment variables');
      return res.status(500).json({ error: 'Server configuration error: API key missing' });
    }

    const storyPrompt = link
      ? `Write a cinematic 3-part sci-fi story inspired by the research paper at this link: ${link}. 
         Focus on space biology, discovery, and emotional depth. 
         Structure it clearly with Part 1, Part 2, and Part 3 headings.`
      : `Write a 3-part cinematic sci-fi story about: ${theme}. 
         Include a clear structure (Part 1: Setup, Part 2: Conflict, Part 3: Resolution).
         Make it immersive and emotionally engaging.`;

    console.log("🚀 Generating story. Theme:", theme || link);

    // Call OpenRouter API with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000); // 25s timeout (Vercel limit is 10s for hobby, 60s for pro)

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.VERCEL_URL || "https://your-app.vercel.app",
        "X-Title": "SpaceBio Story Generator",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "You are a creative science fiction writer who blends real NASA biology with imaginative storytelling. Always structure stories with clear Part 1, Part 2, Part 3 sections." 
          },
          { role: "user", content: storyPrompt },
        ],
        temperature: 0.9,
        max_tokens: 1000,
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    const data = await response.json();
    console.log("📦 API Response status:", response.status);

    if (!response.ok) {
      console.error('❌ OpenRouter API error:', data);
      throw new Error(`API error ${response.status}: ${data.error?.message || JSON.stringify(data)}`);
    }

    const storyText = data?.choices?.[0]?.message?.content?.trim();
    
    if (!storyText) {
      throw new Error('No story content received from API');
    }

    console.log('✅ Story generated, length:', storyText.length);

    // Split story into parts - try multiple delimiters
    let parts = storyText.split(/(?:Part \d+:|##\s*Part \d+|\n\s*\n\s*\n)/i).filter(p => p.trim().length > 0);
    
    // If split didn't work well, try splitting by double newlines
    if (parts.length < 2) {
      parts = storyText.split(/\n\s*\n/).filter(p => p.trim().length > 50);
    }

    // Limit to 3 parts maximum
    parts = parts.slice(0, 3);
    
    console.log(`📝 Split into ${parts.length} parts`);

    // Generate scenes with images - do sequentially to avoid overwhelming Pollinations API
    const scenes = [];
    for (let i = 0; i < Math.min(parts.length, 3); i++) {
      const part = parts[i];
      // Extract key phrases for better image generation
      const shortText = part.slice(0, 150).replace(/[^\w\s]/g, ' ');
      const prompt = `cinematic sci-fi scene: ${theme || 'space biology'} ${shortText}`;
      const encoded = encodeURIComponent(prompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=768&model=flux&nologo=true`;
      
      scenes.push({ 
        part: i + 1, 
        text: part.trim(), 
        imageUrl 
      });
    }

    console.log('✅ Generated', scenes.length, 'scenes');

    res.status(200).json({ 
      title: theme || link, 
      storyText, 
      scenes 
    });

  } catch (err) {
    console.error("❌ Story generation failed:", err);
    
    // Handle specific error types
    if (err.name === 'AbortError') {
      return res.status(504).json({ 
        error: "Request timeout", 
        details: "Story generation took too long. Please try again." 
      });
    }
    
    res.status(500).json({ 
      error: "Story generation failed", 
      details: err.message 
    });
  }
}
