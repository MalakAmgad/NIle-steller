import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/** Mini Space-Bio Quiz — fun, fast, keyboard friendly */
const QUESTIONS = [
  {
    q: "What is the main reason bone density drops in microgravity?",
    choices: [
      "Lower calcium in space food",
      "Reduced mechanical loading on bones",
      "Extra radiation melts bone",
      "Spacesuits squeeze bones",
    ],
    correct: 1,
    tip: "No weight bearing → osteoclasts win over osteoblasts.",
  },
  {
    q: "Plants sense gravity on Earth using…",
    choices: ["Photons", "Statoliths", "Xylem valves", "Leaf hairs"],
    correct: 1,
    tip: "Statoliths settle inside cells; not much settling in micro-g.",
  },
  {
    q: "Which orbit is best for **rapid** experiment turnaround?",
    choices: ["GEO (~36,000 km)", "LEO (300–1500 km)", "MEO", "HEO"],
    correct: 1,
    tip: "LEO has quick access and frequent re-supply.",
  },
  {
    q: "CRISPR is primarily used to…",
    choices: [
      "Image cells",
      "Edit DNA sequences",
      "Freeze samples",
      "Measure oxygen",
    ],
    correct: 1,
    tip: "Cas9 + guide RNA = targeted genome edits.",
  },
  {
    q: "Astronaut exercise devices replace gravity with…",
    choices: ["Magnets", "Elastic & vacuum resistance", "Water tanks", "Gyros"],
    correct: 1,
    tip: "Treadmills w/ harness, resistive machines, cycle ergometers.",
  },
];

const fx = {
  appear: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

export default function Quiz() {
  const [i, setI] = React.useState(0);
  const [picked, setPicked] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const navigate = useNavigate();
  const total = QUESTIONS.length;
  const q = QUESTIONS[i];

  // keyboard: 1..4 to choose, Enter to Next
  React.useEffect(() => {
    const onKey = (e) => {
      if (done) return;
      if (["1", "2", "3", "4"].includes(e.key)) {
        setPicked(Number(e.key) - 1);
      } else if (e.key === "Enter") {
        handleNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, i, picked]);

  function handleNext() {
    if (picked === null) return;
    if (picked === q.correct) setScore((s) => s + 1);
    setPicked(null);
    if (i + 1 < total) setI((x) => x + 1);
    else setDone(true);
  }

  function reset() {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 pb-10 px-4 bg-[#050914] text-slate-100 relative overflow-hidden">
      {/* soft galaxy glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[120px] bg-sky-500/10" />

      {/* Header row */}
      <div className="mx-auto max-w-4xl mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1.5 rounded-full border border-slate-300/30 hover:bg-white/5"
        >
          ← Back
        </button>

        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Quick Space-Bio Quiz</h1>
          <p className="text-slate-300/80 text-sm">Answer fast. Learn faster. Have fun 🚀</p>
        </div>

        <Link
          to="/dashboard"
          className="px-3 py-1.5 rounded-full border border-sky-300/60 bg-sky-400/10 text-sky-100 hover:bg-sky-400/20"
        >
          Dashboard
        </Link>
      </div>

      {/* Progress bar */}
      <div className="mx-auto max-w-4xl mb-6">
        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-indigo-400"
            initial={{ width: 0 }}
            animate={{ width: `${(done ? total : i) / total * 100}%` }}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
          />
        </div>
        <div className="mt-2 text-xs text-slate-400 text-right">
          {done ? `${total}/${total}` : `${i}/${total}`} answered
        </div>
      </div>

      {/* Card */}
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur p-6 md:p-8 shadow-[0_10px_40px_rgba(2,6,23,.35)]">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={i} variants={fx} initial="appear" animate="enter" exit="exit">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-2xl border border-sky-400/40 grid place-items-center bg-sky-400/10">
                    <span className="font-bold">{i + 1}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold leading-snug">{q.q}</h2>
                </div>

                <div className="mt-6 grid gap-3">
                  {q.choices.map((c, idx) => {
                    const isPicked = picked === idx;
                    const isCorrect = picked !== null && idx === q.correct;
                    const isWrong = picked !== null && isPicked && idx !== q.correct;
                    return (
                      <button
                        key={idx}
                        onClick={() => setPicked(idx)}
                        className={[
                          "text-left px-4 py-3 rounded-xl border backdrop-blur transition",
                          "hover:bg-white/5",
                          isPicked ? "ring-2 ring-sky-300/60" : "",
                          isCorrect ? "border-emerald-400/60 bg-emerald-400/10" : "border-slate-700/60",
                          isWrong ? "border-rose-400/60 bg-rose-400/10" : "",
                        ].join(" ")}
                      >
                        <span className="text-sm md:text-base">{idx + 1}. {c}</span>
                      </button>
                    );
                  })}
                </div>

                {/* tip */}
                {picked !== null && (
                  <motion.div
                    className="mt-4 text-slate-300/90 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    💡 {q.tip}
                  </motion.div>
                )}

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-slate-400 text-sm">Score: {score}</div>
                  <button
                    onClick={handleNext}
                    disabled={picked === null}
                    className="px-5 py-2 rounded-full border border-sky-300/60 text-sky-100 bg-sky-400/10
                               hover:bg-sky-400/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    {i + 1 === total ? "Finish" : "Next"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="done" variants={fx} initial="appear" animate="enter" exit="exit" className="text-center">
                <h2 className="text-3xl font-extrabold">Nice flight! 🎉</h2>
                <p className="mt-2 text-slate-300">
                  You scored <span className="font-semibold text-sky-300">{score}</span> / {total}
                </p>

                {/* confetti-ish sparkles */}
                <div className="relative my-6 h-16">
                  {[...Array(16)].map((_, k) => (
                    <motion.span
                      key={k}
                      className="absolute w-1.5 h-1.5 rounded-full bg-sky-300/80"
                      initial={{ x: 0, y: 0, opacity: 0 }}
                      animate={{
                        x: (Math.random() - 0.5) * 240,
                        y: (Math.random() - 0.5) * 80,
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 1.2 + Math.random(), repeat: Infinity, repeatDelay: 1.2 }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={reset}
                    className="px-5 py-2 rounded-full border border-slate-300/40 hover:bg-white/5"
                  >
                    Play Again
                  </button>
                  <Link
                    to="/adventure"
                    className="px-5 py-2 rounded-full border border-sky-300/60 text-sky-100 bg-sky-400/10 hover:bg-sky-400/20"
                  >
                    Back to Adventure
                  </Link>
                  <Link
                    to="/dashboard"
                    className="px-5 py-2 rounded-full border border-emerald-400/60 text-emerald-100 bg-emerald-400/10 hover:bg-emerald-400/20"
                  >
                    Explore Dashboard
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
