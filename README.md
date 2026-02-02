# 🏠 Homesca - Real Estate Website

A modern real estate website built with **React + Vite** frontend and **Node.js + Express** backend API, with MySQL database integration.

## 🚀 Quick Start

### Local Development

#### Backend
```bash
cd backend
npm install
# Create .env file with database credentials
node server.js
```
Backend runs on: `http://localhost:3000`

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 📋 Features

### Frontend (React + Vite)
- ✅ Responsive design
- ✅ Hero section with slider
- ✅ About, Amenities, Pricing sections
- ✅ Location with Google Maps
- ✅ Gallery
- ✅ Contact form
- ✅ Newsletter subscription
- ✅ AI Chatbot

### Admin Dashboard
- ✅ Secure login panel
- ✅ View & manage enquiries
- ✅ Update enquiry status
- ✅ View site visit requests
- ✅ View newsletter subscribers
- ✅ Dashboard statistics

### Backend API (Node.js + Express)
- ✅ RESTful API endpoints
- ✅ MySQL integration
- ✅ Admin authentication
- ✅ CORS enabled
- ✅ Health check endpoint

---

## 🛠️ Tech Stack

**Frontend**: React 19, Vite, Axios, React Router, AOS animations
**Backend**: Node.js, Express, MySQL2, CORS
**Database**: MySQL
**Deployment**: Vercel (Frontend), Render (Backend)

---

## 📁 Project Structure

```
Real estate/
├── frontend/                 # React + Vite SPA
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── api/             # API service layer
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js API server
│   ├── database/
│   │   ├── schema.sql
│   │   └── create_admin_table.sql
│   ├── config/database.js
│   ├── server.js
│   └── package.json
├── DEPLOYMENT_GUIDE.md      # Detailed deployment guide
├── DEPLOYMENT_CHECKLIST.md  # Step-by-step checklist
├── render.yaml              # Render backend config
└── vercel.json              # Vercel frontend config
```

---

## 🚀 Deployment to Vercel & Render

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Real estate website"
git push origin main
```

### Step 2: Deploy Backend to Render

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Select your GitHub repository
4. Fill in:
   - **Name**: `real-estate-api`
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/server.js`
5. Add Environment Variables:
   ```
   DB_HOST=your_mysql_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=real_estate_db
   ```
6. Click Deploy
7. Note your API URL (e.g., `https://real-estate-api.onrender.com`)

### Step 3: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Settings:
   - **Framework**: Vite
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   ```
   VITE_API_URL=https://real-estate-api.onrender.com
   ```
   (Replace with your actual Render URL)
6. Click Deploy

### Step 4: Initialize Database
Run SQL files in your MySQL client:
1. `backend/database/schema.sql`
2. `backend/database/create_admin_table.sql`

---

## 🔐 Admin Access

**Admin Panel**: `https://your-site.vercel.app/admin`

Login with:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ Change password after first login!

---

## 🗄️ Database Setup

### Cloud MySQL Options
- **PlanetScale**: https://planetscale.com
- **AWS RDS**: https://aws.amazon.com/rds/
- **DigitalOcean MySQL**: https://www.digitalocean.com/

Use any of these and add connection details to Render environment variables.

---

## 📊 API Endpoints

### Public
```
POST   /api/enquiries        - Submit enquiry
POST   /api/site-visits      - Schedule visit
POST   /api/newsletter       - Subscribe
GET    /api/amenities        - Get amenities
GET    /api/health           - Health check
```

### Admin
```
POST   /api/admin/login              - Login
GET    /api/admin/enquiries          - All enquiries
PUT    /api/admin/enquiries/:id      - Update enquiry
GET    /api/admin/site-visits        - All visits
GET    /api/admin/newsletter         - Subscribers
GET    /api/admin/stats              - Dashboard stats
```

---

## 📞 Contact Info

**Homesca**
- Address: Icon Tower, Wakad, Pune
- Phone: +91 9503103217
- Email: info@homesca.in

---

## 📖 Full Documentation

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

---

## 🐛 Troubleshooting

### API Connection Fails
- Check `VITE_API_URL` in Vercel environment
- Verify Render backend is running
- Check CORS in backend/server.js

### Database Connection Fails
- Verify credentials in Render env variables
- Ensure database is accessible
- Check firewall settings

### Frontend Won't Build
- Run `npm install` in frontend folder
- Check Node.js version (18.x+)
- Review Vercel build logs

---

## 📝 Environment Variables

### Backend (.env)
```
NODE_ENV=production
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=real_estate_db
```

### Frontend (.env.production)
```
VITE_API_URL=https://real-estate-api.onrender.com
```

---

## ✨ Summary

| Component | Technology | Hosted On |
|-----------|-----------|-----------|
| Frontend | React + Vite | Vercel |
| Backend | Node.js + Express | Render |
| Database | MySQL | Cloud Provider |

**Quick Links**:
- Frontend: `https://your-site.vercel.app`
- Backend API: `https://real-estate-api.onrender.com`
- Admin: `https://your-site.vercel.app/admin`

