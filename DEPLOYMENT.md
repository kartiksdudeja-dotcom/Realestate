# NORA at Life Republic - Premium Plots Website

## Project Structure

```
Real estate/
├── frontend/          # Static frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── css/style.css
│   ├── js/main.js
│   ├── js/config.js
│   ├── images/
│   └── vercel.json
├── backend/           # Express.js API server
│   ├── server.js
│   ├── config/database.js
│   └── database/schema.sql
├── package.json
├── render.yaml
└── .env
```

## Local Development

```bash
npm install
npm start
# Server runs on http://localhost:3000
```

---

## 🚀 Deployment Guide

### Step 1: Deploy Backend on Render

1. **Create a Render account** at https://render.com

2. **Create a MySQL database** (use external like PlanetScale, Railway):
   - **PlanetScale** (free MySQL): https://planetscale.com
   - **Railway**: https://railway.app

3. **Deploy the backend**:
   - Go to Render Dashboard → New → **Web Service**
   - Connect your GitHub repository
   - Configure:
     - **Name**: `nora-real-estate-api`
     - **Root Directory**: (leave empty)
     - **Build Command**: `npm install`
     - **Start Command**: `node backend/server.js`
4. **Add Environment Variables** in Render:

   ```
   NODE_ENV=production
   DB_HOST=your-database-host
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

5. **Copy your Render URL** (e.g., `https://nora-real-estate-api.onrender.com`)

---

### Step 2: Deploy Frontend on Vercel

1. **Create a Vercel account** at https://vercel.com

2. **Update API URL** in `frontend/js/main.js` (line 6):

   ```javascript
   const API_BASE_URL =
     window.location.hostname === "localhost"
       ? ""
       : "https://YOUR-RENDER-APP-NAME.onrender.com"; // ← Replace this
   ```

3. **Deploy to Vercel**:
   - Go to Vercel Dashboard → New Project
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Other
     - **Root Directory**: `frontend`
     - **Build Command**: (leave empty)
     - **Output Directory**: `.`
4. Click **Deploy**

---

### Step 3: Update CORS (Backend)

After getting your Vercel URL, update `backend/server.js` (line 17):

```javascript
origin: [
  'http://localhost:3000',
  'https://your-actual-vercel-url.vercel.app',  // ← Update this
],
```

Redeploy the backend on Render.

---

## Environment Variables Reference

| Variable      | Description                 |
| ------------- | --------------------------- |
| `PORT`        | Server port (default: 3000) |
| `DB_HOST`     | MySQL database host         |
| `DB_USER`     | MySQL database user         |
| `DB_PASSWORD` | MySQL database password     |
| `DB_NAME`     | MySQL database name         |
| `EMAIL_USER`  | Gmail for sending emails    |
| `EMAIL_PASS`  | Gmail app password          |

---

## Free Database Options

1. **PlanetScale** - Free MySQL (recommended)
2. **Railway** - Free PostgreSQL/MySQL
3. **Supabase** - Free PostgreSQL
4. **Aiven** - Free MySQL

---

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript, AOS.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Hosting**: Vercel (frontend) + Render (backend)
