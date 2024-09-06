// Load environment variables from .env file
require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');  // Import the cors package
const app = express();

// Use environment variables for PORT and MongoDB connection string
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'https://portfolio-jesutobi.vercel.app', // Allow requests from your frontend URL
  methods: ['GET'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type'] // Allow specific headers
};

app.use(cors(corsOptions)); // Use the CORS middleware with the configured options

// Import your Project model
const Project = require("./models/ProjectModel");

// Routes
app.get("/", (req, res) => {
    res.send("Portfolio API");
});

app.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

app.get("/projects/:projectId", async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

app.post("/projects", async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Connect to MongoDB using the connection string from the .env file
mongoose.connect(mongoUri)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB", error);
    });
