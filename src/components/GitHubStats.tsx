import React from 'react';
import { GitCommit, Star, ExternalLink } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { GithubIcon } from './Icons';

export const GitHubStats: React.FC = () => {
  const gridDays = Array.from({ length: 98 });

  return (
    <section className="py-16 relative px-4 z-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <GithubIcon className="w-3.5 h-3.5" />
            <span>OPEN SOURCE ENGINE</span>
          </div>
          <h3 className="text-3xl font-extrabold text-white">
            GitHub <span className="text-gradient-cyan">Contributions & Stats</span>
          </h3>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 text-white">
                <GithubIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Sourabh-sheoran</h4>
                <a
                  href={RESUME_DATA.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                >
                  github.com/Sourabh-sheoran
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-300">
                <GitCommit className="w-4 h-4 text-cyan-400" />
                <span>500+ Commits</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-300">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Featured Repos</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Contribution Activity (2026)</span>
              <span>52 Weeks Active</span>
            </div>
            
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto p-2 bg-slate-950/80 rounded-2xl border border-white/5">
              {gridDays.map((_, idx) => {
                const intensity = (idx % 5 === 0) ? 3 : (idx % 3 === 0) ? 2 : (idx % 2 === 0) ? 1 : 0;
                const bgColors = [
                  'bg-slate-900',
                  'bg-indigo-900/60',
                  'bg-indigo-600/80',
                  'bg-cyan-400 shadow-[0_0_8px_#06b6d4]'
                ];
                return (
                  <div
                    key={idx}
                    className={`w-3.5 h-3.5 rounded-sm ${bgColors[intensity]} transition-colors`}
                    title={`Commits on day ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
