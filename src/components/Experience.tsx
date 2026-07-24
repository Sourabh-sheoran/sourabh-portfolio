import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Users, 
  CheckCircle2
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const Experience: React.FC = () => {
  return (
    <section id="education" className="py-24 relative px-4 z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC & LEADERSHIP TIMELINE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education & <span className="text-gradient-cyan">Activities</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Academic degree at VIT Bhopal combined with active campus leadership and marketing campaign coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Higher Education</h3>
            </div>

            {RESUME_DATA.education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-6 border-l-2 border-indigo-500/40 space-y-4"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-400 border-4 border-slate-950 shadow-[0_0_10px_#06b6d4]" />

                <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                      <p className="text-sm font-semibold text-cyan-400 mt-0.5">{edu.institution}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-indigo-300">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {edu.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    {edu.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Leadership & Activities</h3>
            </div>

            <div className="space-y-6">
              {RESUME_DATA.activities.map((act, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative pl-6 border-l-2 border-purple-500/40 space-y-4"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-400 border-4 border-slate-950 shadow-[0_0_10px_#a855f7]" />

                  <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 space-y-2">
                    <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block">
                      {act.organization}
                    </span>
                    <h4 className="text-lg font-bold text-white">
                      {act.title}
                    </h4>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
