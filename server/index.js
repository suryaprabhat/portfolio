const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/stats', require('./routes/stats'));

// Health-check
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running 🚀' });
});

// ─── Database + Server Start ──────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('⚠️ MONGODB_URI is not set. Server will run with file-based mock database fallback.');
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB');
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      console.log('⚠️ Server will run with file-based mock database fallback.');
    });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
