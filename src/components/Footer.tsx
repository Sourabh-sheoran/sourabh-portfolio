import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  ArrowUp, 
  Clock, 
  Mail
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-slate-950/90 py-12 px-4 z-10 text-left">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">
                SOURABH
              </span>
              <span className="block text-[10px] font-mono text-slate-400">
                VIT Bhopal B.Tech CS (2022–2026)
              </span>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-cyan-400 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
            <span>Local Time: {timeStr || '10:00:00 PM'} (IST)</span>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={RESUME_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={RESUME_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${RESUME_DATA.personal.email}`}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} SOURABH. Built with React, TypeScript, Tailwind CSS & Framer Motion.</p>
          
          <div className="flex items-center space-x-4">
            <a
              href="/admin/login"
              className="text-slate-400 hover:text-cyan-400 transition-colors underline"
            >
              Admin Portal
            </a>

            <button
              onClick={scrollToTop}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
