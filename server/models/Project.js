const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    link: {
      type: String,
      default: '',
    },
    techStack: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
