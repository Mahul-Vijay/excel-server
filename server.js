const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = 'data.xlsx';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Load existing data from Excel
let workbook;
if (fs.existsSync(DATA_FILE)) {
    workbook = XLSX.readFile(DATA_FILE);
} else {
    workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([["Name", "Age", "Email"]]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, DATA_FILE);
}

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, age, email } = req.body;
    if (!name || !age || !email) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const newData = [[name, age, email]];
    const worksheet = workbook.Sheets["Sheet1"];
    const existingData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    existingData.push(...newData);
    workbook.Sheets["Sheet1"] = XLSX.utils.aoa_to_sheet(existingData);
    XLSX.writeFile(workbook, DATA_FILE);

    res.json({ message: "Data submitted successfully!" });
});

// Handle Excel file download
app.get('/download', (req, res) => {
    res.download(DATA_FILE);
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
