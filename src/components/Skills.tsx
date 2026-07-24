import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Layout, 
  Server, 
  Sparkles, 
  Wrench, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...RESUME_DATA.skills.map((c) => c.title)];

  const filteredCategories = activeCategory === 'All'
    ? RESUME_DATA.skills
    : RESUME_DATA.skills.filter((c) => c.title === activeCategory);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return Code2;
      case 'Layout': return Layout;
      case 'Server': return Server;
      case 'Sparkles': return Sparkles;
      default: return Wrench;
    }
  };

  return (
    <section id="skills" className="py-24 relative px-4 z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering <span className="text-gradient-cyan">Stack</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Comprehensive domain expertise spanning Frontend, Backend, Databases, Artificial Intelligence, and Core Computer Science.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'glass-panel text-slate-400 border-white/10 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredCategories.map((catGroup, idx) => {
            const Icon = getCategoryIcon(catGroup.icon);
            return (
              <motion.div
                key={catGroup.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel glass-panel-hover p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 group"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {catGroup.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">
                        {catGroup.skills.length} Core Technologies
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {catGroup.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-medium flex items-center gap-1.5 ${skill.highlight ? 'text-white font-semibold' : 'text-slate-300'}`}>
                            {skill.highlight && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                            {skill.name}
                          </span>
                          <span className="font-mono text-indigo-300 text-[11px]">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden p-0.5 border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full ${
                              skill.highlight
                                ? 'bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_10px_#06b6d4]'
                                : 'bg-slate-600'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {catGroup.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-white/5 text-[10px] font-mono text-slate-400"
                    >
                      #{skill.name.toLowerCase().replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
