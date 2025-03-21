const express = require("express");
const cors = require("cors");
const fs = require("fs");
const XLSX = require("xlsx");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Define Excel file path
const FILE_PATH = "customer_data.xlsx";

// Function to load existing data from Excel
function loadExistingData() {
    if (fs.existsSync(FILE_PATH)) {
        const workbook = XLSX.readFile(FILE_PATH);
        const sheet = workbook.Sheets["Customers"];
        return XLSX.utils.sheet_to_json(sheet) || [];
    }
    return [];
}

// Endpoint to receive form data and update Excel file
app.post("/submit", (req, res) => {
    const { name, gender, age, product, message } = req.body;
    if (!name || !gender || !age || !product) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newEntry = {
        Name: name.trim(),
        Gender: gender,
        Age: parseInt(age),
        Product: product.trim(),
        Message: message ? message.trim() : "",
        Date: new Date().toLocaleString(),
    };

    // Load existing data and append new entry
    let customerData = loadExistingData();
    customerData.push(newEntry);

    // Convert data to worksheet and save
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(customerData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, FILE_PATH);

    res.json({ success: true, message: "Data saved successfully!" });
});

// Endpoint to download Excel file
app.get("/download", (req, res) => {
    if (!fs.existsSync(FILE_PATH)) {
        return res.status(404).json({ error: "No data found" });
    }
    res.download(FILE_PATH);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
