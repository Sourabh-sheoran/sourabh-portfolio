import { getDbData, saveDbData } from '../db.js';

export const getContent = (req, res) => {
  try {
    const dbData = getDbData();
    return res.status(200).json(dbData.content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return res.status(500).json({ error: 'Failed to retrieve portfolio content.' });
  }
};

export const updateProfilePic = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded.' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const dbData = getDbData();
    dbData.content.profilePicUrl = fileUrl;
    saveDbData(dbData);

    return res.status(200).json({
      message: 'Profile picture updated successfully',
      profilePicUrl: fileUrl
    });
  } catch (error) {
    console.error('Error updating profile pic:', error);
    return res.status(500).json({ error: 'Failed to update profile picture.' });
  }
};

export const updateResume = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume PDF file uploaded.' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const dbData = getDbData();
    dbData.content.resumeUrl = fileUrl;
    saveDbData(dbData);

    return res.status(200).json({
      message: 'Resume updated successfully',
      resumeUrl: fileUrl
    });
  } catch (error) {
    console.error('Error updating resume:', error);
    return res.status(500).json({ error: 'Failed to update resume.' });
  }
};

export const createProject = (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      longDescription,
      tags,
      liveUrl,
      githubUrl,
      featured,
      category,
      gradient,
      metrics,
      features,
      codeSnippet,
      imageUrl
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Project title and description are required.' });
    }

    const dbData = getDbData();
    const newProject = {
      id: 'proj-' + Date.now(),
      title,
      subtitle: subtitle || title,
      description,
      longDescription: longDescription || description,
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : [],
      liveUrl: liveUrl || '#',
      githubUrl: githubUrl || '#',
      imageUrl: imageUrl || (req.file ? `/uploads/${req.file.filename}` : ''),
      featured: featured === true || featured === 'true',
      category: category || 'Full Stack',
      gradient: gradient || 'from-cyan-500 via-indigo-500 to-purple-600',
      metrics: Array.isArray(metrics) ? metrics : [],
      features: Array.isArray(features) ? features : [],
      codeSnippet: codeSnippet || ''
    };

    dbData.content.projects.unshift(newProject);
    saveDbData(dbData);

    return res.status(201).json({
      message: 'Project created successfully',
      project: newProject
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ error: 'Failed to create project.' });
  }
};

export const updateProject = (req, res) => {
  try {
    const { id } = req.params;
    const dbData = getDbData();

    const index = dbData.content.projects.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const existing = dbData.content.projects[index];
    const {
      title,
      subtitle,
      description,
      longDescription,
      tags,
      liveUrl,
      githubUrl,
      featured,
      category,
      gradient,
      metrics,
      features,
      codeSnippet,
      imageUrl
    } = req.body;

    const updatedProject = {
      ...existing,
      title: title ?? existing.title,
      subtitle: subtitle ?? existing.subtitle,
      description: description ?? existing.description,
      longDescription: longDescription ?? existing.longDescription,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : existing.tags,
      liveUrl: liveUrl ?? existing.liveUrl,
      githubUrl: githubUrl ?? existing.githubUrl,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : (imageUrl ?? existing.imageUrl),
      featured: featured !== undefined ? (featured === true || featured === 'true') : existing.featured,
      category: category ?? existing.category,
      gradient: gradient ?? existing.gradient,
      metrics: metrics ? (Array.isArray(metrics) ? metrics : existing.metrics) : existing.metrics,
      features: features ? (Array.isArray(features) ? features : existing.features) : existing.features,
      codeSnippet: codeSnippet ?? existing.codeSnippet
    };

    dbData.content.projects[index] = updatedProject;
    saveDbData(dbData);

    return res.status(200).json({
      message: 'Project updated successfully',
      project: updatedProject
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ error: 'Failed to update project.' });
  }
};

export const deleteProject = (req, res) => {
  try {
    const { id } = req.params;
    const dbData = getDbData();

    const initialLength = dbData.content.projects.length;
    dbData.content.projects = dbData.content.projects.filter(p => p.id !== id);

    if (dbData.content.projects.length === initialLength) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    saveDbData(dbData);

    return res.status(200).json({
      message: 'Project deleted successfully',
      id
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ error: 'Failed to delete project.' });
  }
};

export const getMessages = (req, res) => {
  try {
    const dbData = getDbData();
    return res.status(200).json(dbData.messages || []);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ error: 'Failed to retrieve contact messages.' });
  }
};

export const deleteMessage = (req, res) => {
  try {
    const { id } = req.params;
    const dbData = getDbData();
    if (!dbData.messages) dbData.messages = [];

    const initialLen = dbData.messages.length;
    dbData.messages = dbData.messages.filter(m => m.id !== id);

    if (dbData.messages.length === initialLen) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    saveDbData(dbData);
    return res.status(200).json({ message: 'Message deleted successfully', id });
  } catch (error) {
    console.error('Error deleting message:', error);
    return res.status(500).json({ error: 'Failed to delete message.' });
  }
};

