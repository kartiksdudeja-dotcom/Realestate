-- Real Estate Website Database Schema
-- Run this script to create the database and tables

-- Create Database
CREATE DATABASE IF NOT EXISTS real_estate_db;
USE real_estate_db;

-- Enquiries Table - Stores all contact form submissions
CREATE TABLE IF NOT EXISTS enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT,
    enquiry_type ENUM('general', 'site_visit', 'brochure', 'pricing') DEFAULT 'general',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('new', 'contacted', 'converted', 'closed') DEFAULT 'new',
    notes TEXT
);

-- Site Visits Table - For scheduling site visits
CREATE TABLE IF NOT EXISTS site_visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    preferred_date DATE,
    preferred_time VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending'
);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Brochure Downloads - Track brochure requests
CREATE TABLE IF NOT EXISTS brochure_downloads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Content - Dynamic content management
CREATE TABLE IF NOT EXISTS project_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_name VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    content TEXT,
    image_url VARCHAR(500),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Highlights Table
CREATE TABLE IF NOT EXISTS highlights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- Amenities Table
CREATE TABLE IF NOT EXISTS amenities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(100),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- Plot Details Table
CREATE TABLE IF NOT EXISTS plot_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plot_type VARCHAR(100) NOT NULL,
    size_range VARCHAR(100),
    price_start DECIMAL(15, 2),
    price_unit VARCHAR(20) DEFAULT 'Lacs',
    fsi DECIMAL(5, 2),
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE
);

-- Admin Users Table
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
);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, password, name, email, role) 
VALUES ('admin', 'admin123', 'Administrator', 'admin@homesca.in', 'admin')
ON DUPLICATE KEY UPDATE username = username;

-- Location Advantages Table
CREATE TABLE IF NOT EXISTS location_advantages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    place_name VARCHAR(255) NOT NULL,
    distance VARCHAR(50),
    category ENUM('connectivity', 'education', 'healthcare', 'shopping', 'recreation', 'tech_park') DEFAULT 'connectivity',
    display_order INT DEFAULT 0
);

-- Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(500) NOT NULL,
    title VARCHAR(255),
    category VARCHAR(50),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert Sample Data for NORA at Life Republic

-- Sample Highlights
INSERT INTO highlights (icon, title, description, display_order) VALUES
('fa-home', 'Completely Developed Plots', 'Plots sized from 142.50 sq.mt. (1533.87 sq.ft.) to 376.63 sq.mt. (4054.05 sq.ft.)', 1),
('fa-leaf', 'Private Garden', 'Bask in the beauty of your own private garden', 2),
('fa-drafting-compass', 'Expert Design Team', 'Build your bungalow with Kolte-Patil''s team of renowned architects and interior designers', 3),
('fa-file-contract', 'All Statutory NOCs', 'All statutory NOCs will be given through Kolte-Patil''s consultants', 4),
('fa-road', 'Wide Internal Roads', '24 mtr. (150 sq.ft.) wide internal spine roads', 5),
('fa-shield-alt', 'Multi-Level Security', 'Gated community living with multi-level security system', 6);

-- Sample Amenities for NORA
INSERT INTO amenities (icon, name, description, category, display_order) VALUES
('fa-swimming-pool', 'Lagoon Pool', 'Freeform lagoon pool with beach entry', 'recreation', 1),
('fa-water', 'Freeform Pool', 'Freeform pool with waterspouts', 'recreation', 2),
('fa-child', 'Kids'' Pool', 'Kids'' pool and pool deck for everyone', 'recreation', 3),
('fa-hot-tub', 'Jacuzzi', 'Seater with Jacuzzi jets', 'recreation', 4),
('fa-building', 'Clubhouse', 'Luxury clubhouse with multiple facilities', 'lifestyle', 5),
('fa-dumbbell', 'Gymnasium', 'Fully equipped modern gymnasium', 'fitness', 6),
('fa-basketball-ball', 'Half Basketball Court', 'Beat some new champ at basketball', 'recreation', 7),
('fa-gamepad', 'Indoor Games', 'Indoor games at the clubhouse', 'recreation', 8),
('fa-users', 'Multipurpose Hall', 'Hall for community gatherings', 'lifestyle', 9),
('fa-umbrella-beach', 'Multipurpose Lawn', 'Elaborately designed for exclusive get-togethers', 'lifestyle', 10),
('fa-spa', 'Zen Garden', 'Profoundly designed Zen garden', 'landscape', 11),
('fa-pray', 'Yoga Pavilion', 'Yoga and meditation pavilion', 'wellness', 12),
('fa-baby', 'Children''s Play Area', 'Designed with caretaker pavilion', 'recreation', 13),
('fa-umbrella', 'Sand Play Area', 'Fun sand play area for kids', 'recreation', 14),
('fa-archway', 'Luxurious Gazebos', 'Inspirational gazebos for relaxation', 'lifestyle', 15),
('fa-leaf', 'Sensory Garden', 'Aromatic plants to introduce new fragrances', 'landscape', 16),
('fa-shoe-prints', 'Floating Stepping-stones', 'Beautiful floating stepping-stones', 'landscape', 17),
('fa-shield-alt', 'Security Cabin', 'Main entrance security cabin', 'security', 18);

-- Sample Plot Details for NORA
INSERT INTO plot_details (plot_type, size_range, price_start, price_unit, fsi, description) VALUES
('Compact Plots', '142.50 - 175 Sq.m. (1533 - 1883 Sq.ft.)', 0.00, 'Contact', 1.00, 'Perfect for compact bungalow construction'),
('Premium Plots', '180 - 257 Sq.m. (1937 - 2766 Sq.ft.)', 0.00, 'Contact', 1.00, 'Ideal for spacious family homes with garden'),
('Luxury Plots', '265 - 376 Sq.m. (2852 - 4054 Sq.ft.)', 0.00, 'Contact', 1.00, 'Largest plots for maximum privacy and grandeur');

-- Sample Location Advantages for NORA
INSERT INTO location_advantages (place_name, distance, category, display_order) VALUES
('Rajiv Gandhi Hinjawadi IT Park (Phase I & II)', '5 Mins', 'connectivity', 1),
('Mumbai-Pune Expressway', '10 km', 'connectivity', 2),
('Bengaluru-Pune Bypass', '16 km', 'connectivity', 3),
('Pune Airport, Station, Koregaon Park', '28 km', 'connectivity', 4),
('Anisha Global School (Within Campus)', 'Functional', 'education', 5),
('Poddar, Vibgyor, Vidya Valley, Mercedes Benz', 'Close By', 'education', 6),
('Aditya Birla Hospital', 'Close By', 'healthcare', 7),
('Ruby Hall, Medipoint', 'Close By', 'healthcare', 8),
('Xion Mall, Pavilion Mall', 'Nearby', 'shopping', 9),
('Balewadi Sports Complex, Gahunje Stadium', 'Nearby', 'recreation', 10),
('Courtyard by Marriott, Holiday Inn, Sayaji, Lemon Tree', 'Close By', 'recreation', 11);

-- Create indexes for better performance
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created ON enquiries(created_at);
CREATE INDEX idx_site_visits_date ON site_visits(preferred_date);
