import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  User, 
  Briefcase, 
  Layers, 
  Award, 
  Mail, 
  Command, 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  Terminal as TerminalIcon
} from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';

interface NavbarProps {
  onOpenCmd: () => void;
  onOpenTerminal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCmd,
  onOpenTerminal,
  soundEnabled,
  onToggleSound,
}) => {
  const scrollProgress = useScrollProgress();
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['hero', 'about', 'skills', 'projects', 'education', 'certificates', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home', icon: Code2 },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Layers },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 z-[90] bg-slate-900/50">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_10px_#6366f1]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-4 left-0 right-0 z-[80] transition-all duration-300 px-4 flex justify-center`}
      >
        <nav
          className={`w-full max-w-6xl rounded-2xl glass-panel border border-white/10 px-4 py-2.5 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${
            scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-indigo-500/20' : ''
          }`}
        >
          <a
            href="#hero"
            className="flex items-center space-x-3 group"
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1 group-hover:text-indigo-400 transition-colors">
                SOURABH
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Hire
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-xl border border-white/5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDockBg"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 z-10" />
                  <span className="z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenTerminal}
              title="Open Terminal Simulation"
              className="p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all text-xs flex items-center gap-1.5 font-mono"
            >
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              <span className="hidden lg:inline text-[11px]">Terminal</span>
            </button>

            <button
              onClick={onOpenCmd}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 hover:border-indigo-500/50 transition-all text-xs font-mono"
            >
              <Command className="w-3.5 h-3.5 text-indigo-400" />
              <span>⌘K</span>
            </button>

            <button
              onClick={onToggleSound}
              title={soundEnabled ? "Mute Audio FX" : "Enable Audio FX"}
              className="p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-indigo-400 transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-indigo-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-4 right-4 bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl md:hidden text-left"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-indigo-600/20 hover:text-white transition-colors"
                    >
                      <Icon className="w-5 h-5 text-indigo-400" />
                      <span className="font-medium text-sm">{link.label}</span>
                    </a>
                  );
                })}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCmd();
                    }}
                    className="flex items-center gap-2 text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-2 rounded-lg"
                  >
                    <Command className="w-4 h-4" /> Quick Search (⌘K)
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
