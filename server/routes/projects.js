const express = require('express');
const router = express.Router();
const dbHelper = require('../utils/dbHelper');

// GET /api/projects — Return all projects
router.get('/', async (req, res) => {
  try {
    const projects = await dbHelper.getProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects', details: err.message });
  }
});

// GET /api/projects/:id — Return a single project
router.get('/:id', async (req, res) => {
  try {
    const project = await dbHelper.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch project', details: err.message });
  }
});

// POST /api/projects — Create a new project
router.post('/', async (req, res) => {
  try {
    const { title, description, link, techStack } = req.body;
    const project = await dbHelper.createProject({ title, description, link, techStack });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create project', details: err.message });
  }
});

// DELETE /api/projects/:id — Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await dbHelper.deleteProject(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project', details: err.message });
  }
});

module.exports = router;
