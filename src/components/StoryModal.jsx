import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function StoryModal({ open, onClose, title, story, scenes, loading, heroSrc }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="relative bg-slate-900/90 border border-slate-700/60 rounded-3xl shadow-2xl w-full max-w-4xl mx-4 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header / Hero */}
            <div className="relative">
              {heroSrc && (
                <motion.img
                  key={heroSrc}
                  src={heroSrc}
                  alt={title}
                  className="w-full h-64 object-cover brightness-[0.7]"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <h2 className="text-3xl font-bold text-slate-100 drop-shadow-md">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-300 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="p-10 text-center text-slate-400 italic animate-pulse">
                Generating your galactic story...
              </div>
            ) : (
              <>
                {/* Background gradient animation */}
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-black opacity-70"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
                />

                {/* Story Scenes */}
                <div className="flex flex-col gap-10 px-8 py-10 text-slate-100 overflow-y-auto max-h-[70vh]">
                  {Array.isArray(scenes) && scenes.length > 0 ? (
                    scenes.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.25 }}
                        className="space-y-5"
                      >
                        {s.imageUrl && (
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.5 }}
                            className="overflow-hidden rounded-2xl shadow-lg"
                          >
                            <img
                              src={s.imageUrl}
                              alt={s.title}
                              className="w-full h-64 object-cover rounded-2xl"
                            />
                          </motion.div>
                        )}
                        <h3 className="text-2xl font-semibold text-sky-300 uppercase tracking-wide">
                          {s.title}
                        </h3>
                        <p className="text-lg leading-relaxed text-slate-200 font-light whitespace-pre-line">
                          {s.text}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-slate-400 italic text-center">
                      {story || "No story content available."}
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
