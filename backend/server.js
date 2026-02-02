const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const { pool, testConnection } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// CORS configuration for Vercel frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://your-vercel-app.vercel.app", // Replace with your actual Vercel URL
      /\.vercel\.app$/, // Allow all Vercel preview deployments
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// NOTE: Backend is API-only. Frontend served separately on port 5173

// ============================================
// API ROUTES
// ============================================

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// ============================================
// ENQUIRY ROUTES
// ============================================

// Submit new enquiry
app.post("/api/enquiries", async (req, res) => {
  try {
    const { name, email, phone, message, enquiry_type } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required",
      });
    }

    const [result] = await pool.execute(
      "INSERT INTO enquiries (name, email, phone, message, enquiry_type) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, message || "", enquiry_type || "general"],
    );

    res.status(201).json({
      success: true,
      message: "Thank you for your enquiry! We will contact you soon.",
      enquiryId: result.insertId,
    });
  } catch (error) {
    console.error("Error saving enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit enquiry. Please try again.",
    });
  }
});

// Get all enquiries (admin)
app.get("/api/enquiries", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM enquiries ORDER BY created_at DESC",
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch enquiries" });
  }
});

// ============================================
// SITE VISIT ROUTES
// ============================================

// Schedule site visit
app.post("/api/site-visits", async (req, res) => {
  try {
    const { name, email, phone, preferred_date, preferred_time } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    const [result] = await pool.execute(
      "INSERT INTO site_visits (name, email, phone, preferred_date, preferred_time) VALUES (?, ?, ?, ?, ?)",
      [name, email || "", phone, preferred_date || null, preferred_time || ""],
    );

    res.status(201).json({
      success: true,
      message: "Site visit scheduled! Our team will confirm shortly.",
      visitId: result.insertId,
    });
  } catch (error) {
    console.error("Error scheduling site visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to schedule visit. Please try again.",
    });
  }
});

// ============================================
// BROCHURE DOWNLOAD ROUTES
// ============================================

// Request brochure
app.post("/api/brochure", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const [result] = await pool.execute(
      "INSERT INTO brochure_downloads (name, email, phone) VALUES (?, ?, ?)",
      [name || "", email, phone || ""],
    );

    res.status(201).json({
      success: true,
      message: "Brochure will be sent to your email shortly!",
      downloadId: result.insertId,
    });
  } catch (error) {
    console.error("Error processing brochure request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process request. Please try again.",
    });
  }
});

// ============================================
// NEWSLETTER ROUTES
// ============================================

// Subscribe to newsletter
app.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const [result] = await pool.execute(
      "INSERT INTO newsletter_subscribers (email) VALUES (?) ON DUPLICATE KEY UPDATE is_active = TRUE",
      [email],
    );

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter!",
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    res.status(500).json({
      success: false,
      message: "Failed to subscribe. Please try again.",
    });
  }
});

// ============================================
// CONTENT ROUTES (For dynamic content)
// ============================================

// Get highlights
app.get("/api/highlights", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM highlights WHERE is_active = TRUE ORDER BY display_order",
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching highlights:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch highlights" });
  }
});

// Get amenities
app.get("/api/amenities", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM amenities WHERE is_active = TRUE ORDER BY display_order",
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching amenities:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch amenities" });
  }
});

// Get plot details
app.get("/api/plots", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM plot_details WHERE is_available = TRUE",
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching plot details:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch plot details" });
  }
});

// Get location advantages
app.get("/api/locations", async (req, res) => {
  try {
    const { category } = req.query;
    let query = "SELECT * FROM location_advantages";
    let params = [];

    if (category) {
      query += " WHERE category = ?";
      params.push(category);
    }

    query += " ORDER BY display_order";

    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch locations" });
  }
});

// Get gallery images
app.get("/api/gallery", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM gallery_images WHERE is_active = TRUE ORDER BY display_order",
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch gallery" });
  }
});

// ============================================
// ADMIN AUTHENTICATION ROUTES
// ============================================

