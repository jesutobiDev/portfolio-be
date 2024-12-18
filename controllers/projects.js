const Project = require("../models/projects");

// Get all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new project
const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            year,
            technologies,
            breakpoints,
            images,
            liveLink,
            repoLink,
        } = req.body;

        const newProject = new Project({
            title,
            description,
            year,
            technologies,
            breakpoints,
            images,
            liveLink,
            repoLink,
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
};
