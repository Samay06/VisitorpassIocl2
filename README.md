# Visitor Pass System – IndianOil

A QR code-based visitor management system that generates visitor passes, logs scan events, and provides a dashboard view.

## 🔗 Live Demo
- Visitor Form: https://visitorpassiocl.onrender.com
- Dashboard: https://visitorpassiocl.onrender.com/dashboard

## 📁 Project Structure
- `public/index.html` – Visitor form and QR generator
- `server.js` – Node.js backend for logging scans
- `package.json` – Dependencies
- `visitors.xlsx` – Automatically created Excel log file

## 🚀 Local Setup
```bash
npm install
node server.js
```
Visit: http://localhost:3000

## ✅ Features
- QR Code generation with visitor ID
- Backend logging on QR scan
- Excel storage (`visitors.xlsx`)
- Auto-redirect to live dashboard
