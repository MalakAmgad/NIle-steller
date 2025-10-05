# generate_story.py
import sys, json, os, base64, tempfile
import google.generativeai as genai
from gtts import gTTS

# === Configure Gemini ===
genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-pro")

def generate_story(prompt="Write a creative story about space biology."):
    """Generate story, optional scenes, and voice narration."""
    try:
        # --- Generate story text ---
        result = model.generate_content(prompt)
        story = result.text.strip()

        # --- Split into simple scenes ---
        parts = [p.strip() for p in story.split("\n\n") if p.strip()]
        scenes = [{"title": f"Scene {i+1}", "text": t} for i, t in enumerate(parts[:8])]

        # --- Generate TTS audio ---
        tts = gTTS(text=story, lang="en")
        audio_dir = os.path.join(os.getcwd(), "public", "audio")
        os.makedirs(audio_dir, exist_ok=True)
        audio_path = os.path.join(audio_dir, "story.mp3")
        tts.save(audio_path)

        return {
            "title": "Generated Story",
            "story": story,
            "scenes": scenes,
            "audio": "/audio/story.mp3"
        }
    except Exception as e:
        return {"error": str(e)}

def main():
    try:
        raw_input = sys.stdin.read()
        data = json.loads(raw_input or "{}")
        prompt = data.get("prompt") or "Write a short story about a discovery in space biology."
        result = generate_story(prompt)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
