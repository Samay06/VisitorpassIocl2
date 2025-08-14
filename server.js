const express = require('express');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

function logScan(visitorId) {
    let workbook;
    const filePath = path.join(__dirname, 'visitors.xlsx');
    if (fs.existsSync(filePath)) {
        workbook = XLSX.readFile(filePath);
    } else {
        workbook = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([["Visitor ID", "Scan Time"]]);
        XLSX.utils.book_append_sheet(workbook, ws, "Logs");
    }
    const sheet = workbook.Sheets["Logs"];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    data.push([visitorId, new Date().toLocaleString()]);
    const newSheet = XLSX.utils.aoa_to_sheet(data);
    workbook.Sheets["Logs"] = newSheet;
    XLSX.writeFile(workbook, filePath);
}

app.get('/scan', (req, res) => {
    const id = req.query.id;
    if (id) {
        logScan(id);
        res.redirect('/dashboard');
    } else {
        res.status(400).send("Invalid QR Code");
    }
});

app.get('/dashboard', (req, res) => {
    const filePath = path.join(__dirname, 'visitors.xlsx');
    let tableRows = '';
    if (fs.existsSync(filePath)) {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets["Logs"];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        tableRows = data.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join('');
    }
    res.send(`<!DOCTYPE html>
    <html><head><title>Dashboard</title>
    <style>
    body { font-family: Arial; background: #f4f4f4; padding: 20px; }
    h1 { color: #002f6c; }
    table { width: 100%; border-collapse: collapse; background: white; }
    th { background: #002f6c; color: white; padding: 10px; }
    td { padding: 10px; border-bottom: 1px solid #ccc; }
    tr:nth-child(even) { background-color: #ffe5d1; }
    tr:hover { background: #ff6b35; color: white; }
    </style></head><body>
    <h1>Visitor Scan Logs</h1>
    <table><tr><th>Visitor ID</th><th>Scan Time</th></tr>
    ${tableRows}</table></body></html>`);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
