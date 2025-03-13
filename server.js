require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require("axios");
const app = express();

// Use environment variables for PORT and MongoDB connection string
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: '*', // Allow requests from any origin (for development only)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'] // Allow specific headers
};
app.use(cors(corsOptions)); // Use the CORS middleware with the configured options

// Import routes
const projectRoutes = require("./routes/projects"); // Assuming you have routes for projects
const contactsRoutes = require("./routes/contacts"); // Assuming you have routes for contacts

// Use the routes
app.use("/projects", projectRoutes);
app.use("/contacts", contactsRoutes);

// Connect to MongoDB using the connection string from the .env file
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB", error);
    });




    const url = `https://portfolio-be-907d.onrender.com`;
const interval = 30000;

//Reloader Function
function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

setInterval(reloadWebsite, interval);