// Admin Login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const [rows] = await pool.execute(
      "SELECT * FROM admin_users WHERE username = ? AND password = ? AND is_active = TRUE",
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const admin = rows[0];

    // Update last login
    await pool.execute(
      "UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?",
      [admin.id]
    );

    res.json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
});

// ============================================
// ADMIN DATA ROUTES
// ============================================

// Get all enquiries (admin)
app.get("/api/admin/enquiries", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM enquiries ORDER BY created_at DESC"
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ success: false, message: "Failed to fetch enquiries" });
  }
});

// Update enquiry status
app.put("/api/admin/enquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    await pool.execute(
      "UPDATE enquiries SET status = ?, notes = ? WHERE id = ?",
      [status, notes || "", id]
    );

    res.json({ success: true, message: "Enquiry updated successfully" });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    res.status(500).json({ success: false, message: "Failed to update enquiry" });
  }
});

// Get all site visits (admin)
app.get("/api/admin/site-visits", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM site_visits ORDER BY created_at DESC"
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching site visits:", error);
    res.status(500).json({ success: false, message: "Failed to fetch site visits" });
  }
});

// Update site visit status
app.put("/api/admin/site-visits/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.execute(
      "UPDATE site_visits SET status = ? WHERE id = ?",
      [status, id]
    );

    res.json({ success: true, message: "Site visit updated successfully" });
  } catch (error) {
    console.error("Error updating site visit:", error);
    res.status(500).json({ success: false, message: "Failed to update site visit" });
  }
});

// Get all newsletter subscribers (admin)
app.get("/api/admin/newsletter", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC"
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ success: false, message: "Failed to fetch subscribers" });
  }
});

// Get admin dashboard stats
app.get("/api/admin/stats", async (req, res) => {
  try {
    const [enquiries] = await pool.execute("SELECT COUNT(*) as count FROM enquiries");
    const [newEnquiries] = await pool.execute("SELECT COUNT(*) as count FROM enquiries WHERE status = 'new'");
    const [siteVisits] = await pool.execute("SELECT COUNT(*) as count FROM site_visits");
    const [pendingVisits] = await pool.execute("SELECT COUNT(*) as count FROM site_visits WHERE status = 'pending'");
    const [subscribers] = await pool.execute("SELECT COUNT(*) as count FROM newsletter_subscribers WHERE is_active = TRUE");

    res.json({
      success: true,
      data: {
        totalEnquiries: enquiries[0].count,
        newEnquiries: newEnquiries[0].count,
        totalSiteVisits: siteVisits[0].count,
        pendingVisits: pendingVisits[0].count,
        totalSubscribers: subscribers[0].count,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
});

// ============================================
// SERVE FRONTEND
// ============================================

// Serve index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// ============================================
// START SERVER
// ============================================

async function initializeDatabase() {
  try {
    // Create admin_users table if not exists
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        email VARCHAR(100),
        role ENUM('admin', 'manager', 'viewer') DEFAULT 'admin',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL
      )
    `);

    // Insert default admin if not exists
    await pool.execute(`
      INSERT INTO admin_users (username, password, name, email, role) 
      VALUES ('admin', 'admin123', 'Administrator', 'admin@homesca.in', 'admin')
      ON DUPLICATE KEY UPDATE username = username
    `);

    console.log("✅ Admin table initialized");
  } catch (error) {
    console.error("⚠️  Error initializing admin table:", error.message);
  }
}

async function startServer() {
  // Test database connection
  const dbConnected = await testConnection();

  if (!dbConnected) {
    console.log("⚠️  Server starting without database connection.");
    console.log("   Please check your database configuration in .env file.");
  } else {
    // Initialize admin table
    await initializeDatabase();
  }

  app.listen(PORT, () => {
    console.log(`🚀 API Server running on http://localhost:${PORT}`);
    console.log(`📁 Frontend available on http://localhost:5173`);
    console.log(`🔐 Admin panel at http://localhost:5173/admin`);
  });
}

startServer();
