import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundMesh } from './components/BackgroundMesh';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Certificates } from './components/Certificates';
import { CodePlayground } from './components/CodePlayground';
import { GitHubStats } from './components/GitHubStats';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIChatbot } from './components/AIChatbot';
import { CommandPalette } from './components/CommandPalette';
import { TerminalSim } from './components/TerminalSim';
import { useSound } from './hooks/useSound';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const { soundEnabled, toggleSound, playClick, playSuccess } = useSound();

  useEffect(() => {
    (window as any).__openCmdPalette = () => setCmdOpen(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* 1. Preloader Screen */}
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          {/* 2. Interactive Background & Custom Cursor */}
          <BackgroundMesh />
          <CustomCursor />

          {/* 3. Floating Glass Navigation Dock */}
          <Navbar
            onOpenCmd={() => setCmdOpen(true)}
            onOpenTerminal={() => setTerminalOpen(true)}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
          />

          {/* 4. Main Portfolio Section Flow */}
          <main className="relative z-10">
            <Hero onPlaySuccess={playSuccess} onPlayClick={playClick} />
            <About />
            <Skills />
            <Projects onPlayClick={playClick} />
            <Experience />
            <Certificates onPlayClick={playClick} />
            <CodePlayground />
            <GitHubStats />
            <Contact onPlaySuccess={playSuccess} onPlayClick={playClick} />
          </main>

          {/* 5. Footer */}
          <Footer />

          {/* 6. Special Interactive Floating Widgets */}
          <AIChatbot />
          <CommandPalette
            isOpen={cmdOpen}
            onClose={() => setCmdOpen(false)}
            onOpenTerminal={() => setTerminalOpen(true)}
            onToggleSound={toggleSound}
          />
          <TerminalSim
            isOpen={terminalOpen}
            onClose={() => setTerminalOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default App;
