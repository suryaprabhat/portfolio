const express = require('express');
const router = express.Router();
const dbHelper = require('../utils/dbHelper');

// GET /api/skills — Return all skills
router.get('/', async (req, res) => {
  try {
    const skills = await dbHelper.getSkills();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch skills', details: err.message });
  }
});

// POST /api/skills — Create a new skill
router.post('/', async (req, res) => {
  try {
    const { name, category } = req.body;
    const skill = await dbHelper.createSkill({ name, category });
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create skill', details: err.message });
  }
});

// DELETE /api/skills/:id — Delete a skill
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await dbHelper.deleteSkill(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Skill not found' });
    res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete skill', details: err.message });
  }
});

module.exports = router;
