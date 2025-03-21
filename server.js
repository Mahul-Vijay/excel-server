const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// 🟢 Serve static frontend files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// 🟢 Default route - serve main.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "main.html"));
});

// 🟢 Sample POST route (Modify as per your needs)
app.post("/submit", (req, res) => {
    res.json({ message: "Form submitted successfully!" });
});

// 🟢 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
