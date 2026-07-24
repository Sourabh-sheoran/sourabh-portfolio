import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  GraduationCap, 
  Target, 
  Zap, 
  Sparkles, 
  Globe, 
  Music, 
  Cpu
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative px-4 z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <UserCheck className="w-3.5 h-3.5" />
            <span>EXECUTIVE PROFILE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient-cyan">SOURABH</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Combining rigorous Computer Science fundamentals with cutting-edge MERN stack, Python ATS scoring engines, and Generative AI workflows.
          </p>
        </div>

        {/* Stats Grid Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {RESUME_DATA.personal.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center space-y-1"
            >
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 font-mono">
                {stat.value}
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Core Biography & Objectives Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Story Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Education & Background</h3>
                  <span className="text-xs font-mono text-indigo-400">
                    B.Tech CS @ VIT Bhopal (2022 - 2026)
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I am a Computer Science undergraduate at <strong className="text-white">Vellore Institute of Technology (VIT), Bhopal</strong>, graduating in September 2026. My engineering approach is driven by a deep understanding of Data Structures & Algorithms, Database Systems, Computer Networks, and modern web software engineering.
              </p>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether architecting real-time WebSocket communication pipelines with Socket.IO or building regex-based ATS skill parsing engines with Python & Streamlit, I focus on performance, scalability, and intuitive UX design.
              </p>
            </div>

            {/* Languages & Interests Pills */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-slate-400">Languages:</span>
                {RESUME_DATA.languages.map((lang) => (
                  <span key={lang} className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-white/10 text-xs font-mono text-indigo-300">
                    {lang}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-mono text-slate-400">Interests:</span>
                {RESUME_DATA.interests.map((interest) => (
                  <span key={interest} className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-white/10 text-xs font-mono text-cyan-300">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pillars & Career Objective */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Engineering Focus</h3>
                  <span className="text-xs font-mono text-purple-400">Full-Stack & AI Excellence</span>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "Real-Time Web Systems",
                    desc: "Building low-latency WebSockets with MERN, Socket.io, and JWT auth.",
                    icon: Zap,
                    color: "text-cyan-400"
                  },
                  {
                    title: "ATS & AI Analytics Engines",
                    desc: "Deploying Python NLP parsing models and Streamlit score checkers.",
                    icon: Cpu,
                    color: "text-indigo-400"
                  },
                  {
                    title: "Silicon Valley UI Aesthetics",
                    desc: "Crafting fluid Apple-Stripe-Vercel inspired responsive web applications.",
                    icon: Sparkles,
                    color: "text-purple-400"
                  }
                ].map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start space-x-3">
                      <Icon className={`w-5 h-5 mt-0.5 ${pillar.color} shrink-0`} />
                      <div>
                        <h4 className="text-sm font-semibold text-white">{pillar.title}</h4>
                        <p className="text-xs text-slate-400">{pillar.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30">
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-300 block mb-1">
                Career Mindset
              </span>
              <p className="text-xs text-slate-300 italic">
                "Continuous learning, analytical problem solving, and building resilient software that users love."
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
