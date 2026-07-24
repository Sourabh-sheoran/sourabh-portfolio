import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  ExternalLink, 
  ShieldCheck, 
  BookOpen
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface CertificatesProps {
  onPlayClick: () => void;
}

export const Certificates: React.FC<CertificatesProps> = ({ onPlayClick }) => {
  return (
    <section id="certificates" className="py-24 relative px-4 z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Certifications & <span className="text-gradient-cyan">Badges</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Official certifications verified by Amazon Web Services, Ethnus, Udemy, Google, and Coursera.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESUME_DATA.certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel glass-panel-hover p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono font-semibold">
                    {cert.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cert.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-white/5 text-[10px] font-mono text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>

              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">Official Credential</span>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onPlayClick}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-cyan-400 hover:text-white hover:border-cyan-500/40 text-xs font-mono flex items-center gap-1.5 transition-all group/link"
                >
                  <span>Verify PDF</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
