import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileDown, 
  ArrowRight, 
  Mail, 
  Phone, 
  Terminal, 
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESUME_DATA } from '../data/resumeData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface HeroProps {
  onPlaySuccess: () => void;
  onPlayClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlaySuccess, onPlayClick }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % RESUME_DATA.personal.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadResume = () => {
    onPlaySuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.open('https://github.com/Sourabh-sheoran/Portfolio', '_blank');
  };

  return (
    <section id="hero" className="min-h-screen relative pt-32 pb-20 flex items-center justify-center px-4 overflow-hidden">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Typography Column */}
        <motion.div
          className="lg:col-span-7 flex flex-col space-y-6 text-left z-10"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono w-fit backdrop-blur-md shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-400 font-semibold">VIT Bhopal B.Tech CS 2022–2026</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Software & AI Engineer</span>
          </div>

          {/* Headline Name & Title */}
          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.1]">
              Hi, I'm <br className="hidden sm:inline" />
              <span className="text-gradient-cyan drop-shadow-[0_0_35px_rgba(6,182,212,0.3)]">
                {RESUME_DATA.personal.name}
              </span>
            </h1>
            
            {/* Dynamic Rotating Titles */}
            <div className="h-10 mt-3 flex items-center text-xl sm:text-2xl font-mono text-indigo-400 font-semibold">
              <Terminal className="w-5 h-5 mr-2 text-cyan-400 animate-pulse" />
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400"
              >
                {RESUME_DATA.personal.roles[roleIndex]}
              </motion.span>
            </div>
          </div>

          {/* Executive Bio */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            {RESUME_DATA.personal.summary}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => {
                onPlayClick();
                handleDownloadResume();
              }}
              className="relative group px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-medium text-sm shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 flex items-center gap-2 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <FileDown className="w-4 h-4 z-10" />
              <span className="z-10 font-semibold">Download Resume</span>
            </button>

            <a
              href="#projects"
              onClick={onPlayClick}
              className="px-6 py-3.5 rounded-xl glass-panel border border-white/15 text-white font-medium text-sm hover:bg-white/10 hover:border-indigo-500/40 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              onClick={onPlayClick}
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white font-medium text-sm hover:border-cyan-500/30 transition-all duration-300 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Social Links Bar */}
          <div className="pt-4 flex items-center space-x-3">
            <span className="text-xs uppercase font-mono text-slate-500 tracking-wider">Connect:</span>
            <a
              href={RESUME_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              title="GitHub Profile"
              className="p-2.5 rounded-xl glass-panel border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-600/20 transition-all"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={RESUME_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn Profile"
              className="p-2.5 rounded-xl glass-panel border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-600/20 transition-all"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${RESUME_DATA.personal.email}`}
              title="Send Email"
              className="p-2.5 rounded-xl glass-panel border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-600/20 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`tel:${RESUME_DATA.personal.phone}`}
              title="Call Phone"
              className="p-2.5 rounded-xl glass-panel border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-600/20 transition-all"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Right Profile Avatar Card with User Cropped Photo */}
        <motion.div
          className="lg:col-span-5 flex justify-center z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative group w-full max-w-sm">
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 opacity-75 blur-xl group-hover:opacity-100 transition duration-500 animate-pulse" />

            <div className="relative rounded-3xl glass-panel p-6 border border-white/15 backdrop-blur-2xl bg-slate-950/80 shadow-2xl flex flex-col items-center text-center">
              
              {/* Profile Avatar Frame with User Photo */}
              <div className="relative w-44 h-44 rounded-2xl p-1 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-2xl mb-4">
                <div className="w-full h-full rounded-[14px] bg-slate-900 overflow-hidden relative group-hover:scale-[1.02] transition-transform shadow-inner">
                  <img
                    src="/sourabh.jpg"
                    alt="Sourabh Sheoran"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
                SOURABH
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              </h3>
              <p className="text-xs font-mono text-indigo-300 mt-0.5">
                Computer Science Engineer @ VIT Bhopal
              </p>

              <div className="flex flex-wrap gap-1.5 justify-center mt-4 pt-4 border-t border-white/10">
                {['React.js', 'Next.js', 'Python', 'Node.js', 'Socket.IO', 'Tailwind', 'Docker'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 w-full mt-4 pt-4 border-t border-white/10">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="block text-xs text-slate-400 font-mono">Lighthouse</span>
                  <span className="text-lg font-bold text-emerald-400">99 / 100</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="block text-xs text-slate-400 font-mono">ATS Engine</span>
                  <span className="text-lg font-bold text-cyan-400">98.5%</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
