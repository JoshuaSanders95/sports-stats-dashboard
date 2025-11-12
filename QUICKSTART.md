# 🚀 Quick Start Guide

## ⚠️ Important: This Dashboard Requires a Local Server

Modern browsers block ES6 modules when opening HTML files directly (`file://` protocol) for security reasons. You need to run a local web server.

## 🎯 Easiest Options

### Option 1: Use Visual Studio Code (RECOMMENDED)
1. Install [VS Code](https://code.visualstudio.com/)
2. Install "Live Server" extension by Ritwick Dey
3. Right-click `index.html` → "Open with Live Server"
4. Dashboard opens automatically in your browser!

### Option 2: Double-Click the Batch File
1. Double-click `START_SERVER.bat`
2. Your browser will open automatically
3. (Requires Node.js or Python installed)

### Option 3: Install Node.js
1. Download from [nodejs.org](https://nodejs.org/)
2. Open PowerShell in this folder
3. Run: `npx http-server -p 8000 -o`

### Option 4: Use Python (if installed)
```powershell
python -m http.server 8000
```
Then open: `http://localhost:8000`

---

## 🐛 Troubleshooting

### "Nothing happens when I click buttons"
- **Cause**: You're opening the file directly (file:// URL)
- **Solution**: Use one of the server options above

### "CORS Error" in console
- **Cause**: ES6 modules require HTTP/HTTPS protocol
- **Solution**: Run with a local server

### "Module not found"
- **Cause**: Missing config.js file
- **Solution**: Copy `js/config.example.js` to `js/config.js`

---

## 🎓 For The Athletic Application

When demonstrating this project:
1. Use VS Code Live Server (easiest)
2. Or deploy to GitHub Pages
3. Or use any hosting service

The dashboard is designed to work with real sports data from MySportsFeeds API, but gracefully falls back to demo data if the API is unavailable or not configured.

---

## 📱 GitHub Pages Deployment (Free Hosting)

1. Go to your repository settings
2. Pages section → Source: main branch
3. Your dashboard will be live at:
   `https://JoshuaSanders95.github.io/sports-stats-dashboard/`

**Note**: For GitHub Pages, you'll need to configure the API key differently or use demo data.

---

## ✅ Verify It's Working

When properly running with a server, you should see:
- ✅ Data loads in the dashboard
- ✅ Buttons respond to clicks
- ✅ Search filters teams
- ✅ Charts display
- ✅ No console errors about modules

---

Need help? Check the browser console (F12) for error messages.
