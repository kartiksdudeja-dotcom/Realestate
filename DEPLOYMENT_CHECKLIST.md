# Deployment Checklist

## Pre-Deployment ✅

- [ ] All code committed to GitHub
- [ ] `backend/package.json` created with dependencies
- [ ] `frontend/package.json` has build script
- [ ] `.env.example` files created
- [ ] `render.yaml` configured for backend
- [ ] `vercel.json` configured for frontend
- [ ] `DEPLOYMENT_GUIDE.md` reviewed

---

## Render Deployment (Backend)

### Render Setup
1. [ ] Create Render account at https://render.com
2. [ ] Connect GitHub repository
3. [ ] Create new Web Service
4. [ ] Set service name: `real-estate-api`
5. [ ] Set build command: `npm install`
6. [ ] Set start command: `node backend/server.js`
7. [ ] Click Deploy

### Environment Variables (Add in Render Dashboard)
```
NODE_ENV=production
PORT=3000
DB_HOST=your_mysql_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=real_estate_db
DB_PORT=3306
```

### After Deployment
- [ ] Wait for build to complete (5-10 minutes)
- [ ] Check logs for errors
- [ ] Note your API URL: `https://real-estate-api.onrender.com`
- [ ] Test health check: `https://real-estate-api.onrender.com/api/health`

---

## Vercel Deployment (Frontend)

### Vercel Setup
1. [ ] Go to https://vercel.com
2. [ ] Click "Add New" → "Project"
3. [ ] Select your GitHub repository
4. [ ] Framework: **Vite**
5. [ ] Root Directory: `./frontend`
6. [ ] Build Command: `npm run build`
7. [ ] Output Directory: `dist`

### Environment Variables (Add in Vercel Project Settings)
```
VITE_API_URL=https://real-estate-api.onrender.com
```

### After Deployment
- [ ] Wait for build to complete (2-3 minutes)
- [ ] Check deployment preview
- [ ] Your site URL: `https://your-project.vercel.app`

---

## Database Setup

Choose one option:

### Option 1: Cloud MySQL (Recommended)
- [ ] Sign up at PlanetScale, AWS RDS, or DigitalOcean
- [ ] Create new MySQL database
- [ ] Get connection credentials
- [ ] Add credentials to Render environment variables
- [ ] Connect with database client and run SQL scripts:
  - `backend/database/schema.sql`
  - `backend/database/create_admin_table.sql`

### Option 2: Local MySQL (Testing Only)
- [ ] Keep local MySQL running
- [ ] Not recommended for production

---

## Post-Deployment Testing

### Backend API Tests
- [ ] Health check: `https://real-estate-api.onrender.com/api/health`
- [ ] Get enquiries: `https://real-estate-api.onrender.com/api/enquiries`
- [ ] Get amenities: `https://real-estate-api.onrender.com/api/amenities`

### Frontend Tests
- [ ] Load home page: `https://your-project.vercel.app`
- [ ] Fill and submit contact form
- [ ] Visit admin panel: `https://your-project.vercel.app/admin`
- [ ] Login (admin / admin123)
- [ ] View enquiries, site visits, subscribers

### Admin Panel
- [ ] Login works
- [ ] Dashboard displays stats
- [ ] Can view enquiries
- [ ] Can update enquiry status
- [ ] Can view site visits
- [ ] Can view newsletter subscribers

---

## Optional: Custom Domain

### For Frontend (Vercel)
1. [ ] Buy domain from GoDaddy, Namecheap, etc.
2. [ ] In Vercel: Settings → Domains
3. [ ] Add custom domain
4. [ ] Update DNS records

### For Backend (Render)
1. [ ] In Render: Settings → Custom Domain
2. [ ] Add custom domain
3. [ ] Update DNS records

---

## Important URLs

| Service | URL |
|---------|-----|
| **Frontend** | https://your-project.vercel.app |
| **Backend API** | https://real-estate-api.onrender.com |
| **Admin Panel** | https://your-project.vercel.app/admin |
| **API Health** | https://real-estate-api.onrender.com/api/health |

---

## Admin Credentials

| Field | Value |
|-------|-------|
| **Username** | `admin` |
| **Password** | `admin123` |
| **Email** | `admin@homesca.in` |

⚠️ **Change password after first login!**

---

## Troubleshooting

### API Connection Error
1. Check VITE_API_URL in Vercel environment
2. Verify Render backend is running
3. Check CORS settings in backend/server.js

### Database Connection Error
1. Verify credentials in Render env variables
2. Check database is running and accessible
3. Confirm firewall allows Render IPs

### Build Failures
1. Check build logs in Render/Vercel dashboard
2. Ensure all dependencies are in package.json
3. Verify build commands are correct

---

## Support

- Vercel Support: https://vercel.com/support
- Render Support: https://render.com/docs
- Check DEPLOYMENT_GUIDE.md for detailed instructions
