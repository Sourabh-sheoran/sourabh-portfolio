import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  ExternalLink, 
  Code2, 
  CheckCircle2, 
  X,
  Maximize2,
  Zap
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import type { Project } from '../data/resumeData';
import { GithubIcon } from './Icons';

interface ProjectsProps {
  onPlayClick: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onPlayClick }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showCodeId, setShowCodeId] = useState<string | null>(null);

  const categories = ['All', 'Full Stack', 'AI & Data'];

  const filteredProjects = activeCategory === 'All'
    ? RESUME_DATA.projects
    : RESUME_DATA.projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative px-4 z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>FEATURED WORK</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered <span className="text-gradient-cyan">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            High-impact software solutions built with full-stack MERN architectures, real-time WebSockets, and AI ATS resume parsing engines.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex justify-center space-x-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onPlayClick();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'glass-panel text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="glass-panel glass-panel-hover rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between group relative"
            >
              <div className="p-6 space-y-4">
                
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-gradient-to-r ${project.gradient} text-white shadow-md`}>
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400">Live Production</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-indigo-400 mt-1">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="grid grid-cols-3 gap-2 py-3 bg-slate-900/80 rounded-2xl border border-white/5 px-3">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <span className="block text-[10px] font-mono text-slate-500 uppercase">{m.label}</span>
                      <span className="text-xs font-bold text-cyan-300 font-mono">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 group-hover:border-indigo-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {showCodeId === project.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto"
                  >
                    <pre>{project.codeSnippet}</pre>
                  </motion.div>
                )}
              </div>

              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={onPlayClick}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium text-xs shadow-md hover:shadow-indigo-500/30 flex items-center gap-1.5 transition-all"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={onPlayClick}
                    className="p-2 rounded-xl glass-panel border border-white/10 text-slate-300 hover:text-white transition-colors"
                    title="Source Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      onPlayClick();
                      setShowCodeId(showCodeId === project.id ? null : project.id);
                    }}
                    className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-cyan-400 transition-colors"
                    title="Toggle Code View"
                  >
                    <Code2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    onPlayClick();
                    setSelectedProject(project);
                  }}
                  className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group/btn"
                >
                  <span>Details</span>
                  <Maximize2 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 p-6 sm:p-8 space-y-6 relative text-left bg-slate-950/90 shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl font-extrabold text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-sm font-mono text-cyan-400">
                  {selectedProject.subtitle}
                </p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedProject.longDescription}
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Key Architectural Features
                </h4>
                <div className="space-y-2">
                  {selectedProject.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-purple-400" />
                  Core Source Implementation
                </h4>
                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <pre>{selectedProject.codeSnippet}</pre>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium text-sm shadow-lg flex items-center gap-2"
                >
                  <span>Launch Live Application</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs font-mono"
                >
                  Close Window
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
