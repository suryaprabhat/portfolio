/**
 * seed.js — Populates MongoDB with your real public GitHub repositories and skills.
 * Run once: node seed.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');
const Skill = require('./models/Skill');

const projects = [
  {
    title: 'Mlhackathon-25',
    description:
      'Machine Learning project repository built during the National-Level ML Workshop & Hackathon at ANITS. Implements custom predictive models and dataset analysis pipelines.',
    link: 'https://github.com/suryaprabhat/Mlhackathon-25',
    techStack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy'],
  },
  {
    title: 'ChildrenTherapy-Center',
    description:
      'A full-stack React and Express platform designed to coordinate therapy services for children. Supports patient intakes, administrative scheduling, and session tracking.',
    link: 'https://github.com/suryaprabhat/ChildrenTherapy-Center',
    techStack: ['TypeScript', 'React.js', 'Node.js', 'Express.js'],
  },
  {
    title: 'email-triage-env',
    description:
      'An intelligent email sorting and parsing system in Python, built to categorize and prioritize inbox items automatically using custom heuristics.',
    link: 'https://github.com/suryaprabhat/email-triage-env',
    techStack: ['Python', 'Automation', 'Regular Expressions'],
  },
  {
    title: 'college-discovery',
    description:
      'A search and analytics portal that helps undergraduate candidates filter and discover engineering and arts colleges based on district, course ratings, and ranking.',
    link: 'https://github.com/suryaprabhat/college-discovery',
    techStack: ['TypeScript', 'React.js', 'Tailwind CSS'],
  },
  {
    title: 'chatapp',
    description:
      'A real-time chat application utilizing Socket.io and Node.js for instant messaging, room management, and connection monitoring.',
    link: 'https://github.com/suryaprabhat/chatapp',
    techStack: ['JavaScript', 'Node.js', 'Express.js', 'Socket.io'],
  },
  {
    title: 'E-commerce',
    description:
      'A responsive e-commerce storefront frontend showcasing dynamic catalog loading, shopping cart status updates, and interactive item filters.',
    link: 'https://github.com/suryaprabhat/E-commerce',
    techStack: ['TypeScript', 'React.js', 'CSS Modules'],
  },
];

const skills = [
  { name: 'Python', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'Django', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'REST API Integration', category: 'Backend' },
  
  { name: 'NumPy', category: 'Database' },
  { name: 'Pandas', category: 'Database' },
  { name: 'Scikit-Learn', category: 'Database' },
  
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'SQLite', category: 'Database' },
  { name: 'Mongoose', category: 'Database' },
  
  { name: 'React.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'HTML5 & CSS3', category: 'Frontend' },
  
  { name: 'Docker', category: 'Tools' },
  { name: 'Git', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'VS Code', category: 'Tools' },
  
  { name: 'SEO Optimization', category: 'Tools' },
  { name: 'Web Development', category: 'Frontend' },
  { name: 'Communication Skills', category: 'Soft Skills' },
  { name: 'Team Collaboration', category: 'Soft Skills' },
  { name: 'Languages (Telugu, Hindi, English)', category: 'Soft Skills' },
  { name: 'Problem Solving', category: 'Soft Skills' },
];

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not set. Create a .env file (see .env.example).');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log('🗑️  Cleared existing projects and skills');

    // Insert seed data
    await Project.insertMany(projects);
    console.log(`✅ Inserted ${projects.length} projects`);

    await Skill.insertMany(skills);
    console.log(`✅ Inserted ${skills.length} skills`);

    console.log('\n🎉 Database seeded successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
