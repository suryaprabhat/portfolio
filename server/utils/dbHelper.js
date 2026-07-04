const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const SKILLS_FILE = path.join(DATA_DIR, 'skills.json');

// Default seed data using exact public GitHub repository names and links
const defaultProjects = [
  {
    _id: "mock-p1",
    title: 'Mlhackathon-25',
    description: 'Machine Learning project repository built during the National-Level ML Workshop & Hackathon at ANITS. Implements custom predictive models and dataset analysis pipelines.',
    link: 'https://github.com/suryaprabhat/Mlhackathon-25',
    techStack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "mock-p2",
    title: 'ChildrenTherapy-Center',
    description: 'A full-stack React and Express platform designed to coordinate therapy services for children. Supports patient intakes, administrative scheduling, and session tracking.',
    link: 'https://github.com/suryaprabhat/ChildrenTherapy-Center',
    techStack: ['TypeScript', 'React.js', 'Node.js', 'Express.js'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "mock-p3",
    title: 'email-triage-env',
    description: 'An intelligent email sorting and parsing system in Python, built to categorize and prioritize inbox items automatically using custom heuristics.',
    link: 'https://github.com/suryaprabhat/email-triage-env',
    techStack: ['Python', 'Automation', 'Regular Expressions'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "mock-p4",
    title: 'college-discovery',
    description: 'A search and analytics portal that helps undergraduate candidates filter and discover engineering and arts colleges based on district, course ratings, and ranking.',
    link: 'https://github.com/suryaprabhat/college-discovery',
    techStack: ['TypeScript', 'React.js', 'Tailwind CSS'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "mock-p5",
    title: 'chatapp',
    description: 'A real-time chat application utilizing Socket.io and Node.js for instant messaging, room management, and connection monitoring.',
    link: 'https://github.com/suryaprabhat/chatapp',
    techStack: ['JavaScript', 'Node.js', 'Express.js', 'Socket.io'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "mock-p6",
    title: 'Spotify-Clone',
    description: 'A static frontend clone of Spotify layout web player, featuring interactive sidebar controls and track listings.',
    link: 'https://github.com/suryaprabhat/Spotify-Clone',
    techStack: ['HTML', 'CSS', 'Responsive Design'],
    createdAt: new Date().toISOString()
  }
];

const defaultSkills = [
  { _id: "mock-s1", name: 'Python', category: 'Backend' },
  { _id: "mock-s2", name: 'FastAPI', category: 'Backend' },
  { _id: "mock-s3", name: 'Django', category: 'Backend' },
  { _id: "mock-s4", name: 'Flask', category: 'Backend' },
  
  { _id: "mock-s5", name: 'Pandas', category: 'Database' },
  { _id: "mock-s6", name: 'NumPy', category: 'Database' },
  { _id: "mock-s7", name: 'Scikit-Learn', category: 'Database' },
  
  { _id: "mock-s8", name: 'PostgreSQL', category: 'Database' },
  { _id: "mock-s9", name: 'MongoDB', category: 'Database' },
  { _id: "mock-s10", name: 'SQLite', category: 'Database' },
  
  { _id: "mock-s11", name: 'React.js', category: 'Frontend' },
  { _id: "mock-s12", name: 'TypeScript', category: 'Frontend' },
  { _id: "mock-s13", name: 'Tailwind CSS', category: 'Frontend' },
  
  { _id: "mock-s14", name: 'Docker', category: 'Tools' },
  { _id: "mock-s15", name: 'Git', category: 'Tools' },
  { _id: "mock-s16", name: 'GitHub', category: 'Tools' },
  
  { _id: "mock-s17", name: 'SEO Optimization', category: 'Tools' },
  { _id: "mock-s19", name: 'Web Development', category: 'Frontend' },
  { _id: "mock-s20", name: 'Communication Skills', category: 'Soft Skills' },
  { _id: "mock-s21", name: 'Team Collaboration', category: 'Soft Skills' },
  { _id: "mock-s22", name: 'Languages (Telugu, Hindi, English)', category: 'Soft Skills' },
  { _id: "mock-s23", name: 'Problem Solving', category: 'Soft Skills' }
];

function readJSON(file, defaults) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaults, null, 2));
    return defaults;
  }
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return defaults;
  }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

const isDbConnected = () => mongoose.connection.readyState === 1;

module.exports = {
  isDbConnected,
  
  async getProjects() {
    if (isDbConnected()) {
      const Project = require('../models/Project');
      return await Project.find().sort({ createdAt: -1 });
    }
    return readJSON(PROJECTS_FILE, defaultProjects).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  
  async getProjectById(id) {
    if (isDbConnected()) {
      const Project = require('../models/Project');
      return await Project.findById(id);
    }
    const projects = readJSON(PROJECTS_FILE, defaultProjects);
    return projects.find(p => p._id === id) || null;
  },
  
  async createProject(data) {
    if (isDbConnected()) {
      const Project = require('../models/Project');
      const project = new Project(data);
      return await project.save();
    }
    const projects = readJSON(PROJECTS_FILE, defaultProjects);
    const newProject = {
      _id: 'mock-' + Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    writeJSON(PROJECTS_FILE, projects);
    return newProject;
  },
  
  async deleteProject(id) {
    if (isDbConnected()) {
      const Project = require('../models/Project');
      return await Project.findByIdAndDelete(id);
    }
    const projects = readJSON(PROJECTS_FILE, defaultProjects);
    const index = projects.findIndex(p => p._id === id);
    if (index === -1) return null;
    const deleted = projects.splice(index, 1)[0];
    writeJSON(PROJECTS_FILE, projects);
    return deleted;
  },
  
  async getSkills() {
    if (isDbConnected()) {
      const Skill = require('../models/Skill');
      return await Skill.find().sort({ category: 1, name: 1 });
    }
    return readJSON(SKILLS_FILE, defaultSkills).sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      return a.name.localeCompare(b.name);
    });
  },
  
  async createSkill(data) {
    if (isDbConnected()) {
      const Skill = require('../models/Skill');
      const skill = new Skill(data);
      return await skill.save();
    }
    const skills = readJSON(SKILLS_FILE, defaultSkills);
    const newSkill = {
      _id: 'mock-' + Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date().toISOString()
    };
    skills.push(newSkill);
    writeJSON(SKILLS_FILE, skills);
    return newSkill;
  },
  
  async deleteSkill(id) {
    if (isDbConnected()) {
      const Skill = require('../models/Skill');
      return await Skill.findByIdAndDelete(id);
    }
    const skills = readJSON(SKILLS_FILE, defaultSkills);
    const index = skills.findIndex(s => s._id === id);
    if (index === -1) return null;
    const deleted = skills.splice(index, 1)[0];
    writeJSON(SKILLS_FILE, skills);
    return deleted;
  }
};
