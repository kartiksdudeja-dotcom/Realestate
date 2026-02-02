-- Run this SQL in your MySQL client to create the admin table

USE real_estate_db;

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

-- Verify the table was created
SELECT * FROM admin_users;
