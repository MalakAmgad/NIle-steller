/**
 * useSpeechDual — Web Speech wrapper for two alternating voices.
 * - setEnabled: toggle narration
 * - setVoices: manually override A/B by name (optional)
 * - speakScene({ narrator, elara, rafe }): speaks in sequence
 * - cancel(): stop current speech
 */
import { useCallback, useEffect, useRef, useState } from "react";

function pickVoiceByHint(list, hint) {
  if (!hint) return null;
  const norm = hint.toLowerCase();
  return (
    list.find(v => v.name.toLowerCase().includes(norm)) ||
    list.find(v => (v.lang || "").toLowerCase().startsWith(norm)) ||
    null
  );
}

function autoPickVoices(list) {
  // Prefer rich Google voices when available
  const prefer = [
    "Google UK English Male", "Google US English", "Google UK English Female",
    "Microsoft", "Apple"
  ];
  const byPref = (name) => list.find(v => v.name.includes(name));
  const a = byPref("Google UK English Male") || byPref("Google US English") || list[0] || null;
  const b = byPref("Google UK English Female") || byPref("Google US English") || list[1] || list[0] || null;
  return { A: a, B: b };
}

export default function useSpeechDual() {
  const [enabled, setEnabled] = useState(false);
  const [voices, setVoices] = useState([]);
  const [voiceA, setVoiceA] = useState(null);
  const [voiceB, setVoiceB] = useState(null);
  const queueRef = useRef([]);
  const speakingRef = useRef(false);

  // Load voices (async on some browsers)
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    function loadVoices() {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      if (!voiceA || !voiceB) {
        const auto = autoPickVoices(v);
        setVoiceA(auto.A);
        setVoiceB(auto.B);
      }
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []); // eslint-disable-line

  const cancel = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    speakingRef.current = false;
    window.speechSynthesis.cancel();
    queueRef.current = [];
  }, []);

  const speakOnce = useCallback((text, voice, opts={}) => {
    if (!text) return Promise.resolve();
    return new Promise((resolve) => {
      const u = new SpeechSynthesisUtterance(text);
      u.voice = voice || null;
      u.lang = opts.lang || (voice && voice.lang) || "en-US";
      u.rate = opts.rate ?? 1.0;
      u.pitch = opts.pitch ?? 1.0;
      u.onend = resolve;
      u.onerror = resolve;
      window.speechSynthesis.speak(u);
    });
  }, []);

  const speakScene = useCallback(async ({ narrator, elara, rafe }) => {
    if (!enabled || !("speechSynthesis" in window)) return;
    cancel(); // stop any previous
    speakingRef.current = true;
    // Narrator (deeper), then Elara (A), then Rafe (B)
    await speakOnce(narrator, voiceA, { rate: 0.95, pitch: 0.9 });
    if (!speakingRef.current) return;
    await speakOnce(elara, voiceA, { rate: 1.02, pitch: 1.1 });
    if (!speakingRef.current) return;
    await speakOnce(rafe, voiceB, { rate: 0.98, pitch: 0.9 });
  }, [enabled, voiceA, voiceB, cancel, speakOnce]);

  useEffect(() => () => cancel(), [cancel]);

  return {
    supported: "speechSynthesis" in window,
    enabled, setEnabled,
    voices, voiceA, voiceB, setVoiceA, setVoiceB,
    speakScene, cancel
  };
}