---

## 📜 License

ISC License
│   │   ├── lifestyle-1.jpg  # Lifestyle images
│   │   ├── lifestyle-2.jpg
│   │   ├── lifestyle-3.jpg
│   │   ├── sector-layout.jpg
│   │   ├── master-plan.jpg
│   │   ├── location-map.jpg
│   │   ├── developer.jpg
│   │   ├── gallery-1.jpg to gallery-6.jpg
│   │   ├── logo.png
│   │   ├── logo-white.png
│   │   └── favicon.png
│   └── index.html           # Main HTML file
├── .env                     # Environment configuration
├── package.json             # Node.js dependencies
├── server.js                # Express backend server
└── README.md                # This file
```

## 🚀 Setup Instructions

### Prerequisites

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MySQL** (v8 or higher) - [Download](https://dev.mysql.com/downloads/)

### Step 1: Install Dependencies

```bash
cd "c:\Users\karti\OneDrive\Desktop\Real estate"
npm install
```

### Step 2: Configure Database

1. Open MySQL and run the schema file:

   ```sql
   source database/schema.sql
   ```

   Or import it using MySQL Workbench.

2. Update the `.env` file with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=real_estate_db
   DB_PORT=3306
   PORT=3000
   ```

### Step 3: Add Your Images

Extract images from your PDF and place them in the `public/images/` folder:

| Image File                         | Description             | Recommended Size |
| ---------------------------------- | ----------------------- | ---------------- |
| `hero-1.jpg`                       | Hero section background | 1920x1080px      |
| `about-image.jpg`                  | About section           | 800x600px        |
| `lifestyle-1.jpg`                  | Lifestyle main image    | 800x500px        |
| `lifestyle-2.jpg`                  | Lifestyle secondary     | 400x300px        |
| `lifestyle-3.jpg`                  | Lifestyle secondary     | 400x300px        |
| `sector-layout.jpg`                | Sector layout plan      | 1200x800px       |
| `master-plan.jpg`                  | Master plan             | 1200x800px       |
| `location-map.jpg`                 | Location map            | 800x600px        |
| `developer.jpg`                    | Developer image         | 600x800px        |
| `gallery-1.jpg` to `gallery-6.jpg` | Gallery images          | 600x400px        |
| `logo.png`                         | Main logo               | 200x60px         |
| `logo-white.png`                   | White logo for footer   | 200x60px         |
| `favicon.png`                      | Browser favicon         | 32x32px          |

### Step 4: Update Content from PDF

Open `public/index.html` and search for `<!-- UPDATE:` comments to find all places where you need to add content from your PDF:

- Project name and tagline
- Highlights text
- Plot sizes and prices
- Amenities list
- Location advantages
- Developer information
- Contact details
- RERA number

### Step 5: Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### Step 6: View Website

Open your browser and go to:

```
http://localhost:3000
```

## 📊 Database Tables

| Table                    | Purpose                      |
| ------------------------ | ---------------------------- |
| `enquiries`              | Contact form submissions     |
| `site_visits`            | Site visit scheduling        |
| `newsletter_subscribers` | Newsletter subscriptions     |
| `brochure_downloads`     | Brochure download requests   |
| `highlights`             | Project highlights (dynamic) |
| `amenities`              | Amenities list (dynamic)     |
| `plot_details`           | Plot sizes and pricing       |
| `location_advantages`    | Location connectivity points |
| `gallery_images`         | Gallery images (dynamic)     |

## 🔌 API Endpoints

### Enquiries

- `POST /api/enquiries` - Submit new enquiry
- `GET /api/enquiries` - Get all enquiries (admin)

### Site Visits

- `POST /api/site-visits` - Schedule a site visit

### Brochure

- `POST /api/brochure` - Request brochure download

### Newsletter

- `POST /api/newsletter` - Subscribe to newsletter

### Content (Dynamic)

- `GET /api/highlights` - Get project highlights
- `GET /api/amenities` - Get amenities list
- `GET /api/plots` - Get plot details
- `GET /api/locations` - Get location advantages
- `GET /api/gallery` - Get gallery images

## 🎨 Customization

### Colors

Edit CSS variables in `public/css/style.css`:

```css
:root {
  --primary-color: #1a472a; /* Main green */
  --secondary-color: #c9a962; /* Gold accent */
  /* ... more colors */
}
```

### Fonts

The website uses:

- **Playfair Display** - For headings
- **Poppins** - For body text

## 📱 Responsive Design

The website is fully responsive:

- Desktop (1200px+)
- Tablet (768px - 992px)
- Mobile (< 768px)

## 🔒 Security Notes

1. Never expose the `.env` file publicly
2. Validate all form inputs on the server
3. Use prepared statements for database queries (already implemented)
4. Consider adding rate limiting for production

## 📞 Support

For any issues or customization requests, please contact the developer.

---

**Built with ❤️ for Premium Real Estate**
