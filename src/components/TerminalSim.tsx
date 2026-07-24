import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface TerminalSimProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalSim: React.FC<TerminalSimProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<string[]>([
    "SOURABH Interactive Shell v2.4.0 (x86_64-apple-darwin)",
    "Type 'help' to see available terminal commands.",
    "--------------------------------------------------"
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    const newHist = [...history, `sourabh@vit-bhopal:~$ ${raw}`];
    const cmd = raw.toLowerCase();

    if (cmd === 'help') {
      newHist.push(
        "Available CLI commands:",
        "  help         - Display command index",
        "  cat resume   - Print executive resume summary",
        "  skills       - List core technical stack",
        "  projects     - Display MERN & ATS Python projects",
        "  contact      - Output phone, email, and social links",
        "  clear        - Clear terminal screen",
        "  sudo hire    - Execute hiring process"
      );
    } else if (cmd === 'cat resume' || cmd === 'resume') {
      newHist.push(
        `--- ${RESUME_DATA.personal.name} ---`,
        `Degree: ${RESUME_DATA.education[0].degree}`,
        `Institution: ${RESUME_DATA.education[0].institution} (${RESUME_DATA.education[0].period})`,
        `Summary: ${RESUME_DATA.personal.summary}`
      );
    } else if (cmd === 'skills') {
      newHist.push(
        "Technical Stack Overview:",
        "• Languages: Python, SQL, C++, JavaScript, ML",
        "• Frontend: React.js, Next.js, Tailwind CSS, React Native",
        "• Backend: Node.js, Express.js, REST APIs",
        "• AI: Prompting, LLMs, LangChain, OpenAI, Gemini",
        "• DB & Tools: MySQL, MongoDB, Git, Docker, Streamlit"
      );
    } else if (cmd === 'projects') {
      newHist.push(
        "1. ChatApp — MERN Socket.IO Real-Time Messaging",
        "   Live: https://chat-app-x430.onrender.com/",
        "2. Smart Resume Skill Analyzer & ATS Score Checker",
        "   Live: https://smart-resume-skill-analyzer-ats-score-checker-avcsujymfsszn7tp.streamlit.app/Resources"
      );
    } else if (cmd === 'contact') {
      newHist.push(
        `Email: ${RESUME_DATA.personal.email}`,
        `Phone: ${RESUME_DATA.personal.phone}`,
        `LinkedIn: ${RESUME_DATA.personal.linkedin}`,
        `GitHub: ${RESUME_DATA.personal.github}`
      );
    } else if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (cmd.includes('hire')) {
      newHist.push(
        "🎉 Access Granted! Candidate Sourabh is available for hire.",
        "Sending priority signal to sourabhsheoran695@gmail.com..."
      );
    } else {
      newHist.push(`bash: command not found: ${raw}. Type 'help' for instructions.`);
    }

    setHistory(newHist);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl h-[480px] rounded-2xl glass-panel border border-slate-700 shadow-2xl flex flex-col overflow-hidden bg-slate-950/95 text-left"
      >
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              sourabh@vit-bhopal: ~ (zsh)
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-emerald-400 space-y-1.5 selection:bg-indigo-500 selection:text-white">
          {history.map((line, idx) => (
            <div key={idx} className="leading-relaxed">
              {line}
            </div>
          ))}
          <div className="flex items-center space-x-2 pt-1 text-slate-200">
            <span className="text-cyan-400">sourabh@vit-bhopal:~$</span>
            <input
              type="text"
              autoFocus
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCommand(inputVal)}
              className="flex-1 bg-transparent text-xs text-white focus:outline-none font-mono"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </motion.div>
    </div>
  );
};
