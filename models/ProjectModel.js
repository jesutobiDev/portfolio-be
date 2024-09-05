const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  technologies: [
    {
      type: String,
      required: true,
    }
  ],
  breakpoints: [
    {
      type: String,
      required: true,
    }
  ],
  images: {
    thumbnail: {
      type: String,
      required: true,
    },
    screenshots: {
      mobile: [String],
      tablet: [String],
      desktop: [String],
    }
  },
  liveLink: {
    type: String,
    required: true,
  },
  repoLink: {
    type: String,
    required: true,
  }
}, { timestamps: true });


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

