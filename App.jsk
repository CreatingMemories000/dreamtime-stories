import { useState, useEffect, useRef } from "react";

const STAR_COUNT = 60;

const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

const CHARACTERS = ["🦁 Lion", "🐉 Dragon", "🧚 Fairy", "🦊 Fox", "🐻 Bear", "🧜 Mermaid", "🦄 Unicorn", "🐸 Frog"];
const SETTINGS = ["🌲 Enchanted Forest", "🏰 Magic Castle", "🌊 Underwater Kingdom", "☁️ Cloud Kingdom", "🍄 Mushroom Village", "🌙 Moon City"];
const THEMES = ["🤝 Friendship", "🦸 Bravery", "💡 Cleverness", "❤️ Kindness", "🔍 Discovery", "🎁 Sharing"];

const moonPhases = ["🌑", "🌒", "🌓", "🌔", "🌕"];

export default function BedtimeStoryApp() {
  const [step, setStep] = useState("home");
  const [character, setCharacter] = useState("");
  const [setting, setSetting] = useState("");
  const [theme, setTheme] = useState("");
  const [childName, setChildName] = useState("");
  const [story, setStory] = useState("");
  const [error, setError] = useState("");
  const [moonIdx, setMoonIdx] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const storyRef = useRef(null);

  useEffect(() => {
    if (step === "loading") {
      const interval = setInterval(() => {
        setMoonIdx((prev) => (prev + 1) % moonPhases.length);
      }, 400);
      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (step === "story" && story) {
      setVisibleChars(0);
      let i = 0;
      const interval = setInterval(() => {
        i += 3;
        setVisibleChars(i);
        if (i >= story.length) clearInterval(interval);
      }, 18);
      return () => clearInterval(interval);
    }
  }, [step, story]);

  const generateStory = async () => {
    setStep("loading");
    setError("");
    setStory("");

    const nameStr = childName.trim() ? `The main child character is named ${childName}.` : "";
    const prompt = `Write a magical, soothing bedtime story for young children (ages 4-8). 
${nameStr}
Main character: ${character}
Setting: ${setting}  
Theme/lesson: ${theme}

Guidelines:
- Gentle, calming tone perfect for bedtime
- About 250-300 words
- Simple vocabulary kids understand
- Has a warm, happy, sleepy ending
- Include some soft, dreamy imagery
- No scary or exciting content
- End with the characters drifting peacefully to sleep

Write only the story, no title needed.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const text = data.content?.map((b) => b.text || "").join("") || "";
      if (!text) throw new Error("No story returned");
      setStory(text);
      setStep("story");
    } catch (e) {
      setError("Oops! The story fairies are resting. Try again!");
      setStep("customize");
    }
  };

  const reset = () => {
    setStep("home");
    setCharacter("");
    setSetting("");
    setTheme("");
    setChildName("");
    setStory("");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a0520 0%, #1a0a35 40%, #0d1a3a 70%, #0a2040 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {stars.map((s) => (
          <div key={s.id} style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "white",
            animation: `twinkle ${s.duration}s ${s.delay}s infinite alternate`,
            opacity: 0.7,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes twinkle { from { opacity: 0.2; transform: scale(0.8); } to { opacity: 1; transform: scale(1.3); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        .card-btn {
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 16px;
          color: #e8d5ff;
          padding: 12px 10px;
          cursor: pointer;
          font-size: 13px;
          font-family: Georgia, serif;
          transition: all 0.25s;
          text-align: center;
          backdrop-filter: blur(8px);
        }
        .card-btn:hover { background: rgba(180,120,255,0.2); border-color: rgba(180,120,255,0.5); transform: scale(1.04); }
        .card-btn.selected { background: rgba(180,120,255,0.3); border-color: #b47aff; box-shadow: 0 0 18px rgba(180,120,255,0.4); color: white; }
        .magic-btn {
          background: linear-gradient(135deg, #7c3aed, #4f46e5, #7c3aed);
          background-size: 200% 200%;
          border: none;
          border-radius: 50px;
          color: white;
          padding: 16px 40px;
          font-size: 18px;
          font-family: Georgia, serif;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 30px rgba(124,58,237,0.5);
          letter-spacing: 0.5px;
        }
        .magic-btn:hover:not(:disabled) { transform: translateY(-3px) scale(1.04); box-shadow: 0 8px 40px rgba(124,58,237,0.7); }
        .magic-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .story-text { animation: fadeIn 0.5s ease forwards; line-height: 2; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(180,120,255,0.3); border-radius: 4px; }
      `}</style>

      <div style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "30px 20px 60px",
        position: "relative",
        zIndex: 10,
        animation: "fadeIn 0.6s ease forwards",
      }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 56, animation: "float 4s ease-in-out infinite", display: "block", marginBottom: 8 }}>🌙</div>
          <h1 style={{
            color: "#f0e6ff",
            fontSize: 30,
            fontWeight: "normal",
            letterSpacing: 1,
            margin: 0,
            textShadow: "0 0 30px rgba(180,120,255,0.6)",
          }}>Dreamtime Stories</h1>
          <p style={{ color: "#9b7dca", fontSize: 14, margin: "8px 0 0", fontStyle: "italic" }}>A magical bedtime story, just for you ✨</p>
        </div>

        {step === "home" && (
          <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 24,
              padding: "40px 30px",
              backdropFilter: "blur(12px)",
              marginBottom: 28,
            }}>
              <p style={{ color: "#c4a8ff", fontSize: 16, lineHeight: 1.7, margin: "0 0 28px" }}>
                Ready for a bedtime adventure? Let's create a magical story made just for tonight. 🌟
              </p>
              <div style={{ marginBottom: 24 }}>
                <label style={{ color: "#9b7dca", fontSize: 13, display: "block", marginBottom: 8 }}>What's your name? (optional)</label>
                <input
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g. Emma, Leo..."
                  maxLength={20}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    borderRadius: 12,
                    padding: "12px 16px",
                    color: "#f0e6ff",
                    fontSize: 16,
                    fontFamily: "Georgia, serif",
                    width: "100%",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>
              <button className="magic-btn" onClick={() => setStep("customize")}>Begin the Magic ✨</button>
            </div>
          </div>
        )}

        {step === "customize" && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            {error && (
              <div style={{
                background: "rgba(255,100,100,0.15)",
                border: "1px solid rgba(255,100,100,0.3)",
                borderRadius: 12,
                padding: "12px 16px",
                color: "#ffb3b3",
                marginBottom: 20,
                textAlign: "center",
                fontSize: 14,
              }}>{error}</div>
            )}
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ color: "#c4a8ff", fontSize: 15, margin: "0 0 12px", letterSpacing: 0.5 }}>🌟 Choose your hero</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {CHARACTERS.map((c) => (
                  <button key={c} className={`card-btn ${character === c ? "selected" : ""}`} onClick={() => setCharacter(c)}>{c}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ color: "#c4a8ff", fontSize: 15, margin: "0 0 12px", letterSpacing: 0.5 }}>🗺️ Where does the story take place?</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {SETTINGS.map((s) => (
                  <button key={s} className={`card-btn ${setting === s ? "selected" : ""}`} onClick={() => setSetting(s)}>{s}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ color: "#c4a8ff", fontSize: 15, margin: "0 0 12px", letterSpacing: 0.5 }}>💫 What's the story about?</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {THEMES.map((t) => (
                  <button key={t} className={`card-btn ${theme === t ? "selected" : ""}`} onClick={() => setTheme(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexDirection: "column", alignItems: "center" }}>
              <button className="magic-btn" disabled={!character || !setting || !theme} onClick={generateStory}>Weave the Story 🌙</button>
              <button onClick={reset} style={{ background: "none", border: "none", color: "#6b5280", cursor: "pointer", fontSize: 13 }}>← Back</button>
            </div>
          </div>
        )}

        {step === "loading" && (
          <div style={{ textAlign: "center", padding: "60px 20px", animation: "fadeIn 0.5s ease" }}>
            <div style={{ fontSize: 72, marginBottom: 20, animation: "float 1.5s ease-in-out infinite" }}>{moonPhases[moonIdx]}</div>
            <p style={{ color: "#c4a8ff", fontSize: 18, margin: "0 0 8px" }}>The story fairies are writing...</p>
            <p style={{ color: "#6b5280", fontSize: 13, fontStyle: "italic" }}>Sprinkling in some magic dust ✨</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#7c3aed", animation: `shimmer 1.2s ${i * 0.3}s infinite` }} />
              ))}
            </div>
          </div>
        )}

        {step === "story" && story && (
          <div style={{ animation: "fadeIn 0.6s ease" }}>
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(180,120,255,0.2)",
              borderRadius: 24,
              padding: "32px 28px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 60px rgba(124,58,237,0.15)",
              marginBottom: 24,
              maxHeight: "55vh",
              overflowY: "auto",
            }} ref={storyRef}>
              <p className="story-text" style={{ color: "#e8d5ff", fontSize: 16, margin: 0 }}>
                {story.slice(0, visibleChars)}
                {visibleChars < story.length && <span style={{ animation: "shimmer 0.8s infinite", opacity: 0.6 }}>▌</span>}
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="magic-btn" onClick={() => { setStep("customize"); setStory(""); }}>Another Story 🌟</button>
              <button onClick={reset} style={{
                background: "rgba(255,255,255,0.06)",
                border: "1.5px solid rgba(255,255,255,0.15)",
                borderRadius: 50,
                color: "#c4a8ff",
                padding: "14px 28px",
                fontSize: 15,
                fontFamily: "Georgia, serif",
                cursor: "pointer",
              }}>🏠 Home</button>
            </div>
            <p style={{ textAlign: "center", color: "#4a3660", fontSize: 12, marginTop: 20, fontStyle: "italic" }}>Sweet dreams 🌙 Time to close your eyes...</p>
          </div>
        )}
      </div>
    </div>
  );
}
