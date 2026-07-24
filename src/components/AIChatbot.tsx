import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hello! I am Sourabh's AI Assistant. Ask me anything about his skills, ChatApp MERN project, ATS Resume Analyzer, education at VIT Bhopal, or how to get in touch!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      let botResponse = "";
      const q = query.toLowerCase();

      if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
        botResponse = `Sourabh is proficient in Python, JavaScript, React.js, Next.js, Tailwind CSS, Node.js, Express.js, MongoDB, SQL, Machine Learning, Prompt Engineering, LangChain, OpenAI API, Docker, and WebSockets (Socket.IO).`;
      } else if (q.includes('chatapp') || q.includes('chat') || q.includes('mern')) {
        botResponse = `ChatApp is a real-time MERN stack application built with MongoDB, Express, React, Node.js, and Socket.IO. It features encrypted JWT auth, HTTP-only cookies, Cloudinary profile image uploads, and live user status indicators. Live demo: https://chat-app-x430.onrender.com/`;
      } else if (q.includes('ats') || q.includes('resume') || q.includes('streamlit') || q.includes('python')) {
        botResponse = `The Smart Resume Skill Analyzer is a Python & Streamlit web app that parses PDF resumes and calculates weighted ATS compatibility scores (0-100) using regex skill extraction and role-aware matching. Live demo: https://smart-resume-skill-analyzer-ats-score-checker-avcsujymfsszn7tp.streamlit.app/Resources`;
      } else if (q.includes('education') || q.includes('vit') || q.includes('college') || q.includes('degree')) {
        botResponse = `Sourabh is pursuing his B.Tech in Computer Science & Engineering at Vellore Institute of Technology (VIT), Bhopal (Sept 2022 – Sept 2026).`;
      } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire')) {
        botResponse = `You can reach Sourabh directly via Email at sourabhsheoran695@gmail.com or Phone at +91 70564 26775. LinkedIn: https://www.linkedin.com/in/sourabh-sheoran-8173281a8/`;
      } else if (q.includes('certif') || q.includes('aws') || q.includes('google')) {
        botResponse = `Sourabh holds 5 certifications: AWS Academy Solution Architect, Ethnus MERN Full Stack, Udemy SQL for Data Analysts, Udemy Next.js Web Dev, and Google AI Suite (Coursera).`;
      } else {
        botResponse = `Sourabh is a Senior Frontend & Full-Stack AI Engineer with expertise in React, Next.js, Python, Node.js, and Generative AI. Feel free to ask about his ChatApp project, ATS Skill Analyzer, or contact info!`;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 500);
  };

  const quickPrompts = [
    "Tell me about Sourabh",
    "Explain ChatApp project",
    "Explain ATS Resume Analyzer",
    "How to contact him?"
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[90] p-4 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105 transition-transform duration-300 flex items-center justify-center group"
        title="Open AI Assistant"
      >
        <Bot className="w-6 h-6 animate-pulse" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[95] w-full max-w-sm sm:max-w-md h-[500px] rounded-3xl glass-panel border border-white/20 shadow-2xl flex flex-col overflow-hidden bg-slate-950/95 text-left"
          >
            <div className="p-4 border-b border-white/10 bg-slate-900/90 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Sourabh AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400">● Online Knowledge Bot</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'bot' && (
                    <div className="p-1.5 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none'
                        : 'bg-slate-900 border border-white/10 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className="block text-[9px] text-slate-400 mt-1 font-mono text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-2 border-t border-white/5 flex gap-1.5 overflow-x-auto bg-slate-950/80">
              {quickPrompts.map((qp) => (
                <button
                  key={qp}
                  onClick={() => handleSend(qp)}
                  className="px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-[10px] font-mono text-indigo-300 hover:text-white hover:border-indigo-500/40 whitespace-nowrap shrink-0"
                >
                  {qp}
                </button>
              ))}
            </div>

            <div className="p-3 border-t border-white/10 bg-slate-900/90 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Sourabh AI..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
