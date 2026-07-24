import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Code2, 
  Briefcase, 
  Award, 
  FileDown, 
  Terminal, 
  Volume2
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onToggleSound: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
  onToggleSound
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          (window as any).__openCmdPalette?.();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'projects',
      title: 'View Projects (ChatApp & ATS Analyzer)',
      icon: Briefcase,
      action: () => {
        window.location.hash = 'projects';
        onClose();
      }
    },
    {
      id: 'skills',
      title: 'Inspect Tech Stack & Skills',
      icon: Code2,
      action: () => {
        window.location.hash = 'skills';
        onClose();
      }
    },
    {
      id: 'terminal',
      title: 'Launch Interactive CLI Terminal',
      icon: Terminal,
      action: () => {
        onClose();
        onOpenTerminal();
      }
    },
    {
      id: 'resume',
      title: 'Download Resume PDF',
      icon: FileDown,
      action: () => {
        window.open('https://github.com/Sourabh-sheoran/Portfolio', '_blank');
        onClose();
      }
    },
    {
      id: 'certificates',
      title: 'View AWS & Ethnus Certificates',
      icon: Award,
      action: () => {
        window.location.hash = 'certificates';
        onClose();
      }
    },
    {
      id: 'github',
      title: 'Open GitHub Profile',
      icon: GithubIcon,
      action: () => {
        window.open(RESUME_DATA.personal.github, '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      title: 'Connect on LinkedIn',
      icon: LinkedinIcon,
      action: () => {
        window.open(RESUME_DATA.personal.linkedin, '_blank');
        onClose();
      }
    },
    {
      id: 'sound',
      title: 'Toggle Sound Effects',
      icon: Volume2,
      action: () => {
        onToggleSound();
        onClose();
      }
    }
  ];

  const filteredActions = actions.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className="glass-panel w-full max-w-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden bg-slate-950/95 text-left"
      >
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          <kbd className="px-2 py-1 rounded bg-slate-900 border border-white/10 text-[10px] font-mono text-slate-400">
            ESC
          </kbd>
        </div>

        <div className="p-3 max-h-80 overflow-y-auto space-y-1">
          {filteredActions.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filteredActions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full p-3 rounded-xl flex items-center justify-between text-left hover:bg-indigo-600/20 hover:text-white transition-colors group border border-transparent hover:border-indigo-500/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-white/10 text-indigo-400 group-hover:text-cyan-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-indigo-300">
                    Jump to →
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-white/5 bg-slate-900/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Use ⌘K to open anytime</span>
          <span>Sourabh Portfolio v2.0</span>
        </div>
      </motion.div>
    </div>
  );
};
