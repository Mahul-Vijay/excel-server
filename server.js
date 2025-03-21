const express = require("express");
const cors = require("cors");
const fs = require("fs");
const XLSX = require("xlsx");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint to save user data
app.post("/submit", (req, res) => {
    console.log("Received Data:", req.body);

    const { name, gender, age, product, message } = req.body;
    
    if (!name || !gender || !age || !product) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newEntry = { Name: name, Gender: gender, Age: age, Product: product, Message: message || "N/A", Date: new Date().toISOString() };
    
    let data = [];
    if (fs.existsSync("data.xlsx")) {
        const workbook = XLSX.readFile("data.xlsx");
        const sheet = workbook.Sheets["Customers"];
        data = XLSX.utils.sheet_to_json(sheet);
    }

    data.push(newEntry);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, "data.xlsx");

    res.json({ message: "Data saved successfully!" });
});

// Endpoint to download the Excel file
app.get("/download", (req, res) => {
    const filePath = "data.xlsx";
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: "File not found" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
