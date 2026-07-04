const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Soft Skills', 'Other'],
      default: 'Other',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', SkillSchema);
