# Deployment Guide - Vercel & Render

## Deployment Overview
- **Frontend**: React + Vite → **Vercel**
- **Backend**: Node.js + Express → **Render**

---

## STEP 1: Prepare Your Repository

### 1.1 Create a GitHub Repository
1. Go to [github.com](https://github.com) and create a new repository
2. Clone it to your local machine
3. Copy all project files to the repository
4. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit: Real Estate Website"
   git push origin main
   ```

### 1.2 Update Files
Ensure you have:
- `package.json` in root (for monorepo)
- `frontend/package.json` with build script
- `backend/package.json` with start script
- `.env.example` files for reference

---

## STEP 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub
3. Click **New +** → **Web Service**
4. Connect your GitHub repository

### 2.2 Configure Backend Service
Fill in the following details:

| Field | Value |
|-------|-------|
| **Name** | `real-estate-api` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node backend/server.js` |
| **Plan** | Free (or Paid) |

### 2.3 Add Environment Variables
In Render dashboard, go to **Environment** and add:

```
NODE_ENV=production
DB_HOST=your_mysql_host (e.g., your-db-server.com)
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=real_estate_db
DB_PORT=3306
PORT=3000
```

⚠️ **For MySQL Database:**
- Use a cloud MySQL service (e.g., AWS RDS, DigitalOcean, PlanetScale)
- Or set up MySQL on a separate server
- Update connection details in environment variables

### 2.4 Deploy
- Click **Deploy** button
- Wait for build to complete
- Your API will be live at: `https://real-estate-api.onrender.com`
- Note this URL for Step 5

---

## STEP 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to [https://vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **Add New...** → **Project**
4. Select your GitHub repository

### 3.2 Configure Frontend Project
In Vercel import settings:

| Field | Value |
|-------|-------|
| **Framework** | Vite |
| **Root Directory** | `./frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### 3.3 Add Environment Variables
Click **Environment Variables** and add:

```
VITE_API_URL=https://real-estate-api.onrender.com
```

(Replace with your actual Render API URL from Step 2.4)

### 3.4 Deploy
- Click **Deploy** button
- Wait for build to complete
- Your site will be live at: `https://your-project.vercel.app`

---

## STEP 4: Post-Deployment Setup

### 4.1 Initialize Database on Render
1. Connect to your MySQL database using a client (MySQL Workbench, DBeaver, etc.)
2. Run the SQL scripts in order:
   ```
   backend/database/schema.sql
   backend/database/create_admin_table.sql
   ```

### 4.2 Test Admin Panel
- Go to `https://your-project.vercel.app/admin`
- Login with:
  - **Username**: `admin`
  - **Password**: `admin123`
- Test enquiry/site visit submissions

### 4.3 Update Contact Information (if needed)
- Edit contact details in `frontend/src/components/Contact.jsx`
- Redeploy to Vercel

---

## STEP 5: Verify Deployment

### 5.1 Test Backend API
```bash
curl https://real-estate-api.onrender.com/api/health
```
Expected response:
```json
{"status":"OK","message":"Server is running"}
```

### 5.2 Test Frontend
- Visit `https://your-project.vercel.app`
- Test contact form submission
- Check admin dashboard

### 5.3 Troubleshooting

**If API calls fail:**
1. Check VITE_API_URL in Vercel environment variables
2. Verify Render backend is running
3. Check CORS settings in `backend/server.js`

**If database connection fails:**
1. Verify database credentials in Render environment
2. Check database is accessible from Render servers
3. Ensure firewall allows connections from Render IPs

---

## STEP 6: Custom Domain (Optional)

### 6.1 Vercel Domain
1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records according to Vercel instructions

### 6.2 Render Domain
1. In Render dashboard, go to **Settings** → **Custom Domain**
2. Add your custom domain
3. Update DNS records

---

## Database Setup

### Option A: Cloud MySQL Services
Recommended options:
1. **PlanetScale** (MySQL-compatible): https://planetscale.com
2. **AWS RDS**: https://aws.amazon.com/rds/
3. **DigitalOcean MySQL**: https://www.digitalocean.com/

### Option B: Local MySQL with Tunneling
Use a tool like ngrok or SSH tunnel to expose local MySQL to internet (not recommended for production).

---

## Important Notes

⚠️ **Security:**
- Never commit `.env` files with real credentials
- Use environment variables for all sensitive data
- Change default admin password after first login
- Use HTTPS for all API calls

⚠️ **Free Tier Limitations:**
- Render free tier spins down after 15 minutes of inactivity
- Vercel free tier has limitations on deployments
- Consider upgrading for production use

---

## Quick Reference

**Backend URL**: `https://real-estate-api.onrender.com`
**Frontend URL**: `https://your-project.vercel.app`
**Admin Panel**: `https://your-project.vercel.app/admin`

**Admin Credentials**:
- Username: `admin`
- Password: `admin123`

---

## Support & Debugging

### Vercel Logs
```
Vercel Dashboard → Project → Deployments → View Logs
```

### Render Logs
```
Render Dashboard → Web Service → Logs
```

### Local Testing
```bash
# Backend
cd backend
node server.js

# Frontend
cd frontend
npm run dev
```

---

## Next Steps After Deployment
1. ✅ Test all features on live site
2. ✅ Monitor logs for errors
3. ✅ Set up custom domains
4. ✅ Configure email notifications
5. ✅ Regular backups of database
6. ✅ Update security settings
