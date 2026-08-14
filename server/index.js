import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { authenticateAdmin } from './middleware/auth.js';
import { upload } from './middleware/upload.js';
import { login, verifySession } from './controllers/authController.js';
import { handleContactForm } from './controllers/contactController.js';
import {
  getContent,
  updateProfilePic,
  updateResume,
  createProject,
  updateProject,
  deleteProject,
  getMessages,
  deleteMessage
} from './controllers/contentController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files
const publicUploads = path.join(process.cwd(), 'public', 'uploads');
app.use('/uploads', express.static(publicUploads));

// Public Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
app.get('/api/content', getContent);
app.post('/api/contact', handleContactForm);
app.post('/api/auth/login', login);

// Admin Protected Routes
app.get('/api/auth/verify', authenticateAdmin, verifySession);

app.post('/api/admin/profile-pic', authenticateAdmin, (req, res, next) => {
  upload.single('profilePic')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
}, updateProfilePic);

app.post('/api/admin/resume', authenticateAdmin, (req, res, next) => {
  upload.single('resume')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
}, updateResume);

app.post('/api/admin/projects', authenticateAdmin, (req, res, next) => {
  upload.single('projectImage')(req, res, (err) => {
    if (err && err.code !== 'LIMIT_UNEXPECTED_FILE') return res.status(400).json({ error: err.message });
    next();
  });
}, createProject);

app.put('/api/admin/projects/:id', authenticateAdmin, (req, res, next) => {
  upload.single('projectImage')(req, res, (err) => {
    if (err && err.code !== 'LIMIT_UNEXPECTED_FILE') return res.status(400).json({ error: err.message });
    next();
  });
}, updateProject);

app.delete('/api/admin/projects/:id', authenticateAdmin, deleteProject);

app.get('/api/admin/messages', authenticateAdmin, getMessages);
app.delete('/api/admin/messages/:id', authenticateAdmin, deleteMessage);

// Serve Vite dist static build in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Portfolio API Server running on port ${PORT}`);
});
