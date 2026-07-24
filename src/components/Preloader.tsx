import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sparkles, Terminal } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing Core Modules...");

  useEffect(() => {
    const statuses = [
      "Initializing Core Modules...",
      "Loading React & Next.js Engine...",
      "Compiling Socket.IO & Real-time WebSockets...",
      "Injecting ATS Skill Analytics Algorithm...",
      "Mounting Apple-Stripe Glass UI System...",
      "Ready to Launch Portfolio!"
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 6;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setStatusText("Ready to Launch Portfolio!");
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 600);
      } else {
        setProgress(currentProgress);
        const statusIdx = Math.min(
          statuses.length - 1,
          Math.floor((currentProgress / 100) * statuses.length)
        );
        setStatusText(statuses[statusIdx]);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] text-white px-4"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Glowing Central Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8 p-5 rounded-2xl glass-panel border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.3)]"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg">
              <Code2 className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-mono font-semibold">
                SYSTEM PORTFOLIO BOOT
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                SOURABH <Sparkles className="w-4 h-4 text-cyan-400" />
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-full p-1.5 backdrop-blur-md mb-4 shadow-inner">
          <motion.div
            className="h-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_15px_#6366f1]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>

        {/* Terminal Line & Percentage */}
        <div className="flex items-center justify-between w-full max-w-md text-xs font-mono text-slate-400 px-1">
          <span className="flex items-center gap-2 text-cyan-400 truncate">
            <Terminal className="w-3.5 h-3.5" />
            {statusText}
          </span>
          <span className="font-bold text-indigo-300 font-mono ml-3">
            {progress}%
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
