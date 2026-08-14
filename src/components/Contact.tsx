import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESUME_DATA } from '../data/resumeData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface ContactProps {
  onPlaySuccess: () => void;
  onPlayClick: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onPlaySuccess, onPlayClick }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopy = (text: string, field: string) => {
    onPlayClick();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    onPlayClick();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setLoading(false);
      setSubmitted(true);
      onPlaySuccess();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Error sending message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 relative px-4 z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get In <span className="text-gradient-cyan">Touch</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Available for software engineering roles, full-stack web projects, and Generative AI collaborations.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-4">
              
              <div className="glass-panel glass-panel-hover p-5 rounded-2xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-slate-400 uppercase">Direct Email</span>
                    <a
                      href={`mailto:${RESUME_DATA.personal.email}`}
                      className="text-sm font-bold text-white hover:text-cyan-400 transition-colors"
                    >
                      {RESUME_DATA.personal.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(RESUME_DATA.personal.email, 'email')}
                  className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
                  title="Copy Email"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
                </button>
              </div>

              <div className="glass-panel glass-panel-hover p-5 rounded-2xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-slate-400 uppercase">Phone & WhatsApp</span>
                    <a
                      href={`tel:${RESUME_DATA.personal.phone}`}
                      className="text-sm font-bold text-white hover:text-cyan-400 transition-colors"
                    >
                      {RESUME_DATA.personal.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(RESUME_DATA.personal.phone, 'phone')}
                  className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
                  title="Copy Phone"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                </button>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center space-x-3.5">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-mono text-slate-400 uppercase">Current Base</span>
                  <span className="text-sm font-bold text-white">VIT Bhopal / Madhya Pradesh, India</span>
                </div>
              </div>

            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Official Professional Links
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href={RESUME_DATA.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onPlayClick}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 border border-white/10 text-slate-200 hover:text-white hover:border-indigo-500/40 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4 text-indigo-400" /> LinkedIn
                </a>
                <a
                  href={RESUME_DATA.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onPlayClick}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 border border-white/10 text-slate-200 hover:text-white hover:border-cyan-500/40 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <GithubIcon className="w-4 h-4 text-cyan-400" /> GitHub
                </a>
              </div>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
              
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Send Direct Message</h3>
                  <span className="text-xs font-mono text-slate-400">Response time: &lt; 24 hours</span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                  {errorMsg}
                </div>
              )}

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-indigo-900/50 to-emerald-900/50 border border-emerald-500/30 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Transmitted!</h4>
                  <p className="text-xs text-slate-300">
                    Thank you {formData.name}, your message has been sent to Sourabh.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-indigo-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-400">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-400">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Software Engineer Opportunity / Project Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hello Sourabh, I reviewed your ChatApp and ATS Resume projects and would love to discuss..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="font-mono text-xs animate-pulse">Transmitting Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Direct Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
