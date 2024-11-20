const express = require('express');
const { getAllProjects, getProjectById, createProject } = require('../controllers/projects');

const router = express.Router();

// Route to get all projects
router.get('/', getAllProjects);

// Route to get a project by its ID
router.get('/:projectId', getProjectById);

// Route to create a new project
router.post('/', createProject);

module.exports = router;
