const express = require('express');
const { getAllProjects, getProjectById } = require('../controllers/projects');

const router = express.Router();

// Route to get all projects
router.get('/', getAllProjects);

// Route to get a project by its ID
router.get('/:projectId', getProjectById);

module.exports = router;
