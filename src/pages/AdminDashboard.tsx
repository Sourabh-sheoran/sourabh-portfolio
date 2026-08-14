import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Upload,
  FileText,
  FolderPlus,
  Edit2,
  Trash2,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Plus,
  X,
  RefreshCw,
  Save,
  Globe,
  MessageSquare,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import type { Project } from '../data/resumeData';
import { GithubIcon } from '../components/Icons';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { profilePicUrl, resumeUrl, projects, refreshContent } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'profile' | 'resume' | 'projects' | 'messages'>('profile');
  const [messages, setMessages] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Status feedback state
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (res.ok) {
        showStatus('success', 'Message deleted successfully!');
        fetchMessages();
      }
    } catch (err) {
      showStatus('error', 'Failed to delete message');
    }
  };

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Profile Pic State
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Resume State
  const [selectedResume, setSelectedResume] = useState<File | null>(null);

  // Projects Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Project Form Data
  const [projectForm, setProjectForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    longDescription: '',
    tags: '',
    liveUrl: '',
    githubUrl: '',
    category: 'Full Stack' as 'Full Stack' | 'AI & Data' | 'Web Apps',
    featured: true
  });
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);

  const getToken = () => localStorage.getItem('admin_token') || '';

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // 1. PROFILE PICTURE UPLOAD HANDLER
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
        showStatus('error', 'Only JPG, PNG, or WEBP images are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showStatus('error', 'File size exceeds 5 MB limit.');
        return;
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUploadProfilePic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      showStatus('error', 'Please select an image file to upload.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('profilePic', selectedImage);

    try {
      const res = await fetch('/api/admin/profile-pic', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload profile picture');

      await refreshContent();
      setSelectedImage(null);
      setImagePreview(null);
      showStatus('success', 'Profile picture updated successfully!');
    } catch (err: any) {
      showStatus('error', err.message || 'Error uploading profile picture');
    } finally {
      setUploading(false);
    }
  };

  // 2. RESUME PDF UPLOAD HANDLER
  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        showStatus('error', 'Only PDF files are permitted for resume.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        showStatus('error', 'File size exceeds 10 MB limit.');
        return;
      }
      setSelectedResume(file);
    }
  };

  const handleUploadResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResume) {
      showStatus('error', 'Please select a PDF file to upload.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('resume', selectedResume);

    try {
      const res = await fetch('/api/admin/resume', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload resume');

      await refreshContent();
      setSelectedResume(null);
      showStatus('success', 'Resume PDF updated successfully!');
    } catch (err: any) {
      showStatus('error', err.message || 'Error uploading resume PDF');
    } finally {
      setUploading(false);
    }
  };

  // 3. PROJECT CRUD HANDLERS
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      subtitle: '',
      description: '',
      longDescription: '',
      tags: 'React.js, Node.js, Express.js, Tailwind CSS',
      liveUrl: 'https://',
      githubUrl: 'https://github.com/Sourabh-sheoran',
      category: 'Full Stack',
      featured: true
    });
    setProjectImageFile(null);
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      subtitle: project.subtitle || '',
      description: project.description,
      longDescription: project.longDescription || project.description,
      tags: project.tags.join(', '),
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      category: project.category || 'Full Stack',
      featured: project.featured
    });
    setProjectImageFile(null);
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) {
      showStatus('error', 'Title and Description are required.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('title', projectForm.title);
    formData.append('subtitle', projectForm.subtitle);
    formData.append('description', projectForm.description);
    formData.append('longDescription', projectForm.longDescription);
    formData.append('tags', projectForm.tags);
    formData.append('liveUrl', projectForm.liveUrl);
    formData.append('githubUrl', projectForm.githubUrl);
    formData.append('category', projectForm.category);
    formData.append('featured', String(projectForm.featured));

    if (projectImageFile) {
      formData.append('projectImage', projectImageFile);
    }

    try {
      const url = editingProject
        ? `/api/admin/projects/${editingProject.id}`
        : '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save project');

      await refreshContent();
      setIsProjectModalOpen(false);
      showStatus('success', `Project ${editingProject ? 'updated' : 'added'} successfully!`);
    } catch (err: any) {
      showStatus('error', err.message || 'Error saving project');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete project');

      await refreshContent();
      showStatus('success', 'Project deleted successfully!');
    } catch (err: any) {
      showStatus('error', err.message || 'Error deleting project');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight leading-none">
                Admin Control <span className="text-gradient-cyan">Center</span>
              </h1>
              <span className="text-[11px] font-mono text-slate-400">
                Logged in as sourabhsheoran695@gmail.com
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.open('/', '_blank')}
              className="px-3.5 py-1.5 rounded-xl glass-panel border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">View Live Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Status Notification Alert */}
        <AnimatePresence>
          {statusMsg && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={`p-4 rounded-2xl border text-sm font-mono flex items-center gap-3 shadow-xl ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
            >
              {statusMsg.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Navigation Dock */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl glass-panel border border-white/10 bg-slate-950/60 max-w-fit">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Profile Picture</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'resume'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Resume PDF</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('messages');
              fetchMessages();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'messages'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Messages ({messages.length})</span>
          </button>
        </div>

        {/* TAB 1: PROFILE PICTURE MANAGER */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-cyan-400" />
                  <span>Update Profile Picture</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Upload a new photo to replace the current hero card avatar on the portfolio.
                </p>
              </div>

              <form onSubmit={handleUploadProfilePic} className="space-y-4">
                <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center hover:border-cyan-500/50 transition-colors bg-slate-900/50">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handleImageFileChange}
                    className="hidden"
                    id="profile-pic-input"
                  />
                  <label htmlFor="profile-pic-input" className="cursor-pointer block space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block">
                        {selectedImage ? selectedImage.name : 'Click to select photo'}
                      </span>
                      <span className="text-xs text-slate-400 block mt-1">
                        Permitted formats: JPG, PNG, WEBP (Max: 5 MB)
                      </span>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={uploading || !selectedImage}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium text-sm shadow-lg hover:shadow-cyan-500/25 disabled:opacity-40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {uploading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Profile Picture</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Preview Box */}
            <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Live Avatar Preview
              </span>

              <div className="relative w-48 h-48 rounded-2xl p-1 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-2xl">
                <div className="w-full h-full rounded-[14px] bg-slate-900 overflow-hidden relative">
                  <img
                    src={imagePreview || profilePicUrl}
                    alt="Sourabh Sheoran Profile"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <span className="text-xs font-mono text-indigo-300">
                {selectedImage ? 'Previewing unsaved file' : 'Currently active on website'}
              </span>
            </div>
          </motion.div>
        )}

        {/* TAB 2: RESUME PDF MANAGER */}
        {activeTab === 'resume' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  <span>Upload Latest Resume PDF</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Uploading a new PDF updates all "Download Resume" buttons on the portfolio automatically.
                </p>
              </div>

              <form onSubmit={handleUploadResume} className="space-y-4">
                <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center hover:border-indigo-500/50 transition-colors bg-slate-900/50">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleResumeFileChange}
                    className="hidden"
                    id="resume-pdf-input"
                  />
                  <label htmlFor="resume-pdf-input" className="cursor-pointer block space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mx-auto flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block">
                        {selectedResume ? selectedResume.name : 'Click to choose PDF document'}
                      </span>
                      <span className="text-xs text-slate-400 block mt-1">
                        Permitted format: PDF only (Max: 10 MB)
                      </span>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={uploading || !selectedResume}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm shadow-lg hover:shadow-indigo-500/25 disabled:opacity-40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {uploading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Upload & Replace Resume</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Current Resume Info */}
            <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block">
                Active Resume Document Status
              </span>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">Current Live Resume</span>
                    <span className="text-xs font-mono text-slate-400 truncate block max-w-xs">
                      {resumeUrl}
                    </span>
                  </div>
                </div>

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:text-white flex items-center gap-1.5 text-xs font-mono"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: PROJECTS MANAGEMENT (CRUD) */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-cyan-400" />
                  <span>Manage Portfolio Projects</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Add new showcase projects, modify existing descriptions or links, or delete old projects.
                </p>
              </div>

              <button
                onClick={openNewProjectModal}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium text-xs font-mono shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2 cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-semibold">
                        {proj.category || 'Full Stack'}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEditProjectModal(proj)}
                          className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/40 transition-all"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4 text-indigo-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id, proj.title)}
                          className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-all"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight">{proj.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pt-3 border-t border-white/10 text-xs font-mono">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: CONTACT MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <span>Contact Form Submissions Inbox</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  All messages sent by visitors through the portfolio "Send Direct Message" form.
                </p>
              </div>

              <button
                onClick={fetchMessages}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all w-fit"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Refresh Inbox</span>
              </button>
            </div>

            {messages.length === 0 ? (
              <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center space-y-3">
                <Mail className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No Contact Messages Yet</h3>
                <p className="text-xs text-slate-400">
                  When visitors submit inquiries from your website, they will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 hover:border-cyan-500/40 transition-all bg-slate-950/60"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{msg.name}</h4>
                          <span className="text-xs font-mono text-cyan-400">{msg.email}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-xs font-mono">
                        <span className="text-slate-500 text-[11px]">{msg.timestamp}</span>

                        <button
                          onClick={() => handleCopyEmail(msg.email, msg.id)}
                          className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
                          title="Copy Email Address"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-indigo-400" />
                          )}
                        </button>

                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:text-white text-xs flex items-center gap-1"
                        >
                          <span>Reply</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-2 rounded-xl bg-slate-900 border border-white/10 text-red-400 hover:bg-red-500/20"
                          title="Delete Message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                        Subject: <strong className="text-slate-200">{msg.subject}</strong>
                      </span>
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/5 text-sm text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* PROJECT ADD / EDIT MODAL */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 bg-slate-950 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-cyan-400" />
                  <span>{editingProject ? 'Edit Project' : 'Add New Showcase Project'}</span>
                </h3>
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-300 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. AI Portfolio Dashboard Engine"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white font-sans focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={projectForm.subtitle}
                      onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                      placeholder="e.g. Full-Stack Analytics"
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white font-sans focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Category</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Full Stack">Full Stack</option>
                      <option value="AI & Data">AI & Data</option>
                      <option value="Web Apps">Web Apps</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Short Description *</label>
                  <textarea
                    required
                    rows={2}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Brief overview shown on cards..."
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white font-sans focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Detailed Description</label>
                  <textarea
                    rows={3}
                    value={projectForm.longDescription}
                    onChange={(e) => setProjectForm({ ...projectForm, longDescription: e.target.value })}
                    placeholder="Full deep-dive project details..."
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white font-sans focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Tech Stack Tags (comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                    placeholder="React.js, Node.js, Express.js, MongoDB"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Live URL</label>
                    <input
                      type="url"
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      placeholder="https://github.com/Sourabh-sheoran"
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Optional Project Preview Image</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => setProjectImageFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end space-x-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
                  >
                    {uploading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Project</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
