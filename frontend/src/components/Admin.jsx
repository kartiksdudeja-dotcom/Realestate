import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

function Admin() {
  // Initialize admin from localStorage
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem('adminToken');
    if (storedAdmin) {
      try {
        return JSON.parse(storedAdmin);
      } catch {
        localStorage.removeItem('adminToken');
        return null;
      }
    }
    return null;
  });

  const handleLogin = (adminData) => {
    setAdmin(adminData);
  };

  const handleLogout = () => {
    setAdmin(null);
  };


  return admin ? (
    <AdminDashboard admin={admin} onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
}

export default Admin;
