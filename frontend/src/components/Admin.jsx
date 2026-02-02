import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

function Admin() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const storedAdmin = localStorage.getItem('adminToken');
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (e) {
        localStorage.removeItem('adminToken');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (adminData) => {
    setAdmin(adminData);
  };

  const handleLogout = () => {
    setAdmin(null);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#1a1a2e',
        color: 'white'
      }}>
        Loading...
      </div>
    );
  }

  return admin ? (
    <AdminDashboard admin={admin} onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
}

export default Admin;
