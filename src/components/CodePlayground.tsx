import React, { useState } from 'react';
import { Code2, Play, Check, Copy } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const CodePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ats' | 'socket'>('ats');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    ats: RESUME_DATA.projects[1].codeSnippet,
    socket: RESUME_DATA.projects[0].codeSnippet
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 relative px-4 z-10">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Code2 className="w-3.5 h-3.5" />
            <span>LIVE ARCHITECTURE PLAYGROUND</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Core Algorithm <span className="text-gradient-cyan">Showcase</span>
          </h3>
        </div>

        <div className="rounded-3xl glass-panel border border-slate-800 overflow-hidden bg-slate-950/90 shadow-2xl">
          
          <div className="px-4 py-3 bg-slate-900 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('ats')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeTab === 'ats'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ats_score_checker.py
              </button>
              <button
                onClick={() => setActiveTab('socket')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeTab === 'socket'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                socket_server.js
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="p-6 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed selection:bg-indigo-500 selection:text-white">
            <pre>{codeSnippets[activeTab]}</pre>
          </div>

          <div className="px-4 py-2 bg-slate-900/60 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Language: {activeTab === 'ats' ? 'Python 3.11' : 'Node.js / WebSockets'}</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Play className="w-3 h-3" /> Executable Architecture
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
