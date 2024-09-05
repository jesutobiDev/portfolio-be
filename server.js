const express = require("express");
const app = express();
const port = 30000;

// routes
app.get("/", (req, res) => {
    res.send("Portfolio API");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})